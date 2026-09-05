"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { kindLabels, type DocKind } from "@/lib/search";

/**
 * Site search.
 *
 * Implemented as a WAI-ARIA combobox with a listbox popup: arrow keys move
 * aria-activedescendant, Enter opens the active option, Escape closes, and the
 * input keeps DOM focus throughout. That is the pattern screen readers expect,
 * and it is why the options are anchors inside a listbox rather than a stack of
 * divs with onClick.
 *
 * The form still posts to /search with method="get", so pressing Enter with no
 * option highlighted — or using the site with JavaScript disabled — lands on a
 * server-rendered results page instead of doing nothing.
 */

interface Hit {
  id: string;
  kind: DocKind;
  title: string;
  context: string;
  href: string;
  subjectLabel?: string;
}

const DEBOUNCE_MS = 180;

export function SiteSearch() {
  const router = useRouter();
  const listId = useId();
  const inputId = useId();

  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [pending, setPending] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runQuery = useCallback(async (value: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setPending(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(value)}&limit=8`, {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Search failed: ${response.status}`);
      const data: { results: Hit[] } = await response.json();
      setHits(data.results);
      setActive(-1);
      setOpen(true);
    } catch (error) {
      // An aborted request is the expected outcome of typing another character.
      if ((error as Error).name !== "AbortError") {
        setHits([]);
        setOpen(false);
      }
    } finally {
      if (!controller.signal.aborted) setPending(false);
    }
  }, []);

  function onChange(value: string) {
    setQuery(value);
    if (timerRef.current) clearTimeout(timerRef.current);

    if (value.trim().length < 2) {
      setHits([]);
      setOpen(false);
      setPending(false);
      return;
    }
    timerRef.current = setTimeout(() => runQuery(value.trim()), DEBOUNCE_MS);
  }

  // Close on outside pointerdown. pointerdown rather than click so the panel is
  // gone before a link underneath receives the press.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // "/" focuses search, the convention on documentation sites. Ignored while the
  // user is typing somewhere else.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    abortRef.current?.abort();
  }, []);

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      setActive(-1);
      return;
    }
    if (!open || hits.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % hits.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i <= 0 ? hits.length - 1 : i - 1));
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(hits.length - 1);
    } else if (event.key === "Enter" && active >= 0) {
      event.preventDefault();
      const hit = hits[active];
      setOpen(false);
      setQuery("");
      router.push(hit.href);
    }
  }

  const activeId = active >= 0 ? `${listId}-opt-${active}` : undefined;
  const showEmpty = open && !pending && query.trim().length >= 2 && hits.length === 0;

  return (
    <div ref={rootRef} className="relative w-full">
      <form action="/search" method="get" role="search" className="relative">
        <label htmlFor={inputId} className="sr-only">
          Search notes, terms and practice questions
        </label>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          width="14"
          height="14"
          className="pointer-events-none absolute left-[0.6rem] top-1/2 -translate-y-1/2"
          style={{ color: "var(--ink-faint)" }}
        >
          <g fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="7" cy="7" r="4.6" />
            <path d="m10.6 10.6 3.2 3.2" strokeLinecap="round" />
          </g>
        </svg>

        <input
          ref={inputRef}
          id={inputId}
          name="q"
          type="search"
          value={query}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => hits.length > 0 && setOpen(true)}
          placeholder="Search notes and terms"
          autoComplete="off"
          spellCheck={false}
          className="field"
          style={{ paddingLeft: "2rem", paddingRight: "2.5rem", fontSize: "0.875rem" }}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
        />

        <kbd
          aria-hidden="true"
          className="pointer-events-none absolute right-[0.5rem] top-1/2 -translate-y-1/2 rounded-[3px] border px-[0.3rem] py-[0.05rem] text-[0.625rem]"
          style={{
            fontFamily: "var(--font-mono)",
            borderColor: "var(--rule-strong)",
            color: "var(--ink-faint)",
          }}
        >
          /
        </kbd>
      </form>

      {(open && hits.length > 0) || showEmpty ? (
        <div
          className="absolute left-0 right-0 top-[calc(100%+0.375rem)] z-50 overflow-hidden enter-fade"
          style={{
            background: "var(--paper-raised)",
            border: "1px solid var(--rule-strong)",
            borderRadius: "var(--radius-cut)",
            boxShadow: "var(--shadow-lift)",
          }}
        >
          <ul id={listId} role="listbox" aria-label="Search results" className="max-h-[22rem] overflow-y-auto">
            {hits.map((hit, i) => (
              <li key={hit.id} role="none">
                <Link
                  id={`${listId}-opt-${i}`}
                  role="option"
                  aria-selected={i === active}
                  href={hit.href}
                  onClick={() => {
                    setOpen(false);
                    setQuery("");
                  }}
                  onMouseEnter={() => setActive(i)}
                  className="flex items-baseline gap-2 px-3 py-2 no-underline"
                  style={{
                    background: i === active ? "var(--paper-sunk)" : "transparent",
                    borderBottom: "1px solid var(--rule)",
                  }}
                >
                  <span
                    className="shrink-0 text-[0.625rem] uppercase tracking-[0.08em]"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)", minWidth: "3.9rem" }}
                  >
                    {kindLabels[hit.kind]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.875rem] font-medium">{hit.title}</span>
                    <span className="block truncate text-[0.75rem]" style={{ color: "var(--ink-faint)" }}>
                      {hit.subjectLabel ? `${hit.subjectLabel} · ` : ""}
                      {hit.context}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {showEmpty ? (
            <p className="px-3 py-3 text-[0.8125rem]" style={{ color: "var(--ink-faint)" }}>
              Nothing matches <strong style={{ color: "var(--ink)" }}>{query}</strong>. Try a
              single keyword — <em>federalism</em>, <em>mitosis</em>, <em>DBQ</em>.
            </p>
          ) : (
            <p
              className="flex items-center justify-between px-3 py-1.5 text-[0.6875rem]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)", background: "var(--paper-sunk)" }}
            >
              <span>↑↓ to move · ↵ to open · esc to close</span>
              <Link href={`/search?q=${encodeURIComponent(query)}`} className="link-underlined">
                All results
              </Link>
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
