"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Contents rail for the notes page.
 *
 * Highlights the unit currently in view using an IntersectionObserver with a
 * top-weighted root margin, so the active item changes when a heading reaches
 * the upper third of the viewport rather than when it leaves the bottom.
 *
 * Scroll position is read, never written: clicking an item is a plain anchor,
 * so the browser handles smooth scrolling, focus and history. Hijacking that
 * with scrollIntoView is how these rails end up breaking the back button.
 */

interface UnitNavProps {
  units: { id: string; number: number; title: string }[];
}

export function UnitNav({ units }: UnitNavProps) {
  const [activeId, setActiveId] = useState<string | null>(units[0]?.id ?? null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const elements = units
      .map((unit) => document.getElementById(unit.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the entry nearest the top of the viewport among those visible.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -62% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [units]);

  // Keep the active item scrolled into view inside the rail itself on long lists.
  useEffect(() => {
    if (!activeId || !listRef.current) return;
    const item = listRef.current.querySelector<HTMLElement>(`[data-for="${activeId}"]`);
    item?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  return (
    <nav
      id="unit-contents"
      aria-label="Unit contents"
      className="lg:sticky lg:top-32 lg:max-h-[calc(100vh-10rem)] lg:self-start lg:overflow-y-auto"
    >
      {/* A <p>, not a heading: the <nav> is already named by aria-label, and a
          heading here lands in the outline before the page title, because the
          rail comes first in source order on wide screens. */}
      <p className="label mb-3">Contents</p>
      <ol ref={listRef} className="rule-top">
        {units.map((unit) => {
          const active = unit.id === activeId;
          return (
            <li key={unit.id} data-for={unit.id}>
              <a
                href={`#${unit.id}`}
                aria-current={active ? "location" : undefined}
                className="flex gap-2.5 rule-bottom py-2 text-[0.8125rem] no-underline transition-colors"
                style={{ color: active ? "var(--ink)" : "var(--ink-faint)" }}
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 tabular-nums"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    lineHeight: "1.35rem",
                    color: active ? "var(--subject-ink)" : "var(--rule-strong)",
                  }}
                >
                  {String(unit.number).padStart(2, "0")}
                </span>
                <span style={{ fontWeight: active ? 600 : 400 }}>{unit.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
