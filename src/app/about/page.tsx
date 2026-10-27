import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, SectionHead, Stat } from "@/components/Furniture";
import { SiteMark } from "@/components/SubjectMark";
import { GlassCard } from "@/components/ui/GlassCard";
import { getCatalog, getTotals } from "@/lib/catalog";
import { site, absoluteUrl, socialImages } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Meet the student behind the lessons",
  description:
    "Meet the student who built AP Study Hub, see how every lesson is checked, and learn where the gaps still are.",
  alternates: { canonical: "/about" },
  openGraph: { images: socialImages,
    title: "A student-built AP study library",
    description:
      "Who made it, how the work is checked, and what is still missing — said plainly.",
    url: absoluteUrl("/about"),
  },
  twitter: { card: "summary_large_image", images: socialImages },
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

      <div className="wrap py-10 md:py-14">
        <GlassCard padding="lg">
        <div className="max-w-[68ch]">
          <Breadcrumbs trail={trail} />
          <div className="mb-3 flex items-center gap-3">
            <SiteMark size={28} />
            <p className="label">The human behind the notes</p>
          </div>
          <h1 className="text-[clamp(1.9rem,1.5rem+1.8vw,2.9rem)] font-semibold" style={{ letterSpacing: "-0.028em" }}>
            One student, ten courses, and nothing to sell you.
          </h1>
          <p className="lede mt-5">
            This page is here so you can decide how much to trust the rest of the site: who made
            it, how the work was checked, and where I may still be wrong.
          </p>
        </div>

        <section className="mt-16" aria-labelledby="who-heading">
          <SectionHead folio="01" title="A student, not a test-prep company" id="who-heading" />
          <div className="prose">
            <p>
              My name is {site.author.name}. I am a student, not a teacher, not a tutoring company,
              and not a content agency. Every note, card and practice question on this site was
              curated and reviewed by me, for exams I have sat or am sitting — with AI tools used as
              drafting assistants (see{" "}
              <Link href="/ai-disclosure" className="link-underlined">
                AI disclosure
              </Link>
              ).
            </p>
            <p>
              That is the main thing worth knowing about it, in both directions. It means the notes
              are written from the position of someone who was recently confused by the same
              material, which is genuinely useful, and it means there is no department of fact
              checkers behind them, which is genuinely a limitation. Where I am not confident about
              something, the page says so. Where AI helped draft, the disclosure says exactly where.
            </p>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="ai-heading">
          <SectionHead folio="02" title="Where AI helped, and where a person decided" id="ai-heading">
            This site was built with AI as a collaborator. Full breakdown is on{" "}
            <Link href="/ai-disclosure" className="link-underlined" style={{ color: "var(--ink)" }}>
              /ai-disclosure
            </Link>{" "}
            and in{" "}
            <a
              href={`${site.repo}/blob/main/AI_DISCLOSURE.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underlined"
              style={{ color: "var(--ink)" }}
            >
              AI_DISCLOSURE.md
            </a>
            . Short version: v0.dev scaffolded the first version (hence the v0 URL); Copilot, ChatGPT,
            Claude, and Arena.ai Agent Mode assisted with code and content. The expanded lessons were
            drafted against official curriculum and scoring pages and are checked by automated depth,
            citation, and TypeScript validation. The author retains editorial responsibility.
          </SectionHead>
          <div className="prose">
            <ul>
              <li>
                <strong>Code:</strong> Components like CardDeck, PracticeSet, TimedPaper had AI-assisted
                drafts, rewritten for WCAG 2.2 AA, static generation, and no UI library.
              </li>
              <li>
                <strong>Content:</strong> {totals.units} deep lessons and {totals.paragraphs} teaching
                paragraphs, plus {totals.flashcards} cards and {totals.questions} original practice
                questions. Drafts cite current curriculum and scoring sources and pass structural
                validation; no secure exam material is intentionally reproduced.
              </li>
              <li>
                <strong>No chatbot:</strong> nothing here talks to you in a conversation, and search is
                a hand-rolled scored index rather than a model. Essay grading is either a measured
                rubric analyser that runs without any API, or a model call you turn on yourself with
                your own provider key — and every point it awards is shown next to the evidence in
                your own sentences.
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="method-heading">
          <SectionHead folio="03" title="How a lesson earns its place here" id="method-heading">
            Four rules, applied to everything here.
          </SectionHead>

          <ol className="rule-top">
            {[
              {
                rule: "Nothing goes up that I would not have used myself",
                detail:
                  "Every lesson must do real teaching: at least ten developed paragraphs, precise examples, misconceptions worth correcting, and an explicit connection to the exam or scoring task. A paragraph count is a floor, not a substitute for accuracy.",
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
                  "Links carry the date they were last checked. Unit videos are now verified IDs with player, watch, and replacement-search links; durable course channels remain for going deeper.",
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
          <SectionHead folio="04" title="What is here, counted honestly" id="coverage-heading">
            Every course now has a complete deep-lesson spine. Essays and timed practice remain uneven,
            so those counts are shown plainly rather than hidden behind a comprehensive-sounding adjective.
          </SectionHead>

          <dl className="mb-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            <Stat value={totals.units} label="deep lessons" tone="mark" />
            <Stat value={totals.paragraphs} label="teaching paragraphs" />
            <Stat value={totals.questions} label="questions" />
            <Stat value={`${Math.round(totals.readingMinutes / 60)}h`} label="of reading" />
          </dl>

          <div className="table-scroll">
            <table className="data-table">
              <caption className="sr-only">Content counts for each course</caption>
              <thead>
                <tr>
                  <th scope="col">Course</th>
                  <th scope="col">Lessons</th>
                  <th scope="col">Paragraphs</th>
                  <th scope="col">Cards</th>
                  <th scope="col">Questions</th>
                  <th scope="col">Essays</th>
                  <th scope="col">Interim assessment</th>
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
                    <td className="tabular-nums">{course.counts.paragraphs || "—"}</td>
                    <td className="tabular-nums">{course.counts.flashcards || "—"}</td>
                    <td className="tabular-nums">{course.counts.questions || "—"}</td>
                    <td className="tabular-nums">{course.counts.essays || "—"}</td>
                    <td>
                      {course.interim
                        ? `${Math.round(course.interim.minutes / 60 * 10) / 10}h · ${course.interim.mcqCount} MCQ · ${course.interim.frqCount} written`
                        : "—"}
                    </td>
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
          <SectionHead folio="05" title="If I got something wrong, tell me" id="corrections-heading" />
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
          <SectionHead folio="06" title="What this site will not pretend to do" id="not-heading" />
          <ul className="grid gap-x-12 gap-y-5 md:grid-cols-2">
            {[
              {
                h: "No College Board seal of approval",
                p: "AP and Advanced Placement are their registered trademarks. They have not seen, reviewed or approved anything here.",
              },
              {
                h: "No leaked exam questions",
                p: "Everything is original. If a site is offering you this year's secure items, it is either lying or committing a fairly serious offence on your behalf.",
              },
              {
                h: "Nothing to buy here",
                p: "Nothing is sold, nothing is upsold, there is no email list and there are no ads. It costs nothing to run because it is static files.",
              },
              {
                h: "Your data stays yours",
                p: "No analytics, no cookies, no third-party scripts, and no remote fonts. Real YouTube thumbnails are static images; players and optional sync load only after you choose them.",
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


        </GlassCard>
      </div>
    </>
  );
}
