"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { kindLabels, type DocKind } from "@/lib/search";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface Hit {
  id: string;
  kind: DocKind;
  title: string;
  context: string;
  href: string;
  subjectLabel?: string;
}

const DEBOUNCE_MS = 180;

export function SiteSearch({ label = "Search AP Hub" }: { label?: string }) {
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
    setOpen(true);
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

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

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
      <form action="/search" method="get" role="search" className="uiverse-input-group">
        <input
          ref={inputRef}
          id={inputId}
          name="q"
          type="search"
          value={query}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => hits.length > 0 && setOpen(true)}
          placeholder=" "
          autoComplete="off"
          spellCheck={false}
          className="uiverse-input pr-8 text-[0.875rem]"
          style={{ paddingBlock: "0.52em" }}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
        />
        <label htmlFor={inputId} className="uiverse-input-label">
          {label}
        </label>
        <kbd
          aria-hidden="true"
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md border border-white/70 bg-white/45 px-1.5 py-0.5 text-[0.625rem]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
        >
          /
        </kbd>
      </form>

      {open && (pending || hits.length > 0 || showEmpty) ? (
        <div className="glass-box absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 w-full overflow-hidden p-2 enter-fade">
          {pending && hits.length === 0 ? (
            <div className="flex items-center justify-center py-3">
              <LoadingSpinner scale={0.55} label="Searching notes & cards…" />
            </div>
          ) : null}

          {hits.length > 0 ? (
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
                    className="flex items-baseline gap-2.5 rounded-xl px-3 py-2 no-underline transition-colors"
                    style={{
                      background: i === active ? "rgba(255,255,255,0.45)" : "transparent",
                    }}
                  >
                    <span
                      className="shrink-0 text-[0.625rem] uppercase tracking-[0.08em]"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)", minWidth: "3.9rem" }}
                    >
                      {kindLabels[hit.kind]}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.875rem] font-semibold">{hit.title}</span>
                      <span className="block truncate text-[0.75rem]" style={{ color: "var(--ink-faint)" }}>
                        {hit.subjectLabel ? `${hit.subjectLabel} · ` : ""}
                        {hit.context}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}

          {showEmpty ? (
            <p className="px-3 py-3 text-[0.8125rem]" style={{ color: "var(--ink-soft)" }}>
              Nothing matches <strong>{query}</strong>. Try a single keyword — <em>federalism</em>,{" "}
              <em>mitosis</em>, <em>DBQ</em>.
            </p>
          ) : hits.length > 0 ? (
            <p
              className="mt-1 flex items-center justify-between rounded-xl px-3 py-1.5 text-[0.6875rem]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)", background: "rgba(255,255,255,0.28)" }}
            >
              <span>↑↓ move · ↵ open</span>
              <Link href={`/search?q=${encodeURIComponent(query)}`} className="link-underlined">
                All results
              </Link>
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
