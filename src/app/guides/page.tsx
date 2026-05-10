import Link from "next/link";

export const metadata = { title: "Study Guides & Resources | AP Study Hub", description: "Comprehensive AP study guides, test-taking strategies, and curated resources." };

const generalTips = [
  { title: "Start Early & Space It Out", content: "Begin reviewing 2-3 months before the exam. Use spaced repetition—study a little each day rather than cramming." },
  { title: "Know the Exam Format", content: "Understand MCQ vs FRQ breakdown, timing, and point distribution. Practice under timed conditions." },
  { title: "Use Official Resources", content: "AP Classroom, past FRQs, and scoring guidelines are your best friends. They show exactly what graders look for." },
  { title: "Active Recall > Passive Reading", content: "Test yourself constantly. Flashcards, practice questions, and teaching concepts to others beats re-reading notes." },
  { title: "Review Your Mistakes", content: "Wrong answers are learning opportunities. Understand WHY you missed each question." },
];

const subjectTips = [
  { subject: "Writing DBQs (APUSH/AP Euro/AP World)", tips: ["Spend 10-15 min planning before writing", "Use 5-7 documents minimum", "Include outside evidence beyond docs", "Address all parts of the prompt", "Group documents thematically, not sequentially"] },
  { subject: "AP Bio FRQs", tips: ["Answer in complete sentences", "Use scientific terminology precisely", "Show your math work for calculations", "Draw and label diagrams when helpful", "Address every part—partial credit matters"] },
  { subject: "AP Lang Essays", tips: ["Strong thesis = specific + arguable claim", "Use embedded quotes, not block quotes", "Analyze HOW rhetoric works, not just WHAT it says", "Commentary > evidence quantity", "Vary sentence structure for style points"] },
  { subject: "AP Calc FRQs", tips: ["Show ALL work—no skipping steps", "Use proper notation (dy/dx, not y')", "Justify answers when asked", "Check units in applied problems", "If stuck, write what you know for partial credit"] },
];

const testStrategies = [
  { title: "Process of Elimination", content: "Cross out obviously wrong answers first. Even eliminating 1-2 options improves your odds significantly." },
  { title: "Time Management", content: "Don't spend more than 1-2 min per MCQ. Flag hard questions and return later. For FRQs, allocate time per question." },
  { title: "Read Questions First", content: "For reading-heavy sections, skim questions before the passage to know what to look for." },
  { title: "Answer Everything", content: "No penalty for wrong answers on AP exams. Never leave anything blank." },
  { title: "Pace Yourself", content: "Check the clock at 25%, 50%, 75% marks. Adjust speed if needed." },
];

const annotationTips = [
  { title: "Use a System", content: "Develop consistent symbols: ★ for key points, ? for confusion, ! for important, → for connections." },
  { title: "Summarize Paragraphs", content: "Write 2-5 word margin summaries for each paragraph or section." },
  { title: "Highlight Sparingly", content: "If everything is highlighted, nothing stands out. Be selective." },
  { title: "Connect to Prior Knowledge", content: "Note connections to other topics, current events, or personal experiences." },
];

const stressTips = [
  { title: "Sleep > Studying", content: "Your brain consolidates memories during sleep. 7-8 hours before exams is non-negotiable." },
  { title: "Take Breaks", content: "Use the Pomodoro technique: 25 min work, 5 min break. Take a longer break every 2 hours." },
  { title: "Exercise & Move", content: "Even a 10-min walk improves focus and reduces anxiety." },
  { title: "Eat Well", content: "Avoid sugar crashes. Eat protein and complex carbs before exams." },
  { title: "It's Just a Test", content: "APs don't define you. Many successful people never took APs. Do your best and move on." },
];

const youtubeChannels = [
  { name: "Heimler's History", url: "https://youtube.com/@heimaborstudies", subjects: "APUSH, AP Gov, AP World, AP Euro" },
  { name: "Bozeman Science", url: "https://youtube.com/@baborananscience", subjects: "AP Bio, AP Chem, AP Physics, AP Environmental" },
  { name: "Coach Hall Writes", url: "https://youtube.com/@CoachHallWrites", subjects: "AP Lang, AP Lit" },
  { name: "The Organic Chemistry Tutor", url: "https://youtube.com/@TheOrganicChemistryTutor", subjects: "AP Calc, AP Physics, AP Chem" },
  { name: "Tom Richey", url: "https://youtube.com/@TomRichey", subjects: "AP Euro, AP World, APUSH" },
  { name: "Professor Dave Explains", url: "https://youtube.com/@ProfessorDaveExplains", subjects: "AP Chem, AP Bio, AP Physics" },
  { name: "Khan Academy", url: "https://youtube.com/@khanacademy", subjects: "All AP subjects" },
];

const communities = [
  { name: "r/APStudents", url: "https://reddit.com/r/APStudents", desc: "General AP discussion, tips, and memes" },
  { name: "r/APUSH", url: "https://reddit.com/r/APUSH", desc: "AP US History specific help" },
  { name: "r/APBio", url: "https://reddit.com/r/APBio", desc: "AP Biology study group" },
  { name: "r/APChem", url: "https://reddit.com/r/APChem", desc: "AP Chemistry help" },
  { name: "r/APLang", url: "https://reddit.com/r/APLang", desc: "AP Language & Composition" },
  { name: "r/APCalc", url: "https://reddit.com/r/APCalc", desc: "AP Calculus AB/BC" },
];

const resources = [
  { name: "AP Classroom", url: "https://apclassroom.collegeboard.org", desc: "Official practice questions & videos", type: "Official" },
  { name: "Khan Academy", url: "https://khanacademy.org", desc: "Free courses for most AP subjects", type: "Free" },
  { name: "Fiveable", url: "https://fiveable.me", desc: "Study guides, live streams, practice", type: "Free/Paid" },
  { name: "Albert.io", url: "https://albert.io", desc: "Practice questions with explanations", type: "Free/Paid" },
  { name: "OpenStax", url: "https://openstax.org", desc: "Free peer-reviewed textbooks", type: "Free" },
  { name: "CK-12", url: "https://ck12.org", desc: "Free STEM textbooks and practice", type: "Free" },
  { name: "AP Central", url: "https://apcentral.collegeboard.org", desc: "Past FRQs and scoring guidelines", type: "Official" },
  { name: "Barron's AP Prep", url: "https://barronsbooks.com", desc: "Comprehensive review books", type: "Paid" },
];

const creditChart = [
  { score: 5, acceptance: "Most colleges grant credit or placement", examples: "Harvard, MIT, Stanford accept for placement; state schools often grant full credit" },
  { score: 4, acceptance: "Many colleges grant credit", examples: "Most state universities, many private colleges grant credit" },
  { score: 3, acceptance: "Some colleges grant credit", examples: "State schools often accept; selective schools may not" },
  { score: "1-2", acceptance: "Rarely accepted", examples: "Keep studying! Retake if possible" },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block">← Back to Home</Link>
        
        <h1 className="text-3xl font-bold tracking-tight mb-2">AP Study Guides & Resources</h1>
        <p className="text-muted-foreground mb-8">Everything you need to ace your AP exams—strategies, resources, and tips from students who&apos;ve been there.</p>

        {/* General Study Tips */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">How to Study for APs</h2>
          <div className="grid gap-3">
            {generalTips.map((tip, i) => (
              <div key={i} className="card p-4">
                <h3 className="font-semibold text-sm mb-1">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">{tip.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Subject-Specific Tips */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Subject-Specific Strategies</h2>
          <div className="grid gap-4">
            {subjectTips.map((item, i) => (
              <div key={i} className="card p-4">
                <h3 className="font-semibold text-sm mb-2">{item.subject}</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {item.tips.map((tip, j) => <li key={j}>• {tip}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Test-Taking Strategies */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Test-Taking Strategies</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {testStrategies.map((s, i) => (
              <div key={i} className="card p-4">
                <h3 className="font-semibold text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Annotation Tips */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">How to Read & Annotate</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {annotationTips.map((t, i) => (
              <div key={i} className="card p-4">
                <h3 className="font-semibold text-sm mb-1">{t.title}</h3>
                <p className="text-xs text-muted-foreground">{t.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stress Management */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Stress Management & Self-Care</h2>
          <div className="grid gap-3">
            {stressTips.map((t, i) => (
              <div key={i} className="card p-4">
                <h3 className="font-semibold text-sm mb-1">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* YouTube Channels */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">YouTube Channel Recommendations</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {youtubeChannels.map((c, i) => (
              <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="card p-4 hover:bg-muted/50 transition">
                <h3 className="font-semibold text-sm">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.subjects}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Online Resources */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Free & Official Resources</h2>
          <div className="grid gap-2">
            {resources.map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="card p-3 flex items-center justify-between hover:bg-muted/50 transition">
                <div>
                  <h3 className="font-semibold text-sm">{r.name}</h3>
                  <p className="text-xs text-muted-foreground">{r.desc}</p>
                </div>
                <span className="text-[10px] px-2 py-1 rounded bg-muted">{r.type}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Reddit Communities */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Reddit AP Communities</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {communities.map((c, i) => (
              <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="card p-4 hover:bg-muted/50 transition">
                <h3 className="font-semibold text-sm text-orange-500">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* College Credit Chart */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">College Credit Equivalency</h2>
          <p className="text-sm text-muted-foreground mb-4">Credit policies vary by school. Always check your target college&apos;s specific AP policy.</p>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-semibold">Score</th>
                  <th className="p-3 text-left font-semibold">Acceptance</th>
                  <th className="p-3 text-left font-semibold hidden sm:table-cell">Examples</th>
                </tr>
              </thead>
              <tbody>
                {creditChart.map((row, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="p-3 font-bold">{row.score}</td>
                    <td className="p-3 text-muted-foreground">{row.acceptance}</td>
                    <td className="p-3 text-muted-foreground text-xs hidden sm:table-cell">{row.examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Pro tip: Use <a href="https://apstudents.collegeboard.org/getting-credit-placement/search-policies" target="_blank" rel="noopener noreferrer" className="underline">College Board&apos;s AP Credit Policy Search</a> to find your school&apos;s exact policy.</p>
        </section>

        <div className="text-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Ready to start studying?</p>
          <Link href="/" className="btn btn-primary">Browse All Courses</Link>
        </div>
      </div>
    </div>
  );
}
