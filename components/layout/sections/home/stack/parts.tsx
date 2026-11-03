import { useEffect, useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";

// Shared pieces for the home product-stack graphics (illustrative UI).

export const FROST =
  "rounded-lg border border-white/50 bg-white/60 backdrop-blur-[12px] backdrop-saturate-[1.2]";

/** Illustrated avatar: head and shoulders on a soft gradient — no real person. */
export function Avatar({ id, from, to }: { id: string; from: string; to: string }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="size-full" aria-hidden="true">
      <defs>
        <linearGradient id={`av-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#av-${id})`} />
      <circle cx="50" cy="40" r="17" fill="#f1e4d8" />
      <path d="M18 100c4-22 17-32 32-32s28 10 32 32z" fill="#fff" fillOpacity=".85" />
    </svg>
  );
}

/** Two-digit split-flap counter. `vals` maps stage → value ("1:24,4:38"); useStages flips it. */
export function Flap({ vals, className = "" }: { vals: string; className?: string }) {
  return (
    <span className={`flex shrink-0 gap-1 ${className}`} data-vals={vals}>
      {[0, 1].map((i) => (
        <span
          key={i}
          className="flex h-9 w-7 items-center justify-center overflow-hidden rounded-lg border border-sognos-line bg-white font-heading text-xl tabular-nums text-sognos-heading"
        >
          <span className="block">0</span>
        </span>
      ))}
    </span>
  );
}

/** Frosted bar under each graphic: icon tile, a label that swaps at the last stage, a split-flap. */
export function StageBar({
  accent,
  icon,
  first,
  last,
  vals,
  className = "right-[5%] bottom-[5%] left-[5%] sm:right-[10%] sm:left-[10%]",
  countClassName,
}: {
  accent: string;
  icon: ReactNode;
  first: [string, ReactNode];
  last: [string, ReactNode];
  vals: string;
  className?: string;
  countClassName?: string;
}) {
  return (
    <div
      className={`absolute flex items-center gap-2.5 rounded-lg border border-white/60 bg-white/80 p-2.5 backdrop-blur-md sm:gap-3 sm:p-3 ${className}`}
    >
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-lg text-lg text-white sm:size-11"
        style={{ background: accent }}
      >
        {icon}
      </span>
      <span className="relative h-10 min-w-0 flex-1">
        {[first, last].map(([title, sub], i) => (
          <span key={title} className={`absolute inset-0 ${i === 0 ? "hs-t1" : "hs-t2"}`}>
            <span className="block truncate text-[15px] text-sognos-heading">{title}</span>
            <span className="block truncate text-[11px] text-[#64748b]">{sub}</span>
          </span>
        ))}
      </span>
      <Flap vals={vals} className={countClassName} />
    </div>
  );
}

type Timeline = readonly (readonly [ms: number, stage: number])[];

// perspective() so the digit turns over like a flap instead of squashing flat.
const FLIP: Keyframe[] = [
  { transform: "perspective(120px) rotateX(-80deg)", opacity: 0.3 },
  { transform: "perspective(120px) rotateX(0deg)", opacity: 1 },
];
const FLIP_OPTS: KeyframeAnimationOptions = { duration: 180, easing: "cubic-bezier(0.23, 1, 0.32, 1)" };

/**
 * Runs a graphic's stages: `data-s` on the returned ref steps through `timeline` once the
 * graphic is 35% in view. It resets only once fully off screen, so it replays on the next
 * visit but never snaps back while still partly visible; reduced motion jumps to the last
 * stage. Split-flaps (`[data-vals]`) flip to each stage's value; `[data-type]` text types out
 * at stage `typeAt`. The stage lives on the DOM, which the CSS reads — no re-render per step.
 */
export function useStages<T extends HTMLElement>(timeline: Timeline, typeAt = 3) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const onScreen = useInView(ref);
  const pending = useRef<(() => void)[]>([]);
  const played = useRef(false);

  useEffect(() => () => pending.current.forEach((cancel) => cancel()), []);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const flaps = [...root.querySelectorAll<HTMLElement>("[data-vals]")].map((f) => ({
      digits: [...f.children].map((d) => d.firstElementChild as HTMLElement),
      vals: new Map(f.dataset.vals!.split(",").map((p) => p.split(":").map(Number) as [number, number])),
    }));
    const typers = [...root.querySelectorAll<HTMLElement>("[data-type]")];
    const every = (fn: () => boolean, ms: number) => {
      const id = window.setInterval(() => fn() && clearInterval(id), ms);
      pending.current.push(() => clearInterval(id));
    };

    const show = (digits: HTMLElement[], n: number, animate: boolean) =>
      String(n)
        .padStart(digits.length, "0")
        .split("")
        .forEach((c, i) => {
          if (digits[i].textContent === c) return;
          digits[i].textContent = c;
          if (animate) digits[i].animate(FLIP, FLIP_OPTS);
        });
    const flipTo = (digits: HTMLElement[], to: number) => {
      const from = Number(digits.map((d) => d.textContent).join(""));
      let k = 0;
      every(() => {
        show(digits, Math.round(from + ((to - from) * ++k) / 6), true);
        return k >= 6;
      }, 110);
    };
    const type = (el: HTMLElement, animate: boolean) => {
      const text = el.dataset.type!;
      if (!animate) return void (el.textContent = text);
      let n = 0;
      every(() => {
        el.textContent = text.slice(0, ++n);
        return n >= text.length;
      }, 28);
    };
    const stage = (s: number, animate: boolean) => {
      root.dataset.s = String(s);
      flaps.forEach(({ digits, vals }) => {
        const v = vals.get(s);
        if (v === undefined) return;
        if (animate) flipTo(digits, v);
        else show(digits, v, false);
      });
      if (s === typeAt) typers.forEach((t) => type(t, animate));
    };

    if (!onScreen) {
      pending.current.forEach((cancel) => cancel());
      pending.current = [];
      played.current = false;
      root.dataset.s = "0";
      flaps.forEach(({ digits }) => show(digits, 0, false));
      typers.forEach((t) => (t.textContent = ""));
      return;
    }
    if (!inView || played.current) return;
    played.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timeline.forEach(([, s]) => stage(s, false));
      return;
    }
    timeline.forEach(([ms, s]) => {
      const id = window.setTimeout(() => stage(s, true), ms);
      pending.current.push(() => clearTimeout(id));
    });
  }, [inView, onScreen, timeline, typeAt]);

  return ref;
}
