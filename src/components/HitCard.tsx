import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { categoryIcon, colorFor, hitLink, nameFor } from "../lib/categories";
import type { SearchHit } from "../lib/types";
import { Badge } from "./Badge";

export function HitCard({ hit }: { hit: SearchHit }) {
  const Icon = categoryIcon(hit.categorySlug);
  const color = colorFor(hit.categorySlug);

  return (
    <Link
      to={hitLink(hit)}
      className="group glass flex items-start gap-3 p-4 transition hover:-translate-y-0.5 hover:border-white/25"
    >
      <span
        className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl"
        style={{ backgroundColor: `${color}22`, color }}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate font-display text-sm font-bold text-white">{hit.title}</h3>
          <Badge color={color}>{nameFor(hit.categorySlug)}</Badge>
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-slate-400">{hit.subtitle}</p>
        <p className="mt-2 flex items-center gap-1 text-[11px] text-slate-500">
          <MapPin className="h-3 w-3" aria-hidden />
          {hit.lat.toFixed(5)}, {hit.lon.toFixed(5)}
        </p>
      </div>
    </Link>
  );
}
