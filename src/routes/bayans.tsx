import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, Search, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/bayans")({
  head: () => ({
    meta: [
      { title: "Islamic Bayans & Lectures — Noor al-Quran" },
      { name: "description", content: "Watch Islamic lectures and Quran recitations by Sheikh Abdul Basit Abdul Samad, Mufti Menk, Nouman Ali Khan, Yasir Qadhi and other renowned scholars." },
    ],
  }),
  component: BayansPage,
});

type Bayan = {
  id: string; // YouTube video ID, OR a search query when `search` is true
  title: string;
  speaker: string;
  category: "Recitation" | "Praise of Allah" | "Daily Practice" | "Bayan" | "Tafsir" | "Hadith" | "Seerah" | "Tamil";
  duration?: string;
  search?: boolean; // when true, clicking opens a YouTube search instead of the embedded player
};

// Curated list of well-known public lectures & recitations on YouTube
const BAYANS: Bayan[] = [
  // Sheikh Abdul Basit Abdul Samad - Recitations
  { id: "_pqBf4xjHd4", title: "Surah Al-Fatihah — Recitation", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "cJzMWiUno8M", title: "Surah Ar-Rahman — Beautiful Recitation", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "SdJeagFOgcg", title: "Surah Yaseen — Full Recitation", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "3hKjNTycxYw", title: "Surah Al-Kahf", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },

  // Mishary Rashid Alafasy
  { id: "9WyZl9FxREY", title: "Surah Al-Mulk", speaker: "Sheikh Mishary Rashid Alafasy", category: "Recitation" },
  { id: "NDE6iXOK7_Q", title: "Surah Al-Waqiah", speaker: "Sheikh Mishary Rashid Alafasy", category: "Recitation" },

  // Mufti Menk - Bayans
  { id: "50CPCd5mtYk", title: "The Power of Dua", speaker: "Mufti Ismail Menk", category: "Bayan" },
  { id: "IQjzErJlpJ0", title: "Stories of the Prophets", speaker: "Mufti Ismail Menk", category: "Seerah" },
  { id: "VO22l6-Qkys", title: "Life of Prophet Muhammad ﷺ", speaker: "Mufti Ismail Menk", category: "Seerah" },

  // Nouman Ali Khan - Tafsir
  { id: "8v7aigYarho", title: "Tafsir Surah Al-Fatihah", speaker: "Nouman Ali Khan", category: "Tafsir" },
  { id: "trmGbK7wVcs", title: "Purpose of Life", speaker: "Nouman Ali Khan", category: "Bayan" },

  // Yasir Qadhi - Seerah
  { id: "VOUp3ZZ9t3A", title: "Seerah of Prophet Muhammad ﷺ — Part 1", speaker: "Dr. Yasir Qadhi", category: "Seerah" },
  { id: "yASuD-M-pFU", title: "The Companions of the Prophet ﷺ", speaker: "Dr. Yasir Qadhi", category: "Seerah" },

  // Omar Suleiman
  { id: "_i7yEy9ppjI", title: "Angels in Your Presence", speaker: "Sheikh Omar Suleiman", category: "Bayan" },
  { id: "4kwnB8aJqPA", title: "Meeting Muhammad ﷺ", speaker: "Sheikh Omar Suleiman", category: "Seerah" },

  // Hadith
  { id: "S2r9KImIX0M", title: "40 Hadith of Imam An-Nawawi — Explained", speaker: "Dr. Yasir Qadhi", category: "Hadith" },
  { id: "IhH7L_ZZdvk", title: "Sahih Al-Bukhari — Introduction", speaker: "Sheikh Assim Al-Hakeem", category: "Hadith" },

  // Praise of Allah — Hamd, Tasbih, Names & Attributes
  { id: "aJCVMfIKnCY", title: "The 99 Names of Allah — Asma ul Husna", speaker: "Recitation", category: "Praise of Allah" },
  { id: "CS3kFZuWhcY", title: "Why We Praise Allah — Alhamdulillah", speaker: "Mufti Ismail Menk", category: "Praise of Allah" },
  { id: "1ozBS_kdlJQ", title: "The Meaning of SubhanAllah", speaker: "Nouman Ali Khan", category: "Praise of Allah" },
  { id: "R-g8JXB7YEA", title: "Reflecting on Allah's Greatness", speaker: "Sheikh Omar Suleiman", category: "Praise of Allah" },
  { id: "itFfNfQaA30", title: "Allahu Akbar — The Meaning of Takbir", speaker: "Mufti Ismail Menk", category: "Praise of Allah" },
  { id: "9l92SdEhzXY", title: "Tasbih of the Prophet ﷺ", speaker: "Sheikh Assim Al-Hakeem", category: "Praise of Allah" },

  // Daily Practice — What should we do every day
  { id: "K3JKLACA7GQ", title: "Morning & Evening Adhkar (Duas)", speaker: "Daily Reminder", category: "Daily Practice" },
  { id: "GFdQCAAtN68", title: "Sunnah Acts to Do Every Day", speaker: "Mufti Ismail Menk", category: "Daily Practice" },
  { id: "AHVP62ebo7s", title: "How to Start Your Day as a Muslim", speaker: "Sheikh Omar Suleiman", category: "Daily Practice" },
  { id: "EqDDtUXI5ww", title: "Duas Before Sleeping", speaker: "Sheikh Assim Al-Hakeem", category: "Daily Practice" },
  { id: "GRAWswE1fBY", title: "Habits of a Righteous Muslim", speaker: "Mufti Ismail Menk", category: "Daily Practice" },
  { id: "NbDvYWP7DEk", title: "How to Make Dhikr a Habit", speaker: "Nouman Ali Khan", category: "Daily Practice" },
  { id: "_1k9Wztnsgs", title: "Sunnah of Eating & Drinking", speaker: "Sheikh Assim Al-Hakeem", category: "Daily Practice" },
  { id: "oWZm2mN4WhI", title: "The Best Daily Deeds", speaker: "Dr. Yasir Qadhi", category: "Daily Practice" },

  // ── More Recitations ──
  { id: "Cd_gzarRD_c", title: "Surah Al-Baqarah — Full", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "QB-uiMZ1yiI", title: "Surah Al-Imran", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "_YzRgLOMgHY", title: "Surah An-Nisa", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "GRkEZ6r3hBU", title: "Surah Maryam", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "lfI4egJTdbM", title: "Surah Taha", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "XLZKJweHDd8", title: "Surah Al-Isra", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "mtS-V8rj-XM", title: "Juz Amma — Full", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "X2YnP50cwNU", title: "Surah Al-Baqarah — Full", speaker: "Sheikh Mishary Rashid Alafasy", category: "Recitation" },
  { id: "-FxEYa8joK8", title: "Surah Al-Kahf", speaker: "Sheikh Mishary Rashid Alafasy", category: "Recitation" },
  { id: "H4N5eFbLl9A", title: "Surah Ar-Rahman", speaker: "Sheikh Mishary Rashid Alafasy", category: "Recitation" },
  { id: "Q9xYG8PLxeg", title: "Surah Yaseen", speaker: "Sheikh Mishary Rashid Alafasy", category: "Recitation" },
  { id: "UeRaDxGn9CU", title: "Surah Al-Fatihah", speaker: "Sheikh Sudais", category: "Recitation" },
  { id: "fxEK_hVl34M", title: "Surah Al-Kahf", speaker: "Sheikh Sudais", category: "Recitation" },
  { id: "Q--H5uqHP5s", title: "Surah Yaseen", speaker: "Sheikh Sudais", category: "Recitation" },
  { id: "Lbcta_bVxP4", title: "Surah Ar-Rahman", speaker: "Sheikh Sudais", category: "Recitation" },
  { id: "JwXN2fnc8Uk", title: "Surah Al-Mulk", speaker: "Sheikh Sudais", category: "Recitation" },
  { id: "Qj_03OTtkdg", title: "Surah Al-Waqiah", speaker: "Sheikh Maher Al Muaiqly", category: "Recitation" },
  { id: "eV8PfLXqXVc", title: "Surah Yaseen", speaker: "Sheikh Maher Al Muaiqly", category: "Recitation" },
  { id: "pgFezPeW2-0", title: "Surah Al-Kahf", speaker: "Sheikh Saad Al-Ghamdi", category: "Recitation" },
  { id: "YyBTvFiedKU", title: "Surah Yusuf", speaker: "Sheikh Saad Al-Ghamdi", category: "Recitation" },

  // ── More Praise of Allah ──
  { id: "lgm3puP3tMA", title: "Asma ul Husna — 99 Names", speaker: "Atif Aslam", category: "Praise of Allah" },
  { id: "mPOuXUVBhms", title: "The Names of Allah — Ar-Rahman", speaker: "Dr. Yasir Qadhi", category: "Praise of Allah" },
  { id: "s4QS9kgpZGM", title: "The Name Al-Malik", speaker: "Dr. Yasir Qadhi", category: "Praise of Allah" },
  { id: "KWzuFXyWxtg", title: "The Name Al-Quddus", speaker: "Dr. Yasir Qadhi", category: "Praise of Allah" },
  { id: "zVvUnix3R5U", title: "The Name As-Salam", speaker: "Dr. Yasir Qadhi", category: "Praise of Allah" },
  { id: "t--rezLMP1c", title: "The Name Al-Wadud (The Loving)", speaker: "Sheikh Omar Suleiman", category: "Praise of Allah" },
  { id: "3boo9_14pvU", title: "How Great Is Our Lord", speaker: "Mufti Ismail Menk", category: "Praise of Allah" },
  { id: "onYb579ePI8", title: "Al-Hamdulillah — Gratitude", speaker: "Nouman Ali Khan", category: "Praise of Allah" },
  { id: "dj5B2b6vrTo", title: "Reflect on Allah's Creation", speaker: "Mufti Ismail Menk", category: "Praise of Allah" },
  { id: "4qC6RMJz-mE", title: "SubhanAllah wa Bihamdihi", speaker: "Sheikh Assim Al-Hakeem", category: "Praise of Allah" },
  { id: "c5a9OrEPTlQ", title: "The Reward of Dhikr", speaker: "Mufti Ismail Menk", category: "Praise of Allah" },
  { id: "u_VDvY0v-bo", title: "Loving Allah", speaker: "Sheikh Omar Suleiman", category: "Praise of Allah" },
  { id: "_qMw3XyDUYk", title: "Al-Kareem — The Most Generous", speaker: "Dr. Yasir Qadhi", category: "Praise of Allah" },

  // ── More Daily Practice ──
  { id: "H-Xk_a_zVac", title: "Morning Adhkar — Full", speaker: "Sheikh Mishary Alafasy", category: "Daily Practice" },
  { id: "hetRq6j-0c8", title: "Evening Adhkar — Full", speaker: "Sheikh Mishary Alafasy", category: "Daily Practice" },
  { id: "c_dTo98uGwI", title: "Duas for Every Occasion", speaker: "Sheikh Assim Al-Hakeem", category: "Daily Practice" },
  { id: "AS8P4ZB_bXQ", title: "Dua When Entering the Home", speaker: "Sheikh Assim Al-Hakeem", category: "Daily Practice" },
  { id: "z3h6O1RzGak", title: "Dua Before & After Meals", speaker: "Sheikh Assim Al-Hakeem", category: "Daily Practice" },
  { id: "vlg9mfyjJls", title: "Sunnah of the Prophet ﷺ — Full Day", speaker: "Mufti Ismail Menk", category: "Daily Practice" },
  { id: "SiPAXNcoeaM", title: "Managing Your Time Islamically", speaker: "Nouman Ali Khan", category: "Daily Practice" },
  { id: "m268Z0Z7bXQ", title: "Adab of the Muslim", speaker: "Sheikh Omar Suleiman", category: "Daily Practice" },
  { id: "mrioKWLhvvA", title: "How to Read Quran Daily", speaker: "Mufti Ismail Menk", category: "Daily Practice" },
  { id: "K532bpWoFbE", title: "Istighfar — Seeking Forgiveness", speaker: "Sheikh Omar Suleiman", category: "Daily Practice" },
  { id: "9fqP53sG2Ac", title: "The Power of Salawat on the Prophet ﷺ", speaker: "Mufti Ismail Menk", category: "Daily Practice" },
  { id: "rjtnFrwEORQ", title: "Fasting on Mondays and Thursdays", speaker: "Sheikh Assim Al-Hakeem", category: "Daily Practice" },
  { id: "3jafFEdfK5s", title: "How to Pray Tahajjud", speaker: "Sheikh Omar Suleiman", category: "Daily Practice" },
  { id: "ERJ3zMZAg1M", title: "The Value of Sunnah Prayers", speaker: "Mufti Ismail Menk", category: "Daily Practice" },
  { id: "b4MFYKpOGe0", title: "Giving Charity Daily", speaker: "Sheikh Omar Suleiman", category: "Daily Practice" },

  // ── More Bayans (Reminders) ──
  { id: "3MqN7Iptaj4", title: "Trust in Allah — Tawakkul", speaker: "Mufti Ismail Menk", category: "Bayan" },
  { id: "LSdla5xgkaI", title: "Patience in Hardship", speaker: "Mufti Ismail Menk", category: "Bayan" },
  { id: "pZGdyb4L_mg", title: "Don't Lose Hope in Allah", speaker: "Mufti Ismail Menk", category: "Bayan" },
  { id: "j7_G2yP7-ew", title: "The Reality of This World", speaker: "Sheikh Omar Suleiman", category: "Bayan" },
  { id: "F2BBEmEBPlg", title: "Death — A Reminder", speaker: "Sheikh Omar Suleiman", category: "Bayan" },
  { id: "0v-niJwZ-5Q", title: "The Day of Judgment", speaker: "Dr. Yasir Qadhi", category: "Bayan" },
  { id: "5r2KDR23tF8", title: "Paradise (Jannah)", speaker: "Dr. Yasir Qadhi", category: "Bayan" },
  { id: "39w6g_Bf_UI", title: "The Hellfire — A Warning", speaker: "Dr. Yasir Qadhi", category: "Bayan" },
  { id: "kjpwWKOS9qs", title: "Repentance to Allah", speaker: "Nouman Ali Khan", category: "Bayan" },
  { id: "KZSq-3GaqOI", title: "Struggling with Sin", speaker: "Nouman Ali Khan", category: "Bayan" },
  { id: "KFqOqsCvW0U", title: "The Heart of a Believer", speaker: "Sheikh Omar Suleiman", category: "Bayan" },
  { id: "__pYUHgzwbI", title: "Kindness to Parents", speaker: "Mufti Ismail Menk", category: "Bayan" },
  { id: "JEi4FwFvFUg", title: "Marriage in Islam", speaker: "Mufti Ismail Menk", category: "Bayan" },
  { id: "hZbDbOwEIrk", title: "Raising Righteous Children", speaker: "Sheikh Omar Suleiman", category: "Bayan" },
  { id: "Vp-fzXRhp0g", title: "Overcoming Anxiety with Faith", speaker: "Mufti Ismail Menk", category: "Bayan" },
  { id: "drWGuMJCy9Y", title: "Halal Earnings & Rizq", speaker: "Mufti Ismail Menk", category: "Bayan" },
  { id: "fWaRWoeCWaI", title: "Gratitude Changes Everything", speaker: "Nouman Ali Khan", category: "Bayan" },
  { id: "chZSERo1CTk", title: "Backbiting (Gheebah)", speaker: "Sheikh Assim Al-Hakeem", category: "Bayan" },

  // ── More Tafsir ──
  { id: "Um7450eiQZU", title: "Tafsir Surah Al-Baqarah", speaker: "Nouman Ali Khan", category: "Tafsir" },
  { id: "r3ak4q52Cmg", title: "Tafsir Surah Yusuf", speaker: "Nouman Ali Khan", category: "Tafsir" },
  { id: "-BPn6wMVLgs", title: "Tafsir Surah Al-Kahf", speaker: "Nouman Ali Khan", category: "Tafsir" },
  { id: "BZ2l6INwynw", title: "Tafsir Surah Ar-Rahman", speaker: "Nouman Ali Khan", category: "Tafsir" },
  { id: "tJrEi9WsWGM", title: "Tafsir Surah Al-Mulk", speaker: "Dr. Yasir Qadhi", category: "Tafsir" },
  { id: "W-vDB94Axwg", title: "Tafsir Surah Yaseen", speaker: "Nouman Ali Khan", category: "Tafsir" },
  { id: "WrFk6DnPGSw", title: "Tafsir Juz Amma", speaker: "Nouman Ali Khan", category: "Tafsir" },
  { id: "CHCEoBtcdxk", title: "Tafsir Ayatul Kursi", speaker: "Mufti Ismail Menk", category: "Tafsir" },
  { id: "n-J-DerHlVc", title: "Tafsir Surah An-Nas & Al-Falaq", speaker: "Nouman Ali Khan", category: "Tafsir" },
  { id: "veLAwQVwMmE", title: "Tafsir Surah Al-Ikhlas", speaker: "Nouman Ali Khan", category: "Tafsir" },

  // ── More Hadith ──
  { id: "gl14OTvpcXA", title: "40 Hadith Nawawi — Hadith 1 (Intentions)", speaker: "Dr. Yasir Qadhi", category: "Hadith" },
  { id: "MBfyb17QZ2c", title: "40 Hadith Nawawi — Hadith 2 (Jibreel)", speaker: "Dr. Yasir Qadhi", category: "Hadith" },
  { id: "TPG2NSPHI_s", title: "Hadith on Good Character", speaker: "Sheikh Assim Al-Hakeem", category: "Hadith" },
  { id: "eLpWlhlQgcY", title: "Sahih Muslim — Book of Iman", speaker: "Sheikh Assim Al-Hakeem", category: "Hadith" },
  { id: "5CRUxjsqIwI", title: "Riyad us-Saliheen — Introduction", speaker: "Sheikh Assim Al-Hakeem", category: "Hadith" },
  { id: "2co1t9v8_kU", title: "Hadith on Neighbors", speaker: "Mufti Ismail Menk", category: "Hadith" },
  { id: "WZLnBOMEqBs", title: "Hadith on Smiling as Charity", speaker: "Mufti Ismail Menk", category: "Hadith" },
  { id: "u6wVcLY688k", title: "Hadith Qudsi Explained", speaker: "Sheikh Omar Suleiman", category: "Hadith" },

  // ── More Seerah ──
  { id: "udjM4dBVicE", title: "Seerah Part 2 — The Early Years", speaker: "Dr. Yasir Qadhi", category: "Seerah" },
  { id: "0yz9CxB-Qyc", title: "Seerah Part 3 — The Revelation", speaker: "Dr. Yasir Qadhi", category: "Seerah" },
  { id: "utKZzIWZ0I4", title: "The Hijrah to Madinah", speaker: "Dr. Yasir Qadhi", category: "Seerah" },
  { id: "q7P58swk9MM", title: "Battle of Badr", speaker: "Dr. Yasir Qadhi", category: "Seerah" },
  { id: "YtpKPVI3c4M", title: "Battle of Uhud", speaker: "Dr. Yasir Qadhi", category: "Seerah" },
  { id: "r8VScnCrFZA", title: "The Conquest of Makkah", speaker: "Dr. Yasir Qadhi", category: "Seerah" },
  { id: "dUWuT17oUZ0", title: "The Final Sermon of the Prophet ﷺ", speaker: "Mufti Ismail Menk", category: "Seerah" },
  { id: "ZgocsMzgY2I", title: "Abu Bakr As-Siddiq (RA)", speaker: "Mufti Ismail Menk", category: "Seerah" },
  { id: "YHrJhnM35-w", title: "Umar ibn Al-Khattab (RA)", speaker: "Mufti Ismail Menk", category: "Seerah" },
  { id: "oXie-AAPqtc", title: "Uthman ibn Affan (RA)", speaker: "Mufti Ismail Menk", category: "Seerah" },
  { id: "MC4gaQLmyog", title: "Ali ibn Abi Talib (RA)", speaker: "Mufti Ismail Menk", category: "Seerah" },
  { id: "gRBTQKlfC78", title: "Khadijah (RA) — Mother of the Believers", speaker: "Sheikh Omar Suleiman", category: "Seerah" },
  { id: "qPT0izibzsg", title: "Aisha (RA) — The Beloved of the Prophet ﷺ", speaker: "Sheikh Omar Suleiman", category: "Seerah" },
  { id: "RbwnRZ30TVE", title: "Fatimah (RA) — The Leader of Women", speaker: "Sheikh Omar Suleiman", category: "Seerah" },
  { id: "u9bHquqlLzI", title: "Bilal ibn Rabah (RA)", speaker: "Mufti Ismail Menk", category: "Seerah" },
];

const CATEGORIES = ["All", "Praise of Allah", "Daily Practice", "Recitation", "Bayan", "Tafsir", "Hadith", "Seerah"] as const;

function BayansPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Bayan | null>(null);

  const filtered = BAYANS.filter((b) => {
    const matchCat = category === "All" || b.category === category;
    const q = query.trim().toLowerCase();
    const matchQ = !q || b.title.toLowerCase().includes(q) || b.speaker.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="text-center mb-8">
        <div className="inline-flex px-3 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-medium tracking-wider uppercase">
          Bayans & Lectures
        </div>
        <h1 className="mt-4 text-3xl md:text-4xl font-semibold">Islamic Lectures & Recitations</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Watch recitations by Sheikh Abdul Basit Abdul Samad and lectures from renowned scholars
          on Tafsir, Hadith, and the Seerah of the Prophet ﷺ.
        </p>
      </header>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or speaker..."
            className="w-full pl-9 pr-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                category === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground hover:bg-accent/70"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((b) => {
          const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
            b.title + " " + b.speaker,
          )}`;
          return (
            <div
              key={b.id + b.title}
              className="group text-left rounded-xl overflow-hidden border border-border bg-card hover:-translate-y-0.5 transition-transform"
            >
              <button
                onClick={() => setActive(b)}
                className="block w-full text-left"
                aria-label={`Play ${b.title}`}
              >
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <img
                    src={`https://i.ytimg.com/vi/${b.id}/hqdefault.jpg`}
                    alt={b.title}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://i.ytimg.com/img/no_thumbnail.jpg";
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 grid place-items-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-lg">
                      <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-background/90 text-[10px] font-medium uppercase tracking-wider">
                    {b.category}
                  </div>
                </div>
                <div className="p-4 pb-2">
                  <h3 className="font-semibold leading-snug line-clamp-2">{b.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{b.speaker}</p>
                </div>
              </button>
              <div className="px-4 pb-4">
                <a
                  href={searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <ExternalLink className="w-3 h-3" /> Open on YouTube
                </a>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-sm text-muted-foreground py-12">
            No videos match your search.
          </p>
        )}
      </div>

      {/* Player modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/80 grid place-items-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-4xl bg-card rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-black relative">
              <iframe
                key={active.id}
                src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0&playsinline=1`}
                title={active.title}
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="p-4 flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h3 className="font-semibold">{active.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {active.speaker} · {active.category}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Video not loading? Use the buttons on the right to watch it directly on YouTube.
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://www.youtube.com/watch?v=${active.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-md text-sm font-medium border border-border hover:bg-accent"
                >
                  Watch on YouTube
                </a>
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(active.title + " " + active.speaker)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-md text-sm font-medium border border-border hover:bg-accent"
                >
                  Search on YouTube
                </a>
                <button
                  onClick={() => setActive(null)}
                  className="px-3 py-1.5 rounded-md text-sm font-medium bg-accent hover:bg-accent/70"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground mt-8">
        Videos are hosted on YouTube by their respective channels.
      </p>
    </div>
  );
}

