import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";

export const Route = createFileRoute("/prophets")({
  head: () => ({
    meta: [
      { title: "The Prophets (Nabis) — Noor al-Quran" },
      { name: "description", content: "Brief histories of the 25 prophets mentioned by name in the Holy Quran, from Adam to Muhammad ﷺ." },
    ],
  }),
  component: ProphetsPage,
});

type Prophet = { en: string; ar: string; biblical?: string; story: string };

const PROPHETS: Prophet[] = [
  { en: "Adam", ar: "آدم", biblical: "Adam", story: "The first human and prophet, created by Allah and honored above the angels. Lived in Paradise with Hawwa (Eve) until they ate from the forbidden tree and were sent to earth, where he taught his children to worship Allah alone." },
  { en: "Idris", ar: "إدريس", biblical: "Enoch", story: "A patient prophet known for wisdom, writing, and astronomy. Allah raised him to a high station." },
  { en: "Nuh (Noah)", ar: "نوح", biblical: "Noah", story: "Called his people to Allah for 950 years. When they refused, Allah commanded him to build the Ark; the believers and pairs of animals were saved from the great flood." },
  { en: "Hud", ar: "هود", story: "Sent to the powerful tribe of ʿĀd, who built tall pillars and rejected him. They were destroyed by a furious wind; Hud and the believers were saved." },
  { en: "Saleh", ar: "صالح", story: "Sent to Thamud. Allah gave them a miraculous she-camel as a sign; when they hamstrung her, a mighty blast destroyed them." },
  { en: "Ibrahim (Abraham)", ar: "إبراهيم", biblical: "Abraham", story: "Khalilullah, the friend of Allah. Smashed his people's idols, was thrown into fire that Allah made cool, built the Kaʿbah with his son Ismaʿil, and is the father of prophets." },
  { en: "Lut (Lot)", ar: "لوط", biblical: "Lot", story: "Nephew of Ibrahim, sent to Sodom. His people committed grave sins; they were destroyed and Lut and his believing family were saved." },
  { en: "Ismail (Ishmael)", ar: "إسماعيل", biblical: "Ishmael", story: "Son of Ibrahim and Hajar. As a baby, the Zamzam spring gushed for him in Makkah. He helped his father raise the Kaʿbah and is the ancestor of the Arabs and of Prophet Muhammad ﷺ." },
  { en: "Ishaq (Isaac)", ar: "إسحاق", biblical: "Isaac", story: "Son of Ibrahim and Sarah, given as glad tidings in old age. A righteous prophet and father of Yaʿqub." },
  { en: "Yaqub (Jacob)", ar: "يعقوب", biblical: "Jacob", story: "Also called Israʾil. Father of the twelve tribes; remained patient when his son Yusuf was lost and was reunited with him in Egypt." },
  { en: "Yusuf (Joseph)", ar: "يوسف", biblical: "Joseph", story: "Beloved son of Yaʿqub. Thrown into a well by his brothers, sold into slavery, wrongly imprisoned, then raised by Allah to be a minister of Egypt and reunited his family." },
  { en: "Ayyub (Job)", ar: "أيوب", biblical: "Job", story: "Tested with the loss of his wealth, family, and health. He bore it with patience for years; Allah restored him with even more — the model of sabr (patience)." },
  { en: "Shuayb", ar: "شعيب", biblical: "Jethro", story: "Sent to Madyan to warn them against cheating in trade. They rejected him and were seized by a mighty cry." },
  { en: "Musa (Moses)", ar: "موسى", biblical: "Moses", story: "Spoke directly to Allah at Mount Tur. Sent to Pharaoh; struck the sea with his staff so the Children of Israel crossed and Pharaoh's army drowned. Received the Tawrat (Torah)." },
  { en: "Harun (Aaron)", ar: "هارون", biblical: "Aaron", story: "Brother of Musa and his helper. Eloquent and gentle, he supported Musa in confronting Pharaoh." },
  { en: "Dhul-Kifl", ar: "ذو الكفل", story: "A righteous and patient prophet praised in the Quran among the steadfast servants of Allah." },
  { en: "Dawud (David)", ar: "داود", biblical: "David", story: "A prophet and king of Bani Israʾil who defeated the giant Jalut (Goliath). Allah taught him to shape iron and gave him the Zabur (Psalms); mountains and birds glorified Allah with him." },
  { en: "Sulayman (Solomon)", ar: "سليمان", biblical: "Solomon", story: "Son of Dawud, given a kingdom no one after him would have. Understood the speech of birds and ants, commanded the jinn and the wind, and called the Queen of Sheba to Islam." },
  { en: "Ilyas (Elijah)", ar: "إلياس", biblical: "Elijah", story: "Called his people away from worshipping the idol Baʿl and back to Allah, the Lord of all worlds." },
  { en: "Al-Yasa (Elisha)", ar: "اليسع", biblical: "Elisha", story: "Successor to Ilyas. Continued calling Bani Israʾil to the worship of Allah; among the chosen and the excellent." },
  { en: "Yunus (Jonah)", ar: "يونس", biblical: "Jonah", story: "Left his people in anger before Allah's permission; was swallowed by a great fish. In its darkness he cried, 'There is no god but You, glory be to You — I have been of the wrongdoers,' and Allah rescued him. His whole town then believed." },
  { en: "Zakariyya (Zechariah)", ar: "زكريا", biblical: "Zechariah", story: "Guardian of Maryam (Mary). In old age he prayed for a son and was given Yahya as glad tidings." },
  { en: "Yahya (John)", ar: "يحيى", biblical: "John the Baptist", story: "Son of Zakariyya, given wisdom as a child. Pure, devout, and obedient to his parents — peace was upon him the day he was born and the day he died." },
  { en: "Isa (Jesus)", ar: "عيسى", biblical: "Jesus", story: "Son of Maryam, born by Allah's word without a father. Spoke as a baby in the cradle, healed the blind and the leper, raised the dead by Allah's permission, and was raised up to Allah. He will return before the Day of Judgement." },
  { en: "Muhammad ﷺ", ar: "محمد", story: "The final messenger, born in Makkah in the year of the Elephant (~570 CE). Received revelation in the cave of Hira at age 40, called his people to Tawhid for 13 years in Makkah, migrated to Madinah, and through him Allah completed the religion. The Quran is his lasting miracle." },
];

function ProphetsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-primary" />
        <h1 className="text-3xl md:text-4xl font-semibold">The Prophets (Anbiya)</h1>
      </div>
      <p className="text-muted-foreground mt-2 max-w-2xl">
        Muslims believe Allah sent many prophets — a hadith mentions 124,000 — to every nation.
        These are the 25 prophets mentioned by name in the Quran, from Adam to Muhammad ﷺ.
      </p>

      <ol className="mt-8 space-y-4">
        {PROPHETS.map((p, i) => (
          <li key={p.en} className="ornament-border rounded-2xl p-6">
            <div className="flex items-baseline justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-gold">Prophet {i + 1}</div>
                <h2 className="text-xl md:text-2xl font-semibold mt-1">
                  {p.en}
                  {p.biblical && p.biblical !== p.en && (
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
