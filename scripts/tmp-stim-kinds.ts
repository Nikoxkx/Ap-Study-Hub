import { getAssessment } from "../src/lib/exams";
import { subjects } from "../src/lib/subjects";
const kinds: Record<string, number> = {};
for (const s of subjects) {
  const a = getAssessment(s.slug)!;
  for (const sec of a.sections) for (const st of sec.stimuli) {
    kinds[st.kind] = (kinds[st.kind] ?? 0) + 1;
    if (st.kind !== "prose" && st.kind !== "poetry") console.log(s.slug, st.kind, "|", st.title, "|", st.text.split("\n").length, "lines");
  }
}
console.log(kinds);
