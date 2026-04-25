# Sognos Website — Project State

> Last updated: 2026-04-25

## Build Phase

Phases 1–5b complete. 27 routes statically generated.

## Live Routes

| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ | Homepage — 9 sections |
| `/products` | ✅ | Product hub |
| `/products/sognoscare` | ✅ | |
| `/products/sognosroster` | ✅ | |
| `/products/sognosgenogram` | ✅ | Phase 5b |
| `/solutions` | ✅ | Solutions hub |
| `/solutions/[slug]` × 7 | ✅ | field-service, crm, insights, experience, service, power-platform, quick-start |
| `/industries` | ✅ | Industries hub |
| `/industries/[slug]` × 5 | ✅ | health-social-care, facilities-management, local-government, industrial-services, energy-utilities |
| `/knowledge-hub` | ✅ | Renamed from /resources. KnowledgeHubArchive with sticky sidebar + 6 real articles |
| `/contact` | ✅ | |
| `/customers` | 🔲 | Directory exists, no page.tsx |
| `/customers/[slug]` | 🔲 | |
| `/company/about` | 🔲 | Directory exists, no page.tsx |
| `/company/careers` | 🔲 | Directory exists, no page.tsx |

## Homepage Sections (Live)

```tsx
<Hero />
<LogoStrip />          {/* infinite CSS marquee, uniform color filter, 9 named client logos */}
<HowSognosWorksPreview />
<ProductSection />     {/* 3 products: SognosCare, SognosRoster, Sognos Genogram */}
<SolutionsSection />   {/* dark bg, Framer Motion drag slider */}
<HowItWorks />
<IndustrySection />    {/* Industrial Services video always autoplays */}
<ProofSection />       {/* bento grid: video bg, image bg, dark/light/brand stat tiles */}
<CTASection />
```

## Key Assets

| Asset | Location |
|-------|---------|
| Client logos (9 named) | `/public/logos/clients/` |
| News article images (6) | `/public/images/news/` |
| Industry images (5) | `/public/images/industries/` |
| SognosGenogram logo | `/public/logos/SognosGenogram-logo.svg` |

## Known Gaps / Pre-launch Items

- `COMPLIANCE_VIDEO` in ProofSection is a placeholder Shutterstock URL — swap before launch
- `/customers` hub and `/customers/[slug]` case study pages not built — CustomerStories and nav reference these
- `/company/about` and `/company/careers` not built
- Individual article pages (`/knowledge-hub/[slug]`) not built — article hrefs point to sognos.com.au
- Client logos `client-03`, `client-14` through `client-21` not yet identified by name

## Next Tasks (Ordered)

1. Phase 6 — design system application pass
2. `/customers` hub + case study pages
3. Phase 7 — UI polish and motion
4. `/company/about` and `/company/careers`
5. Replace COMPLIANCE_VIDEO placeholder
