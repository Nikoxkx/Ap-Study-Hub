import type { Rubric } from "@/content/exams/types";
import type { CriterionResult, GradeResult } from "./grade";
import { gradeLocally } from "./grade";

/**
 * AI grading.
 *
 * The grading engine is provider-agnostic. A deployment can supply a key in the
 * environment (OPENAI_API_KEY, ANTHROPIC_API_KEY, or GOOGLE_GENERATIVE_AI_API_KEY),
 * and a student can alternatively paste their own key in the writing settings,
 * which is stored in their browser and sent per request — never written to a
 * server log or database.
 *
 * If no key is configured, the route returns the local rubric analysis and says
 * so. The local analysis is not a fallback that guesses: it measures the
 * response against the same rubric rows.
 */

export type Provider = "openai" | "anthropic" | "google";

export interface AiConfig {
  provider: Provider;
  key: string;
  model: string;
  baseUrl?: string;
}

const DEFAULT_MODELS: Record<Provider, string> = {
  openai: "gpt-4o-mini",
  anthropic: "claude-3-5-sonnet-latest",
  google: "gemini-2.0-flash",
};

export function resolveConfig(headers?: Headers): AiConfig | null {
  const headerProvider = headers?.get("x-ai-provider")?.toLowerCase() as Provider | undefined;
  const headerKey = headers?.get("x-ai-key")?.trim();
  const headerModel = headers?.get("x-ai-model")?.trim();

  if (headerKey && headerProvider && DEFAULT_MODELS[headerProvider]) {
    return {
      provider: headerProvider,
      key: headerKey,
      model: headerModel || DEFAULT_MODELS[headerProvider],
    };
  }
  if (headerKey) {
    return { provider: "openai", key: headerKey, model: headerModel || DEFAULT_MODELS.openai };
  }

  const env = process.env;
  if (env.OPENAI_API_KEY) {
    return { provider: "openai", key: env.OPENAI_API_KEY, model: env.OPENAI_MODEL || DEFAULT_MODELS.openai };
  }
  if (env.ANTHROPIC_API_KEY) {
    return { provider: "anthropic", key: env.ANTHROPIC_API_KEY, model: env.ANTHROPIC_MODEL || DEFAULT_MODELS.anthropic };
  }
  if (env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return {
      provider: "google",
      key: env.GOOGLE_GENERATIVE_AI_API_KEY,
      model: env.GOOGLE_MODEL || DEFAULT_MODELS.google,
    };
  }
  return null;
}

export function buildGradingPrompt(input: {
  courseLabel: string;
  taskType: string;
  prompt: string;
  passages: { title: string; text: string }[];
  rubric: Rubric;
  response: string;
}): string {
  const rubricText = input.rubric.rows
    .map((row) => {
      const descriptors = row.descriptors
        .map((descriptor) => `    ${descriptor.points} point${descriptor.points === 1 ? "" : "s"}: ${descriptor.text}`)
        .join("\n");
      return `ROW ${row.id} — ${row.label} (max ${row.maxPoints}; allowed values ${row.scale.join(", ")})\n${descriptors}`;
    })
    .join("\n\n");

  const passages = input.passages
    .map((passage) => `--- ${passage.title} ---\n${passage.text.slice(0, 9000)}`)
    .join("\n\n");

  return `You are an experienced AP ${input.courseLabel} reader scoring one student response against the published rubric rows below. You are strict, specific, and fair.

TASK TYPE: ${input.taskType}

PROMPT GIVEN TO THE STUDENT:
${input.prompt}

${passages ? `PASSAGE(S) THE STUDENT WAS ANALYSING:\n${passages}\n` : ""}

RUBRIC:
${rubricText}

STUDENT RESPONSE:
"""
${input.response}
"""

Instructions:
1. Award points row by row, using ONLY the allowed values for that row.
2. Do not reward length. A short precise answer can outscore a long vague one.
3. Quote the student's own words as evidence for every judgement. If a requirement is absent, say what is absent.
4. Judge grammar, spelling, and clarity. List real errors with the sentence and a corrected version. Do not invent errors.
5. Be aware of model/human error: if a judgement is borderline, choose the lower value and explain why.
6. Return JSON only, matching this schema exactly:

{
  "rows": [
    { "id": "<row id>", "points": <number>, "feedback": "why this score, quoting the response", "improve": "the single most useful revision" }
  ],
  "summary": "3-5 sentences describing what this response does and does not do",
  "strengths": ["..."],
  "priorities": ["the highest-value revisions, most important first"],
  "mechanics": [
    { "rule": "spelling|grammar|punctuation|clarity|register", "message": "what is wrong", "snippet": "the exact text", "suggestion": "corrected text", "severity": "error|warning|note" }
  ],
  "mechanicsSummary": "one or two sentences",
  "nextSteps": [ { "title": "...", "detail": "..." } ]
}`;
}

async function callOpenAi(config: AiConfig, prompt: string): Promise<string> {
  const response = await fetch(`${config.baseUrl ?? "https://api.openai.com/v1"}/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${config.key}`,
    },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are a strict AP exam reader. Return only valid JSON." },
        { role: "user", content: prompt },
      ],
    }),
  });
  if (!response.ok) throw new Error(`OpenAI returned ${response.status}: ${(await response.text()).slice(0, 300)}`);
  const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  return data.choices?.[0]?.message?.content ?? "";
}

async function callAnthropic(config: AiConfig, prompt: string): Promise<string> {
  const response = await fetch(`${config.baseUrl ?? "https://api.anthropic.com"}/v1/messages`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": config.key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: 4000,
      temperature: 0.2,
      system: "You are a strict AP exam reader. Return only valid JSON.",
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!response.ok) throw new Error(`Anthropic returned ${response.status}: ${(await response.text()).slice(0, 300)}`);
  const data = (await response.json()) as { content?: { type: string; text?: string }[] };
  return data.content?.map((part) => part.text ?? "").join("") ?? "";
}

async function callGoogle(config: AiConfig, prompt: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    config.model,
  )}:generateContent?key=${encodeURIComponent(config.key)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, responseMimeType: "application/json" },
    }),
  });
  if (!response.ok) throw new Error(`Google returned ${response.status}: ${(await response.text()).slice(0, 300)}`);
  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  return data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("") ?? "";
}

function parseJson(raw: string): unknown {
  const trimmed = raw.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(trimmed.slice(start, end + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

interface RawGrade {
  rows?: { id?: string; points?: number; feedback?: string; improve?: string }[];
  summary?: string;
  strengths?: string[];
  priorities?: string[];
  mechanics?: { rule?: string; message?: string; snippet?: string; suggestion?: string; severity?: string }[];
  mechanicsSummary?: string;
  nextSteps?: { title?: string; detail?: string }[];
}

/** Merge a model's judgement into the local result, keeping measured evidence. */
export function mergeAiGrade(local: GradeResult, raw: unknown, rubric: Rubric, config: AiConfig): GradeResult {
  const data = (raw ?? {}) as RawGrade;
  if (!Array.isArray(data.rows) || data.rows.length === 0) {
    return {
      ...local,
      notice: "The model did not return usable rubric rows, so the measured rubric analysis is shown instead.",
    };
  }

  const rows: CriterionResult[] = rubric.rows.map((row) => {
    const localRow = local.rows.find((candidate) => candidate.id === row.id);
    const match = data.rows?.find((candidate) => candidate.id === row.id);
    const allowed = row.scale.slice().sort((a, b) => b - a);
    const requested = typeof match?.points === "number" ? match.points : localRow?.points ?? 0;
    const points = allowed.reduce((best, option) =>
      Math.abs(option - requested) < Math.abs(best - requested) ? option : best,
    allowed[0]);
    return {
      id: row.id,
      label: row.label,
      points,
      maxPoints: row.maxPoints,
      signals: localRow?.signals ?? [],
      feedback: match?.feedback?.trim() || localRow?.feedback || "",
      improve: match?.improve?.trim() || localRow?.improve || "",
    };
  });

  const earned = rows.reduce((sum, row) => sum + row.points, 0);
  const possible = rows.reduce((sum, row) => sum + row.maxPoints, 0);

  const mechanics = (data.mechanics ?? [])
    .filter((issue) => issue.message)
    .map((issue) => ({
      rule: issue.rule?.trim() || "clarity",
      message: issue.message ?? "",
      snippet: issue.snippet?.trim() || "—",
      suggestion: issue.suggestion?.trim() || undefined,
      severity: (issue.severity === "error" || issue.severity === "warning" ? issue.severity : "note") as
        | "error"
        | "warning"
        | "note",
    }));

  return {
    ...local,
    method: "ai",
    provider: config.provider,
    model: config.model,
    rows,
    earned,
    possible,
    summary: data.summary?.trim() || local.summary,
    strengths: data.strengths?.length ? data.strengths : local.strengths,
    priorities: data.priorities?.length ? data.priorities : local.priorities,
    mechanics: mechanics.length ? mechanics : local.mechanics,
    mechanicsSummary: data.mechanicsSummary?.trim() || local.mechanicsSummary,
    nextSteps: data.nextSteps?.length
      ? data.nextSteps.map((step) => ({ title: step.title || "Next step", detail: step.detail || "" }))
      : local.nextSteps,
  };
}

export async function gradeWithAi(
  config: AiConfig,
  prompt: string,
): Promise<{ raw: string }> {
  if (config.provider === "openai") return { raw: await callOpenAi(config, prompt) };
  if (config.provider === "anthropic") return { raw: await callAnthropic(config, prompt) };
  return { raw: await callGoogle(config, prompt) };
}

/** Convenience wrapper used by the route; never throws. */
export async function gradeResponse(input: {
  courseLabel: string;
  taskType: string;
  prompt: string;
  passages: { title: string; text: string }[];
  rubric: Rubric;
  response: string;
  config: AiConfig | null;
}): Promise<GradeResult> {
  const local = gradeLocally(input.response, input.rubric);
  if (!input.config) return local;
  try {
    const prompt = buildGradingPrompt(input);
    const { raw } = await gradeWithAi(input.config, prompt);
    const parsed = parseJson(raw);
    if (!parsed) {
      return { ...local, notice: "The model's reply could not be read as JSON; the measured rubric analysis is shown." };
    }
    return mergeAiGrade(local, parsed, input.rubric, input.config);
  } catch (error) {
    return {
      ...local,
      notice: `The AI grader could not be reached (${
        error instanceof Error ? error.message.slice(0, 180) : "unknown error"
      }). The measured rubric analysis is shown instead.`,
    };
  }
}
