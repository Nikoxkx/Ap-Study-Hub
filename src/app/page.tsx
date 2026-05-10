import Link from "next/link";
import { coursesData } from "@/lib/data";

const courseTheme: Record<string, { bg: string; text: string; badgeBg: string }> = {
  blue: { bg: "bg-blue-50 dark:bg-blue-950", text: "text-blue-600 dark:text-blue-400", badgeBg: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-950", text: "text-emerald-600 dark:text-emerald-400", badgeBg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" },
  purple: { bg: "bg-purple-50 dark:bg-purple-950", text: "text-purple-600 dark:text-purple-400", badgeBg: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" },
  red: { bg: "bg-red-50 dark:bg-red-950", text: "text-red-600 dark:text-red-400", badgeBg: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
  green: { bg: "bg-green-50 dark:bg-green-950", text: "text-green-600 dark:text-green-400", badgeBg: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
};

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-muted text-muted-foreground text-xs font-medium px-3 py-1.5 rounded-full mb-5">
              ✨ Free AP Exam Prep · 2025
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-purple-600 bg-clip-text text-transparent">
                ace your AP exams
              </span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
              Study guides, flashcards, video lessons, practice questions, and full mock exams — all free, no account required.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#courses" className="btn btn-primary h-11 px-6 text-sm font-semibold">
                Get started →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Built for AP success</h2>
          <p className="text-muted-foreground text-sm">Six tools to help you prepare for exam day.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: "📖", title: "Study Guides", desc: "Comprehensive unit-by-unit notes aligned with College Board." },
            { icon: "🎬", title: "Video Lessons", desc: "Curated YouTube tutorials from top AP educators." },
            { icon: "🃏", title: "Flashcards", desc: "Interactive cards for key terms and concepts." },
            { icon: "✅", title: "Practice Questions", desc: "AP-style MCQs with detailed explanations." },
            { icon: "📋", title: "Mock Exams", desc: "Full-length practice following the real format." },
            { icon: "🔗", title: "Resources", desc: "Links to official College Board materials." },
          ].map((f, i) => (
            <div key={i} className="card p-6">
              <span className="text-3xl mb-4 block">{f.icon}</span>
              <h3 className="font-semibold text-base mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="bg-muted/30 border-y border-border py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Choose your course</h2>
            <p className="text-muted-foreground text-sm">Select an AP course to start studying.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {coursesData.map((course, idx) => {
              const t = courseTheme[course.color] || courseTheme.blue;
              return (
                <Link key={course.id} href={`/course/${course.slug}`} className="card group hover:-translate-y-1 transition-all duration-200">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${t.bg} flex items-center justify-center text-2xl`}>{course.icon}</div>
                      <div>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{course.shortName}</p>
                        <h3 className="font-semibold text-base tracking-tight group-hover:underline">{course.name}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`badge ${t.badgeBg} text-[10px]`}>📅 {course.examDate}</span>
                      <span className={`text-sm font-medium ${t.text}`}>Study →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="border-t border-border bg-muted/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold mb-6">Y</div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Why I Built This</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Hey, I&apos;m Yeisbel. As a student preparing for AP exams, I noticed how scattered and expensive most study resources were. 
            Some sites charged monthly fees, others required accounts just to view basic content, and YouTube videos were buried under algorithm noise.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I built AP Study Hub because every student deserves free, organized, quality study materials without barriers. 
            No accounts. No payments. No ads. Just everything you need to ace your AP exams in one place.
          </p>
          <p className="text-sm text-muted-foreground/80 italic">
            Good luck on your exams. You&apos;ve got this.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-2xl font-bold tracking-tight mb-3">Ready to start?</h2>
        <p className="text-muted-foreground mb-6">Pick a course and begin studying today — it&apos;s completely free.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/course/apush" className="btn btn-primary h-10 px-5 text-sm">Study APUSH</Link>
          <Link href="/course/ap-gov" className="btn btn-outline h-10 px-5 text-sm">Study AP Gov</Link>
          <Link href="/course/ap-bio" className="btn btn-outline h-10 px-5 text-sm">Study AP Bio</Link>
          <Link href="#courses" className="btn btn-outline h-10 px-5 text-sm">All Courses</Link>
        </div>
      </section>
    </div>
  );
}
