"use client";

import { useState } from "react";
import { SkyRadio } from "@/components/ui/SkyRadio";

export type StatPanelCourse = {
  slug: string;
  /** Short bar label — the familiar course name. */
  label: string;
  questions: number;
  flashcards: number;
  units: number;
};

/**
 * The overview panel inside the hero dashboard mock.
 *
 * The segmented control swaps the metric the bar chart draws, so the glass
 * chart re-scales with the same settle as the rest of the interface. All
 * numbers come from the server-rendered catalog — nothing here fetches.
 */
export function StatsPanel({
  courses,
  totals,
}: {
  courses: StatPanelCourse[];
  totals: { questions: number; flashcards: number; units: number };
}) {
  const [metric, setMetric] = useState<string>("questions");

  const active = metric === "flashcards" ? "flashcards" : metric === "units" ? "units" : "questions";
  const values = courses.map((course) => course[active]);
  const max = Math.max(...values, 1);
  const total = active === "flashcards" ? totals.flashcards : active === "units" ? totals.units : totals.questions;
  const totalLabel =
    active === "flashcards" ? "flashcards" : active === "units" ? "units" : "questions";

  return (
    <div className="sunk p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="label">Per course</p>
          <p className="mt-1 text-[1.125rem]" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
            {total.toLocaleString("en-US")} {totalLabel}
          </p>
        </div>
        <SkyRadio
          name="overview-metric"
          defaultValue="questions"
          onChange={setMetric}
          options={[
            { value: "questions", label: "Questions" },
            { value: "flashcards", label: "Cards" },
            { value: "units", label: "Units" },
          ]}
        />
      </div>

      <div className="stat-bars" aria-hidden="true">
        {courses.map((course, index) => {
          const value = values[index];
          const height = Math.round((value / max) * 100);
          return (
            <div key={course.slug} className="stat-bar">
              <span className="stat-bar__value">{value}</span>
              <div className="stat-bar__fill" style={{ height: `${height}%` }} />
              <span className="stat-bar__label">{course.label}</span>
            </div>
          );
        })}
      </div>

      <p className="sr-only">
        Bar chart of {totalLabel} per course. {courses.map((c, i) => `${c.label}: ${values[i]}`).join(", ")}.
      </p>
    </div>
  );
}
