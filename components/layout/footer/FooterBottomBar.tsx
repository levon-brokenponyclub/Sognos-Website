import Link from "next/link";

// Copyright row with the legal links (footer legals row A2).

export default function FooterBottomBar({
  owner,
  suffix,
  legalLinks = [],
}: {
  owner: string;
  suffix: string;
  legalLinks?: { label: string; href: string }[];
}) {
  const year = new Date().getFullYear();
  return (
    <div className="flex flex-col items-start gap-4 border-t border-sognos-line py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <p className="text-sm text-sognos-body">
        © {year} {owner}. {suffix}
      </p>
      {legalLinks.length > 0 && (
        <ul className="flex flex-wrap items-center gap-x-6">
          {legalLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center text-sm text-sognos-body transition-colors hover:text-sognos-blue-accent focus-visible:outline-2 focus-visible:outline-sognos-blue-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
