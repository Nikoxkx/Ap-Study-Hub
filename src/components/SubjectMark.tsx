import type { ReactNode } from "react";
import type { SubjectSlug } from "@/lib/subjects";
import { Logo } from "@/components/ui/Logo";

/**
 * Monochrome, human-crafted subject symbols on a transparent 24×24 grid.
 *
 * Each course uses a clean, classical black-and-white line/typographic glyph:
 * U.S. flag, quotation marks, speech bubbles, scales of justice, DNA double
 * helix, mathematical integral sign, and optical magnifying glass.
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
  // Clean monochrome architectural flag on staff
  apush: (
    <>
      <path d="M4 21V3" />
      <path d="M4 4h16v11H4" />
      <path d="M4 4h7v5.5H4" />
      <path d="M11 7.7h9M4 11.4h16" />
    </>
  ),
  // Classical typographic serif opening quotation marks (“)
  "ap-lang": (
    <g fill="currentColor" stroke="none">
      <path d="M9.6 6.5c-2.9 1.4-4.6 3.8-4.6 6.9 0 2.3 1.4 3.8 3.3 3.8 1.7 0 2.9-1.2 2.9-2.8 0-1.5-1.1-2.6-2.5-2.6-.4 0-.8.1-1.1.2.3-1.8 1.5-3.3 3.2-4.2L9.6 6.5Zm9 0c-2.9 1.4-4.6 3.8-4.6 6.9 0 2.3 1.4 3.8 3.3 3.8 1.7 0 2.9-1.2 2.9-2.8 0-1.5-1.1-2.6-2.5-2.6-.4 0-.8.1-1.1.2.3-1.8 1.5-3.3 3.2-4.2l-1.2-1.3Z" />
    </g>
  ),
  // Clean minimal paired dialogue speech bubbles
  "ap-seminar": (
    <>
      <path d="M4 4.5h11a2 2 0 0 1 2 2v5.5a2 2 0 0 1-2 2H8.5L5 17v-3H4a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2Z" />
      <path d="M17 9.5h3a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v2.5L16 18.5h-3.5a2 2 0 0 1-2-2V14" />
    </>
  ),
  // Classical symmetrical balance scales of justice
  "ap-gov": (
    <>
      <path d="M12 3v17" />
      <path d="M7.5 20h9" />
      <path d="M4.5 6.5h15" />
      <path d="M6.5 6.5 4 12.5h5L6.5 6.5Z" />
      <path d="M4 12.5a2.5 2.5 0 0 0 5 0" />
      <path d="M17.5 6.5 15 12.5h5l-2.5-6Z" />
      <path d="M15 12.5a2.5 2.5 0 0 0 5 0" />
    </>
  ),
  // Symmetrical monochrome DNA double helix
  "ap-bio": (
    <>
      <path d="M7 2.5c0 4.8 10 4.8 10 9.5S7 16.8 7 21.5" />
      <path d="M17 2.5c0 4.8-10 4.8-10 9.5s10 4.8 10 9.5" />
      <path d="M8.5 5.2h7M8.8 9.2h6.4M8.8 14.8h6.4M8.5 18.8h7" />
    </>
  ),
  // Pure classical mathematical integral symbol ∫
  "ap-calc": (
    <>
      <path d="M16.2 4.2a1.7 1.7 0 0 0-3.1.9c-.4 1.3-.7 3.6-1.1 6.9-.4 3.3-.7 5.6-1.1 6.9a1.7 1.7 0 0 1-3.1.9" />
    </>
  ),
  // Crisp optical magnifying glass
  "ap-research": (
    <>
      <circle cx="10.5" cy="10.5" r="6.25" />
      <path d="M15.1 15.1 20.5 20.5" />
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
      viewBox="0 0 24 24"
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
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {glyphs[subject]}
      </g>
    </svg>
  );
}

/**
 * The site's universal mark: the animated 45°-rotated 7-square logo.
 */
export function SiteMark({ size = 28, className }: { size?: number; className?: string }) {
  return <Logo size={size} className={className} />;
}
