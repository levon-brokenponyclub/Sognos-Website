import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import CTABand from "@/components/layout/sections/CTABand";
import BookDemoModal from "@/components/ui/BookDemoModal";
import { BookDemoProvider } from "@/lib/BookDemoContext";
import { CtaContentProvider } from "@/lib/CtaContentContext";
import {
  getCtaSectionContent,
  getCustomerStoryArchive,
  getKnowledgePostArchive,
} from "@/lib/sanity/queries";
import { buildFeaturedNav } from "@/lib/featuredNav";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Navbar is a client component, so the Knowledge Hub dropdown's featured
  // column is resolved here and passed down.
  const [ctaContent, posts, stories] = await Promise.all([
    getCtaSectionContent(),
    getKnowledgePostArchive(),
    getCustomerStoryArchive(),
  ]);
  const featuredNav = buildFeaturedNav(posts, stories);

  return (
    <CtaContentProvider value={ctaContent}>
      <BookDemoProvider>
        <PageTransition>
          <Navbar featured={featuredNav} />
          <main className="flex-1">{children}</main>
        </PageTransition>
        <CTABand />
        <Footer />
        <BookDemoModal />
      </BookDemoProvider>
    </CtaContentProvider>
  );
}
