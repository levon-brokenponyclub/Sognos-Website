import ProductCustomerStories from "@/components/sections/ProductCustomerStories";
import type { CaseStudy } from "@/components/sections/ProductCustomerStories";

export default function GenogramStories({ stories }: { stories?: CaseStudy[] }) {
  return <ProductCustomerStories stories={stories} />;
}
