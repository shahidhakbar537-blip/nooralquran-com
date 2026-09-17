import { createFileRoute } from "@tanstack/react-router";
import qiyam from "@/assets/pray-1-qiyam.jpg";
import ruku from "@/assets/pray-2-ruku.jpg";
import sujud from "@/assets/pray-3-sujud.jpg";
import tashahhud from "@/assets/pray-4-tashahhud.jpg";
import { useLang, LanguageSwitcher } from "@/lib/i18n";
import { HOW_TO_PRAY_CONTENT } from "@/content/how-to-pray";

export const Route = createFileRoute("/how-to-pray")({
  head: () => ({
    meta: [
      { title: "How to Pray Salah — Step by Step Guide" },
      { name: "description", content: "A simple step-by-step guide to performing Salah (Islamic prayer), including Qiyam, Ruku, Sujud, and Tashahhud with illustrations." },
    ],
  }),
  component: HowToPray,
});

const STEP_IMAGES = [qiyam, ruku, sujud, tashahhud];

function HowToPray() {
  const { lang } = useLang();
  const content = HOW_TO_PRAY_CONTENT[lang];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header className="text-center">
        <div className="text-xs uppercase tracking-widest text-gold">{content.eyebrow}</div>
        <h1 className="mt-1 text-3xl md:text-4xl font-semibold">{content.h1}</h1>
        <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
          {content.intro}
        </p>
        <LanguageSwitcher className="mt-4" />
      </header>

      {/* Daily prayers table */}
      <div className="mt-8 ornament-border rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-3">{content.fiveDailyPrayers}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {content.rakat.map(([name, r, when]) => (
            <div key={name} className="rounded-lg bg-accent/40 p-3 text-center">
              <div className="text-sm font-semibold">{name}</div>
              <div className="text-2xl font-bold text-primary mt-0.5">{r}</div>
               <div className="text-[11px] text-muted-foreground">{content.rakahLabel}</div>
               <div className="text-[11px] text-muted-foreground mt-1">{when}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <ol className="mt-10 space-y-8">
        {content.steps.map((s, i) => (
          <li key={s.title} className="ornament-border rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-0">
              <div className="bg-accent/30 grid place-items-center p-4">
                <img
                  src={STEP_IMAGES[i]}
                  alt={s.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  width={768}
                  height={768}
                  className="w-full max-w-xs aspect-square object-contain rounded-lg"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{s.title}</h3>
                 <p className="mt-3 text-sm leading-relaxed text-foreground/80">{s.body}</p>
                <div className="mt-5 rounded-lg border border-border bg-card p-4">
                  <div className="font-arabic text-2xl text-primary text-right">{s.arabic}</div>
                   <div className="text-sm italic mt-2">{s.transliteration}</div>
                   <div className="text-xs text-muted-foreground">{s.meaning}</div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

       <div className="mt-10 text-center text-sm text-muted-foreground">
        {content.closingNote}
      </div>
    </div>
  );
}
