import { getCourse } from "@/lib/catalog";
import { OG_CONTENT_TYPE, OG_SIZE, renderSocialCard } from "@/lib/og";

export const alt = "AP Study Hub sources: the College Board documents, archives and teachers this course was written from, each link checked.";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  const subject = course?.subject;

  if (!course || !subject) {
    return renderSocialCard({
      kicker: "AP Study Hub",
      title: "Where every claim came from",
      subtitle: "Official framework documents, scoring reports, archives and the teachers worth an hour of your evening.",
      accent: "#57534a",
    });
  }

  return renderSocialCard({
    kicker: `${subject.familiar} · sources`,
    title: `${course.counts.resources} links, and the ones worth your evening`,
    subtitle: "The curriculum and scoring documents this course was written against, plus the archives and teachers that make the reading less lonely.",
    accent: subject.ink,
    plate: subject.code,
    plateLabel: "SOURCES",
    chips: [
      { value: String(course.counts.resources), label: "checked links" },
      { value: "2026", label: "last link check" },
      { value: "0", label: "affiliate links" },
    ],
  });
}
