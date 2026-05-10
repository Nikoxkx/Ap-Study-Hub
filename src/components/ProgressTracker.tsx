"use client";
import { useState, useEffect } from "react";

interface ProgressTrackerProps {
  courseSlug: string;
  totalUnits: number;
  totalFlashcards: number;
  totalQuestions: number;
  color: string;
}

const colorMap: Record<string, { bg: string; fill: string }> = {
  blue: { bg: "bg-blue-100 dark:bg-blue-900/30", fill: "bg-blue-600" },
  emerald: { bg: "bg-emerald-100 dark:bg-emerald-900/30", fill: "bg-emerald-600" },
  purple: { bg: "bg-purple-100 dark:bg-purple-900/30", fill: "bg-purple-600" },
  red: { bg: "bg-red-100 dark:bg-red-900/30", fill: "bg-red-600" },
  green: { bg: "bg-green-100 dark:bg-green-900/30", fill: "bg-green-600" },
  orange: { bg: "bg-orange-100 dark:bg-orange-900/30", fill: "bg-orange-600" },
  indigo: { bg: "bg-indigo-100 dark:bg-indigo-900/30", fill: "bg-indigo-600" },
};

export function ProgressTracker({ courseSlug, totalUnits, totalFlashcards, totalQuestions, color }: ProgressTrackerProps) {
  const [progress, setProgress] = useState({ units: 0, flashcards: 0, questions: 0 });
  const [streak, setStreak] = useState(0);
  const colors = colorMap[color] || colorMap.blue;

  useEffect(() => {
    // Load progress from localStorage
    const saved = localStorage.getItem(`progress-${courseSlug}`);
    if (saved) {
      setProgress(JSON.parse(saved));
    }
    
    // Load streak
    const streakData = localStorage.getItem("study-streak");
    if (streakData) {
      const { count, lastDate } = JSON.parse(streakData);
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      
      if (lastDate === today) {
        setStreak(count);
      } else if (lastDate === yesterday) {
        setStreak(count);
      } else {
        setStreak(0);
      }
    }
  }, [courseSlug]);

  const updateStreak = () => {
    const today = new Date().toDateString();
    const streakData = localStorage.getItem("study-streak");
    
    if (streakData) {
      const { count, lastDate } = JSON.parse(streakData);
      if (lastDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const newCount = lastDate === yesterday ? count + 1 : 1;
        localStorage.setItem("study-streak", JSON.stringify({ count: newCount, lastDate: today }));
        setStreak(newCount);
      }
    } else {
      localStorage.setItem("study-streak", JSON.stringify({ count: 1, lastDate: today }));
      setStreak(1);
    }
  };

  const markUnitComplete = () => {
    const newProgress = { ...progress, units: Math.min(progress.units + 1, totalUnits) };
    setProgress(newProgress);
    localStorage.setItem(`progress-${courseSlug}`, JSON.stringify(newProgress));
    updateStreak();
  };

  const markFlashcardsStudied = (count: number) => {
    const newProgress = { ...progress, flashcards: Math.min(progress.flashcards + count, totalFlashcards) };
    setProgress(newProgress);
    localStorage.setItem(`progress-${courseSlug}`, JSON.stringify(newProgress));
    updateStreak();
  };

  const markQuestionsAnswered = (count: number) => {
    const newProgress = { ...progress, questions: Math.min(progress.questions + count, totalQuestions) };
    setProgress(newProgress);
    localStorage.setItem(`progress-${courseSlug}`, JSON.stringify(newProgress));
    updateStreak();
  };

  const resetProgress = () => {
    setProgress({ units: 0, flashcards: 0, questions: 0 });
    localStorage.removeItem(`progress-${courseSlug}`);
  };

  const unitPercent = totalUnits > 0 ? (progress.units / totalUnits) * 100 : 0;
  const flashcardPercent = totalFlashcards > 0 ? (progress.flashcards / totalFlashcards) * 100 : 0;
  const questionPercent = totalQuestions > 0 ? (progress.questions / totalQuestions) * 100 : 0;
  const overallPercent = (unitPercent + flashcardPercent + questionPercent) / 3;

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Study Progress
        </h3>
        {streak > 0 && (
          <div className="flex items-center gap-1 text-xs font-medium text-orange-600 dark:text-orange-400">
            <span className="text-base">🔥</span>
            {streak} day streak
          </div>
        )}
      </div>

      {/* Overall Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="font-medium">{Math.round(overallPercent)}%</span>
        </div>
        <div className={`h-2 rounded-full ${colors.bg}`}>
          <div 
            className={`h-2 rounded-full ${colors.fill} transition-all duration-500`}
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      {/* Individual Progress */}
      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Units Studied</span>
          <span>{progress.units}/{totalUnits}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Flashcards Reviewed</span>
          <span>{progress.flashcards}/{totalFlashcards}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Questions Answered</span>
          <span>{progress.questions}/{totalQuestions}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-border">
        <button
          onClick={markUnitComplete}
          className="flex-1 px-2 py-1.5 text-[10px] font-medium rounded bg-muted hover:bg-muted/80 transition-colors"
        >
          +1 Unit
        </button>
        <button
          onClick={() => markFlashcardsStudied(10)}
          className="flex-1 px-2 py-1.5 text-[10px] font-medium rounded bg-muted hover:bg-muted/80 transition-colors"
        >
          +10 Cards
        </button>
        <button
          onClick={() => markQuestionsAnswered(5)}
          className="flex-1 px-2 py-1.5 text-[10px] font-medium rounded bg-muted hover:bg-muted/80 transition-colors"
        >
          +5 Qs
        </button>
      </div>

      <button
        onClick={resetProgress}
        className="w-full mt-2 px-2 py-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
      >
        Reset Progress
      </button>
    </div>
  );
}
