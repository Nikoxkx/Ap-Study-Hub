"use client";

import { useState } from "react";
import { embedUrl, posterUrl, watchUrl, type VideoLesson } from "@/lib/videos";

/**
 * Video shelf.
 *
 * A row of paper cards, each with a poster frame. Nothing is fetched from
 * YouTube until the reader presses play: the still comes from the same image
 * host the rest of the site already allows, and the iframe only exists after
 * the click. That keeps a page of five videos from loading five players, and
 * means a reader on a school network with YouTube blocked can still read the
 * card, the description and the outbound link.
 */
export function VideoShelf({
  videos,
  headingId,
  compact = false,
}: {
  videos: VideoLesson[];
  headingId?: string;
  compact?: boolean;
}) {
  const [playing, setPlaying] = useState<string | null>(null);

  if (videos.length === 0) return null;

  return (
    <ul className={compact ? "video-shelf is-compact" : "video-shelf"} aria-labelledby={headingId}>
      {videos.map((video) => {
        const isPlaying = playing === video.id;
        return (
          <li key={video.id} className="video-card">
            <div className="video-frame">
              {isPlaying ? (
                <iframe
                  src={embedUrl(video.id)}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  loading="lazy"
                />
              ) : (
                <button
                  type="button"
                  className="video-poster"
                  onClick={() => setPlaying(video.id)}
                  aria-label={`Play: ${video.subtitle} (${video.channel})`}
                >
                  {/* A plain img, not next/image: the poster is a decorative still
                      behind a button, it is one request, and the frame is fixed
                      by aspect-ratio so there is no layout shift to reserve. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={posterUrl(video.id)}
                    alt=""
                    width={480}
                    height={360}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="video-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M8 5.5v13l11-6.5z" />
                    </svg>
                  </span>
                  {video.minutes ? (
                    <span className="video-duration" aria-hidden="true">
                      {video.minutes} min
                    </span>
                  ) : null}
                </button>
              )}
            </div>

            <div className="video-body">
              <p className="video-channel">
                <span>{video.channel}</span>
                {video.units.length > 0 ? (
                  <span className="video-units">
                    {video.units.length === 1
                      ? `Unit ${video.units[0]}`
                      : `Units ${video.units[0]}–${video.units[video.units.length - 1]}`}
                  </span>
                ) : null}
              </p>
              <h3 className="video-title">{video.label}</h3>
              <p className="video-verbatim">
                {video.channel}: <cite>{video.title}</cite>
              </p>
              <p className="video-why">{video.why}</p>
              <p className="video-links">
                <a href={watchUrl(video.id)} target="_blank" rel="noopener noreferrer">
                  Watch on YouTube
                </a>
                <a href={video.channelUrl} target="_blank" rel="noopener noreferrer">
                  {video.channel} channel
                </a>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
