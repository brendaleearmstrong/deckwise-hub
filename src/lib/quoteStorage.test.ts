import { describe, it, expect, beforeEach } from "vitest";
import {
  addLocalQuote,
  isMissingQuotesTable,
  loadLocalQuotes,
  updateLocalQuoteStatus,
} from "@/lib/quoteStorage";

describe("isMissingQuotesTable", () => {
  it("recognises Supabase's missing-table errors", () => {
    expect(isMissingQuotesTable({ code: "PGRST205", message: "" })).toBe(true);
    expect(isMissingQuotesTable({ code: "42P01", message: "" })).toBe(true);
    expect(
      isMissingQuotesTable({ message: "Could not find the table 'public.quotes' in the schema cache" }),
    ).toBe(true);
    expect(isMissingQuotesTable({ message: 'relation "public.quotes" does not exist' })).toBe(true);
  });

  it("ignores other errors and empty values", () => {
    expect(isMissingQuotesTable(null)).toBe(false);
    expect(isMissingQuotesTable({ code: "42501", message: "permission denied for table quotes" })).toBe(false);
    expect(isMissingQuotesTable({ message: "Failed to fetch" })).toBe(false);
  });
});

describe("browser quote storage", () => {
  beforeEach(() => window.localStorage.clear());

  const quote = {
    client_id: "c1",
    quote_number: "Q-20261031-0001",
    title: "Deck",
    status: "draft" as const,
    valid_until: "2026-11-30",
    line_items: [],
    tax_rate: 0,
    discount: 0,
    subtotal: 100,
    tax_amount: 0,
    total: 100,
    notes: null,
  };

  it("stores quotes newest first with an id and creation date", () => {
    addLocalQuote(quote);
    addLocalQuote({ ...quote, title: "Pergola" });
    const saved = loadLocalQuotes();
    expect(saved.map((q) => q.title)).toEqual(["Pergola", "Deck"]);
    expect(saved[0].id).toBeTruthy();
    expect(saved[0].created_at).toBeTruthy();
  });

  it("updates a stored quote's status", () => {
    addLocalQuote(quote);
    const [saved] = loadLocalQuotes();
    updateLocalQuoteStatus(saved.id, "accepted");
    expect(loadLocalQuotes()[0].status).toBe("accepted");
  });

  it("returns an empty list when stored data is unreadable", () => {
    window.localStorage.setItem("deckwise.quotes.v1", "{not json");
    expect(loadLocalQuotes()).toEqual([]);
  });
});
