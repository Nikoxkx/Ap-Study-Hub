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
      id: "notes",
      alt: course ? `${course.subject.familiar} notes, lesson by lesson` : "AP Study Hub notes",
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image({ params }: Params) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) {
    return renderOgCard({ eyebrow: "Notes", title: "Notes", description: "Course not found." });
  }
  const { subject, counts } = course;
  return renderOgCard({
    eyebrow: `${subject.code} · notes`,
    title: `${subject.familiar} notes, lesson by lesson`,
    description: `Every unit of ${subject.official}: ${counts.paragraphs} teaching paragraphs, objectives, a glossary, worked solutions and cited sources. About ${counts.readingMinutes} minutes of reading.`,
    facts: [`${counts.units} lessons`, `${counts.paragraphs} paragraphs`, `${counts.readingMinutes} min read`],
    stamp: `${counts.units} lesson${counts.units === 1 ? "" : "s"}`,
    accent: subject.ink,
    mark: "note",
  });
}
