/**
 * "Does this video have a sound track?"
 *
 * There is no standard property for it. Every engine exposes a different,
 * non-standard one — Safari has `audioTracks`, Firefox has `mozHasAudio`, and
 * Chromium only counts decoded audio bytes after a frame or two has played.
 * So: play it muted for a moment (allowed everywhere without a gesture), read
 * whichever answer the browser offers, then put the element away.
 *
 * The result is `null` when the browser cannot answer. Callers treat that as
 * "assume it might": the mute switch stays available rather than being hidden
 * from someone whose browser simply does not say.
 */

type AudioProbeVideo = HTMLVideoElement & {
  mozHasAudio?: boolean;
  webkitAudioDecodedByteCount?: number;
  audioTracks?: { length: number };
};

export async function hasAudioTrack(url: string): Promise<boolean | null> {
  if (typeof document === "undefined") return null;

  const video = document.createElement("video") as AudioProbeVideo;
  video.src = url;
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  video.crossOrigin = "anonymous";

  const ready = new Promise<boolean>((resolve) => {
    const done = () => resolve(true);
    video.addEventListener("loadeddata", done, { once: true });
    video.addEventListener("loadedmetadata", done, { once: true });
    video.addEventListener("error", () => resolve(false), { once: true });
    // A background video is local (an IndexedDB blob), so this is generous.
    window.setTimeout(() => resolve(false), 4000);
  });

  const loaded = await ready;
  if (!loaded) {
    video.removeAttribute("src");
    return null;
  }

  try {
    await video.play();
  } catch {
    // Autoplay of a muted element is allowed; if it still refuses, the decoders
    // below are the only thing lost and the result falls back to null.
  }
  // Chromium needs a moment of playback before it counts decoded audio.
  await new Promise((resolve) => window.setTimeout(resolve, 220));

  let result: boolean | null = null;
  if (typeof video.mozHasAudio === "boolean") {
    result = video.mozHasAudio;
  } else if (video.audioTracks) {
    result = video.audioTracks.length > 0;
  } else if (typeof video.webkitAudioDecodedByteCount === "number" && video.currentTime > 0) {
    result = video.webkitAudioDecodedByteCount > 0;
  }

  video.pause();
  video.removeAttribute("src");
  video.load();
  return result;
}
