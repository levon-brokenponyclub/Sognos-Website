"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SR_PILLARS = [
  {
    title: "Community Engagement",
    body: "We actively seek opportunities to support community development — through volunteering, resources, and expertise.",
    image: "/images/industries/local-government.webp",
  },
  {
    title: "Environmental Sustainability",
    body: "We minimise our environmental impact and continuously seek ways to operate more efficiently and responsibly.",
    image: "/images/industries/energy-utilities.webp",
  },
  {
    title: "Ethical Business Practices",
    body: "Integrity and transparency are cornerstones of how we operate — we believe in doing the right thing, always.",
    image: "/images/industries/industrial-services.webp",
  },
];

export default function SocialResponsibilitySection() {
  const [activeSR, setActiveSR] = useState(0);

  return (
    <section className="w-full border-b border-sognos-border-subtle bg-gray-100 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Content - Sticky */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <span className="inline-block px-3 py-1 rounded-full border border-gray-200 bg-white text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-6">
              Social Responsibility
            </span>
            <h2 className="text-3xl md:text-4xl text-prussian-blue-800 text-center lg:text-left font-heading font-medium tracking-tight mb-6">
              Our commitment to <br /> community and planet.
            </h2>
            <p className="font-heading font-normal leading-relaxed lg:text-lg mb-10">
              At Sognos, our impact extends far beyond the services we provide.
              Social responsibility is at the core of our values — we are
              committed to making a difference where we live, work, and do
              business.
            </p>

            <Link
              href="/company/social-responsibility"
              className="inline-flex items-center gap-3 text-sm font-bold text-[#1D96FC] hover:opacity-70 transition-opacity group"
            >
              Read our full commitment
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1D96FC] text-white">
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
                  className={`text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full group ${
                    activeSR === idx
                      ? "border-[#1D96FC] bg-[#F1F9FF] shadow-sm"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold transition-colors ${
                        activeSR === idx
                          ? "bg-[#1D96FC] text-white"
                          : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        activeSR === idx
                          ? "text-[#1D96FC]"
                          : "text-gray-400 group-hover:text-gray-500"
                      }`}
                    >
                      Pillar
                    </span>
                  </div>
                  <span
                    className={`font-semibold text-sm transition-colors ${
                      activeSR === idx
                        ? "text-prussian-blue-800"
                        : "text-gray-500 group-hover:text-gray-700"
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
                {/* Left Column — Info Panel */}
                <div className="shrink-0 lg:w-[40%] bg-gray-200 rounded-lg p-7 flex flex-col justify-between">
                  <div className="flex flex-col">
                    <h3 className="mt-3 mb-6 font-heading text-[26px] font-medium text-prussian-blue-800 tracking-tight">
                      {SR_PILLARS[activeSR].title}
                    </h3>
                    <p className="font-heading text-base font-normal leading-relaxed text-sognos-text-body lg:text-lg">
                      {SR_PILLARS[activeSR].body}
                    </p>
                  </div>
                  <Link
                    href="/company/social-responsibility"
                    className="mt-5 inline-flex items-center gap-2.5 text-sm font-medium text-prussian-blue-800 hover:opacity-70 transition-opacity"
                  >
                    Read more
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-prussian-blue-900 text-white shrink-0">
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

                {/* Right Column — Image */}
                <div className="flex-1 relative rounded-lg overflow-hidden lg:ml-4 lg:mt-0 mt-4">
                  <Image
                    src={SR_PILLARS[activeSR].image}
                    alt={SR_PILLARS[activeSR].title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
