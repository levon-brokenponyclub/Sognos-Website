import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <BookDemoModal />
      </BookDemoProvider>
    </CtaContentProvider>
  );
}
