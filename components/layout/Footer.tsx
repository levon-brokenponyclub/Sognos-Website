import Link from "next/link";
import Image from "next/image";
import { INDUSTRIES, PRODUCTS, SITE, SOLUTIONS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gradient-hero text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col">
            <Link href="/" className="inline-block">
              <Image
                src="/logos/sognos-logo.svg"
                alt={SITE.name}
                width={140}
                height={36}
                className="brightness-0 invert"
              />
            </Link>
            <p className="mt-2 text-sm text-white/80 max-w-sm">
              {SITE.tagline}
            </p>
            <div className="mt-auto flex items-center gap-4 pt-6">
              <Image
                src="/logos/Microsoft-icon-logo.svg"
                alt="Microsoft"
                width={20}
                height={20}
              />
              <Image
                src="/logos/Dynamics365.svg"
                alt="Dynamics 365"
                width={24}
                height={24}
              />
              <Image
                src="/logos/copilot-logo.png"
                alt="Microsoft Copilot"
                width={24}
                height={24}
              />
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-white">Products</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href={PRODUCTS.care.href}
                  className="text-sm text-white hover:text-white"
                >
                  {PRODUCTS.care.name}
                </Link>
              </li>
              <li>
                <Link
                  href={PRODUCTS.roster.href}
                  className="text-sm text-white hover:text-white"
                >
                  {PRODUCTS.roster.name}
                </Link>
              </li>
              <li>
                <Link
                  href={PRODUCTS.genogram.href}
                  className="text-sm text-white hover:text-white"
                >
                  {PRODUCTS.genogram.name}
                </Link>
              </li>
            </ul>
          </div>

          {/* Alignment note: Footer taxonomy now mirrors the approved top-level architecture. */}
          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-white">Solutions</h3>
            <ul className="mt-4 space-y-3">
              {SOLUTIONS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-sm font-semibold text-white">Industries</h3>
            <ul className="mt-4 space-y-3">
              {INDUSTRIES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/company/about"
                  className="text-sm text-white hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/company/social-responsibility"
                  className="text-sm text-white hover:text-white"
                >
                  Social Responsibility
                </Link>
              </li>
              {/* <li>
                 <Link
                   href="/company/careers"
                   className="text-sm text-white hover:text-white"
                 >
                   Careers
                 </Link>
               </li> */}
              <li>
                <Link
                  href="/customer-stories"
                  className="text-sm text-white hover:text-white"
                >
                  Customer Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/knowledge-hub"
                  className="text-sm text-white hover:text-white"
                >
                  Knowledge Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Acknowledgement of Country */}
        <div className="mt-12 border-t border-white/15 pt-8">
          <p className="text-xs leading-relaxed text-white/60 max-w-4xl">
            We respect and honour Aboriginal and Torres Strait Islander Elders
            past, present, and future. We acknowledge the stories, traditions,
            and living cultures of Aboriginal and Torres Strait Islander peoples
            on the lands upon which we work and live, and commit to building a
            brighter future together.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-white">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/company/privacy-policy"
              className="text-sm text-white hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link href="/company/privacy-collection-notice"
              className="text-sm text-white hover:text-white">
              Privacy Collection Notice
            </Link>
            <Link href="/company/isms-policy"
              className="text-sm text-white hover:text-white">
                ISMS Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
