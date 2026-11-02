import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { loadFont as loadInterTight } from "@remotion/google-fonts/InterTight";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// SognosCare hero video (plan 2026-11-02): one client from referral to
// review, as frosted product cards over the Care photo + wash — the same
// language as the Paraform panels on the site. One continuous take, no cuts,
// no sound. Frame-driven (no timers) so renders are deterministic. Card data
// is illustrative.
//
// Scenes: 1 Open · 2 Intake · 3 Plan + Copilot · 4 Compliance · 5 Outcomes ·
// 6 Resolve. Loops seamlessly: the push-in returns to 1 and everything over
// the photo has faded out by the last frame, which is how frame 0 opens.

export const FPS = 30;
export const FRAMES = 300;

const { fontFamily: HEADING } = loadInterTight("normal", { weights: ["400", "500"], subsets: ["latin"] });
const { fontFamily: BODY } = loadInter("normal", { weights: ["400", "500"], subsets: ["latin"] });

// app/tokens.css
const C = {
  careDeep: "#0f1936",
  careBase: "#3b6fe0",
  careSoft: "#eef3fd",
  careTint: "#dfe7fb",
  careAccent: "#8ea8f0",
  heading: "#0f1936",
  muted: "#68706f",
  line: "#e2e8f0",
  accent: "#1d96fc",
  amber: "#ffad6e",
  green: "#00a98f",
};

// Scene windows [start, end) in frames.
const S = {
  open: [0, 45],
  intake: [45, 108],
  copilot: [108, 168],
  compliance: [168, 228],
  outcomes: [228, 270],
  resolve: [270, 300],
} as const;

// Scene cards are laid out at 1× and zoomed, so text stays crisp.
const UI = 1.35;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0→1 on the site's ease-out, settling over ~0.8s from `start`. */
function riseAt(frame: number, start: number) {
  return spring({ frame: frame - start, fps: FPS, config: { damping: 200 }, durationInFrames: 24 });
}

function rise(p: number, distance = 16): CSSProperties {
  return { opacity: p, transform: `translateY(${(1 - p) * distance}px)` };
}

/** 0→1 across [from, to]. */
function progress(frame: number, from: number, to: number) {
  return interpolate(frame, [from, to], [0, 1], clamp);
}

function Frosted({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.6)",
        borderRadius: 8,
        color: C.heading,
        fontFamily: BODY,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** A centred card that rises in at its scene start and lifts out at its end. */
function SceneCard({
  frame,
  window: [start, end],
  width = 760,
  children,
}: {
  frame: number;
  window: readonly [number, number];
  width?: number;
  children: ReactNode;
}) {
  if (frame < start || frame >= end) return null;
  const inP = riseAt(frame, start + 2);
  const out = progress(frame, end - 12, end);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 70 }}>
      <Frosted
        style={{
          zoom: UI,
          width,
          padding: 28,
          opacity: inP * (1 - out),
          transform: `translateY(${(1 - inP) * 24 - out * 16}px)`,
        }}
      >
        {children}
      </Frosted>
    </AbsoluteFill>
  );
}

function CardTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
      <p style={{ margin: 0, fontFamily: HEADING, fontSize: 30 }}>{children}</p>
      {aside}
    </div>
  );
}

function Chip({ tone, children }: { tone: "amber" | "green" | "care"; children: ReactNode }) {
  const dot = { amber: C.amber, green: C.green, care: C.careBase }[tone];
  const bg = { amber: "rgba(255,173,110,0.18)", green: "rgba(0,169,143,0.12)", care: C.careSoft }[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        borderRadius: 999,
        padding: "6px 14px",
        fontSize: 18,
        fontWeight: 500,
        background: bg,
      }}
    >
      <span style={{ width: 10, height: 10, borderRadius: 999, background: dot }} />
      {children}
    </span>
  );
}

function Tick({ p }: { p: number }) {
  return (
    <span
      style={{
        display: "inline-flex",
        width: 28,
        height: 28,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        border: `1.5px solid ${p > 0 ? C.green : C.line}`,
        background: p > 0 ? `rgba(0,169,143,${0.15 * p})` : "transparent",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M2.5 7.5l3 3 6-7"
          stroke={C.green}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - p}
        />
      </svg>
    </span>
  );
}

// ── Scene 1 · Open: logo + line, then the logo lifts to a header lockup ──────

function Open({ frame }: { frame: number }) {
  const logoIn = riseAt(frame, 6);
  const lineIn = riseAt(frame, 14);
  const lift = progress(frame, S.intake[0] - 6, S.intake[0] + 10);
  // Logo fades out with the record at the end, so the loop restarts clean.
  const end = progress(frame, FRAMES - 10, FRAMES - 1);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          opacity: 1 - end,
          transform: `translateY(${lift * -300}px) scale(${1 - lift * 0.45})`,
        }}
      >
        <Img
          src={staticFile("logos/sognos-care-logo-color.svg")}
          style={{ height: 88, filter: "brightness(0) invert(1)", ...rise(logoIn) }}
        />
        <p
          style={{
            margin: 0,
            fontFamily: HEADING,
            fontSize: 48,
            letterSpacing: "-0.01em",
            color: "white",
            ...rise(lineIn),
            opacity: lineIn * (1 - lift),
          }}
        >
          One record. Every step of care.
        </p>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene 2 · Intake: a referral fills in and becomes an active client ──────

const FIELDS = [
  ["Client", "Margaret Turner"],
  ["Funding", "NDIS · Core supports"],
  ["Primary need", "Personal care, 3× weekly"],
  ["Referred by", "GP referral"],
] as const;

function Intake({ frame }: { frame: number }) {
  const f = frame - S.intake[0];
  const active = progress(f, 50, 58);
  return (
    <SceneCard frame={frame} window={S.intake}>
      <CardTitle
        aside={
          <span style={{ opacity: Math.abs(active - 0.5) * 2 }}>
            {active > 0.5 ? <Chip tone="green">Active client</Chip> : <Chip tone="amber">Referral</Chip>}
          </span>
        }
      >
        New referral
      </CardTitle>
      <dl style={{ margin: "22px 0 0", borderTop: `1px solid ${C.line}` }}>
        {FIELDS.map(([label, value], i) => {
          const typed = progress(f, 8 + i * 10, 18 + i * 10);
          return (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "14px 0",
                borderBottom: `1px solid ${C.line}`,
                fontSize: 20,
              }}
            >
              <dt style={{ color: C.muted }}>{label}</dt>
              <dd style={{ margin: 0 }}>{value.slice(0, Math.round(typed * value.length))}</dd>
            </div>
          );
        })}
      </dl>
    </SceneCard>
  );
}

// ── Scene 3 · Plan + Copilot: a progress note drafts itself ─────────────────

const NOTE =
  "Visited 9:00 am. Assisted with shower and breakfast. Mood bright, mobility stable. Goal: walk to the letterbox daily — on track.";

function Copilot({ frame }: { frame: number }) {
  const f = frame - S.copilot[0];
  const typed = progress(f, 6, 36);
  const ready = riseAt(f, 38);
  return (
    <SceneCard frame={frame} window={S.copilot}>
      <CardTitle aside={<Chip tone="care">Copilot</Chip>}>Progress note · M. Turner</CardTitle>
      <p
        style={{
          margin: "22px 0 0",
          minHeight: 96,
          fontSize: 22,
          lineHeight: 1.45,
          color: C.heading,
        }}
      >
        {NOTE.slice(0, Math.round(typed * NOTE.length))}
        {typed < 1 && <span style={{ color: C.careBase }}>▍</span>}
      </p>
      <div
        style={{
          marginTop: 22,
          paddingTop: 18,
          borderTop: `1px solid ${C.line}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          ...rise(ready, 10),
        }}
      >
        <span style={{ fontSize: 20, color: C.muted }}>Copilot draft ready to sign</span>
        <span
          style={{
            borderRadius: 999,
            padding: "10px 22px",
            fontSize: 18,
            fontWeight: 500,
            color: "white",
            background: C.heading,
          }}
        >
          Sign note
        </span>
      </div>
    </SceneCard>
  );
}

// ── Scene 4 · Compliance: checks tick off, the record is audit-ready ────────

const CHECKS = ["Consent on file", "Risk assessment current", "Worker screening valid", "Visit notes signed"];

function Compliance({ frame }: { frame: number }) {
  const f = frame - S.compliance[0];
  const badge = riseAt(f, 36);
  return (
    <SceneCard frame={frame} window={S.compliance}>
      <CardTitle aside={<span style={rise(badge, 10)}><Chip tone="green">Audit-ready</Chip></span>}>
        Compliance
      </CardTitle>
      <ul style={{ margin: "22px 0 0", padding: 0, listStyle: "none", borderTop: `1px solid ${C.line}` }}>
        {CHECKS.map((label, i) => (
          <li
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "14px 0",
              borderBottom: `1px solid ${C.line}`,
              fontSize: 20,
            }}
          >
            <Tick p={progress(f, 6 + i * 7, 14 + i * 7)} />
            {label}
          </li>
        ))}
      </ul>
    </SceneCard>
  );
}

// ── Scene 5 · Outcomes: goal progress grows ─────────────────────────────────

const WEEKS = [34, 40, 38, 47, 52, 58, 61, 66, 70, 74, 79, 84];

function Outcomes({ frame }: { frame: number }) {
  const f = frame - S.outcomes[0];
  return (
    <SceneCard frame={frame} window={S.outcomes}>
      <CardTitle aside={<span style={{ fontSize: 20, color: C.muted }}>Last 12 weeks</span>}>Goal progress</CardTitle>
      <div
        style={{
          marginTop: 22,
          height: 200,
          display: "flex",
          alignItems: "flex-end",
          gap: 12,
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        {WEEKS.map((v, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${v * progress(f, 3 + i * 1.2, 13 + i * 1.2)}%`,
              borderRadius: "4px 4px 0 0",
              background: i === WEEKS.length - 1 ? C.careBase : C.careAccent,
            }}
          />
        ))}
      </div>
      <p style={{ margin: "18px 0 0", fontSize: 20, ...rise(riseAt(f, 18), 10) }}>
        4 of 5 goals on track
      </p>
    </SceneCard>
  );
}

// ── Scene 6 · Resolve: every step on one client record, then fade to loop ───

const RECORD = ["Intake", "Care plan", "Compliance", "Outcomes"];

function Resolve({ frame }: { frame: number }) {
  const f = frame - S.resolve[0];
  return (
    <SceneCard frame={frame} window={[S.resolve[0], FRAMES - 1]}>
      <CardTitle aside={<Chip tone="green">Up to date</Chip>}>Client record · M. Turner</CardTitle>
      <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {RECORD.map((label, i) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 12px",
              borderRadius: 4,
              background: C.careSoft,
              fontSize: 18,
            }}
          >
            <Tick p={progress(f, 3 + i * 3, 8 + i * 3)} />
            {label}
          </div>
        ))}
      </div>
    </SceneCard>
  );
}

// ── Composition ─────────────────────────────────────────────────────────────

export function CareHero({ at }: { at?: number }) {
  const live = useCurrentFrame();
  const frame = at ?? live;
  // In and back out, so the last frame matches the first.
  const push = interpolate(frame, [0, FRAMES / 2, FRAMES], [1, 1.04, 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: C.careDeep, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${push})` }}>
        <Img src={staticFile("product/CareBg.avif")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <AbsoluteFill
          style={{
            background: `linear-gradient(160deg, color-mix(in srgb, ${C.careDeep} 55%, transparent), color-mix(in srgb, ${C.careBase} 35%, transparent))`,
          }}
        />
      </AbsoluteFill>
      <Open frame={frame} />
      <Intake frame={frame} />
      <Copilot frame={frame} />
      <Compliance frame={frame} />
      <Outcomes frame={frame} />
      <Resolve frame={frame} />
    </AbsoluteFill>
  );
}
