"use client";

import { useCallback, useId, useMemo, useState } from "react";

/**
 * Practice set.
 *
 * Rebuilt around form semantics. The old version used a stack of `<button>`
 * elements for the options, which announces as "button, button, button" and
 * gives no sense of "1 of 4 selected". Radio inputs in a fieldset with a legend
 * are what this is, so that is what it uses — arrow keys move between options
 * for free, and the group reads correctly.
 *
 * Feedback lands in an aria-live region so a screen reader user hears the
 * result without hunting for it. At the end there is a review pass listing what
 * was missed, because a bare score teaches nothing.
 */

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  skill?: string;
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export function PracticeSet({ questions }: { questions: Question[] }) {
  const groupId = useId();
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);

  const question = questions[index];

  const score = useMemo(
    () =>
      questions.reduce(
        (total, q) => (answers[q.id] === q.correctIndex ? total + 1 : total),
        0,
      ),
    [answers, questions],
  );

  const check = useCallback(() => {
    if (choice === null) return;
    setChecked(true);
    setAnswers((current) => ({ ...current, [question.id]: choice }));
  }, [choice, question.id]);

  const advance = useCallback(() => {
    if (index + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setChoice(null);
    setChecked(false);
  }, [index, questions.length]);

  const restart = useCallback(() => {
    setIndex(0);
    setChoice(null);
    setChecked(false);
    setAnswers({});
    setFinished(false);
  }, []);

  const retryMissed = useCallback(() => {
    setAnswers({});
    setIndex(0);
    setChoice(null);
    setChecked(false);
    setFinished(false);
  }, []);

  if (questions.length === 0) return null;

  /* ── Results ───────────────────────────────────────────────────────── */
  if (finished) {
    const answered = Object.keys(answers).length;
    const percent = answered > 0 ? Math.round((score / answered) * 100) : 0;
    const missed = questions.filter(
      (q) => q.id in answers && answers[q.id] !== q.correctIndex,
    );

    return (
      <div>
        <div className="sheet-tabbed p-7">
          <p className="label mb-3">Result</p>
          <p
            className="tnum text-[3rem] leading-none"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            {score}
            <span style={{ color: "var(--ink-faint)", fontSize: "1.5rem" }}>/{answered}</span>
          </p>
          <p className="mt-3 max-w-[46ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
            {percent >= 80
              ? "That is comfortably in the range you want. Move on to the harder material — timed writing, or the units you have been avoiding."
              : percent >= 55
                ? "Roughly where most people are a few weeks out. The gap is almost always specific rather than general: look at what you missed below."
                : "Worth going back to the notes before doing more questions. Getting the same thing wrong faster does not help."}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <button type="button" onClick={restart} className="btn btn-solid btn-sm">
              Start again
            </button>
            {missed.length > 0 ? (
              <button type="button" onClick={retryMissed} className="btn btn-outline btn-sm">
                Retry the whole set
              </button>
            ) : null}
          </div>
        </div>

        {missed.length > 0 ? (
          <section className="mt-10" aria-labelledby="missed-heading">
            <h3 id="missed-heading" className="mb-4 rule-top pt-5 text-[1.25rem]">
              What you missed ({missed.length})
            </h3>
            <ol className="space-y-6">
              {missed.map((q) => (
                <li key={q.id} className="rule-top pt-4">
                  <p className="text-[0.9375rem] font-semibold">{q.question}</p>
                  <p className="mt-2 text-[0.875rem]" style={{ color: "var(--mark)" }}>
                    You chose {LETTERS[answers[q.id]]} — {q.options[answers[q.id]]}
                  </p>
                  <p className="mt-1 text-[0.875rem]" style={{ color: "var(--good)" }}>
                    Correct: {LETTERS[q.correctIndex]} — {q.options[q.correctIndex]}
                  </p>
                  <p className="mt-2.5 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                    {q.explanation}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
      </div>
    );
  }

  /* ── Question ──────────────────────────────────────────────────────── */
  const correct = checked && choice === question.correctIndex;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p
          className="text-[0.8125rem] tabular-nums"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
        >
          Question {index + 1} of {questions.length}
        </p>
        <p
          className="text-[0.8125rem] tabular-nums"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
        >
          {score} correct so far
        </p>
      </div>

      <div
        className="mb-7 h-[3px] w-full overflow-hidden"
        style={{ background: "var(--paper-sunk)" }}
        role="progressbar"
        aria-valuenow={index + 1}
        aria-valuemin={1}
        aria-valuemax={questions.length}
        aria-label="Progress through the practice set"
      >
        <div
          className="h-full transition-[width] duration-300 ease-[cubic-bezier(0.2,0.7,0.3,1)]"
          style={{ width: `${((index + 1) / questions.length) * 100}%`, background: "var(--subject-ink)" }}
        />
      </div>

      <fieldset className="sheet p-6 sm:p-8" style={{ margin: 0 }} disabled={checked}>
        {question.skill ? <p className="label mb-3">{question.skill}</p> : null}

        <legend
          className="mb-5 block text-[clamp(1.0625rem,1rem+0.35vw,1.1875rem)]"
          style={{ fontFamily: "var(--font-display)", lineHeight: 1.4, float: "left", width: "100%" }}
        >
          {question.question}
        </legend>

        <div className="space-y-2">
          {question.options.map((option, optionIndex) => {
            const selected = choice === optionIndex;
            const isAnswer = optionIndex === question.correctIndex;

            let borderColor = "var(--rule)";
            let background = "transparent";
            let textColor = "var(--ink)";

            if (checked) {
              if (isAnswer) {
                borderColor = "var(--good)";
                background = "var(--good-wash)";
              } else if (selected) {
                borderColor = "var(--mark)";
                background = "var(--mark-wash)";
              } else {
                textColor = "var(--ink-faint)";
              }
            } else if (selected) {
              borderColor = "var(--subject-ink)";
              background = "var(--subject-tint)";
            }

            return (
              <label
                key={optionIndex}
                className="flex cursor-pointer items-start gap-3 px-3.5 py-3 transition-colors duration-150"
                style={{
                  border: `1px solid ${borderColor}`,
                  borderRadius: "var(--radius-cut)",
                  background,
                  color: textColor,
                  cursor: checked ? "default" : "pointer",
                }}
              >
                <input
                  type="radio"
                  name={`${groupId}-q${question.id}`}
                  value={optionIndex}
                  checked={selected}
                  onChange={() => setChoice(optionIndex)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className="mt-px flex h-[1.375rem] w-[1.375rem] shrink-0 items-center justify-center text-[0.6875rem] font-semibold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    border: `1px solid ${borderColor === "var(--rule)" ? "var(--rule-strong)" : borderColor}`,
                    borderRadius: "var(--radius-edge)",
                    background:
                      checked && isAnswer
                        ? "var(--good)"
                        : checked && selected
                          ? "var(--mark)"
                          : selected
                            ? "var(--subject-ink)"
                            : "transparent",
                    color:
                      (checked && (isAnswer || selected)) || selected
                        ? "var(--paper-raised)"
                        : "var(--ink-faint)",
                  }}
                >
                  {LETTERS[optionIndex]}
                </span>
                <span className="text-[0.9375rem]" style={{ lineHeight: 1.5 }}>
                  {option}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Result. Polite so it queues behind whatever the user is reading. */}
      <div aria-live="polite" aria-atomic="true">
        {checked ? (
          <div
            className="mt-4 p-4 enter-fade"
            style={{
              border: `1px solid ${correct ? "var(--good)" : "var(--mark)"}`,
              borderLeftWidth: 3,
              borderRadius: "var(--radius-cut)",
              background: correct ? "var(--good-wash)" : "var(--mark-wash)",
            }}
          >
            <p
              className="mb-1.5 text-[0.75rem] uppercase tracking-[0.08em]"
              style={{ fontFamily: "var(--font-mono)", color: correct ? "var(--good)" : "var(--mark)" }}
            >
              {correct
                ? "Correct"
                : `Not quite — the answer is ${LETTERS[question.correctIndex]}`}
            </p>
            <p className="text-[0.9375rem]" style={{ color: "var(--ink)", lineHeight: 1.6 }}>
              {question.explanation}
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-[0.75rem]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
          {checked ? "" : "Pick one, then check."}
        </p>
        {checked ? (
          <button type="button" onClick={advance} className="btn btn-solid btn-sm">
            {index + 1 >= questions.length ? "See result" : "Next question →"}
          </button>
        ) : (
          <button type="button" onClick={check} disabled={choice === null} className="btn btn-solid btn-sm">
            Check answer
          </button>
        )}
      </div>
    </div>
  );
}
