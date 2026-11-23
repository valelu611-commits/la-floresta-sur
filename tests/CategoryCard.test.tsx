import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { CategoryCard } from "../src/components/CategoryCard";

const category = {
  slug: "veterinarias",
  name: "Veterinarias",
  resource: "places" as const,
  color: "#10B981",
  icon: "veterinarias",
  description: "Clinicas y consultorios para mascotas.",
  count: 6,
};

describe("CategoryCard", () => {
  it("enlaza al listado de la categoria", () => {
    render(
      <MemoryRouter>
        <CategoryCard category={category} />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "/categoria/veterinarias");
  });

  it("muestra nombre, descripcion y numero de registros", () => {
    render(
      <MemoryRouter>
        <CategoryCard category={category} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Veterinarias")).toBeInTheDocument();
    expect(screen.getByText(/Clinicas y consultorios/)).toBeInTheDocument();
    expect(screen.getByText("6 registros")).toBeInTheDocument();
  });
});
