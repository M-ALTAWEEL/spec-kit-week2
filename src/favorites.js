export const STORAGE_KEY = "qotd:favorites";

/** Read favorite ids from storage; any problem means "no favorites". */
function load(storage) {
  try {
    const parsed = JSON.parse(storage?.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

/** Try to save; if storage is blocked or full, favorites live in memory for this visit. */
function save(storage, ids) {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // Intentionally ignored (Constitution IV, FR-005).
  }
}

/**
 * @param {{getItem(k: string): string|null, setItem(k: string, v: string): void} | null} storage
 */
export function createFavoritesStore(storage) {
  const ids = new Set(load(storage));
  return {
    has: (id) => ids.has(id),
    toggle(id) {
      if (ids.has(id)) ids.delete(id);
      else ids.add(id);
      save(storage, ids);
      return ids.has(id);
    },
  };
}
