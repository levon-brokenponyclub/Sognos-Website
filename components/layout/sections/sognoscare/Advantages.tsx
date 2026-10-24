"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { LAYOUT, TYPE } from "./typeScale";

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

export default function SognoscareAdvantages({
  header = DEFAULT_HEADER,
  advantages = DEFAULT_ADVANTAGES,
}: SognoscareAdvantagesProps = {}) {
  const items = advantages.length > 0 ? advantages : DEFAULT_ADVANTAGES;

  return (
    <section
      id="advantages"
      className={`w-full bg-sognos-care-dark text-white ${LAYOUT.section} ${LAYOUT.anchor}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className={LAYOUT.rail}>
          <div className={LAYOUT.railLabel}>
            <SectionLabel tone="dark" sticky>
              {header.eyebrow ?? "Advantages"}
            </SectionLabel>
          </div>

          <div className={LAYOUT.content}>
            <div className={LAYOUT.head}>
              <h2 className={`${TYPE.h2} text-white`}>{header.heading}</h2>
              {header.intro && (
                <p className={`${TYPE.lede} text-white/75`}>{header.intro}</p>
              )}
            </div>

            {/* Hairline rows in two columns from md (FAQ-row discipline), not
                striped panels. Last row of each column drops its rule. */}
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
              className={`${LAYOUT.gap} grid grid-cols-1 border-t border-white/20 md:grid-cols-2 md:gap-x-8 lg:gap-x-16`}
            >
              {items.map((advantage, i) => (
                <motion.li
                  key={advantage}
                  variants={itemVariants}
                  className="flex items-baseline gap-4 border-b border-white/20 py-5 last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className={`${TYPE.small} tabular-nums text-sognos-blue-accent`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`${TYPE.body} text-white`}>
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
