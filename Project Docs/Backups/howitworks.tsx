"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import LottiePlayer from "@/components/ui/LottiePlayer";

// ─── Constants ────────────────────────────────────────────────────────────────

const TAB_HEIGHT = 160;
const VISIBLE = 3;
const EASE_STANDARD: [number, number, number, number] = [0.4, 0, 0.2, 1];

// ─── Tab data ─────────────────────────────────────────────────────────────────

const tabs = [
  {
    id: 0,
    num: "01",
    title: "Capture service demand",
    description:
      "Service requests, referrals, and assessments are captured directly into SognosCare — creating a structured record for every service that needs to be delivered.",
    image: "/images/Invoice-Capture-Accordion.svg",
    bgClass: "bg-[#C7DBFF]",
  },
  {
    id: 1,
    num: "02",
    title: "Coordinate services",
    description:
      "SognosCare orchestrates the full service lifecycle — assigning cases, triggering workflows, and ensuring every service requirement is tracked from intake to delivery.",
    image: "/images/PO-matching-screen-01.svg",
    bgClass: "bg-[#DAE5CE]",
  },
  {
    id: 2,
    num: "03",
    title: "Schedule workforce",
    description:
      "SognosRoster automatically matches available, qualified staff to each service — factoring in location, skills, compliance requirements, and real-time availability.",
    image: "/images/Next-Vendor-Management.svg",
    bgClass: "bg-[#B5E4F3]",
  },
  {
    id: 3,
    num: "04",
    title: "Deliver in the field",
    description:
      "Field staff access their schedule and service details in real time. Every visit, task, and interaction is recorded — creating a live picture of delivery.",
    image: "/images/ani-image-01.png",
    bgClass: "bg-[#DAE5CE]",
  },
  {
    id: 4,
    num: "05",
    title: "Record outcomes",
    description:
      "Outcomes, notes, and compliance checkpoints are captured at the point of delivery — feeding directly into your reporting, audit trails, and funding claims.",
    image: "/images/payment-options-1.svg",
    bgClass: "bg-[#00afbd]",
  },
  {
    id: 5,
    num: "06",
    title: "Optimise with AI",
    description:
      "AI-powered insights surface patterns across your operations — highlighting inefficiencies, compliance gaps, and workforce utilisation opportunities so you can act before they become problems.",
    image: "/images/Send-checks.svg", // Using Send-checks.svg here
    bgClass: "bg-gradient-brand",
  },
];

// ─── Right panel variants — directional slide ─────────────────────────────────

const panelVariants: Variants = {
  enter: (dir: number) => ({
    y: dir > 0 ? "100%" : "-100%",
    zIndex: 10,
  }),
  center: {
    y: 0,
    zIndex: 10,
    transition: { duration: 0.55, ease: EASE_STANDARD },
  },
  exit: () => ({
    y: 0,
    zIndex: 0,
    transition: { duration: 0.55, ease: EASE_STANDARD },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowSognosWorksPreview() {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const handleTabClick = (idx: number) => {
    setDirection(idx > activeTab ? 1 : -1);
    setActiveTab(idx);
  };

  const windowHeight = TAB_HEIGHT * VISIBLE;
  const visibleStart = Math.min(activeTab, tabs.length - 3);
  const targetY = -visibleStart * TAB_HEIGHT;
  const slideTransition = { duration: 0.55, ease: EASE_STANDARD };

  return (
    <section
      aria-label="How Sognos works — system overview"
      className="border border-sognos-border-subtle"
    >
      {/* Heading row */}
      <div className="border-b border-sognos-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-dashed border-sognos-border-subtle px-5 pt-24 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end justify-items-between">
            <h2 className="text-2xl md:text-4xl text-brand font-heading font-medium tracking-tight">
              One platform.
              <br />
              Every part of your operation.
            </h2>
            <p className="font-heading font-medium leading-tigher section-header-description justify-self-end">
              Sognos connects service demand, workforce scheduling, and
              compliance into a single operational loop. Powered by AI,
              Microsoft Dynamics 365.
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl border-x border-dashed border-sognos-border-accent">
        <motion.div
          layoutRoot
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-start"
        >
          {/* Left — 3-tab content window */}
          <div
            className="relative flex flex-col border-l-[3px] border-transparent border-x-0 overflow-hidden"
            style={{ height: windowHeight }}
          >
            <motion.div
              className="absolute inset-x-0 top-0 side-stack"
              animate={{ y: targetY }}
              transition={slideTransition}
              style={{ willChange: "transform" }}
            >
              {tabs.map((tab) => {
                const isActive = tab.id === activeTab;

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    style={{ height: TAB_HEIGHT }}
                    className={[
                      "relative w-full text-left px-6",
                      "flex flex-col justify-center",
                      isActive
                        ? "bg-sognos-bg-sunken card"
                        : "bg-transparent hover:bg-sognos-bg-elevated",
                    ].join(" ")}
                  >
                    {/* Progress bar — remounts on each new active tab */}
                    {isActive && (
                      <motion.div
                        key={activeTab}
                        className="absolute -left-[5px] top-0 w-[7px] z-999 bg-[var(--sognos-border-strong)]"
                        style={{
                          height: "100%",
                          transformOrigin: "top",
                          willChange: "transform",
                        }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.38, ease: EASE_STANDARD }}
                      />
                    )}

                    {/* <span
                      className="block text-xs font-mono mb-1"
                      style={{ opacity: isActive ? 1 : 0.4 }}
                    >
                      {tab.num}
                    </span> */}

                    <h5
                      className="block font-heading text-[22px]"
                      style={{
                        opacity: isActive ? 1 : 0.4,
                        color: isActive
                          ? "var(--sognos-text-heading)"
                          : "var(--sognos-text-muted)",
                      }}
                    >
                      {tab.title}
                    </h5>

                    {/* Description unmasking from bottom to top */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.38, ease: EASE_STANDARD }}
                          style={{ overflow: "hidden", willChange: "height" }}
                        >
                          <div className="pt-2 flex flex-col justify-end min-h-full">
                            <span className="block desc font-heading text-sm text-slate-600 leading-tigher">
                              {tab.description}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* Right — directional slide panel, sticky to match left height */}
          <div
            className={`relative overflow-hidden transition-colors duration-500 ${tabs[activeTab].bgClass}`}
            style={{ height: windowHeight, position: "sticky", top: 0 }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeTab}
                custom={direction}
                variants={panelVariants}
                initial="enter"
                animate="center"
                exit="exit"
                data-panel={activeTab}
                className="absolute inset-0 w-full h-full flex items-center justify-center p-0"
                style={{ willChange: "transform" }}
              >
                <img
                  src={tabs[activeTab].image}
                  alt={tabs[activeTab].title}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
