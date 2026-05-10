"use client";
import { useState, useCallback } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  skill?: string;
}

const theme: Record<string, { btn: string; selected: string; bar: string }> = {
  blue: { btn: "bg-blue-600 hover:bg-blue-700", selected: "border-blue-600 bg-blue-50 dark:bg-blue-950", bar: "bg-blue-600" },
  emerald: { btn: "bg-emerald-600 hover:bg-emerald-700", selected: "border-emerald-600 bg-emerald-50 dark:bg-emerald-950", bar: "bg-emerald-600" },
  purple: { btn: "bg-purple-600 hover:bg-purple-700", selected: "border-purple-600 bg-purple-50 dark:bg-purple-950", bar: "bg-purple-600" },
};

export function QuizSection({ questions, color }: { questions: Question[]; color: string }) {
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const t = theme[color] || theme.blue;
  const q = questions[cur];

  const submit = useCallback(() => {
    if (sel === null) return;
    setAnswered(true);
    if (sel === q.correctIndex) setScore(s => s + 1);
  }, [sel, q]);

  const next = useCallback(() => {
    if (cur + 1 >= questions.length) { setDone(true); return; }
    setCur(c => c + 1);
    setSel(null);
    setAnswered(false);
  }, [cur, questions.length]);

  const restart = useCallback(() => {
    setCur(0);
    setSel(null);
    setAnswered(false);
    setScore(0);
    setDone(false);
  }, []);

  if (!questions.length) return <p className="text-sm text-muted-foreground">No questions available.</p>;

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-xl mx-auto card p-8 text-center">
        <div className="text-4xl mb-2">{pct >= 80 ? "🎉" : pct >= 60 ? "👏" : "📚"}</div>
        <h3 className="text-xl font-bold">Quiz Complete!</h3>
        <p className="text-3xl font-extrabold mt-2">{score}/{questions.length}</p>
        <p className="text-muted-foreground">{pct}%</p>
        <button onClick={restart} className={`btn ${t.btn} text-white mt-4`}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between text-xs text-muted-foreground mb-2">
        <span>Question {cur + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-1.5 mb-5">
        <div className={`${t.bar} h-1.5 rounded-full transition-all`} style={{ width: `${((cur + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="card p-5">
        {q.skill && <span className="badge bg-muted text-muted-foreground text-[10px] mb-2">{q.skill}</span>}
        <h3 className="text-sm font-semibold mb-4">{q.question}</h3>

        <div className="space-y-2">
          {q.options.map((opt, i) => {
            let cls = "border border-border hover:bg-muted/50";
            if (answered) {
              if (i === q.correctIndex) cls = "border-2 border-green-500 bg-green-50 dark:bg-green-950";
              else if (i === sel) cls = "border-2 border-red-500 bg-red-50 dark:bg-red-950";
              else cls = "border border-border opacity-50";
            } else if (i === sel) cls = `border-2 ${t.selected}`;
            return (
              <button key={i} onClick={() => !answered && setSel(i)} disabled={answered}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-start gap-2 transition ${cls}`}>
                <span className="w-6 h-6 rounded bg-muted flex items-center justify-center text-[11px] font-semibold mt-px">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${sel === q.correctIndex ? "bg-green-50 dark:bg-green-950 border border-green-200" : "bg-amber-50 dark:bg-amber-950 border border-amber-200"}`}>
            <p className="font-semibold text-xs mb-1">{sel === q.correctIndex ? "✓ Correct!" : "✗ Incorrect"}</p>
            <p className="text-xs text-muted-foreground">{q.explanation}</p>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          {!answered ? (
            <button onClick={submit} disabled={sel === null} className={`btn ${t.btn} text-white text-xs disabled:opacity-50`}>Check Answer</button>
          ) : (
            <button onClick={next} className={`btn ${t.btn} text-white text-xs`}>{cur + 1 >= questions.length ? "See Results" : "Next →"}</button>
          )}
        </div>
      </div>
    </div>
  );
}
