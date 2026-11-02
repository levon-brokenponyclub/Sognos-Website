"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";
import { PRODUCT_THEME, type ProductKey } from "./theme";

export type AdvantagesHeader = {
  eyebrow?: string;
  heading: string;
  intro?: string;
};

interface ProductAdvantagesIndexProps {
  product: ProductKey;
  header: AdvantagesHeader;
  advantages: readonly string[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// Products Inspector · Advantages C, product tone: sticky header column (4)
// beside oversized numbered rows (8) on the product colour. The marker is
// the SognosCare colour set's accent, shared by every product.
export default function ProductAdvantagesIndex({
  product,
  header,
  advantages,
}: ProductAdvantagesIndexProps) {
  return (
    <section
      id="advantages"
      className={`w-full text-white ${PRODUCT_THEME[product].tone} ${LAYOUT.section} ${LAYOUT.anchor}`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-4 lg:sticky lg:top-36 lg:col-span-4 lg:self-start">
          <SectionLabel tone="dark" markerClassName="bg-sognos-blue-accent" className="text-white">
            {header.eyebrow ?? "Advantages"}
          </SectionLabel>
          <h2 className={`${TYPE.h2} text-white`}>{header.heading}</h2>
          {header.intro && (
            <p className={`${TYPE.lede} text-white`}>{header.intro}</p>
          )}
        </div>

        <motion.ol
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          className="lg:col-span-8"
        >
          {advantages.map((advantage, i) => (
            <motion.li
              key={advantage}
              variants={itemVariants}
              className="grid grid-cols-[4rem_1fr] items-baseline gap-4 border-t border-white/20 py-6 md:grid-cols-[6rem_1fr]"
            >
              <span className="font-heading text-4xl tabular-nums text-white/80 md:text-5xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className={`${TYPE.h3} text-white`}>{advantage}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
