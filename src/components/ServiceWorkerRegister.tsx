"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      // Ensure any previously installed service worker or stale asset cache
      // never serves outdated bundles or old icons during live preview / dev.
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => {
          for (const reg of registrations) {
            reg.unregister().catch(() => {});
          }
        })
        .catch(() => {});
      if ("caches" in window) {
        caches
          .keys()
          .then((keys) => {
            for (const key of keys) {
              if (key.startsWith("aps-study-")) caches.delete(key).catch(() => {});
            }
          })
          .catch(() => {});
      }
      return;
    }

    const register = () =>
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => reg.update().catch(() => {}))
        .catch(() => {
          // The site remains fully usable online if a restrictive browser blocks it.
        });
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
    return () => window.removeEventListener("load", register);
  }, []);
  return null;
}
