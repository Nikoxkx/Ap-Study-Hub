"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { StudyCourse } from "@/lib/study-data";
import { addStudyEvent, type StudyItem } from "@/lib/study-model";
import { useStudyState } from "@/lib/use-study-state";
import type { SubjectSlug } from "@/lib/subjects";
import { ReviewSession } from "./ReviewSession";
import { ObjectiveTracker } from "@/components/ObjectiveTracker";

function clock(seconds: number) {
  const safe = Math.max(0, seconds);
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}

export function FocusSession({ courses, items, reviewItems, selectedCourse, now }: {
  courses: StudyCourse[];
  items: StudyItem[];
  reviewItems: StudyItem[];
  selectedCourse: SubjectSlug | "all";
  now: number;
}) {
  const [slug, setSlug] = useState<SubjectSlug>(selectedCourse === "all" ? courses[0].slug : selectedCourse);
  const [duration, setDuration] = useState(25);
  const [phase, setPhase] = useState<"idle" | "running" | "complete">("idle");
  const [step, setStep] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [startedAt, setStartedAt] = useState(0);
  const [remaining, setRemaining] = useState(duration * 60);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [, setStudy] = useStudyState();
  const course = courses.find((item) => item.slug === slug) ?? courses[0];
  const queue = reviewItems.filter((item) => item.courseSlug === course.slug);
  const practiceCount = items.filter((item) => item.courseSlug === course.slug && item.kind === "question").length;
  const dayIndex = Math.floor((startedAt || now) / 86_400_000);
  const unit = course.units[dayIndex % course.units.length];

  const finish = useCallback(() => {
    if (phase !== "running") return;
    const minutes = Math.max(1, Math.round((Date.now() - startedAt) / 60_000));
    setPhase("complete"); setRemaining(0); setElapsedMinutes(minutes);
    setStudy((current) => addStudyEvent(current, { at: Date.now(), type: "focus", courseSlug: course.slug, minutes }));
  }, [phase, startedAt, course.slug, setStudy]);

  useEffect(() => {
    if (phase !== "running") return;
    const tick = () => {
      const left = Math.round((deadline - Date.now()) / 1000);
      setRemaining(left);
      if (left <= 0) finish();
    };
    tick();
    const id = window.setInterval(tick, 500);
    return () => window.clearInterval(id);
  }, [phase, deadline, finish]);

  const start = () => {
    const current = Date.now();
    setStartedAt(current); setDeadline(current + duration * 60_000); setRemaining(duration * 60); setStep(0); setPhase("running");
  };

  return (
    <section aria-labelledby="focus-heading">
      <div className="panel-heading"><div><p className="label">Focus Session</p><h2 id="focus-heading">Recall → explain → apply</h2><p>A deadline-based timer stays accurate in a background tab. The steps use this course’s current queue and objectives.</p></div>{phase !== "idle" ? <p className="focus-clock" data-low={remaining <= 60}>{clock(remaining)}</p> : null}</div>

      {phase === "idle" ? <div className="focus-setup">
        <label><span className="label">Course</span><select className="field mt-2" value={slug} onChange={(event) => setSlug(event.target.value as SubjectSlug)}>{courses.map((item) => <option key={item.slug} value={item.slug}>{item.label}</option>)}</select></label>
        <fieldset><legend className="label">Session length</legend><div className="segmented">{[15, 25, 40].map((minutes) => <button key={minutes} type="button" aria-pressed={duration === minutes} onClick={() => { setDuration(minutes); setRemaining(minutes * 60); }}>{minutes} min</button>)}</div></fieldset>
        <div className="focus-preview"><p>1 · Retrieve up to {Math.max(3, Math.round(duration / 5))} due items</p><p>2 · Explain {unit.title} objectives</p><p>3 · Apply in the {course.label} studio</p></div>
        <button type="button" className="btn btn-solid" onClick={start}>Start Focus Session</button>
      </div> : null}

      {phase === "running" ? <div className="focus-running">
        <ol className="focus-steps">{["Recall", "Explain", "Apply"].map((label, index) => <li key={label}><button type="button" aria-current={step === index ? "step" : undefined} onClick={() => setStep(index)}><span>{index + 1}</span>{label}</button></li>)}</ol>
        {step === 0 ? <ReviewSession key={`${course.slug}-${startedAt}`} items={queue} limit={Math.max(3, Math.round(duration / 5))} onComplete={() => setStep(1)} /> : null}
        {step === 1 ? <div className="focus-lesson">
          <p className="label">Explain without copying</p><h3>Lesson {unit.unitNumber} · {unit.title}</h3><p>{unit.description}</p>
          <p className="focus-instruction">Say or write an explanation for each objective, then rate the highest level you can demonstrate.</p>
          <ol>{unit.objectives.map((objective, index) => <li key={objective}><ObjectiveTracker courseSlug={course.slug} unitNumber={unit.unitNumber} index={index} objective={objective} /></li>)}</ol>
          <div className="mt-5 flex flex-wrap gap-3"><Link href={`/course/${course.slug}/notes#unit-${unit.unitNumber}`} target="_blank" className="link-underlined">Open lesson in a new tab ↗</Link><button type="button" className="btn btn-solid btn-sm" onClick={() => setStep(2)}>Continue to apply</button></div>
        </div> : null}
        {step === 2 ? <div className="focus-apply">
          <p className="label">Apply in a new context</p><h3>Choose production, not more recognition</h3><p>Use a new tab so this timer keeps running. Return when you have a draft, graph, conclusion, or set of answers to inspect.</p>
          <div className="focus-apply-links"><Link href={`/course/${course.slug}/studio?tab=lab`} target="_blank">Interactive lab ↗<span>Change a parameter, annotate evidence, or defend a conclusion.</span></Link><Link href={`/course/${course.slug}/studio?tab=writing`} target="_blank">Writing studio ↗<span>Produce a timed response and compare it with the criteria.</span></Link><Link href={`/course/${course.slug}/practice`} target="_blank">Practice ↗<span>Work from the course bank of {practiceCount} questions.</span></Link></div>
          <button type="button" className="btn btn-solid btn-sm mt-5" onClick={finish}>Finish & record session</button>
        </div> : null}
        <button type="button" className="btn btn-quiet btn-sm mt-6" onClick={finish}>End session early</button>
      </div> : null}

      {phase === "complete" ? <div className="study-empty"><p className="label">Session recorded</p><h3>{elapsedMinutes}-minute focus block recorded</h3><p>The elapsed time is in your weekly summary. Objective ratings and every reviewed item were saved as you worked.</p><button type="button" className="btn btn-outline btn-sm" onClick={() => setPhase("idle")}>Plan another session</button></div> : null}
    </section>
  );
}
