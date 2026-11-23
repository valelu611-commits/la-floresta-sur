export interface Message {
  role: "user" | "agent";
  content: string;
}

export const AGENT_SUGGESTIONS = [
  "¿Dónde hay veterinarias?",
  "¿Qué calles tienen obras?",
  "¿Qué CAI y cámaras hay?",
  "¿Qué transporte pasa?",
];

export const AGENT_GREETING =
  "Hola, soy el asistente de **La Floresta Sur**. Preguntame por seguridad, calles, " +
  "catastro, veterinarias, CAI, cámaras, comida, parques, transporte, deportes o colegios.";
