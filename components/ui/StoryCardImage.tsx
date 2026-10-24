import Image from "next/image";
import type { CSSProperties } from "react";

// Customer-story card image — option C "Facets + tile"
// (docs/mockups/customer-stories/card-images.html). Pure CSS: the customer's
// brand colour cut into diagonal facets (darker / lighter mixes, accent
// corner) under light film grain, with the full-colour logo on a white tile.
// Every layer is sized in container-query units, so one component scales from
// thumbnail to hero — the parent sets the box size. Hover (inside a `group`
// link) lifts the tile; off under reduced motion.

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const FACETS =
  "linear-gradient(115deg, transparent 0 38%, color-mix(in srgb, var(--brand) 78%, black) 38% 62%, transparent 62%), linear-gradient(115deg, color-mix(in srgb, var(--brand) 82%, white) 0 22%, transparent 22%), linear-gradient(65deg, transparent 0 70%, color-mix(in srgb, var(--brand-accent) 45%, var(--brand)) 70% 100%), var(--brand)";

export default function StoryCardImage({
  logo,
  company,
  brand,
  accent,
  className = "",
}: {
  logo: string;
  company: string;
  /** Customer brand colour (hex). */
  brand: string;
  /** Secondary colour for the corner facet; defaults to a light mix of `brand`. */
  accent?: string;
  /** Box sizing from the parent (aspect ratio / height / width). */
  className?: string;
}) {
  const vars = {
    "--brand": brand,
    "--brand-accent": accent ?? `color-mix(in srgb, ${brand} 50%, white)`,
    background: FACETS,
  } as CSSProperties;

  return (
    <div className={`@container relative isolate overflow-hidden rounded-lg ${className}`} style={vars}>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />
      <div className="absolute top-1/2 left-1/2 flex h-[24cqw] w-[52cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[max(4px,1.4cqw)] bg-white transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none">
        <div className="relative h-[13cqw] w-[40cqw]">
          <Image src={logo} alt={company} fill sizes="40vw" className="object-contain" />
        </div>
      </div>
    </div>
  );
}
