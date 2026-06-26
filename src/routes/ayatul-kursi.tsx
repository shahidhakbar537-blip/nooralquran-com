import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { getAyah } from "@/lib/quran";
import { AudioPlayer } from "@/components/audio-player";

const ayahQO = queryOptions({
  queryKey: ["ayah", "2:255"],
  queryFn: () => getAyah("2:255"),
  staleTime: 1000 * 60 * 60,
});

export const Route = createFileRoute("/ayatul-kursi")({
  head: () => ({
    meta: [
      { title: "Ayatul Kursi — The Throne Verse" },
      { name: "description", content: "Read and listen to Ayatul Kursi (Quran 2:255), the most powerful verse for daily protection, recited by Abdul Basit Abdul Samad." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(ayahQO),
  component: AyatulKursi,
});

function AyatulKursi() {
  const { data: ayah } = useSuspenseQuery(ayahQO);
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 pb-32">
      <div className="text-center">
        <div className="text-xs uppercase tracking-widest text-gold">Quran 2:255</div>
        <h1 className="text-3xl md:text-4xl font-semibold mt-1">Ayatul Kursi</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto italic">
          “The Throne Verse” — recited daily for protection and remembrance of Allah's
          greatness. Whoever recites it after every prayer, nothing prevents him from
          entering Paradise except death.
        </p>
      </div>

      <div className="ornament-border rounded-2xl p-8 mt-8 text-center">
        <p className="font-arabic text-3xl md:text-4xl leading-loose text-foreground">
          {ayah.text}
        </p>
      </div>

      <p className="mt-6 text-center text-muted-foreground text-sm">
        Surah Al-Baqarah ({ayah.surah.englishName}) · Ayah 255
      </p>

      <AudioPlayer tracks={[{ src: ayah.audio!, label: "Ayatul Kursi · 2:255" }]} />
    </div>
  );
}
