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
  id: string; // YouTube video ID
  title: string;
  speaker: string;
  category: "Recitation" | "Praise of Allah" | "Daily Practice" | "Bayan" | "Tafsir" | "Hadith" | "Seerah";
  duration?: string;
};

// Curated list of well-known public lectures & recitations on YouTube
const BAYANS: Bayan[] = [
  // Sheikh Abdul Basit Abdul Samad - Recitations
  { id: "5V0eScNo4iA", title: "Surah Al-Fatihah — Recitation", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "_g69Mj0Xcfk", title: "Surah Ar-Rahman — Beautiful Recitation", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "iCHM8lNM8fs", title: "Surah Yaseen — Full Recitation", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "7Bipmmwd7Fw", title: "Surah Al-Kahf", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },

  // Mishary Rashid Alafasy
  { id: "Cvr6X_5adCo", title: "Surah Al-Mulk", speaker: "Sheikh Mishary Rashid Alafasy", category: "Recitation" },
  { id: "Iy7RRchhr2c", title: "Surah Al-Waqiah", speaker: "Sheikh Mishary Rashid Alafasy", category: "Recitation" },

  // Mufti Menk - Bayans
  { id: "8v3IgYtQd5A", title: "The Power of Dua", speaker: "Mufti Ismail Menk", category: "Bayan" },
  { id: "aE7iNvJXpJ4", title: "Stories of the Prophets", speaker: "Mufti Ismail Menk", category: "Seerah" },
  { id: "1ZMkq_G7fMk", title: "Life of Prophet Muhammad ﷺ", speaker: "Mufti Ismail Menk", category: "Seerah" },

  // Nouman Ali Khan - Tafsir
  { id: "H4Yh2Vd4dNI", title: "Tafsir Surah Al-Fatihah", speaker: "Nouman Ali Khan", category: "Tafsir" },
  { id: "0RcT61q0Y3s", title: "Purpose of Life", speaker: "Nouman Ali Khan", category: "Bayan" },

  // Yasir Qadhi - Seerah
  { id: "-Q6JJnHkppE", title: "Seerah of Prophet Muhammad ﷺ — Part 1", speaker: "Dr. Yasir Qadhi", category: "Seerah" },
  { id: "GYRUFZQb0Kw", title: "The Companions of the Prophet ﷺ", speaker: "Dr. Yasir Qadhi", category: "Seerah" },

  // Omar Suleiman
  { id: "9jZ04Ye8QhY", title: "Angels in Your Presence", speaker: "Sheikh Omar Suleiman", category: "Bayan" },
  { id: "yeDzM_wJm00", title: "Meeting Muhammad ﷺ", speaker: "Sheikh Omar Suleiman", category: "Seerah" },

  // Hadith
  { id: "0GHqz8YE_hI", title: "40 Hadith of Imam An-Nawawi — Explained", speaker: "Dr. Yasir Qadhi", category: "Hadith" },
  { id: "b6PMwtKzUYY", title: "Sahih Al-Bukhari — Introduction", speaker: "Sheikh Assim Al-Hakeem", category: "Hadith" },

  // Praise of Allah — Hamd, Tasbih, Names & Attributes
  { id: "AzHwaR7Y_XU", title: "The 99 Names of Allah — Asma ul Husna", speaker: "Recitation", category: "Praise of Allah" },
  { id: "AR-8B3elfBk", title: "Why We Praise Allah — Alhamdulillah", speaker: "Mufti Ismail Menk", category: "Praise of Allah" },
  { id: "wAJvcOoxARE", title: "The Meaning of SubhanAllah", speaker: "Nouman Ali Khan", category: "Praise of Allah" },
  { id: "hMkYA4vjbJk", title: "Reflecting on Allah's Greatness", speaker: "Sheikh Omar Suleiman", category: "Praise of Allah" },
  { id: "n95f0M-EPeE", title: "Allahu Akbar — The Meaning of Takbir", speaker: "Mufti Ismail Menk", category: "Praise of Allah" },
  { id: "1TXvNP4mUYw", title: "Tasbih of the Prophet ﷺ", speaker: "Sheikh Assim Al-Hakeem", category: "Praise of Allah" },

  // Daily Practice — What should we do every day
  { id: "cCwSPuwFhWo", title: "Morning & Evening Adhkar (Duas)", speaker: "Daily Reminder", category: "Daily Practice" },
  { id: "3B3VYRTKfLM", title: "Sunnah Acts to Do Every Day", speaker: "Mufti Ismail Menk", category: "Daily Practice" },
  { id: "H8s7HAO_5jE", title: "How to Start Your Day as a Muslim", speaker: "Sheikh Omar Suleiman", category: "Daily Practice" },
  { id: "8yPRu4hNo1s", title: "Duas Before Sleeping", speaker: "Sheikh Assim Al-Hakeem", category: "Daily Practice" },
  { id: "8YQmn-Xw2Xk", title: "Habits of a Righteous Muslim", speaker: "Mufti Ismail Menk", category: "Daily Practice" },
  { id: "Idc8VvXKZOw", title: "How to Make Dhikr a Habit", speaker: "Nouman Ali Khan", category: "Daily Practice" },
  { id: "0lJ5A5jvVzE", title: "Sunnah of Eating & Drinking", speaker: "Sheikh Assim Al-Hakeem", category: "Daily Practice" },
  { id: "SgWc2krtoyI", title: "The Best Daily Deeds", speaker: "Dr. Yasir Qadhi", category: "Daily Practice" },

  // ── More Recitations ──
  { id: "IEHW2SVIvhk", title: "Surah Al-Baqarah — Full", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "u9Sni1UPFyo", title: "Surah Al-Imran", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "cXjkajSTPWY", title: "Surah An-Nisa", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "3ImrDmXTVLU", title: "Surah Maryam", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "K1O8sT4YO4Q", title: "Surah Taha", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "V0nP2NmVQvo", title: "Surah Al-Isra", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "NDD1SEQ07dg", title: "Juz Amma — Full", speaker: "Sheikh Abdul Basit Abdul Samad", category: "Recitation" },
  { id: "5-NnstYh9c8", title: "Surah Al-Baqarah — Full", speaker: "Sheikh Mishary Rashid Alafasy", category: "Recitation" },
  { id: "cH8T4Ci2f_g", title: "Surah Al-Kahf", speaker: "Sheikh Mishary Rashid Alafasy", category: "Recitation" },
  { id: "F1t7wpp03Ro", title: "Surah Ar-Rahman", speaker: "Sheikh Mishary Rashid Alafasy", category: "Recitation" },
  { id: "vQAJRuxs76A", title: "Surah Yaseen", speaker: "Sheikh Mishary Rashid Alafasy", category: "Recitation" },
  { id: "QIYrgnlLDeA", title: "Surah Al-Fatihah", speaker: "Sheikh Sudais", category: "Recitation" },
  { id: "hZKq-YFrKV4", title: "Surah Al-Kahf", speaker: "Sheikh Sudais", category: "Recitation" },
  { id: "5tCBFm7ttHw", title: "Surah Yaseen", speaker: "Sheikh Sudais", category: "Recitation" },
  { id: "OKvHF3vzX3Y", title: "Surah Ar-Rahman", speaker: "Sheikh Sudais", category: "Recitation" },
  { id: "9lkqPrGkVdc", title: "Surah Al-Mulk", speaker: "Sheikh Sudais", category: "Recitation" },
  { id: "yZCCbnFqBrQ", title: "Surah Al-Waqiah", speaker: "Sheikh Maher Al Muaiqly", category: "Recitation" },
  { id: "9DcU07Y3F0M", title: "Surah Yaseen", speaker: "Sheikh Maher Al Muaiqly", category: "Recitation" },
  { id: "iyJlRHFbnXk", title: "Surah Al-Kahf", speaker: "Sheikh Saad Al-Ghamdi", category: "Recitation" },
  { id: "vG8Ihs6PjJs", title: "Surah Yusuf", speaker: "Sheikh Saad Al-Ghamdi", category: "Recitation" },

  // ── More Praise of Allah ──
  { id: "PVX6DXFHqLA", title: "Asma ul Husna — 99 Names", speaker: "Atif Aslam", category: "Praise of Allah" },
  { id: "M77BsPYSAUE", title: "The Names of Allah — Ar-Rahman", speaker: "Dr. Yasir Qadhi", category: "Praise of Allah" },
  { id: "5cWjR76CJRk", title: "The Name Al-Malik", speaker: "Dr. Yasir Qadhi", category: "Praise of Allah" },
  { id: "5JFtVyKgU1c", title: "The Name Al-Quddus", speaker: "Dr. Yasir Qadhi", category: "Praise of Allah" },
  { id: "6dR6vfqoR0Y", title: "The Name As-Salam", speaker: "Dr. Yasir Qadhi", category: "Praise of Allah" },
  { id: "cGD9YbSDG-4", title: "The Name Al-Wadud (The Loving)", speaker: "Sheikh Omar Suleiman", category: "Praise of Allah" },
  { id: "0lRP0DYRvWc", title: "How Great Is Our Lord", speaker: "Mufti Ismail Menk", category: "Praise of Allah" },
  { id: "6VkVUOOnzYo", title: "Al-Hamdulillah — Gratitude", speaker: "Nouman Ali Khan", category: "Praise of Allah" },
  { id: "1yZq_i7RwlA", title: "Reflect on Allah's Creation", speaker: "Mufti Ismail Menk", category: "Praise of Allah" },
  { id: "5WcSb0mnT9g", title: "SubhanAllah wa Bihamdihi", speaker: "Sheikh Assim Al-Hakeem", category: "Praise of Allah" },
  { id: "2vT2AtVsIRk", title: "The Reward of Dhikr", speaker: "Mufti Ismail Menk", category: "Praise of Allah" },
  { id: "H_G0zEmZ4nQ", title: "Loving Allah", speaker: "Sheikh Omar Suleiman", category: "Praise of Allah" },
  { id: "PbG9tgh8pMs", title: "Al-Kareem — The Most Generous", speaker: "Dr. Yasir Qadhi", category: "Praise of Allah" },

  // ── More Daily Practice ──
  { id: "S-fnGT_kgvA", title: "Morning Adhkar — Full", speaker: "Sheikh Mishary Alafasy", category: "Daily Practice" },
  { id: "aiCJZ1v40rE", title: "Evening Adhkar — Full", speaker: "Sheikh Mishary Alafasy", category: "Daily Practice" },
  { id: "-4tS7RVzKGA", title: "Duas for Every Occasion", speaker: "Sheikh Assim Al-Hakeem", category: "Daily Practice" },
  { id: "vY3wJyPZJmg", title: "Dua When Entering the Home", speaker: "Sheikh Assim Al-Hakeem", category: "Daily Practice" },
  { id: "vhBUbT_OSNI", title: "Dua Before & After Meals", speaker: "Sheikh Assim Al-Hakeem", category: "Daily Practice" },
  { id: "CkgpjEsCq_A", title: "Sunnah of the Prophet ﷺ — Full Day", speaker: "Mufti Ismail Menk", category: "Daily Practice" },
  { id: "1Ye_zHRIjqI", title: "Managing Your Time Islamically", speaker: "Nouman Ali Khan", category: "Daily Practice" },
  { id: "d3T-lfrgSjE", title: "Adab of the Muslim", speaker: "Sheikh Omar Suleiman", category: "Daily Practice" },
  { id: "gJqfxo0BwBk", title: "How to Read Quran Daily", speaker: "Mufti Ismail Menk", category: "Daily Practice" },
  { id: "SGWNfEojoU8", title: "Istighfar — Seeking Forgiveness", speaker: "Sheikh Omar Suleiman", category: "Daily Practice" },
  { id: "iKQnfSlZFy0", title: "The Power of Salawat on the Prophet ﷺ", speaker: "Mufti Ismail Menk", category: "Daily Practice" },
  { id: "3jUcFR7SPRc", title: "Fasting on Mondays and Thursdays", speaker: "Sheikh Assim Al-Hakeem", category: "Daily Practice" },
  { id: "sksfz7O_wp0", title: "How to Pray Tahajjud", speaker: "Sheikh Omar Suleiman", category: "Daily Practice" },
  { id: "gOm4ktRuOO4", title: "The Value of Sunnah Prayers", speaker: "Mufti Ismail Menk", category: "Daily Practice" },
  { id: "cV0OTiPqLCk", title: "Giving Charity Daily", speaker: "Sheikh Omar Suleiman", category: "Daily Practice" },

  // ── More Bayans (Reminders) ──
  { id: "GKn2RC8G9jI", title: "Trust in Allah — Tawakkul", speaker: "Mufti Ismail Menk", category: "Bayan" },
  { id: "8CyfR3E4Ptw", title: "Patience in Hardship", speaker: "Mufti Ismail Menk", category: "Bayan" },
  { id: "1eV_1sJ3IQg", title: "Don't Lose Hope in Allah", speaker: "Mufti Ismail Menk", category: "Bayan" },
  { id: "K5C1TeqbeXo", title: "The Reality of This World", speaker: "Sheikh Omar Suleiman", category: "Bayan" },
  { id: "SIvv-x1cCK4", title: "Death — A Reminder", speaker: "Sheikh Omar Suleiman", category: "Bayan" },
  { id: "8sgycukafqQ", title: "The Day of Judgment", speaker: "Dr. Yasir Qadhi", category: "Bayan" },
  { id: "5CS0HEncCoQ", title: "Paradise (Jannah)", speaker: "Dr. Yasir Qadhi", category: "Bayan" },
  { id: "H8yh8Q9y5Sw", title: "The Hellfire — A Warning", speaker: "Dr. Yasir Qadhi", category: "Bayan" },
  { id: "V4kzADvbEIE", title: "Repentance to Allah", speaker: "Nouman Ali Khan", category: "Bayan" },
  { id: "y_JZq8zZbBg", title: "Struggling with Sin", speaker: "Nouman Ali Khan", category: "Bayan" },
  { id: "PJTfj6d1r6E", title: "The Heart of a Believer", speaker: "Sheikh Omar Suleiman", category: "Bayan" },
  { id: "Cx_QCwDU9K0", title: "Kindness to Parents", speaker: "Mufti Ismail Menk", category: "Bayan" },
  { id: "yjuJwoS3fRk", title: "Marriage in Islam", speaker: "Mufti Ismail Menk", category: "Bayan" },
  { id: "gVc0eWvzUv0", title: "Raising Righteous Children", speaker: "Sheikh Omar Suleiman", category: "Bayan" },
  { id: "kKA1FX0ff7g", title: "Overcoming Anxiety with Faith", speaker: "Mufti Ismail Menk", category: "Bayan" },
  { id: "d8UjX7nSRT4", title: "Halal Earnings & Rizq", speaker: "Mufti Ismail Menk", category: "Bayan" },
  { id: "sNwoUyYyfEo", title: "Gratitude Changes Everything", speaker: "Nouman Ali Khan", category: "Bayan" },
  { id: "sX3nZAEtoDs", title: "Backbiting (Gheebah)", speaker: "Sheikh Assim Al-Hakeem", category: "Bayan" },

  // ── More Tafsir ──
  { id: "9BvmzTVJVUM", title: "Tafsir Surah Al-Baqarah", speaker: "Nouman Ali Khan", category: "Tafsir" },
  { id: "cbErnGjS0oI", title: "Tafsir Surah Yusuf", speaker: "Nouman Ali Khan", category: "Tafsir" },
  { id: "z0MjIfw1r6M", title: "Tafsir Surah Al-Kahf", speaker: "Nouman Ali Khan", category: "Tafsir" },
  { id: "L59RCC5xXVE", title: "Tafsir Surah Ar-Rahman", speaker: "Nouman Ali Khan", category: "Tafsir" },
  { id: "kNZDlq0IjE0", title: "Tafsir Surah Al-Mulk", speaker: "Dr. Yasir Qadhi", category: "Tafsir" },
  { id: "cakqmzZgQwo", title: "Tafsir Surah Yaseen", speaker: "Nouman Ali Khan", category: "Tafsir" },
  { id: "ZjHK6C1nMuA", title: "Tafsir Juz Amma", speaker: "Nouman Ali Khan", category: "Tafsir" },
  { id: "TfvczFdVGqA", title: "Tafsir Ayatul Kursi", speaker: "Mufti Ismail Menk", category: "Tafsir" },
  { id: "SZkzMj9C1o8", title: "Tafsir Surah An-Nas & Al-Falaq", speaker: "Nouman Ali Khan", category: "Tafsir" },
  { id: "IE9uYPMLxUw", title: "Tafsir Surah Al-Ikhlas", speaker: "Nouman Ali Khan", category: "Tafsir" },

  // ── More Hadith ──
  { id: "0G_JPtEZ7mQ", title: "40 Hadith Nawawi — Hadith 1 (Intentions)", speaker: "Dr. Yasir Qadhi", category: "Hadith" },
  { id: "aCd_a4LSSGY", title: "40 Hadith Nawawi — Hadith 2 (Jibreel)", speaker: "Dr. Yasir Qadhi", category: "Hadith" },
  { id: "6vgnB-XgAvo", title: "Hadith on Good Character", speaker: "Sheikh Assim Al-Hakeem", category: "Hadith" },
  { id: "gVsIWx0KJ0Y", title: "Sahih Muslim — Book of Iman", speaker: "Sheikh Assim Al-Hakeem", category: "Hadith" },
  { id: "0iTZ8i4NRJc", title: "Riyad us-Saliheen — Introduction", speaker: "Sheikh Assim Al-Hakeem", category: "Hadith" },
  { id: "s9AZM1uNjJ0", title: "Hadith on Neighbors", speaker: "Mufti Ismail Menk", category: "Hadith" },
  { id: "L2vTZk3IU6c", title: "Hadith on Smiling as Charity", speaker: "Mufti Ismail Menk", category: "Hadith" },
  { id: "R2eZBqXHDXk", title: "Hadith Qudsi Explained", speaker: "Sheikh Omar Suleiman", category: "Hadith" },

  // ── More Seerah ──
  { id: "-h9SqzS64BE", title: "Seerah Part 2 — The Early Years", speaker: "Dr. Yasir Qadhi", category: "Seerah" },
  { id: "iL9j-XSFxDs", title: "Seerah Part 3 — The Revelation", speaker: "Dr. Yasir Qadhi", category: "Seerah" },
  { id: "kJvDTe8SgP0", title: "The Hijrah to Madinah", speaker: "Dr. Yasir Qadhi", category: "Seerah" },
  { id: "JqXvA8jH3aI", title: "Battle of Badr", speaker: "Dr. Yasir Qadhi", category: "Seerah" },
  { id: "8pTUiJyDkPo", title: "Battle of Uhud", speaker: "Dr. Yasir Qadhi", category: "Seerah" },
  { id: "9Xd6d3-WvHU", title: "The Conquest of Makkah", speaker: "Dr. Yasir Qadhi", category: "Seerah" },
  { id: "1YfDR9WbGkI", title: "The Final Sermon of the Prophet ﷺ", speaker: "Mufti Ismail Menk", category: "Seerah" },
  { id: "EQr7EDvJc-0", title: "Abu Bakr As-Siddiq (RA)", speaker: "Mufti Ismail Menk", category: "Seerah" },
  { id: "8FwNScWpBn8", title: "Umar ibn Al-Khattab (RA)", speaker: "Mufti Ismail Menk", category: "Seerah" },
  { id: "wr3YE_iQMJI", title: "Uthman ibn Affan (RA)", speaker: "Mufti Ismail Menk", category: "Seerah" },
  { id: "MXAj0kFvfOI", title: "Ali ibn Abi Talib (RA)", speaker: "Mufti Ismail Menk", category: "Seerah" },
  { id: "8FaZAYlp8pI", title: "Khadijah (RA) — Mother of the Believers", speaker: "Sheikh Omar Suleiman", category: "Seerah" },
  { id: "wCbTFHf82vI", title: "Aisha (RA) — The Beloved of the Prophet ﷺ", speaker: "Sheikh Omar Suleiman", category: "Seerah" },
  { id: "1zkFBBrCr5M", title: "Fatimah (RA) — The Leader of Women", speaker: "Sheikh Omar Suleiman", category: "Seerah" },
  { id: "M7yF6USL08g", title: "Bilal ibn Rabah (RA)", speaker: "Mufti Ismail Menk", category: "Seerah" },
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

