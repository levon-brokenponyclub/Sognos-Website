"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

// AngelList /careers-style hero image.
// Two scroll-linked effects, both driven off the image's own position so they
// play while it is on screen (not off global scrollY, which had finished
// before the image arrived):
//
// 1. Desktop-visible container shrink — max-width interpolates from 100vw to
//    84rem. Invisible on mobile because 84rem > viewport, so the cap doesn't
//    restrict. Corners round from 0 → 8px (`rounded-lg`, the hero-scale cap).
// 2. Vertical parallax on the image — translateY starts at -70px (bottom of
//    source visible in the crop, matches AngelList devtools value) and
//    settles at 0. The image is 60px taller than its container so it has
//    room to translate.
export default function AboutHeroImage({
  src = "/images/about/sognos-team.webp",
  alt = "The Sognos team",
}: {
  src?: string;
  alt?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // From "image top meets viewport bottom" to "image top meets viewport top".
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const maxWidth = useMotionTemplate`calc(100vw - ((100vw - 84rem) * ${scrollYProgress}))`;
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const y = useTransform(scrollYProgress, [0, 1], [-70, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ maxWidth, borderRadius }}
      className="mx-auto w-full overflow-hidden"
    >
      {/* Mobile: 16:10 crop rather than a full square, so portrait phones
          don't spend a whole viewport on the photo before the story starts. */}
      <div className="relative overflow-hidden pt-[62.5%] sm:pt-[35vw] xl:pt-[590px]">
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
