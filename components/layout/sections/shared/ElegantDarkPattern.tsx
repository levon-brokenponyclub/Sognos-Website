// Shared dark background, after 21st.dev's elegant-dark-pattern. The
// reference's cyan becomes the brand accent and its greys become the navy
// ramp; every mask below is copied from it verbatim.
//
// Extracted from HeadlineCTA when the hero needed the same treatment — the
// alternative was the same sixty lines of masks in two files, drifting apart
// on the first tweak. No `"use client"`: it is inert markup and inline style,
// so it stays a Server Component and adds nothing to the client bundle.
//
// Renders as an absolutely-positioned layer. The parent needs `relative` and
// `overflow-hidden`; the parent's own background shows through wherever this
// stack fades out, so it is a treatment applied over a surface rather than a
// surface of its own.

// Five light streaks, all skewed 45° and fading downward. What stops them
// reading as evenly-spaced stripes is that each is masked by its own irregular
// gradient — so the stop lists are kept exactly as the reference has them.
const STREAK_MASKS = [
  "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 20%, rgba(0,0,0,0) 36%, rgb(0,0,0) 55%, rgba(0,0,0,0.13) 67%, rgb(0,0,0) 78%, rgba(0,0,0,0) 97%)",
  "linear-gradient(90deg, rgba(0,0,0,0) 11%, rgb(0,0,0) 25%, rgba(0,0,0,0.55) 41%, rgba(0,0,0,0.13) 67%, rgb(0,0,0) 78%, rgba(0,0,0,0) 97%)",
  "linear-gradient(90deg, rgba(0,0,0,0) 9%, rgb(0,0,0) 20%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0.424) 40%, rgb(0,0,0) 48%, rgba(0,0,0,0.267) 54%, rgba(0,0,0,0.13) 78%, rgb(0,0,0) 88%, rgba(0,0,0,0) 97%)",
  "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 17%, rgba(0,0,0,0.55) 26%, rgb(0,0,0) 35%, rgba(0,0,0,0) 47%, rgba(0,0,0,0.13) 69%, rgb(0,0,0) 79%, rgba(0,0,0,0) 97%)",
  "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 20%, rgba(0,0,0,0.55) 27%, rgb(0,0,0) 42%, rgba(0,0,0,0) 48%, rgba(0,0,0,0.13) 67%, rgb(0,0,0) 74%, rgb(0,0,0) 82%, rgba(0,0,0,0.47) 88%, rgba(0,0,0,0) 97%)",
] as const;

const BASE_MASK =
  "radial-gradient(125% 100% at 0% 0%, rgb(0,0,0) 0%, rgba(0,0,0,0.224) 88.2883%, rgba(0,0,0,0) 100%)";

// `in oklab` so the fade runs accent → transparent without dipping through
// grey, which is what a default sRGB interpolation to `transparent` does.
const STREAK_FILL =
  "linear-gradient(in oklab, var(--sognos-blue-accent) 0%, transparent 100%)";

// The reference's grain is a PNG on someone else's Framer CDN. This is the same
// effect from `feTurbulence` as a data URI: no third-party request, no licence
// question, and nothing new in `public/`.
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23n)'/%3E%3C/svg%3E";

export default function ElegantDarkPattern({
  className,
}: {
  /** Extra classes on the wrapper — for a `z-*` when the parent stacks. */
  className?: string;
}) {
  return (
    // Purely decorative, so the whole stack is hidden from assistive tech.
    <div aria-hidden="true" className={`absolute inset-0 ${className ?? ""}`}>
      {/* Base wash out of the top-left corner, itself masked so it falls away
          before it reaches the opposite corner. The streaks live inside it so
          they inherit that same falloff. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 100% at 0% 0%, var(--sognos-navy) 0%, var(--sognos-navy-darkest) 100%)",
          maskImage: BASE_MASK,
          WebkitMaskImage: BASE_MASK,
        }}
      >
        {STREAK_MASKS.map((mask, i) => (
          <div
            key={i}
            className="absolute inset-0 opacity-20"
            style={{
              background: STREAK_FILL,
              maskImage: mask,
              WebkitMaskImage: mask,
              transform: "skewX(45deg)",
            }}
          />
        ))}
      </div>

      {/* Grain */}
      <div
        className="absolute inset-0 bg-repeat opacity-5"
        style={{
          backgroundImage: `url("${NOISE}")`,
          backgroundSize: "149.76px",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Centre lift, so the copy is not sitting on the darkest part. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--sognos-navy) 20%, transparent) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
