import { getCourse } from "@/lib/catalog";
import { OG_CONTENT_TYPE, OG_SIZE, renderSocialCard } from "@/lib/og";

export const alt =
  "A course page from AP Study Hub: the syllabus in units, index cards, original practice, marked essays and cited sources.";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  const subject = course?.subject;

  if (!course || !subject) {
    return renderSocialCard({
      kicker: "AP Study Hub",
      title: "Deep lessons for seven AP courses",
      subtitle: "Fifty-one lessons, index cards, original practice and marked essays, with the sources on every page.",
      accent: "#b0392a",
    });
  }

  return renderSocialCard({
    kicker: subject.official,
    title: `${subject.familiar}, taught in the order the exam tests it`,
    subtitle: subject.summary,
    accent: subject.ink,
    plate: subject.code,
    plateLabel: "COURSE",
    chips: [
      { value: String(course.counts.units), label: "deep lessons" },
      { value: String(course.counts.flashcards), label: "cards" },
      { value: String(course.counts.questions), label: "questions" },
      { value: `${course.counts.readingMinutes}m`, label: "of reading" },
    ],
  });
}
