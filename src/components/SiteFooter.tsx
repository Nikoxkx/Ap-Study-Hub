import Link from "next/link";
import { subjects, formatExamDate } from "@/lib/subjects";
import { getTotals } from "@/lib/catalog";
import { site } from "@/lib/site";

/**
 * Footer.
 *
 * Four quiet columns on frosted glass: what is in the site, who wrote it,
 * when it was revised, and what it is not affiliated with. No logo, no
 * decorative imagery — the sky behind the glass does that work.
 */

const columns = [
  {
    heading: "Product",
    links: [
      { href: "/guides", label: "Study guides" },
      { href: "/videos", label: "Unit videos" },
      { href: "/study", label: "Study desk" },
      { href: "/search", label: "Search" },
      { href: "/integrations", label: "How it is built" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/ai-disclosure", label: "AI disclosure" },
      { href: "/colophon", label: "Design notes" },
      { href: site.repo, label: "GitHub", external: true },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/accessibility", label: "Accessibility" },
      { href: "/privacy", label: "Privacy" },
      { href: "/sitemap.xml", label: "Sitemap" },
      { href: `${site.repo}/blob/main/AI_DISCLOSURE.md`, label: "AI_DISCLOSURE.md", external: true },
    ],
  },
];

export function SiteFooter() {
  const totals = getTotals();
  const revised = new Date();

  return (
    <footer data-site-footer className="site-footer mt-20">
      <div className="wrap py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p
              className="mb-3 text-[1.0625rem]"
              style={{ fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              AP Study Hub
            </p>
            <p className="max-w-[36ch] text-[0.9375rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {totals.units} lessons, {totals.flashcards} flashcards and {totals.questions} original
              questions across {totals.courses} AP courses. Free, no account, no tracking — AI-assisted
              drafts with dated sources and public corrections.{" "}
              <Link href="/ai-disclosure" className="link-draw" style={{ color: "var(--ink)" }}>
                AI disclosure
              </Link>
              .
            </p>
            <p className="mt-5 text-[0.8125rem]" style={{ color: "var(--ink-faint)" }}>
              Built by{" "}
              <Link href="/about" className="link-draw" style={{ color: "var(--ink-soft)" }}>
                {site.author.name}
              </Link>
              .
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="mb-3.5 text-[0.8125rem]" style={{ color: "var(--ink-faint)", fontWeight: 600 }}>
                {column.heading}
              </h2>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-[0.9375rem] no-underline transition-colors hover:text-[var(--ink)]"
                        style={{ color: "var(--ink-soft)" }}
                      >
                        {link.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[0.9375rem] no-underline transition-colors hover:text-[var(--ink)]"
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

        {/* Exam dates — useful, and the kind of thing only someone who sat
            these exams would think to put in a footer. */}
        <div className="mt-12 border-t pt-6" style={{ borderColor: "rgba(16,19,24,0.08)" }}>
          <p className="mb-3 text-[0.8125rem]" style={{ color: "var(--ink-faint)", fontWeight: 600 }}>
            2027 exam dates
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.875rem]">
            {[...subjects]
              .sort((a, b) => a.exam.date.localeCompare(b.exam.date))
              .map((subject) => (
                <li key={subject.slug} style={{ color: "var(--ink-soft)" }}>
                  <Link href={`/course/${subject.slug}`} className="no-underline hover:text-[var(--ink)]">
                    <span className="tabular-nums" style={{ color: "var(--ink-faint)" }}>
                      {formatExamDate(subject, "short")}
                    </span>{" "}
                    {subject.familiar}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div
          className="mt-8 flex flex-col gap-3 border-t pt-6 text-[0.75rem] sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "rgba(16,19,24,0.08)", color: "var(--ink-faint)" }}
        >
          <p>
            Not affiliated with, endorsed by, or reviewed by the College Board. AP and Advanced
            Placement are registered trademarks of the College Board.
          </p>
          <p className="tabular-nums">
            © {revised.getFullYear()} AP Study Hub · Content revision {site.contentRevision}
          </p>
        </div>
      </div>
    </footer>
  );
}
