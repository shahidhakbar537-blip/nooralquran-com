import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Star, Sparkles, Hand, ArrowRight, Clock, Users, Bookmark, Brain, Landmark, Compass, Video } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noor al-Quran — Read & Listen to the Holy Quran" },
      { name: "description", content: "Read and listen to the Holy Quran, get prayer times, learn how to pray, explore the history of Makkah & Madina, and prepare for Hajj and Umrah." },
    ],
  }),
  component: Index,
});

const FEATURES = [
  { to: "/surahs", icon: BookOpen, title: "114 Surahs", desc: "Browse and listen to every chapter of the Quran." },
  { to: "/prayer-times", icon: Clock, title: "Prayer Times", desc: "Daily Salah times for your location with alerts." },
  { to: "/prophets", icon: Users, title: "The Prophets", desc: "Stories of the 25 prophets named in the Quran." },
  { to: "/holy-cities", icon: Landmark, title: "Makkah & Madina", desc: "History and significance of the two holy cities." },
  { to: "/hajj-umrah", icon: Compass, title: "Hajj & Umrah", desc: "Prepare and perform the pilgrimage step by step." },
  { to: "/yaseen", icon: Sparkles, title: "Surah Yaseen", desc: "The heart of the Quran." },
  { to: "/ayatul-kursi", icon: Star, title: "Ayatul Kursi", desc: "The throne verse for daily protection." },
  { to: "/how-to-pray", icon: Hand, title: "How to Pray", desc: "Step-by-step Salah guide with images." },
  { to: "/bookmarks", icon: Bookmark, title: "Bookmarks", desc: "Save and revisit your favorite ayahs." },
  { to: "/quiz", icon: Brain, title: "Islamic Quiz", desc: "Test your knowledge of Islam & Hadith." },
] as const;

function Index() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="pt-12 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-medium tracking-wider uppercase">
          Bismillah · In the name of Allah
        </div>
        <h1 className="mt-6 font-arabic text-5xl md:text-7xl text-primary leading-none">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </h1>
        <p className="mt-4 text-sm md:text-base text-muted-foreground italic">
          In the name of Allah, the Most Gracious, the Most Merciful
        </p>
        <h2 className="mt-10 text-3xl md:text-5xl font-semibold tracking-tight text-foreground max-w-3xl mx-auto">
          Read and listen to the Holy Quran, anytime.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          All 30 Juz and 114 Surahs in Arabic, with verse-by-verse audio
          recitation by Abdul Basit Abdul Samad. Plus a step-by-step prayer
          guide for daily Salah.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/surahs" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 shadow">
            Browse Surahs <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/prayer-times" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium hover:bg-accent">
            Prayer Times
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="pb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <Link
              key={f.to}
              to={f.to}
              className="group ornament-border rounded-xl p-6 hover:-translate-y-0.5 transition-transform"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary grid place-items-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium">
                Open <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
