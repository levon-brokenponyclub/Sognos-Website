"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  Buildings,
  Scales,
  HardHat,
  Lightning,
} from "@phosphor-icons/react";
import { INDUSTRIES } from "@/lib/constants";

const INDUSTRIAL_VIDEO =
  "https://www.shutterstock.com/shutterstock/videos/3849131045/preview/stock-footage-industrial-engineer-wearing-protective-safety-equipment-gesturing-and-instructing-near-machinery.webm";

type IndustrySlug = (typeof INDUSTRIES)[number]["slug"];

const ICONS: Record<
  IndustrySlug,
  React.ComponentType<{ size?: number; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }>
> = {
  "health-social-care": Heart,
  "facilities-management": Buildings,
  "local-government": Scales,
  "industrial-services": HardHat,
  "energy-utilities": Lightning,
};

// ─── Section ──────────────────────────────────────────────────────────────────

export default function IndustrySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = INDUSTRIES[activeIndex];
  const isIndustrial = active.slug === "industrial-services";
  const Icon = ICONS[active.slug];

  return (
    <section className="w-full bg-[#1D96FC] border-b border-sognos-border-subtle overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 py-24">

        {/* Section heading — unchanged */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end justify-items-between pb-10">
          <h2 className="text-2xl md:text-4xl text-white font-heading font-medium tracking-tight">
            Industries
            <br />
            Built for service-intensive operations
          </h2>
          <p className="font-heading font-medium leading-tigher section-header-description text-white justify-self-end">
            Sognos connects service demand, workforce scheduling, and compliance
            into a single operational loop. Powered by AI, Microsoft Dynamics
            365.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {INDUSTRIES.map((ind, i) => {
            const TabIcon = ICONS[ind.slug];
            const isActive = i === activeIndex;
            return (
              <button
                key={ind.slug}
                onClick={() => setActiveIndex(i)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "border border-white/60 bg-white/10 text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <TabIcon size={16} weight="regular" />
                {ind.name}
              </button>
            );
          })}
        </div>

        {/* Panel — single large card */}
        <div className="bg-white rounded-2xl overflow-hidden flex flex-col lg:flex-row min-h-[480px]">
          {/* Left column — image or video */}
          <div className="relative w-full lg:w-[48%] min-h-[300px] lg:min-h-0">
            {isIndustrial ? (
              <video
                src={INDUSTRIAL_VIDEO}
                autoPlay
                muted
                playsInline
                loop
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <Image
                src={active.image}
                alt={active.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            )}
          </div>

          {/* Right column — content */}
          <div className="flex flex-col justify-between p-10 lg:p-12 w-full lg:w-[52%]">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-medium text-prussian-blue-800 leading-tight tracking-tight">
                {active.name}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-500 max-w-md">
                {active.description}
              </p>
            </div>

            {/* Bullet features */}
            <ul className="mt-10 space-y-3">
              {active.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-prussian-blue-800" />
                  <span className="text-sm leading-relaxed text-neutral-600">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
