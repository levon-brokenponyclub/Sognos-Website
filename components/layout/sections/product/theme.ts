// Per-product surfaces for the shared product sections (Products Inspector
// port, docs/mockups/products). Literal class names so Tailwind sees them.
// `tone` is the "product" section colour: Care and Genogram use their base;
// Roster uses its dark, because white on Roster base is only 3.1:1.

export type ProductKey = "care" | "roster" | "genogram";

type ProductTheme = {
  name: string;
  /** BookDemoContext product key. */
  demoKey: "sognoscare" | "sognosroster" | "sognosgenogram";
  /** Hero B gradient (mockup: 135° dark/deep → base). */
  heroGradient: string;
  /** Hero glow colours: product base + secondary. */
  glow: [string, string];
  /** Photo wash: dark → base. */
  wash: [string, string];
  tone: string;
  /** Marker / underline / CTA hover in the product colour. */
  markBg: string;
  decoration: string;
  hoverBg: string;
  /** Feature cards: tagline + copy rule (product ink). */
  inkText: string;
  inkBorder: string;
};

export const PRODUCT_THEME: Record<ProductKey, ProductTheme> = {
  care: {
    name: "SognosCare",
    demoKey: "sognoscare",
    heroGradient:
      "linear-gradient(135deg, var(--sognos-care-dark) 0%, #203e71 55%, var(--sognos-care-base) 100%)",
    glow: ["var(--sognos-care-base)", "var(--sognos-blue-accent)"],
    wash: ["var(--sognos-care-dark)", "var(--sognos-care-base)"],
    tone: "bg-sognos-care-base",
    markBg: "bg-sognos-care-base",
    decoration: "decoration-sognos-care-base",
    hoverBg: "hover:bg-sognos-care-base",
    inkText: "text-sognos-care-ink",
    inkBorder: "border-sognos-care-ink",
  },
  roster: {
    name: "SognosRoster",
    demoKey: "sognosroster",
    heroGradient:
      "linear-gradient(135deg, var(--sognos-roster-deep) 0%, var(--sognos-roster-dark) 55%, var(--sognos-roster-base) 100%)",
    glow: ["var(--sognos-roster-base)", "var(--sognos-roster-accent)"],
    wash: ["var(--sognos-roster-dark)", "var(--sognos-roster-base)"],
    tone: "bg-sognos-roster-dark",
    markBg: "bg-sognos-roster-base",
    decoration: "decoration-sognos-roster-base",
    hoverBg: "hover:bg-sognos-roster-base",
    inkText: "text-sognos-roster-ink",
    inkBorder: "border-sognos-roster-ink",
  },
  genogram: {
    name: "SognosGenogram",
    demoKey: "sognosgenogram",
    heroGradient:
      "linear-gradient(135deg, var(--sognos-genogram-deep) 0%, #4a1670 55%, var(--sognos-genogram-base) 100%)",
    glow: ["var(--sognos-genogram-base)", "#c084c9"],
    wash: ["var(--sognos-genogram-dark)", "var(--sognos-genogram-base)"],
    tone: "bg-sognos-genogram-base",
    markBg: "bg-sognos-genogram-base",
    decoration: "decoration-sognos-genogram-base",
    hoverBg: "hover:bg-sognos-genogram-base",
    inkText: "text-sognos-genogram-ink",
    inkBorder: "border-sognos-genogram-ink",
  },
};
