import { getCourse } from "@/lib/catalog";
import { OG_CONTENT_TYPE, OG_SIZE, renderSocialCard } from "@/lib/og";

export const alt = "Original AP practice questions with a reason for every wrong answer and a link back to the paragraph that teaches it.";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  const subject = course?.subject;

  if (!course || !subject) {
    return renderSocialCard({
      kicker: "AP Study Hub",
      title: "Questions that explain the wrong answers too",
      subtitle: "Original multiple choice, sorted by unit and skill, with a route back from every mistake.",
      accent: "#4f6b32",
    });
  }

  return renderSocialCard({
    kicker: `${subject.familiar} · original practice`,
    title: `${course.counts.questions} questions, each with a reason for every wrong option`,
    subtitle: "Written for this site rather than lifted from a released exam, grouped by unit, and linked back to the exact paragraph that teaches the point.",
    accent: subject.ink,
    plate: String(course.counts.questions),
    plateLabel: "QUESTIONS",
    chips: [
      { value: String(course.counts.questions), label: "questions" },
      { value: String(course.counts.units), label: "unit sets" },
      { value: "100%", label: "explained" },
    ],
  });
}
