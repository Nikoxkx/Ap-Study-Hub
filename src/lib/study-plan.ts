import type { StudyCourse } from "./study-data";
import { localDateKey, type StudyPlanSettings } from "./study-model";

export interface PlanTask {
  id: string;
  date: string;
  kind: "review" | "lesson" | "practice";
  title: string;
  detail: string;
  minutes: number;
  href: string;
}

export interface PlanDay {
  date: string;
  tasks: PlanTask[];
}

/** Build the next fourteen active study days from catalog content and availability. */
export function generateStudyPlan(course: StudyCourse, settings: StudyPlanSettings, dueCount: number, now = Date.now()): PlanDay[] {
  const days: PlanDay[] = [];
  const cursor = new Date(now);
  cursor.setHours(12, 0, 0, 0);
  const reviewMinutes = Math.max(5, Math.round(settings.minutes * 0.2));
  const practiceMinutes = Math.max(5, Math.round(settings.minutes * 0.2));
  const lessonMinutes = settings.minutes - reviewMinutes - practiceMinutes;

  const deadline = new Date(`${course.examDate}T23:59:59`);
  if (deadline.getTime() < now) return days;

  for (let scanned = 0; scanned < 70 && days.length < 14 && cursor <= deadline; scanned += 1) {
    if (settings.days.includes(cursor.getDay())) {
      const date = localDateKey(cursor);
      const session = days.length;
      const unit = course.units[session % course.units.length];
      const reviewCount = Math.max(3, Math.round(reviewMinutes / 1.5));
      const base = `/course/${course.slug}`;
      const tasks: PlanTask[] = [
        {
          id: `${course.slug}:${date}:review`, date, kind: "review", minutes: reviewMinutes,
          title: `Spaced review · up to ${reviewCount} items`,
          detail: dueCount > 0 ? `${dueCount} currently due across this course; overdue and missed work comes first.` : "Start with new retrieval items; your future ratings set the next due dates.",
          href: `/study?course=${course.slug}&tab=review`,
        },
        {
          id: `${course.slug}:${date}:lesson:${unit.unitNumber}`, date, kind: "lesson", minutes: lessonMinutes,
          title: `Lesson ${unit.unitNumber} · ${unit.title}`,
          detail: unit.description,
          href: `${base}/notes#unit-${unit.unitNumber}`,
        },
        {
          id: `${course.slug}:${date}:practice:${unit.unitNumber}`, date, kind: "practice", minutes: practiceMinutes,
          title: session % 3 === 2 ? "Studio / free-response practice" : `Retrieval practice · ${unit.questionCount || "course"} questions`,
          detail: session % 3 === 2 ? "Draft under time, then self-assess against the visible criteria." : "Explain each miss, then add it to the mistake notebook automatically.",
          href: session % 3 === 2 ? `${base}/studio?tab=writing` : `${base}/practice?unit=${unit.unitNumber}`,
        },
      ];
      days.push({ date, tasks });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function icsEscape(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function icsStamp(date: Date): string {
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}T${String(date.getHours()).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}00`;
}

/** Floating local times keep the export correct without inventing a timezone. */
export function studyPlanToCalendar(course: StudyCourse, days: PlanDay[]): string {
  const events = days.flatMap((day) => {
    let offset = 0;
    return day.tasks.map((task) => {
      const start = new Date(`${day.date}T12:00:00`);
      start.setHours(18, offset, 0, 0);
      const end = new Date(start.getTime() + task.minutes * 60_000);
      offset += task.minutes;
      return [
        "BEGIN:VEVENT",
        `UID:${icsEscape(task.id)}@ap-study-hub.local`,
        `DTSTAMP:${icsStamp(new Date())}`,
        `DTSTART:${icsStamp(start)}`,
        `DTEND:${icsStamp(end)}`,
        `SUMMARY:${icsEscape(`${course.label}: ${task.title}`)}`,
        `DESCRIPTION:${icsEscape(`${task.detail}\n${task.href}`)}`,
        "END:VEVENT",
      ].join("\r\n");
    });
  });
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//AP Study Hub//Study Plan//EN", "CALSCALE:GREGORIAN", ...events, "END:VCALENDAR", ""].join("\r\n");
}
