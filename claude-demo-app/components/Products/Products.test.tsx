import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Products from "./index";

describe("Products", () => {
  it("renders the section heading", () => {
    render(<Products />);
    expect(screen.getByText("Browse Our Products")).toBeInTheDocument();
  });

  it("renders all 9 products", () => {
    render(<Products />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(9);
  });
});
