"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { useBookDemo } from "@/lib/BookDemoContext";
import {
  PRODUCT_CARDS,
  ViewProductLink,
} from "@/components/sections/ProductCard";

type DrawerState = "hidden" | "peek" | "expanded";

interface ProductDrawerProps {
  secondaryLabel: string;
  /** Desktop peek - left column heading */
  peekTitle?: string;
  /** Desktop peek - left column body text */
  peekDescription?: string;
  /** Expanded state - section header title */
  drawerTitle?: string;
  /** Expanded state - section header description */
  drawerDescription?: string;
  /** Current product slug - filters it out of the "Other Products" cards */
  currentProduct?: "sognoscare" | "sognosroster" | "sognosgenogram";
  children?: React.ReactNode;
}

const DRAWER_H = "85svh";
// Mobile peek: handle(20) + pt-2 + btn-h12 + pb-4 = ~92px
// Desktop peek: handle(20) + lg:pt-7 + 2-col content + lg:pb-5 = ~130px
const MOBILE_PEEK = 96;
const DESKTOP_PEEK = 110;

export default function ProductDrawer({
  secondaryLabel,
  peekTitle,
  peekDescription,
  drawerTitle,
  drawerDescription,
  currentProduct,
  children,
}: ProductDrawerProps) {
  const [state, setState] = useState<DrawerState>("peek");
  const [isMobile, setIsMobile] = useState(true);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { openModal } = useBookDemo();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Lock body scroll when drawer is expanded
  useEffect(() => {
    if (state === "expanded") {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [state]);

  // Collapse on scroll down, peek on scroll up - frozen when expanded
  const lastUpdateRef = useRef(0);
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const now = Date.now();
      // Debounce: only update state if 100ms has passed since last update
      if (now - lastUpdateRef.current < 100) return;

      if (y > lastY) {
        setState((s) => (s === "expanded" ? s : "hidden"));
        lastUpdateRef.current = now;
      } else if (y < lastY) {
        setState((s) => (s === "expanded" ? s : "peek"));
        lastUpdateRef.current = now;
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollCarousel = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    setCarouselIdx(idx);
  };

  const peekPx = isMobile ? MOBILE_PEEK : DESKTOP_PEEK;
  const animateY =
    state === "expanded"
      ? "0px"
      : state === "peek"
        ? `calc(${DRAWER_H} - ${peekPx}px)`
        : `calc(${DRAWER_H} - 20px)`;

  const otherProducts = currentProduct
    ? PRODUCT_CARDS.filter((c) => !c.ctaLink.includes(currentProduct))
    : [];
  const hasContent = Boolean(children) || otherProducts.length > 0;

  return (
    <motion.div
      initial={{ y: `calc(${DRAWER_H} - ${MOBILE_PEEK}px)` }}
      animate={{ y: animateY }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
      className="fixed bottom-0 left-0 right-0 z-100 bg-gray-100 rounded-t-xl flex flex-col mx-auto max-w-[100%] overflow-hidden lg:max-w-7xl"
      style={{ height: DRAWER_H }}
    >
      {/* Handle bar */}
      <button
        onClick={() => {
          if (!hasContent) return;
          setState((s) => (s === "expanded" ? "peek" : "expanded"));
        }}
        className={`w-full flex justify-center pt-5 pb-1 shrink-0 ${hasContent ? "cursor-pointer" : "cursor-default"}`}
        aria-label={state === "expanded" ? "Collapse" : "Expand"}
        disabled={!hasContent}
      >
        <div className="w-10 h-1 rounded-full bg-gray-300" />
      </button>

      {/* Peek row
          Mobile: buttons only, centred
          Desktop: 2-col - title/description left, buttons right (mirrors hero bar) */}
      <div
        className="relative flex items-center gap-3 px-5 pt-2 pb-4 lg:justify-between lg:gap-14 lg:px-8 lg:pb-1 lg:pt-1 shrink-0"
        style={{ order: state === "expanded" ? 1 : undefined }}
      >
        {/* Concave curve transitions */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 -left-[20px] h-[20px] w-[20px] bg-white"
          style={{
            WebkitMaskImage:
              "radial-gradient(circle at 0% 100%, transparent 19px, black 20px)",
            maskImage:
              "radial-gradient(circle at 0% 100%, transparent 19px, black 20px)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 -right-[20px] h-[20px] w-[20px] bg-white"
          style={{
            WebkitMaskImage:
              "radial-gradient(circle at 100% 100%, transparent 19px, black 20px)",
            maskImage:
              "radial-gradient(circle at 100% 100%, transparent 19px, black 20px)",
          }}
        />
        {/* Left col - desktop only */}
        {(peekTitle || peekDescription) && (
          <div className="hidden lg:flex flex-col gap-2 max-w-xl">
            {peekTitle && (
              <h2 className="font-heading text-[22px] font-medium tracking-normal text-prussian-blue-800">
                {peekTitle}
              </h2>
            )}
            {peekDescription && (
              <p className="text-base text-prussian-blue-800/75 lg:truncate">
                {peekDescription}
              </p>
            )}
          </div>
        )}

        {/* Right col - buttons (centred on mobile, shrink on desktop) */}
        <div className="flex items-center justify-center gap-2 flex-1 lg:flex-none lg:justify-start">
          <AnimatedButton
            href="#"
            onClick={(e) => {
              e.preventDefault();
              openModal();
            }}
            className="flex lg:flex-none justify-center"
          >
            Book a Demo
          </AnimatedButton>
          <button
            onClick={() =>
              setState((s) => (s === "expanded" ? "peek" : "expanded"))
            }
            className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium text-prussian-blue-800 border-0 border-transparent transition-colors hover:bg-prussian-blue-800/5 hover:border-prussian-blue-800/20 whitespace-nowrap"
          >
            {secondaryLabel}
          </button>
        </div>
      </div>

      {/* Expanded content */}
      {hasContent && (
        <div className="flex-1 overflow-y-auto overscroll-contain border-0 border-sognos-border-subtle">
          {(drawerTitle || drawerDescription) && (
            <div className="px-5 pt-5 pb-3 flex items-start justify-between shrink-0">
              <div>
                {drawerTitle && (
                  <h3 className="font-heading text-xl font-medium text-prussian-blue-800">
                    {drawerTitle}
                  </h3>
                )}
                {drawerDescription && (
                  <p className="mt-1 text-sm text-sognos-text-body">
                    {drawerDescription}
                  </p>
                )}
              </div>
              <button
                onClick={() => setState("peek")}
                className="ml-4 mt-0.5 w-9 h-9 shrink-0 rounded-full flex items-center justify-center bg-gray-100 text-prussian-blue-800/60 hover:text-prussian-blue-800 transition-colors"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {children && <div className="px-5 pb-4">{children}</div>}

          {/* Other products */}
          {otherProducts.length > 0 && (
            <div className="px-5 pb-8">
              {children && (
                <div className="border-t border-sognos-border-subtle pt-6 mb-4">
                  <h3 className="font-heading text-xl font-medium text-prussian-blue-800">
                    Other Products
                  </h3>
                </div>
              )}
              <div ref={carouselRef} className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                {otherProducts.map((card) => (
                  <article
                    key={card.ctaLink}
                    className="shrink-0 w-[75vw] snap-center lg:flex-1 lg:w-auto h-[420px] overflow-hidden rounded-lg bg-white p-2"
                  >
                    <div className="relative h-full rounded-lg overflow-hidden bg-white">
                      <div className="relative z-10 flex items-center justify-center h-full px-8 pb-60">
                        <Image
                          src={card.logo}
                          alt={card.logoAlt}
                          width={160}
                          height={40}
                          className="h-11 w-auto object-contain"
                        />
                      </div>
                      <div
                        className="absolute bottom-0 left-0 right-0 z-10 rounded-lg px-6 pt-8 pb-7"
                        style={{ backgroundColor: `${card.hoverBg}e6` }}
                      >
                        <h3 className="font-body text-xl font-medium leading-tight tracking-normal whitespace-pre-line text-white">
                          {card.byline}
                        </h3>
                        <p className="mt-3 max-w-sm font-heading font-normal leading-relaxed text-white/90 text-sm line-clamp-3">
                          {card.description}
                        </p>
                        <div className="mt-4">
                          <ViewProductLink href={card.ctaLink} />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Prev / Next arrows — mobile only */}
              {otherProducts.length > 1 && (
                <div className="flex justify-end gap-2 pt-4 lg:hidden">
                  <button
                    onClick={() => scrollCarousel(Math.max(0, carouselIdx - 1))}
                    disabled={carouselIdx === 0}
                    aria-label="Previous product"
                    className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white disabled:opacity-30 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => scrollCarousel(Math.min(otherProducts.length - 1, carouselIdx + 1))}
                    disabled={carouselIdx === otherProducts.length - 1}
                    aria-label="Next product"
                    className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white disabled:opacity-30 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
