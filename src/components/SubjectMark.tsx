import type { SubjectSlug } from "@/lib/subjects";
import { Logo } from "@/components/ui/Logo";

/**
 * Monochrome, human-crafted AP course symbols on transparent RGBA canvases.
 * Renders a single `<img>` per course: crisp dark strokes in day mode, and
 * pure `#FFFFFF` white strokes in night mode (`.dark`).
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
  const src =
    tone === "light"
      ? `/icons/courses/${subject}-white.png`
      : `/icons/courses/${subject}-dark.png`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      width={size}
      height={size}
      alt={resolvedLabel}
      decoding="async"
      draggable={false}
      style={{ width: size, height: size }}
      className={[
        "subject-mark subject-mark-img select-none object-contain",
        tone === "auto" ? "subject-mark-auto" : "",
        className,
      ]
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
