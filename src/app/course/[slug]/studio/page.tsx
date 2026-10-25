import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseLab } from "@/components/CourseLab";
import { FRQStudio } from "@/components/FRQStudio";
import { VariantLab } from "@/components/VariantLab";
import { ConnectionMap } from "@/components/ConnectionMap";
import { OfflinePackButton } from "@/components/OfflinePackButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { ClassTabs } from "@/components/ui/ClassTabs";
import { DownloadButton } from "@/components/ui/DownloadButton";
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

export default async function StudioPage({
  params,
  searchParams,
}: {
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
  const offlineRoutes = [
    base,
    `${base}/notes`,
    `${base}/cards`,
    `${base}/practice`,
    `${base}/print`,
    ...tabs.filter((tab) => tab.id !== "variants" || hasVariants).map((tab) => `${base}/studio?tab=${tab.id}`),
    ...(course.essays.length ? [`${base}/essays`] : []),
    ...(course.mockExams.length ? [`${base}/exam`] : []),
  ];

  const visibleTabs = tabs.filter((tab) => tab.id !== "variants" || hasVariants);

  return (
    <div className="wrap space-y-8 py-8 md:py-12">
      <GlassCard as="header" padding="lg" className="studio-hero !mb-0">
        <div>
          <p className="label mb-2">Try it yourself</p>
          <h2>{course.subject.familiar}, in your own hands</h2>
          <p className="lede mt-3">
            Interactive work connected to the same lessons, review schedule, and local progress
            record. Scratch drafts sit on lined notebook paper.
          </p>
        </div>
        <div className="studio-hero-actions no-print items-start">
          <DownloadButton href={`${base}/print`} internal>
            Printable packet
          </DownloadButton>
          <OfflinePackButton courseLabel={course.subject.familiar} routes={offlineRoutes} />
        </div>
      </GlassCard>

      <div className="no-print flex justify-center">
        <ClassTabs
          name={`studio-tabs-${course.subject.slug}`}
          ariaLabel="Studio sections"
          value={active}
          options={visibleTabs.map((tab) => ({
            value: tab.id,
            href: `${base}/studio?tab=${tab.id}`,
            label: `${tab.label}${
              tab.id === "lab"
                ? ` · ${labs.length}`
                : tab.id === "writing"
                  ? ` · ${tasks.length}`
                  : ""
            }`,
          }))}
        />
      </div>

      <div className="studio-body mx-auto">
        {active === "lab" ? (
          <div className="space-y-10">
            {labs.map((lab) => (
              <CourseLab key={lab.id} lab={lab} courseLabel={course.subject.familiar} />
            ))}
          </div>
        ) : null}
        {active === "writing" ? (
          <GlassCard padding="lg">
            <FRQStudio tasks={tasks} courseSlug={course.subject.slug} />
          </GlassCard>
        ) : null}
        {active === "variants" && hasVariants ? (
          <GlassCard padding="lg">
            <VariantLab courseSlug={course.subject.slug} />
          </GlassCard>
        ) : null}
        {active === "connections" ? (
          <GlassCard padding="lg">
            <ConnectionMap course={studyCourse} courses={courses} />
          </GlassCard>
        ) : null}
      </div>
    </div>
  );
}
