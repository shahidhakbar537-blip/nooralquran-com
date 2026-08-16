import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Brain, Check, X } from "lucide-react";
import { QUIZ_ANSWERS, QUIZ_CONTENT } from "@/content/quiz";
import { LanguageSwitcher, useLang } from "@/lib/i18n";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Islamic Quiz — Quran, History & Hadith" },
      { name: "description", content: "Test your knowledge of the Quran, Islamic history and Hadith with a multiple-choice quiz available in English, Hindi, Telugu, Kannada and Tamil." },
      { property: "og:title", content: "Islamic Quiz — Quran, History & Hadith" },
      { property: "og:description", content: "Test your knowledge of the Quran, Islamic history and Hadith with a multiple-choice quiz." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Islamic Quiz — Quran, History & Hadith" },
      { name: "twitter:description", content: "Test your knowledge of the Quran, Islamic history and Hadith." },
    ],
  }),
  component: QuizPage,
});

const ROUND = 10;

function QuizPage() {
  const { lang } = useLang();
  const t = QUIZ_CONTENT[lang];

  const [seed, setSeed] = useState(0);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  // Pick a stable set of questions for this round
  const order = useMemo(() => {
    const idx = t.questions.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(((Math.sin((i + 1) * (seed + 7)) + 1) / 2) * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx.slice(0, Math.min(ROUND, idx.length));
  }, [t.questions, seed]);

  // Reset when the language changes
  useEffect(() => {
    setStep(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }, [lang]);

  const qIndex = order[step];
  const q = t.questions[qIndex];
  const answer = QUIZ_ANSWERS[qIndex];

  const restart = () => {
    setSeed((s) => s + 1);
    setStep(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (step + 1 >= order.length) {
      setDone(true);
      return;
    }
    setStep((s) => s + 1);
    setPicked(null);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <header className="text-center">
        <div className="flex items-center justify-center gap-3">
          <Brain className="w-6 h-6 text-primary" />
          <h1 className="text-3xl md:text-4xl font-semibold">{t.title}</h1>
        </div>
        <p className="mt-2 text-muted-foreground">{t.subtitle}</p>
        <LanguageSwitcher className="mt-4" />
      </header>

      {done ? (
        <div className="mt-10 ornament-border rounded-2xl p-8 text-center">
          <div className="text-xs uppercase tracking-widest text-gold">{t.yourScore}</div>
          <div className="mt-2 text-5xl font-bold text-primary">
            {score}/{order.length}
          </div>
          <p className="mt-3 text-sm text-foreground/80">
            {score === order.length
              ? t.perfectScore
              : score >= Math.ceil(order.length * 0.6)
                ? t.greatJob
                : t.keepStudying}
          </p>
          <button
            onClick={restart}
            className="mt-6 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            {t.playAgain}
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{t.questionCounter(step + 1, order.length)}</span>
            <span>{t.scoreLabel(score)}</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-accent">
            <div
              className="h-1.5 rounded-full bg-primary transition-all"
              style={{ width: `${((step + (picked !== null ? 1 : 0)) / order.length) * 100}%` }}
            />
          </div>

          <div className="mt-6 ornament-border rounded-2xl p-6">
            <h2 className="text-lg md:text-xl font-semibold leading-relaxed">{q.q}</h2>
            <div className="mt-5 space-y-2">
              {q.choices.map((c, i) => {
                const isAnswer = i === answer;
                const isPicked = i === picked;
                const revealed = picked !== null;
                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    disabled={revealed}
                    className={`w-full flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                      revealed && isAnswer
                        ? "border-primary bg-primary/10"
                        : revealed && isPicked
                          ? "border-destructive bg-destructive/10"
                          : "border-border hover:bg-accent"
                    }`}
                  >
                    <span>{c}</span>
                    {revealed && isAnswer && <Check className="w-4 h-4 text-primary shrink-0" />}
                    {revealed && isPicked && !isAnswer && (
                      <X className="w-4 h-4 text-destructive shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <div className="mt-5 rounded-lg bg-accent/40 p-4 text-sm">
                <div className="font-medium">
                  {picked === answer
                    ? t.correct
                    : `${t.correctAnswerPrefix} ${q.choices[answer]}`}
                </div>
                {q.explain && <p className="mt-1 text-muted-foreground">{q.explain}</p>}
                <button
                  onClick={next}
                  className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  {step + 1 >= order.length ? t.seeResultBtn : t.nextBtn}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
