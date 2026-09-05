import Link from "next/link";
import { SiteSearch } from "./SiteSearch";
import { ThemeControl } from "./ThemeControl";
import { SiteMark } from "./SubjectMark";
import { MobileNav } from "./MobileNav";
import { subjects } from "@/lib/subjects";
import { nextExam } from "@/lib/catalog";
import { formatExamDate } from "@/lib/subjects";

/**
 * Masthead.
 *
 * Set like the top of a newspaper: a thin standing line of live information
 * above a heavy rule, then the nameplate and navigation. The "up next" line is
 * real data — the soonest exam that has not happened — rather than a decorative
 * announcement bar.
 *
 * This is a server component. Only the search box, the theme control and the
 * mobile disclosure ship JavaScript.
 */

export function SiteHeader() {
  const upcoming = nextExam();

  return (
    <header data-site-header className="sticky top-0 z-40">
      {/* Standing line */}
      <div
        className="hidden md:block"
        style={{ background: "var(--ink)", color: "var(--paper)" }}
      >
        <div className="wrap flex h-7 items-center justify-between text-[0.6875rem]" style={{ fontFamily: "var(--font-mono)" }}>
          <span style={{ letterSpacing: "0.06em" }}>
            Free · No account · Written by one student
          </span>
          {upcoming ? (
            <span style={{ letterSpacing: "0.04em", opacity: 0.85 }}>
              Next exam — {upcoming.familiar}, {formatExamDate(upcoming, "short")}
            </span>
          ) : null}
        </div>
      </div>

      <div
        className="rule-bottom"
        style={{
          background: "color-mix(in srgb, var(--paper) 88%, transparent)",
          backdropFilter: "saturate(140%) blur(8px)",
          WebkitBackdropFilter: "saturate(140%) blur(8px)",
        }}
      >
        <div className="wrap flex h-16 items-center gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-baseline gap-2 no-underline"
            aria-label="AP Study Hub — home"
          >
            <SiteMark size={24} className="self-center" />
            <span
              className="hidden text-[1.0625rem] font-semibold sm:inline"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}
            >
              AP&nbsp;Study&nbsp;Hub
            </span>
          </Link>

          <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-3">
            <div className="hidden min-w-0 max-w-[19rem] flex-1 lg:block">
              <SiteSearch />
            </div>
            <div className="hidden md:block">
              <ThemeControl />
            </div>
            <MobileNav />
          </div>
        </div>
      </div>

      {/* Course rail: a horizontal index of the seven courses. */}
      <nav
        aria-label="Courses"
        className="hidden rule-bottom md:block"
        style={{ background: "var(--paper-raised)" }}
      >
        <div className="wrap">
          <ul className="flex items-stretch gap-0 overflow-x-auto">
            {subjects.map((subject) => (
              <li key={subject.slug} className="shrink-0">
                <Link
                  href={`/course/${subject.slug}`}
                  className="group flex h-10 items-center gap-2 px-3 no-underline transition-colors"
                  style={{ color: "var(--ink-soft)" }}
                >
                  <span
                    aria-hidden="true"
                    className="h-[7px] w-[7px] shrink-0 transition-transform duration-200 group-hover:scale-125"
                    style={{ background: subject.ink, borderRadius: 1 }}
                  />
                  <span className="text-[0.8125rem] font-medium group-hover:text-[var(--ink)]">
                    {subject.familiar}
                  </span>
                </Link>
              </li>
            ))}
            <li className="ml-auto shrink-0">
              <Link
                href="/guides"
                className="flex h-10 items-center px-3 text-[0.8125rem] font-medium no-underline"
                style={{ color: "var(--ink-soft)" }}
              >
                Study guides
              </Link>
            </li>
            <li className="shrink-0">
              <Link
                href="/about"
                className="flex h-10 items-center px-3 text-[0.8125rem] font-medium no-underline"
                style={{ color: "var(--ink-soft)" }}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
