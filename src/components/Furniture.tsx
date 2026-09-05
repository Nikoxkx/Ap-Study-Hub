import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared page furniture. Small, unexciting components that keep the page files
 * readable and stop the same markup drifting apart in six places.
 */

export function Breadcrumbs({ trail }: { trail: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.75rem]" style={{ fontFamily: "var(--font-mono)" }}>
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" style={{ color: "var(--ink-faint)" }}>
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.href} className="link-underlined" style={{ color: "var(--ink-soft)" }}>
                  {crumb.name}
                </Link>
              )}
              {last ? null : (
                <span aria-hidden="true" style={{ color: "var(--rule-strong)" }}>
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Section heading with a folio number, the way a chapter opener is set. The
 * number is decorative — it is not read out, because "03" adds nothing to a
 * screen reader user's understanding of "Choose a course".
 */
/**
 * A numbered section heading, set as a folio in the margin beside the title.
 *
 * `level` exists because these are used both directly under a page's h1 and
 * one rung further down inside a course child route, where the course masthead
 * already owns the h1. Getting this wrong produces a heading outline that
 * reads correctly to the eye and nonsensically to a screen reader.
 */
export function SectionHead({
  folio,
  title,
  children,
  id,
  level = 2,
}: {
  folio: string;
  title: string;
  children?: ReactNode;
  id?: string;
  level?: 2 | 3;
}) {
  const Heading = level === 3 ? "h3" : "h2";
  return (
    <div className="mb-8 flex flex-col gap-3 rule-top pt-5 md:flex-row md:items-baseline md:gap-8">
      <span className="folio shrink-0" aria-hidden="true">
        {folio}
      </span>
      <div className="flex-1">
        <Heading id={id} className="text-[clamp(1.35rem,1.1rem+0.8vw,1.75rem)]">
          {title}
        </Heading>
        {children ? (
          <div className="mt-2 max-w-[56ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** A number and its unit, set as a small statistic block. */
export function Stat({
  value,
  label,
  tone = "ink",
}: {
  value: ReactNode;
  label: string;
  tone?: "ink" | "subject" | "mark";
}) {
  const colour =
    tone === "subject" ? "var(--subject-ink)" : tone === "mark" ? "var(--mark)" : "var(--ink)";
  return (
    <div>
      <div
        className="stat-value text-[1.5rem] leading-none"
        style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: colour }}
      >
        {value}
      </div>
      <div className="label mt-1.5">{label}</div>
    </div>
  );
}

/** Used when a course genuinely has no content of a given kind. Says so plainly. */
export function EmptyNote({ children }: { children: ReactNode }) {
  return (
    <p
      className="sunk px-4 py-3 text-[0.875rem]"
      style={{ color: "var(--ink-soft)" }}
    >
      {children}
    </p>
  );
}

export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 12 12"
        width="9"
        height="9"
        className="ml-1 inline-block align-baseline"
        style={{ opacity: 0.55 }}
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M4.5 1.5h6v6" />
          <path d="M10.5 1.5 4 8" />
          <path d="M8.5 10.5h-7v-7" />
        </g>
      </svg>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
