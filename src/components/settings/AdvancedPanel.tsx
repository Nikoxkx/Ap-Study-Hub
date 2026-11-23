"use client";

import { useState } from "react";
import Link from "next/link";
import { usePrefs } from "@/lib/use-prefs";
import { sanitizeCustomCss } from "@/lib/site-prefs";
import { Note, Panel, Row, TextArea, Toggle } from "./controls";

/**
 * The last panel, for the visitor who wants to write CSS.
 *
 * The editor is plain text and the sheet is sanitised on the way in and again on
 * every read, so a pasted block that pulls in a remote stylesheet or a tracking
 * `url()` silently loses that part instead of leaking a request. It is off by
 * default: most people never need it, and an accidental global rule is the one
 * change here that can make the site look broken.
 */
export function AdvancedPanel() {
  const { prefs, update, reset } = usePrefs();
  const [draft, setDraft] = useState(prefs.advanced.customCss);
  const [status, setStatus] = useState("");

  const dirty = draft !== prefs.advanced.customCss;

  return (
    <>
      <Panel
        title="Custom CSS"
        description="Applied after every other rule, so it wins. Kept in this browser only."
        aside={
          <Toggle
            label="Enable custom CSS"
            checked={prefs.advanced.customCssEnabled}
            onChange={(checked) => update((draftPrefs) => { draftPrefs.advanced.customCssEnabled = checked; })}
          />
        }
      >
        <TextArea
          rows={10}
          value={draft}
          maxLength={20000}
          placeholder={':root { --aps-highlight: #ffd6a5; }\n.glass-box { backdrop-filter: blur(26px); }'}
          onChange={setDraft}
        />
        <div className="privacy-actions">
          <button
            type="button"
            className="btn"
            disabled={!dirty}
            onClick={() => {
              const clean = sanitizeCustomCss(draft);
              update((draftPrefs) => { draftPrefs.advanced.customCss = clean; });
              setDraft(clean);
              setStatus(
                clean === draft
                  ? "Saved."
                  : "Saved, with remote loads and script-era rules removed.",
              );
            }}
          >
            Save CSS
          </button>
          <button
            type="button"
            className="pref-mini"
            onClick={() => {
              setDraft("");
              update((draftPrefs) => { draftPrefs.advanced.customCss = ""; });
              setStatus("Cleared.");
            }}
          >
            Clear
          </button>
          <Link className="pref-mini" href="/settings?safe=1">
            Preview in safe mode
          </Link>
        </div>
        {status ? <Note tone="good">{status}</Note> : null}
        <Note>
          `@import`, `url(…)`, `expression(…)`, `behavior:`, and raw HTML are stripped. If a rule ever
          makes the site unreadable, add <code>?safe=1</code> to any URL — every preference is ignored
          for that page — or come back here and press reset.
        </Note>
      </Panel>

      <Panel title="Reset" description="Back to the shipped site, keeping your study record.">
        <div className="privacy-actions">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              reset();
              setDraft("");
              setStatus("Settings reset. Study progress was not touched.");
            }}
          >
            Reset all settings
          </button>
          <Link className="pref-mini" href="/settings?safe=1">
            Open safe mode
          </Link>
        </div>
        <Note>
          Resetting keeps cards, practice history, the adaptive profile, and your sources. To clear
          those as well, use the erase button under Privacy.
        </Note>
      </Panel>

      <Panel title="About these settings" description="Where the data lives, and what it costs.">
        <Row label="Storage" hint="One localStorage record for settings; IndexedDB for uploads.">
          <code className="pref-code">aps.prefs.v1</code>
        </Row>
        <Row label="Uploads" hint="Local only. Deleting a block deletes its image.">
          <code className="pref-code">aps-assets</code>
        </Row>
        <Row label="Backup" hint="Everything together, as one JSON file.">
          <Link className="pref-mini" href="/settings?tab=privacy">
            Privacy panel
          </Link>
        </Row>
      </Panel>
    </>
  );
}
