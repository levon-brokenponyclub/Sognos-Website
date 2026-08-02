"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useBookDemo } from "@/lib/BookDemoContext";

type HeroProps = {
  headline?: React.ReactNode;
  subtext?: string;
  primaryCTA?: { name: string };
  secondaryCTA?: { name: string; href: string };
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
  headline = (
    <>
      Your entire service operation,
      <br />
      run on one intelligent platform.
    </>
  ),
  subtext = "Sognos helps service organisations unify demand, workforce, and delivery on Microsoft Dynamics 365 and Copilot-powered workflows.",
  primaryCTA = { name: "Book a Demo" },
  secondaryCTA = { name: "Explore products", href: "/products" },
}: HeroProps) {
  const { openModal } = useBookDemo();

  return (
    <section className="relative overflow-hidden bg-sognos-navy pt-40 pb-20">
      <HeroBlurLayers />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-left lg:text-center">
        <motion.h1
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-[1128px] font-heading font-normal text-white text-5xl tracking-tight text-balance lg:text-6xl"
        >
          {headline}
        </motion.h1>
        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-white/80"
        >
          {subtext}
        </motion.p>
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {/* Book a Demo — matches SognosCare hero pill */}
          <button
            type="button"
            onClick={() => openModal()}
            className="group/demo relative overflow-hidden rounded-sm bg-white px-7 py-3.5 text-base font-medium text-sognos-navy-dark transition-colors duration-300"
          >
            <span className="absolute bottom-0 left-0 h-40 w-full origin-bottom translate-y-full rounded-[50px] bg-sognos-blue-accent transition-transform duration-300 ease-out group-hover/demo:translate-y-12" />
            <span className="relative z-10 transition-colors duration-300 group-hover/demo:text-white">
              {primaryCTA.name}
            </span>
          </button>
          <Link
            href={secondaryCTA.href}
            className="inline-flex items-center gap-1.5 text-base font-medium text-white transition-opacity hover:opacity-80"
          >
            {secondaryCTA.name}
            <span aria-hidden="true">&#8599;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
