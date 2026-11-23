"use client";

import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { useUserSources } from "@/lib/user-sources";

/**
 * Sources the visitor added for this course.
 *
 * Rendered only when there is something to show, so a fresh browser sees exactly
 * the curated page it saw before. Kept in its own group and labelled as yours:
 * the site did not read these links, and it does not claim to have.
 */
export function UserSources({ slug, familiar }: { slug: string; familiar: string }) {
  const [sources] = useUserSources();
  const mine = sources.filter((source) => source.course === slug);
  if (mine.length === 0) return null;

  return (
    <GlassCard as="section" padding="lg" aria-labelledby="your-sources-heading">
      <p className="label mb-2">Your sources · {mine.length} added on this device</p>
      <h2 id="your-sources-heading" className="text-[1.35rem] font-semibold">
        What you filed under {familiar}
      </h2>
      <p className="mt-2 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
        These are yours, not the author&apos;s. They are not reviewed, cited, or counted in the lesson
        sources above — check them the way you would check anything handed to you.
      </p>
      <ul className="mt-5 space-y-3">
        {mine.map((source) => (
          <li key={source.id} className="border-t border-white/50 pt-3 first:border-0 first:pt-0">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="font-semibold underline decoration-1 underline-offset-2"
            >
              {source.title}
            </a>
            <p className="mt-1 text-[0.8125rem]" style={{ color: "var(--ink-faint)" }}>
              {source.type}
              {source.note ? ` · ${source.note}` : ""}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[0.8125rem]" style={{ color: "var(--ink-faint)" }}>
        <Link href="/settings?tab=sources" className="underline underline-offset-2">
          Add or remove sources
        </Link>
      </p>
    </GlassCard>
  );
}
