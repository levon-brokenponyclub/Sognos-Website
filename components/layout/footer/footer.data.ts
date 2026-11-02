import type { FooterContent, FooterLink } from "@/lib/content/footer";

// Footer link grouping, derived from the Sanity footer content (schema and query
// untouched). Links are sorted by route so every href in the CMS columns
// lands somewhere — anything unmatched falls through to Company.

export type FooterLinkGroupData = { title: string; links: FooterLink[] };
export type FooterProductLink = FooterLink & { colour: string };
export type FooterLayout = {
  products: FooterProductLink[];
  columns: FooterLinkGroupData[][];
};

// Product dot colours: each product's own base token.
const PRODUCT_COLOURS: Record<string, string> = {
  "/products/sognoscare": "var(--sognos-care-base)",
  "/products/sognosroster": "var(--sognos-roster-base)",
  "/products/sognosgenogram": "var(--sognos-genogram-base)",
};

const RESOURCE_PREFIXES = [
  "/knowledge-hub",
  "/customer-stories",
  "/news",
  "/events",
];

const startsWithAny = (href: string, prefixes: readonly string[]) =>
  prefixes.some((p) => href === p || href.startsWith(`${p}/`));

export function buildFooterLayout(content: FooterContent): FooterLayout {
  const seen = new Set<string>();
  const links = content.columns
    .flatMap((c) => c.links)
    .filter((l) => (seen.has(l.href) ? false : (seen.add(l.href), true)));

  const take = (match: (href: string) => boolean) =>
    links.filter((l) => match(l.href));

  const products = take((h) => h.startsWith("/products/")).map((l) => ({
    ...l,
    colour: PRODUCT_COLOURS[l.href] ?? "var(--sognos-blue-accent)",
  }));
  const solutions = take((h) => h.startsWith("/solutions/"));
  const industries = take((h) => h.startsWith("/industries/"));
  const resources = take((h) => startsWithAny(h, RESOURCE_PREFIXES));
  const company = take(
    (h) =>
      !h.startsWith("/products/") &&
      !h.startsWith("/solutions/") &&
      !h.startsWith("/industries/") &&
      !startsWithAny(h, RESOURCE_PREFIXES),
  );

  const nonEmpty = (groups: FooterLinkGroupData[]) =>
    groups.filter((g) => g.links.length > 0);

  return {
    products,
    // One inner array per grid column; Industries sits under Solutions.
    columns: [
      nonEmpty([
        { title: "Solutions", links: solutions },
        { title: "Industries", links: industries },
      ]),
      nonEmpty([{ title: "Resources", links: resources }]),
      nonEmpty([{ title: "Company", links: company }]),
      nonEmpty([{ title: "Legal", links: content.legalLinks }]),
    ].filter((col) => col.length > 0),
  };
}
