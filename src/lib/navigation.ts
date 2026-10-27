import type { CommandItem } from "@/components/CommandPalette";
import { getCatalog } from "./catalog";

/** Navigation is derived from the same catalog as the pages it addresses. */
export function getNavigationCommands(): CommandItem[] {
  const commands: CommandItem[] = [
    { id: "study-today", title: "Due Today", context: "Cards and missed questions ready for spaced review", href: "/study?tab=review", kind: "Study" },
    { id: "study-mistakes", title: "Mistake notebook", context: "Explanations and exact lesson links", href: "/study?tab=mistakes", kind: "Study" },
    { id: "study-plan", title: "Personal study plan", context: "Availability, deadlines, and calendar export", href: "/study?tab=plan", kind: "Study" },
    { id: "study-focus", title: "Focus Session", context: "Recall, explain, and apply with a real timer", href: "/study?tab=focus", kind: "Study" },
    { id: "study-progress", title: "Weekly progress", context: "Activity, skills, objectives, and review forecast", href: "/study?tab=progress", kind: "Study" },
    { id: "study-data", title: "Backup & offline", context: "JSON restore and offline course packs", href: "/study?tab=data", kind: "Study" },
    { id: "study-advanced", title: "Advanced Study Desk", context: "Goals, video watchlist, reports, roadmap, and optional sync", href: "/study?tab=advanced", kind: "Study" },
    { id: "videos", title: "Unit video library", context: "Curated videos for every unit of ten AP courses", href: "/videos", kind: "Video" },
    { id: "integrations", title: "Integrations & press kit", context: "Public registry, editorial brief, roadmap, and social card", href: "/integrations", kind: "Site" },
    { id: "guides", title: "Study guides", context: "How to read, retrieve, write, and rehearse", href: "/guides", kind: "Study" },
  ];
  for (const course of getCatalog()) {
    const base = `/course/${course.subject.slug}`;
    commands.push(
      { id: `course-${course.subject.slug}`, title: course.subject.official, context: `${course.counts.units} lessons · course home`, href: base, kind: "Course" },
      { id: `videos-${course.subject.slug}`, title: `${course.subject.familiar} unit videos`, context: "Curated videos playable beside every lesson", href: `${base}/videos`, kind: "Video" },
      { id: `studio-${course.subject.slug}`, title: `${course.subject.familiar} interactive studio`, context: "Graphs, data, annotation, connections, or rehearsal", href: `${base}/studio?tab=lab`, kind: "Studio" },
      { id: `writing-${course.subject.slug}`, title: `${course.subject.familiar} writing studio`, context: "Timed draft, criteria, and exemplar comparison", href: `${base}/studio?tab=writing`, kind: "Studio" },
      { id: `print-${course.subject.slug}`, title: `${course.subject.familiar} printable packet`, context: "Notes, worked paper, practice, and answer key", href: `${base}/print`, kind: "Studio" },
    );
    for (const unit of course.units) {
      commands.push({ id: `lesson-${course.subject.slug}-${unit.unitNumber}`, title: `${course.subject.familiar} ${unit.unitNumber} · ${unit.title}`, context: unit.description, href: `${base}/notes#unit-${unit.unitNumber}`, kind: "Lesson" });
    }
  }
  return commands;
}
