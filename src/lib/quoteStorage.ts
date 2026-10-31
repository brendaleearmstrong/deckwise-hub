import type { Quote, QuoteStatus } from "@/lib/quotes";

/**
 * Browser fallback for quotes, used while the database has no `quotes` table
 * (i.e. before supabase/migrations/20261031120000_create_quotes.sql is applied).
 * Quotes saved here stay on this device and browser only.
 */
const STORAGE_KEY = "deckwise.quotes.v1";

interface SupabaseLikeError {
  code?: string;
  message?: string;
}

/** True when Supabase reports that the quotes table doesn't exist yet. */
export const isMissingQuotesTable = (error: unknown) => {
  if (!error || typeof error !== "object") return false;
  const { code, message = "" } = error as SupabaseLikeError;
  return (
    code === "PGRST205" ||
    code === "42P01" ||
    /could not find the table .*quotes/i.test(message) ||
    /relation .*quotes.* does not exist/i.test(message)
  );
};

export const loadLocalQuotes = (): Quote[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveLocalQuotes = (quotes: Quote[]) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
    return true;
  } catch {
    return false;
  }
};

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;

/** Adds a quote to browser storage, newest first. Returns false if storage is unavailable. */
export const addLocalQuote = (quote: Omit<Quote, "id" | "created_at">) => {
  const saved: Quote = { ...quote, id: newId(), created_at: new Date().toISOString() };
  return saveLocalQuotes([saved, ...loadLocalQuotes()]);
};

export const updateLocalQuoteStatus = (id: string, status: QuoteStatus) =>
  saveLocalQuotes(loadLocalQuotes().map((quote) => (quote.id === id ? { ...quote, status } : quote)));
