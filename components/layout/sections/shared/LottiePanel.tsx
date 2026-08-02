"use client";

// A Lottie in the TimerCardDeck panel, in place of a still.
//
// The JSON is fetched at runtime rather than imported. A static import would
// put the whole animation — 356KB for the one in use — into the client bundle
// for every visitor to the page, whether or not they ever reach the section.
// Fetching keeps it out of the bundle and behind a normal HTTP cache.
import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";

export default function LottiePanel({
  src,
  active,
  className,
}: {
  src: string;
  /** Plays only while its slide is the visible one — 53 layers at 60fps is not
   *  work worth doing behind an opacity of 0. */
  active: boolean;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [data, setData] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((json) => {
        if (!cancelled) setData(json);
      })
      // A panel that fails to load stays empty on the deck's own background
      // rather than taking the section down with it.
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    const player = lottieRef.current;
    if (!player || !data) return;
    if (active && !prefersReducedMotion) player.play();
    else player.pause();
  }, [active, data, prefersReducedMotion]);

  if (!data) return null;

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={data}
      loop
      autoplay={false}
      // `meet` rather than `slice`: this animation is 1.41:1 against a much
      // wider panel, and slicing to fill would cut roughly half its height.
      // It sits letterboxed on the panel's own background instead.
      rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
      className={className}
    />
  );
}
