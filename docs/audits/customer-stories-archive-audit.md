# Customer Stories archive — layout + style audit

> **Route:** `/customer-stories` · `app/(marketing)/customer-stories/page.tsx` (static `STORIES`, 8 stories; card image = `components/ui/StoryCardImage` option C, shipped 2026-10-25).
> **Benchmarks:** the Knowledge Hub option 1 mockup (`docs/mockups/knowledge-hub/`), Frontline Related cards, AngelList SPVs rhythm, Paraform photo cards (Health & Social Care mockup).
> **Mode:** audit → HTML mockups → approval. Nothing in `.tsx` changed.

## Current page (rendered 2026-10-25)
White hero (H1 + intro) → featured block (lead story left, two stacked right) → `bg-gray-100` "Explore more stories" grid (5 cards) → global CTA.

## Findings

| # | Issue | Sev | Proposed fix |
|---|---|---|---|
| 1 | Grid section `bg-gray-100` — off the surface rules (`bg-white` / `bg-sognos-tint`). | P1 | `bg-sognos-tint`. |
| 2 | H1 `text-5xl md:text-6xl lg:text-7xl` + intro `text-lg` — off the page type scale used on product / solution / KH mockups. | P1 | `TYPE.h1` / `TYPE.heroSub`; `SectionLabel`. |
| 3 | No way to narrow 8 stories — no industry / product filter, no search; the archive will only grow. | P1 | Industry chips (and product) filtering in place — KH option 1 pattern. |
| 4 | Cards carry no proof: no quote, no customer size, no product used, though `ALL_STORIES` has quote + author + size for 4 stories and `productLogo` exists per story (unused on the archive). | P1 | Show product + industry tags; spotlight a quote (live copy). |
| 5 | Meta row is monospace uppercase with a boxed "Customer Story" chip on every card — repeats the page title and is the only mono type on the site. | P2 | Drop the chip; industry · date in the standard small meta. |
| 6 | Featured block: lead image `min-h-[16rem] lg:min-h-[26rem]` vs stacked 16:9 — two card languages in one block. | P2 | One card anatomy at two sizes. |
| 7 | "Read More" text with arrow only on the grid cards, none on featured. | P2 | One affordance (arrow) on all cards. |
| 8 | Titles repeat the company name ("Flourish Australia: …") under a logo that already says it. | P2 | Copy — **S1** (no change without approval). |
| 9 | Industry known for 4 of 8 stories only (`ALL_STORIES`); All Purpose Pumps, ASC, NECA, NPS have none. | — | **Q2** — needed for filtering. |

## Options (mocked)
- **A · Grid + filter (recommended):** light hero with search, industry chips (filter in place), featured split card (brand image + live quote + author), then a 3-col grid of Frontline-style cards (brand image, company, title, product + industry tags, Read story).
- **B · Index + rail:** sticky left rail (search, industry list with counts, products), rows with brand tile thumbnail, company, title, tags, date — fastest scan, most compact.
- **C · Spotlight + bento:** navy spotlight carousel of the 4 quoted stories (photo, quote, author, company size), then a bento grid mixing photo cards and brand-image cards.

## QUESTIONS
- **Q1** — Layout: A (recommended) / B / C.
- **Q2** — Industries for All Purpose Pumps, Asset Security Concepts, NECA, Natural Power Solutions. Mockups use *proposed* values (Industrial Services, Facilities Management, Industrial Services, Energy & Utilities) — confirm or correct.
- **Q3** — Card image: StoryCardImage (brand facets, shipped) or customer photo (`/images/customers/*`) — mocks use brand images in A/B and both in C.

## SUGGESTIONS
- **S1** — Drop the company prefix from titles where the logo already names it (copy).
- **S2** — Add a result stat per story (needs real figures from the case studies).
- **S3** — Move stories to Sanity (currently static, duplicated between `page.tsx` and `ProductCustomerStories`).
