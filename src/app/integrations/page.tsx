import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, ExternalLink } from "@/components/Furniture";
import { GlassCard } from "@/components/ui/GlassCard";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { getVideoCoverage } from "@/lib/video-lessons";
import { integrations } from "@/lib/integrations";
import { absoluteUrl, socialImages } from "@/lib/site";
import { subjects } from "@/lib/subjects";
import roadmap from "@/data/roadmap.json";

export const metadata: Metadata = {
  title: "Built in the open · press kit",
  description:
    "The public video registry, press kit, implementation brief, QA roadmap, and optional sync plan you can inspect before trusting this site.",
  alternates: { canonical: "/integrations" },
  openGraph: {
    images: socialImages,
    title: "Built in the open · AP Study Hub",
    description:
      "Public artifacts and connector-backed work behind the October 2026 update — check the work yourself.",
    url: absoluteUrl("/integrations"),
  },
  twitter: { card: "summary_large_image", images: socialImages },
};

const cards = [
  {
    key: "Google Sheets",
    title: integrations.sheet.name,
    body: integrations.sheet.description,
    href: integrations.sheet.url,
    action: "Open the registry",
    local: integrations.local.registryCsv,
  },
  {
    key: "Google Drive",
    title: integrations.drive.name,
    body: integrations.drive.description,
    href: integrations.drive.url,
    action: "Open the asset folder",
    local: integrations.local.registryJson,
  },
  {
    key: "Google Docs",
    title: integrations.doc.name,
    body: integrations.doc.description,
    href: integrations.doc.url,
    action: "Read the brief",
    local: integrations.local.registryCsv,
  },
  {
    key: "Linear",
    title: "QA roadmap & issue tracker",
    body: "Six tracked issues cover the failing social image, dark theme, video curation, embedded players, the advanced Study Desk, and Supabase activation.",
    href: integrations.linear.tracker,
    action: "Open the tracker",
    local: integrations.local.roadmapJson,
  },
  {
    key: "Supabase",
    title: "Optional Study Desk sync",
    body: "A committed SQL migration and edge function store a snapshot behind a hashed sync code. No secret is compiled into the website; local progress remains the default.",
    href: integrations.linear.syncIssue,
    action: "See activation issue",
    local: "/study?tab=advanced",
  },
] as const;

export default function IntegrationsPage() {
  const coverage = getVideoCoverage();
  const trail = [
    { name: "Home", href: "/" },
    { name: "Integrations", href: "/integrations" },
  ];

  return (
    <div className="wrap space-y-10 py-10 md:py-14">
      <GlassCard as="header" padding="lg">
        <Breadcrumbs trail={trail} />
        <p className="label mb-2">Built in the open · 24 October 2026</p>
        <h1
          className="text-[clamp(2rem,1.6rem+2vw,3.1rem)] font-semibold"
          style={{ letterSpacing: "-0.03em" }}
        >
          Built in the open, so you can check the work.
        </h1>
        <p className="lede mt-3">
          Five connected apps helped us make public artifacts you can inspect: a video registry, a
          press kit, an editorial brief, a tracked QA roadmap, and a deployable sync function.
        </p>
      </GlassCard>

      <section aria-labelledby="preview-heading" className="integration-preview">
        <div>
          <p className="label">A social preview you can trust</p>
          <h2 id="preview-heading" className="font-semibold">
            A preview card that just works.
          </h2>
          <p>
            Every page points at a verified static 1200×630 PNG with explicit Open Graph and Twitter
            metadata, dimensions, cache headers, and offline caching.
          </p>
          <div className="integration-preview-actions items-start">
            <DownloadButton href={integrations.local.socialImage} download>
              Download PNG
            </DownloadButton>
            <ExternalLink href={integrations.drive.files.socialImage} className="btn btn-outline btn-sm">
              Drive copy
            </ExternalLink>
            <Link href="/videos" className="btn btn-quiet btn-sm">
              Video library
            </Link>
          </div>
        </div>
        <figure>
          <Image
            src={integrations.local.socialImage}
            width={600}
            height={315}
            alt="AP Study Hub static social preview card"
            sizes="(max-width: 800px) 100vw, 600px"
          />
          <figcaption>Static card · 1200 × 630 · PNG · also cached by the offline worker.</figcaption>
        </figure>
      </section>

      <section aria-labelledby="connectors-heading">
        <div className="mb-6">
          <p className="label mb-1">01 · Public Artifacts</p>
          <h2 id="connectors-heading" className="canvas-heading text-[1.75rem] font-semibold">
            The tools behind the scenes
          </h2>
        </div>
        <div className="integration-grid !mt-0">
          {cards.map((card) => (
            <article key={card.key} className="integration-card glass-box-interactive">
              <p className="tag self-start">{card.key}</p>
              <h3 className="mt-3 font-semibold">{card.title}</h3>
              <p>{card.body}</p>
              <div className="integration-card-actions">
                <ExternalLink href={card.href} className="link-underlined">
                  {card.action} →
                </ExternalLink>
                <a href={card.local} className="link-underlined">
                  Local export
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <GlassCard as="section" padding="lg" aria-labelledby="registry-heading" id="video-registry">
        <p className="label mb-1">02 · Video Coverage</p>
        <h2 id="registry-heading" className="text-[1.6rem] font-semibold">
          Every unit, accounted for
        </h2>
        <p className="mt-2 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
          {coverage.videos} verified videos cover all {coverage.units} units.
        </p>
        <div className="table-scroll mt-5">
          <table className="data-table">
            <caption className="sr-only">Video coverage by AP course</caption>
            <thead>
              <tr>
                <th scope="col">Course</th>
                <th scope="col">Units</th>
                <th scope="col">Videos</th>
                <th scope="col">Player route</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => {
                const row = coverage.byCourse[subject.slug];
                return (
                  <tr key={subject.slug}>
                    <th scope="row">{subject.familiar}</th>
                    <td>{row?.units ?? 0}</td>
                    <td>{row?.videos ?? 0}</td>
                    <td>
                      <Link href={`/course/${subject.slug}/videos`} className="link-underlined">
                        Open course videos
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="integration-downloads items-start">
          <DownloadButton href={integrations.local.registryCsv} download>
            CSV registry
          </DownloadButton>
          <DownloadButton href={integrations.local.registryJson} download>
            JSON registry
          </DownloadButton>
          <ExternalLink href={integrations.sheet.url} className="btn btn-quiet btn-sm">
            Open Google Sheet
          </ExternalLink>
        </div>
      </GlassCard>

      <GlassCard as="section" padding="lg" aria-labelledby="roadmap-heading">
        <p className="label mb-1">03 · QA Tracker</p>
        <h2 id="roadmap-heading" className="text-[1.6rem] font-semibold">
          What shipped, what is still open
        </h2>
        <ol className="roadmap-list">
          {roadmap.issues.map((issue) => (
            <li key={issue.id} data-status={issue.status}>
              <div>
                <span className="label">
                  {issue.id} · {issue.status}
                </span>
                <h3 className="font-semibold">{issue.title}</h3>
                <p>
                  Due {issue.dueDate} · {issue.priority} priority · {issue.label}
                </p>
              </div>
              <ExternalLink href={issue.url} className="link-underlined">
                Open issue →
              </ExternalLink>
            </li>
          ))}
        </ol>
      </GlassCard>

      <GlassCard as="section" padding="lg" aria-labelledby="sync-heading">
        <p className="label mb-1">04 · Optional Sync</p>
        <h2 id="sync-heading" className="mb-4 text-[1.6rem] font-semibold">
          Sync stays off until you choose it
        </h2>
        <div className="integration-sync">
          <div>
            <p className="label">Project {integrations.supabase.projectRef}</p>
            <h3 className="font-semibold">Local-first remains the default.</h3>
            <p>
              The Supabase project is <strong>{integrations.supabase.status}</strong>. The database migration
              has been applied, and the <code>study-desk-sync</code> edge function is deployed.
              The new Vercel site is configured to use it. Your progress stays on this device
              unless you choose to save a snapshot through Advanced Desk.
            </p>
            <p>
              Sync secrets stay on the server. The snapshot table has row-level security enabled
              and cannot be read directly by browser roles. Browser-to-server sync still needs an
              end-to-end verification.
            </p>
            <div className="integration-preview-actions">
              <Link href="/study?tab=advanced" className="btn btn-solid btn-sm">
                Open Advanced Desk
              </Link>
              <ExternalLink href={integrations.linear.syncIssue} className="btn btn-outline btn-sm">
                View sync task
              </ExternalLink>
            </div>
          </div>
          <pre className="code-block whitespace-pre-wrap break-all" aria-label="Configured optional sync endpoint">
            <code>{`# Configured in Vercel
NEXT_PUBLIC_STUDY_SYNC_URL=${integrations.supabase.defaultEndpoint}

# Deployment status
# Database migration: applied
# Edge function: deployed
# New site origin: allowed
# Sync: opt-in; no automatic uploads`}</code>
          </pre>
        </div>
      </GlassCard>
    </div>
  );
}
