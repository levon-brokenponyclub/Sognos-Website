# Sognos Website — Project State

> Last updated: 2026-06-11

## Build Phase

Phases 1–5b complete. Phase 6 (Cohere scaffold — homepage done, solutions/product/industry pages pending) and Phase 7 (UI polish — Navbar, scroll, SubNav, hero animation, Editions, Footer) both in progress. Sanity CMS integration complete — site is now CMS-driven across products, posts, global content, legals, footer, and site settings. 27 routes statically generated.

## Live Routes

| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ | Homepage — 9 sections |
| `/products` | ✅ | Product hub |
| `/products/sognoscare` | ✅ | |
| `/products/sognosroster` | ✅ | |
| `/products/sognosgenogram` | ✅ | Phase 5b |
| `/solutions` | ✅ | Solutions hub |
| `/solutions/[slug]` × 7 | ✅ | frontline, crm, insights, experience, service, power-platform, quick-start |
| `/industries` | ✅ | Industries hub |
| `/industries/[slug]` × 5 | ✅ | health-social-care, facilities-management, local-government, industrial-services, energy-utilities |
| `/knowledge-hub` | ✅ | Renamed from /resources. KnowledgeHubArchive with sticky sidebar + 6 real articles |
| `/contact` | ✅ | |
| `/customer-stories` | ✅ | Hub page |
| `/customer-stories/[slug]` × 8 | ✅ Sanity | auckland-airport, flourish-australia, penrith-city-council, gentari, all-purpose-pumps, asset-security-concepts, neca, natural-power-solutions |
| `/knowledge-hub/[slug]` × 18 | ✅ Sanity | News (3), Milestone (1), Events (1), Webinar (1), Insights (12) |
| `/company/about` | ✅ | |
| `/company/social-responsibility` | ✅ | |
| `/company/careers` | ✅ | |
| `/company/privacy-policy` | ✅ Sanity | Portable Text body, `LegalPageRenderer` |
| `/company/privacy-collection-notice` | ✅ Sanity | |
| `/company/isms-policy` | ✅ Sanity | |
| `/dhf-conversation` | ✅ | |
| `/studio/[...tool]` | ✅ | Embedded Sanity Studio at `/studio` |

## Homepage Sections (Live — Cohere scaffold, 2026-06-09)

```tsx
<Hero />            {/* "Own your AI" — centered, fadeInUp, white-pill + underline */}
<LogoStrip />       {/* "Trusted by…" — infinite CSS marquee */}
<HowSognosWorks />  {/* "Safe. Flexible. Independent." 3 blocks */}
<SognosCareCard />  {/* "Your sovereign AI workplace" full-bleed product card */}
<SognosRosterCard />{/* "Developer resources" full-bleed product card */}
<IndustrySection /> {/* "Powering progress…" arrow snap-scroll square cards */}
<SolutionsSection />{/* "Our models. Your business." */}
<NewsInsightSection />{/* "The latest news" — 3 callout cards w/ morphing SVG notch */}
<CTABand />         {/* "Ready to put AI to work?" text + dual logo marquees */}
```

Note: `CTASection.tsx` is the SHARED booking-calendar/modal — never gut it; homepage CTA is the separate `CTABand`.

## CMS — Sanity

Project ID `vg117fxr`, dataset `production`. Studio embedded at `/studio`. Schema deploys on every Vercel build via `postbuild`.

### Schemas

| Schema | Type | Purpose |
|--------|------|---------|
| `siteSettings` | Singleton | Site title + meta description, response time copy, offices, ABN, LinkedIn URL |
| `logoStrip` | Singleton | Homepage trust marquee logos |
| `ctaSection` | Singleton | Book a Demo block + platform logos + stat blocks (variant: light/dark/blue) |
| `footer` | Singleton | Brand, tagline, platform logos, link columns, acknowledgement, legal links |
| `customerStory` | Multi-doc | 8 customer stories, Portable Text body with inline images |
| `knowledgePost` | Multi-doc | 18 posts across 5 categories, Portable Text body (h2, ul/ol, blockquote, em/strong/link) |
| `legalPage` | Multi-doc | 3 legal pages (privacy-policy, privacy-collection-notice, isms-policy) |

### Studio Nav Structure

```
Site Settings
─────────
Global Content
  ├ Logo Strip
  ├ CTA Section
  └ Footer
─────────
Pages
  └ Legals
─────────
Posts
  ├ Customer Stories
  └ Knowledge Hub
```

### Migration / Seed Scripts

| Script | Command |
|--------|---------|
| Customer stories (8) | `npm run migrate:customer-stories` |
| Knowledge posts (18) | `npm run migrate:knowledge-posts` |
| Legals (3) | `npm run migrate:legals` |
| Logo strip | `npm run seed:logo-strip` |
| CTA section | `npm run seed:cta-section` |
| Footer | `npm run seed:footer` |
| Site settings | `npm run seed:site-settings` |

All scripts idempotent (`createOrReplace` with deterministic `_id`). Require `SANITY_API_WRITE_TOKEN` in `.env.local`.

### Architecture Notes

- `getCtaSectionContent()` resolved once per request in `app/(marketing)/layout.tsx`, passed via `CtaContentProvider` so client-side `CTASection` (and `BookDemoModal`) share data without per-page wiring
- Footer is a server component reading Sanity directly
- Knowledge Hub archive merges Sanity posts into `KnowledgeHubArchive` via prop; `[slug]` page calls `notFound()` on miss
- Legal pages collapsed from 488/103/133 lines to ~20-line wrappers around `LegalPageRenderer`
- Root metadata in `app/layout.tsx` uses async `generateMetadata()` reading from `getSiteSettings()` with hardcoded fallback so SEO never fails

## Key Assets

| Asset | Location |
|-------|---------|
| News article images (6) | `/public/images/news/` |
| Industry images (5) | `/public/images/industries/` |
| SognosGenogram logo | `/public/logos/SognosGenogram-logo.svg` |

Client logos and customer-story images now live in Sanity assets (cdn.sanity.io). Local copies under `/public/logos/clients/` retained as seed-script source only.

## Performance

| Metric (desktop) | Before | After |
|------------------|--------|-------|
| LCP p75 | 4.07s | 0.8s |
| FCP p75 | 2.92s | 0.4s |
| CLS | — | 0 |

Mobile LCP still 3.8s (Slow 4G) — main remaining lever is the 27 KiB Tailwind CSS chunk blocking 660ms.

Studio routes excluded from `Analytics`, `SpeedInsights`, `GoogleAnalytics`, and `LinkedInInsight` to keep editor traffic out of production Web Vitals.

## Known Gaps / Pre-launch Items

- `COMPLIANCE_VIDEO` in ProofSection is a placeholder Shutterstock URL — swap before launch
- `SognosCare-logo-dark.avif` flagged by Lighthouse for over-sized dimensions (300×96 displayed at 175×56) — needs proper AVIF re-encode pipeline
- Legacy-JS polyfills (~14 KiB) persist post-browserslist update — likely vendor-bundled, needs `@next/bundle-analyzer` to confirm source

## Legacy URL Redirects

23 × 301 redirects configured in `next.config.ts` from legacy `sognos.com.au` URLs. Full mapping documented in `project-overview.md` under "Legacy URL Redirects".

Covers: conversation funnels, `/about-us/*` restructure, `/contact-us`, Knowledge Hub consolidation, slug changes (`industries/health-and-social-care`, `solutions/power-platform-solutions`), product restructure (`/sognoscare`, `/sognos-genogram`), customer-story slug normalisation (drop `-case-study`, `nps` → `natural-power-solutions`), legal/policy, and old landing pages.

## Next Tasks (Ordered)

1. **ProductSubNav dock-from-bottom** — reappears fixed under navbar when scrolled past in-section position (Phase 7)
2. **Solutions pages Cohere port** — `solutions/[slug]/page.tsx` section-by-section refactor (Phase 6); ask for per-section mapping before starting
3. **Roster + Genogram Problems dark sections** — same `#PROBLEM_BG` + inverted text pattern as SognosCare; Roster `#3990c5`, Genogram `#250438` (Phase 7)
4. **Customers hub** — `/customers` + `/customers/[slug]` case study pages
5. Replace COMPLIANCE_VIDEO placeholder (Shutterstock URL in ProofSection)
6. Verify redirects post-deploy (manual hit + Google Search Console URL Inspection)
7. Mobile LCP — try `experimental.optimizeCss` / `inlineCss` in `next.config.ts` to defer the 27 KiB CSS chunk
8. SognosCare AVIF re-encode (install `sharp` or use a proper AVIF encoder)
9. Bundle-analyzer pass to identify vendor source of remaining ES6+ polyfills
