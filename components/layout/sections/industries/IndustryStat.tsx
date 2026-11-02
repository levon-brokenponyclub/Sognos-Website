"use client";

import { useEffect, useRef, useState } from "react";

// The HSC "Photo + stat" effect, played on card hover (2026-11-02): when the
// enclosing card link is hovered or focused, the stat fades up over the photo
// and its number counts from 0. Leaving resets it, so the next hover counts
// again. Reduced motion: the number shows final, the fade stays. Touch devices
// never hover, so there the stat stays hidden — it is decoration, not content.

export type IndustryStatData = { label: string; value: number; suffix: string };

const COUNT_MS = 900;

export default function IndustryStat({ label, value, suffix }: IndustryStatData) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const card = ref.current?.closest("a");
    if (!card) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = () => {
      cancelAnimationFrame(raf);
      if (still) return setShown(value);
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / COUNT_MS, 1);
        setShown(Math.round(value * (1 - Math.pow(1 - p, 3)))); // ease-out cubic
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      setShown(0);
    };
    card.addEventListener("pointerenter", start);
    card.addEventListener("focusin", start);
    card.addEventListener("pointerleave", reset);
    card.addEventListener("focusout", reset);
    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener("pointerenter", start);
      card.removeEventListener("focusin", start);
      card.removeEventListener("pointerleave", reset);
      card.removeEventListener("focusout", reset);
    };
  }, [value]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute top-[12%] left-[12%] translate-y-2 text-white opacity-0 transition-[opacity,translate] duration-300 ease-[cubic-bezier(.23,1,.32,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:translate-y-0"
    >
      <p className="text-sm text-white/85">{label}</p>
      <p className="mt-1 font-heading text-5xl leading-none font-light tabular-nums text-white lg:text-6xl">
        {shown}
        <span className="ml-1 align-top text-[0.45em]">{suffix}</span>
      </p>
    </div>
  );
}
