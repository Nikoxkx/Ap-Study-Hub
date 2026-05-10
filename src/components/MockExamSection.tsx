"use client";
import { useState, useEffect, useCallback } from "react";

interface Question {
  id: number; question: string; stimulus?: string | null;
  options: string[]; correctIndex: number; explanation: string; skill?: string | null;
}
interface Source { id: string; title: string; content: string; }
interface FRQPrompt { id: string; prompt: string; type: string; points: number; rubric: string[]; sources?: Source[]; }
interface ExamSection { name: string; timeMinutes: number; type: "mcq" | "frq"; instructions: string; questionIds?: number[]; frqPrompts?: FRQPrompt[]; }
interface MockExam { id: number; title: string; description: string; sections: ExamSection[]; }

const accentBar: Record<string, string> = { blue: "bg-apush", emerald: "bg-aplang", purple: "bg-apsem" };
const accentText: Record<string, string> = { blue: "text-apush", emerald: "text-aplang", purple: "text-apsem" };
const accentRing: Record<string, string> = { blue: "ring-apush/30", emerald: "ring-aplang/30", purple: "ring-apsem/30" };
const accentBg: Record<string, string> = { blue: "bg-apush/10", emerald: "bg-aplang/10", purple: "bg-apsem/10" };

export function MockExamSection({ exam, allQuestions, color }: { exam: MockExam; allQuestions: Question[]; color: string }) {
  const [started, setStarted] = useState(false);
  const [secIdx, setSecIdx] = useState(0);
  const [finished, setFinished] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  const [mcqScore, setMcqScore] = useState(0);
  const [frqResponses, setFrqResponses] = useState<Record<string, string>>({});
  const [frqScores, setFrqScores] = useState<Record<string, { score: number; feedback: string }>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [expandedSource, setExpandedSource] = useState<string | null>(null);

  const sec = exam.sections[secIdx];
  const bar = accentBar[color] || accentBar.blue;
  const txt = accentText[color] || accentText.blue;
  const ring = accentRing[color] || accentRing.blue;
  const bg = accentBg[color] || accentBg.blue;
  const secQs = sec?.type === "mcq" && sec.questionIds ? sec.questionIds.map(id => allQuestions.find(q => q.id === id)).filter(Boolean) as Question[] : [];

  useEffect(() => { if (started && !finished) setTimeLeft(sec.timeMinutes * 60); }, [started, secIdx, finished, sec?.timeMinutes]);
  useEffect(() => {
    if (!started || finished || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [started, finished, timeLeft]);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const gradeMCQ = useCallback(() => {
    let c = 0; secQs.forEach(q => { if (mcqAnswers[q.id] === q.correctIndex) c++; }); setMcqScore(c);
  }, [secQs, mcqAnswers]);

  const gradeFRQ = useCallback(() => {
    const s: Record<string, { score: number; feedback: string }> = {};
    sec.frqPrompts?.forEach(p => {
      const r = frqResponses[p.id] || "";
      const wc = r.trim().split(/\s+/).filter(Boolean).length;
      if (wc < 50) s[p.id] = { score: 0, feedback: "Response too short. Provide detailed analysis with specific evidence from the sources." };
      else if (wc < 150) s[p.id] = { score: Math.min(Math.round(p.points * 0.3), p.points), feedback: `Your response addresses the prompt but needs more development. Add specific evidence from sources and deeper analysis. (${wc} words)` };
      else if (wc < 300) s[p.id] = { score: Math.min(Math.round(p.points * 0.6), p.points), feedback: `Good effort. Strengthen your thesis, integrate more sources, and address complexity or counterarguments. (${wc} words)` };
      else if (wc < 500) s[p.id] = { score: Math.min(Math.round(p.points * 0.8), p.points), feedback: `Strong response with good development. For full credit: ensure all sources are integrated meaningfully and demonstrate sophistication. (${wc} words)` };
      else s[p.id] = { score: Math.min(Math.round(p.points * 0.9), p.points), feedback: `Comprehensive response. Review for thesis clarity, source integration balance, and nuanced analysis for the sophistication point. (${wc} words)` };
    });
    setFrqScores(s);
  }, [sec, frqResponses]);

  const finishSection = () => {
    if (sec.type === "mcq") gradeMCQ();
    if (sec.type === "frq") gradeFRQ();
    if (secIdx + 1 < exam.sections.length) setSecIdx(s => s + 1);
    else setFinished(true);
  };

  // Not started
  if (!started) {
    return (
      <div className="max-w-lg mx-auto card card-elevated p-6 text-center animate-scale">
        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl mx-auto mb-4">📋</div>
        <h3 className="text-lg font-bold tracking-tight mb-1">{exam.title}</h3>
        <p className="text-xs text-muted-foreground mb-5">{exam.description}</p>
        <div className="space-y-2 mb-5 text-left">
          {exam.sections.map((s, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50 border border-border">
              <span className="text-sm">{s.type === "mcq" ? "✅" : "📝"}</span>
              <div className="flex-1">
                <p className="text-xs font-medium">{s.name}</p>
                <p className="text-[10px] text-muted-foreground">{s.timeMinutes} minutes</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setStarted(true)} className="btn btn-primary h-9 px-5 text-xs w-full">Begin Exam</button>
      </div>
    );
  }

  // Finished
  if (finished) {
    const totalFrq = Object.values(frqScores).reduce((a, b) => a + b.score, 0);
    const totalFrqMax = exam.sections.filter(s => s.type === "frq").flatMap(s => s.frqPrompts || []).reduce((a, b) => a + b.points, 0);
    const mcqTotal = exam.sections.filter(s => s.type === "mcq").flatMap(s => s.questionIds || []).length;
    return (
      <div className="max-w-2xl mx-auto space-y-4 animate-in">
        <div className="card card-elevated p-6 text-center">
          <div className="text-4xl mb-2">📊</div>
          <h3 className="text-lg font-bold tracking-tight">Exam Results</h3>
          <div className="flex justify-center gap-6 mt-4">
            {mcqTotal > 0 && (
              <div><span className={`text-2xl font-extrabold ${txt}`}>{mcqScore}/{mcqTotal}</span><p className="text-[10px] text-muted-foreground">Multiple Choice</p></div>
            )}
            {totalFrqMax > 0 && (
              <div><span className={`text-2xl font-extrabold ${txt}`}>{totalFrq}/{totalFrqMax}</span><p className="text-[10px] text-muted-foreground">Free Response</p></div>
            )}
          </div>
        </div>
        {mcqTotal > 0 && (
          <div className="card p-4">
            <h4 className="text-xs font-semibold mb-2">MCQ Review</h4>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {secQs.map(q => {
                const ok = mcqAnswers[q.id] === q.correctIndex;
                return (
                  <div key={q.id} className={`px-3 py-1.5 rounded text-[11px] ${ok ? "bg-success/10" : "bg-destructive/10"}`}>
                    <span className="mr-1">{ok ? "✓" : "✗"}</span>{q.question.slice(0, 80)}...
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {Object.keys(frqScores).length > 0 && (
          <div className="card p-4">
            <h4 className="text-xs font-semibold mb-2">FRQ Feedback</h4>
            <div className="space-y-3">
              {exam.sections.filter(s => s.type === "frq").flatMap(s => s.frqPrompts || []).map(p => {
                const r = frqScores[p.id]; if (!r) return null;
                return (
                  <div key={p.id} className="bg-muted/50 rounded-lg p-3">
                    <div className="flex justify-between text-xs mb-1"><span className="font-medium">{p.type}</span><span className={`font-bold ${txt}`}>{r.score}/{p.points}</span></div>
                    <p className="text-[11px] text-muted-foreground">{r.feedback}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <button onClick={() => { setStarted(false); setSecIdx(0); setFinished(false); setMcqAnswers({}); setMcqScore(0); setFrqResponses({}); setFrqScores({}); }} className="btn btn-secondary h-9 px-5 text-xs">
            Retake Exam
          </button>
        </div>
      </div>
    );
  }

  // Active section
  return (
    <div className="max-w-4xl mx-auto">
      <div className="sticky top-14 z-30 card card-elevated p-3 mb-5 flex items-center justify-between">
        <div><span className="text-xs font-semibold">{sec.name}</span><span className="text-[10px] text-muted-foreground ml-2">Section {secIdx + 1}/{exam.sections.length}</span></div>
        <span className={`font-mono text-sm font-bold ${timeLeft < 300 ? "text-destructive animate-pulse" : txt}`}>⏱ {fmt(timeLeft)}</span>
      </div>

      <div className="bg-muted/50 border border-border rounded-lg p-3 mb-5 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">Instructions: </span>{sec.instructions}
      </div>

      {sec.type === "mcq" && (
        <div className="space-y-4">
          {secQs.map((q, qi) => (
            <div key={q.id} className="card p-4">
              <span className="text-[10px] text-muted-foreground font-medium mb-2 block">Question {qi + 1}</span>
              {q.stimulus && <div className="bg-muted/50 border border-border rounded-lg p-3 mb-3 text-xs italic text-muted-foreground">{q.stimulus}</div>}
              <p className="text-sm font-medium mb-3">{q.question}</p>
              <div className="space-y-1.5">
                {q.options.map((opt, i) => (
                  <button key={i} onClick={() => setMcqAnswers(p => ({ ...p, [q.id]: i }))}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-start gap-2 transition-all border ${mcqAnswers[q.id] === i ? `border-foreground ring-2 ${ring} bg-muted/50` : "border-border hover:bg-muted/50"}`}>
                    <span className="w-5 h-5 rounded bg-muted flex items-center justify-center text-[10px] font-semibold text-muted-foreground flex-shrink-0">{String.fromCharCode(65 + i)}</span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {sec.type === "frq" && sec.frqPrompts && (
        <div className="space-y-6">
          {sec.frqPrompts.map(p => (
            <div key={p.id} className="card p-5">
              <div className="flex justify-between mb-3">
                <span className={`badge ${bg} ${txt} text-[10px] font-semibold`}>{p.type}</span>
                <span className="text-[10px] text-muted-foreground">{p.points} pts</span>
              </div>
              
              {/* Embedded Sources */}
              {p.sources && p.sources.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold mb-2 flex items-center gap-2">
                    <span>📚</span> Source Documents
                    <span className="text-[10px] text-muted-foreground font-normal">({p.sources.length} sources)</span>
                  </h4>
                  <div className="space-y-2">
                    {p.sources.map(source => (
                      <div key={source.id} className="border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => setExpandedSource(expandedSource === source.id ? null : source.id)}
                          className="w-full flex items-center justify-between p-3 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
                        >
                          <span className="text-xs font-medium">{source.title}</span>
                          <svg 
                            className={`w-4 h-4 text-muted-foreground transition-transform ${expandedSource === source.id ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {expandedSource === source.id && (
                          <div className="p-4 border-t border-border bg-background">
                            <div className="text-xs leading-relaxed whitespace-pre-wrap text-muted-foreground">
                              {source.content}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setExpandedSource(expandedSource === 'all' ? null : 'all')}
                    className="mt-2 text-[10px] text-muted-foreground hover:text-foreground underline"
                  >
                    {expandedSource === 'all' ? 'Collapse all sources' : 'Expand all sources'}
                  </button>
                  {expandedSource === 'all' && (
                    <div className="mt-3 space-y-4 border border-border rounded-lg p-4 bg-muted/20 max-h-96 overflow-y-auto">
                      {p.sources.map(source => (
                        <div key={source.id}>
                          <h5 className="text-xs font-semibold mb-2">{source.title}</h5>
                          <div className="text-xs leading-relaxed whitespace-pre-wrap text-muted-foreground">
                            {source.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Prompt */}
              <div className="bg-muted/50 border border-border rounded-lg p-3.5 mb-4 text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">{p.prompt}</div>
              
              {/* Response textarea */}
              <textarea value={frqResponses[p.id] || ""} onChange={e => setFrqResponses(pr => ({ ...pr, [p.id]: e.target.value }))}
                placeholder="Write your response here. Reference the sources using their letters or titles..."
                rows={12}
                className="input resize-y text-sm leading-relaxed" style={{ minHeight: 220 }} />
              <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                <span>{(frqResponses[p.id] || "").trim().split(/\s+/).filter(Boolean).length} words</span>
                <details><summary className="cursor-pointer font-medium hover:text-foreground">View Rubric</summary>
                  <ul className="mt-1.5 space-y-0.5 list-disc ml-4">{p.rubric.map((r, i) => <li key={i}>{r}</li>)}</ul>
                </details>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button onClick={finishSection} className="btn btn-primary h-9 px-5 text-xs">
          {secIdx + 1 < exam.sections.length ? "Next Section" : "Submit Exam"}
        </button>
      </div>
    </div>
  );
}
