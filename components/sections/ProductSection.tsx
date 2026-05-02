"use client";

import { useState, useRef } from "react";
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
            className="fixed inset-0 z-50 bg-prussian-blue-900/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            key="drawer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#EDEEF1] rounded-t-2xl max-w-10/12 mx-auto shadow-2xl max-h-[80vh] flex flex-col"
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
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none lg:gap-6 -mx-6 px-6 lg:mx-0 lg:px-0"
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
          <div className="flex items-center justify-end gap-3 mt-6">
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
