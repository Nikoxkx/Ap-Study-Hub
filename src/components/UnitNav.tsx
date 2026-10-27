"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Contents rail for the notes page.
 *
 * Highlights the unit currently in view using an IntersectionObserver with a
 * top-weighted root margin, so the active item changes when a heading reaches
 * the upper third of the viewport rather than when it leaves the bottom.
 *
 * Clicking an item is a plain anchor, so the browser handles scrolling, focus
 * and history. The only scroll position this component ever writes is the
 * rail's own `scrollTop`; it never scrolls the page.
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

  /* Keep the active item in view *inside the rail* on long lists.
     This must never call scrollIntoView: that walks up every scrollable
     ancestor, and below `lg` the rail is not one of them, so on a phone the
     active item moving as you read scrolled the whole document and threw the
     reader back to the top of the page. Moving `scrollTop` on the rail itself
     cannot touch the page. */
  useEffect(() => {
    if (!activeId) return;
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>(`[data-for="${activeId}"]`);
    if (!list || !item) return;
    if (list.scrollHeight <= list.clientHeight + 1) return;

    const rail = list.getBoundingClientRect();
    const entry = item.getBoundingClientRect();
    if (entry.top < rail.top) {
      list.scrollTop -= rail.top - entry.top;
    } else if (entry.bottom > rail.bottom) {
      list.scrollTop += entry.bottom - rail.bottom;
    }
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
