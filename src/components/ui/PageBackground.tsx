"use client";

import { usePathname } from "next/navigation";

/**
 * Full-bleed viewport background wallpaper.
 *
 * Assigns exactly one classroom/corridor photograph per route so wallpapers
 * never overlap, stack, or appear inside random content containers.
 *
 * Route → classroom wallpaper mapping:
 *   • /bg-music-class.jpg — Home (/), About (/about)
 *   • /bg-corridor.jpg    — Study Desk (/study), Search (/search),
 *                           Integrations (/integrations), AI Disclosure (/ai-disclosure)
 *   • /bg-class.jpg       — Course overviews (/course/[slug]), Cards, Course Videos,
 *                           Study Guides (/guides), Video Library (/videos)
 *   • /bg-class2.jpg      — Deep study surfaces: Notes, Practice, Studio, Essays,
 *                           Timed Paper, Sources, Privacy, Accessibility
 */
const EXACT_ROUTE_WALLPAPERS: Record<string, string> = {
  "/": "/bg-music-class.jpg",
  "/about": "/bg-music-class.jpg",
  "/study": "/bg-corridor.jpg",
  "/search": "/bg-corridor.jpg",
  "/integrations": "/bg-corridor.jpg",
  "/ai-disclosure": "/bg-corridor.jpg",
  "/guides": "/bg-class.jpg",
  "/videos": "/bg-class.jpg",
  "/privacy": "/bg-class2.jpg",
  "/accessibility": "/bg-class2.jpg",
};

export function wallpaperForPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (EXACT_ROUTE_WALLPAPERS[clean]) {
    return EXACT_ROUTE_WALLPAPERS[clean];
  }

  if (clean.startsWith("/course/")) {
    const parts = clean.split("/").filter(Boolean); // ["course", slug, mode?]
    const mode = parts[2];
    if (!mode || mode === "cards" || mode === "videos") {
      return "/bg-class.jpg";
    }
    return "/bg-class2.jpg";
  }

  return "/bg-music-class.jpg";
}

export function PageBackground() {
  const pathname = usePathname() ?? "/";
  const src = wallpaperForPath(pathname);

  return (
    <div
      aria-hidden="true"
      data-wallpaper={src}
      className="page-wallpaper no-print"
      style={{
        backgroundImage: `url("${src}")`,
      }}
    />
  );
}

export default PageBackground;
