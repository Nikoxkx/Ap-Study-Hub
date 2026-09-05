import type { MetadataRoute } from "next";
import { subjects } from "@/lib/subjects";
import { getCourse } from "@/lib/catalog";
import { absoluteUrl, site } from "@/lib/site";

/**
 * Sitemap.
 *
 * Only 200-status, canonical, indexable URLs. /search is excluded because it is
 * a thin results shell with no content of its own, and the API route is not a
 * page.
 *
 * `lastModified` is the date the *content* was last worked on, not the build
 * time. Stamping the same fresh timestamp on all 48 URLs every deploy is worse
 * than useless: after two or three deploys a crawler learns the field is noise
 * and stops using it to prioritise. Course pages carry that course's `revised`
 * date; the policy pages carry the date they were last reviewed.
 */

function isoDate(value: string): Date {
  return new Date(`${value}T00:00:00Z`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const policy = isoDate(site.policyUpdated);

  // The home page and the guides are only as fresh as the newest course.
  const newestContent = subjects
    .map((subject) => subject.revised)
    .sort()
    .at(-1) as string;

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: isoDate(newestContent), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/guides"), lastModified: isoDate(newestContent), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/about"), lastModified: policy, changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/colophon"), lastModified: policy, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/accessibility"), lastModified: policy, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/privacy"), lastModified: policy, changeFrequency: "yearly", priority: 0.3 },
  ];

  const coursePages: MetadataRoute.Sitemap = subjects.flatMap((subject) => {
    const course = getCourse(subject.slug);
    if (!course) return [];

    const base = `/course/${subject.slug}`;
    const lastModified = isoDate(subject.revised);
    const pages: MetadataRoute.Sitemap = [
      { url: absoluteUrl(base), lastModified, changeFrequency: "monthly", priority: 0.9 },
    ];

    // Every entry below is conditional for the same reason the routes are:
    // listing a URL that answers 404 is the fastest way to lose a crawler's
    // trust in the rest of the file.
    if (course.units.length) {
      pages.push({ url: absoluteUrl(`${base}/notes`), lastModified, changeFrequency: "monthly", priority: 0.85 });
    }
    if (course.flashcards.length) {
      pages.push({ url: absoluteUrl(`${base}/cards`), lastModified, changeFrequency: "monthly", priority: 0.7 });
    }
    if (course.questions.length) {
      pages.push({ url: absoluteUrl(`${base}/practice`), lastModified, changeFrequency: "monthly", priority: 0.7 });
    }
    if (course.essays.length) {
      pages.push({ url: absoluteUrl(`${base}/essays`), lastModified, changeFrequency: "monthly", priority: 0.75 });
    }
    if (course.mockExams.length) {
      pages.push({ url: absoluteUrl(`${base}/exam`), lastModified, changeFrequency: "monthly", priority: 0.6 });
    }
    if (course.resources.length) {
      pages.push({ url: absoluteUrl(`${base}/resources`), lastModified, changeFrequency: "monthly", priority: 0.5 });
    }

    return pages;
  });

  return [...staticPages, ...coursePages];
}
