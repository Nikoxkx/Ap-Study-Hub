import type { ReactNode } from "react";

/**
 * Paper furniture.
 *
 * The site already had flat `.sheet` panels; these are the two surfaces that
 * are supposed to read as physical objects rather than boxes:
 *
 *   TornNote   a scrap torn out of a lined pad, with the tear drawn by a real
 *              photograph of a torn edge rather than a border-radius.
 *   DeskScene  the fixed backdrop: lamp light and a photographed paper desk.
 *              Light mode gets daylight, dark mode gets the same desk at night.
 *
 * Both are pure decoration and are marked as such: the paper says nothing a
 * screen reader needs, and the content on top is ordinary markup.
 */

export function TornNote({
  children,
  label,
  tilt = -0.5,
}: {
  children: ReactNode;
  label?: string;
  tilt?: number;
}) {
  return (
    <aside
      className="torn-note"
      style={{ ["--tilt" as string]: `${tilt}deg` }}
    >
      <div className="torn-note-inner">
        {label ? <p className="label torn-note-label">{label}</p> : null}
        {children}
      </div>
    </aside>
  );
}
