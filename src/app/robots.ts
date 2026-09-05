import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * robots.txt
 *
 * /api/ is disallowed because it returns JSON, not pages — there is nothing
 * there for a crawler to index and it would burn crawl budget on query-string
 * permutations. /search is disallowed for the same reason: it is a results
 * shell, and indexing it produces near-duplicate thin pages.
 *
 * Note that robots.txt blocks crawling, not indexing. The pages that must never
 * appear in results also carry `robots: { index: false }` in their metadata.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/search"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
