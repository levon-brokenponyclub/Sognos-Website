import Image from "next/image";

// Scrolling wall of bordered logo tiles, after middesk.com's trust strip.
//
// Sizes are the reference's own. It runs a 10px root, so its `22rem`/`11.8rem`
// tile is 220×118px and its `0.8rem` radius is 8px — which is `rounded-lg`
// exactly, so the house radius rule and the reference agree here.
//
// No `"use client"`: the marquee and the beam are both CSS.
const TILE_W = 220;
const TILE_H = 118;
const LOGO_W = 156;
const LOGO_H = 62;
// Width of the fades that hide the tiles entering and leaving.
const FADE_W = 88;

export type MarqueeLogo = { src: string; alt: string };

export default function LogoMarquee({
  logos,
  panelClass,
  fadeClass,
  invertLogos = false,
}: {
  logos: readonly MarqueeLogo[];
  /** The section's own background, as a bg utility. The beam tile's inner
   *  panel must match it or the gradient shows through the whole tile. */
  panelClass: string;
  /** The same colour again as a `from-*` utility, for the edge fades. */
  fadeClass: string;
  /** For dark surfaces, where client marks have to be flattened to white. */
  invertLogos?: boolean;
}) {
  if (logos.length === 0) return null;

  // `.trust-marquee-track` travels 0 → -50%, so the list has to appear twice
  // for the loop to be seamless. The second pass is presentational.
  const track = [...logos, ...logos];

  return (
    <div className="trust-marquee-wrap relative w-full overflow-hidden">
      {/* The 8px gap is a margin on each tile rather than `gap` on the track.
          `trust-marquee-scroll` travels exactly -50%, and with a flex `gap`
          that lands 4px short of the seam — a gap sits between the halves but
          not after the last tile, so the loop jumps. A uniform tile+margin unit
          divides evenly and the seam is invisible. */}
      <div className="trust-marquee-track">
        {track.map((logo, i) => (
          <LogoTile
            key={`${logo.alt}-${i}`}
            logo={logo}
            // Keyed off the position in the original list, not the doubled one,
            // so the alternation does not flip at the seam on an odd count.
            beam={i % logos.length % 2 === 0}
            panelClass={panelClass}
            invert={invertLogos}
            duplicate={i >= logos.length}
          />
        ))}
      </div>

      {/* Fades sit over the track at both ends so tiles arrive and leave rather
          than being clipped mid-logo. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 bg-gradient-to-r ${fadeClass} to-transparent`}
        style={{ width: FADE_W }}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 bg-gradient-to-l ${fadeClass} to-transparent`}
        style={{ width: FADE_W }}
      />
    </div>
  );
}

function LogoTile({
  logo,
  beam,
  panelClass,
  invert,
  duplicate,
}: {
  logo: MarqueeLogo;
  beam: boolean;
  panelClass: string;
  invert: boolean;
  duplicate: boolean;
}) {
  const mark = (
    <div className="relative" style={{ width: LOGO_W, height: LOGO_H }}>
      <Image
        src={logo.src}
        // The second pass is the same logos again — announcing them twice would
        // just make the strip read as double its length.
        alt={duplicate ? "" : logo.alt}
        fill
        sizes={`${LOGO_W}px`}
        className={`object-contain ${invert ? "brightness-0 invert" : ""}`}
      />
    </div>
  );

  const shell =
    "mr-2 flex shrink-0 items-center justify-center overflow-hidden rounded-lg";
  const size = { width: TILE_W, height: TILE_H };

  if (!beam) {
    return (
      <div
        className={`${shell} border border-[var(--divider-base)]`}
        style={size}
      >
        {mark}
      </div>
    );
  }

  return (
    // `p-px` is the border: it is the only part of the tile the spinning
    // gradient behind the panel can reach.
    <div className={`${shell} relative p-px`} style={size}>
      <span aria-hidden="true" className="logo-tile-beam" />
      <div
        className={`relative z-10 flex h-full w-full items-center justify-center rounded-[7px] ${panelClass}`}
      >
        {mark}
      </div>
    </div>
  );
}
