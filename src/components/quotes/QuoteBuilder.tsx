import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  LINE_ITEM_CATEGORIES,
  LineItemCategory,
  QuoteLineItem,
  calculateQuoteTotals,
  defaultValidUntil,
  emptyLineItem,
  formatCurrency,
  lineItemTotal,
} from "@/lib/quotes";

export interface QuoteClientOption {
  id: string;
  name: string;
}

export interface QuoteFormData {
  clientId: string;
  title: string;
  validUntil: string;
  lineItems: QuoteLineItem[];
  taxRate: number;
  discount: number;
  notes: string;
}

interface QuoteBuilderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clients: QuoteClientOption[];
  onSubmit: (data: QuoteFormData) => Promise<boolean> | boolean;
}

const initialForm = (): QuoteFormData => ({
  clientId: "",
  title: "",
  validUntil: defaultValidUntil(),
  lineItems: [emptyLineItem()],
  taxRate: 0,
  discount: 0,
  notes: "",
});

const toNumber = (value: string) => {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export default function QuoteBuilder({ open, onOpenChange, clients, onSubmit }: QuoteBuilderProps) {
  const [form, setForm] = useState<QuoteFormData>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const totals = calculateQuoteTotals(form.lineItems, form.taxRate, form.discount);

  const updateItem = (index: number, changes: Partial<QuoteLineItem>) => {
    setForm((current) => ({
      ...current,
      lineItems: current.lineItems.map((item, i) => (i === index ? { ...item, ...changes } : item)),
    }));
  };

  const addItem = () =>
    setForm((current) => ({ ...current, lineItems: [...current.lineItems, emptyLineItem()] }));

  const removeItem = (index: number) =>
    setForm((current) => ({
      ...current,
      lineItems: current.lineItems.filter((_, i) => i !== index),
    }));

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setForm(initialForm());
      setError(null);
    }
    onOpenChange(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const items = form.lineItems.filter((item) => item.description.trim() !== "");

    if (!form.clientId) {
      setError("Choose a client for this quote.");
      return;
    }
    if (!form.title.trim()) {
      setError("Give the quote a title.");
      return;
    }
    if (items.length === 0) {
      setError("Add at least one line item with a description.");
      return;
    }

    setError(null);
    setSaving(true);
    const saved = await onSubmit({ ...form, title: form.title.trim(), lineItems: items });
    setSaving(false);
    if (saved) handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Quote</DialogTitle>
          <DialogDescription>
            Itemize the job for your client. Totals update as you type.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quote-client">Client *</Label>
              <Select
                value={form.clientId}
                onValueChange={(value) => setForm({ ...form, clientId: value })}
              >
                <SelectTrigger id="quote-client" aria-label="Client">
                  <SelectValue placeholder={clients.length ? "Select a client" : "No clients yet"} />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote-title">Title *</Label>
              <Input
                id="quote-title"
                placeholder="e.g. 16×12 composite deck"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote-valid-until">Valid until</Label>
              <Input
                id="quote-valid-until"
                type="date"
                value={form.validUntil}
                onChange={(e) => setForm({ ...form, validUntil: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Line items</h3>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <Plus className="h-4 w-4 mr-1" />
                Add line
              </Button>
            </div>

            <div className="hidden md:grid md:grid-cols-[1fr_140px_80px_80px_110px_100px_36px] gap-2 text-xs font-medium text-muted-foreground px-1">
              <span>Description</span>
              <span>Category</span>
              <span>Qty</span>
              <span>Unit</span>
              <span>Unit price</span>
              <span className="text-right">Amount</span>
              <span />
            </div>

            {form.lineItems.map((item, index) => {
              const n = index + 1;
              return (
                <div
                  key={index}
                  className="grid grid-cols-2 md:grid-cols-[1fr_140px_80px_80px_110px_100px_36px] gap-2 items-center rounded-md border p-2 md:border-0 md:p-0"
                >
                  <Input
                    className="col-span-2 md:col-span-1"
                    aria-label={`Description, line ${n}`}
                    placeholder="e.g. Pressure-treated 2×8 joists"
                    value={item.description}
                    onChange={(e) => updateItem(index, { description: e.target.value })}
                  />
                  <Select
                    value={item.category}
                    onValueChange={(value: LineItemCategory) => updateItem(index, { category: value })}
                  >
                    <SelectTrigger aria-label={`Category, line ${n}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LINE_ITEM_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    min="0"
                    step="any"
                    aria-label={`Quantity, line ${n}`}
                    value={item.quantity}
                    onChange={(e) => updateItem(index, { quantity: toNumber(e.target.value) })}
                  />
                  <Input
                    aria-label={`Unit, line ${n}`}
                    value={item.unit}
                    onChange={(e) => updateItem(index, { unit: e.target.value })}
                  />
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    aria-label={`Unit price, line ${n}`}
                    value={item.unit_price}
                    onChange={(e) => updateItem(index, { unit_price: toNumber(e.target.value) })}
                  />
                  <span className="text-sm text-right tabular-nums" data-testid={`line-total-${n}`}>
                    {formatCurrency(lineItemTotal(item))}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove line ${n}`}
                    disabled={form.lineItems.length === 1}
                    onClick={() => removeItem(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="quote-notes">Notes & terms</Label>
              <Textarea
                id="quote-notes"
                rows={5}
                placeholder="e.g. 50% deposit due on acceptance; balance on completion."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            <div className="space-y-3 rounded-md bg-muted/50 p-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="quote-discount">Discount ($)</Label>
                  <Input
                    id="quote-discount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.discount}
                    onChange={(e) => setForm({ ...form, discount: toNumber(e.target.value) })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="quote-tax">Tax rate (%)</Label>
                  <Input
                    id="quote-tax"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={form.taxRate}
                    onChange={(e) => setForm({ ...form, taxRate: toNumber(e.target.value) })}
                  />
                </div>
              </div>
              <dl className="space-y-1 text-sm tabular-nums">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd data-testid="quote-subtotal">{formatCurrency(totals.subtotal)}</dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>Discount</dt>
                  <dd>−{formatCurrency(totals.discount)}</dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>Tax</dt>
                  <dd data-testid="quote-tax-amount">{formatCurrency(totals.taxAmount)}</dd>
                </div>
                <div className="flex justify-between border-t pt-2 text-base font-semibold">
                  <dt>Total</dt>
                  <dd data-testid="quote-total">{formatCurrency(totals.total)}</dd>
                </div>
              </dl>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save Quote"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
