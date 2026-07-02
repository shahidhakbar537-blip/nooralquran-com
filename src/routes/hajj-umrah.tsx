import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/hajj-umrah")({
  head: () => ({
    meta: [
      { title: "Hajj & Umrah — Complete Guide, Steps & Preparation" },
      { name: "description", content: "How to prepare for and perform Umrah and Hajj step by step: ihram, tawaf, sa'i, Arafah, Muzdalifah, Mina, and the rites of the pilgrimage." },
    ],
  }),
  component: HajjUmrah,
});

const PREPARE = [
  { t: "Sincere intention (Niyyah)", d: "Perform Hajj/Umrah only for Allah's pleasure, not for show. Repent from all sins, seek forgiveness from people you have wronged, and settle debts where possible." },
  { t: "Halal provisions", d: "Fund your pilgrimage from lawful earnings. Set aside enough halal money for your family while you are away." },
  { t: "Learn the rites", d: "Study the fiqh of Hajj/Umrah before you travel — the pillars (arkān), obligations (wājibāt), and things that break the ihram. Take a small trusted guidebook with you." },
  { t: "Physical & health preparation", d: "Walk daily for weeks before travel — Tawaf, Saʿi, and walking between Mina/Arafah/Muzdalifah demand stamina. Take required vaccinations (meningitis is mandatory for Hajj) and pack essential medicines." },
  { t: "Documents & logistics", d: "Valid passport, Hajj/Umrah visa, vaccination certificate, flight and hotel bookings, and travel insurance. Keep digital copies." },
  { t: "What to pack", d: "Two sets of ihram for men, modest loose clothing for women, unscented soap, comfortable sandals (no covered heels for men in ihram), a small prayer mat, water bottle, and a waist pouch for essentials." },
  { t: "Spiritual preparation", d: "Increase in dhikr, Quran, and voluntary prayers. Ask family and friends for forgiveness. Learn key duʿās for Tawaf, Saʿi, Arafah, and drinking Zamzam." },
];

const UMRAH = [
  { t: "1. Enter Ihram at the Miqat", d: "Perform ghusl, wear the two white sheets (men) or modest clothing (women). Pray two rakʿahs and make the intention: ‘Labbayk Allāhumma ʿumrah’. Begin the Talbiyah: ‘Labbayk Allāhumma labbayk…’ and recite it often until you begin Tawaf." },
  { t: "2. Enter Masjid al-Haram", d: "Enter with the right foot reciting the duʿā of entering the mosque. Approach the Kaʿbah, uncover the right shoulder (idtibāʿ) for men and stop the Talbiyah." },
  { t: "3. Tawaf (7 circuits)", d: "Begin from the Black Stone corner. Face it, say ‘Bismillāh, Allāhu Akbar’ and (if possible) point toward it. Walk anti-clockwise around the Kaʿbah 7 times. Men do ramal (brisk pace) in the first 3 circuits. Make duʿā throughout; between the Yemeni Corner and Black Stone recite ‘Rabbanā ātinā fid-dunyā ḥasanah…’." },
  { t: "4. Two rakʿahs behind Maqam Ibrahim", d: "After Tawaf, cover both shoulders, pray 2 short rakʿahs behind (or anywhere in) the Haram — Surah Al-Kafirun in the first, Al-Ikhlas in the second. Then drink Zamzam water." },
  { t: "5. Saʿi between Safa & Marwa", d: "Go to Safa, face the Kaʿbah, recite ‘Inna aṣ-Ṣafā wal-Marwa min shaʿā’irillāh…’ and say Allāhu Akbar 3 times with duʿā. Walk to Marwa (men jog between the green lights). This counts as 1. Complete 7 trips, ending at Marwa." },
  { t: "6. Halq or Taqsir", d: "Men shave the head (halq — preferred) or trim all hair evenly (taqsir). Women cut a fingertip's length from the ends of their hair. With this, ihram ends and Umrah is complete." },
];

const HAJJ = [
  { day: "8 Dhul-Hijjah — Yawm at-Tarwiyah", steps: [
    "Enter ihram from your accommodation with the intention for Hajj: ‘Labbayk Allāhumma ḥajj’.",
    "Travel to Mina before Dhuhr. Pray Dhuhr, ʿAsr, Maghrib, ʿIsha, and Fajr of the 9th in Mina — each fard prayer shortened (qasr) to 2 rakʿahs, but not combined.",
    "Spend the night in Mina in worship.",
  ]},
  { day: "9 Dhul-Hijjah — Yawm ʿArafah (the day of Hajj)", steps: [
    "After sunrise, proceed to Arafah. Listen to the khutbah at Masjid Namirah if possible.",
    "Pray Dhuhr and ʿAsr combined and shortened at the time of Dhuhr.",
    "Stand in Arafah (wuquf) from Dhuhr until sunset — the greatest pillar of Hajj. Face the Qiblah, raise your hands, and make continuous duʿā, dhikr, and istighfar. The best duʿā: ‘Lā ilāha illa Allāh waḥdahu lā sharīka lah, lahu al-mulk wa lahu al-ḥamd, wa huwa ʿalā kulli shay’in qadīr’.",
    "After sunset, leave for Muzdalifah without praying Maghrib in Arafah.",
  ]},
  { day: "Night of 10 Dhul-Hijjah — Muzdalifah", steps: [
    "On arrival at Muzdalifah, pray Maghrib and ʿIsha combined (Maghrib 3, ʿIsha 2 rakʿahs).",
    "Sleep under the open sky. Collect 7 (or up to 70) small pebbles for the Jamarat.",
    "Pray Fajr early on the 10th, make duʿā at Mashʿar al-Haram, then depart for Mina before sunrise.",
  ]},
  { day: "10 Dhul-Hijjah — Yawm an-Nahr (day of sacrifice, ʿEid)", steps: [
    "In Mina, pelt Jamrat al-ʿAqabah (the largest pillar) with 7 pebbles, saying Allāhu Akbar with each throw. Stop the Talbiyah with the first pebble.",
    "Slaughter the sacrificial animal (hady) — most pilgrims pay a coupon and the meat is distributed.",
    "Men shave the head (halq) or trim (taqsir); women trim a fingertip's length. Now the first stage of ihram ends — everything is lawful except intimacy.",
    "Travel to Makkah and perform Tawaf al-Ifadah (7 circuits) and Saʿi (7 trips) — a pillar of Hajj. After this Tawaf, full ihram ends including intimacy.",
    "Return to Mina to spend the night.",
  ]},
  { day: "11, 12 (and optionally 13) Dhul-Hijjah — Ayyam at-Tashriq", steps: [
    "Stay in Mina. Each day after Dhuhr, pelt all three Jamarat in order — small, middle, then large — with 7 pebbles each, making duʿā after the small and middle Jamarah.",
    "If leaving on the 12th, depart Mina before sunset (nafr awwal). Otherwise stay and complete the pelting on the 13th (nafr thānī).",
  ]},
  { day: "Before leaving Makkah — Tawaf al-Wadaʿ", steps: [
    "Perform the Farewell Tawaf (7 circuits) as your last act in Masjid al-Haram. This is required for everyone except menstruating women.",
    "Leave the Haram walking backward is not from the Sunnah — simply leave with humility and gratitude.",
  ]},
];

const EXPERIENCE = [
  { t: "Crowds & patience", d: "Millions perform these rites together. Expect long walks, waiting, heat, and pushing. Guard your tongue — no arguing, no harsh words. Allah says: ‘…there is no rafath, no fusuq, no jidal in Hajj.’" },
  { t: "Emotion", d: "First sight of the Kaʿbah, standing on Arafah, drinking Zamzam, praying in the Rawdah — these are among the most moving experiences of a believer's life. Make sincere duʿā; these are times when duʿās are answered." },
  { t: "Forgiveness", d: "The Prophet ﷺ said: ‘Whoever performs Hajj for Allah and does not commit rafath or fusuq returns as free from sin as the day his mother bore him.’ An accepted Hajj (Hajj Mabrūr) has no reward less than Paradise." },
];

function HajjUmrah() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header className="text-center">
        <div className="text-xs uppercase tracking-widest text-gold">The Pilgrimage</div>
        <h1 className="mt-1 text-3xl md:text-4xl font-semibold">Hajj & Umrah Guide</h1>
        <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
          How to prepare for and perform the lesser and greater pilgrimages — step by step.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">How to Prepare</h2>
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          {PREPARE.map((p) => (
            <div key={p.t} className="ornament-border rounded-xl p-4">
              <div className="font-semibold text-sm">{p.t}</div>
              <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Umrah — Step by Step</h2>
        <p className="text-sm text-muted-foreground mt-1">The lesser pilgrimage — can be performed any time of year.</p>
        <ol className="mt-4 space-y-3">
          {UMRAH.map((s) => (
            <li key={s.t} className="rounded-xl border border-border bg-card p-4">
              <div className="font-semibold">{s.t}</div>
              <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Hajj — Day by Day</h2>
        <p className="text-sm text-muted-foreground mt-1">The 5–6 days of the greater pilgrimage in the month of Dhul-Hijjah.</p>
        <div className="mt-4 space-y-4">
          {HAJJ.map((d) => (
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
        <h2 className="text-2xl font-semibold">What to Expect</h2>
        <div className="mt-4 grid md:grid-cols-3 gap-3">
          {EXPERIENCE.map((e) => (
            <div key={e.t} className="rounded-xl bg-accent/40 p-4">
              <div className="font-semibold text-sm">{e.t}</div>
              <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed">{e.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 text-center font-arabic text-2xl text-primary">تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُم</div>
      <div className="text-center text-sm text-muted-foreground mt-1">May Allah accept from us and from you.</div>
    </div>
  );
}
