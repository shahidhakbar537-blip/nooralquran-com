import { createFileRoute } from "@tanstack/react-router";
import qiyam from "@/assets/pray-1-qiyam.jpg";
import ruku from "@/assets/pray-2-ruku.jpg";
import sujud from "@/assets/pray-3-sujud.jpg";
import tashahhud from "@/assets/pray-4-tashahhud.jpg";

export const Route = createFileRoute("/how-to-pray")({
  head: () => ({
    meta: [
      { title: "How to Pray Salah — Step by Step Guide" },
      { name: "description", content: "A simple step-by-step guide to performing Salah (Islamic prayer), including Qiyam, Ruku, Sujud, and Tashahhud with illustrations." },
    ],
  }),
  component: HowToPray,
});

const STEPS = [
  {
    img: qiyam,
    title: "1. Qiyam — Standing & Takbir",
    arabic: "ٱللَّهُ أَكْبَر",
    transliteration: "Allāhu Akbar",
    meaning: "Allah is the Greatest",
    body: "Face the Qiblah, make the intention (niyyah) in your heart for the prayer, raise both hands to your ears and say Allāhu Akbar. Then place your right hand over your left on your chest. Recite Surah Al-Fatiha, followed by any other Surah (e.g. Al-Ikhlas).",
  },
  {
    img: ruku,
    title: "2. Ruku — Bowing",
    arabic: "سُبْحَانَ رَبِّيَ ٱلْعَظِيمِ",
    transliteration: "Subḥāna Rabbiyal-ʿAẓīm",
    meaning: "Glory be to my Lord, the Most Great",
    body: "Say Allāhu Akbar and bow down, placing your hands on your knees with your back straight and parallel to the ground. Recite the tasbeeh three times. Then rise saying ‘Samiʿa Allāhu liman ḥamidah, Rabbanā wa laka al-ḥamd’.",
  },
  {
    img: sujud,
    title: "3. Sujud — Prostration",
    arabic: "سُبْحَانَ رَبِّيَ ٱلْأَعْلَىٰ",
    transliteration: "Subḥāna Rabbiyal-Aʿlā",
    meaning: "Glory be to my Lord, the Most High",
    body: "Say Allāhu Akbar and go down into prostration so that seven parts touch the ground: forehead and nose, both palms, both knees, and the toes of both feet. Recite the tasbeeh three times. Sit briefly between the two prostrations, then prostrate a second time.",
  },
  {
    img: tashahhud,
    title: "4. Tashahhud & Tasleem",
    arabic: "ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّهِ",
    transliteration: "As-salāmu ʿalaykum wa raḥmatullāh",
    meaning: "Peace and the mercy of Allah be upon you",
    body: "After the final prostration of the last rakʿah, sit and recite the Tashahhud, followed by sending blessings on the Prophet ﷺ (Allāhumma ṣalli ʿalā Muḥammad…). To end the prayer, turn your head to the right and then to the left, saying the tasleem each time.",
  },
];

const RAKAT = [
  ["Fajr", "2", "Before sunrise"],
  ["Dhuhr", "4", "After midday"],
  ["Asr", "4", "Late afternoon"],
  ["Maghrib", "3", "Just after sunset"],
  ["Isha", "4", "After twilight"],
];

function HowToPray() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header className="text-center">
        <div className="text-xs uppercase tracking-widest text-gold">Salah</div>
        <h1 className="mt-1 text-3xl md:text-4xl font-semibold">How to Pray</h1>
        <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
          A simple visual guide to performing the five daily prayers. Before
          beginning, make sure you have performed wudu (ablution) and are facing
          the Qiblah.
        </p>
      </header>

      {/* Daily prayers table */}
      <div className="mt-8 ornament-border rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-3">The Five Daily Prayers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {RAKAT.map(([name, r, when]) => (
            <div key={name} className="rounded-lg bg-accent/40 p-3 text-center">
              <div className="text-sm font-semibold">{name}</div>
              <div className="text-2xl font-bold text-primary mt-0.5">{r}</div>
              <div className="text-[11px] text-muted-foreground">rakʿah</div>
              <div className="text-[11px] text-muted-foreground mt-1">{when}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <ol className="mt-10 space-y-8">
        {STEPS.map((s, i) => (
          <li key={s.title} className="ornament-border rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-0">
              <div className="bg-accent/30 grid place-items-center p-4">
                <img
                  src={s.img}
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
        For a complete prayer (e.g. Dhuhr = 4 rakʿahs), repeat the cycle of standing,
        bowing, and prostration the required number of times, then finish with the
        final Tashahhud and Tasleem.
      </div>
    </div>
  );
}
