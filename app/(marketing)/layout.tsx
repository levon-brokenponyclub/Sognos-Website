import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EventBanner from "@/components/layout/EventBanner";
import BookDemoModal from "@/components/ui/BookDemoModal";
import { BookDemoProvider } from "@/lib/BookDemoContext";
import { CtaContentProvider } from "@/lib/CtaContentContext";
import { getBannerEvent, getCtaSectionContent } from "@/lib/sanity/queries";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ctaContent, bannerEvent] = await Promise.all([
    getCtaSectionContent(),
    getBannerEvent(),
  ]);

  return (
    <CtaContentProvider value={ctaContent}>
      <BookDemoProvider>
        {bannerEvent && <EventBanner event={bannerEvent} />}
        <Navbar bannerEvent={bannerEvent} />
        <main className="flex-1">{children}</main>
        <Footer />
        <BookDemoModal />
      </BookDemoProvider>
    </CtaContentProvider>
  );
}
