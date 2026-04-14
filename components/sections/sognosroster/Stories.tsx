"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { cn } from "@/lib/utils";

type Story = {
  company: string;
  companySize: string;
  industry: string;
  logo: string;
  quote: string;
  author: string;
  role: string;
  href: string;
  panelClass: string;
  quoteClass: string;
  authorClass: string;
  roleClass: string;
  quoteIconColor: string;
  contentBorderClass: string;
  buttonBorderClass: string;
  buttonTextClass: string;
  buttonHoverClass: string;
  buttonIconBgClass: string;
};

const STORIES: Story[] = [
  {
    company: "Auckland Airport",
    companySize: "350+",
    industry: "Transport & Logistics",
    logo: "/logos/auckland-airport-logo.png",
    quote:
      "Thank you to the Sognos team. Hoping to see you and thank you in person for such a successful implementation. Looking forward to a continued successful partnership with Sognos as our Field Service support partners!",
    author: "Anthony Hart",
    role: "Operations Delivery Lead, Auckland Airport",
    href: "/customers/auckland-airport",
    panelClass: "bg-cornflower-ocean-500/30",
    quoteClass: "text-cornflower-ocean-800",
    authorClass: "text-cornflower-ocean-800",
    roleClass: "text-cornflower-ocean-800/85",
    quoteIconColor: "text-cornflower-ocean-800/60",
    contentBorderClass: "border-cornflower-ocean-800/35",
    buttonBorderClass: "border-cornflower-ocean-800",
    buttonTextClass: "text-cornflower-ocean-800",
    buttonHoverClass: "hover:bg-cornflower-ocean-800/8",
    buttonIconBgClass: "bg-cornflower-ocean-800",
  },
  {
    company: "Summit FM Solutions",
    companySize: "220+",
    industry: "Facilities Management",
    logo: "/logos/auckland-airport-logo.png",
    quote:
      "From request to worker allocation used to take two to three days of back-and-forth. Now it's measured in minutes. SognosRoster paid for itself in the first quarter just on scheduling efficiency alone.",
    author: "James Holt",
    role: "Operations Manager, Summit FM Solutions",
    href: "/customers/summit-fm",
    panelClass: "bg-sandy-brown-500/30",
    quoteClass: "text-sandy-brown-900",
    authorClass: "text-sandy-brown-900",
    roleClass: "text-sandy-brown-900/80",
    quoteIconColor: "text-sandy-brown-700/60",
    contentBorderClass: "border-sandy-brown-800/25",
    buttonBorderClass: "border-sandy-brown-900",
    buttonTextClass: "text-sandy-brown-900",
    buttonHoverClass: "hover:bg-sandy-brown-900/8",
    buttonIconBgClass: "bg-sandy-brown-900",
  },
];

function QuoteIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 39 32"
      fill="none"
      className={`h-7 w-8 shrink-0 ${className}`}
      aria-hidden
    >
      <path
        d="m16.3 4-4.333-4C4.189 5.557.078 12.89.078 20.668v.445C.078 27.779 3.745 32 8.856 32c4.222 0 7.778-3.334 7.778-7.89 0-4.444-3.111-7.332-7.334-7.332a7.15 7.15 0 0 0-2.666.555C7.41 12.223 11.3 7.78 16.3 4.001Zm21.667 0-4.333-4c-7.778 5.556-11.89 12.89-11.89 20.667v.445c0 6.667 3.668 10.889 8.779 10.889 4.222 0 7.777-3.334 7.777-7.89 0-4.444-3.11-7.332-7.333-7.332a7.15 7.15 0 0 0-2.667.555c.778-5.111 4.667-9.555 9.667-13.333Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function SognoscareRosterStories() {
  const [index, setIndex] = useState(0);
  const total = STORIES.length;
  const go = (next: number) => { if (next >= 0 && next < total) setIndex(next); };
  const story = STORIES[index];

  const buttonClassName = cn(
    story.buttonBorderClass,
    story.buttonTextClass,
    story.buttonHoverClass,
  );

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
            Customers
          </p>
          <h2 className="font-heading text-4xl font-normal text-brand">
            Organisations that moved from manual to automated
          </h2>
        </div>

        {/* Card */}
        <div className="grid min-h-96 overflow-hidden rounded-xl border border-slate-400/30 lg:grid-cols-[380px_1fr]">
          {/* Left */}
          <div className="flex flex-col border-b border-(--sognos-border) bg-white p-8 lg:border-b-0 lg:border-r">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`left-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex h-full flex-col"
              >
                <div className="mb-auto">
                  <Image
                    src={story.logo}
                    alt={story.company}
                    width={160}
                    height={48}
                    className="h-12 w-auto max-w-[160px] object-contain object-left"
                  />
                </div>
                <div className="mt-auto pt-6">
                  <hr className="mb-6 border-slate-400/30" />
                  <div className="space-y-4">
                    <div>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-cornflower-ocean-800/50">
                        Workforce size
                      </p>
                      <p className="text-xl font-medium text-prussian-blue-800">
                        {story.companySize} workers
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-cornflower-ocean-800/50">
                        Industry
                      </p>
                      <p className="text-xl font-medium text-prussian-blue-800">
                        {story.industry}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right */}
          <div className={`flex flex-col p-10 transition-colors duration-300 ${story.panelClass}`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`right-${index}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="flex h-full flex-col"
              >
                <QuoteIcon className={story.quoteIconColor} />

                <blockquote className="mt-6 flex-1">
                  <p className={`font-heading text-2xl font-normal leading-snug tracking-tight lg:text-3xl ${story.quoteClass}`}>
                    {story.quote}
                  </p>
                </blockquote>

                <div className="mt-6">
                  <p className={`text-sm font-semibold ${story.authorClass}`}>
                    {story.author}
                  </p>
                  <p className={`mt-0.5 text-sm ${story.roleClass}`}>
                    {story.role}
                  </p>
                </div>

                <div className={cn("mt-8 flex justify-end border-t pt-6", story.contentBorderClass)}>
                  <AnimatedButton
                    href={story.href}
                    variant="transparent"
                    className={buttonClassName}
                    bubbleClassName={story.buttonIconBgClass}
                  >
                    Read case study
                  </AnimatedButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Nav */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {STORIES.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="h-2 w-2 cursor-pointer rounded-full transition-all duration-200"
                style={{
                  background: i === index ? "var(--sognos-accent)" : "var(--sognos-border)",
                  transform: i === index ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label="Previous"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-(--sognos-border) text-sognos-text-muted transition-colors hover:border-sognos-text-heading hover:text-sognos-text-heading disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => go(index + 1)}
              disabled={index === total - 1}
              aria-label="Next"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-brand text-white transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
