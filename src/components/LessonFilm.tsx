"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { formatRuntime, type Film } from "@/lib/films";
import { useStoredState } from "@/lib/use-stored-state";

/**
 * The player.
 *
 * A real clock, not a CSS animation: `requestAnimationFrame` reads elapsed wall
 * time and maps it onto the film's scene timings, so pausing, scrubbing and
 * changing playback speed all behave the way a video does. The scene list is
 * pre-computed, which makes scrubbing O(1) and keeps the render a pure function
 * of `(elapsed, playing)`.
 *
 * Deliberate omissions: no autoplay, no preload, no external player, no audio.
 * Captions *are* the narration, so the film works with the sound off, with a
 * screen reader reading the live caption, in a library, on a bus, and when the
 * network drops after first paint. Nothing about watching it costs a request.
 *
 * Progress is stored per film id, so leaving the page halfway and coming back
 * resumes where you were. `data-film-*` attributes are the hooks the study desk
 * reads to count what has been watched.
 */

const SPEEDS = [0.75, 1, 1.25, 1.5] as const;

interface Stored {
  /** Seconds watched. */
  at: number;
  /** True once the last scene has played. */
  done: boolean;
  /** Epoch ms of the last watch, used for the desk's "this week" count. */
  watchedAt: number;
}

const EMPTY: Stored = { at: 0, done: false, watchedAt: 0 };

/** localStorage is user-writable; anything malformed falls back to a fresh film. */
function reviveFilm(value: unknown): Stored | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Partial<Stored>;
  if (typeof record.at !== "number" || !Number.isFinite(record.at)) return null;
  return {
    at: Math.max(0, record.at),
    done: record.done === true,
    watchedAt: typeof record.watchedAt === "number" ? record.watchedAt : 0,
  };
}

/** Total seconds before each scene starts. */
function offsets(film: Film): number[] {
  const starts: number[] = [];
  let running = 0;
  for (const scene of film.scenes) {
    starts.push(running);
    running += scene.seconds;
  }
  return starts;
}

function PlayIcon({ paused }: { paused: boolean }) {
  return paused ? (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4 2.5v11l9-5.5z" />
    </svg>
  ) : (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="3.5" y="2.5" width="3.4" height="11" rx="0.6" />
      <rect x="9.1" y="2.5" width="3.4" height="11" rx="0.6" />
    </svg>
  );
}

export function LessonFilm({
  film,
  subjectMark,
}: {
  film: Film;
  /** Optional 32×32 SVG glyph from the subject set, drawn on the stage. */
  subjectMark?: React.ReactNode;
}) {
  const [stored, setStored] = useStoredState<Stored>(`aps.film.${film.id}`, EMPTY, reviveFilm);
  const starts = offsets(film);
  const duration = film.duration;

  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);

  const frame = useRef(0);
  const last = useRef(0);
  const elapsedRef = useRef(0);

  /* Resuming is offered, not assumed. Seeding the clock from storage inside an
     effect means a second render on every mount and a fight with the playback
     loop if the two disagree; a "Resume 0:42" chip gives the same benefit and
     lets the reader stay in control of when the film starts. */
  const resumeAt = stored.done ? 0 : stored.at;
  const canResume = resumeAt > 3 && elapsed < 1 && !playing;

  const sceneIndex = (() => {
    for (let index = starts.length - 1; index >= 0; index -= 1) {
      if (elapsed >= starts[index]) return index;
    }
    return 0;
  })();

  const scene = film.scenes[sceneIndex];

  const save = useCallback(
    (seconds: number, done: boolean) => {
      setStored({
        at: Math.round(seconds),
        done,
        watchedAt: Date.now(),
      });
    },
    [setStored],
  );

  useEffect(() => {
    if (!playing) return;

    last.current = performance.now();
    const tick = (now: number) => {
      const delta = ((now - last.current) / 1000) * speed;
      last.current = now;
      const next = Math.min(duration, elapsedRef.current + delta);
      elapsedRef.current = next;
      setElapsed(next);

      if (next >= duration) {
        setPlaying(false);
        save(duration, true);
        return;
      }
      frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [playing, speed, duration, save]);

  // Persist on pause and every twelve seconds during playback, so a closed tab
  // loses at most a few seconds.
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => save(elapsedRef.current, false), 12_000);
    return () => window.clearInterval(id);
  }, [playing, save]);

  const seek = useCallback(
    (seconds: number) => {
      const clamped = Math.max(0, Math.min(duration, seconds));
      elapsedRef.current = clamped;
      setElapsed(clamped);
      save(clamped, clamped >= duration);
    },
    [duration, save],
  );

  const toggle = useCallback(() => {
    if (elapsedRef.current >= duration) {
      seek(0);
      setPlaying(true);
      return;
    }
    setPlaying((current) => {
      if (current) save(elapsedRef.current, false);
      return !current;
    });
  }, [duration, save, seek]);

  const jump = useCallback(
    (index: number) => {
      const target = Math.max(0, Math.min(film.scenes.length - 1, index));
      seek(starts[target]);
    },
    [film.scenes.length, seek, starts],
  );

  // Keyboard: space toggles, arrows move by one scene, J/L by ten seconds.
  // Scoped to the player so the page's own scrolling is untouched.
  const shell = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = shell.current;
    if (!node) return;

    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(target.tagName)) return;
      if (event.key === " " || event.key === "k") {
        event.preventDefault();
        toggle();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        jump(sceneIndex + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        jump(sceneIndex - 1);
      } else if (event.key.toLowerCase() === "l") {
        event.preventDefault();
        seek(elapsedRef.current + 10);
      } else if (event.key.toLowerCase() === "j") {
        event.preventDefault();
        seek(elapsedRef.current - 10);
      }
    };

    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [jump, sceneIndex, seek, toggle]);

  const progress = duration ? Math.min(100, (elapsed / duration) * 100) : 0;
  const finished = elapsed >= duration;

  return (
    <div className="cinema" ref={shell} data-film-id={film.id} data-film-progress={Math.round(progress)}>
      <div className="cinema-head">
        <div>
          <p className="label">{film.unitNumber ? `Unit ${film.unitNumber} film` : "Course film"}</p>
          <h3>{film.title}</h3>
        </div>
        <p className="cinema-run">
          {film.scenes.length} scenes
          <br />
          {formatRuntime(duration)} · captions
        </p>
      </div>

      <div className="cinema-stage">
        <div className="cinema-topline">
          <span>
            Scene {String(sceneIndex + 1).padStart(2, "0")} / {String(film.scenes.length).padStart(2, "0")}
          </span>
          <strong>{scene.heading}</strong>
        </div>

        <div className="cinema-scene" key={sceneIndex}>
          <h4>{scene.heading}</h4>
          <ul>
            {(scene.points ?? []).map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        {subjectMark ? <div className="cinema-watermark">{subjectMark}</div> : null}

        <p className="cinema-captions" data-hidden={!captionsOn} aria-live="polite" aria-atomic="true">
          {scene.caption}
        </p>

        <div className="cinema-progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="cinema-controls">
        <button
          type="button"
          className="cinema-play"
          onClick={toggle}
          aria-label={playing ? "Pause film" : finished ? "Watch again" : "Play film"}
        >
          <PlayIcon paused={!playing} />
        </button>

        <button type="button" className="cinema-btn" onClick={() => jump(sceneIndex - 1)} aria-label="Previous scene">
          ‹
        </button>
        <button type="button" className="cinema-btn" onClick={() => jump(sceneIndex + 1)} aria-label="Next scene">
          ›
        </button>

        <div className="cinema-scrub">
          <label className="sr-only" htmlFor={`film-scrub-${film.id}`}>
            Film position
          </label>
          <input
            id={`film-scrub-${film.id}`}
            type="range"
            min={0}
            max={duration}
            step={1}
            value={Math.floor(elapsed)}
            onChange={(event) => seek(Number(event.target.value))}
          />
        </div>

        {canResume ? (
          <button type="button" className="cinema-btn" onClick={() => seek(resumeAt)}>
            Resume {formatRuntime(resumeAt)}
          </button>
        ) : null}

        <span className="cinema-time">
          {formatRuntime(elapsed)} / {formatRuntime(duration)}
        </span>

        <button
          type="button"
          className="cinema-btn"
          onClick={() => setSpeed(SPEEDS[(SPEEDS.indexOf(speed as (typeof SPEEDS)[number]) + 1) % SPEEDS.length])}
          aria-label={`Playback speed, currently ${speed} times`}
        >
          {speed}×
        </button>

        <button
          type="button"
          className="cinema-btn"
          aria-pressed={captionsOn}
          onClick={() => setCaptionsOn((current) => !current)}
        >
          CC
        </button>

        <button
          type="button"
          className="cinema-btn"
          aria-pressed={showTranscript}
          aria-expanded={showTranscript}
          onClick={() => setShowTranscript((current) => !current)}
        >
          Transcript
        </button>
      </div>

      <div className="cinema-foot">
        <span>
          {stored.done ? "Watched." : stored.at > 0 ? "Picks up where you left it." : "Silent by design: captions instead of audio."}{" "}
          Every line comes from the {film.unitNumber ? "lesson" : "course"} itself.
        </span>
        <span className="share-row">
          {film.lessonHref ? (
            <Link href={film.lessonHref} className="cinema-btn">
              Read the lesson
            </Link>
          ) : null}
          <Link href={film.practiceHref} className="cinema-btn">
            Practise this
          </Link>
        </span>
      </div>

      <details
        className="cinema-transcript"
        open={showTranscript}
        onToggle={(event) => setShowTranscript((event.currentTarget as HTMLDetailsElement).open)}
      >
        <summary>Transcript · {film.scenes.length} scenes</summary>
        <ol>
          {film.scenes.map((item, index) => (
            <li key={item.heading + index} data-active={index === sceneIndex}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <strong>
                  {String(index + 1).padStart(2, "0")} · {item.heading}
                </strong>
                <button type="button" onClick={() => jump(index)}>
                  {index === sceneIndex ? "Playing" : `Jump to ${formatRuntime(starts[index])}`}
                </button>
              </div>
              <p>{item.caption}</p>
              {item.points?.length ? (
                <ul className="mt-2 grid gap-1 text-[0.8125rem] text-[var(--ink-faint)]">
                  {item.points.map((point) => (
                    <li key={point}>· {point}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}
