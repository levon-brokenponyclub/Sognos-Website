"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";

type ProductStory = {
  quote: string;
  author: string;
  company: string;
  href: string;
};

type ProductCardData = {
  logo: string;
  logoAlt: string;
  eyebrow: string;
  title: string;
  byline: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  story: ProductStory;
  sectionBg: string;
};

type ProductCardProps = ProductCardData & {
  index: number;
  isActive: boolean;
  isRevealed: boolean;
  onActivate: (index: number) => void;
};

const PRODUCT_CARDS: ProductCardData[] = [
  {
    logo: "/logos/sognos-care-logo.svg",
    logoAlt: "SognosCare",
    eyebrow: "SognosCare",
    title: "Amplify your impact with AI",
    byline: "One platform.\nFrom intake to outcome.",
    description:
      "Deliver safer, simpler care in the field. From mental health to aged care, we help providers reduce admin and stay service-ready — whatever changes come next.",
    ctaText: "Explore SognosCare",
    ctaLink: "/products/sognoscare",
    sectionBg: "#C2E4FE",
    story: {
      quote:
        "Congratulations and well done to everyone that has been a part of this magnificent success! You should all be very proud of the quality of work you produce. You make us very proud - THANK YOU!",
      author: "Susan McCarthy",
      company: "Flourish Australia",
      href: "/customers/meridian-care-group",
    },
  },
  {
    logo: "/logos/sognos-roster-logo.svg",
    logoAlt: "SognosRoster",
    eyebrow: "SognosRoster",
    title: "More clarity and accountability",
    byline: "The right worker, for every job, in real time",
    description:
      "From scheduling to routing, SognosRoster puts the right worker on every shift — factoring skills, location, availability and compliance automatically.",
    ctaText: "Explore SognosRoster",
    ctaLink: "/products/sognosroster",
    sectionBg: "#C2E4FE",
    story: {
      quote:
        "We've moved from reactive to proactive compliance. Every inspection now, the auditors comment on how thorough our records are. That wasn't possible before Sognos.",
      author: "Claire Donovan",
      company: "Penrith City Council",
      href: "/customers/summit-fm",
    },
  },
  {
    logo: "/logos/SognosGenogram-logo.svg",
    logoAlt: "Sognos Genogram",
    eyebrow: "Sognos Genogram",
    title: "Understand the people behind every case",
    byline: "Family context.\nBuilt into every record.",
    description:
      "Sognos Genogram maps the relationships, histories, and support networks that shape service delivery — giving your team the context they need to deliver better outcomes.",
    ctaText: "Explore Sognos Genogram",
    ctaLink: "/products/sognosgenogram",
    sectionBg: "#C2E4FE",
    story: {
      quote:
        "Having the full family picture embedded in the case record changed how our team approaches every intake. We catch things we would have missed before.",
      author: "Dr. Priya Nair",
      company: "Northside Community Health",
      href: "/customers/northside-community-health",
    },
  },
];

function ProductCard({
  logo,
  logoAlt,
  eyebrow,
  title,
  byline,
  description,
  ctaText,
  ctaLink,
  story,
  index,
  isActive,
  isRevealed,
  onActivate,
}: ProductCardProps) {
  return (
    <motion.article
      onMouseEnter={() => onActivate(index)}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className={[
        "h-full overflow-hidden rounded-xl text-white shrink-0",
        "transition-[width] duration-500 ease-in-out",
        "flex flex-col",
        "bg-white p-2",
        "w-full",
        isActive ? "md:w-[750px]" : "md:w-[400px]",
      ].join(" ")}
    >
      <div className="flex h-full flex-col lg:flex-row gap-12 items-center lg:items-end">
        {/* Text side — fixed width, never squashes */}
        <div className="flex flex-col justify-between h-full w-full gap-6 lg:w-96 lg:shrink-0">
          <div className="p-8 py-10 lg:py-14 h-full flex flex-col justify-between gap-3 items-center text-center lg:items-start lg:text-left">
            <div className="flex flex-col items-center lg:items-start">
              <Image
                src={logo}
                alt={logoAlt}
                width={120}
                height={32}
                className="h-11 w-auto object-contain mb-10"
              />

              <h3 className="font-body text-2xl leading-tight tracking-normal text-cornflower-ocean-300 whitespace-pre-line lg:text-3xl">
                {byline}
              </h3>
              <p className="mt-6 max-w-sm text-sm leading-6 text-white lg:text-base">
                {description}
              </p>
            </div>
            <div className="mt-8 lg:mt-0">
              <AnimatedButton href={ctaLink} variant="white">
                {ctaText}
              </AnimatedButton>
            </div>
          </div>
        </div>

        {/* Story panel — fades in/out, fills remaining card width (desktop only) */}
        <div
          className={[
            "hidden lg:flex flex-col justify-between lg:flex-1 lg:min-w-0",
            "transition-opacity duration-300",
            isRevealed ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <div className="bg-white max-block-4/5 p-8 lg:p-10">
            {/* Quote mark */}
            <svg
              viewBox="0 0 39 32"
              fill="none"
              className="w-8 h-7 shrink-0 text-prussian-blue-700/35"
              aria-hidden="true"
            >
              <path
                d="m16.3 4-4.333-4C4.189 5.557.078 12.89.078 20.668v.445C.078 27.779 3.745 32 8.856 32c4.222 0 7.778-3.334 7.778-7.89 0-4.444-3.111-7.332-7.334-7.332a7.15 7.15 0 0 0-2.666.555C7.41 12.223 11.3 7.78 16.3 4.001Zm21.667 0-4.333-4c-7.778 5.556-11.89 12.89-11.89 20.667v.445c0 6.667 3.668 10.889 8.779 10.889 4.222 0 7.777-3.334 7.777-7.89 0-4.444-3.11-7.332-7.333-7.332a7.15 7.15 0 0 0-2.667.555c.778-5.111 4.667-9.555 9.667-13.333Z"
                fill="currentColor"
              />
            </svg>

            <blockquote className="mt-6 flex-1">
              <p className="font-heading text-base font-normal leading-relaxed text-prussian-blue-800 lg:text-lg">
                {story.quote}
              </p>
            </blockquote>

            <div className="mt-8 pt-6 border-t border-prussian-blue-800">
              <p className="text-sm font-semibold text-prussian-blue-800/85">
                {story.author}
              </p>
              <p className="text-xs text-prussian-blue-800 mt-0.5">
                {story.company}
              </p>
              {/* <Link
                href={story.href}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-sognos-edition-green hover:gap-3 transition-all duration-200"
              >
                Read case study
                <ArrowRight size={14} />
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProductSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  // revealedIndex: which card's story panel is visible (-1 = none during transition)
  const [revealedIndex, setRevealedIndex] = useState(0);
  const transitioning = useRef(false);

  const handleActivate = (index: number) => {
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(min-width: 768px) and (hover: hover)").matches
    ) {
      return;
    }
    if (index === activeIndex || transitioning.current) return;

    transitioning.current = true;

    // Phase 1: fade out story panel (300ms — matches fade-in)
    setRevealedIndex(-1);

    // Phase 2: 80ms hold, then reflow panels
    setTimeout(() => {
      setActiveIndex(index);

      // Phase 3: after expansion settles (~480ms), reveal new story panel
      setTimeout(() => {
        setRevealedIndex(index);
        transitioning.current = false;
      }, 480);
    }, 380); // 300ms fade + 80ms hold
  };

  return (
    <motion.section
      aria-label="Platform capabilities"
      className="relative w-full  py-24 overflow-x-clip bg-gradient-hero"
      animate={{ backgroundColor: PRODUCT_CARDS[activeIndex].sectionBg }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Heading — constrained to container */}
      <div className="mx-auto mb-8 lg:mb-5 max-w-7xl px-6 flex flex-col items-center lg:items-start gap-4">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-prussian-blue-800/30 text-white font-medium">
          <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
          Built for high-stakes operations
        </div>
        <h2 className="text-3xl md:text-4xl text-prussian-blue-800 text-center lg:text-left font-heading font-medium tracking-tight">
          For organisations
          <br />
          that can&apos;t afford to get things wrong
        </h2>
      </div>

      {/* Cards — left edge matches heading container, overflow right on desktop only */}
      <div className="mx-auto max-w-7xl px-6 lg:pr-0">
        <div className="flex flex-col gap-6 md:flex-row md:h-125">
          {PRODUCT_CARDS.map((card, index) => (
            <ProductCard
              key={card.ctaLink}
              {...card}
              index={index}
              isActive={activeIndex === index}
              isRevealed={revealedIndex === index}
              onActivate={handleActivate}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
