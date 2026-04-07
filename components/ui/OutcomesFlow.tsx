"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";

// ── Animated bar chart icon ────────────────────────────────────────────────
// 4 bars grow from baseline upward with staggered delay

const BAR_HEIGHTS = [10, 18, 13, 22]; // px, within 24px viewBox height

function BarIcon({ trigger }: { trigger: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      {BAR_HEIGHTS.map((h, i) => (
        <motion.rect
          key={i}
          x={i * 5.5 + 0.5}
          width={4}
          rx={1.5}
          fill="currentColor"
          initial={{ height: 0, y: 22 }}
          animate={trigger ? { height: h, y: 22 - h } : { height: 0, y: 22 }}
          transition={{
            duration: 0.55,
            delay: 0.3 + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </svg>
  );
}

// ── Count-up hook ──────────────────────────────────────────────────────────

function useCountUp(
  to: number,
  opts: { duration?: number; decimals?: number; trigger: boolean }
): string {
  const { duration = 1.8, decimals = 0, trigger } = opts;
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!trigger) return;
    const ctrl = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        setDisplay(
          decimals > 0
            ? v.toFixed(decimals)
            : Math.round(v).toLocaleString()
        );
      },
    });
    return ctrl.stop;
  }, [trigger, to, duration, decimals]);

  return display;
}

// ── Sparkline bar chart ────────────────────────────────────────────────────
// Mini chart rendered inside the card body

const SPARK = [38, 52, 44, 61, 55, 73, 68, 85, 79, 92]; // % of max

function SparkLine({ trigger }: { trigger: boolean }) {
  const W = 200;
  const H = 48;
  const barW = 14;
  const gap = (W - SPARK.length * barW) / (SPARK.length - 1);

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      {SPARK.map((v, i) => {
        const h = (v / 100) * H;
        const x = i * (barW + gap);
        return (
          <motion.rect
            key={i}
            x={x}
            width={barW}
            rx={3}
            fill={i === SPARK.length - 1 ? "#4f46e5" : "#e0e7ff"}
            initial={{ height: 0, y: H }}
            animate={trigger ? { height: h, y: H - h } : { height: 0, y: H }}
            transition={{
              duration: 0.6,
              delay: 0.5 + i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        );
      })}
    </svg>
  );
}

// ── Dashboard card ─────────────────────────────────────────────────────────

function DashboardCard({ trigger }: { trigger: boolean }) {
  const mainCount  = useCountUp(8420, { duration: 2.0, trigger });
  const trendCount = useCountUp(43,   { duration: 1.4, trigger });
  const sub1Count  = useCountUp(847,  { duration: 1.8, trigger });
  const sub2Count  = useCountUp(124,  { duration: 1.6, trigger });

  return (
    <div className="w-full max-w-[360px] rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-neutral-700">
          <BarIcon trigger={trigger} />
          <span className="text-sm font-semibold text-neutral-800 tracking-tight">
            Care Delivery
          </span>
        </div>
        <button
          className="flex h-6 w-6 items-center justify-center rounded-md text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="Options"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <circle cx="2"  cy="7" r="1.4" />
            <circle cx="7"  cy="7" r="1.4" />
            <circle cx="12" cy="7" r="1.4" />
          </svg>
        </button>
      </div>

      {/* Main counter */}
      <div className="mt-5">
        <div className="flex items-baseline gap-2">
          <span className="text-[2.5rem] font-bold leading-none tracking-tight text-neutral-900 tabular-nums">
            {mainCount}
          </span>
          <span className="text-sm font-medium text-neutral-400">HRS</span>
        </div>

        <div className="mt-2.5 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M4 1L7.5 6.5H0.5L4 1Z" fill="currentColor" />
            </svg>
            +{trendCount}%
          </span>
          <span className="text-sm text-neutral-400">increased from last quarter</span>
        </div>
      </div>

      {/* Sparkline chart */}
      <div className="mt-5">
        <SparkLine trigger={trigger} />
      </div>

      {/* Metric rows */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between rounded-xl bg-neutral-50 px-4 py-3">
          <span className="text-sm text-neutral-500">Active Care Plans:</span>
          <span className="text-sm font-semibold tabular-nums text-neutral-900">
            {sub1Count}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-neutral-50 px-4 py-3">
          <span className="text-sm text-neutral-500">Workers Scheduled:</span>
          <span className="text-sm font-semibold tabular-nums text-neutral-900">
            {sub2Count}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── OutcomesFlow ───────────────────────────────────────────────────────────

export default function OutcomesFlow({ trigger = false }: { trigger?: boolean }) {
  return (
    <motion.div
      className="flex items-center justify-center py-4"
      initial={{ opacity: 0, y: 24 }}
      animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <DashboardCard trigger={trigger} />
    </motion.div>
  );
}
