import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import CTABand from "@/components/layout/sections/CTABand";
import BookDemoModal from "@/components/ui/BookDemoModal";
import { BookDemoProvider } from "@/lib/BookDemoContext";
import { CtaContentProvider } from "@/lib/CtaContentContext";
import { getCtaSectionContent } from "@/lib/sanity/queries";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctaContent = await getCtaSectionContent();

  return (
    <CtaContentProvider value={ctaContent}>
      <BookDemoProvider>
        <PageTransition>
          <Navbar />
          <main className="flex-1">{children}</main>
        </PageTransition>
        <CTABand />
        <Footer />
        <BookDemoModal />
      </BookDemoProvider>
    </CtaContentProvider>
  );
}
