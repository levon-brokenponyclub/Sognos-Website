"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ScanSearch,
  Users,
  Heart,
  Lock,
  Headphones,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";

const solutions = [
  {
    key: "risk",
    icon: ShieldAlert,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    title: "Risk Management",
    short: "Move from fragmented registers to visible, accountable action",
    detail:
      "Bring assessments, actions, evidence, approvals, reminders and reporting into one configurable workflow. The solution can help organisations apply more consistent assessment processes, assign ownership clearly, retain supporting evidence, identify overdue reviews and improve visibility across services, sites and teams.",
    cta: "Discuss your risk-management workflow",
  },
  {
    key: "safety",
    icon: ScanSearch,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "Safety Lens",
    short: "A clearer starting point for environmental risk assessment",
    detail:
      "Safety Lens uses an app-integrated Copilot to analyse photographs of rooms or service environments and prepare a structured draft environmental risk assessment. It may be relevant to hospital-in-the-home, residential aged care, Supported Independent Living, mental health, disability and community service environments. It supports trained staff and does not replace professional judgement, consent, privacy controls or accountable approval.",
    cta: "Request a Safety Lens demonstration",
  },
  {
    key: "hr",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "People & HR Management",
    short: "Give employees one clearer way to access routine people services",
    detail:
      "Selected DigPacks people and HR workflows can support personal information changes, leave and flexible-working requests, onboarding processes, structured approvals, audit history and guided employee self-service. Sognos is assessing which capabilities can be localised without dependence on NHS-specific systems and how they can complement established HR, payroll and workforce platforms.",
    cta: "Explore opportunities for HR self-service",
  },
  {
    key: "vaccination",
    icon: Heart,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    title: "Vaccination Hub",
    short: "Bring bookings, records and reporting into one workflow",
    detail:
      "Vaccination Hub supports clinic and appointment management, employee self-service booking, real-time availability, recording of vaccinations received externally, secure records and program reporting. Any local implementation would need to reflect Australian or New Zealand immunisation, privacy, record-keeping and reporting requirements.",
    cta: "Discuss your vaccination program",
  },
  {
    key: "pia",
    icon: Lock,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    title: "Privacy Impact Assessment",
    short: "Make privacy by design a visible, auditable process",
    detail:
      "Sognos and DigPacks are adapting the UK privacy-assessment capability into a Privacy Impact Assessment workflow for Australia and New Zealand. It can support structured assessment questions, clear review stages, privacy-risk and mitigation records, approvals, reminders, audit history and an AI agent that guides users through the process. Responsibility for privacy decisions remains with authorised people.",
    cta: "Discuss a locally configured PIA workflow",
  },
  {
    key: "itsm",
    icon: Headphones,
    iconBg: "bg-[#1D96FC]/10",
    iconColor: "text-[#1D96FC]",
    title: "IT Service Management",
    short: "Reduce repeated support work without reducing access to support",
    detail:
      "The IT Service Management capability and FixIT Agent can provide one place to raise and track requests, clearer categorisation and ownership, access to approved support information, guided self-service, AI-assisted responses and escalation when human support is required. The objective is to reduce simple repeatable work so IT teams can focus on complex support, cybersecurity and service continuity.",
    cta: "Review your IT support workflow",
  },
];

export default function SolutionsGrid() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
      {solutions.map(({ key, icon: Icon, iconBg, iconColor, title, short, detail, cta }) => {
        const isOpen = expanded === key;
        return (
          <div
            key={key}
            className="rounded-lg bg-gray-200/70 p-6 flex flex-col"
          >
            <div
              className={`w-11 h-11 rounded-lg ${iconBg} flex items-center justify-center shrink-0 mb-4`}
            >
              <Icon size={22} className={iconColor} aria-hidden />
            </div>
            <h3 className="font-heading text-base font-medium text-prussian-blue-800 tracking-tight leading-snug">
              {title}
            </h3>
            <p className="mt-2 text-sm text-sognos-text-body leading-relaxed">
              {short}
            </p>

            {isOpen && (
              <div className="mt-4 space-y-4">
                <p className="text-sm text-sognos-text-body leading-relaxed">
                  {detail}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D96FC] hover:opacity-70 transition-opacity"
                >
                  {cta}
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            )}

            <button
              onClick={() => setExpanded(isOpen ? null : key)}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-prussian-blue-800 hover:text-[#1D96FC] transition-colors self-start"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <>
                  Show less <ChevronUp size={14} aria-hidden />
                </>
              ) : (
                <>
                  Learn more <ChevronDown size={14} aria-hidden />
                </>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
