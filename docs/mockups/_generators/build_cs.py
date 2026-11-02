"""Customer Stories archive - layout options (mockup).

Reuses the SognosCare generator shell / type scale / label via runpy and the
approved StoryCardImage (option C) styling. Writes
docs/mockups/customer-stories/archive.html (3 options + switcher).
  python3 -I <this file> docs/mockups/sognoscare docs/mockups/customer-stories
"""
import html
import runpy
import sys
from pathlib import Path

CARE_OUT, OUT = sys.argv[1], Path(sys.argv[2])
sys.argv = [sys.argv[0], CARE_OUT]
ns = runpy.run_path(str(Path(__file__).with_name("build_mockups.py")))
OUT.mkdir(parents=True, exist_ok=True)
page = ns["page"]
page.__globals__["OUT"] = OUT
T, label, P = ns["T"], ns["label"], ns["P"]
SECTION, HEAD, GAP, RAIL = ns["SECTION"], ns["HEAD"], ns["GAP"], ns["RAIL"]

# Live copy (app/(marketing)/customer-stories/page.tsx + ProductCustomerStories ALL_STORIES).
TITLE = "Customer Stories"
INTRO = "See how organisations across health, transport, local government, and energy use Sognos to transform their service operations."
# slug, company, title, date, read, logo, brand, accent, product, industry (*proposed), photo, size, quote, author, role
S = [
    ("flourish-australia", "Flourish Australia", "Flourish Australia: Transforming Service Operations with Microsoft Dynamics 365", "13 Aug 2024", "5 min read", "flourish-australia-logo.png", "#01a77f", "#9be3c9", "SognosCare", "Health & Social Care", "flourish-australia.avif", "1,100+",
     "Congratulations and well done to everyone that has been a part of this magnificent success! You should all be very proud of the quality of work you produce. You make us very proud - Thank you!", "Susan McCarthy", "Chief Operating Officer, Flourish Australia"),
    ("auckland-airport", "Auckland Airport", "Auckland Airport: Expanding Digital Capabilities with Microsoft Dynamics 365 and Power Platform", "10 Jun 2024", "4 min read", "auckland-airport-logo.png", "#141c6b", None, "SognosRoster", "Transport", "auckland-airport.webp", "350+",
     "Thank you to the Sognos team. Hoping to see you and thank you in person for such a successful implementation. Looking forward to a continued successful partnership with Sognos as our Field Service support partners!", "Anthony Hart", "Operations Delivery Lead, Auckland Airport"),
    ("penrith-city-council", "Penrith City Council", "Penrith City Council: Transforming Field Operations with a Custom Dynamics 365 Solution", "20 Mar 2024", "3 min read", "penrith-city-council-logo.png", "#f66622", "#ffc29f", "SognosRoster", "Local Government", "penrith-city-council.png", "300+",
     "We've moved from reactive to proactive compliance. Every inspection now, the auditors comment on how thorough our records are. That wasn't possible before Sognos.", "Claire Donovan", "Service Delivery Manager, Penrith City Council"),
    ("gentari", "Gentari Solar Australia", "Gentari Solar Australia: End-to-End Asset Management with Microsoft Dynamics 365 Field Service", "5 Nov 2024", "4 min read", "gentari-logo-rect.webp", "#3b1a6e", "#02c9e9", "SognosRoster", "Energy & Utilities", "gentari.webp", "10,000+",
     "For us it is of the utmost importance to give our technicians visibility of the history of each of the farms that they service in their routine PMs and capture data at the same time. Dynamics 365 Field Service has not disappointed us in any of our key requirements.", "Operations Team", "Gentari Solar Australia"),
    ("all-purpose-pumps", "All Purpose Pumps", "All Purpose Pumps: From System Repair to Strategic Technology Partnership", "15 May 2024", "4 min read", "all-purpose-pumps-logo.webp", "#e68220", "#ffd9a8", "SognosRoster", "Industrial Services*", "all-purpose-pumps.webp", None, None, None, None),
    ("asset-security-concepts", "Asset Security Concepts", "Asset Security Concepts: A Unified Platform for Growth with Dynamics 365 and Business Central", "22 Apr 2024", "4 min read", "asc-logo.webp", "#0569a5", "#7cc4ee", "SognosRoster", "Facilities Management*", "asc.webp", None, None, None, None),
    ("neca", "NECA", "NECA: Transforming Operations with Microsoft Dynamics 365 and Power Platform", "10 Feb 2024", "4 min read", "neca-logo.webp", "#035dad", "#7fb3e6", None, "Industrial Services*", "neca.webp", None, None, None, None),
    ("natural-power-solutions", "Natural Power Solutions", "Natural Power Solutions: End-to-End Digital Transformation with Dynamics 365", "18 Jan 2024", "4 min read", "nps-logo.webp", "#0269b3", "#f0b400", "SognosRoster", "Energy & Utilities*", "nps.webp", None, None, None, None),
]
KEYS = ["slug", "company", "title", "date", "read", "logo", "brand", "accent", "product", "industry", "photo", "size", "quote", "author", "role"]
STORIES = [dict(zip(KEYS, s)) for s in S]
INDUSTRIES = ["Health & Social Care", "Transport", "Local Government", "Energy & Utilities", "Industrial Services", "Facilities Management"]


def esc(t):
    return html.escape(t or "", quote=True)


def ind(st):
    return st["industry"].rstrip("*")


def attrs(st):
    return f'data-item data-ind="{esc(ind(st))}" data-q="{esc((st["company"] + " " + st["title"]).lower())}"'


# Approved card image (StoryCardImage option C): brand facets + grain + logo tile.
CI_CSS = """<style>
  .ci { --b:#333; --a:#999; position:relative; overflow:hidden; border-radius:4px; container-type:inline-size; isolation:isolate;
    background: linear-gradient(115deg, transparent 0 38%, color-mix(in srgb, var(--b) 78%, black) 38% 62%, transparent 62%), linear-gradient(115deg, color-mix(in srgb, var(--b) 82%, white) 0 22%, transparent 22%), linear-gradient(65deg, transparent 0 70%, color-mix(in srgb, var(--a) 45%, var(--b)) 70% 100%), var(--b); }
  .ci .grain { position:absolute; inset:0; opacity:.18; mix-blend-mode:overlay; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
  .ci .tile { position:absolute; left:50%; top:50%; width:52cqw; height:24cqw; transform:translate(-50%,-50%); background:#fff; border-radius:max(4px,1.4cqw); display:flex; align-items:center; justify-content:center; transition: transform .7s cubic-bezier(.22,1,.36,1); }
  .ci .tile img { width:77%; height:54%; object-fit:contain; }
  .group:hover .ci .tile { transform:translate(-50%,-50%) scale(1.04); }
  @media (prefers-reduced-motion: reduce) { .ci .tile { transition:none; } }
</style>"""


def ci(st, cls="aspect-[16/10]"):
    acc = st["accent"] or f"color-mix(in srgb, {st['brand']} 50%, white)"
    return f'<div class="ci {cls}" style="--b:{st["brand"]};--a:{acc}"><div class="grain"></div><div class="tile"><img src="{P}/logos/{st["logo"]}" alt="{esc(st["company"])}" /></div></div>'


def tags(st, dark=False):
    base = "rounded-full px-2.5 py-1 text-xs " + ("bg-white/10 text-white/80" if dark else "bg-tint text-body")
    out = [f'<span class="{base}">{esc(ind(st))}{"<sup>*</sup>" if st["industry"].endswith("*") else ""}</span>']
    if st["product"]:
        out.append(f'<span class="{base}">{st["product"]}</span>')
    return "".join(out)


HEADER = f"""<header class="fixed inset-x-0 top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
  <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
    <img src="{P}/logos/sognos-logo.svg" alt="Sognos" class="h-6 w-auto" />
    <nav class="hidden items-center gap-1 rounded-full bg-tint p-1 text-sm text-heading lg:flex">{"".join(f'<span class="rounded-full px-4 py-2">{n}</span>' for n in ["Why Sognos", "Products", "Solutions", "Industries", "Knowledge Hub"])}</nav>
    <span class="rounded bg-heading px-4 py-2.5 text-sm font-medium text-white">Book a Demo</span>
  </div>
</header>"""

SEARCH = """<label class="relative block w-full max-w-md"><span class="sr-only">Search customer stories</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input data-search type="search" placeholder="Search stories" class="h-12 w-full rounded-full border border-line bg-white pl-11 pr-4 text-sm text-heading outline-none placeholder:text-muted focus:border-heading" /></label>"""
EMPTY = '<p data-empty hidden class="py-16 text-center text-body">No stories match.</p>'
ARROW = '<span aria-hidden="true" class="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-heading transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">&rarr;</span>'


def chip(k, n, pressed=False):
    return f'<button type="button" data-cat="{esc(k)}" aria-pressed="{str(pressed).lower()}" class="min-h-10 shrink-0 rounded-full border border-line px-4 text-sm text-heading transition-colors hover:border-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{n}</button>'


# ── A · Grid + filter ───────────────────────────────────────────────────────
def card_a(st):
    return f'''<a href="#" {attrs(st)} class="group flex flex-col gap-5 rounded-lg border border-line bg-white p-3 transition-colors hover:border-heading focus-visible:outline-2 focus-visible:outline-accent">
            {ci(st)}
            <div class="flex flex-1 flex-col px-3 pb-3">
              <p class="text-xs text-muted">{esc(st["company"])} &middot; {st["date"]}</p>
              <h3 class="mt-2 {T["h3sm"]} text-heading text-balance">{esc(st["title"])}</h3>
              <div class="mt-auto flex items-end justify-between gap-4 pt-6"><span class="flex flex-wrap gap-1.5">{tags(st)}</span>{ARROW}</div>
            </div>
          </a>'''


FEAT = STORIES[0]
OPT_A = f"""<div data-cs-opt="a">
  <section class="bg-white pt-36 pb-16 md:pt-44 md:pb-20">
    <div class="mx-auto max-w-7xl px-6">
      <div class="grid grid-cols-1 items-end gap-8 md:grid-cols-2">
        <div class="flex flex-col gap-5">{label(TITLE, sticky=False)}<h1 class="{T["h1"]} text-heading">{TITLE}</h1><p class="{T["herosub"]} text-body">{INTRO}</p></div>
        <div class="md:justify-self-end md:w-full md:max-w-md">{SEARCH}</div>
      </div>
      <a href="#" {attrs(FEAT)} data-noreveal class="group mt-14 grid grid-cols-1 items-stretch gap-3 rounded-lg bg-tint p-3 md:grid-cols-[3fr_2fr] lg:gap-4">
        {ci(FEAT, "aspect-[16/10] md:aspect-auto md:min-h-[440px]")}
        <div class="flex flex-col justify-between gap-8 p-5 lg:p-8">
          <div><p class="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-heading"><span class="size-1.5 bg-accent"></span>Featured story</p>
            <h2 class="mt-6 {T["h3"]} text-heading text-balance">{esc(FEAT["title"])}</h2>
            <blockquote class="mt-6 border-l-2 border-accent pl-4 {T["body"]} text-body">&ldquo;{esc(FEAT["quote"])}&rdquo;<footer class="mt-3 text-sm text-muted">{FEAT["author"]} &middot; {FEAT["role"]}</footer></blockquote></div>
          <div class="flex items-end justify-between gap-4 border-t border-line pt-5"><span class="flex flex-wrap gap-1.5">{tags(FEAT).replace("bg-tint", "bg-white")}</span>{ARROW}</div>
        </div>
      </a>
    </div>
  </section>
  <div class="sticky top-20 z-40 border-y border-line bg-white/95 backdrop-blur"><div class="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-6 py-3"><p class="mr-3 hidden shrink-0 text-sm text-muted sm:block">Industry</p>{chip("all", "All", True)}{"".join(chip(i, esc(i)) for i in INDUSTRIES)}</div></div>
  <section class="bg-tint {SECTION}">
    <div class="mx-auto max-w-7xl px-6">
      <div class="flex items-end justify-between gap-6"><h2 class="{T["h2"]} text-heading">Explore more stories</h2><span class="text-sm text-muted"><span data-count>{len(STORIES) - 1}</span> stories</span></div>
      <div class="{GAP} grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">{"".join(card_a(st) for st in STORIES[1:])}</div>
      {EMPTY}
    </div>
  </section>
</div>"""


# ── B · Index + rail ────────────────────────────────────────────────────────
def row_b(st):
    return f'''<li {attrs(st)}><a href="#" class="group grid grid-cols-[6rem_1fr] items-center gap-4 border-b border-line py-5 transition-colors hover:bg-tint sm:grid-cols-[9rem_1fr_auto] sm:gap-6 sm:px-3">
          {ci(st, "aspect-[16/10]")}
          <div class="min-w-0"><p class="text-xs text-muted">{esc(st["company"])} &middot; {st["date"]} &middot; {st["read"]}</p><h3 class="mt-1 {T["h3sm"]} text-heading text-balance group-hover:text-accent-strong">{esc(st["title"])}</h3><span class="mt-2 flex flex-wrap gap-1.5">{tags(st)}</span></div>
          <span class="hidden sm:block">{ARROW}</span>
        </a></li>'''


counts = {i: sum(1 for st in STORIES if ind(st) == i) for i in INDUSTRIES}
OPT_B = f"""<div data-cs-opt="b" hidden>
  <section class="bg-white pt-36 pb-10 md:pt-44"><div class="mx-auto max-w-7xl px-6"><div class="flex max-w-3xl flex-col gap-5">{label(TITLE, sticky=False)}<h1 class="{T["h1"]} text-heading">{TITLE}</h1><p class="{T["herosub"]} text-body">{INTRO}</p></div></div></section>
  <section class="bg-white pb-24"><div class="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8">
    <aside class="lg:col-span-3"><div class="space-y-8 lg:sticky lg:top-28">{SEARCH}
      <div>{label("Industry", sticky=False)}<ul class="mt-4 space-y-1">{"".join(f'<li><button type="button" data-cat="{esc(k)}" aria-pressed="{str(k == "all").lower()}" class="flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm text-body transition-colors hover:bg-tint aria-pressed:bg-heading aria-pressed:text-white"><span>{esc(n)}</span><span class="text-xs opacity-60">{len(STORIES) if k == "all" else counts[k]}</span></button></li>' for k, n in [("all", "All stories")] + [(i, i) for i in INDUSTRIES])}</ul></div>
      <div class="rounded-lg bg-tint p-5"><p class="{T["h3sm"]} text-heading">Talk to a customer</p><p class="mt-1 text-xs text-muted">[Suggested copy] We can introduce you to a Sognos customer in your sector.</p><a href="#" class="mt-4 inline-flex min-h-11 items-center rounded-full bg-heading px-5 text-sm font-medium text-white hover:bg-accent">Book a Demo</a></div>
    </div></aside>
    <div class="lg:col-span-9"><ul class="border-t border-line">{"".join(row_b(st) for st in STORIES)}</ul>{EMPTY}</div>
  </div></section>
</div>"""


# ── C · Spotlight + bento ───────────────────────────────────────────────────
QUOTED = [st for st in STORIES if st["quote"]]
SPOT = "".join(f'''<div data-spot="{k}" class="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-12 lg:gap-4"{"" if k == 0 else " hidden"}>
          <div class="relative min-h-[320px] overflow-hidden rounded lg:col-span-7"><img src="{P}/images/customers/{st["photo"]}" alt="" class="absolute inset-0 size-full object-cover" /><span class="absolute inset-0 bg-gradient-to-t from-care-dark/70 to-transparent"></span>
            <div class="absolute bottom-5 left-5 flex items-center gap-3"><span class="rounded bg-white px-2.5 py-1.5"><img src="{P}/logos/{st["logo"]}" alt="{esc(st["company"])}" class="h-6 w-auto" /></span><span class="rounded-full bg-white/15 px-3 py-1 text-xs text-white backdrop-blur">{st["size"]} staff</span></div></div>
          <div class="flex flex-col justify-between gap-8 rounded-lg bg-white/5 p-6 lg:col-span-5 lg:p-8">
            <blockquote class="font-heading text-xl leading-snug text-white md:text-2xl">&ldquo;{esc(st["quote"])}&rdquo;</blockquote>
            <div><p class="text-sm text-white">{st["author"]}</p><p class="text-xs text-white/75">{st["role"]}</p><a href="#" class="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-heading hover:bg-accent hover:text-white">Read the story <span aria-hidden="true">&rarr;</span></a></div>
          </div>
        </div>''' for k, st in enumerate(QUOTED))


def bento(st, k):
    big = k in (0, 3)
    img = (f'<div class="relative {"min-h-[320px] flex-1" if big else "aspect-[16/10]"} overflow-hidden rounded"><img src="{P}/images/customers/{st["photo"]}" alt="" class="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" /><span class="absolute left-3 top-3 rounded bg-white px-2 py-1"><img src="{P}/logos/{st["logo"]}" alt="{esc(st["company"])}" class="h-5 w-auto" /></span></div>'
           if k % 2 == 0 else ci(st, "min-h-[320px] flex-1" if big else "aspect-[16/10]"))
    return f'''<a href="#" {attrs(st)} class="group flex flex-col gap-5 rounded-lg border border-line bg-white p-3 transition-colors hover:border-heading {"md:col-span-2 md:row-span-2" if big else ""}">
            {img}
            <div class="flex items-end justify-between gap-4 px-3 pb-3"><div><p class="text-xs text-muted">{esc(st["company"])} &middot; {st["date"]}</p><h3 class="mt-2 {T["h3sm"] if not big else T["h3"]} text-heading text-balance">{esc(st["title"])}</h3><span class="mt-3 flex flex-wrap gap-1.5">{tags(st)}</span></div>{ARROW}</div>
          </a>'''


OPT_C = f"""<div data-cs-opt="c" hidden>
  <section class="relative bg-care-dark pt-36 pb-16 text-white md:pt-44 md:pb-24">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0" style="background: radial-gradient(60% 50% at 15% 20%, rgba(59,111,224,.35), transparent 70%)"></div>
    <div class="relative mx-auto max-w-7xl px-6">
      <div class="flex flex-wrap items-end justify-between gap-6"><div class="flex max-w-3xl flex-col gap-5">{label(TITLE, "dark", sticky=False)}<h1 class="{T["h1"]} text-white">{TITLE}</h1><p class="{T["herosub"]} text-white/75">{INTRO}</p></div>
        <div class="flex gap-2">{"".join(f'<button type="button" data-spot-nav="{d}" aria-label="{"Previous" if d < 0 else "Next"} story" class="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-heading">{"&larr;" if d < 0 else "&rarr;"}</button>' for d in (-1, 1))}</div></div>
      <div class="mt-12">{SPOT}</div>
      <div class="mt-6 flex gap-2">{"".join(f'<button type="button" data-spot-dot="{k}" aria-label="Story {k + 1}" class="h-1 w-8 rounded-full bg-white/25 aria-pressed:bg-white" aria-pressed="{str(k == 0).lower()}"></button>' for k in range(len(QUOTED)))}</div>
    </div>
  </section>
  <div class="sticky top-20 z-40 border-b border-line bg-white/95 backdrop-blur"><div class="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-6 py-3">{chip("all", "All", True)}{"".join(chip(i, esc(i)) for i in INDUSTRIES)}</div></div>
  <section class="bg-tint {SECTION}"><div class="mx-auto max-w-7xl px-6">
    <div class="grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">{"".join(bento(st, k) for k, st in enumerate(STORIES))}</div>{EMPTY}
  </div></section>
</div>"""

SW = """<div class="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-care-dark/90 p-1 text-xs text-white backdrop-blur">""" + "".join(
    f'<button type="button" data-opt-pick="{k}" aria-pressed="{str(k == "a").lower()}" class="rounded-full px-3.5 py-2 transition-colors hover:bg-white/10 aria-pressed:bg-white aria-pressed:text-care-dark">{k.upper()} &middot; {n}</button>'
    for k, n in [("a", "Grid + filter"), ("b", "Index + rail"), ("c", "Spotlight + bento")]) + "</div>"

JS = """<script>
  (() => {
    const pick = (k) => { document.querySelectorAll("[data-cs-opt]").forEach((el) => (el.hidden = el.dataset.csOpt !== k)); document.querySelectorAll("[data-opt-pick]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.optPick === k))); try { localStorage.setItem("sognos-cs-opt", k); } catch {} scrollTo(0, 0); };
    document.querySelectorAll("[data-opt-pick]").forEach((b) => b.addEventListener("click", () => pick(b.dataset.optPick)));
    let s = null; try { s = localStorage.getItem("sognos-cs-opt"); } catch {} if (s) pick(s);
    // Search + industry filter, per option.
    document.querySelectorAll("[data-cs-opt]").forEach((root) => {
      let cat = "all", q = "";
      const apply = () => {
        let n = 0;
        root.querySelectorAll("[data-item]").forEach((el) => { const show = (cat === "all" || el.dataset.ind === cat) && (!q || el.dataset.q.includes(q)); el.hidden = !show; if (show && !el.hasAttribute("data-noreveal")) n++; });
        const c = root.querySelector("[data-count]"); if (c) c.textContent = n;
        const e = root.querySelector("[data-empty]"); if (e) e.hidden = !!root.querySelector("[data-item]:not([hidden])");
      };
      root.querySelectorAll("[data-cat]").forEach((b) => b.addEventListener("click", () => { cat = b.dataset.cat; root.querySelectorAll("[data-cat]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); apply(); }));
      root.querySelectorAll("[data-search]").forEach((i) => i.addEventListener("input", () => { q = i.value.trim().toLowerCase(); apply(); }));
    });
    // Spotlight carousel (C): arrows + dots, auto-advance in view, pause on hover.
    const spots = [...document.querySelectorAll("[data-spot]")]; if (spots.length) {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; let k = 0, paused = false;
      const show = (i) => { k = (i + spots.length) % spots.length; spots.forEach((s, j) => (s.hidden = j !== k)); document.querySelectorAll("[data-spot-dot]").forEach((d, j) => d.setAttribute("aria-pressed", String(j === k))); };
      document.querySelectorAll("[data-spot-nav]").forEach((b) => b.addEventListener("click", () => show(k + +b.dataset.spotNav)));
      document.querySelectorAll("[data-spot-dot]").forEach((b) => b.addEventListener("click", () => show(+b.dataset.spotDot)));
      const sec = spots[0].closest("section"); sec.addEventListener("mouseenter", () => (paused = true)); sec.addEventListener("mouseleave", () => (paused = false));
      if (!reduce) setInterval(() => { if (!paused && !sec.closest("[hidden]")) show(k + 1); }, 7000);
    }
  })();
</script>"""

NOTE = """Customer Stories archive - layout options 2026-10-25. Audit: docs/audits/customer-stories-archive-audit.md.
A Grid + filter (recommended): hero + search, featured split card (brand image + live quote), sticky industry chips, 3-col Frontline-style cards.
B Index + rail: sticky rail (search, industries with counts, suggested 'talk to a customer' box), rows with brand thumbnail + tags.
C Spotlight + bento: navy carousel of the 4 quoted stories (photo, quote, author, size), industry chips, bento of photo + brand cards.
Live copy throughout (titles, intro, quotes, authors, sizes). * = proposed industry (Q2). Card image = approved StoryCardImage option C."""

if __name__ == "__main__":  # legacy switcher archive; build_cs_insp.py writes the Inspector archive
    page("archive.html", "Customer Stories - archive layout options", NOTE, CI_CSS + HEADER + OPT_A + OPT_B + OPT_C + SW + JS)
    print("wrote", OUT / "archive.html")
