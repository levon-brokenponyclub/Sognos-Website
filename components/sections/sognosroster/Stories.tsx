import ProductCustomerStories from "@/components/sections/ProductCustomerStories";
import type { CaseStudy } from "@/components/sections/ProductCustomerStories";

export default function SognoscareRosterStories({
  stories,
}: {
  stories?: CaseStudy[];
}) {
  return <ProductCustomerStories stories={stories} />;
}
