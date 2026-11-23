"use client";

/* eslint-disable @next/next/no-img-element -- these are bundled wallpapers and
   local blob URLs from IndexedDB; next/image cannot optimise either, and the
   wrapper would add layout the picker does not want. */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePrefs } from "@/lib/use-prefs";
import { SURFACE_STOPS, surfaceStopOf } from "@/lib/site-prefs";
import { useThemeChoice } from "@/lib/theme";
import { WALLPAPERS } from "@/lib/prefs-theme";
import { putAsset, deleteAsset, getAssetUrl, MAX_ASSET_BYTES } from "@/lib/custom-assets";
import {
  ColorField,
  Note,
  Panel,
  Row,
  Segmented,
  Select,
  Slider,
  Toggle,
} from "./controls";

/**
 * Appearance: the theme, the wallpaper, every colour token, type, shape, motion
 * and density.
 *
 * Colour overrides are applied through `readableInk`, so the preview swatch can
 * show exactly the colour chosen while the page keeps a readable contrast. Where
 * that correction kicks in is called out in the copy rather than hidden.
 */
export function AppearancePanel() {
  const { prefs, update } = usePrefs();
  const { choice, setChoice } = useThemeChoice();
  const { appearance } = prefs;
  const [resolved, setResolved] = useState<{ id: string; url: string | null } | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);

  const customId = appearance.wallpaper.startsWith("custom:") ? appearance.wallpaper.slice(7) : null;

  useEffect(() => {
    if (!customId) return;
    let cancelled = false;
    getAssetUrl(customId).then((url) => {
      if (!cancelled) setResolved({ id: customId, url });
    });
    return () => {
      cancelled = true;
    };
  }, [customId]);

  // Keyed by id: a URL for the previous upload is never shown as the current one.
  const customUrl = customId && resolved?.id === customId ? resolved.url : null;

  async function uploadWallpaper(file: File) {
    setUploadError("");
    setUploading(true);
    try {
      const result = await putAsset(file);
      if (!result.ok) {
        setUploadError(
          result.reason === "too-large"
            ? `That file is larger than ${Math.round(MAX_ASSET_BYTES / 1024 / 1024)} MB.`
            : "That file is not a PNG, JPEG, WebP, or GIF image.",
        );
        return;
      }
      update((draft) => {
        draft.appearance.wallpaper = `custom:${result.asset.id}`;
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <Panel
        title="Theme"
        description="Day, night, or whatever the operating system is doing."
      >
        <Row label="Mode" hint="Night mode keeps the same layout and swaps the palette.">
          <Segmented
            label="Theme mode"
            value={choice}
            onChange={setChoice}
            options={[
              { value: "light", label: "Day" },
              { value: "dark", label: "Night" },
              { value: "system", label: "Auto" },
            ]}
          />
        </Row>
      </Panel>

      <Panel
        title="Background"
        description="The classroom painting behind every glass panel."
        aside={
          <button
            type="button"
            className="pref-mini"
            onClick={() => update((draft) => { draft.appearance.wallpaper = "auto"; })}
          >
            Route default
          </button>
        }
      >
        <div className="wallpaper-grid">
          {WALLPAPERS.map((wallpaper) => {
            const selected = appearance.wallpaper === wallpaper.path;
            return (
              <button
                key={wallpaper.path}
                type="button"
                className={`wallpaper-tile${selected ? " is-selected" : ""}`}
                aria-pressed={selected}
                onClick={() => update((draft) => { draft.appearance.wallpaper = wallpaper.path; })}
              >
                {/* Plain <img>: these are local files, and next/image would add a layout wrapper for no gain. */}
                                <img src={wallpaper.path} alt="" loading="lazy" />
                <span>{wallpaper.label}</span>
                <small>{wallpaper.note}</small>
              </button>
            );
          })}

          <div className={`wallpaper-tile wallpaper-tile-upload${customId ? " is-selected" : ""}`}>
            {customUrl ? (
                            <img src={customUrl} alt="Your uploaded wallpaper" />
            ) : (
              <div className="wallpaper-drop">
                <span aria-hidden="true">↑</span>
                <small>Drop an image or choose a file</small>
              </div>
            )}
            <span>Yours</span>
            <small>
              PNG, JPEG, WebP, or GIF · up to {Math.round(MAX_ASSET_BYTES / 1024 / 1024)} MB · stays on
              this device
            </small>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              aria-label="Upload a wallpaper"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void uploadWallpaper(file);
                event.target.value = "";
              }}
            />
            {customId ? (
              <button
                type="button"
                className="pref-mini"
                onClick={() => {
                  void deleteAsset(customId);
                  update((draft) => { draft.appearance.wallpaper = "auto"; });
                }}
              >
                Remove
              </button>
            ) : null}
            {uploading ? <small>Checking the file…</small> : null}
            {uploadError ? <small className="settings-error">{uploadError}</small> : null}
          </div>
        </div>

        <Row
          label="Show the wallpaper"
          hint="Turn it off for a plain page — glass panels stay exactly as they are."
        >
          <Toggle
            label="Show wallpaper"
            checked={appearance.showWallpaper}
            onChange={(checked) => update((draft) => { draft.appearance.showWallpaper = checked; })}
          />
        </Row>
        <Row label="Blur" hint="Softens the painting so small text stays comfortable.">
          <Slider
            min={0}
            max={16}
            value={appearance.wallpaperBlur}
            onChange={(value) => update((draft) => { draft.appearance.wallpaperBlur = value; })}
            format={(value) => `${value}px`}
          />
        </Row>
        <Row label="Dim" hint="0 keeps the painting at full brightness, which is the shipped setting.">
          <Slider
            min={0}
            max={70}
            value={appearance.wallpaperDim}
            onChange={(value) => update((draft) => { draft.appearance.wallpaperDim = value; })}
            format={(value) => `${value}%`}
          />
        </Row>
        <Row label="Fit" hint="Contain shows the whole painting; cover fills the viewport.">
          <Segmented
            label="Wallpaper fit"
            value={appearance.wallpaperFit}
            onChange={(value) => update((draft) => { draft.appearance.wallpaperFit = value; })}
            options={[
              { value: "cover", label: "Cover" },
              { value: "contain", label: "Contain" },
            ]}
          />
        </Row>
      </Panel>

      <Panel
        title="Colours"
        description="Text, accent, highlight, and the glass tint. Every choice is contrast-corrected so it cannot become unreadable."
      >
        <Row label="Ink" hint="Body and heading text.">
          <ColorField
            label="Ink"
            value={appearance.ink}
            fallback="#0f0f0f"
            onChange={(value) => update((draft) => { draft.appearance.ink = value; })}
          />
        </Row>
        <Row label="Secondary ink" hint="Ledes, descriptions, and supporting copy.">
          <ColorField
            label="Secondary ink"
            value={appearance.inkSoft}
            fallback="#242424"
            onChange={(value) => update((draft) => { draft.appearance.inkSoft = value; })}
          />
        </Row>
        <Row label="Faint ink" hint="Labels, captions, and metadata.">
          <ColorField
            label="Faint ink"
            value={appearance.inkFaint}
            fallback="#3d3d3d"
            onChange={(value) => update((draft) => { draft.appearance.inkFaint = value; })}
          />
        </Row>
        <Row label="Accent" hint="Drop caps, active states, and course marks.">
          <ColorField
            label="Accent"
            value={appearance.accent}
            fallback="#0f0f0f"
            onChange={(value) => update((draft) => { draft.appearance.accent = value; })}
          />
        </Row>
        <Row label="Highlight" hint="Text selection and marked passages.">
          <ColorField
            label="Highlight"
            value={appearance.highlight}
            fallback="#ffe08a"
            onChange={(value) => update((draft) => { draft.appearance.highlight = value; })}
          />
        </Row>
        <Row label="Glass tint" hint="The colour of the frosted panels.">
          <ColorField
            label="Glass tint"
            value={appearance.glassTint}
            fallback="#e2e2e2"
            onChange={(value) => update((draft) => { draft.appearance.glassTint = value; })}
          />
        </Row>
        <Note>
          Pick any colour you like: if it would fall below 4.5:1 against the panels, it is nudged along
          its own lightness axis — same hue, readable result — rather than rejected.
        </Note>
      </Panel>

      <Panel
        title="Surface"
        description="How much paper sits between you and the painting. The same ladder works in both themes — at night the stops read as smoked glass, because the paper itself is dark."
      >
        <Row
          label="Material"
          hint={
            SURFACE_STOPS.find((stop) => stop.id === surfaceStopOf(appearance.surface))?.note ??
            "Waypoints on the ladder below."
          }
        >
          <Segmented
            label="Panel surface"
            value={surfaceStopOf(appearance.surface)}
            onChange={(value) =>
              update((draft) => {
                const stop = SURFACE_STOPS.find((entry) => entry.id === value);
                if (stop) draft.appearance.surface = stop.value;
              })
            }
            options={SURFACE_STOPS.map((stop) => ({ value: stop.id, label: stop.label }))}
          />
        </Row>
        <Row
          label="Panel opacity"
          hint="Continuous: the five stops above are only landmarks. 0% is the shipped glass — the thinnest veil that still passes contrast — and 100% is a solid sheet."
        >
          <Slider
            min={0}
            max={100}
            step={1}
            value={appearance.surface}
            onChange={(value) => update((draft) => { draft.appearance.surface = value; })}
            format={(value) => `${Math.round(value)}%`}
          />
        </Row>
        <Note>
          Nothing here can make the site unreadable. Each palette has a floor — 44% paper by day, 56%
          at night — measured against the darkest and lightest patches of the four paintings; below
          it, ink stops clearing 4.5:1, so the slider starts there instead of letting you break the
          page. Going up costs you the painting and buys separation; Paper drops the blur entirely
          and prints the site on a solid sheet.
        </Note>
      </Panel>

      <Panel title="Type" description="Two faces drive the whole site: display and interface.">
        <Row label="Display face" hint="Headlines and lesson titles.">
          <Select
            value={appearance.displayFont}
            onChange={(value) => update((draft) => { draft.appearance.displayFont = value; })}
            options={[
              { value: "serif", label: "Newsreader (serif)" },
              { value: "sans", label: "Public Sans" },
              { value: "mono", label: "JetBrains Mono" },
              { value: "hand", label: "Kalam (handwriting)" },
            ]}
          />
        </Row>
        <Row label="Interface face" hint="Body copy, buttons, and navigation.">
          <Select
            value={appearance.uiFont}
            onChange={(value) => update((draft) => { draft.appearance.uiFont = value; })}
            options={[
              { value: "sans", label: "Public Sans" },
              { value: "serif", label: "Newsreader (serif)" },
              { value: "mono", label: "JetBrains Mono" },
              { value: "hand", label: "Kalam (handwriting)" },
            ]}
          />
        </Row>
        <Row label="Text size" hint="Scales the root size, so every rem-based size follows.">
          <Slider
            min={0.85}
            max={1.3}
            step={0.01}
            value={appearance.fontScale}
            onChange={(value) => update((draft) => { draft.appearance.fontScale = value; })}
            format={(value) => `${Math.round(value * 100)}%`}
          />
        </Row>
        <Row label="Line height" hint="Comfortable reading is 1.5–1.7.">
          <Slider
            min={1.35}
            max={1.95}
            step={0.01}
            value={appearance.lineHeight}
            onChange={(value) => update((draft) => { draft.appearance.lineHeight = value; })}
            format={(value) => value.toFixed(2)}
          />
        </Row>
      </Panel>

      <Panel title="Shape, motion, and density">
        <Row label="Corner rounding" hint="0 is square, 1 is the shipped shape, 2 is very round.">
          <Slider
            min={0}
            max={2}
            step={0.1}
            value={appearance.radius}
            onChange={(value) => update((draft) => { draft.appearance.radius = value; })}
            format={(value) => value.toFixed(1)}
          />
        </Row>
        <Row label="Motion" hint="“Off” removes animation entirely, including page transitions.">
          <Segmented
            label="Motion"
            value={appearance.motion}
            onChange={(value) => update((draft) => { draft.appearance.motion = value; })}
            options={[
              { value: "full", label: "Full" },
              { value: "reduced", label: "Reduced" },
              { value: "off", label: "Off" },
            ]}
          />
        </Row>
        <Row label="Density" hint="Compact tightens panels for smaller screens.">
          <Segmented
            label="Density"
            value={appearance.density}
            onChange={(value) => update((draft) => { draft.appearance.density = value; })}
            options={[
              { value: "comfortable", label: "Comfortable" },
              { value: "compact", label: "Compact" },
            ]}
          />
        </Row>
        <Row label="Pin the header" hint="Stops the floating masthead from hiding as you scroll.">
          <Toggle
            label="Pin the header"
            checked={!prefs.layout.headerAutoHide}
            onChange={(checked) => update((draft) => { draft.layout.headerAutoHide = !checked; })}
          />
        </Row>
        <Row label="Wide content" hint="Uses the full width on large screens instead of the reading column.">
          <Toggle
            label="Wide content"
            checked={prefs.layout.wideContent}
            onChange={(checked) => update((draft) => { draft.layout.wideContent = checked; })}
          />
        </Row>
        <Note>
          These settings are stored in this browser only. Nothing is uploaded — see{" "}
          <Link href="/privacy">privacy</Link> for the full list.
        </Note>
      </Panel>
    </>
  );
}
