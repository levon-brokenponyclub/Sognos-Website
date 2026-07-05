"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const PANEL_HLS_SRC =
  "https://stream.mux.com/jQkiowhjcNANEVOdEj02JRdSnvM5TaFudLXF9BmyAVms.m3u8?max_resolution=1080p";

function PanelBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Safari + iOS play HLS natively — just point the video at the URL.
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = PANEL_HLS_SRC;
      return;
    }

    // Everywhere else: lazy-load hls.js so it doesn't ship in the initial bundle.
    let hls: import("hls.js").default | null = null;
    let cancelled = false;
    import("hls.js").then(({ default: Hls }) => {
      if (cancelled || !Hls.isSupported()) return;
      hls = new Hls({ enableWorker: true });
      hls.loadSource(PANEL_HLS_SRC);
      hls.attachMedia(video);
    });

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

interface SognoscareHeroProps {
  // logoSrc kept optional for caller compatibility; no longer rendered.
  logoSrc?: string;
  headline?: string;
  subtext?: string;
}

const DEFAULTS = {
  headline: "One platform. From intake to outcome.",
  subtext:
    "Manage cases, track service delivery, meet compliance obligations, and report with confidence - in one platform built end-to-end for care.",
};

export default function SognoscareHero({
  headline = DEFAULTS.headline,
  subtext = DEFAULTS.subtext,
}: SognoscareHeroProps = {}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const prefersReducedMotion = useReducedMotion();
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 160],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.7],
    prefersReducedMotion ? [1, 1] : [1, 0],
  );

  return (
    <section
      ref={heroRef}
      data-header-dark
      className="relative overflow-hidden pb-4 md:pb-0 bg-sognos-care-dark"
    >
      {/* Single animated wrapper — all hero content fades/translates as one unit
          over the static dark section background. AngelList pattern. */}
      <motion.div style={{ y, opacity }} className="will-change-transform">
        <div className="mx-auto max-w-7xl px-6 pt-40 pb-0 text-center">
          {/* Eyebrow */}
          <p
            className="text-xs font-semibold uppercase tracking-[0.08em]"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            SognosCare
          </p>

          {/* Headline */}
          <h1 className="mx-auto mt-6 max-w-5xl font-angellist text-pretty text-white text-5xl sm:text-6xl lg:text-6xl font-normal tracking-[-0.02em]">
            {headline}
          </h1>

          {/* Subtext */}
          {/* <p
            className="mx-auto mt-6 max-w-[640px] text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            {subtext}
          </p> */}

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Book a Demo — UNWIRED for now (no onClick) */}
            <button
              type="button"
              className="rounded-full bg-white px-7 py-3.5 text-base font-medium text-sognos-care-dark transition-opacity hover:opacity-90"
            >
              Book a Demo
            </button>
            <Link
              href="#"
              className="inline-flex items-center gap-1.5 text-base font-medium text-white transition-opacity hover:opacity-80"
            >
              Learn More
              <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        </div>

        {/* Placeholder visual — plain child inside the animated wrapper.
            Swap the gradient div for a real <Image> when the asset is ready. */}
        <div className="mx-auto mt-16 max-w-6xl px-6">
          <div className="relative aspect-[2.4/1] w-full overflow-hidden rounded-2xl bg-sognos-care-gradient">
            <PanelBackgroundVideo />
            <div className="relative flex h-full w-full items-center justify-center">
              <Image
                src="/logos/sognos-care-logo.svg"
                alt="SognosCare"
                width={220}
                height={48}
                priority
                className="h-12 w-auto sm:h-14 lg:h-16"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
