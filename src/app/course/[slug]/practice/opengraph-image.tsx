import { getCourse } from "@/lib/catalog";
import { renderOgCard, ogSize, ogContentType } from "@/lib/og";

export const runtime = "nodejs";
export const size = ogSize;
export const contentType = ogContentType;

type Params = { params: Promise<{ slug: string }> };

export async function generateImageMetadata({ params }: Params) {
  const { slug } = await params;
  const course = getCourse(slug);
  return [
    {
      id: "practice",
      alt: course ? `${course.subject.familiar} practice questions` : "AP Study Hub practice",
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image({ params }: Params) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) {
    return renderOgCard({ eyebrow: "Practice", title: "Practice", description: "Course not found." });
  }
  const { subject, counts } = course;
  return renderOgCard({
    eyebrow: `${subject.code} · practice`,
    title: `${subject.familiar} practice questions`,
    description: `${counts.questions} original questions with a reason for every answer, including why the wrong options are wrong. Filter by unit and by exam skill.`,
    facts: [`${counts.questions} questions`, "Explained answers", "Unit filters"],
    stamp: `${counts.questions}`,
    accent: subject.ink,
    mark: "note",
  });
}
