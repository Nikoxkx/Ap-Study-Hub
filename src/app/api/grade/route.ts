import { NextResponse } from "next/server";
import { getAssessment, getRubricForFrq } from "@/lib/exams";
import { gradeResponse, resolveConfig } from "@/lib/grading/ai";

/**
 * Grading endpoint.
 *
 * The rubric is resolved on the server from the assessment registry, so a
 * client cannot send itself a gentler rubric. A student may supply their own
 * key in the request headers (from the writing settings in the browser); the
 * key is used for this request only and is never logged or stored.
 */

export const runtime = "nodejs";

interface Body {
  courseSlug?: string;
  frqId?: string;
  response?: string;
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Request body must be JSON." }, { status: 400 });
  }

  const courseSlug = body.courseSlug ?? "";
  const frqId = body.frqId ?? "";
  const response = (body.response ?? "").trim();

  if (!courseSlug || !frqId) {
    return NextResponse.json({ error: "A course and a task id are required." }, { status: 400 });
  }
  if (response.length < 10) {
    return NextResponse.json({ error: "Write at least a sentence before requesting a grade." }, { status: 400 });
  }
  if (response.length > 30_000) {
    return NextResponse.json({ error: "That response is longer than any AP essay; trim it first." }, { status: 413 });
  }

  const assessment = getAssessment(courseSlug);
  const frq = assessment?.sections.flatMap((section) => section.frqs).find((task) => task.id === frqId);
  const rubric = frq ? getRubricForFrq(frq) ?? undefined : undefined;
  if (!frq || !rubric) {
    return NextResponse.json({ error: "Unknown task for this course." }, { status: 404 });
  }

  const passages = (frq.stimulusIds ?? [])
    .map((id) => assessment?.stimuli.find((stimulus) => stimulus.id === id))
    .filter((stimulus): stimulus is NonNullable<typeof stimulus> => Boolean(stimulus))
    .map((stimulus) => ({ title: stimulus.title, text: stimulus.text }));

  const config = resolveConfig(request.headers);

  const result = await gradeResponse({
    courseLabel: assessment?.blueprint.slug === "ap-lit" ? "English Literature and Composition" : courseSlug,
    taskType: frq.taskType,
    prompt: frq.prompt,
    passages,
    rubric,
    response,
    config,
  });

  return NextResponse.json({
    result,
    rubricTitle: rubric.title,
    rubricSource: rubric.source,
    aiConfigured: Boolean(config),
  });
}
