# Legacy URL Redirects

All redirects are wired in `next.config.ts` as **301 permanent** to preserve SEO equity from the legacy `sognos.com.au` site.

## Mapping

| Legacy URL | New URL | Reason |
|------------|---------|--------|
| `/start-the-conversation` | `/dhf-conversation` | Funnel rename |
| `/dhf-conversation/` | `/dhf-conversation` | Trailing slash |
| `/about-us` | `/company/about` | Restructured |
| `/about-us/our-team` | `/company/about` | Merged |
| `/about-us/partners` | `/company/about` | Merged |
| `/about-us/social-responsibility` | `/company/social-responsibility` | Restructured |
| `/about-us/careers` | `/company/careers` | Restructured |
| `/contact-us` | `/contact` | Renamed |
| `/news-updates` | `/knowledge-hub` | Consolidated |
| `/industry-insights` | `/knowledge-hub` | Consolidated |
| `/industries/health-and-social-care` | `/industries/health-social-care` | Slug change |
| `/solutions/power-platform-solutions` | `/solutions/power-platform` | Slug change |
| `/sognoscare` | `/products/sognoscare` | Restructured |
| `/sognos-genogram` | `/products/sognosgenogram` | Restructured |
| `/first-in-field-service` | `/` | Old landing |
| `/privacy-collection-notice` | `/company/privacy-collection-notice` | Restructured |
| `/isms-policy` | `/` | Removed |
| `/customers` | `/customer-stories` | Section renamed |
| `/customers/:slug` | `/customer-stories/:slug` | Section renamed (all slugs) |
| `/customer-stories/gentari-case-study` | `/customer-stories/gentari` | Slug normalised |
| `/customer-stories/penrith-city-council-case-study` | `/customer-stories/penrith-city-council` | Slug normalised |
| `/customer-stories/nps-case-study` | `/customer-stories/natural-power-solutions` | Slug renamed |
| `/customer-stories/neca-case-study` | `/customer-stories/neca` | Slug normalised |
| `/customer-stories/asset-security-concepts-case-study` | `/customer-stories/asset-security-concepts` | Slug normalised |
| `/customer-stories/all-purpose-pumps-case-study` | `/customer-stories/all-purpose-pumps` | Slug normalised |

**Total:** 25 × 301 permanent redirects.

## Unchanged URLs (no redirect required)

These legacy paths resolve directly to live routes — same slug, no redirect needed:

- `/customer-stories/`
- `/customer-stories/auckland-airport`
- `/customer-stories/flourish-australia`
