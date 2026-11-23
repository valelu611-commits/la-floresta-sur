import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categoryIcon, colorFor } from "../lib/categories";
import { descriptionFor } from "../lib/categoryDescriptions";
import type { Category } from "../lib/types";
import { Badge } from "./Badge";

export function CategoryCard({ category }: { category: Category }) {
  const Icon = categoryIcon(category.slug);
  const color = category.color || colorFor(category.slug);

  return (
    <Link
      to={`/categoria/${category.slug}`}
      className="group glass relative overflow-hidden p-5 transition hover:-translate-y-1 hover:border-white/25"
      style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06)` }}
    >
      <div
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl transition group-hover:scale-125"
        style={{ backgroundColor: `${color}44` }}
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-3">
        <span
          className="grid h-11 w-11 place-items-center rounded-xl"
          style={{ backgroundColor: `${color}22`, color }}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <ArrowUpRight className="h-4 w-4 text-slate-500 transition group-hover:text-white" />
      </div>
      <h3 className="relative mt-4 font-display text-base font-bold text-white">{category.name}</h3>
      <p className="relative mt-1 line-clamp-2 text-xs text-slate-400">
        {category.description || descriptionFor(category.slug)}
      </p>
      <div className="relative mt-4">
        <Badge color={color}>{category.count ?? 0} registros</Badge>
      </div>
    </Link>
  );
}

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
    </div>
  );
}
