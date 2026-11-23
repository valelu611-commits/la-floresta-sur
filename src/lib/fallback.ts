import { CATEGORY_NAMES, colorFor, resourceFor } from "./categories";
import type { Category } from "./types";

/** Respaldo offline si /categories falla o tarda. */
export const FALLBACK_CATEGORIES: Category[] = Object.keys(CATEGORY_NAMES).map((slug, index) => ({
  slug,
  name: CATEGORY_NAMES[slug],
  resource: resourceFor(slug),
  color: colorFor(slug),
  icon: slug,
  description: "",
  sortOrder: index + 1,
}));
