import Hero from "@/components/sections/Hero";
import LogoStrip from "@/components/sections/LogoStrip";
import HowSognosWorksPreview from "@/components/sections/HowSognosWorksPreview";
import ProductSection from "@/components/sections/ProductSection";
import CustomerStories from "@/components/sections/CustomerStories";
import SolutionsSection from "@/components/sections/SolutionsSection";
import IndustrySection from "@/components/sections/IndustrySection";
import ProofSection from "@/components/sections/ProofSection";
import NewsInsightSection from "@/components/sections/NewsInsightSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <HowSognosWorksPreview />
      <ProductSection />
      <SolutionsSection />
      <IndustrySection />
      <CustomerStories />
      <NewsInsightSection />
      <ProofSection />
      <CTASection />
    </>
  );
}
