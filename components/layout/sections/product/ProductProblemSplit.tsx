"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";
import { PRODUCT_THEME, type ProductKey } from "./theme";

export type ProblemItem = {
  number: string;
  title: string;
  description: string;
};

interface ProductProblemSplitProps {
  product: ProductKey;
  label?: string;
  statement: string;
  detail: string;
  /** Optional closing line under the detail (SognosCare's solution line). */
  solutionStatement?: string;
  items: readonly ProblemItem[];
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Products Inspector · Problem A "Split", product tone: sticky statement
// column (5) beside numbered hairline rows (7) on the product colour.
// Text below 24px stays full white: white is only 4.6:1 on Care base.
export default function ProductProblemSplit({
  product,
  label = "The problem",
  statement,
  detail,
  solutionStatement,
  items,
}: ProductProblemSplitProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="problems"
      className={`text-white ${PRODUCT_THEME[product].tone} ${LAYOUT.section} ${LAYOUT.anchor}`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-4 lg:sticky lg:top-36 lg:col-span-5 lg:self-start">
          <SectionLabel tone="dark" markerClassName="bg-white" className="text-white">
            {label}
          </SectionLabel>
          <h2 className={`${TYPE.h2} text-white`}>{statement}</h2>
          <p className={`${TYPE.lede} text-white`}>{detail}</p>
          {solutionStatement && (
            <p className={`mt-4 ${TYPE.h3Small} text-white`}>
              {solutionStatement}
            </p>
          )}
        </div>

        <ol className="lg:col-span-7">
          {items.map((item, i) => (
            <motion.li
              key={item.number}
              initial={
                prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.55,
                ease: EASE_OUT,
                delay: prefersReducedMotion ? 0 : i * 0.08,
              }}
              className="grid grid-cols-[3rem_1fr] gap-4 border-t border-white/20 py-6 last:border-b"
            >
              <span className="font-heading text-2xl tabular-nums text-white/80">
                {item.number}
              </span>
              <div>
                <h3 className={`${TYPE.h3Small} text-white md:text-xl`}>
                  {item.title}
                </h3>
                <p className={`mt-2 ${TYPE.body} text-white`}>
                  {item.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
