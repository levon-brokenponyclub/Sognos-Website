"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

// AngelList /careers-style hero image.
// Two scroll-linked effects, both driven off window scrollY over the first
// 600px so they progress in lockstep.
//
// 1. Desktop-visible container shrink — max-width interpolates from 100vw to
//    80rem (max-w-7xl). Invisible on mobile because 80rem > viewport, so the
//    cap doesn't restrict. Corners round from 0 → 12px as it shrinks.
// 2. Vertical parallax on the image — translateY starts at -70px (bottom of
//    source visible in the crop, matches AngelList devtools value) and
//    settles at 0. The image is 60px taller than its container so it has
//    room to translate.
export default function AboutHeroImage({
  src = "/images/about/sognos-team.webp",
  alt = "",
}: {
  src?: string;
  alt?: string;
}) {
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [0, 600], [0, 1], { clamp: true });

  const maxWidth = useMotionTemplate`calc(100vw - ((100vw - 84rem) * ${progress}))`;
  const borderRadius = useTransform(progress, [0, 1], [0, 12]);
  const y = useTransform(progress, [0, 1], [-70, 0]);

  return (
    <motion.div
      style={{ maxWidth, borderRadius }}
      className="mx-auto w-full overflow-hidden"
    >
      <div className="relative overflow-hidden pt-[100vw] sm:pt-[35vw] xl:pt-[590px]">
        <motion.div
          style={{ y }}
          className="absolute left-0 top-0 h-full w-full"
        >
          <Image
            src={src}
            alt={alt}
            width={2016}
            height={768}
            priority
            sizes="100vw"
            className="absolute left-0 top-0 min-h-[calc(100%+60px)] w-full object-cover"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
