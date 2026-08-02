// The 2px rule that separates cards and logo cells, after middesk.com. A
// clipped window with a track at 200% of its length inside; the track carries a
// gradient that is line-coloured at each end and accent-coloured in the middle,
// and sliding it half a length walks that bright band along the rule.
//
// Two elements rather than one rotated, because the track's length has to
// follow the axis it travels on: across the top while cards are stacked, down
// the leading edge once they sit side by side.
//
// Keyframes and colours live in `globals.css`. On a dark surface, put
// `divider-on-dark` on any ancestor — the gradient reads its line colour from a
// custom property, so nothing here changes.
//
// No `"use client"`: it is CSS all the way down.
export default function AnimatedDivider({
  className,
}: {
  /** Extra positioning, if the default top-left anchor is not right. */
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={className}>
      <span className="absolute left-0 top-0 h-[2px] w-full overflow-hidden md:hidden">
        <span className="divider-track-x block" />
      </span>
      <span className="absolute left-0 top-0 hidden h-full w-[2px] overflow-hidden md:block">
        <span className="divider-track-y block" />
      </span>
    </span>
  );
}
