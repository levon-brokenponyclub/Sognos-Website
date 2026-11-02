"""Home hero + product cards mockups (PORT_PROMPT STEP 2).

Reuses the SognosCare generator shell / type scale via runpy.
  python3 -I <this file> docs/mockups/sognoscare docs/mockups/home
"""
import runpy
import sys
from pathlib import Path

CARE_OUT, OUT = sys.argv[1], Path(sys.argv[2])
sys.argv = [sys.argv[0], CARE_OUT]
ns = runpy.run_path(str(Path(__file__).with_name("build_mockups.py")))
OUT.mkdir(parents=True, exist_ok=True)
page = ns["page"]
page.__globals__["OUT"] = OUT
T, P = ns["T"], ns["P"]
HSW_CSS, HSW_HTML, HSW_JS = runpy.run_path(str(Path(__file__).with_name("hsw_block.py")))["build"](P)
# Footer: index.html gets the shared footer fragment via build_mockups.page()
# (footer_fragment.html, built by build_footer_a.py).

# Live copy (Hero.tsx defaults, HomeProductCards PRODUCTS, LOGO_STRIP_TITLE).
SUB = "Sognos helps service organisations unify demand, workforce, and delivery on Microsoft Dynamics 365 and Copilot-powered workflows."
TRUST = "Trusted by industry leaders and professionals worldwide"
# Live Sanity strip (5): Deloitte, Water NSW, NECA, Sandvik, APM - Sandvik has no local file.
LOGOS = [("deloitte.webp", "Deloitte"), ("water-nsw.webp", "Water NSW"), ("neca.webp", "NECA"), (None, "Sandvik"), ("apm.webp", "APM")]
PRODUCTS = [
    # name, href, white logo, lead, rest, accent (live) | Paraform photo, deep, mid, Base gradient (Frontline Works-with)
    dict(name="SognosCare", logo="sognos-care-logo.svg", lead="Deliver safer, simpler care in the field", rest=" with intake, plans, compliance and outcomes connected in one workflow.", acc="#1d96fc",
         photo="CareBg.avif", deep="#0f1936", mid="#3b6fe0", band="linear-gradient(120deg, #0f1936, #203e71, #3b6fe0, #203e71, #0f1936)"),
    dict(name="SognosRoster", logo="sognos-roster-logo.svg", lead="Put the right worker on every shift", rest=" with skills, location, availability and compliance factored in automatically.", acc="#59bbf7",
         photo="RosterBg.avif", deep="#104b90", mid="#59bbf7", band="linear-gradient(120deg, #03112f, #104b90, #1d96fc, #104b90, #03112f)"),
    dict(name="SognosGenogram", logo="SognosGenogram-logo.svg", lead="Map relationships, histories and support networks", rest=" so every worker has the context they need to deliver better outcomes.", acc="#91278c",
         photo="GenoBg.avif", deep="#3a0f45", mid="#91278c", band="linear-gradient(120deg, #1a0224, #4a1670, #91278c, #4a1670, #1a0224)"),
]

CSS = """<style>
  :root { --navy: #152248; }
  @keyframes h-rise { from { opacity: 0; transform: translateY(16px); } }
  @keyframes h-glow { from { opacity: 0; transform: translateY(40px); filter: blur(24px); } }
  @keyframes h-marquee { to { transform: translateX(-50%); } }
  .h-rise { animation: h-rise .6s cubic-bezier(.22,1,.36,1) backwards; }
  .h-glow { animation: h-glow 1.2s cubic-bezier(.22,1,.36,1) backwards; }
  .h-marquee { animation: h-marquee 28s linear infinite; }
  /* Card image sets: Base = product gradient, Paraform = product photo under the product wash. */
  .hc-panel { background: var(--band); }
  [data-img="paraform"] .hc-panel { background: linear-gradient(160deg, color-mix(in srgb, var(--deep) 55%, transparent), color-mix(in srgb, var(--mid) 35%, transparent)), var(--photo) center / cover; }
  .hc-panel .hc-photo { transition: transform .8s cubic-bezier(.22,1,.36,1); }
  .group:hover .hc-panel .hc-photo { transform: scale(1.04); }
  [data-img="base"] .hc-tile { background: transparent; border-color: transparent; backdrop-filter: none; }
  /* Variant visibility (review switchers) */
  [data-hero="a"] [data-hv="b"], [data-hero="b"] [data-hv="a"], [data-cards="a"] [data-cv="b"], [data-cards="b"] [data-cv="a"] { display: none !important; }
  @media (prefers-reduced-motion: reduce) { .h-rise, .h-glow, .h-marquee { animation: none; } .hc-panel .hc-photo { transition: none; } }
</style>"""

NAV = f"""<header class="fixed inset-x-0 top-0 z-50">
  <div class="flex h-[45px] items-center justify-center gap-3 bg-white px-6 text-sm text-heading"><span class="rounded-full border border-muted px-2 py-0.5 text-xs">Event</span><span class="truncate">Event announcement banner (stub)</span></div>
  <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 text-white">
    <img src="{P}/logos/sognos-logo.svg" alt="Sognos" class="h-6 w-auto brightness-0 invert" />
    <nav class="hidden items-center gap-1 text-sm lg:flex">{"".join(f'<span class="rounded-full px-4 py-2">{n}</span>' for n in ["Products", "Solutions", "Industries", "Customers", "Knowledge Hub", "Company"])}</nav>
    <span class="rounded-full bg-white px-4 py-2.5 text-sm font-medium text-heading">Book a Demo</span>
  </div>
</header>"""

H1_SPANS = '<span class="md:block">Your entire service operation, </span><span class="md:block">run on one intelligent platform.</span>'
PRIMARY = '<button type="button" class="min-h-11 rounded-full bg-white px-7 py-3.5 text-base font-medium text-heading transition-colors hover:bg-accent hover:text-white active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Book a Demo</button>'
SECONDARY = '<a href="#" class="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-base font-medium text-white transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Explore products <span aria-hidden="true">&#8599;</span></a>'

# Hero A - centred (Care hero_a): H1 scale T.h1 with the Care mobile step.
HERO_A = f"""<div data-hv="a" class="mx-auto flex max-w-6xl flex-col items-center text-center">
      <h1 class="h-rise font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-white text-balance sm:text-5xl md:text-6xl">{H1_SPANS}</h1>
      <p class="h-rise mt-4 max-w-2xl text-lg leading-relaxed text-white/80 text-pretty md:mt-5" style="animation-delay:.1s">{SUB}</p>
      <div class="h-rise mt-6 flex flex-col items-center gap-4 sm:flex-row md:mt-8" style="animation-delay:.2s">{PRIMARY}{SECONDARY}</div>
    </div>"""
# Hero B - split header: H1 left (7), sub + CTAs right (5), bottom-aligned.
HERO_B = f"""<div data-hv="b" class="grid grid-cols-1 items-end gap-6 lg:grid-cols-12 lg:gap-10">
      <h1 class="h-rise font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-white text-balance sm:text-5xl lg:col-span-7">{H1_SPANS}</h1>
      <div class="lg:col-span-5">
        <p class="h-rise text-lg leading-relaxed text-white/80 text-pretty" style="animation-delay:.1s">{SUB}</p>
        <div class="h-rise mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center" style="animation-delay:.2s">{PRIMARY}{SECONDARY}</div>
      </div>
    </div>"""


def panel(p, cls):
    return f'''<div class="hc-panel relative overflow-hidden rounded {cls}" style="--band:{p["band"]};--photo:url({P}/product/{p["photo"]});--deep:{p["deep"]};--mid:{p["mid"]}">
            <div class="hc-photo absolute inset-0 flex items-center justify-center"><span class="hc-tile flex items-center justify-center rounded border border-white/30 bg-white/10 px-6 py-4 backdrop-blur-md"><img src="{P}/logos/{p["logo"]}" alt="" class="h-8 w-auto brightness-0 invert md:h-9" /></span></div>
          </div>'''


ARROW = lambda p: f'''<span aria-hidden="true" class="relative isolate flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/30 text-white">
              <span class="absolute inset-0 translate-y-full scale-50 rounded-full transition-transform duration-300 group-hover:translate-y-0 group-hover:scale-100" style="background:{p["acc"]}"></span>
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" class="relative"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>'''
CARD = "group flex flex-col rounded-lg border border-white/10 bg-white/[0.04] p-3 transition-colors hover:border-white/30 active:scale-[.99] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"


def copy(p, big=False):
    return f'''<div class="flex flex-1 flex-col gap-5 p-5{" lg:p-8" if big else ""}">
            <span aria-hidden="true" class="block h-1 w-10 rounded-full" style="background:{p["acc"]}"></span>
            <h2 class="font-heading {"text-2xl md:text-[1.75rem]" if big else "text-xl"} font-normal leading-snug tracking-[-0.01em] text-white">{p["name"]}</h2>
            <div class="mt-auto flex items-end justify-between gap-6"><p class="text-base leading-relaxed text-white/70"><span class="text-white">{p["lead"]}</span>{p["rest"]}</p>{ARROW(p)}</div>
          </div>'''


RAIL = "flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 pb-2 [scrollbar-width:none] lg:grid lg:gap-4 lg:overflow-visible lg:pb-0"
ITEM = "w-[82vw] max-w-[380px] shrink-0 snap-start lg:w-auto lg:max-w-none"
# Cards A - uniform 3-up (Works-with A grid): panel on top, copy below.
CARDS_A = f"""<div data-cv="a" class="{RAIL} lg:grid-cols-3">
        {"".join(f'<a href="#" class="{CARD} {ITEM} h-rise" style="animation-delay:{.3 + k * .08:.2f}s">{panel(p, "aspect-[4/3]")}{copy(p)}</a>' for k, p in enumerate(PRODUCTS))}
      </div>"""
# Cards B - Care + Roster large, Genogram as a full-width band.
c, r, g = PRODUCTS
CARDS_B = f"""<div data-cv="b" class="{RAIL} lg:grid-cols-2">
        {"".join(f'<a href="#" class="{CARD} {ITEM} h-rise" style="animation-delay:{.3 + k * .08:.2f}s">{panel(p, "aspect-[4/3] lg:aspect-[16/10]")}{copy(p, True)}</a>' for k, p in enumerate((c, r)))}
        <a href="#" class="{CARD} {ITEM} h-rise lg:col-span-2 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-4" style="animation-delay:.46s">{panel(g, "aspect-[4/3] lg:col-span-5 lg:aspect-auto lg:min-h-[220px]")}<div class="lg:col-span-7 lg:flex">{copy(g, True)}</div></a>
      </div>"""


def logo(f, a, h="max-h-9"):
    if f:
        return f'<img src="{P}/logos/clients/{f}" alt="{a}" class="h-auto {h} w-auto max-w-full object-contain brightness-0 invert" />'
    return f'<span class="font-heading text-xl font-semibold uppercase tracking-[0.2em] text-white">{a}</span>'


desk = "".join(f'<li class="flex h-20 items-center justify-center px-6 lg:px-10{" border-l border-white/10" if i else ""}">{logo(f, a)}</li>' for i, (f, a) in enumerate(LOGOS))
mob = "".join(f'<li class="flex h-16 w-40 shrink-0 items-center justify-center border-l border-white/10 px-6">{logo(f, a, "max-h-8")}</li>' for f, a in LOGOS)
TRUST_ROW = f"""<div class="text-center">
      <p class="{T["h3"]} text-white">{TRUST}</p>
      <ul aria-label="Trusted by" class="mt-10 hidden grid-cols-5 md:grid">{desk}</ul>
      <div class="relative -mx-6 mt-8 overflow-hidden md:hidden">
        <div aria-hidden="true" class="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--navy)] to-transparent"></div>
        <div aria-hidden="true" class="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--navy)] to-transparent"></div>
        <ul aria-label="Trusted by" class="h-marquee flex w-max">{mob}{mob.replace("<li class=", '<li aria-hidden="true" class=')}</ul>
      </div>
    </div>"""

GLOW = f"""<div aria-hidden="true" class="pointer-events-none absolute inset-0 isolate z-0 flex items-end justify-center">
    {"".join(f'<img src="{P}/images/home/{f}-blur-dp.avif" alt="" class="h-glow absolute inset-x-0 bottom-0 h-auto w-full {z}" style="animation-delay:{.15 + k * .12:.2f}s" />' for k, (f, z) in enumerate([("bottom", "z-0"), ("middle", "z-20"), ("top", "z-30")]))}
    <div class="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-[var(--navy)] to-transparent"></div>
  </div>"""

HERO = f"""<section class="relative overflow-hidden bg-[var(--navy)] pt-40 md:pt-44">
  {GLOW}
  <div class="relative z-40 mx-auto max-w-7xl px-6">
    {HERO_A}
    {HERO_B}
    <div class="mt-14 md:mt-20"><h2 class="sr-only">Products</h2>{CARDS_A}{CARDS_B}</div>
    <div class="py-16 md:py-24">{TRUST_ROW}</div>
  </div>
</section>
""" + HSW_HTML

GROUPS = [("hero", "Hero", [("a", "A · Centred"), ("b", "B · Split")]), ("cards", "Cards", [("a", "A · 3-up"), ("b", "B · Featured")]), ("img", "Image", [("paraform", "Paraform"), ("base", "Base")]), ("hsw", "How it works", [("1", "1 · Pipeline"), ("2", "2 · Product"), ("3", "3 · Photo")])]
SW = '<div class="fixed bottom-5 left-1/2 z-[60] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-care-dark/90 p-1 text-xs text-white backdrop-blur">' + "".join(
    f'<span class="px-2 text-white/60">{t}</span>' + "".join(f'<button type="button" data-set="{k}:{v}" class="whitespace-nowrap rounded-full px-3 py-2 hover:bg-white/10 aria-pressed:bg-white aria-pressed:text-care-dark">{n}</button>' for v, n in opts)
    for k, t, opts in GROUPS) + "</div>"
JS = """<script>
  (() => {
    const root = document.body, set = (k, v, save) => { root.dataset[k] = v; document.querySelectorAll(`[data-set^="${k}:"]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.set === `${k}:${v}`))); if (save) try { localStorage.setItem("sognos-home-" + k, v); } catch {} };
    document.querySelectorAll("[data-set]").forEach((b) => b.addEventListener("click", () => { const [k, v] = b.dataset.set.split(":"); set(k, v, true); }));
    ["hero", "cards", "img", "hsw"].forEach((k) => { let v = root.dataset[k]; if (root.dataset.lock !== "1") try { v = localStorage.getItem("sognos-home-" + k) || v; } catch {} set(k, v); });
  })();
</script>"""

NOTE = """Home Hero + Product Cards - PORT_PROMPT STEP 2, 2026-10-25. Audit: docs/audits/home-hero-productcards-audit.md.
Targets: components/layout/sections/Hero.tsx, HomeProductCards.tsx, LogoStrip.tsx (variant only - shared with solutions/[slug]).
Reference: hero = docs/mockups/sognoscare/01m-hero-a.html (hero_a: centred column, H1/sub/CTA classes, trust row + mobile marquee);
cards = docs/mockups/frontline/index.html Works with A (grid card: rounded-lg p-3 frame, rounded panel on top, accent bar, Base / Paraform image sets).
Addresses: H1 = Care hero_a scale (4xl/5xl/6xl; T.h1's lg:7xl wraps to 4 lines at 1280 and pushes the cards to 721px) + mobile step (6 -> 4 lines at 375), hard break from md only, rounded-full CTAs + 44px secondary + focus rings,
one alignment per breakpoint, product names as h2 + logo alt fixed, per-product panel + accent, gap-3 lg:gap-4, max-w-7xl, rail below lg,
card focus/active states, trust title as <p>, marquee on mobile.
Deviations from reference: navy stays the live sognos-navy #152248 (Care uses care-dark) - no colour drift; cards sit on navy so the frame is
white/[.04] + border-white/10 instead of tint; product photos replace the Works-with graphic panels (no invented demo copy on Home).
Review switchers (bottom) are mock-only. Navbar + banner are stubs in their transparent state."""


HSW_NOTE = """
How Sognos Works - motion graphic options for the TimerCardDeck panel (switcher "How it works"). Target: HowSognosWorks.tsx panel (TimerCardDeck animation slot).
1 Pipeline: navy scene, three zones (Intake / Roster / Outcomes) joined by a live dashed flow; the active step lights its zone (mobile: active zone only).
2 Product: Base set - one product UI per step (intake inbox + typed Copilot summary / week roster + route draw / outcomes KPIs + donut + insight).
3 Photo: Paraform set - product photo under the product wash, one frosted story card per step + pill, slow ken-burns.
Deck: 8s dwell, countdown ring, active card widens (2fr), hover pauses, click to jump. Header copy is live. Panel data is illustrative demo content.
Deviation: panel is 4:3 / 16:9 below md (live 2720:976 is ~130px tall at 375)."""


FOOT_NOTE = """
Footer (shared "Footer" switcher, bottom-left): section file home/footer.html; all layout + design options (A1, A2, A3a / A3b / A3c, B, C) - source docs/mockups/footer/index.html. Live footer copy + every live href; stacked Compass ISO mark; accreditation logos trimmed and sized for equal optical area."""


def build(name, title, hero, cards, img, lock):
    attrs = f'<script>document.body.dataset.hero="{hero}";document.body.dataset.cards="{cards}";document.body.dataset.img="{img}";document.body.dataset.hsw="1";document.body.dataset.lock="{1 if lock else 0}";</script>'
    page(name, title, NOTE + HSW_NOTE + FOOT_NOTE, CSS + HSW_CSS + attrs + NAV + HERO + SW + JS + HSW_JS)


if __name__ == "__main__":  # legacy section files; build_home_insp.py writes the Inspector index
    build("01-hero-a.html", "Home hero A - centred", "a", "a", "paraform", True)
    build("01-hero-b.html", "Home hero B - split header", "b", "a", "paraform", True)
    build("02-product-cards-a.html", "Home product cards A - uniform 3-up", "a", "a", "paraform", True)
    build("02-product-cards-b.html", "Home product cards B - Care + Roster featured", "a", "b", "paraform", True)
    print("wrote", sorted(p.name for p in OUT.glob("*.html")))
