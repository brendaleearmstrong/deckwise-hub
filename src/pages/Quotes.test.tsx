import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { toast } from "sonner";
import Quotes from "@/pages/Quotes";

const { fromMock } = vi.hoisted(() => ({ fromMock: vi.fn() }));

vi.mock("@/lib/supabase", () => ({
  supabase: { from: fromMock },
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock("@/components/layout/DashboardLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const DEMO_USER_ID = "00000000-0000-0000-0000-000000000001";

const clients = [
  { id: "c1", name: "Jane Doe", email: "jane@example.com", phone: "555-0100", address: "12 Maple Street" },
  { id: "c2", name: "John Smith", email: "john@example.com", phone: "555-0101", address: "4 Oak Lane" },
];

const quotes = [
  {
    id: "q1",
    client_id: "c1",
    quote_number: "Q-20261001-0001",
    title: "Cedar deck",
    status: "sent",
    valid_until: "2999-01-01",
    line_items: [
      { description: "Cedar boards", category: "materials", quantity: 40, unit: "each", unit_price: 25 },
    ],
    tax_rate: "13.00",
    discount: "0.00",
    subtotal: "1000.00",
    tax_amount: "130.00",
    total: "1130.00",
    notes: "50% deposit",
    created_at: "2026-10-01T10:00:00Z",
  },
  {
    id: "q2",
    client_id: "c2",
    quote_number: "Q-20261002-0002",
    title: "Pergola",
    status: "accepted",
    valid_until: "2999-01-01",
    line_items: [],
    tax_rate: "0",
    discount: "0",
    subtotal: "2000",
    tax_amount: "0",
    total: "2000",
    notes: null,
    created_at: "2026-10-02T10:00:00Z",
  },
  {
    id: "q3",
    client_id: "c2",
    quote_number: "Q-20261003-0003",
    title: "Railing repair",
    status: "declined",
    valid_until: "2999-01-01",
    line_items: [],
    tax_rate: "0",
    discount: "0",
    subtotal: "500",
    tax_amount: "0",
    total: "500",
    notes: null,
    created_at: "2026-10-03T10:00:00Z",
  },
];

interface MockOptions {
  quoteRows?: unknown;
  quoteError?: unknown;
  insert?: ReturnType<typeof vi.fn>;
  update?: ReturnType<typeof vi.fn>;
}

const mockSupabase = ({ quoteRows = quotes, quoteError = null, insert, update }: MockOptions = {}) => {
  const selects: Record<string, ReturnType<typeof vi.fn>> = {};
  fromMock.mockImplementation((table: string) => {
    const result =
      table === "quotes" ? { data: quoteRows, error: quoteError } : { data: clients, error: null };
    const order = vi.fn().mockResolvedValue(result);
    const eq = vi.fn(() => ({ order }));
    const select = vi.fn(() => ({ eq }));
    selects[table] = eq;
    return { select, insert, update };
  });
  return selects;
};

const renderQuotes = () =>
  render(
    <MemoryRouter>
      <Quotes />
    </MemoryRouter>,
  );

// Radix Select relies on pointer APIs that jsdom doesn't implement.
beforeAll(() => {
  Element.prototype.hasPointerCapture ??= () => false;
  Element.prototype.releasePointerCapture ??= () => {};
  Element.prototype.scrollIntoView ??= () => {};
});

const chooseOption = async (trigger: HTMLElement, optionName: string) => {
  fireEvent.keyDown(trigger, { key: "Enter" });
  fireEvent.click(await screen.findByRole("option", { name: optionName }));
};

describe("Quotes page", () => {
  beforeEach(() => {
    fromMock.mockReset();
    vi.mocked(toast.error).mockReset();
    vi.mocked(toast.success).mockReset();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("loads the demo user's quotes and shows client names and totals", async () => {
    const eqs = mockSupabase();
    renderQuotes();

    expect(await screen.findByText("Cedar deck")).toBeTruthy();
    expect(screen.getAllByTestId("quote-row")).toHaveLength(3);
    expect(screen.getByText(/Q-20261001-0001 · Jane Doe/)).toBeTruthy();
    expect(within(screen.getAllByTestId("quote-row")[0]).getByText("$1,130.00")).toBeTruthy();
    expect(eqs.quotes).toHaveBeenCalledWith("user_id", DEMO_USER_ID);
    expect(eqs.clients).toHaveBeenCalledWith("user_id", DEMO_USER_ID);
  });

  it("summarizes open value, accepted value and win rate", async () => {
    mockSupabase();
    renderQuotes();
    await screen.findByText("Cedar deck");

    expect(screen.getByTestId("stat-open").textContent).toBe("$1,130.00");
    expect(screen.getByTestId("stat-accepted").textContent).toBe("$2,000.00");
    expect(screen.getByTestId("stat-win-rate").textContent).toBe("50%");
  });

  it("filters by search text across title, number and client", async () => {
    mockSupabase();
    renderQuotes();
    await screen.findByText("Cedar deck");

    fireEvent.change(screen.getByPlaceholderText("Search quotes..."), { target: { value: "john" } });

    expect(screen.queryByText("Cedar deck")).toBeNull();
    expect(screen.getByText("Pergola")).toBeTruthy();
    expect(screen.getByText("Railing repair")).toBeTruthy();
  });

  it("shows the first-quote empty state when there are no quotes", async () => {
    mockSupabase({ quoteRows: [] });
    renderQuotes();
    expect(await screen.findByText("No quotes yet")).toBeTruthy();
  });

  it("shows an error toast when loading fails", async () => {
    mockSupabase({ quoteRows: null, quoteError: { message: "network down" } });
    renderQuotes();
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Failed to load quotes"));
  });

  it("builds a quote with live totals and saves it with computed amounts", async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    mockSupabase({ insert });
    renderQuotes();
    await screen.findByText("Cedar deck");

    fireEvent.click(screen.getByRole("button", { name: /New Quote/ }));
    const dialog = await screen.findByRole("dialog");

    await chooseOption(within(dialog).getByLabelText("Client"), "John Smith");
    fireEvent.change(within(dialog).getByLabelText("Title *"), { target: { value: "Composite deck" } });

    fireEvent.change(within(dialog).getByLabelText("Description, line 1"), {
      target: { value: "Composite boards" },
    });
    fireEvent.change(within(dialog).getByLabelText("Quantity, line 1"), { target: { value: "10" } });
    fireEvent.change(within(dialog).getByLabelText("Unit price, line 1"), { target: { value: "25" } });

    fireEvent.click(within(dialog).getByRole("button", { name: /Add line/ }));
    fireEvent.change(within(dialog).getByLabelText("Description, line 2"), {
      target: { value: "Labor" },
    });
    fireEvent.change(within(dialog).getByLabelText("Quantity, line 2"), { target: { value: "2" } });
    fireEvent.change(within(dialog).getByLabelText("Unit price, line 2"), { target: { value: "250" } });

    fireEvent.change(within(dialog).getByLabelText("Discount ($)"), { target: { value: "100" } });
    fireEvent.change(within(dialog).getByLabelText("Tax rate (%)"), { target: { value: "13" } });

    expect(within(dialog).getByTestId("quote-subtotal").textContent).toBe("$750.00");
    expect(within(dialog).getByTestId("quote-tax-amount").textContent).toBe("$84.50");
    expect(within(dialog).getByTestId("quote-total").textContent).toBe("$734.50");

    fireEvent.click(within(dialog).getByRole("button", { name: "Save Quote" }));

    await waitFor(() => expect(insert).toHaveBeenCalledTimes(1));
    const [row] = insert.mock.calls[0][0];
    expect(row).toMatchObject({
      user_id: DEMO_USER_ID,
      client_id: "c2",
      title: "Composite deck",
      status: "draft",
      tax_rate: 13,
      discount: 100,
      subtotal: 750,
      tax_amount: 84.5,
      total: 734.5,
      notes: null,
    });
    expect(row.quote_number).toMatch(/^Q-\d{8}-\d{4}$/);
    expect(row.line_items).toHaveLength(2);
    await waitFor(() => expect(toast.success).toHaveBeenCalledWith("Quote saved"));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("blocks saving without a client and drops blank lines", async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    mockSupabase({ insert });
    renderQuotes();
    await screen.findByText("Cedar deck");

    fireEvent.click(screen.getByRole("button", { name: /New Quote/ }));
    const dialog = await screen.findByRole("dialog");
    fireEvent.click(within(dialog).getByRole("button", { name: "Save Quote" }));

    expect(within(dialog).getByRole("alert").textContent).toBe("Choose a client for this quote.");
    expect(insert).not.toHaveBeenCalled();

    await chooseOption(within(dialog).getByLabelText("Client"), "Jane Doe");
    fireEvent.change(within(dialog).getByLabelText("Title *"), { target: { value: "Stairs" } });
    fireEvent.click(within(dialog).getByRole("button", { name: "Save Quote" }));

    expect(within(dialog).getByRole("alert").textContent).toBe(
      "Add at least one line item with a description.",
    );
    expect(insert).not.toHaveBeenCalled();
  });

  it("keeps the builder open and reports an error when saving fails", async () => {
    const insert = vi.fn().mockResolvedValue({ error: { message: "denied" } });
    mockSupabase({ insert });
    renderQuotes();
    await screen.findByText("Cedar deck");

    fireEvent.click(screen.getByRole("button", { name: /New Quote/ }));
    const dialog = await screen.findByRole("dialog");
    await chooseOption(within(dialog).getByLabelText("Client"), "Jane Doe");
    fireEvent.change(within(dialog).getByLabelText("Title *"), { target: { value: "Stairs" } });
    fireEvent.change(within(dialog).getByLabelText("Description, line 1"), {
      target: { value: "Stair stringers" },
    });
    fireEvent.click(within(dialog).getByRole("button", { name: "Save Quote" }));

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Failed to save quote"));
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("updates a quote's status and rolls back if the save fails", async () => {
    const eqUpdate = vi.fn().mockResolvedValue({ error: { message: "denied" } });
    const update = vi.fn(() => ({ eq: eqUpdate }));
    mockSupabase({ update });
    renderQuotes();
    await screen.findByText("Cedar deck");

    const trigger = screen.getByLabelText("Status for Q-20261001-0001");
    await chooseOption(trigger, "Accepted");

    expect(update).toHaveBeenCalledWith({ status: "accepted" });
    expect(eqUpdate).toHaveBeenCalledWith("id", "q1");
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Failed to update quote status"));
    await waitFor(() => expect(trigger.textContent).toBe("Sent"));
  });

  it("opens a printable preview with line items and totals", async () => {
    mockSupabase();
    renderQuotes();
    await screen.findByText("Cedar deck");

    fireEvent.click(screen.getByRole("button", { name: "View Q-20261001-0001" }));
    const dialog = await screen.findByRole("dialog");

    expect(within(dialog).getByText("Cedar boards")).toBeTruthy();
    expect(within(dialog).getByText("12 Maple Street")).toBeTruthy();
    expect(within(dialog).getByText("Tax (13%)")).toBeTruthy();
    expect(within(dialog).getAllByText("$1,130.00").length).toBeGreaterThan(0);
    expect(within(dialog).getByText("50% deposit")).toBeTruthy();
    expect(within(dialog).getByRole("button", { name: /Print/ })).toBeTruthy();
  });
});
