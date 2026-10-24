import type { SubjectSlug } from "@/lib/subjects";

/**
 * Subject marks.
 *
 * A small set of editorial spot illustrations, drawn directly as SVG rather
 * than generated artwork or an off-the-shelf icon font. Each one names a real
 * part of the discipline: historical evidence, rhetoric, discussion, civic
 * institutions, cells, change/accumulation, and evidence under review.
 *
 * Every glyph uses the same 32×32 grid, rounded ink stroke, and quiet interior
 * details. Solid accents give the marks some weight at catalogue size without
 * turning them into badges. They are decorative — the course name is always
 * next to them — so every mark is aria-hidden.
 */

const glyphs: Record<SubjectSlug, React.ReactNode> = {
  // An open primary-source book: a national star beside a timeline of evidence.
  apush: (
    <>
      <path d="M3.5 7.5c4.8-1.5 8.8-.8 12.5 2 3.7-2.8 7.7-3.5 12.5-2v18c-4.8-1.4-8.8-.7-12.5 2-3.7-2.7-7.7-3.4-12.5-2z" />
      <path d="M16 9.5v18" className="mk-detail" />
      <path d="m9.5 11 1.1 2.2 2.4.3-1.8 1.7.5 2.4-2.2-1.1-2.1 1.1.4-2.4-1.7-1.7 2.4-.3z" className="mk-fill" />
      <path d="M19.5 12v10M21.5 13H25M21.5 17H25M21.5 21H24" className="mk-detail" />
      <circle cx="19.5" cy="13" r="0.85" className="mk-fill" />
      <circle cx="19.5" cy="17" r="0.85" className="mk-fill" />
      <circle cx="19.5" cy="21" r="0.85" className="mk-fill" />
    </>
  ),
  // Quotation and audience: rhetoric rather than a generic writing implement.
  "ap-lang": (
    <>
      <path d="M7 4h18c1.7 0 3 1.3 3 3v11c0 1.7-1.3 3-3 3H15l-7 5v-5H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3z" />
      <path d="M9 9h4v4c0 2.5-1 4-3 4.8V16c1-.5 1.5-1.2 1.5-2H9zm8 0h4v4c0 2.5-1 4-3 4.8V16c1-.5 1.5-1.2 1.5-2H17z" className="mk-fill" />
    </>
  ),
  // A shared question on a roundtable, with three distinct seats and voices.
  "ap-seminar": (
    <>
      <ellipse cx="16" cy="18" rx="8.5" ry="5.5" />
      <circle cx="16" cy="5.5" r="2.5" />
      <circle cx="5.5" cy="17" r="2.5" />
      <circle cx="26.5" cy="17" r="2.5" />
      <path d="M16 8v4.5M8 17h1.5M22.5 17H24M11 10.5c1.2-1.7 3-2.5 5-2.5s3.8.8 5 2.5M4 22c.4-2 1.5-3 3-3M28 22c-.4-2-1.5-3-3-3" className="mk-detail" />
      <circle cx="16" cy="18" r="1.6" className="mk-fill" />
    </>
  ),
  // The Capitol dome and columns: institutions, not a generic classical bank.
  "ap-gov": (
    <>
      <path d="M16 2.5v4M16 3c2-1 3 1 5 0v3c-2 1-3-1-5 0" />
      <path d="M9.5 14c.2-4.2 2.6-7 6.5-7s6.3 2.8 6.5 7M8 14h16M6.5 17h19" />
      <path d="M16 7v7M12 9.5l1 4.5M20 9.5l-1 4.5" className="mk-detail" />
      <path d="M9 17v8M13 17v8M19 17v8M23 17v8M6 25h20M4 28h24" />
    </>
  ),
  // A cell with a nucleus, mitochondrion, and ribosomes across its cytoplasm.
  "ap-bio": (
    <>
      <path d="M16 3c7-.5 13 5 13 12 0 8-5 14-13 14S3 24 3 16 9 3.5 16 3z" />
      <circle cx="12.5" cy="13.5" r="4.3" />
      <circle cx="12.5" cy="13.5" r="1.2" className="mk-fill" />
      <path d="M18 21c.5-3 4.5-4 6.5-2.5s.5 5-2.5 5.5-4.5-.5-4-3z" />
      <path d="M20 21c1-1 2 1 3 0" className="mk-detail" />
      <circle cx="22" cy="9" r="0.9" className="mk-fill" />
      <circle cx="8" cy="22" r="0.8" className="mk-fill" />
      <circle cx="25" cy="14" r="0.7" className="mk-fill" />
      <circle cx="17" cy="7" r="0.65" className="mk-fill" />
    </>
  ),
  // A tangent at a point above accumulated area: differential and integral calculus.
  "ap-calc": (
    <>
      <path d="M7 24c5 0 7-15 20-16v19H7z" className="mk-wash" />
      <path d="M5 27V5M5 27h23" />
      <path d="M7 24c5 0 7-15 20-16" />
      <path d="M9 23.5 20 8" className="mk-detail" />
      <circle cx="14" cy="16.4" r="1.35" className="mk-fill" />
    </>
  ),
  // An academic source with a folded citation corner and data under a lens.
  "ap-research": (
    <>
      <path d="M6 3h12l5 5v13H6z" />
      <path d="M18 3v5h5M10 11h7M10 15h4" className="mk-detail" />
      <circle cx="18.5" cy="19.5" r="6" />
      <path d="m23 24 5.5 5.5" />
      <path d="m15 21 3-4 3 2" className="mk-detail" />
      <circle cx="15" cy="21" r="0.7" className="mk-fill" />
      <circle cx="18" cy="17" r="0.7" className="mk-fill" />
      <circle cx="21" cy="19" r="0.7" className="mk-fill" />
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
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {glyphs[subject]}
      </g>
      <style>{`
        .mk-fill { fill: currentColor; stroke: none; }
        .mk-detail { opacity: 0.62; stroke-width: 1.1; }
        .mk-wash { fill: currentColor; stroke: none; opacity: 0.12; }
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
