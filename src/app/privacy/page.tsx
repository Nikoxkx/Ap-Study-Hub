import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, SectionHead } from "@/components/Furniture";
import { site, formatDate, pageSocial } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "AP Study Hub sets no cookies, runs no analytics and loads no third-party scripts. What is stored in your browser, and how to clear it.",
  ...pageSocial({
    title: "Privacy",
    description:
      "No cookies, no analytics, no third-party scripts. Every storage key the site writes is named, and this is how to clear it.",
    path: "/privacy",
  }),
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
    key: "aph:scratch-pad:v1",
    what: "Whatever you typed on the scratch pad, which pen colour you chose, and when it last saved.",
    when: "Written on every keystroke while the pad is open.",
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
            Nothing about you leaves your browser.
          </h1>
          <p className="lede mt-5">
            No account, no cookies, no analytics, no advertising, no third-party scripts and no
            fonts loaded from someone else&rsquo;s server. The one thing you can opt into is a video,
            and nothing is requested from YouTube until you press play. That is the whole policy; the
            rest of this page is the detail behind it.
          </p>
        </div>

        <section className="mt-14" aria-labelledby="collect-heading">
          <SectionHead folio="01" title="What is collected" id="collect-heading" />
          <div className="prose">
            <p>
              Nothing. There is no account system, no contact form, no newsletter, no comment
              section and no analytics product. I do not know how many people use this site, which
              is occasionally frustrating and is the correct trade.
            </p>
            <p>
              Pages are static files. Loading one requires no database query about you and creates
              no record I can read. The single dynamic endpoint on the site is the search API, which
              receives your query string, matches it against an in-memory index, returns results,
              and writes nothing anywhere.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="storage-heading">
          <SectionHead folio="02" title="What is stored on your device" id="storage-heading">
            The localStorage keys below hold your own study state. They stay on your machine —
            there is no server to send them to. Course and paper placeholders are replaced by the
            relevant subject or activity ID.
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
              Almost nothing. There is no font CDN, no script CDN, no tag manager and no social
              widget: fonts, styles and code all come from this domain. The one exception is video,
              and it is opt-in twice over.
            </p>
            <p>
              Video cards on a course page or on your study desk show a still frame from{" "}
              <code>i.ytimg.com</code> and load nothing else. Press play and the player itself is
              embedded from <code>youtube-nocookie.com</code>, which YouTube says withholds
              advertising cookies until playback. From that moment Google&rsquo;s own terms and
              privacy policy apply to that frame, not mine. If you never press play, no request ever
              reaches Google; if you would rather not at all, every card also links straight to
              YouTube so you can choose the tab yourself.
            </p>
            <p>
              A backup is created only when you choose Export backup; it downloads as a JSON file
              on your device. Restoring reads only the file you explicitly choose in the file picker.
            </p>
            <p>
              There are outbound links, to the College Board, to reference archives and to YouTube
              channels. Following one takes you to a site with its own policy, which will almost
              certainly be less restrained than this one. Nothing about you is passed along in the
              link.
            </p>
            <p>
              The site is hosted on Vercel, which like any host keeps operational server logs
              containing IP addresses and user agents for a short period. I do not query them and
              they are not connected to anything else.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="rights-heading">
          <SectionHead folio="04" title="Your rights, and children" id="rights-heading" />
          <div className="prose">
            <p>
              Regimes like the GDPR and the CCPA give you rights of access, correction and erasure
              over personal data a site holds about you. This site holds none, so there is nothing
              to request and nothing to erase beyond what your own browser is storing, which you can
              delete yourself at any time.
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
