import Link from "next/link";
import type { Metadata } from "next";
import { subjects } from "@/lib/subjects";
import { SiteMark } from "@/components/SubjectMark";
import { GlassCard } from "@/components/ui/GlassCard";
import { SearchInput } from "@/components/ui/SearchInput";

export const metadata: Metadata = {
  title: "That link went nowhere",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="wrap py-16 md:py-24">
      <GlassCard padding="lg" className="mx-auto max-w-2xl">
        <div className="mb-4 flex items-center gap-3">
          <SiteMark size={32} />
          <p className="folio">Error 404</p>
        </div>
        <h1
          className="text-[clamp(1.9rem,1.5rem+1.8vw,2.75rem)] font-semibold"
          style={{ letterSpacing: "-0.028em" }}
        >
          That link led nowhere. Let&rsquo;s get you back.
        </h1>
        <p className="lede mt-4">
          Either the link was wrong, or something moved and I did not leave a redirect.
        </p>

        <form action="/search" method="get" role="search" className="mt-7 flex flex-wrap items-center gap-3">
          <div className="min-w-0 flex-1">
            <SearchInput id="notfound-q" name="q" type="search" label="What were you looking for?" />
          </div>
          <button type="submit" className="btn btn-sm">
            Find it
          </button>
        </form>

        <nav aria-label="All courses" className="mt-9 border-t border-white/60 pt-6">
          <h2 className="label mb-3">Or jump into a course</h2>
          <ul className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <li key={subject.slug}>
                <Link href={`/course/${subject.slug}`} className="tag no-underline hover:bg-white/65">
                  {subject.official}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </GlassCard>
    </div>
  );
}
