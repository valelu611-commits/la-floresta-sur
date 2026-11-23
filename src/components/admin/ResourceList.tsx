import { entityLabel } from "../../lib/admin";
import type { Entity } from "../../lib/types";
import { ErrorState, Loading } from "../States";

interface ResourceListProps {
  items: Entity[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onEdit: (entity: Entity) => void;
  onDelete: (id: string) => void;
}

export function ResourceList({
  items,
  loading,
  error,
  onRetry,
  onEdit,
  onDelete,
}: ResourceListProps) {
  return (
    <div className="glass p-6">
      <h2 className="mb-4 font-display text-lg font-bold text-white">
        Registros existentes ({items.length})
      </h2>
      {loading && <Loading />}
      {error && <ErrorState message={error} onRetry={onRetry} />}

      {!loading && !error && (
        <div className="max-h-[500px] space-y-2 overflow-y-auto pr-1">
          {items.map((item) => {
            const id = String(item.id ?? "");
            return (
              <div
                key={id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-ink/50 p-3 text-sm"
              >
                <div className="min-w-0 flex-1 pr-2">
                  <p className="truncate font-semibold text-white">{entityLabel(item, id)}</p>
                  <p className="text-[11px] text-slate-400">
                    ID: {id.slice(0, 8)}... · Lat/Lon: {Number(item.lat ?? 0).toFixed(4)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className="btn-ghost !px-2.5 !py-1 text-xs"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(id)}
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs text-red-300 hover:bg-red-500/20"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
