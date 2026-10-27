"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { subjects, subjectVars } from "@/lib/subjects";
import { SubjectMark } from "@/components/SubjectMark";
import { ClassTabs } from "@/components/ui/ClassTabs";

/**
 * Hover-to-reveal AP Classes bar (desktop) + touch-friendly Course switcher (mobile/tablet).
 *
 * Sits on the exact same horizontal level as the AP Study Hub logo pill,
 * `Jump to ⌘K`, and the Hamburger Menu button. On desktop mouse hover it
 * smoothly reveals the ten-course segmented bar on the same row. The
 * tabs are icon-first so all ten fit where seven once did; hovering (or
 * tabbing to) a symbol expands its course name, and the current course
 * keeps its name shown. On mobile/tablet tap it opens a clean glass
 * course sheet.
 */
export function TopClassBar() {
  const pathname = usePathname() ?? "/";
  const activeSubject = subjects.find(
    (s) => pathname === `/course/${s.slug}` || pathname.startsWith(`/course/${s.slug}/`),
  );

  const [desktopHovered, setDesktopHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close mobile sheet on route navigation
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    if (mobileOpen) setMobileOpen(false);
    if (desktopHovered) setDesktopHovered(false);
  }

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const onDesktopEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setDesktopHovered(true);
  };

  const onDesktopLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => setDesktopHovered(false), 180);
  };

  return (
    <div ref={rootRef} className="relative flex items-center justify-center">
      {/* Desktop hover-reveal bar (lg and up — fits cleanly on the single header row) */}
      <div
        className="top-classes-hover hidden lg:flex lg:items-center lg:justify-center"
        data-open={desktopHovered ? "true" : "false"}
        onPointerEnter={onDesktopEnter}
        onPointerLeave={onDesktopLeave}
        onFocus={() => setDesktopHovered(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setDesktopHovered(false);
          }
        }}
      >
        <button
          type="button"
          tabIndex={0}
          aria-expanded={desktopHovered}
          onClick={() => setDesktopHovered((v) => !v)}
          className={`top-classes-pill${activeSubject ? " subject-accent" : ""}`}
          style={activeSubject ? subjectVars(activeSubject) : undefined}
        >
          {activeSubject ? (
            <SubjectMark
              subject={activeSubject.mark}
              size={15}
              label={activeSubject.symbolLabel}
              tone="auto"
            />
          ) : null}
          <span>{activeSubject ? activeSubject.familiar : "AP Courses"}</span>
          <span aria-hidden="true" className="text-[0.65rem] opacity-70">
            ▾
          </span>
        </button>

        <div className="top-classes-rail" aria-hidden={!desktopHovered}>
          <ClassTabs
            name="header-classes"
            ariaLabel="AP Courses"
            value={activeSubject?.slug}
            options={subjects.map((subject) => ({
              value: subject.slug,
              label: (
                <span className="inline-flex items-center gap-1.5">
                  <SubjectMark subject={subject.mark} size={15} label={subject.symbolLabel} />
                  <span className="top-class-tab-label">{subject.familiar}</span>
                </span>
              ),
              href: `/course/${subject.slug}`,
              title: subject.official,
              className: "subject-accent subject-accent-tab",
              style: subjectVars(subject),
            }))}
          />
        </div>
      </div>

      {/* Mobile & Tablet touch-friendly course trigger + popover (< lg) */}
      <div className="flex items-center lg:hidden">
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-courses-sheet"
          onClick={() => setMobileOpen((prev) => !prev)}
          className={`top-classes-pill top-classes-pill-mobile${activeSubject ? " subject-accent" : ""}`}
          style={activeSubject ? subjectVars(activeSubject) : undefined}
        >
          {activeSubject ? (
            <SubjectMark
              subject={activeSubject.mark}
              size={14}
              label={activeSubject.symbolLabel}
              tone="auto"
            />
          ) : null}
          <span>{activeSubject ? activeSubject.familiar : "Courses"}</span>
          <span
            aria-hidden="true"
            className="text-[0.65rem] opacity-75 transition-transform duration-200"
            style={{ transform: mobileOpen ? "rotate(180deg)" : "none" }}
          >
            ▾
          </span>
        </button>

        <div
          id="mobile-courses-sheet"
          aria-hidden={!mobileOpen}
          data-open={mobileOpen ? "true" : "false"}
          className="menu-popover glass-box absolute left-1/2 top-[calc(100%+0.6rem)] z-50 w-[min(21rem,calc(100vw-1.5rem))] -translate-x-1/2 p-3.5"
        >
          <p className="label mb-2 px-1">Jump to an AP Course</p>
          <ul className="grid grid-cols-2 gap-1.5">
            {subjects.map((subject) => {
              const isCurrent = activeSubject?.slug === subject.slug;
              return (
                <li key={subject.slug}>
                  <Link
                    href={`/course/${subject.slug}`}
                    tabIndex={mobileOpen ? 0 : -1}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isCurrent ? "page" : undefined}
                    data-current={isCurrent ? "true" : undefined}
                    className="subject-accent subject-accent-link flex items-center gap-2 rounded-xl px-2.5 py-2 text-[0.84rem] font-medium no-underline transition-colors hover:bg-white/50 dark:hover:bg-white/10"
                    style={{
                      ...subjectVars(subject),
                      background: isCurrent ? "rgba(255, 255, 255, 0.55)" : undefined,
                      fontWeight: isCurrent ? 600 : 500,
                    }}
                  >
                    <SubjectMark
                      subject={subject.mark}
                      size={16}
                      label={subject.symbolLabel}
                      className="shrink-0"
                    />
                    <span className="truncate">{subject.familiar}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
