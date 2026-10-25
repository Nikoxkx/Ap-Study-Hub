import Link from "next/link";
import { SiteSearch } from "./SiteSearch";
import { ThemeControl } from "./ThemeControl";
import { MobileNav } from "./MobileNav";
import { CommandPalette } from "./CommandPalette";
import { getNavigationCommands } from "@/lib/navigation";
import { subjects, formatExamDate } from "@/lib/subjects";
import { nextExam } from "@/lib/catalog";

/**
 * Masthead.
 *
 * Set like the top of a newspaper, the way the original site was: a thin
 * standing line of live information above a rule, then the nameplate with
 * search, quick navigation and the theme control, then the course rail —
 * every one of the seven courses one click away from any page. The whole
 * stack sits on one glass strip that blurs whatever scrolls beneath it.
 *
 * This is a server component. Only the search box, the theme control, the
 * command palette and the mobile disclosure ship JavaScript.
 */

export function SiteHeader() {
  const upcoming = nextExam();
  const commands = getNavigationCommands();

  return (
    <header data-site-header className="site-header sticky top-0 z-40">
      {/* Standing line — real data, not an announcement banner. */}
      <div className="header-standing hidden md:block">
        <div
          className="wrap flex h-full items-center justify-between text-[0.6875rem]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span style={{ letterSpacing: "0.06em", color: "var(--ink-soft)" }}>
            Free · No account · Written by one student
          </span>
          {upcoming ? (
            <span style={{ letterSpacing: "0.04em", color: "var(--ink-faint)" }}>
              {upcoming.exam.window === "deadline" ? "Next deadline" : "Next exam"} —{" "}
              {upcoming.familiar}, {formatExamDate(upcoming, "short")}
            </span>
          ) : null}
        </div>
      </div>

      {/* Nameplate: wordmark, quick navigation, and the tools. */}
      <div className="wrap header-nameplate relative flex h-[4.25rem] items-center justify-between gap-4">
        <Link href="/" className="site-wordmark">
          AP Study Hub
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
          <div className="hidden sm:block">
            <CommandPalette commands={commands} />
          </div>
          <div className="hidden min-w-0 max-w-[19rem] flex-1 lg:block">
            <SiteSearch />
          </div>
          <Link href="/search" className="pill-link hidden sm:inline-flex lg:hidden">
            Search
          </Link>
          <div className="hidden md:block">
            <ThemeControl />
          </div>
          <MobileNav />
        </div>
      </div>

      {/* Course rail: a horizontal index of the seven courses. */}
      <nav aria-label="Courses" className="header-rail hidden md:block">
        <div className="wrap">
          <ul className="flex h-10 items-stretch overflow-x-auto">
            {subjects.map((subject) => (
              <li key={subject.slug} className="shrink-0">
                <Link
                  href={`/course/${subject.slug}`}
                  className="group flex h-full items-center gap-2 px-3 no-underline transition-colors"
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
                href="/study"
                className="flex h-full items-center px-3 text-[0.8125rem] font-semibold no-underline"
                style={{ color: "var(--mark)" }}
              >
                Your study desk
              </Link>
            </li>
            <li className="shrink-0">
              <Link
                href="/videos"
                className="flex h-full items-center px-3 text-[0.8125rem] font-medium no-underline"
                style={{ color: "var(--ink-soft)" }}
              >
                Unit videos
              </Link>
            </li>
            <li className="shrink-0">
              <Link
                href="/guides"
                className="flex h-full items-center px-3 text-[0.8125rem] font-medium no-underline"
                style={{ color: "var(--ink-soft)" }}
              >
                Study guides
              </Link>
            </li>
            <li className="shrink-0">
              <Link
                href="/about"
                className="flex h-full items-center px-3 text-[0.8125rem] font-medium no-underline"
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
