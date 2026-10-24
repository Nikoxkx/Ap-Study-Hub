"use client";

import { useEffect, useState } from "react";

export function OfflinePackButton({ courseLabel, routes }: { courseLabel: string; routes: string[] }) {
  const [status, setStatus] = useState<"idle" | "caching" | "cached" | "error">("idle");
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update); window.addEventListener("offline", update);
    return () => { window.removeEventListener("online", update); window.removeEventListener("offline", update); };
  }, []);

  const save = async () => {
    if (!("caches" in window)) { setStatus("error"); return; }
    setStatus("caching");
    try {
      const cache = await caches.open("aps-study-pages-v1");
      await cache.addAll(routes);
      setStatus("cached");
    } catch { setStatus("error"); }
  };

  return (
    <div className="offline-pack">
      <button type="button" className="btn btn-outline btn-sm" onClick={save} disabled={status === "caching" || status === "cached"}>
        {status === "caching" ? "Saving course…" : status === "cached" ? "Course saved offline" : "Save course offline"}
      </button>
      <p role="status">{status === "error" ? "Could not save every page. Reconnect and try again." : status === "cached" ? `${courseLabel} pages are in this browser’s offline cache.` : online ? "Downloads this course’s notes and study pages on this device." : "You are offline; previously saved pages remain available."}</p>
    </div>
  );
}
