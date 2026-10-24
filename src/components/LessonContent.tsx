import Link from "next/link";
import type { Lesson, SourceId } from "@/content/lessons";
import { getSource } from "@/content/lessons";
import { ExternalLink } from "@/components/Furniture";
import { Markdown, slugify } from "@/lib/markdown";
import { getWorkedExamples } from "@/content/worked";
import { WorkedPaper } from "@/components/WorkedPaper";
import { ObjectiveTracker } from "@/components/ObjectiveTracker";

/**
 * Structured lesson body. Paragraphs stay separate instead of being collapsed
 * into one Markdown blob, and every teaching section carries a traceable source
 * reference into the lesson's bibliography.
 */
export function LessonContent({ lesson, courseSlug }: { lesson: Lesson; courseSlug: string }) {
  const sourceIds = [...new Set<SourceId>([
    ...lesson.sections.flatMap((section) => section.sources),
    ...lesson.examAlignment.sources,
  ])];
  const sourceNumber = (id: SourceId) => sourceIds.indexOf(id) + 1;

  return (
    <>
      <section aria-labelledby={`unit-${lesson.unitNumber}-objectives`} className="sunk mb-10 p-5">
        <h4 id={`unit-${lesson.unitNumber}-objectives`} className="label mb-3">
          By the end of this lesson, you should be able to
        </h4>
        <ol className="space-y-3">
          {lesson.objectives.map((objective, index) => (
            <li key={objective}>
              <ObjectiveTracker
                courseSlug={courseSlug}
                unitNumber={lesson.unitNumber}
                index={index}
                objective={objective}
              />
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[0.75rem]" style={{ color: "var(--ink-faint)" }}>
          Rate what you can do, not what feels familiar. These choices stay on this device and shape your progress map.
        </p>
      </section>

      <div className="prose">
        {lesson.sections.map((section, sectionIndex) => {
          const sectionId = `unit-${lesson.unitNumber}-section-${slugify(section.heading)}`;
          return (
            <section key={section.heading} aria-labelledby={sectionId} className="mb-10 scroll-mt-32">
              <h4 id={sectionId}>{section.heading}</h4>
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <Markdown
                  key={`${sectionIndex}-${paragraphIndex}`}
                  source={paragraph}
                  idPrefix={`u${lesson.unitNumber}s${sectionIndex}p${paragraphIndex}-`}
                />
              ))}
              <p className="source-line">
                <span className="sr-only">Sources for this section: </span>
                {section.sources.map((id) => {
                  const source = getSource(id);
                  return (
                    <a
                      key={id}
                      href={`#unit-${lesson.unitNumber}-source-${sourceNumber(id)}`}
                      aria-label={`Source ${sourceNumber(id)}: ${source.title}`}
                      className="source-ref"
                    >
                      [{sourceNumber(id)}]
                    </a>
                  );
                })}
              </p>
            </section>
          );
        })}
      </div>

      {getWorkedExamples(courseSlug, lesson.unitNumber).length > 0 ? (
        <section aria-labelledby={`unit-${lesson.unitNumber}-worked`} className="mb-12">
          <h4 id={`unit-${lesson.unitNumber}-worked`} className="mb-4 rule-top pt-6 text-[1.125rem]">
            Worked solution & scratch work
          </h4>
          <p className="mb-5 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
            Cover the steps and try the problem first. Then compare both the notation and the reason for each line.
          </p>
          {getWorkedExamples(courseSlug, lesson.unitNumber).map((example) => (
            <WorkedPaper key={example.id} example={example} />
          ))}
        </section>
      ) : null}

      <section aria-labelledby={`unit-${lesson.unitNumber}-glossary`} className="mb-10 rule-top pt-6">
        <h4 id={`unit-${lesson.unitNumber}-glossary`} className="mb-4 text-[1.125rem]">
          Lesson glossary
        </h4>
        <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {lesson.glossary.map((entry) => (
            <div key={entry.term}>
              <dt className="text-[0.9375rem] font-semibold">{entry.term}</dt>
              <dd className="mt-1 text-[0.875rem]" style={{ color: "var(--ink-soft)", margin: 0 }}>
                {entry.definition}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <aside aria-labelledby={`unit-${lesson.unitNumber}-alignment`} className="sheet-tabbed mb-10 p-5 sm:p-6">
        <p className="label mb-2">Exam & rubric connection</p>
        <h4 id={`unit-${lesson.unitNumber}-alignment`} className="text-[1.1875rem]">
          {lesson.examAlignment.title}
        </h4>
        <p className="mt-2 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
          {lesson.examAlignment.description}
        </p>
        <ul className="mt-4 space-y-2">
          {lesson.examAlignment.criteria.map((criterion) => (
            <li key={criterion} className="flex gap-2.5 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
              <span aria-hidden="true" style={{ color: "var(--subject-ink)" }}>→</span>
              <span>{criterion}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[0.75rem]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
          Scoring references: {lesson.examAlignment.sources.map((id) => `[${sourceNumber(id)}]`).join(" ")}
        </p>
      </aside>

      <section aria-labelledby={`unit-${lesson.unitNumber}-sources`} className="mb-9 rule-top pt-6">
        <h4 id={`unit-${lesson.unitNumber}-sources`} className="mb-4 text-[1.125rem]">
          Sources for this lesson
        </h4>
        <ol className="space-y-4">
          {sourceIds.map((id) => {
            const source = getSource(id);
            return (
              <li
                key={id}
                id={`unit-${lesson.unitNumber}-source-${sourceNumber(id)}`}
                className="flex scroll-mt-32 gap-3"
              >
                <span aria-hidden="true" className="shrink-0 text-[0.75rem] tabular-nums" style={{ fontFamily: "var(--font-mono)", color: "var(--subject-ink)" }}>
                  [{sourceNumber(id)}]
                </span>
                <div>
                  <p className="text-[0.875rem] font-semibold">
                    <ExternalLink href={source.url} className="link-draw">
                      {source.title}
                    </ExternalLink>
                  </p>
                  <p className="mt-1 text-[0.8125rem]" style={{ color: "var(--ink-soft)" }}>
                    {source.publisher} · {source.kind}. {source.description}
                  </p>
                  <p className="mt-1 text-[0.6875rem]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
                    Reviewed {source.checked}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <p className="sunk p-4 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
        Ready to retrieve it? Try the{" "}
        <Link href={`/course/${courseSlug}/practice?unit=${lesson.unitNumber}`} className="link-underlined" style={{ color: "var(--ink)" }}>
          {lesson.practice.length} original practice questions for this lesson
        </Link>
        . They are not released College Board items.
      </p>
    </>
  );
}
