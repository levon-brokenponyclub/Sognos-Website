"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { SOGNOSCARE_EDITIONS } from "@/lib/constants";
import EditionCards from "./sognoscare/EditionCards";
import { ProductCard, PRODUCT_CARDS } from "./ProductCard";

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
            className="fixed inset-0 z-99 bg-brand/60 backdrop-blur-xs"
            onClick={onClose}
          />

          <motion.div
            key="drawer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed bottom-0 left-0 right-0 z-100 bg-gray-100 rounded-t-2xl max-w-7xl mx-auto shadow-2xl max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle + close */}
            <div className="flex items-center justify-between px-6 pt-4 pb-3 shrink-0">
              <div className="w-10 h-1 rounded-full bg-gray-300 mx-auto absolute left-1/2 -trangray-x-1/2" />
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
              <div className="mx-auto px-6 lg:px-16 pb-10">
                <div className="py-4 items-center text-center max-w-4xl mx-auto mb-6 border-b border-sognos-border-subtle">
                  <h2 className="font-heading text-3xl md:text-4xl font-medium text-prussian-blue-800 tracking-tight mb-6">
                    Choose the Right SognosCare Edition for Your Service
                  </h2>
                  <p className="mt-2 text-lg text-sognos-text-body">
                    SognosCare offers four tailored editions - each
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
  const shineRef = useRef<HTMLSpanElement>(null);
  const [shineInView, setShineInView] = useState(false);

  useEffect(() => {
    const node = shineRef.current;
    if (!node || shineInView) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShineInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [shineInView]);

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
        className="relative w-full py-16 lg:py-26 lg:pb-18 overflow-x-clip bg-gradient-hero"
      >
        {/* Heading */}
        <div className="mx-auto lg:mb-2 max-w-7xl px-6 flex flex-col items-left lg:items-left gap-5 pb-6">
          <div className="relative inline-flex w-fit items-center gap-2 rounded-full border pl-3 pr-4 py-1.5 text-sm  font-heading font-medium border-white/20 text-white/80 bg-[#052048]/30">
            <span
              aria-hidden
              className="animate-shine pointer-events-none absolute inset-0 rounded-full"
              style={
                {
                  padding: "1px",
                  background:
                    "conic-gradient(from var(--shine-angle), transparent 0deg, rgba(255,255,255,0.8) 60deg, transparent 120deg, transparent 360deg)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  ["--shine-duration" as string]: "8.s",
                } as React.CSSProperties
              }
            />
            <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
            Products that work
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-white text-center lg:text-left tracking-tight mb-6">
            Building{" "}
            <span
              ref={shineRef}
              className={`text-shine-settle${shineInView ? " in-view" : ""}`}
            >
              smarter, faster
            </span>{" "}
            across diverse industries
          </h2>
        </div>

        {/* Cards */}
        <div className="mx-auto max-w-7xl px-6 lg:px-6 mt-2">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none lg:gap-4 -mx-6 px-6 lg:mx-0 lg:px-0"
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

          {/* Nav arrows */}
          <div className="mt-6 flex items-center justify-end gap-3 lg:hidden">
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
