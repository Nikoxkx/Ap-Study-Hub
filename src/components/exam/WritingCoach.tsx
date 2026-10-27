"use client";

import { useState } from "react";
import type { ExamFrq } from "@/content/exams/types";

/**
 * Step-by-step writing coach.
 *
 * The coach is built from the task itself: the prompt's own verbs, the minutes
 * the section allows, the rubric rows that will be scored, and the evidence
 * rules for that task type. It is deliberately not a model essay — a student
 * who copies a model learns nothing — so it gives the order of moves, the
 * questions to answer at each stage, and sentence frames to adapt.
 */
export function WritingCoach({ frq, rubricTotal }: { frq: ExamFrq; rubricTotal?: number }) {
  const [open, setOpen] = useState<"plan" | "steps" | "evidence" | "frames">("plan");
  const coach = frq.coach;
  const totalMinutes = coach.timeline.reduce((sum, item) => sum + item.minutes, 0);

  return (
    <aside className="coach-panel" aria-label={`Writing coach for ${frq.taskType}`}>
      <header className="coach-head">
        <p className="label">Writing coach · {frq.taskType}</p>
        <p className="coach-task">{coach.task}</p>
      </header>

      <div className="coach-tabs" role="tablist" aria-label="Coach sections">
        {(
          [
            ["plan", "Timing"],
            ["steps", "Steps"],
            ["evidence", "Evidence"],
            ["frames", "Frames"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            role="tab"
            type="button"
            aria-selected={open === value}
            className="coach-tab"
            onClick={() => setOpen(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {open === "plan" ? (
        <div>
          <p className="coach-note">
            {totalMinutes} minutes planned against a {frq.minutes}-minute task
            {rubricTotal ? ` worth ${rubricTotal} points` : ""}. Move on when a stage is done, not when it
            feels finished.
          </p>
          <ol className="coach-timeline">
            {coach.timeline.map((stage) => (
              <li key={stage.label}>
                <span className="coach-minutes">{stage.minutes} min</span>
                <span>
                  <strong>{stage.label}</strong>
                  <span className="coach-detail">{stage.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {open === "steps" ? (
        <ol className="coach-steps">
          {coach.steps.map((step, index) => (
            <li key={step.title}>
              <span className="coach-step-number">{index + 1}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
                {step.frame ? <p className="coach-frame">“{step.frame}”</p> : null}
              </div>
            </li>
          ))}
        </ol>
      ) : null}

      {open === "evidence" ? (
        <div className="coach-stack">
          <section>
            <h4 className="label">Choosing evidence</h4>
            <ul>
              {coach.evidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h4 className="label">Building the argument</h4>
            <ul>
              {coach.argument.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h4 className="label">Where points are lost</h4>
            <ul>
              {coach.pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      ) : null}

      {open === "frames" ? (
        <div className="coach-stack">
          <p className="coach-note">
            Adapt these; do not paste them. A frame is a reminder of the shape a sentence needs, not a
            sentence that is already true.
          </p>
          <ul className="coach-frames">
            {coach.frames.map((frame) => (
              <li key={frame}>“{frame}”</li>
            ))}
          </ul>
          <section>
            <h4 className="label">A full-credit outline for this prompt</h4>
            <ol className="coach-model">
              {frq.modelPath.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </section>
        </div>
      ) : null}
    </aside>
  );
}
