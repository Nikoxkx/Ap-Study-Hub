"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { usePrefs } from "@/lib/use-prefs";
import { getAssetUrl } from "@/lib/custom-assets";

/**
 * Full-bleed viewport background wallpaper.
 *
 * Assigns exactly one classroom/corridor photograph per route so wallpapers
 * never overlap, stack, or appear inside random content containers — unless the
 * visitor has chosen a specific painting, or uploaded their own, in /settings.
 * In that case their choice wins on every route, which is what "background"
 * means to the person who set it.
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
  "/settings": "/bg-class.jpg",
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
  const { prefs } = usePrefs();
  const { appearance } = prefs;
  // The resolved blob URL is stored together with the id it belongs to, so a
  // stale URL for a previously chosen wallpaper can never be shown: it simply
  // does not match. Nothing is reset from inside the effect.
  const [resolved, setResolved] = useState<{ id: string; url: string | null } | null>(null);

  const customId = appearance.wallpaper.startsWith("custom:") ? appearance.wallpaper.slice(7) : null;

  useEffect(() => {
    if (!customId) return;
    let cancelled = false;
    getAssetUrl(customId).then((url) => {
      if (!cancelled) setResolved({ id: customId, url });
    });
    return () => {
      cancelled = true;
    };
  }, [customId]);

  const customUrl = customId && resolved?.id === customId ? resolved.url : null;

  if (!appearance.showWallpaper) return null;

  const src = appearance.wallpaper === "auto"
    ? wallpaperForPath(pathname)
    : customId
      ? customUrl
      : appearance.wallpaper;

  if (!src) return null;

  return (
    <>
      <div
        aria-hidden="true"
        data-wallpaper={src}
        className="page-wallpaper no-print"
        style={{
          backgroundImage: `url("${src}")`,
          backgroundSize: appearance.wallpaperFit,
          filter: appearance.wallpaperBlur > 0 ? `blur(${appearance.wallpaperBlur}px)` : undefined,
          // A blurred element shows its own edges; scaling past the viewport
          // hides them without a second layer.
          transform: appearance.wallpaperBlur > 0 ? "scale(1.06)" : undefined,
        }}
      />
      {appearance.wallpaperDim > 0 ? (
        <div
          aria-hidden="true"
          className="page-wallpaper-dim no-print"
          style={{ background: `rgba(0, 0, 0, ${appearance.wallpaperDim / 100})` }}
        />
      ) : null}
    </>
  );
}

export default PageBackground;
