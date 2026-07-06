"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type HelpItem = { title: string; body: string };

// User-driven tabbed view for "How Sognos helps". Active tab carries a
// spring-animated underline (layoutId, matching the codebase's marker pattern);
// the content pane crossfades on change. No autoplay.
export default function IndustryHowTabs({ items }: { items: readonly HelpItem[] }) {
  const [active, setActive] = useState(0);
  const item = items[active];
  if (!item) return null;

  return (
    <div>
      {/* Tab bar — horizontal scroll (mobile + long label overflow) */}
      <div
        role="tablist"
        aria-label="How Sognos helps"
        className="scrollbar-hide -mx-6 flex gap-6 overflow-x-auto border-b border-sognos-line px-6 md:mx-0 md:px-0"
      >
        {items.map((it, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className="group relative shrink-0 whitespace-nowrap py-4 text-left"
            >
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-sognos-blue-accent"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              >
                {it.title}
              </span>
              {isActive && (
                <motion.span
                  layoutId="how-tab-underline"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-sognos-blue-accent"
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content pane — crossfades on tab change */}
      <div className="mt-8 lg:mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid items-stretch gap-3 lg:grid-cols-2 lg:gap-4"
          >
            {/* Text card */}
            <div className="rounded-lg bg-white p-8 lg:p-10">
              <h3 className="font-heading text-2xl font-medium tracking-tight text-sognos-heading lg:text-3xl">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-sognos-body">
                {item.body}
              </p>
            </div>
            {/* Visual placeholder — intentionally empty (see report); no filler */}
            <div
              aria-hidden="true"
              className="min-h-[220px] rounded-lg border border-sognos-line bg-white"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
