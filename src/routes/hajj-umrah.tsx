import { createFileRoute } from "@tanstack/react-router";
import { useLang, LanguageSwitcher } from "@/lib/i18n";
import { HAJJ_UMRAH_CONTENT } from "@/content/hajj-umrah";

export const Route = createFileRoute("/hajj-umrah")({
  head: () => ({
    meta: [
      { title: "Hajj & Umrah — Complete Guide, Steps & Preparation" },
      { name: "description", content: "How to prepare for and perform Umrah and Hajj step by step: ihram, tawaf, sa'i, Arafah, Muzdalifah, Mina, and the rites of the pilgrimage." },
    ],
  }),
  component: HajjUmrah,
});

function HajjUmrah() {
  const { lang } = useLang();
  const c = HAJJ_UMRAH_CONTENT[lang];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header className="text-center">
        <div className="text-xs uppercase tracking-widest text-gold">{c.kicker}</div>
        <h1 className="mt-1 text-3xl md:text-4xl font-semibold">{c.title}</h1>
        <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
          {c.intro}
        </p>
        <LanguageSwitcher className="mt-4" />
      </header>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">{c.prepareHeading}</h2>
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          {c.prepare.map((p) => (
            <div key={p.t} className="ornament-border rounded-xl p-4">
              <div className="font-semibold text-sm">{p.t}</div>
              <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">{c.umrahHeading}</h2>
        <p className="text-sm text-muted-foreground mt-1">{c.umrahSubtitle}</p>
        <ol className="mt-4 space-y-3">
          {c.umrah.map((s) => (
            <li key={s.t} className="rounded-xl border border-border bg-card p-4">
              <div className="font-semibold">{s.t}</div>
              <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">{c.hajjHeading}</h2>
        <p className="text-sm text-muted-foreground mt-1">{c.hajjSubtitle}</p>
        <div className="mt-4 space-y-4">
          {c.hajj.map((d) => (
            <div key={d.day} className="ornament-border rounded-xl p-5">
              <div className="text-xs uppercase tracking-widest text-gold">{d.day}</div>
              <ul className="mt-3 space-y-2 text-sm text-foreground/80 leading-relaxed list-disc pl-5">
                {d.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">{c.experienceHeading}</h2>
        <div className="mt-4 grid md:grid-cols-3 gap-3">
          {c.experience.map((e) => (
            <div key={e.t} className="rounded-xl bg-accent/40 p-4">
              <div className="font-semibold text-sm">{e.t}</div>
              <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed">{e.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 text-center font-arabic text-2xl text-primary">تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُم</div>
      <div className="text-center text-sm text-muted-foreground mt-1">{c.duaCaption}</div>
    </div>
  );
}
