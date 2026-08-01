"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// top-36 = 9rem = 144px — matches the sticky TOC top offset so the fill
// starts exactly when the article body clears the navbar.
const HEADER = 144;

export default function ArticleProgressLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawProgress = useMotionValue(0);
  const scaleY = useSpring(rawProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    let ticking = false;

    const update = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when element.top hits HEADER from viewport top (navbar bottom).
      // 1 when element.bottom hits viewport bottom (original "end end").
      const scrollable = height - vh + HEADER;
      const progress =
        scrollable > 0
          ? Math.max(0, Math.min(1, (HEADER - top) / scrollable))
          : 0;
      rawProgress.set(progress);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [rawProgress]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none relative h-full"
    >
      {/* Track — 2px */}
      <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-px bg-sognos-line" />
      {/* Fill — 2px, spring-smoothed */}
      <motion.div
        className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-px origin-top bg-sognos-blue-accent"
        style={{ scaleY }}
      />
    </div>
  );
}
