import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Company from "./index";

describe("Company", () => {
  it("renders the section heading", () => {
    render(<Company />);
    expect(
      screen.getByText("Objects that are honest about what they're made of"),
    ).toBeInTheDocument();
  });

  it("renders all company highlights", () => {
    render(<Company />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
  });
});
