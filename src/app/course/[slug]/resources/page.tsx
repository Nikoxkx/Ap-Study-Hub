import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse, getCatalog } from "@/lib/catalog";
import { channelsFor, channelUrl, channelSearchUrl } from "@/lib/channels";
import { ExternalLink, SectionHead } from "@/components/Furniture";
import { absoluteUrl } from "@/lib/site";

type Params = Promise<{ slug: string }>;
/**
 * Same as the essays route: no link list, no page.
 */
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
  const title = `${subject.familiar} sources and links`;
  const description = `${counts.resources} checked links for ${subject.official}: College Board material, primary archives, and the teachers worth watching.`;

  return {
    title,
    description,
    alternates: { canonical: `/course/${subject.slug}/resources` },
    openGraph: { title: `${title} · AP Study Hub`, description, url: absoluteUrl(`/course/${subject.slug}/resources`) },
  };
}

/** Human-readable grouping for the `type` field on each resource record. */
const groupNames: Record<string, string> = {
  official: "From the College Board",
  practice: "Practice and problem sets",
  video: "Video and lectures",
  reference: "Reference and archives",
  reading: "Reading",
  tool: "Tools",
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
    <div className="wrap py-12 md:py-16">
      <header className="mb-12 max-w-[62ch]">
        <p className="label mb-2">{resources.length} links</p>
        <h2 className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)]" style={{ letterSpacing: "-0.025em" }}>
          {subject.familiar} sources
        </h2>
        <p className="lede mt-4">
          Short on purpose. Everything here was opened before it was listed, and anything that turned
          out to be a content farm with a paywall three clicks in is not here.
        </p>
      </header>

      {orderedGroups.map((key, index) => (
        <section key={key} className="mb-14" aria-labelledby={`group-${key}`}>
          <SectionHead
            folio={String(index + 1).padStart(2, "0")}
            title={groupNames[key]}
            id={`group-${key}`}
            level={3}
          />
          <ul>
            {grouped[key].map((resource) => (
              <li key={resource.url} className="rule-top py-4">
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
        </section>
      ))}

      {channels.length > 0 ? (
        <section aria-labelledby="channels-heading">
          <SectionHead
            folio={String(orderedGroups.length + 1).padStart(2, "0")}
            title="Channels"
            id="channels-heading"
            level={3}
          >
            Linked as channels rather than as individual videos, so the links keep working. Each
            comes with a search scoped to this course.
          </SectionHead>

          <ul>
            {channels.map((channel) => (
              <li key={channel.handle} className="rule-top py-4">
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
        </section>
      ) : null}

      <aside className="sunk mt-14 max-w-[62ch] p-5">
        <h3 className="label mb-2">Found a dead link?</h3>
        <p className="text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
          Links rot. If one of these has gone, say so and it will be pulled or replaced — the point
          of a short list is that all of it works.
        </p>
      </aside>
    </div>
  );
}
