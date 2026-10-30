import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AddClientForm from "@/components/forms/AddClientForm";

const fillValidClient = () => {
  fireEvent.change(screen.getByLabelText("Name *"), { target: { value: "Jane Doe" } });
  fireEvent.change(screen.getByLabelText("Email *"), { target: { value: "jane@example.com" } });
  fireEvent.change(screen.getByLabelText("Phone *"), { target: { value: "555-0100" } });
  fireEvent.change(screen.getByLabelText("Address *"), { target: { value: "12 Maple Street" } });
};

const submit = () => {
  fireEvent.click(screen.getByRole("button", { name: "Add Client" }));
};

describe("AddClientForm", () => {
  it("submits the entered client details and closes the dialog", () => {
    const onSubmit = vi.fn();
    const onOpenChange = vi.fn();
    render(<AddClientForm open onOpenChange={onOpenChange} onSubmit={onSubmit} />);

    fillValidClient();
    fireEvent.change(screen.getByLabelText("Estimated Budget"), { target: { value: "5000" } });
    submit();

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "555-0100",
      address: "12 Maple Street",
      priority: "medium",
      totalBudget: 5000,
      notes: "",
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not submit when required fields are empty", () => {
    const onSubmit = vi.fn();
    render(<AddClientForm open onOpenChange={vi.fn()} onSubmit={onSubmit} />);

    submit();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("does not submit when the email address is malformed", () => {
    const onSubmit = vi.fn();
    render(<AddClientForm open onOpenChange={vi.fn()} onSubmit={onSubmit} />);

    fillValidClient();
    fireEvent.change(screen.getByLabelText("Email *"), { target: { value: "not-an-email" } });
    submit();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("does not submit when the budget is negative", () => {
    const onSubmit = vi.fn();
    render(<AddClientForm open onOpenChange={vi.fn()} onSubmit={onSubmit} />);

    fillValidClient();
    fireEvent.change(screen.getByLabelText("Estimated Budget"), { target: { value: "-100" } });
    submit();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("closes without submitting when cancelled", () => {
    const onSubmit = vi.fn();
    const onOpenChange = vi.fn();
    render(<AddClientForm open onOpenChange={onOpenChange} onSubmit={onSubmit} />);

    fillValidClient();
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
