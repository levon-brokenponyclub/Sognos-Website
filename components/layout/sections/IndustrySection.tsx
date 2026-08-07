// SCAFFOLD (2026-08-07 rebuild) — direct copy of Routable's "Scale your
// payment operations" section shell. Reference:
// routable.com main product page mass-payouts section.
//
// Hardcoded values from the reference (tokenize in Refine):
// - Section padding: pt-10 pb-10 (Routable's actual — smaller than our
//   design system py-20/py-28. Adjust in Refine if needed.)
// - Container spacing: space-y-10 md:space-y-20 (40px / 80px header→rail)
// - Header block max-width: 42.5rem (680px) via inline style
// - H2 max-width on lg: 628px (matches card width)
// - Body max-width: md:max-w-xl lg:max-w-[520px]
// - Body opacity: 80% (wrapper)
//
// Per-sector tints (inline hex, comment in tokens.css line 243).
import Image from "next/image";
import FeatureRail, {
  type FeatureRailCard,
} from "@/components/ui/FeatureRail";
import { INDUSTRIES } from "@/lib/constants";

const SECTOR_TINT: Record<string, string> = {
  "health-social-care": "bg-[#f7edf3]", // rose
  "facilities-management": "bg-[#ebfbe3]", // mint
  "industrial-services": "bg-[#f4f8f9]", // ice
  "local-government": "bg-[#f5f6ee]", // cream
  "energy-utilities": "bg-[#dfeacd]", // sage
};

// Scaffold: reuse existing /public/dev/ assets. Real per-industry mocks land
// in the refine pass.
const MOCK_POOL = [
  "/dev/PO-matching-screen-01.svg",
  "/dev/4eFZIHpCkiTVkMba3cIJVCGoUk.svg",
  "/dev/6scLa4uJSGiH3P4zifbPIw77oOY.svg",
  "/dev/x8keoKd407knFRah8kzCWpbISw.svg",
  "/dev/AJSJZn22dYfxKQ2xgZp26QKWf4.avif",
] as const;

type IndustrySectionProps = {
  heading?: string;
  description?: string;
  excludeSlug?: string;
};

export default function IndustrySection({
  heading = "Purpose-built for service-intensive sectors",
  description = "Sectors where coordinating people, compliance and service delivery is the whole operational problem.",
  excludeSlug,
}: IndustrySectionProps) {
  const industries = excludeSlug
    ? INDUSTRIES.filter((ind) => ind.slug !== excludeSlug)
    : INDUSTRIES;

  const cards: FeatureRailCard[] = industries.map((ind, i) => ({
    eyebrow: ind.name,
    body: ind.description,
    href: ind.href,
    tint: SECTOR_TINT[ind.slug] ?? "bg-sognos-tint",
    media: (
      <Image
        src={MOCK_POOL[i % MOCK_POOL.length]}
        alt=""
        width={480}
        height={320}
        className="h-full w-full object-contain"
      />
    ),
  }));

  return (
    <section className="overflow-hidden bg-white pt-10 pb-10 md:pt-10 md:pb-10">
      <div className="mx-auto max-w-7xl space-y-10 px-6 md:space-y-20">
        {/* Header — left-aligned; max-width 42.5rem on the block, H2 caps at
            628px on lg, body caps at 520px on lg with 80% opacity. */}
        <div className="flex w-full flex-col items-start">
          <div
            className="flex flex-col items-start space-y-3 text-left md:space-y-6"
            style={{ maxWidth: "42.5rem" }}
          >
            <h2 className="relative z-10 w-full font-heading text-4xl font-medium tracking-tight leading-tight text-sognos-heading text-balance md:text-5xl lg:max-w-[628px]">
              {heading}
            </h2>
            <div className="w-full opacity-80 md:max-w-xl lg:max-w-[520px]">
              <p className="text-base leading-relaxed text-sognos-body">
                {description}
              </p>
            </div>
          </div>
        </div>

        <FeatureRail cards={cards} />
      </div>
    </section>
  );
}
