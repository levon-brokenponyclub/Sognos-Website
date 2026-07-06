# Content Audit — Knowledge Hub + Customer Stories

> **Read-only audit, 2026-07-07.** Data pulled live from Sanity (`vg117fxr` / `production`, anonymous query API) across **all published docs**: **19 Knowledge Hub posts**, **8 Customer Stories**. Feeds follow-up build prompts — no code/schema changed here.

---

## Part A — Inventory

### A0. Schema vs. reality — headline findings

| Finding | Detail | Severity |
|---|---|---|
| **No missing renderers** | Every block type present in real content is handled by the current `portableComponents`. No silent fallbacks. | ✅ clean |
| **`blockquote` defined but never used (KH)** | `knowledgePost.body` allows a `blockquote` style; **0 of 19** posts use it. The renderer's upgraded accent pull-quote treatment is dead code today. | ⚠️ opportunity |
| **`calloutBlock` unused (CS)** | The `calloutBlock` type added to `customerStory` on 2026-07-06 has **0 uses** so far (expected — brand new). Not on `knowledgePost` at all. | ℹ️ adoption pending |
| **Customer-story `heroImage` is populated 8/8 but no longer rendered** | The Amigo hero refactor dropped `story.heroImage`; every story still has one in Sanity. Dead data / the hero's empty right column has an obvious existing fill. | ⚠️ notable |
| **Sidebar label drift** | 7/8 stories label the product field `Product`; **1 uses `Products`** (plural) → won't match `sidebarValue(…, "Product")`. | 🐛 data hygiene |
| **KH `quote` field unused** | 0/19 KH posts populate a quote field (quotes are a Customer-Story concept). | ℹ️ noise |

### A1. Portable Text block usage

**Knowledge Hub (19 posts):**
| Kind | Values → frequency |
|---|---|
| Block styles | `normal` ×475, `h2` ×105, `blockquote` **×0** |
| Lists | `bullet` ×123, `number` ×11 |
| Marks | `strong` ×182, `link` (annotation) ×134, `em` ×20 |
| Custom types | `inlineImage` ×22 |

**Customer Stories (8 stories):**
| Kind | Values → frequency |
|---|---|
| Block styles | `normal` ×121, `h2` ×29 (schema has **no** blockquote for CS) |
| Lists | `bullet` ×97 (heavy), `number` ×0 |
| Marks | `em` ×1, `strong` ×0, `link` ×0 |
| Custom types | `inlineImage` ×18, `calloutBlock` **×0** |

### A2. Images
- **KH:** 22 inline images, **all have alt text**; 19/19 have a hero image.
- **CS:** 18 inline images, **all have alt text**; 8/8 have a hero image (now unrendered — see A0).
- **No caption field exists** on `inlineImage` in either schema — captions/credits are impossible today. Inline images render uniformly `w-full rounded-lg object-cover` (consistent, but no per-image sizing/caption control).

### A3. Blockquotes / pull-quotes
- **Body blockquotes: 0** in both content types. KH *could* have them (unused); CS *cannot* (not in schema).
- Customer-story quotes live in the dedicated **`quote` + `quoteAuthor` fields**, populated **5/8** (now rendered as the hero pull-quote). 3 stories have no quote.
- No attribution structure inside body quotes (there are none). No distinction between "pull-quote for emphasis" and "cited external quote" — there's no citation field anywhere.

### A4. Structure
- **KH heading counts:** `[0,0,0,0,0, 1,3,3,3,4,5,5,6,7,9,12,12,15,20]` — **5 posts are flat (0 `h2`)** → the new scroll-spy rail shows nothing for those. Only `h2` is used (no `h3`/`h4` in schema), so hierarchy is flat-by-design; no skipped-level issues.
- **KH length:** 62–1251 words, median **794**.
- **CS heading counts:** all **3–4 `h2`** — consistently sectioned.
- **CS length:** 150–369 words, median **270** (short, bullet-heavy).
- **CS product/industry map** (source = `sidebar`, since **products are never named in CS body text**):

  | Story | Industry | Product (sidebar) |
  |---|---|---|
  | all-purpose-pumps | Industrial Services | SognosRoster |
  | asset-security-concepts | Facilities Management | SognosRoster |
  | auckland-airport | Facilities Management | SognosRoster |
  | flourish-australia | Health & Social Care | SognosCare |
  | gentari | Energy & Utilities | SognosRoster |
  | natural-power-solutions | Energy & Utilities | SognosRoster |
  | neca | Industrial Services | **— (missing)** |
  | penrith-city-council | Local Government | SognosRoster |

### A5. Metadata
- **KH categories:** Insights ×12, News ×4, Events/Webinar/Milestone ×1 each.
- **KH author:** **all 19 = "Sognos Solutions"** (no author variety — the author block was correctly removed from the page).
- **KH optional fields:** `readTime` 18/19, `industry` 11/19, `useCase` **2/19** (nearly dead).
- **CS sidebar population:** `Industry` 8/8, `State` 8/8, `Size` 8/8, `Product` 7/8 (+1 mislabeled `Products`).
- **Stats in body:** genuine figures (%/$) appear in only ~3 posts (`innovation-in-aged-care` $730/15%; `mental-health-and-disability-workforce` 16%/26%/62%; `auckland-airport` 100%). Everything else is years or "365" (Dynamics 365), not stats.

---

## Part B — Opportunities

### HIGH

**1. `ProductSpotlightBlock` — end-of-article product card**
*What:* A branded card (full-colour product logo + tagline + one-line description + "Explore →") shown at the end of a story/post, sourced from the product it features.
*Problem:* Customer stories never link out to the product they showcase; the reader hits the "What to read next" grid with no path to the product. Products aren't even named in body copy.
*Who:* **7/8 customer stories** (via `sidebar.Product`; neca needs its product set). Optionally KH posts with a product focus (~5/19).
*Schema:* **None for CS** — reuse `sidebar.Product`. Optional `relatedProduct` field on `knowledgePost` for KH.
*Reuse note:* The industry page (`industries/[slug]`) just built exactly this card (`PRODUCT_META` + `/logos/sognos-*-logo-color.svg` + logo/name/tagline/description/Explore). **Extract that into a shared `ProductSpotlight` instead of building new.**
*Priority:* **HIGH** (high coverage + fixes a real dead-end; low build cost via extraction).

**2. Surface the unused customer-story `heroImage`**
*What:* Not a new component — a decision. Every story has a `heroImage` that the Amigo hero no longer renders; the hero's right column is intentionally empty.
*Problem:* 8/8 stories carry image data that renders nowhere. The obvious fill for the empty right column already exists.
*Schema:* none.
*Priority:* **HIGH** to *decide* (use it in the right column, or formally deprecate the field so editors stop uploading). Flagged per the "surface what's there, don't always build new" rule — Levon previously chose to leave the column empty, so this is a **confirm-or-deprecate**, not a build.

### MEDIUM

**3. `PullQuoteBlock` — dedicated mid-body pull-out**
*What:* A block type (`text` + optional `attribution`) rendered as large accent-bordered emphasis, distinct from a body paragraph.
*Problem:* KH `blockquote` is defined but **0 uses**; CS has **no** blockquote at all. Editors currently have no way to emphasise a line mid-article in a story. The existing KH blockquote renderer is ready but the *authoring affordance* is weak/absent.
*Who:* Any long-form KH post (the 14 with headings) + longer CS. Adoption unproven (0 today) — hence Medium not High.
*Schema:* new `pullQuote` object type on both bodies (or enable `blockquote` on `customerStory` + editorial guidance). Distinguish "pull-quote (emphasis)" from "cited quote (attribution)" via an optional `source` field.
*Priority:* **MEDIUM**.

**4. `calloutBlock` — roll out + extend**
*What:* The colored callout already on `customerStory` (orange/teal/blue/purple/coral, fallback blue). Currently **0 uses**.
*Problem:* Not new — needs (a) editorial adoption and (b) parity: it's **absent from `knowledgePost`**, where mid-article "note/important" callouts are more common in long posts.
*Who:* Long KH posts especially (12+ Insights articles).
*Schema:* add the same `calloutBlock` type + renderer to `knowledgePost`.
*Priority:* **MEDIUM** (extend existing, don't reinvent).

**5. `ImageWithCaption` block**
*What:* Standardised inline image with a caption/credit slot and consistent width options.
*Problem:* 40 inline images across both types render uniformly but **cannot carry a caption or credit** (no schema field). Fine for decorative shots; limiting for data/screenshot images that need labelling.
*Who:* Any article with explanatory imagery (all 40 images are candidates for opt-in captioning).
*Schema:* add `caption` (+ optional `credit`) to the `inlineImage` object.
*Priority:* **MEDIUM**.

### LOW (not justified by current data)

**6. `StatCallout` (big number + text)** — only ~3 KH posts contain real %/$ stats; the rest are years/"365". **LOW** now; revisit if stat-led content grows.

**7. `RelatedContentCard` (inline "see also")** — no article-to-article linking data exists; would need a reference field and editorial effort. **LOW**.

**8. Mid-article `CTABlock`** — the global `<CTABand>` already sits at every page bottom; a mid-article demo CTA is largely redundant. **LOW**.

**9. Two-column comparison / Before-After** — **no** before/after or problem/solution structural pattern detected in the data. **LOW** (no demand).

### Already shared / surfaced (no new build)
- `ArticleScrollNav` (rail), `ArticleCard` (grid), `SeeMoreLink`, `lib/portableText.ts` helpers are already extracted and reused across article pages.
- The industry product card is the ready seed for `ProductSpotlight` (#1).

---

## Recommended build order
1. **`ProductSpotlight`** (extract from industry page) → wire to CS via `sidebar.Product`. *(also fix `neca` product + the `Products`→`Product` label.)*
2. **`calloutBlock` → add to `knowledgePost`** (parity + adoption push).
3. **`ImageWithCaption`** (add `caption` to `inlineImage`).
4. **`PullQuoteBlock`** (new type, both bodies).
5. Decide the **CS `heroImage`** question (use vs deprecate).
