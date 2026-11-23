export type ResourceName =
  | "places"
  | "security-incidents"
  | "road-segments"
  | "cadastral-properties"
  | "localities";

export interface Category {
  id?: string;
  slug: string;
  name: string;
  resource: ResourceName;
  color: string;
  icon: string;
  description: string;
  sortOrder?: number;
  count?: number;
}

export interface SearchHit {
  id: string;
  resource: ResourceName;
  title: string;
  subtitle: string;
  categorySlug: string;
  lat: number;
  lon: number;
  meta?: Record<string, string | number>;
}

export interface PageMeta {
  total: number;
  limit: number;
  offset: number;
}

export interface Page<T> {
  data: T[];
  meta: PageMeta;
}

export interface Stats {
  barrio: string;
  center: { lat: number; lon: number };
  totalRecords: number;
  categories: Category[];
}

export interface SearchResponse {
  query: string;
  total: number;
  hits: SearchHit[];
  countsByCategory: Record<string, number>;
}

export interface AgentGroup {
  slug: string;
  name: string;
  color: string;
  items: SearchHit[];
}

export interface AgentAnswer {
  question: string;
  answer: string;
  generatedBy: "rules" | "llm";
  intents: string[];
  groups: AgentGroup[];
  suggestions: string[];
}

export type Entity = Record<string, unknown>;
