"use client";

import { useState } from "react";
import type { Assessment } from "@/content/exams/types";
import type { SubjectSlug } from "@/lib/subjects";
import { TimedPaper } from "./TimedPaper";
import { GuidedWalkthrough } from "./GuidedWalkthrough";

/**
 * The interim-assessment hub.
 *
 * Two ways to use the same paper. The simulation runs the official clock,
 * breaks and section order. The walkthrough teaches the same questions one at a
 * time with the method behind each answer. Switching modes resets the paper
 * view, not the student's saved answers.
 */
export function ExamHub({
  assessment,
  courseSlug,
  courseLabel,
}: {
  assessment: Assessment;
  courseSlug: SubjectSlug;
  courseLabel: string;
}) {
  const [mode, setMode] = useState<"simulation" | "walkthrough">("simulation");

  return (
    <div className="exam-hub">
      <div className="exam-mode-switch" role="tablist" aria-label="Assessment mode">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "simulation"}
          onClick={() => setMode("simulation")}
        >
          <strong>Exam simulation</strong>
          <span>Official clock, sections, and break. Nothing is marked until the end.</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "walkthrough"}
          onClick={() => setMode("walkthrough")}
        >
          <strong>Guided walkthrough</strong>
          <span>Step-by-step teaching for every question, and a writing plan for every essay.</span>
        </button>
      </div>

      {mode === "simulation" ? (
        <TimedPaper
          assessment={assessment}
          courseSlug={courseSlug}
          courseLabel={courseLabel}
          onGuided={() => setMode("walkthrough")}
        />
      ) : (
        <GuidedWalkthrough assessment={assessment} courseSlug={courseSlug} courseLabel={courseLabel} />
      )}
    </div>
  );
}
