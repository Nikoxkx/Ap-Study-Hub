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
      id: "cards",
      alt: course ? `${course.subject.familiar} flashcards` : "AP Study Hub flashcards",
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image({ params }: Params) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) {
    return renderOgCard({ eyebrow: "Cards", title: "Cards", description: "Course not found." });
  }
  const { subject, counts } = course;
  return renderOgCard({
    eyebrow: `${subject.code} · index cards`,
    title: `${subject.familiar} flashcards`,
    description: `${counts.flashcards} cards covering the terms ${subject.official} expects you to define without looking them up. Keyboard-driven, marks what you miss, drills it again.`,
    facts: [`${counts.flashcards} cards`, "Answer on the back", "No account"],
    stamp: `${counts.flashcards}`,
    accent: subject.ink,
    mark: "note",
  });
}
