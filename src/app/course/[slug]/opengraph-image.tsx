import { getCourse } from "@/lib/catalog";
import { formatExamDate } from "@/lib/subjects";
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
      id: "course",
      alt: course
        ? `${course.subject.official} — lessons, index cards, practice and marked essays`
        : "AP Study Hub course",
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image({ params }: Params) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) {
    return renderOgCard({
      eyebrow: "AP Study Hub",
      title: "Course not found",
      description: "Pick a course from the catalogue.",
    });
  }

  const { subject, counts } = course;
  return renderOgCard({
    eyebrow: `${subject.code} · Advanced Placement`,
    title: subject.official,
    description: `${counts.units} deep lessons, ${counts.flashcards} index cards and ${counts.questions} original practice questions. Exam ${formatExamDate(subject, "short")}. Free, no account.`,
    facts: [
      `${counts.units} lessons`,
      `${counts.paragraphs} paragraphs`,
      `${counts.flashcards} cards`,
      `${counts.questions} questions`,
    ],
    stamp: subject.familiar,
    accent: subject.ink,
    mark: "course",
  });
}
