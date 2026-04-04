"use client";

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  className?: string;
};

export default function LottiePlayer({ src, className }: Props) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    fetch(src)
      .then((r) => r.json())
      .then(setAnimationData);
  }, [src]);

  useEffect(() => {
    if (!animationData || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          lottieRef.current?.play();
          obs.disconnect();
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [animationData]);

  if (!animationData) return null;

  return (
    <div ref={containerRef} className={className}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={false}
        loop={false}
      />
    </div>
  );
}
