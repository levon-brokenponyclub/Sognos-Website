// The event shown in the header announcement banner. Sourced from Sanity
// (`event.showInBanner`) via getBannerEvent() in the marketing layout and
// passed to EventBanner + Navbar as a prop. Kept as a plain module so both
// Server and Client Components can import it.
export type BannerEvent = {
  href: string;
  title: string;
  // ISO string; banner auto-hides once passed. Null = no auto-hide.
  endDate: string | null;
};

// Shared between EventBanner (source of truth for dismiss) and Navbar
// (reads dismiss state to decide whether to sit under a 44px banner).
// Keyed per event so a newly bannered event reappears for prior dismissers.
export function bannerStorageKey(event: BannerEvent | null) {
  return event
    ? `navbar-banner-dismissed:${event.href}:${event.endDate ?? ""}`
    : "";
}
export const BANNER_DISMISS_EVENT = "navbar-banner-dismissed";

export function isBannerEventPast(event: BannerEvent | null) {
  return !!event?.endDate && Date.now() > new Date(event.endDate).getTime();
}
