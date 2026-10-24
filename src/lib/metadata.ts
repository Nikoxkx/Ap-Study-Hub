import type { Metadata } from "next";
import { absoluteUrl, site } from "./site";

/**
 * Page metadata, assembled in one place.
 *
 * Every page already had a description; what it did not have was a complete
 * link preview. Missing were the OG title (most apps ignore `twitter:title`),
 * the canonical URL in the OG payload, the image dimensions, the image alt and
 * a locale — which is why a pasted link could show a bare URL with no picture.
 *
 * The image itself is supplied by the route's `opengraph-image.tsx` file, which
 * Next wires into both `og:image` and `twitter:image` with the right absolute
 * URL. Deliberately not set here: if `openGraph.images` is present it can
 * override the generated file, and the file version knows the course, counts
 * and accent colour.
 *
 * `path` is passed to the canonical and OG url as a rooted path; absolute URLs
 * are built against `site.origin` so a preview deployment still previews itself.
 */

interface PageMetadataOptions {
  /** Page title, without the site name. Pass `{ absolute }` for the home page. */
  title: string | { absolute: string };
  /** Standalone description, 100–160 characters where possible. */
  description: string;
  /** Rooted path, e.g. `/course/apush/notes`. */
  path: string;
  /** A shorter, more specific title for link previews. Defaults to `title`. */
  ogTitle?: string;
  /** Defaults to `description`. */
  ogDescription?: string;
  /** Extra search terms for this page specifically. */
  keywords?: string[];
  /** `article` for study pages with a revised date, `website` otherwise. */
  type?: "website" | "article" | "profile";
  /** Usually the last content revision of the course or policy. */
  modified?: string;
  /** Leave unset to inherit the site-wide crawl policy. */
  robots?: Metadata["robots"];
  /** Canonical override, for pages that legitimately share a URL. */
  canonical?: string;
}

export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  keywords,
  type = "website",
  modified,
  robots,
  canonical,
}: PageMetadataOptions): Metadata {
  const plainTitle = typeof title === "string" ? title : title.absolute;
  const socialTitle = `${ogTitle ?? plainTitle} · ${site.name}`;
  const socialDescription = ogDescription ?? description;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: canonical ?? path },
    robots,
    openGraph: {
      type,
      siteName: site.name,
      locale: site.locale,
      url: absoluteUrl(path),
      title: socialTitle,
      description: socialDescription,
      ...(type === "article" && modified
        ? { publishedTime: modified, modifiedTime: modified }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      creator: undefined,
    },
  };
}

/**
 * Text guaranteed to fit a preview card. `describe()` already drops whole
 * sentences rather than cutting mid-thought; this adds the hard stop that link
 * unfurlers apply anyway, so the truncation is ours and lands on a word.
 */
export function previewText(value: string, limit = 158): string {
  if (value.length <= limit) return value;
  const cut = value.slice(0, limit - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 60 ? lastSpace : cut.length).replace(/[,;:—-]$/, "")}…`;
}
