"use client";

import { useCallback, useEffect, useState } from "react";
import type { StudioTask } from "@/content/studio";
import { Markdown } from "@/lib/markdown";
import { useStoredState } from "@/lib/use-stored-state";
import { useStudyState } from "@/lib/use-study-state";
import { addStudyEvent } from "@/lib/study-model";
import type { SubjectSlug } from "@/lib/subjects";

const EMPTY_TEXT: Record<string, string> = Object.freeze({});
const EMPTY_MARKS: Record<string, 0 | 0.5 | 1> = Object.freeze({});
function reviveText(value: unknown): Record<string, string> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const clean: Record<string, string> = {};
  for (const [key, text] of Object.entries(value)) if (typeof text === "string") clean[key] = text.slice(0, 100_000);
  return clean;
}
function reviveMarks(value: unknown): Record<string, 0 | 0.5 | 1> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const clean: Record<string, 0 | 0.5 | 1> = {};
  for (const [key, mark] of Object.entries(value)) if (mark === 0 || mark === 0.5 || mark === 1) clean[key] = mark;
  return clean;
}
function clock(seconds: number) {
  const safe = Math.max(0, seconds);
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}

export function FRQStudio({ tasks, courseSlug }: { tasks: StudioTask[]; courseSlug: SubjectSlug }) {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<"briefing" | "writing" | "review">("briefing");
  const [deadline, setDeadline] = useState(0);
  const [startedAt, setStartedAt] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [expired, setExpired] = useState(false);
  const [drafts, setDrafts] = useStoredState(`aps.frq.v1.${courseSlug}`, EMPTY_TEXT, reviveText);
  const [marks, setMarks] = useStoredState(`aps.frq-marks.v1.${courseSlug}`, EMPTY_MARKS, reviveMarks);
  const [, setStudy] = useStudyState();
  const task = tasks[active];
  const draft = task ? drafts[task.id] ?? "" : "";
  const words = draft.trim() ? draft.trim().split(/\s+/).length : 0;

  useEffect(() => {
    if (phase !== "writing") return;
    const tick = () => {
      const left = Math.round((deadline - Date.now()) / 1000);
      setRemaining(left);
      if (left <= 0) setExpired(true);
    };
    tick();
    const id = window.setInterval(tick, 500);
    return () => window.clearInterval(id);
  }, [phase, deadline]);

  useEffect(() => {
    if (phase !== "writing") return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [phase]);

  const start = () => {
    const now = Date.now();
    setStartedAt(now); setDeadline(now + task.minutes * 60_000); setRemaining(task.minutes * 60);
    setExpired(false); setPhase("writing");
  };
  const finish = useCallback(() => {
    if (phase !== "writing") return;
    const minutes = Math.max(1, Math.round((Date.now() - startedAt) / 60_000));
    setPhase("review");
    setStudy((current) => addStudyEvent(current, { at: Date.now(), type: "frq", courseSlug, minutes }));
  }, [phase, startedAt, courseSlug, setStudy]);

  if (!task) return <div className="study-empty"><h3>No writing tasks in this course yet</h3><p>Use the interactive lab and linked course practice while this studio is empty.</p></div>;
  const secure = task.criteria.filter((_, index) => marks[`${task.id}:${index}`] === 1).length;
  const partial = task.criteria.filter((_, index) => marks[`${task.id}:${index}`] === 0.5).length;

  return (
    <div className="frq-studio">
      <div className="studio-task-picker no-print" role="group" aria-label="Writing task">
        {tasks.map((option, index) => <button key={option.id} type="button" aria-pressed={index === active}
          onClick={() => { setActive(index); setPhase("briefing"); setExpired(false); }}>
          {option.type}
        </button>)}
      </div>

      <header className="studio-task-header">
        <div><p className="label">{task.type}</p><h3>{task.title}</h3></div>
        <p className="studio-time">{task.minutes} min</p>
      </header>
      <div className="studio-prompt prose"><Markdown source={task.prompt} idPrefix={`${task.id}-prompt-`} /></div>
      {task.sources?.length ? <div className="studio-sources">
        {task.sources.map((source) => <details key={source.id} className="sheet">
          <summary>{source.title}</summary><p>{source.content}</p>
        </details>)}
      </div> : null}

      {phase === "briefing" ? <div className="studio-briefing">
        <div><p className="label mb-2">Honest self-assessment</p><p>Write under time, mark each criterion yourself, then compare with an exemplar when one matches this task. This studio does not score you; the interim assessment's grader is the place for a marked read and an AP 1–5 estimate.</p></div>
        <button type="button" className="btn btn-solid" onClick={start}>{draft ? "Resume timed draft" : "Start timed draft"}</button>
      </div> : null}

      {phase !== "briefing" ? <section className="studio-writing" aria-labelledby={`draft-label-${task.id}`}>
        <div className="studio-writing-toolbar no-print">
          <div><p className="label">{phase === "review" ? "Draft complete" : expired ? "Time elapsed · you may continue honestly" : "Timed draft"}</p><p className="studio-word-count">{words} words · saved on this device</p></div>
          <p className="defense-clock" data-low={remaining <= 60}>{clock(remaining)}</p>
        </div>
        <label id={`draft-label-${task.id}`} className="label mb-2 block" htmlFor={`draft-${task.id}`}>Your response</label>
        <textarea id={`draft-${task.id}`} className="field studio-draft scratch-paper" rows={18} value={draft} readOnly={phase === "review"}
          onChange={(event) => setDrafts((current) => ({ ...current, [task.id]: event.target.value }))}
          placeholder="Draft here. Stored in this browser by default; optional sync is off unless you enable it." />
        {phase === "writing" ? <div className="mt-3 flex justify-end no-print"><button type="button" className="btn btn-solid btn-sm" onClick={finish}>Finish & self-assess</button></div> : null}
      </section> : null}

      {phase === "review" ? <div className="studio-review">
        <section aria-labelledby={`criteria-${task.id}`}>
          <p className="label mb-2">Your rubric self-assessment</p>
          <h4 id={`criteria-${task.id}`}>Mark only what is present in the draft</h4>
          <p className="studio-assessment-summary" aria-live="polite">{secure} secure · {partial} partial · {task.criteria.length - secure - partial} not yet marked secure or partial. This is a checklist, not an official score.</p>
          <ol className="studio-criteria">
            {task.criteria.map((criterion, index) => {
              const key = `${task.id}:${index}`;
              return <li key={key}>
                <div className="prose"><Markdown source={criterion} idPrefix={`${key}-`} /></div>
                <div className="criterion-buttons" role="group" aria-label={`Assessment for criterion ${index + 1}`}>
                  {([0, 0.5, 1] as const).map((value) => <button key={value} type="button" data-grade={value === 1 ? "secure" : value === 0.5 ? "partial" : "not-yet"} aria-pressed={(marks[key] ?? 0) === value}
                    onClick={() => setMarks((current) => ({ ...current, [key]: value }))}>
                    {value === 0 ? "Not yet" : value === 0.5 ? "Partial" : "Secure"}
                  </button>)}
                </div>
              </li>;
            })}
          </ol>
        </section>

        {task.exemplar ? <section className="exemplar-comparison" aria-labelledby={`exemplar-${task.id}`}>
          <div><p className="label mb-2">Exemplar comparison</p><h4 id={`exemplar-${task.id}`}>Compare decisions, not sentences</h4><p>{task.exemplarNote}</p></div>
          <div className="comparison-grid">
            <article><p className="label mb-3">Your draft</p><p className="comparison-draft">{draft || "No draft text."}</p></article>
            <article><p className="label mb-3">Exemplar</p><div className="prose"><Markdown source={task.exemplar} idPrefix={`${task.id}-exemplar-`} /></div></article>
          </div>
        </section> : <aside className="model-note"><p>No matching exemplar is attached to this exact task. Use the criteria and the course’s marked-response library rather than treating a different task type as equivalent.</p></aside>}
        <button type="button" className="btn btn-outline btn-sm no-print" onClick={() => setPhase("briefing")}>Back to task briefing</button>
      </div> : null}
    </div>
  );
}
