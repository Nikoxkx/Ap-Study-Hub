import { getCourse } from "@/lib/catalog";
import { OG_CONTENT_TYPE, OG_SIZE, renderSocialCard } from "@/lib/og";

export const alt = "The AP Study Hub studio: a writing bench, diagram labs, timed drills and variants of the question you just missed.";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  const subject = course?.subject;

  if (!course || !subject) {
    return renderSocialCard({
      kicker: "AP Study Hub",
      title: "The page where you make something",
      subtitle: "Writing bench, diagram labs, timed drills and question variants, all in one place.",
      accent: "#6b3f6e",
    });
  }

  return renderSocialCard({
    kicker: `${subject.familiar} · studio`,
    title: "Write it, draw it, then get it marked",
    subtitle: "A writing bench that scores your response against the criteria, diagram labs you can drag, and variants of the questions you just missed.",
    accent: subject.ink,
    plate: subject.code,
    plateLabel: "STUDIO",
    chips: [
      { value: "4", label: "workbenches" },
      { value: "0", label: "logins" },
    ],
  });
}
