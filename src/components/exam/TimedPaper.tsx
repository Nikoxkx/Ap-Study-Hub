"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [activeTask, setActiveTask] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mobileSource, setMobileSource] = useState(false);
  const sheetCloseRef = useRef<HTMLButtonElement>(null);
  const [, setStudy] = useStudyState();

  const [mcqAnswers, setMcqAnswers] = useStoredState<Record<string, number>>(`${storage}.answers`, NO_MAP, reviveNumbers);
  const [flags, setFlags] = useStoredState<Record<string, boolean>>(`${storage}.flags`, NO_FLAGS, reviveBooleans);
  const [drafts, setDrafts] = useStoredState<Record<string, string>>(`${storage}.drafts`, NO_TEXT, reviveText);
  const [frqScores, setFrqScores] = useStoredState<Record<string, number>>(`${storage}.frq`, NO_MAP, reviveNumbers);

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

  /** Full-screen attempt; browsers may refuse, and the room still covers the viewport. */
  const toggleFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    try {
      if (document.fullscreenElement) {
        void document.exitFullscreen?.();
      } else {
        void document.documentElement.requestFullscreen?.();
      }
    } catch {
      /* The fixed-position exam room already fills the screen. */
    }
  }, []);

  // The room owns the viewport while a paper is being sat: no page scrolling
  // behind it, and no accidental navigation away.
  useEffect(() => {
    if (phase !== "sitting" && phase !== "break") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  // Opening the answer sheet moves focus into it, so a keyboard user is not
  // left tabbing behind the dialog.
  useEffect(() => {
    if (sheetOpen) sheetCloseRef.current?.focus();
  }, [sheetOpen]);

  // Arrow keys move between questions, but never while the student is writing.
  useEffect(() => {
    if (phase !== "sitting") return;
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        const delta = event.key === "ArrowRight" ? 1 : -1;
        event.preventDefault();
        if (section.type === "mcq") {
          setActiveQuestion((index) =>
            Math.max(0, Math.min(section.questions.length - 1, index + delta)),
          );
        } else {
          setActiveTask((index) => Math.max(0, Math.min(section.frqs.length - 1, index + delta)));
        }
      }
      if (event.key === "Escape") setSheetOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, section.type, section.questions.length, section.frqs.length]);

  const startSection = useCallback(
    (index: number) => {
      setSectionIndex(index);
      setDeadline(Date.now() + assessment.sections[index].minutes * 60_000);
      setSectionStart(Date.now());
      setExpired(false);
      setActiveQuestion(0);
      setActiveTask(0);
      setSheetOpen(false);
      setMobileSource(false);
      setPhase("sitting");
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
  /* ── Sitting: full-screen exam room ───────────────────────────────── */

  const low = remaining <= 300;
  const answered = section.questions.filter((question) => mcqAnswers[question.key] !== undefined).length;
  const flagged = section.questions.filter((question) => flags[question.key]).length;
  const unfinishedWrites = section.frqs.filter(
    (frq) => (drafts[frq.id] ?? "").trim().split(/\s+/).filter(Boolean).length < 20,
  ).length;

  const isMcq = section.type === "mcq";
  const question = isMcq ? section.questions[Math.min(activeQuestion, section.questions.length - 1)] : null;
  const task = isMcq ? null : section.frqs[Math.min(activeTask, section.frqs.length - 1)];

  const sourceStimuli: Stimulus[] = isMcq
    ? section.stimuli.filter((stimulus) => stimulus.id === question?.stimulusId)
    : (task?.stimulusIds ?? [])
        .map((id) => section.stimuli.find((stimulus) => stimulus.id === id))
        .filter((stimulus): stimulus is Stimulus => Boolean(stimulus));
  const sourceTitle = isMcq
    ? sourceStimuli[0]?.title ?? "No excerpt for this question"
    : sourceStimuli[0]?.title ?? "This task gives no excerpt";

  const goToQuestion = (index: number) => {
    setActiveQuestion(index);
    setMobileSource(false);
    requestAnimationFrame(() => {
      document.getElementById("exam-question-pane")?.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const step = (delta: number) => {
    if (isMcq) {
      goToQuestion(Math.min(section.questions.length - 1, Math.max(0, activeQuestion + delta)));
    } else {
      setActiveTask(Math.min(section.frqs.length - 1, Math.max(0, activeTask + delta)));
    }
  };

  return (
    <div className="exam-room" data-pane={mobileSource ? "source" : "question"}>
      <header className="exam-room-bar">
        <div className="exam-room-id">
          <p className="label">
            {courseLabel} · Section {sectionIndex + 1} of {assessment.sections.length}
          </p>
          <strong>{section.name}</strong>
        </div>

        <div className="exam-room-clock" data-low={low ? "true" : "false"} data-expired={expired ? "true" : "false"}>
          <span className="label">{expired ? "time up" : "remaining"}</span>
          <p>{clock(remaining)}</p>
        </div>

        <div className="exam-room-actions">
          <button
            type="button"
            className="exam-room-button exam-room-sheet-toggle"
            aria-expanded={sheetOpen}
            onClick={() => setSheetOpen(true)}
          >
            Answer sheet
          </button>
          <button type="button" className="exam-room-button exam-room-fullscreen" onClick={toggleFullscreen}>
            Full screen
          </button>
          <button type="button" className="exam-room-button exam-room-finish" onClick={finishSection}>
            {sectionIndex + 1 < assessment.sections.length ? "Finish section" : "Finish paper"}
          </button>
        </div>
      </header>

      <div className="exam-room-progress">
        {isMcq ? (
          <>
            <span>
              Question {Math.min(activeQuestion + 1, section.questions.length)} of {section.questions.length}
            </span>
            <span>{answered} answered</span>
            <span>{flagged} flagged</span>
            <span>Pace {clock(Math.round((section.minutes * 60) / Math.max(1, section.questions.length)))}/question</span>
          </>
        ) : (
          <>
            <span>
              Task {Math.min(activeTask + 1, section.frqs.length)} of {section.frqs.length}
            </span>
            <span>{unfinishedWrites} under 20 words</span>
            <span>Pace {clock(Math.round((section.minutes * 60) / Math.max(1, section.frqs.length)))}/task</span>
          </>
        )}
        {section.calculator ? (
          <span>Calculator {section.calculator.replace("-", " ")}</span>
        ) : null}
        {expired ? <span className="exam-room-timeup">Time is up — stop writing</span> : null}
      </div>

      <div className="exam-room-body">
        <section className="exam-room-source" aria-label="Excerpt">
          <div className="exam-room-source-head">
            <p className="label">{isMcq ? "Excerpt" : "Sources"}</p>
            <strong>{sourceTitle}</strong>
            {sourceStimuli[0]?.attribution ? (
              <span className="exam-attribution">{sourceStimuli[0].attribution}</span>
            ) : null}
          </div>
          <div className="exam-room-source-scroll">
            {sourceStimuli.length ? (
              sourceStimuli.map((stimulus) => (
                <figure key={stimulus.id} className="exam-room-figure">
                  {sourceStimuli.length > 1 ? (
                    <figcaption>
                      <span className="label">{stimulus.kind}</span>
                      <strong>{stimulus.title}</strong>
                      {stimulus.attribution ? (
                        <span className="exam-attribution">{stimulus.attribution}</span>
                      ) : null}
                    </figcaption>
                  ) : null}
                  {stimulus.note ? <p className="exam-note">{stimulus.note}</p> : null}
                  <pre className="exam-passage">{stimulus.text}</pre>
                </figure>
              ))
            ) : (
              <div className="exam-room-reference">
                <h4>This question stands alone</h4>
                <p>
                  {isMcq
                    ? "There is no passage for this item. Work from the stem and your own knowledge of the course."
                    : "This task gives no passage. Use a work you have read closely, or the documents named in the prompt."}
                </p>
                <h4>Section directions</h4>
                <p>{section.directions}</p>
                <ul>
                  {section.parts?.map((part) => (
                    <li key={part.label}>
                      {part.label} · {part.minutes} min
                      {part.calculator ? ` · calculator ${part.calculator}` : ""}
                    </li>
                  ))}
                </ul>
                <p className="exam-room-reference-fine">
                  Excerpts are public domain or written for this site. Nothing here is a released College Board
                  question.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="exam-room-question" id="exam-question-pane" aria-label="Question">
          <div className="exam-room-question-inner">
            {isMcq && question ? (
              <>
                <div className="exam-room-micro">
                  <button
                    type="button"
                    className="exam-room-mobile-toggle"
                    aria-pressed={mobileSource}
                    onClick={() => setMobileSource((value) => !value)}
                  >
                    {mobileSource ? "Back to the question" : "Show the excerpt"}
                  </button>
                  <span className="exam-room-counter">
                    {Math.min(activeQuestion + 1, section.questions.length)} / {section.questions.length}
                  </span>
                </div>

                <fieldset className="exam-room-fieldset">
                  <legend className="exam-room-stem">
                    <span className="exam-question-number">
                      {String(activeQuestion + 1).padStart(2, "0")}
                    </span>
                    <span>{question.question}</span>
                  </legend>
                  <div className="exam-options exam-room-options">
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

                <div className="exam-room-controls">
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => step(-1)}
                    disabled={activeQuestion === 0}
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    className="btn btn-quiet btn-sm"
                    aria-pressed={Boolean(flags[question.key])}
                    onClick={() => setFlags((current) => ({ ...current, [question.key]: !current[question.key] }))}
                  >
                    {flags[question.key] ? "⚑ Flagged" : "⚑ Flag for review"}
                  </button>
                  {activeQuestion + 1 < section.questions.length ? (
                    <button type="button" className="btn btn-solid btn-sm" onClick={() => step(1)}>
                      Next →
                    </button>
                  ) : (
                    <button type="button" className="btn btn-solid btn-sm" onClick={finishSection}>
                      Finish section →
                    </button>
                  )}
                </div>
              </>
            ) : task ? (
              <>
                <div className="exam-room-micro">
                  <button
                    type="button"
                    className="exam-room-mobile-toggle"
                    aria-pressed={mobileSource}
                    onClick={() => setMobileSource((value) => !value)}
                  >
                    {mobileSource ? "Back to the prompt" : "Show the sources"}
                  </button>
                  <span className="exam-room-counter">
                    {task.taskType} · {task.points} points · {task.minutes} min
                  </span>
                </div>

                {section.frqs.length > 1 ? (
                  <nav className="exam-room-task-tabs" aria-label="Written tasks">
                    {section.frqs.map((frq, index) => (
                      <button
                        key={frq.id}
                        type="button"
                        data-active={index === activeTask ? "true" : "false"}
                        aria-current={index === activeTask ? "step" : undefined}
                        onClick={() => setActiveTask(index)}
                      >
                        Q{index + 1}
                        <span>{frq.taskType}</span>
                      </button>
                    ))}
                  </nav>
                ) : null}

                <article className="exam-room-frq">
                  <header>
                    <p className="label">{task.taskType}</p>
                    <h3>{task.title}</h3>
                  </header>
                  {task.directions ? <p className="exam-frq-directions">{task.directions}</p> : null}
                  <p className="exam-frq-prompt">{task.prompt}</p>
                  <label className="label" htmlFor={`response-${task.id}`}>
                    Your response
                  </label>
                  <textarea
                    id={`response-${task.id}`}
                    className="field frq-scratch scratch-paper exam-room-textarea"
                    rows={16}
                    spellCheck
                    value={drafts[task.id] ?? ""}
                    onChange={(event) => setDrafts((current) => ({ ...current, [task.id]: event.target.value }))}
                    placeholder="Type your response. It saves in this browser as you write."
                  />
                  <div className="exam-room-frq-foot">
                    <span className="exam-word-count">
                      {(drafts[task.id] ?? "").trim() ? (drafts[task.id] ?? "").trim().split(/\s+/).length : 0} words
                    </span>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm exam-coach-toggle"
                      aria-expanded={Boolean(coachOpen[task.id])}
                      onClick={() =>
                        setCoachOpen((current) => ({ ...current, [task.id]: !current[task.id] }))
                      }
                    >
                      {coachOpen[task.id] ? "Hide the writing coach" : "Show the writing coach"}
                    </button>
                    {activeTask + 1 < section.frqs.length ? (
                      <button type="button" className="btn btn-solid btn-sm" onClick={() => step(1)}>
                        Next task →
                      </button>
                    ) : (
                      <button type="button" className="btn btn-solid btn-sm" onClick={finishSection}>
                        Finish section →
                      </button>
                    )}
                  </div>
                  {coachOpen[task.id] ? <WritingCoach frq={task} rubricTotal={task.points} /> : null}
                </article>
              </>
            ) : null}
          </div>
        </section>
      </div>

      <footer className="exam-room-strip">
        {isMcq ? (
          <ol className="exam-room-bubbles" aria-label="Question navigation">
            {section.questions.map((item, index) => (
              <li key={item.key}>
                <button
                  type="button"
                  data-active={index === activeQuestion ? "true" : "false"}
                  data-answered={mcqAnswers[item.key] !== undefined ? "true" : "false"}
                  data-flagged={flags[item.key] ? "true" : "false"}
                  aria-current={index === activeQuestion ? "true" : undefined}
                  aria-label={`Question ${index + 1}${
                    mcqAnswers[item.key] !== undefined ? ", answered" : ", unanswered"
                  }${flags[item.key] ? ", flagged" : ""}`}
                  onClick={() => goToQuestion(index)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <p className="exam-room-strip-note">
            {section.frqs.length} written task{section.frqs.length === 1 ? "" : "s"} · {section.minutes} minutes
            for this section. Blank responses earn zero; a partial answer can still earn rows.
          </p>
        )}
        <div className="exam-room-strip-actions">
          <a className="exam-room-strip-link" href={`/course/${courseSlug}/exam/answers`}>
            Printable answer sheet
          </a>
          <span>{section.minutes} min section</span>
        </div>
      </footer>

      {sheetOpen ? (
        <div className="exam-sheet" role="dialog" aria-modal="true" aria-label="Answer sheet">
          <div className="exam-sheet-panel">
            <header className="exam-sheet-head">
              <div>
                <p className="label">{courseLabel} · answer sheet</p>
                <h3>{section.name}</h3>
              </div>
              <button
                ref={sheetCloseRef}
                type="button"
                className="btn btn-quiet btn-sm"
                onClick={() => setSheetOpen(false)}
              >
                Close
              </button>
            </header>
            <p className="exam-sheet-note">
              Every answer in this section, in order. Blank rows are unanswered; a flag means you meant to
              come back.
            </p>
            <ol className="exam-sheet-grid">
              {isMcq
                ? section.questions.map((item, index) => (
                    <li key={item.key}>
                      <button
                        type="button"
                        data-state={
                          mcqAnswers[item.key] === undefined
                            ? "blank"
                            : flags[item.key]
                              ? "flagged"
                              : "answered"
                        }
                        onClick={() => {
                          goToQuestion(index);
                          setSheetOpen(false);
                        }}
                      >
                        <span className="exam-sheet-number">{String(index + 1).padStart(2, "0")}</span>
                        <span className="exam-sheet-choice">
                          {mcqAnswers[item.key] === undefined ? "—" : LETTERS[mcqAnswers[item.key]]}
                        </span>
                      </button>
                    </li>
                  ))
                : section.frqs.map((frq, index) => {
                    const words = (drafts[frq.id] ?? "").trim().split(/\s+/).filter(Boolean).length;
                    return (
                      <li key={frq.id} className="exam-sheet-task">
                        <button
                          type="button"
                          data-state={words === 0 ? "blank" : words < 20 ? "flagged" : "answered"}
                          onClick={() => {
                            setActiveTask(index);
                            setSheetOpen(false);
                          }}
                        >
                          <span className="exam-sheet-number">Q{index + 1}</span>
                          <span className="exam-sheet-choice">{words} words</span>
                        </button>
                      </li>
                    );
                  })}
            </ol>
            <div className="exam-sheet-legend">
              <span data-state="answered">Answered</span>
              <span data-state="flagged">Flagged / partial</span>
              <span data-state="blank">Blank</span>
            </div>
            <div className="exam-sheet-foot">
              <a className="btn btn-outline btn-sm" href={`/course/${courseSlug}/exam/answers`}>
                Open the printable answer sheet
              </a>
              <button type="button" className="btn btn-solid btn-sm" onClick={finishSection}>
                {sectionIndex + 1 < assessment.sections.length ? "Finish section →" : "Finish the paper"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
