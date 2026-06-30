import { createFileRoute, Link } from "@tanstack/react-router";
import { useBookmarks } from "@/lib/bookmarks";
import { Bookmark as BookmarkIcon, Trash2 } from "lucide-react";

export const Route = createFileRoute("/bookmarks")({
  head: () => ({
    meta: [
      { title: "Bookmarks — Noor al-Quran" },
      { name: "description", content: "Your saved ayahs from the Holy Quran for easy revisit." },
    ],
  }),
  component: BookmarksPage,
});

function BookmarksPage() {
  const { items, remove } = useBookmarks();
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3">
        <BookmarkIcon className="w-6 h-6 text-primary" />
        <h1 className="text-3xl md:text-4xl font-semibold">Bookmarks</h1>
      </div>
      <p className="text-muted-foreground mt-1">Saved ayahs are kept on this device.</p>

      {items.length === 0 ? (
        <div className="mt-10 ornament-border rounded-2xl p-10 text-center">
          <p className="text-muted-foreground">No bookmarks yet.</p>
          <Link to="/surahs" className="mt-4 inline-block text-primary font-medium hover:underline">
            Browse Surahs →
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {items.map((b) => (
            <li key={b.id} className="rounded-xl border bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <Link
                  to="/surah/$number"
                  params={{ number: String(b.surah) }}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {b.surahName} · Ayah {b.ayah}
                </Link>
                <button
                  onClick={() => remove(b.id)}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="font-arabic text-2xl md:text-3xl text-right mt-3">{b.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
