"use client";
import { useState, useEffect } from "react";

interface ExamDate {
  month: number;
  day: number;
  time: string;
}

interface ExamCountdownProps {
  examDate: ExamDate;
  courseName: string;
  color: string;
}

const colorMap: Record<string, { bg: string; text: string; ring: string }> = {
  blue: { bg: "bg-blue-50 dark:bg-blue-950", text: "text-blue-600 dark:text-blue-400", ring: "ring-blue-200 dark:ring-blue-800" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-950", text: "text-emerald-600 dark:text-emerald-400", ring: "ring-emerald-200 dark:ring-emerald-800" },
  purple: { bg: "bg-purple-50 dark:bg-purple-950", text: "text-purple-600 dark:text-purple-400", ring: "ring-purple-200 dark:ring-purple-800" },
};

function getNextExamDate(month: number, day: number): Date {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  // Try current year first
  let examDate = new Date(currentYear, month - 1, day, 8, 0, 0);
  
  // If exam has passed this year, use next year
  if (examDate < now) {
    examDate = new Date(currentYear + 1, month - 1, day, 8, 0, 0);
  }
  
  return examDate;
}

function getTimeUntil(targetDate: Date): { days: number; hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function ExamCountdown({ examDate, courseName, color }: ExamCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  
  const c = colorMap[color] || colorMap.blue;
  const targetDate = getNextExamDate(examDate.month, examDate.day);
  
  useEffect(() => {
    setMounted(true);
    const update = () => setTimeLeft(getTimeUntil(targetDate));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate.getTime()]);
  
  if (!mounted) {
    return (
      <div className={`${c.bg} rounded-xl p-4 ring-1 ${c.ring}`}>
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
            {courseName} Exam
          </p>
          <p className="text-xs text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  const isPast = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;
  
  return (
    <div className={`${c.bg} rounded-xl p-4 ring-1 ${c.ring}`}>
      <div className="text-center">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
          {courseName} Exam
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          {monthNames[examDate.month - 1]} {examDate.day}, {targetDate.getFullYear()} at {examDate.time}
        </p>
        
        {isPast ? (
          <p className={`text-sm font-semibold ${c.text}`}>Exam day!</p>
        ) : (
          <div className="flex justify-center gap-2">
            <TimeBlock value={timeLeft.days} label="days" color={c.text} />
            <TimeBlock value={timeLeft.hours} label="hrs" color={c.text} />
            <TimeBlock value={timeLeft.minutes} label="min" color={c.text} />
            <TimeBlock value={timeLeft.seconds} label="sec" color={c.text} />
          </div>
        )}
      </div>
    </div>
  );
}

function TimeBlock({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="text-center">
      <div className={`text-xl font-bold tabular-nums ${color}`}>
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-[9px] text-muted-foreground uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}
