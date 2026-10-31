import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  LINE_ITEM_CATEGORIES,
  Quote,
  formatCurrency,
  lineItemTotal,
} from "@/lib/quotes";

interface QuotePreviewProps {
  quote: Quote | null;
  client?: { name: string; email?: string; phone?: string; address?: string };
  onOpenChange: (open: boolean) => void;
}

const categoryLabel = (value: string) =>
  LINE_ITEM_CATEGORIES.find((c) => c.value === value)?.label ?? value;

const formatDate = (value?: string) =>
  value
    ? new Date(`${value.slice(0, 10)}T00:00:00`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

export default function QuotePreview({ quote, client, onOpenChange }: QuotePreviewProps) {
  if (!quote) return null;
  // Show the totals saved with the quote so the preview always matches the list.
  const totals = {
    subtotal: quote.subtotal,
    discount: quote.discount,
    taxAmount: quote.tax_amount,
    total: quote.total,
  };

  return (
    <Dialog open={!!quote} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="print:hidden">
          <DialogTitle>Quote {quote.quote_number}</DialogTitle>
          <DialogDescription>Preview how the quote looks to your client.</DialogDescription>
        </DialogHeader>

        <article className="quote-print space-y-6 text-sm">
          <header className="flex flex-col sm:flex-row sm:justify-between gap-4 border-b pb-4">
            <div>
              <p className="text-2xl font-bold text-slate-800">DeckWise</p>
              <p className="text-muted-foreground">Quote</p>
            </div>
            <dl className="sm:text-right space-y-0.5">
              <div>
                <dt className="inline text-muted-foreground">Quote # </dt>
                <dd className="inline font-medium">{quote.quote_number}</dd>
              </div>
              {quote.created_at && (
                <div>
                  <dt className="inline text-muted-foreground">Date </dt>
                  <dd className="inline">{formatDate(quote.created_at)}</dd>
                </div>
              )}
              <div>
                <dt className="inline text-muted-foreground">Valid until </dt>
                <dd className="inline">{formatDate(quote.valid_until)}</dd>
              </div>
            </dl>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Prepared for</p>
              <p className="font-medium">{client?.name ?? "Unknown client"}</p>
              {client?.address && <p>{client.address}</p>}
              {client?.email && <p>{client.email}</p>}
              {client?.phone && <p>{client.phone}</p>}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Project</p>
              <p className="font-medium">{quote.title}</p>
            </div>
          </section>

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="py-2 font-medium">Description</th>
                <th className="py-2 font-medium hidden sm:table-cell">Category</th>
                <th className="py-2 font-medium text-right">Qty</th>
                <th className="py-2 font-medium text-right">Unit price</th>
                <th className="py-2 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {quote.line_items.map((item, index) => (
                <tr key={index} className="border-b align-top">
                  <td className="py-2 pr-2">{item.description}</td>
                  <td className="py-2 pr-2 hidden sm:table-cell">{categoryLabel(item.category)}</td>
                  <td className="py-2 text-right tabular-nums whitespace-nowrap">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="py-2 text-right tabular-nums">{formatCurrency(item.unit_price)}</td>
                  <td className="py-2 text-right tabular-nums">{formatCurrency(lineItemTotal(item))}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <dl className="ml-auto w-full sm:w-64 space-y-1 tabular-nums">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatCurrency(totals.subtotal)}</dd>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between">
                <dt>Discount</dt>
                <dd>−{formatCurrency(totals.discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt>Tax ({quote.tax_rate}%)</dt>
              <dd>{formatCurrency(totals.taxAmount)}</dd>
            </div>
            <div className="flex justify-between border-t pt-2 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatCurrency(totals.total)}</dd>
            </div>
          </dl>

          {quote.notes && (
            <section>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Notes & terms</p>
              <p className="whitespace-pre-line">{quote.notes}</p>
            </section>
          )}
        </article>

        <div className="flex justify-end gap-2 print:hidden">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-1" />
            Print / Save PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
