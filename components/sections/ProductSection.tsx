"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Maximize2, X, ArrowLeft, ArrowRight } from "lucide-react";
import { SOGNOSCARE_EDITIONS } from "@/lib/constants";
import EditionCards from "./sognoscare/EditionCards";

type Edition = {
  label: string;
  logo: string;
  href: string;
  accentColor: string;
  tagline: string;
  description: string;
};

type ProductCardData = {
  logo: string;
  logoAlt: string;
  byline: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  video: string;
  hoverBg: string;
  editions?: readonly Edition[];
};

const PRODUCT_CARDS: ProductCardData[] = [
  {
    logo: "/logos/sognos-care-logo-color.svg",
    logoAlt: "SognosCare",
    byline: "One platform.\nFrom intake to outcome.",
    description:
      "Deliver safer, simpler care in the field. From mental health to aged care, we help providers reduce admin and stay service-ready — whatever changes come next.",
    ctaText: "Explore SognosCare",
    ctaLink: "/products/sognoscare",
    video:
      "https://www.shutterstock.com/shutterstock/videos/3783412759/preview/stock-footage-happy-face-hug-and-senior-patient-with-nurse-for-healthcare-or-assisted-living-at-old-age-home.webm",
    hoverBg: "#4ECCD6",
    editions: SOGNOSCARE_EDITIONS,
  },
  {
    logo: "/logos/sognos-roster-logo-color.svg",
    logoAlt: "SognosRoster",
    byline: "The right worker, for every job, in real time",
    description:
      "From scheduling to routing, SognosRoster puts the right worker on every shift — factoring skills, location, availability and compliance automatically.",
    ctaText: "Explore SognosRoster",
    ctaLink: "/products/sognosroster",
    video:
      "https://www.shutterstock.com/shutterstock/videos/3920712075/preview/stock-footage-typing-supply-chain-and-man-in-warehouse-tablet-and-digital-checklist-for-export-report-person.webm",
    hoverBg: "#1d96fc",
  },
  {
    logo: "/logos/sognos-genogram-logo-color.svg",
    logoAlt: "Sognos Genogram",
    byline: "Family context.\nBuilt into every record.",
    description:
      "Sognos Genogram maps the relationships, histories, and support networks that shape service delivery — giving your team the context they need to deliver better outcomes.",
    ctaText: "Explore Sognos Genogram",
    ctaLink: "/products/sognosgenogram",
    video:
      "https://www.shutterstock.com/shutterstock/videos/3992307185/preview/stock-footage-vertical-portrait-of-cheerful-caucasian-girl-child-posing-for-camera-holding-handmade-paper-bunny.webm",
    hoverBg: "#92278D",
  },
];

function ViewProductLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2.5 text-sm font-medium text-white hover:opacity-70 transition-opacity"
    >
      View Product
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/25 text-white shrink-0">
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
  );
}

function ProductCard({
  logo,
  logoAlt,
  byline,
  description,
  ctaLink,
  video,
  hoverBg,
  editions,
  index,
  onOpenDrawer,
}: ProductCardData & { index: number; onOpenDrawer?: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const active = hovered || isMobile;

  return (
    <motion.article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="shrink-0 w-[calc(100vw-3rem)] snap-center lg:flex-1 lg:w-auto h-[520px] overflow-hidden rounded-md bg-white p-2"
    >
      {/* Inner — relative + overflow-hidden clips the content when offset */}
      <div className="relative h-full rounded-lg overflow-hidden bg-white">
        {/* Video */}
        <video
          src={video}
          autoPlay
          muted
          playsInline
          loop
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`}
        />

        {/* Gradient overlays */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`}
        />

        {/* Logo — centered in upper zone, animates up on hover */}
        <motion.div
          animate={{ y: active ? -20 : 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 flex items-center justify-center h-full px-8 pb-70"
        >
          <Image
            src={logo}
            alt={logoAlt}
            width={160}
            height={40}
            className={`h-11 w-auto object-contain transition-all duration-500 ${active ? "brightness-0 invert" : ""}`}
          />
        </motion.div>

        {/* SognosCare editions button — bottom right */}
        {editions && onOpenDrawer && (
          <button
            onClick={onOpenDrawer}
            className={`absolute bottom-4 right-4 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-sm text-white transition-all duration-300 ${active ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
            aria-label="View SognosCare editions"
          >
            <Maximize2 size={16} />
          </button>
        )}

        {/* Content — slides up from bottom on active */}
        <motion.div
          animate={{ y: active ? 0 : 50 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="absolute bottom-0 left-0 right-0 z-10 rounded-lg px-6 pt-10 pb-8"
          style={{
            backgroundColor: active ? `${hoverBg}e6` : "rgb(241, 245, 249)",
          }}
        >
          <h3
            className={`font-body text-2xl leading-tight tracking-normal whitespace-pre-line lg:text-3xl transition-colors duration-500 ${active ? "text-white" : "text-prussian-blue-800"}`}
          >
            {byline}
          </h3>
          <p
            className={`mt-4 max-w-sm font-heading font-normal leading-relaxed lg:text-lg transition-colors duration-500 ${active ? "text-white/90" : "text-sognos-text-body"}`}
          >
            {description}
          </p>
          <div
            className={`mt-5 transition-all duration-300 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}`}
          >
            <ViewProductLink href={ctaLink} />
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

function EditionsDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-prussian-blue-900/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            key="drawer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#EDEEF1] rounded-t-2xl max-w-7xl mx-auto shadow-2xl max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle + close */}
            <div className="flex items-center justify-between px-6 pt-4 pb-3 shrink-0">
              <div className="w-10 h-1 rounded-full bg-gray-300 mx-auto absolute left-1/2 -translate-x-1/2" />
              <div />
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-prussian-blue-800/50 hover:text-prussian-blue-800 hover:border-prussian-blue-800/30 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1">
              <div className="mx-auto px-6 lg:px-12 pb-10">
                <div className="py-4 items-center text-center max-w-4xl mx-auto mb-6 border-b border-sognos-border-subtle">
                  <h3 className="font-heading text-3xl font-medium text-prussian-blue-800">
                    Choose the Right SognosCare Edition for Your Service
                  </h3>
                  <p className="mt-2 text-lg text-sognos-text-body">
                    SognosCare offers four tailored editions — each
                    pre-configured for its funding model, compliance framework,
                    and operational workflows.
                  </p>
                </div>

                <EditionCards
                  editions={SOGNOSCARE_EDITIONS}
                  showSliderButtons
                  containerClassName="w-full"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ProductSection() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    const el = sliderRef.current;
    if (!el) return;
    const cardW = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 16
      : el.offsetWidth;
    el.scrollBy({ left: dir === "next" ? cardW : -cardW, behavior: "smooth" });
  };

  return (
    <>
      <section
        aria-label="Platform capabilities"
        className="relative w-full py-16 lg:py-24 overflow-x-clip bg-gradient-hero"
      >
        {/* Heading */}
        <div className="mx-auto mb-8 lg:mb-5 max-w-7xl px-6 flex flex-col items-center lg:items-center gap-5 pb-6">
          <div className="inline-flex w-fit items-center gap-2 r mx-auto rounded-full border px-4 py-1 text-sm border-white/30 text-white font-medium">
            <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
            Built for high-stakes operations
          </div>
          <h2 className="text-3xl md:text-4xl text-white text-center lg:text-left font-heading font-medium tracking-tight">
            For organisations that{" "}
            <span className="text-[#1D96FC]">can&apos;t afford</span> to get
            things wrong
          </h2>
        </div>

        {/* Cards */}
        <div className="mx-auto max-w-7xl px-6 lg:px-6 mt-10">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none lg:overflow-visible lg:gap-8 -mx-6 px-6 lg:mx-0 lg:px-0"
          >
            {PRODUCT_CARDS.map((card, index) => (
              <ProductCard
                key={card.ctaLink}
                {...card}
                index={index}
                onOpenDrawer={
                  card.editions ? () => setDrawerOpen(true) : undefined
                }
              />
            ))}
          </div>

          {/* Mobile arrows */}
          <div className="flex lg:hidden items-center justify-end gap-3 mt-6">
            <button
              onClick={() => scroll("prev")}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-dashed border-white/30 text-white hover:border-white/60 transition-colors"
              aria-label="Previous"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => scroll("next")}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-dashed border-white/30 text-white hover:border-white/60 transition-colors"
              aria-label="Next"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <EditionsDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
