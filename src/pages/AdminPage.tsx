import { useState } from "react";
import { AdminSettings } from "../components/admin/AdminSettings";
import { ResourceForm } from "../components/admin/ResourceForm";
import { ResourceList } from "../components/admin/ResourceList";
import { useApi } from "../hooks/useApi";
import { ADMIN_KEY_STORAGE, ADMIN_RESOURCES, DEFAULT_ADMIN_KEY } from "../lib/admin";
import { api } from "../lib/api";
import type { Entity, ResourceName } from "../lib/types";

export function AdminPage() {
  const [adminKey, setAdminKey] = useState(
    () => localStorage.getItem(ADMIN_KEY_STORAGE) ?? DEFAULT_ADMIN_KEY,
  );
  const [resource, setResource] = useState<ResourceName>("places");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [values, setValues] = useState<Entity>({});
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  const page = useApi(() => api.list(resource, { limit: 50 }), [resource]);

  function saveKey(key: string) {
    setAdminKey(key);
    localStorage.setItem(ADMIN_KEY_STORAGE, key);
  }

  function resetForm() {
    setEditingId(null);
    setValues({});
  }

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();
    setMessage(null);
    try {
      if (editingId) {
        await api.update(resource, editingId, values, adminKey);
        setMessage({ type: "ok", text: "Registro actualizado correctamente." });
      } else {
        await api.create(resource, values, adminKey);
        setMessage({ type: "ok", text: "Registro creado correctamente." });
      }
      resetForm();
      page.reload();
    } catch (error) {
      setMessage({ type: "error", text: (error as Error).message });
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("¿Seguro que deseas eliminar este registro?")) return;
    setMessage(null);
    try {
      await api.remove(resource, id, adminKey);
      setMessage({ type: "ok", text: "Registro eliminado." });
      page.reload();
    } catch (error) {
      setMessage({ type: "error", text: (error as Error).message });
    }
  }

  function startEdit(entity: Entity) {
    setEditingId(String(entity.id));
    setValues(entity);
  }
  return (
    <div className="space-y-8">
      <AdminSettings
        adminKey={adminKey}
        onKey={saveKey}
        resource={resource}
        onResource={(value) => {
          setResource(value as ResourceName);
          resetForm();
        }}
        resources={ADMIN_RESOURCES}
        message={message}
      />

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <ResourceForm
          resource={resource}
          editingId={editingId}
          values={values}
          onChange={setValues}
          onSubmit={handleSave}
          onCancel={resetForm}
        />
        <ResourceList
          items={page.data?.data ?? []}
          loading={page.loading}
          error={page.error}
          onRetry={page.reload}
          onEdit={startEdit}
          onDelete={(id) => void handleDelete(id)}
        />
      </div>
    </div>
  );
}
