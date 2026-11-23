import { titleFieldFor } from "../../lib/admin";
import type { Entity, ResourceName } from "../../lib/types";
import { CategorySelect } from "./CategorySelect";
import { CoordinateFields } from "./CoordinateFields";

interface ResourceFormProps {
  resource: ResourceName;
  editingId: string | null;
  values: Entity;
  onChange: (values: Entity) => void;
  onSubmit: (event: React.FormEvent) => void;
  onCancel: () => void;
}

export function ResourceForm({
  resource,
  editingId,
  values,
  onChange,
  onSubmit,
  onCancel,
}: ResourceFormProps) {
  const titleKey = titleFieldFor(resource);
  const set = (key: string, value: unknown) => onChange({ ...values, [key]: value });

  return (
    <div className="glass p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-white">
          {editingId ? `Editando #${editingId.slice(0, 8)}` : "Nuevo registro"}
        </h2>
        {editingId && (
          <button type="button" onClick={onCancel} className="text-xs text-neon-cyan hover:underline">
            Cancelar edición
          </button>
        )}
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {resource === "places" && (
          <CategorySelect
            value={values.categorySlug}
            onChange={(slug) => set("categorySlug", slug)}
          />
        )}

        <div>
          <label className="label">Nombre / Título / Dirección</label>
          <input
            value={String(values[titleKey] ?? "")}
            onChange={(event) => set(titleKey, event.target.value)}
            required
            className="field"
            placeholder="Nombre del lugar, predio o incidente..."
          />
        </div>

        <CoordinateFields
          lat={values.lat}
          lon={values.lon}
          onLat={(value) => set("lat", value)}
          onLon={(value) => set("lon", value)}
        />

        {titleKey !== "address" && (
          <div>
            <label className="label">Dirección</label>
            <input
              value={String(values.address ?? "")}
              onChange={(event) => set("address", event.target.value)}
              className="field"
              placeholder="Calle 43 Sur..."
            />
          </div>
        )}

        <div>
          <label className="label">Descripción / Observaciones</label>
          <textarea
            value={String(values.description ?? "")}
            onChange={(event) => set("description", event.target.value)}
            className="field min-h-[80px]"
            placeholder="Detalles adicionales del registro..."
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          {editingId ? "Guardar cambios" : "Crear registro"}
        </button>
      </form>
    </div>
  );
}
