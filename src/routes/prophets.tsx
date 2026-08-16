import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { useLang, LanguageSwitcher } from "@/lib/i18n";
import { PROPHETS_CONTENT } from "@/content/prophets";

export const Route = createFileRoute("/prophets")({
  head: () => ({
    meta: [
      { title: "The Prophets (Nabis) — Noor al-Quran" },
      { name: "description", content: "Brief histories of the 25 prophets mentioned by name in the Holy Quran, from Adam to Muhammad ﷺ." },
    ],
  }),
  component: ProphetsPage,
});

function ProphetsPage() {
  const { lang } = useLang();
  const content = PROPHETS_CONTENT[lang];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-primary" />
        <h1 className="text-3xl md:text-4xl font-semibold">{content.heading}</h1>
      </div>
      <p className="text-muted-foreground mt-2 max-w-2xl">{content.intro}</p>
      <LanguageSwitcher className="mt-4" />

      <ol className="mt-8 space-y-4">
        {content.prophets.map((p, i) => (
          <li key={p.name} className="ornament-border rounded-2xl p-6">
            <div className="flex items-baseline justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-gold">
                  {content.prophetLabel} {i + 1}
                </div>
                <h2 className="text-xl md:text-2xl font-semibold mt-1">
                  {p.name}
                  {p.biblical && p.biblical !== p.name && (
                    <span className="text-sm font-normal text-muted-foreground ml-2">({p.biblical})</span>
                  )}
                </h2>
              </div>
              <div className="font-arabic text-3xl text-primary">{p.ar}</div>
            </div>
            <p className="mt-3 leading-relaxed text-foreground/90">{p.story}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
