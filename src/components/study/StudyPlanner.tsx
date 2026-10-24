"use client";

import Link from "next/link";
import { generateStudyPlan, studyPlanToCalendar } from "@/lib/study-plan";
import type { StudyCourse } from "@/lib/study-data";
import type { StudyItem, StudyPlanSettings } from "@/lib/study-model";
import { useStudyState } from "@/lib/use-study-state";
import type { SubjectSlug } from "@/lib/subjects";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function StudyPlanner({ courses, items, selectedCourse, now }: {
  courses: StudyCourse[];
  items: StudyItem[];
  selectedCourse: SubjectSlug | "all";
  now: number;
}) {
  const [study, setStudy] = useStudyState();
  const fallbackSlug = selectedCourse === "all" ? courses[0].slug : selectedCourse;
  const course = courses.find((item) => item.slug === study.plan?.courseSlug) ?? courses.find((item) => item.slug === fallbackSlug) ?? courses[0];
  const settings: StudyPlanSettings = study.plan ?? { courseSlug: course.slug, minutes: 25, days: [1, 3, 6], createdAt: now };
  const dueCount = items.filter((item) => item.courseSlug === course.slug && (study.reviews[item.id]?.due ?? Infinity) <= now).length;
  const days = generateStudyPlan(course, { ...settings, courseSlug: course.slug }, dueCount, now);
  const examTime = Date.parse(`${course.examDate}T23:59:59`);
  const daysLeft = Math.ceil((examTime - now) / 86_400_000);

  const update = (patch: Partial<StudyPlanSettings>) => setStudy((current) => ({
    ...current,
    plan: { ...settings, ...patch, createdAt: current.plan?.createdAt ?? now },
  }));
  const download = () => {
    const blob = new Blob([studyPlanToCalendar(course, days)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = `${course.slug}-study-plan.ics`; anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section aria-labelledby="study-plan-heading">
      <div className="panel-heading"><div><p className="label">Personal study plan</p><h2 id="study-plan-heading">{days.length} active {days.length === 1 ? "day" : "days"}, built around your time</h2><p>Lessons, review, and practice come from the selected course. Change any input and the plan and calendar regenerate.</p></div><button type="button" className="btn btn-solid btn-sm" onClick={download} disabled={days.length === 0}>Export calendar (.ics)</button></div>

      <div className="planner-settings">
        <label><span className="label">Course & deadline</span><select className="field mt-2" value={course.slug} onChange={(event) => update({ courseSlug: event.target.value as SubjectSlug })}>{courses.map((item) => <option key={item.slug} value={item.slug}>{item.label} · {item.examDate}</option>)}</select></label>
        <label><span className="label">Minutes per active day</span><select className="field mt-2" value={settings.minutes} onChange={(event) => update({ minutes: Number(event.target.value) as StudyPlanSettings["minutes"] })}>{[15, 25, 40, 60].map((minutes) => <option key={minutes} value={minutes}>{minutes} minutes</option>)}</select></label>
        <fieldset><legend className="label">Available weekdays</legend><div className="weekday-picker">{weekdays.map((day, index) => <button key={day} type="button" aria-pressed={settings.days.includes(index)} disabled={settings.days.length === 1 && settings.days.includes(index)} onClick={() => update({ days: settings.days.includes(index) ? settings.days.filter((value) => value !== index) : [...settings.days, index].sort() })}>{day}</button>)}</div></fieldset>
        <div className="deadline-note"><span className="label">{course.examLabel}</span><strong>{daysLeft >= 0 ? `${daysLeft} days` : "Date passed"}</strong><p>{course.examDate} · up to 14 active days, stopping at this deadline</p></div>
      </div>

      <div className="plan-days">
        {days.length === 0 ? <div className="study-empty"><h3>No active days before this deadline</h3><p>Choose a course with an upcoming date, or move the available weekdays to include a day before the deadline.</p></div> : null}
        {days.map((day, dayIndex) => {
          const complete = day.tasks.filter((task) => study.completedPlanItems[task.id]).length;
          return <details key={day.date} open={dayIndex < 2} className="plan-day">
            <summary><span><strong>{new Date(`${day.date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</strong><small>{day.tasks.reduce((sum, task) => sum + task.minutes, 0)} minutes</small></span><span className="label">{complete}/{day.tasks.length} complete</span></summary>
            <ol>{day.tasks.map((task) => <li key={task.id} data-complete={Boolean(study.completedPlanItems[task.id])}>
              <input type="checkbox" id={`plan-${task.id}`} checked={Boolean(study.completedPlanItems[task.id])} onChange={(event) => setStudy((current) => {
                const completedPlanItems = { ...current.completedPlanItems };
                if (event.target.checked) completedPlanItems[task.id] = now; else delete completedPlanItems[task.id];
                return { ...current, completedPlanItems };
              })} />
              <label htmlFor={`plan-${task.id}`}><span className="label">{task.kind} · {task.minutes} min</span><strong>{task.title}</strong><p>{task.detail}</p><Link href={task.href}>Open task →</Link></label>
            </li>)}</ol>
          </details>;
        })}
      </div>
    </section>
  );
}
