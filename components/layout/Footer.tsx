import Link from "next/link";
import Image from "next/image";
import { getFooterContent } from "@/lib/sanity/queries";
import FooterColumns from "@/components/layout/FooterColumns";
import { ACCREDITATIONS } from "@/lib/content/accreditations";

const ACKNOWLEDGEMENT_BREAK_AFTER =
  "We respect and honour Aboriginal and Torres Strait Islander Elders past, present, and future.";

function AcknowledgementText({ text }: { text: string }) {
  const breakAt = text.indexOf(ACKNOWLEDGEMENT_BREAK_AFTER);

  if (breakAt === -1) {
    return text;
  }

  const firstLineEnd = breakAt + ACKNOWLEDGEMENT_BREAK_AFTER.length;
  const firstLine = text.slice(0, firstLineEnd);
  const secondLine = text.slice(firstLineEnd).trimStart();

  return (
    <>
      {firstLine}
      {secondLine && (
        <>
          <br />
          {secondLine}
        </>
      )}
    </>
  );
}

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

      {/* Bottom row 1 — accreditations & memberships.
          White tiles rather than bare logos on the navy: only AIDH ships a
          reversed version, and the NSW and THT marks are dark-on-light, so they
          would be unreadable directly on the footer. Tiling all three keeps the
          row consistent instead of one bare logo beside two chips. Static rather
          than CMS-driven — these change rarely. */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-4 border-t border-white/10 py-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
            Accreditations &amp; memberships
          </p>
          <ul className="flex flex-wrap items-stretch justify-center gap-3 lg:gap-4">
            {ACCREDITATIONS.map((item) => {
              const mark = (
                <span className="flex h-16 items-center justify-center rounded-lg bg-white px-5">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className="h-9 w-auto object-contain"
                  />
                </span>
              );
              return (
                <li key={item.alt}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener"
                      title={item.title ?? item.alt}
                      className="block transition-opacity duration-200 hover:opacity-80"
                    >
                      {mark}
                    </a>
                  ) : (
                    mark
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Bottom row 2 — acknowledgement */}
      {content.acknowledgement && (
        <div className="mx-auto max-w-7xl px-6">
          <div className="border-t border-white/10 py-8">
            <p className="text-xs leading-relaxed text-white/80 text-center mx-auto max-w-4xl">
              <AcknowledgementText text={content.acknowledgement} />
            </p>
          </div>
        </div>
      )}

      {/* Bottom row 3 — copyright left, legal links right */}
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
