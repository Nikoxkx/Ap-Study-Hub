"use client";

/* eslint-disable @next/next/no-img-element -- YouTube thumbnails are static remote images. A plain, eager <img> loads the creator's real thumbnail without sending it through the Next image optimizer or waiting for a click. */

import { useState } from "react";
import {
  VIDEO_THUMBNAIL_SIZES,
  videoThumbnailUrl,
  type UnitVideo,
} from "@/lib/video-lessons";

/**
 * The actual thumbnail YouTube serves for a unit video.
 *
 * The browser requests `hqdefault.jpg` as soon as the player or registry row
 * renders — no click, script, or iframe required. If that image is unavailable,
 * smaller real YouTube variants are tried; the surrounding dark poster remains
 * as a last-resort local fallback. `alt` is empty by default because the video
 * title is always adjacent and the play button carries its own accessible name.
 *
 * Fallback state carries the video ID so a selector switch resets it without a
 * synchronous effect or an extra render cascade.
 */
export function VideoThumbnail({
  video,
  alt = "",
  className,
  loading = "eager",
}: {
  video: UnitVideo;
  alt?: string;
  className?: string;
  loading?: "eager" | "lazy";
}) {
  const [fallback, setFallback] = useState<{ id: string; attempt: number }>({
    id: video.id,
    attempt: 0,
  });
  const last = VIDEO_THUMBNAIL_SIZES.length - 1;
  const attempt = fallback.id === video.id ? fallback.attempt : 0;
  const size = VIDEO_THUMBNAIL_SIZES[Math.min(attempt, last)];

  return (
    <img
      key={`${video.id}-${attempt}`}
      className={className}
      src={videoThumbnailUrl(video, size)}
      alt={alt}
      loading={loading}
      decoding="async"
      referrerPolicy="no-referrer"
      draggable={false}
      data-youtube-thumb={video.id}
      onError={() => setFallback((current) => {
        if (current.id === video.id && current.attempt >= last) return current;
        const next = current.id === video.id ? current.attempt + 1 : 1;
        return { id: video.id, attempt: Math.min(next, last) };
      })}
    />
  );
}
