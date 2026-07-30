import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SectionHeader from "./SectionHeader";

describe("SectionHeader", () => {
  it("renders the title, subtitle, and description", () => {
    render(
      <SectionHeader
        headerInfo={{
          title: "SOLID FEATURES",
          subtitle: "Core Features of Solid",
          description: "A short description.",
        }}
      />,
    );

    expect(screen.getByText("SOLID FEATURES")).toBeInTheDocument();
    expect(screen.getByText("Core Features of Solid")).toBeInTheDocument();
    expect(screen.getByText("A short description.")).toBeInTheDocument();
  });
});
