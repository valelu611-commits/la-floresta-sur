import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "../src/components/Badge";

describe("Badge", () => {
  it("muestra el texto recibido", () => {
    render(<Badge color="#FF2D95">Veterinarias</Badge>);
    expect(screen.getByText("Veterinarias")).toBeInTheDocument();
  });

  it("aplica el color en borde y fondo", () => {
    render(<Badge color="#22D3EE">CAI</Badge>);
    const badge = screen.getByText("CAI");
    expect(badge).toHaveStyle({ color: "#22D3EE" });
    expect(badge.className).toContain("chip");
  });
});
