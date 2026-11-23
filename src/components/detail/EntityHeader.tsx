import { categoryIcon } from "../../lib/categories";

interface EntityHeaderProps {
  color: string;
  resourceLabel: string;
  categoryName: string;
  title: string;
  subtitle: string;
  categorySlug: string;
}

export function EntityHeader({
  color,
  resourceLabel,
  categoryName,
  title,
  subtitle,
  categorySlug,
}: EntityHeaderProps) {
  const Icon = categoryIcon(categorySlug);

  return (
    <div className="flex items-start gap-4">
      <span
        className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
        style={{ backgroundColor: `${color}22`, color }}
      >
        <Icon className="h-7 w-7" />
      </span>
      <div>
        <span className="chip border-white/10 bg-white/5 text-slate-300">
          {resourceLabel} · {categoryName}
        </span>
        <h1 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}
