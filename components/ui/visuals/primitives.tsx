"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Shared building blocks for the product / solution motion graphics
// (visuals gallery: docs/mockups/sognoscare/04b-feature-visuals.html).
// Every primitive takes `still` (reduced motion) and renders its finished
// state when set.

export const EASE = [0.22, 1, 0.36, 1] as const;
export const CARD = "rounded-lg border border-sognos-line bg-white";

export const mix = (c: string, n: number) => `color-mix(in srgb, ${c} ${n}%, white)`;

// ── Loops ──────────────────────────────────────────────────────────────────

/** Step counter 0…count+1 (hold on done, then restart). Still → count. */
export function useRun(count: number, active: boolean, still: boolean, ms = 1200) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active || still) return;
    const id = setInterval(() => setStep((s) => (s + 1) % (count + 2)), ms);
    return () => clearInterval(id);
  }, [active, still, count, ms]);
  return still ? count : step;
}

/** Cycling index 0…length-1 starting at `start`. */
export function useCycle(length: number, active: boolean, still: boolean, ms: number, start = 0) {
  const [i, setI] = useState(start);
  useEffect(() => {
    if (!active || still) return;
    const id = setInterval(() => setI((n) => (n + 1) % length), ms);
    return () => clearInterval(id);
  }, [active, still, length, ms]);
  return i;
}

// ── Elements ───────────────────────────────────────────────────────────────

export function Rise({
  show,
  delay = 0,
  className,
  children,
}: {
  show: boolean;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export type StepState = "done" | "now" | "next";
export const stepState = (i: number, step: number): StepState =>
  i < step ? "done" : i === step ? "now" : "next";

export function CheckRows({ items, step }: { items: readonly string[]; step: number }) {
  return (
    <ul className="divide-y divide-sognos-line">
      {items.map((item, i) => {
        const state = stepState(i, step);
        return (
          <li key={item} className="flex items-center justify-between gap-3 py-2 text-sm">
            <span className="text-sognos-body">{item}</span>
            <span
              className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-[11px] transition-colors duration-300 ${
                state === "done"
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : state === "now"
                    ? "border-sognos-blue-accent text-transparent"
                    : "border-sognos-line text-transparent"
              }`}
            >
              &#10003;
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function Avatar({ src, className = "size-9" }: { src: string; className?: string }) {
  return (
    <Image src={src} alt="" width={80} height={80} className={`${className} shrink-0 rounded-full object-cover`} />
  );
}

export function CountUp({ to, suffix = "", run, still }: { to: number; suffix?: string; run: boolean; still: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run || still) return;
    let raf = 0;
    let t0 = 0;
    const tick = (t: number) => {
      t0 ||= t;
      const p = Math.min(1, (t - t0) / 1200);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, still, to]);
  return (
    <>
      {(still ? to : n).toLocaleString()}
      {suffix}
    </>
  );
}

/** Pulsing status dot. */
export function Pulse({ color, still, className = "size-2" }: { color: string; still: boolean; className?: string }) {
  return (
    <span className={`relative flex shrink-0 ${className}`}>
      {!still && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: color }}
          animate={{ opacity: [0.6, 0, 0.6], scale: [1, 2.4, 1] }}
          transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
        />
      )}
      <span className="relative size-full rounded-full" style={{ background: color }} />
    </span>
  );
}

/** Typewriter: types `text`, holds 4s, restarts. Still → full text. */
export function Typed({ text, show, still, cursor }: { text: string; show: boolean; still: boolean; cursor: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!show || still) return;
    let t: ReturnType<typeof setTimeout>;
    let i = 0;
    const go = () => {
      setN(++i);
      t = i < text.length ? setTimeout(go, 28) : setTimeout(() => ((i = 0), go()), 4000);
    };
    t = setTimeout(go, 1400);
    return () => clearTimeout(t);
  }, [show, still, text]);
  return (
    <>
      <span>{still ? text : text.slice(0, n)}</span>
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 align-middle"
        style={{ background: cursor }}
      />
    </>
  );
}

/** Bar that grows from the bottom. */
export function Bar({
  show,
  height,
  delay = 0,
  className,
  style,
}: {
  show: boolean;
  height: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.span
      className={`origin-bottom rounded-t-sm ${className ?? ""}`}
      style={{ height: `${height}%`, ...style }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: show ? 1 : 0 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    />
  );
}

/** Line that draws itself in. */
export function Draw({
  d,
  show,
  still,
  stroke,
  width = 2.5,
  duration = 1.6,
}: {
  d: string;
  show: boolean;
  still: boolean;
  stroke: string;
  width?: number;
  duration?: number;
}) {
  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={{ pathLength: still ? 1 : 0 }}
      animate={{ pathLength: show ? 1 : 0 }}
      transition={{ duration: still ? 0 : duration, ease: EASE, delay: 0.3 }}
    />
  );
}

// ── Panel palettes (review-only switcher) ──────────────────────────────────

export type Palette = { name: string; colours: readonly string[] };
export type Palettes = Record<string, Palette>;

const PALETTE_EVENT = "sognos-visual-palette";
const IS_PRODUCTION = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

function readKey(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
export function writeKey(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
  window.dispatchEvent(new Event(PALETTE_EVENT));
}
function subscribe(cb: () => void) {
  window.addEventListener(PALETTE_EVENT, cb);
  return () => window.removeEventListener(PALETTE_EVENT, cb);
}
/** localStorage-backed string; server render and production → fallback. */
export function useStoredValue<T extends string>(key: string, fallback: T, valid: (v: string) => boolean): T {
  return useSyncExternalStore(
    subscribe,
    () => {
      if (IS_PRODUCTION) return fallback;
      const v = readKey(key);
      return v && valid(v) ? (v as T) : fallback;
    },
    () => fallback,
  );
}

type PaletteState = { palettes: Palettes; id: string; setId: (id: string) => void };
const PaletteContext = createContext<PaletteState>({ palettes: {}, id: "", setId: () => {} });

export function PaletteProvider({
  storageKey,
  palettes,
  initial,
  children,
}: {
  storageKey: string;
  palettes: Palettes;
  initial: string;
  children: ReactNode;
}) {
  const id = useStoredValue(storageKey, initial, (v) => v in palettes);
  return (
    <PaletteContext.Provider value={{ palettes, id, setId: (v) => writeKey(storageKey, v) }}>
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  const { palettes, id } = useContext(PaletteContext);
  return {
    id,
    colour: (i: number) => {
      const c = palettes[id]?.colours ?? [];
      return c.length ? c[i % c.length] : "var(--sognos-tint)";
    },
  };
}

export const PILL =
  "flex items-center gap-2 rounded-full px-3 py-1.5 text-sognos-heading transition-colors hover:bg-slate-100 aria-pressed:bg-sognos-heading aria-pressed:text-white";

/** Review control — localhost and Vercel previews only. */
export function PalettePicker({ label = "Panel colours" }: { label?: string }) {
  const { palettes, id, setId } = useContext(PaletteContext);
  if (IS_PRODUCTION) return null;
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex flex-wrap items-center gap-1 rounded-full border border-sognos-line p-1 text-xs"
    >
      {Object.entries(palettes).map(([key, p]) => (
        <button
          key={key}
          type="button"
          aria-pressed={id === key}
          onClick={() => setId(key)}
          title={p.name}
          className={PILL}
        >
          <span className="flex -space-x-1" aria-hidden="true">
            {[0, 1].map((i) => (
              <span
                key={i}
                className="size-3 rounded-full border border-sognos-line"
                style={{ background: p.colours[i % p.colours.length] }}
              />
            ))}
          </span>
          {key.toUpperCase()} &middot; {p.name}
        </button>
      ))}
    </div>
  );
}

export type VisualProps = { show: boolean; still: boolean };

/** Palette panel that starts its visual once 35% in view. */
export function VisualFrame({
  index,
  visual: Visual,
  className,
}: {
  index: number;
  visual?: (p: VisualProps) => ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const still = !!useReducedMotion();
  return (
    <PalettePanel index={index} className={className}>
      <div ref={ref} className="relative flex w-full justify-center">
        {Visual ? <Visual show={inView || still} still={still} /> : null}
      </div>
    </PalettePanel>
  );
}

/** Flat panel in the active palette colour for slot `index`. */
export function PalettePanel({
  index,
  className = "",
  children,
}: {
  index: number;
  className?: string;
  children: ReactNode;
}) {
  const { colour } = usePalette();
  const bg = colour(index);
  return (
    <div
      aria-hidden="true"
      style={{ background: bg }}
      className={`relative flex w-full items-center justify-center overflow-hidden rounded transition-colors duration-500 ${
        bg === "#ffffff" ? "border border-sognos-line" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
