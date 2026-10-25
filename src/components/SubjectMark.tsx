import type { SubjectSlug } from "@/lib/subjects";
import { Logo } from "@/components/ui/Logo";

/**
 * Monochrome, human-crafted AP course symbols on transparent RGBA canvases:
 * - Light / day mode: crisp dark strokes (`/icons/courses/{slug}-dark.png`)
 * - Night mode (`.dark`): pure white strokes (`/icons/courses/{slug}-white.png`)
 */
export const subjectSymbolLabels: Record<SubjectSlug, string> = {
  apush: "U.S. flag — American history",
  "ap-lang": "Open book — rhetoric and composition",
  "ap-seminar": "Source documents — synthesis and inquiry",
  "ap-gov": "Classical capitol — constitutional government",
  "ap-bio": "DNA double helix — living systems",
  "ap-calc": "Right triangle trigonometry — calculus and analysis",
  "ap-research": "Magnifying glass — original research",
};

interface SubjectMarkProps {
  subject: SubjectSlug;
  size?: number;
  className?: string;
  /** Overrides the default, human-readable symbol description. */
  label?: string;
  /** Use `"light"` inside permanently dark badges so the white symbol renders in both modes. */
  tone?: "auto" | "light";
}

export function SubjectMark({
  subject,
  size = 32,
  className,
  label,
  tone = "auto",
}: SubjectMarkProps) {
  const resolvedLabel = label ?? subjectSymbolLabels[subject];
  const sharedClass = ["subject-mark subject-mark-img select-none object-contain", className]
    .filter(Boolean)
    .join(" ");

  if (tone === "light") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/icons/courses/${subject}-white.png`}
        width={size}
        height={size}
        alt={resolvedLabel}
        decoding="async"
        draggable={false}
        style={{ width: size, height: size }}
        className={sharedClass}
      />
    );
  }

  return (
    <span
      className="subject-mark-pair inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={resolvedLabel}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/icons/courses/${subject}-dark.png`}
        width={size}
        height={size}
        alt=""
        aria-hidden="true"
        decoding="async"
        draggable={false}
        style={{ width: size, height: size }}
        className={`${sharedClass} subject-mark-day`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/icons/courses/${subject}-white.png`}
        width={size}
        height={size}
        alt=""
        aria-hidden="true"
        decoding="async"
        draggable={false}
        style={{ width: size, height: size }}
        className={`${sharedClass} subject-mark-night`}
      />
    </span>
  );
}

/**
 * The site's universal mark: the animated 45°-rotated 7-square logo.
 */
export function SiteMark({ size = 28, className }: { size?: number; className?: string }) {
  return <Logo size={size} className={className} />;
}
