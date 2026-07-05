"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export default function HeroScrollFade({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const heroRef = useRef<HTMLElement>(null);
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
    <section ref={heroRef} className={className}>
      <motion.div style={{ y, opacity }} className="will-change-transform">
        {children}
      </motion.div>
    </section>
  );
}
