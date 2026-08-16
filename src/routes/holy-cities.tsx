import { createFileRoute } from "@tanstack/react-router";
import { useLang, LanguageSwitcher } from "@/lib/i18n";
import { HOLY_CITIES_CONTENT } from "@/content/holy-cities";

export const Route = createFileRoute("/holy-cities")({
  head: () => ({
    meta: [
      { title: "Makkah & Madina — History & Significance" },
      { name: "description", content: "History and significance of the two holy cities of Islam: Makkah al-Mukarramah and Madina al-Munawwarah." },
    ],
  }),
  component: HolyCities,
});

function HolyCities() {
  const { lang } = useLang();
  const c = HOLY_CITIES_CONTENT[lang];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header className="text-center">
        <div className="text-xs uppercase tracking-widest text-gold">{c.eyebrow}</div>
        <h1 className="mt-1 text-3xl md:text-4xl font-semibold">{c.h1}</h1>
        <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">{c.intro}</p>
        <LanguageSwitcher className="mt-4" />
      </header>

      <section className="mt-10">
        <h2 className="font-arabic text-3xl text-primary">مَكَّة المُكَرَّمَة</h2>
        <h3 className="text-2xl font-semibold mt-1">{c.makkahSubtitle}</h3>
        <div className="mt-4 space-y-4">
          {c.makkah.map((s) => (
            <div key={s.title} className="ornament-border rounded-xl p-5">
              <h4 className="font-semibold">{s.title}</h4>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-arabic text-3xl text-primary">المَدِينَة المُنَوَّرَة</h2>
        <h3 className="text-2xl font-semibold mt-1">{c.madinaSubtitle}</h3>
        <div className="mt-4 space-y-4">
          {c.madina.map((s) => (
            <div key={s.title} className="ornament-border rounded-xl p-5">
              <h4 className="font-semibold">{s.title}</h4>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">{c.futureHeading}</h2>
        <p className="text-sm text-muted-foreground mt-1">{c.futureSubtitle}</p>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {c.future.map((f) => (
            <div key={f.place} className="rounded-xl bg-accent/40 p-5">
              <div className="text-xs uppercase tracking-widest text-gold">{f.place}</div>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
