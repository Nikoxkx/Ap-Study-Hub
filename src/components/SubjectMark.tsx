import type { SubjectSlug } from "@/lib/subjects";
import { Logo } from "@/components/ui/Logo";

/**
 * Monochrome, human-crafted AP course symbols on transparent RGBA canvases
 * (`/icons/courses/{slug}.png`), inverting cleanly in neutral night mode.
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
}

export function SubjectMark({ subject, size = 32, className, label }: SubjectMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/icons/courses/${subject}.png`}
      width={size}
      height={size}
      alt={label ?? subjectSymbolLabels[subject]}
      decoding="async"
      draggable={false}
      style={{ width: size, height: size }}
      className={["subject-mark subject-mark-img select-none object-contain", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

/**
 * The site's universal mark: the animated 45°-rotated 7-square logo.
 */
export function SiteMark({ size = 28, className }: { size?: number; className?: string }) {
  return <Logo size={size} className={className} />;
}
