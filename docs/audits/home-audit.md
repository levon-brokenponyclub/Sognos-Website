# Home page audit — layout and design options

> **Date:** 2026-10-26 · **Live:** http://localhost:3002/ (redesign) · **Mockup:** `docs/mockups/home/index.html` (Inspector) + `home/options.html`
> Section order (live): Hero → Product cards → Trust strip → How Sognos Works → Solutions → CTA band → Industries → Customer Stories → News & Insights → Footer.

## Findings

| # | Section | Problem | Fix (all options) |
|---|---|---|---|
| 1 | Hero | Hero, product cards and trust strip are one 1,392px navy block. The trust strip sits below the fold of a dark hero, so it reads as part of the hero. | Split them into three sections, each with its own layout and tone. |
| 2 | Hero | The hero is centred on navy with no visual. The product story only starts in the cards. | Options add a product visual (A), an image stage (B) or a product index (C). |
| 3 | Product cards | The gradient panels read as empty colour blocks in the first view; all three cards have the same weight. | Photo-led panels (A), a bento with SognosCare leading (B), or editorial rows (C). |
| 4 | Trust strip | The title is an H3 at body weight on navy, and the strip has no surface of its own. | A logo row (A), a dark marquee (B), or a statement with tiles (C). |
| 5 | How Sognos Works | Centred header, then a full-width navy deck. The three steps only appear as small cards under a large panel. | Step cards with visuals (A), a connected flow (B), or autoplay tabs and a panel (C). The current deck is kept. |
| 6 | Solutions | The live page shows a review control ("Panel colour / Hero photo") above the slider. It is 2,361px tall for 4 items. | No review controls in production. Grid (A), dark cards (B), or an index with a preview (C). |
| 7 | CTA band | Navy-darkest (#060e28) is off the token ladder. | Tint panel (A), product-deep glow (B), or an editorial split (C). |
| 8 | Industries | The large tinted panels (pink / green) appear empty until their graphics load. | Photo cards (A), expanding columns (B), or numbered rows with sector rules (C). |
| 9 | Customer Stories | Saturated orange / purple quote cards are off-palette. Quotes have no photo or logo. | A featured split (A), a dark spotlight with logo tabs (B), or the story stage (C). |
| 10 | News & Insights | "View more resources" appears twice. | One link. A lead article plus list (A), dark cards (B), or an editorial index (C). |
| 11 | Footer | Covered by the shared footer rows. | Presets: A uses the light A2 rows, B the dark A3b rows, C the C rows. Every row stays switchable. |

**System:** A · Split (light), B · Immersive (dark), C · Editorial (signature soft). Each matches the product pages. The presets set every section, including the footer rows and the header state. The Sognos brand theme is the default. Copy is live: Hero.tsx, HomeProductCards, LogoStrip, HowSognosWorks, SolutionsSection, HeadlineCTA, IndustrySection, CustomerStories, and the Sanity knowledge posts. Live statuses inside visuals are illustrative.

## Kept

The existing home options stay selectable: the current hero (centred / split), the product cards (3-up / featured), the trust row, the How Sognos Works timer deck (motion 1 Pipeline / 2 Product / 3 Photo), and every footer row style.
