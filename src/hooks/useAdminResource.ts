import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ADMIN_RESOURCES } from "../lib/admin";
import { api } from "../lib/api";
import type { Entity, ResourceName } from "../lib/types";
import { useAdminKey } from "./useAdminKey";
import { useApi } from "./useApi";
import { useEntityPrefill } from "./useEntityPrefill";

export interface AdminMessage {
  type: "ok" | "error";
  text: string;
}

function initialResource(param: string | null): ResourceName {
  const match = ADMIN_RESOURCES.find((item) => item.key === param);
  return match ? match.key : "places";
}

/** Estado y acciones del panel CRUD, incluido el enlace profundo ?resource=...&edit=... */
export function useAdminResource() {
  const [params] = useSearchParams();
  const editParam = params.get("edit");

  const { adminKey, saveKey } = useAdminKey();
  const [resource, setResource] = useState<ResourceName>(() =>
    initialResource(params.get("resource")),
  );
  const [editingId, setEditingId] = useState<string | null>(editParam);
  const { values, setValues } = useEntityPrefill(
    initialResource(params.get("resource")),
    editParam,
  );
  const [message, setMessage] = useState<AdminMessage | null>(null);

  const page = useApi(() => api.list(resource, { limit: 50 }), [resource]);

  function reset() {
    setEditingId(null);
    setValues({});
  }

  function changeResource(next: ResourceName) {
    setResource(next);
    reset();
  }

  async function save(event: React.FormEvent) {
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
      reset();
      page.reload();
    } catch (error) {
      setMessage({ type: "error", text: (error as Error).message });
    }
  }

  async function remove(id: string) {
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

  function edit(entity: Entity) {
    setEditingId(String(entity.id));
    setValues(entity);
  }

  return {
    adminKey,
    saveKey,
    resource,
    changeResource,
    editingId,
    values,
    setValues,
    message,
    page,
    save,
    remove,
    edit,
    reset,
  };
}
