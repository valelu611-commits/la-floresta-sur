import { FALLBACK_CATEGORIES } from "../../lib/fallback";

export function CategorySelect({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (slug: string) => void;
}) {
  return (
    <div>
      <label className="label">Categoría</label>
      <select
        value={String(value ?? FALLBACK_CATEGORIES[0].slug)}
        onChange={(event) => onChange(event.target.value)}
        className="field"
      >
        {FALLBACK_CATEGORIES.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name} ({cat.slug})
          </option>
        ))}
      </select>
    </div>
  );
}
