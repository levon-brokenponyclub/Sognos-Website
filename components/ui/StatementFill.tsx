"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

// A display statement whose words fill from a faint tone to full heading
// colour as the paragraph crosses the viewport (top at 85% → 35%), after
// customer.io's scroll-read statements. Reduced motion shows it fully filled.

const FROM = "rgba(15, 25, 54, 0.2)";
const TO = "rgba(15, 25, 54, 1)";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const color = useTransform(progress, range, [FROM, TO]);
  return <motion.span style={{ color }}>{word} </motion.span>;
}

export default function StatementFill({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 35%"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={`text-sognos-heading ${className}`}>
      {still
        ? text
        : words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
    </p>
  );
}
