import type { SourceId } from "./sources";
import type { LessonSection } from "./types";

/**
 * Authoring helper: a blank line in a teaching block creates a real paragraph.
 * Keeping prose in template strings makes long lessons pleasant to edit while
 * the exported structure remains fully typed and searchable.
 */
export function section(
  heading: string,
  sources: SourceId[],
  prose: string,
): LessonSection {
  const paragraphs = prose
    .trim()
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);

  return { heading, sources, paragraphs };
}
