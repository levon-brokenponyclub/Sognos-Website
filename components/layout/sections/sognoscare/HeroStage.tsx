"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

// SognosCare hero stage — option 3 "Day in motion"
// (docs/mockups/sognoscare/01m-hero-a.html). Photo (78% wide) with a
// Support at Home budget card overlapping top-right (count-up + bar) and a
// notification stack bottom-left that cycles. Cards rise in, float, and
// drift on scroll at their own rate. Reduced motion: finished state, still.
// Card data is illustrative demo content.

const EASE = [0.22, 1, 0.36, 1] as const;
const BUDGET = 8412;
const BUDGET_CAP = "12,000";
const BUDGET_PCT = 70;

const TOASTS = [
  ["Visit completed", "Personal care · R. Okafor", "bg-emerald-500"],
  ["Claim lodged", "Support at Home · $184.20", "bg-sognos-blue-accent"],
  ["Progress note signed", "Copilot draft approved", "bg-[#a5b4fc]"],
  ["Incident closed", "Coordinator review · 10:40", "bg-[#ffad6e]"],
] as const;

function Layer({
  delay,
  speed,
  progress,
  still,
  float = false,
  floatOffset = 0,
  className,
  children,
}: {
  delay: number;
  speed: number;
  progress: MotionValue<number>;
  still: boolean;
  float?: boolean;
  floatOffset?: number;
  className: string;
  children: ReactNode;
}) {
  // Scroll parallax: ±60px × speed across the stage's pass through the viewport.
  const y = useTransform(progress, [0, 1], still ? [0, 0] : [speed * 60, -speed * 60]);
  return (
    <motion.div style={{ y }} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay }}
      >
        <motion.div
          animate={float && !still ? { y: [0, -8, 0] } : undefined}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: floatOffset }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function BudgetCard({ run, still }: { run: boolean; still: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run || still) return;
    let raf = 0;
    let t0 = 0;
    const start = setTimeout(() => {
      const tick = (t: number) => {
        t0 ||= t;
        const p = Math.min(1, (t - t0) / 1600);
        setN(Math.round(BUDGET * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, 900);
    return () => {
      clearTimeout(start);
      cancelAnimationFrame(raf);
    };
  }, [run, still]);
  const filled = still || n > 0;
  return (
    <div className="rounded-lg border border-sognos-line bg-white p-5 text-left">
      <p className="font-heading text-lg text-sognos-heading">Support at Home</p>
      <p className="text-xs text-sognos-muted">M. Turner &middot; Level 3 &middot; this quarter</p>
      <p className="mt-4 font-heading text-3xl text-sognos-heading tabular-nums">
        ${(still ? BUDGET : n).toLocaleString()}
        <span className="text-base text-sognos-muted"> / ${BUDGET_CAP}</span>
      </p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-sognos-tint">
        <span
          className="block h-full rounded-full bg-sognos-blue-accent transition-[width] duration-[1600ms] ease-out"
          style={{ width: filled ? `${BUDGET_PCT}%` : 0 }}
        />
      </div>
      <dl className="mt-4 divide-y divide-sognos-line text-sm">
        <div className="flex justify-between py-2.5">
          <dt className="text-sognos-muted">Visits delivered</dt>
          <dd className="text-sognos-heading">46</dd>
        </div>
        <div className="flex justify-between py-2.5">
          <dt className="text-sognos-muted">Claims</dt>
          <dd className="font-medium text-emerald-700">&#10003; All lodged</dd>
        </div>
      </dl>
    </div>
  );
}

function ToastStack({ run, still }: { run: boolean; still: boolean }) {
  // `tick` counts arrivals; the newest toast is TOASTS[tick % n] and sits at k = 0.
  const [tick, setTick] = useState(2);
  useEffect(() => {
    if (!run || still) return;
    const id = setInterval(() => setTick((t) => t + 1), 2600);
    return () => clearInterval(id);
  }, [run, still]);
  const rows = [0, 1, 2].map((k) => ({ id: tick - k, k, toast: TOASTS[(tick - k) % TOASTS.length] }));
  return (
    <ul className="relative h-[168px]">
      {rows.map(({ id, k, toast: [title, meta, dot] }) => (
        <motion.li
          key={id}
          initial={still ? false : { opacity: 0, y: 24, scale: 1 }}
          animate={{ opacity: 1 - k * 0.3, y: -k * 14, scale: 1 - k * 0.05 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ zIndex: 3 - k }}
          className="absolute inset-x-0 bottom-0 flex items-center gap-3 rounded-lg border border-sognos-line bg-white p-3.5 text-left"
        >
          <span className={`size-2.5 shrink-0 rounded-full ${dot}`} />
          <div className="min-w-0">
            <p className="text-sm font-medium text-sognos-heading">{title}</p>
            <p className="truncate text-xs text-sognos-muted">{meta}</p>
          </div>
          <span className="ml-auto text-xs text-sognos-muted">now</span>
        </motion.li>
      ))}
    </ul>
  );
}

export default function SognoscareHeroStage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const still = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div ref={ref} aria-hidden="true" className="relative mx-auto h-[420px] w-full max-w-[1280px] sm:h-[560px]">
      <div className="absolute inset-x-0 inset-y-[7%] z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="relative h-full w-full max-w-[78%] overflow-hidden rounded-lg bg-white/5"
        >
          <Image
            src="/product/sognos-care-hero-img.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1280px) 1000px, 78vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      <Layer
        delay={0.5}
        speed={0.5}
        progress={scrollYProgress}
        still={still}
        float
        className="absolute top-[3%] right-0 z-20 hidden w-[300px] sm:block lg:w-[24%] lg:min-w-[300px]"
      >
        <BudgetCard run={inView} still={still} />
      </Layer>

      <Layer
        delay={0.7}
        speed={0.9}
        progress={scrollYProgress}
        still={still}
        className="absolute bottom-[3%] left-0 z-20 w-[290px] sm:w-[340px]"
      >
        <ToastStack run={inView} still={still} />
      </Layer>
    </div>
  );
}
