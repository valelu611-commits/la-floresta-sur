import { useState } from "react";
import { ADMIN_KEY_STORAGE, DEFAULT_ADMIN_KEY } from "../lib/admin";

/** Llave de administrador persistida en localStorage. */
export function useAdminKey() {
  const [adminKey, setAdminKey] = useState(
    () => localStorage.getItem(ADMIN_KEY_STORAGE) ?? DEFAULT_ADMIN_KEY,
  );

  function saveKey(key: string) {
    setAdminKey(key);
    localStorage.setItem(ADMIN_KEY_STORAGE, key);
  }

  return { adminKey, saveKey };
}
