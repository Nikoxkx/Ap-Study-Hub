"use client";

import Link from "next/link";
import { useState } from "react";
import { subjects, subjectVars, type SubjectSlug } from "@/lib/subjects";
import { SubjectMark } from "./SubjectMark";

/**
 * Interactive 7-course cold-recall preview inside the homepage Library card.
 *
 * Displays each AP course's symbol (crisp dark in day mode, pure white in night
 * mode) with generous spacing and tactile hover animations, letting visitors
 * flip a real recall card right on the homepage.
 */

interface SamplePrompt {
  unit: string;
  term: string;
  answer: string;
}

const sampleByCourse: Record<SubjectSlug, SamplePrompt> = {
  apush: {
    unit: "Unit 1 · 1491–1607",
    term: "Columbian Exchange",
    answer:
      "Transatlantic transfer of crops, livestock, pathogens, and people after 1492 — driving Indigenous demographic collapse while reshaping Afro-Eurasian diets and colonial labor systems.",
  },
  "ap-lang": {
    unit: "Unit 1 · Rhetorical Situation",
    term: "Exigence vs. Purpose",
    answer:
      "Exigence is the urgent problem or spark that prompts a speaker to write now; purpose is the concrete change in belief or action the speaker seeks from the audience.",
  },
  "ap-seminar": {
    unit: "Unit 2 · Evaluating Perspectives",
    term: "Line of Reasoning",
    answer:
      "The logical sequence connecting thesis, sub-claims, and synthesized evidence so each paragraph advances the argument rather than stacking isolated source summaries.",
  },
  "ap-gov": {
    unit: "Unit 1 · Constitutional Democracy",
    term: "Federalist No. 10",
    answer:
      "Madison argues a large republic controls the mischiefs of faction better than a pure democracy by multiplying competing interests across elected representatives.",
  },
  "ap-bio": {
    unit: "Unit 3 · Cellular Energetics",
    term: "Allosteric Regulation",
    answer:
      "A molecule binds an enzyme away from its active site, shifting protein conformation to either inhibit or activate catalysis without competing directly with the substrate.",
  },
  "ap-calc": {
    unit: "Unit 2 · Differentiation",
    term: "Mean Value Theorem",
    answer:
      "If f is continuous on [a, b] and differentiable on (a, b), some c in (a, b) satisfies f'(c) = (f(b) − f(a)) / (b − a) — instantaneous rate equals average rate.",
  },
  "ap-research": {
    unit: "Unit 2 · Research Design",
    term: "Gap in the Literature",
    answer:
      "The specific unresolved question, population, context, or methodological limitation in prior scholarship that justifies your original 4,000–5,000 word inquiry.",
  },
  "ap-macro": {
    unit: "Unit 3 · AD–AS Model",
    term: "Spending Multiplier",
    answer:
      "1/(1 − MPC): an initial change in spending ripples through successive rounds of income and consumption, so total GDP changes by a multiple of the first injection.",
  },
  "ap-env": {
    unit: "Unit 8 · Aquatic Pollution",
    term: "Eutrophication",
    answer:
      "Nutrient runoff triggers an algal bloom; when the algae die, bacterial decomposition consumes dissolved oxygen and the water turns hypoxic, suffocating fish.",
  },
};

export function StudySystemVisual() {
  const [selected, setSelected] = useState<SubjectSlug>("apush");
  const [flipped, setFlipped] = useState(false);

  const subject = subjects.find((s) => s.slug === selected) ?? subjects[0];
  const sample = sampleByCourse[selected];

  return (
    <div
      className="space-y-6 rounded-2xl border border-white/80 bg-white/30 p-6 sm:p-7 dark:border-white/20 dark:bg-white/[0.04]"
      role="region"
      aria-label="Interactive recall preview across all nine AP courses"
    >
      {/* Header row with generous breathing room */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4 dark:border-white/15">
        <span className="label">Try a live recall card</span>
        <span
          className="rounded-full border border-white/75 bg-white/45 px-3 py-1 text-[0.74rem] font-medium dark:border-white/20 dark:bg-white/10"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ink-soft)" }}
        >
          {sample.unit}
        </span>
      </div>

      {/* Spaced AP Course Pills with actual AP class symbols & hover lift */}
      <div
        className="flex flex-wrap items-center gap-2.5 sm:gap-3"
        role="tablist"
        aria-label="Choose an AP course sample"
      >
        {subjects.map((item) => {
          const active = item.slug === selected;
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={active}
              data-active={active ? "true" : "false"}
              onClick={() => {
                setSelected(item.slug);
                setFlipped(false);
              }}
              className="recall-course-pill subject-accent"
              style={subjectVars(item)}
            >
              <SubjectMark
                subject={item.mark}
                size={18}
                label={item.symbolLabel}
                className="recall-course-pill-icon"
              />
              <span>{item.familiar}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Flip Card */}
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        className="recall-flip-card subject-accent subject-accent-flip flex min-h-[11.5rem] w-full flex-col justify-between gap-5 rounded-2xl border border-white/85 bg-white/45 p-6 text-left sm:p-7 dark:border-white/20 dark:bg-white/[0.06]"
        style={subjectVars(subject)}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="label">{flipped ? "Exam-ready recall" : "Prompt · tap to flip"}</span>
          <span className="tag">{flipped ? "Answer" : "Term"}</span>
        </div>

        {flipped ? (
          <p className="text-[0.96rem] leading-relaxed" style={{ color: "var(--ink)" }}>
            {sample.answer}
          </p>
        ) : (
          <p
            className="text-[1.5rem] font-semibold leading-snug sm:text-[1.65rem]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            {sample.term}
          </p>
        )}

        <span
          className="text-[0.75rem]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
        >
          {flipped ? "Tap to return to prompt" : "Explain it in your own words, then tap to check"}
        </span>
      </button>

      {/* Spaced Action Pills with hover arrow transitions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <Link
          href={`/course/${subject.slug}/notes`}
          className="recall-action-pill subject-accent"
          style={subjectVars(subject)}
        >
          <span>Read {subject.familiar} lessons</span>
          <span aria-hidden="true" className="recall-action-arrow">
            →
          </span>
        </Link>
        <Link
          href={`/course/${subject.slug}/cards`}
          className="recall-action-pill subject-accent"
          style={subjectVars(subject)}
        >
          <span>Open full card deck</span>
          <span aria-hidden="true" className="recall-action-arrow">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
