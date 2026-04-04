"use client";

import { useEffect, useRef } from "react";

type Props = {
  variant: "radial" | "arc";
  className?: string;
};

export default function ParticleCanvas({ variant, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    if (variant === "radial") {
      type RadialParticle = {
        x: number; y: number; vx: number; vy: number;
        radius: number; alpha: number; color: string;
      };
      let particles: RadialParticle[] = [];

      const init = () => {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        particles = [];
        for (let i = 0; i < 300; i++) {
          particles.push({
            x: width / 2 + (Math.random() - 0.5) * 150,
            y: height * 0.4 + (Math.random() - 0.5) * 200,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2 - 0.1,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.6 + 0.1,
            color: "rgba(79, 70, 229, ",
          });
        }
      };

      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < 0) p.y = height;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          const dx = p.x - width / 2;
          const dy = p.y - height * 0.4;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const dynamicAlpha = Math.max(0, p.alpha * (1 - dist / 250));
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color + dynamicAlpha + ")";
          ctx.fill();
        });
        animId = requestAnimationFrame(animate);
      };

      init();
      animate();
      window.addEventListener("resize", init);
      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", init);
      };
    } else {
      type ArcParticle = {
        x: number; y: number; originX: number; originY: number;
        radius: number; alpha: number; color: string;
        offset: number; speed: number;
      };
      let particles: ArcParticle[] = [];

      const init = () => {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        particles = [];
        const centerX = width * 1.2;
        const centerY = height * 0.8;
        const baseRadius = width * 0.9;

        for (let i = 0; i < 1500; i++) {
          const angle = Math.PI + Math.random() * Math.PI * 0.65;
          const r = baseRadius + (Math.random() - 0.5) * 120 * Math.random();
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          const normalizedX = Math.max(0, Math.min(1, x / width));

          const rCol = Math.round(59 + (6 - 59) * normalizedX);
          const gCol = Math.round(130 + (182 - 130) * normalizedX);
          const bCol = Math.round(246 + (212 - 246) * normalizedX);

          particles.push({
            x, y, originX: x, originY: y,
            radius: Math.random() * 1.2 + 0.3,
            alpha: Math.random() * 0.5 + 0.1,
            color: `rgba(${rCol}, ${gCol}, ${bCol}, `,
            offset: Math.random() * Math.PI * 2,
            speed: 0.01 + Math.random() * 0.02,
          });
        }
      };

      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        const time = Date.now() * 0.001;
        particles.forEach((p) => {
          const floatX = Math.sin(time * p.speed + p.offset) * 2;
          const floatY = Math.cos(time * p.speed + p.offset) * 2;
          ctx.beginPath();
          ctx.arc(p.originX + floatX, p.originY + floatY, p.radius, 0, Math.PI * 2);
          const twinkle = Math.sin(time * 3 + p.offset) * 0.5 + 0.5;
          const finalAlpha = p.alpha * (0.5 + twinkle * 0.5);
          ctx.fillStyle = p.color + finalAlpha + ")";
          ctx.fill();
        });
        animId = requestAnimationFrame(animate);
      };

      init();
      animate();
      window.addEventListener("resize", init);
      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", init);
      };
    }
  }, [variant]);

  return <canvas ref={canvasRef} className={className} />;
}
