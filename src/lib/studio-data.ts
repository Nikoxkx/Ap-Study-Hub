import type { CourseBundle } from "./catalog";
import type { Assessment } from "@/content/exams/types";
import { getRubricForFrq } from "@/lib/exams";
import { getCustomStudioTasks, type StudioTask } from "@/content/studio";

function matchingExemplar(course: CourseBundle, type: string) {
  const needle = type.toLowerCase();
  if (course.subject.slug === "ap-seminar") return undefined;
  return course.essays.find((essay) => {
    const candidate = essay.type.toLowerCase();
    return candidate === needle || (needle === "dbq" && candidate.includes("document-based"));
  });
}

/**
 * Fallback tasks for a course whose paper exists only as an interim assessment:
 * the written tasks of that paper, with the printed rubric rows as criteria and
 * the paper's own passages as sources. This is what gives AP English Literature
 * a writing studio without a second prompt bank.
 */
function tasksFromAssessment(course: CourseBundle, assessment: Assessment): StudioTask[] {
  return assessment.sections.flatMap((section) =>
    section.frqs.map((frq) => {
      const rubric = getRubricForFrq(frq);
      return ({
      id: `${course.subject.slug}-${frq.id}`,
      courseSlug: course.subject.slug,
      title: frq.title,
      type: frq.taskType,
      minutes: frq.minutes,
      prompt: frq.prompt,
      sources: (frq.stimulusIds ?? [])
        .map((id) => assessment.stimuli.find((stimulus) => stimulus.id === id))
        .filter((stimulus): stimulus is NonNullable<typeof stimulus> => Boolean(stimulus))
        .map((stimulus) => ({ id: stimulus.id, title: stimulus.title, content: stimulus.text })),
      criteria: (rubric?.rows ?? []).map(
        (row) => `${row.label} (${row.maxPoints} pt) — ${row.descriptors[0]?.text ?? ""}`,
      ),
      exemplarNote: `This studio does not show a model essay. The ${frq.points}-point rubric is printed with the prompt; use the guided walkthrough for a worked plan.`,
    } satisfies StudioTask);
    }),
  );
}

/** Join timed prompts to matching scored exemplars without duplicating either bank. */
export function getStudioTasks(course: CourseBundle, assessment?: Assessment): StudioTask[] {
  const custom = getCustomStudioTasks(course.subject.slug);
  if (custom.length > 0) return custom;

  const legacy = course.mockExams.flatMap((exam) => exam.sections.flatMap((section) => {
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

  if (legacy.length > 0) return legacy;
  return assessment ? tasksFromAssessment(course, assessment) : [];
}
