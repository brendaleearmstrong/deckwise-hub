export type QuoteStatus = "draft" | "sent" | "accepted" | "declined";

export type LineItemCategory = "materials" | "labor" | "equipment" | "permits" | "other";

export interface QuoteLineItem {
  description: string;
  category: LineItemCategory;
  quantity: number;
  unit: string;
  unit_price: number;
}

export interface QuoteTotals {
  subtotal: number;
  discount: number;
  taxableAmount: number;
  taxAmount: number;
  total: number;
}

export interface Quote {
  id: string;
  client_id: string;
  quote_number: string;
  title: string;
  status: QuoteStatus;
  valid_until: string;
  line_items: QuoteLineItem[];
  tax_rate: number;
  discount: number;
  subtotal: number;
  tax_amount: number;
  total: number;
  notes: string | null;
  created_at?: string;
}

export const QUOTE_STATUSES: QuoteStatus[] = ["draft", "sent", "accepted", "declined"];

export const LINE_ITEM_CATEGORIES: { value: LineItemCategory; label: string }[] = [
  { value: "materials", label: "Materials" },
  { value: "labor", label: "Labor" },
  { value: "equipment", label: "Equipment" },
  { value: "permits", label: "Permits & fees" },
  { value: "other", label: "Other" },
];

const roundCurrency = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

const safeNumber = (value: number) => (Number.isFinite(value) && value > 0 ? value : 0);

export const lineItemTotal = (item: QuoteLineItem) =>
  roundCurrency(safeNumber(item.quantity) * safeNumber(item.unit_price));

/**
 * Discount is a flat amount taken off the subtotal (never below zero);
 * tax is then charged on what remains.
 */
export const calculateQuoteTotals = (
  items: QuoteLineItem[],
  taxRate: number,
  discount: number,
): QuoteTotals => {
  const subtotal = roundCurrency(items.reduce((sum, item) => sum + lineItemTotal(item), 0));
  const appliedDiscount = roundCurrency(Math.min(safeNumber(discount), subtotal));
  const taxableAmount = roundCurrency(subtotal - appliedDiscount);
  const rate = Math.min(safeNumber(taxRate), 100);
  const taxAmount = roundCurrency((taxableAmount * rate) / 100);
  return {
    subtotal,
    discount: appliedDiscount,
    taxableAmount,
    taxAmount,
    total: roundCurrency(taxableAmount + taxAmount),
  };
};

export const generateQuoteNumber = (date: Date = new Date(), random: () => number = Math.random) => {
  const stamp = date.toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = Math.floor(random() * 10000).toString().padStart(4, "0");
  return `Q-${stamp}-${suffix}`;
};

export const defaultValidUntil = (from: Date = new Date(), days = 30) => {
  const date = new Date(from);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

export const isQuoteExpired = (quote: Pick<Quote, "valid_until" | "status">, today: Date = new Date()) =>
  (quote.status === "draft" || quote.status === "sent") &&
  quote.valid_until < today.toISOString().split("T")[0];

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export const emptyLineItem = (): QuoteLineItem => ({
  description: "",
  category: "materials",
  quantity: 1,
  unit: "each",
  unit_price: 0,
});
