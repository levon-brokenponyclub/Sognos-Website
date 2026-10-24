// SognosCare type + spacing scale (2026-10-24 polish pass, approved mockups in
// docs/mockups/sognoscare/). One source for every section on the page so the
// sizes can't drift. Benchmark: angellist.com SPVs / scout-funds.
export const TYPE = {
  h1: "font-heading text-5xl font-normal leading-[1.05] tracking-[-0.02em] text-balance md:text-6xl lg:text-7xl",
  heroSub: "max-w-2xl text-lg leading-relaxed text-pretty",
  h2: "font-heading text-3xl font-normal leading-[1.2] tracking-[-0.01em] text-balance md:text-4xl",
  lede: "max-w-2xl text-base leading-relaxed text-pretty",
  h3: "font-heading text-2xl font-normal leading-[1.25] tracking-[-0.01em] md:text-[1.75rem]",
  h3Step: "font-heading text-[1.375rem] font-normal leading-[1.4] tracking-[-0.0035em]",
  h3Small: "font-heading text-lg font-normal leading-snug tracking-[-0.005em]",
  body: "text-base leading-relaxed",
  small: "text-sm leading-normal",
  numeral:
    "font-heading text-5xl font-normal leading-[1.05] tracking-[-0.01em] tabular-nums",
} as const;

export const LAYOUT = {
  section: "py-20 md:py-28",
  // Header block: heading + lede stack.
  head: "flex max-w-[770px] flex-col gap-4",
  // Header → content.
  gap: "mt-10 md:mt-16 xl:mt-20",
  // 12-col rail: label in cols 1–2, content from col 3.
  rail: "grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8",
  railLabel: "lg:col-span-2",
  content: "min-w-0 lg:col-[3/-1]",
  // Anchor jumps clear the 80px navbar + the 46px section bar.
  anchor: "scroll-mt-32",
} as const;
