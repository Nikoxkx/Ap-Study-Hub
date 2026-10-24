import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, SectionHead } from "@/components/Furniture";
import { site, absoluteUrl, formatDate, socialImages } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "AP Study Hub sets no cookies, runs no analytics, and loads no third-party trackers. Local study data, opt-in video frames, and optional sync are explained plainly.",
  alternates: { canonical: "/privacy" },
  openGraph: { images: socialImages,
    title: "Privacy · AP Study Hub",
    description: "No cookies, no analytics, no trackers. Local by default, with opt-in video frames and sync explained plainly.",
    url: absoluteUrl("/privacy"),
  },
  twitter: { card: "summary_large_image", images: socialImages },
};

/**
 * Privacy.
 *
 * Short because there is genuinely not much to say, and specific because a
 * privacy page that describes "your data" in the abstract is worthless. Every
 * storage key the site writes is named here.
 */

const storageKeys = [
  {
    key: "aps.theme",
    what: "Whether you chose light, dark, or system.",
    when: "Written when you use the theme control in the header. Absent until then.",
  },
  {
    key: "aps.cards.v2.{course}",
    what: "Which flashcards you marked as known and which you marked to see again, per course.",
    when: "Written as you work through a card deck.",
  },
  {
    key: "aps.exam.{course}.{paper}",
    what: "Draft text you typed into a timed paper's written sections, so a refresh does not destroy it.",
    when: "Autosaved while you are sitting a paper.",
  },
  {
    key: "aps.study.v1",
    what: "Review schedules, confidence, mistakes, plans, objective evidence, writing tasks, focus minutes, and weekly history.",
    when: "Updated as you use the shared study tools.",
  },
  {
    key: "aps.video-progress.v1",
    what: "Which unit videos you marked watched and the retrieval notes you wrote beside them.",
    when: "Updated when you use a unit player or the Advanced Study Desk watchlist.",
  },
  {
    key: "aps.goals.v1",
    what: "Weekly retrieval, minutes, and accuracy targets for the Advanced Study Desk.",
    when: "Written when you change a goal. Absent until then.",
  },
  {
    key: "aps.sync.v1",
    what: "The optional Supabase endpoint and sync code you entered, plus the last sync time.",
    when: "Written only if you use Advanced → opt-in sync. Forget code removes the code from this browser.",
  },
  {
    key: "aps.frq.v1.{course}",
    what: "Your FRQ drafts, self-assessment marks, and rubric reflections.",
    when: "Saved when you leave the FRQ Studio.",
  },
  {
    key: "aps.frq-marks.v1.{course}",
    what: "Your self-assessment marks for marked essay and writing examples.",
    when: "Saved as you work through a rubric.",
  },
  {
    key: "aps.lab.v1.{activity}",
    what: "Your annotations or data-analysis notes for a course activity.",
    when: "Autosaved while you use an interactive lab.",
  },
  {
    key: "aps.matrix.v1.{activity}",
    what: "Your synthesis-matrix entries and source notes.",
    when: "Autosaved while you use the Seminar matrix.",
  },
  {
    key: "aps.research.v1.{activity}",
    what: "Your Research question or oral-defense rehearsal notes.",
    when: "Autosaved while you use a Research lab.",
  },
];

export default function PrivacyPage() {
  const trail = [
    { name: "Home", href: "/" },
    { name: "Privacy", href: "/privacy" },
  ];

  return (
    <>
      <JsonLd schema={breadcrumbSchema(trail)} />

      <div className="wrap py-12 md:py-16">
        <div className="max-w-[68ch]">
          <Breadcrumbs trail={trail} />
          <p className="label mb-3">Last updated {formatDate(site.policyUpdated)}</p>
          <h1 className="text-[clamp(1.9rem,1.5rem+1.8vw,2.9rem)]" style={{ letterSpacing: "-0.028em" }}>
            Local by default. You choose what leaves.
          </h1>
          <p className="lede mt-5">
            No account, no cookies, no analytics, no advertising, no trackers, and no fonts loaded
            from someone else&rsquo;s server. Unit videos and Study Desk sync are both opt-in; the
            rest of this page explains exactly when a request can leave the site.
          </p>
        </div>

        <section className="mt-14" aria-labelledby="collect-heading">
          <SectionHead folio="01" title="What is collected" id="collect-heading" />
          <div className="prose">
            <p>
              Nothing by default. There is no account system, no contact form, no newsletter, no
              comment section and no analytics product. I do not know how many people use this site,
              which is occasionally frustrating and is still the correct trade.
            </p>
            <p>
              Pages are static files. Loading one requires no database query about you and creates
              no record I can read. The first-party search API receives your query string, matches
              it against an in-memory index, returns results, and writes nothing anywhere. The social
              preview is a static image, not a tracking pixel.
            </p>
            <p>
              Two features can make an outbound request, and both require an explicit action. Pressing
              play on a unit video loads a privacy-enhanced <code>youtube-nocookie.com</code> frame.
              Enabling sync in Advanced sends your version-1 study state to the Supabase endpoint you
              configured, keyed by a peppered hash of a code you hold. Neither happens on page load.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="storage-heading">
          <SectionHead folio="02" title="What is stored on your device" id="storage-heading">
            The localStorage keys below hold your own study state. They stay on your machine unless
            you explicitly save a snapshot through Advanced → opt-in sync. Course and paper
            placeholders are replaced by the relevant subject or activity ID.
          </SectionHead>

          <div className="table-scroll">
            <table className="data-table">
              <caption className="sr-only">Local storage keys written by this site</caption>
              <thead>
                <tr>
                  <th scope="col">Key</th>
                  <th scope="col">What it holds</th>
                  <th scope="col">When it is written</th>
                </tr>
              </thead>
              <tbody>
                {storageKeys.map((row) => (
                  <tr key={row.key}>
                    <th scope="row" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", whiteSpace: "nowrap" }}>
                      {row.key}
                    </th>
                    <td>{row.what}</td>
                    <td style={{ color: "var(--ink-soft)" }}>{row.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
            To clear them, clear site data for this domain in your browser settings, use Reset local
            study data on the Study page, or open a private window. Offline course packs also use
            this browser’s Cache Storage for pages and assets. Nothing on the site breaks without
            local data — you just lose your place and saved work.
          </p>
        </section>

        <section className="mt-14" aria-labelledby="third-heading">
          <SectionHead folio="03" title="Third parties" id="third-heading" />
          <div className="prose">
            <p>
              The site loads no third-party scripts, fonts, analytics, tag managers, or social
              widgets. Video players are the one embedded third-party frame: until you press play,
              the poster is local HTML/CSS. After you press play, YouTube receives the request for the
              video and its own policy applies. Use “Open on YouTube” if you prefer that boundary to
              be explicit.
            </p>
            <p>
              Optional sync uses the Supabase edge function you configure in Advanced. The browser
              sends only the sync code and the study-state snapshot; the function stores a peppered
              hash of the code, never the code itself. No service-role key or pepper is present in
              the website bundle. Delete remote removes that snapshot; it does not erase local data.
            </p>
            <p>
              A backup is created only when you choose Export backup; it downloads as a JSON file
              on your device. Reports, video CSV, and the HTML report are also generated locally.
              Restoring reads only the file you explicitly choose in the file picker.
            </p>
            <p>
              There are outbound links to the College Board, reference archives, YouTube, a public
              Google Sheet, Google Drive, Google Docs, Linear, and GitHub. Following one takes you to
              a site with its own policy. Nothing about your local study record is passed in those
              links. The site is hosted on Vercel, which like any host keeps short-lived operational
              server logs containing IP addresses and user agents.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="rights-heading">
          <SectionHead folio="04" title="Your rights, and children" id="rights-heading" />
          <div className="prose">
            <p>
            Regimes like the GDPR and the CCPA give you rights of access, correction and erasure
            over personal data a site holds about you. By default this site holds none, so there is
            nothing to request beyond data in your own browser, which you can delete yourself. If
            you enable optional sync, the remote snapshot is addressable only through the peppered
            hash of your sync code; use that same code in Advanced → Delete remote to erase it.
            </p>
            <p>
              The audience here is largely high-school students, and some readers will be under 13.
              That is precisely why there is no account system, no data collection and no
              advertising: the compliant design for a site aimed at minors is not to collect
              anything in the first place.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="changes-heading">
          <SectionHead folio="05" title="If this changes" id="changes-heading" />
          <div className="prose">
            <p>
              If the site ever starts collecting anything — it will not, but if it did — this page
              changes first, with the date at the top updated and the change described here rather
              than folded silently into a longer document. The{" "}
              <a href={`${site.repo}/commits/main/src/app/privacy/page.tsx`} target="_blank" rel="noopener noreferrer">
                commit history for this page
              </a>{" "}
              is public, so you do not have to take my word for what it said last month.
            </p>
            <p>
              Questions go to{" "}
              <a href={`${site.repo}/issues`} target="_blank" rel="noopener noreferrer">
                the issue tracker
              </a>
              .
            </p>
          </div>
        </section>

        <p className="mt-14 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
          See also:{" "}
          <Link href="/accessibility" className="link-underlined" style={{ color: "var(--ink)" }}>
            accessibility
          </Link>{" "}
          and{" "}
          <Link href="/about" className="link-underlined" style={{ color: "var(--ink)" }}>
            how the content is made
          </Link>
          .
        </p>
      </div>
    </>
  );
}
