"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const ENTRANCE_EASE = [0.22, 1, 0.36, 1] as const;

type AnimatedEyebrowProps = {
  children: ReactNode;
  className?: string;
  dotClassName?: string;
  textClassName?: string;
};

export function AnimatedEyebrow({
  children,
  className,
  dotClassName,
  textClassName,
}: AnimatedEyebrowProps) {
  const prefersReducedMotion = useReducedMotion();
  const viewport = { once: true, amount: 0.6 };

  return (
    <motion.div
      initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewport}
      transition={{
        duration: 0.3,
        delay: prefersReducedMotion ? 0 : 0.3,
      }}
      className={cn("inline-flex items-center gap-3", className)}
    >
      <motion.span
        aria-hidden="true"
        initial={{
          opacity: prefersReducedMotion ? 1 : 0,
          y: prefersReducedMotion ? 0 : 20,
        }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{
          duration: 0.45,
          delay: prefersReducedMotion ? 0 : 0.3,
          ease: ENTRANCE_EASE,
        }}
        className={cn(
          "size-[9px] shrink-0 bg-sognos-blue-accent",
          dotClassName,
        )}
      />
      <motion.span
        initial={{
          opacity: prefersReducedMotion ? 1 : 0,
          x: prefersReducedMotion ? 0 : 10,
        }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewport}
        transition={{
          duration: 0.45,
          delay: prefersReducedMotion ? 0 : 0.65,
          ease: ENTRANCE_EASE,
        }}
        className={cn(
          "text-xs font-normal uppercase tracking-widest text-sognos-blue-accent",
          textClassName,
        )}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
