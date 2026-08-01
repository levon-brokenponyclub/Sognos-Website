"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

const transition = {
  duration: 0.36,
  ease: [0.33, 1, 0.68, 1],
} as const;

const exitTransition = {
  duration: 0.3,
  ease: [0.33, 1, 0.68, 1],
} as const;

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition },
          exit: { opacity: 0, transition: exitTransition },
        }}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="will-change-opacity"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
