import Link from "next/link";
import { subjects, formatExamDate } from "@/lib/subjects";
import { getTotals } from "@/lib/catalog";
import { site } from "@/lib/site";
import { SiteMark } from "./SubjectMark";

/**
 * Footer.
 *
 * Carries the things that make a site checkable rather than decorative: what is
 * actually in it (counts, not adjectives), who wrote it, when it was last
 * revised, what it is not affiliated with, and where the source lives.
 */

const columns = [
  {
    heading: "The site",
    links: [
      { href: "/about", label: "About & method" },
      { href: "/guides", label: "Study guides" },
      { href: "/search", label: "Search everything" },
      { href: "/colophon", label: "Colophon" },
    ],
  },
  {
    heading: "Housekeeping",
    links: [
      { href: "/accessibility", label: "Accessibility" },
      { href: "/privacy", label: "Privacy" },
      { href: "/sitemap.xml", label: "Sitemap" },
      { href: site.repo, label: "Source on GitHub", external: true },
    ],
  },
];

export function SiteFooter() {
  const totals = getTotals();
  const revised = new Date();

  return (
    <footer data-site-footer className="mt-24 rule-top" style={{ background: "var(--paper-raised)" }}>
      <div className="wrap py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="mb-3 flex items-baseline gap-2">
              <SiteMark size={22} className="self-center" />
              <span
                className="text-[1.0625rem] font-semibold"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}
              >
                AP Study Hub
              </span>
            </div>
            <p className="max-w-[34ch] text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
              {totals.units} units of notes, {totals.flashcards} cards and {totals.questions}{" "}
              practice questions across {totals.courses} courses. Everything on here was written
              or checked by hand.
            </p>
            <p className="mt-4 text-[0.8125rem]" style={{ color: "var(--ink-faint)" }}>
              Built by{" "}
              <Link href="/about" className="link-underlined" style={{ color: "var(--ink)" }}>
                {site.author.name}
              </Link>
              .
            </p>
          </div>

          <nav aria-label="Courses">
            <h2 className="label mb-3">Courses</h2>
            <ul className="space-y-1.5">
              {subjects.map((subject) => (
                <li key={subject.slug}>
                  <Link
                    href={`/course/${subject.slug}`}
                    className="link-draw text-[0.875rem]"
                    style={{ color: "var(--ink-soft)" }}
                  >
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
                      <a
                        href={link.href}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="link-draw text-[0.875rem]"
                        style={{ color: "var(--ink-soft)" }}
                      >
                        {link.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="link-draw text-[0.875rem]"
                        style={{ color: "var(--ink-soft)" }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Exam calendar strip — useful, and the kind of thing only someone who
            sat these exams would put in a footer. */}
        <div className="mt-10 rule-top pt-5">
          <h2 className="label mb-3">2026 exam dates</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {[...subjects]
              .sort((a, b) => a.exam.date.localeCompare(b.exam.date))
              .map((subject) => (
                <li key={subject.slug} className="text-[0.8125rem]" style={{ color: "var(--ink-soft)" }}>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
                    {formatExamDate(subject, "short")}
                  </span>{" "}
                  {subject.familiar}
                </li>
              ))}
          </ul>
        </div>

        <div
          className="mt-10 flex flex-col gap-3 rule-top pt-5 text-[0.75rem] sm:flex-row sm:items-center sm:justify-between"
          style={{ color: "var(--ink-faint)" }}
        >
          <p>
            Not affiliated with, endorsed by, or reviewed by the College Board. AP and Advanced
            Placement are registered trademarks of the College Board.
          </p>
          <p style={{ fontFamily: "var(--font-mono)" }}>
            Content revision {site.contentRevision} ·{" "}
            <time dateTime={revised.toISOString().slice(0, 10)}>
              {revised.toISOString().slice(0, 10)}
            </time>
          </p>
        </div>
      </div>
    </footer>
  );
}
