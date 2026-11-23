import { DEFAULT_ADMIN_KEY } from "../../lib/admin";

interface AdminSettingsProps {
  adminKey: string;
  onKey: (key: string) => void;
  resource: string;
  onResource: (resource: string) => void;
  resources: Array<{ key: string; label: string }>;
  message: { type: "ok" | "error"; text: string } | null;
}

export function AdminSettings({
  adminKey,
  onKey,
  resource,
  onResource,
  resources,
  message,
}: AdminSettingsProps) {
  return (
    <div className="glass p-6 sm:p-8">
      <h1 className="section-title">Administración y CRUD</h1>
      <p className="mt-1 text-sm text-slate-400">
        Gestiona los registros del barrio; la API valida cada cambio con la llave de administrador.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Llave de administrador (x-admin-key)</label>
          <input
            type="password"
            value={adminKey}
            onChange={(event) => onKey(event.target.value)}
            className="field"
            placeholder={DEFAULT_ADMIN_KEY}
          />
        </div>
        <div>
          <label className="label">Recurso activo</label>
          <select
            value={resource}
            onChange={(event) => onResource(event.target.value)}
            className="field"
          >
            {resources.map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {message && (
        <div
          className={`mt-4 rounded-xl p-3 text-sm ${
            message.type === "ok"
              ? "border border-neon-lime/30 bg-neon-lime/15 text-lime-200"
              : "border border-neon-red/30 bg-neon-red/15 text-red-200"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
