import { getCourse } from "@/lib/catalog";
import { OG_CONTENT_TYPE, OG_SIZE, renderSocialCard } from "@/lib/og";

export const alt = "A timed AP paper from AP Study Hub: sections on a real clock, a constructed source packet, and rubric criteria to mark yourself against.";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  const subject = course?.subject;

  if (!course || !subject) {
    return renderSocialCard({
      kicker: "AP Study Hub",
      title: "Sit a full paper with the clock running",
      subtitle: "Real sections, real timings, a source packet, and criteria to mark your own writing honestly.",
      accent: "#2f5f56",
    });
  }

  const minutes = course.mockExams[0]?.sections.reduce((sum, section) => sum + section.timeMinutes, 0) ?? 0;

  return renderSocialCard({
    kicker: `${subject.familiar} · timed paper`,
    title: `${minutes} minutes, one clock, no pausing`,
    subtitle: "An original paper with constructed sources, multiple choice marked for you, and written sections marked against the rubric you can see.",
    accent: subject.ink,
    plate: `${minutes}m`,
    plateLabel: "TIMED PAPER",
    chips: [
      { value: String(course.mockExams[0]?.sections.length ?? 0), label: "sections" },
      { value: `${minutes}m`, label: "on the clock" },
      { value: "6", label: "rubric rows" },
    ],
  });
}
