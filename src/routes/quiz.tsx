import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Brain, Check, X, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Islamic Quiz — Noor al-Quran" },
      { name: "description", content: "Test your knowledge of Islam, Muslim history, the Quran, and authentic Hadith with a multiple-choice quiz." },
    ],
  }),
  component: QuizPage,
});

type Q = { q: string; choices: string[]; answer: number; explain?: string };

const QUESTIONS: Q[] = [
  { q: "How many Surahs are in the Holy Quran?", choices: ["110", "114", "120", "99"], answer: 1 },
  { q: "In which cave did the Prophet Muhammad ﷺ first receive revelation?", choices: ["Cave Thawr", "Cave Hira", "Cave of Uhud", "Cave of Badr"], answer: 1 },
  { q: "Who is known as Khalilullah, the friend of Allah?", choices: ["Musa", "Isa", "Ibrahim", "Nuh"], answer: 2, explain: "Prophet Ibrahim (Abraham) is called Khalilullah." },
  { q: "Which prophet was swallowed by a great fish?", choices: ["Yunus", "Yusuf", "Ilyas", "Dawud"], answer: 0 },
  { q: "Which Surah is called 'the heart of the Quran'?", choices: ["Al-Fatiha", "Yaseen", "Al-Mulk", "Al-Kahf"], answer: 1 },
  { q: "How many obligatory (fard) prayers are there each day?", choices: ["3", "5", "7", "6"], answer: 1 },
  { q: "How many rakʿah is Fajr prayer (fard)?", choices: ["2", "3", "4", "5"], answer: 0 },
  { q: "In which month was the Quran first revealed?", choices: ["Shaʿban", "Muharram", "Ramadan", "Rajab"], answer: 2 },
  { q: "What is the night the Quran was sent down called?", choices: ["Laylat al-Miʿraj", "Laylat al-Qadr", "Laylat al-Baraʾah", "Laylat al-Israʾ"], answer: 1 },
  { q: "Hijrah is the migration of the Prophet ﷺ from Makkah to which city?", choices: ["Taif", "Madinah", "Damascus", "Khaybar"], answer: 1 },
  { q: "Who was the first Caliph after the Prophet ﷺ?", choices: ["Umar ibn al-Khattab", "Uthman ibn Affan", "Ali ibn Abi Talib", "Abu Bakr as-Siddiq"], answer: 3 },
  { q: "Which battle is known as the first major battle in Islam (2 AH)?", choices: ["Uhud", "Khandaq", "Badr", "Hunayn"], answer: 2 },
  { q: "Who compiled the most authentic collection of hadith known as Sahih?", choices: ["Imam Muslim", "Imam Bukhari", "Imam Tirmidhi", "Imam Malik"], answer: 1, explain: "Sahih al-Bukhari is considered the most authentic hadith collection." },
  { q: "How many pillars of Islam are there?", choices: ["4", "5", "6", "7"], answer: 1 },
  { q: "How many articles of faith (iman) are there?", choices: ["5", "6", "7", "10"], answer: 1 },
  { q: "Which Surah does NOT begin with Bismillah?", choices: ["Al-Baqarah", "At-Tawbah", "Yaseen", "Al-Mulk"], answer: 1 },
  { q: "Who was the Prophet ﷺ's first wife?", choices: ["Aisha", "Khadijah", "Hafsa", "Zaynab"], answer: 1 },
  { q: "What is the literal meaning of 'Islam'?", choices: ["Peace", "Submission to Allah", "Purity", "Faith"], answer: 1 },
  { q: "The Kaʿbah was built (raised) by which two prophets?", choices: ["Adam and Nuh", "Ibrahim and Ismail", "Musa and Harun", "Dawud and Sulayman"], answer: 1 },
  { q: "Which prophet could understand the speech of birds and ants?", choices: ["Dawud", "Sulayman", "Yusuf", "Isa"], answer: 1 },
  { q: "The hadith 'Actions are but by intentions' is reported by which companion?", choices: ["Abu Hurayrah", "Umar ibn al-Khattab", "Ibn Abbas", "Anas ibn Malik"], answer: 1 },
  { q: "Which pilgrimage is performed in Dhul-Hijjah and is a pillar of Islam?", choices: ["Umrah", "Ziyarah", "Hajj", "Iʿtikaf"], answer: 2 },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function QuizPage() {
  const [seed, setSeed] = useState(0);
  const questions = useMemo(() => shuffle(QUESTIONS).slice(0, 10), [seed]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[idx];

  const onPick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= questions.length) setDone(true);
    else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setSeed((s) => s + 1);
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3">
        <Brain className="w-6 h-6 text-primary" />
        <h1 className="text-3xl md:text-4xl font-semibold">Islamic Quiz</h1>
      </div>
      <p className="text-muted-foreground mt-1">10 questions on the Quran, Islamic history, and Hadith.</p>

      {!done ? (
        <div className="mt-8 ornament-border rounded-2xl p-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Question {idx + 1} of {questions.length}</span>
            <span>Score: {score}</span>
          </div>
          <h2 className="mt-4 text-lg md:text-xl font-semibold">{q.q}</h2>
          <ul className="mt-5 space-y-2">
            {q.choices.map((c, i) => {
              const isCorrect = picked !== null && i === q.answer;
              const isWrongPick = picked === i && i !== q.answer;
              return (
                <li key={i}>
                  <button
                    onClick={() => onPick(i)}
                    disabled={picked !== null}
                    className={`w-full text-left p-3 rounded-lg border transition-colors flex items-center justify-between ${
                      isCorrect ? "border-primary bg-primary/10"
                      : isWrongPick ? "border-destructive bg-destructive/10"
                      : "border-border hover:border-primary/40 hover:bg-accent"
                    }`}
                  >
                    <span>{c}</span>
                    {isCorrect && <Check className="w-4 h-4 text-primary" />}
                    {isWrongPick && <X className="w-4 h-4 text-destructive" />}
                  </button>
                </li>
              );
            })}
          </ul>
          {picked !== null && (
            <div className="mt-5 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {q.explain || (picked === q.answer ? "Correct!" : `Correct answer: ${q.choices[q.answer]}`)}
              </p>
              <button
                onClick={next}
                className="rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-medium hover:opacity-90"
              >
                {idx + 1 >= questions.length ? "See result" : "Next"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-8 ornament-border rounded-2xl p-8 text-center">
          <div className="text-xs uppercase tracking-widest text-gold">Your score</div>
          <div className="mt-2 text-5xl font-semibold">{score} / {questions.length}</div>
          <p className="mt-3 text-muted-foreground">
            {score === questions.length ? "MashaAllah — perfect score!"
              : score >= questions.length * 0.7 ? "Great job — keep learning!"
              : "Keep studying — every effort is rewarded."}
          </p>
          <button
            onClick={restart}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90"
          >
            <RefreshCw className="w-4 h-4" /> Play again
          </button>
        </div>
      )}
    </div>
  );
}
