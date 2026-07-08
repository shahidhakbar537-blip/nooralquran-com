import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Star, Sparkles, Hand, Home, Clock, Users, Bookmark, Brain, Landmark, Compass, Video } from "lucide-react";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/surahs", label: "Surahs", icon: BookOpen },
  { to: "/yaseen", label: "Yaseen", icon: Sparkles },
  { to: "/ayatul-kursi", label: "Ayatul Kursi", icon: Star },
  { to: "/bayans", label: "Bayans", icon: Video },
  { to: "/how-to-pray", label: "How to Pray", icon: Hand },
  { to: "/prayer-times", label: "Prayer Times", icon: Clock },
  { to: "/prophets", label: "Prophets", icon: Users },
  { to: "/holy-cities", label: "Makkah & Madina", icon: Landmark },
  { to: "/hajj-umrah", label: "Hajj & Umrah", icon: Compass },
  { to: "/bookmarks", label: "Bookmarks", icon: Bookmark },
  { to: "/quiz", label: "Quiz", icon: Brain },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between gap-4">
        <Link to="/" className="flex flex-col items-start gap-1 group">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground grid place-items-center font-arabic text-xl leading-none shadow-sm">
              ﷽
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-foreground text-base">Noor al-Quran</div>
              <div className="text-[11px] uppercase tracking-widest text-gold">Recite · Reflect · Pray</div>
            </div>
          </div>
          <div className="text-sm font-medium text-muted-foreground whitespace-nowrap">Created by S.Shahidh Akbar</div>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => {
            const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:text-foreground hover:bg-accent"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <nav className="lg:hidden flex overflow-x-auto gap-1 px-3 pb-2 -mt-1">
        {NAV.map((n) => {
          const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
          const Icon = n.icon;
          return (
            <Link
              key={n.to}
              to={n.to}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                active ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {n.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>Quran text & audio from AlQuran.cloud · Prayer times from AlAdhan</p>
        <p className="font-arabic text-base text-foreground">جزاك الله خيرا</p>
      </div>
    </footer>
  );
}
