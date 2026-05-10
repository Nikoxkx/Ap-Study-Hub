"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface SearchResult {
  id: number; type: string; title: string; description: string; courseId: number;
  course: { slug: string; shortName: string } | null;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const handle = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const search = (q: string) => {
    setQuery(q);
    if (timer.current) clearTimeout(timer.current);
    if (q.length < 2) { setResults([]); setOpen(false); return; }
    timer.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setResults(data.results || []);
        setOpen(true);
      } finally { setLoading(false); }
    }, 250);
  };

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input type="text" placeholder="Search..." value={query} onChange={(e) => search(e.target.value)}
          className="input pl-8 h-8 text-xs" />
      </div>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-background rounded-xl border border-border shadow-lg max-h-72 overflow-auto z-50 animate-scale">
          {results.length > 0 ? results.map((r, i) => (
            <Link key={`${r.type}-${r.id}-${i}`} href={`/course/${r.course?.slug || "apush"}#study-guides`}
              onClick={() => { setOpen(false); setQuery(""); }}
              className="flex items-start gap-3 px-3 py-2.5 hover:bg-muted transition-colors border-b border-border last:border-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="badge bg-muted text-muted-foreground text-[10px]">{r.type}</span>
                  {r.course && <span className="text-[10px] text-muted-foreground">{r.course.shortName}</span>}
                </div>
                <p className="text-sm font-medium text-foreground truncate">{r.title}</p>
                <p className="text-xs text-muted-foreground truncate">{r.description}</p>
              </div>
            </Link>
          )) : !loading && query.length >= 2 ? (
            <div className="p-4 text-sm text-muted-foreground text-center">No results for &ldquo;{query}&rdquo;</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
