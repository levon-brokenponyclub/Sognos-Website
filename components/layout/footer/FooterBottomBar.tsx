import Link from "next/link";

// Copyright row with the legal links (footer legals row A2; `tone="dark"`
// is A3a, the homepage footer on navy-dark).

export default function FooterBottomBar({
  owner,
  suffix,
  legalLinks = [],
  tone = "light",
}: {
  owner: string;
  suffix: string;
  legalLinks?: { label: string; href: string }[];
  tone?: "light" | "dark";
}) {
  const year = new Date().getFullYear();
  const dark = tone === "dark";
  return (
    <div className={`flex flex-col items-start gap-4 border-t py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6 ${dark ? "border-white/10" : "border-sognos-line"}`}>
      <p className={`text-sm ${dark ? "text-white/80" : "text-sognos-body"}`}>
        © {year} {owner}. {suffix}
      </p>
      {legalLinks.length > 0 && (
        <ul className="flex flex-wrap items-center gap-x-6">
          {legalLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`inline-flex min-h-11 items-center text-sm transition-colors focus-visible:outline-2 ${dark ? "text-white/80 hover:text-white focus-visible:outline-white" : "text-sognos-body hover:text-sognos-blue-accent focus-visible:outline-sognos-blue-accent"}`}
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
