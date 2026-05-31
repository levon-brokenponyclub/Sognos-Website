# Sognos Website — Project State

> Last updated: 2026-06-01

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
| `/solutions/[slug]` × 7 | ✅ | frontline, crm, insights, experience, service, power-platform, quick-start |
| `/industries` | ✅ | Industries hub |
| `/industries/[slug]` × 5 | ✅ | health-social-care, facilities-management, local-government, industrial-services, energy-utilities |
| `/knowledge-hub` | ✅ | Renamed from /resources. KnowledgeHubArchive with sticky sidebar + 6 real articles |
| `/contact` | ✅ | |
| `/customer-stories` | ✅ | Hub page |
| `/customer-stories/[slug]` × 8 | ✅ | auckland-airport, flourish-australia, penrith-city-council, gentari, all-purpose-pumps, asset-security-concepts, neca, natural-power-solutions |
| `/company/about` | ✅ | |
| `/company/social-responsibility` | ✅ | |
| `/company/careers` | ✅ | |
| `/dhf-conversation` | ✅ | |

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
- Client logos `client-03`, `client-14` through `client-21` not yet identified by name

## Legacy URL Redirects

23 × 301 redirects configured in `next.config.ts` from legacy `sognos.com.au` URLs. Full mapping documented in `project-overview.md` under "Legacy URL Redirects".

Covers: conversation funnels, `/about-us/*` restructure, `/contact-us`, Knowledge Hub consolidation, slug changes (`industries/health-and-social-care`, `solutions/power-platform-solutions`), product restructure (`/sognoscare`, `/sognos-genogram`), customer-story slug normalisation (drop `-case-study`, `nps` → `natural-power-solutions`), legal/policy, and old landing pages.

## Next Tasks (Ordered)

1. Phase 6 — design system application pass
2. Phase 7 — UI polish and motion
3. Replace COMPLIANCE_VIDEO placeholder
4. Verify redirects post-deploy (manual hit + Google Search Console URL Inspection)
