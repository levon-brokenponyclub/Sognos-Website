# Sognos Marketing Site

Next.js 15 (App Router) marketing site for Sognos — Tailwind CSS v4 (CSS-first), Framer Motion, TypeScript, Sanity CMS.

## Stack

- Next.js 15 App Router
- Tailwind CSS v4 — CSS-first config (no `tailwind.config.js`; theme in `app/globals.css` `@theme inline`, primitives in `app/tokens.css`)
- Framer Motion · TypeScript · Sanity CMS

## Develop

```bash
npm run dev     # start dev server
npm run build   # production build (runs sanity schema deploy as postbuild)
npm run start   # start production server
npm run lint    # lint
```

## Project docs

- `docs/DESIGN_MIGRATION_STATE.md` — design-system state of record (tokens, type scale, component inventory, route map)
- `docs/FEATURE_LOG.md` — feature backlog
- `docs/CHANGELOG.md` — change history
- `CLAUDE.md` — agent working rules
- `docs/archive/` — superseded audits & phase plans
