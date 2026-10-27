"use client";

import { useEffect, useRef, useState } from "react";
import {
  videoEmbedUrl,
  videoSearchUrl,
  videoWatchUrl,
  type UnitVideo,
} from "@/lib/video-lessons";
import { useScrollLock } from "@/lib/scroll-lock";
import { addStudyEvent } from "@/lib/study-model";
import { useStudyState } from "@/lib/use-study-state";
import { useVideoProgress } from "@/lib/video-progress";
import { site } from "@/lib/site";
import { VideoThumbnail } from "./VideoThumbnail";
import { LoadingSpinner } from "./ui/LoadingSpinner";

/**
 * Click-to-load unit video player with a real YouTube poster and conflict-free
 * full-screen playback.
 *
 * The creator's actual thumbnail is fetched from YouTube's static image host as
 * soon as the player renders. The privacy-enhanced YouTube frame is still not
 * requested until the visitor presses play, so browsing notes never loads a
 * video script or embedded player. Every video also has a canonical watch link
 * and a scoped search link in case the creator removes or renames the video.
 */
export function UnitVideoPlayer({
  videos,
  courseSlug,
  unit,
  heading = "Learn this unit with a real teacher",
  compact = false,
}: {
  videos: UnitVideo[];
  courseSlug: string;
  unit: number;
  heading?: string;
  compact?: boolean;
}) {
  const [activeId, setActiveId] = useState(videos[0]?.id ?? "");
  const [loaded, setLoaded] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const [study, setStudy] = useStudyState();
  const [progress, setProgress] = useVideoProgress();
  const frameRef = useRef<HTMLDivElement>(null);

  const active = videos.find((v) => v.id === activeId) ?? videos[0];

  useEffect(() => {
    if (loaded && !expanded) {
      frameRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [loaded, activeId, expanded]);

  useEffect(() => {
    function onFullscreenChange() {
      const fsEl = document.fullscreenElement;
      if (fsEl && frameRef.current && (fsEl === frameRef.current || frameRef.current.contains(fsEl))) {
        setExpanded(true);
      } else if (!fsEl) {
        setExpanded(false);
      }
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  /* An expanded player takes the viewport, and the CSS rule that used to hide
     the page's scrollbar (`body:has(.unit-video-frame[data-expanded])`) made
     phones snap back to the top of the page. The shared lock holds the page
     still and restores the scroll position when the player closes. */
  useScrollLock(expanded);

  useEffect(() => {
    if (!expanded) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          void document.exitFullscreen().catch(() => {});
        }
        setExpanded(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  if (!active) {
    return (
      <aside className="unit-video-empty" aria-label="No video found for this unit">
        <p className="label">Unit video</p>
        <p>No verified video is listed for this unit yet. Use the unit notes and practice below, and check the video registry for updates.</p>
      </aside>
    );
  }

  const watched = Boolean(progress[active.id]?.watched);
  const reportHref = `${site.repo}/issues/new?title=${encodeURIComponent(`Broken unit video: ${courseSlug} unit ${unit}`)}&body=${encodeURIComponent(`The video ${active.title} (${active.id}) did not load from ${windowHref(active)}.`)}`;

  function play(video: UnitVideo, goFullscreen = false) {
    setActiveId(video.id);
    setIframeReady(false);
    setLoaded(true);
    if (goFullscreen) {
      setExpanded(true);
      if (frameRef.current?.requestFullscreen) {
        void frameRef.current.requestFullscreen().catch(() => {});
      }
    }
    setMessage(`Loading ${video.creator} in the privacy-enhanced player. The real thumbnail was already loaded; YouTube's captions and settings are inside the frame.`);
  }

  function toggleFullscreen() {
    if (!loaded) {
      play(active, true);
      return;
    }
    if (expanded) {
      if (document.fullscreenElement) {
        void document.exitFullscreen().catch(() => {});
      }
      setExpanded(false);
    } else {
      setExpanded(true);
      if (frameRef.current?.requestFullscreen) {
        void frameRef.current.requestFullscreen().catch(() => {});
      }
    }
  }

  function toggleWatched() {
    const next = !watched;
    setProgress((current) => ({
      ...current,
      [active.id]: {
        watched: next,
        at: next ? Date.now() : current[active.id]?.at ?? 0,
        notes: current[active.id]?.notes ?? "",
      },
    }));
    if (next && !study.events.some((event) => event.type === "video" && event.itemId === active.id)) {
      setStudy((current) => addStudyEvent(current, {
        at: Date.now(),
        type: "video",
        courseSlug: active.courseSlug,
        itemId: active.id,
      }));
    }
    setMessage(next ? "Marked watched in your local Study Desk." : "Removed from your watched videos.");
  }

  return (
    <section className="unit-video" aria-labelledby={`unit-video-${courseSlug}-${unit}`}>
      <div className="unit-video-head">
        <div>
          <p className="label">Chosen for this unit{compact ? "" : " · switch videos below"}</p>
          <h4 id={`unit-video-${courseSlug}-${unit}`}>{heading}</h4>
        </div>
        <span className="tag">{videos.length} {videos.length === 1 ? "video" : "videos"}</span>
      </div>

      <p className="unit-video-intro">
        Independent teaching videos, checked against this unit&rsquo;s topic sequence. The real YouTube
        thumbnail loads here automatically; pressing play loads only the privacy-enhanced player. No
        YouTube scripts or embedded frames are requested before you choose to play.
      </p>

      {videos.length > 1 ? (
        <div className="unit-video-choices" role="group" aria-label="Choose a video for this unit">
          {videos.map((v, index) => (
            <button
              key={v.id}
              type="button"
              className="unit-video-choice"
              aria-pressed={v.id === active.id}
              onClick={() => { setActiveId(v.id); setLoaded(false); setIframeReady(false); setExpanded(false); }}
            >
              <VideoThumbnail video={v} className="unit-video-choice-thumb" loading="lazy" />
              <span className="unit-video-choice-text">
                <span className="label">{index === 0 ? "Primary" : v.role}</span>
                <strong>{v.title}</strong>
                <small>{v.creator}</small>
              </span>
            </button>
          ))}
        </div>
      ) : null}

      <div className="unit-video-card">
        <div
          className="unit-video-frame"
          ref={frameRef}
          data-video-id={active.id}
          data-expanded={expanded ? "true" : "false"}
        >
          {loaded ? (
            <>
              {!iframeReady ? (
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/40">
                  <LoadingSpinner scale={0.7} label={`Loading ${active.title}…`} />
                </div>
              ) : null}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="unit-video-fs-toggle"
                aria-label={expanded ? "Exit full screen" : "Enter full screen"}
                title={expanded ? "Exit full screen (Esc)" : "Full screen"}
              >
                {expanded ? "✕ Exit full screen" : "⛶ Full screen"}
              </button>
              <iframe
                key={active.id}
                src={videoEmbedUrl(active)}
                title={`${active.title} — ${active.creator}`}
                loading="lazy"
                onLoad={() => setIframeReady(true)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </>
          ) : (
            <button type="button" className="unit-video-poster" onClick={() => play(active)} aria-label={`Play ${active.title} by ${active.creator}`}>
              <VideoThumbnail video={active} className="unit-video-thumb" />
              <span className="unit-video-poster-badge" aria-hidden="true">Actual YouTube thumbnail</span>
              <span className="unit-video-play" aria-hidden="true">▶</span>
              <span className="unit-video-poster-title">{active.title}</span>
              <span className="unit-video-poster-meta">{active.creator} · {active.role}</span>
              <span className="unit-video-poster-hint">Press play to load the privacy-enhanced player</span>
            </button>
          )}
        </div>

        <div className="unit-video-meta">
          <p className="label">{active.role}</p>
          <h5>{active.title}</h5>
          <p className="unit-video-creator">By {active.creator} · checked {active.checked}</p>
          <p className="unit-video-focus"><strong>Why this one:</strong> {active.focus}.</p>
          <div className="unit-video-actions">
            {!loaded ? (
              <button type="button" className="btn btn-solid btn-sm" onClick={() => play(active)}>Play here</button>
            ) : (
              <button type="button" className="btn btn-solid btn-sm" onClick={toggleFullscreen}>
                {expanded ? "Exit full screen" : "Full screen"}
              </button>
            )}
            <a className="btn btn-outline btn-sm" href={videoWatchUrl(active)} target="_blank" rel="noopener noreferrer">Open on YouTube</a>
            <a className="btn btn-quiet btn-sm" href={videoSearchUrl(active)} target="_blank" rel="noopener noreferrer">Find a replacement</a>
            <button type="button" className="btn btn-quiet btn-sm" aria-pressed={watched} onClick={toggleWatched}>{watched ? "✓ Watched" : "Mark watched"}</button>
          </div>
          <p className="unit-video-fineprint">
            The poster is a static image from <code>i.ytimg.com</code>, not a video embed. Captions,
            transcript, and playback settings arrive from YouTube only after you press play. These
            videos are independent creator work, not official College Board material.{" "}
            <a href={reportHref} target="_blank" rel="noopener noreferrer">Report a broken video</a>.
          </p>
          <p className="unit-video-status" role="status">{message}</p>
        </div>
      </div>
    </section>
  );
}

function windowHref(video: UnitVideo): string {
  return videoWatchUrl(video);
}
