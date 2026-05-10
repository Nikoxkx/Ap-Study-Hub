"use client";
import { useState } from "react";
import { YouTubeSearch } from "./YouTubeSearch";

interface Video { id: string; title: string; description: string; }

export function VideoSection({ videos, color, courseName }: { videos: Video[]; color: string; courseName?: string }) {
  const [active, setActive] = useState(0);

  if (!videos.length) return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">No curated videos available yet.</p>
      {courseName && <YouTubeSearch courseName={courseName} color={color} />}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      {/* Video Player */}
      <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden bg-muted mb-4">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videos[active].id}?rel=0`}
          title={videos[active].title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-sm">{videos[active].title}</h3>
        <p className="text-xs text-muted-foreground">{videos[active].description}</p>
      </div>

      {videos.length > 1 && (
        <div className="grid gap-2">
          {videos.map((v, i) => (
            <button key={v.id} onClick={() => setActive(i)}
              className={`card p-3 text-left flex items-center gap-3 transition ${i === active ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}>
              <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt="" className="w-20 h-12 rounded object-cover" />
              <div>
                <p className="text-xs font-medium">{v.title}</p>
                <p className="text-[10px] text-muted-foreground">{v.description}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* YouTube Search */}
      {courseName && <YouTubeSearch courseName={courseName} color={color} />}
    </div>
  );
}
