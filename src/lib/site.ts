/**
 * Single source of truth for anything that needs to know "where am I deployed"
 * or "what is this thing called". Imported by the metadata helpers, the sitemap,
 * robots.txt, the JSON-LD blocks and the footer.
 *
 * NEXT_PUBLIC_SITE_URL is set in Vercel. Falling back to the production domain
 * (rather than localhost) means a forgotten env var produces correct canonicals
 * instead of `http://localhost:3000` leaking into the sitemap.
 */

const FALLBACK_ORIGIN = "https://ap-study-hub-five.vercel.app";

function readOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  // Vercel injects this on preview deployments so OG images resolve there too.
  const vercel = process.env.NEXT_PUBLIC_VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;

  return FALLBACK_ORIGIN;
}

export const site = {
  name: "AP Study Hub",
  /** Used in <title> templates — short enough to leave room for the page name. */
  shortName: "AP Study Hub",
  origin: readOrigin(),
  tagline: "Learn seven AP subjects deeply and make the work count",
  description:
    "Fifty-one deep lessons, active recall, original practice, marked essays and unit videos for seven AP courses — free, private, and built to help you earn college credit where it is accepted.",
  author: {
    name: "Yeisbel Pena",
    role: "Student, and the person who writes everything here",
  },
  repo: "https://github.com/Nikoxkx/Ap-Study-Hub",
  locale: "en_US",
  /** Bumped by hand when the content set materially changes. Shown in the footer. */
  contentRevision: "2026.10",
  /**
   * Date the privacy and accessibility statements were last reviewed. Kept here
   * rather than inside those pages so a review updates one line, and so the
   * sitemap can report a `lastModified` for them that is not simply "today".
   */
  policyUpdated: "2026-10-24",
} as const;

/**
 * Builds a meta description out of sentences, longest-useful-prefix first.
 *
 * Google truncates snippets around 155-160 characters. Rather than writing a
 * description and hoping, pass the sentences in priority order: this keeps
 * adding them while they fit and drops the rest. Nothing is ever cut
 * mid-sentence, so what shows in the results page is always a whole thought.
 */
export function describe(...sentences: string[]): string {
  const LIMIT = 158;
  let out = "";
  for (const sentence of sentences) {
    const next = out ? `${out} ${sentence}` : sentence;
    // `continue`, not `break`: one long sentence should not also discard the
    // shorter ones behind it. Order is still preserved, some are just omitted.
    if (next.length > LIMIT) continue;
    out = next;
  }
  // A first sentence longer than the limit is an authoring mistake, but
  // returning nothing would be worse than returning something over-long.
  return out || sentences[0] || "";
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${site.origin}/`).toString();
}

/**
 * A real static file, not a generated ImageResponse route.
 *
 * The old /opengraph-image route could fail at runtime in production and left
 * social scrapers with no picture. A committed 1200×630 PNG is boring, cacheable,
 * and available at the same origin as the page. Every page's metadata points at
 * this exact URL so previews do not depend on route inheritance or a renderer.
 */
export const socialImage = {
  url: absoluteUrl("/og-image.png"),
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "AP Study Hub — learn seven AP subjects deeply, remember what matters, and make the work count toward college credit where it is accepted.",
} as const;

export const socialImages = [socialImage];

/**
 * `2026-08-24` -> `24 August 2026`.
 *
 * Parsed as UTC on purpose: `new Date("2026-08-24")` is already midnight UTC,
 * but formatting it in the server's local zone can roll it back a day for
 * anyone west of Greenwich, which is how "last updated" dates end up off by one.
 */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
