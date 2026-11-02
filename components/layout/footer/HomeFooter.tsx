import Image from "next/image";
import Link from "next/link";
import { getFooterContent } from "@/lib/sanity/queries";
import { ACCREDITATIONS } from "@/lib/content/accreditations";
import { CTA_BAND_DEFAULTS } from "@/lib/content/ctaBand";
import { TYPE } from "@/components/layout/sections/sognoscare/typeScale";
import SolutionHeroDemoButton from "@/components/layout/sections/SolutionHeroDemoButton";
import FooterBottomBar from "@/components/layout/footer/FooterBottomBar";
import { buildFooterLayout } from "@/components/layout/footer/footer.data";
import { AcknowledgementText, WORDMARK } from "@/components/layout/footer/Footer";

// Homepage footer — Home Inspector rows (docs/mockups/home/index.html,
// 2026-11-02), shown on `/` only (FooterSwitch): CTA A3a statement on
// navy-darkest, all white; then on navy-dark the A1 menu (Products as dot
// rows + link columns), accreditations A3a (white/5 card), acknowledgement,
// legals and the wordmark graphic (white/10).

const WHITE_FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default async function HomeFooter() {
  const content = await getFooterContent();
  const { products, columns } = buildFooterLayout(content);
  const groups = columns.flat().filter((g) => g.title !== "Legal");
  const cta = CTA_BAND_DEFAULTS;

  return (
    <footer className="text-white">
      {/* CTA A3a — statement (7) beside the line and actions (5). */}
      <section className="bg-sognos-navy-darkest py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-8 px-6 lg:grid-cols-12 lg:gap-10">
          <h2 className="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-balance text-white md:text-6xl lg:col-span-7">
            {cta.heading}
          </h2>
          <div className="lg:col-span-5">
            <p className={`${TYPE.body} text-white/75`}>{cta.subheading}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <SolutionHeroDemoButton
                label={cta.ctaLabel}
                className="min-h-11 px-7 transition-colors hover:bg-white hover:text-sognos-heading hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-[.97]"
              />
              <Link
                href={cta.secondary.href}
                className={`inline-flex min-h-11 items-center gap-1.5 px-2 text-base font-medium text-white transition-opacity hover:opacity-80 ${WHITE_FOCUS}`}
              >
                {cta.secondary.label} <span aria-hidden="true">&#8599;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-sognos-navy-dark">
        {/* Menu A1 — Products as dot rows (4), link columns (2 each). */}
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-12">
            {products.length > 0 && (
              <nav aria-label="Products" className="sm:col-span-2 lg:col-span-4">
                <p className="text-sm text-white/60">Products</p>
                <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                  {products.map((p) => (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        className={`group flex min-h-14 items-center justify-between gap-4 py-3 ${WHITE_FOCUS}`}
                      >
                        <span className="flex items-center gap-3">
                          <span aria-hidden="true" className="size-2.5 rounded-full" style={{ background: p.colour }} />
                          <span className="font-heading text-xl text-white">{p.label}</span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-white/60 transition-[color,translate] duration-200 group-hover:translate-x-0.5 group-hover:text-sognos-blue-accent"
                        >
                          &rarr;
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            {groups.map((group) => (
              <nav key={group.title} aria-label={group.title} className="lg:col-span-2">
                <p className="text-sm text-white/60">{group.title}</p>
                <ul className="mt-4 space-y-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`inline-flex min-h-9 items-center text-sm text-white/85 transition-colors hover:text-white ${WHITE_FOCUS}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Accreditations A3a — white/5 card, logos on white tiles. */}
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-1 gap-6 rounded-lg border border-white/10 bg-white/5 p-6 lg:grid-cols-12 lg:items-center lg:p-8">
            <p className="text-sm text-white/60 lg:col-span-3">Accreditations &amp; memberships</p>
            <ul
              aria-label="Accreditations and memberships"
              className="flex flex-wrap gap-3 lg:col-span-9 lg:justify-end lg:gap-4"
            >
              {ACCREDITATIONS.map((item) => {
                const mark = (
                  <span className="flex h-16 items-center justify-center rounded bg-white px-5">
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
                        className={`block transition-opacity duration-200 hover:opacity-80 ${WHITE_FOCUS}`}
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

        {/* Acknowledgement A3a */}
        {content.acknowledgement && (
          <div className="mx-auto max-w-7xl px-6 py-10">
            <p className="mx-auto max-w-4xl text-center text-xs leading-relaxed text-white/70">
              <AcknowledgementText text={content.acknowledgement} />
            </p>
          </div>
        )}

        {/* Legals A3a */}
        <div className="mx-auto max-w-7xl px-6">
          <FooterBottomBar
            tone="dark"
            owner={content.brandLogoAlt}
            suffix={content.copyrightSuffix}
            legalLinks={content.legalLinks}
          />
        </div>

        {/* Footer graphic A3a — the wordmark at white/10, cropped by the foot. */}
        <div aria-hidden="true" className="h-[9vw] max-h-32 overflow-hidden px-6">
          <div
            className="mx-auto aspect-[223/57] w-full max-w-[calc(80rem-3rem)] bg-white/10"
            style={WORDMARK}
          />
        </div>
      </div>
    </footer>
  );
}

