"use client";

// Hero panel for a customer story that has a video: the client's logo rises in,
// holds, drops away, and the video crossfades up behind it. Same shape as
// `sognosroster/Hero.tsx` — a timed hold, then two opacity layers swapping —
// with the logo also travelling, which the Roster hero does not do.
//
// A Client Component only because the sequence needs timers; the page around
// it stays a Server Component.
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const LOGO_IN_SECONDS = 0.6;
const LOGO_HOLD_MS = 2600;
const LOGO_OUT_SECONDS = 0.5;
// Longer than the logo's exit so the two overlap rather than hand over — the
// panel is never briefly empty.
const VIDEO_FADE_SECONDS = 0.9;
// How far the logo travels, in px. Up on the way in, down on the way out.
const LOGO_TRAVEL = 16;

export default function StoryHeroMedia({
  videoSrc,
  poster,
  logoUrl,
  company,
  brandColor,
}: {
  videoSrc: string;
  poster?: string;
  logoUrl?: string | null;
  company: string;
  brandColor: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [timerElapsed, setTimerElapsed] = useState(false);
  // Reduced motion skips the performance and opens on the video. Derived rather
  // than set from the effect, so there is no second render to reach the same
  // state the first one could already have described.
  const revealed = prefersReducedMotion === true || timerElapsed;

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timeout = window.setTimeout(
      () => setTimerElapsed(true),
      LOGO_IN_SECONDS * 1000 + LOGO_HOLD_MS,
    );
    return () => window.clearTimeout(timeout);
  }, [prefersReducedMotion]);

  return (
    <div
      // 16/9 and no padding: the file is 1280×720, so the video fills the frame
      // exactly. The bloom is still here as the backdrop the logo sits on
      // during the intro.
      className="relative aspect-16/9 w-full overflow-hidden rounded-lg"
      style={{
        backgroundImage: `radial-gradient(circle at 25% 20%, color-mix(in oklab, ${brandColor} 65%, white) 0%, ${brandColor} 40%, var(--sognos-navy-dark) 100%)`,
      }}
    >
      {/* Deliberately not autoplayed — this is a 170-second narrative film, and
          `preload="none"` keeps the file unfetched until someone asks for it.
          The crossfade brings up the poster frame and the controls. */}
      <motion.video
        src={videoSrc}
        poster={poster}
        controls
        playsInline
        preload="none"
        aria-label={`${company} customer story`}
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : VIDEO_FADE_SECONDS,
          ease: "easeOut",
        }}
        // Not interactive until it is actually visible, or the controls would
        // catch clicks from behind the logo.
        style={{ pointerEvents: revealed ? "auto" : "none" }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {logoUrl && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center p-8"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : LOGO_TRAVEL }}
          animate={
            revealed
              ? { opacity: 0, y: prefersReducedMotion ? 0 : LOGO_TRAVEL }
              : { opacity: 1, y: 0 }
          }
          transition={{
            duration: revealed ? LOGO_OUT_SECONDS : LOGO_IN_SECONDS,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src={logoUrl}
            alt=""
            width={480}
            height={144}
            priority
            className="h-20 w-auto max-w-[55%] object-contain brightness-0 invert"
          />
        </motion.div>
      )}
    </div>
  );
}
