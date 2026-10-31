import { useEffect, useMemo, useState } from "react";
import ResourcesLayout from "@/components/layout/ResourcesLayout";
import QuoteBuilder, { QuoteFormData } from "@/components/quotes/QuoteBuilder";
import QuotePreview from "@/components/quotes/QuotePreview";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, FileText, HardDrive, Loader2, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import {
  QUOTE_STATUSES,
  Quote,
  QuoteStatus,
  calculateQuoteTotals,
  formatCurrency,
  generateQuoteNumber,
  isQuoteExpired,
} from "@/lib/quotes";
import {
  addLocalQuote,
  isMissingQuotesTable,
  loadLocalQuotes,
  updateLocalQuoteStatus,
} from "@/lib/quoteStorage";

interface ClientRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const DEMO_USER_ID = "00000000-0000-0000-0000-000000000001";

const STATUS_LABELS: Record<QuoteStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  accepted: "Accepted",
  declined: "Declined",
};

const STATUS_STYLES: Record<QuoteStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  sent: "status-badge-info",
  accepted: "status-badge-success",
  declined: "status-badge-danger",
};

type StorageMode = "database" | "browser";

const normalizeQuote = (row: Quote): Quote => ({
  ...row,
  line_items: Array.isArray(row.line_items) ? row.line_items : [],
  tax_rate: Number(row.tax_rate),
  discount: Number(row.discount),
  subtotal: Number(row.subtotal),
  tax_amount: Number(row.tax_amount),
  total: Number(row.total),
});

const Quotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [builderOpen, setBuilderOpen] = useState(false);
  const [previewQuote, setPreviewQuote] = useState<Quote | null>(null);
  const [storageMode, setStorageMode] = useState<StorageMode>("database");

  const switchToBrowserStorage = () => {
    setStorageMode("browser");
    setQuotes(loadLocalQuotes().map(normalizeQuote));
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [quotesResult, clientsResult] = await Promise.all([
        supabase
          .from("quotes")
          .select("*")
          .eq("user_id", DEMO_USER_ID)
          .order("created_at", { ascending: false }),
        supabase
          .from("clients")
          .select("id, name, email, phone, address")
          .eq("user_id", DEMO_USER_ID)
          .order("name", { ascending: true }),
      ]);

      if (clientsResult.error) throw clientsResult.error;
      setClients(clientsResult.data || []);

      if (isMissingQuotesTable(quotesResult.error)) {
        switchToBrowserStorage();
        return;
      }
      if (quotesResult.error) throw quotesResult.error;

      setStorageMode("database");
      setQuotes((quotesResult.data || []).map(normalizeQuote));
    } catch (error) {
      console.error("Error fetching quotes:", error);
      toast.error("Failed to load quotes");
    } finally {
      setLoading(false);
    }
  };

  // Load once when the page opens; later refreshes are triggered explicitly after saves.
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clientsById = useMemo(
    () => new Map(clients.map((client) => [client.id, client])),
    [clients],
  );

  const handleCreateQuote = async (data: QuoteFormData) => {
    const totals = calculateQuoteTotals(data.lineItems, data.taxRate, data.discount);
    const quote = {
      client_id: data.clientId,
      quote_number: generateQuoteNumber(),
      title: data.title,
      status: "draft" as const,
      valid_until: data.validUntil,
      line_items: data.lineItems,
      tax_rate: data.taxRate,
      discount: totals.discount,
      subtotal: totals.subtotal,
      tax_amount: totals.taxAmount,
      total: totals.total,
      notes: data.notes || null,
    };

    const saveInBrowser = () => {
      if (!addLocalQuote(quote)) throw new Error("Browser storage unavailable");
      switchToBrowserStorage();
      toast.success("Quote saved in this browser");
      return true;
    };

    try {
      if (storageMode === "browser") return saveInBrowser();

      const { error } = await supabase.from("quotes").insert([{ user_id: DEMO_USER_ID, ...quote }]);
      if (isMissingQuotesTable(error)) return saveInBrowser();
      if (error) throw error;

      toast.success("Quote saved");
      fetchData();
      return true;
    } catch (error) {
      console.error("Error saving quote:", error);
      toast.error("Failed to save quote");
      return false;
    }
  };

  const handleStatusChange = async (quote: Quote, status: QuoteStatus) => {
    const previous = quote.status;
    setQuotes((current) => current.map((q) => (q.id === quote.id ? { ...q, status } : q)));
    let error: unknown = null;
    if (storageMode === "browser") {
      if (!updateLocalQuoteStatus(quote.id, status)) error = new Error("Browser storage unavailable");
    } else {
      ({ error } = await supabase.from("quotes").update({ status }).eq("id", quote.id));
    }
    if (error) {
      console.error("Error updating quote status:", error);
      setQuotes((current) => current.map((q) => (q.id === quote.id ? { ...q, status: previous } : q)));
      toast.error("Failed to update quote status");
    }
  };

  const filteredQuotes = quotes.filter((quote) => {
    const query = searchQuery.toLowerCase();
    const clientName = clientsById.get(quote.client_id)?.name ?? "";
    const matchesSearch =
      quote.title.toLowerCase().includes(query) ||
      quote.quote_number.toLowerCase().includes(query) ||
      clientName.toLowerCase().includes(query);
    const matchesStatus = statusFilter === "all" || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openValue = quotes
    .filter((q) => q.status === "draft" || q.status === "sent")
    .reduce((sum, q) => sum + q.total, 0);
  const acceptedValue = quotes
    .filter((q) => q.status === "accepted")
    .reduce((sum, q) => sum + q.total, 0);
  const decided = quotes.filter((q) => q.status === "accepted" || q.status === "declined").length;
  const winRate = decided
    ? Math.round((quotes.filter((q) => q.status === "accepted").length / decided) * 100)
    : null;

  return (
    <ResourcesLayout title="Quote Builder">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-slate-600">
            Build itemized quotes for your clients, print them, and track which ones are won.
          </p>
          <Button
            size="sm"
            className="flex items-center gap-1 sm:self-start"
            onClick={() => setBuilderOpen(true)}
          >
            <Plus className="h-4 w-4" />
            New Quote
          </Button>
        </div>

        {storageMode === "browser" && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-md border border-warning/40 bg-warning/10 p-3 text-sm"
          >
            <HardDrive className="h-4 w-4 mt-0.5 shrink-0" />
            <p>
              Quotes are being saved in this browser for now. They'll be stored with the rest of your
              data once the quotes table is added to the database.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Open quotes</p>
              <p className="text-2xl font-semibold tabular-nums" data-testid="stat-open">
                {formatCurrency(openValue)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Accepted</p>
              <p className="text-2xl font-semibold tabular-nums" data-testid="stat-accepted">
                {formatCurrency(acceptedValue)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Win rate</p>
              <p className="text-2xl font-semibold tabular-nums" data-testid="stat-win-rate">
                {winRate === null ? "—" : `${winRate}%`}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quotes..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]" aria-label="Filter by status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {QUOTE_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {STATUS_LABELS[status]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-lg font-medium">
              {quotes.length === 0 ? "No quotes yet" : "No quotes found"}
            </p>
            <p className="text-muted-foreground">
              {quotes.length === 0
                ? "Create your first quote to send a client an itemized price."
                : "Try adjusting your search or filters"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredQuotes.map((quote) => {
              const client = clientsById.get(quote.client_id);
              const expired = isQuoteExpired(quote);
              return (
                <Card key={quote.id} data-testid="quote-row">
                  <CardContent className="flex flex-col md:flex-row md:items-center gap-4 py-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium truncate">{quote.title}</p>
                        <span className={cn("status-badge", STATUS_STYLES[quote.status])}>
                          {STATUS_LABELS[quote.status]}
                        </span>
                        {expired && (
                          <span className="status-badge status-badge-warning">Expired</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {quote.quote_number} · {client?.name ?? "Unknown client"} · valid until{" "}
                        {quote.valid_until}
                      </p>
                    </div>
                    <p className="text-lg font-semibold tabular-nums md:w-36 md:text-right">
                      {formatCurrency(quote.total)}
                    </p>
                    <div className="flex gap-2">
                      <Select
                        value={quote.status}
                        onValueChange={(value: QuoteStatus) => handleStatusChange(quote, value)}
                      >
                        <SelectTrigger
                          className="w-[130px]"
                          aria-label={`Status for ${quote.quote_number}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {QUOTE_STATUSES.map((status) => (
                            <SelectItem key={status} value={status}>
                              {STATUS_LABELS[status]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewQuote(quote)}
                        aria-label={`View ${quote.quote_number}`}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <QuoteBuilder
        open={builderOpen}
        onOpenChange={setBuilderOpen}
        clients={clients}
        onSubmit={handleCreateQuote}
      />

      <QuotePreview
        quote={previewQuote}
        client={previewQuote ? clientsById.get(previewQuote.client_id) : undefined}
        onOpenChange={(open) => !open && setPreviewQuote(null)}
      />
    </ResourcesLayout>
  );
};

export default Quotes;
