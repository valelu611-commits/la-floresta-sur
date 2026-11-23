import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AgentChat } from "../src/components/AgentChat";

const ANSWER = {
  question: "¿Dónde hay veterinarias?",
  answer: "Encontre **3 veterinarias** en el barrio.",
  generatedBy: "rules",
  intents: ["veterinarias"],
  groups: [],
  suggestions: [],
};

function mockFetch(answer: unknown, ok = true) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    json: () => Promise.resolve(answer),
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("AgentChat", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("muestra el saludo inicial", () => {
    render(<AgentChat />);
    expect(screen.getByText("Agente La Floresta")).toBeInTheDocument();
    expect(screen.getByText(/Hola, soy el asistente/)).toBeInTheDocument();
  });

  it("envia la pregunta y pinta la respuesta del agente", async () => {
    const fetchMock = mockFetch(ANSWER);
    render(<AgentChat />);
    fireEvent.change(screen.getByLabelText("Pregunta al agente"), {
      target: { value: "¿Dónde hay veterinarias?" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));

    await waitFor(() => expect(screen.getByText(/Encontre/)).toBeInTheDocument());
    expect(screen.getByText(/3 veterinarias/)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("/agent/ask");
    expect(init.method).toBe("POST");
  });

  it("muestra el error de la API si falla", async () => {
    mockFetch({ error: { message: "Servicio no disponible" } }, false);
    render(<AgentChat />);
    fireEvent.change(screen.getByLabelText("Pregunta al agente"), {
      target: { value: "hola barrio" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
    await waitFor(() => expect(screen.getByText(/Servicio no disponible/)).toBeInTheDocument());
  });
});
