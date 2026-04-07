"use client";

import { motion } from "framer-motion";
import HubNode from "@/components/ui/HubNode";

const VB_W = 640;
const VB_H = 200;
const HUB_X = 568;
const HUB_Y = 100;
const HUB_HALF = 32;
const LINE_X = 148;
const CR = 12;

const E = [0.22, 1, 0.36, 1] as const;

function pct(val: number, max: number) {
  return `${((val / max) * 100).toFixed(3)}%`;
}

const INPUTS = [
  {
    id: "referrals",
    label: "Service Referrals",
    y: 30,
    color: "#F17463",
    dur: 1.8,
    delay: 0,
    d: `M ${LINE_X},30 H ${HUB_X - CR} Q ${HUB_X},30 ${HUB_X},${30 + CR} V ${HUB_Y - HUB_HALF}`,
  },
  {
    id: "careplans",
    label: "Care Plans",
    y: HUB_Y,
    color: "#3b82f6",
    dur: 1.5,
    delay: 0.4,
    d: `M ${LINE_X},${HUB_Y} H ${HUB_X - HUB_HALF}`,
  },
  {
    id: "workorders",
    label: "Work Orders",
    y: 170,
    color: "#eab308",
    dur: 1.8,
    delay: 0.8,
    d: `M ${LINE_X},170 H ${HUB_X - CR} Q ${HUB_X},170 ${HUB_X},${170 - CR} V ${HUB_Y + HUB_HALF}`,
  },
];

const IconReferrals = () => (
  <svg width="16" height="16" viewBox="0 0 16 17" fill="none">
    <path d="M13.3333 3.1665H2.66659C1.93021 3.1665 1.33325 3.76346 1.33325 4.49984V12.4998C1.33325 13.2362 1.93021 13.8332 2.66659 13.8332H13.3333C14.0696 13.8332 14.6666 13.2362 14.6666 12.4998V4.49984C14.6666 3.76346 14.0696 3.1665 13.3333 3.1665Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 5.8335H4.00583M6.66675 5.8335H6.67258M9.33325 5.8335H9.33909" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCarePlans = () => (
  <svg width="16" height="16" viewBox="0 0 16 17" fill="none">
    <path d="M10.6667 12.5L14.6667 8.5L10.6667 4.5" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.33325 4.5L1.33325 8.5L5.33325 12.5" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconWorkOrders = () => (
  <svg width="16" height="16" viewBox="0 0 16 17" fill="none">
    <path d="M9.22125 11.5453C9.35894 11.6085 9.51405 11.6229 9.66105 11.5862C9.80804 11.5495 9.93814 11.4638 10.0299 11.3433L10.2666 11.0333C10.3908 10.8677 10.5518 10.7333 10.737 10.6407C10.9221 10.5481 11.1263 10.4999 11.3333 10.4999H13.3333C13.6869 10.4999 14.026 10.6404 14.2761 10.8904C14.5261 11.1405 14.6666 11.4796 14.6666 11.8333V13.8333C14.6666 14.1869 14.5261 14.526 14.2761 14.7761C14.026 15.0261 13.6869 15.1666 13.3333 15.1666C10.1507 15.1666 7.09841 13.9023 4.84797 11.6519C2.59753 9.40143 1.33325 6.34918 1.33325 3.16659C1.33325 2.81296 1.47373 2.47382 1.72378 2.22378C1.97382 1.97373 2.31296 1.83325 2.66659 1.83325H4.66659C5.02021 1.83325 5.35935 1.97373 5.60939 2.22378C5.85944 2.47382 5.99992 2.81296 5.99992 3.16659V5.16659C5.99992 5.37358 5.95173 5.57773 5.85915 5.76287C5.76658 5.94801 5.63218 6.10906 5.46658 6.23325L5.15458 6.46725C5.0322 6.5607 4.94593 6.69364 4.91045 6.84349C4.87496 6.99333 4.89244 7.15084 4.95992 7.28925C5.87104 9.13983 7.36953 10.6364 9.22125 11.5453Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICONS = [<IconReferrals key="r" />, <IconCarePlans key="c" />, <IconWorkOrders key="w" />];

export default function ProcessFlow({ trigger = false }: { trigger?: boolean }) {
  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: VB_W, aspectRatio: `${VB_W}/${VB_H}` }} aria-hidden="true">

      {/* Input nodes — stagger in from left */}
      {INPUTS.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute flex items-center gap-2"
          style={{ left: 0, top: pct(node.y, VB_H), translate: "0 -50%" }}
          initial={{ opacity: 0, x: -14 }}
          animate={trigger ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
          transition={{ duration: 0.5, delay: 0.08 + i * 0.12, ease: E }}
        >
          <span className="text-neutral-500">{ICONS[i]}</span>
          <span className="text-sm font-medium text-neutral-700 whitespace-nowrap">
            {node.label}
          </span>
        </motion.div>
      ))}

      {/* Hub — scales in after nodes */}
      <motion.div
        className="absolute"
        style={{ left: pct(HUB_X, VB_W), top: pct(HUB_Y, VB_H), translate: "-50% -50%" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={trigger ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, delay: 0.45, ease: E }}
      >
        <HubNode />
      </motion.div>

      {/* SVG — fades in after all nodes */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={trigger ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.58 }}
      >
        <svg
          className="w-full h-full"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {INPUTS.map((node) => (
              <linearGradient key={`grad-${node.id}`} id={`grad-${node.id}`} gradientUnits="userSpaceOnUse" x1="-100" x2="-50" y1="0" y2="0">
                <animate attributeName="x1" values="-100;700" dur={`${node.dur}s`} begin={`${node.delay}s`} repeatCount="indefinite" calcMode="linear" />
                <animate attributeName="x2" values="-50;750"  dur={`${node.dur}s`} begin={`${node.delay}s`} repeatCount="indefinite" calcMode="linear" />
                <stop offset="0%"   stopColor={node.color} stopOpacity="0" />
                <stop offset="40%"  stopColor={node.color} />
                <stop offset="60%"  stopColor={node.color} />
                <stop offset="100%" stopColor={node.color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
          {INPUTS.map((node) => (
            <path key={`track-${node.id}`} d={node.d} stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          ))}
          {INPUTS.map((node) => (
            <path key={`beam-${node.id}`} d={node.d} stroke={`url(#grad-${node.id})`} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          ))}
        </svg>
      </motion.div>

    </div>
  );
}
