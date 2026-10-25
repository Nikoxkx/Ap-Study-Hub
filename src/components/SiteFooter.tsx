import Link from "next/link";
import { subjects, formatExamDate } from "@/lib/subjects";
import { getTotals } from "@/lib/catalog";
import { site } from "@/lib/site";
import { SiteMark } from "./SubjectMark";

const columns = [
  {
    heading: "Look around",
    links: [
      { href: "/about", label: "Meet the student" },
      { href: "/ai-disclosure", label: "AI disclosure" },
      { href: "/guides", label: "Study smarter" },
      { href: "/videos", label: "Watch by unit" },
      { href: "/integrations", label: "How it is built" },
      { href: "/search", label: "Find anything" },
      { href: "/colophon", label: "Design notes" },
    ],
  },
  {
    heading: "The fine print",
    links: [
      { href: "/accessibility", label: "Works for everyone" },
      { href: "/privacy", label: "Your privacy" },
      { href: "/sitemap.xml", label: "All pages" },
      { href: site.repo, label: "See the code", external: true },
      { href: `${site.repo}/blob/main/AI_DISCLOSURE.md`, label: "AI_DISCLOSURE.md", external: true },
    ],
  },
];

export function SiteFooter() {
  const totals = getTotals();
  const revised = new Date();

  return (
    <footer data-site-footer className="sky-footer-bg mt-24 rule-top relative overflow-hidden" style={{ background: "var(--paper-raised)" }}>
      <div className="wrap py-12 relative">
        {/* horizon thumbnail strip */}
        <div className="mb-8 flex gap-1.5 overflow-hidden rounded-[10px] border" style={{ borderColor: "rgba(255,255,255,0.6)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          {[
            "/images/chris-doretz-skyvol1-artstation-store-thumbnail-02.jpg",
            "/images/chris-doretz-skyvol1-artstation-store-thumbnail-06.jpg",
            "/images/chris-doretz-skyvol1-artstation-store-thumbnail-04.jpg",
            "/images/chris-doretz-skyvol1-artstation-store-thumbnail-05.jpg",
            "/images/chris-doretz-skyvol1-artstation-store-thumbnail-08.jpg",
            "/images/chris-doretz-skyvol1-artstation-store-thumbnail-01-wo.jpg",
            "/images/chris-doretz-skyvol1-artstation-store-thumbnail-09.jpg",
            "/images/chris-doretz-skyvol1-artstation-store-thumbnail-03.jpg",
          ].map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              style={{ flex: "1 1 0", minWidth: 0, height: 46, objectFit: "cover", objectPosition: "center 35%", opacity: 0.92 }}
              loading="lazy"
            />
          ))}
        </div>
        <p className="label mb-2" style={{ letterSpacing: "0.12em" }}>
          All eight skies — Chris Doretz Sky Vol. 1 · shelf cloud to towering cumulus
        </p>

        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="mb-3 flex items-baseline gap-2">
              <SiteMark size={22} className="self-center" />
              <span className="text-[1.0625rem] font-semibold" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}>
                AP Study Hub
              </span>
              <span className="tag" style={{ fontSize: "0.625rem" }}>
                ☁︎ sky edition
              </span>
            </div>
            <p className="max-w-[38ch] text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
              {totals.units} lessons that explain, {totals.flashcards} recall cards and {totals.questions} original questions across {totals.courses} skies. From shelf cloud to clear blue — AI-assisted drafts, dated sources, and public corrections — see{" "}
              <Link href="/ai-disclosure" className="link-underlined" style={{ color: "var(--ink)" }}>
                AI disclosure
              </Link>
              .
            </p>
            <p className="mt-4 text-[0.8125rem]" style={{ color: "var(--ink-faint)" }}>
              Built under open sky by <Link href="/about" className="link-underlined" style={{ color: "var(--ink)" }}>{site.author.name}</Link>.
            </p>
            <p className="mt-3 text-[0.75rem] leading-relaxed" style={{ color: "var(--ink-faint)", fontFamily: "var(--font-mono)" }}>
              Every section you scrolled through rode a different cloud: the hero wore the dark shelf (02), the catalogue rode bright cumulus (04), the anatomy floated on cirrus (05), the calendar broke through shafts (06), the note settled in soft towers (08), the FAQ cleared to high blue (01). Dark mode pulls the whole site into dusk — the same storm, after sunset.
            </p>
          </div>

          <nav aria-label="Pick a course">
            <h2 className="label mb-3">Pick a course</h2>
            <ul className="space-y-1.5">
              {subjects.map((subject) => (
                <li key={subject.slug}>
                  <Link href={`/course/${subject.slug}`} className="link-draw text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                    {subject.familiar}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="label mb-3">{column.heading}</h2>
              <ul className="space-y-1.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a href={link.href} rel="noopener noreferrer" target="_blank" className="link-draw text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                        {link.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <Link href={link.href} className="link-draw text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 rule-top pt-5">
          <h2 className="label mb-3">Dates worth circling — like pressure minima on a chart</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {[...subjects]
              .sort((a, b) => a.exam.date.localeCompare(b.exam.date))
              .map((subject) => (
                <li key={subject.slug} className="text-[0.8125rem]" style={{ color: "var(--ink-soft)" }}>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>{formatExamDate(subject, "short")}</span> {subject.familiar}
                </li>
              ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-3 rule-top pt-5 text-[0.75rem] sm:flex-row sm:items-center sm:justify-between" style={{ color: "var(--ink-faint)" }}>
          <p>Not affiliated with, endorsed by, or reviewed by the College Board. AP and Advanced Placement are registered trademarks of the College Board.</p>
          <p style={{ fontFamily: "var(--font-mono)" }}>
            Content revision {site.contentRevision} · <time dateTime={revised.toISOString().slice(0, 10)}>{revised.toISOString().slice(0, 10)}</time> · sky edition
          </p>
        </div>
      </div>
    </footer>
  );
}
