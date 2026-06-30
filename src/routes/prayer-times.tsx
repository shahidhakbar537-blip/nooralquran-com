import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Clock, MapPin, Bell, BellOff, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/prayer-times")({
  head: () => ({
    meta: [
      { title: "Prayer Times — Noor al-Quran" },
      { name: "description", content: "Daily Salah timings based on your location with alerts when each prayer time arrives." },
    ],
  }),
  component: PrayerTimesPage,
});

type Timings = {
  Fajr: string; Sunrise: string; Dhuhr: string; Asr: string;
  Maghrib: string; Isha: string;
};

const PRAYERS: (keyof Timings)[] = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

function PrayerTimesPage() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [city, setCity] = useState<string>("");
  const [timings, setTimings] = useState<Timings | null>(null);
  const [date, setDate] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [alertsOn, setAlertsOn] = useState(false);
  const [now, setNow] = useState(new Date());
  const firedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  const requestLocation = () => {
    setError("");
    setLoading(true);
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not available in this browser.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (e) => { setError(e.message || "Could not get your location."); setLoading(false); },
      { enableHighAccuracy: false, timeout: 10000 },
    );
  };

  // Fetch timings when coords change
  useEffect(() => {
    if (!coords) return;
    (async () => {
      try {
        const d = new Date();
        const url = `https://api.aladhan.com/v1/timings/${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}?latitude=${coords.lat}&longitude=${coords.lon}&method=2`;
        const r = await fetch(url);
        const j = await r.json();
        if (j.code !== 200) throw new Error("Failed to load times");
        setTimings(j.data.timings);
        setDate(j.data.date.readable);
        setCity(`${j.data.meta.timezone}`);
        setLoading(false);
      } catch (e: any) {
        setError(e.message || "Failed to load prayer times.");
        setLoading(false);
      }
    })();
  }, [coords]);

  const enableAlerts = async () => {
    if (!("Notification" in window)) {
      setAlertsOn(true);
      return;
    }
    if (Notification.permission === "default") {
      const p = await Notification.requestPermission();
      setAlertsOn(p === "granted");
    } else {
      setAlertsOn(Notification.permission === "granted");
    }
  };

  // Compute next prayer + status
  const { nextPrayer, nextAt, currentPrayer } = useMemo(() => {
    if (!timings) return { nextPrayer: null as string | null, nextAt: null as Date | null, currentPrayer: null as string | null };
    const today = new Date();
    const list = PRAYERS.map((p) => {
      const [h, m] = (timings[p] || "00:00").split(":").map(Number);
      const dt = new Date(today);
      dt.setHours(h, m, 0, 0);
      return { p, dt };
    });
    const upcoming = list.find((x) => x.dt.getTime() > now.getTime());
    const current = [...list].reverse().find((x) => x.dt.getTime() <= now.getTime());
    return {
      nextPrayer: upcoming?.p ?? null,
      nextAt: upcoming?.dt ?? null,
      currentPrayer: current?.p ?? null,
    };
  }, [timings, now]);

  // Fire alerts at prayer time
  useEffect(() => {
    if (!alertsOn || !timings) return;
    const id = setInterval(() => {
      const n = new Date();
      PRAYERS.forEach((p) => {
        const [h, m] = (timings[p] || "00:00").split(":").map(Number);
        const key = `${n.toDateString()}-${p}`;
        if (n.getHours() === h && n.getMinutes() === m && !firedRef.current.has(key)) {
          firedRef.current.add(key);
          const title = `${p} time`;
          const body = `It's time for ${p} prayer.`;
          if ("Notification" in window && Notification.permission === "granted") {
            try { new Notification(title, { body }); } catch {}
          }
          try {
            const a = new AudioContext();
            const o = a.createOscillator();
            const g = a.createGain();
            o.connect(g); g.connect(a.destination);
            o.frequency.value = 880; g.gain.value = 0.05;
            o.start(); setTimeout(() => { o.stop(); a.close(); }, 600);
          } catch {}
          alert(`🕌 ${title} — ${body}`);
        }
      });
    }, 20000);
    return () => clearInterval(id);
  }, [alertsOn, timings]);

  const countdown = nextAt ? formatCountdown(nextAt.getTime() - now.getTime()) : "";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3">
        <Clock className="w-6 h-6 text-primary" />
        <h1 className="text-3xl md:text-4xl font-semibold">Prayer Times</h1>
      </div>
      <p className="text-muted-foreground mt-1">
        We use your location to calculate today's Salah timings and alert you when each prayer begins.
      </p>

      {!coords && (
        <div className="mt-8 ornament-border rounded-2xl p-8 text-center">
          <MapPin className="w-8 h-8 mx-auto text-primary" />
          <p className="mt-3 font-medium">Allow location access to see your prayer times.</p>
          <button
            onClick={requestLocation}
            disabled={loading}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
            Use my location
          </button>
          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        </div>
      )}

      {timings && (
        <>
          <div className="mt-6 rounded-2xl border bg-card p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <div className="text-xs uppercase tracking-widest text-gold">Today</div>
                <div className="text-lg font-semibold">{date}</div>
                <div className="text-sm text-muted-foreground">{city}</div>
              </div>
              <button
                onClick={alertsOn ? () => setAlertsOn(false) : enableAlerts}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border ${
                  alertsOn ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-accent"
                }`}
              >
                {alertsOn ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                {alertsOn ? "Alerts on" : "Enable alerts"}
              </button>
            </div>

            {nextPrayer && (
              <div className="mt-5 rounded-xl bg-primary/5 border border-primary/20 p-4">
                <div className="text-xs uppercase tracking-widest text-primary">Next prayer</div>
                <div className="flex items-baseline justify-between mt-1">
                  <div className="text-2xl font-semibold">{nextPrayer}</div>
                  <div className="text-sm font-medium text-primary">in {countdown}</div>
                </div>
              </div>
            )}
          </div>

          <ul className="mt-6 grid sm:grid-cols-2 gap-3">
            {PRAYERS.map((p) => (
              <li
                key={p}
                className={`rounded-xl border p-4 flex items-center justify-between ${
                  currentPrayer === p ? "border-gold bg-gold/5" : "border-border bg-card"
                }`}
              >
                <div>
                  <div className="font-medium">{p}</div>
                  {currentPrayer === p && <div className="text-xs text-gold mt-0.5">Current</div>}
                </div>
                <div className="text-lg font-semibold tabular-nums">{timings[p]}</div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function formatCountdown(ms: number) {
  if (ms < 0) return "now";
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}
