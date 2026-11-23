import { describe, expect, it } from "vitest";
import { entityToHit } from "../src/lib/entities";
import { entitySubtitle, entityTitle, formatNumber } from "../src/lib/format";

describe("entityToHit", () => {
  it("mapea un lugar con su categoria", () => {
    const hit = entityToHit("places", {
      id: "p1",
      name: "Veterinaria La Floresta",
      address: "Calle 43 Sur 79-12",
      categorySlug: "veterinarias",
      lat: 4.6112,
      lon: -74.1508,
    });
    expect(hit).toMatchObject({
      id: "p1",
      resource: "places",
      categorySlug: "veterinarias",
      title: "Veterinaria La Floresta",
      subtitle: "Calle 43 Sur 79-12",
      lat: 4.6112,
      lon: -74.1508,
    });
  });

  it("asigna la categoria por defecto de cada recurso", () => {
    const hit = entityToHit("road-segments", { id: "r1", name: "Calle 43", condition: "regular" });
    expect(hit.categorySlug).toBe("malla-vial");
    expect(hit.title).toBe("Calle 43");
  });
});

describe("format", () => {
  it("formatea numeros con separador de miles", () => {
    expect(formatNumber(1500)).toMatch(/1[.,]500/);
    expect(formatNumber(undefined)).toBe("0");
  });

  it("construye titulos y subtitulos por recurso", () => {
    expect(entityTitle("cadastral-properties", { address: "Calle 44 Sur" })).toBe("Calle 44 Sur");
    expect(entityTitle("security-incidents", { title: "Hurto" })).toBe("Hurto");
    expect(entitySubtitle("localities", { upz: "79 Caldas" })).toBe("79 Caldas");
  });
});
