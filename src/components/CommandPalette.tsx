"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";

export interface CommandItem {
  id: string;
  title: string;
  context: string;
  href: string;
  kind: "Study" | "Course" | "Lesson" | "Studio" | "Video" | "Site";
}

export function CommandPalette({ commands }: { commands: CommandItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return commands.filter((command) => command.kind !== "Lesson").slice(0, 12);
    return commands.filter((command) => {
      const body = `${command.title} ${command.context} ${command.kind}`.toLowerCase();
      return terms.every((term) => body.includes(term));
    }).sort((a, b) => {
      const aTitle = a.title.toLowerCase().startsWith(terms[0]) ? 1 : 0;
      const bTitle = b.title.toLowerCase().startsWith(terms[0]) ? 1 : 0;
      return bTitle - aTitle || a.title.localeCompare(b.title);
    }).slice(0, 12);
  }, [commands, query]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault(); setQuery(""); setActive(0); setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);
  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => results.length ? (value + 1) % results.length : 0); }
    if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => results.length ? (value <= 0 ? results.length - 1 : value - 1) : 0); }
    if (event.key === "Enter" && results[active]) { event.preventDefault(); close(); router.push(results[active].href); }
  };
  const onDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") { event.preventDefault(); close(); }
    if (event.key === "Tab" && dialogRef.current) {
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>("input, a[href], button:not([disabled])")];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  };

  return (
    <>
      <button ref={triggerRef} type="button" className="command-trigger" onClick={() => { setQuery(""); setActive(0); setOpen(true); }} aria-label="Open quick navigation (Control or Command K)">
        <span>Jump to</span><kbd>⌘K</kbd>
      </button>
      {open ? <div className="command-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
        <div ref={dialogRef} className="command-dialog" role="dialog" aria-modal="true" aria-label="Quick navigation" onKeyDown={onDialogKeyDown}>
          <label className="sr-only" htmlFor={`${listId}-input`}>Navigate to a study tool, course, or lesson</label>
          <div className="command-input-wrap"><span aria-hidden="true">→</span><input ref={inputRef} id={`${listId}-input`} value={query} onChange={(event) => { setQuery(event.target.value); setActive(0); }} onKeyDown={onInputKeyDown}
            placeholder="Due Today, Biology lesson 4, writing studio…" role="combobox" aria-expanded="true" aria-controls={listId} aria-autocomplete="list" aria-activedescendant={results[active] ? `${listId}-${active}` : undefined} /><kbd>esc</kbd></div>
          <p className="command-hint">{query ? `${results.length} navigation matches` : "Study tools and course destinations"}</p>
          {results.length ? <ul id={listId} role="listbox" aria-label="Navigation results" className="command-results">
            {results.map((command, index) => <li key={command.id} role="none"><Link id={`${listId}-${index}`} href={command.href} role="option" aria-selected={index === active} data-active={index === active}
              onMouseEnter={() => setActive(index)} onClick={close}>
              <span className="command-kind">{command.kind}</span><span><strong>{command.title}</strong><small>{command.context}</small></span><span aria-hidden="true">↵</span>
            </Link></li>)}
          </ul> : <div className="command-empty"><p>No destination matches “{query}”.</p><Link href={`/search?q=${encodeURIComponent(query)}`} onClick={close}>Search all notes, terms, and questions instead →</Link></div>}
          <div className="command-footer"><span>↑↓ move</span><span>↵ open</span><span>esc close</span><Link href="/search" onClick={close}>Full search</Link></div>
        </div>
      </div> : null}
    </>
  );
}
