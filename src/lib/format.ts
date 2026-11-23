const numberFormat = new Intl.NumberFormat("es-CO");

export function formatNumber(value: number | string | undefined): string {
  const num = Number(value ?? 0);
  return Number.isFinite(num) ? numberFormat.format(num) : "0";
}

export function formatDate(value: unknown): string {
  if (typeof value !== "string" || value.length < 10) return "";
  const date = new Date(value.length === 10 ? `${value}T12:00:00` : value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });
}

export const RESOURCE_LABELS: Record<string, string> = {
  places: "Lugar",
  "security-incidents": "Hecho de seguridad",
  "road-segments": "Tramo vial",
  "cadastral-properties": "Predio",
  localities: "Localidad",
};

export function entityTitle(resource: string, entity: Record<string, unknown>): string {
  if (resource === "cadastral-properties") return String(entity.address ?? "Predio");
  if (resource === "security-incidents") return String(entity.title ?? "Hecho");
  return String(entity.name ?? "Registro");
}

export function entitySubtitle(resource: string, entity: Record<string, unknown>): string {
  switch (resource) {
    case "places":
      return String(entity.address ?? "");
    case "security-incidents":
      return `${String(entity.kind ?? "")} · ${formatDate(entity.occurredAt)}`;
    case "road-segments":
      return `${String(entity.condition ?? "")} · ${String(entity.status ?? "")}`;
    case "cadastral-properties":
      return `Estrato ${String(entity.stratum ?? "")} · ${String(entity.landUse ?? "")}`;
    default:
      return String(entity.upz ?? "");
  }
}

export function severityColor(value: unknown): string {
  if (value === "alta") return "#FF3B5C";
  if (value === "media") return "#FBBF24";
  return "#22D3EE";
}

export function conditionColor(value: unknown): string {
  if (value === "deteriorado") return "#FF3B5C";
  if (value === "regular") return "#FBBF24";
  return "#A3E635";
}
