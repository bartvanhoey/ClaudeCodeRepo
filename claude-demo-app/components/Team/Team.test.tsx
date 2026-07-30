import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Team from "./index";

describe("Team", () => {
  it("renders the section heading", () => {
    render(<Team />);
    expect(
      screen.getByText("The people behind the workshop"),
    ).toBeInTheDocument();
  });

  it("renders all team members", () => {
    render(<Team />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(4);
  });
});
