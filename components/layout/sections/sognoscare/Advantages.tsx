"use client";

import { motion } from "framer-motion";

type SectionHeader = {
  eyebrow?: string;
  heading: string;
  intro?: string;
};

interface SognoscareAdvantagesProps {
  header?: SectionHeader;
  advantages?: readonly string[];
}

const DEFAULT_HEADER: SectionHeader = {
  heading: "Why care providers choose SognosCare",
  intro:
    "Built for the regulatory reality of Australian care — not adapted from a generic CRM.",
};

const DEFAULT_ADVANTAGES = [
  "Purpose-built for Australian care compliance - not adapted from generic CRM",
  "Reduces documentation time with AI-assisted clinical notes",
  "Keeps you audit-ready with continuous compliance tracking",
  "Integrates with Microsoft 365, Teams, and Dynamics 365 out of the box",
  "Connects care management, workforce rostering, and billing in one system",
  "Scales from community care to residential aged care without re-implementation",
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
      className="shrink-0 text-sognos-blue-accent"
      aria-hidden="true"
    >
      <path d="M18 4 7 16l-5-5" />
    </svg>
  );
}

export default function SognoscareAdvantages({
  header = DEFAULT_HEADER,
  advantages = DEFAULT_ADVANTAGES,
}: SognoscareAdvantagesProps = {}) {
  const items = advantages.length > 0 ? advantages : DEFAULT_ADVANTAGES;

  return (
    <section id="advantages" className="w-full bg-sognos-care-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left — label col */}
          <div className="lg:col-span-2 lg:sticky lg:top-[100px] lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/50">
              {header.eyebrow ?? "Advantages"}
            </p>
          </div>

          {/* Right — heading + checklist */}
          <div className="lg:col-[3/-1]">
            <div className="mb-10 max-w-[600px]">
              <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
                {header.heading}
              </h2>
              {header.intro && (
                <p className="mt-4 text-base leading-relaxed text-white">
                  {header.intro}
                </p>
              )}
            </div>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
              className="overflow-hidden"
            >
              {items.map((advantage, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className={`flex items-center gap-4 px-6 py-5 ${
                    i % 2 === 0 ? "bg-white/5" : ""
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
