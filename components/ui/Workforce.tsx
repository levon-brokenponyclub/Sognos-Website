"use client";

import { motion } from "framer-motion";
import HubNode from "@/components/ui/HubNode";

const VB_W = 700;
const VB_H = 320;
const HUB_X = 350;
const HUB_Y = 56;
const HUB_HALF = 32;
const MS_X  = 350;
const MS_Y  = 220;
const HALF  = 24;
const STEP  = 128;
const PA_NL_X = MS_X - STEP;
const PA_FL_X = MS_X - STEP * 2;
const PA_NR_X = MS_X + STEP;
const PA_FR_X = MS_X + STEP * 2;
const PA_Y    = MS_Y;

const L1_X1 = MS_X    - HALF;
const L1_X2 = PA_NL_X + HALF;
const L2_X1 = PA_NL_X - HALF;
const L2_X2 = PA_FL_X + HALF;
const R1_X1 = MS_X    + HALF;
const R1_X2 = PA_NR_X - HALF;
const R2_X1 = PA_NR_X + HALF;
const R2_X2 = PA_FR_X - HALF;
const VERT_Y1 = HUB_Y + HUB_HALF;
const VERT_Y2 = MS_Y  - HALF;

const E = [0.22, 1, 0.36, 1] as const;

function pct(val: number, max: number) {
  return `${((val / max) * 100).toFixed(3)}%`;
}

function IconNode({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm">
      <img src={src} alt={alt} width={28} height={28} />
    </div>
  );
}

function HorizBeam({ id, y, dir, dur, begin }: { id: string; y: number; dir: "ltr" | "rtl"; dur: string; begin: string }) {
  const [x1a, x1b] = dir === "rtl" ? ["500", "-50"] : ["150", "750"];
  const [x2a, x2b] = dir === "rtl" ? ["550", "0"]   : ["100", "700"];
  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={x1a} x2={x2a} y1={y} y2={y}>
      <animate attributeName="x1" values={`${x1a};${x1b};${x1a}`} dur={dur} begin={begin} repeatCount="indefinite" calcMode="linear" />
      <animate attributeName="x2" values={`${x2a};${x2b};${x2a}`} dur={dur} begin={begin} repeatCount="indefinite" calcMode="linear" />
      <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0" />
      <stop offset="40%"  stopColor="#3b82f6" />
      <stop offset="60%"  stopColor="#3b82f6" />
      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
    </linearGradient>
  );
}

// Stagger delays: hub → MS → inner pair → outer pair → SVG
const NODE_ANIMS = [
  { key: "hub",   left: pct(HUB_X, VB_W), top: pct(HUB_Y, VB_H), delay: 0.08,  initial: { opacity: 0, scale: 0.8  }, animate: { opacity: 1, scale: 1  } },
  { key: "ms",    left: pct(MS_X,  VB_W), top: pct(MS_Y,  VB_H), delay: 0.24,  initial: { opacity: 0, y: 10        }, animate: { opacity: 1, y: 0        } },
  { key: "pa_nl", left: pct(PA_NL_X, VB_W), top: pct(PA_Y, VB_H), delay: 0.38, initial: { opacity: 0, x: 10        }, animate: { opacity: 1, x: 0        } },
  { key: "pa_nr", left: pct(PA_NR_X, VB_W), top: pct(PA_Y, VB_H), delay: 0.38, initial: { opacity: 0, x: -10       }, animate: { opacity: 1, x: 0        } },
  { key: "pa_fl", left: pct(PA_FL_X, VB_W), top: pct(PA_Y, VB_H), delay: 0.50, initial: { opacity: 0, x: 10        }, animate: { opacity: 1, x: 0        } },
  { key: "pa_fr", left: pct(PA_FR_X, VB_W), top: pct(PA_Y, VB_H), delay: 0.50, initial: { opacity: 0, x: -10       }, animate: { opacity: 1, x: 0        } },
];

const NODE_CONTENT: Record<string, React.ReactNode> = {
  hub:   <HubNode />,
  ms:    <IconNode src="/logos/Microsoft-icon-logo.svg"    alt="Microsoft" />,
  pa_nl: <IconNode src="/logos/PowerPages_scalable.svg"    alt="Power Pages" />,
  pa_nr: <IconNode src="/logos/PowerApps_scalable.svg"     alt="Power Apps" />,
  pa_fl: <IconNode src="/logos/PowerPlatform_scalable.svg" alt="Power Platform" />,
  pa_fr: <IconNode src="/logos/PowerAutomate_scalable.svg" alt="Power Automate" />,
};

export default function Workforce({ trigger = false }: { trigger?: boolean }) {
  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: VB_W, aspectRatio: `${VB_W}/${VB_H}` }} aria-hidden="true">

      {/* Nodes — stagger hub → MS → inner pair → outer pair */}
      {NODE_ANIMS.map((n) => (
        <motion.div
          key={n.key}
          className="absolute"
          style={{ left: n.left, top: n.top, translate: "-50% -50%" }}
          initial={n.initial}
          animate={trigger ? n.animate : n.initial}
          transition={{ duration: 0.5, delay: n.delay, ease: E }}
        >
          {NODE_CONTENT[n.key]}
        </motion.div>
      ))}

      {/* SVG — fades in after all nodes */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={trigger ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.62 }}
      >
        <svg className="h-full w-full" viewBox={`0 0 ${VB_W} ${VB_H}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad-vert-wf" gradientUnits="userSpaceOnUse" x1={MS_X} x2={MS_X} y1="-50" y2="0">
              <animate attributeName="y1" values="-50;350;-50" dur="3s"  repeatCount="indefinite" calcMode="linear" />
              <animate attributeName="y2" values="0;400;0"     dur="3s"  repeatCount="indefinite" calcMode="linear" />
              <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="40%"  stopColor="#3b82f6" />
              <stop offset="60%"  stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <HorizBeam id="grad-l1-wf" y={PA_Y} dir="rtl" dur="2.5s" begin="0.6s" />
            <HorizBeam id="grad-l2-wf" y={PA_Y} dir="rtl" dur="2.5s" begin="0.9s" />
            <HorizBeam id="grad-r1-wf" y={PA_Y} dir="ltr" dur="2.5s" begin="0.6s" />
            <HorizBeam id="grad-r2-wf" y={PA_Y} dir="ltr" dur="2.5s" begin="0.9s" />
          </defs>
          <line x1={HUB_X} y1={VERT_Y1} x2={HUB_X} y2={VERT_Y2} stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={L1_X1} y1={PA_Y}    x2={L1_X2} y2={PA_Y}    stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={L2_X1} y1={PA_Y}    x2={L2_X2} y2={PA_Y}    stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={R1_X1} y1={PA_Y}    x2={R1_X2} y2={PA_Y}    stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={R2_X1} y1={PA_Y}    x2={R2_X2} y2={PA_Y}    stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={HUB_X} y1={VERT_Y1} x2={HUB_X} y2={VERT_Y2} stroke="url(#grad-vert-wf)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={L1_X1} y1={PA_Y}    x2={L1_X2} y2={PA_Y}    stroke="url(#grad-l1-wf)"   strokeWidth="1.5" strokeLinecap="round" />
          <line x1={L2_X1} y1={PA_Y}    x2={L2_X2} y2={PA_Y}    stroke="url(#grad-l2-wf)"   strokeWidth="1.5" strokeLinecap="round" />
          <line x1={R1_X1} y1={PA_Y}    x2={R1_X2} y2={PA_Y}    stroke="url(#grad-r1-wf)"   strokeWidth="1.5" strokeLinecap="round" />
          <line x1={R2_X1} y1={PA_Y}    x2={R2_X2} y2={PA_Y}    stroke="url(#grad-r2-wf)"   strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>

    </div>
  );
}
