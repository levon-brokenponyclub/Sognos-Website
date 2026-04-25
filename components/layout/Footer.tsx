import Link from "next/link";
import { INDUSTRIES, PRODUCTS, SITE, SOLUTIONS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gradient-hero text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-white"
            >
              {SITE.name}
            </Link>
            <p className="mt-2 text-sm text-white">{SITE.tagline}</p>
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
                  href="/company/careers"
                  className="text-sm text-white hover:text-white"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/customers"
                  className="text-sm text-white hover:text-white"
                >
                  Customers
                </Link>
              </li>
              <li>
                <Link
                  href="/knowledge-hub"
                  className="text-sm text-white hover:text-white"
                >
                  Resources
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

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-white">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-white hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-white hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
