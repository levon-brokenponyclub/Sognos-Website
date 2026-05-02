"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import AnimatedButton from "@/components/ui/AnimatedButton";

type DrawerState = "hidden" | "peek" | "expanded";

interface ProductDrawerProps {
  bookHref?: string;
  secondaryHref: string;
  secondaryLabel: string;
  /** Desktop peek — left column heading */
  peekTitle?: string;
  /** Desktop peek — left column body text */
  peekDescription?: string;
  /** Expanded state — section header title */
  drawerTitle?: string;
  /** Expanded state — section header description */
  drawerDescription?: string;
  children?: React.ReactNode;
}

const DRAWER_H = "85svh";
// Mobile peek: handle(20) + pt-2 + btn-h12 + pb-4 = ~92px
// Desktop peek: handle(20) + lg:pt-7 + 2-col content + lg:pb-5 = ~130px
const MOBILE_PEEK = 96;
const DESKTOP_PEEK = 110;

export default function ProductDrawer({
  bookHref = "/contact",
  secondaryHref,
  secondaryLabel,
  peekTitle,
  peekDescription,
  drawerTitle,
  drawerDescription,
  children,
}: ProductDrawerProps) {
  const [state, setState] = useState<DrawerState>("peek");
  const [isMobile, setIsMobile] = useState(true);

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

  // Collapse on scroll down, peek on scroll up — frozen when expanded
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY) {
        setState((s) => (s === "expanded" ? s : "hidden"));
      } else if (y < lastY) {
        setState((s) => (s === "expanded" ? s : "peek"));
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const peekPx = isMobile ? MOBILE_PEEK : DESKTOP_PEEK;
  const animateY =
    state === "expanded"
      ? "0px"
      : state === "peek"
        ? `calc(${DRAWER_H} - ${peekPx}px)`
        : `calc(${DRAWER_H} - 20px)`;

  const hasContent = Boolean(children);

  return (
    <motion.div
      initial={{ y: `calc(${DRAWER_H} - ${MOBILE_PEEK}px)` }}
      animate={{ y: animateY }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-gray-200 rounded-t-xl flex flex-col mx-auto max-w-[90%] overflow-hidden lg:max-w-7xl"
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
          Desktop: 2-col — title/description left, buttons right (mirrors hero bar) */}
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
        {/* Left col — desktop only */}
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

        {/* Right col — buttons (full-width on mobile, shrink on desktop) */}
        <div className="flex items-center gap-2 flex-1 lg:flex-none">
          <AnimatedButton
            href={bookHref}
            className="flex lg:flex-none justify-center"
          >
            Book a Demo
          </AnimatedButton>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium text-prussian-blue-800 border-0 border-transparent transition-colors hover:bg-prussian-blue-800/5 hover:border-prussian-blue-800/20 whitespace-nowrap"
          >
            {secondaryLabel}
          </Link>
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
          <div className="px-5 pb-8">{children}</div>
        </div>
      )}
    </motion.div>
  );
}
