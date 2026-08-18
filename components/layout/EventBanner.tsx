"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  UPCOMING_EVENT,
  BANNER_STORAGE_KEY,
  BANNER_DISMISS_EVENT,
} from "@/lib/upcomingEvent";

function IconClose() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export default function EventBanner() {
  const [scrolled, setScrolled] = useState(false);
  const [colorMode, setColorMode] = useState<"dark" | "light">("dark");

  const bannerDismissed = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const handleChange = () => onStoreChange();
      window.addEventListener("storage", handleChange);
      window.addEventListener(BANNER_DISMISS_EVENT, handleChange);
      return () => {
        window.removeEventListener("storage", handleChange);
        window.removeEventListener(BANNER_DISMISS_EVENT, handleChange);
      };
    },
    () => {
      if (typeof window === "undefined") return false;
      return window.localStorage.getItem(BANNER_STORAGE_KEY) === "true";
    },
    () => false,
  );

  // Scroll + dark-hero detection — mirrors Navbar's probe so the banner
  // theme flips with the surface it sits over.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 8);
      let mode: "dark" | "light" = "light";
      const probeY = 22; // mid-banner (44px tall)
      document.querySelectorAll("[data-header-dark]").forEach((section) => {
        const r = section.getBoundingClientRect();
        if (probeY >= r.top && probeY <= r.bottom) mode = "dark";
      });
      setColorMode(mode);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(BANNER_STORAGE_KEY, "true");
    window.dispatchEvent(new Event(BANNER_DISMISS_EVENT));
  };

  if (bannerDismissed) return null;

  // Over a dark hero the banner is white; over a light hero it's navy —
  // the opposite of the surface underneath so it always separates visually.
  const theme =
    colorMode === "dark"
      ? {
          bar: "bg-white border-white/0",
          text: "text-prussian-blue-800",
          chipBorder: "border-prussian-blue-800/30",
        }
      : {
          bar: "bg-prussian-blue-800 border-white/15",
          text: "text-white",
          chipBorder: "border-white/60",
        };

  return (
    <div
      className={[
        "fixed inset-x-0 top-0 z-[60] border-b",
        theme.bar,
        theme.text,
        "transition-transform duration-300 ease-in-out",
        scrolled ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto relative flex h-11 w-full items-center px-2">
        {/* Mobile — chip + marquee title */}
        <Link
          href={UPCOMING_EVENT.href}
          onClick={dismiss}
          className={`flex min-w-0 flex-1 items-center gap-2 self-stretch md:hidden ${theme.text}`}
        >
          <span
            className={`shrink-0 inline-flex border ${theme.chipBorder} rounded px-2 py-0.5 text-xs font-medium uppercase tracking-wider align-middle`}
          >
            {UPCOMING_EVENT.label}
          </span>
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="banner-marquee-track" aria-hidden="true">
              <span className="whitespace-nowrap pr-10 text-xs font-medium">
                {UPCOMING_EVENT.title}
              </span>
              <span className="whitespace-nowrap pr-10 text-xs font-medium">
                {UPCOMING_EVENT.title}
              </span>
            </div>
            <span className="sr-only">{UPCOMING_EVENT.title}</span>
          </div>
        </Link>

        {/* Desktop — centred group with CTA */}
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-3 md:flex">
          <span
            className={`shrink-0 inline-flex border ${theme.chipBorder} rounded px-2.5 py-1 text-sm font-normal uppercase tracking-wider align-middle md:text-xs`}
          >
            {UPCOMING_EVENT.label}
          </span>
          <span className="truncate text-sm font-medium">
            {UPCOMING_EVENT.title}
          </span>
          <Link
            href={UPCOMING_EVENT.href}
            onClick={dismiss}
            className="group/cta flex shrink-0 items-center gap-1.5 text-sm font-medium underline decoration-dotted transition-colors duration-200 hover:opacity-70"
          >
            View event
            <svg
              className="h-3 w-3 transition-transform group-hover/cta:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <button
          type="button"
          onClick={dismiss}
          className="ml-2 flex shrink-0 items-center px-2 transition-opacity hover:opacity-70"
          aria-label="Close announcement banner"
        >
          <IconClose />
        </button>
      </div>
    </div>
  );
}
