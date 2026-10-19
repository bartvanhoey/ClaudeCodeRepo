import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Avatar from "@/components/Avatar"

describe("Avatar", () => {
  it("renders successfully", () => {
    render(<Avatar name="John" />)
    const avatar = screen.getByRole("img")
    expect(avatar).toBeInTheDocument()
  })

  it("displays first letter for single word names", () => {
    render(<Avatar name="John" />)
    expect(screen.getByText("J")).toBeInTheDocument()
  })

  it("displays first two uppercase letters for PascalCase names", () => {
    render(<Avatar name="JohnDoe" />)
    expect(screen.getByText("JD")).toBeInTheDocument()
  })

  it("displays first two uppercase letters for multiple PascalCase words", () => {
    render(<Avatar name="AlexSmith" />)
    expect(screen.getByText("AS")).toBeInTheDocument()
  })
})
