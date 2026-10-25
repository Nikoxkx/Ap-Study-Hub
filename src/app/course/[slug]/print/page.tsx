import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse, getCatalog } from "@/lib/catalog";
import { getSource } from "@/content/lessons";
import { getWorkedExamples } from "@/content/worked";
import { Markdown } from "@/lib/markdown";
import { MathAwareText } from "@/lib/math";
import { WorkedPaper } from "@/components/WorkedPaper";
import { PrintButton } from "@/components/PrintButton";

export function generateStaticParams() {
  return getCatalog().map((course) => ({ slug: course.subject.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  return { title: course ? `${course.subject.familiar} printable study packet` : "Printable packet", robots: { index: false, follow: true } };
}

export default async function PrintPacketPage({ params, searchParams }: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ unit?: string | string[] }>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const course = getCourse(slug);
  if (!course) notFound();
  const rawUnit = Array.isArray(query.unit) ? query.unit[0] : query.unit;
  const parsed = Number(rawUnit);
  const units = course.units.filter((unit) => !rawUnit || unit.unitNumber === parsed);
  if (units.length === 0) notFound();
  const base = `/course/${course.subject.slug}`;
  const questions = course.questions.filter((question) => units.some((unit) => unit.unitNumber === question.unitNumber));
  const letters = ["A", "B", "C", "D", "E", "F"];

  return (
    <div className="print-packet">
      <nav className="packet-toolbar no-print" aria-label="Packet options">
        <Link href={`${base}/studio`} className="btn btn-quiet btn-sm">← Studio</Link>
        <div className="packet-unit-links">
          <Link href={`${base}/print`} aria-current={!rawUnit ? "page" : undefined}>Whole course</Link>
          {course.units.map((unit) => <Link key={unit.unitNumber} href={`${base}/print?unit=${unit.unitNumber}`} aria-current={Number(rawUnit) === unit.unitNumber ? "page" : undefined}>Lesson {unit.unitNumber}</Link>)}
        </div>
        <PrintButton />
      </nav>

      <header className="packet-cover">
        <p className="label">AP Study Hub · printable study packet</p>
        <h1>{course.subject.official}</h1>
        <p>{rawUnit ? units[0].title : `${course.counts.units} lessons · notes, worked examples, retrieval practice, and answer key`}</p>
        <div className="packet-meta"><span>Name ____________________</span><span>Date ____________</span><span>{course.subject.exam.date} · {course.subject.exam.window}</span></div>
        <p className="packet-directions">Read with a pen. Cover worked lines before revealing them, complete the retrieval section without the key, and write the reason for every correction. Original practice; not released College Board material.</p>
      </header>

      {units.map((unit) => {
        const lesson = unit.lesson;
        if (!lesson) return null;
        const sourceIds = [...new Set(lesson.sections.flatMap((section) => section.sources))];
        return <article key={unit.unitNumber} className="packet-lesson">
          <header><p className="folio">Lesson {String(unit.unitNumber).padStart(2, "0")}</p><h2>{unit.title}</h2><p>{unit.description}</p></header>
          <section className="packet-objectives"><h3>Objectives</h3><ol>{lesson.objectives.map((objective) => <li key={objective}>☐ {objective}</li>)}</ol></section>
          <div className="prose packet-notes">
            {lesson.sections.map((section) => <section key={section.heading}><h3>{section.heading}</h3>{section.paragraphs.map((paragraph, index) => <Markdown key={index} source={paragraph} idPrefix={`packet-${unit.unitNumber}-${index}-`} />)}</section>)}
          </div>
          {getWorkedExamples(course.subject.slug, unit.unitNumber).map((example) => <WorkedPaper key={example.id} example={example} defaultOpen />)}
          <section className="packet-sources"><h3>Sources for this lesson</h3><ul>{sourceIds.map((id) => { const source = getSource(id); return <li key={id}><a href={source.url}>{source.title}</a> · {source.publisher}</li>; })}</ul></section>
        </article>;
      })}

      {questions.length ? <section className="packet-practice">
        <header><p className="folio">Retrieval</p><h2>Try it before you peek</h2><p>Answer every item, then mark the reasoning you used. The key begins on a separate page.</p></header>
        <ol>{questions.map((question, index) => <li key={question.id} className="packet-question">
          <p><strong>{index + 1}.</strong> <MathAwareText>{question.question}</MathAwareText></p>
          <ol type="A">{question.options.map((option, optionIndex) => <li key={optionIndex}><MathAwareText>{option}</MathAwareText></li>)}</ol>
          <p className="packet-reason">Reason / evidence: __________________________________________________________</p>
        </li>)}</ol>
      </section> : null}

      {questions.length ? <section className="packet-answer-key">
        <header><p className="folio">Separate key</p><h2>Why the answer works</h2><p>Do not only change the letter. Write why the correct answer works and why your original choice did not.</p></header>
        <ol>{questions.map((question, index) => <li key={question.id}>
          <p><strong>{index + 1}. {letters[question.correctIndex]} — <MathAwareText>{question.options[question.correctIndex]}</MathAwareText></strong></p>
          <p><MathAwareText>{question.explanation}</MathAwareText></p>
          {question.unitNumber ? <Link href={`${base}/notes#unit-${question.unitNumber}`}>Review lesson {question.unitNumber} · {question.lessonTitle}</Link> : null}
        </li>)}</ol>
      </section> : null}
    </div>
  );
}
