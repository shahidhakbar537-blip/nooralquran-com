import { useCallback, useEffect, useState } from "react";

export type Bookmark = {
  id: string; // `${surah}:${ayah}`
  surah: number;
  ayah: number;
  surahName: string;
  text: string;
  createdAt: number;
};

const KEY = "noor-bookmarks-v1";

function read(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(list: Bookmark[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("bookmarks-changed"));
}

export function useBookmarks() {
  const [items, setItems] = useState<Bookmark[]>([]);
  useEffect(() => {
    setItems(read());
    const h = () => setItems(read());
    window.addEventListener("bookmarks-changed", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("bookmarks-changed", h);
      window.removeEventListener("storage", h);
    };
  }, []);

  const toggle = useCallback((b: Omit<Bookmark, "createdAt">) => {
    const list = read();
    const idx = list.findIndex((x) => x.id === b.id);
    if (idx >= 0) list.splice(idx, 1);
    else list.unshift({ ...b, createdAt: Date.now() });
    write(list);
  }, []);

  const remove = useCallback((id: string) => {
    write(read().filter((x) => x.id !== id));
  }, []);

  const has = useCallback((id: string) => items.some((x) => x.id === id), [items]);

  return { items, toggle, remove, has };
}
