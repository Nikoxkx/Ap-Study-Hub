import Link from "next/link";
import { SiteSearch } from "./SiteSearch";
import { SkyThemeSwitch } from "./ui/SkyThemeSwitch";
import { SiteMark } from "./SubjectMark";
import { MobileNav } from "./MobileNav";
import { CommandPalette } from "./CommandPalette";
import { getNavigationCommands } from "@/lib/navigation";
import { subjects } from "@/lib/subjects";
import { nextExam } from "@/lib/catalog";
import { formatExamDate } from "@/lib/subjects";

export function SiteHeader() {
  const upcoming = nextExam();
  const commands = getNavigationCommands();

  return (
    <header data-site-header className="sticky top-0 z-40">
      {/* Standing line — now like a horizon reading */}
      <div
        className="hidden md:block"
        style={{
          background: "linear-gradient(90deg, #0f172a 0%, #1e293b 45%, #334155 100%)",
          color: "#f1f5f9",
        }}
      >
        <div className="wrap flex h-7 items-center justify-between text-[0.6875rem]" style={{ fontFamily: "var(--font-mono)" }}>
          <span style={{ letterSpacing: "0.06em" }}>
            ☁︎ Free · No account · From overcast notes to open sky
          </span>
          {upcoming ? (
            <span style={{ letterSpacing: "0.04em", opacity: 0.92 }}>
              {upcoming.exam.window === "deadline" ? "Next deadline" : "Next exam"} — {upcoming.familiar}, {formatExamDate(upcoming, "short")}
            </span>
          ) : null}
        </div>
      </div>

      <div
        className="rule-bottom"
        style={{
          background: "rgba(255,253,247,0.78)",
          backdropFilter: "saturate(160%) blur(12px)",
          WebkitBackdropFilter: "saturate(160%) blur(12px)",
          borderBottom: "1px solid rgba(221,214,198,0.9)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* subtle sky veil behind header */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/chris-doretz-skyvol1-artstation-store-thumbnail-05.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 26%",
            opacity: 0.16,
            pointerEvents: "none",
          }}
        />
        <div className="dark:hidden" aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(255,255,255,0.6), transparent)", pointerEvents: "none" }} />
        <div className="wrap relative flex h-16 items-center gap-4">
          <Link href="/" className="flex shrink-0 items-baseline gap-2 no-underline" aria-label="AP Study Hub — home">
            <SiteMark size={24} className="self-center" />
            <span className="hidden text-[1.0625rem] font-semibold sm:inline" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}>
              AP&nbsp;Study&nbsp;Hub
            </span>
            <span className="hidden lg:inline text-[0.6875rem] tracking-[0.1em] uppercase ml-1 opacity-60" style={{ fontFamily: "var(--font-mono)" }}>
              sky edition
            </span>
          </Link>

          <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-3">
            <CommandPalette commands={commands} />
            <div className="hidden min-w-0 max-w-[19rem] flex-1 lg:block">
              <SiteSearch />
            </div>
            <div className="hidden md:flex items-center gap-2">
              <SkyThemeSwitch />
            </div>
            <MobileNav />
          </div>
        </div>
      </div>

      {/* Course rail — horizon of seven skies */}
      <nav aria-label="Courses" className="hidden md:block" style={{ background: "rgba(255,253,247,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--rule)" }}>
        <div className="wrap">
          <ul className="flex items-stretch gap-0 overflow-x-auto">
            {subjects.map((subject) => (
              <li key={subject.slug} className="shrink-0">
                <Link
                  href={`/course/${subject.slug}`}
                  className="group flex h-10 items-center gap-2 px-3 no-underline transition-colors"
                  style={{ color: "var(--ink-soft)" }}
                >
                  <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 transition-transform duration-200 group-hover:scale-125" style={{ background: subject.ink, borderRadius: 1 }} />
                  <span className="text-[0.8125rem] font-medium group-hover:text-[var(--ink)]">{subject.familiar}</span>
                </Link>
              </li>
            ))}
            <li className="ml-auto shrink-0 flex items-center gap-2 pl-2">
              <span aria-hidden="true" className="hidden lg:inline text-[0.625rem] tracking-[0.08em] uppercase" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
                Atmosphere
              </span>
              <div className="hidden lg:flex">
                <SkyThemeSwitch />
              </div>
            </li>
            <li className="shrink-0">
              <Link href="/study" className="flex h-10 items-center px-3 text-[0.8125rem] font-semibold no-underline" style={{ color: "var(--mark)" }}>
                Your study desk
              </Link>
            </li>
            <li className="shrink-0">
              <Link href="/videos" className="flex h-10 items-center px-3 text-[0.8125rem] font-medium no-underline" style={{ color: "var(--ink-soft)" }}>
                Unit videos
              </Link>
            </li>
            <li className="shrink-0">
              <Link href="/guides" className="flex h-10 items-center px-3 text-[0.8125rem] font-medium no-underline" style={{ color: "var(--ink-soft)" }}>
                Study guides
              </Link>
            </li>
            <li className="shrink-0">
              <Link href="/about" className="flex h-10 items-center px-3 text-[0.8125rem] font-medium no-underline" style={{ color: "var(--ink-soft)" }}>
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
