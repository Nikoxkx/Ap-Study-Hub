"use client";

import { useState } from "react";
import type { Exemplar } from "@/content/exams/exemplars";

/**
 * Full-credit exemplar, with the rubric accounting underneath.
 *
 * Collapsed by default, on purpose: the point of the walkthrough is to attempt
 * the task first, and an exemplar read before writing becomes a template rather
 * than a standard. Once opened, the response and its row-by-row breakdown sit
 * side by side so the reader can see which sentence earned which point.
 */
export function ExemplarResponse({ exemplar }: { exemplar: Exemplar }) {
  const [open, setOpen] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(true);

  return (
    <section className="exemplar" data-open={open ? "true" : "false"}>
      <header className="exemplar-head">
        <div>
          <p className="label">Full-credit exemplar · {exemplar.score}</p>
          <h5>{exemplar.title}</h5>
          <p className="exemplar-scale">{exemplar.scale}</p>
        </div>
        <button type="button" className="btn btn-outline btn-sm" onClick={() => setOpen((value) => !value)}>
          {open ? "Close the exemplar" : "Read the exemplar"}
        </button>
      </header>

      {open ? (
        <>
          <p className="exemplar-framing">{exemplar.framing}</p>

          <ol className="exemplar-craft">
            {exemplar.craft.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>

          <article className="exemplar-body">
            {exemplar.sections.map((section, index) => (
              <div key={section.heading ?? index}>
                {section.heading ? <h6 className="label">{section.heading}</h6> : null}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            ))}
          </article>

          <div className="exemplar-breakdown-head">
            <h6 className="label">Where each point comes from</h6>
            <button type="button" className="btn btn-quiet btn-sm" onClick={() => setShowBreakdown((value) => !value)}>
              {showBreakdown ? "Hide the accounting" : "Show the accounting"}
            </button>
          </div>

          {showBreakdown ? (
            <ul className="exemplar-rows">
              {exemplar.breakdown.map((point) => (
                <li key={`${point.row}-${point.earned}`}>
                  <div className="exemplar-row-head">
                    <strong>{point.row}</strong>
                    <span>{point.earned}</span>
                  </div>
                  <blockquote>{point.evidence}</blockquote>
                  <p>{point.why}</p>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="exemplar-avoids">
            <h6 className="label">What this exemplar avoids</h6>
            <ul>
              {exemplar.avoids.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p className="exemplar-teaser">
          Attempt the task first. The exemplar scores {exemplar.score}; reading it before you write turns a
          standard into a template.
        </p>
      )}
    </section>
  );
}
