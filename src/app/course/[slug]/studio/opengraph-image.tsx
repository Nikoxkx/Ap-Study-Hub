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
      id: "studio",
      alt: course ? `${course.subject.familiar} writing studio` : "AP Study Hub studio",
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image({ params }: Params) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) {
    return renderOgCard({ eyebrow: "Studio", title: "Studio", description: "Course not found." });
  }
  const { subject } = course;
  return renderOgCard({
    eyebrow: `${subject.code} · studio`,
    title: `The ${subject.familiar} writing studio`,
    description:
      "Interactive labs, timed writing on ruled paper, and a rubric you apply to your own draft before anyone else does.",
    facts: ["Interactive labs", "Timed writing", "Self-marking"],
    stamp: "Studio",
    accent: subject.ink,
    mark: "note",
  });
}
