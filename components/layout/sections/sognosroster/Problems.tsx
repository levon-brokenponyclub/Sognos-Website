"use client";

import { useState } from "react";

type ComparisonPoint = {
  number: string;
  title: string;
  description: string;
};

type ComparisonTab = {
  label: string;
  eyebrow: string;
  statement: string;
  detail: string;
  points: readonly ComparisonPoint[];
};

const WITHOUT_SOGNOS: ComparisonTab = {
  label: "Without Sognos",
  eyebrow: "The Problem",
  statement: "Workforce scheduling shouldn't work like this.",
  detail:
    "Manual rostering, compliance risks, real-time disruptions and disconnected data are still the default for most service operations.",
  points: [
    {
      number: "01",
      title: "Manual rostering",
      description:
        "Workforce managers spend weeks each month juggling spreadsheets, phone calls, availability and last-minute changes.",
    },
    {
      number: "02",
      title: "Compliance risk",
      description:
        "Skills, qualifications, certifications and client-specific requirements are checked manually at scale.",
    },
    {
      number: "03",
      title: "Disconnected workforce data",
      description:
        "Rostering runs separately from care management, forcing coordinators to reconcile visits, plans and records by hand.",
    },
  ],
};

const WITH_SOGNOS: ComparisonTab = {
  label: "With Sognos",
  eyebrow: "The Solution",
  statement:
    "SognosRoster connects workforce scheduling to real service demand.",
  detail:
    "Services are matched to workers using skills, availability, location and compliance status, with SognosCare and SognosRoster sharing the same operational data layer.",
  points: [
    {
      number: "01",
      title: "Demand-driven rosters",
      description:
        "Confirmed service requests automatically generate roster options based on worker availability, location and service requirements.",
    },
    {
      number: "02",
      title: "Validated worker matching",
      description:
        "Every allocation is checked against qualifications, certifications, compliance rules and client preferences before confirmation.",
    },
    {
      number: "03",
      title: "Real-time reoptimisation",
      description:
        "Sick leave, cancellations and service changes are handled in minutes, with affected workers notified automatically.",
    },
  ],
};

export default function SognoscareRosterProblems() {
  const [activeTab, setActiveTab] = useState<"without" | "with">("without");

  const activeContent = activeTab === "without" ? WITHOUT_SOGNOS : WITH_SOGNOS;

  return (
    <section id="problems" className="overflow-clip bg-sognos-roster-dark pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60">
            {activeContent.eyebrow}
          </p>

          <h2 className="mt-4 font-heading text-4xl font-medium tracking-tight text-white text-balance md:text-5xl">
            {activeContent.statement}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 text-pretty">
            {activeContent.detail}
          </p>

          <div className="mt-10 inline-flex rounded-full border border-white/20 bg-white/10 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("without")}
              className={[
                "rounded-full px-5 py-2 text-sm font-medium transition",
                activeTab === "without"
                  ? "bg-white text-sognos-heading"
                  : "text-white/50 hover:text-white",
              ].join(" ")}
            >
              {WITHOUT_SOGNOS.label}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("with")}
              className={[
                "rounded-full px-5 py-2 text-sm font-medium transition",
                activeTab === "with"
                  ? "bg-sognos-blue-accent text-white"
                  : "text-white/50 hover:text-white",
              ].join(" ")}
            >
              {WITH_SOGNOS.label}
            </button>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 border-t border-white/10 md:grid-cols-3 md:divide-x md:divide-white/10">
          {activeContent.points.map((point) => (
            <div
              key={`${activeTab}-${point.number}`}
              className="relative flex flex-col px-6 py-8 pb-12"
            >
              <span className="font-mono text-xs text-white/40">
                {point.number}
              </span>

              <h3 className="mt-4 font-heading text-xl font-medium text-white">
                {point.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                {point.description}
              </p>

              <div
                aria-hidden="true"
                className="absolute bottom-0 left-6 right-6 h-[2px] bg-sognos-roster-base"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
