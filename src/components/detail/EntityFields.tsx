import { displayValue, humanizeKey } from "../../lib/entities";

export function EntityFields({ entity }: { entity: Record<string, unknown> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Object.entries(entity).map(([key, value]) => {
        if (key === "id" || key === "lat" || key === "lon") return null;
        return (
          <div key={key} className="rounded-xl border border-white/5 bg-ink/50 p-3">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">{humanizeKey(key)}</p>
            <p className="mt-1 text-sm font-semibold text-white">{displayValue(value)}</p>
          </div>
        );
      })}
    </div>
  );
}
