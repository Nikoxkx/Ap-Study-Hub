import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCourse } from "@/lib/catalog";
import { getCourseFilms, formatRuntime } from "@/lib/films";
import { LessonFilm } from "@/components/LessonFilm";
import { SubjectMark } from "@/components/SubjectMark";
import { SectionHead } from "@/components/Furniture";
import { pageMetadata } from "@/lib/metadata";
import { describe } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const { subject, counts } = course;
  const title = `${subject.familiar} films`;
  const description = describe(
    `${counts.units + 1} short lesson films for ${subject.familiar}, films built from the notes themselves.`,
    "One for the whole course, then one per unit for whatever still feels like a list of facts.",
    "Play, scrub, change speed, or read the transcript instead.",
  );

  return pageMetadata({
    title,
    description,
    path: `/course/${subject.slug}/videos`,
    ogTitle: `${subject.familiar}, explained out loud`,
    ogDescription: description,
    type: "article",
    modified: subject.revised,
    keywords: [`${subject.familiar} review video`, `${subject.familiar} unit review`, `AP ${subject.official} summary`],
  });
}

/**
 * The screening room.
 *
 * Every course gets one opening film and one film per unit. They are rendered
 * on the page rather than behind a player modal, because the point of a study
 * film is to be re-watched in pieces: the chapter list under each player jumps
 * to the sentence you came back for.
 */
export default async function VideosPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const films = getCourseFilms(course.subject.slug);
  const [opening, ...unitFilms] = films;
  if (!opening) notFound();

  const { subject } = course;

  return (
    <div className="wrap py-12 md:py-16">
      <header className="page-head">
        <p className="label">
          {films.length} films · {formatRuntime(films.reduce((sum, film) => sum + film.duration, 0))} in total
        </p>
        <h2>{subject.familiar} films</h2>
        <p className="lede">
          Two kinds of film. The first explains what the course is really testing. The rest are one per
          unit, built from the lesson you are about to read, so nothing here can drift out of date or
          quietly disappear. Captions carry the narration, which means they work with the sound off.
        </p>
      </header>

      <LessonFilm film={opening} subjectMark={<SubjectMark subject={subject.mark} size={104} />} />

      <section className="reel-section" aria-labelledby="unit-films">
        <SectionHead folio="Unit by unit" title="Watch the one that hurt" id="unit-films" level={3}>
          Each film runs about ninety seconds: the objectives, four teaching beats, the trap the exam
          sets, and the three sentences you should be able to say back before you start practising.
        </SectionHead>

        <div className="video-grid">
          {unitFilms.map((film) => (
            <a key={film.id} className="video-card" href={`#${film.id}`}>
              <div className="video-thumb">
                <strong>Unit {film.unitNumber}</strong>
                <em>{String(film.unitNumber ?? 0).padStart(2, "0")}</em>
                <span>{formatRuntime(film.duration)}</span>
              </div>
              <div className="video-card-body">
                <strong>{film.title}</strong>
                <p>{film.watchFor}</p>
                <span>{film.scenes.length} scenes · captions</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="all-films">
        <h3 className="label mb-4" id="all-films">
          All units
        </h3>
        <div className="grid gap-10">
          {unitFilms.map((film) => (
            <div key={film.id} id={film.id} className="scroll-mt-32">
              <LessonFilm film={film} subjectMark={<SubjectMark subject={subject.mark} size={96} />} />
            </div>
          ))}
        </div>
      </section>

      <aside className="reel-legend" aria-label="About these films">
        <p>
          <strong>Why not YouTube?</strong> An embedded video brings cookies, an advert, a logo and a
          link that breaks when a channel re-uploads. These films are rendered here, from the lesson
          text, which is also why a unit film can never be about the wrong unit.
        </p>
        <p>
          If a film is not enough, the same unit has{" "}
          <Link href={`/course/${subject.slug}/notes`} className="link-draw">
            full notes
          </Link>
          ,{" "}
          <Link href={`/course/${subject.slug}/cards`} className="link-draw">
            cards
          </Link>{" "}
          and{" "}
          <Link href={`/course/${subject.slug}/practice`} className="link-draw">
            practice questions
          </Link>
          . Watching is the start of the loop, not the end of it.
        </p>
      </aside>
    </div>
  );
}
