import Image from "next/image";
import Link from "next/link";
import { getFooterContent } from "@/lib/sanity/queries";
import { ACCREDITATIONS } from "@/lib/content/accreditations";
import { CTA_BAND_DEFAULTS } from "@/lib/content/ctaBand";
import CTABand from "@/components/layout/sections/CTABand";
import FooterBottomBar from "@/components/layout/footer/FooterBottomBar";
import { buildFooterLayout } from "@/components/layout/footer/footer.data";

// Footer — Products Inspector rows (2026-11-02): CTA strip C on the accent,
// then on the brand tint: menu C (index rows: label rail + links),
// accreditations A2 (white card), acknowledgement A2, legals A2 and the
// Sognos wordmark graphic A2. Footer B is kept in .backups/footer-b-2026-11-02/.

const ACKNOWLEDGEMENT_BREAK_AFTER =
  "We respect and honour Aboriginal and Torres Strait Islander Elders past, present, and future.";

export function AcknowledgementText({ text }: { text: string }) {
  const breakAt = text.indexOf(ACKNOWLEDGEMENT_BREAK_AFTER);
  if (breakAt === -1) return text;
  const firstLineEnd = breakAt + ACKNOWLEDGEMENT_BREAK_AFTER.length;
  const secondLine = text.slice(firstLineEnd).trimStart();
  return (
    <>
      {text.slice(0, firstLineEnd)}
      {secondLine && (
        <>
          <br />
          {secondLine}
        </>
      )}
    </>
  );
}

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-blue-accent";

// Sognos wordmark as a mask, filled navy (footer graphic A2).
export const WORDMARK = {
  WebkitMask: "url(/logos/sognos-logo.svg) center top / 100% auto no-repeat",
  mask: "url(/logos/sognos-logo.svg) center top / 100% auto no-repeat",
};

function IndexRow({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-3 border-t border-sognos-line py-6 first:border-t-0 md:grid-cols-12 md:gap-8">
      <p className="flex items-center gap-2.5 text-base text-sognos-heading md:col-span-3">
        <span aria-hidden="true" className="block size-[0.66em] shrink-0 bg-sognos-blue-accent" />
        {name}
      </p>
      <nav aria-label={name} className="md:col-span-9">
        {children}
      </nav>
    </div>
  );
}

export default async function Footer() {
  const content = await getFooterContent();
  const { products, columns } = buildFooterLayout(content);
  // Legal links sit in the legals row, not the menu.
  const groups = columns.flat().filter((g) => g.title !== "Legal");

  return (
    <footer className="bg-sognos-tint text-sognos-body">
      <CTABand {...CTA_BAND_DEFAULTS} variant="strip" />

      {/* Menu C — index rows */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        {products.length > 0 && (
          <IndexRow name="Products">
            <ul className="flex flex-wrap gap-2">
              {products.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-sognos-line bg-white px-4 text-sm text-sognos-heading transition-colors hover:border-sognos-heading ${FOCUS}`}
                  >
                    <span aria-hidden="true" className="size-2 rounded-full" style={{ background: p.colour }} />
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </IndexRow>
        )}
        {groups.map((group) => (
          <IndexRow key={group.title} name={group.title}>
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`inline-flex min-h-10 items-center text-base text-sognos-heading underline-offset-4 transition-colors hover:text-sognos-blue-accent hover:underline ${FOCUS}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </IndexRow>
        ))}
      </div>

      {/* Accreditations A2 — white card; the NSW and THT marks are
          dark-on-light, so they sit on tint tiles. */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-6 rounded border border-sognos-line bg-white p-6 lg:grid-cols-12 lg:items-center lg:p-8">
          <p className="text-sm text-sognos-muted lg:col-span-3">Accreditations &amp; memberships</p>
          <ul
            aria-label="Accreditations and memberships"
            className="flex flex-wrap gap-3 lg:col-span-9 lg:justify-end lg:gap-4"
          >
            {ACCREDITATIONS.map((item) => {
              const mark = (
                <span className="flex h-16 items-center justify-center rounded bg-sognos-tint px-5">
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
                      className={`block transition-opacity duration-200 hover:opacity-80 ${FOCUS}`}
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

      {/* Acknowledgement A2 */}
      {content.acknowledgement && (
        <div className="mx-auto max-w-7xl px-6 py-10">
          <p className="mx-auto max-w-4xl text-center text-xs leading-relaxed text-sognos-body">
            <AcknowledgementText text={content.acknowledgement} />
          </p>
        </div>
      )}

      {/* Legals A2 */}
      <div className="mx-auto max-w-7xl px-6">
        <FooterBottomBar
          owner={content.brandLogoAlt}
          suffix={content.copyrightSuffix}
          legalLinks={content.legalLinks}
        />
      </div>

      {/* Footer graphic A2 — the wordmark, cropped by the footer foot. */}
      <div aria-hidden="true" className="h-[9vw] max-h-32 overflow-hidden px-6">
        <div
          className="mx-auto aspect-[223/57] w-full max-w-[calc(80rem-3rem)] bg-sognos-navy-dark"
          style={WORDMARK}
        />
      </div>
    </footer>
  );
}
