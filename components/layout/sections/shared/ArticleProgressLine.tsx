"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Sticky read-progress line for the column between the meta rail and the prose.
//
// The track spans the full height of the article row. The fill lives inside a
// viewport-tall sticky box and grows from its top edge, so the indicator stays
// compact and in view instead of trailing thousands of pixels of filled line
// behind the reader. Scales rather than animating height, so the spring runs on
// the compositor.
//
// `top` must match the sticky offset of the rail beside it, or the two columns
// pin at different heights.
export default function ArticleProgressLine({ top = 144 }: { top?: number }) {
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
      const el = containerRef.current;
      if (!el) return;
      const { top: elTop, height } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the row's top reaches the sticky offset, 1 when its bottom
      // reaches the viewport bottom.
      const scrollable = height - vh + top;
      const progress =
        scrollable > 0
          ? Math.max(0, Math.min(1, (top - elTop) / scrollable))
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
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [rawProgress, top]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none relative h-full"
    >
      {/* Track — full height of the article row */}
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-sognos-line" />

      {/* Fill — viewport-tall sticky box, scaled from its top edge */}
      <div className="sticky" style={{ top, height: `calc(100vh - ${top}px)` }}>
        <motion.div
          style={{ scaleY }}
          className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 origin-top bg-sognos-blue-accent"
        />
      </div>
    </div>
  );
}
