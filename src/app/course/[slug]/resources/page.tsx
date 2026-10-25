import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse, getCatalog } from "@/lib/catalog";
import { channelsFor, channelUrl, channelSearchUrl } from "@/lib/channels";
import { ExternalLink } from "@/components/Furniture";
import { GlassCard } from "@/components/ui/GlassCard";
import { absoluteUrl, socialImages } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getCatalog()
    .filter((course) => course.resources.length > 0)
    .map((course) => ({ slug: course.subject.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const { subject, counts } = course;
  const title = `${subject.familiar} sources you can check`;
  const description = `${counts.resources} links we actually opened for ${subject.official}: College Board material, primary archives, and teachers worth learning from.`;

  return {
    title,
    description,
    alternates: { canonical: `/course/${subject.slug}/resources` },
    openGraph: {
      images: socialImages,
      title: `${title} · AP Study Hub`,
      description,
      url: absoluteUrl(`/course/${subject.slug}/resources`),
    },
    twitter: { card: "summary_large_image", images: socialImages },
  };
}

const groupNames: Record<string, string> = {
  official: "Straight from the College Board",
  practice: "Practice you can actually do",
  video: "Videos worth your time",
  reference: "Sources and archives",
  reading: "Reading worth doing",
  tool: "Tools that help",
};

export default async function ResourcesPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const { subject, resources } = course;
  if (resources.length === 0) notFound();

  const grouped = resources.reduce<Record<string, typeof resources>>((groups, resource) => {
    const key = resource.type in groupNames ? resource.type : "reference";
    (groups[key] ??= []).push(resource);
    return groups;
  }, {});

  const channels = channelsFor(subject.slug);
  const orderedGroups = Object.keys(groupNames).filter((key) => grouped[key]?.length);

  return (
    <div className="wrap space-y-8 py-8 md:py-12">
      <GlassCard as="header" padding="lg">
        <p className="label mb-2">{resources.length} checked links</p>
        <h2
          className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)] font-semibold"
          style={{ letterSpacing: "-0.025em" }}
        >
          {subject.familiar} sources you can check
        </h2>
        <p className="lede mt-3">
          Short on purpose. Every link here was opened before it was listed, and anything that
          turned into a paywall three clicks in is not here.
        </p>
      </GlassCard>

      {orderedGroups.map((key, index) => (
        <GlassCard key={key} as="section" padding="lg" aria-labelledby={`group-${key}`}>
          <p className="label mb-1">{String(index + 1).padStart(2, "0")}</p>
          <h3 id={`group-${key}`} className="mb-4 text-[1.45rem] font-semibold">
            {groupNames[key]}
          </h3>
          <ul className="divide-y divide-white/60 border-t border-white/60">
            {grouped[key].map((resource) => (
              <li key={resource.url} className="py-4">
                <h4 className="text-[1.0625rem] font-semibold">
                  <ExternalLink href={resource.url} className="link-draw">
                    {resource.title}
                  </ExternalLink>
                </h4>
                <p className="mt-1 max-w-[68ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {resource.description}
                </p>
                <p
                  className="mt-1.5 truncate text-[0.75rem]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
                >
                  {new URL(resource.url).hostname.replace(/^www\./, "")}
                </p>
              </li>
            ))}
          </ul>
        </GlassCard>
      ))}

      {channels.length > 0 ? (
        <GlassCard as="section" padding="lg" aria-labelledby="channels-heading">
          <p className="label mb-1">{String(orderedGroups.length + 1).padStart(2, "0")}</p>
          <h3 id="channels-heading" className="text-[1.45rem] font-semibold">
            Teachers who go deeper
          </h3>
          <p className="mt-2 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
            Unit-specific videos play on the{" "}
            <a href={`/course/${subject.slug}/videos`} className="link-underlined">
              course video page
            </a>
            . These channels remain durable places to search or go deeper.
          </p>

          <ul className="mt-5 divide-y divide-white/60 border-t border-white/60">
            {channels.map((channel) => (
              <li key={channel.handle} className="py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h4 className="text-[1.0625rem] font-semibold">
                    <ExternalLink href={channelUrl(channel)} className="link-draw">
                      {channel.name}
                    </ExternalLink>
                  </h4>
                  <p
                    className="text-[0.6875rem]"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
                  >
                    @{channel.handle} · checked {channel.checked}
                  </p>
                </div>
                <p className="mt-1 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {channel.who}.{channel.alsoCovers ? ` Also covers ${channel.alsoCovers}.` : ""}
                </p>
                <p className="mt-2">
                  <ExternalLink
                    href={channelSearchUrl(channel, `${subject.familiar} review`)}
                    className="text-[0.8125rem] link-underlined"
                  >
                    Search it for {subject.familiar}
                  </ExternalLink>
                </p>
              </li>
            ))}
          </ul>
        </GlassCard>
      ) : null}
    </div>
  );
}
