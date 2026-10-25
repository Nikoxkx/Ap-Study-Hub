import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseLab } from "@/components/CourseLab";
import { FRQStudio } from "@/components/FRQStudio";
import { VariantLab } from "@/components/VariantLab";
import { ConnectionMap } from "@/components/ConnectionMap";
import { OfflinePackButton } from "@/components/OfflinePackButton";
import { getCourse, getCatalog } from "@/lib/catalog";
import { getCourseLabs } from "@/content/labs";
import { getStudioTasks } from "@/lib/studio-data";
import { getStudyCourses } from "@/lib/study-data";
import { absoluteUrl, socialImages } from "@/lib/site";

export function generateStaticParams() {
  return getCatalog().map((course) => ({ slug: course.subject.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  const title = `${course.subject.familiar}, in your own hands`;
  const description = `Interactive ${course.subject.familiar} lessons, timed writing with transparent self-assessment, curriculum connections, and printable study work.`;
  return {
    title,
    description,
    alternates: { canonical: `/course/${course.subject.slug}/studio` },
    openGraph: { images: socialImages, title, description, url: absoluteUrl(`/course/${course.subject.slug}/studio`) },
    twitter: { card: "summary_large_image", images: socialImages },
  };
}

const tabs = [
  { id: "lab", label: "Interactive lab" },
  { id: "writing", label: "Writing studio" },
  { id: "variants", label: "Question variants" },
  { id: "connections", label: "Connections" },
] as const;

export default async function StudioPage({ params, searchParams }: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tab?: string | string[] }>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const course = getCourse(slug);
  if (!course) notFound();
  const requested = Array.isArray(query.tab) ? query.tab[0] : query.tab;
  const active = tabs.some((tab) => tab.id === requested) ? requested! : "lab";
  const labs = getCourseLabs(course.subject.slug);
  const tasks = getStudioTasks(course);
  const courses = getStudyCourses();
  const studyCourse = courses.find((item) => item.slug === course.subject.slug)!;
  const hasVariants = course.subject.slug === "ap-calc" || course.subject.slug === "ap-bio";
  const base = `/course/${course.subject.slug}`;
  const offlineRoutes = [base, `${base}/notes`, `${base}/cards`, `${base}/practice`, `${base}/print`,
    ...tabs.filter((tab) => tab.id !== "variants" || hasVariants).map((tab) => `${base}/studio?tab=${tab.id}`),
    ...(course.essays.length ? [`${base}/essays`] : []), ...(course.mockExams.length ? [`${base}/exam`] : [])];

  return (
    <div className="wrap py-12 md:py-16">
      <header className="studio-hero">
        <div>
          <p className="label mb-2">Try it yourself</p>
          <h2>{course.subject.familiar}, in your own hands</h2>
          <p className="lede mt-4">Interactive work connected to the same lessons, review schedule, and local progress record. Original practice only; no automated AP score claims.</p>
        </div>
        <div className="studio-hero-actions no-print">
          <Link href={`${base}/print`} className="btn btn-outline btn-sm">Printable packet</Link>
          <OfflinePackButton courseLabel={course.subject.familiar} routes={offlineRoutes} />
        </div>
      </header>

      <nav className="studio-tabs no-print" aria-label="Studio sections">
        {tabs.filter((tab) => tab.id !== "variants" || hasVariants).map((tab) => <Link key={tab.id} href={`${base}/studio?tab=${tab.id}`} aria-current={active === tab.id ? "page" : undefined}>
          {tab.label}{tab.id === "lab" ? ` · ${labs.length}` : tab.id === "writing" ? ` · ${tasks.length}` : ""}
        </Link>)}
      </nav>

      <div className="studio-body">
        {active === "lab" ? <div className="space-y-10">{labs.map((lab) => <CourseLab key={lab.id} lab={lab} courseLabel={course.subject.familiar} />)}</div> : null}
        {active === "writing" ? <FRQStudio tasks={tasks} courseSlug={course.subject.slug} /> : null}
        {active === "variants" && hasVariants ? <VariantLab courseSlug={course.subject.slug} /> : null}
        {active === "connections" ? <ConnectionMap course={studyCourse} courses={courses} /> : null}
      </div>
    </div>
  );
}
