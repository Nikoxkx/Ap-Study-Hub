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
      id: "exam",
      alt: course ? `${course.subject.familiar} timed practice paper` : "AP Study Hub timed paper",
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image({ params }: Params) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) {
    return renderOgCard({ eyebrow: "Timed paper", title: "Timed paper", description: "Course not found." });
  }
  const { subject, mockExams } = course;
  const minutes = mockExams[0]?.sections.reduce((sum, section) => sum + section.timeMinutes, 0) ?? 0;
  return renderOgCard({
    eyebrow: `${subject.code} · timed paper`,
    title: `${subject.familiar}, under the clock`,
    description: `An original ${minutes || 45}-minute paper with a running clock, constructed source packets, and criteria you can mark yourself against afterwards.`,
    facts: [`${minutes || 45} minutes`, "Running clock", "Self-check criteria"],
    stamp: `${minutes || 45} min`,
    accent: subject.ink,
    mark: "note",
  });
}
