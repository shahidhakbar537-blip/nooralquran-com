import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/holy-cities")({
  head: () => ({
    meta: [
      { title: "Makkah & Madina — History & Significance" },
      { name: "description", content: "History and significance of the two holy cities of Islam: Makkah al-Mukarramah and Madina al-Munawwarah." },
    ],
  }),
  component: HolyCities,
});

const MAKKAH = [
  {
    title: "Origins with Ibrahim (AS) & Ismail (AS)",
    body: "By Allah's command, Prophet Ibrahim left his wife Hajar and infant son Ismail in the barren valley of Bakkah. The spring of Zamzam gushed forth beneath Ismail's feet after Hajar's search between Safa and Marwa. Later, father and son together raised the foundations of the Kaʿbah — the first house built for the worship of Allah alone.",
  },
  {
    title: "Before Islam",
    body: "Makkah became a major trading and pilgrimage center of Arabia. Over time the Kaʿbah was filled with 360 idols, and the pure monotheism of Ibrahim was forgotten by most of its people.",
  },
  {
    title: "The Prophet ﷺ",
    body: "The Prophet Muhammad ﷺ was born in Makkah in 570 CE. He received the first revelation in the Cave of Hira on Jabal an-Nur at age 40. After 13 years of preaching and persecution, he migrated to Madina (the Hijrah, 622 CE). Makkah was reconquered peacefully in 630 CE and the Kaʿbah was cleansed of idols.",
  },
  {
    title: "Today",
    body: "Masjid al-Haram surrounds the Kaʿbah — the Qiblah toward which all Muslims pray. Millions perform Umrah year-round and Hajj annually. A single prayer in Masjid al-Haram is worth 100,000 prayers elsewhere.",
  },
];

const MADINA = [
  {
    title: "Before the Hijrah",
    body: "Known as Yathrib, the city was home to Arab tribes (Aws and Khazraj) and Jewish tribes. Long-standing tribal conflicts had exhausted its people, who were ready to accept a new message of unity.",
  },
  {
    title: "The Hijrah (622 CE)",
    body: "The Prophet ﷺ migrated from Makkah to Yathrib with Abu Bakr (RA). The city welcomed him and was renamed Madinat an-Nabi — the City of the Prophet. This event marks year 1 of the Islamic Hijri calendar.",
  },
  {
    title: "The First Islamic Society",
    body: "In Madina the Prophet ﷺ built Masjid an-Nabawi, established brotherhood between the Muhajirun (emigrants) and Ansar (helpers), and drafted the Constitution of Madina — the first written charter uniting Muslims, Jews, and other tribes under one polity.",
  },
  {
    title: "Resting Place of the Prophet ﷺ",
    body: "The Prophet ﷺ passed away in Madina in 632 CE and is buried in his mosque alongside Abu Bakr and ʿUmar (RA). A prayer in Masjid an-Nabawi is worth 1,000 prayers elsewhere, and the area between his house and pulpit is called ‘a garden of Paradise’.",
  },
];

const FUTURE = [
  { place: "Makkah", body: "Islamic tradition mentions that in the end times, the Kaʿbah will be visited for Hajj and Umrah until near the Hour. A hadith mentions that toward the very end, a man from Abyssinia (Dhul-Suwayqatayn) will one day dismantle the Kaʿbah stone by stone — after which faith itself will be raised from the earth." },
  { place: "Madina", body: "The Prophet ﷺ said that Madina is protected by angels — the plague and the Dajjal (Antichrist) will not enter it. During the Dajjal's appearance, Madina will tremble and expel every hypocrite. The Dajjal will be stopped at its outskirts and later killed by ʿIsa (Jesus, AS) at the gate of Ludd." },
];

function HolyCities() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header className="text-center">
        <div className="text-xs uppercase tracking-widest text-gold">The Two Holy Cities</div>
        <h1 className="mt-1 text-3xl md:text-4xl font-semibold">Makkah & Madina</h1>
        <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
          The history and significance of the holiest cities in Islam — the birthplace of the Prophet ﷺ and the city that welcomed him.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="font-arabic text-3xl text-primary">مَكَّة المُكَرَّمَة</h2>
        <h3 className="text-2xl font-semibold mt-1">Makkah al-Mukarramah</h3>
        <div className="mt-4 space-y-4">
          {MAKKAH.map((s) => (
            <div key={s.title} className="ornament-border rounded-xl p-5">
              <h4 className="font-semibold">{s.title}</h4>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-arabic text-3xl text-primary">المَدِينَة المُنَوَّرَة</h2>
        <h3 className="text-2xl font-semibold mt-1">Madina al-Munawwarah</h3>
        <div className="mt-4 space-y-4">
          {MADINA.map((s) => (
            <div key={s.title} className="ornament-border rounded-xl p-5">
              <h4 className="font-semibold">{s.title}</h4>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Signs of the End Times</h2>
        <p className="text-sm text-muted-foreground mt-1">From authentic ahadith about the future of the two holy cities.</p>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {FUTURE.map((f) => (
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
