"use client";

import { useEffect, useRef } from "react";

/**
 * HeroVideo — autoplay muted loop background video.
 * Falls back gracefully if no src is provided (shows gradient only).
 *
 * Usage:
 *   <HeroVideo src="/videos/hero.mp4" poster="/images/hero-poster.jpg" />
 *
 * To add a real video, place an mp4 file in /public/videos/hero.mp4
 * A free outdoor/adventure stock video works great (Pexels, Pixabay).
 */
export function HeroVideo({ src, poster }: { src?: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure autoplay even if browser paused it
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {
        /* silent — autoplay blocked, gradient fallback visible */
      });
    }
  }, []);

  if (!src) return null;

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover animate-overlay-in"
      style={{ zIndex: 0 }}
    />
  );
}
