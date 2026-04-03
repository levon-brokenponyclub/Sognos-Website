import Hero from "@/components/sections/Hero";
import WhatIsSognos from "@/components/sections/WhatIsSognos";
import ProductSection from "@/components/sections/ProductSection";
import HowItWorks from "@/components/sections/HowItWorks";
import PlatformSection from "@/components/sections/PlatformSection";
import IndustrySection from "@/components/sections/IndustrySection";
import ProofSection from "@/components/sections/ProofSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIsSognos />
      <ProductSection />
      <HowItWorks />
      <PlatformSection />
      <IndustrySection />
      <ProofSection />
      <CTASection />
    </>
  );
}
