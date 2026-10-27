"use client";

import { usePathname } from "next/navigation";
import { ClassTabs } from "@/components/ui/ClassTabs";

interface CourseTabsProps {
  slug: string;
  available: {
    notes: boolean;
    videos: boolean;
    cards: boolean;
    practice: boolean;
    essays: boolean;
    exam: boolean;
    resources: boolean;
  };
}

export function CourseTabs({ slug, available }: CourseTabsProps) {
  const pathname = usePathname() ?? "";
  const base = `/course/${slug}`;

  const tabs = [
    { value: base, href: base, label: "Overview", show: true },
    { value: `${base}/notes`, href: `${base}/notes`, label: "Notes", show: available.notes },
    { value: `${base}/videos`, href: `${base}/videos`, label: "Videos", show: available.videos },
    { value: `${base}/studio`, href: `${base}/studio`, label: "Studio", show: true },
    { value: `${base}/cards`, href: `${base}/cards`, label: "Cards", show: available.cards },
    { value: `${base}/practice`, href: `${base}/practice`, label: "Practice", show: available.practice },
    { value: `${base}/essays`, href: `${base}/essays`, label: "Essays", show: available.essays },
    { value: `${base}/exam`, href: `${base}/exam`, label: "Interim exam", show: available.exam },
    { value: `${base}/resources`, href: `${base}/resources`, label: "Sources", show: available.resources },
  ].filter((tab) => tab.show);

  return (
    <div className="wrap my-5 flex justify-center">
      <ClassTabs
        name={`course-tabs-${slug}`}
        ariaLabel="Study modes"
        value={pathname}
        options={tabs}
        className="max-w-full"
      />
    </div>
  );
}
