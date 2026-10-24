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
      id: "resources",
      alt: course ? `${course.subject.familiar} sources and archives` : "AP Study Hub sources",
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image({ params }: Params) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) {
    return renderOgCard({ eyebrow: "Sources", title: "Sources", description: "Course not found." });
  }
  const { subject, counts } = course;
  return renderOgCard({
    eyebrow: `${subject.code} · sources`,
    title: `${subject.familiar} sources, checked`,
    description: `${counts.resources} links: the College Board's own pages, primary archives, and the teachers worth watching — each one opened and dated before it was listed.`,
    facts: [`${counts.resources} links`, "Dated checks", "Primary sources"],
    stamp: `${counts.resources}`,
    accent: subject.ink,
    mark: "note",
  });
}
