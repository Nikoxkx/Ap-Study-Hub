"use client";

import { useId, useState } from "react";

/**
 * Marked essay.
 *
 * Laid out like a paper that has been handed back: the response in the main
 * column, the rubric in the margin beside it, the prompt and the source
 * documents folded away above and below. The previous version put those three
 * things behind tabs, which meant you could never see the rubric and the
 * sentence it was talking about at the same time — the one thing a marked essay
 * is for.
 */

export interface Essay {
  id: string;
  title: string;
  type: string;
  prompt: string;
  sampleEssay: string;
  score: number;
  rubricBreakdown: { category: string; points: number; maxPoints: number; explanation: string }[];
  sources?: { id: string; title: string; content: string }[];
}

export function EssayReader({ essays }: { essays: Essay[] }) {
  const [active, setActive] = useState(0);
  const tablistId = useId();
  const essay = essays[active];
  const maxScore = essay.rubricBreakdown.reduce((sum, row) => sum + row.maxPoints, 0);
  const paragraphs = essay.sampleEssay.split(/\n{2,}/).filter((p) => p.trim());

  return (
    <div>
      {essays.length > 1 ? (
        <div className="mb-8">
          <h3 className="label mb-2" id={`${tablistId}-label`}>
            Choose a response
          </h3>
          {/* A radiogroup, not a tablist: these are alternatives, and each one
              swaps the entire page body rather than one panel. */}
          <div role="radiogroup" aria-labelledby={`${tablistId}-label`} className="flex flex-wrap gap-2">
            {essays.map((option, index) => {
              const selected = index === active;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setActive(index)}
                  className="btn btn-sm"
                  style={{
                    border: `1px solid ${selected ? "var(--subject-ink)" : "var(--rule-strong)"}`,
                    background: selected ? "var(--subject-tint)" : "transparent",
                    color: selected ? "var(--subject-ink)" : "var(--ink-soft)",
                    fontWeight: selected ? 600 : 500,
                  }}
                >
                  {option.type}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Header plate */}
      <header className="sheet-tabbed mb-8 p-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="label mb-1.5">{essay.type} response</p>
            <h3 className="text-[1.375rem]">{essay.title}</h3>
          </div>
          <div className="shrink-0 text-right">
            <p className="label mb-1">Scored</p>
            <p
              className="tnum text-[2rem] leading-none"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--subject-ink)" }}
            >
              {essay.score}
              <span style={{ color: "var(--ink-faint)", fontSize: "1.125rem" }}>/{maxScore}</span>
            </p>
          </div>
        </div>

        <details className="mt-5 rule-top pt-4">
          <summary
            className="cursor-pointer list-none text-[0.8125rem] font-semibold"
            style={{ color: "var(--ink-soft)" }}
          >
            <span className="label">The prompt</span>
          </summary>
          <p className="mt-3 whitespace-pre-wrap text-[0.9375rem]" style={{ color: "var(--ink-soft)", lineHeight: 1.6 }}>
            {essay.prompt}
          </p>
        </details>
      </header>

      {/* The paper, with the rubric in the margin */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
        <article className="prose" style={{ maxWidth: "none" }}>
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              style={{
                textIndent: index === 0 ? 0 : "1.6em",
                marginTop: index === 0 ? 0 : "0.35em",
              }}
            >
              {paragraph.trim()}
            </p>
          ))}
        </article>

        <aside className="lg:sticky lg:top-32 lg:self-start" aria-labelledby="rubric-heading">
          <h3 id="rubric-heading" className="label mb-3">
            How it scored
          </h3>
          <ol className="rule-top">
            {essay.rubricBreakdown.map((row) => {
              const full = row.points === row.maxPoints;
              const zero = row.points === 0;
              const tone = full ? "var(--good)" : zero ? "var(--mark)" : "var(--warn)";
              return (
                <li key={row.category} className="rule-bottom py-3.5">
                  <div className="mb-1.5 flex items-baseline justify-between gap-3">
                    <span className="text-[0.875rem] font-semibold">{row.category}</span>
                    <span
                      className="tnum shrink-0 text-[0.8125rem]"
                      style={{ fontFamily: "var(--font-mono)", color: tone }}
                    >
                      {row.points}/{row.maxPoints}
                    </span>
                  </div>

                  {/* Points as discrete pips, not a percentage bar. A rubric
                      point is a whole thing you either earned or did not. */}
                  <div className="mb-2 flex gap-1" aria-hidden="true">
                    {Array.from({ length: row.maxPoints }, (_, i) => (
                      <span
                        key={i}
                        className="h-[3px] flex-1"
                        style={{ background: i < row.points ? tone : "var(--rule)" }}
                      />
                    ))}
                  </div>

                  <p className="text-[0.8125rem]" style={{ color: "var(--ink-soft)", lineHeight: 1.55 }}>
                    {row.explanation}
                  </p>
                </li>
              );
            })}
          </ol>
        </aside>
      </div>

      {/* Sources */}
      {essay.sources && essay.sources.length > 0 ? (
        <section className="mt-14" aria-labelledby="sources-heading">
          <h3 id="sources-heading" className="mb-2 rule-top pt-5 text-[1.25rem]">
            The source documents
          </h3>
          <p className="mb-5 max-w-[60ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
            These came with the prompt. Read them before the response, then read the response again
            and watch which one it reaches for first.
          </p>

          <div className="space-y-3">
            {essay.sources.map((source) => (
              <details key={source.id} className="sheet overflow-hidden">
                <summary
                  className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3"
                  style={{ background: "var(--paper-sunk)" }}
                >
                  <span className="text-[0.9375rem] font-semibold">{source.title}</span>
                  <span className="label shrink-0">Read</span>
                </summary>
                <div className="px-4 py-4" style={{ borderTop: "1px solid var(--rule)" }}>
                  <p
                    className="whitespace-pre-wrap text-[0.9375rem]"
                    style={{ fontFamily: "var(--font-display)", lineHeight: 1.65, color: "var(--ink-soft)" }}
                  >
                    {source.content}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
