import Link from "next/link";
import type { Metadata } from "next";
import { subjects } from "@/lib/subjects";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/**
 * 404.
 *
 * A dead end is a fine place to be helpful. This one says what happened, offers
 * the search box, and lists every course, because "Page not found. Go home." is
 * a shrug.
 */
export default function NotFound() {
  return (
    <div className="wrap py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="folio mb-4">Error 404</p>
        <h1 className="text-[clamp(1.9rem,1.5rem+1.8vw,2.75rem)]" style={{ letterSpacing: "-0.028em" }}>
          There is nothing at this address.
        </h1>
        <p className="lede mt-5">
          Either the link was wrong, or something moved and I did not leave a redirect. The second
          one is my fault.
        </p>

        <form action="/search" method="get" role="search" className="mt-9">
          <label htmlFor="notfound-q" className="label mb-2 block">
            Search instead
          </label>
          <div className="flex flex-wrap gap-2">
            <input
              id="notfound-q"
              name="q"
              type="search"
              placeholder="What were you looking for?"
              className="field"
              style={{ flex: "1 1 16rem", minWidth: 0 }}
            />
            <button type="submit" className="btn btn-solid">
              Search
            </button>
          </div>
        </form>

        <nav aria-label="All courses" className="mt-12">
          <h2 className="label mb-3">Or start from a course</h2>
          <ul className="rule-top">
            {subjects.map((subject) => (
              <li key={subject.slug} className="rule-bottom">
                <Link
                  href={`/course/${subject.slug}`}
                  className="flex items-center gap-3 py-2.5 text-[0.9375rem] no-underline"
                >
                  <span
                    aria-hidden="true"
                    className="h-[7px] w-[7px] shrink-0"
                    style={{ background: subject.ink, borderRadius: 1 }}
                  />
                  <span className="font-medium">{subject.official}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
