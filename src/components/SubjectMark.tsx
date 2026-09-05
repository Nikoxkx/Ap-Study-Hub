import type { SubjectSlug } from "@/lib/subjects";

/**
 * Subject marks.
 *
 * These replace the emoji that used to stand in for course icons (🇺🇸 ✍️ 🔬 🏛️
 * 🧬 📐 🔎). Emoji render differently on every platform, cannot inherit colour,
 * are announced badly by screen readers, and read as a placeholder nobody came
 * back to.
 *
 * Each glyph is drawn on a 32×32 grid with a 2px stroke and a 3px margin, so
 * they share optical weight when set side by side. They are decorative — the
 * course name is always next to them — so every mark is aria-hidden.
 */

const glyphs: Record<SubjectSlug, React.ReactNode> = {
  // Thirteen stripes compressed to five, with the canton as a filled block.
  apush: (
    <>
      <rect x="4" y="6" width="24" height="20" rx="1" className="mk-frame" />
      <path d="M4 11h24M4 16h24M4 21h24" className="mk-line" />
      <rect x="4" y="6" width="11" height="10" className="mk-fill" />
    </>
  ),
  // A broad-nib pen: the slit and the tip.
  "ap-lang": (
    <>
      <path d="M9 26 L20 7a3 3 0 0 1 5 3L14 29z" className="mk-frame" />
      <path d="M11.5 22.5 L22 22.5" className="mk-line" />
      <circle cx="12" cy="26" r="1.6" className="mk-fill" />
    </>
  ),
  // Three overlapping lenses — Seminar's "multiple perspectives" framing.
  "ap-seminar": (
    <>
      <circle cx="12" cy="13" r="7.5" className="mk-frame" />
      <circle cx="20" cy="13" r="7.5" className="mk-frame" />
      <circle cx="16" cy="20" r="7.5" className="mk-frame" />
      <circle cx="16" cy="15.5" r="2" className="mk-fill" />
    </>
  ),
  // A pediment on four columns.
  "ap-gov": (
    <>
      <path d="M3 12 L16 5 L29 12" className="mk-frame" />
      <path d="M7 12v12M13 12v12M19 12v12M25 12v12" className="mk-line" />
      <path d="M4 24h24M2 28h28" className="mk-frame" />
    </>
  ),
  // Two helical strands with base-pair rungs.
  "ap-bio": (
    <>
      <path d="M11 4c0 7 10 9 10 12s-10 5-10 12" className="mk-frame" />
      <path d="M21 4c0 7-10 9-10 12s10 5 10 12" className="mk-frame" />
      <path d="M12.5 9h7M11 16h10M12.5 23h7" className="mk-line" />
    </>
  ),
  // An axis with a curve and the area beneath it hatched.
  "ap-calc": (
    <>
      <path d="M5 27V5M5 27h22" className="mk-frame" />
      <path d="M5 24C11 24 13 8 27 8" className="mk-frame" />
      <path d="M10 27v-6M15 27V16M20 27V11" className="mk-line" />
    </>
  ),
  // A crosshair over a plotted point.
  "ap-research": (
    <>
      <circle cx="16" cy="16" r="10" className="mk-frame" />
      <path d="M16 2v6M16 24v6M2 16h6M24 16h6" className="mk-line" />
      <circle cx="16" cy="16" r="3" className="mk-fill" />
    </>
  ),
};

interface SubjectMarkProps {
  subject: SubjectSlug;
  size?: number;
  className?: string;
}

export function SubjectMark({ subject, size = 32, className }: SubjectMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ overflow: "visible" }}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {glyphs[subject]}
      </g>
      <style>{`
        .mk-fill { fill: currentColor; stroke: none; }
        .mk-line { opacity: 0.55; stroke-width: 1.25; }
      `}</style>
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
