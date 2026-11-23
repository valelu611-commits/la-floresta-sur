import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { Entity, ResourceName } from "../lib/types";

/** Carga el registro indicado en el enlace profundo para precargar el formulario. */
export function useEntityPrefill(resource: ResourceName, initialId: string | null) {
  const [values, setValues] = useState<Entity>({});

  useEffect(() => {
    if (!initialId) return;
    let alive = true;
    api
      .get(resource, initialId)
      .then((response) => {
        if (alive) setValues(response.data);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { values, setValues };
}
