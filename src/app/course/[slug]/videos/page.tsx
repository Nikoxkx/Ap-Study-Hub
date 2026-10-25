import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Furniture";
import { UnitVideoPlayer } from "@/components/UnitVideoPlayer";
import { getCourse } from "@/lib/catalog";
import { getCourseVideos, getVideoCoverage } from "@/lib/video-lessons";
import { absoluteUrl, socialImages } from "@/lib/site";
import { subjectVars } from "@/lib/subjects";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return ["apush", "ap-lang", "ap-seminar", "ap-gov", "ap-bio", "ap-calc", "ap-research"].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  const coverage = getVideoCoverage().byCourse[course.subject.slug];
  const title = `${course.subject.familiar} videos for every unit`;
  const description = `${coverage?.videos ?? 0} curated videos across ${coverage?.units ?? course.units.length} ${course.subject.familiar} units, with real YouTube thumbnails and a player on the page.`;
  return {
    title,
    description,
    alternates: { canonical: `/course/${course.subject.slug}/videos` },
    openGraph: { images: socialImages, title: `${title} · AP Study Hub`, description, url: absoluteUrl(`/course/${course.subject.slug}/videos`) },
    twitter: { card: "summary_large_image", images: socialImages },
  };
}

export default async function CourseVideosPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  const videos = getCourseVideos(course.subject.slug);
  const coverage = getVideoCoverage().byCourse[course.subject.slug];
  const trail = [
    { name: "Home", href: "/" },
    { name: "Videos", href: "/videos" },
    { name: course.subject.familiar, href: `/course/${course.subject.slug}/videos` },
  ];

  return (
    <div className="wrap py-12 md:py-16" style={subjectVars(course.subject)}>
      <Breadcrumbs trail={trail} />
      <header className="max-w-[68ch] py-8">
        <p className="label mb-2">{coverage?.videos ?? videos.length} videos · {coverage?.units ?? course.units.length} units</p>
        <h2 className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)]" style={{ letterSpacing: "-0.025em" }}>
          See {course.subject.familiar} come together, unit by unit
        </h2>
        <p className="lede mt-4">
          Each verified video sits beside the lesson it supports. The real YouTube thumbnail appears automatically; the privacy-enhanced player loads only after you press play. Every entry keeps a direct YouTube link and a replacement search.
        </p>
        <p className="mt-4 text-[0.8125rem]" style={{ color: "var(--ink-faint)" }}>
          Prefer to read first? The same videos are embedded inside each <Link href={`/course/${course.subject.slug}/notes`} className="link-underlined">deep lesson</Link>.
        </p>
      </header>

      <div className="video-library-grid">
        {course.units.map((unit) => {
          const unitVideos = videos.filter((video) => video.unit === unit.unitNumber);
          return (
            <article key={unit.unitNumber} id={`unit-${unit.unitNumber}-video`} className="video-library-unit scroll-mt-32">
              <p className="label" style={{ color: "var(--subject-ink)" }}>Unit {String(unit.unitNumber).padStart(2, "0")}</p>
              <h3>{unit.title}</h3>
              <p>{unit.description}</p>
              <UnitVideoPlayer
                videos={unitVideos}
                courseSlug={course.subject.slug}
                unit={unit.unitNumber}
                heading={`Learn unit ${unit.unitNumber} with a teacher`}
                compact
              />
            </article>
          );
        })}
      </div>
    </div>
  );
}
