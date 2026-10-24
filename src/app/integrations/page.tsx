import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, ExternalLink, SectionHead } from "@/components/Furniture";
import { getVideoCoverage } from "@/lib/video-lessons";
import { integrations } from "@/lib/integrations";
import { absoluteUrl, socialImages } from "@/lib/site";
import { subjects } from "@/lib/subjects";
import roadmap from "@/data/roadmap.json";

export const metadata: Metadata = {
  title: "Integrations & press kit",
  description: "The public Google Sheets video registry, Google Drive press kit, Google Docs implementation brief, Linear roadmap, and Supabase sync plan behind AP Study Hub.",
  alternates: { canonical: "/integrations" },
  openGraph: {
    images: socialImages,
    title: "Integrations & press kit · AP Study Hub",
    description: "Public artifacts and connector-backed capabilities behind the October 2026 update.",
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
  const trail = [{ name: "Home", href: "/" }, { name: "Integrations", href: "/integrations" }];

  return (
    <div className="wrap py-12 md:py-16">
      <Breadcrumbs trail={trail} />
      <header className="max-w-[72ch] py-8">
        <p className="label mb-2">Built in the open · 24 October 2026</p>
        <h1 className="text-[clamp(2rem,1.6rem+2vw,3.25rem)]" style={{ letterSpacing: "-0.03em" }}>
          The connectors behind this update.
        </h1>
        <p className="lede mt-4">
          Five connected apps produced durable, inspectable artifacts: a public video registry, a press kit, an editorial
          brief, a tracked QA roadmap, and a deployable sync function. The website itself remains local-first by default.
        </p>
      </header>

      <section aria-labelledby="preview-heading" className="integration-preview">
        <div>
          <p className="label">Reliable social preview</p>
          <h2 id="preview-heading">A static 1200×630 PNG, not a fragile runtime route.</h2>
          <p>
            The old <code>/opengraph-image</code> route returned HTTP 500 in production. Every page now points at a real
            file with explicit Open Graph and Twitter metadata, dimensions, type, alt text, cache headers, and redirects
            from the old URLs.
          </p>
          <div className="integration-preview-actions">
            <a className="btn btn-solid btn-sm" href={integrations.local.socialImage} download>Download PNG</a>
            <ExternalLink href={integrations.drive.files.socialImage} className="btn btn-outline btn-sm">Drive copy</ExternalLink>
            <Link href="/videos" className="btn btn-quiet btn-sm">Video library</Link>
          </div>
        </div>
        <figure>
          <Image src={integrations.local.socialImage} width={600} height={315} alt="AP Study Hub static social preview card" sizes="(max-width: 800px) 100vw, 600px" />
          <figcaption>Static card · 1200 × 630 · PNG · also cached by the offline worker.</figcaption>
        </figure>
      </section>

      <section className="mt-16" aria-labelledby="connectors-heading">
        <SectionHead folio="01" title="Connector stack" id="connectors-heading">
          Each connector produced a real artifact or capability; none of them placed a private credential in the browser bundle.
        </SectionHead>
        <div className="integration-grid">
          {cards.map((card) => (
            <article key={card.key} className="integration-card">
              <p className="connector-tag">{card.key}</p>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <div className="integration-card-actions">
                <ExternalLink href={card.href} className="link-underlined">{card.action} →</ExternalLink>
                <a href={card.local} className="link-underlined">Local export</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="registry-heading" id="video-registry">
        <SectionHead folio="02" title="Video coverage" id="registry-heading">
          {coverage.videos} verified videos cover all {coverage.units} units. The Sheet is the canonical registry; typed
          data is committed to the site so a YouTube or Sheets outage cannot break a lesson page.
        </SectionHead>
        <div className="table-scroll">
          <table className="data-table">
            <caption className="sr-only">Video coverage by AP course</caption>
            <thead>
              <tr><th scope="col">Course</th><th scope="col">Units</th><th scope="col">Videos</th><th scope="col">Player route</th></tr>
            </thead>
            <tbody>
              {subjects.map((subject) => {
                const row = coverage.byCourse[subject.slug];
                return (
                  <tr key={subject.slug}>
                    <th scope="row">{subject.familiar}</th>
                    <td>{row?.units ?? 0}</td>
                    <td>{row?.videos ?? 0}</td>
                    <td><Link href={`/course/${subject.slug}/videos`} className="link-underlined">Open course videos</Link></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="integration-downloads">
          <a className="btn btn-outline btn-sm" href={integrations.local.registryCsv} download>Download CSV registry</a>
          <a className="btn btn-outline btn-sm" href={integrations.local.registryJson} download>Download JSON registry</a>
          <ExternalLink href={integrations.sheet.url} className="btn btn-quiet btn-sm">Open Google Sheet</ExternalLink>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="roadmap-heading">
        <SectionHead folio="03" title="Roadmap snapshot" id="roadmap-heading">
          Generated from the Linear project “{roadmap.project}”. The Advanced Study Desk renders the same tracked work.
        </SectionHead>
        <ol className="roadmap-list">
          {roadmap.issues.map((issue) => (
            <li key={issue.id} data-status={issue.status}>
              <div>
                <span className="label">{issue.id} · {issue.status}</span>
                <h3>{issue.title}</h3>
                <p>Due {issue.dueDate} · {issue.priority} priority · {issue.label}</p>
              </div>
              <ExternalLink href={issue.url} className="link-underlined">Open issue →</ExternalLink>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16" aria-labelledby="sync-heading">
        <SectionHead folio="04" title="Supabase sync status" id="sync-heading">
          Ready to deploy, intentionally off by default.
        </SectionHead>
        <div className="integration-sync">
          <div>
            <p className="label">Project {integrations.supabase.projectRef}</p>
            <h3>Local-first remains the default.</h3>
            <p>
              The existing Supabase project is currently <strong>{integrations.supabase.status}</strong>, so the live
              endpoint is not deployed. The sync pepper and allowed-origin secrets are already stored in Supabase; the SQL
              migration and <code>study-desk-sync</code> edge function are committed under <code>supabase/</code>.
            </p>
            <p>
              To activate: restore the project, run the migration, deploy the function, and set{' '}
              <code>NEXT_PUBLIC_STUDY_SYNC_URL</code> in Vercel. The website never receives the service-role key or pepper.
            </p>
            <div className="integration-preview-actions">
              <Link href="/study?tab=advanced" className="btn btn-solid btn-sm">Open Advanced Desk</Link>
              <ExternalLink href={integrations.linear.syncIssue} className="btn btn-outline btn-sm">Track activation</ExternalLink>
            </div>
          </div>
          <pre className="code-block" aria-label="Supabase deployment commands"><code>{`# after restoring the project
supabase db push
supabase functions deploy study-desk-sync --no-verify-jwt

# Vercel environment variable
NEXT_PUBLIC_STUDY_SYNC_URL=
  https://${integrations.supabase.projectRef}.functions.supabase.co/${integrations.supabase.functionSlug}`}</code></pre>
        </div>
      </section>

      <aside className="sunk mt-16 max-w-[68ch] p-5">
        <h2 className="label mb-2">Found something broken?</h2>
        <p className="text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
          Every video has a scoped replacement search and a report link. For a site-wide correction, open a GitHub issue
          or use the copyable report in the Advanced Study Desk. The public editorial brief records exactly how this
          update was put together.
        </p>
        <p className="mt-3 text-[0.8125rem]">
          <ExternalLink href="https://github.com/Nikoxkx/Ap-Study-Hub/issues" className="link-underlined">Open a GitHub issue →</ExternalLink>
        </p>
      </aside>
    </div>
  );
}
