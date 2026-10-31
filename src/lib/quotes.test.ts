import { describe, it, expect } from "vitest";
import {
  QuoteLineItem,
  calculateQuoteTotals,
  defaultValidUntil,
  generateQuoteNumber,
  isQuoteExpired,
  lineItemTotal,
} from "@/lib/quotes";

const item = (quantity: number, unit_price: number): QuoteLineItem => ({
  description: "Item",
  category: "materials",
  quantity,
  unit: "each",
  unit_price,
});

describe("lineItemTotal", () => {
  it("multiplies quantity by unit price and rounds to cents", () => {
    expect(lineItemTotal(item(3, 19.99))).toBe(59.97);
    expect(lineItemTotal(item(0.333, 10))).toBe(3.33);
  });

  it("treats negative or invalid numbers as zero", () => {
    expect(lineItemTotal(item(-2, 10))).toBe(0);
    expect(lineItemTotal(item(2, Number.NaN))).toBe(0);
  });
});

describe("calculateQuoteTotals", () => {
  it("sums lines, applies the discount, then taxes the remainder", () => {
    const totals = calculateQuoteTotals([item(10, 25), item(2, 250)], 13, 100);
    expect(totals).toEqual({
      subtotal: 750,
      discount: 100,
      taxableAmount: 650,
      taxAmount: 84.5,
      total: 734.5,
    });
  });

  it("never discounts below zero", () => {
    const totals = calculateQuoteTotals([item(1, 50)], 10, 80);
    expect(totals.discount).toBe(50);
    expect(totals.taxAmount).toBe(0);
    expect(totals.total).toBe(0);
  });

  it("caps the tax rate at 100% and ignores negative values", () => {
    expect(calculateQuoteTotals([item(1, 100)], 150, 0).taxAmount).toBe(100);
    expect(calculateQuoteTotals([item(1, 100)], -5, -20).total).toBe(100);
  });

  it("returns zeros for an empty quote", () => {
    expect(calculateQuoteTotals([], 13, 0).total).toBe(0);
  });

  it("rounds tax to the nearest cent", () => {
    // 19.99 * 13% = 2.5987
    expect(calculateQuoteTotals([item(1, 19.99)], 13, 0).taxAmount).toBe(2.6);
  });
});

describe("generateQuoteNumber", () => {
  it("uses the date and a zero-padded random suffix", () => {
    expect(generateQuoteNumber(new Date("2026-10-31T12:00:00Z"), () => 0.0042)).toBe(
      "Q-20261031-0042",
    );
  });
});

describe("defaultValidUntil", () => {
  it("is 30 days after the given date", () => {
    expect(defaultValidUntil(new Date("2026-10-31T12:00:00Z"))).toBe("2026-11-30");
  });
});

describe("isQuoteExpired", () => {
  const today = new Date("2026-10-31T12:00:00Z");

  it("flags open quotes past their valid-until date", () => {
    expect(isQuoteExpired({ status: "sent", valid_until: "2026-10-30" }, today)).toBe(true);
    expect(isQuoteExpired({ status: "draft", valid_until: "2026-10-31" }, today)).toBe(false);
  });

  it("never flags quotes the client has already answered", () => {
    expect(isQuoteExpired({ status: "accepted", valid_until: "2020-01-01" }, today)).toBe(false);
    expect(isQuoteExpired({ status: "declined", valid_until: "2020-01-01" }, today)).toBe(false);
  });
});
