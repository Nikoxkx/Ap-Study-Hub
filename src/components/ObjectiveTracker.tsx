"use client";

import { useStudyState } from "@/lib/use-study-state";
import { objectiveStudyId, type ObjectiveLevel } from "@/lib/study-model";
import { MathAwareText } from "@/lib/math";

const LEVELS: { value: ObjectiveLevel; label: string; hint: string }[] = [
  { value: 0, label: "Not yet", hint: "I need to learn this" },
  { value: 1, label: "Explain", hint: "I can explain the idea" },
  { value: 2, label: "Apply", hint: "I can use it in a new problem" },
  { value: 3, label: "Teach", hint: "I can teach it and answer questions" },
];

export function ObjectiveTracker({ courseSlug, unitNumber, index, objective }: {
  courseSlug: string;
  unitNumber: number;
  index: number;
  objective: string;
}) {
  const [study, setStudy] = useStudyState();
  const id = objectiveStudyId(courseSlug, unitNumber, index);
  const level = study.objectives[id] ?? 0;

  return (
    <div className="objective-row">
      <span className="objective-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <span className="objective-text"><MathAwareText>{objective}</MathAwareText></span>
      <div className="objective-levels" role="group" aria-label={`Confidence for objective ${index + 1}`}>
        {LEVELS.map((option) => (
          <button
            key={option.value}
            type="button"
            className="objective-level"
            aria-pressed={level === option.value}
            title={option.hint}
            onClick={() => setStudy((current) => ({
              ...current,
              objectives: { ...current.objectives, [id]: option.value },
            }))}
          >
            {option.label}
          </button>
        ))}
      </div>
      <span className="sr-only" aria-live="polite">Current confidence: {LEVELS[level].label}</span>
    </div>
  );
}
