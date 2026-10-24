"use client";

import { useEffect, useRef, useState } from "react";
import {
  videoEmbedUrl,
  videoSearchUrl,
  videoWatchUrl,
  type UnitVideo,
} from "@/lib/video-lessons";
import { addStudyEvent } from "@/lib/study-model";
import { useStudyState } from "@/lib/use-study-state";
import { useVideoProgress } from "@/lib/video-progress";
import { site } from "@/lib/site";

/**
 * Click-to-load unit video player.
 *
 * The privacy-enhanced YouTube frame is not requested until the visitor presses
 * play. Before that, the poster is pure HTML/CSS from our origin, so browsing
 * notes does not contact YouTube. Every video also has a canonical watch link
 * and a scoped search link in case the creator removes or renames the video.
 */
export function UnitVideoPlayer({
  videos,
  courseSlug,
  unit,
  heading = "Watch this unit",
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
  const [message, setMessage] = useState("");
  const [study, setStudy] = useStudyState();
  const [progress, setProgress] = useVideoProgress();
  const frameRef = useRef<HTMLDivElement>(null);

  const active = videos.find((v) => v.id === activeId) ?? videos[0];

  useEffect(() => {
    if (loaded) frameRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [loaded, activeId]);

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

  function play(video: UnitVideo) {
    setActiveId(video.id);
    setLoaded(true);
    setMessage(`Loading ${video.creator} in the privacy-enhanced player. YouTube's own captions and settings are inside the frame.`);
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
          <p className="label">Curated unit video{compact ? "" : "s"}</p>
          <h4 id={`unit-video-${courseSlug}-${unit}`}>{heading}</h4>
        </div>
        <span className="tag">{videos.length} {videos.length === 1 ? "video" : "videos"}</span>
      </div>

      <p className="unit-video-intro">
        Independent teaching videos, checked against this unit&rsquo;s topic sequence. Press play to load the
        privacy-enhanced YouTube player here; nothing is requested from YouTube until you do.
      </p>

      {videos.length > 1 ? (
        <div className="unit-video-choices" role="group" aria-label="Choose a video for this unit">
          {videos.map((v, index) => (
            <button
              key={v.id}
              type="button"
              className="unit-video-choice"
              aria-pressed={v.id === active.id}
              onClick={() => { setActiveId(v.id); setLoaded(false); }}
            >
              <span className="label">{index === 0 ? "Primary" : v.role}</span>
              <strong>{v.title}</strong>
              <small>{v.creator}</small>
            </button>
          ))}
        </div>
      ) : null}

      <div className="unit-video-card">
        <div className="unit-video-frame" ref={frameRef} data-video-id={active.id}>
          {loaded ? (
            <iframe
              key={active.id}
              src={videoEmbedUrl(active)}
              title={`${active.title} — ${active.creator}`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button type="button" className="unit-video-poster" onClick={() => play(active)} aria-label={`Play ${active.title} by ${active.creator}`}>
              <span className="unit-video-play" aria-hidden="true">▶</span>
              <span className="unit-video-poster-title">{active.title}</span>
              <span className="unit-video-poster-meta">{active.creator} · {active.role}</span>
              <span className="unit-video-poster-hint">Click to load the video player</span>
            </button>
          )}
        </div>

        <div className="unit-video-meta">
          <p className="label">{active.role}</p>
          <h5>{active.title}</h5>
          <p className="unit-video-creator">By {active.creator} · checked {active.checked}</p>
          <p className="unit-video-focus"><strong>Why this one:</strong> {active.focus}.</p>
          <div className="unit-video-actions">
            {!loaded ? <button type="button" className="btn btn-solid btn-sm" onClick={() => play(active)}>Play here</button> : null}
            <a className="btn btn-outline btn-sm" href={videoWatchUrl(active)} target="_blank" rel="noopener noreferrer">Open on YouTube</a>
            <a className="btn btn-quiet btn-sm" href={videoSearchUrl(active)} target="_blank" rel="noopener noreferrer">Find a replacement</a>
            <button type="button" className="btn btn-quiet btn-sm" aria-pressed={watched} onClick={toggleWatched}>{watched ? "✓ Watched" : "Mark watched"}</button>
          </div>
          <p className="unit-video-fineprint">
            Captions, transcript, and playback settings are controlled by YouTube inside the frame. These videos are independent creator work, not official College Board material.
            {" "}<a href={reportHref} target="_blank" rel="noopener noreferrer">Report a broken video</a>.
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
