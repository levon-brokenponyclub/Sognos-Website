"use client";

// Sognos-refined take on the 21st.dev Enterprise AI Pipeline component
// (`ai-agent-pipeline.tsx`). Same mechanic (animated dashed connectors,
// pulsing status nodes, live message feed, rolling stats) — retooled with
// Sognos tokens, AngelList type, and a flow that maps the actual product
// architecture:
//
//   INTAKE (referral) → PLATFORM (Dynamics 365) → COPILOT (AI layer)
//                                                        │
//                                    ┌───────────────────┼───────────────────┐
//                                    ▼                   ▼                   ▼
//                              SognosCare          SognosRoster       SognosGenogram
//                              (care blue)         (roster blue)      (genogram purple)
//
// Each product output uses its own token colour for the status indicator
// so the three products read as distinct at a glance. Message feed
// narrates a realistic referral → visit-scheduled flow. Stats footer
// counts referrals in real time.
//
// Radius `rounded` (4px) per CLAUDE.md §2. Colours pulled from
// app/tokens.css — no new brand primitives introduced.

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sognos brand palette (hex duplicated here so the SVG can consume them —
// tokens.css vars aren't available inside SVG attributes at runtime).
const ACCENT = "#1d96fc"; // --sognos-blue-accent
const ACCENT_MUTED = "rgba(29,150,252,0.22)";
const ACCENT_MUTED_LOW = "rgba(29,150,252,0.15)";
const NAVY = "#152248"; // --sognos-navy
const NAVY_DARK = "#0f1936"; // --sognos-navy-dark

// Per-product status colours (from --sognos-{product}-base tokens).
const CARE = "#3b6fe0";
const ROSTER = "#59bbf7";
const GENOGRAM = "#91278c";

// Per-product border tint on output nodes — same hue as the status dot,
// at low alpha, so each product card reads as its own family at a glance.
const CARE_BORDER = "rgba(59,111,224,0.28)";
const ROSTER_BORDER = "rgba(89,187,247,0.28)";
const GENOGRAM_BORDER = "rgba(145,39,140,0.32)";

const messages = [
  "Received: New referral · Aged care · Meadowbrook · 08:00",
  "SognosCare: case #C-2024-819 opened · triaged in 42s",
  "Copilot: family context detected · 4 contacts identified",
  "SognosGenogram: family map complete · 2 support gaps flagged",
  "SognosRoster: matching worker · skills + location + compliance",
  "SognosRoster: Emma Clarke assigned · Meadowbrook · 42min ETA",
  "SognosCare: compliance check → Aged Care Quality Standards ✓",
  "Copilot: 7-day follow-up scheduled · risk score 0.32 (low)",
  "Workflow complete. Referral → visit scheduled in 3m 12s.",
  "Idle. Listening for next referral event...",
];

function AnimatedDot({
  path,
  duration,
  delay,
  size,
  opacity,
  color = ACCENT,
}: {
  path: string;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
  color?: string;
}) {
  return (
    <circle r={size} fill={color} opacity={opacity}>
      <animateMotion
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
        path={path}
      />
    </circle>
  );
}

function PulsingDot({
  cx,
  cy,
  color,
  duration,
  delay = 0,
}: {
  cx: number;
  cy: number;
  color: string;
  duration: number;
  delay?: number;
}) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={2.8}
      fill={color}
      animate={{ opacity: [0.15, 1, 0.15] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function StatusIndicator({
  cx,
  cy,
  color,
  pulsing = false,
  duration = 1.9,
  delay = 0,
}: {
  cx: number;
  cy: number;
  color: string;
  pulsing?: boolean;
  duration?: number;
  delay?: number;
}) {
  if (pulsing) {
    return (
      <motion.circle
        cx={cx}
        cy={cy}
        r={3}
        fill={color}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
  }
  return <circle cx={cx} cy={cy} r={3} fill={color} opacity={0.95} />;
}

export default function SognosPipeline() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [referrals, setReferrals] = useState(1247);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2700);

    const referralInterval = setInterval(() => {
      setReferrals((prev) => prev + 1);
    }, 7200);

    return () => {
      clearInterval(messageInterval);
      clearInterval(referralInterval);
    };
  }, []);

  const paths = {
    p1: "M116,88 L158,88",
    p2: "M268,88 L306,88",
    p3: "M411,88 C425,88 435,50 448,50",
    p4: "M411,88 L448,88",
    p5: "M411,88 C425,88 435,126 448,126",
  };

  return (
    <div className="bg-sognos-navy-darkest border border-white/[0.08] rounded overflow-hidden font-sans w-full max-w-[620px] mx-auto">
      {/* Header */}
      <div className="px-[18px] py-[11px] border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-[7px]">
          <motion.span
            className="w-[6px] h-[6px] rounded-full inline-block"
            style={{ backgroundColor: ACCENT }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[10px] text-white/30 tracking-[0.1em] font-mono uppercase">
            Sognos Pipeline · Live
          </span>
        </div>
        <span className="text-[10px] text-white/[0.18] font-mono">
          3 products · 0 errors
        </span>
      </div>

      {/* SVG pipeline. `font-sans` on the svg lets `<text>` elements
          inherit AngelList via CSS cascade — SVG text attributes for
          fontFamily are omitted so the parent class wins. */}
      <svg width="100%" viewBox="0 0 580 172" className="block font-sans">
        <defs>
          <marker
            id="ma-sognos"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path
              d="M2 1.5L7.5 5L2 8.5"
              fill="none"
              stroke={ACCENT_MUTED}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>

        {/* Connection paths — Sognos blue at low alpha */}
        <path
          d={paths.p1}
          fill="none"
          stroke={ACCENT_MUTED}
          strokeWidth="1.5"
          strokeDasharray="3 5"
          markerEnd="url(#ma-sognos)"
        />
        <path
          d={paths.p2}
          fill="none"
          stroke={ACCENT_MUTED}
          strokeWidth="1.5"
          strokeDasharray="3 5"
          markerEnd="url(#ma-sognos)"
        />
        <path
          d={paths.p3}
          fill="none"
          stroke={ACCENT_MUTED_LOW}
          strokeWidth="1.5"
          strokeDasharray="3 5"
        />
        <path
          d={paths.p4}
          fill="none"
          stroke={ACCENT_MUTED_LOW}
          strokeWidth="1.5"
          strokeDasharray="3 5"
        />
        <path
          d={paths.p5}
          fill="none"
          stroke={ACCENT_MUTED_LOW}
          strokeWidth="1.5"
          strokeDasharray="3 5"
        />

        {/* Animated dots — all Sognos accent blue */}
        <AnimatedDot path={paths.p1} duration={1.05} delay={0} size={2.5} opacity={1} />
        <AnimatedDot path={paths.p1} duration={1.05} delay={0.35} size={1.8} opacity={0.65} />
        <AnimatedDot path={paths.p1} duration={1.05} delay={0.7} size={1.3} opacity={0.35} />

        <AnimatedDot path={paths.p2} duration={0.88} delay={0.18} size={2.5} opacity={1} />
        <AnimatedDot path={paths.p2} duration={0.88} delay={0.62} size={1.8} opacity={0.65} />

        <AnimatedDot path={paths.p3} duration={1.3} delay={0.08} size={2.2} opacity={0.9} />
        <AnimatedDot path={paths.p3} duration={1.3} delay={0.65} size={1.5} opacity={0.55} />

        <AnimatedDot path={paths.p4} duration={1.15} delay={0.28} size={2.2} opacity={0.9} />
        <AnimatedDot path={paths.p4} duration={1.15} delay={0.85} size={1.5} opacity={0.55} />

        <AnimatedDot path={paths.p5} duration={1.4} delay={0.45} size={2.2} opacity={0.9} />
        <AnimatedDot path={paths.p5} duration={1.4} delay={1.0} size={1.5} opacity={0.55} />

        {/* Intake node */}
        <rect
          x="16"
          y="66"
          width="100"
          height="44"
          rx="6"
          fill={NAVY_DARK}
          stroke="rgba(255,255,255,0.09)"
          strokeWidth="0.5"
        />
        <text
          x="66"
          y="83"
          textAnchor="middle"
          fontSize="9"
          fill="rgba(255,255,255,0.32)"
          letterSpacing=".08em"
        >
          INTAKE
        </text>
        <text
          x="66"
          y="100"
          textAnchor="middle"
          fontSize="12"
          fill="rgba(255,255,255,0.85)"
        >
          Service Referral
        </text>
        <text
          x="66"
          y="122"
          textAnchor="middle"
          fontSize="8.5"
          fill="rgba(255,255,255,0.2)"
          fontFamily="monospace"
        >
          ref-819
        </text>

        {/* Platform node */}
        <rect
          x="158"
          y="66"
          width="110"
          height="44"
          rx="6"
          fill={NAVY_DARK}
          stroke="rgba(255,255,255,0.09)"
          strokeWidth="0.5"
        />
        <text
          x="213"
          y="83"
          textAnchor="middle"
          fontSize="9"
          fill="rgba(255,255,255,0.32)"
          letterSpacing=".08em"
        >
          PLATFORM
        </text>
        <text
          x="213"
          y="100"
          textAnchor="middle"
          fontSize="12"
          fill="rgba(255,255,255,0.85)"
        >
          Dynamics 365
        </text>
        <text
          x="213"
          y="122"
          textAnchor="middle"
          fontSize="8.5"
          fill="rgba(255,255,255,0.2)"
          fontFamily="monospace"
        >
          d365-core
        </text>

        {/* Copilot AI (elevated centre) */}
        <rect
          x="306"
          y="53"
          width="105"
          height="70"
          rx="8"
          fill={NAVY}
          stroke={ACCENT}
          strokeWidth="1"
        />
        <rect
          x="318"
          y="53.5"
          width="80"
          height="1"
          rx="0.5"
          fill="rgba(29,150,252,0.55)"
        />
        <text
          x="358"
          y="78"
          textAnchor="middle"
          fontSize="9"
          fill="rgba(29,150,252,0.72)"
          letterSpacing=".08em"
        >
          COPILOT · AI
        </text>
        <text
          x="358"
          y="97"
          textAnchor="middle"
          fontSize="13"
          fill="#fff"
          fontWeight="500"
        >
          Coordinating
        </text>
        <PulsingDot cx={346} cy={113} color={ACCENT} duration={1.2} delay={0} />
        <PulsingDot cx={358} cy={113} color={ACCENT} duration={1.2} delay={0.4} />
        <PulsingDot cx={370} cy={113} color={ACCENT} duration={1.2} delay={0.8} />
        <text
          x="358"
          y="139"
          textAnchor="middle"
          fontSize="8.5"
          fill="rgba(29,150,252,0.45)"
          fontFamily="monospace"
        >
          sognos-copilot
        </text>

        {/* SognosCare output */}
        <rect
          x="448"
          y="35"
          width="116"
          height="30"
          rx="5"
          fill={NAVY_DARK}
          stroke={CARE_BORDER}
          strokeWidth="0.75"
        />
        <text
          x="490"
          y="53.5"
          textAnchor="middle"
          fontSize="11"
          fill="rgba(255,255,255,0.72)"
        >
          SognosCare
        </text>
        <StatusIndicator cx={550} cy={43} color={CARE} />

        {/* SognosRoster output */}
        <rect
          x="448"
          y="73"
          width="116"
          height="30"
          rx="5"
          fill={NAVY_DARK}
          stroke={ROSTER_BORDER}
          strokeWidth="0.75"
        />
        <text
          x="490"
          y="91.5"
          textAnchor="middle"
          fontSize="11"
          fill="rgba(255,255,255,0.72)"
        >
          SognosRoster
        </text>
        <StatusIndicator
          cx={550}
          cy={81}
          color={ROSTER}
          pulsing
          duration={1.9}
        />

        {/* SognosGenogram output */}
        <rect
          x="448"
          y="111"
          width="116"
          height="30"
          rx="5"
          fill={NAVY_DARK}
          stroke={GENOGRAM_BORDER}
          strokeWidth="0.75"
        />
        <text
          x="490"
          y="129.5"
          textAnchor="middle"
          fontSize="11"
          fill="rgba(255,255,255,0.72)"
        >
          SognosGenogram
        </text>
        <StatusIndicator
          cx={550}
          cy={119}
          color={GENOGRAM}
          pulsing
          duration={2.2}
          delay={0.35}
        />
      </svg>

      {/* Message feed */}
      <div className="border-t border-white/[0.06] px-[18px] py-[9px] h-[52px]">
        <div className="flex gap-2 items-start h-full">
          <span
            className="font-mono text-[13px] leading-[1.5] shrink-0"
            style={{ color: `${ACCENT}99` }}
          >
            ›
          </span>
          <div className="relative flex-1 overflow-hidden h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={messageIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-[11px] text-white/[0.5] leading-[1.55] absolute inset-0"
              >
                {messages[messageIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Stats footer */}
      <div className="border-t border-white/[0.06] px-[18px] py-[10px] flex gap-[22px] items-center">
        <div>
          <div className="text-[9px] text-white/25 tracking-[0.09em] mb-[3px] uppercase">
            Referrals
          </div>
          <motion.div
            key={referrals}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="text-[16px] text-white/[0.78] font-mono tabular-nums"
          >
            {referrals.toLocaleString()}
          </motion.div>
        </div>
        <div>
          <div className="text-[9px] text-white/25 tracking-[0.09em] mb-[3px] uppercase">
            Active Cases
          </div>
          <div className="text-[16px] text-white/[0.78] font-mono tabular-nums">
            819
          </div>
        </div>
        <div>
          <div className="text-[9px] text-white/25 tracking-[0.09em] mb-[3px] uppercase">
            Avg Response
          </div>
          <div className="text-[16px] text-white/[0.78] font-mono">3m 12s</div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-[9px] text-white/[0.2] tracking-[0.09em] mb-[3px] uppercase">
            Stack
          </div>
          <div
            className="text-[10px] font-mono"
            style={{ color: `${ACCENT}99` }}
          >
            Dynamics 365 · Copilot
          </div>
        </div>
      </div>
    </div>
  );
}
