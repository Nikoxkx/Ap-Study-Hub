import { getCatalog } from "./catalog";
import { toPlainText } from "./markdown";
import type { SubjectSlug } from "./subjects";

/**
 * Search.
 *
 * The old SearchBar fetched `/api/search`, a route that was never written, so
 * the box in the header returned nothing forever. This builds a real index over
 * the content that exists.
 *
 * It is a small corpus (a few hundred documents, a few hundred KB of text), so a
 * scored substring match beats pulling in a search dependency. The index is
 * built once at module scope; on the server that is once per lambda cold start,
 * and the /api/search route reuses it across requests.
 */

export type DocKind = "course" | "unit" | "term" | "question" | "essay" | "guide";

export interface SearchDoc {
  id: string;
  kind: DocKind;
  title: string;
  /** One line of context shown under the title. */
  context: string;
  body: string;
  href: string;
  subject?: SubjectSlug;
  subjectLabel?: string;
  /** Nudges more useful document kinds up the list on equal text score. */
  weight: number;
}

export interface SearchHit extends SearchDoc {
  score: number;
}

function buildIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const course of getCatalog()) {
    const { subject } = course;
    const base = `/course/${subject.slug}`;

    docs.push({
      id: `course:${subject.slug}`,
      kind: "course",
      title: subject.official,
      context: `${course.counts.units} units · ${course.counts.questions} practice questions`,
      body: `${subject.familiar} ${subject.official} ${subject.summary} ${subject.intro}`,
      href: base,
      subject: subject.slug,
      subjectLabel: subject.familiar,
      weight: 3,
    });

    course.units.forEach((unit) => {
      docs.push({
        id: `unit:${subject.slug}:${unit.unitNumber}`,
        kind: "unit",
        title: unit.title,
        context: unit.description,
        body: `${unit.title} ${unit.description} ${toPlainText(unit.content)} ${unit.keyTerms.join(" ")}`,
        href: `${base}/notes#unit-${unit.unitNumber}`,
        subject: subject.slug,
        subjectLabel: subject.familiar,
        weight: 2.5,
      });

      unit.keyTerms.forEach((term) => {
        docs.push({
          id: `term:${subject.slug}:${unit.unitNumber}:${term}`,
          kind: "term",
          title: term,
          context: `Key term · ${unit.title}`,
          body: term,
          href: `${base}/notes#unit-${unit.unitNumber}`,
          subject: subject.slug,
          subjectLabel: subject.familiar,
          weight: 2,
        });
      });
    });

    course.flashcards.forEach((card, i) => {
      docs.push({
        id: `term:${subject.slug}:card:${i}`,
        kind: "term",
        title: card.front,
        context: card.back.length > 110 ? `${card.back.slice(0, 110)}…` : card.back,
        body: `${card.front} ${card.back}`,
        href: `${base}/cards`,
        subject: subject.slug,
        subjectLabel: subject.familiar,
        weight: 1.6,
      });
    });

    course.questions.forEach((question) => {
      docs.push({
        id: `question:${subject.slug}:${question.id}`,
        kind: "question",
        title: question.question,
        context: question.skill ? `Practice · ${question.skill}` : "Practice question",
        body: `${question.question} ${question.options.join(" ")} ${question.explanation}`,
        href: `${base}/practice`,
        subject: subject.slug,
        subjectLabel: subject.familiar,
        weight: 1.2,
      });
    });

    course.essays.forEach((essay) => {
      docs.push({
        id: `essay:${subject.slug}:${essay.id}`,
        kind: "essay",
        title: essay.title,
        context: `${essay.type} · scored ${essay.score}`,
        body: `${essay.title} ${essay.type} ${essay.prompt} ${essay.sampleEssay}`,
        href: `${base}/essays`,
        subject: subject.slug,
        subjectLabel: subject.familiar,
        weight: 1.8,
      });
    });

    course.tips.forEach((tip, i) => {
      docs.push({
        id: `guide:${subject.slug}:${i}`,
        kind: "guide",
        title: tip.title,
        context: `${subject.familiar} · ${tip.category}`,
        body: `${tip.title} ${tip.content}`,
        href: `${base}`,
        subject: subject.slug,
        subjectLabel: subject.familiar,
        weight: 1.4,
      });
    });
  }

  return docs;
}

const index = buildIndex();

/** Lowercased body cache — avoids re-lowercasing 1,000 strings per keystroke. */
const haystack = index.map((doc) => ({
  title: doc.title.toLowerCase(),
  body: doc.body.toLowerCase(),
}));

export function indexSize(): number {
  return index.length;
}

function scoreDoc(docIndex: number, terms: string[]): number {
  const { title, body } = haystack[docIndex];
  let score = 0;

  for (const term of terms) {
    const inTitle = title.indexOf(term);
    if (inTitle === 0) score += 12;
    else if (inTitle > 0) score += title[inTitle - 1] === " " ? 8 : 4;

    const inBody = body.indexOf(term);
    if (inBody === -1) {
      // Every term has to appear somewhere, otherwise "civil war" matches
      // documents about civil liberties.
      if (inTitle === -1) return 0;
    } else {
      score += 1;
      // A second occurrence is worth something; a fiftieth is not.
      const second = body.indexOf(term, inBody + term.length);
      if (second !== -1) score += 0.5;
    }
  }

  // Shorter titles that match are usually the thing you meant.
  return score * index[docIndex].weight * (1 + 8 / (index[docIndex].title.length + 8));
}

export interface SearchOptions {
  limit?: number;
  subject?: SubjectSlug;
}

export function search(query: string, options: SearchOptions = {}): SearchHit[] {
  const limit = options.limit ?? 8;
  const terms = query
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((t) => t.length > 1);

  if (terms.length === 0) return [];

  const hits: SearchHit[] = [];
  for (let i = 0; i < index.length; i += 1) {
    if (options.subject && index[i].subject !== options.subject) continue;
    const score = scoreDoc(i, terms);
    if (score > 0) hits.push({ ...index[i], score });
  }

  hits.sort((a, b) => b.score - a.score || a.title.length - b.title.length);

  // One result per title keeps "Federalism" from filling the list five times.
  const seen = new Set<string>();
  const deduped: SearchHit[] = [];
  for (const hit of hits) {
    const key = `${hit.kind}:${hit.title.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(hit);
    if (deduped.length >= limit) break;
  }

  return deduped;
}

export const kindLabels: Record<DocKind, string> = {
  course: "Course",
  unit: "Notes",
  term: "Term",
  question: "Practice",
  essay: "Essay",
  guide: "Guide",
};
