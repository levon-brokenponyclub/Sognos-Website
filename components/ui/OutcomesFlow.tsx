"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";

const E = [0.22, 1, 0.36, 1] as const;

// ─── Count-up ─────────────────────────────────────────────────────────────────

function useCountUp(
  to: number,
  opts: {
    duration?: number;
    decimals?: number;
    trigger: boolean;
    delay?: number;
  },
): string {
  const { duration = 1.8, decimals = 0, trigger, delay = 0 } = opts;
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!trigger) return;
    let ctrl: ReturnType<typeof animate> | null = null;
    const id = setTimeout(() => {
      ctrl = animate(0, to, {
        duration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate(v) {
          setDisplay(
            decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString(),
          );
        },
      });
    }, delay * 1000);
    return () => {
      clearTimeout(id);
      ctrl?.stop();
    };
  }, [trigger, to, duration, decimals, delay]);

  return display;
}

// ─── Sparkline bars ───────────────────────────────────────────────────────────

const SPARK = [42, 55, 48, 63, 57, 72, 66, 81, 78, 94];

function SparkBars({
  trigger,
  accent,
  w = 140,
  h = 44,
}: {
  trigger: boolean;
  accent: string;
  w?: number;
  h?: number;
}) {
  const barW = Math.floor((w - (SPARK.length - 1) * 4) / SPARK.length);
  const gap = 4;
  return (
    <svg
      width="100%"
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {SPARK.map((v, i) => {
        const bh = (v / 100) * h;
        const x = i * (barW + gap);
        return (
          <motion.rect
            key={i}
            x={x}
            width={barW}
            rx={2}
            fill={i === SPARK.length - 1 ? accent : accent + "33"}
            initial={{ height: 0, y: h }}
            animate={trigger ? { height: bh, y: h - bh } : { height: 0, y: h }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.04, ease: E }}
          />
        );
      })}
    </svg>
  );
}

// ─── Compliance ring ──────────────────────────────────────────────────────────

function ComplianceRing({ trigger }: { trigger: boolean }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative flex h-[68px] w-[68px] shrink-0 items-center justify-center">
      <svg
        width="68"
        height="68"
        viewBox="0 0 68 68"
        fill="none"
        className="-rotate-90"
      >
        <circle cx="34" cy="34" r={r} stroke="#e5e7eb" strokeWidth="5" />
        <motion.circle
          cx="34"
          cy="34"
          r={r}
          stroke="#10b981"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={
            trigger
              ? { strokeDashoffset: circ * 0.02 }
              : { strokeDashoffset: circ }
          }
          transition={{ duration: 1.4, delay: 0.3, ease: E }}
        />
      </svg>
      <span className="absolute text-[13px] font-bold text-neutral-900">
        98%
      </span>
    </div>
  );
}

// ─── Left tile — Utilisation (full height) ────────────────────────────────────

function UtilisationTile({ trigger }: { trigger: boolean }) {
  const hrs = useCountUp(8420, { duration: 1.8, trigger, delay: 0.2 });
  const trend = useCountUp(43, { duration: 1.4, trigger, delay: 0.3 });
  const plans = useCountUp(847, { duration: 1.6, trigger, delay: 0.4 });
  const workers = useCountUp(124, { duration: 1.5, trigger, delay: 0.45 });

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-neutral-100 bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
      {/* Header */}
      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Utilisation
      </span>

      {/* Main stat */}
      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl font-bold leading-none tracking-tight text-neutral-900 tabular-nums">
            {hrs}
          </span>
          <span className="text-xs font-medium text-neutral-400">HRS</span>
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
            <svg
              width="7"
              height="7"
              viewBox="0 0 8 8"
              fill="none"
              aria-hidden="true"
            >
              <path d="M4 1L7.5 6.5H0.5L4 1Z" fill="currentColor" />
            </svg>
            +{trend}%
          </span>
          <span className="text-[10px] text-neutral-400">vs last quarter</span>
        </div>
      </div>

      {/* Sparkbars — fills available width */}
      <div className="w-full">
        <SparkBars trigger={trigger} accent="#4f46e5" w={220} h={48} />
      </div>

      {/* Metric rows */}
      <div className="space-y-2">
        <div className="flex items-center justify-between rounded-xl bg-neutral-50 px-3.5 py-2.5">
          <span className="text-[11px] text-neutral-500">
            Active Care Plans
          </span>
          <span className="text-sm font-bold tabular-nums text-neutral-900">
            {plans}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-neutral-50 px-3.5 py-2.5">
          <span className="text-[11px] text-neutral-500">
            Workers Scheduled
          </span>
          <span className="text-sm font-bold tabular-nums text-neutral-900">
            {workers}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Right top — Compliance ───────────────────────────────────────────────────

function ComplianceTile({ trigger }: { trigger: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-neutral-100 bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Compliance
      </span>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-2xl font-bold leading-none tracking-tight text-neutral-900">
            0
          </p>
          <p className="mt-1.5 text-[10px] leading-relaxed text-neutral-400">
            incidents this
            <br />
            quarter
          </p>
        </div>
        <ComplianceRing trigger={trigger} />
      </div>
      <div className="rounded-xl bg-emerald-50 px-3.5 py-2.5">
        <span className="text-[11px] font-semibold text-emerald-700">
          12 consecutive months CQC clean
        </span>
      </div>
    </div>
  );
}

// ─── Right bottom — Cost & Coverage ──────────────────────────────────────────

function CostTile({ trigger }: { trigger: boolean }) {
  const saving = useCountUp(31, { duration: 1.5, trigger, delay: 0.5 });
  const workers = useCountUp(124, { duration: 1.6, trigger, delay: 0.4 });
  const visits = useCountUp(99, { duration: 1.4, trigger, delay: 0.45 });

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-neutral-100 bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Cost & Coverage
      </span>
      <div className="space-y-2">
        <div className="flex items-center justify-between rounded-xl bg-neutral-50 px-3.5 py-2.5">
          <span className="text-[11px] text-neutral-500">Cost reduction</span>
          <span className="text-sm font-bold tabular-nums text-neutral-900">
            −{saving}%
          </span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-neutral-50 px-3.5 py-2.5">
          <span className="text-[11px] text-neutral-500">Workers active</span>
          <span className="text-sm font-bold tabular-nums text-neutral-900">
            {workers}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-neutral-50 px-3.5 py-2.5">
          <span className="text-[11px] text-neutral-500">Visit completion</span>
          <span className="text-sm font-bold tabular-nums text-neutral-900">
            {visits}%
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── OutcomesFlow ─────────────────────────────────────────────────────────────

export default function OutcomesFlow({
  trigger = false,
}: {
  trigger?: boolean;
}) {
  return (
    <div className="flex w-full h-full items-stretch gap-4">
      {/* Left column — full height */}
      <motion.div
        className="flex flex-[3] flex-col"
        initial={{ opacity: 0, y: 16 }}
        animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.45, delay: 0.1, ease: E }}
      >
        <UtilisationTile trigger={trigger} />
      </motion.div>

      {/* Right column — two stacked tiles */}
      <div className="flex flex-[2] flex-col gap-4">
        <motion.div
          className="flex flex-1 flex-col"
          initial={{ opacity: 0, y: 16 }}
          animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.45, delay: 0.2, ease: E }}
        >
          <ComplianceTile trigger={trigger} />
        </motion.div>
        <motion.div
          className="flex flex-1 flex-col"
          initial={{ opacity: 0, y: 16 }}
          animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.45, delay: 0.3, ease: E }}
        >
          <CostTile trigger={trigger} />
        </motion.div>
      </div>
    </div>
  );
}
