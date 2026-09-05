"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useStoredState } from "@/lib/use-stored-state";

/**
 * Timed paper.
 *
 * One change worth calling out. The previous implementation "graded" free
 * responses by counting words: under 50 words scored zero, over 500 scored 90%
 * of the marks. That is not marking, it is a word counter wearing a rubric, and
 * a student who trusted it would learn to pad. It is gone.
 *
 * What replaces it: the clock is real, the multiple choice is marked properly,
 * and the written section gives you the actual rubric rows as a checklist to
 * mark yourself against. Self-assessment against a real rubric is what AP
 * teachers have students do, and it is honest about what a static site can and
 * cannot know.
 *
 * Answers and drafts are held in localStorage so a mistyped URL mid-paper does
 * not lose two hours of writing.
 */

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  skill?: string;
}

interface Source {
  id: string;
  title: string;
  content: string;
}

interface FrqPrompt {
  id: string;
  prompt: string;
  type: string;
  points: number;
  rubric: string[];
  sources?: Source[];
}

interface ExamSection {
  name: string;
  timeMinutes: number;
  type: "mcq" | "frq";
  instructions: string;
  questionIds?: number[];
  frqPrompts?: FrqPrompt[];
}

export interface MockExam {
  id: number;
  title: string;
  description: string;
  sections: ExamSection[];
}

type Phase = "briefing" | "sitting" | "review";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function clock(totalSeconds: number): string {
  const s = Math.max(0, totalSeconds);
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
}

/** Stable identity for the empty case; see the note in use-stored-state. */
const NO_DRAFTS: Record<string, string> = Object.freeze({});

/** Anything in storage that is not a flat map of strings is not a draft. */
function reviveDrafts(value: unknown): Record<string, string> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const clean: Record<string, string> = {};
  for (const [key, text] of Object.entries(value as Record<string, unknown>)) {
    if (typeof text === "string") clean[key] = text;
  }
  return clean;
}

export function TimedPaper({
  exam,
  allQuestions,
  courseSlug,
}: {
  exam: MockExam;
  allQuestions: Question[];
  courseSlug: string;
}) {
  const draftKey = `aps.exam.${courseSlug}.${exam.id}`;

  const [phase, setPhase] = useState<Phase>("briefing");
  const [sectionIndex, setSectionIndex] = useState(0);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  const [selfMarks, setSelfMarks] = useState<Record<string, boolean>>({});
  const [expired, setExpired] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const section = exam.sections[sectionIndex];

  const sectionQuestions = useMemo(() => {
    if (section?.type !== "mcq" || !section.questionIds) return [];
    return section.questionIds
      .map((id) => allQuestions.find((q) => q.id === id))
      .filter((q): q is Question => Boolean(q));
  }, [section, allQuestions]);

  /* Written answers are stored rather than merely held in state, so closing the
     tab forty minutes into a paper does not destroy the essay. localStorage is
     the source of truth and every keystroke writes through it — a debounce
     would be nice for the disk but would open a window where the last sentence
     you typed is the one that gets lost, which is the wrong trade here. */
  const [drafts, setDrafts] = useStoredState<Record<string, string>>(
    draftKey,
    NO_DRAFTS,
    reviveDrafts,
  );

  /* The clock. Anchored to a deadline timestamp rather than decremented, so it
     stays accurate when the tab is backgrounded and setInterval is throttled. */
  useEffect(() => {
    if (phase !== "sitting" || deadline === null) return;

    const tick = () => {
      const left = Math.round((deadline - Date.now()) / 1000);
      setRemaining(left);
      if (left <= 0) setExpired(true);
    };
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [phase, deadline]);

  /* Warn before an accidental reload mid-paper. */
  useEffect(() => {
    if (phase !== "sitting") return;
    const handler = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [phase]);

  const startSection = useCallback(
    (index: number) => {
      setSectionIndex(index);
      setDeadline(Date.now() + exam.sections[index].timeMinutes * 60_000);
      setExpired(false);
      setPhase("sitting");
      // Move focus to the new section heading so keyboard and screen reader
      // users are not stranded at the bottom of the previous one.
      requestAnimationFrame(() => headingRef.current?.focus());
    },
    [exam.sections],
  );

  const finishSection = useCallback(() => {
    if (sectionIndex + 1 < exam.sections.length) startSection(sectionIndex + 1);
    else setPhase("review");
  }, [sectionIndex, exam.sections.length, startSection]);

  /* ── Briefing ──────────────────────────────────────────────────────── */
  if (phase === "briefing") {
    const totalMinutes = exam.sections.reduce((sum, s) => sum + s.timeMinutes, 0);
    return (
      <div className="sheet-tabbed mx-auto max-w-2xl p-7">
        <p className="label mb-2">Full paper · {totalMinutes} minutes</p>
        <h3 className="text-[1.5rem]">{exam.title}</h3>
        <p className="mt-2 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
          {exam.description}
        </p>

        <ol className="my-6 rule-top">
          {exam.sections.map((s, i) => (
            <li key={s.name} className="flex items-baseline gap-4 rule-bottom py-3">
              <span
                className="shrink-0 tabular-nums text-[0.6875rem]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--rule-strong)" }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">
                <span className="block text-[0.9375rem] font-semibold">{s.name}</span>
                <span className="block text-[0.8125rem]" style={{ color: "var(--ink-soft)" }}>
                  {s.instructions}
                </span>
              </span>
              <span
                className="shrink-0 tabular-nums text-[0.8125rem]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--subject-ink)" }}
              >
                {s.timeMinutes} min
              </span>
            </li>
          ))}
        </ol>

        <div className="sunk mb-6 p-4">
          <h4 className="label mb-2">Before you start</h4>
          <ul className="space-y-1.5 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
            <li>The clock does not pause. That is the point.</li>
            <li>Multiple choice is marked automatically. Written answers are not — you will mark those yourself against the real rubric.</li>
            <li>What you type is saved in this browser only, so a reload will not lose it.</li>
          </ul>
        </div>

        <button type="button" onClick={() => startSection(0)} className="btn btn-solid w-full">
          Start the clock
        </button>
      </div>
    );
  }

  /* ── Review ────────────────────────────────────────────────────────── */
  if (phase === "review") {
    const mcqSections = exam.sections.filter((s) => s.type === "mcq");
    const allMcq = mcqSections
      .flatMap((s) => s.questionIds ?? [])
      .map((id) => allQuestions.find((q) => q.id === id))
      .filter((q): q is Question => Boolean(q));

    const correct = allMcq.filter((q) => mcqAnswers[q.id] === q.correctIndex).length;
    const frqPrompts = exam.sections.flatMap((s) => s.frqPrompts ?? []);
    const claimedPoints = frqPrompts.reduce(
      (sum, prompt) =>
        sum + prompt.rubric.filter((_, i) => selfMarks[`${prompt.id}:${i}`]).length,
      0,
    );
    const totalRubricRows = frqPrompts.reduce((sum, prompt) => sum + prompt.rubric.length, 0);

    return (
      <div className="mx-auto max-w-3xl">
        <div className="sheet-tabbed p-7">
          <p className="label mb-3">Paper finished</p>
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {allMcq.length > 0 ? (
              <div>
                <p
                  className="tnum text-[2.5rem] leading-none"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                >
                  {correct}
                  <span style={{ color: "var(--ink-faint)", fontSize: "1.25rem" }}>/{allMcq.length}</span>
                </p>
                <p className="label mt-1.5">multiple choice</p>
              </div>
            ) : null}
            {totalRubricRows > 0 ? (
              <div>
                <p
                  className="tnum text-[2.5rem] leading-none"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--subject-ink)" }}
                >
                  {claimedPoints}
                  <span style={{ color: "var(--ink-faint)", fontSize: "1.25rem" }}>/{totalRubricRows}</span>
                </p>
                <p className="label mt-1.5">rubric rows you claimed</p>
              </div>
            ) : null}
          </div>
        </div>

        {allMcq.length > 0 ? (
          <section className="mt-10" aria-labelledby="mcq-review-heading">
            <h4 id="mcq-review-heading" className="mb-4 rule-top pt-5 text-[1.25rem]">
              Multiple choice, question by question
            </h4>
            <ol className="rule-top">
              {allMcq.map((q, i) => {
                const given = mcqAnswers[q.id];
                const ok = given === q.correctIndex;
                return (
                  <li key={q.id} className="rule-bottom py-4">
                    <div className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 tabular-nums text-[0.6875rem]"
                        style={{ fontFamily: "var(--font-mono)", color: ok ? "var(--good)" : "var(--mark)" }}
                      >
                        {String(i + 1).padStart(2, "0")} {ok ? "✓" : "✗"}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.9375rem] font-medium">{q.question}</p>
                        <p className="mt-1.5 text-[0.8125rem]" style={{ color: ok ? "var(--good)" : "var(--mark)" }}>
                          {given === undefined
                            ? "Left blank"
                            : `You chose ${LETTERS[given]} — ${q.options[given]}`}
                        </p>
                        {!ok ? (
                          <>
                            <p className="mt-1 text-[0.8125rem]" style={{ color: "var(--good)" }}>
                              Answer: {LETTERS[q.correctIndex]} — {q.options[q.correctIndex]}
                            </p>
                            <p className="mt-1.5 text-[0.8125rem]" style={{ color: "var(--ink-soft)" }}>
                              {q.explanation}
                            </p>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        ) : null}

        {frqPrompts.length > 0 ? (
          <section className="mt-12" aria-labelledby="self-mark-heading">
            <h4 id="self-mark-heading" className="mb-2 rule-top pt-5 text-[1.25rem]">
              Mark your own writing
            </h4>
            <p className="mb-6 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
              No automated system can tell you whether your commentary earned the sophistication
              point, and any site that claims to is guessing at your word count. Read what you wrote
              against each rubric row and be strict — the reader in May will be.
            </p>

            {frqPrompts.map((prompt) => (
              <article key={prompt.id} className="sheet mb-6 p-5">
                <p className="label mb-1.5">{prompt.type} · {prompt.points} points</p>
                <p className="mb-4 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {prompt.prompt}
                </p>

                <h5 className="label mb-2">Your response</h5>
                <p
                  className="sunk mb-5 max-h-64 overflow-y-auto whitespace-pre-wrap p-3 text-[0.875rem]"
                  style={{ fontFamily: "var(--font-display)", lineHeight: 1.6 }}
                >
                  {drafts[prompt.id]?.trim() || "You did not write anything for this one."}
                </p>

                <h5 className="label mb-2">Rubric</h5>
                <ul className="space-y-2">
                  {prompt.rubric.map((row, i) => {
                    const key = `${prompt.id}:${i}`;
                    return (
                      <li key={key}>
                        <label className="flex cursor-pointer items-start gap-2.5 text-[0.875rem]">
                          <input
                            type="checkbox"
                            checked={Boolean(selfMarks[key])}
                            onChange={(event) =>
                              setSelfMarks((current) => ({ ...current, [key]: event.target.checked }))
                            }
                            className="mt-[0.2rem] h-4 w-4 shrink-0"
                            style={{ accentColor: "var(--subject-ink)" }}
                          />
                          <span>{row}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </section>
        ) : null}

        <button
          type="button"
          onClick={() => {
            setPhase("briefing");
            setMcqAnswers({});
            setSelfMarks({});
            setSectionIndex(0);
          }}
          className="btn btn-outline mt-6"
        >
          Sit it again
        </button>
      </div>
    );
  }

  /* ── Sitting ───────────────────────────────────────────────────────── */
  const low = remaining <= 300;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Invigilator's clock */}
      <div
        className="sticky top-28 z-20 mb-8 flex flex-wrap items-center justify-between gap-4 px-4 py-3"
        style={{
          background: expired ? "var(--mark-wash)" : "var(--paper-raised)",
          border: `1px solid ${expired ? "var(--mark)" : "var(--rule-strong)"}`,
          borderRadius: "var(--radius-cut)",
          boxShadow: "var(--shadow-lift)",
        }}
      >
        <div>
          <p className="label">
            Section {sectionIndex + 1} of {exam.sections.length}
          </p>
          <p className="text-[0.9375rem] font-semibold">{section.name}</p>
        </div>
        <div className="text-right">
          <p
            className="tnum text-[1.625rem] leading-none"
            style={{
              fontFamily: "var(--font-mono)",
              color: expired ? "var(--mark)" : low ? "var(--warn)" : "var(--ink)",
            }}
          >
            {clock(remaining)}
          </p>
          <p className="label mt-1">{expired ? "time up" : "remaining"}</p>
        </div>
      </div>

      <h3 ref={headingRef} tabIndex={-1} className="mb-2 text-[1.375rem] outline-none">
        {section.name}
      </h3>
      <p className="mb-8 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
        {section.instructions}
      </p>

      {expired ? (
        <p
          role="alert"
          className="mb-6 p-3 text-[0.875rem]"
          style={{ background: "var(--mark-wash)", border: "1px solid var(--mark)", borderRadius: "var(--radius-cut)" }}
        >
          Time is up for this section. In the real thing you would stop writing now. You can still
          finish if you want the practice — just be honest with yourself about it afterwards.
        </p>
      ) : null}

      {section.type === "mcq" ? (
        <ol className="space-y-8">
          {sectionQuestions.map((question, qIndex) => (
            <li key={question.id}>
              <fieldset style={{ margin: 0, border: 0, padding: 0 }}>
                <legend className="mb-3 flex gap-3 text-[0.9375rem]" style={{ fontFamily: "var(--font-display)", lineHeight: 1.45 }}>
                  <span
                    aria-hidden="true"
                    className="shrink-0 tabular-nums text-[0.6875rem]"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--rule-strong)", lineHeight: "1.5rem" }}
                  >
                    {String(qIndex + 1).padStart(2, "0")}
                  </span>
                  <span>{question.question}</span>
                </legend>

                <div className="space-y-1.5 pl-[1.9rem]">
                  {question.options.map((option, optionIndex) => {
                    const selected = mcqAnswers[question.id] === optionIndex;
                    return (
                      <label
                        key={optionIndex}
                        className="flex cursor-pointer items-start gap-2.5 px-3 py-2 text-[0.9375rem]"
                        style={{
                          border: `1px solid ${selected ? "var(--subject-ink)" : "var(--rule)"}`,
                          background: selected ? "var(--subject-tint)" : "transparent",
                          borderRadius: "var(--radius-cut)",
                        }}
                      >
                        <input
                          type="radio"
                          name={`exam-q-${question.id}`}
                          checked={selected}
                          onChange={() =>
                            setMcqAnswers((current) => ({ ...current, [question.id]: optionIndex }))
                          }
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className="mt-px shrink-0 text-[0.6875rem] font-semibold"
                          style={{ fontFamily: "var(--font-mono)", color: selected ? "var(--subject-ink)" : "var(--ink-faint)" }}
                        >
                          {LETTERS[optionIndex]}
                        </span>
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </li>
          ))}
        </ol>
      ) : (
        <div className="space-y-12">
          {section.frqPrompts?.map((prompt) => {
            const text = drafts[prompt.id] ?? "";
            const words = text.trim() ? text.trim().split(/\s+/).length : 0;
            return (
              <article key={prompt.id}>
                <p className="label mb-2">
                  {prompt.type} · {prompt.points} points
                </p>
                <p
                  className="mb-5 text-[1rem]"
                  style={{ fontFamily: "var(--font-display)", lineHeight: 1.55 }}
                >
                  {prompt.prompt}
                </p>

                {prompt.sources && prompt.sources.length > 0 ? (
                  <div className="mb-5 space-y-2">
                    <h4 className="label">Sources</h4>
                    {prompt.sources.map((source) => (
                      <details key={source.id} className="sheet overflow-hidden">
                        <summary
                          className="cursor-pointer list-none px-3.5 py-2.5 text-[0.875rem] font-semibold"
                          style={{ background: "var(--paper-sunk)" }}
                        >
                          {source.title}
                        </summary>
                        <p
                          className="whitespace-pre-wrap px-3.5 py-3.5 text-[0.875rem]"
                          style={{
                            borderTop: "1px solid var(--rule)",
                            fontFamily: "var(--font-display)",
                            lineHeight: 1.65,
                            color: "var(--ink-soft)",
                          }}
                        >
                          {source.content}
                        </p>
                      </details>
                    ))}
                  </div>
                ) : null}

                <label className="label mb-2 block" htmlFor={`frq-${prompt.id}`}>
                  Your response
                </label>
                <textarea
                  id={`frq-${prompt.id}`}
                  value={text}
                  onChange={(event) =>
                    setDrafts((current) => ({ ...current, [prompt.id]: event.target.value }))
                  }
                  rows={16}
                  spellCheck
                  className="field"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    resize: "vertical",
                  }}
                  placeholder="Write here. Nothing is uploaded anywhere — this stays in your browser."
                />
                <p
                  className="mt-1.5 text-right text-[0.75rem] tabular-nums"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
                >
                  {words} words
                </p>
              </article>
            );
          })}
        </div>
      )}

      <div className="mt-10 flex justify-end rule-top pt-6">
        <button type="button" onClick={finishSection} className="btn btn-solid">
          {sectionIndex + 1 < exam.sections.length ? "Finish section →" : "Finish the paper"}
        </button>
      </div>
    </div>
  );
}
