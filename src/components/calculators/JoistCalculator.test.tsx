import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import JoistCalculator from "@/components/calculators/JoistCalculator";

const setInput = (label: string, value: string) => {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
};

const clickCalculate = () => {
  fireEvent.click(screen.getByRole("button", { name: "Calculate" }));
};

describe("JoistCalculator", () => {
  it("calculates spacing, joist count and total length for default inputs", () => {
    render(<JoistCalculator />);
    clickCalculate();

    expect(screen.getByText('16" on center')).toBeTruthy();
    expect(screen.getByText("13")).toBeTruthy();
    expect(screen.getByText("156 ft")).toBeTruthy();
  });

  it("scales the joist count and total length with a larger residential deck", () => {
    render(<JoistCalculator />);
    setInput("Deck Length (ft)", "20");
    setInput("Deck Width (ft)", "10");
    clickCalculate();

    expect(screen.getByText('16" on center')).toBeTruthy();
    expect(screen.getByText("16")).toBeTruthy();
    expect(screen.getByText("160 ft")).toBeTruthy();
  });

  it("shows an error and no results when length is zero", () => {
    render(<JoistCalculator />);
    setInput("Deck Length (ft)", "0");
    clickCalculate();

    expect(screen.getByRole("alert").textContent).toContain("greater than zero");
    expect(screen.queryByText("Number of Joists Required:")).toBeNull();
  });

  it("shows an error when width is negative", () => {
    render(<JoistCalculator />);
    setInput("Deck Width (ft)", "-4");
    clickCalculate();

    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.queryByText("Total Linear Feet:")).toBeNull();
  });

  it("clears a previous validation error once valid dimensions are calculated", () => {
    render(<JoistCalculator />);
    setInput("Deck Length (ft)", "");
    clickCalculate();
    expect(screen.getByRole("alert")).toBeTruthy();

    setInput("Deck Length (ft)", "12");
    clickCalculate();
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByText("Number of Joists Required:")).toBeTruthy();
  });
});
