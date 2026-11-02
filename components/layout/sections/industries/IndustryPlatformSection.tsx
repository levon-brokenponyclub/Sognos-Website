import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  LAYOUT,
  TYPE,
} from "@/components/layout/sections/sognoscare/typeScale";
import ProductWorksCard, {
  type WorksProduct,
} from "@/components/layout/sections/shared/ProductWorksCard";

// Industries Platform — Inspector option B on navy (2026-11-02): the three
// products as the "Works with" cards on white/5, then the platform tagline
// beside the Powered-by partner pill.

const PRODUCTS: WorksProduct[] = ["care", "roster", "genogram"];

export default function IndustryPlatformSection({
  industryName,
}: {
  industryName: string;
}) {
  return (
    <section className={`bg-sognos-navy ${LAYOUT.section}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={LAYOUT.head}>
          <SectionLabel tone="dark">Platform</SectionLabel>
          <h2 className={`${TYPE.h2} text-white`}>
            One platform to run {industryName} end-to-end
          </h2>
        </div>
        <div
          className={`${LAYOUT.gap} grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4`}
        >
          {PRODUCTS.map((key) => (
            <ProductWorksCard key={key} product={key} tone="dark" />
          ))}
        </div>
        <div className="mt-3 flex flex-col items-center justify-center gap-4 rounded-lg border border-white/5 bg-white/5 p-6 text-center md:flex-row md:gap-8 lg:mt-4">
          <p className={`${TYPE.h3Small} text-white`}>
            Manage demand - Coordinate workforce - Track outcomes
          </p>
          <span
            aria-hidden="true"
            className="hidden h-8 w-px bg-white/20 md:block"
          />
          <span className="flex flex-wrap items-center justify-center gap-5">
            <span className="text-sm text-white/75">Powered by</span>
            <span className="flex items-center gap-4 rounded-full bg-white/5 px-5 py-2.5">
              <Image
                src="/logos/Dynamics365.svg"
                alt="Microsoft Dynamics 365"
                width={96}
                height={96}
                className="h-7 w-auto"
              />
              <span aria-hidden="true" className="h-6 w-px bg-white/30" />
              <Image
                src="/logos/Sognos-Solutions-Solutions-Partner.webp"
                alt="Microsoft Solutions Partner"
                width={480}
                height={113}
                className="h-7 w-auto"
              />
              <span aria-hidden="true" className="h-6 w-px bg-white/30" />
              <Image
                src="/logos/copilot-logo.svg"
                alt="Microsoft Copilot"
                width={128}
                height={128}
                className="h-8 w-auto"
              />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
