import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HeistCard } from "@/components/HeistCard";
import type { Heist } from "@/types/heist";

const mockHeist: Heist = {
  id: "heist-001",
  name: "The Diamond Gambit",
  description: "Steal the legendary Kovalev Diamond from the Geneva vault.",
  status: "planning",
  difficulty: "expert",
  location: "Geneva, Switzerland",
  targetValue: 4500000,
  crewSize: 5,
  duration: "72h",
  riskLevel: 85,
  category: "jewel",
  scheduledAt: "2026-04-15T03:00:00Z",
};

describe("HeistCard", () => {
  it("renders successfully", () => {
    render(<HeistCard heist={mockHeist} />);
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("displays the heist name", () => {
    render(<HeistCard heist={mockHeist} />);
    expect(screen.getByText("The Diamond Gambit")).toBeInTheDocument();
  });

  it("displays the heist status badge", () => {
    render(<HeistCard heist={mockHeist} />);
    expect(screen.getByText("Planning")).toBeInTheDocument();
  });

  it("displays the heist location", () => {
    render(<HeistCard heist={mockHeist} />);
    expect(screen.getByText("Geneva, Switzerland")).toBeInTheDocument();
  });
});
