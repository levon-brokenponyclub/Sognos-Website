"use client";

import { motion } from "framer-motion";

const HEADER = {
  heading: "Why operations teams choose SognosRoster",
  intro:
    "Built for the scheduling complexity of real-world service operations — not adapted from a generic workforce tool.",
};

const ADVANTAGES = [
  "Demand-driven rostering that matches workers to services automatically",
  "Skills, certifications, and compliance requirements checked at every allocation",
  "Real-time reoptimisation when disruptions hit — not after the fact",
  "Connects directly to SognosCare so care and workforce data share one layer",
  "Scales from small teams to enterprise-wide multi-site operations",
  "Mobile-first worker app with instant schedule updates and job details",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-white"
      aria-hidden="true"
    >
      <path d="M18 4 7 16l-5-5" />
    </svg>
  );
}

export default function SognoscareRosterAdvantages() {
  return (
    <section
      id="advantages"
      className="w-full bg-sognos-blue-accent text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left — label col */}
          <div className="lg:col-span-2 lg:sticky lg:top-[100px] lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/50">
              Advantages
            </p>
          </div>

          {/* Right — heading + checklist */}
          <div className="lg:col-[3/-1]">
            <div className="mb-10">
              <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
                {HEADER.heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white">
                {HEADER.intro}
              </p>
            </div>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
              className="divide-y divide-white/10 rounded-lg overflow-hidden"
            >
              {ADVANTAGES.map((advantage, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className={`flex items-start gap-4 px-6 py-5 ${
                    i % 2 === 0 ? "bg-white/10" : ""
                  }`}
                >
                  <CheckIcon />
                  <span className="text-base leading-relaxed text-white">
                    {advantage}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
