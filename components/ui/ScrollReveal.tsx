"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  /** translateY start value in px — default 40 matches AngelList */
  y?: number;
  /** Optional scale start value e.g. 0.97 for logo items */
  scale?: number;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  y = 40,
  scale,
  delay = 0,
  duration = 0.65,
  className,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, ...(scale !== undefined ? { scale } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(scale !== undefined ? { scale: 1 } : {}) }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
