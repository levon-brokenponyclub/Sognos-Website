// The single upcoming event, shared by the announcement banner and any other
// surface that needs to reference it. Kept as a plain module (not a React
// context) so Server Components can import it as a real value.
//
// There is no `event` type in Sanity yet — one upcoming event at a time is
// the current reality. If events become CMS-managed this is the thing to
// replace.
export const UPCOMING_EVENT = {
  href: "/events/nfp-real-care",
  label: "Upcoming event",
  title: "Designing Services Around Real Lives, Not System Boundaries",
  meta: "Thu 17 Sep • North Sydney",
  image: "/images/events/nfp-real-care/MSFT-header-img.png",
} as const;

// Shared between EventBanner (source of truth for dismiss) and Navbar
// (reads dismiss state to decide whether to sit under a 44px banner).
export const BANNER_STORAGE_KEY = `navbar-banner-dismissed:${UPCOMING_EVENT.href}:${UPCOMING_EVENT.meta}`;
export const BANNER_DISMISS_EVENT = "navbar-banner-dismissed";
