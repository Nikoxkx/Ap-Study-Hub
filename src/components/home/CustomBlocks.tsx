"use client";

/* eslint-disable @next/next/no-img-element -- the source is a blob URL for an
   upload held in this browser's IndexedDB, so there is nothing to optimise. */

import { getAssetUrl } from "@/lib/custom-assets";
import { useEffect, useState } from "react";
import { usePrefs } from "@/lib/use-prefs";
import type { CustomBlock } from "@/lib/site-prefs";

function BlockImage({ assetId, alt }: { assetId: string; alt: string }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getAssetUrl(assetId).then((next) => {
      if (!cancelled) setUrl(next);
    });
    return () => {
      cancelled = true;
    };
  }, [assetId]);

  if (!url) return null;
  // A plain <img>: the source is a local blob URL, so there is nothing for
  // next/image to optimise and no remote host to allowlist.
    return <img src={url} alt={alt} loading="lazy" className="custom-block-image" />;
}

/**
 * Custom blocks placed on the home page or a course page.
 *
 * What a block contains was written by the visitor, but it is still treated as
 * untrusted input: text is rendered as text, links only survive if they are
 * http(s), and images come from validated local uploads. Nothing here can inject
 * markup into the page.
 */
export function CustomBlocks({ placement, course }: { placement: CustomBlock["placement"]; course?: string }) {
  const { prefs } = usePrefs();
  const blocks = prefs.content.blocks.filter(
    (block) => block.placement === placement && (placement === "home" || block.course === course),
  );

  if (blocks.length === 0) return null;

  return (
    <section className="custom-blocks" aria-label="Your own notes">
      {blocks.map((block) => (
        <article key={block.id} className="custom-block glass-box">
          {block.kind === "image" && block.assetId ? (
            <BlockImage assetId={block.assetId} alt={block.title || "Your image"} />
          ) : null}
          {block.title ? <h3 className="custom-block-title">{block.title}</h3> : null}
          {block.body ? <p className="custom-block-body">{block.body}</p> : null}
          {block.kind === "link" && block.url ? (
            <a
              className="custom-block-link"
              href={block.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Open link →
            </a>
          ) : null}
        </article>
      ))}
    </section>
  );
}
