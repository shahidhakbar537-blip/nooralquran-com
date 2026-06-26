import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { RECITER, type Ayah, type SurahMeta } from "@/lib/quran";
import { AudioPlayer } from "@/components/audio-player";
import { useState, useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type JuzData = { ayahs: (Ayah & { surah: SurahMeta; audio: string })[] };

const juzQO = (n: number) =>
  queryOptions({
    queryKey: ["juz", n],
    queryFn: async (): Promise<JuzData> => {
      const res = await fetch(`https://api.alquran.cloud/v1/juz/${n}/${RECITER}`);
      if (!res.ok) throw new Error("Failed to load juz");
      const json = await res.json();
      return json.data;
    },
    staleTime: 1000 * 60 * 60,
  });

export const Route = createFileRoute("/juz/$number")({
  loader: ({ context, params }) => {
    const n = parseInt(params.number, 10);
    if (!n || n < 1 || n > 30) throw notFound();
    return context.queryClient.ensureQueryData(juzQO(n));
  },
  head: ({ params }) => ({
    meta: [
      { title: `Juz ${params.number} — Noor al-Quran` },
      { name: "description", content: `Read Juz (Para) ${params.number} of the Holy Quran in Arabic with verse-by-verse audio recitation.` },
    ],
  }),
  notFoundComponent: () => <div className="p-10 text-center text-muted-foreground">Juz not found.</div>,
  component: JuzPage,
});

function JuzPage() {
  const { number } = Route.useParams();
  const n = parseInt(number, 10);
  const { data: juz } = useSuspenseQuery(juzQO(n));
  const [activeIdx, setActiveIdx] = useState(0);

  const tracks = useMemo(
    () => juz.ayahs.map((a) => ({ src: a.audio, label: `${a.surah.englishName} · Ayah ${a.numberInSurah}` })),
    [juz],
  );

  // Group by surah for nicer reading
  const grouped: { surah: SurahMeta; ayahs: typeof juz.ayahs; startIdx: number }[] = [];
  juz.ayahs.forEach((a, idx) => {
    const last = grouped[grouped.length - 1];
    if (last && last.surah.number === a.surah.number) last.ayahs.push(a);
    else grouped.push({ surah: a.surah, ayahs: [a], startIdx: idx });
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-32">
      <div className="ornament-border rounded-2xl p-6 text-center">
        <div className="text-xs uppercase tracking-widest text-gold">Juz / Para</div>
        <h1 className="text-3xl font-semibold mt-1">Juz {n}</h1>
        <div className="text-sm text-muted-foreground mt-1">{juz.ayahs.length} ayahs</div>
      </div>

      {grouped.map((g) => (
        <section key={g.surah.number + "-" + g.startIdx} className="mt-8">
          <div className="flex items-baseline justify-between mb-3">
            <Link to="/surah/$number" params={{ number: String(g.surah.number) }} className="font-semibold hover:text-primary">
              {g.surah.number}. {g.surah.englishName}
            </Link>
            <span className="font-arabic text-xl text-primary">{g.surah.name}</span>
          </div>
          <ol className="space-y-3">
            {g.ayahs.map((a) => {
              const idx = juz.ayahs.indexOf(a);
              return (
                <li
                  key={a.number}
                  onClick={() => setActiveIdx(idx)}
                  className={`p-5 rounded-xl border bg-card cursor-pointer transition-colors ${
                    idx === activeIdx ? "border-gold shadow-sm" : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-1 w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-semibold grid place-items-center">
                      {a.numberInSurah}
                    </div>
                    <p className="font-arabic text-2xl md:text-3xl flex-1 text-right">{a.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}

      <div className="mt-8 flex items-center justify-between">
        {n > 1 ? (
          <Link to="/juz/$number" params={{ number: String(n - 1) }} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Juz {n - 1}
          </Link>
        ) : <span />}
        <Link to="/juz" className="text-sm text-muted-foreground hover:text-foreground">All Juz</Link>
        {n < 30 ? (
          <Link to="/juz/$number" params={{ number: String(n + 1) }} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Juz {n + 1} <ArrowRight className="w-4 h-4" />
          </Link>
        ) : <span />}
      </div>

      <AudioPlayer tracks={tracks} initialIndex={activeIdx} onIndexChange={setActiveIdx} />
    </div>
  );
}
