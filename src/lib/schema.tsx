import { site, absoluteUrl } from "./site";
import { getCatalog, getTotals } from "./catalog";
import type { CourseBundle } from "./catalog";
import { formatExamDate } from "./subjects";

/**
 * Structured data.
 *
 * Google's guidance is explicit that schema must describe what is visibly on
 * the page, so every value here is rendered somewhere in the markup too: the
 * course counts appear on the course header, the FAQ answers appear as body
 * copy, the breadcrumb mirrors the on-page breadcrumb trail.
 *
 * Emitted as JSON-LD in the server-rendered HTML, not injected on the client,
 * so crawlers see it without executing JavaScript.
 */

type Schema = Record<string, unknown>;

export function JsonLd({ schema }: { schema: Schema | Schema[] }) {
  const payload = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {payload.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          // Serialised by JSON.stringify, and `<` is escaped so a stray closing
          // tag inside content cannot break out of the script element.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}

export function organizationSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    url: site.origin,
    description: site.description,
    founder: { "@type": "Person", name: site.author.name },
    sameAs: [site.repo],
    // Stated plainly because the footer states it plainly.
    disambiguatingDescription:
      "An independent, student-run study site. Not affiliated with the College Board.",
  };
}

export function websiteSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: site.origin,
    name: site.name,
    description: site.description,
    inLanguage: "en-US",
    publisher: { "@id": absoluteUrl("/#organization") },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/search?q={search_term_string}"),
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function courseSchema(course: CourseBundle): Schema {
  const { subject, counts } = course;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": absoluteUrl(`/course/${subject.slug}#course`),
    name: subject.official,
    alternateName: subject.familiar,
    description: subject.summary,
    url: absoluteUrl(`/course/${subject.slug}`),
    inLanguage: "en-US",
    // Same date the sitemap reports for this course, so the two never disagree.
    dateModified: subject.revised,
    isAccessibleForFree: true,
    educationalLevel: "High school, Advanced Placement",
    teaches: course.units.map((unit) => unit.title),
    provider: { "@id": absoluteUrl("/#organization") },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${counts.readingMinutes}M`,
      instructor: { "@type": "Person", name: site.author.name },
    },
    numberOfCredits: 0,
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      category: "Free",
    },
  };
}

export function breadcrumbSchema(trail: { name: string; href: string }[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.href),
    })),
  };
}

export function faqSchema(entries: { question: string; answer: string }[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

/** The catalogue as an ItemList, matching the order courses appear on the home page. */
export function catalogSchema(): Schema {
  const catalog = getCatalog();
  const totals = getTotals();
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} course catalogue`,
    numberOfItems: totals.courses,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: catalog.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: course.subject.official,
      description: `${course.subject.summary} Exam: ${formatExamDate(course.subject)}.`,
      url: absoluteUrl(`/course/${course.subject.slug}`),
    })),
  };
}
