"use client";

import { useState } from "react";
import Image from "next/image";

type Capability = {
  title: string;
  body: string;
};

type Props = {
  solutionName: string;
  capabilities: Capability[];
};

const SECTION_BG = "#1d96fc";

// Cycled per capability index (images[i % 3]).
const CAPABILITY_IMAGES = [
  "/solutions/solutionTab-Image.avif",
  "/solutions/solutionTab-Image-2.avif",
  "/solutions/solutionTab-Image-3.avif",
];

// Pulled from Cohere's live healthcare-and-life-sciences accordion (computed styles).
const T_DURATION = "150ms";
const T_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

export default function SolutionUseCases({
  solutionName,
  capabilities,
}: Props) {
  const [active, setActive] = useState(0);
  if (capabilities.length === 0) return null;

  const activeImageIndex = active % CAPABILITY_IMAGES.length;

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: SECTION_BG }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.08em]"
            style={{ color: "#B7A9D9" }}
          >
            Capabilities
          </p>
          <h2
            className="font-heading text-3xl md:text-4xl font-medium tracking-[-0.02em]"
            style={{ color: "#FFFFFF" }}
          >
            What you get with {solutionName}
          </h2>
        </div>

        {/* 50/50 split, lg:gap-44 (176px) — matches Cohere. */}
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-44">
          <div>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gradient-to-br from-[#E9E2F7] via-[#EEE8F4] to-[#F2EAEF]">
              {CAPABILITY_IMAGES.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${solutionName} capability visual ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  style={{
                    opacity: activeImageIndex === i ? 1 : 0,
                    transition: `opacity ${T_DURATION} ${T_EASING}`,
                  }}
                  priority={i === 0}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-col">
              {capabilities.map((cap, i) => {
                const isActive = active === i;
                return (
                  <div
                    key={i}
                    className={`border-t border-white/100 border-l-2 ${
                      isActive
                    }`}
                  >
                    <button
                      onClick={() => setActive(i)}
                      className="w-full pt-2 pb-9 pl-6 pr-2 text-left text-2xl font-normal"
                      style={{ color: "#FFFFFF" }}
                    >
                      {cap.title}
                    </button>
                    {/* Height animation via grid-template-rows 0fr -> 1fr */}
                    <div
                      className="grid pl-6 pr-2"
                      style={{
                        gridTemplateRows: isActive ? "1fr" : "0fr",
                        transition: `grid-template-rows ${T_DURATION} ${T_EASING}`,
                      }}
                    >
                      <div className="overflow-hidden">
                        <p
                          className="pb-9 text-lg leading-snug"
                          style={{
                            color: "#FFFFFF",
                            opacity: isActive ? 1 : 0,
                            transition: `opacity ${T_DURATION} ${T_EASING}`,
                          }}
                        >
                          {cap.body}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
