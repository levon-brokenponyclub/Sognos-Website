"""Home · Hero + trust logos + stacking product cards, after angellist.com (2026-11-02).
Writes docs/mockups/home/hero-stack.html. Run from the redesign repo root:
  python3 -I docs/mockups/_generators/build_home_stack.py

Reference (angellist.com, measured 2026-11-02):
  - Hero: dark field, centred display H1 (~77px, 400, -0.01em) with the second line in a
    soft lavender, one-line sub, a single white CTA; trust row = stat + logos split by hairlines.
  - Stack: the dark field continues behind light cards with a 40px top radius; each card overlaps
    the one above by 40px (-mt-10) with a higher z-index, and the covered card scrolls at half
    speed (CSS scroll-driven animation; static overlap where unsupported).
  - Card: dot label, large product name (~58px), two-tone lede (~22px), primary + secondary CTA,
    short link list (6 cols) beside a square visual panel (cols 8-12, 12px radius).
Sognos copy and assets only. No shadows (the reference's stack shadow becomes a hairline;
cards alternate white / Sognos tint). Adjusted 2026-11-02: navy #152248 field, accent second
headline line at text-6xl, Book a Demo + Talk to Sales, product motion graphics on the photo
panels, card H2 text-4xl / lede text-lg, tighter label-to-title gap.
Open question before porting: the 40px card radius is outside the radius rule (rounded / rounded-lg).
"""
import runpy
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
P = "../../../public"
OUT = ROOT / "docs/mockups/home/hero-stack.html"
HERE = Path(__file__).resolve().parent

# Product motion graphics (same as the Works with cards): Care Copilot draft, Roster route
# optimisation, Genogram network over time. build_mockups.py rebuilds the SognosCare pages
# as a side effect, as it does in build_all.sh.
sys.argv = [sys.argv[0], str(ROOT / "docs/mockups/sognoscare")]
NS = runpy.run_path(str(HERE / "build_mockups.py"))
GENO_FV, _ = runpy.run_path(str(HERE / "product_visuals.py"))["build"](NS)
GFX = {"SognosCare": NS["FV_COPILOT"], "SognosRoster": NS["R_ROUTE"], "SognosGenogram": GENO_FV[4][1]}
# Genogram graphic reads the product ladder.
GENO_VARS = "--p-base:#91278c;--p-dark:#3a0f45;--p-deep:#1a0224;--p-accent:#d9a6d6;--p-soft:#f8eef8;--p-tint:#efdcee;--p-ink:#7a1f75"

H1 = ('<span class="block">Your entire service operation,</span>'
      '<span class="block text-accent">run on one intelligent platform.</span>')
SUB = "Sognos helps service organisations unify demand, workforce, and delivery on Microsoft Dynamics 365 and Copilot-powered workflows."
LOGOS = ["auckland-airport-logo.png", "flourish-australia-logo.png", "penrith-city-council-logo.png", "asc-logo.webp", "gentari-logo-rect.webp"]

PRODUCTS = [
    dict(label="Care operations &amp; compliance", name="SognosCare", href="/products/sognoscare", logo="sognos-care-logo.svg",
         photo="product/CareBg.avif", deep="#0f1936", mid="#3b6fe0", dot="#3b6fe0",
         lead="This is the platform behind care providers who run intake, plans, compliance and outcomes in one workflow.",
         rest=" The same record from referral to review, audit-ready by default.",
         links=["Case management", "Compliance &amp; audit trail", "Reporting &amp; analytics"],
         card=("Progress note &middot; M. Turner", "Copilot draft ready to sign")),
    dict(label="Workforce scheduling &amp; optimisation", name="SognosRoster", href="/products/sognosroster", logo="sognos-roster-logo.svg",
         photo="product/RosterBg.avif", deep="#104b90", mid="#59bbf7", dot="#1d96fc",
         lead="This is the engine that puts the right worker on every shift, with skills, location and availability matched automatically.",
         rest=" Real-time changes, re-optimised in minutes.",
         links=["Intelligent scheduling", "Skills &amp; compliance matching", "Route optimisation"],
         card=("4 visits &middot; optimised order", "&minus;38 min travel today")),
    dict(label="Relationship &amp; family context", name="SognosGenogram", href="/products/sognosgenogram", logo="SognosGenogram-logo.svg",
         photo="product/GenoBg.avif", deep="#3a0f45", mid="#91278c", dot="#91278c",
         lead="This is the map of who matters around every client, built into the case record.",
         rest=" Support networks, histories and risk, carried across every handover.",
         links=["Genogram builder", "Support network mapping", "Copilot AI narrative"],
         card=("Support network &middot; M. Turner", "6 people &middot; 2 formal supports")),
]

FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d96fc]"
ARW = '<span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">&rarr;</span>'


def card(i, p):
    links = "".join(f'<li><a href="#" class="group flex min-h-12 items-center justify-between gap-4 border-t border-line py-3 text-heading {FOCUS}"><span>{l}</span>{ARW}</a></li>' for l in p["links"])
    style = f'background:linear-gradient(160deg, color-mix(in srgb, {p["deep"]} 55%, transparent), color-mix(in srgb, {p["mid"]} 35%, transparent)), url({P}/{p["photo"]}) center / cover'
    if p["name"] == "SognosGenogram":
        style += ";" + GENO_VARS
    # Photo + product wash, white logo, then the motion graphic (frosted cards; see .pp CSS).
    panel = (f'<div class="pp relative isolate col-span-full flex aspect-square flex-col items-center gap-6 overflow-hidden rounded-xl px-6 pt-10 md:col-[8/-1]" style="{style}">'
             f'<img src="{P}/logos/{p["logo"]}" alt="" class="h-9 w-auto shrink-0 brightness-0 invert" />'
             f'<div aria-hidden="true" class="flex w-full flex-1 justify-center">{GFX[p["name"]]}</div></div>')
    bg = "bg-white" if i % 2 == 0 else "bg-tint"
    return f'''<div class="stack relative w-full {"" if i == 0 else "-mt-6 md:-mt-10"}" style="z-index:{i}">
      <div class="stack-card w-full rounded-t-3xl border-t border-line {bg} md:rounded-t-[40px]">
        <div class="mx-auto grid max-w-7xl gap-8 px-6 pt-8 pb-12 md:grid-cols-12 md:pt-12 md:pb-18 lg:pt-16 lg:pb-24">
          <div class="col-span-full flex flex-col items-start gap-6 md:col-span-6">
            <p class="flex items-center gap-2 text-lg text-heading"><span aria-hidden="true" class="size-3 rounded-full" style="background:{p["dot"]}"></span>{p["label"]}</p>
            <div>
              <h2 class="font-heading text-3xl font-normal leading-[1.2] tracking-[-0.01em] text-heading md:text-4xl">{p["name"]}</h2>
              <p class="mt-4 text-lg leading-relaxed text-heading">{p["lead"]}<span class="text-muted">{p["rest"]}</span></p>
              <div class="mt-6 flex flex-wrap items-center gap-2">
                <a href="#" class="inline-flex h-12 items-center rounded-full bg-heading px-5 text-base text-white transition-colors hover:bg-accent {FOCUS}">Explore {p["name"]}</a>
                <a href="#" class="inline-flex h-12 items-center rounded-full border border-line bg-white px-5 text-base text-heading transition-colors hover:border-heading {FOCUS}">Book a Demo</a>
              </div>
              <ul class="mt-10 border-b border-line">{links}</ul>
            </div>
          </div>
          {panel}
        </div>
      </div>
    </div>'''


HTML = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Home - hero + stacking product cards (angellist.com study)</title>
<!--
Generated by docs/mockups/_generators/build_home_stack.py - edit the script, not this file.
-->
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<style>
  @font-face {{ font-family: "AngelList"; src: url("{P}/app/AngelList.woff2") format("woff2"); font-weight: 100 900; font-display: swap; }}
  /* Covered card scrolls at half speed as the next one slides over it. */
  @supports (animation-timeline: view()) {{
    .stack-card {{ animation: stack-slow linear both; animation-timeline: view(); animation-range: exit 0% exit 100%; }}
    @keyframes stack-slow {{ to {{ transform: translateY(50%); }} }}
  }}
  @media (prefers-reduced-motion: reduce) {{ .stack-card {{ animation: none !important; }} }}
  /* Product panels: the graphic sits on the photo, its white cards frosted. */
  .pp .fv {{ background: transparent !important; min-height: 0 !important; padding: 0 !important; width: 100%; }}
  .pp .fv .bg-white {{ background: rgb(255 255 255 / .72) !important; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-color: rgb(255 255 255 / .6) !important; }}
  .pp .fv .border-line {{ border-color: rgb(255 255 255 / .55); }}
  /* Header turns navy once the page scrolls. */
  header[data-scrolled="true"] {{ background: #152248; }}
</style>
{NS["FV_CSS"]}{NS["XTRA_CSS"]}{NS["MOTION_CSS"]}
<style type="text/tailwindcss">
  @theme {{
    --font-sans: "AngelList", ui-sans-serif, system-ui, sans-serif;
    --font-heading: "AngelList", ui-sans-serif, system-ui, sans-serif;
    --color-heading: #0f1936; --color-body: #152248; --color-muted: #68706f; --color-line: #e2e8f0;
    --color-tint: #f9fafe; --color-accent: #1d96fc; --color-ink: #152248; --color-navy: #152248;
    --color-care-dark: #0f1936; --color-care-base: #3b6fe0; --color-accent-strong: #0b6fc4;
  }}
</style>
</head>
<body class="bg-white font-sans antialiased">
<header class="fixed inset-x-0 top-0 z-50 transition-colors duration-300" data-scrolled="false">
  <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
    <img src="{P}/logos/sognos-logo.svg" alt="Sognos" class="h-7 w-auto brightness-0 invert" />
    <nav class="hidden h-14 items-center gap-1 rounded-full bg-white/5 p-2 text-base text-white lg:flex">{"".join(f'<span class="rounded-full px-4 py-2">{n}</span>' for n in ["Why Sognos", "Products", "Solutions", "Industries", "Knowledge Hub"])}</nav>
    <a href="#" class="inline-flex h-12 items-center rounded-full bg-white px-5 text-base text-heading">Book a Demo</a>
  </div>
</header>

<main>
  <!-- Hero: centred display headline, one CTA -->
  <section class="relative bg-ink pt-40 pb-16 text-white md:pt-48">
    <div class="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
      <h1 class="font-heading text-5xl font-normal leading-[1.05] tracking-[-0.01em] md:text-6xl">{H1}</h1>
      <p class="max-w-2xl text-lg leading-relaxed text-white/85">{SUB}</p>
      <div class="mt-4 flex flex-wrap items-center justify-center gap-3">
        <a href="#" class="inline-flex h-12 items-center rounded-full bg-white px-6 text-base text-heading transition-colors hover:bg-accent hover:text-white {FOCUS}">Book a Demo</a>
        <a href="#" class="inline-flex h-12 items-center gap-1.5 rounded-full px-2 text-base text-white transition-opacity hover:opacity-80 {FOCUS}">Talk to Sales <span aria-hidden="true">&#8599;</span></a>
      </div>
    </div>

    <!-- Trust row: stat + logos split by hairlines -->
    <div class="mx-auto mt-20 max-w-6xl px-6 md:mt-28">
      <ul class="grid grid-cols-2 items-center gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        <li class="flex flex-col items-center justify-center px-4 text-center"><span class="font-heading text-4xl text-white/85">4.9</span><span class="mt-1 text-sm text-white/60">Rated by operations leaders</span></li>
        {"".join(f'<li class="flex h-20 items-center justify-center border-white/20 px-6 lg:border-l"><img src="{P}/logos/{l}" alt="" class="max-h-10 w-auto max-w-full object-contain opacity-70 brightness-0 invert" /></li>' for l in LOGOS)}
      </ul>
    </div>
  </section>

  <!-- Product stack: the dark field continues behind the cards' rounded tops -->
  <section class="relative bg-white">
    <div class="relative flex w-full flex-col overflow-clip bg-ink">
      {"".join(card(i, p) for i, p in enumerate(PRODUCTS))}
    </div>
  </section>

  <section class="bg-white py-24 text-center text-sm text-muted">Next section (How Sognos Works)</section>
</main>
{NS["FV_JS"]}{NS["MOTION_JS"]}
<script>
  (() => {{ const h = document.querySelector("header"); const on = () => (h.dataset.scrolled = String(scrollY > 8)); addEventListener("scroll", on, {{ passive: true }}); on(); }})();
</script>
</body>
</html>
'''

OUT.write_text(HTML)
print(f"wrote {OUT.relative_to(ROOT)}")
