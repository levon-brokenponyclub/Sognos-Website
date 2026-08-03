import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import CTABand from "@/components/layout/sections/CTABand";
import BookDemoModal from "@/components/ui/BookDemoModal";
import { BookDemoProvider } from "@/lib/BookDemoContext";
import { CtaContentProvider } from "@/lib/CtaContentContext";
import {
  getCtaSectionContent,
  getKnowledgePostArchive,
  getUpcomingEvents,
} from "@/lib/sanity/queries";
import { buildFeaturedNav } from "@/lib/featuredNav";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Navbar is a client component, so the Knowledge Hub dropdown's featured
  // column is resolved here and passed down.
  const [ctaContent, posts, events] = await Promise.all([
    getCtaSectionContent(),
    getKnowledgePostArchive(),
    getUpcomingEvents(),
  ]);
  const featuredNav = buildFeaturedNav(posts, events);

  return (
    <CtaContentProvider value={ctaContent}>
      <BookDemoProvider>
        {/* Navbar sits outside the transition: it is persistent chrome, and
            keeping it out means a navigation no longer remounts it and the
            fade cannot take the whole site with it. */}
        <Navbar featured={featuredNav} />
        <PageTransition>
          <main className="flex-1">{children}</main>
        </PageTransition>
        <CTABand />
        <Footer />
        <BookDemoModal />
      </BookDemoProvider>
    </CtaContentProvider>
  );
}
