import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/juz")({
  head: () => ({
    meta: [
      { title: "30 Juz of the Quran — Noor al-Quran" },
      { name: "description", content: "Read the Holy Quran organized by its 30 Juz (Para). Tap any Juz to open it in Arabic with audio." },
    ],
  }),
  component: JuzList,
});

function JuzList() {
  const juzList = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-semibold">The 30 Juz</h1>
      <p className="text-muted-foreground mt-1">The Quran is traditionally divided into 30 equal parts called Juz (or Para), often read one per day during Ramadan.</p>

      <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {juzList.map((j) => (
          <li key={j}>
            <Link
              to="/juz/$number"
              params={{ number: String(j) }}
              className="block rounded-xl border border-border bg-card p-5 text-center hover:border-gold hover:shadow-sm transition-all"
            >
              <div className="text-xs uppercase tracking-widest text-gold">Juz</div>
              <div className="text-3xl font-semibold mt-1">{j}</div>
              <div className="font-arabic text-lg text-primary mt-1">الجزء {toArabicNum(j)}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function toArabicNum(n: number) {
  return String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);
}
