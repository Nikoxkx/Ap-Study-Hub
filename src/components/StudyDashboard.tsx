"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { StudyCourse } from "@/lib/study-data";
import { generateStudyPlan } from "@/lib/study-plan";
import { DAILY_NEW_ITEMS_PER_COURSE, getReviewQueue, getWeeklySummary, localDateKey, type StudyItem } from "@/lib/study-model";
import { useStudyState } from "@/lib/use-study-state";
import { subjects, subjectVars, type SubjectSlug } from "@/lib/subjects";
import { SubjectMark } from "./SubjectMark";
import { ReviewSession } from "./study/ReviewSession";
import { MistakeNotebook } from "./study/MistakeNotebook";
import { StudyPlanner } from "./study/StudyPlanner";
import { FocusSession } from "./study/FocusSession";
import { ProgressPanel } from "./study/ProgressPanel";
import { DataPanel } from "./study/DataPanel";
import { AdvancedDesk } from "./study/AdvancedDesk";

const tabs = [
  { id: "today", label: "Today" }, { id: "review", label: "Review" },
  { id: "mistakes", label: "Mistakes" }, { id: "plan", label: "Plan" },
  { id: "focus", label: "Focus" }, { id: "progress", label: "Progress" },
  { id: "data", label: "Your data" }, { id: "advanced", label: "Go deeper" },
] as const;
type Tab = typeof tabs[number]["id"];

/** Hero titles are written for a student deciding what to do, not a settings menu. */
const tabHeadings: Record<Tab, string> = {
  today: "What should I do next?",
  review: "Let’s clear the queue",
  mistakes: "Learn from what tripped you up",
  plan: "Make a plan you can actually keep",
  focus: "One lesson, three ways to study",
  progress: "See what your work added up to",
  data: "Your work stays yours",
  advanced: "Set a goal, see the pattern, keep going",
};

export function StudyDashboard({ items, courses, initialTab = "today", initialCourse = "all" }: {
  items: StudyItem[];
  courses: StudyCourse[];
  initialTab?: Tab;
  initialCourse?: SubjectSlug | "all";
}) {
  const [study] = useStudyState();
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [selectedCourse, setSelectedCourse] = useState<SubjectSlug | "all">(initialCourse);
  const [now, setNow] = useState(0);
  useEffect(() => {
    const first = window.setTimeout(() => setNow(Date.now()), 0);
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => { window.clearTimeout(first); window.clearInterval(id); };
  }, []);

  const allItems = useMemo(() => {
    const merged = new Map(items.map((item) => [item.id, item]));
    for (const item of Object.values(study.customItems)) merged.set(item.id, item);
    return [...merged.values()];
  }, [items, study.customItems]);
  const reviewItems = useMemo(() => getReviewQueue(allItems, study, now, selectedCourse === "all" ? undefined : selectedCourse), [allItems, study, now, selectedCourse]);
  const unresolved = Object.values(study.mistakes).filter((mistake) => !mistake.resolvedAt && (selectedCourse === "all" || allItems.find((item) => item.id === mistake.itemId)?.courseSlug === selectedCourse)).length;
  const scheduledDue = allItems.filter((item) => (selectedCourse === "all" || item.courseSlug === selectedCourse) && study.reviews[item.id] && study.reviews[item.id].due <= now).length;
  const weekly = getWeeklySummary(study.events.filter((event) => selectedCourse === "all" || event.courseSlug === selectedCourse), now);
  const selectedSubject = subjects.find((subject) => subject.slug === selectedCourse);
  const nextCourse = selectedCourse === "all"
    ? [...courses].sort((a, b) => a.examDate.localeCompare(b.examDate)).find((course) => Date.parse(`${course.examDate}T23:59:59`) >= now) ?? courses[0]
    : courses.find((course) => course.slug === selectedCourse) ?? courses[0];
  const planCourse = courses.find((course) => course.slug === study.plan?.courseSlug);
  const todayPlan = study.plan && planCourse && now
    ? generateStudyPlan(planCourse, study.plan, scheduledDue, now).find((day) => day.date === localDateKey(now))
    : undefined;

  const updateUrl = (tab: Tab, course: SubjectSlug | "all") => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    if (course === "all") url.searchParams.delete("course"); else url.searchParams.set("course", course);
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  };
  const selectTab = (tab: Tab) => { setActiveTab(tab); updateUrl(tab, selectedCourse); };
  const selectCourse = (course: SubjectSlug | "all") => { setSelectedCourse(course); updateUrl(activeTab, course); };

  return (
    <div className={`study-dashboard ${selectedSubject ? "subject-scope" : ""}`} style={selectedSubject ? subjectVars(selectedSubject) : undefined}>
      <header className="study-hero">
        <div className="study-hero-mark" title={selectedSubject?.symbolLabel ?? "All seven courses"}>{selectedSubject ? <SubjectMark subject={selectedSubject.mark} size={48} label={selectedSubject.symbolLabel} /> : <span className="study-all-mark" aria-hidden="true">A+</span>}</div>
        <div><p className="label">Your private study desk</p><h1>{tabHeadings[activeTab]}</h1><p>One connected queue for lessons, videos, recall, mistakes, writing, and focused work. No account; your progress stays here unless you choose to sync it.</p></div>
        <label className="study-course-select"><span className="label">Course filter</span><select className="field mt-2" value={selectedCourse} onChange={(event) => selectCourse(event.target.value as SubjectSlug | "all")}><option value="all">All seven courses</option>{courses.map((course) => <option key={course.slug} value={course.slug}>{course.label}</option>)}</select></label>
      </header>

      <nav className="study-tabs" aria-label="Study dashboard sections">
        {tabs.map((tab) => <button key={tab.id} type="button" aria-pressed={activeTab === tab.id} onClick={() => selectTab(tab.id)}>{tab.label}{tab.id === "mistakes" && unresolved ? <span>{unresolved}</span> : null}</button>)}
      </nav>

      {!now ? <div className="study-loading" role="status">Opening your private study record…</div> : <>
        {activeTab === "today" ? <div className="today-layout">
          <section className="today-main" aria-labelledby="due-today-heading">
            <div className="panel-heading"><div><p className="label">Due today</p><h2 id="due-today-heading">Warm up with {Math.min(8, reviewItems.length)} things worth remembering</h2><p>{scheduledDue} scheduled or overdue · {unresolved} unresolved mistakes · up to {DAILY_NEW_ITEMS_PER_COURSE} new items per course rotate in deterministically each day.</p></div><button type="button" className="btn btn-quiet btn-sm" onClick={() => selectTab("review")}>Open full queue →</button></div>
            <ReviewSession key={`today-${selectedCourse}`} items={reviewItems} limit={8} />
          </section>
          <aside className="today-sidebar">
            <section className="deadline-card"><p className="label">Next deadline</p><h3>{nextCourse.label}</h3><p>{nextCourse.examDate} · {nextCourse.examLabel}</p><strong>{Math.max(0, Math.ceil((Date.parse(`${nextCourse.examDate}T23:59:59`) - now) / 86_400_000))} days</strong><Link href={`/course/${nextCourse.slug}/studio`}>Open course studio →</Link></section>
            <section className="today-plan"><p className="label">Your plan for today</p>{todayPlan ? <ol>{todayPlan.tasks.map((task) => <li key={task.id} data-complete={Boolean(study.completedPlanItems[task.id])}><Link href={task.href}><span>{task.kind} · {task.minutes} min</span><strong>{task.title}</strong></Link></li>)}</ol> : <><p>No study plan is saved yet. Choose your deadline, available days, and minutes.</p><button type="button" className="btn btn-outline btn-sm" onClick={() => selectTab("plan")}>Make my plan</button></>}</section>
            <section className="today-week"><p className="label">This week’s effort</p><div><strong>{weekly.attempts}</strong><span>attempts</span><strong>{weekly.minutes}</strong><span>minutes</span></div><button type="button" className="link-underlined" onClick={() => selectTab("progress")}>See what added up →</button></section>
          </aside>
        </div> : null}

        {activeTab === "review" ? <section aria-labelledby="full-review-heading"><div className="panel-heading"><div><p className="label">Spaced, not crammed</p><h2 id="full-review-heading">Bring the hard stuff back, one card at a time</h2><p>Overdue and unresolved work comes first. Ratings determine the next interval; no fixed daily quota is invented.</p></div><span className="tag">{reviewItems.length} available now</span></div><ReviewSession key={`review-${selectedCourse}`} items={reviewItems} limit={20} /></section> : null}
        {activeTab === "mistakes" ? <MistakeNotebook items={allItems} courseSlug={selectedCourse} onReview={() => selectTab("review")} /> : null}
        {activeTab === "plan" ? <StudyPlanner courses={courses} items={allItems} selectedCourse={selectedCourse} now={now} /> : null}
        {activeTab === "focus" ? <FocusSession courses={courses} items={allItems} reviewItems={getReviewQueue(allItems, study, now)} selectedCourse={selectedCourse} now={now} /> : null}
        {activeTab === "progress" ? <ProgressPanel items={allItems} courses={courses} selectedCourse={selectedCourse} now={now} /> : null}
        {activeTab === "data" ? <DataPanel courses={courses} selectedCourse={selectedCourse} /> : null}
        {activeTab === "advanced" ? <AdvancedDesk items={allItems} courses={courses} selectedCourse={selectedCourse} now={now} /> : null}
      </>}
    </div>
  );
}
