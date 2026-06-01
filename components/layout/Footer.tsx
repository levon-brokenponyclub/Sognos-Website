import Link from "next/link";
import Image from "next/image";
import { getFooterContent } from "@/lib/sanity/queries";

export default async function Footer() {
  const content = await getFooterContent();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-gradient-hero text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col">
            <Link href="/" className="inline-block">
              <Image
                src={content.brandLogo}
                alt={content.brandLogoAlt}
                width={140}
                height={36}
                className="brightness-0 invert"
              />
            </Link>
            <p className="mt-2 text-sm text-white/80 max-w-sm">
              {content.tagline}
            </p>
            {content.platformLogos.length > 0 && (
              <div className="mt-auto flex items-center gap-4 pt-6">
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

          {/* Columns */}
          {content.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-white">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-white hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Acknowledgement of Country */}
        {content.acknowledgement && (
          <div className="mt-12 border-t border-white/15 pt-8">
            <p className="text-xs leading-relaxed text-white/60 max-w-4xl">
              {content.acknowledgement}
            </p>
          </div>
        )}

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-white">
            &copy; {year} {content.brandLogoAlt}. {content.copyrightSuffix}
          </p>
          <div className="flex gap-6">
            {content.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
