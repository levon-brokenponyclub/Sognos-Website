import SectionLabel from "@/components/ui/SectionLabel";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";
import ProductWorksCard from "@/components/layout/sections/shared/ProductWorksCard";

// Works with — Solutions Inspector option A on the brand tint (2026-11-02):
// product cards in a 3-column grid (1–2 products sit left at a third of the
// width each). Which products show follows the solution's worksWithRoster /
// worksWithCare flags.

export default function SolutionWorksWith({ products }: { products: ("roster" | "care")[] }) {
  return (
    <section className={`bg-sognos-tint ${LAYOUT.section}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={LAYOUT.rail}>
          <div className={LAYOUT.railLabel}>
            <SectionLabel sticky>Works with</SectionLabel>
          </div>
          <div className={LAYOUT.content}>
            <div className={LAYOUT.head}>
              <h2 className={`${TYPE.h2} text-sognos-heading`}>Connects to the Sognos platform</h2>
            </div>
            <div className={`${LAYOUT.gap} grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4`}>
              {products.map((key) => (
                <ProductWorksCard key={key} product={key} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
