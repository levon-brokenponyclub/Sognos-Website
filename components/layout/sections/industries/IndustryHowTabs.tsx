"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type HelpItem = { title: string; body: string };

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function WorkflowMockup({
  item,
  items,
  active,
  industryName,
}: {
  item: HelpItem;
  items: readonly HelpItem[];
  active: number;
  industryName: string;
}) {
  const previewSteps = items.slice(0, 5);

  return (
    <div className="relative flex min-h-[420px] items-center justify-end overflow-hidden p-6 lg:min-h-full lg:p-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(29,150,252,0.18),transparent_34%),radial-gradient(circle_at_40%_80%,rgba(255,255,255,0.08),transparent_30%)]"
      />

      <div className="relative grid w-full max-w-[42rem] items-center gap-6 lg:grid-cols-[0.9fr_1fr]">
        <div className="space-y-3">
          {previewSteps.map((step, i) => {
            const isActive = i === active;
            return (
              <div
                key={`${step.title}-${i}`}
                className={[
                  "rounded border px-4 py-3 transition-colors duration-300",
                  isActive
                    ? "border-white/20 bg-white/10 text-white"
                    : "border-white/8 bg-black/10 text-white/35",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="min-w-0 truncate text-sm font-medium">
                    {step.title}
                  </span>
                  <span className="shrink-0 rounded bg-white/10 px-2 py-1 font-mono text-xs text-white/55">
                    {2 + i}s
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-lg border border-white/15 bg-white p-5 text-sognos-heading shadow-2xl shadow-black/30"
          >
            <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-sognos-navy text-sm font-semibold text-white">
                S
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  Sognos operations
                </p>
                <p className="truncate text-xs text-gray-500">
                  {industryName.toLowerCase()} workflow
                </p>
              </div>
            </div>
            <div className="pt-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Active step {padIndex(active)}
              </p>
              <h3 className="mt-3 font-heading text-2xl font-medium leading-tight tracking-tight">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                {item.body}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-2">
                <span className="rounded bg-gray-100 px-3 py-2 text-xs text-gray-600">
                  Live records
                </span>
                <span className="rounded bg-gray-100 px-3 py-2 text-xs text-gray-600">
                  Audit trail
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function IndustryHowTabs({
  items,
  industryName,
  description,
}: {
  items: readonly HelpItem[];
  industryName: string;
  description: string;
}) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const item = items[active];

  useEffect(() => {
    if (reduceMotion || items.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [items.length, reduceMotion]);

  if (!item) return null;

  return (
    <div className="overflow-hidden rounded-lg bg-sognos-navy text-white">
      <div className="mx-auto max-w-4xl px-6 pt-12 pb-10 text-center lg:pt-14 lg:pb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
          How Sognos helps
        </p>
        <h2 className="mt-6 font-heading text-4xl font-normal leading-tight tracking-tight text-white text-balance lg:text-4xl">
          Purpose-built for {industryName}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
          {description}
        </p>
      </div>

      <div className="lg:grid lg:min-h-[620px] lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] lg:grid-rows-[auto_1fr]">
        <div
          role="tablist"
          aria-label="How Sognos helps"
          aria-orientation="vertical"
          className="hidden border-l border-white/25 lg:col-start-1 lg:row-start-1 lg:ml-12 lg:mt-14 lg:flex lg:flex-col"
        >
          {items.map((it, i) => {
            const isActive = i === active;
            return (
              <button
                key={`${it.title}-${i}`}
                id={`industry-how-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`industry-how-panel-${i}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                className={[
                  "-ml-px flex items-center gap-4 border-l-2 py-4 pl-8 pr-8 text-left transition-colors duration-300",
                  isActive
                    ? "border-sognos-blue-accent text-white"
                    : "border-transparent text-white/30 hover:text-white/70",
                ].join(" ")}
              >
                <span
                  className={[
                    "font-mono text-sm transition-colors duration-300",
                    isActive ? "text-sognos-blue-accent" : "text-white/35",
                  ].join(" ")}
                >
                  {padIndex(i)}
                </span>
                <span className="text-base font-medium leading-snug">
                  {it.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="lg:col-start-1 lg:row-start-2 lg:flex lg:items-end lg:p-12">
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              id={`industry-how-panel-${active}`}
              role="tabpanel"
              aria-labelledby={`industry-how-tab-${active}`}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
              transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
              className="hidden max-w-sm font-heading text-2xl font-normal leading-snug text-white/72 lg:block"
            >
              {item.body}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="hidden lg:col-start-2 lg:row-span-2 lg:block">
          <WorkflowMockup
            item={item}
            items={items}
            active={active}
            industryName={industryName}
          />
        </div>

        <div className="space-y-3 p-4 lg:hidden">
          {items.map((it, i) => {
            const isActive = i === active;
            return (
              <div
                key={`${it.title}-mobile-${i}`}
                className="overflow-hidden rounded border border-white/10"
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="flex w-full items-center gap-4 px-4 py-4 text-left"
                  aria-expanded={isActive}
                >
                  <span
                    className={[
                      "font-mono text-sm",
                      isActive ? "text-sognos-blue-accent" : "text-white/35",
                    ].join(" ")}
                  >
                    {padIndex(i)}
                  </span>
                  <span className="flex-1 text-base font-medium text-white/85">
                    {it.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className={[
                      "text-white/45 transition-transform duration-300",
                      isActive ? "rotate-45" : "rotate-0",
                    ].join(" ")}
                  >
                    +
                  </span>
                </button>
                {isActive && (
                  <div className="border-t border-white/10 px-4 py-5">
                    <p className="text-base leading-relaxed text-white/70">
                      {it.body}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
