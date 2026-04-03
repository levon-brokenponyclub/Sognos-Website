import Hero from "@/components/sections/Hero";
import LogoStrip from "@/components/sections/LogoStrip";
import HowSognosWorksPreview from "@/components/sections/HowSognosWorksPreview";
import ProductSection from "@/components/sections/ProductSection";
import HowItWorks from "@/components/sections/HowItWorks";
import SolutionsSection from "@/components/sections/SolutionsSection";
import IndustrySection from "@/components/sections/IndustrySection";
import ProofSection from "@/components/sections/ProofSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <HowSognosWorksPreview />
      <ProductSection />
      <HowItWorks />
      <SolutionsSection />
      <IndustrySection />
      <ProofSection />
      <CTASection />
    </>
  );
}
