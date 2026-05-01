"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { cn } from "@/lib/utils";

type Story = {
  company: string;
  companySize: string;
  edition: string;
  logo: string;
  panelImage: string;
  panelVideo?: string;
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

const AUTOPLAY_MS = 10000;

const STORIES: Story[] = [
  {
    company: "Flourish Australia",
    companySize: "1,100+",
    edition: "Disability & Mental Health",
    logo: "/logos/flourish-australia-logo.png",
    panelImage: "/images/customers/flourish-australia.avif",
    quote:
      "Congratulations and well done to everyone that has been a part of this magnificent success! You should all be very proud of the quality of work you produce. You make us very proud — THANK YOU!",
    author: "Susan McCarthy",
    role: "Chief Operating Officer",
    href: "/customers/flourish-australia",
    panelClass: "bg-white",
    quoteClass: "text-prussian-blue-800",
    authorClass: "text-prussian-blue-800",
    roleClass: "text-gray-500",
    quoteIconColor: "text-gray-200",
    contentBorderClass: "border-gray-100",
    buttonBorderClass: "border-prussian-blue-800",
    buttonTextClass: "text-prussian-blue-800",
    buttonHoverClass: "hover:bg-prussian-blue-800/8",
    buttonIconBgClass: "bg-prussian-blue-800",
  },
  {
    company: "Home Care Provider",
    companySize: "200+",
    edition: "Support at Home",
    logo: "/logos/sognos-logo.svg",
    panelImage: "/images/industries/health-social-care.webp",
    quote:
      "We used to spend two days assembling compliance reports at the end of every quarter. Now it's a single export. The audit trail is there automatically — every note, every visit, every change of plan.",
    author: "Operations Director",
    role: "Support at Home Provider, NSW",
    href: "/customers",
    panelClass: "bg-white",
    quoteClass: "text-prussian-blue-800",
    authorClass: "text-prussian-blue-800",
    roleClass: "text-gray-500",
    quoteIconColor: "text-gray-200",
    contentBorderClass: "border-gray-100",
    buttonBorderClass: "border-prussian-blue-800",
    buttonTextClass: "text-prussian-blue-800",
    buttonHoverClass: "hover:bg-prussian-blue-800/8",
    buttonIconBgClass: "bg-prussian-blue-800",
  },
];

function QuoteIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 39 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-8 h-7 shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path
        d="m16.3 4-4.333-4C4.189 5.557.078 12.89.078 20.668v.445C.078 27.779 3.745 32 8.856 32c4.222 0 7.778-3.334 7.778-7.89 0-4.444-3.111-7.332-7.334-7.332a7.15 7.15 0 0 0-2.666.555C7.41 12.223 11.3 7.78 16.3 4.001Zm21.667 0-4.333-4c-7.778 5.556-11.89 12.89-11.89 20.667v.445c0 6.667 3.668 10.889 8.779 10.889 4.222 0 7.777-3.334 7.777-7.89 0-4.444-3.11-7.332-7.333-7.332a7.15 7.15 0 0 0-2.667.555c.778-5.111 4.667-9.555 9.667-13.333Z"
        fill="currentColor"
      />
    </svg>
  );
}

function getSlideButtonClasses(study: Story) {
  return {
    contentBorderClass: study.contentBorderClass,
    buttonClassName: cn(
      study.buttonBorderClass,
      study.buttonTextClass,
      study.buttonHoverClass,
    ),
    bubbleClassName: study.buttonIconBgClass,
  };
}

export default function SognoscareStories() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = STORIES.length;
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, total]);

  // Scroll active tab into view inside the tab strip only (no page scroll)
  useEffect(() => {
    const container = tabsContainerRef.current;
    const el = tabRefs.current[index];
    if (!container || !el) return;
    container.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
  }, [index]);

  const go = (next: number) => {
    if (next < 0 || next >= total) return;
    setIndex(next);
    setPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setPaused(false), AUTOPLAY_MS);
  };

  const study = STORIES[index];
  const slideButtonClasses = getSlideButtonClasses(study);

  return (
    <section id="stories" className="w-full border-b border-sognos-border-subtle bg-slate-50 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 py-24 lg:py-32">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-start gap-4">
          <span className="inline-block px-3 py-1 rounded-full border border-gray-200 bg-white text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">
            Customers
          </span>
          <h2 className="text-4xl lg:text-5xl text-prussian-blue-800 font-heading font-semibold tracking-tight">
            Care providers who made the move
          </h2>
        </div>

        {/* Card — industry panel style */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col lg:flex-row gap-2 lg:gap-4 flex-1 min-w-0 bg-white rounded-2xl p-2 h-auto lg:h-[540px] shadow-sm border border-gray-100"
          >
            {/* Left column — image/video with logo + stats */}
            <div className="w-full lg:w-[45%] lg:shrink-0 relative rounded-xl overflow-hidden flex flex-col h-[320px] lg:h-auto">
              {study.panelVideo ? (
                <video
                  src={study.panelVideo}
                  autoPlay
                  muted
                  playsInline
                  loop
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={study.panelImage}
                  alt={study.company}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 35vw"
                />
              )}

              {/* White logo — centered */}
              {study.logo && (
                <div className="relative z-10 flex-1 flex items-center justify-center">
                  <Image
                    src={study.logo}
                    alt={study.company}
                    width={160}
                    height={56}
                    className="w-auto max-w-[220px] object-contain brightness-0 invert"
                  />
                </div>
              )}

              {/* Stats — bottom */}
              <div className="relative z-10 mt-auto p-8 flex gap-8 justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60 mb-2">
                    Size
                  </p>
                  <p className="font-heading text-2xl font-medium leading-none tracking-tight text-white">
                    {study.companySize}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60 mb-2">
                    Edition
                  </p>
                  <p className="font-heading text-lg font-medium leading-snug tracking-tight text-white">
                    {study.edition}
                  </p>
                </div>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Right column — quote info panel */}
            <div className="flex-1 bg-[#F1F5F9] rounded-xl p-8 lg:p-12 flex flex-col">
              {/* Quote + author */}
              <div className="flex-1 flex flex-col justify-center">
                <QuoteIcon className={study.quoteIconColor} />

                <blockquote className="mt-8">
                  <p
                    className={`font-heading text-xl lg:text-[28px] font-normal leading-relaxed tracking-tight ${study.quoteClass}`}
                  >
                    "{study.quote}"
                  </p>
                </blockquote>

                <div className="mt-10 pt-8 border-t border-gray-200/60">
                  <p className={`text-sm font-bold ${study.authorClass}`}>
                    {study.author}
                  </p>
                  <p className={`text-[13px] font-semibold mt-1 ${study.roleClass}`}>
                    {study.role}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8">
                <AnimatedButton
                  href={study.href}
                  variant="transparent"
                  className={slideButtonClasses.buttonClassName}
                  bubbleClassName={slideButtonClasses.bubbleClassName}
                >
                  Read case study
                </AnimatedButton>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Logo tab row */}
        <div ref={tabsContainerRef} className="flex overflow-x-auto lg:overflow-hidden snap-x snap-mandatory gap-4 lg:gap-8 mt-6 scrollbar-none">
          {STORIES.map((s, i) => (
            <button
              key={i}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              onClick={() => go(i)}
              className={cn(
                "relative flex items-center justify-center py-6 px-6 cursor-pointer transition-colors duration-300 rounded-xl bg-white border shadow-sm",
                "shrink-0 basis-[calc(100%-2rem)] md:basis-[calc(50%-1rem)] snap-start lg:shrink lg:flex-1",
                i === index ? "border-[#1D96FC]" : "border-gray-100 hover:border-gray-200"
              )}
            >
              {s.logo ? (
                <Image
                  src={s.logo}
                  alt={s.company}
                  width={140}
                  height={48}
                  className="h-8 lg:h-10 w-auto max-w-[140px] object-contain transition-all duration-300"
                  style={{
                    filter: i === index ? "none" : "grayscale(1) opacity(0.4)",
                  }}
                />
              ) : (
                <span
                  className={`text-sm font-semibold tracking-tight transition-all duration-300 ${
                    i === index
                      ? "text-prussian-blue-800 opacity-100"
                      : "text-prussian-blue-800 opacity-40"
                  }`}
                >
                  {s.company}
                </span>
              )}

              {/* Progress bar */}
              <div className="absolute inset-x-0 bottom-0 h-1 overflow-hidden rounded-b-xl opacity-20 bg-gray-100">
                {i === index && (
                  <motion.div
                    key={`progress-${i}-${index}`}
                    className="h-full bg-[#1D96FC] opacity-100"
                    initial={{ width: "0%" }}
                    animate={paused ? false : { width: "100%" }}
                    transition={{
                      duration: AUTOPLAY_MS / 1000,
                      ease: "linear",
                    }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
