import Link from "next/link";

// Shared CTA pill, after middesk.com's button.
//
// No `"use client"`: the whole effect is CSS hover state, so this stays a
// Server Component and adds nothing to the client bundle wherever it is used.

// The reference's easing and duration. Written as a constant rather than
// repeated inline — Tailwind scans this file's raw text for candidates, so the
// literal below is what gets emitted, and it must stay in the same file as the
// classes that use it.
const SLIDE_FILL_MOTION =
  "duration-500 ease-[cubic-bezier(0.77,0.01,0.26,1.01)]";

// Outlined pill whose fill rises from below on hover while the label rolls up
// and is replaced by its own duplicate in the inverse colour. The duplicate is
// what makes it read as one label moving through the button rather than two
// crossfading, so it is `aria-hidden` and the visible label carries the text.
export default function SlideFillLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      // 16px/4px padding and a 500ms border fade, per the reference. `border`
      // rather than its `outline` at a -0.5px offset: the fill covers the
      // padding box and leaves the border showing, which is the same result
      // with one less thing to reason about.
      className={`group relative inline-flex items-center overflow-hidden rounded-lg border border-sognos-line px-4 py-1 transition-colors ${SLIDE_FILL_MOTION} hover:border-sognos-blue-accent ${className ?? ""}`}
    >
      {/* Full-height panel parked directly below the button, driven by `top`
          rather than a transform so it cannot inherit the label's movement. */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-full h-full bg-sognos-blue-accent transition-[top] ${SLIDE_FILL_MOTION} group-hover:top-0`}
      />

      {/* Clips both labels to one line's height, so each leaves and arrives
          out of sight rather than overrunning the button. */}
      <span className="relative flex items-center justify-center overflow-hidden">
        <span
          className={`relative z-10 block py-1 text-sm font-medium text-sognos-heading transition-transform ${SLIDE_FILL_MOTION} group-hover:-translate-y-full`}
        >
          {label}
        </span>
        <span
          aria-hidden="true"
          className={`absolute left-0 top-full z-10 py-1 text-sm font-medium text-white transition-transform ${SLIDE_FILL_MOTION} group-hover:-translate-y-full`}
        >
          {label}
        </span>
      </span>
    </Link>
  );
}
