import Link from "next/link";
import Image from "next/image";
import { getFooterContent } from "@/lib/sanity/queries";
import FooterColumns from "@/components/layout/FooterColumns";

export default async function Footer() {
  const content = await getFooterContent();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sognos-navy text-white">
      {/* Main section — links left, brand right (mobile: brand top, links below) */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-x-[57px] gap-y-12 py-12 md:flex-row md:py-[96px]">
          {/* Brand block — LEFT on desktop, TOP on mobile */}
          <div className="flex shrink-0 flex-col gap-y-6 md:w-[300px]">
            <Link href="/" className="inline-block">
              <Image
                src={content.brandLogo}
                alt={content.brandLogoAlt}
                width={140}
                height={36}
                className="brightness-0 invert"
              />
            </Link>
            {content.tagline && (
              <p className="font-heading text-2xl leading-tight text-white/80 text-balance">
                {content.tagline}
              </p>
            )}
            {content.platformLogos.length > 0 && (
              <div className="flex items-center gap-4 pt-2">
                {content.platformLogos.map((logo) => (
                  <Image
                    key={`${logo.alt}-${logo.src}`}
                    src={logo.src}
                    alt={logo.alt}
                    width={24}
                    height={24}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Link columns — RIGHT on desktop, BELOW brand on mobile */}
          {content.columns.length > 0 && (
            <FooterColumns columns={content.columns} />
          )}
        </div>
      </div>

      {/* Bottom rows — acknowledgement above copyright/legal */}
      <div className="border-t border-white/10">
        {content.acknowledgement && (
          <div className="mx-auto max-w-7xl px-4 py-4">
            <p className="max-w-[720px] text-xs leading-relaxed text-white/30">
              {content.acknowledgement}
            </p>
          </div>
        )}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="text-xs text-white/40">
            © {year} {content.brandLogoAlt}. {content.copyrightSuffix}
          </p>
          {content.legalLinks.length > 0 && (
            <div className="flex items-center gap-x-6">
              {content.legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-white/40 transition-colors duration-200 hover:text-white"
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
