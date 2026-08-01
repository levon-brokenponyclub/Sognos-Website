// The single upcoming event, shared by the announcement banner and the
// Knowledge Hub dropdown's featured column.
//
// Kept in a plain module rather than inside Navbar.tsx: Navbar is "use client",
// and importing a value from a client file into a Server Component yields a
// client reference rather than the object. The marketing layout reads this
// server-side to build the featured list. Same reasoning as customerStoryBrand.ts.
//
// There is no `event` type in Sanity yet — one upcoming event at a time is the
// current reality. If events become CMS-managed this is the thing to replace.
export const UPCOMING_EVENT = {
  href: "/events/nfp-real-care",
  label: "Upcoming event",
  title: "Designing Services Around Real Lives, Not System Boundaries",
  meta: "Thu 17 Sep • North Sydney",
  image: "/images/events/nfp-real-care/MSFT-header-img.png",
} as const;
