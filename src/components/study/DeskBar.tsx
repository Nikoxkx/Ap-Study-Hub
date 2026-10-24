"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { StudyCourse } from "@/lib/study-data";
import type { StudyItem } from "@/lib/study-model";
import type { SubjectSlug } from "@/lib/subjects";

/**
 * The strip above the study desk.
 *
 * Four things a student wants to know before doing anything: how much is due,
 * what is still unresolved, how the week is going, and where the thing they
 * half-remember lives. The first three are numbers computed from the same study
 * record the rest of the desk writes to; the fourth is a local index, so it
 * answers without waiting for the server-rendered /search page.
 *
 * No new state shape: everything here is derived. That matters because the study
 * record is versioned and validated on read, and adding a speculative field to
 * it would mean writing a migration for a search box.
 */

interface Result {
  id: string;
  label: string;
  hint: string;
  href: string;
  kind: string;
}

function haystack(item: StudyItem): string {
  return `${item.prompt} ${item.answer} ${item.lessonTitle ?? ""} ${item.skill ?? ""} ${item.courseLabel}`.toLowerCase();
}

export function DeskBar({
  items,
  due,
  unresolved,
  minutes,
  attempts,
  selectedCourse,
}: {
  items: StudyItem[];
  due: number;
  unresolved: number;
  minutes: number;
  attempts: number;
  selectedCourse: SubjectSlug | "all";
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const results = useMemo<Result[]>(() => {
    const needle = query.trim().toLowerCase();
    if (needle.length < 2) return [];

    const scored = items
      .filter((item) => selectedCourse === "all" || item.courseSlug === selectedCourse)
      .map((item) => {
        const hay = haystack(item);
        if (!hay.includes(needle)) return null;
        // Title-ish matches first: a prompt that starts with the query is more
        // likely to be the thing they meant than one that mentions it in a
        // distractor explanation.
        const rank = item.prompt.toLowerCase().startsWith(needle) ? 0 : item.prompt.toLowerCase().includes(needle) ? 1 : 2;
        return {
          rank,
          result: {
            id: item.id,
            label: item.prompt,
            hint: `${item.courseLabel}${item.unitNumber ? ` · Unit ${item.unitNumber}` : ""}${
              item.lessonTitle ? ` · ${item.lessonTitle}` : ""
            }`,
            href: item.lessonHref ?? item.href,
            kind: item.kind === "card" ? "Card" : "Question",
          } satisfies Result,
        };
      })
      .filter((entry): entry is { rank: number; result: Result } => entry !== null)
      .sort((a, b) => a.rank - b.rank);

    // De-duplicate by href so a card and its question do not both appear.
    const seen = new Set<string>();
    return scored
      .map((entry) => entry.result)
      .filter((result) => {
        if (seen.has(result.href)) return false;
        seen.add(result.href);
        return true;
      })
      .slice(0, 7);
  }, [items, query, selectedCourse]);

  // Close on outside click; the palette is not a modal, no focus trap needed.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (box.current && !box.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // "/" focuses the find box from anywhere on the desk, unless the user is
  // already typing somewhere. Escape puts it away.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
      if (event.key === "/" && !typing) {
        event.preventDefault();
        input.current?.focus();
        setOpen(true);
      }
      if (event.key === "Escape") {
        setOpen(false);
        input.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const listId = "desk-find-results";
  const dailyGoal = 25;
  const pct = Math.min(100, Math.round((minutes / dailyGoal) * 100));

  return (
    <div className="desk-strip">
      <div className="quick-find" ref={box}>
        <label htmlFor="desk-find">
          Find something on the desk <span aria-hidden="true">— press /</span>
        </label>
        <input
          id="desk-find"
          ref={input}
          className="field"
          type="search"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && results[active] ? `desk-find-${active}` : undefined}
          value={query}
          placeholder="A term, a question you missed, a lesson title…"
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (!results.length) return;
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActive((current) => (current + 1) % results.length);
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive((current) => (current - 1 + results.length) % results.length);
            } else if (event.key === "Enter" && results[active]) {
              event.preventDefault();
              window.location.assign(results[active].href);
            }
          }}
        />

        {open && query.trim().length >= 2 ? (
          results.length ? (
            <ul className="quick-find-results" id={listId} role="listbox">
              {results.map((result, index) => (
                <li key={result.id} role="option" aria-selected={index === active}>
                  <Link
                    href={result.href}
                    id={`desk-find-${index}`}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => setOpen(false)}
                  >
                    <span>{result.kind}</span>
                    <span>
                      <strong>{result.label}</strong>
                      <small>{result.hint}</small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="quick-find-results quick-find-empty" role="status">
              Nothing here matches “{query.trim()}”. Try the full{" "}
              <Link href="/search">search across every lesson</Link>.
            </p>
          )
        ) : null}
      </div>

      <div className="desk-stats">
        <div className="desk-stat">
          <strong>{due}</strong>
          <span>Due now</span>
        </div>
        <div className="desk-stat">
          <strong>{unresolved}</strong>
          <span>Unresolved</span>
        </div>
        <div className="desk-stat">
          <strong>{attempts}</strong>
          <span>This week</span>
        </div>
        <div className="desk-stat desk-goal">
          <div className="goal-ring" style={{ "--pct": `${pct}%` } as React.CSSProperties}>
            <span>{pct}%</span>
          </div>
          <span>{Math.round(minutes)} min of {dailyGoal}</span>
        </div>
      </div>

      <p className="key-hints">
        <span>
          <kbd>/</kbd> find
        </span>
        <span>
          <kbd>space</kbd> flip a card
        </span>
        <span>
          <kbd>1</kbd>–<kbd>4</kbd> grade it
        </span>
      </p>
    </div>
  );
}

/**
 * Only rendered after dark. Not a duplicate of anything: it shows the number of
 * days until the nearest deadline and the one film most worth watching tonight,
 * which is exactly what a student opening this page at 11pm needs.
 */
export function NightCard({ course, days }: { course: StudyCourse | null; days: number | null }) {
  if (!course) return null;
  return (
    <section className="night-card">
      <p className="label">Night shift</p>
      <h3>{days !== null && days <= 14 ? `${days} days to ${course.label}` : `${course.label}, at your own pace`}</h3>
      <p>
        At this hour, reading new notes rarely sticks. Watch the unit film, then run eight cards — twenty
        minutes, and you can close the laptop without owing anything tomorrow.
      </p>
      <Link href={`/course/${course.slug}/videos`}>Watch the {course.label} films →</Link>
    </section>
  );
}
