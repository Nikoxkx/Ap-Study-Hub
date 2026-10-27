import type { Metadata } from "next";
import Link from "next/link";
import { search, kindLabels, indexSize } from "@/lib/search";
import { subjects, isSubjectSlug } from "@/lib/subjects";
import { Breadcrumbs } from "@/components/Furniture";
import { GlassCard } from "@/components/ui/GlassCard";
import { SearchInput } from "@/components/ui/SearchInput";

export const metadata: Metadata = {
  title: "Find exactly what you need",
  description: "Search every unit note, key term, card and practice question on AP Study Hub.",
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; subject?: string }>;
}) {
  const { q = "", subject: subjectParam } = await searchParams;
  const query = q.slice(0, 80).trim();
  const subject = subjectParam && isSubjectSlug(subjectParam) ? subjectParam : undefined;
  const results = query.length >= 2 ? search(query, { limit: 40, subject }) : [];

  return (
    <div className="wrap py-10 md:py-14">
      <div className="mx-auto max-w-3xl space-y-8">
        <GlassCard padding="lg">
          <Breadcrumbs
            trail={[
              { name: "Home", href: "/" },
              { name: "Search", href: "/search" },
            ]}
          />

          <h1
            className="text-[clamp(1.7rem,1.35rem+1.3vw,2.35rem)] font-semibold"
            style={{ letterSpacing: "-0.025em" }}
          >
            Find the exact thing you need.
          </h1>
          <p className="lede mt-3">
            {indexSize().toLocaleString("en-US")} indexed items across every course — notes, key
            terms, cards, questions, essays, and FRQs.
          </p>

          <form action="/search" method="get" role="search" className="mt-7 grid gap-3 sm:grid-cols-[minmax(0,1fr)_12rem_auto] sm:items-center">
            <SearchInput
              id="site-search-q"
              name="q"
              type="search"
              defaultValue={query}
              label="Search notes, terms, or questions"
            />
            <select
              name="subject"
              defaultValue={subject ?? ""}
              aria-label="Limit to one course"
              className="field"
            >
              <option value="">All courses</option>
              {subjects.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.familiar}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-sm">
              Find it
            </button>
          </form>
        </GlassCard>

        {query.length >= 2 ? (
          <GlassCard as="section" padding="lg" aria-live="polite">
            <p className="label mb-4">
              {results.length === 0
                ? "No matches"
                : `${results.length} ${results.length === 1 ? "match" : "matches"} for “${query}”`}
            </p>

            {results.length === 0 ? (
              <p className="text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                Nothing matched. Search here is a plain keyword match over the notes, so it helps to
                use the word the notes would use — <em>Reconstruction</em> rather than{" "}
                <em>after the civil war stuff</em>.
              </p>
            ) : (
              <ol className="divide-y divide-white/60 border-t border-white/60">
                {results.map((hit) => (
                  <li key={hit.id} className="py-3.5">
                    <Link href={hit.href} className="group flex items-baseline gap-3 no-underline">
                      <span
                        className="shrink-0 text-[0.625rem] uppercase tracking-[0.08em]"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--ink-faint)",
                          minWidth: "4rem",
                        }}
                      >
                        {kindLabels[hit.kind]}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[1rem] font-semibold group-hover:underline">
                          {hit.title}
                        </span>
                        <span className="mt-0.5 block text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                          {hit.subjectLabel ? <strong>{hit.subjectLabel} · </strong> : null}
                          {hit.context}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </GlassCard>
        ) : (
          <GlassCard as="section" padding="lg">
            <h2 className="label mb-4">Start with one of these</h2>
            <ul className="flex flex-wrap gap-2">
              {[
                "Columbian Exchange",
                "judicial review",
                "synthesis essay",
                "photosynthesis",
                "related rates",
                "line of reasoning",
                "selective incorporation",
                "Hardy-Weinberg",
              ].map((example) => (
                <li key={example}>
                  <Link
                    href={`/search?q=${encodeURIComponent(example)}`}
                    className="tag no-underline hover:bg-white/65"
                  >
                    {example}
                  </Link>
                </li>
              ))}
            </ul>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
