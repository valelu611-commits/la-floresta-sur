import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const navigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return { ...actual, useNavigate: () => navigate };
});

const { SearchHero } = await import("../src/components/SearchHero");

describe("SearchHero", () => {
  beforeEach(() => navigate.mockClear());

  it("navega a explorar con el texto buscado", () => {
    render(<SearchHero />);
    fireEvent.change(screen.getByLabelText("Buscar en La Floresta Sur"), {
      target: { value: "veterinarias" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));
    expect(navigate).toHaveBeenCalledWith("/explorar?q=veterinarias");
  });

  it("no navega con una busqueda vacia", () => {
    render(<SearchHero />);
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));
    expect(navigate).not.toHaveBeenCalled();
  });

  it("usa las ideas rapidas para buscar", () => {
    render(<SearchHero />);
    fireEvent.click(screen.getByRole("button", { name: "CAI" }));
    expect(navigate).toHaveBeenCalledWith("/explorar?q=CAI");
  });
});
