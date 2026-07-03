import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, Search } from "lucide-react";

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
];

const CATEGORIES = ["All", "Recitation", "Bayan", "Tafsir", "Hadith", "Seerah"] as const;

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
        {filtered.map((b) => (
          <button
            key={b.id}
            onClick={() => setActive(b)}
            className="group text-left rounded-xl overflow-hidden border border-border bg-card hover:-translate-y-0.5 transition-transform"
          >
            <div className="relative aspect-video bg-muted overflow-hidden">
              <img
                src={`https://i.ytimg.com/vi/${b.id}/hqdefault.jpg`}
                alt={b.title}
                loading="lazy"
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
            <div className="p-4">
              <h3 className="font-semibold leading-snug line-clamp-2">{b.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{b.speaker}</p>
            </div>
          </button>
        ))}
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
            <div className="aspect-video bg-black">
              <iframe
                key={active.id}
                src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="p-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{active.title}</h3>
                <p className="text-sm text-muted-foreground">{active.speaker} · {active.category}</p>
              </div>
              <button
                onClick={() => setActive(null)}
                className="px-3 py-1.5 rounded-md text-sm font-medium bg-accent hover:bg-accent/70"
              >
                Close
              </button>
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
