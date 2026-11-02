import ProductStoryStage from "@/components/layout/sections/ProductStoryStage";
import type { CaseStudy } from "@/components/layout/sections/ProductCustomerStories";

interface SognoscareStoriesProps {
  stories?: CaseStudy[] | null;
}

export default function SognoscareStories({ stories }: SognoscareStoriesProps = {}) {
  return <ProductStoryStage product="care" stories={stories} />;
}
