import { CATEGORY_NAMES } from "./categories";
import { localSearch } from "./localSearch";
import type { AgentAnswer } from "./types";

const INTENTS: Array<{ slug: string; words: string[] }> = [
  { slug: "seguridad", words: ["hurto", "robo", "seguridad", "asalto"] },
  { slug: "malla-vial", words: ["calle", "via", "vía", "hueco", "obra", "pavimento"] },
  { slug: "catastral", words: ["catastro", "predio", "estrato", "avaluo"] },
  { slug: "librerias", words: ["libreria", "librería", "papeleria"] },
  { slug: "cai", words: ["cai", "policia", "policía"] },
  { slug: "camaras", words: ["camara", "cámara", "vigilancia"] },
  { slug: "comida", words: ["comida", "restaurante", "panaderia", "cafe"] },
  { slug: "veterinarias", words: ["veterinaria", "mascota", "perro", "gato"] },
  { slug: "localidad", words: ["localidad", "kennedy", "upz", "caldas"] },
  { slug: "zonas-verdes", words: ["parque", "verde", "recreacion"] },
  { slug: "transporte", words: ["transporte", "transmilenio", "bus", "paradero"] },
  { slug: "deportes", words: ["deporte", "cancha", "gimnasio"] },
  { slug: "educacion", words: ["colegio", "escuela", "jardin", "educacion"] },
];

/** Agente local de la demo publica: responde desde la instantanea sin servidor. */
export async function localAsk(question: string): Promise<AgentAnswer> {
  const lower = question.toLowerCase();
  const intent = INTENTS.find((item) => item.words.some((word) => lower.includes(word)));
  const name = intent ? CATEGORY_NAMES[intent.slug] : undefined;
  const result = await localSearch(name ?? question, 8);

  const lines = result.hits.length
    ? result.hits.map((hit) => `• ${hit.title} — ${hit.subtitle}`).join("\n")
    : "No encontre registros con esos terminos en la instantanea.";

  const answer =
    `Encontre **${result.total} registros** relacionados con ${name ? `**${name}**` : "tu pregunta"}:\n\n` +
    `${lines}\n\nDatos de ejemplo de La Floresta Sur (UPZ 79, Kennedy). ` +
    "Verifica siempre con la fuente oficial antes de tomar decisiones.";

  return {
    question,
    answer,
    generatedBy: "rules",
    intents: intent ? [intent.slug] : [],
    groups: [],
    suggestions: [],
  };
}
