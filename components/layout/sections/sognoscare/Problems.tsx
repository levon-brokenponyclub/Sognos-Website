"use client";

import type { ReactNode } from "react";

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
  subNav?: ReactNode;
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
  {
    number: "05",
    title: "Copilot-Powered Workflows",
    description:
      "AI-assisted documentation, anomaly detection and operational insights surfaced inside Dynamics 365.",
  },
];

export default function SognoscareProblems({
  problemLabel = "The Problem",
  problemStatement = "Care providers shouldn't operate like this.",
  problemDetail = "Fragmented systems, manual compliance, disconnected workforce data, and spreadsheet-driven reporting have become accepted as normal. Every disconnected workflow creates more administration, more risk, and less time for delivering care.",
  solutionLabel = "The Solution",
  solutionStatement = "Sognos unifies demand, workforce and outcomes on a single operational platform.",
  solutionDetail = "Built on Microsoft Dynamics 365 and Copilot, Sognos connects intake, care planning, workforce coordination, compliance and reporting into one continuous workflow.",
  capabilities = DEFAULT_CAPABILITIES,
  subNav,
}: SognoscareProblemsProps = {}) {
  return (
    <section id="problems" className="overflow-clip">
      {/* Dark half — Problem block + subNav */}
      <div className="bg-sognos-care-dark pt-20 md:pt-28 pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-4">
          {/* Problem block */}
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-normal uppercase tracking-[0.08em] text-sognos-blue-accent">
              {problemLabel}
            </p>
            <h2 className="mt-4 font-heading text-3xl md:text-3xl font-normal tracking-tight leading-10 text-white/70 text-balance">
              <span className="text-white">{problemStatement}</span>{" "}
            </h2>
            <p className="mt-6 max-w-5xl text-lg leading-relaxed text-white/60 text-pretty">
              {problemDetail}
            </p>
          </div>

          {/* subNav — centred, sits at bottom of dark half */}
          {subNav && (
            <div className="mt-24 flex justify-center md:mt-32">{subNav}</div>
          )}
        </div>
      </div>

      {/* Light half — Solution block on white */}
      <div className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Left — rail (Advantages pattern, light theme) */}
            <div className="lg:col-span-2 lg:sticky lg:top-[100px] lg:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sognos-muted">
                {solutionLabel}
              </p>
            </div>

            {/* Right — statement + detail + 5 blocks */}
            <div className="lg:col-[3/-1]">
              <div className="max-w-[720px]">
                <h2 className="font-heading text-3xl md:text-4xl font-medium tracking-tight text-sognos-body text-balance">
                  {solutionStatement}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600 text-pretty">
                  {solutionDetail}
                </p>
              </div>

              <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-sognos-line lg:divide-x lg:divide-sognos-line">
                {capabilities.map((cap) => (
                  <div
                    key={cap.number}
                    className="relative flex flex-col px-5 py-6 pb-10"
                  >
                    <span className="font-mono text-xs text-sognos-muted">
                      {cap.number}
                    </span>
                    <h3 className="mt-3 font-heading text-base md:text-lg font-medium text-sognos-body">
                      {cap.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                      {cap.description}
                    </p>
                    <div
                      aria-hidden="true"
                      className="absolute bottom-0 left-5 right-5 h-[2px] bg-sognos-blue-accent"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
