export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  seguridad: "Hurtos y hechos reportados, con fecha, gravedad y ubicación aproximada.",
  "malla-vial": "Estado de los tramos: pavimento, huecos, obras y señalización.",
  catastral: "Predios, estrato, uso del suelo y avalúo de referencia.",
  librerias: "Papelerías y librerías con horario y dirección.",
  cai: "Centros de Atención Inmediata de la Policía en el sector.",
  camaras: "Cámaras de seguridad y su cobertura sobre el barrio.",
  comida: "Restaurantes, panaderías, cafés y comidas rápidas.",
  veterinarias: "Clínicas y consultorios para mascotas, con servicios y horario.",
  localidad: "Ficha de contexto de Kennedy y de la UPZ 79 Caldas.",
  "zonas-verdes": "Parques, zonas verdes y espacios de recreación.",
  transporte: "Estaciones, paraderos y rutas que pasan por el barrio.",
  deportes: "Canchas, gimnasios y escenarios deportivos comunitarios.",
  educacion: "Colegios, jardines y centros de formación.",
};

export function descriptionFor(slug: string): string {
  return CATEGORY_DESCRIPTIONS[slug] ?? "Explora los registros de esta categoría.";
}
