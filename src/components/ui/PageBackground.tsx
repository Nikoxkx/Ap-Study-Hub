"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { usePrefs } from "@/lib/use-prefs";
import { getAsset } from "@/lib/custom-assets";
import { hasAudioTrack } from "@/lib/video-audio";

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
  const { prefs, update } = usePrefs();
  const { appearance } = prefs;
  // The resolved asset is stored together with the id it belongs to, so a
  // stale URL for a previously chosen wallpaper can never be shown: it simply
  // does not match. Nothing is reset from inside the effect.
  const [resolved, setResolved] = useState<{ id: string; url: string | null; kind: "image" | "video" } | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Autoplay with sound is refused by the browser until the visitor has
  // interacted with the page. Rather than silently ignoring their "sound on"
  // setting, the player reports it and the pill below offers one tap.
  const [blocked, setBlocked] = useState(false);
  const [ready, setReady] = useState(false);
  // null = the browser did not say; treated as "maybe", so the switch is offered.
  const [hasAudio, setHasAudio] = useState<boolean | null>(null);
  // A MOV recorded on an iPhone plays in Safari and not in Chrome. When the
  // element refuses the file, the route painting comes back rather than a black
  // rectangle, so the page never loses its background to an unplayable codec.
  const [failed, setFailed] = useState(false);

  const customId = appearance.wallpaper.startsWith("custom:") ? appearance.wallpaper.slice(7) : null;

  useEffect(() => {
    if (!customId) return;
    let cancelled = false;
    getAsset(customId).then((asset) => {
      if (!cancelled) setResolved({ id: customId, url: asset?.url ?? null, kind: asset?.kind ?? "image" });
    });
    return () => {
      cancelled = true;
    };
  }, [customId]);

  const custom = customId && resolved?.id === customId ? resolved : null;
  const customUrl = custom?.url ?? null;
  const customKind = custom?.kind ?? "image";

  useEffect(() => {
    if (!customUrl || customKind !== "video") return;
    let cancelled = false;
    hasAudioTrack(customUrl).then((answer) => {
      if (!cancelled) setHasAudio(answer);
    });
    return () => {
      cancelled = true;
    };
  }, [customUrl, customKind]);

  // Volume is a property, not an attribute: it has to be assigned to the element.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = Math.min(1, Math.max(0, appearance.wallpaperVolume / 100));
    video.muted = !appearance.wallpaperSound;
  }, [appearance.wallpaperVolume, appearance.wallpaperSound, customUrl, customKind]);

  if (!appearance.showWallpaper) return null;

  const src = appearance.wallpaper === "auto"
    ? wallpaperForPath(pathname)
    : customId
      ? failed
        ? wallpaperForPath(pathname)
        : customUrl
      : appearance.wallpaper;

  if (!src) return null;

  const isVideo = appearance.wallpaper !== "auto" && Boolean(customId) && customKind === "video" && !failed;

  const layerStyle = {
    filter: appearance.wallpaperBlur > 0 ? `blur(${appearance.wallpaperBlur}px)` : undefined,
    // A blurred element shows its own edges; scaling past the viewport
    // hides them without a second layer.
    transform: appearance.wallpaperBlur > 0 ? "scale(1.06)" : undefined,
  } as const;

  return (
    <>
      {isVideo ? (
        <video
          ref={videoRef}
          aria-hidden="true"
          className="page-wallpaper page-wallpaper-video no-print"
          data-wallpaper={src}
          src={src}
          autoPlay
          loop
          playsInline
          // iOS will not start a video until metadata is there, and a paused
          // first frame is better than an empty backdrop.
          preload="metadata"
          muted={!appearance.wallpaperSound}
          style={{ ...layerStyle, objectFit: appearance.wallpaperFit }}
          onLoadedData={() => setReady(true)}
          onError={() => {
            setReady(false);
            setFailed(true);
          }}
          onPlay={() => setBlocked(false)}
        />
      ) : (
        <div
          aria-hidden="true"
          data-wallpaper={src}
          className="page-wallpaper no-print"
          style={{
            backgroundImage: `url("${src}")`,
            backgroundSize: appearance.wallpaperFit,
            ...layerStyle,
          }}
        />
      )}
      {isVideo && ready && hasAudio !== false && (blocked || !appearance.wallpaperSound) ? (
        <button
          type="button"
          className="wallpaper-sound-pill no-print"
          aria-pressed={appearance.wallpaperSound}
          title={appearance.wallpaperSound ? "Mute the background video" : "Unmute the background video"}
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;
            const next = !appearance.wallpaperSound;
            video.muted = !next;
            video.volume = Math.min(1, Math.max(0, appearance.wallpaperVolume / 100));
            if (next) {
              // One tap is a gesture, so this is allowed to succeed.
              video.play().catch(() => setBlocked(true));
            }
            setBlocked(false);
            update((draft) => {
              draft.appearance.wallpaperSound = next;
            });
          }}
        >
          {appearance.wallpaperSound ? "Sound on" : blocked ? "Tap for sound" : "Sound off"}
        </button>
      ) : null}
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
