import Hero from "@/components/sections/Hero";
import LogoStrip from "@/components/sections/LogoStrip";
import HowSognosWorksPreview from "@/components/sections/HowSognosWorksPreview";
import ProductSection from "@/components/sections/ProductSection";
import HowItWorks from "@/components/sections/HowItWorks";
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
      <HowItWorks />
      <IndustrySection />
      <ProofSection />
      <NewsInsightSection />
      <CTASection />
    </>
  );
}
