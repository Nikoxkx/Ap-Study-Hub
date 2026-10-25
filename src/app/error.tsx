"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { SiteMark } from "@/components/SubjectMark";
import { GlassCard } from "@/components/ui/GlassCard";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled render error:", error);
  }, [error]);

  return (
    <div className="wrap py-16 md:py-24">
      <GlassCard padding="lg" className="mx-auto max-w-2xl">
        <div className="mb-4 flex items-center gap-3">
          <SiteMark size={32} />
          <p className="folio">Our mistake</p>
        </div>
        <h1
          className="text-[clamp(1.9rem,1.5rem+1.8vw,2.75rem)] font-semibold"
          style={{ letterSpacing: "-0.028em" }}
        >
          That one is on us. Try again?
        </h1>
        <p className="lede mt-4">
          That is a bug on my side, not something you did. Trying again usually works.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn btn-sm">
            Try again
          </button>
          <Link href="/" className="btn btn-sm">
            Back to home
          </Link>
        </div>

        {error.digest ? (
          <p
            className="mt-6 text-[0.75rem]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
          >
            Reference: {error.digest}
          </p>
        ) : null}

        <p className="mt-3 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
          If it keeps happening,{" "}
          <a
            href={`${site.repo}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underlined"
          >
            open an issue
          </a>{" "}
          with that reference.
        </p>
      </GlassCard>
    </div>
  );
}
