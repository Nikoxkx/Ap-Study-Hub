import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, SectionHead, ExternalLink } from "@/components/Furniture";
import { getCourse } from "@/lib/catalog";
import { getVideoCoverage, unitVideos, videoWatchUrl, type UnitVideo } from "@/lib/video-lessons";
import { isSubjectSlug, subjects } from "@/lib/subjects";
import { absoluteUrl, socialImages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Unit video library",
  description: "Sixty-six curated AP teaching videos covering all 51 units across seven courses, with a privacy-enhanced player inside every unit.",
  alternates: { canonical: "/videos" },
  openGraph: {
    images: socialImages,
    title: "AP unit video library · AP Study Hub",
    description: "Curated videos for every unit of seven AP courses, playable directly inside each lesson.",
    url: absoluteUrl("/videos"),
  },
  twitter: { card: "summary_large_image", images: socialImages },
};

type SearchParams = Promise<{ course?: string | string[]; q?: string | string[] }>;

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function unitTitle(courseSlug: string, unit: number): string {
  return getCourse(courseSlug)?.units.find((item) => item.unitNumber === unit)?.title ?? `Unit ${unit}`;
}

function matches(video: UnitVideo, query: string): boolean {
  if (!query) return true;
  const haystack = [
    video.title,
    video.creator,
    video.role,
    video.focus,
    unitTitle(video.courseSlug, video.unit),
    video.courseSlug,
  ].join(" ").toLowerCase();
  return query.toLowerCase().split(/\s+/).filter(Boolean).every((term) => haystack.includes(term));
}

export default async function VideosPage({ searchParams }: { searchParams: SearchParams }) {
  const query = await searchParams;
  const courseParam = first(query.course);
  const selectedCourse = isSubjectSlug(courseParam) ? courseParam : "all";
  const text = first(query.q).slice(0, 80).trim();
  const coverage = getVideoCoverage();
  const visible = unitVideos.filter((video) => (selectedCourse === "all" || video.courseSlug === selectedCourse) && matches(video, text));
  const trail = [{ name: "Home", href: "/" }, { name: "Videos", href: "/videos" }];

  return (
    <div className="wrap py-12 md:py-16">
      <Breadcrumbs trail={trail} />
      <header className="max-w-[72ch] py-8">
        <p className="label mb-2">{coverage.videos} videos · {coverage.units} units · 7 courses</p>
        <h1 className="text-[clamp(2rem,1.6rem+2vw,3.25rem)]" style={{ letterSpacing: "-0.03em" }}>
          A verified video for every unit.
        </h1>
        <p className="lede mt-4">
          These are teaching videos, not a replacement for the written lessons. Open a course to play each video in place, or jump straight to the lesson where it is embedded.
        </p>
      </header>

      <section aria-labelledby="video-filter-heading" className="sunk mb-12 p-5">
        <h2 id="video-filter-heading" className="label mb-3">Filter the registry</h2>
        <form method="get" className="video-filter-form">
          <label>
            <span className="label">Course</span>
            <select className="field mt-2" name="course" defaultValue={selectedCourse}>
              <option value="all">All seven courses</option>
              {subjects.map((subject) => <option key={subject.slug} value={subject.slug}>{subject.familiar}</option>)}
            </select>
          </label>
          <label>
            <span className="label">Topic, creator, or unit</span>
            <input className="field mt-2" type="search" name="q" defaultValue={text} placeholder="e.g. limits, Heimler, synthesis" />
          </label>
          <button type="submit" className="btn btn-solid">Apply filter</button>
          <Link href="/videos" className="btn btn-quiet">Clear</Link>
        </form>
      </section>

      <section aria-labelledby="video-results-heading">
        <SectionHead folio="01" title="Registry" id="video-results-heading">
          {visible.length} {visible.length === 1 ? "video" : "videos"} shown. The canonical registry also lives in a public Google Sheet linked from the integrations page.
        </SectionHead>

        <div className="video-registry-list">
          {visible.map((video) => {
            const subject = subjects.find((item) => item.slug === video.courseSlug);
            return (
              <article key={video.id} className="video-registry-row">
                <div className="video-registry-key">
                  <span className="tag tag-subject">{subject?.familiar ?? video.courseSlug}</span>
                  <span className="label">Unit {video.unit}</span>
                </div>
                <div>
                  <h3>{video.title}</h3>
                  <p>{unitTitle(video.courseSlug, video.unit)} · {video.creator} · {video.role}</p>
                  <p className="video-registry-focus">{video.focus}.</p>
                </div>
                <div className="video-registry-links">
                  <Link href={`/course/${video.courseSlug}/videos#unit-${video.unit}-video`} className="link-underlined">Play in course</Link>
                  <Link href={`/course/${video.courseSlug}/notes#unit-${video.unit}`} className="link-underlined">Open lesson</Link>
                  <ExternalLink href={videoWatchUrl(video)} className="link-underlined">YouTube</ExternalLink>
                </div>
              </article>
            );
          })}
          {visible.length === 0 ? (
            <p className="study-empty">No videos match those terms. Try a broader topic or clear the filter.</p>
          ) : null}
        </div>
      </section>

      <aside className="sunk mt-14 max-w-[68ch] p-5">
        <h2 className="label mb-2">How the videos were chosen</h2>
        <p className="text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
          Unit alignment came first, then a sustained AP teaching record, public availability, useful length, and a working privacy-enhanced embed. Creators and links were checked on {unitVideos[0]?.checked}. These are independent resources; AP Study Hub is not reviewed or endorsed by the College Board.
        </p>
        <p className="mt-3 text-[0.8125rem]">
          <Link href="/integrations" className="link-underlined">See the public registry, editorial brief, and QA tracker →</Link>
        </p>
      </aside>
    </div>
  );
}
