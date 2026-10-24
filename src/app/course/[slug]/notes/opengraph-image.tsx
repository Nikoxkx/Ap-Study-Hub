import { getCourse } from "@/lib/catalog";
import { OG_CONTENT_TYPE, OG_SIZE, renderSocialCard } from "@/lib/og";

export const alt =
  "Lesson notes from AP Study Hub: unit objectives, ten or more teaching paragraphs, a glossary and the sources each paragraph came from.";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  const subject = course?.subject;

  if (!course || !subject) {
    return renderSocialCard({
      kicker: "AP Study Hub",
      title: "Lesson notes with the sources still attached",
      subtitle: "Fifty-one units, written to be read once and recalled four times.",
      accent: "#b0392a",
    });
  }

  return renderSocialCard({
    kicker: `${subject.familiar} · lesson notes`,
    title: `${course.counts.units} units, ${course.counts.paragraphs} paragraphs, no filler`,
    subtitle: `Every unit has objectives you can check yourself against, a glossary, worked examples and the source each claim came from. About ${course.counts.readingMinutes} minutes for the whole course.`,
    accent: subject.ink,
    plate: subject.code,
    plateLabel: "NOTES",
    chips: [
      { value: String(course.counts.units), label: "units" },
      { value: String(course.counts.paragraphs), label: "paragraphs" },
      { value: `${course.counts.readingMinutes}m`, label: "total reading" },
      { value: "7", label: "courses like this" },
    ],
  });
}
