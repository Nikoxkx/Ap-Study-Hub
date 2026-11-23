"use client";

import { useState } from "react";
import Link from "next/link";
import { usePrefs } from "@/lib/use-prefs";
import { deleteAsset, listAssets } from "@/lib/custom-assets";
import { Note, Panel, Row, Toggle } from "./controls";

/** Every key this site owns. Anything else in localStorage belongs to someone else. */
function ownedKeys(): string[] {
  const keys: string[] = [];
  try {
    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index);
      if (key && key.startsWith("aps")) keys.push(key);
    }
  } catch {
    // Storage blocked; the panel still explains what would be stored.
  }
  return keys.sort();
}

/**
 * Privacy and data.
 *
 * The honest version: this site has no backend for your data, so the panel says
 * so, lists exactly which keys exist, and gives you the file to prove it. The
 * export is a plain JSON of the same localStorage the site reads, which is also
 * the restore format — no proprietary envelope.
 */
export function PrivacyPanel() {
  const { prefs, update, reset } = usePrefs();
  const [status, setStatus] = useState("");
  const [keys, setKeys] = useState<string[]>([]);
  const [inventoryOpen, setInventoryOpen] = useState(false);

  async function exportData() {
    const data: Record<string, string | null> = {};
    for (const key of ownedKeys()) {
      try {
        data[key] = window.localStorage.getItem(key);
      } catch {
        data[key] = null;
      }
    }
    const assets = await listAssets();
    const payload = {
      format: "ap-study-hub-backup",
      version: 1,
      exportedAt: new Date().toISOString(),
      note: "Uploaded images are not included; only their metadata is listed.",
      keys: data,
      assets: assets.map(({ id, name, type, size, createdAt }) => ({ id, name, type, size, createdAt })),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `ap-study-hub-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("Exported. It is a plain JSON file — open it and read every byte.");
  }

  async function importData(file: File) {
    setStatus("");
    if (file.size > 4 * 1024 * 1024) {
      setStatus("That file is too large to be one of this site's backups.");
      return;
    }
    try {
      const parsed: unknown = JSON.parse(await file.text());
      const keys = (parsed as { keys?: unknown }).keys;
      if (!keys || typeof keys !== "object") {
        setStatus("That file has no `keys` object, so it is not a backup from this site.");
        return;
      }
      let restored = 0;
      for (const [key, value] of Object.entries(keys as Record<string, unknown>)) {
        if (!key.startsWith("aps") || typeof value !== "string") continue;
        if (value.length > 2_000_000) continue;
        window.localStorage.setItem(key, value);
        restored += 1;
      }
      setStatus(`Restored ${restored} records. Reload the page to see them applied.`);
    } catch {
      setStatus("That file is not valid JSON.");
    }
  }

  async function eraseEverything() {
    for (const key of ownedKeys()) {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Nothing to remove.
      }
    }
    const assets = await listAssets();
    await Promise.all(assets.map((asset) => deleteAsset(asset.id)));
    reset();
    setStatus("Everything this site stored on this device is gone.");
  }

  return (
    <>
      <Panel
        title="What is remembered"
        description="Three kinds of state, all in this browser: your settings, your study record, and the adaptive profile."
      >
        <Row label="Remember searches" hint="Kept so the profile can tell what you were looking for.">
          <Toggle
            label="Remember searches"
            checked={prefs.privacy.rememberSearches}
            onChange={(checked) => update((draft) => { draft.privacy.rememberSearches = checked; })}
          />
        </Row>
        <Row label="Remember videos" hint="Which unit videos you opened, for the watchlist and the profile.">
          <Toggle
            label="Remember opened videos"
            checked={prefs.privacy.rememberVideos}
            onChange={(checked) => update((draft) => { draft.privacy.rememberVideos = checked; })}
          />
        </Row>
        <Row label="Show the profile badge" hint="A small “personalised from your activity” marker.">
          <Toggle
            label="Show profile badge"
            checked={prefs.privacy.showProfileBadge}
            onChange={(checked) => update((draft) => { draft.privacy.showProfileBadge = checked; })}
          />
        </Row>

        <div className="privacy-actions">
          <button type="button" className="btn" onClick={exportData}>
            Export my data
          </button>
          <label className="btn btn-quiet">
            Restore from file
            <input
              type="file"
              accept="application/json"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void importData(file);
                event.target.value = "";
              }}
            />
          </label>
          <button
            type="button"
            className="pref-mini"
            onClick={() => {
              setKeys(ownedKeys());
              setInventoryOpen((open) => !open);
            }}
          >
            {inventoryOpen ? "Hide" : "Show"} stored keys
          </button>
        </div>

        {inventoryOpen ? (
          <ul className="key-list">
            {keys.map((key) => (
              <li key={key}>
                <code>{key}</code>
                <span>{window.localStorage.getItem(key)?.length ?? 0} bytes</span>
              </li>
            ))}
          </ul>
        ) : null}

        {status ? <Note tone="good">{status}</Note> : null}
      </Panel>

      <Panel
        title="Why this is private"
        description="The security model, stated plainly rather than implied."
      >
        <ul className="privacy-list">
          <li>
            <strong>No account, no server copy.</strong> Progress, settings, uploads, and the profile
            live in this browser's storage. There is no API that receives them, so there is nothing to
            breach on the server side.
          </li>
          <li>
            <strong>No analytics, pixels, or third-party scripts.</strong> The Content-Security-Policy
            allows only this origin, the fonts in <code>/public/fonts</code>, YouTube thumbnails, and
            the opt-in player.
          </li>
          <li>
            <strong>Uploads are validated, not trusted.</strong> SVG is refused (it can carry script),
            file types are checked by their leading bytes, size is capped at 4 MB, and images are
            rendered in an <code>&lt;img&gt;</code> — never injected as markup or CSS.
          </li>
          <li>
            <strong>Custom CSS is sandboxed by removal.</strong> <code>@import</code>, <code>url()</code>,
            and script-era constructs are stripped before the sheet is applied, and
            <code>?safe=1</code> turns the whole preference layer off if a rule misbehaves.
          </li>
          <li>
            <strong>Links you add are plain links.</strong> Only <code>https:</code>/<code>http:</code>
            survives validation, and they open with <code>rel="noopener noreferrer nofollow"</code>.
          </li>
        </ul>
        <Note tone="warn">
          Anyone with access to this browser profile can read this data — that is true of any
          local-first app. Use a private window on a shared computer, or erase everything before you
          leave.
        </Note>
        <Note>
          Real sign-in (email or phone, with sync across devices) needs a backend that verifies it.
          The repository is set up for Supabase, and the adapter is documented — but until keys are
          configured, no credentials are requested, stored, or pretended. See{" "}
          <Link href="/privacy">the privacy page</Link> and <code>SUPABASE_SYNC.md</code>.
        </Note>
      </Panel>

      <Panel title="Erase" description="Removes every record this site keeps in this browser, including uploads.">
        <button type="button" className="btn btn-danger" onClick={() => void eraseEverything()}>
          Erase everything on this device
        </button>
        <Note tone="warn">
          This cannot be undone, and it also clears your study progress. Export first if you want a
          copy.
        </Note>
      </Panel>
    </>
  );
}
