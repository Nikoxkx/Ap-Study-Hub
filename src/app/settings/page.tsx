import type { Metadata } from "next";
import { getCatalog, getTotals } from "@/lib/catalog";
import { SettingsClient } from "@/components/settings/SettingsClient";
import { absoluteUrl, socialImages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Settings — make the hub yours",
  description:
    "Change the theme, wallpaper, colours, type, home-page layout, hero copy, and custom blocks; add your own sources to any course; see and control exactly what the site learns from you. Everything is stored in your browser.",
  alternates: { canonical: "/settings" },
  openGraph: {
    images: socialImages,
    title: "Settings · AP Study Hub",
    description:
      "Every colour, the wallpaper, the layout, your own sources, and the adaptive layer — all in one page, all local to your browser.",
    url: absoluteUrl("/settings"),
  },
  twitter: { card: "summary_large_image", images: socialImages },
  robots: { index: true, follow: true },
};

export default function SettingsPage() {
  const totals = getTotals();
  const subjects = getCatalog().map((course) => ({
    slug: course.subject.slug,
    familiar: course.subject.familiar,
    official: course.subject.official,
  }));

  return (
    <div className="wrap py-8 md:py-12">
      <SettingsClient
        subjects={subjects}
        totals={{
          courses: totals.courses,
          units: totals.units,
          paragraphs: totals.paragraphs,
          flashcards: totals.flashcards,
          questions: totals.questions,
        }}
      />
    </div>
  );
}
