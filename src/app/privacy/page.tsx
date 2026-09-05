import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, SectionHead } from "@/components/Furniture";
import { site, absoluteUrl, formatDate } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "AP Study Hub sets no cookies, runs no analytics and loads no third-party scripts. What is stored in your browser, and how to clear it.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy · AP Study Hub",
    description: "No cookies, no analytics, no third-party scripts. Here is exactly what is stored and where.",
    url: absoluteUrl("/privacy"),
  },
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
    key: "aps.cards.{course}",
    what: "Which flashcards you marked as known and which you marked to see again, per course.",
    when: "Written as you work through a card deck.",
  },
  {
    key: "aps.exam.{course}.{paper}",
    what: "Draft text you typed into a timed paper's written sections, so a refresh does not destroy it.",
    when: "Autosaved while you are sitting a paper.",
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
            fonts loaded from someone else&rsquo;s server. That is the whole policy; the rest of
            this page is just the detail behind it.
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
            Three keys in <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.85em" }}>localStorage</code>,
            all of them your own study state. They stay on your machine — there is no server to send
            them to.
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
            To clear them, clear site data for this domain in your browser settings, or open a
            private window and none will be written at all. Nothing on the site breaks without them
            — you just lose your place.
          </p>
        </section>

        <section className="mt-14" aria-labelledby="third-heading">
          <SectionHead folio="03" title="Third parties" id="third-heading" />
          <div className="prose">
            <p>
              The site loads no third-party resources: no font CDN, no script CDN, no embedded
              video, no tag manager, no social widgets. Everything you download when you open a page
              comes from this domain.
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
