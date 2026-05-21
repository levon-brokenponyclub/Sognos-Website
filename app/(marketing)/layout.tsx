import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookDemoModal from "@/components/ui/BookDemoModal";
import { BookDemoProvider } from "@/lib/BookDemoContext";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BookDemoProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BookDemoModal />
    </BookDemoProvider>
  );
}
