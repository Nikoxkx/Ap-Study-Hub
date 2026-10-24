import type { CourseBundle } from "./catalog";
import { getCustomStudioTasks, type StudioTask } from "@/content/studio";

function matchingExemplar(course: CourseBundle, type: string) {
  const needle = type.toLowerCase();
  if (course.subject.slug === "ap-seminar") return undefined;
  return course.essays.find((essay) => {
    const candidate = essay.type.toLowerCase();
    return candidate === needle || (needle === "dbq" && candidate.includes("document-based"));
  });
}

/** Join timed prompts to matching scored exemplars without duplicating either bank. */
export function getStudioTasks(course: CourseBundle): StudioTask[] {
  const custom = getCustomStudioTasks(course.subject.slug);
  if (custom.length > 0) return custom;

  return course.mockExams.flatMap((exam) => exam.sections.flatMap((section) => {
    const prompts = section.frqPrompts ?? [];
    return prompts.map((prompt) => {
      const exemplar = matchingExemplar(course, prompt.type);
      return {
        id: `${course.subject.slug}-${exam.id}-${prompt.id}`,
        courseSlug: course.subject.slug,
        title: `${exam.title} · ${prompt.type}`,
        type: prompt.type,
        minutes: Math.max(5, Math.round(section.timeMinutes / Math.max(1, prompts.length))),
        prompt: prompt.prompt,
        sources: prompt.sources,
        criteria: prompt.rubric,
        exemplar: exemplar?.sampleEssay,
        exemplarNote: exemplar ? `This is the site's marked ${exemplar.type} exemplar. Compare decisions against the visible criteria; its displayed rubric score is not a score for your draft.` : undefined,
      } satisfies StudioTask;
    });
  }));
}
