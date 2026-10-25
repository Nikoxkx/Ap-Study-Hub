import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, ExternalLink } from "@/components/Furniture";
import { VideoThumbnail } from "@/components/VideoThumbnail";
import { GlassCard } from "@/components/ui/GlassCard";
import { SearchInput } from "@/components/ui/SearchInput";
import { getCourse } from "@/lib/catalog";
import { getVideoCoverage, unitVideos, videoWatchUrl, type UnitVideo } from "@/lib/video-lessons";
import { isSubjectSlug, subjects } from "@/lib/subjects";
import { absoluteUrl, socialImages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Watch every unit, with real YouTube thumbnails",
  description:
    "Sixty-six curated AP teaching videos covering all 51 units across seven courses, with actual YouTube thumbnails and privacy-enhanced players inside every unit.",
  alternates: { canonical: "/videos" },
  openGraph: {
    images: socialImages,
    title: "A real video for every unit · AP Study Hub",
    description:
      "Curated videos for every unit of seven AP courses, with real thumbnails and a player inside each lesson.",
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
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export default async function VideosPage({ searchParams }: { searchParams: SearchParams }) {
  const query = await searchParams;
  const courseParam = first(query.course);
  const selectedCourse = isSubjectSlug(courseParam) ? courseParam : "all";
  const text = first(query.q).slice(0, 80).trim();
  const coverage = getVideoCoverage();
  const visible = unitVideos.filter(
    (video) => (selectedCourse === "all" || video.courseSlug === selectedCourse) && matches(video, text),
  );
  const trail = [
    { name: "Home", href: "/" },
    { name: "Videos", href: "/videos" },
  ];

  return (
    <div className="wrap space-y-8 py-10 md:py-14">
      <GlassCard as="header" padding="lg">
        <Breadcrumbs trail={trail} />
        <p className="label mb-2">
          {coverage.videos} videos · {coverage.units} units · 7 courses
        </p>
        <h1
          className="text-[clamp(2rem,1.6rem+2vw,3.1rem)] font-semibold"
          style={{ letterSpacing: "-0.03em" }}
        >
          See the idea, then try it yourself.
        </h1>
        <p className="lede mt-3">
          Teaching videos paired with every unit across all seven courses. Real YouTube thumbnails
          load automatically; open a course to play each video in place, or jump straight to the
          lesson where it is embedded.
        </p>

        <form method="get" className="mt-6 grid gap-4 sm:grid-cols-[14rem_minmax(0,1fr)_auto_auto] sm:items-center">
          <select aria-label="Filter by course" className="field" name="course" defaultValue={selectedCourse}>
            <option value="all">All seven courses</option>
            {subjects.map((subject) => (
              <option key={subject.slug} value={subject.slug}>
                {subject.familiar}
              </option>
            ))}
          </select>
          <SearchInput
            name="q"
            type="search"
            defaultValue={text}
            label="Topic, creator, or unit"
          />
          <button type="submit" className="btn btn-sm">
            Filter
          </button>
          <Link href="/videos" className="btn btn-quiet btn-sm">
            Clear
          </Link>
        </form>
      </GlassCard>

      <GlassCard as="section" padding="lg" aria-labelledby="video-results-heading">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="label mb-1">01 · Curated Registry</p>
            <h2 id="video-results-heading" className="text-[1.6rem] font-semibold">
              Find the right video for your unit
            </h2>
          </div>
          <span className="tag">
            {visible.length} {visible.length === 1 ? "video" : "videos"} shown
          </span>
        </div>

        <div className="divide-y divide-white/60 border-t border-white/60">
          {visible.map((video) => {
            const subject = subjects.find((item) => item.slug === video.courseSlug);
            return (
              <article key={video.id} className="video-registry-row !border-t-0">
                <div className="video-registry-key">
                  <span className="video-registry-thumb" aria-hidden="true">
                    <VideoThumbnail video={video} loading="lazy" />
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="tag">{subject?.familiar ?? video.courseSlug}</span>
                    <span className="label">Unit {video.unit}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">{video.title}</h3>
                  <p>
                    {unitTitle(video.courseSlug, video.unit)} · {video.creator} · {video.role}
                  </p>
                  <p className="video-registry-focus">{video.focus}.</p>
                </div>
                <div className="video-registry-links">
                  <Link
                    href={`/course/${video.courseSlug}/videos#unit-${video.unit}-video`}
                    className="link-underlined"
                  >
                    Play in course
                  </Link>
                  <Link
                    href={`/course/${video.courseSlug}/notes#unit-${video.unit}`}
                    className="link-underlined"
                  >
                    Open lesson
                  </Link>
                  <ExternalLink href={videoWatchUrl(video)} className="link-underlined">
                    YouTube
                  </ExternalLink>
                </div>
              </article>
            );
          })}
          {visible.length === 0 ? (
            <p className="py-8 text-center" style={{ color: "var(--ink-soft)" }}>
              No videos match those terms. Try a broader topic or clear the filter.
            </p>
          ) : null}
        </div>
      </GlassCard>

      <GlassCard as="aside" padding="md">
        <h2 className="label mb-2">Why these videos made the cut</h2>
        <p className="max-w-[68ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
          Unit alignment came first, then a sustained AP teaching record, public availability,
          useful length, and a working privacy-enhanced embed. Creators and links were checked on{" "}
          {unitVideos[0]?.checked}.
        </p>
        <p className="mt-3 text-[0.8125rem]">
          <Link href="/integrations" className="link-underlined">
            See the public registry, editorial brief, and QA tracker →
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}
