"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

type ProblemItem = {
  number: string;
  problem: string;
  problemDetail: string;
  solution: string;
  iconPath: string;
};

type SectionHeader = {
  eyebrow?: string;
  heading: string;
  intro?: string;
};

interface SognoscareProblemsProps {
  header?: SectionHeader;
  problems?: readonly ProblemItem[];
}

const DEFAULT_HEADER: SectionHeader = {
  heading: "Care providers shouldn't operate like this",
  intro:
    "Fragmented systems, manual compliance, and disconnected data are the default for most care organisations. SognosCare fixes the root causes, not the symptoms.",
};

const DEFAULT_PROBLEMS: ProblemItem[] = [
  {
    number: "01",
    problem: "Referrals and records spread across disconnected tools",
    problemDetail:
      "Care plans, progress notes, incidents, and service agreements living in separate systems means staff spend more time finding information than delivering care.",
    solution:
      "One structured system for the full case lifecycle - intake, assessment, goal tracking, service agreements, progress notes, and reviews in a single workflow accessible to everyone who needs it.",
    iconPath:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    number: "02",
    problem: "Compliance is documented after the fact, not built in",
    problemDetail:
      "NDIS audits, Aged Care Quality Standards, and the new Support at Home model require evidence at every step. Most systems can't produce it without manual assembly.",
    solution:
      "Automated audit trails, funding rule enforcement, and compliance reporting built into every workflow - not bolted on retrospectively. Audit-ready by default.",
    iconPath:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    number: "03",
    problem: "Month-end reporting consumes staff time it shouldn't",
    problemDetail:
      "Funding-body reports shouldn't take two days and three people to assemble. That time belongs to the people you support, not to spreadsheets.",
    solution:
      "Real-time dashboards and automated reports across funding bodies, compliance frameworks, and operational metrics - generated, not assembled. Staff focus on care.",
    iconPath:
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    number: "04",
    problem: "Workforce and care management don't talk to each other",
    problemDetail:
      "When rostering runs in a separate system, visit records don't match care plans, coordinators reconcile discrepancies daily, and nothing is where it should be.",
    solution:
      "SognosCare and SognosRoster share the same data layer - visit records, care plans, and participant history stay in sync automatically, without manual reconciliation.",
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
];

const AUTOPLAY_MS = 6000;

export default function SognoscareProblems({
  header = DEFAULT_HEADER,
  problems = DEFAULT_PROBLEMS,
}: SognoscareProblemsProps = {}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const transitioning = useRef(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = problems.length;

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      if (!transitioning.current) {
        transitioning.current = true;
        setActive((a) => (a + 1) % total);
        setTimeout(() => {
          transitioning.current = false;
        }, 500);
      }
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, paused, total]);

  const handlePill = (i: number) => {
    if (i === active || transitioning.current) return;
    transitioning.current = true;
    setActive(i);
    setPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setPaused(false);
      transitioning.current = false;
    }, AUTOPLAY_MS);
  };

  return (
    <section id="problems" className="overflow-clip bg-background py-12 md:py-[120px]">
      <div className="mx-auto max-w-7xl px-4">
        {/* Centred header */}
        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-y-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-normal leading-tight tracking-tight text-sognos-text-heading text-balance">
            {header.heading}
          </h2>
          {header.intro && (
            <p className="text-lg text-sognos-text-body text-pretty">
              {header.intro}
            </p>
          )}
        </div>

        {/* Two-column layout */}
        <div className="mt-5 space-y-8 pt-10 md:flex md:gap-x-10 md:space-y-0 xl:gap-x-14">
          {/* Left column — title top, pill bottom (justified) */}
          <div className="max-w-[260px] shrink-0">
            <div className="flex flex-col justify-between gap-y-12 md:sticky md:top-8 md:min-h-[400px]">
              <h2 className="font-heading text-3xl font-normal leading-tight tracking-tight text-sognos-text-heading text-balance lg:text-4xl md:max-w-[215px]">
                What We Solve
              </h2>
              <div className="inline-flex h-9 items-center gap-x-2 self-start rounded-full bg-sognos-text-heading/5 px-4">
                {problems.map((_, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handlePill(i)}
                      aria-label={`Show problem ${i + 1} of ${total}`}
                      className={`relative h-1.5 cursor-pointer overflow-hidden rounded-full bg-sognos-text-heading/20 transition-[width] duration-300 ${
                        isActive ? "w-8" : "w-1.5"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          key={`fill-${active}`}
                          className="block h-full bg-sognos-text-heading"
                          initial={{ width: "0%" }}
                          animate={paused ? false : { width: "100%" }}
                          transition={{
                            duration: AUTOPLAY_MS / 1000,
                            ease: "linear",
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column — crossfading panels */}
          <div className="relative w-full max-w-[854px] min-h-[520px] flex-1 md:min-h-[400px]">
            {problems.map((item, i) => (
              <div
                key={item.number}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                aria-hidden={i !== active}
              >
                <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                  {/* Problem card */}
                  <div className="rounded-2xl p-6 md:p-8 lg:p-10">
                    <div className="space-y-4">
                      <h3 className="font-heading text-xl font-normal leading-tight tracking-tight text-sognos-text-heading text-balance lg:text-2xl">
                        {item.problem}
                      </h3>
                      <p className="text-base leading-relaxed text-sognos-text-body">
                        {item.problemDetail}
                      </p>
                    </div>
                  </div>
                  {/* Solution card (dark) */}
                  <div className="rounded-2xl bg-prussian-blue-900 p-6 text-white md:p-8 lg:p-10">
                    <div className="space-y-4">
                      <h3 className="font-heading text-xl font-normal leading-tight tracking-tight text-white lg:text-2xl">
                        The Solution
                      </h3>
                      <p className="font-heading text-base leading-relaxed text-white/80">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
