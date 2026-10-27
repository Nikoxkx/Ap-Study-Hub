"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useStoredState } from "@/lib/use-stored-state";
import { useStudyState } from "@/lib/use-study-state";
import { scheduleReview, type StudyState } from "@/lib/study-model";
import type { SubjectSlug } from "@/lib/subjects";
import type { Assessment, ExamFrq, ExamQuestion, Stimulus } from "@/content/exams/types";
import { WritingCoach } from "./WritingCoach";
import { ScoreReport } from "./ScoreReport";

/**
 * Full interim assessment, sat under the clock.
 *
 * The section order, the minutes, the question counts, the calculator rules,
 * and the break all come from the course's official blueprint — this component
 * only runs the clock and holds the answers. What it deliberately does not do
 * is inspect the paper while it is being sat: no hints, no answers, no scores
 * until the last section ends.
 *
 * Answers and drafts are written to localStorage on every change, so a stray
 * reload cannot cost an essay.
 */

type Phase = "briefing" | "sitting" | "break" | "review";

const LETTERS = ["A", "B", "C", "D", "E"];

const NO_MAP: Record<string, number> = Object.freeze({});
const NO_TEXT: Record<string, string> = Object.freeze({});
const NO_FLAGS: Record<string, boolean> = Object.freeze({});

function reviveNumbers(value: unknown): Record<string, number> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const clean: Record<string, number> = {};
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    if (typeof entry === "number") clean[key] = entry;
  }
  return clean;
}

function reviveText(value: unknown): Record<string, string> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const clean: Record<string, string> = {};
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    if (typeof entry === "string") clean[key] = entry;
  }
  return clean;
}

function reviveBooleans(value: unknown): Record<string, boolean> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const clean: Record<string, boolean> = {};
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    if (typeof entry === "boolean") clean[key] = entry;
  }
  return clean;
}

function clock(totalSeconds: number): string {
  const safe = Math.max(0, Math.round(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
}

function StimulusBlock({ stimulus }: { stimulus: Stimulus }) {
  return (
    <figure className="exam-stimulus">
      <figcaption>
        <span className="label">{stimulus.kind === "poetry" ? "Poem" : stimulus.kind === "drama" ? "Drama" : stimulus.kind === "prose" ? "Prose fiction" : stimulus.kind === "data" ? "Figure" : "Source"}</span>
        <strong>{stimulus.title}</strong>
        {stimulus.attribution ? <span className="exam-attribution">{stimulus.attribution}</span> : null}
      </figcaption>
      {stimulus.note ? <p className="exam-note">{stimulus.note}</p> : null}
      <pre className="exam-passage">{stimulus.text}</pre>
    </figure>
  );
}

export function TimedPaper({
  assessment,
  courseSlug,
  courseLabel,
  onGuided,
}: {
  assessment: Assessment;
  courseSlug: SubjectSlug;
  courseLabel: string;
  onGuided?: () => void;
}) {
  const { blueprint } = assessment;
  const storage = `aps.assessment.${courseSlug}`;

  const [phase, setPhase] = useState<Phase>("briefing");
  const [sectionIndex, setSectionIndex] = useState(0);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [expired, setExpired] = useState(false);
  const [breakDeadline, setBreakDeadline] = useState<number | null>(null);
  const [breakRemaining, setBreakRemaining] = useState(0);
  const [sectionStart, setSectionStart] = useState(0);
  const [elapsedBySection, setElapsedBySection] = useState<Record<string, number>>({});
  const [coachOpen, setCoachOpen] = useState<Record<string, boolean>>({});
  const [, setStudy] = useStudyState();

  const [mcqAnswers, setMcqAnswers] = useStoredState<Record<string, number>>(`${storage}.answers`, NO_MAP, reviveNumbers);
  const [flags, setFlags] = useStoredState<Record<string, boolean>>(`${storage}.flags`, NO_FLAGS, reviveBooleans);
  const [drafts, setDrafts] = useStoredState<Record<string, string>>(`${storage}.drafts`, NO_TEXT, reviveText);
  const [frqScores, setFrqScores] = useStoredState<Record<string, number>>(`${storage}.frq`, NO_MAP, reviveNumbers);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const section = assessment.sections[sectionIndex];
  const breakSpec = blueprint.breaks.find((item) => item.afterSectionId === section?.id);

  /* The clock is anchored to a wall-clock deadline, not decremented, so a
     backgrounded tab cannot steal minutes. */
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

  useEffect(() => {
    if (phase !== "break" || breakDeadline === null) return;
    const tick = () => {
      const left = Math.round((breakDeadline - Date.now()) / 1000);
      setBreakRemaining(left);
      if (left <= 0) setPhase("sitting");
    };
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [phase, breakDeadline]);

  useEffect(() => {
    if (phase !== "sitting") return;
    const handler = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [phase]);

  const startSection = useCallback(
    (index: number) => {
      setSectionIndex(index);
      setDeadline(Date.now() + assessment.sections[index].minutes * 60_000);
      setSectionStart(Date.now());
      setExpired(false);
      setPhase("sitting");
      requestAnimationFrame(() => headingRef.current?.focus());
    },
    [assessment.sections],
  );

  const finishSection = useCallback(() => {
    const elapsed = Math.max(1, Math.round((Date.now() - sectionStart) / 1000));
    setElapsedBySection((current) => ({ ...current, [section.name]: elapsed }));

    if (sectionIndex + 1 < assessment.sections.length) {
      if (breakSpec && breakSpec.minutes > 0) {
        setBreakDeadline(Date.now() + breakSpec.minutes * 60_000);
        setBreakRemaining(breakSpec.minutes * 60);
        setDeadline(null);
        setPhase("break");
      } else {
        startSection(sectionIndex + 1);
      }
      return;
    }

    // Last section: push every answered item into spaced review.
    const questions = assessment.sections.flatMap((item) => item.questions);
    setStudy((current) =>
      questions.reduce((state: StudyState, question) => {
        const given = mcqAnswers[question.key];
        const correct = given === question.correctIndex;
        return scheduleReview(state, {
          itemId: `${courseSlug}:assessment:${question.key}`,
          courseSlug,
          kind: "practice",
          correct,
          grade: correct ? "good" : "again",
          chosen: given === undefined ? "Left blank" : LETTERS[given],
        });
      }, current),
    );
    setPhase("review");
  }, [assessment.sections, breakSpec, courseSlug, mcqAnswers, section.name, sectionIndex, sectionStart, setStudy, startSection]);

  const leaveBreak = useCallback(
    (target: number) => {
      setBreakDeadline(null);
      startSection(target);
    },
    [startSection],
  );

  const totalMinutes = assessment.sections.reduce((sum, item) => sum + item.minutes, 0);
  const breakMinutes = blueprint.breaks.reduce((sum, item) => sum + item.minutes, 0);

  const grouped = useMemo(() => {
    if (!section || section.type !== "mcq") return [];
    const rows: { stimulus?: Stimulus; questions: { question: ExamQuestion; index: number }[] }[] = [];
    section.questions.forEach((question, index) => {
      const stimulus = question.stimulusId
        ? section.stimuli.find((candidate) => candidate.id === question.stimulusId)
        : undefined;
      const last = rows[rows.length - 1];
      if (last && last.stimulus?.id === stimulus?.id) {
        last.questions.push({ question, index });
      } else {
        rows.push({ stimulus, questions: [{ question, index }] });
      }
    });
    return rows;
  }, [section]);

  /* ── Briefing ─────────────────────────────────────────────────────── */
  if (phase === "briefing") {
    return (
      <div className="exam-briefing">
        <header className="exam-briefing-head">
          <p className="label">Interim assessment · official format</p>
          <h3>{blueprint.title}</h3>
          <p className="exam-official">{blueprint.officialFormat}</p>
        </header>

        <div className="exam-briefing-figures">
          <div><p className="score-big">{clock(totalMinutes * 60)}</p><p className="label">timed minutes</p></div>
          <div><p className="score-big">{assessment.mcqCount || "—"}</p><p className="label">multiple choice</p></div>
          <div><p className="score-big">{assessment.frqCount || "—"}</p><p className="label">written tasks</p></div>
          <div><p className="score-big">{breakMinutes}</p><p className="label">minutes of break</p></div>
        </div>

        <ol className="exam-schedule">
          {blueprint.sections.map((item, index) => {
            const after = blueprint.breaks.find((entry) => entry.afterSectionId === item.id);
            const frqCount = assessment.sections[index]?.frqs.length ?? 0;
            return (
              <li key={item.id}>
                <div className="exam-schedule-main">
                  <span className="exam-schedule-number">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.subtitle ?? item.summary}</p>
                    {item.parts?.length ? (
                      <ul className="exam-parts">
                        {item.parts.map((part) => (
                          <li key={part.label}>
                            {part.label} · {part.minutes} min
                            {part.calculator ? ` · calculator ${part.calculator}` : ""}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <span className="exam-schedule-time">
                    {item.minutes} min
                    <span>{item.type === "mcq" ? `${item.questionCount} Q` : `${frqCount} task${frqCount === 1 ? "" : "s"}`}</span>
                  </span>
                </div>
                {item.calculator ? <p className="exam-calc">Calculator: {item.calculator.replace("-", " ")}</p> : null}
                {after ? (
                  <p className="exam-schedule-break">
                    ↳ {after.label} · {after.minutes} minutes. {after.detail}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>

        <div className="exam-notes">
          <h4 className="label">Before you start</h4>
          <ul>
            {blueprint.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
            <li>
              Passages are public domain or original; questions and prompts are written for this site in the
              College Board format. None of it is a released exam question.
            </li>
            <li>Answers and drafts save to this browser on every keystroke. A reload will not lose them.</li>
            <li>Nothing is marked until the final section ends — no hints, no running score.</li>
          </ul>
        </div>

        <div className="exam-start">
          <button type="button" className="btn btn-solid" onClick={() => startSection(0)}>
            Start the clock
          </button>
          {onGuided ? (
            <button type="button" className="btn btn-outline" onClick={onGuided}>
              Teach me the questions first
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  /* ── Break ────────────────────────────────────────────────────────── */
  if (phase === "break") {
    return (
      <div className="exam-break">
        <p className="label">Break</p>
        <p className="exam-break-clock">{clock(breakRemaining)}</p>
        <p className="exam-break-copy">
          {breakSpec?.detail ?? "In a standard administration there is a monitored break here."} Stand up, look
          away from the screen, and do not reread the section you have just finished.
        </p>
        <div className="exam-break-actions">
          <button
            type="button"
            className="btn btn-solid"
            onClick={() => leaveBreak(Math.min(sectionIndex + 1, assessment.sections.length - 1))}
          >
            Continue to section {sectionIndex + 2}
          </button>
          <span>Resumes automatically when the break clock ends.</span>
        </div>
      </div>
    );
  }

  /* ── Review ───────────────────────────────────────────────────────── */
  if (phase === "review") {
    return (
      <ScoreReport
        assessment={assessment}
        courseSlug={courseSlug}
        courseLabel={courseLabel}
        mcqAnswers={mcqAnswers}
        flags={flags}
        frqScores={frqScores}
        elapsedBySection={elapsedBySection}
        drafts={drafts}
        onFrqScore={(frqId, earned) => setFrqScores((current) => ({ ...current, [frqId]: earned }))}
        onRetake={() => {
          setPhase("briefing");
          setMcqAnswers({});
          setFrqScores({});
          setFlags({});
          setElapsedBySection({});
          setSectionIndex(0);
        }}
      />
    );
  }

  /* ── Sitting ──────────────────────────────────────────────────────── */
  const low = remaining <= 300;
  const answered = section.questions.filter((question) => mcqAnswers[question.key] !== undefined).length;
  const flagged = section.questions.filter((question) => flags[question.key]).length;
  const unfinishedWrites = section.frqs.filter((frq) => (drafts[frq.id] ?? "").trim().split(/\s+/).filter(Boolean).length < 20).length;

  return (
    <div className="exam-sitting">
      <div className="exam-clock" data-low={low ? "true" : "false"} data-expired={expired ? "true" : "false"}>
        <div>
          <p className="label">
            Section {sectionIndex + 1} of {assessment.sections.length} · {courseLabel}
          </p>
          <p className="exam-clock-name">{section.name}</p>
          {section.subtitle ? <p className="exam-clock-sub">{section.subtitle}</p> : null}
        </div>
        {section.type === "mcq" ? (
          <div className="pace-readout">
            <p>{answered}/{section.questions.length} answered · {flagged} flagged</p>
            <p>Pace {clock(Math.round((section.minutes * 60) / Math.max(1, section.questions.length)))}/question</p>
          </div>
        ) : (
          <div className="pace-readout">
            <p>{section.frqs.length} task{section.frqs.length === 1 ? "" : "s"} · {unfinishedWrites} under 20 words</p>
            <p>Pace {clock(Math.round((section.minutes * 60) / Math.max(1, section.frqs.length)))}/task</p>
          </div>
        )}
        <div className="exam-clock-time">
          <p>{clock(remaining)}</p>
          <span className="label">{expired ? "time up" : "remaining"}</span>
        </div>
      </div>

      <h3 ref={headingRef} tabIndex={-1} className="exam-section-title">
        {section.name}
      </h3>
      <p className="exam-directions">{section.directions}</p>

      {section.calculator ? (
        <p className="exam-calc exam-calc-inline">
          Calculator: {section.calculator.replace("-", " ")}
        </p>
      ) : null}

      {expired ? (
        <p role="alert" className="exam-expired">
          Time is up for this section. In the real exam you would stop writing now. You can still finish — just
          be honest with yourself when you read the score.
        </p>
      ) : null}

      {section.type === "mcq" ? (
        <>
          <nav className="question-navigation no-print" aria-label="Question navigation">
            {section.questions.map((question, index) => (
              <a
                key={question.key}
                href={`#q-${question.key}`}
                data-answered={mcqAnswers[question.key] !== undefined}
                data-flagged={Boolean(flags[question.key])}
                aria-label={`Question ${index + 1}${
                  mcqAnswers[question.key] !== undefined ? ", answered" : ", unanswered"
                }${flags[question.key] ? ", flagged" : ""}`}
              >
                {index + 1}
                {flags[question.key] ? <span aria-hidden="true">⚑</span> : null}
              </a>
            ))}
          </nav>

          <ol className="exam-questions">
            {grouped.map((group, groupIndex) => (
              <li key={group.stimulus?.id ?? `group-${groupIndex}`} className="exam-group">
                {group.stimulus ? <StimulusBlock stimulus={group.stimulus} /> : null}
                <ol className="exam-question-list">
                  {group.questions.map(({ question, index }) => (
                    <li key={question.key} id={`q-${question.key}`} className="exam-question">
                      <fieldset>
                        <legend>
                          <span className="exam-question-number">{String(index + 1).padStart(2, "0")}</span>
                          <span>{question.question}</span>
                        </legend>
                        <div className="exam-question-actions">
                          <button
                            type="button"
                            className="flag-button"
                            aria-pressed={Boolean(flags[question.key])}
                            onClick={() =>
                              setFlags((current) => ({ ...current, [question.key]: !current[question.key] }))
                            }
                          >
                            <span aria-hidden="true">⚑</span>
                            {flags[question.key] ? "Flagged" : "Flag"}
                          </button>
                        </div>
                        <div className="exam-options">
                          {question.options.map((option, optionIndex) => {
                            const selected = mcqAnswers[question.key] === optionIndex;
                            return (
                              <label key={optionIndex} data-selected={selected ? "true" : "false"}>
                                <input
                                  type="radio"
                                  name={question.key}
                                  checked={selected}
                                  onChange={() =>
                                    setMcqAnswers((current) => ({ ...current, [question.key]: optionIndex }))
                                  }
                                  className="sr-only"
                                />
                                <span className="exam-option-letter">{LETTERS[optionIndex]}</span>
                                <span>{option}</span>
                              </label>
                            );
                          })}
                        </div>
                      </fieldset>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <div className="exam-frqs">
          {section.frqs.map((frq) => {
            const text = drafts[frq.id] ?? "";
            const words = text.trim() ? text.trim().split(/\s+/).length : 0;
            const stimuli = (frq.stimulusIds ?? [])
              .map((id) => section.stimuli.find((stimulus) => stimulus.id === id))
              .filter((stimulus): stimulus is Stimulus => Boolean(stimulus));
            return (
              <article key={frq.id} className="exam-frq" id={`frq-${frq.id}`}>
                <header>
                  <p className="label">
                    {frq.taskType} · {frq.points} points · {frq.minutes} min suggested
                  </p>
                  <h4>{frq.title}</h4>
                </header>
                {frq.directions ? <p className="exam-frq-directions">{frq.directions}</p> : null}
                <div className="exam-frq-body">
                  <div className="exam-frq-writing">
                    {stimuli.map((stimulus) => (
                      <StimulusBlock key={stimulus.id} stimulus={stimulus} />
                    ))}
                    <p className="exam-frq-prompt">{frq.prompt}</p>
                    <label className="label" htmlFor={`response-${frq.id}`}>
                      Your response
                    </label>
                    <textarea
                      id={`response-${frq.id}`}
                      className="field frq-scratch scratch-paper"
                      rows={18}
                      spellCheck
                      value={text}
                      onChange={(event) => setDrafts((current) => ({ ...current, [frq.id]: event.target.value }))}
                      placeholder="Type your response. It saves locally as you write."
                    />
                    <p className="exam-word-count">{words} words</p>
                  </div>
                  <div className="exam-frq-coach">
                    <button
                      type="button"
                      className="btn btn-outline btn-sm exam-coach-toggle"
                      aria-expanded={Boolean(coachOpen[frq.id])}
                      onClick={() => setCoachOpen((current) => ({ ...current, [frq.id]: !current[frq.id] }))}
                    >
                      {coachOpen[frq.id] ? "Hide the writing coach" : "Show the writing coach"}
                    </button>
                    {coachOpen[frq.id] ? <WritingCoach frq={frq} rubricTotal={frq.points} /> : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="exam-finish">
        <p>
          {sectionIndex + 1 < assessment.sections.length
            ? "Finishing this section locks it. In the real exam you cannot return to it."
            : "Finishing ends the paper. Nothing is marked until now."}
        </p>
        <button type="button" className="btn btn-solid" onClick={finishSection}>
          {sectionIndex + 1 < assessment.sections.length ? "Finish section →" : "Finish the paper"}
        </button>
      </div>
    </div>
  );
}
