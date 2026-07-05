import Link from "next/link";
import { getFooterContent } from "@/lib/sanity/queries";
import FooterColumns from "@/components/layout/FooterColumns";

export default async function Footer() {
  const content = await getFooterContent();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sognos-navy-dark text-white">
      {/* Main — 4 link columns, equally spaced across full width */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-x-16 gap-y-12 py-12 md:flex-row md:py-14">
          {content.columns.length > 0 && (
            <FooterColumns columns={content.columns} />
          )}
        </div>
      </div>

      {/* Bottom row 1 — acknowledgement */}
      {content.acknowledgement && (
        <div className="mx-auto max-w-7xl px-6">
          <div className="border-t border-white/10 py-8">
            <p className="max-w-5xl text-left text-sm leading-relaxed text-white/50">
              {content.acknowledgement}
            </p>
          </div>
        </div>
      )}

      {/* Bottom row 2 — copyright left, legal links right */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start gap-4 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="text-sm text-white">
            © {year} {content.brandLogoAlt}. {content.copyrightSuffix}
          </p>
          {content.legalLinks.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-6">
              {content.legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/80 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
