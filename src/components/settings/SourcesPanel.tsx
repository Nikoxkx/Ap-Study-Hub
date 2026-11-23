"use client";

import { useState } from "react";
import {
  addSource,
  guessCourse,
  useUserSources,
  type NewSourceInput,
} from "@/lib/user-sources";
import { safeUrl, type UserSource } from "@/lib/site-prefs";
import { Note, Panel, Select, TextArea, TextField } from "./controls";
import type { PanelProps } from "./types";

const TYPES: { value: UserSource["type"]; label: string }[] = [
  { value: "official", label: "College Board / official" },
  { value: "practice", label: "Practice" },
  { value: "video", label: "Video" },
  { value: "reading", label: "Reading" },
  { value: "reference", label: "Reference" },
  { value: "tool", label: "Tool" },
];

interface ScanResult {
  title: string;
  description: string;
  siteName: string;
  course: string;
}

/**
 * Your sources: links you add, attached to a course.
 *
 * "Scan" asks this site's own `/api/link-preview` route to fetch the page and
 * read its title and description — the server does the fetch, so the visitor's
 * IP is never handed to the destination, and the route refuses private and
 * loopback addresses. It is optional: typing the title by hand works exactly the
 * same, and nothing is fetched unless you press the button.
 */
export function SourcesPanel({ subjects }: PanelProps) {
  const [sources, setSources] = useUserSources();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [course, setCourse] = useState(subjects[0]?.slug ?? "");
  const [type, setType] = useState<UserSource["type"]>("reference");
  const [status, setStatus] = useState<{ tone: "quiet" | "good" | "warn"; text: string } | null>(null);
  const [scanning, setScanning] = useState(false);

  const validSlugs = subjects.map((subject) => subject.slug);
  const grouped = subjects
    .map((subject) => ({
      subject,
      items: sources.filter((source) => source.course === subject.slug),
    }))
    .filter((group) => group.items.length > 0);

  async function scan() {
    const safe = safeUrl(url);
    if (!safe) {
      setStatus({ tone: "warn", text: "Paste a full http(s) link first." });
      return;
    }
    setScanning(true);
    setStatus({ tone: "quiet", text: "Reading the page…" });
    try {
      const response = await fetch("/api/link-preview", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: safe }),
      });
      if (!response.ok) {
        const detail = (await response.json().catch(() => ({}))) as { error?: string };
        setStatus({
          tone: "warn",
          text: detail.error ?? "That page could not be read. Type the title by hand — it still works.",
        });
        return;
      }
      const result = (await response.json()) as ScanResult;
      if (result.title) setTitle(result.title);
      if (result.description) setNote((current) => current || result.description);
      if (result.course && validSlugs.includes(result.course)) setCourse(result.course);
      setStatus({
        tone: "good",
        text: `Read “${result.title || result.siteName}”. Check the course, then add it.`,
      });
    } catch {
      setStatus({ tone: "warn", text: "The scan did not come back. Type the title by hand instead." });
    } finally {
      setScanning(false);
    }
  }

  function submit() {
    const input: NewSourceInput = { course, title, url, note, type };
    const result = addSource(sources, input);
    if (!result.ok) {
      setStatus({ tone: "warn", text: result.reason });
      return;
    }
    setSources(result.list);
    setStatus({
      tone: "good",
      text: `Added to ${subjects.find((subject) => subject.slug === course)?.familiar ?? course} — it is on that course's sources page now.`,
    });
    setUrl("");
    setTitle("");
    setNote("");
  }

  return (
    <>
      <Panel
        title="Add a source"
        description="Anything you add appears on the sources page for that course, in your own group, next to the curated list."
      >
        <div className="source-form">
          <TextField
            type="url"
            value={url}
            placeholder="https://…"
            maxLength={800}
            onChange={(value) => {
              setUrl(value);
              const guessed = guessCourse(`${value} ${title}`, validSlugs);
              if (guessed) setCourse(guessed);
            }}
          />
          <div className="source-form-row">
            <TextField value={title} placeholder="Title" maxLength={160} onChange={setTitle} />
            <button type="button" className="btn" onClick={scan} disabled={scanning}>
              {scanning ? "Scanning…" : "Scan link"}
            </button>
          </div>
          <div className="source-form-row">
            <Select
              value={course}
              onChange={setCourse}
              options={subjects.map((subject) => ({ value: subject.slug, label: subject.familiar }))}
            />
            <Select value={type} onChange={setType} options={TYPES} />
          </div>
          <TextArea
            rows={2}
            value={note}
            placeholder="Why it matters (optional)"
            maxLength={600}
            onChange={setNote}
          />
          <div className="source-form-row">
            <button type="button" className="btn" onClick={submit}>
              Add to {subjects.find((subject) => subject.slug === course)?.familiar ?? "course"}
            </button>
            {status ? (
              <p className={`settings-note settings-note-${status.tone === "quiet" ? "quiet" : status.tone}`}>
                {status.text}
              </p>
            ) : null}
          </div>
        </div>
        <Note>
          Scanning runs on this site's server and only reads the page's title and description. It
          refuses localhost, private networks, and non-http links, and it never runs unless you press
          the button.
        </Note>
      </Panel>

      <Panel
        title="Your sources"
        description={`${sources.length} saved on this device.`}
        aside={
          sources.length > 0 ? (
            <button type="button" className="pref-mini" onClick={() => setSources([])}>
              Remove all
            </button>
          ) : null
        }
      >
        {grouped.length === 0 ? (
          <Note>Nothing added yet. A textbook chapter or a teacher's handout is a good first entry.</Note>
        ) : (
          grouped.map((group) => (
            <div key={group.subject.slug} className="source-group">
              <h4 className="source-group-title">{group.subject.familiar}</h4>
              <ul>
                {group.items.map((source) => (
                  <li key={source.id}>
                    <div>
                      <a href={source.url} target="_blank" rel="noopener noreferrer nofollow">
                        {source.title}
                      </a>
                      <p>
                        {source.type}
                        {source.note ? ` · ${source.note}` : ""}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="pref-mini"
                      onClick={() => setSources(sources.filter((entry) => entry.id !== source.id))}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </Panel>
    </>
  );
}
