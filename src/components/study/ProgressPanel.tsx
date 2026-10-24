"use client";

import Link from "next/link";
import type { StudyCourse } from "@/lib/study-data";
import { getWeeklySummary, localDateKey, objectiveStudyId } from "@/lib/study-model";
import { useStudyState } from "@/lib/use-study-state";
import type { SubjectSlug } from "@/lib/subjects";
import type { StudyItem } from "@/lib/study-model";

export function ProgressPanel({ items, courses, selectedCourse, now }: {
  items: StudyItem[];
  courses: StudyCourse[];
  selectedCourse: SubjectSlug | "all";
  now: number;
}) {
  const [study] = useStudyState();
  const events = study.events.filter((event) => selectedCourse === "all" || event.courseSlug === selectedCourse);
  const summary = getWeeklySummary(events, now);
  const maxDaily = Math.max(1, ...summary.days.map((day) => day.count));
  const visibleCourses = courses.filter((course) => selectedCourse === "all" || course.slug === selectedCourse);
  const itemById = new Map(items.map((item) => [item.id, item]));
  const skills = new Map<string, { skill: string; attempts: number; correct: number; href?: string; course: string }>();
  for (const event of events.filter((item) => item.at >= now - 30 * 86_400_000 && item.itemId && item.correct !== undefined)) {
    const item = itemById.get(event.itemId!);
    if (!item) continue;
    const key = `${item.courseSlug}:${item.skill || item.kind}`;
    const row = skills.get(key) ?? { skill: item.skill || item.kind, attempts: 0, correct: 0, href: item.lessonHref, course: item.courseLabel };
    row.attempts += 1; if (event.correct) row.correct += 1; skills.set(key, row);
  }
  const skillRows = [...skills.values()].sort((a, b) => a.correct / a.attempts - b.correct / b.attempts || b.attempts - a.attempts);
  const forecast = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(now); date.setHours(12, 0, 0, 0); date.setDate(date.getDate() + index + 1);
    const key = localDateKey(date);
    const count = Object.entries(study.reviews).filter(([id, review]) => localDateKey(review.due) === key && (selectedCourse === "all" || itemById.get(id)?.courseSlug === selectedCourse)).length;
    return { key, label: date.toLocaleDateString("en-US", { weekday: "short" }), count };
  });

  return (
    <div>
      <section aria-labelledby="weekly-summary-heading">
        <div className="panel-heading"><div><p className="label">Last seven days</p><h2 id="weekly-summary-heading">A useful weekly summary</h2><p>Counts describe activity on this site only. Accuracy is not an AP score prediction.</p></div></div>
        <div className="summary-stats">
          <div><strong>{summary.attempts}</strong><span>retrieval attempts</span></div>
          <div><strong>{summary.attempts ? Math.round((summary.correct / summary.attempts) * 100) : 0}%</strong><span>{summary.correct}/{summary.attempts} correct</span></div>
          <div><strong>{summary.minutes}</strong><span>focus + writing minutes</span></div>
          <div><strong>{summary.activeDays}/7</strong><span>active days</span></div>
        </div>
        <p className="progress-footnote" style={{ marginTop: "-0.5rem" }}>
          {summary.videos} unit-video {summary.videos === 1 ? "session" : "sessions"} logged this week. Watching is useful only if you retrieve the idea afterwards.
        </p>
        <div className="weekly-chart" role="img" aria-label={`Daily activity: ${summary.days.map((day) => `${day.label} ${day.count}`).join(", ")}`}>
          {summary.days.map((day) => <div key={day.key}><span className="chart-count">{day.count || ""}</span><span className="chart-bar-track"><span className="chart-bar" style={{ height: `${Math.max(day.count ? 8 : 2, (day.count / maxDaily) * 100)}%` }} /></span><span>{day.label}</span></div>)}
        </div>
      </section>

      <div className="progress-two-col">
        <section aria-labelledby="objective-progress-heading">
          <p className="label">Explain → apply → teach</p><h3 id="objective-progress-heading">Objective confidence</h3>
          <div className="objective-course-list">{visibleCourses.map((course) => {
            const objectives = course.units.flatMap((unit) => unit.objectives.map((_, index) => objectiveStudyId(course.slug, unit.unitNumber, index)));
            const rated = objectives.map((id) => study.objectives[id] ?? 0);
            const average = rated.length ? rated.reduce<number>((sum, level) => sum + level, 0) / (rated.length * 3) : 0;
            const teach = rated.filter((level) => level === 3).length;
            return <article key={course.slug}><div><strong>{course.label}</strong><span>{teach}/{rated.length} at teach level</span></div><div className="objective-progress-track" role="progressbar" aria-label={`${course.label} average objective confidence`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(average * 100)}><span style={{ width: `${average * 100}%` }} /></div><p>{rated.filter((level) => level > 0).length} rated · {rated.filter((level) => level === 0).length} not yet rated</p></article>;
          })}</div>
        </section>

        <section aria-labelledby="review-forecast-heading">
          <p className="label">Next seven days</p><h3 id="review-forecast-heading">Review forecast</h3>
          <ol className="forecast-list">{forecast.map((day) => <li key={day.key}><span>{day.label}<small>{day.key.slice(5)}</small></span><strong>{day.count}</strong></li>)}</ol>
          <p className="progress-footnote">Only scheduled future reviews appear here; new cards and questions join through the deterministic daily introduction.</p>
        </section>
      </div>

      <section className="skill-summary" aria-labelledby="skill-summary-heading">
        <p className="label">Last thirty days</p><h3 id="skill-summary-heading">Skills that need another pass</h3>
        {skillRows.length ? <ol>{skillRows.slice(0, 8).map((row) => <li key={`${row.course}:${row.skill}`}><div><strong>{row.skill}</strong><span>{row.course} · {row.correct}/{row.attempts} correct</span></div><span className="skill-meter"><span style={{ width: `${(row.correct / row.attempts) * 100}%` }} /></span>{row.href ? <Link href={row.href}>Review lesson →</Link> : null}</li>)}</ol> : <div className="study-empty"><p>Complete practice or Due Today items to build a skill-level summary. One attempt is shown as one attempt, not as a broad claim about mastery.</p></div>}
      </section>
    </div>
  );
}
