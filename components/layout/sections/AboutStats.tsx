"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const STATS = [
  { value: 2016, suffix: "", label: "Founded" },
  { value: 10, suffix: "+", label: "Years" },
  { value: 3, suffix: "", label: "Countries served" },
] as const;

function CountUpStat({
  value,
  suffix,
  label,
  trigger,
}: {
  value: number;
  suffix: string;
  label: string;
  trigger: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(prefersReducedMotion ? value : 0);
  const animated = useRef(false);

  useEffect(() => {
    if (!trigger || animated.current) return;
    animated.current = true;
    if (prefersReducedMotion) { setCount(value); return; }

    const duration = 1100;
    const start = performance.now();
    // Year counts from 2000; small numbers from 0
    const from = value > 100 ? Math.floor(value * 0.97) : 0;

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(from + (value - from) * eased));
      if (t < 1) requestAnimationFrame(tick);
      else setCount(value);
    }
    requestAnimationFrame(tick);
  }, [trigger, prefersReducedMotion, value]);

  return (
    <div>
      <p className="font-heading text-4xl font-medium tracking-tight text-sognos-heading lg:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-sognos-muted">{label}</p>
    </div>
  );
}

export default function AboutStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) { setTriggered(true); io.disconnect(); }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-16 flex flex-wrap items-start gap-y-10 md:flex-nowrap">
      {STATS.map(({ value, suffix, label }, i) => (
        <div
          key={label}
          className={[
            i < STATS.length - 1
              ? "border-r border-(--sognos-line) pr-10 md:pr-12"
              : "",
            i > 0 ? "pl-10 md:pl-12" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <CountUpStat
            value={value}
            suffix={suffix}
            label={label}
            trigger={triggered}
          />
        </div>
      ))}
    </div>
  );
}
