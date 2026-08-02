"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";

const SR_PILLARS = [
  {
    title: "Community Engagement",
    body: "We actively seek opportunities to support community development - through volunteering, resources, and expertise.",
    image: "/images/industries/local-government.webp",
  },
  {
    title: "Environmental Sustainability",
    body: "We minimise our environmental impact and continuously seek ways to operate more efficiently and responsibly.",
    image: "/images/industries/energy-utilities.webp",
  },
  {
    title: "Ethical Business Practices",
    body: "Integrity and transparency are cornerstones of how we operate - we believe in doing the right thing, always.",
    image: "/images/industries/industrial-services.webp",
  },
];

export default function SocialResponsibilitySection() {
  const [activeSR, setActiveSR] = useState(0);

  return (
    <section className="w-full bg-sognos-navy overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Content - Sticky */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <AnimatedEyebrow
              className="mb-6"
              textClassName="text-white"
            >
              Social Responsibility
            </AnimatedEyebrow>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-white text-center lg:text-left tracking-tight mb-6">
              Our commitment to <br /> community and planet.
            </h2>
            <p className="mb-10 font-normal leading-relaxed text-white/80 lg:text-lg">
              At Sognos, our impact extends far beyond the services we provide.
              Social responsibility is at the core of our values - we are
              committed to making a difference where we live, work, and do
              business.
            </p>

            <Link
              href="/company/social-responsibility"
              className="inline-flex items-center gap-3 text-sm font-bold text-sognos-blue-accent hover:opacity-70 transition-opacity group"
            >
              Read our full commitment
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sognos-blue-accent text-white">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7h8M7 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          </div>

          {/* Right Interactive Area */}
          <div className="lg:col-span-8">
            {/* Tabs Horizontal */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 hidden">
              {SR_PILLARS.map((p, idx) => (
                <button
                  key={p.title}
                  onClick={() => setActiveSR(idx)}
                  className={`group flex h-full flex-col justify-between rounded-lg border p-4 text-left transition-all duration-300 ${
                    activeSR === idx
                      ? "border-sognos-blue-accent bg-sognos-blue-accent/5"
                      : "border-sognos-line bg-white hover:border-sognos-line"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                        activeSR === idx
                          ? "bg-sognos-blue-accent text-white"
                          : "bg-gray-200/70 text-sognos-muted"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                        activeSR === idx
                          ? "text-sognos-blue-accent"
                          : "text-sognos-muted"
                      }`}
                    >
                      Pillar
                    </span>
                  </div>
                  <span
                    className={`text-sm font-semibold transition-colors ${
                      activeSR === idx
                        ? "text-sognos-heading"
                        : "text-sognos-muted group-hover:text-sognos-body"
                    }`}
                  >
                    {p.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Card - 2 Columns */}
            <div className="bg-white rounded-lg p-2 overflow-hidden relative group">
              <div className="flex flex-col lg:flex-row min-h-[460px]">
                {/* Left Column - Info Panel */}
                <div className="flex shrink-0 flex-col justify-between rounded-lg bg-gray-200/70 p-7 lg:w-[40%]">
                  <div className="flex flex-col">
                    <h2 className="mt-3 mb-6 font-heading text-2xl font-medium tracking-tight text-sognos-heading">
                      {SR_PILLARS[activeSR].title}
                    </h2>
                    <p className="text-base font-normal leading-relaxed text-sognos-body lg:text-lg">
                      {SR_PILLARS[activeSR].body}
                    </p>
                  </div>
                  <Link
                    href="/company/social-responsibility"
                    className="mt-5 inline-flex items-center gap-2.5 text-base font-semibold text-sognos-body transition-opacity hover:opacity-70"
                  >
                    Read more
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sognos-navy text-white shrink-0">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 7h8M7 3l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>

                {/* Right Column - Image */}
                <div className="flex-1 relative rounded-lg overflow-hidden lg:ml-4 lg:mt-0 mt-4">
                  <Image
                    src={SR_PILLARS[activeSR].image}
                    alt={SR_PILLARS[activeSR].title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
