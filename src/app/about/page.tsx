import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, SectionHead, Stat } from "@/components/Furniture";
import { getCatalog, getTotals } from "@/lib/catalog";
import { site, absoluteUrl } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About, and how the content is made",
  description:
    "Who writes AP Study Hub, how the notes and questions are produced and checked, what the site deliberately does not do, and where coverage is thin.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About AP Study Hub",
    description:
      "Who writes it, how it is checked, and where the gaps are — stated plainly.",
    url: absoluteUrl("/about"),
  },
};

/**
 * About.
 *
 * The page that makes the rest of the site checkable. Named author, stated
 * method, stated limits, and a coverage table that shows exactly where the
 * content is thin instead of implying it is uniform.
 */
export default function AboutPage() {
  const totals = getTotals();
  const catalog = getCatalog();

  const trail = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <JsonLd schema={breadcrumbSchema(trail)} />

      <div className="wrap py-12 md:py-16">
        <div className="max-w-[68ch]">
          <Breadcrumbs trail={trail} />
          <p className="label mb-3">About</p>
          <h1 className="text-[clamp(1.9rem,1.5rem+1.8vw,2.9rem)]" style={{ letterSpacing: "-0.028em" }}>
            One person, seven courses, no business model.
          </h1>
          <p className="lede mt-5">
            This page exists so you can decide how much to trust the rest of the site. Who wrote it,
            how it was made, and where it is thin.
          </p>
        </div>

        <section className="mt-16" aria-labelledby="who-heading">
          <SectionHead folio="01" title="Who writes this" id="who-heading" />
          <div className="prose">
            <p>
              My name is {site.author.name}. I am a student, not a teacher, not a tutoring company,
              and not a content agency. Every note, card and practice question on this site was
              written by me, for exams I have sat or am sitting.
            </p>
            <p>
              That is the main thing worth knowing about it, in both directions. It means the notes
              are written from the position of someone who was recently confused by the same
              material, which is genuinely useful, and it means there is no department of fact
              checkers behind them, which is genuinely a limitation. Where I am not confident about
              something, the page says so.
            </p>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="method-heading">
          <SectionHead folio="02" title="How the content is made" id="method-heading">
            Four rules, applied to everything here.
          </SectionHead>

          <ol className="rule-top">
            {[
              {
                rule: "Nothing goes up that I would not have used myself",
                detail:
                  "The test for a note is whether it would have saved me an hour the week before the exam. Filler that exists to make a unit look complete does not pass it, which is why some units are short.",
              },
              {
                rule: "Framework first, then everything else",
                detail:
                  "Units follow the College Board course and exam description, in its order, using its unit numbering. Where the framework names a required document, case or practice, it is flagged rather than paraphrased away.",
              },
              {
                rule: "Practice questions are original",
                detail:
                  "None are reproduced from secure exam material. They are written to sit in the same difficulty band, with distractors drawn from the mistakes people actually make rather than three obviously wrong options.",
              },
              {
                rule: "Every outbound link is opened before it is listed",
                detail:
                  "Links carry the date they were last checked. Video lectures are linked as channels rather than individual video IDs, because channel handles survive a creator reorganising their playlists and video IDs do not.",
              },
            ].map((item, index) => (
              <li key={item.rule} className="grid gap-x-6 gap-y-1.5 rule-bottom py-5 sm:grid-cols-[2rem_minmax(0,1fr)]">
                <span
                  aria-hidden="true"
                  className="text-[0.75rem] tabular-nums"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--mark)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[1.0625rem] font-semibold">{item.rule}</h3>
                  <p className="mt-1.5 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16" aria-labelledby="coverage-heading">
          <SectionHead folio="03" title="Where it is thin" id="coverage-heading">
            Coverage is uneven and pretending otherwise would be the fastest way to waste your time.
            These are the real counts, generated from the content itself.
          </SectionHead>

          <dl className="mb-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            <Stat value={totals.units} label="units written" tone="mark" />
            <Stat value={totals.flashcards} label="cards" />
            <Stat value={totals.questions} label="questions" />
            <Stat value={`${Math.round(totals.readingMinutes / 60)}h`} label="of reading" />
          </dl>

          <div className="table-scroll">
            <table className="data-table">
              <caption className="sr-only">Content counts for each course</caption>
              <thead>
                <tr>
                  <th scope="col">Course</th>
                  <th scope="col">Units</th>
                  <th scope="col">Cards</th>
                  <th scope="col">Questions</th>
                  <th scope="col">Essays</th>
                  <th scope="col">Timed paper</th>
                </tr>
              </thead>
              <tbody>
                {catalog.map((course) => (
                  <tr key={course.subject.slug}>
                    <th scope="row">
                      <Link href={`/course/${course.subject.slug}`} className="link-underlined">
                        {course.subject.familiar}
                      </Link>
                    </th>
                    <td className="tabular-nums">{course.counts.units || "—"}</td>
                    <td className="tabular-nums">{course.counts.flashcards || "—"}</td>
                    <td className="tabular-nums">{course.counts.questions || "—"}</td>
                    <td className="tabular-nums">{course.counts.essays || "—"}</td>
                    <td>{course.mockExams.length > 0 ? "Yes" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
            An em dash means it does not exist yet, not that it is coming soon. Where a course has
            no marked essays, it is usually because I have not written a response I would be
            comfortable holding up as a model.
          </p>
        </section>

        <section className="mt-16" aria-labelledby="corrections-heading">
          <SectionHead folio="04" title="Corrections" id="corrections-heading" />
          <div className="prose">
            <p>
              There will be errors in here. History notes compress arguments, science notes simplify
              mechanisms, and I will have got some things flatly wrong. If you find one, the fastest
              route is{" "}
              <a href={`${site.repo}/issues`} target="_blank" rel="noopener noreferrer">
                an issue on the repository
              </a>{" "}
              — the whole site is public source, so you can point at the exact line.
            </p>
            <p>
              Corrections that change the substance of a note get made and the content revision in
              the footer gets bumped. I would rather be corrected than be trusted by default.
            </p>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="not-heading">
          <SectionHead folio="05" title="What this is not" id="not-heading" />
          <ul className="grid gap-x-12 gap-y-5 md:grid-cols-2">
            {[
              {
                h: "Not affiliated with the College Board",
                p: "AP and Advanced Placement are their registered trademarks. They have not seen, reviewed or approved anything here.",
              },
              {
                h: "Not a source of real exam questions",
                p: "Everything is original. If a site is offering you this year's secure items, it is either lying or committing a fairly serious offence on your behalf.",
              },
              {
                h: "Not a business",
                p: "Nothing is sold, nothing is upsold, there is no email list and there are no ads. It costs nothing to run because it is static files.",
              },
              {
                h: "Not tracking you",
                p: "No analytics, no cookies, no third-party scripts, no fonts loaded from anyone else's server. The only thing stored is your own study progress, in your own browser.",
              },
            ].map((item) => (
              <li key={item.h} className="rule-top pt-4">
                <h3 className="text-[1.0625rem] font-semibold">{item.h}</h3>
                <p className="mt-1.5 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {item.p}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-14 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
          If you want the technical side — the typefaces, the palette, why the search works the way
          it does — that is in the{" "}
          <Link href="/colophon" className="link-underlined" style={{ color: "var(--ink)" }}>
            colophon
          </Link>
          .
        </p>
      </div>
    </>
  );
}
