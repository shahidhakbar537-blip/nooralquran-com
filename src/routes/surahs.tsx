import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { listSurahs } from "@/lib/quran";
import { useState } from "react";
import { Search } from "lucide-react";

const surahsQO = queryOptions({
  queryKey: ["surahs"],
  queryFn: listSurahs,
  staleTime: 1000 * 60 * 60,
});

export const Route = createFileRoute("/surahs")({
  head: () => ({
    meta: [
      { title: "All 114 Surahs — Noor al-Quran" },
      { name: "description", content: "Browse all 114 Surahs of the Holy Quran. Tap any chapter to read in Arabic and listen to recitation." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(surahsQO),
  component: SurahsPage,
});

function SurahsPage() {
  const { data: surahs } = useSuspenseQuery(surahsQO);
  const [q, setQ] = useState("");
  const filtered = surahs.filter((s) => {
    const t = q.toLowerCase();
    return (
      !t ||
      s.englishName.toLowerCase().includes(t) ||
      s.englishNameTranslation.toLowerCase().includes(t) ||
      String(s.number) === t
    );
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold">The 114 Surahs</h1>
          <p className="text-muted-foreground mt-1">Tap a chapter to read and listen.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or number…"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((s) => (
          <li key={s.number}>
            <Link
              to="/surah/$number"
              params={{ number: String(s.number) }}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-gold/50 hover:shadow-sm transition-all"
            >
              <div className="w-11 h-11 shrink-0 grid place-items-center rounded-lg bg-primary/10 text-primary font-semibold">
                {s.number}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="font-semibold truncate">{s.englishName}</div>
                  <div className="font-arabic text-xl text-primary leading-none">{s.name}</div>
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {s.englishNameTranslation} · {s.numberOfAyahs} ayahs · {s.revelationType}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
