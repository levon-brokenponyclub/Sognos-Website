"use client";

import { useEffect, useRef } from "react";

const DEFAULT_COLORS: [string, string, string] = [
  "rgba(186, 230, 253, 0.5)",
  "rgba(56, 189, 248, 0.5)",
  "rgba(2, 132, 199, 0.5)",
];

type Props = {
  colors?: [string, string, string];
};

export default function FlowCanvas({ colors = DEFAULT_COLORS }: Props = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorsRef = useRef(colors);
  colorsRef.current = colors;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let time = 0;
    let animId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    function resize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      time += 0.003;

      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      const gradient = ctx!.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, colorsRef.current[0]);
      gradient.addColorStop(0.5, colorsRef.current[1]);
      gradient.addColorStop(1, colorsRef.current[2]);

      ctx!.strokeStyle = gradient;
      ctx!.globalCompositeOperation = "screen";

      const numLines = 85;
      const centerY = height * 0.65;

      for (let i = 0; i < numLines; i++) {
        ctx!.beginPath();

        const z = Math.sin(i * 0.1 + time) * 0.5 + 0.5;
        ctx!.lineWidth = 0.5 + z * 1.5;
        ctx!.globalAlpha = 0.15 + z * 0.3;

        for (let x = 0; x <= width; x += 15) {
          const nx = x / width;

          const wave1 = Math.sin(nx * 4 - time * 1.5 + i * 0.04) * 60 * nx;
          const wave2 = Math.cos(nx * 2.5 + time * 0.8 - i * 0.06) * 120 * (1 - nx);

          const pinch = Math.pow(nx - 0.35, 2) * 3;
          const spread = 180 * pinch + 10;

          let y = centerY + wave1 + wave2 + (i - numLines / 2) * spread * 0.025;

          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 250;

          if (dist < radius) {
            const force = Math.pow((radius - dist) / radius, 2);
            y += (dy / dist) * force * 60;
          }

          if (x === 0) {
            ctx!.moveTo(x, y);
          } else {
            ctx!.lineTo(x, y);
          }
        }

        ctx!.stroke();
      }

      animId = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    }

    function onMouseLeave() {
      targetMouseX = -1000;
      targetMouseY = -1000;
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
