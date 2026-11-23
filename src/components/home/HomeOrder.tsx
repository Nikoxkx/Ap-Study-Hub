"use client";

import { useEffect } from "react";
import { usePrefs } from "@/lib/use-prefs";

/**
 * Applies the saved home-page order and visibility.
 *
 * Implemented as a DOM effect rather than by re-ordering React children: the
 * sections stay exactly where the server put them, and this only sets `order`
 * and `display` on elements that already carry a `data-home-module` id. The
 * result is a layout change, not a re-render — no section is unmounted, so no
 * video player, draft, or expanded answer loses its state when a module moves.
 */
export function HomeOrder() {
  const { prefs } = usePrefs();

  useEffect(() => {
    const hidden = new Set(prefs.layout.hidden);
    const nodes = document.querySelectorAll<HTMLElement>("[data-home-module]");
    nodes.forEach((node) => {
      const id = node.dataset.homeModule ?? "";
      const index = prefs.layout.order.indexOf(id);
      node.style.order = String(index === -1 ? 99 : index);
      node.style.display = hidden.has(id) ? "none" : "";
    });
  }, [prefs.layout.order, prefs.layout.hidden]);

  return null;
}
