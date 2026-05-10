"use client";
import { useState } from "react";

interface EssayData {
  id: string;
  title: string;
  type: string;
  prompt: string;
  sampleEssay: string;
  score: number;
  rubricBreakdown: { category: string; points: number; maxPoints: number; explanation: string }[];
  sources?: { id: string; title: string; content: string }[];
}

const accentColor: Record<string, string> = { blue: "bg-apush", emerald: "bg-aplang", purple: "bg-apsem" };
const accentText: Record<string, string> = { blue: "text-apush", emerald: "text-aplang", purple: "text-apsem" };

export function EssayViewer({ essays, color }: { essays: EssayData[]; color: string }) {
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState<"essay" | "rubric" | "sources">("essay");
  const bar = accentColor[color] || accentColor.blue;
  const txt = accentText[color] || accentText.blue;

  if (!essays.length) return <p className="text-sm text-muted-foreground">No essay examples available.</p>;
  const e = essays[active];
  
  // Calculate max score from rubric
  const maxScore = e.rubricBreakdown.reduce((sum, r) => sum + r.maxPoints, 0);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Essay type selector */}
      {essays.length > 1 && (
        <div className="flex flex-wrap gap-1.5 mb-4 bg-muted p-1 rounded-lg w-fit">
          {essays.map((es, i) => (
            <button key={es.id} onClick={() => { setActive(i); setTab("essay"); }}
              className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all ${i === active ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {es.type}
            </button>
          ))}
        </div>
      )}

      <div className="card card-elevated overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h3 className="font-semibold text-sm">{e.title}</h3>
            <p className="text-[11px] text-muted-foreground">{e.type} Essay - High-scoring sample</p>
          </div>
          <div className="text-center">
            <span className={`text-xl font-extrabold ${txt}`}>{e.score}</span>
            <span className="text-muted-foreground text-sm">/{maxScore}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-border bg-muted/30">
          {(["essay", "rubric", ...(e.sources?.length ? ["sources"] as const : [])] as const).map(t => (
            <button key={t} onClick={() => setTab(t as "essay" | "rubric" | "sources")}
              className={`flex-1 py-2.5 text-xs font-medium transition-all border-b-2 ${tab === t ? `${txt} border-current` : "text-muted-foreground border-transparent hover:text-foreground"}`}>
              {t === "essay" ? "Essay Response" : t === "rubric" ? "Rubric Breakdown" : "Source Documents"}
            </button>
          ))}
        </div>

        <div className="p-5 max-h-[600px] overflow-y-auto">
          {tab === "essay" && (
            <div className="animate-in">
              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1 block">Prompt</span>
                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">{e.prompt}</p>
              </div>
              <div className="space-y-3">
                {e.sampleEssay.split("\n\n").map((para, i) => (
                  <p key={i} className="text-sm leading-[1.8] text-foreground/90 indent-6 first:indent-0">{para}</p>
                ))}
              </div>
            </div>
          )}

          {tab === "rubric" && (
            <div className="animate-in space-y-3">
              <div className="bg-success/10 border border-success/20 rounded-lg p-3 mb-4">
                <p className="text-xs text-success font-medium">This essay earned {e.score}/{maxScore} points. Here&apos;s why:</p>
              </div>
              {e.rubricBreakdown.map((r, i) => {
                const pct = (r.points / r.maxPoints) * 100;
                return (
                  <div key={i} className="card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">{r.category}</span>
                      <span className={`text-sm font-bold ${r.points === r.maxPoints ? "text-success" : r.points > 0 ? "text-warning" : "text-destructive"}`}>
                        {r.points}/{r.maxPoints} {r.points === r.maxPoints ? "✓" : ""}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-3">
                      <div className={`h-2 rounded-full transition-all ${r.points === r.maxPoints ? "bg-success" : r.points > 0 ? "bg-warning" : "bg-destructive"}`} style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{r.explanation}</p>
                  </div>
                );
              })}
            </div>
          )}

          {tab === "sources" && e.sources && (
            <div className="animate-in space-y-4">
              <p className="text-xs text-muted-foreground mb-4">
                These sources were provided with the prompt. Study how the essay integrates them effectively.
              </p>
              {e.sources.map((s, i) => (
                <div key={s.id} className="card p-4">
                  <h4 className="text-sm font-semibold mb-2 text-foreground">{s.title}</h4>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-wrap">{s.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
