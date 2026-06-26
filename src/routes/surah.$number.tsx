import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { getSurahAudio } from "@/lib/quran";
import { AudioPlayer } from "@/components/audio-player";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const surahQO = (n: number) =>
  queryOptions({
    queryKey: ["surah", n],
    queryFn: () => getSurahAudio(n),
    staleTime: 1000 * 60 * 60,
  });

export const Route = createFileRoute("/surah/$number")({
  loader: ({ context, params }) => {
    const n = parseInt(params.number, 10);
    if (!n || n < 1 || n > 114) throw notFound();
    return context.queryClient.ensureQueryData(surahQO(n));
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Surah ${loaderData?.englishName ?? ""} — Read & Listen` },
      { name: "description", content: `Read Surah ${loaderData?.englishName ?? ""} (${loaderData?.englishNameTranslation ?? ""}) in Arabic with audio recitation by Abdul Basit Abdul Samad.` },
    ],
  }),
  notFoundComponent: () => (
    <div className="p-10 text-center text-muted-foreground">Surah not found.</div>
  ),
  component: SurahPage,
});

function SurahPage() {
  const { number } = Route.useParams();
  const n = parseInt(number, 10);
  const { data: surah } = useSuspenseQuery(surahQO(n));
  const [activeIdx, setActiveIdx] = useState(0);

  const tracks = surah.ayahs.map((a) => ({
    src: a.audio!,
    label: `${surah.englishName} · Ayah ${a.numberInSurah}`,
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-32">
      {/* Header card */}
      <div className="ornament-border rounded-2xl p-6 text-center">
        <div className="text-xs uppercase tracking-widest text-gold">Surah {surah.number}</div>
        <h1 className="mt-1 text-2xl font-semibold">{surah.englishName}</h1>
        <div className="font-arabic text-4xl text-primary mt-2">{surah.name}</div>
        <div className="text-sm text-muted-foreground mt-1">
          {surah.englishNameTranslation} · {surah.numberOfAyahs} ayahs · {surah.revelationType}
        </div>
        {surah.number !== 1 && surah.number !== 9 && (
          <div className="font-arabic text-2xl text-foreground mt-5">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
        )}
      </div>

      {/* Ayahs */}
      <ol className="mt-6 space-y-3">
        {surah.ayahs.map((a, i) => {
          const text = surah.number !== 1 && i === 0
            ? a.text.replace(/^بِسْمِ\s*ٱ?للَّهِ\s*ٱ?لرَّحْمَٰ?نِ\s*ٱ?لرَّحِيمِ\s*/u, "")
            : a.text;
          return (
            <li
              key={a.number}
              onClick={() => setActiveIdx(i)}
              className={`p-5 rounded-xl border bg-card cursor-pointer transition-colors ${
                i === activeIdx ? "border-gold shadow-sm" : "border-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-1 w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-semibold grid place-items-center">
                  {a.numberInSurah}
                </div>
                <p className="font-arabic text-2xl md:text-3xl text-foreground flex-1 text-right">
                  {text}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Surah nav */}
      <div className="mt-8 flex items-center justify-between">
        {n > 1 ? (
          <Link to="/surah/$number" params={{ number: String(n - 1) }} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Previous
          </Link>
        ) : <span />}
        <Link to="/surahs" className="text-sm text-muted-foreground hover:text-foreground">All Surahs</Link>
        {n < 114 ? (
          <Link to="/surah/$number" params={{ number: String(n + 1) }} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Next <ArrowRight className="w-4 h-4" />
          </Link>
        ) : <span />}
      </div>

      <AudioPlayer tracks={tracks} initialIndex={activeIdx} onIndexChange={setActiveIdx} />
    </div>
  );
}
