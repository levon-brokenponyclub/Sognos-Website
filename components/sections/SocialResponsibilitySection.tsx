"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SR_PILLARS = [
  {
    title: "Community Engagement",
    body: "We actively seek opportunities to support community development — through volunteering, resources, and expertise.",
    image: "/images/industries/local-government.webp"
  },
  {
    title: "Environmental Sustainability",
    body: "We minimise our environmental impact and continuously seek ways to operate more efficiently and responsibly.",
    image: "/images/industries/energy-utilities.webp"
  },
  {
    title: "Ethical Business Practices",
    body: "Integrity and transparency are cornerstones of how we operate — we believe in doing the right thing, always.",
    image: "/images/industries/industrial-services.webp"
  },
];

export default function SocialResponsibilitySection() {
  const [activeSR, setActiveSR] = useState(0);

  return (
    <section className="w-full border-b border-sognos-border-subtle bg-white overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Content - Sticky */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="inline-block px-3 py-1 rounded-full border border-gray-200 bg-white text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-6">
              Social Responsibility
            </span>
            <h2 className="font-heading text-4xl lg:text-5xl font-semibold text-prussian-blue-800 tracking-tight leading-tight mb-8">
              Our commitment to <br /> community and planet.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              At Sognos, our impact extends far beyond the services we provide. Social responsibility is at the core of our values — we are committed to making a difference where we live, work, and do business.
            </p>
            
            <Link
              href="/company/social-responsibility"
              className="inline-flex items-center gap-3 text-sm font-bold text-[#1D96FC] hover:opacity-70 transition-opacity group"
            >
              Read our full commitment
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1D96FC] text-white">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Right Interactive Area */}
          <div className="lg:col-span-7">
            {/* Active Card */}
            <div className="bg-white rounded-3xl p-2 border border-gray-100 shadow-2xl shadow-gray-200/50 mb-10 overflow-hidden relative group">
              <div className="flex flex-col min-h-[460px]">
                {/* Image Part */}
                <div className="relative h-[280px] w-full rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={SR_PILLARS[activeSR].image}
                    alt={SR_PILLARS[activeSR].title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                
                {/* Text Part */}
                <div className="px-6 pb-8">
                  <h3 className="font-heading text-2xl font-bold text-prussian-blue-800 mb-4 transition-all">
                    {SR_PILLARS[activeSR].title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {SR_PILLARS[activeSR].body}
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs Horizontal */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SR_PILLARS.map((p, idx) => (
                <button
                  key={p.title}
                  onClick={() => setActiveSR(idx)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full group ${
                    activeSR === idx 
                    ? 'border-[#1D96FC] bg-[#F1F9FF] shadow-sm' 
                    : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold transition-colors ${
                      activeSR === idx ? 'bg-[#1D96FC] text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      activeSR === idx ? 'text-[#1D96FC]' : 'text-gray-400 group-hover:text-gray-500'
                    }`}>
                      Pillar
                    </span>
                  </div>
                  <span className={`font-semibold text-sm transition-colors ${
                    activeSR === idx ? 'text-prussian-blue-800' : 'text-gray-500 group-hover:text-gray-700'
                  }`}>
                    {p.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
