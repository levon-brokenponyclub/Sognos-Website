"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { LAYOUT, TYPE } from "./typeScale";

type Capability = {
  number: string;
  title: string;
  description: string;
};

interface SognoscareProblemsProps {
  problemLabel?: string;
  problemStatement?: string;
  problemDetail?: string;
  solutionLabel?: string;
  solutionStatement?: string;
  solutionDetail?: string;
  capabilities?: readonly Capability[];
}

const DEFAULT_CAPABILITIES: readonly Capability[] = [
  {
    number: "01",
    title: "Unified Care Records",
    description:
      "Referrals, assessments, care plans, incidents, service agreements and progress notes in one system.",
  },
  {
    number: "02",
    title: "Built-In Compliance",
    description:
      "Audit trails, funding controls and evidence captured automatically as work happens.",
  },
  {
    number: "03",
    title: "Connected Workforce",
    description:
      "SognosCare and SognosRoster share the same data layer across visits, plans and participant history.",
  },
  {
    number: "04",
    title: "Real-Time Reporting",
    description:
      "Operational, workforce, compliance and funding reports generated continuously, not manually assembled.",
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function SognoscareProblems({
  problemLabel = "The Problem",
  problemStatement = "Care providers shouldn't operate like this.",
  problemDetail = "Fragmented systems, manual compliance, disconnected workforce data, and spreadsheet-driven reporting have become accepted as normal. Every disconnected workflow creates more administration, more risk, and less time for delivering care.",
  solutionLabel = "The Solution",
  solutionStatement = "Sognos unifies demand, workforce and outcomes on a single operational platform.",
  solutionDetail = "Built on Microsoft Dynamics 365 and Copilot, Sognos connects intake, care planning, workforce coordination, compliance and reporting into one continuous workflow.",
  capabilities = DEFAULT_CAPABILITIES,
}: SognoscareProblemsProps = {}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="problems" className={`overflow-clip ${LAYOUT.anchor}`}>
      {/* Dark half — centred statement band. Navy, a tonal step off the
          care-dark hero above it. */}
      <div className={`bg-sognos-navy ${LAYOUT.section}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto flex max-w-[770px] flex-col items-center gap-4 text-center">
            <SectionLabel tone="dark">{problemLabel}</SectionLabel>
            <h2 className={`${TYPE.h2} text-white`}>{problemStatement}</h2>
            <p className={`${TYPE.lede} text-white/75`}>{problemDetail}</p>
          </div>
        </div>
      </div>

      {/* Tint half (white Features follows) — solution on the rail, then the capabilities as numbered
          hairline columns (after angellist.com scout-funds "How it works"). */}
      <div className={`bg-sognos-tint ${LAYOUT.section}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className={LAYOUT.rail}>
            <div className={LAYOUT.railLabel}>
              <SectionLabel sticky>{solutionLabel}</SectionLabel>
            </div>

            <div className={LAYOUT.content}>
              <div className={LAYOUT.head}>
                <h2 className={`${TYPE.h2} text-sognos-heading`}>
                  {solutionStatement}
                </h2>
                <p className={`${TYPE.lede} text-sognos-body`}>
                  {solutionDetail}
                </p>
              </div>

              <ol
                className={`${LAYOUT.gap} grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4`}
              >
                {capabilities.map((cap, i) => (
                  <motion.li
                    key={cap.number}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 16 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.55,
                      ease: EASE_OUT,
                      delay: prefersReducedMotion ? 0 : i * 0.08,
                    }}
                    className="flex flex-col gap-1 border-l border-sognos-line px-4 md:pl-8"
                  >
                    {/* "01" → "1": large single digits, as the benchmark. */}
                    <span
                      aria-hidden="true"
                      className={`block ${TYPE.numeral} text-sognos-blue-accent`}
                    >
                      {Number(cap.number)}
                    </span>
                    <h3 className={`mt-1 ${TYPE.h3Step} text-sognos-heading`}>
                      {cap.title}
                    </h3>
                    <p className={`${TYPE.small} text-sognos-body`}>
                      {cap.description}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
