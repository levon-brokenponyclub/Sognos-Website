import ProductCustomerStories, {
  type CaseStudy,
} from "@/components/sections/ProductCustomerStories";

interface SognoscareStoriesProps {
  stories?: CaseStudy[] | null;
}

export default function SognoscareStories({ stories }: SognoscareStoriesProps = {}) {
  return <ProductCustomerStories stories={stories ?? undefined} />;
}
