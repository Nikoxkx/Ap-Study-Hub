import type { ReactNode } from "react";
import type { SubjectSlug } from "@/lib/subjects";

/**
 * Subject symbols.
 *
 * Each course now uses a single, recognisable symbol for the work students
 * actually do in it: a U.S. flag, quotation marks, speech bubbles, scales of
 * justice, DNA, an integral, and a research lens. They are drawn on one 32×32
 * grid with the same stroke so they read as a set at 26px in the catalogue and
 * 48px on a course masthead. The accessible name says what each symbol means;
 * the official course name still sits next to it.
 */

export const subjectSymbolLabels: Record<SubjectSlug, string> = {
  apush: "U.S. flag — American history",
  "ap-lang": "Quotation marks — rhetoric and composition",
  "ap-seminar": "Speech bubbles — discussion and inquiry",
  "ap-gov": "Scales of justice — constitutional government",
  "ap-bio": "DNA double helix — living systems",
  "ap-calc": "Integral sign — change and accumulation",
  "ap-research": "Magnifying glass — original research",
};

const glyphs: Record<SubjectSlug, ReactNode> = {
  // U.S. flag: stripes, a canton, and one clear star for American history.
  apush: (
    <>
      <path d="M4 6h24M4 11h24M4 16h24M4 21h24M4 26h24" className="mk-detail" />
      <rect x="3" y="4" width="11" height="9" rx="1" className="mk-wash" />
      <path d="m9.8 5.4 1.35 2.75 3.05.45-2.2 2.15.5 3-2.7-1.4-2.7 1.4.5-3-2.2-2.15 3.05-.45z" className="mk-fill" />
    </>
  ),
  // Two solid quotation marks: reading rhetoric and writing an argument.
  "ap-lang": (
    <>
      <path d="M6 8h8v8c0 4.3-1.7 7-5 8v-3.5c1.7-.9 2.5-2.2 2.5-4H6z" className="mk-fill" />
      <path d="M18 8h8v8c0 4.3-1.7 7-5 8v-3.5c1.7-.9 2.5-2.2 2.5-4H18z" className="mk-fill" />
    </>
  ),
  // Overlapping speech bubbles with three voices around a shared question.
  "ap-seminar": (
    <>
      <path d="M4 6h15a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-6l-5 4v-4H4a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z" />
      <path d="M23 11h4a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-1v3l-3-3h-1" className="mk-detail" />
      <circle cx="8.5" cy="13" r="1" className="mk-fill" />
      <circle cx="13" cy="13" r="1" className="mk-fill" />
      <circle cx="17.5" cy="13" r="1" className="mk-fill" />
    </>
  ),
  // Scales of justice: required cases, founding documents, and constitutional balance.
  "ap-gov": (
    <>
      <path d="M16 4v24M8 28h16M5 10h22M16 7 5 10M16 7l11 3" />
      <path d="M6 10v2M26 10v2" className="mk-detail" />
      <path d="M2 12h8l-1.4 6.5a2.6 2.6 0 0 1-5.2 0z" className="mk-fill" />
      <path d="M22 12h8l-1.4 6.5a2.6 2.6 0 0 1-5.2 0z" className="mk-fill" />
      <circle cx="16" cy="5" r="1.4" className="mk-fill" />
    </>
  ),
  // A DNA double helix with paired rungs, not a generic leaf.
  "ap-bio": (
    <>
      <path d="M9 3C9 11 23 11 23 16S9 21 9 29" />
      <path d="M23 3C23 11 9 11 9 16S23 21 23 29" />
      <path d="M11 7h10M9.5 11h13M9 16h14M9.5 21h13M11 25h10" className="mk-detail" />
    </>
  ),
  // An integral over shaded area: change, accumulation, and the Fundamental Theorem.
  "ap-calc": (
    <>
      <path d="M5 27V5M5 27h23" className="mk-detail" />
      <path d="M7 23c6 0 8-12 18-13v13z" className="mk-wash" />
      <path d="M20 4c-3 2-5 5-5 9v6c0 4-2 7-5 9" />
      <path d="M20 4c2 1 3 2 3 3M10 28c2-1 3-2 3-3" />
      <circle cx="15" cy="16" r="1.2" className="mk-fill" />
    </>
  ),
  // A source document under a magnifier with a data line: original research.
  "ap-research": (
    <>
      <path d="M5 4h12l5 5v8" />
      <path d="M17 4v5h5M8 12h5M8 16h4" className="mk-detail" />
      <circle cx="20" cy="20" r="7" />
      <path d="M25 25l5 5" />
      <path d="M17 21l2-3 2 2 2-4" className="mk-detail" />
      <circle cx="17" cy="21" r="0.7" className="mk-fill" />
      <circle cx="19" cy="18" r="0.7" className="mk-fill" />
      <circle cx="21" cy="20" r="0.7" className="mk-fill" />
      <circle cx="23" cy="16" r="0.7" className="mk-fill" />
    </>
  ),
};

interface SubjectMarkProps {
  subject: SubjectSlug;
  size?: number;
  className?: string;
  /** Overrides the default, human-readable symbol description. */
  label?: string;
}

export function SubjectMark({ subject, size = 32, className, label }: SubjectMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role="img"
      aria-label={label ?? subjectSymbolLabels[subject]}
      focusable="false"
      className={["subject-mark", className].filter(Boolean).join(" ")}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {glyphs[subject]}
      </g>
    </svg>
  );
}

/**
 * The site's own mark: a stack of three sheets, the corner turned.
 * Drawn to work at 16px in a favicon and at 96px on the about page.
 */
export function SiteMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinejoin="miter">
        <path d="M6 27V9l6-5h14v23z" />
        <path d="M12 4v5H6" />
        <path d="M11 15h10M11 20h10" strokeWidth={1.4} opacity={0.6} />
      </g>
    </svg>
  );
}
