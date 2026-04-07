"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const E = [0.22, 1, 0.36, 1] as const;

type Phase = "idle" | "waiting" | "assigned";

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconReferral = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0 text-neutral-400">
    <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4 5h6M4 7.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconCarePlan = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0 text-neutral-400">
    <path d="M2.5 7C2.5 4.5 4.5 2.5 7 2.5S11.5 4.5 11.5 7 9.5 11.5 7 11.5 2.5 9.5 2.5 7z" stroke="currentColor" strokeWidth="1.3" />
    <path d="M7 5v2.5l1.5 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconWorkOrder = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0 text-neutral-400">
    <path d="M2 3.5h10M2 7h7M2 10.5h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="11" cy="10" r="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M10.3 10l.5.5.9-.9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconTerminal = () => (
  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" aria-hidden="true" className="shrink-0 text-neutral-500">
    <path d="M11.667 2.792H2.333C1.689 2.792 1.167 3.314 1.167 3.958v7c0 .644.522 1.167 1.166 1.167h9.334c.644 0 1.166-.523 1.166-1.167v-7c0-.644-.522-1.166-1.166-1.166z" stroke="currentColor" strokeWidth="1.167" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.5 5.125H3.506M5.833 5.125H5.84M8.167 5.125H8.172" stroke="currentColor" strokeWidth="1.167" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const ITEMS = [
  { id: "referral",  label: "Service Referral", Icon: IconReferral },
  { id: "careplan",  label: "Care Plan",         Icon: IconCarePlan },
  { id: "workorder", label: "Work Order",        Icon: IconWorkOrder },
] as const;

const ASSIGN_DELAYS = [1.1, 1.6, 2.1]; // seconds after trigger

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ phase }: { phase: Phase }) {
  return (
    <AnimatePresence mode="wait">
      {phase === "waiting" && (
        <motion.span
          key="waiting"
          className="rounded-sm border border-yellow-400 bg-yellow-50 px-2 py-0.5 text-xs text-yellow-600"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.2, ease: E }}
        >
          Waiting
        </motion.span>
      )}
      {phase === "assigned" && (
        <motion.span
          key="assigned"
          className="rounded-sm border border-emerald-500 bg-emerald-50 px-2 py-0.5 text-xs text-emerald-600"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.2, ease: E }}
        >
          Assigned
        </motion.span>
      )}
    </AnimatePresence>
  );
}

// ─── ProcessFlow ──────────────────────────────────────────────────────────────

export default function ProcessFlow({ trigger = false }: { trigger?: boolean }) {
  const [phases, setPhases] = useState<Phase[]>(["idle", "idle", "idle"]);

  useEffect(() => {
    if (!trigger) {
      setPhases(["idle", "idle", "idle"]);
      return;
    }

    setPhases(["waiting", "waiting", "waiting"]);

    const timers = ASSIGN_DELAYS.map((delay, i) =>
      setTimeout(() => {
        setPhases((prev) => {
          const next = [...prev] as Phase[];
          next[i] = "assigned";
          return next;
        });
      }, delay * 1000)
    );

    return () => timers.forEach(clearTimeout);
  }, [trigger]);

  return (
    <div className="relative mx-auto w-full max-w-[460px]" aria-hidden="true">

      {/* Floating HubNode popup */}
      <motion.div
        className="absolute -top-12 -right-2 z-20 flex w-44 shrink-0 flex-col items-start rounded-xl border border-neutral-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.10)]"
        initial={{ opacity: 0, y: 6 }}
        animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.4, delay: 0.1, ease: E }}
      >
        <div className="flex justify-center px-3 py-4">
          <img src="/logos/SognosCare-logo-dark.avif" alt="SognosCare" width={100} height={32} />
        </div>
        <div className="h-px w-full bg-neutral-100" />
        <div className="flex justify-center px-3 py-2">
          <span className="rounded border border-blue-400 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
            Connected
          </span>
        </div>
      </motion.div>

      {/* Main card */}
      <motion.div
        className="rounded-2xl border-t border-gray-200 bg-white p-4 shadow-2xl"
        initial={{ opacity: 0, y: 12 }}
        animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.45, ease: E }}
      >
        {/* Traffic lights */}
        <div className="mb-4 flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>

        {/* Header */}
        <div className="flex items-center gap-2">
          <IconTerminal />
          <span className="text-sm font-medium text-neutral-800">Requests</span>
          <span className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-neutral-600">
            1,247
          </span>
        </div>

        <div className="mt-2 h-px w-full bg-gray-100" />

        {/* Request rows */}
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            className="mt-4 flex items-center justify-between gap-3"
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={
              trigger
                ? { opacity: 1, clipPath: "inset(0 0% 0 0)" }
                : { opacity: 0, clipPath: "inset(0 100% 0 0)" }
            }
            transition={{ duration: 0.4, delay: 0.28 + i * 0.14, ease: E }}
          >
            <div className="flex items-center gap-2">
              <item.Icon />
              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                {item.label}
              </span>
            </div>
            <StatusBadge phase={phases[i]} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
