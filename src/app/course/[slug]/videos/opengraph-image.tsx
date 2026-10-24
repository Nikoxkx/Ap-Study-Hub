import { getCourse } from "@/lib/catalog";
import { getCourseFilms } from "@/lib/films";
import { OG_CONTENT_TYPE, OG_SIZE, renderSocialCard } from "@/lib/og";

export const alt = "AP Study Hub films: short lesson films for each AP course and unit, built from the notes themselves.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  const subject = course?.subject;
  const films = getCourseFilms(slug);

  return renderSocialCard({
    kicker: subject ? `${subject.familiar} · lesson films` : "AP Study Hub",
    title: `${films.length} films, one per unit, none of them a dead embed`,
    subtitle: "Ninety seconds on what the unit is actually arguing, where the exam sets its trap, and what to say back before you practise.",
    accent: subject?.ink ?? "#b0392e",
    plate: subject?.code,
    plateLabel: "FILMS",
    chips: [
      { value: String(films.length), label: "films" },
      { value: "90s", label: "each" },
      { value: "0", label: "ads or cookies" },
    ],
  });
}
