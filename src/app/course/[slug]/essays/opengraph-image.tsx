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
      id: "essays",
      alt: course ? `${course.subject.familiar} marked essays` : "AP Study Hub marked essays",
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image({ params }: Params) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) {
    return renderOgCard({ eyebrow: "Essays", title: "Essays", description: "Course not found." });
  }
  const { subject, essays } = course;
  const types = [...new Set(essays.map((essay) => essay.type))];
  return renderOgCard({
    eyebrow: `${subject.code} · marked essays`,
    title: `${subject.familiar} essays, marked point by point`,
    description: `${essays.length} full responses${types.length ? ` covering ${types.join(", ")}` : ""}, with every rubric point identified in the sentence that earned it.`,
    facts: [`${essays.length} samples`, "Rubric marked", "Annotated"],
    stamp: `${essays.length} essay${essays.length === 1 ? "" : "s"}`,
    accent: subject.ink,
    mark: "note",
  });
}
