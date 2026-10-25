"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useBookDemo } from "@/lib/BookDemoContext";

type HeroProps = {
  headline?: React.ReactNode;
  subtext?: string;
  primaryCTA?: { name: string };
  secondaryCTA?: { name: string; href: string };
  /** Rendered inside the hero section, below the CTAs — the trust strip.
   *  Passed in rather than imported: this is a Client Component and the strip
   *  is an async Server Component, so it has to arrive as a child from a
   *  server parent instead of being rendered here. */
  children?: React.ReactNode;
};

// Glow artwork anchored to the foot of the hero, back to front. Intrinsic
// sizes are the files' own — they must stay in step, or `next/image` reserves
// the wrong aspect ratio and the layers land at different heights.
const BLUR_LAYERS = [
  { src: "/images/home/bottom-blur-dp.avif", width: 1335, height: 612, z: "z-0" },
  { src: "/images/home/middle-blur-dp.avif", width: 1360, height: 337, z: "z-20" },
  { src: "/images/home/top-blur-dp.avif", width: 1335, height: 268, z: "z-30" },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

// Three glow layers stacked at the foot of the hero, each resolving out of a
// blur as it rises — the reference's artwork, given the entrance its own hero
// does not animate (see the note in the changelog).
//
// `isolate` matters: the wrapper is `absolute` with no z-index, so it forms no
// stacking context of its own, and a `z-30` layer inside it would otherwise
// outrank the `z-10` content in the section's context and sit over the
// headline. Isolating contains the layer z-values to this subtree.
function HeroBlurLayers() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 isolate z-0 flex items-end justify-center"
    >
      {BLUR_LAYERS.map((layer, i) => (
        <motion.div
          key={layer.src}
          className={`absolute inset-x-0 bottom-0 ${layer.z}`}
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, y: 40, filter: "blur(24px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1.2,
            // Back to front, and behind the headline — the copy lands first
            // and the glow resolves under it.
            delay: 0.15 + i * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* `unoptimized`: these are already AVIF at 12–34KB, so there is
              nothing for the optimizer to win — and two things to lose. It
              re-encodes to JPEG for any client that does not advertise AVIF or
              WebP, and these glows carry an alpha channel, so that fallback
              would flatten them to a solid box. Re-encoding a 1335×612 AVIF is
              also slow enough on a cold cache to stall the hero's first paint.
              Serving the file as authored avoids both. */}
          <Image
            src={layer.src}
            alt=""
            width={layer.width}
            height={layer.height}
            draggable={false}
            unoptimized
            className="h-auto w-full"
          />
        </motion.div>
      ))}

      {/* Sits between the bottom layer and the two above it, fading the widest
          glow back into the section rather than letting it stop at the edge. */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-sognos-navy to-transparent" />
    </div>
  );
}

export default function Hero({
  // Two lines from `md`; below that the headline wraps naturally so it does
  // not break mid-measure at 36-48px.
  headline = (
    <>
      <span className="md:block">Your entire service operation, </span>
      <span className="md:block">run on one intelligent platform.</span>
    </>
  ),
  subtext = "Sognos helps service organisations unify demand, workforce, and delivery on Microsoft Dynamics 365 and Copilot-powered workflows.",
  primaryCTA = { name: "Book a Demo" },
  secondaryCTA = { name: "Explore products", href: "/products" },
  children,
}: HeroProps) {
  const { openModal } = useBookDemo();

  // Cinematic scroll, the same treatment sognoscare/Hero.tsx uses: the copy
  // drifts down and fades as the block leaves. The ref is on the copy rather
  // than the section, because the section now also holds the product cards and
  // the trust strip — measuring the whole thing would stretch the progress
  // range over content that is not supposed to move.
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: contentRef,
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
    <section className="relative overflow-hidden bg-sognos-navy pt-40 pb-0 md:pt-44">
      <HeroBlurLayers />

      <motion.div
        ref={contentRef}
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center will-change-transform"
      >
        <motion.h1
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-white text-balance sm:text-5xl md:text-6xl"
        >
          {headline}
        </motion.h1>
        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80 text-pretty md:mt-5"
        >
          {subtext}
        </motion.p>
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-8"
        >
          <button
            type="button"
            onClick={() => openModal()}
            className="min-h-11 rounded-full bg-white px-7 py-3.5 text-base font-medium text-sognos-navy-dark transition-colors duration-300 hover:bg-sognos-blue-accent hover:text-white active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {primaryCTA.name}
          </button>
          <Link
            href={secondaryCTA.href}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-base font-medium text-white transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {secondaryCTA.name}
            <span aria-hidden="true">&#8599;</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Trust strip, inside the hero rather than a sibling below it. Sits
          outside the `max-w-7xl` block above because it brings its own
          container, and above the blur layers' `z-10` gradient so it is not
          washed out by it. */}
      {children && <div className="relative z-10">{children}</div>}
    </section>
  );
}
