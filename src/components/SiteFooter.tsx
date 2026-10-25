import Link from "next/link";
import { subjects, formatExamDate } from "@/lib/subjects";
import { getTotals } from "@/lib/catalog";
import { site } from "@/lib/site";
import { SiteMark, SubjectMark } from "./SubjectMark";
import { GlassCard } from "./ui/GlassCard";
import { InstagramTooltip } from "./ui/InstagramTooltip";

const columns = [
  {
    heading: "Explore",
    links: [
      { href: "/study", label: "Study Desk" },
      { href: "/videos", label: "Watch by unit" },
      { href: "/guides", label: "Study smarter" },
      { href: "/integrations", label: "How it is built" },
      { href: "/search", label: "Find anything" },
      { href: "/about", label: "Meet the student" },
      { href: "/colophon", label: "Design notes" },
    ],
  },
  {
    heading: "Transparency",
    links: [
      { href: "/ai-disclosure", label: "AI disclosure" },
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
    <footer data-site-footer className="mt-20 pb-10 pt-4">
      <div className="wrap">
        <GlassCard padding="lg">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <div className="mb-3.5 flex items-center gap-3">
                <SiteMark size={26} />
                <span
                  className="text-[1.125rem] font-semibold"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}
                >
                  AP Study Hub
                </span>
              </div>
              <p className="max-w-[34ch] text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                {totals.units} lessons that explain, {totals.flashcards} recall cards, and{" "}
                {totals.questions} original questions across {totals.courses} courses. AI-assisted
                drafts, dated sources, and public corrections — see{" "}
                <Link href="/ai-disclosure" className="link-underlined">
                  AI disclosure
                </Link>
                .
              </p>
              <p className="mt-4 text-[0.8125rem]" style={{ color: "var(--ink-faint)" }}>
                Built by{" "}
                <Link href="/about" className="link-underlined">
                  {site.author.name}
                </Link>
                . Free · No account · Local-first.
              </p>
            </div>

            <nav aria-label="Courses">
              <h2 className="label mb-3">Courses</h2>
              <ul className="space-y-2">
                {subjects.map((subject) => (
                  <li key={subject.slug}>
                    <Link
                      href={`/course/${subject.slug}`}
                      className="inline-flex items-center gap-2 link-draw text-[0.875rem]"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-white/75 bg-white/45 dark:border-white/20 dark:bg-white/10">
                        <SubjectMark subject={subject.mark} size={13} label={subject.symbolLabel} />
                      </span>
                      <span>{subject.familiar}</span>
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

          <div className="mt-9 rule-top pt-5">
            <h2 className="label mb-3">2027 Exam Dates</h2>
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
            className="mt-8 flex flex-col gap-3 rule-top pt-5 text-[0.75rem] sm:flex-row sm:items-center sm:justify-between"
            style={{ color: "var(--ink-faint)" }}
          >
            <p>
              Not affiliated with, endorsed by, or reviewed by the College Board. AP and Advanced
              Placement are registered trademarks of the College Board.
            </p>
            <p style={{ fontFamily: "var(--font-mono)" }}>
              Revision {site.contentRevision} ·{" "}
              <time dateTime={revised.toISOString().slice(0, 10)}>
                {revised.toISOString().slice(0, 10)}
              </time>
            </p>
          </div>
        </GlassCard>

        <div className="mt-10 flex flex-col items-center">
          <InstagramTooltip />
        </div>
      </div>
    </footer>
  );
}
