"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useStoredState } from "@/lib/use-stored-state";
import { useStudyState } from "@/lib/use-study-state";
import { scheduleReview, type StudyState } from "@/lib/study-model";
import type { SubjectSlug } from "@/lib/subjects";
import type { Assessment, ExamFrq, ExamQuestion, Stimulus } from "@/content/exams/types";
import { WritingCoach } from "./WritingCoach";
import { SubjectMark } from "@/components/SubjectMark";
import { ScoreReport } from "./ScoreReport";
import { StimulusTable } from "./StimulusTable";
import {
  richTextWordCount,
  sanitizeRichText,
  savedLabel,
} from "@/lib/rich-text";

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
  startInRoom = false,
}: {
  assessment: Assessment;
  courseSlug: SubjectSlug;
  courseLabel: string;
  onGuided?: () => void;
  /** Render straight into the first section. Used by the markup validator. */
  startInRoom?: boolean;
}) {
  const { blueprint } = assessment;
  const storage = `aps.assessment.${courseSlug}`;

  const [phase, setPhase] = useState<Phase>(startInRoom ? "sitting" : "briefing");
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
  // Answer eliminator, as the digital exam offers: a crossed-out option stays
  // readable but is visibly ruled out. Stored as "0,2" per question.
  const [crossed, setCrossed] = useStoredState<Record<string, string>>(`${storage}.crossed`, NO_TEXT, reviveText);
  // Excerpt highlights, stored per paragraph as "start-end" ranges. The real
  // exam offers annotation tools; this is the same idea in a form that survives
  // a reload.
  const [marks, setMarks] = useStoredState<Record<string, string>>(`${storage}.marks`, NO_TEXT, reviveText);
  const [pendingMark, setPendingMark] = useState<{ stimulusId: string; paragraph: number; start: number; end: number } | null>(null);
  const [dirOpen, setDirOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [nowTick, setNowTick] = useState(() => Date.now());

  /* The room is position:fixed, but it used to be rendered inside a glass card
     whose backdrop-filter makes it a containing block for fixed descendants.
     The room was therefore clipped to the card and appeared not to open at all.
     Painting it into <body> puts it back over the whole viewport. */
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const id = requestAnimationFrame(() => setPortalHost(document.body));
    return () => cancelAnimationFrame(id);
  }, []);

  // Lock the page behind the room, so the briefs cannot scroll under the paper.
  // The break and the score report are full-screen stages too, so they stay
  // locked; only the briefing returns the page to the student.
  useEffect(() => {
    if (phase === "briefing") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  // A stage is a fresh screen, so it starts at its own top — not at whatever
  // document offset the student happened to be at when the section ended.
  useEffect(() => {
    if (phase === "briefing" || phase === "sitting") return;
    window.scrollTo({ top: 0 });
    const stage = document.querySelector<HTMLElement>(".exam-stage");
    if (stage) stage.scrollTop = 0;
  }, [phase]);


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

  // The save indicator counts up, so it needs a slow clock of its own.
  useEffect(() => {
    if (phase !== "sitting") return;
    const id = window.setInterval(() => setNowTick(Date.now()), 5_000);
    return () => window.clearInterval(id);
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
      // A double click on a finish button must not push the paper past its last
      // section: an out-of-range index makes `section` undefined and the room
      // throws, which is the one way to reach a genuinely blank screen.
      if (index < 0 || index >= assessment.sections.length) return;
      setSectionIndex(index);
      setDeadline(Date.now() + assessment.sections[index].minutes * 60_000);
      setSectionStart(Date.now());
      setExpired(false);
      setActiveQuestion(0);
      setActiveTask(0);
      setSheetOpen(false);
      setMobileSource(false);
      setDirOpen(false);
      setNotesOpen(false);
      setPendingMark(null);
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


  /**
   * Full-screen stage for everything that is not the sitting room itself.
   *
   * The break and the score report used to be returned straight into the page
   * flow while the room itself was a portal painted over the viewport. Finishing
   * a section therefore unmounted the room and dropped the student back at
   * whatever document position they had been on when they pressed start — in
   * practice a blank screen, because the hub is far down the page and the body
   * was still scroll-locked. Both phases now get the same fixed shell, and both
   * go through <body>, so the viewport always contains the next thing to read.
   */
  const stage = (content: ReactNode, label: string) => {
    const shell = (
      <div className="exam-stage" role="dialog" aria-modal="true" aria-label={label}>
        <div className="exam-stage-inner">{content}</div>
      </div>
    );
    return portalHost ? createPortal(shell, portalHost) : shell;
  };

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
            <li>
              The room takes over the screen: the passage stays on the left while the question stays on the
              right, in every course. On a phone the panes become one column with a Passage / Question switch.
            </li>
            <li>
              The answer sheet button lists every question in the section and shows what is answered, flagged,
              or still blank. Arrow keys move between questions; Esc closes the sheet.
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
    return stage(
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
      </div>,
      "Break between sections",
    );
  }

  /* ── Review ───────────────────────────────────────────────────────── */
  if (phase === "review") {
    return stage(
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
          setCrossed({});
          setElapsedBySection({});
          setDrafts({});
          setMarks({});
          setSectionIndex(0);
          setDeadline(null);
          setRemaining(0);
          setExpired(false);
          setSavedAt(null);
          setActiveQuestion(0);
          setActiveTask(0);
        }}
      />,
      "Score report",
    );
  }
  /* ── Sitting: full-screen exam room ───────────────────────────────── */

  const low = remaining <= 300;
  const answered = section.questions.filter((question) => mcqAnswers[question.key] !== undefined).length;
  const flagged = section.questions.filter((question) => flags[question.key]).length;
  const unfinishedWrites = section.frqs.filter((frq) => richTextWordCount(drafts[frq.id] ?? "") < 20).length;

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
  // The real app gives the question the whole width when there is nothing to
  // read beside it, so the panes only split when a stimulus exists.
  const hasSource = sourceStimuli.length > 0;

  const goToQuestion = (index: number) => {
    setActiveQuestion(index);
    setMobileSource(false);
    requestAnimationFrame(() => {
      document.getElementById("exam-question-pane")?.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const toggleCrossed = (questionKey: string, optionIndex: number) => {
    setCrossed((current) => {
      const set = new Set(
        (current[questionKey] ?? "")
          .split(",")
          .map((value) => Number.parseInt(value, 10))
          .filter((value) => Number.isFinite(value)),
      );
      if (set.has(optionIndex)) set.delete(optionIndex);
      else set.add(optionIndex);
      const next = { ...current };
      if (set.size) next[questionKey] = [...set].sort((a, b) => a - b).join(",");
      else delete next[questionKey];
      return next;
    });
  };

  const step = (delta: number) => {
    if (isMcq) {
      goToQuestion(Math.min(section.questions.length - 1, Math.max(0, activeQuestion + delta)));
    } else {
      setActiveTask(Math.min(section.frqs.length - 1, Math.max(0, activeTask + delta)));
    }
  };

  const highlightsFor = (stimulusId: string, paragraph: number): [number, number][] =>
    (marks[`${stimulusId}:${paragraph}`] ?? "")
      .split(",")
      .map((chunk) => chunk.split("-").map((value) => Number.parseInt(value, 10)))
      .filter((pair): pair is [number, number] => pair.length === 2 && pair.every(Number.isFinite))
      .map(([start, end]) => [start, end] as [number, number])
      .filter(([start, end]) => end > start);

  const highlightCount = Object.values(marks).filter(Boolean).length;

  const applyHighlight = (stimulusId: string, paragraph: number, start: number, end: number) => {
    setMarks((current) => {
      const key = `${stimulusId}:${paragraph}`;
      const existing = (current[key] ?? "")
        .split(",")
        .map((chunk) => chunk.split("-").map((value) => Number.parseInt(value, 10)))
        .filter((pair): pair is [number, number] => pair.length === 2 && pair.every(Number.isFinite));
      const merged = mergeRanges([...existing, [start, end] as [number, number]]);
      return { ...current, [key]: merged.map(([a, b]) => `${a}-${b}`).join(",") };
    });
    setPendingMark(null);
  };

  const clearHighlight = (stimulusId: string, paragraph: number) => {
    setMarks((current) => {
      const next = { ...current };
      delete next[`${stimulusId}:${paragraph}`];
      return next;
    });
  };

  const captureSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) {
      setPendingMark(null);
      return;
    }
    const range = selection.getRangeAt(0);
    const findParagraph = (node: Node | null): HTMLElement | null => {
      const element = node?.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : node?.parentElement ?? null;
      return element?.closest<HTMLElement>("[data-para]") ?? null;
    };
    const startParagraph = findParagraph(range.startContainer);
    const endParagraph = findParagraph(range.endContainer);
    const stimulusId = startParagraph?.dataset.stimulus;
    const paragraph = Number.parseInt(startParagraph?.dataset.para ?? "", 10);
    if (!startParagraph || !stimulusId || !Number.isFinite(paragraph)) {
      setPendingMark(null);
      return;
    }
    if (endParagraph !== startParagraph) {
      setPendingMark(null);
      return;
    }
    const before = document.createRange();
    before.selectNodeContents(startParagraph);
    before.setEnd(range.startContainer, range.startOffset);
    const start = before.toString().length;
    const length = range.toString().length;
    if (!length) {
      setPendingMark(null);
      return;
    }
    setPendingMark({ stimulusId, paragraph, start, end: start + length });
  };

  const changeDraft = (frqId: string, html: string) => {
    setDrafts((current) => ({ ...current, [frqId]: sanitizeRichText(html) }));
    setSavedAt(Date.now());
  };

  const formatDraft = (command: "bold" | "italic" | "underline" | "insertUnorderedList" | "insertOrderedList") => {
    document.execCommand(command, false);
    const editor = document.querySelector<HTMLElement>("[data-editor='true']");
    if (editor) changeDraft(task?.id ?? "", editor.innerHTML);
  };

  const saveState = savedLabel(savedAt, nowTick);

  const room = (
    <>
      <div
        className="exam-room"
        data-pane={mobileSource ? "source" : "question"}
        data-layout={hasSource ? "split" : "single"}
        key={`room-${sectionIndex}`}
      >
        <header className="exam-room-bar">
          <div className="exam-room-id">
            {/* The course mark rides along into the room, so the paper is
                always identified by the same symbol as the rest of the course. */}
            <SubjectMark subject={courseSlug} size={22} className="exam-room-symbol" />
            <div>
              <p className="label">
                {courseLabel} · Section {sectionIndex + 1} of {assessment.sections.length}
              </p>
              <strong>{section.name}</strong>
            </div>
          </div>

          <div className="exam-room-tools" role="group" aria-label="Exam tools">
            <button
              type="button"
              className="exam-room-button"
              aria-expanded={dirOpen}
              onClick={() => setDirOpen(true)}
            >
              Directions
            </button>
            <button
              type="button"
              className="exam-room-button"
              aria-expanded={notesOpen}
              onClick={() => setNotesOpen(true)}
            >
              Highlights{highlightCount ? ` (${highlightCount})` : ""}
            </button>
            <button
              type="button"
              className="exam-room-button exam-room-sheet-toggle"
              aria-expanded={sheetOpen}
              onClick={() => setSheetOpen(true)}
            >
              Review
            </button>
            <button type="button" className="exam-room-button exam-room-fullscreen" onClick={toggleFullscreen}>
              Full screen
            </button>
          </div>

          <div
            className="exam-room-clock"
            data-low={low ? "true" : "false"}
            data-expired={expired ? "true" : "false"}
            aria-live="off"
          >
            <span className="label">{expired ? "time up" : "time remaining"}</span>
            <p>{clock(remaining)}</p>
          </div>

          <button type="button" className="exam-room-button exam-room-finish" onClick={finishSection}>
            {sectionIndex + 1 < assessment.sections.length ? "Finish section" : "Finish paper"}
          </button>
        </header>

        <div className="exam-room-progress">
          {isMcq ? (
            <>
              <span>
                Question {Math.min(activeQuestion + 1, section.questions.length)} of {section.questions.length}
              </span>
              <span>{answered} answered</span>
              <span>{flagged} marked for review</span>
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
          {section.calculator ? <span>Calculator {section.calculator.replace("-", " ")}</span> : null}
          {expired ? <span className="exam-room-timeup">Time is up — stop writing</span> : null}
        </div>

        <div className="exam-room-body">
          {hasSource ? (
            <section className="exam-room-source" aria-label="Excerpt">
              <div className="exam-room-source-head">
                <div>
                  <p className="label">{isMcq ? "Excerpt" : "Sources"}</p>
                  <strong>{sourceTitle}</strong>
                  {sourceStimuli[0]?.attribution ? (
                    <span className="exam-attribution">{sourceStimuli[0].attribution}</span>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="exam-room-mobile-toggle"
                  aria-pressed={mobileSource}
                  onClick={() => setMobileSource((value) => !value)}
                >
                  {mobileSource ? "Back to the question" : "Show the excerpt"}
                </button>
              </div>

              {pendingMark ? (
                <div className="exam-highlight-bar" role="status">
                  <span>Selection highlighted?</span>
                  <button
                    type="button"
                    className="btn btn-solid btn-sm"
                    onClick={() => applyHighlight(pendingMark.stimulusId, pendingMark.paragraph, pendingMark.start, pendingMark.end)}
                  >
                    Highlight
                  </button>
                  <button type="button" className="btn btn-quiet btn-sm" onClick={() => setPendingMark(null)}>
                    Cancel
                  </button>
                </div>
              ) : null}

              <div className="exam-room-source-scroll" onMouseUp={captureSelection} onKeyUp={captureSelection}>
                {sourceStimuli.map((stimulus) => (
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
                    {stimulus.table ? <StimulusTable stimulus={stimulus} /> : null}
                    <div className="exam-passage" data-has-table={stimulus.table ? "true" : "false"}>
                      {stimulus.text.split(/\n{2,}/).map((paragraph, paragraphIndex) => (
                        <p
                          key={paragraphIndex}
                          data-stimulus={stimulus.id}
                          data-para={paragraphIndex}
                          className="exam-paragraph"
                        >
                          {segmentsOf(paragraph, highlightsFor(stimulus.id, paragraphIndex)).map((segment, index) =>
                            segment.highlighted ? (
                              <mark
                                key={index}
                                className="exam-highlight"
                                title="Click to remove this highlight"
                                onClick={() => clearHighlight(stimulus.id, paragraphIndex)}
                              >
                                {segment.text}
                              </mark>
                            ) : (
                              <span key={index}>{segment.text}</span>
                            ),
                          )}
                        </p>
                      ))}
                    </div>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          <section className="exam-room-question" id="exam-question-pane" aria-label="Question">
            <div className="exam-room-question-inner">
              {isMcq && question ? (
                <>
                  <div className="exam-room-micro">
                    <span className="exam-room-counter">
                      {Math.min(activeQuestion + 1, section.questions.length)} / {section.questions.length}
                    </span>
                    <button
                      type="button"
                      className="exam-room-mark"
                      aria-pressed={Boolean(flags[question.key])}
                      onClick={() => setFlags((current) => ({ ...current, [question.key]: !current[question.key] }))}
                    >
                      {flags[question.key] ? "★ Marked for review" : "☆ Mark for review"}
                    </button>
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
                        const isCrossed = (crossed[question.key] ?? "").split(",").includes(String(optionIndex));
                        return (
                          <div
                            key={optionIndex}
                            className="exam-option-row"
                            data-crossed={isCrossed ? "true" : "false"}
                          >
                            <label data-selected={selected ? "true" : "false"} data-crossed={isCrossed ? "true" : "false"}>
                              <input
                                type="radio"
                                name={question.key}
                                checked={selected}
                                onChange={() => {
                                  setMcqAnswers((current) => ({ ...current, [question.key]: optionIndex }));
                                  setSavedAt(Date.now());
                                }}
                                className="sr-only"
                              />
                              <span className="exam-option-letter">{LETTERS[optionIndex]}</span>
                              <span>{option}</span>
                            </label>
                            <button
                              type="button"
                              className="exam-option-cross"
                              aria-pressed={isCrossed}
                              aria-label={`${isCrossed ? "Restore" : "Cross out"} option ${LETTERS[optionIndex]}`}
                              onClick={() => toggleCrossed(question.key, optionIndex)}
                            >
                              ✕
                            </button>
                          </div>
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
                      ← Back
                    </button>
                    <button type="button" className="btn btn-quiet btn-sm" onClick={() => setSheetOpen(true)}>
                      Go to question
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
                    <span className="exam-room-counter">
                      Task {Math.min(activeTask + 1, section.frqs.length)} / {section.frqs.length}
                    </span>
                    <span className="exam-room-save" data-state={savedAt ? "saved" : "draft"}>
                      {saveState}
                    </span>
                  </div>

                  <article className="exam-room-frq">
                    <header>
                      <p className="label">
                        {task.taskType} · {task.points} points · {task.minutes} min suggested
                      </p>
                      <h3>{task.title}</h3>
                    </header>
                    {task.directions ? <p className="exam-frq-directions">{task.directions}</p> : null}
                    <p className="exam-frq-prompt">{task.prompt}</p>

                    <div className="exam-editor">
                      <div className="exam-editor-toolbar" role="toolbar" aria-label="Formatting">
                        <button type="button" onClick={() => formatDraft("bold")} aria-label="Bold" title="Bold">
                          <strong>B</strong>
                        </button>
                        <button type="button" onClick={() => formatDraft("italic")} aria-label="Italic" title="Italic">
                          <em>I</em>
                        </button>
                        <button
                          type="button"
                          onClick={() => formatDraft("underline")}
                          aria-label="Underline"
                          title="Underline"
                        >
                          <span style={{ textDecoration: "underline" }}>U</span>
                        </button>
                        <span className="exam-editor-divider" aria-hidden="true" />
                        <button
                          type="button"
                          onClick={() => formatDraft("insertUnorderedList")}
                          aria-label="Bulleted list"
                          title="Bulleted list"
                        >
                          •
                        </button>
                        <button
                          type="button"
                          onClick={() => formatDraft("insertOrderedList")}
                          aria-label="Numbered list"
                          title="Numbered list"
                        >
                          1.
                        </button>
                        <span className="exam-editor-divider" aria-hidden="true" />
                        <span className="exam-editor-hint">Autosaves as you type</span>
                      </div>
                      <div
                        className="exam-room-textarea exam-editor-surface"
                        data-editor="true"
                        role="textbox"
                        aria-multiline="true"
                        aria-label={`Response to ${task.title}`}
                        contentEditable
                        suppressContentEditableWarning
                        spellCheck
                        data-placeholder="Type your response. It saves in this browser as you write."
                        onInput={(event) => changeDraft(task.id, event.currentTarget.innerHTML)}
                        onPaste={(event) => {
                          // Paste as plain text: the exam editor does not accept
                          // foreign formatting, and neither should this one.
                          event.preventDefault();
                          const text = event.clipboardData.getData("text/plain");
                          document.execCommand("insertText", false, text);
                        }}
                        ref={(node) => {
                          if (!node) return;
                          const wanted = sanitizeRichText(drafts[task.id] ?? "");
                          if (node.dataset.hydratedFor !== task.id) {
                            node.innerHTML = wanted;
                            node.dataset.hydratedFor = task.id;
                          }
                        }}
                      />
                    </div>

                    <div className="exam-room-frq-foot">
                      <span className="exam-word-count">{richTextWordCount(drafts[task.id] ?? "")} words</span>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm exam-coach-toggle"
                        aria-expanded={Boolean(coachOpen[task.id])}
                        onClick={() => setCoachOpen((current) => ({ ...current, [task.id]: !current[task.id] }))}
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
                    }${flags[item.key] ? ", marked for review" : ""}`}
                    onClick={() => goToQuestion(index)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <p className="exam-room-strip-note">
              {section.frqs.length} written task{section.frqs.length === 1 ? "" : "s"} · {section.minutes} minutes for
              this section. Blank responses earn zero; a partial answer can still earn rows.
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
          <div className="exam-sheet" role="dialog" aria-modal="true" aria-label="Review answers">
            <div className="exam-sheet-panel">
              <header className="exam-sheet-head">
                <div>
                  <p className="label">{courseLabel} · review</p>
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
                Every answer in this section, in order. Blank rows are unanswered; a star means you meant to come
                back.
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
                      const words = richTextWordCount(drafts[frq.id] ?? "");
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
                            <span>{frq.title}</span>
                            <span className="exam-sheet-words">{words} words</span>
                          </button>
                        </li>
                      );
                    })}
              </ol>
              <div className="exam-sheet-legend" aria-hidden="true">
                <span data-state="answered">answered</span>
                <span data-state="flagged">marked for review</span>
                <span data-state="blank">blank</span>
              </div>
              <footer className="exam-sheet-foot">
                <span>{examSheetSummary(answered, section.questions.length, isMcq)}</span>
                <button type="button" className="btn btn-solid btn-sm" onClick={finishSection}>
                  {sectionIndex + 1 < assessment.sections.length ? "Finish section" : "Finish paper"}
                </button>
              </footer>
            </div>
          </div>
        ) : null}

        {dirOpen ? (
          <div className="exam-sheet" role="dialog" aria-modal="true" aria-label="Directions">
            <div className="exam-sheet-panel exam-directions-panel">
              <header className="exam-sheet-head">
                <div>
                  <p className="label">Directions</p>
                  <h3>{section.name}</h3>
                </div>
                <button type="button" className="btn btn-quiet btn-sm" onClick={() => setDirOpen(false)}>
                  Return to questions
                </button>
              </header>
              <p className="exam-directions-text">{section.directions}</p>
              {section.parts?.length ? (
                <ul className="exam-directions-parts">
                  {section.parts.map((part) => (
                    <li key={part.label}>
                      <strong>{part.label}</strong>
                      <span>
                        {part.minutes} minutes
                        {part.calculator ? ` · calculator ${part.calculator.replace("-", " ")}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="exam-directions-fine">
                {section.minutes} minutes for this section. The clock does not stop when you open this panel.
              </p>
            </div>
          </div>
        ) : null}

        {notesOpen ? (
          <div className="exam-sheet" role="dialog" aria-modal="true" aria-label="Highlights">
            <div className="exam-sheet-panel exam-directions-panel">
              <header className="exam-sheet-head">
                <div>
                  <p className="label">Highlights</p>
                  <h3>{sourceTitle}</h3>
                </div>
                <button type="button" className="btn btn-quiet btn-sm" onClick={() => setNotesOpen(false)}>
                  Close
                </button>
              </header>
              <p className="exam-sheet-note">
                Select text in the excerpt to highlight it. Click a highlight in the excerpt to remove it.
              </p>
              <ol className="exam-highlight-list">
                {Object.entries(marks)
                  .filter(([, value]) => value)
                  .map(([key, value]) => {
                    const [stimulusId, paragraph] = key.split(":");
                    const stimulus = section.stimuli.find((item) => item.id === stimulusId);
                    const text = stimulus?.text.split(/\n{2,}/)[Number(paragraph)] ?? "";
                    return segmentsOf(text, highlightsFor(stimulusId, Number(paragraph)))
                      .filter((segment) => segment.highlighted)
                      .map((segment, index) => (
                        <li key={`${key}-${index}`}>
                          <span className="exam-highlight-quote">“{segment.text}”</span>
                          <button
                            type="button"
                            className="link-underlined"
                            onClick={() => clearHighlight(stimulusId, Number(paragraph))}
                          >
                            Remove
                          </button>
                        </li>
                      ));
                  })}
              </ol>
              {highlightCount ? null : <p className="exam-directions-fine">Nothing highlighted yet.</p>}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );

  return portalHost ? createPortal(room, portalHost) : room;
}

/** Split a paragraph into plain and highlighted runs from stored ranges. */
function segmentsOf(text: string, ranges: [number, number][]): { text: string; highlighted: boolean }[] {
  if (!ranges.length) return [{ text, highlighted: false }];
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  const segments: { text: string; highlighted: boolean }[] = [];
  let cursor = 0;
  for (const [start, end] of sorted) {
    const from = Math.max(cursor, Math.min(start, text.length));
    const to = Math.max(from, Math.min(end, text.length));
    if (from > cursor) segments.push({ text: text.slice(cursor, from), highlighted: false });
    if (to > from) segments.push({ text: text.slice(from, to), highlighted: true });
    cursor = to;
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), highlighted: false });
  return segments;
}

/** Merge overlapping ranges so a paragraph is never split into two marks. */
function mergeRanges(ranges: [number, number][]): [number, number][] {
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const range of sorted) {
    const last = merged[merged.length - 1];
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else merged.push([...range] as [number, number]);
  }
  return merged;
}

function examSheetSummary(answered: number, total: number, isMcq: boolean): string {
  if (!isMcq) return "Check each response before you finish the section.";
  const blank = Math.max(0, total - answered);
  return `${answered} of ${total} answered · ${blank} blank${blank === 1 ? "" : "s"}`;
}
