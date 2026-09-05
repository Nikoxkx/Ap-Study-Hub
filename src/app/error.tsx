"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Error boundary.
 *
 * Next.js renders this when a segment throws during render. It gets a `reset`
 * function, which is the useful part: most render errors on a static content
 * site are transient (a chunk that failed to load on a bad connection), so
 * "try again" often just works.
 *
 * The digest is shown because it is the only handle a user can give you when
 * they report the problem. The message itself is not shown — in production it
 * is redacted anyway, and in development it is already in the console.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // No analytics service to report to, so the console is the log.
    console.error("Unhandled render error:", error);
  }, [error]);

  return (
    <div className="wrap py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="folio mb-4">Something broke</p>
        <h1 className="text-[clamp(1.9rem,1.5rem+1.8vw,2.75rem)]" style={{ letterSpacing: "-0.028em" }}>
          This page failed to render.
        </h1>
        <p className="lede mt-5">
          That is a bug on my side, not something you did. Trying again usually works — if it does
          not, the reference below will tell me which one it was.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn btn-solid">
            Try again
          </button>
          <Link href="/" className="btn btn-outline">
            Back to the home page
          </Link>
        </div>

        {error.digest ? (
          <p
            className="mt-8 text-[0.75rem]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
          >
            Reference: {error.digest}
          </p>
        ) : null}

        <p className="mt-3 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
          If it keeps happening,{" "}
          <a href={`${site.repo}/issues`} target="_blank" rel="noopener noreferrer" className="link-underlined">
            open an issue
          </a>{" "}
          with that reference.
        </p>
      </div>
    </div>
  );
}
