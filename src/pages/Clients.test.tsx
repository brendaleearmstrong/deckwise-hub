import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { toast } from "sonner";
import Clients from "@/pages/Clients";

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

const makeRow = (overrides: Record<string, unknown>) => ({
  id: "c1",
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "555-0100",
  address: "12 Maple Street",
  status: "active",
  payment_status: "paid",
  total_budget: 5000,
  amount_paid: 5000,
  notes: "",
  last_contact: "2024-01-01",
  priority: "high",
  ...overrides,
});

const rows = [
  makeRow({ id: "c1", name: "Jane Doe", email: "jane@example.com" }),
  makeRow({
    id: "c2",
    name: "John Smith",
    email: "john@example.com",
    status: "pending",
    payment_status: "unpaid",
  }),
];

const mockSelectResult = (result: { data: unknown; error: unknown }) => {
  const order = vi.fn().mockResolvedValue(result);
  const eq = vi.fn(() => ({ order }));
  const select = vi.fn(() => ({ eq }));
  fromMock.mockReturnValue({ select });
  return { select, eq, order };
};

const renderClients = () =>
  render(
    <MemoryRouter>
      <Clients />
    </MemoryRouter>,
  );

describe("Clients page", () => {
  beforeEach(() => {
    fromMock.mockReset();
    vi.mocked(toast.error).mockReset();
    vi.mocked(toast.success).mockReset();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("loads only the demo user's clients and lists them", async () => {
    const { select, eq } = mockSelectResult({ data: rows, error: null });
    renderClients();

    expect(await screen.findByText("Jane Doe")).toBeTruthy();
    expect(screen.getByText("John Smith")).toBeTruthy();
    expect(fromMock).toHaveBeenCalledWith("clients");
    expect(select).toHaveBeenCalledWith("*");
    expect(eq).toHaveBeenCalledWith("user_id", "00000000-0000-0000-0000-000000000001");
  });

  it("filters the list by search text", async () => {
    mockSelectResult({ data: rows, error: null });
    renderClients();
    await screen.findByText("Jane Doe");

    fireEvent.change(screen.getByPlaceholderText("Search clients..."), {
      target: { value: "john" },
    });

    expect(screen.getByText("John Smith")).toBeTruthy();
    expect(screen.queryByText("Jane Doe")).toBeNull();
  });

  it("shows the empty state when nothing matches the search", async () => {
    mockSelectResult({ data: rows, error: null });
    renderClients();
    await screen.findByText("Jane Doe");

    fireEvent.change(screen.getByPlaceholderText("Search clients..."), {
      target: { value: "zzz-no-match" },
    });

    expect(screen.getByText("No clients found")).toBeTruthy();
  });

  it("shows an error toast and empty state when loading fails", async () => {
    mockSelectResult({ data: null, error: { message: "network down" } });
    renderClients();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to load clients");
    });
    expect(await screen.findByText("No clients found")).toBeTruthy();
  });

  it("inserts a new client and reloads the list on success", async () => {
    const { order } = mockSelectResult({ data: rows, error: null });
    const insert = vi.fn().mockResolvedValue({ error: null });
    fromMock.mockImplementation(() => ({
      select: () => ({ eq: () => ({ order }) }),
      insert,
    }));
    renderClients();
    await screen.findByText("Jane Doe");

    fireEvent.click(screen.getByRole("button", { name: /Add Client/ }));
    fireEvent.change(screen.getByLabelText("Name *"), { target: { value: "Ann Lee" } });
    fireEvent.change(screen.getByLabelText("Email *"), { target: { value: "ann@example.com" } });
    fireEvent.change(screen.getByLabelText("Phone *"), { target: { value: "555-0199" } });
    fireEvent.change(screen.getByLabelText("Address *"), { target: { value: "9 Pine Road" } });
    fireEvent.click(screen.getByRole("button", { name: "Add Client" }));

    await waitFor(() => {
      expect(insert).toHaveBeenCalledWith([
        expect.objectContaining({
          user_id: "00000000-0000-0000-0000-000000000001",
          name: "Ann Lee",
          email: "ann@example.com",
          phone: "555-0199",
          address: "9 Pine Road",
          status: "pending",
          payment_status: "unpaid",
          total_budget: 0,
          amount_paid: 0,
        }),
      ]);
    });
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Client added successfully!");
    });
    expect(toast.error).not.toHaveBeenCalled();
  });
});
