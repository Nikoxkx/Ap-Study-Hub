"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { coursesData } from "@/lib/data";

interface UserProgress {
  course_slug: string;
  activity_type: string;
  score: number | null;
  max_score: number | null;
  completed: boolean;
}

interface UserExam {
  course_slug: string;
  exam_date: string | null;
  target_score: number | null;
}

interface CourseStats {
  questionsAnswered: number;
  questionsCorrect: number;
  flashcardsStudied: number;
  essaysCompleted: number;
  mockExamsCompleted: number;
  mastery: number;
}

// Calculate next exam date based on academic year
function getNextExamDate(monthDay: string): Date {
  const [month, day] = monthDay.split("-").map(Number);
  const now = new Date();
  const currentYear = now.getFullYear();
  const examDate = new Date(currentYear, month - 1, day);
  
  // If the exam date has passed this year, use next year
  if (examDate < now) {
    examDate.setFullYear(currentYear + 1);
  }
  return examDate;
}

// Exam dates (month-day format) - these auto-update based on current year
const examDates: Record<string, string> = {
  apush: "05-10",
  "ap-lang": "05-13",
  "ap-seminar": "05-07",
};

function getDaysUntil(date: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function formatExamDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [userExams, setUserExams] = useState<UserExam[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [selectedExams, setSelectedExams] = useState<string[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  async function loadUserData() {
    setLoadingData(true);
    try {
      // Load progress
      const { data: progressData } = await supabase
        .from("user_progress")
        .select("course_slug, activity_type, score, max_score, completed")
        .eq("user_id", user!.id);

      // Load selected exams
      const { data: examsData } = await supabase
        .from("user_exams")
        .select("course_slug, exam_date, target_score")
        .eq("user_id", user!.id);

      setProgress(progressData || []);
      setUserExams(examsData || []);
      setSelectedExams((examsData || []).map((e) => e.course_slug));
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoadingData(false);
    }
  }

  async function toggleExam(slug: string) {
    if (selectedExams.includes(slug)) {
      // Remove exam
      await supabase
        .from("user_exams")
        .delete()
        .eq("user_id", user!.id)
        .eq("course_slug", slug);
      setSelectedExams((prev) => prev.filter((s) => s !== slug));
      setUserExams((prev) => prev.filter((e) => e.course_slug !== slug));
    } else {
      // Add exam
      const examDate = getNextExamDate(examDates[slug]);
      await supabase.from("user_exams").insert({
        user_id: user!.id,
        course_slug: slug,
        exam_date: examDate.toISOString().split("T")[0],
      });
      setSelectedExams((prev) => [...prev, slug]);
      setUserExams((prev) => [
        ...prev,
        { course_slug: slug, exam_date: examDate.toISOString().split("T")[0], target_score: null },
      ]);
    }
  }

  function getStatsForCourse(slug: string): CourseStats {
    const courseProgress = progress.filter((p) => p.course_slug === slug);
    const quizzes = courseProgress.filter((p) => p.activity_type === "quiz");
    const flashcards = courseProgress.filter((p) => p.activity_type === "flashcard");
    const essays = courseProgress.filter((p) => p.activity_type === "essay");
    const mocks = courseProgress.filter((p) => p.activity_type === "mock_exam");

    const questionsAnswered = quizzes.length;
    const questionsCorrect = quizzes.filter((q) => q.score && q.max_score && q.score === q.max_score).length;
    const flashcardsStudied = flashcards.filter((f) => f.completed).length;
    const essaysCompleted = essays.filter((e) => e.completed).length;
    const mockExamsCompleted = mocks.filter((m) => m.completed).length;

    // Calculate mastery (0-100)
    const totalActivities = questionsAnswered + flashcardsStudied + essaysCompleted + mockExamsCompleted;
    const mastery = totalActivities > 0 ? Math.min(100, Math.round((totalActivities / 50) * 100)) : 0;

    return {
      questionsAnswered,
      questionsCorrect,
      flashcardsStudied,
      essaysCompleted,
      mockExamsCompleted,
      mastery,
    };
  }

  function getFeedback(stats: CourseStats, daysUntil: number): string {
    if (stats.mastery < 20) {
      if (daysUntil < 30) {
        return "Start with the study guides and flashcards to build foundational knowledge quickly. Focus on key terms and concepts first.";
      }
      return "You&apos;re just getting started! Begin with the study guides to build a strong foundation.";
    }
    if (stats.mastery < 50) {
      if (daysUntil < 30) {
        return "Good progress! Prioritize practice questions and timed essay practice. Review any concepts you&apos;re struggling with.";
      }
      return "Nice work so far! Add more practice questions to reinforce your learning and identify weak areas.";
    }
    if (stats.mastery < 80) {
      if (daysUntil < 30) {
        return "You&apos;re well-prepared! Focus on mock exams and timing. Review any remaining weak areas.";
      }
      return "Strong progress! Start taking mock exams to simulate test conditions and build stamina.";
    }
    return "Excellent preparation! Maintain your knowledge with light review and get plenty of rest before the exam.";
  }

  if (loading || loadingData) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-6">
          <div className="h-8 w-48 skeleton" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-6 space-y-4">
                <div className="h-6 w-32 skeleton" />
                <div className="h-4 w-full skeleton" />
                <div className="h-4 w-3/4 skeleton" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const displayName = user.user_metadata?.display_name || user.email?.split("@")[0] || "Student";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1">
          Welcome back, {displayName}
        </h1>
        <p className="text-muted-foreground">
          Track your progress and prepare for your AP exams.
        </p>
      </div>

      {/* Exam Selection */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Your AP Exams</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coursesData.map((course) => {
            const isSelected = selectedExams.includes(course.slug);
            const examDate = getNextExamDate(examDates[course.slug]);
            const daysUntil = getDaysUntil(examDate);

            return (
              <button
                key={course.slug}
                onClick={() => toggleExam(course.slug)}
                className={`card p-4 text-left transition-all ${
                  isSelected
                    ? "ring-2 ring-primary border-primary"
                    : "hover:border-muted-foreground/50"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{course.icon}</span>
                    <span className="font-semibold">{course.shortName}</span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? "bg-primary border-primary"
                        : "border-muted-foreground/30"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-primary-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  {formatExamDate(examDate)}
                </p>
                <p
                  className={`text-sm font-medium ${
                    daysUntil < 30
                      ? "text-destructive"
                      : daysUntil < 60
                      ? "text-warning"
                      : "text-muted-foreground"
                  }`}
                >
                  {daysUntil} days until exam
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Progress by Course */}
      {selectedExams.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Your Progress</h2>

          {selectedExams.map((slug) => {
            const course = coursesData.find((c) => c.slug === slug);
            if (!course) return null;

            const stats = getStatsForCourse(slug);
            const examDate = getNextExamDate(examDates[slug]);
            const daysUntil = getDaysUntil(examDate);

            const colorClass =
              slug === "apush"
                ? "bg-apush"
                : slug === "ap-lang"
                ? "bg-aplang"
                : "bg-apsem";

            return (
              <div key={slug} className="card p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{course.icon}</span>
                      <h3 className="font-semibold text-lg">{course.shortName}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {daysUntil} days until your exam
                    </p>
                  </div>
                  <Link
                    href={`/course/${slug}`}
                    className="btn btn-outline text-xs h-8 px-3"
                  >
                    Study Now
                  </Link>
                </div>

                {/* Mastery Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Mastery Level</span>
                    <span className="text-sm font-semibold">{stats.mastery}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colorClass} progress-bar rounded-full`}
                      style={{ width: `${stats.mastery}%` }}
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <StatCard
                    label="Questions"
                    value={stats.questionsAnswered}
                    subtext={`${stats.questionsCorrect} correct`}
                  />
                  <StatCard
                    label="Flashcards"
                    value={stats.flashcardsStudied}
                    subtext="studied"
                  />
                  <StatCard
                    label="Essays"
                    value={stats.essaysCompleted}
                    subtext="completed"
                  />
                  <StatCard
                    label="Mock Exams"
                    value={stats.mockExamsCompleted}
                    subtext="completed"
                  />
                </div>

                {/* Personalized Feedback */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-sm mb-1">Personalized Tip</p>
                      <p className="text-sm text-muted-foreground">
                        {getFeedback(stats, daysUntil)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Quick Actions */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickActionCard
            href="/course/apush"
            icon="📚"
            title="Study Guides"
            description="Review key concepts"
          />
          <QuickActionCard
            href="/course/apush#flashcards"
            icon="🃏"
            title="Flashcards"
            description="Test your memory"
          />
          <QuickActionCard
            href="/course/apush#quiz"
            icon="✏️"
            title="Practice Questions"
            description="Check understanding"
          />
          <QuickActionCard
            href="/course/apush#mock-exam"
            icon="📝"
            title="Mock Exams"
            description="Full exam practice"
          />
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  subtext,
}: {
  label: string;
  value: number;
  subtext: string;
}) {
  return (
    <div className="text-center p-3 bg-muted/30 rounded-lg">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">
        {label}
      </p>
      <p className="text-xs text-muted-foreground/70">{subtext}</p>
    </div>
  );
}

function QuickActionCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="card p-4 hover:border-primary/50 transition-colors group"
    >
      <span className="text-2xl mb-2 block">{icon}</span>
      <p className="font-medium text-sm group-hover:text-primary transition-colors">
        {title}
      </p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </Link>
  );
}
