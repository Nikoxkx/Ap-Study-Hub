"use client";

import { useRef, useState } from "react";
import type { StudyCourse } from "@/lib/study-data";
import { reviveStudyState, STUDY_STORAGE_KEY } from "@/lib/study-model";
import type { SubjectSlug } from "@/lib/subjects";
import { OfflinePackButton } from "@/components/OfflinePackButton";
import { DownloadButton } from "@/components/ui/DownloadButton";

function downloadJson(value: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a"); anchor.href = url; anchor.download = filename; anchor.click();
  URL.revokeObjectURL(url);
}

export function DataPanel({ courses, selectedCourse }: { courses: StudyCourse[]; selectedCourse: SubjectSlug | "all" }) {
  const [status, setStatus] = useState("Your progress has not left this browser.");
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const visibleCourses = courses.filter((course) => selectedCourse === "all" || course.slug === selectedCourse);

  const exportBackup = () => {
    const stores: Record<string, unknown> = {};
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key?.startsWith("aps.")) continue;
      const raw = localStorage.getItem(key);
      if (raw === null) continue;
      try { stores[key] = JSON.parse(raw); } catch { /* Ignore unrelated malformed values. */ }
    }
    downloadJson({ format: "ap-study-hub-local-backup", version: 1, exportedAt: new Date().toISOString(), stores }, `ap-study-hub-backup-${new Date().toISOString().slice(0, 10)}.json`);
    setStatus(`Exported ${Object.keys(stores).length} local stores, including review scheduling, drafts, marks, and lab notes.`);
  };

  const importBackup = async (file: File | undefined) => {
    if (!file) return;
    setStatus("Validating backup…");
    try {
      if (file.size > 3_000_000) throw new Error("Backup is larger than the 3 MB import limit.");
      const value: unknown = JSON.parse(await file.text());
      if (typeof value !== "object" || value === null || !("format" in value) || value.format !== "ap-study-hub-local-backup" || !("version" in value) || value.version !== 1 || !("stores" in value) || typeof value.stores !== "object" || value.stores === null || Array.isArray(value.stores)) {
        throw new Error("This is not an AP Study Hub version 1 backup.");
      }
      const entries = Object.entries(value.stores);
      if (entries.length > 250) throw new Error("Backup contains too many stores.");
      for (const [key, store] of entries) {
        if (!/^aps\.[a-z0-9._-]+$/i.test(key)) throw new Error(`Unrecognized storage key: ${key}`);
        if (key === STUDY_STORAGE_KEY && reviveStudyState(store) === null) throw new Error("The shared study record is invalid or from an unsupported version.");
        if (typeof store === "function" || typeof store === "undefined") throw new Error(`Invalid value in ${key}.`);
      }
      for (const [key, store] of entries) localStorage.setItem(key, JSON.stringify(store));
      setStatus("Restore complete. Reloading the local study record…");
      window.setTimeout(() => window.location.reload(), 350);
    } catch (error) {
      setStatus(error instanceof Error ? `Restore stopped: ${error.message}` : "Restore stopped because the file could not be read.");
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div>
      <section aria-labelledby="backup-heading">
        <div className="panel-heading"><div><p className="label">Yours to keep</p><h2 id="backup-heading">Your progress belongs to you</h2><p>Export a JSON backup for another browser or restore it later. The file includes study state, drafts, timed work, card marks, annotations, and synthesis notes.</p></div></div>
        <div className="backup-actions items-start">
          <DownloadButton onClick={exportBackup}>JSON backup</DownloadButton>
          <label className="btn btn-outline">Restore JSON backup<input ref={fileRef} type="file" accept="application/json,.json" className="sr-only" onChange={(event) => importBackup(event.target.files?.[0])} /></label>
          <button type="button" className="btn btn-quiet" data-danger={confirmReset} onClick={() => {
            if (!confirmReset) { setConfirmReset(true); return; }
            localStorage.removeItem(STUDY_STORAGE_KEY); window.location.reload();
          }}>{confirmReset ? "Click again to confirm reset" : "Reset shared study progress"}</button>
          {confirmReset ? <button type="button" className="btn btn-quiet" onClick={() => setConfirmReset(false)}>Cancel</button> : null}
        </div>
        <p className="data-status" role="status">{status}</p>
        <div className="privacy-note"><strong>No account. Local by default. No hidden upload.</strong><p>Local storage is not a cloud backup and may be cleared by your browser or school device policy. Export regularly if the work matters. Optional Supabase sync in the Advanced tab is off until you explicitly enable it; restore validates the shared study schema before writing anything.</p></div>
      </section>

      <section className="offline-library" aria-labelledby="offline-library-heading">
        <p className="label">For offline days</p><h3 id="offline-library-heading">Keep a course pack for offline days</h3><p>Each pack downloads its current notes, cards, practice, studio, and printable packet. Previously visited pages are also cached by the offline worker.</p>
        <div className="offline-course-grid">{visibleCourses.map((course) => {
          const base = `/course/${course.slug}`;
          const studioRoutes = ["lab", "writing", "connections", ...(course.slug === "ap-calc" || course.slug === "ap-bio" ? ["variants"] : [])].map((tab) => `${base}/studio?tab=${tab}`);
          return <article key={course.slug}><h4>{course.label}</h4><p>{course.units.length} lessons · approximately {course.readingMinutes} reading minutes</p><OfflinePackButton courseLabel={course.label} routes={[base, `${base}/notes`, `${base}/cards`, `${base}/practice`, `${base}/print`, ...studioRoutes]} /></article>;
        })}</div>
      </section>
    </div>
  );
}
