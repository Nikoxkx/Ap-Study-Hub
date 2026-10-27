"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { StudyCourse } from "@/lib/study-data";
import {
  addStudyEvent,
  getWeeklySummary,
  localDateKey,
  reviveStudyState,
  type StudyItem,
} from "@/lib/study-model";
import { useStudyState } from "@/lib/use-study-state";
import { useStoredState } from "@/lib/use-stored-state";
import { useVideoProgress } from "@/lib/video-progress";
import { unitVideos, videoWatchUrl, type UnitVideo } from "@/lib/video-lessons";
import { getSubject, type SubjectSlug } from "@/lib/subjects";
import { integrations } from "@/lib/integrations";
import { ExternalLink } from "@/components/Furniture";
import { VideoThumbnail } from "@/components/VideoThumbnail";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { Checkbox } from "@/components/ui/Checkbox";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import roadmap from "@/data/roadmap.json";

interface Goals {
  reviews: number;
  minutes: number;
  accuracy: number;
}

interface SyncSettings {
  endpoint: string;
  code: string;
  lastSync: number | null;
}

const DEFAULT_GOALS: Goals = Object.freeze({ reviews: 40, minutes: 180, accuracy: 80 });
const DEFAULT_SYNC: SyncSettings = Object.freeze({
  endpoint: process.env.NEXT_PUBLIC_STUDY_SYNC_URL ?? "",
  code: "",
  lastSync: null,
});
const GOALS_KEY = "aps.goals.v1";
const SYNC_KEY = "aps.sync.v1";

function reviveGoals(value: unknown): Goals | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const raw = value as Record<string, unknown>;
  const clamp = (v: unknown, min: number, max: number, fallback: number) =>
    typeof v === "number" && Number.isFinite(v) ? Math.round(Math.min(max, Math.max(min, v))) : fallback;
  return {
    reviews: clamp(raw.reviews, 5, 300, DEFAULT_GOALS.reviews),
    minutes: clamp(raw.minutes, 15, 1200, DEFAULT_GOALS.minutes),
    accuracy: clamp(raw.accuracy, 40, 100, DEFAULT_GOALS.accuracy),
  };
}

function reviveSync(value: unknown): SyncSettings | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const raw = value as Record<string, unknown>;
  return {
    endpoint: typeof raw.endpoint === "string" ? raw.endpoint.slice(0, 500) : DEFAULT_SYNC.endpoint,
    code: typeof raw.code === "string" ? raw.code.slice(0, 200) : "",
    lastSync: typeof raw.lastSync === "number" && Number.isFinite(raw.lastSync) ? raw.lastSync : null,
  };
}

function csvCell(value: string | number | boolean): string {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function currentStreak(events: Array<{ at: number }>, now: number): number {
  const days = new Set(events.map((event) => localDateKey(event.at)));
  const cursor = new Date(now);
  cursor.setHours(12, 0, 0, 0);
  let streak = 0;
  while (days.has(localDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function generateSyncCode(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function AdvancedDesk({ items, courses, selectedCourse, now }: {
  items: StudyItem[];
  courses: StudyCourse[];
  selectedCourse: SubjectSlug | "all";
  now: number;
}) {
  const [study, setStudy] = useStudyState();
  const [progress, setProgress] = useVideoProgress();
  const [goals, setGoals] = useStoredState<Goals>(GOALS_KEY, DEFAULT_GOALS, reviveGoals);
  const [sync, setSync] = useStoredState<SyncSettings>(SYNC_KEY, DEFAULT_SYNC, reviveSync);
  const [message, setMessage] = useState("Local by default. Nothing is uploaded until you enable sync.");
  const [busy, setBusy] = useState(false);
  const [videoLimit, setVideoLimit] = useState(12);

  const scopedEvents = useMemo(
    () => study.events.filter((event) => selectedCourse === "all" || event.courseSlug === selectedCourse),
    [study.events, selectedCourse],
  );
  const weekly = getWeeklySummary(scopedEvents, now);
  const accuracy = weekly.attempts ? Math.round((weekly.correct / weekly.attempts) * 100) : 0;
  const streak = currentStreak(scopedEvents, now);
  const watched = Object.values(progress).filter((entry) => entry.watched).length;
  const visibleVideos = useMemo(
    () => unitVideos.filter((video) => selectedCourse === "all" || video.courseSlug === selectedCourse),
    [selectedCourse],
  );
  const visibleCourses = courses.filter((course) => selectedCourse === "all" || course.slug === selectedCourse);

  const mastery = visibleCourses.map((course) => {
    const entries = Object.entries(study.objectives).filter(([id]) => id.startsWith(`${course.slug}:objective:`));
    const rated = entries.filter(([, level]) => level > 0).length;
    const average = entries.length ? entries.reduce((sum, [, level]) => sum + level, 0) / (entries.length * 3) : 0;
    return { slug: course.slug, label: course.label, rated, total: entries.length, average: Math.round(average * 100) };
  });

  const goalRows = [
    { key: "reviews" as const, label: "Retrieval attempts", value: weekly.attempts, target: goals.reviews, suffix: "" },
    { key: "minutes" as const, label: "Study minutes", value: weekly.minutes, target: goals.minutes, suffix: " min" },
    { key: "accuracy" as const, label: "Accuracy", value: accuracy, target: goals.accuracy, suffix: "%" },
  ];

  function setGoal(key: keyof Goals, value: number) {
    setGoals((current) => ({ ...current, [key]: value }));
  }

  function toggleVideo(video: UnitVideo) {
    const next = !Boolean(progress[video.id]?.watched);
    setProgress((current) => ({
      ...current,
      [video.id]: {
        watched: next,
        at: next ? Date.now() : current[video.id]?.at ?? 0,
        notes: current[video.id]?.notes ?? "",
      },
    }));
    if (next && !study.events.some((event) => event.type === "video" && event.itemId === video.id)) {
      setStudy((current) => addStudyEvent(current, {
        at: Date.now(),
        type: "video",
        courseSlug: video.courseSlug,
        itemId: video.id,
      }));
    }
    setMessage(next ? `Marked “${video.title}” watched.` : `Removed “${video.title}” from watched videos.`);
  }

  function updateNote(video: UnitVideo, notes: string) {
    setProgress((current) => ({
      ...current,
      [video.id]: {
        watched: current[video.id]?.watched ?? false,
        at: current[video.id]?.at ?? 0,
        notes: notes.slice(0, 4000),
      },
    }));
  }

  function buildReport(): string {
    const lines = [
      "# AP Study Hub — weekly study report",
      `Generated: ${new Date(now).toISOString()}`,
      `Course filter: ${selectedCourse === "all" ? "All ten courses" : getSubject(selectedCourse)?.familiar ?? selectedCourse}`,
      "",
      "## Last seven days",
      `- Retrieval attempts: ${weekly.attempts} (goal ${goals.reviews})`,
      `- Correct: ${weekly.correct}/${weekly.attempts}${weekly.attempts ? ` (${accuracy}%)` : ""} (goal ${goals.accuracy}%)`,
      `- Focus and writing minutes: ${weekly.minutes} (goal ${goals.minutes})`,
      `- Active days: ${weekly.activeDays}/7`,
      `- Current streak: ${streak} day${streak === 1 ? "" : "s"}`,
      `- Unit-video sessions: ${weekly.videos}`,
      `- Videos marked watched: ${watched}/${unitVideos.length}`,
      `- Study items in the local catalog: ${items.length}`,
      "",
      "## Objective confidence",
      ...mastery.map((row) => `- ${row.label}: ${row.rated}/${row.total} rated · ${row.average}% average confidence`),
      "",
      "## Next actions",
      "- Retrieve one idea from every video you watched instead of rewatching passively.",
      "- Reopen the two lowest-confidence objectives in the filtered course.",
      "- Export a JSON backup from Data & offline before clearing browser data.",
      "",
      "## Tracked work",
      ...roadmap.issues.map((issue) => `- ${issue.id} · ${issue.status} · ${issue.title}`),
      "",
      "This report was generated in the browser. It is not uploaded unless you choose to sync.",
    ];
    return lines.join("\n");
  }

  function exportCsv() {
    const rows = [
      ["Course", "Unit", "Video ID", "Title", "Creator", "Watched", "Notes", "Watch URL"],
      ...visibleVideos.map((video) => [
        getSubject(video.courseSlug)?.familiar ?? video.courseSlug,
        video.unit,
        video.id,
        video.title,
        video.creator,
        progress[video.id]?.watched ? "yes" : "no",
        progress[video.id]?.notes ?? "",
        videoWatchUrl(video),
      ]),
    ];
    downloadFile(rows.map((row) => row.map(csvCell).join(",")).join("\n") + "\n", "ap-study-hub-video-progress.csv", "text/csv;charset=utf-8");
    setMessage("Exported video progress as CSV.");
  }

  function exportHtmlReport() {
    const report = buildReport();
    const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>AP Study Hub weekly report</title><style>body{font:16px/1.6 Georgia,serif;max-width:46rem;margin:3rem auto;color:#1c1b17;background:#fffdf7}h1,h2{line-height:1.2}li{margin:.3rem 0}pre{white-space:pre-wrap}</style></head><body><pre>${report.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</pre></body></html>`;
    downloadFile(html, `ap-study-hub-report-${new Date(now).toISOString().slice(0, 10)}.html`, "text/html;charset=utf-8");
    setMessage("Downloaded a Docs-friendly HTML report.");
  }

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(buildReport());
      setMessage("Report copied. Paste it into the Google Docs template or any notes app.");
    } catch {
      setMessage("Clipboard access was blocked. Use Download HTML report instead.");
    }
  }

  async function syncNow(action: "save" | "load" | "delete") {
    const endpoint = sync.endpoint.trim() || DEFAULT_SYNC.endpoint;
    const code = sync.code.trim();
    if (!endpoint) {
      setMessage("No sync endpoint is configured. See the Supabase activation note below.");
      return;
    }
    if (code.length < 12) {
      setMessage("Generate or paste a sync code of at least 12 characters first.");
      return;
    }
    let url: URL;
    try {
      url = new URL(endpoint, window.location.origin);
    } catch {
      setMessage("That sync endpoint is not a valid URL.");
      return;
    }
    const sameOrigin = url.origin === window.location.origin;
    const supabaseHost = url.hostname.endsWith(".supabase.co") || url.hostname === "supabase.co";
    if (url.protocol !== "https:" && !(sameOrigin && url.hostname === "localhost")) {
      setMessage("Sync endpoint must use HTTPS.");
      return;
    }
    if (!sameOrigin && !supabaseHost) {
      setMessage("Only this site or a Supabase edge-function URL can be used for sync.");
      return;
    }
    if (action === "load" && !window.confirm("Replace this browser's local study state with the remote snapshot?")) return;

    setBusy(true);
    setMessage(`Contacting sync endpoint (${action})…`);
    try {
      const response = await fetch(url.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, syncCode: code, state: action === "save" ? study : undefined }),
      });
      const data = await response.json() as { state?: unknown; updatedAt?: string; ok?: boolean; error?: string };
      if (!response.ok) throw new Error(data.error ?? `HTTP ${response.status}`);
      if (action === "load") {
        if (!data.state) {
          setMessage("No snapshot exists for that sync code yet. Save first.");
        } else {
          const restored = reviveStudyState(data.state);
          if (!restored) throw new Error("Remote snapshot failed local validation");
          setStudy(restored);
          setMessage(`Loaded snapshot${data.updatedAt ? ` from ${data.updatedAt}` : ""}.`);
        }
      } else if (action === "delete") {
        setMessage("Remote snapshot deleted. Local progress was not changed.");
      } else {
        setMessage(`Saved snapshot${data.updatedAt ? ` at ${data.updatedAt}` : ""}.`);
      }
      setSync((current) => ({ ...current, endpoint, code, lastSync: Date.now() }));
    } catch (error) {
      setMessage(error instanceof Error ? `Sync failed: ${error.message}` : "Sync failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="advanced-desk">
      <section aria-labelledby="advanced-overview-heading">
        <div className="panel-heading">
          <div>
            <p className="label">Go deeper</p>
            <h2 id="advanced-overview-heading">Set a target. See the pattern. Keep the work.</h2>
            <p>Everything here is derived from your local study record. No account is required and no state leaves the browser unless you explicitly enable sync.</p>
          </div>
          <span className="tag">{streak}-day streak</span>
        </div>
        <div className="advanced-stats">
          <div><strong>{weekly.attempts}</strong><span>retrievals this week</span></div>
          <div><strong>{weekly.minutes}</strong><span>study minutes</span></div>
          <div><strong>{watched}</strong><span>videos watched</span></div>
          <div><strong>{weekly.activeDays}/7</strong><span>active days</span></div>
        </div>
      </section>

      <div className="advanced-grid">
        <section className="advanced-card" aria-labelledby="goals-heading">
          <p className="label">This week’s target</p>
          <h3 id="goals-heading">Pick a goal that fits your week</h3>
          <div className="goal-grid">
            {goalRows.map((row) => (
              <div key={row.key} className="goal-row">
                <label htmlFor={`goal-${row.key}`}>
                  <span>{row.label}</span>
                  <strong>{row.value}{row.suffix} / <input id={`goal-${row.key}`} type="number" min={row.key === "accuracy" ? 40 : 5} max={row.key === "accuracy" ? 100 : row.key === "minutes" ? 1200 : 300} value={row.target} onChange={(event) => setGoal(row.key, Number(event.target.value) || row.target)} aria-label={`${row.label} weekly goal`} />{row.suffix}</strong>
                </label>
                <div className="goal-meter" role="progressbar" aria-label={row.label} aria-valuemin={0} aria-valuemax={row.target} aria-valuenow={Math.min(row.value, row.target)}>
                  <span style={{ width: `${Math.min(100, Math.round((row.value / Math.max(1, row.target)) * 100))}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="advanced-note">Goals are stored as <code>{GOALS_KEY}</code>. They describe effort, not a predicted AP score.</p>
        </section>

        <section className="advanced-card" aria-labelledby="mastery-heading">
          <p className="label">What you actually know</p>
          <h3 id="mastery-heading">What feels easy is not always what you know</h3>
          <div className="mastery-grid">
            {mastery.map((row) => (
              <div key={row.slug} className="mastery-row">
                <div><strong>{row.label}</strong><span>{row.rated}/{row.total} objectives rated</span></div>
                <div className="mastery-meter" role="progressbar" aria-label={`${row.label} average confidence`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={row.average}><span style={{ width: `${row.average}%` }} /></div>
                <span className="tabular-nums">{row.average}%</span>
              </div>
            ))}
          </div>
          <p className="advanced-note">Rate objectives inside each lesson. Use the lowest row to choose your next retrieval session.</p>
        </section>

        <section className="advanced-card" aria-labelledby="reports-heading">
          <p className="label">Your week, to go</p>
          <h3 id="reports-heading">Your week, in a file you own</h3>
          <p>Generate a plain-text report from local data. Paste it into the Google Docs template, or download an HTML file that Docs can import.</p>
          <div className="report-actions items-start">
            <button type="button" className="btn btn-solid btn-sm" onClick={copyReport}>Copy report</button>
            <DownloadButton onClick={exportHtmlReport}>HTML report</DownloadButton>
            <DownloadButton onClick={exportCsv}>Video CSV</DownloadButton>
            <ExternalLink href={integrations.doc.url} className="btn btn-quiet btn-sm">Open Docs brief</ExternalLink>
          </div>
          <p className="advanced-note">The report contains no name, email, account, or analytics identifier.</p>
        </section>

        <section className="advanced-card" aria-labelledby="roadmap-heading">
          <p className="label">What we are fixing</p>
          <h3 id="roadmap-heading">What we are still improving</h3>
          <ul className="roadmap-mini">
            {roadmap.issues.map((issue) => (
              <li key={issue.id}>
                <span data-status={issue.status}>{issue.id}</span>
                <ExternalLink href={issue.url} className="link-underlined">{issue.title}</ExternalLink>
              </li>
            ))}
          </ul>
          <div className="report-actions">
            <ExternalLink href={integrations.linear.tracker} className="btn btn-quiet btn-sm">Open tracker</ExternalLink>
            <ExternalLink href="https://github.com/Nikoxkx/Ap-Study-Hub/issues" className="btn btn-quiet btn-sm">Report a public issue</ExternalLink>
          </div>
        </section>
      </div>

      <section className="advanced-card advanced-wide" aria-labelledby="watchlist-heading">
        <p className="label">Watch, then remember</p>
        <h3 id="watchlist-heading">Watch it, then explain it without looking</h3>
        <p>Watching is only useful if you can reproduce the idea later. Keep a one-sentence retrieval note for each video.</p>
        <div className="video-watchlist">
          {visibleVideos.slice(0, videoLimit).map((video) => {
            const entry = progress[video.id];
            return (
              <article key={video.id} className="video-watch-row" data-watched={Boolean(entry?.watched)}>
                <div className="video-watch-head">
                  <span className="video-watch-thumb" aria-hidden="true"><VideoThumbnail video={video} loading="lazy" /></span>
                  <div>
                    <span className="label">{getSubject(video.courseSlug)?.familiar ?? video.courseSlug} · Unit {video.unit}</span>
                    <h4>{video.title}</h4>
                    <p>{video.creator} · {video.role}</p>
                  </div>
                  <Checkbox
                    checked={Boolean(entry?.watched)}
                    onCheckedChange={() => toggleVideo(video)}
                    label={entry?.watched ? "Watched" : "Mark"}
                  />
                </div>
                <label className="video-notes-label" htmlFor={`video-note-${video.id}`}>Retrieval note</label>
                <textarea
                  id={`video-note-${video.id}`}
                  className="scratch-paper video-notes"
                  rows={3}
                  maxLength={4000}
                  value={entry?.notes ?? ""}
                  onChange={(event) => updateNote(video, event.target.value)}
                  placeholder="Without looking, what was the main claim or method?"
                />
                <div className="video-watch-links">
                  <Link href={`/course/${video.courseSlug}/notes#unit-${video.unit}`} className="link-underlined">Open lesson</Link>
                  <Link href={`/course/${video.courseSlug}/videos#unit-${video.unit}-video`} className="link-underlined">Play in course</Link>
                  <ExternalLink href={videoWatchUrl(video)} className="link-underlined">YouTube</ExternalLink>
                </div>
              </article>
            );
          })}
        </div>
        {videoLimit < visibleVideos.length ? (
          <button type="button" className="btn btn-quiet btn-sm mt-4" onClick={() => setVideoLimit((current) => current + 12)}>Show 12 more videos</button>
        ) : null}
      </section>

      <section className="advanced-card advanced-wide" aria-labelledby="sync-heading">
        <p className="label">Sync · your choice</p>
        <h3 id="sync-heading">Take your work with you — only if you want to</h3>
        <p>
          The edge function stores a peppered hash of your sync code, not the code itself. No service-role key or pepper is
          in this browser. The Supabase project is active and the sync function is deployed. Your progress stays local
          unless you choose to save a snapshot. Use the same sync code on another device to load it.
        </p>
        <div className="sync-form">
          <label>
            <span className="label">Sync endpoint</span>
            <input
              className="field mt-2"
              type="url"
              value={sync.endpoint}
              onChange={(event) => setSync((current) => ({ ...current, endpoint: event.target.value }))}
              placeholder={DEFAULT_SYNC.endpoint || integrations.supabase.defaultEndpoint}
              spellCheck={false}
            />
          </label>
          <label>
            <span className="label">Sync code</span>
            <input
              className="field mt-2"
              type="text"
              value={sync.code}
              onChange={(event) => setSync((current) => ({ ...current, code: event.target.value }))}
              placeholder="Generate or paste a 32-character code"
              autoComplete="off"
              spellCheck={false}
            />
          </label>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => setSync((current) => ({ ...current, code: generateSyncCode() }))}>Generate code</button>
          <button type="button" className="btn btn-solid btn-sm" disabled={busy} onClick={() => void syncNow("save")}>Save snapshot</button>
          <button type="button" className="btn btn-outline btn-sm" disabled={busy} onClick={() => void syncNow("load")}>Load snapshot</button>
          <button type="button" className="btn btn-quiet btn-sm" disabled={busy} onClick={() => void syncNow("delete")}>Delete remote</button>
          <button type="button" className="btn btn-quiet btn-sm" onClick={() => setSync((current) => ({ ...current, code: "" }))}>Forget code</button>
        </div>
        {busy ? (
          <div className="my-3">
            <LoadingSpinner scale={0.55} label="Syncing study snapshot…" />
          </div>
        ) : null}
        <p className="status-line" role="status">{message}</p>
        <p className="advanced-note">
          Settings are stored as <code>{SYNC_KEY}</code>. The code is the only key: if you lose it, the snapshot cannot be
          recovered. Local progress is never removed by saving or deleting a remote snapshot. See{' '}
          <ExternalLink href={integrations.linear.syncIssue} className="link-underlined">YEI-13</ExternalLink> and{' '}
          <Link href="/integrations" className="link-underlined">integrations & press kit</Link>.
        </p>
      </section>
    </div>
  );
}
