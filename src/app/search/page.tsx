import type { Metadata } from "next";
import Link from "next/link";
import { search, kindLabels, indexSize } from "@/lib/search";
import { subjects, isSubjectSlug } from "@/lib/subjects";
import { Breadcrumbs } from "@/components/Furniture";

export const metadata: Metadata = {
  title: "Search",
  description: "Search every unit note, key term, card and practice question on AP Study Hub.",
  // A results page is thin and infinitely variable. Keeping it out of the index
  // stops it generating near-duplicate pages for every query string.
  robots: { index: false, follow: true },
};

/**
 * Search results, rendered on the server.
 *
 * This is where the header combobox posts when you press Enter, and it is the
 * whole of search if JavaScript never runs. Same index, same scoring, no
 * client-side code at all on this route.
 */
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
    <div className="wrap py-12 md:py-16">
      <div className="max-w-3xl">
        <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Search", href: "/search" }]} />

        <h1 className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)]" style={{ letterSpacing: "-0.025em" }}>
          Search
        </h1>
        <p className="lede mt-3">
          {indexSize().toLocaleString("en-US")} indexed items across every course — notes, key
          terms, cards, questions and essays.
        </p>

        <form action="/search" method="get" role="search" className="mt-8">
          <label htmlFor="site-search-q" className="label mb-2 block">
            What are you looking for
          </label>
          <div className="flex flex-wrap gap-2">
            <input
              id="site-search-q"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="federalism, mitosis, DBQ, related rates"
              autoComplete="off"
              className="field"
              style={{ flex: "1 1 16rem", minWidth: 0 }}
            />
            <select
              name="subject"
              defaultValue={subject ?? ""}
              aria-label="Limit to one course"
              className="field"
              style={{ flex: "0 1 12rem", width: "auto" }}
            >
              <option value="">All courses</option>
              {subjects.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.familiar}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-solid">
              Search
            </button>
          </div>
        </form>

        {query.length >= 2 ? (
          <section className="mt-12" aria-live="polite">
            <p className="label mb-5">
              {results.length === 0
                ? "No matches"
                : `${results.length} ${results.length === 1 ? "match" : "matches"} for “${query}”`}
            </p>

            {results.length === 0 ? (
              <div className="sunk p-5">
                <p className="text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  Nothing matched. Search here is a plain keyword match over the notes, so it helps
                  to use the word the notes would use — <em>Reconstruction</em> rather than{" "}
                  <em>after the civil war stuff</em>. If the term genuinely is not covered, that is
                  a gap and worth telling me about.
                </p>
              </div>
            ) : (
              <ol className="rule-top">
                {results.map((hit) => (
                  <li key={hit.id} className="rule-bottom py-3.5">
                    <Link href={hit.href} className="group flex items-baseline gap-3 no-underline">
                      <span
                        className="shrink-0 text-[0.625rem] uppercase tracking-[0.08em]"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)", minWidth: "4rem" }}
                      >
                        {kindLabels[hit.kind]}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[1rem] font-medium group-hover:underline">
                          {hit.title}
                        </span>
                        <span className="mt-0.5 block text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                          {hit.subjectLabel ? (
                            <span style={{ color: "var(--mark)" }}>{hit.subjectLabel} · </span>
                          ) : null}
                          {hit.context}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </section>
        ) : (
          <section className="mt-12">
            <h2 className="label mb-4">Try one of these</h2>
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
                  <Link href={`/search?q=${encodeURIComponent(example)}`} className="tag">
                    {example}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
