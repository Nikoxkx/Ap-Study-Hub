import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCatalog, getCourse } from "@/lib/catalog";
import { GlassCard } from "@/components/ui/GlassCard";
import { DefensePanel } from "@/components/DefensePanel";
import { getCourseDefense, getUnitDefense, getWrittenWork } from "@/content/written-work";
import { defenseTasks } from "@/content/plain-language";
import { defenseScript, voiceRules } from "@/content/humanize";
import { absoluteUrl, socialImages } from "@/lib/site";

/**
 * One page per course that answers a question no revision guide answers:
 * what do you actually say when someone asks how you know?
 */

export function generateStaticParams() {
  return getCatalog().map((course) => ({ slug: course.subject.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  const title = `How to defend your ${course.subject.familiar} work`;
  const description = `Unit by unit: what to keep as evidence, the question that actually gets asked, and the words to answer with. ${course.counts.units} defenses for ${course.subject.official}.`;
  return {
    title,
    description,
    alternates: { canonical: `/course/${course.subject.slug}/defense` },
    openGraph: {
      images: socialImages,
      title: `${title} · AP Study Hub`,
      description,
      url: absoluteUrl(`/course/${course.subject.slug}/defense`),
    },
    twitter: { card: "summary_large_image", images: socialImages },
  };
}

export default async function DefensePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const { subject, units } = course;
  const courseDefense = getCourseDefense(subject.slug);
  const task = defenseTasks.find((item) => item.courseSlug === subject.slug);
  const base = `/course/${subject.slug}`;

  return (
    <div className="wrap space-y-10 py-8 md:py-12">
      <GlassCard as="header" padding="lg">
        <p className="label mb-2">Defend your work · {subject.familiar}</p>
        <h2 className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)] font-semibold" style={{ letterSpacing: "-0.025em" }}>
          How to defend a {subject.familiar} answer out loud
        </h2>
        <p className="lede mt-3">
          Every unit in this course comes with a written answer and a spoken defense. This page puts the
          defenses in one place: what to keep as evidence, what a teacher actually asks, and the words to
          answer with — in the order you would say them.
        </p>

        {task ? (
          <div className="defense-two-col mt-6 !mb-0">
            <div className="defense-cell">
              <p className="label mb-1.5">What {subject.familiar} is really asking you to stand behind</p>
              <p>{task.standBehind}</p>
            </div>
            <div className="defense-cell">
              <p className="label mb-1.5">The question that cannot be answered from memory</p>
              <p className="defense-question">{task.hardestQuestion}</p>
              <p className="mt-2">
                <span className="label mr-2">Start with</span>
                &ldquo;{task.opener}&rdquo;
              </p>
            </div>
          </div>
        ) : null}
      </GlassCard>

      <GlassCard padding="lg">
        <p className="label mb-2">01 · The three sentences that carry a defense</p>
        <h3 className="mb-3 text-[1.3rem] font-semibold">Say what you did, why, and where it is weak</h3>
        <p className="mb-4 max-w-[68ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
          {`A defense that only reports steps sounds like a recital. The sentence that earns the nod is the third one — the one that names the weak joint before anybody else finds it.`}
        </p>
        <div className="defense-body !mb-0">
          <div className="defense-cell">
            <p className="label mb-2">The recipe</p>
            <ol className="defense-steps">
              <li>
                <span className="defense-step-number" aria-hidden="true">1</span>
                <span>What I did: the first decision, and the reason for it.</span>
              </li>
              <li>
                <span className="defense-step-number" aria-hidden="true">2</span>
                <span>Why it works: the step, rule, source or mechanism that makes it legal.</span>
              </li>
              <li>
                <span className="defense-step-number" aria-hidden="true">3</span>
                <span>Where it is weak: the assumption, the limit, or the thing you would check next.</span>
              </li>
            </ol>
          </div>
          <div className="defense-cell defense-answer">
            <p className="label mb-2">If you get stuck, borrow one</p>
            <ul className="defense-script-list">
              {[...defenseScript.opener, ...defenseScript.middle, ...defenseScript.repair].slice(0, 6).map((line) => (
                <li key={line}>&ldquo;{line}&rdquo;</li>
              ))}
            </ul>
          </div>
        </div>
      </GlassCard>

      <section aria-labelledby="unit-defenses">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="label mb-1.5">02 · Unit by unit</p>
            <h3 id="unit-defenses" className="text-[1.35rem] font-semibold">
              {units.length} defenses, in syllabus order
            </h3>
          </div>
          <p className="text-[0.8125rem]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
            Keep the evidence · answer the question · admit the limit
          </p>
        </div>

        <div className="space-y-6">
          {units.map((unit) => {
            const work = getWrittenWork(subject.slug, unit.unitNumber)[0];
            return (
              <GlassCard key={unit.unitNumber} as="article" padding="md" className="defense-unit-card" id={`unit-${unit.unitNumber}`}>
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="label">Lesson {String(unit.unitNumber).padStart(2, "0")}</p>
                  <Link
                    href={`${base}/notes#unit-${unit.unitNumber}`}
                    className="link-underlined text-[0.8125rem]"
                  >
                    Open the lesson →
                  </Link>
                </div>
                <h4 className="mb-3 text-[1.0625rem] font-semibold">{unit.title}</h4>
                <DefensePanel
                  subject={subject}
                  courseDefense={courseDefense}
                  unitDefense={getUnitDefense(subject.slug, unit.unitNumber)}
                  compact
                />
                {work ? (
                  <details className="written-model">
                    <summary className="written-model-summary">
                      <span className="label">What a full written answer to this unit looks like</span>
                      <span className="label" aria-hidden="true">+</span>
                    </summary>
                    <div className="written-model-body">
                      <p className="written-prompt">{work.prompt}</p>
                      <p className="mt-2 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                        <strong>Why it earns the mark:</strong> {work.because}
                      </p>
                    </div>
                  </details>
                ) : null}
              </GlassCard>
            );
          })}
        </div>
      </section>

      <GlassCard padding="lg">
        <p className="label mb-2">03 · How this page is written, and why</p>
        <h3 className="mb-3 text-[1.3rem] font-semibold">Plain language on purpose</h3>
        <p className="mb-4 max-w-[68ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
          A defense is unreadable if every sentence is an essay. The rules below are the same ones the
          lessons follow, and they are what university teaching centres, the W3C&apos;s guidance on
          cognitive accessibility and the plain-language movement all converge on.
        </p>
        <dl className="voice-rules">
          {voiceRules.map((rule) => (
            <div key={rule.rule}>
              <dt>{rule.rule}</dt>
              <dd>{rule.detail}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
          Prefer it as a printable sheet?{" "}
          <Link href={`${base}/print`} className="link-underlined">
            Open the packet
          </Link>
          , which puts every defense beside its lesson.
        </p>
      </GlassCard>
    </div>
  );
}
