import { getCourse } from "@/lib/catalog";
import { OG_CONTENT_TYPE, OG_SIZE, renderSocialCard } from "@/lib/og";

export const alt = "Sample AP essays marked against the rubric, with every point earned or lost explained in a sentence.";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  const subject = course?.subject;

  if (!course || !subject) {
    return renderSocialCard({
      kicker: "AP Study Hub",
      title: "Marked essays, not model essays",
      subtitle: "Full responses with the rubric breakdown beside them, so the score explains the writing.",
      accent: "#9a6520",
    });
  }

  return renderSocialCard({
    kicker: `${subject.familiar} · marked essays`,
    title: `${course.counts.essays} full responses, scored point by point`,
    subtitle: "Each essay comes with the rubric row it earned, the sentence that earned it, and what a stronger version of that sentence would have said.",
    accent: subject.ink,
    plate: subject.code,
    plateLabel: "ESSAYS",
    chips: [
      { value: String(course.counts.essays), label: "marked essays" },
      { value: "6", label: "rubric rows" },
      { value: "0", label: "guessed scores" },
    ],
  });
}
