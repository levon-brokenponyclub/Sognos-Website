"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

// AngelList-style intro: image starts at 100vw on load and contracts to
// max-w-7xl (80rem) as the user scrolls the first ~500px of the page.
export default function AboutHeroImage() {
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [0, 500], [0, 1], { clamp: true });
  const maxWidth = useMotionTemplate`calc(100vw - ((100vw - 80rem) * ${progress}))`;
  const borderRadius = useTransform(progress, [0, 1], [0, 12]);

  return (
    <div className="w-full">
      <motion.div
        style={{ maxWidth, borderRadius }}
        className="relative mx-auto aspect-[21/9] w-full overflow-hidden"
      >
        <Image
          src="/images/about/hero-img.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
