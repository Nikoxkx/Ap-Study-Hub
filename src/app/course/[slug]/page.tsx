import { notFound } from "next/navigation";
import Link from "next/link";
import { coursesData, unitsData, flashcardsData, quizData, videosData, tipsData, resourcesData, essaysData, mockExamsData, examDatesData } from "@/lib/data";
import { FlashcardDeck } from "@/components/FlashcardDeck";
import { QuizSection } from "@/components/QuizSection";
import { VideoSection } from "@/components/VideoSection";
import { EssayViewer } from "@/components/EssayViewer";
import { MockExamSection } from "@/components/MockExamSection";
import { ExamCountdown } from "@/components/ExamCountdown";


const themeMap: Record<string, { dot: string; bg: string; text: string; badge: string }> = {
  blue: { dot: "bg-blue-600", bg: "bg-blue-50 dark:bg-blue-950", text: "text-blue-600 dark:text-blue-400", badge: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
  emerald: { dot: "bg-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950", text: "text-emerald-600 dark:text-emerald-400", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" },
  purple: { dot: "bg-purple-600", bg: "bg-purple-50 dark:bg-purple-950", text: "text-purple-600 dark:text-purple-400", badge: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" },
  red: { dot: "bg-red-600", bg: "bg-red-50 dark:bg-red-950", text: "text-red-600 dark:text-red-400", badge: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
  green: { dot: "bg-green-600", bg: "bg-green-50 dark:bg-green-950", text: "text-green-600 dark:text-green-400", badge: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
  orange: { dot: "bg-orange-600", bg: "bg-orange-50 dark:bg-orange-950", text: "text-orange-600 dark:text-orange-400", badge: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" },
  indigo: { dot: "bg-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-950", text: "text-indigo-600 dark:text-indigo-400", badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300" },
};

export function generateStaticParams() {
  return coursesData.map(c => ({ slug: c.slug }));
}

export default async function CoursePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const course = coursesData.find(c => c.slug === slug);
  if (!course) notFound();

  const t = themeMap[course.color] || themeMap.blue;
  const units = unitsData[slug] || [];
  const flashcards = flashcardsData[slug] || [];
  const questions = quizData[slug] || [];
  const videos = videosData[slug] || [];
  const tips = tipsData[slug] || [];
  const resources = resourcesData[slug] || [];
  const essays = essaysData[slug] || [];
  const mockExams = mockExamsData[slug] || [];
  const examDate = examDatesData[slug];

  return (
    <div>
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <Link href="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4">
            ← All courses
          </Link>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className={`w-14 h-14 rounded-xl ${t.bg} flex items-center justify-center text-3xl`}>{course.icon}</div>
            <div className="flex-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{course.shortName}</span>
              <h1 className="text-2xl font-bold tracking-tight">{course.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className={`badge ${t.badge} text-[10px]`}>{units.length} units</span>
                <span className={`badge ${t.badge} text-[10px]`}>{flashcards.length} flashcards</span>
                <span className={`badge ${t.badge} text-[10px]`}>{questions.length} questions</span>
                {essays.length > 0 && <span className={`badge ${t.badge} text-[10px]`}>{essays.length} essays</span>}
              </div>
            </div>
            {/* Exam Countdown */}
            {examDate && (
              <div className="w-full sm:w-auto">
                <ExamCountdown examDate={examDate} courseName={course.shortName} color={course.color} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="sticky top-14 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {["Study Guides", "Videos", "Flashcards", "Practice", essays.length > 0 && "Essays", mockExams.length > 0 && "Mock Exam", "Resources"].filter(Boolean).map(s => (
              <a key={s as string} href={`#${(s as string).toLowerCase().replace(" ", "-")}`} className="tab text-xs whitespace-nowrap">{s}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16">
        {/* Study Guides */}
        <section id="study-guides">
          <h2 className="text-xl font-bold tracking-tight mb-2">Study Guides</h2>
          <p className="text-sm text-muted-foreground mb-6">Click a unit to expand detailed content.</p>
          <div className="space-y-2">
            {units.map((unit, i) => (
              <details key={i} className="group card overflow-hidden">
                <summary className="flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 list-none">
                  <span className={`w-9 h-9 rounded-lg ${t.dot} text-white flex items-center justify-center text-xs font-bold`}>{unit.unitNumber}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{unit.title}</h3>
                    <p className="text-[11px] text-muted-foreground">{unit.description}</p>
                  </div>
                  <svg className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-5 border-t border-border">
                  {unit.keyTerms.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3 mb-3">
                      {unit.keyTerms.map(term => <span key={term} className={`badge ${t.badge} text-[10px]`}>{term}</span>)}
                    </div>
                  )}
                  <div className="prose max-w-none mt-3" dangerouslySetInnerHTML={{ __html: renderMarkdown(unit.content) }} />
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Videos */}
        <section id="videos">
          <h2 className="text-xl font-bold tracking-tight mb-2">Video Lessons</h2>
          <p className="text-sm text-muted-foreground mb-6">Watch expert tutorials from verified educational channels.</p>
          <VideoSection videos={videos} color={course.color} courseName={course.shortName} />
        </section>

        {/* Flashcards */}
        <section id="flashcards">
          <h2 className="text-xl font-bold tracking-tight mb-2">Flashcards</h2>
          <p className="text-sm text-muted-foreground mb-6">Click to flip and test your knowledge.</p>
          <FlashcardDeck cards={flashcards.map((f, i) => ({ id: i, front: f.front, back: f.back }))} color={course.color} />
        </section>

        {/* Practice */}
        <section id="practice">
          <h2 className="text-xl font-bold tracking-tight mb-2">Practice Questions</h2>
          <p className="text-sm text-muted-foreground mb-6">College Board-level multiple choice questions with detailed explanations.</p>
          <QuizSection questions={questions.map((q, i) => ({ id: i, ...q }))} color={course.color} />
        </section>

        {/* Essays */}
        {essays.length > 0 && (
          <section id="essays">
            <h2 className="text-xl font-bold tracking-tight mb-2">Essay Examples</h2>
            <p className="text-sm text-muted-foreground mb-6">High-scoring sample essays with detailed rubric breakdowns explaining why each point was earned.</p>
            <EssayViewer essays={essays} color={course.color} />
          </section>
        )}

        {/* Mock Exam */}
        {mockExams.length > 0 && (
          <section id="mock-exam">
            <h2 className="text-xl font-bold tracking-tight mb-2">Full Practice Exam</h2>
            <p className="text-sm text-muted-foreground mb-6">Timed exam simulation with all source documents embedded.</p>
            {mockExams.map(exam => (
              <MockExamSection key={exam.id} exam={exam} allQuestions={questions.map((q, i) => ({ id: i, ...q }))} color={course.color} />
            ))}
          </section>
        )}

        {/* Resources */}
        <section id="resources">
          <h2 className="text-xl font-bold tracking-tight mb-2">Official Resources</h2>
          <p className="text-sm text-muted-foreground mb-6">Curated links to College Board materials and trusted study resources.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {resources.map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="card p-4 hover:bg-muted/50 transition-colors group">
                <div className="flex items-start gap-3">
                  <span className="text-lg">{r.type === 'official' ? '🏛️' : r.type === 'video' ? '📺' : r.type === 'practice' ? '✍️' : '📚'}</span>
                  <div>
                    <h3 className="font-semibold text-sm group-hover:underline">{r.title} ↗</h3>
                    <p className="text-xs text-muted-foreground mt-1">{r.description}</p>
                    <span className={`badge ${t.badge} text-[9px] mt-2`}>{r.type}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Tips */}
          <h3 className="text-lg font-bold tracking-tight mt-10 mb-4">Study Tips</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {tips.map((tip, i) => (
              <div key={i} className="card p-4">
                <span className={`badge ${t.badge} text-[10px] mb-2`}>{tip.category}</span>
                <h4 className="font-semibold text-sm mb-1">{tip.title}</h4>
                <p className="text-xs text-muted-foreground">{tip.content}</p>
              </div>
            ))}
          </div>

        </section>
      </div>
    </div>
  );
}

function renderMarkdown(content: string): string {
  const lines = content.split("\n");
  const html: string[] = [];
  let inList = false, lt = "ul";
  
  for (const line of lines) {
    const t = line.trim();
    if (!t) { if (inList) { html.push(`</${lt}>`); inList = false; } continue; }
    if (t.startsWith("### ")) { if (inList) { html.push(`</${lt}>`); inList = false; } html.push(`<h3>${fmt(t.slice(4))}</h3>`); }
    else if (t.startsWith("## ")) { if (inList) { html.push(`</${lt}>`); inList = false; } html.push(`<h2>${fmt(t.slice(3))}</h2>`); }
    else if (t.startsWith("- ") || t.startsWith("* ")) { if (!inList) { lt = "ul"; html.push("<ul>"); inList = true; } html.push(`<li>${fmt(t.slice(2))}</li>`); }
    else if (/^\d+\.\s/.test(t)) { if (!inList) { lt = "ol"; html.push("<ol>"); inList = true; } html.push(`<li>${fmt(t.replace(/^\d+\.\s/, ""))}</li>`); }
    else { if (inList) { html.push(`</${lt}>`); inList = false; } html.push(`<p>${fmt(t)}</p>`); }
  }
  if (inList) html.push(`</${lt}>`);
  return html.join("\n");
}

function fmt(t: string): string {
  return t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
}
