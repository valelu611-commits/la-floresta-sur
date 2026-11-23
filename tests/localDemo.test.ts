import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { localAsk } from "../src/lib/localAsk";
import { localList } from "../src/lib/localReads";
import { localSearch } from "../src/lib/localSearch";

const DATA = join(process.cwd(), "public", "data");

function jsonFile(name: string) {
  return JSON.parse(readFileSync(join(DATA, `${name}.json`), "utf8"));
}

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn((url: string) => {
    const name = url.split("/").pop()?.replace(".json", "") ?? "";
    return Promise.resolve({ ok: true, json: () => Promise.resolve(jsonFile(name)) });
  }));
});

afterEach(() => vi.unstubAllGlobals());

describe("demo estatica sin servidor", () => {
  it("busca en la instantanea incluida", async () => {
    const result = await localSearch("veterinarias", 10);
    expect(result.total).toBe(4);
    expect(result.hits[0].categorySlug).toBe("veterinarias");
    expect(result.countsByCategory.veterinarias).toBe(4);
  });

  it("filtra un listado por categoria", async () => {
    const page = await localList("places", { category: "cai", limit: 20 });
    expect(page.meta.total).toBe(3);
    expect(page.data.every((item) => item.categorySlug === "cai")).toBe(true);
  });

  it("responde preguntas con el agente local", async () => {
    const answer = await localAsk("¿Dónde hay veterinarias?");
    expect(answer.generatedBy).toBe("rules");
    expect(answer.answer).toContain("Clinica Veterinaria San Francisco");
    expect(answer.intents).toContain("veterinarias");
  });
});
