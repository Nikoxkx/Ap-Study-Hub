import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalog, getCourse } from "@/lib/catalog";
import { getAssessment } from "@/lib/exams";
import { PrintButton } from "@/components/PrintButton";
import { absoluteUrl } from "@/lib/site";

/**
 * Printable answer sheet.
 *
 * A paper exam is answered on a separate sheet: bubbles for the multiple-choice
 * section, ruled space for the written tasks, and nothing that gives anything
 * away. This page exists so the paper can be sat with a pen, and so a marked
 * paper can be re-sat without printing the questions again.
 */

type Params = Promise<{ slug: string }>;

const LETTERS = ["A", "B", "C", "D", "E"];

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest} min`;
  return rest ? `${hours} h ${rest} m` : `${hours} h`;
}

export function generateStaticParams() {
  return getCatalog().map((course) => ({ slug: course.subject.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    title: `${course.subject.familiar} printable answer sheet`,
    description: `A blank answer sheet for the ${course.subject.familiar} interim assessment: one bubble grid per multiple-choice section and ruled space for every written task.`,
    alternates: { canonical: `/course/${course.subject.slug}/exam/answers` },
    openGraph: {
      title: `${course.subject.familiar} printable answer sheet`,
      url: absoluteUrl(`/course/${course.subject.slug}/exam/answers`),
    },
    robots: { index: false, follow: true },
  };
}

export default async function AnswerSheetPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  const assessment = getAssessment(slug);
  if (!course || !assessment) notFound();

  const { subject } = course;
  const base = `/course/${subject.slug}`;
  const mcqSections = assessment.sections.filter((section) => section.type === "mcq");
  const frqSections = assessment.sections.filter((section) => section.type === "frq");
  const totalMcq = mcqSections.reduce((sum, section) => sum + section.questions.length, 0);
  const totalFrq = frqSections.reduce((sum, section) => sum + section.frqs.length, 0);

  return (
    <div className="wrap py-8 md:py-12">
      <div className="answer-sheet">
        <nav className="no-print mb-6 flex flex-wrap items-center gap-3 text-sm">
          <Link href={`${base}/exam`} className="btn btn-quiet btn-sm">
            ← The paper
          </Link>
          <Link href={`${base}/notes`} className="link-underlined">
            Lessons
          </Link>
          <PrintButton />
        </nav>

        <header className="answer-sheet-head">
          <p className="label">Interim assessment · answer sheet</p>
          <h1>{subject.official}</h1>
          <p className="answer-sheet-meta">
            {formatDuration(assessment.totalMinutes)} ·{" "}
            {assessment.mcqCount ? `${assessment.mcqCount} multiple-choice · ` : ""}
            {assessment.frqCount} written · {assessment.totalPoints} rubric points
          </p>
          <div className="answer-sheet-fields">
            <span>Name ______________________________</span>
            <span>Date ______________</span>
            <span>Period ______</span>
          </div>
          <p className="answer-sheet-directions">
            {mcqSections.length
              ? "Shade one letter per question. If you change an answer, cross out the old bubble and shade the new one, and do not write in the margins beside the grid. "
              : ""}
            Written tasks go in the ruled boxes, one task per box, and nothing outside the box is read. This
            sheet is for practice; it is not scored by a machine.
          </p>
        </header>

        {mcqSections.map((section) => {
          if (!section.questions.length) return null;
          const sectionNumber = assessment.sections.indexOf(section) + 1;
          return (
            <section key={section.id} className="answer-sheet-section">
              <h2>
                Section {sectionNumber} · {section.name}
              </h2>
              <p className="answer-sheet-note">
                {section.questions.length} questions · {section.minutes} minutes
                {section.calculator ? ` · calculator ${section.calculator.replace("-", " ")}` : ""}
              </p>
              <ol className="answer-sheet-grid">
                {section.questions.map((question, index) => (
                  <li key={question.key}>
                    <span className="answer-sheet-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="answer-sheet-bubbles" aria-hidden="true">
                      {LETTERS.slice(0, question.options.length).map((letter) => (
                        <span key={letter} className="answer-sheet-bubble">
                          {letter}
                        </span>
                      ))}
                    </span>
                    <span className="sr-only">
                      Question {index + 1}, options {LETTERS.slice(0, question.options.length).join(", ")}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}

        {frqSections.map((section) => (
          <section key={section.id} className="answer-sheet-section answer-sheet-written">
            <h2>
              Section {assessment.sections.indexOf(section) + 1} · {section.name}
            </h2>
            <p className="answer-sheet-note">
              {section.frqs.length} task{section.frqs.length === 1 ? "" : "s"} · {section.minutes} minutes ·{" "}
              {section.weight}% of the score
            </p>
            {section.frqs.map((frq, index) => (
              <article key={frq.id} className="answer-sheet-task">
                <header>
                  <span className="label">
                    Task {index + 1} · {frq.taskType} · {frq.points} points · {frq.minutes} min suggested
                  </span>
                  <h3>{frq.title}</h3>
                </header>
                <p className="answer-sheet-prompt">
                  Write your response to the prompt printed in the paper. Reminder of the task: {frq.prompt}
                </p>
                <div className="answer-sheet-lines" aria-label={`Ruled space for ${frq.title}`} />
              </article>
            ))}
          </section>
        ))}

        <footer className="answer-sheet-foot">
          <p>
            {totalMcq ? `${totalMcq} multiple-choice · ` : ""}
            {totalFrq} written · {assessment.stimuli.length} printed source
            {assessment.stimuli.length === 1 ? "" : "s"}. Score it by hand from the rubric on the paper, or
            retype the responses into the digital paper for row-by-row marking.
          </p>
          <p>
            Original practice written in the published format. Not a released College Board exam. Cut scores are
            estimates.
          </p>
        </footer>
      </div>
    </div>
  );
}
