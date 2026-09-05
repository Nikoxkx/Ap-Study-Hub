"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Course tab strip.
 *
 * Real links, not click handlers, so each study mode is a bookmarkable URL that
 * works with middle-click, back button and no JavaScript. The only thing this
 * needs the client for is knowing which tab is current, which is why it is the
 * one small client component in the course shell.
 *
 * Tabs for content that does not exist are not rendered at all. A disabled tab
 * that says "Essays (0)" is worse than no tab: it advertises a gap.
 */

interface CourseTabsProps {
  slug: string;
  available: {
    notes: boolean;
    cards: boolean;
    practice: boolean;
    essays: boolean;
    exam: boolean;
    resources: boolean;
  };
}

export function CourseTabs({ slug, available }: CourseTabsProps) {
  const pathname = usePathname();
  const base = `/course/${slug}`;

  const tabs = [
    { href: base, label: "Overview", show: true },
    { href: `${base}/notes`, label: "Notes", show: available.notes },
    { href: `${base}/cards`, label: "Cards", show: available.cards },
    { href: `${base}/practice`, label: "Practice", show: available.practice },
    { href: `${base}/essays`, label: "Essays", show: available.essays },
    { href: `${base}/exam`, label: "Timed paper", show: available.exam },
    { href: `${base}/resources`, label: "Sources", show: available.resources },
  ].filter((tab) => tab.show);

  return (
    <nav
      aria-label="Study modes"
      className="sticky top-16 z-30 rule-bottom"
      style={{
        background: "color-mix(in srgb, var(--paper) 90%, transparent)",
        backdropFilter: "saturate(140%) blur(8px)",
        WebkitBackdropFilter: "saturate(140%) blur(8px)",
      }}
    >
      <div className="wrap">
        <ul className="-mb-px flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const current = pathname === tab.href;
            return (
              <li key={tab.href} className="shrink-0">
                <Link
                  href={tab.href}
                  aria-current={current ? "page" : undefined}
                  className="relative flex h-11 items-center px-3 text-[0.875rem] no-underline transition-colors"
                  style={{
                    color: current ? "var(--ink)" : "var(--ink-soft)",
                    fontWeight: current ? 600 : 400,
                  }}
                >
                  {tab.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-2 bottom-0 h-[2px] origin-left transition-transform duration-200 ease-[cubic-bezier(0.2,0.7,0.3,1)]"
                    style={{
                      background: "var(--subject-ink)",
                      transform: current ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
