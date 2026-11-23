import {
  BadgeCheck,
  BookOpen,
  Building2,
  Bus,
  Camera,
  Construction,
  GraduationCap,
  Map,
  PawPrint,
  Shield,
  Trees,
  Trophy,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import type { ResourceName, SearchHit } from "./types";

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  seguridad: Shield,
  "malla-vial": Construction,
  catastral: Building2,
  librerias: BookOpen,
  cai: BadgeCheck,
  camaras: Camera,
  comida: Utensils,
  veterinarias: PawPrint,
  localidad: Map,
  "zonas-verdes": Trees,
  transporte: Bus,
  deportes: Trophy,
  educacion: GraduationCap,
};

export const CATEGORY_COLORS: Record<string, string> = {
  seguridad: "#FF3B5C",
  "malla-vial": "#FFB020",
  catastral: "#22D3EE",
  librerias: "#A855F7",
  cai: "#3B82F6",
  camaras: "#64748B",
  comida: "#F97316",
  veterinarias: "#10B981",
  localidad: "#EAB308",
  "zonas-verdes": "#84CC16",
  transporte: "#06B6D4",
  deportes: "#F43F5E",
  educacion: "#8B5CF6",
};

export const CATEGORY_NAMES: Record<string, string> = {
  seguridad: "Robos y seguridad",
  "malla-vial": "Estado de calles",
  catastral: "Datos catastrales",
  librerias: "Librerias",
  cai: "CAI",
  camaras: "Camaras",
  comida: "Comida",
  veterinarias: "Veterinarias",
  localidad: "Localidad",
  "zonas-verdes": "Zonas verdes",
  transporte: "Transporte",
  deportes: "Deportes",
  educacion: "Educacion",
};

export const RESOURCE_OF: Record<string, ResourceName> = {
  seguridad: "security-incidents",
  "malla-vial": "road-segments",
  catastral: "cadastral-properties",
  localidad: "localities",
};

export function categoryIcon(slug: string): LucideIcon {
  return CATEGORY_ICONS[slug] ?? Map;
}

export function colorFor(slug: string): string {
  return CATEGORY_COLORS[slug] ?? "#22D3EE";
}

export function nameFor(slug: string): string {
  return CATEGORY_NAMES[slug] ?? slug;
}

export function resourceFor(slug: string): ResourceName {
  return RESOURCE_OF[slug] ?? "places";
}

export function hitLink(hit: SearchHit): string {
  return `/detalle/${hit.resource}/${hit.id}`;
}


