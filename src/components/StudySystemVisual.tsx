"use client";

import Link from "next/link";
import { useState } from "react";
import { subjects, type SubjectSlug } from "@/lib/subjects";
import { SubjectMark } from "./SubjectMark";

/**
 * Interactive 7-course cold-recall preview inside the homepage Library card.
 *
 * Lets visitors switch across all seven AP courses (showing each course's white
 * symbol) and test one real active-recall prompt immediately without leaving
 * the homepage.
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
};

export function StudySystemVisual() {
  const [selected, setSelected] = useState<SubjectSlug>("apush");
  const [flipped, setFlipped] = useState(false);

  const subject = subjects.find((s) => s.slug === selected) ?? subjects[0];
  const sample = sampleByCourse[selected];

  return (
    <div
      className="rounded-2xl border border-white/80 bg-white/28 p-5 dark:border-white/20 dark:bg-white/5"
      role="region"
      aria-label="Interactive recall preview across all seven AP courses"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="label">Try a live recall card</span>
        <span
          className="text-[0.72rem]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
        >
          {sample.unit}
        </span>
      </div>

      <div
        className="mt-3.5 flex flex-wrap gap-2"
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
              onClick={() => {
                setSelected(item.slug);
                setFlipped(false);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.76rem] font-medium transition-all"
              style={{
                background: active ? "rgba(18, 18, 18, 0.72)" : "rgba(24, 24, 24, 0.28)",
                borderColor: active ? "#ffffff" : "rgba(255, 255, 255, 0.55)",
                color: "#ffffff",
              }}
            >
              <SubjectMark subject={item.mark} size={14} label={item.symbolLabel} />
              <span>{item.familiar}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        className="mt-4 flex min-h-[8.5rem] w-full flex-col justify-between rounded-xl border border-white/75 bg-white/38 p-4 text-left transition-colors hover:bg-white/52 dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="label">{flipped ? "Exam-ready recall" : "Prompt · tap to flip"}</span>
          <span className="tag">{flipped ? "Answer" : "Term"}</span>
        </div>

        {flipped ? (
          <p className="mt-2.5 text-[0.92rem] leading-relaxed" style={{ color: "var(--ink)" }}>
            {sample.answer}
          </p>
        ) : (
          <p
            className="mt-2.5 text-[1.35rem] font-semibold leading-snug"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            {sample.term}
          </p>
        )}

        <span
          className="mt-3 text-[0.72rem]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
        >
          {flipped ? "Tap to return to prompt" : "Explain it in your own words, then tap to check"}
        </span>
      </button>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[0.8125rem]">
        <Link href={`/course/${subject.slug}/notes`} className="link-underlined font-semibold">
          Read {subject.familiar} lessons →
        </Link>
        <Link href={`/course/${subject.slug}/cards`} className="link-underlined">
          Open full card deck →
        </Link>
      </div>
    </div>
  );
}
