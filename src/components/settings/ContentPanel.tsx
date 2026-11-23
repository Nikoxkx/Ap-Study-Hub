"use client";

/* eslint-disable @next/next/no-img-element -- a preview of a local blob URL
   chosen in this browser; there is no remote asset for next/image to load. */

import { useState } from "react";
import { usePrefs } from "@/lib/use-prefs";
import {
  IMAGE_COPY_LIMIT,
  deleteAsset,
  getAssetUrl,
  prepareUpload,
  storeUpload,
} from "@/lib/custom-assets";
import { safeUrl, type CustomBlock } from "@/lib/site-prefs";
import {
  Note,
  Panel,
  Row,
  Select,
  TextArea,
  TextField,
  Segmented,
} from "./controls";
import type { PanelProps } from "./types";

/**
 * Words and pieces: the hero, the footer note, and custom blocks.
 *
 * Text overrides are plain text, never HTML — the settings page is a text editor,
 * not a template engine, and that is what keeps a pasted `<script>` from becoming
 * one. Links are re-validated on the way in and on the way out; images are
 * validated by `putAsset` and rendered in an `<img>`.
 */
export function ContentPanel({ subjects }: PanelProps) {
  const { prefs, update } = usePrefs();
  const [draftKind, setDraftKind] = useState<CustomBlock["kind"]>("text");
  const [draftTitle, setDraftTitle] = useState("");
  const [draftBody, setDraftBody] = useState("");
  const [draftUrl, setDraftUrl] = useState("");
  const [draftPlacement, setDraftPlacement] = useState<CustomBlock["placement"]>("home");
  const [draftCourse, setDraftCourse] = useState(subjects[0]?.slug ?? "");
  const [draftAsset, setDraftAsset] = useState<{ id: string; url: string } | null>(null);
  const [error, setError] = useState("");

  const blocks = prefs.content.blocks;

  function resetDraft() {
    setDraftTitle("");
    setDraftBody("");
    setDraftUrl("");
    setDraftAsset(null);
    setError("");
  }

  async function pickImage(file: File) {
    setError("");
    // Same pipeline as the wallpaper (an iPhone HEIC is converted on the
    // device), but a block is an <img>: a video is refused with a reason
    // instead of being stored and rendered as a broken picture.
    const prepared = await prepareUpload(file);
    if (!prepared.ok) {
      setError(
        prepared.reason === "too-large"
          ? `Pictures must be under ${IMAGE_COPY_LIMIT}, even after re-sizing.`
          : prepared.reason === "undecodable"
            ? "That picture could not be decoded on this device. Try exporting it as JPEG."
            : "That file is not a picture.",
      );
      return;
    }
    if (prepared.prepared.kind !== "image") {
      setError("A block takes a picture, not a video. Videos are only used as the page background.");
      return;
    }
    const stored = await storeUpload(prepared.prepared);
    if (!stored.ok) {
      setError(`Pictures must be under ${IMAGE_COPY_LIMIT}.`);
      return;
    }
    const url = await getAssetUrl(stored.asset.id);
    setDraftAsset(url ? { id: stored.asset.id, url } : null);
  }

  function addBlock() {
    setError("");
    if (draftKind === "link" && !safeUrl(draftUrl)) {
      setError("Links need a full http(s) address.");
      return;
    }
    if (draftKind === "image" && !draftAsset) {
      setError("Choose an image first.");
      return;
    }
    if (!draftTitle.trim() && !draftBody.trim()) {
      setError("Give the block a title or some text.");
      return;
    }
    if (blocks.length >= 12) {
      setError("Twelve blocks is the limit — remove one to add another.");
      return;
    }

    const block: CustomBlock = {
      id: `block-${Date.now().toString(36)}`,
      kind: draftKind,
      title: draftTitle.trim().slice(0, 80),
      body: draftBody.trim().slice(0, 600),
      url: draftKind === "link" ? (safeUrl(draftUrl) ?? "") : "",
      assetId: draftKind === "image" ? (draftAsset?.id ?? "") : "",
      placement: draftPlacement,
      course: draftPlacement === "course" ? draftCourse : "",
    };

    update((draft) => {
      draft.content.blocks = [...draft.content.blocks, block];
    });
    resetDraft();
  }

  function removeBlock(block: CustomBlock) {
    if (block.assetId) void deleteAsset(block.assetId);
    update((draft) => {
      draft.content.blocks = draft.content.blocks.filter((entry) => entry.id !== block.id);
    });
  }

  return (
    <>
      <Panel
        title="Hero"
        description="Leave a field empty to keep the default — or the adaptive variant, if you have that switched on."
      >
        <Row label="Badge" hint="The small line above the headline.">
          <TextField
            value={prefs.content.heroBadge}
            placeholder="Built by a student · Free since 2025 · 10 AP courses"
            maxLength={120}
            onChange={(value) => update((draft) => { draft.content.heroBadge = value; })}
          />
        </Row>
        <Row label="Headline" hint="One or two lines works best.">
          <TextArea
            rows={2}
            value={prefs.content.heroTitle}
            placeholder="Learn ten AP subjects deeply — on a quieter kind of study hub."
            maxLength={140}
            onChange={(value) => update((draft) => { draft.content.heroTitle = value; })}
          />
        </Row>
        <Row label="Sub-headline" hint="The paragraph under the headline.">
          <TextArea
            rows={4}
            value={prefs.content.heroSubtitle}
            placeholder="The default paragraph explains the library, the practice, and the price."
            maxLength={320}
            onChange={(value) => update((draft) => { draft.content.heroSubtitle = value; })}
          />
        </Row>
        <Row label="Footer note" hint="A line of your own in the footer, next to the build date.">
          <TextField
            value={prefs.content.footerNote}
            placeholder="Add a note to the footer"
            maxLength={240}
            onChange={(value) => update((draft) => { draft.content.footerNote = value; })}
          />
        </Row>
      </Panel>

      <Panel
        title="Custom blocks"
        description="Your own text, image, or link — on the home page or a specific course."
        aside={<span className="pref-count">{blocks.length} / 12</span>}
      >
        <div className="block-builder">
          <Segmented
            label="Block kind"
            value={draftKind}
            onChange={(value) => setDraftKind(value)}
            options={[
              { value: "text", label: "Text" },
              { value: "image", label: "Image" },
              { value: "link", label: "Link" },
            ]}
          />
          <TextField
            value={draftTitle}
            placeholder="Title"
            maxLength={80}
            onChange={setDraftTitle}
          />
          <TextArea
            value={draftBody}
            rows={2}
            placeholder={draftKind === "image" ? "Caption (optional)" : "Body text"}
            maxLength={600}
            onChange={setDraftBody}
          />
          {draftKind === "link" ? (
            <TextField
              type="url"
              value={draftUrl}
              placeholder="https://example.com/resource"
              maxLength={500}
              onChange={setDraftUrl}
            />
          ) : null}
          {draftKind === "image" ? (
            <div className="block-upload">
                            {draftAsset ? <img src={draftAsset.url} alt="Selected upload" /> : null}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                aria-label="Choose an image for the block"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void pickImage(file);
                  event.target.value = "";
                }}
              />
            </div>
          ) : null}
          <div className="block-builder-row">
            <Select
              value={draftPlacement}
              onChange={(value) => setDraftPlacement(value)}
              options={[
                { value: "home", label: "Show on the home page" },
                { value: "course", label: "Show on a course page" },
              ]}
            />
            {draftPlacement === "course" ? (
              <Select
                value={draftCourse}
                onChange={setDraftCourse}
                options={subjects.map((subject) => ({ value: subject.slug, label: subject.familiar }))}
              />
            ) : null}
            <button type="button" className="btn" onClick={addBlock}>
              Add block
            </button>
          </div>
          {error ? <p className="settings-error">{error}</p> : null}
        </div>

        {blocks.length > 0 ? (
          <ul className="block-list">
            {blocks.map((block) => (
              <li key={block.id}>
                <div>
                  <p className="block-list-title">
                    {block.title || "(untitled)"}{" "}
                    <span className="pref-badge">{block.kind}</span>{" "}
                    <span className="pref-badge">
                      {block.placement === "course"
                        ? (subjects.find((subject) => subject.slug === block.course)?.familiar ?? "course")
                        : "home"}
                    </span>
                  </p>
                  {block.body ? <p className="block-list-body">{block.body}</p> : null}
                  {block.url ? <p className="block-list-body">{block.url}</p> : null}
                </div>
                <div className="block-list-actions">
                  <button
                    type="button"
                    className="pref-mini"
                    onClick={() =>
                      update((draft) => {
                        const target = draft.content.blocks.find((entry) => entry.id === block.id);
                        if (target) target.placement = target.placement === "home" ? "course" : "home";
                      })
                    }
                  >
                    Move to {block.placement === "home" ? "course" : "home"}
                  </button>
                  <button type="button" className="pref-mini" onClick={() => removeBlock(block)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <Note>No custom blocks yet. Text is the quickest way to add a note to your own home page.</Note>
        )}
      </Panel>
    </>
  );
}
