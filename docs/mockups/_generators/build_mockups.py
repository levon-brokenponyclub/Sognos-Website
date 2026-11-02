"""Generates docs/mockups/sognoscare/*.html from section snippets.

Run from the redesign repo root:  python3 -I <this file> docs/mockups/sognoscare
Each section file is self-contained; index.html stacks the recommended
variants in page order.
"""
import sys
from pathlib import Path

OUT = Path(sys.argv[1])
OUT.mkdir(parents=True, exist_ok=True)
P = "../../../public"  # docs/mockups/sognoscare -> repo/public

SHELL = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{title}</title>
{comment}
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<style>
  html {{ scroll-padding-top: 8rem; }} /* 80px header + 46px section bar */
  @font-face {{ font-family: "AngelList"; src: url("{P}/app/AngelList.woff2") format("woff2"); font-weight: 100 900; font-display: swap; }}
</style>
<style type="text/tailwindcss">
  @theme {{
    --font-sans: "AngelList", ui-sans-serif, system-ui, sans-serif;
    --font-heading: "AngelList", ui-sans-serif, system-ui, sans-serif;
    --font-sofia: "sofia-pro", ui-sans-serif, system-ui, sans-serif;
    --color-care-dark: #0f1936;
    --color-care-base: #3b6fe0;
    --color-accent: #1d96fc;
    --color-accent-strong: #0b6fc4; /* accent darkened for small text on white (≈5.1:1) */
    --color-heading: #0f1936;
    --color-body: #152248;
    --color-muted: #68706f;
    --color-line: #e2e8f0;
    --color-tint: #f9fafe;
    --color-navy: #152248;
    --color-ed-dmh: #00a98f;
    --color-ed-ahc: #ffad6e;
    --color-ed-hith: #cbdd61;
    --color-ed-sah: #ff8e90;
    --color-ed-rac: #caa4ff;
    --color-ed-cfs: #ff7dbc;
  }}
  /* Shared mockup primitives — stand-ins for AnimatedEyebrow / rail. */
  @utility eyebrow {{ @apply inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest; }}
</style>
</head>
<body class="bg-white font-sans text-body antialiased">
{body}
</body>
</html>
"""


def page(name, title, comment, body):
    html = SHELL.format(title=title, comment=f"<!--\n{comment.strip()}\n-->", body=body, P=P)
    if "sg-wm" in html:
        import runpy as _rp
        html = html.replace("</head>", "<style>" + _rp.run_path(str(Path(__file__).with_name("logo_mask.py")))["WM_CSS"] + "</style></head>", 1)
    # Page-level mockups carry the shared footer options (footer/ renders its
    # own).
    if name in ("index.html", "archive.html") and Path(OUT).name not in ("footer", "products"):
        import runpy as _rp
        html = _rp.run_path(str(Path(__file__).with_name("inject_footer.py")))["inject_html"](html)
    (OUT / name).write_text(html)


# ── Type + spacing scale ───────────────────────────────────────────────────
# One scale for every section (AngelList SPVs / scout-funds, measured):
#   label  18px/400, accent, square marker 0.66em (brand motif)
#   H1     48→60→72px / 400 / lh 1.05 / -0.02em
#   H2     30→36px / 400 / lh 1.2 / -0.01em   (header block max 770px)
#   lede   16px / lh relaxed / muted (white/75 on dark), max-w-2xl  (hero sub 18px)
#   H3     card 24→28px / 400 / lh 1.25 · step 22px / 400 / lh 1.4 · small 18px / 400
#   body   16px relaxed · small 14px normal · numeral 48px / 400 accent
#   rhythm section py-20 md:py-28 · header gap-4 · header→content mt-10/16/20
#   rail   12-col, gap-8, label col-span-2, content col-[3/-1]
T = {
    "h1": "font-heading text-5xl font-normal leading-[1.05] tracking-[-0.02em] text-balance md:text-6xl lg:text-7xl",
    "h2": "font-heading text-3xl font-normal leading-[1.2] tracking-[-0.01em] text-balance md:text-4xl",
    "lede": "max-w-2xl text-base leading-relaxed text-pretty",
    "herosub": "max-w-2xl text-lg leading-relaxed text-pretty",
    "h3": "font-heading text-2xl font-normal leading-[1.25] tracking-[-0.01em] md:text-[1.75rem]",
    "h3step": "text-[1.375rem] font-normal leading-[1.4] tracking-[-0.0035em]",
    "h3sm": "font-heading text-lg font-normal leading-snug tracking-[-0.005em]",
    "body": "text-base leading-relaxed",
    "small": "text-sm leading-normal",
    "numeral": "font-heading text-5xl font-normal leading-[1.05] tracking-[-0.01em] tabular-nums",
    "quote": "font-heading text-xl font-normal leading-[1.35] tracking-[-0.01em] md:text-2xl",
}
SECTION = "py-20 md:py-28"
HEAD = "flex max-w-[770px] flex-col gap-4"
GAP = "mt-10 md:mt-16 xl:mt-20"
RAIL = "grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8"
CONTENT = "min-w-0 lg:col-[3/-1]"


# Marker carries the accent; label text stays readable (blue text on white is
# ~3.1:1). tone: "light" surfaces → heading colour, "dark" → white/80.
def label(text, tone="light", sticky=True):
    stick = " lg:sticky lg:top-36" if sticky else ""
    colour = "text-white/80" if tone == "dark" else "text-heading"
    return (
        f'<p class="flex items-center gap-2.5 text-lg leading-[1.6] {colour}{stick}">'
        f'<span aria-hidden="true" class="block size-[0.66em] shrink-0 bg-accent"></span>{text}</p>'
    )


def eyebrow(text, tone="light"):
    return label(text, tone, sticky=False)


# ── 01 Hero ────────────────────────────────────────────────────────────────
# Trust logos inside the hero (replaces the logo block + separate strip).
# Live logos come from Sanity (Deloitte, Water NSW, NECA, Sandvik, APM); the
# four with local files stand in here, Sandvik as a wordmark.
TRUST_LOGOS = [("deloitte.webp", "Deloitte"), ("water-nsw.webp", "Water NSW"), ("neca.webp", "NECA"), (None, "Sandvik"), ("apm.webp", "APM")]


def _logo(f, alt, h="h-8 md:h-9"):
    if f:
        return f'<img src="{P}/logos/clients/{f}" alt="{alt}" class="{h} w-auto max-w-[140px] object-contain opacity-80 brightness-0 invert" />'
    return f'<span class="font-heading text-xl font-semibold uppercase tracking-[0.2em] text-white/80">{alt}</span>'


HERO_BG = "background: radial-gradient(70% 60% at 20% 30%, rgba(59,111,224,.35), transparent 70%), radial-gradient(60% 50% at 85% 70%, rgba(32,62,113,.6), transparent 70%), #0f1936"
HERO_CTAS = """<button type="button" class="min-h-11 rounded-full bg-white px-7 py-3.5 text-base font-medium text-care-dark transition-colors hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Book a Demo</button>
        <a href="#problems" class="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-base font-medium text-white transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Learn More <span aria-hidden="true">&#8599;</span></a>"""
H1 = "One platform. From intake to outcome."
SUB = "Manage cases, track service delivery, meet compliance obligations, and report with confidence - in one platform built end-to-end for care."


def hero(variant):
    if variant == "a":
        return hero_a()
    """A: Routable - centred, logos as a bare row at the hero foot.
    B: centred, caption + hairline-divided logo grid at the foot (strip folded in).
    C: left-aligned editorial split - copy left, logo grid right, bottom-aligned."""
    if variant == "c":
        cells = "\n          ".join(
            f'<li class="flex h-24 items-center justify-center border-white/10 px-6 odd:border-r [&:not(:nth-last-child(-n+2))]:border-b">{_logo(f, a)}</li>'
            for f, a in TRUST_LOGOS
        ) + '\n          <li aria-hidden="true" class="h-24"></li>'
        return f"""<section id="hero" class="relative overflow-hidden" style="{HERO_BG}">
  <div class="mx-auto grid min-h-[88vh] max-w-7xl grid-cols-1 items-end gap-12 px-6 pt-44 pb-20 md:pt-52 md:pb-28 lg:grid-cols-12 lg:gap-8">
    <div class="flex flex-col items-start gap-4 lg:col-span-7">
      {eyebrow("SognosCare", "dark")}
      <h1 class="{T["h1"]} text-white">{H1}</h1>
      <p class="{T["herosub"]} text-white/75">{SUB}</p>
      <div class="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
        {HERO_CTAS}
      </div>
    </div>
    <div class="lg:col-span-5">
      <p class="{T["small"]} text-white/60">Trusted by industry leaders and professionals worldwide</p>
      <ul class="mt-6 grid grid-cols-2 border-t border-white/10">
          {cells}
      </ul>
    </div>
  </div>
</section>"""
    row = "\n        ".join(f'<li class="flex items-center justify-center">{_logo(f, a)}</li>' for f, a in TRUST_LOGOS)
    row_a = "\n        ".join(
        f'<li class="flex items-center justify-center{" col-span-2 md:hidden" if i == 4 else ""}">{_logo(f, a, "h-10 md:h-12")}</li>'
        for i, (f, a) in enumerate(TRUST_LOGOS)
    ).replace("max-w-[140px]", "max-w-[180px]")
    if variant == "b":
        foot = f"""  <div class="relative mx-auto w-full max-w-5xl px-6 pb-16 md:pb-20">
    <p class="text-center {T["small"]} text-white/60">Trusted by industry leaders and professionals worldwide</p>
    <ul class="mt-8 grid grid-cols-2 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-3 md:grid-cols-5 md:gap-y-0 md:[&>li:not(:first-child)]:border-l md:[&>li]:border-white/10">
        {row}
    </ul>
  </div>"""
    else:
        foot = f"""  <div class="relative mx-auto w-full max-w-6xl px-6 pb-16 md:pb-20">
    <ul aria-label="Trusted by" class="grid grid-cols-2 items-center gap-x-10 gap-y-8 md:grid-cols-4">
        {row_a}
    </ul>
  </div>"""
    h1_centred = (
        f'<h1 class="{T["h1"]} text-white">{H1}</h1>' if variant == "b" else
        '<h1 class="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-white text-balance sm:text-5xl md:text-6xl">'
        '<span class="block">One platform.</span><span class="block">From intake to outcome.</span></h1>'
    )
    return f"""<section id="hero" class="relative flex min-h-[88vh] flex-col justify-between overflow-hidden" style="{HERO_BG}">
  <div class="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 pt-44 pb-20 text-center md:pt-52 md:pb-24">
    {eyebrow("SognosCare", "dark")}
    {h1_centred}
    <p class="{T["herosub"]} text-white/75">{SUB}</p>
    <div class="mt-4 flex flex-col items-center gap-4 sm:flex-row">
      {HERO_CTAS}
    </div>
  </div>
{foot}
</section>"""


def hero_a():
    """Option A after routable.com/product/ap-automation (measured at 1440px):
    centred copy column (~710px), single CTA row, 80px to a rounded-lg visual
    (~1112px, 1112:659), 80px to a justify-between logo row the width of the
    visual; mobile logos run as an edge-faded marquee. Section has left/right
    15% fades to the base colour. Logo block restored as the visual."""
    def cell_logo(f, a):
        return _logo(f, a, "h-auto max-h-full w-auto").replace("max-w-[140px]", "max-w-full")
    desk = "\n        ".join(
        f'<li class="flex h-20 items-center justify-center px-8 lg:px-12{" border-l border-white/10" if i else ""}">{cell_logo(f, a)}</li>'
        for i, (f, a) in enumerate(TRUST_LOGOS[:4])
    )
    mob = "".join(
        f'<li class="flex h-16 w-44 shrink-0 items-center justify-center border-l border-white/10 px-6">{cell_logo(f, a)}</li>' for f, a in TRUST_LOGOS
    )
    return f"""<style>
  @keyframes care-marquee {{ to {{ transform: translateX(-50%); }} }}
  .care-marquee {{ animation: care-marquee 28s linear infinite; }}
  @media (prefers-reduced-motion: reduce) {{ .care-marquee {{ animation: none; }} }}
</style>
<section id="hero" class="relative overflow-hidden bg-care-dark pt-44 pb-12 text-white md:pt-52 md:pb-20">
  <div aria-hidden="true" class="pointer-events-none absolute inset-0" style="{HERO_BG.replace("background:", "background:").split(";")[0].replace("background: ", "background: ")}"></div>
  <div aria-hidden="true" class="pointer-events-none absolute inset-y-0 left-0 hidden w-[15%] bg-gradient-to-r from-care-dark to-transparent md:block"></div>
  <div aria-hidden="true" class="pointer-events-none absolute inset-y-0 right-0 hidden w-[15%] bg-gradient-to-l from-care-dark to-transparent md:block"></div>

  <div class="relative z-10 mx-auto max-w-7xl space-y-10 px-6 md:space-y-20">
    <div class="mx-auto flex max-w-3xl flex-col items-center text-center">
      {eyebrow("SognosCare", "dark")}
      <h1 class="mt-4 font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-white text-balance sm:text-5xl md:text-6xl"><span class="block">One platform.</span><span class="block">From intake to outcome.</span></h1>
      <p class="mt-4 max-w-[35rem] text-lg leading-relaxed text-white/80 text-pretty md:mt-5">{SUB}</p>
      <div class="mt-6 flex flex-col items-center gap-4 sm:flex-row md:mt-8">
        {HERO_CTAS}
      </div>
    </div>

    <div class="mx-auto max-w-[1112px]">
      <div class="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-lg md:aspect-[12/5]" style="background: linear-gradient(to bottom right, #203e71, #3b6fe0, #122348)">
        <img src="{P}/logos/sognos-care-logo.svg" alt="SognosCare" class="h-10 w-auto sm:h-14 lg:h-16" />
      </div>
    </div>

    <div>
      <ul aria-label="Trusted by" class="mx-auto hidden max-w-[1112px] grid-cols-4 md:grid">
        {desk}
      </ul>
      <div class="relative -mx-6 overflow-hidden md:hidden">
        <div aria-hidden="true" class="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-care-dark to-transparent"></div>
        <div aria-hidden="true" class="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-care-dark to-transparent"></div>
        <ul aria-label="Trusted by" class="care-marquee flex w-max">{mob}{mob.replace('<li class=', '<li aria-hidden="true" class=')}</ul>
      </div>
    </div>
  </div>
</section>"""


HERO_NOTE = """Hero options 2026-10-24: logo block removed; trust logos move into the hero and the separate ProductTrustStrip section is dropped.
Background: care-dark with two soft care-gradient glows (atmospheric, after routable.com/manufacturing) - existing colour values only.
Copy unchanged; logos are the live strip's five (Sanity) - local files stand in, Sandvik as a wordmark.
Maps to: sognoscare/Hero.tsx (+ remove <ProductTrustStrip> from sognoscare/page.tsx; logos via getLogoStripContent)."""


# ── 02 Trust strip ─────────────────────────────────────────────────────────
LOGOS = "\n      ".join(
    f'<li class="flex h-16 items-center justify-center px-5 md:border-l md:border-white/20 md:first:border-l-0"><span class="text-sm font-semibold uppercase tracking-widest text-white/60">{n}</span></li>'
    for n in ["Deloitte", "Water NSW", "NECA", "Sandvik", "APM"]
)
TRUST = f"""<section aria-label="Trusted organisations" class="bg-care-dark">
  <div class="mx-auto max-w-5xl px-6 py-16 text-center md:py-20">
    <p class="{T["h3"]} text-white">Trusted by industry leaders and professionals worldwide</p>
    <ul class="mt-10 grid grid-cols-2 gap-y-4 sm:grid-cols-3 md:mt-12 md:grid-cols-5">
      {LOGOS}
    </ul>
  </div>
</section>"""

# ── 03 Problems ────────────────────────────────────────────────────────────
# Four solution steps (5th "Copilot-Powered Workflows" removed by request).
CAPS = [
    ("01", "Unified Care Records", "Referrals, assessments, care plans, incidents, service agreements and progress notes in one system."),
    ("02", "Built-In Compliance", "Audit trails, funding controls and evidence captured automatically as work happens."),
    ("03", "Connected Workforce", "SognosCare and SognosRoster share the same data layer across visits, plans and participant history."),
    ("04", "Real-Time Reporting", "Operational, workforce, compliance and funding reports generated continuously, not manually assembled."),
]
# AngelList scout-funds "How it works": hairline border-l columns, gap-1 stack,
# large accent numeral, 22px title, 14px muted body, no card.
caps_html = "\n".join(
    f"""          <li class="flex flex-col gap-1 border-l border-line px-4 md:pl-8">
            <span class="block {T["numeral"]} text-accent">{int(n)}</span>
            <h3 class="mt-1 {T["h3step"]} text-heading">{t}</h3>
            <p class="{T["small"]} text-body">{d}</p>
          </li>"""
    for n, t, d in CAPS
)
# Sub-nav after routable.com/product/payouts (measured at 1440px): a full-width
# secondary bar hung off the bottom of the fixed header (`absolute top-full`),
# dashed hairlines top + bottom, container py-3, product name left (14px/500),
# section links right (14px, gap-x-3 xl:gap-x-6), plain text - no pills. It
# inherits the header's colour state: transparent + white over the dark hero,
# white + dark text once the page scrolls (our navbar's single `scrolled`
# flag). Below lg it collapses to a disclosure (product name + chevron).
# Mockup has no navbar, so the bar is fixed at top-0; in production it sits
# under the 80px bar (top-20) as part of the Navbar's fixed stack.
SUBNAV_LINKS = [
    ("problems", "What it solves"), ("features", "Features"), ("editions", "Editions"),
    ("advantages", "Key Advantages"), ("stories", "Customer Stories"),
]
_links = "\n          ".join(
    f'<li><a href="#{i}" data-spy="{i}" class="text-white/75 transition-colors duration-200 hover:text-white aria-[current=true]:text-accent">{t}</a></li>'
    for i, t in SUBNAV_LINKS
)
_mlinks = "\n          ".join(
    f'<li><a href="#{i}" class="block py-2 text-base">{t}</a></li>' for i, t in SUBNAV_LINKS
)
SUBNAV = f"""<div id="site-header" data-scrolled="false" class="group/header fixed inset-x-0 top-0 z-50">
  <header class="border-b border-transparent transition-[background-color,border-color] duration-300 group-data-[scrolled=true]/header:border-navy group-data-[scrolled=true]/header:bg-care-dark">
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
      <a href="#hero" class="justify-self-start"><img src="{P}/logos/sognos-logo.svg" alt="Sognos" class="h-7 w-auto brightness-0 invert" /></a>
      <nav aria-label="Main" class="hidden h-14 items-center gap-0.5 justify-self-center rounded-full bg-white/5 p-2 lg:flex"><ul class="flex items-center gap-0.5"><li><button type="button" class="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-base font-normal tracking-tight text-white transition-colors duration-200 hover:bg-white hover:text-heading focus-visible:outline-2 focus-visible:outline-white">Why Sognos<svg aria-hidden="true" class="h-3.5 w-3.5 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m19 9-7 7-7-7"/></svg></button></li><li><button type="button" class="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-base font-normal tracking-tight text-white transition-colors duration-200 hover:bg-white hover:text-heading focus-visible:outline-2 focus-visible:outline-white">Products<svg aria-hidden="true" class="h-3.5 w-3.5 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m19 9-7 7-7-7"/></svg></button></li><li><button type="button" class="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-base font-normal tracking-tight text-white transition-colors duration-200 hover:bg-white hover:text-heading focus-visible:outline-2 focus-visible:outline-white">Solutions<svg aria-hidden="true" class="h-3.5 w-3.5 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m19 9-7 7-7-7"/></svg></button></li><li><button type="button" class="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-base font-normal tracking-tight text-white transition-colors duration-200 hover:bg-white hover:text-heading focus-visible:outline-2 focus-visible:outline-white">Industries<svg aria-hidden="true" class="h-3.5 w-3.5 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m19 9-7 7-7-7"/></svg></button></li><li><button type="button" class="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-base font-normal tracking-tight text-white transition-colors duration-200 hover:bg-white hover:text-heading focus-visible:outline-2 focus-visible:outline-white">Knowledge Hub<svg aria-hidden="true" class="h-3.5 w-3.5 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m19 9-7 7-7-7"/></svg></button></li></ul></nav>
      <div class="flex items-center gap-x-2 justify-self-end">
        <a href="#" class="hidden h-12 items-center justify-center rounded-sm bg-white px-4 text-base font-normal tracking-tight text-heading transition-colors duration-200 hover:bg-accent hover:text-white lg:inline-flex">Book a Demo</a>
        <a href="#" class="hidden h-14 items-center justify-center rounded-full bg-white px-4 text-sm font-medium text-heading sm:inline-flex lg:hidden">Book a Demo</a>
        <button type="button" aria-label="Open menu" class="flex size-11 items-center justify-center text-white/80 hover:text-white lg:hidden"><svg aria-hidden="true" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></svg></button>
      </div>
    </div>
  </header>
  <menu id="subnav" aria-label="SognosCare sections" class="m-0 p-0 text-white transition-colors duration-300 group-data-[scrolled=true]/header:bg-care-dark">
  <div class="relative w-full border-y border-dashed border-white/10 max-lg:hidden">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-x-12 px-6 py-3 {T["small"]}">
      <a href="#hero" class="font-medium">SognosCare</a>
      <ul class="flex items-center gap-x-3 xl:gap-x-6">
          {_links}
          <li><a href="#" class="transition-colors duration-200 hover:text-accent">Schedule a Call</a></li>
          <li><a href="#" class="inline-flex items-center gap-1.5 font-medium transition-colors duration-200 hover:text-accent">Download Datasheet <span aria-hidden="true">&darr;</span></a></li>
      </ul>
    </div>
  </div>
  <details class="border-y border-dashed border-white/10 open:bg-care-dark lg:hidden">
    <summary class="mx-auto flex max-w-7xl cursor-pointer list-none items-center justify-between px-6 py-3 {T["small"]} font-medium [&::-webkit-details-marker]:hidden">SognosCare <span aria-hidden="true">&#9662;</span></summary>
    <ul class="mx-auto max-w-7xl px-6 pb-3">
          {_mlinks}
          <li><a href="#" class="block py-2 text-base">Schedule a Call</a></li>
          <li><a href="#" class="block py-2 text-base">Download Datasheet</a></li>
    </ul>
  </details>
  </menu>
</div>
<script>
  // Header colour state + scroll-spy (stand-ins for the Navbar's `scrolled`
  // flag and ProductSubNav's IntersectionObserver).
  (() => {{
    const head = document.getElementById("site-header");
    const bar = document.getElementById("subnav");
    const onScroll = () => head.dataset.scrolled = String(window.scrollY > 8);
    addEventListener("scroll", onScroll, {{ passive: true }}); onScroll();
    const links = [...bar.querySelectorAll("[data-spy]")];
    const io = new IntersectionObserver((es) => es.forEach((e) => {{
      if (!e.isIntersecting) return;
      links.forEach((l) => l.setAttribute("aria-current", String(l.dataset.spy === e.target.id)));
    }}), {{ rootMargin: "-40% 0px -55% 0px" }});
    links.forEach((l) => {{ const t = document.getElementById(l.dataset.spy); if (t) io.observe(t); }});
  }})();
</script>"""
PROBLEM_TEXT = ("Care providers shouldn't operate like this.",
                "Fragmented systems, manual compliance, disconnected workforce data, and spreadsheet-driven reporting have become accepted as normal. Every disconnected workflow creates more administration, more risk, and less time for delivering care.")
SOLUTION_BLOCK = f"""      <div class="{CONTENT}">
        <div class="{HEAD}">
          <h2 class="{T["h2"]} text-heading">Sognos unifies demand, workforce and outcomes on a single operational platform.</h2>
          <p class="{T["lede"]} text-body">Built on Microsoft Dynamics 365 and Copilot, Sognos connects intake, care planning, workforce coordination, compliance and reporting into one continuous workflow.</p>
        </div>
        <ol class="{GAP} grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
{caps_html}
        </ol>
      </div>"""


def problems(variant):
    # Sub-nav sits at the top of the dark band: below the logo strip, above
    # the problem statement. The trust strip and this band share care-dark, so
    # they read as one surface.
    if variant == "a":
        statement = f"""      <div class="mx-auto flex max-w-[770px] flex-col items-center gap-4 text-center">
        {eyebrow("The Problem", "dark")}
        <h2 class="{T["h2"]} text-white">{PROBLEM_TEXT[0]}</h2>
        <p class="{T["lede"]} text-white/75">{PROBLEM_TEXT[1]}</p>
      </div>"""
    else:
        statement = f"""      <div class="{RAIL}">
        <div class="lg:col-span-2">{label("The Problem", "dark", sticky=False)}</div>
        <div class="{CONTENT}">
          <div class="{HEAD}">
            <h2 class="{T["h2"]} text-white">{PROBLEM_TEXT[0]}</h2>
            <p class="{T["lede"]} text-white/75">{PROBLEM_TEXT[1]}</p>
          </div>
        </div>
      </div>"""
    return f"""<section id="problems" class="overflow-clip">
  <div class="bg-navy {SECTION}">
    <div class="mx-auto max-w-7xl px-6">
{statement}
    </div>
  </div>
  <div class="bg-tint {SECTION}">
    <div class="mx-auto max-w-7xl px-6">
      <div class="{RAIL}">
        <div class="lg:col-span-2">{label("The Solution")}</div>
{SOLUTION_BLOCK}
      </div>
    </div>
  </div>
</section>"""


PROB_NOTE = """2026-10-24 pass: sub-nav moved out to a Routable-style bar under the navbar (see index.html); 4 solution steps (5th removed);
all type on the shared scale (label 18px accent, H2 30/36/42 weight 400, lede muted max-w-2xl, step numeral 48px accent, 22px title, 14px body).
Benchmark: AngelList scout-funds "How it works" - hairline border-l columns, md:grid-cols-4, no cards.
Audit: P1 (sub-nav gap), P3 (invisible cards -> hairline columns), P4 (mono numerals), P5 (one-shot motion), P6 + G3 (one label treatment), G2 (one H2 weight).
Maps to: components/layout/sections/sognoscare/Problems.tsx (subNav prop removed from the band)."""
page("03-problems-a.html", "SognosCare 03 - Problems (A: centred statement band, recommended)", "VARIANT A (recommended, Q3): centred dark statement band, solution on the rail.\n" + PROB_NOTE, problems("a"))
page("03-problems-b.html", "SognosCare 03 - Problems (B: both on the rail)", "VARIANT B (Q3): problem statement on the rail too.\n" + PROB_NOTE, problems("b"))

# ── Feature visuals (motion graphics) ─────────────────────────────────────
# After routable.com/product/ap-automation (flat pastel panels, rounded 4px,
# UI fragments composed as an illustration; some animated) and
# helloaria.eu (white UI cards overlapping, one live element each).
# SognosCare: one pastel panel per feature from the documented sector tints
# (rose / mint / ice / cream) + tint; white bordered UI fragments; one motion
# idea per visual, started when the panel scrolls into view, static under
# reduced motion. Content is illustrative demo data.

FV_CSS = """<style>
  .fv { --ease: cubic-bezier(.22,1,.36,1); }
  .fv [data-in] { opacity: 0; transform: translateY(14px); transition: opacity .6s var(--ease), transform .6s var(--ease); }
  .fv.is-in [data-in] { opacity: 1; transform: none; }
  .fv.is-in [data-in="2"] { transition-delay: .12s; } .fv.is-in [data-in="3"] { transition-delay: .24s; } .fv.is-in [data-in="4"] { transition-delay: .36s; }
  .fv .bar { transform: scaleY(0); transform-origin: bottom; transition: transform .9s var(--ease); }
  .fv.is-in .bar { transform: scaleY(1); }
  .fv .spark { stroke-dasharray: 400; stroke-dashoffset: 400; transition: stroke-dashoffset 1.6s var(--ease) .3s; }
  .fv.is-in .spark { stroke-dashoffset: 0; }
  @keyframes fv-dash { to { stroke-dashoffset: -24; } }
  .fv.is-in .flow { stroke-dasharray: 6 6; animation: fv-dash 1s linear infinite; }
  @keyframes fv-pulse { 0%,100% { opacity: .6; transform: scale(1); } 50% { opacity: 0; transform: scale(2.4); } }
  .fv .pulse { animation: fv-pulse 2.4s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) {
    .fv [data-in], .fv .bar { opacity: 1 !important; transform: none !important; transition: none !important; }
    .fv .spark { stroke-dashoffset: 0 !important; transition: none !important; }
    .fv .flow, .fv .pulse { animation: none !important; }
  }
</style>"""

FV_JS = """<script>
  (() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loops = {
      // Case: the active journey stage walks along the track.
      journey(el) { const s = [...el.querySelectorAll("[data-stage]")]; let i = 2; return () => { s.forEach((x, j) => { x.dataset.state = j < i ? "done" : j === i ? "now" : "next"; }); i = (i + 1) % s.length; }; },
      // Compliance: newest audit entry slides in, oldest drops.
      audit(el) { const ul = el.querySelector("ul"); const pool = JSON.parse(ul.dataset.pool); let n = 0; return () => { const [a, b] = pool[n++ % pool.length]; const li = ul.firstElementChild.cloneNode(true); li.querySelector("[data-a]").textContent = a; li.querySelector("[data-b]").textContent = b; li.animate([{ opacity: 0, transform: "translateY(-10px)" }, { opacity: 1, transform: "none" }], { duration: 500, easing: "cubic-bezier(.22,1,.36,1)" }); ul.prepend(li); if (ul.children.length > 4) ul.lastElementChild.remove(); }; },
      // Reporting: KPI counts up once.
      count(el) { el.querySelectorAll("[data-count]").forEach((c) => { const to = +c.dataset.count, suf = c.dataset.suffix || ""; let t0; const step = (t) => { t0 ??= t; const p = Math.min(1, (t - t0) / 1200); c.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString() + suf; if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }); return null; },
      // Automation: run the workflow step by step, hold on the last, restart.
      run(el) { const st = [...el.querySelectorAll("[data-step]")]; const bar = el.querySelector("[data-progress]"); let i = 0; return () => { const k = i % (st.length + 2); st.forEach((x, j) => { x.dataset.state = j < k ? "done" : j === k ? "now" : "next"; }); bar.style.height = `${Math.min(k, st.length - 1) / (st.length - 1) * 100}%`; i++; }; },
      // Copilot: the draft types itself, then repeats.
      type(el) { const t = el.querySelector("[data-type]"); const text = t.dataset.type; let i = 0; return () => { t.textContent = text.slice(0, i); i = i > text.length + 40 ? 0 : i + 1; }; },
    };
    const RATE = { journey: 1500, audit: 2600, type: 45, run: 1200 };
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target; el.classList.add("is-in"); io.unobserve(el);
      const kind = el.dataset.loop; if (!kind) return;
      if (reduce) {
        if (kind === "type") { const t = el.querySelector("[data-type]"); t.textContent = t.dataset.type; }
        if (kind === "run") { el.querySelectorAll("[data-step]").forEach((x) => x.dataset.state = "done"); el.querySelector("[data-progress]").style.height = "100%"; }
        return;
      }
      const fn = loops[kind](el); if (fn) { fn(); setInterval(fn, RATE[kind]); }
    }), { threshold: 0.35 });
    document.querySelectorAll(".fv").forEach((el) => io.observe(el));
  })();
</script>"""

CARD = "rounded-lg border border-line bg-white"


def _panel(bg, loop, body):
    loop_attr = f' data-loop="{loop}"' if loop else ""
    return f"""<div class="fv relative flex min-h-[340px] w-full items-center justify-center overflow-hidden rounded px-5 py-8 sm:p-8 md:min-h-[400px] lg:p-10" style="background:{bg}"{loop_attr}>
              {body}
            </div>"""


STAGES = ["Referral", "Intake", "Assessment", "Goals", "Delivery", "Review"]
FV_CASE = _panel("#f4f8f9", "journey", f"""<div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="{CARD} flex items-center gap-4 p-4">
                  <span class="flex size-11 shrink-0 items-center justify-center rounded-full bg-care-dark text-sm font-medium text-white">MT</span>
                  <div class="min-w-0 flex-1"><p class="text-sm font-medium text-heading">M. Turner</p><p class="text-xs text-muted">Support at Home &middot; Level 3</p></div>
                  <div class="flex -space-x-2">{"".join(f'<span class="flex size-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-medium text-white" style="background:{c}">{i}</span>' for i, c in [("PS", "#3b6fe0"), ("JK", "#00a98f"), ("AL", "#ff7dbc")])}</div>
                </div>
                <div data-in="2" class="{CARD} p-4">
                  <p class="text-xs text-muted">Participant journey</p>
                  <ol class="mt-3 grid grid-cols-6 gap-1.5">
                    {"".join(f'<li data-stage class="group/s flex flex-col gap-2" data-state="{"done" if j < 2 else "now" if j == 2 else "next"}"><span class="h-1.5 rounded-full bg-line transition-colors duration-500 group-data-[state=done]/s:bg-care-dark group-data-[state=now]/s:bg-accent"></span><span class="truncate text-[10px] text-muted transition-colors group-data-[state=now]/s:font-medium group-data-[state=now]/s:text-heading">{st}</span></li>' for j, st in enumerate(STAGES))}
                  </ol>
                </div>
                <div data-in="3" class="{CARD} flex items-center justify-between p-4 text-sm"><span class="text-body">Next review</span><span class="font-medium text-heading">12 Dec &middot; Care plan</span></div>
              </div>""")

DAYS = [("M", 72, 70), ("T", 80, 78), ("W", 64, 52), ("T", 88, 88), ("F", 76, 74), ("S", 40, 40), ("S", 32, 30)]
FV_DELIVERY = _panel("#ebfbe3", None, f"""<div class="relative w-full max-w-md text-left">
                <div data-in="1" class="{CARD} p-5">
                  <div class="flex items-center justify-between"><p class="text-sm font-medium text-heading">Scheduled vs delivered</p><span class="flex items-center gap-3 text-[10px] text-muted"><span class="flex items-center gap-1"><span class="size-2 rounded-sm bg-line"></span>Scheduled</span><span class="flex items-center gap-1"><span class="size-2 rounded-sm bg-care-dark"></span>Delivered</span></span></div>
                  <div class="mt-4 flex h-36 items-end gap-3">
                    {"".join(f'<div class="flex flex-1 flex-col items-center gap-1.5"><div class="relative flex h-full w-full items-end justify-center gap-1"><span class="bar w-1/2 rounded-t-sm bg-line" style="height:{s}%;transition-delay:{i*60}ms"></span><span class="bar w-1/2 rounded-t-sm {"bg-[#ff8e90]" if s - d > 5 else "bg-care-dark"}" style="height:{d}%;transition-delay:{i*60+120}ms"></span></div><span class="text-[10px] text-muted">{day}</span></div>' for i, (day, s, d) in enumerate(DAYS))}
                  </div>
                  <p class="mt-3 flex items-center gap-2 text-xs text-body"><span class="relative flex size-2"><span class="pulse absolute inset-0 rounded-full bg-[#ff8e90]"></span><span class="relative size-2 rounded-full bg-[#ff8e90]"></span></span>Wednesday: 12 visits short &mdash; coordinator notified</p>
                </div>
                <div data-in="3" class="{CARD} absolute -bottom-4 -right-2 w-48 p-3 sm:-right-6">
                  <p class="text-xs text-muted">Field check-in</p>
                  <p class="mt-1 text-sm font-medium text-heading">9:02 am &middot; GPS verified</p>
                  <p class="mt-1 flex items-center gap-1.5 text-xs text-emerald-700"><span aria-hidden="true">&#10003;</span> On time</p>
                </div>
              </div>""")

AUDIT_POOL = [["Care plan v4 approved", "Coordinator &middot; 10:14:02"], ["Funding rule applied", "Support at Home cap &middot; 10:14:09"], ["Incident report filed", "Worker app &middot; 10:15:31"], ["Progress note signed", "P. Shah &middot; 10:16:05"], ["Document versioned", "Service agreement v2 &middot; 10:16:40"]]
import json as _json2
FV_COMPLIANCE = _panel("#f5f6ee", "audit", f"""<div class="relative w-full max-w-md text-left">
                <div data-in="1" class="{CARD} overflow-hidden">
                  <div class="flex items-center justify-between border-b border-line px-4 py-3"><p class="text-sm font-medium text-heading">Audit trail</p><span class="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted">&#128274; Immutable</span></div>
                  <ul data-pool='{_json2.dumps([[a.replace("&middot;", "·"), b.replace("&middot;", "·")] for a, b in AUDIT_POOL])}' class="min-h-[13rem]">
                    {"".join(f'<li class="flex items-center gap-3 border-b border-line px-4 py-3 last:border-b-0"><span class="size-1.5 shrink-0 bg-accent"></span><div class="min-w-0 flex-1"><p data-a class="truncate text-sm text-heading">{a}</p><p data-b class="text-xs tabular-nums text-muted">{b}</p></div></li>' for a, b in AUDIT_POOL[:4])}
                  </ul>
                </div>
                <div data-in="3" class="absolute -right-2 -top-4 flex items-center gap-2 rounded-full bg-care-dark px-4 py-2 text-xs font-medium text-white sm:-right-6">&#10003; Audit-ready</div>
              </div>""")

FV_REPORTING = _panel("#f7edf3", "count", f"""<div class="relative w-full max-w-md space-y-3 text-left">
                <div class="grid grid-cols-3 gap-3">
                  {"".join(f'<div data-in="{k}" class="{CARD} p-3"><p class="text-[10px] text-muted">{lab}</p><p class="mt-1 font-heading text-2xl text-heading" data-count="{n}" data-suffix="{suf}">0{suf}</p></div>' for k, (lab, n, suf) in enumerate([("Participants", 1284, ""), ("Hours delivered", 9640, ""), ("On budget", 96, "%")], 1))}
                </div>
                <div data-in="2" class="{CARD} p-4">
                  <p class="text-xs text-muted">Outcome goals met &middot; last 12 months</p>
                  <svg viewBox="0 0 300 80" class="mt-2 h-20 w-full" fill="none" aria-hidden="true"><path class="spark" d="M0 64 L27 60 L54 62 L81 50 L108 54 L135 42 L162 44 L189 32 L216 36 L243 24 L270 20 L300 12" stroke="#1d96fc" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div data-in="4" class="{CARD} flex items-center gap-3 p-3"><span class="flex size-9 items-center justify-center rounded bg-tint text-xs font-medium text-heading">PDF</span><div class="min-w-0 flex-1"><p class="truncate text-sm text-heading">Monthly funding report</p><p class="text-xs text-muted">Generated from live data &middot; just now</p></div><span class="text-xs text-emerald-700">&#10003;</span></div>
              </div>""")

FV_COPILOT = _panel("#f9fafe", "type", f"""<div class="relative w-full max-w-md text-left">
                <div data-in="1" class="overflow-hidden rounded-lg border border-white/10 bg-care-dark">
                  <div class="flex items-center justify-between border-b border-white/10 px-4 py-3"><p class="text-sm text-white">Progress note &middot; M. Turner</p><span class="text-xs text-white/50">Dynamics 365</span></div>
                  <div class="p-4">
                    <p class="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent"><span aria-hidden="true">&#10022;</span> Copilot draft</p>
                    <p class="mt-3 min-h-[6rem] font-mono text-[13px] leading-relaxed text-white/85"><span data-type="Client settled after morning routine. Assisted with shower and breakfast; medication taken 9:15. Mood bright, mobility steady. No concerns raised."></span><span aria-hidden="true" class="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-accent align-middle"></span></p>
                    <div class="mt-4 flex gap-2"><span class="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-heading">Accept</span><span class="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/80">Edit</span></div>
                  </div>
                </div>
                <div data-in="3" class="{CARD} absolute -bottom-5 -right-2 w-56 p-3 sm:-right-6">
                  <p class="flex items-center gap-2 text-xs font-medium text-heading"><span class="relative flex size-2"><span class="pulse absolute inset-0 rounded-full bg-[#ffad6e]"></span><span class="relative size-2 rounded-full bg-[#ffad6e]"></span></span>Anomaly detected</p>
                  <p class="mt-1 text-xs text-body">3 missed visits for A. Nguyen this week</p>
                </div>
              </div>""")

# Automation: a workflow run. Steps light up in order (done = care-dark,
# running = accent + ping, waiting = white); the connector fills to the
# running step; the run holds on "4", then restarts.
NODES = [("Trigger", "Care plan change"), ("Approval", "Manager approval"), ("Microsoft Teams", "Notify team"), ("Teams &middot; Care coordination", "Care plan v4 for M. Turner approved &mdash; roster updated.")]
FV_AUTOMATION = _panel("#ebfbe3", "run", f"""<div class="relative w-full max-w-md text-left">
                <div aria-hidden="true" class="absolute bottom-[3.25rem] left-[21px] top-[2.75rem] w-0.5 border-l-2 border-dashed border-accent/40">
                  <div data-progress class="absolute -left-0.5 top-0 w-0.5 bg-accent transition-[height] duration-700 ease-out" style="height:0%"></div>
                </div>
                <ol class="relative space-y-4">
                  {"".join(f'<li data-in="{min(k, 4)}" data-step data-state="next" class="group/st flex items-center gap-4"><span class="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-white text-xs font-medium text-heading transition-colors duration-300 group-data-[state=done]/st:border-care-dark group-data-[state=done]/st:bg-care-dark group-data-[state=done]/st:text-white group-data-[state=now]/st:border-accent group-data-[state=now]/st:bg-accent group-data-[state=now]/st:text-white"><span class="pulse absolute inset-0 hidden rounded-full bg-accent group-data-[state=now]/st:block"></span><span class="relative">{k}</span></span><div class="flex-1 rounded-lg border border-line bg-white p-3 transition-colors duration-300 group-data-[state=now]/st:border-accent"><p class="text-[10px] uppercase tracking-widest text-muted">{tag}</p><p class="mt-0.5 text-sm font-medium text-heading">{name}</p></div></li>' for k, (tag, name) in enumerate(NODES, 1))}
                </ol>
              </div>""")

FEATURE_VIS = [
    v.replace('class="fv relative', f'data-fv="{i}" class="fv relative', 1)
    for i, v in enumerate([FV_CASE, FV_DELIVERY, FV_COMPLIANCE, FV_REPORTING, FV_COPILOT, FV_AUTOMATION])
]

# Panel palette options, in feature order (Case, Delivery, Compliance,
# Reporting, Copilot, Automation). Values are existing colours or mixes of
# them - no new hues.
def _mix(hex_, pct):
    return f"color-mix(in srgb, {hex_} {pct}%, white)"
FV_PALETTES = {
    "a": ("Sector pastels (current)", "Documented sector tints - ice, mint, cream, rose + brand tint.", ["#f4f8f9", "#ebfbe3", "#f5f6ee", "#f7edf3", "#f9fafe", "#ebfbe3"]),
    "b": ("Brand tint", "One surface for all six - calmest; lets the cards carry the colour.", ["#f9fafe"] * 6),
    "c": ("Care blues (chosen)", "Light mixes of the Care base #3b6fe0 (8% / 14%), alternating - on-brand for the product.", [_mix("#3b6fe0", 8), _mix("#3b6fe0", 14)] * 3),
    "d": ("Care navy", "Care-dark / navy panels, white cards - highest contrast, Routable dark-section feel.", ["#0f1936", "#152248"] * 3),
    "e": ("Edition tints", "18% of each SognosCare edition colour - ties features to the six editions.", [_mix(c, 18) for c in ["#00a98f", "#ffad6e", "#cbdd61", "#ff8e90", "#caa4ff", "#ff7dbc"]]),
    "f": ("Outlined white", "White panels with a hairline border - lightest; relies on the alternating card surfaces.", ["#ffffff"] * 6),
}
# Chosen 2026-10-24: palette C (Care blues) is the default panel colour.
FV_DEFAULT = "c"
import re as _re
FEATURE_VIS = [
    _re.sub(r'style="background:[^"]*"', f'style="background:{FV_PALETTES[FV_DEFAULT][2][i]}"', v, count=1)
    for i, v in enumerate(FEATURE_VIS)
]


# ── 04 Features ────────────────────────────────────────────────────────────
FEATS = [
    ("case-management", "Case Management", "Full lifecycle, one place", "Manage every stage of a participant's journey - from initial referral and intake through assessment, goal setting, service delivery, review, and case closure. Every touchpoint recorded, every team member aligned."),
    ("service-delivery", "Service Delivery Tracking", "Real-time visibility", "Know exactly what services were scheduled, what was delivered, and what was missed - in real time. Field workers record visits on mobile, coordinators see variance instantly, and nothing falls through the gaps."),
    ("compliance", "Compliance & Audit Trail", "Audit-ready by default", "Every action timestamped. Every document versioned. Every funding rule enforced at the point of care, not retrospectively. SognosCare treats compliance as infrastructure - not a reporting exercise."),
    ("reporting", "Reporting & Analytics", "Generated, not assembled", "Funding-body reports, operational dashboards, and participant outcome summaries generated automatically from live data. No more month-end spreadsheet marathons."),
    ("copilot", "Microsoft Copilot AI", "AI where staff already work", "AI-assisted documentation, anomaly detection, and operational insights - surfaced inside Dynamics 365, not in a separate tool. Staff don't change their workflow to access AI."),
    ("automation", "Power Platform Automation", "Workflows your way", "Configurable low-code automation for approvals, escalations, and notifications - built to match your organisation's specific processes without requiring a developer."),
]
# Rail items never wrap: whitespace-nowrap at 14px. The longest label
# ("Power Platform Automation") runs ~5px into the 32px column gap at 1280px.
rail = "\n            ".join(
    f'<li><a href="#{fid}" {"aria-current=\"true\" " if i == 0 else ""}class="group flex min-h-10 items-center gap-2.5 whitespace-nowrap py-2 {T["small"]} font-medium {"text-accent" if i == 0 else "text-muted hover:text-heading"} focus-visible:outline-2 focus-visible:outline-accent"><span aria-hidden="true" class="size-2 shrink-0 rounded-full {"bg-accent" if i == 0 else "bg-line group-hover:bg-muted"}"></span>{name}</a></li>'
    for i, (fid, name, *_rest) in enumerate(FEATS)
)
# Feature card (after the earlier site build): tint surface alternating full /
# half opacity, no border; text 6 cols - heading block top, description
# bottom-aligned; visual 6 cols. Rail spans 3 cols here (long item names); cards fill the content column.
cards = "\n".join(
    f"""          <article id="{fid}" data-card-i="{i}" class="grid scroll-mt-36 grid-cols-1 gap-8 rounded-lg p-6 md:grid-cols-12 md:gap-8 md:p-8 lg:p-10 {"bg-tint" if i % 2 == 0 else "bg-tint/50"}">
            <div class="flex flex-col justify-between gap-8 md:col-span-6">
              <div class="flex flex-col gap-2">
                <p class="{T["small"]} font-medium text-accent-strong">{tag}</p>
                <h3 class="{T["h3"]} text-heading text-balance">{name}</h3>
              </div>
              <p class="max-w-[46ch] border-l-2 border-accent pl-4 text-base leading-[1.65] text-body text-pretty">{desc}</p>
            </div>
            <div class="md:col-span-6">{FEATURE_VIS[i]}</div>
          </article>"""
    for i, (fid, name, tag, desc) in enumerate(FEATS)
)
FEATURES = FV_CSS + f"""<section id="features" class="bg-white {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="hidden lg:col-span-3 lg:block">
        <div class="sticky top-36">
          {label("Features", sticky=False)}
          <ul class="mt-6 space-y-1">
            {rail}
          </ul>
        </div>
      </div>
      <div class="min-w-0 lg:col-[4/-1]">
        <div class="lg:hidden">{label("Features", sticky=False)}</div>
        <div class="{HEAD} mt-6 lg:mt-0">
          <h2 class="{T["h2"]} text-heading">Everything a care operation needs</h2>
        </div>
        <div class="{GAP} space-y-4 lg:space-y-6">
{cards}
        </div>
      </div>
    </div>
  </div>
</section>""" + FV_JS
# ── SognosRoster + Solutions/Frontline: hero options + capability visuals ──
# Same system as the SognosCare visuals: Aria-style hero stage (photo or
# product frame + overlapping HTML cards + drifting gradient tile) and
# Routable-style capability panels (product-tinted, white UI fragments, one
# motion idea each). Roster uses its own tokens (#59bbf7 / #1d96fc / #104b90 /
# #03112f); Frontline is a solution - no product colour - so brand accent +
# navy. Copy is the live page copy; card data is illustrative.

RB, RD, RX, RN = "#59bbf7", "#1d96fc", "#104b90", "#03112f"
IMG_FM = f"{P}/images/industries/facilities-management.webp"
IMG_IS = f"{P}/images/industries/industrial-services.webp"
AV = {"PS": f"{P}/images/avatar-priya-real.png", "JK": f"{P}/images/avatar-james-real.png", "EL": f"{P}/images/avatar-emma-real.png"}

XTRA_CSS = """<style>
  @keyframes x-move-a { 0% { transform: translate(0,0); } 50% { transform: translate(46px,-28px); } 100% { transform: translate(0,0); } }
  @keyframes x-move-b { 0% { transform: translate(0,0); } 50% { transform: translate(-38px,22px); } 100% { transform: translate(0,0); } }
  @keyframes x-move-c { 0% { transform: translate(0,0); } 50% { transform: translate(30px,34px); } 100% { transform: translate(0,0); } }
  .fv.is-in .x-a { animation: x-move-a 7s ease-in-out infinite; } .fv.is-in .x-b { animation: x-move-b 8s ease-in-out infinite; } .fv.is-in .x-c { animation: x-move-c 9s ease-in-out infinite; }
  .hero-stage .x-a { animation: x-move-a 7s ease-in-out infinite; } .hero-stage .x-b { animation: x-move-b 8s ease-in-out infinite; } .hero-stage .x-c { animation: x-move-c 9s ease-in-out infinite; }
  .fv .route { stroke-dasharray: 600; stroke-dashoffset: 600; transition: stroke-dashoffset 2.2s cubic-bezier(.22,1,.36,1) .3s; }
  .fv.is-in .route { stroke-dashoffset: 0; }
  @keyframes x-ring { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 170; } }
  .fv.is-in .sla-ring { animation: x-ring 14s linear infinite; }
  .fv .slot { opacity: 0; transform: scale(.92); transition: opacity .45s, transform .45s cubic-bezier(.22,1,.36,1); }
  .fv.is-in .slot, .hero-stage .slot { opacity: 1; transform: none; }
  @media (prefers-reduced-motion: reduce) {
    .x-a, .x-b, .x-c, .sla-ring { animation: none !important; }
    .fv .route { stroke-dashoffset: 0 !important; transition: none !important; }
    .fv .slot { opacity: 1 !important; transform: none !important; transition: none !important; }
  }
</style>"""


def _avatar(k, size="size-8"):
    return f'<img src="{AV[k]}" alt="" class="{size} shrink-0 rounded-full object-cover" />'


def _steps(items, tick="&#10003;"):
    # Reuses the "run" loop: rows light up in order (now = accent, done = check).
    return "".join(
        f'<li data-step data-state="next" class="group/st flex items-center justify-between gap-3 py-2 text-sm"><span class="text-body">{a}</span>'
        f'<span class="flex size-6 items-center justify-center rounded-full border border-line text-[11px] text-transparent transition-colors duration-300 group-data-[state=done]/st:border-emerald-600 group-data-[state=done]/st:bg-emerald-600 group-data-[state=done]/st:text-white group-data-[state=now]/st:border-accent">{tick}</span></li>'
        for a in items
    )


# progress bar the "run" loop expects (hidden when not drawn)
_HIDDEN_PROGRESS = '<div data-progress class="hidden" style="height:0%"></div>'


def _rpanel(i, loop, body):
    # Roster panels alternate 10% / 16% of the Roster base.
    return _panel(_mix(RB, 12 if i % 2 == 0 else 20), loop, body)


def _fpanel(i, loop, body):
    # Frontline panels: brand tint / 8% accent alternating.
    return _panel("#f9fafe" if i % 2 == 0 else _mix("#1d96fc", 8), loop, body)


# ── SognosRoster feature visuals ────────────────────────────────────────────
DAYS5 = ["Mon", "Tue", "Wed", "Thu", "Fri"]
SHIFTS = [(0, 0, "PS"), (0, 2, "JK"), (1, 1, "EL"), (1, 3, "PS"), (2, 0, "JK"), (2, 4, "EL"), (3, 2, "PS"), (3, 3, "JK"), (4, 1, "EL"), (4, 4, "PS")]
R_SCHED = _rpanel(0, None, f"""<div data-in="1" class="w-full max-w-md rounded-lg border border-line bg-white p-4 text-left">
                <div class="flex items-center justify-between"><p class="text-sm font-medium text-heading">Week 46 roster</p><span class="rounded-full px-2.5 py-1 text-[10px] font-medium text-white" style="background:{RD}">Auto-generated</span></div>
                <div class="mt-3 grid grid-cols-5 gap-1.5 text-center text-[10px] text-muted">{"".join(f"<span>{d}</span>" for d in DAYS5)}</div>
                <div class="mt-1.5 grid grid-cols-5 grid-rows-5 gap-1.5">
                  {"".join(f'<span class="slot flex h-8 items-center justify-center rounded border border-line" style="grid-column:{c + 1};grid-row:{r + 1};transition-delay:{(c * 5 + r) * 70}ms;background:{_mix(RB, 18)}">{_avatar(w, "size-6")}</span>' for c, r, w in SHIFTS)}
                </div>
                <p class="mt-3 text-xs text-body">142 shifts filled from confirmed demand &middot; 0 conflicts</p>
              </div>""")

R_MATCH = _rpanel(1, "run", f"""<div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="flex items-center gap-3 rounded-lg border border-line bg-white p-4">{_avatar("PS", "size-11")}<div class="flex-1"><p class="text-sm font-medium text-heading">P. Shah</p><p class="text-xs text-muted">Support worker &middot; 4.2 km away</p></div><span class="text-xs font-medium" style="color:{RX}">98% match</span></div>
                <div data-in="2" class="rounded-lg border border-line bg-white px-4 py-2">{_HIDDEN_PROGRESS}<ul class="divide-y divide-line">{_steps(["Manual handling certificate", "First aid &middot; current", "Client prefers female worker", "Available 9:00 - 11:00"])}</ul></div>
              </div>""")

R_ROUTE = _rpanel(2, None, f"""<div data-in="1" class="relative w-full max-w-md overflow-hidden rounded-lg border border-line bg-white text-left">
                <svg viewBox="0 0 400 220" class="block h-auto w-full" aria-hidden="true">
                  <rect width="400" height="220" fill="#f9fafe"/>
                  {"".join(f'<path d="{d}" stroke="#e2e8f0" stroke-width="10" fill="none" stroke-linecap="round"/>' for d in ["M-10 60 H410", "M-10 150 H410", "M90 -10 V230", "M260 -10 V230", "M-10 210 L410 20"])}
                  <path class="route" d="M50 180 L90 150 L180 150 L260 110 L260 60 L340 60" stroke="{RD}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                  {"".join(f'<g><circle cx="{x}" cy="{y}" r="11" fill="{RX}"/><text x="{x}" y="{y + 4}" text-anchor="middle" font-size="11" fill="#fff" font-family="sans-serif">{n}</text></g>' for n, (x, y) in enumerate([(50, 180), (180, 150), (260, 110), (340, 60)], 1))}
                </svg>
                <div class="flex items-center justify-between border-t border-line px-4 py-3 text-sm"><span class="text-body">4 visits &middot; optimised order</span><span class="font-medium text-emerald-700">&minus;38 min travel</span></div>
              </div>""")

R_ADJUST = _rpanel(3, "run", f"""<div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="flex items-center gap-3 rounded-lg border border-line bg-white p-4"><span class="relative flex size-2.5"><span class="pulse absolute inset-0 rounded-full bg-[#ff8e90]"></span><span class="relative size-2.5 rounded-full bg-[#ff8e90]"></span></span><div class="flex-1"><p class="text-sm font-medium text-heading">J. Kelly called in sick</p><p class="text-xs text-muted">3 visits uncovered &middot; 7:42 am</p></div></div>
                <div data-in="2" class="rounded-lg border border-line bg-white px-4 py-2">{_HIDDEN_PROGRESS}<p class="pt-1 text-xs text-muted">Replacements ranked by proximity + skills</p><ul class="divide-y divide-line">{_steps(["E. Lane &middot; 2.1 km &middot; reassigned", "P. Shah &middot; 3.4 km &middot; reassigned", "Client + workers notified"])}</ul></div>
              </div>""")

R_MOBILE = _rpanel(4, "run", f"""<div data-in="1" class="w-56 rounded-[28px] border-[6px] border-care-dark bg-white p-3 text-left">
                <div class="mx-auto mb-3 h-1.5 w-16 rounded-full bg-line"></div>
                <p class="text-[10px] uppercase tracking-widest text-muted">Next shift</p>
                <p class="mt-1 text-sm font-medium text-heading">9:00 &middot; Personal care</p>
                <p class="text-xs text-muted">14 Elm St, Parramatta</p>
                {_HIDDEN_PROGRESS}<ul class="mt-2 divide-y divide-line">{_steps(["Shift accepted", "Checked in &middot; GPS", "Notes + signature"])}</ul>
                <p class="mt-3 rounded-full py-2 text-center text-xs font-medium text-white" style="background:{RD}">Start visit</p>
              </div>""")

R_COPILOT = _rpanel(5, "type", f"""<div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="rounded-lg border border-line bg-white p-4"><p class="text-xs text-muted">Demand vs capacity &middot; next 14 days</p>
                  <div class="mt-3 flex h-20 items-end gap-1">{"".join(f'<span class="bar flex-1 rounded-t-sm" style="height:{h}%;background:{RX if h > 80 else _mix(RB, 45)};transition-delay:{k * 40}ms"></span>' for k, h in enumerate([52, 58, 61, 66, 72, 84, 92, 88, 70, 64, 60, 58, 55, 50]))}</div></div>
                <div data-in="2" class="rounded-lg border border-white/10 bg-care-dark p-4"><p class="flex items-center gap-2 text-xs font-medium uppercase tracking-widest" style="color:{RB}"><span aria-hidden="true">&#10022;</span> Copilot suggestion</p><p class="mt-2 min-h-[3.5rem] font-mono text-[13px] leading-relaxed text-white/85"><span data-type="Demand peaks Thu-Sat. Offer 6 extra shifts to casual pool and pull 2 workers forward from the southern region."></span><span aria-hidden="true" class="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 align-middle" style="background:{RB}"></span></p></div>
              </div>""")

ROSTER_FV = [("Intelligent Scheduling", R_SCHED), ("Skills &amp; Compliance Matching", R_MATCH), ("Route Optimisation", R_ROUTE), ("Real-Time Adjustments", R_ADJUST), ("Mobile Worker App", R_MOBILE), ("Copilot AI Optimisation", R_COPILOT)]

# ── Frontline capability cards (compact: visual + title + body) ─────────────
F_DISPATCH = _fpanel(0, "run", f"""<div class="w-full max-w-sm space-y-2 text-left">
                <div data-in="1" class="rounded-lg border border-line bg-white p-3"><p class="text-[10px] uppercase tracking-widest text-muted">Job #4821 &middot; HVAC fault</p><p class="mt-0.5 text-sm font-medium text-heading">Level 3, North Sydney</p></div>
                <div data-in="2" class="rounded-lg border border-line bg-white px-3 py-1">{_HIDDEN_PROGRESS}<ul class="divide-y divide-line">{_steps(["Skills: HVAC licence", "Nearest: 1.8 km", "Assigned: J. Kelly"])}</ul></div>
              </div>""")

F_SLA = _fpanel(1, None, f"""<div data-in="1" class="flex w-full max-w-sm items-center gap-4 rounded-lg border border-line bg-white p-4 text-left">
                <svg viewBox="0 0 64 64" class="size-16 shrink-0 -rotate-90" aria-hidden="true"><circle cx="32" cy="32" r="27" fill="none" stroke="#e2e8f0" stroke-width="6"/><circle class="sla-ring" cx="32" cy="32" r="27" fill="none" stroke="#1d96fc" stroke-width="6" stroke-linecap="round" stroke-dasharray="170"/></svg>
                <div class="min-w-0"><p class="text-sm font-medium text-heading">Response SLA &middot; 4h</p><p class="text-xs text-muted">2h 14m remaining</p><p class="mt-2 flex items-center gap-1.5 text-xs text-body"><span class="relative flex size-2"><span class="pulse absolute inset-0 rounded-full bg-[#ffad6e]"></span><span class="relative size-2 rounded-full bg-[#ffad6e]"></span></span>Alert at 30 min</p></div>
              </div>""")

F_LIVE = _fpanel(2, None, f"""<div data-in="1" class="relative w-full max-w-sm overflow-hidden rounded-lg border border-line bg-white">
                <svg viewBox="0 0 320 170" class="block h-auto w-full" aria-hidden="true"><rect width="320" height="170" fill="#f9fafe"/>{"".join(f'<path d="{d}" stroke="#e2e8f0" stroke-width="8" fill="none"/>' for d in ["M-10 50 H330", "M-10 120 H330", "M80 -10 V180", "M220 -10 V180"])}</svg>
                {"".join(f'<span class="{c} absolute flex size-7 items-center justify-center rounded-full border-2 border-white text-[9px] font-medium text-white" style="left:{x}%;top:{y}%;background:{bg}">{t}</span>' for c, x, y, t, bg in [("x-a", 18, 20, "PS", "#1d96fc"), ("x-b", 62, 58, "JK", "#0f1936"), ("x-c", 40, 64, "EL", "#00a98f")])}
                {"".join(f'<span class="absolute size-3 rotate-45 rounded-sm border-2 border-white" style="left:{x}%;top:{y}%;background:#ff8e90"></span>' for x, y in [(70, 22), (28, 70), (86, 72)])}
                <div class="flex justify-between border-t border-line px-3 py-2 text-xs"><span class="text-body">12 workers &middot; 31 jobs</span><span class="text-emerald-700">All on track</span></div>
              </div>""")

F_MOBILE = _fpanel(3, "run", f"""<div data-in="1" class="w-48 rounded-[24px] border-[5px] border-care-dark bg-white p-3 text-left">
                <div class="mx-auto mb-2 h-1 w-12 rounded-full bg-line"></div>
                <p class="text-xs font-medium text-heading">Job #4821</p><p class="text-[10px] text-muted">HVAC fault &middot; Level 3</p>
                {_HIDDEN_PROGRESS}<ul class="mt-1 divide-y divide-line">{_steps(["On site", "Photos", "Sign-off"])}</ul>
              </div>""")

F_ASSET = _fpanel(4, None, f"""<div class="relative flex w-full max-w-sm items-center gap-3 text-left">
                <div data-in="1" class="flex-1 rounded-lg border border-line bg-white p-3"><p class="text-[10px] uppercase tracking-widest text-muted">Job</p><p class="text-sm font-medium text-heading">Chiller service</p></div>
                <svg aria-hidden="true" viewBox="0 0 40 60" class="h-16 w-8 shrink-0"><path class="flow" d="M0 30 H40 M20 30 V8 H40 M20 30 V52 H40" stroke="#1d96fc" stroke-width="2" fill="none"/></svg>
                <ul class="flex flex-1 flex-col gap-2">{"".join(f'<li data-in="{k}" class="rounded-lg border border-line bg-white px-3 py-2 text-xs text-heading">{a}</li>' for k, a in enumerate(["Chiller CH-02", "Service manual", "Part 7741-B"], 2))}</ul>
              </div>""")

F_REPORT = _fpanel(5, "count", f"""<div class="w-full max-w-sm space-y-2 text-left">
                <div class="grid grid-cols-2 gap-2">{"".join(f'<div data-in="{k}" class="rounded-lg border border-line bg-white p-3"><p class="text-[10px] text-muted">{lab}</p><p class="mt-1 font-heading text-xl text-heading" data-count="{n}" data-suffix="{suf}">0{suf}</p></div>' for k, (lab, n, suf) in enumerate([("First-time fix", 91, "%"), ("Jobs this month", 1640, "")], 1))}</div>
                <div data-in="3" class="rounded-lg border border-line bg-white p-3"><div class="flex h-16 items-end gap-1.5">{"".join(f'<span class="bar flex-1 rounded-t-sm bg-care-dark" style="height:{h}%;transition-delay:{k * 60}ms"></span>' for k, h in enumerate([40, 55, 48, 66, 72, 61, 80, 86]))}</div><p class="mt-2 text-[10px] text-muted">Completed jobs by region</p></div>
              </div>""")

FRONTLINE_CAPS = [
    ("Intelligent job dispatch", "Automatically match jobs to the right field worker based on skills, location, and availability.", F_DISPATCH),
    ("SLA tracking and alerts", "Monitor response and resolution times in real time. Get alerted before a breach occurs.", F_SLA),
    ("Live field visibility", "See every job, every worker, and every status update on a single operations dashboard.", F_LIVE),
    ("Mobile worker app", "Field workers receive job details, capture attendance, and submit completion data from their phone.", F_MOBILE),
    ("Asset and equipment linking", "Attach assets to jobs so field workers arrive with the right information and tools.", F_ASSET),
    ("Operational reporting", "Understand performance across teams, regions, and job types with configurable reports.", F_REPORT),
]


def capability_card(title, body, vis):
    # Compact card: shorter panel on top, title + body underneath.
    vis = vis.replace("min-h-[340px]", "min-h-[240px]").replace("md:min-h-[400px]", "md:min-h-[260px]")
    return f"""<article class="flex flex-col gap-5 rounded-lg bg-tint p-3">
            {vis}
            <div class="px-3 pb-3"><h3 class="{T["h3sm"]} text-heading">{title}</h3><p class="mt-2 {T["small"]} text-body">{body}</p></div>
          </article>"""


# ── Hero options ────────────────────────────────────────────────────────────
def _hero(eyebrow_txt, lines, sub, stage, glow, base):
    h1 = "".join(f'<span class="block">{l}</span>' for l in lines)
    return f"""<section class="relative overflow-hidden pt-24 pb-16 text-white md:pb-24" style="background:{glow}, {base}">
  <div class="relative mx-auto max-w-7xl space-y-10 px-6 md:space-y-16">
    <div class="mx-auto flex max-w-3xl flex-col items-center text-center">
      {eyebrow(eyebrow_txt, "dark")}
      <h1 class="mt-4 font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-white text-balance sm:text-5xl md:text-6xl">{h1}</h1>
      <p class="mt-4 max-w-[35rem] text-lg leading-relaxed text-white/80 text-pretty md:mt-5">{sub}</p>
      <div class="mt-6 flex flex-col items-center gap-4 sm:flex-row md:mt-8">{HERO_CTAS}</div>
    </div>
    <div class="hero-stage relative mx-auto aspect-[1280/1284] w-full max-w-[1280px] sm:aspect-[1280/723]">
      {stage}
    </div>
  </div>
</section>"""


def _grad_tile(c1, c2, c3):
    return f"""<div aria-hidden="true" data-speed="-0.6" class="absolute left-0 top-0 z-0 aspect-[209/180] w-[30%] sm:left-[5%] sm:w-[16.3%]"><div class="m-rise size-full" style="animation-delay:.1s"><div class="m-drift size-full rounded" style="background-image: linear-gradient(135deg, {c1}, {c2}, {c3}, {c1})"></div></div></div>"""


def _photo(src, alt):
    return f"""<div class="absolute inset-x-0 top-[5%] z-10 flex justify-center"><div class="m-rise aspect-[1062/672] w-full max-w-[82.969%] overflow-hidden rounded bg-white/5" style="animation-delay:.2s"><img src="{src}" alt="{alt}" class="size-full object-cover" /></div></div>"""


def _float_card(pos, speed, delay, inner, dark=False):
    surface = "border-white/10 bg-care-dark" if dark else "border-line bg-white"
    return f"""<div data-speed="{speed}" class="absolute z-20 {pos}"><div class="m-rise" style="animation-delay:{delay}s"><div class="m-float overflow-hidden rounded-lg border {surface} text-left">{inner}</div></div></div>"""


R_HERO_SUB = "Allocate the right people, at the right time, to the right services - automatically. Putting real-time optimisation in the hands of your operations team."
R_GLOW = f"radial-gradient(70% 60% at 20% 30%, {_mix(RD, 40).replace('white', 'transparent')}, transparent 70%), radial-gradient(60% 50% at 85% 70%, color-mix(in srgb, {RX} 70%, transparent), transparent 70%)"
ROSTER_HERO_A = _hero("SognosRoster", ["The right worker", "for every job"], R_HERO_SUB,
    _grad_tile(RB, RD, RX) + _photo(IMG_FM, "Facilities technician on site")
    + _float_card("right-0 top-[15%] hidden w-[290px] sm:block", "0.5", ".5", f"""<div class="p-4"><p class="font-heading text-lg text-heading">Shift matched</p><div class="mt-3 flex items-center gap-3">{_avatar("PS", "size-10")}<div class="flex-1"><p class="text-sm font-medium text-heading">P. Shah</p><p class="text-xs text-muted">Skills &#10003; &middot; Certs &#10003; &middot; 4.2 km</p></div></div><p class="mt-3 rounded-full py-2.5 text-center text-sm font-medium text-white" style="background:{RD}">Confirmed &middot; 9:00 am</p></div>""")
    + _float_card("bottom-[5%] left-0 w-[290px] sm:w-[320px]", "0.9", ".7", f"""<div class="p-4"><p class="text-xs text-white/60">Today &middot; Northern region</p><div class="mt-3 grid grid-cols-3 gap-2">{"".join(f'<div class="rounded border border-white/10 p-2"><p class="text-[10px] text-white/60">{k}</p><p class="font-heading text-xl text-white">{v}</p></div>' for k, v in [("Shifts", "142"), ("Filled", "100%"), ("Travel", "-18%")])}</div></div>""", dark=True),
    R_GLOW, RN)

ROSTER_HERO_B = _hero("SognosRoster", ["The right worker", "for every job"], R_HERO_SUB,
    _grad_tile(RB, RD, RX)
    + f"""<div class="absolute inset-x-0 top-[5%] z-10 flex justify-center"><div class="m-rise flex aspect-[1062/672] w-full max-w-[82.969%] overflow-hidden rounded border border-white/10 bg-white p-4 text-left sm:p-6" style="animation-delay:.2s">
        <div class="flex w-full flex-col"><div class="flex items-center justify-between"><p class="font-heading text-lg text-heading sm:text-xl">Live schedule &middot; Tuesday</p><span class="rounded-full px-3 py-1 text-xs text-white" style="background:{RD}">Optimised 2 min ago</span></div>
        <div class="mt-4 grid flex-1 grid-cols-[5rem_1fr] gap-x-3 gap-y-2 text-xs">{"".join(f'<span class="flex items-center gap-2 text-heading">{_avatar(w, "size-6")}{w}</span><div class="relative rounded bg-tint">' + "".join(f'<span class="slot absolute inset-y-1 rounded text-[10px] text-white" style="left:{a}%;width:{b}%;background:{c};transition-delay:{(r * 3 + n) * 90}ms"></span>' for n, (a, b, c) in enumerate(segs)) + '</div>' for r, (w, segs) in enumerate([("PS", [(2, 22, RD), (30, 18, RX), (56, 30, RD)]), ("JK", [(8, 26, RX), (40, 22, RD), (70, 20, RX)]), ("EL", [(0, 18, RD), (24, 30, RX), (62, 24, RD)])]))}</div></div>
      </div></div>"""
    + _float_card("right-0 top-[12%] hidden w-[280px] sm:block", "0.5", ".5", f"""<div class="flex items-center gap-3 p-4"><span class="relative flex size-2.5"><span class="m-pulse absolute inset-0 rounded-full bg-[#ff8e90]"></span><span class="relative size-2.5 rounded-full bg-[#ff8e90]"></span></span><div><p class="text-sm font-medium text-heading">J. Kelly unavailable</p><p class="text-xs text-muted">3 visits reassigned in 40s</p></div></div>""")
    + _float_card("bottom-[4%] left-0 w-[300px]", "0.9", ".7", f"""<div class="p-4"><p class="flex items-center gap-2 text-xs font-medium uppercase tracking-widest" style="color:{RB}"><span aria-hidden="true">&#10022;</span> Copilot</p><p class="mt-2 min-h-[3rem] font-mono text-[13px] leading-relaxed text-white/85"><span data-type="Thursday demand +22%. Offer 6 extra shifts to the casual pool?"></span></p></div>""", dark=True),
    R_GLOW, RN)

F_HERO_SUB = "Coordinate mobile teams, manage visits and appointments, and keep every service connected from the field to the office."
F_GLOW = "radial-gradient(70% 60% at 20% 30%, color-mix(in srgb, #1d96fc 30%, transparent), transparent 70%), radial-gradient(60% 50% at 85% 70%, color-mix(in srgb, #3b6fe0 35%, transparent), transparent 70%)"
FRONTLINE_HERO_A = _hero("Frontline", ["Coordinate field teams", "without the chaos"], F_HERO_SUB,
    _grad_tile("#59bbf7", "#1d96fc", "#3b6fe0") + _photo(IMG_IS, "Field engineer at an industrial site")
    + _float_card("right-0 top-[15%] hidden w-[290px] sm:block", "0.5", ".5", f"""<div class="p-4"><div class="flex items-center justify-between"><p class="font-heading text-lg text-heading">Job dispatched</p><span class="text-xs text-muted">#4821</span></div><dl class="mt-3 divide-y divide-line text-sm"><div class="flex justify-between py-2"><dt class="text-muted">Engineer</dt><dd class="text-heading">J. Kelly</dd></div><div class="flex justify-between py-2"><dt class="text-muted">ETA</dt><dd class="text-heading">22 min</dd></div><div class="flex justify-between py-2"><dt class="text-muted">SLA</dt><dd class="font-medium text-emerald-700">On track</dd></div></dl></div>""")
    + _float_card("bottom-[5%] left-0 w-[290px] sm:w-[320px]", "0.9", ".7", f"""<div class="p-4"><p class="text-xs text-white/60">Live field status</p><ul class="mt-2 space-y-2 text-sm">{"".join(f'<li class="flex items-center justify-between"><span class="text-white/85">{a}</span><span class="rounded-full px-2 py-0.5 text-[10px] {c}">{b}</span></li>' for a, b, c in [("Chiller service", "On site", "bg-emerald-400/20 text-emerald-300"), ("HVAC fault", "En route", "bg-sky-400/20 text-sky-300"), ("Lift inspection", "Queued", "bg-white/10 text-white/70")])}</ul></div>""", dark=True),
    F_GLOW, "#0f1936")

FRONTLINE_HERO_B = _hero("Frontline", ["Coordinate field teams", "without the chaos"], F_HERO_SUB,
    _grad_tile("#59bbf7", "#1d96fc", "#3b6fe0")
    + f"""<div class="absolute inset-x-0 top-[5%] z-10 flex justify-center"><div class="m-rise relative aspect-[1062/672] w-full max-w-[82.969%] overflow-hidden rounded border border-white/10 bg-white" style="animation-delay:.2s">
        <svg viewBox="0 0 1062 672" class="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="1062" height="672" fill="#f9fafe"/>{"".join(f'<path d="{d}" stroke="#e2e8f0" stroke-width="18" fill="none"/>' for d in ["M-20 160 H1080", "M-20 430 H1080", "M260 -20 V700", "M700 -20 V700", "M-20 640 L1080 40"])}</svg>
        {"".join(f'<span class="{c} absolute flex size-9 items-center justify-center rounded-full border-2 border-white text-[10px] font-medium text-white" style="left:{x}%;top:{y}%;background:{bg}">{t}</span>' for c, x, y, t, bg in [("x-a", 20, 18, "PS", "#1d96fc"), ("x-b", 60, 55, "JK", "#0f1936"), ("x-c", 38, 62, "EL", "#00a98f"), ("x-a", 78, 30, "AN", "#3b6fe0")])}
        {"".join(f'<span class="absolute size-4 rotate-45 rounded-sm border-2 border-white" style="left:{x}%;top:{y}%;background:#ff8e90"></span>' for x, y in [(70, 20), (28, 72), (88, 68), (48, 34)])}
        <div class="absolute left-4 top-4 rounded-lg border border-line bg-white px-4 py-3 text-left text-sm"><p class="font-heading text-heading">Operations &middot; Live</p><p class="text-xs text-muted">12 workers &middot; 31 jobs</p></div>
      </div></div>"""
    + _float_card("right-0 top-[12%] hidden w-[280px] sm:block", "0.5", ".5", """<div class="p-4"><p class="text-sm font-medium text-heading">SLA alert</p><p class="mt-1 text-xs text-muted">Job #4790 &middot; 28 min to breach</p><p class="mt-3 rounded-full bg-care-dark py-2 text-center text-xs font-medium text-white">Reassign nearest</p></div>""")
    + _float_card("bottom-[4%] left-0 w-[300px]", "0.9", ".7", """<div class="p-4"><p class="text-xs text-white/60">Completed today</p><p class="mt-1 font-heading text-3xl text-white">86</p><p class="text-xs text-emerald-300">First-time fix 91%</p></div>""", dark=True),
    F_GLOW, "#0f1936")

page("04-features.html", "SognosCare 04 - Features",
     """2026-10-24 pass: capability bullet lists removed; rail items never wrap (whitespace-nowrap); card H3 / tagline / body on the shared scale.
Audit: F2 (phased-out gray-100/50 -> tint / bordered white), F3 (aria-current links), F4 (token colours), F5 (rail in the 2/10 grid).
Benchmark: Key features - header, stacked cards p-8 alternating near-white surfaces, text/visual columns, jump list in the left gutter.
Maps to: components/layout/sections/ProductFeaturesScroll.tsx (shared x5, per Q2) + sognoscare/Features.tsx.""",
     FEATURES)

# ── 05 Editions ────────────────────────────────────────────────────────────
EDS = [
    ("Disability & Mental Health", "sognoscare-edition-dmh.svg", "bg-ed-dmh", "Plan around participant goals, manage incidents, and streamline progress notes - with NDIS funding rules and Quality & Safeguards requirements enforced at every step."),
    ("Allied Health", "sognoscare-edition-ahc.svg", "bg-ed-ahc", "Manage referrals, coordinate therapy schedules, and record multi-disciplinary notes in one place - with mobile-first access designed for practitioners who work across multiple sites."),
    ("Hospital in the Home", "SognosCare-HITH-Logo.svg", "bg-ed-hith", "Manage home-based treatment, mobile clinical teams, patient visits, and care documentation while maintaining visibility across Hospital in the Home delivery."),
    ("Support at Home", "sognoscare-edition-sah.svg", "bg-ed-sah", "Manage client services, budgets, and care workers while staying ahead of the Support at Home program - with funding model changes tracked and compliance pre-configured."),
    ("Residential Aged Care", "sognoscare-edition-rac.svg", "bg-ed-rac", "From care planning to staff coordination and resident reporting - built for residential providers demonstrating quality against Aged Care Quality Standards."),
    ("Child & Family Services", "SognosCare-C&amp;FS-Logo.svg", "bg-ed-cfs", "Manage casework, family relationships, referrals, safety planning, and frontline service delivery with a connected platform built for child and family services."),
]
ed_cards = "\n".join(
    f"""          <li class="w-[82vw] shrink-0 snap-start sm:w-[calc((100%-12px)/2)] lg:w-[calc((100%-32px)/3)]">
            <a href="#" class="group relative flex h-full min-h-[385px] flex-col justify-between overflow-hidden rounded border border-line bg-white p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              <span aria-hidden="true" class="absolute inset-x-0 top-0 h-1 {acc}"></span>
              <div class="flex flex-col gap-6">
                <img src="{P}/logos/{logo}" alt="" class="h-14 w-auto self-start" />
                <p class="max-w-[45ch] {T["body"]} text-body">{desc}</p>
              </div>
              <div class="flex items-center justify-between gap-4 border-t border-line pt-5">
                <h3 class="{T["h3sm"]} text-heading text-balance">{name}</h3>
                <span aria-hidden="true" class="flex size-11 shrink-0 items-center justify-center rounded-full bg-tint text-heading transition-colors group-hover:{acc} group-hover:text-white">&rarr;</span>
              </div>
            </a>
          </li>"""
    for name, logo, acc, desc in EDS
)
EDITIONS = f"""<section id="editions" class="bg-tint {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div class="{HEAD}">
        <h2 class="{T["h2"]} text-heading">Choose the Right SognosCare Edition for Your Service</h2>
        <p class="{T["lede"]} text-body">SognosCare offers six tailored editions, each pre-configured for its funding model, compliance framework, and operational workflows.</p>
      </div>
      <div class="flex shrink-0 gap-2">
        <button type="button" aria-label="Previous editions" disabled class="flex size-11 items-center justify-center rounded-full border border-line text-heading disabled:opacity-30">&larr;</button>
        <button type="button" aria-label="Next editions" class="flex size-11 items-center justify-center rounded-full border border-line text-heading transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-accent">&rarr;</button>
      </div>
    </div>
    <ul class="{GAP} flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] lg:gap-4">
{ed_cards}
    </ul>
  </div>
</section>"""
page("05-editions.html", "SognosCare 05 - Editions",
     """2026-10-24 pass: no left rail - header and cards span the full container (the slider needs the width); header, lede, card title and body on the shared scale.
Audit: E1 (one title + description per card), E2 (description visible at rest below lg), E3 (white card on tint), E4 (rail header), E5, 44px arrows.
Maps to: sognoscare/Editions.tsx + sognoscare/EditionCards.tsx (shared with EditionPageTemplate).""",
     EDITIONS)

# ── 06 Advantages ──────────────────────────────────────────────────────────
ADV = [
    "Purpose-built for Australian care compliance - not adapted from generic CRM",
    "Reduces documentation time with AI-assisted clinical notes",
    "Keeps you audit-ready with continuous compliance tracking",
    "Integrates with Microsoft 365, Teams, and Dynamics 365 out of the box",
    "Connects care management, workforce rostering, and billing in one system",
    "Scales from community care to residential aged care without re-implementation",
]
adv_items = "\n          ".join(
    f'<li class="flex items-baseline gap-4 border-b border-white/20 py-5 md:[&:nth-last-child(-n+2)]:border-b-0"><span class="{T["small"]} tabular-nums text-accent">{i + 1:02d}</span><span class="{T["body"]} text-white">{a}</span></li>'
    for i, a in enumerate(ADV)
)
ADVANTAGES = f"""<section id="advantages" class="bg-care-dark {SECTION} text-white">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Advantages", "dark")}</div>
      <div class="{CONTENT}">
        <div class="{HEAD}">
          <h2 class="{T["h2"]} text-white">Key Advantages</h2>
        </div>
        <ul class="{GAP} grid grid-cols-1 border-t border-white/20 md:grid-cols-2 md:gap-x-8 lg:gap-x-16 [&>li:last-child]:border-b-0">
          {adv_items}
        </ul>
      </div>
    </div>
  </div>
</section>"""
page("06-advantages.html", "SognosCare 06 - Advantages",
     """2026-10-24 pass: heading on the shared H2, list rows 16/18px, numerals 14px accent, header->list gap matches every section.
Audit: A1, A2 (hairline rows replace stripes), A3, G3. Heading is the live Sanity value "Key Advantages" (see S4).
Maps to: components/layout/sections/sognoscare/Advantages.tsx (page-local).""",
     ADVANTAGES)

# ── 07 Stories ─────────────────────────────────────────────────────────────
def story(logo, alt, bg, quote, who):
    return f"""          <article class="flex min-h-[360px] flex-col rounded-lg {bg} p-6 lg:min-h-[420px] lg:p-10">
            <div class="flex items-center justify-between gap-4">
              <img src="{P}/logos/{logo}" alt="{alt}" class="h-8 w-auto max-w-[160px] object-contain brightness-0 invert" />
              <a href="#" class="inline-flex min-h-11 items-center rounded-full border border-white px-5 {T["small"]} font-medium text-white transition-colors hover:bg-white hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Read full story</a>
            </div>
            <blockquote class="mt-auto pt-10">
              <p class="{T["quote"]} text-white">{quote}</p>
              <footer class="mt-4 {T["small"]} text-white/75">{who}</footer>
            </blockquote>
          </article>"""


STORIES = f"""<section id="stories" class="bg-white {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Customer Stories")}</div>
      <div class="{CONTENT}">
        <div class="flex items-end justify-between gap-6">
          <div class="{HEAD}">
            <h2 class="{T["h2"]} text-heading">Customer Stories</h2>
          </div>
          <a href="#" class="hidden shrink-0 items-center gap-1.5 {T["body"]} font-medium text-heading hover:text-accent focus-visible:outline-2 focus-visible:outline-accent sm:inline-flex">See more customer stories <span aria-hidden="true">&rarr;</span></a>
        </div>
        <div class="{GAP} grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
{story("flourish-australia-logo.png", "Flourish Australia", "bg-care-dark", "Congratulations and WELL DONE to everyone that has been a part of this magnificent success! You should all be very proud of the quality of work you produce. You make us very proud - THANK YOU!", "Susan McCarthy, Chief Operating Officer - Flourish Australia")}
{story("auckland-airport-logo.png", "Auckland Airport", "bg-navy", "Thank you to the Sognos team - hoping to see you and thank you in person for such a successful implementation. Looking forward to a continued successful partnership with Sognos as our Field Service support partners!", "Anthony Hart, Operations Delivery Lead - Auckland Airport")}
        </div>
        <a href="#" class="mt-8 inline-flex items-center gap-1.5 {T["body"]} font-medium text-heading hover:text-accent sm:hidden">See more customer stories <span aria-hidden="true">&rarr;</span></a>
      </div>
    </div>
  </div>
</section>"""
page("07-stories.html", "SognosCare 07 - Customer Stories",
     """2026-10-24 pass: H2, quote (20/24px 400), attribution and CTA on the shared scale; header->cards gap matches every section.
Audit: S1 (py-20 md:py-28), S2 (rounded-full button), S3 (one H2 weight), S4 (rail label).
Maps to: components/layout/sections/ProductCustomerStories.tsx (shared x9 - page-local props; S2 global).""",
     STORIES)

page("02b-subnav.html", "SognosCare 02b - Sub-nav (Routable bar)",
     """Sub-nav after routable.com/product/payouts: secondary bar under the fixed navbar, dashed hairlines, product name left, plain 14px links right,
transparent/white over the dark hero, white/dark once scrolled; disclosure below lg. Scroll-spy marks the current section in accent.
Maps to: components/ui/ProductSubNav.tsx (shared x4 - new layout via a `variant="bar"` prop, Roster/Genogram/DigPacks keep the pill until rolled out)
+ Navbar fixed stack (mounted under the 80px bar, top-20) + sognoscare/page.tsx (stop passing subNav into Problems).""",
     SUBNAV + hero("a") + problems("a"))

page("01-hero-a.html", "SognosCare 01 - Hero A: centred, logo row (Routable, recommended)", "OPTION A (2026-10-24, after routable.com/product/ap-automation): centred copy, logo block restored as the visual (1112px wide, 12:5 = ~463px tall, rounded-lg, 80px gaps), 4 equal h-20 logo cells with hairline dividers under it on desktop, edge-faded marquee on mobile; H1 60px on two lines.\n" + HERO_NOTE, SUBNAV + hero("a"))
page("01-hero-b.html", "SognosCare 01 - Hero B: centred, captioned logo grid", "OPTION B: centred column, caption + hairline-divided logo grid (the current strip folded into the hero).\n" + HERO_NOTE, SUBNAV + hero("b"))
page("01-hero-c.html", "SognosCare 01 - Hero C: left-aligned split", "OPTION C: editorial split - copy left (7 cols), captioned 2-col logo grid right (5 cols), bottom-aligned.\n" + HERO_NOTE, SUBNAV + hero("c"))

# ── 01m Hero motion options (after helloaria.eu/invoice-financing) ─────────
# Aria hero, measured at 1440px: a 1280-wide stage (aspect 1280:723, 1280:1284
# on mobile) holding a photo at 82.97% width / top 5% (aspect 1062:672,
# rounded 4px); a live WebGL gradient block top-left (left 5%, 16.3% wide,
# 209:180); a code card bottom-left (bottom 5%, 29.7% wide) and an invoice card
# top-right (top 15%, 22.74% wide), both overlapping the photo edge. Cards are
# static images; motion = image fade-in (opacity .2s) + the animated canvas.
# SognosCare versions: cards are HTML (no shadows - borders), gradient is CSS,
# motion = staggered rise, slow float, gradient drift, scroll parallax and one
# "product working" loop per option. All stopped under reduced motion.
# Card data is illustrative demo content - not real clients.

MOTION_CSS = """<style>
  @keyframes m-rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
  @keyframes m-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes m-drift { from { background-position: 0% 50%; } to { background-position: 100% 50%; } }
  @keyframes m-pulse { 0%, 100% { opacity: .55; transform: scale(1); } 50% { opacity: 0; transform: scale(2.4); } }
  .m-rise { animation: m-rise .8s cubic-bezier(.22,1,.36,1) both; }
  .m-float { animation: m-float 6s ease-in-out infinite; }
  .m-drift { background-size: 220% 220%; animation: m-drift 9s ease-in-out infinite alternate; }
  .m-pulse { animation: m-pulse 2.6s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) {
    .m-rise, .m-float, .m-drift, .m-pulse { animation: none !important; opacity: 1 !important; transform: none !important; }
  }
</style>"""

MOTION_JS = """<script>
  (() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Scroll parallax: [data-speed] layers drift at their own rate.
    const layers = [...document.querySelectorAll("[data-speed]")];
    if (!reduce && layers.length) {
      const stage = document.getElementById("hero-stage") || document.querySelector(".hero-stage");
      const tick = () => {
        layers.forEach((l) => {
          const r = (l.closest(".hero-stage") || stage).getBoundingClientRect();
          const p = Math.max(-1, Math.min(1, r.top / innerHeight));
          l.style.transform = `translate3d(0, ${(p * l.dataset.speed * 60).toFixed(1)}px, 0)`;
        });
      };
      addEventListener("scroll", tick, { passive: true }); tick();
    }
    // Typed Copilot note.
    document.querySelectorAll(".hero-stage [data-type]").forEach((typed) => {
      const text = typed.dataset.type;
      if (reduce) typed.textContent = text;
      else { let i = 0; const go = () => { typed.textContent = text.slice(0, ++i); if (i < text.length) setTimeout(go, 28); else setTimeout(() => { i = 0; go(); }, 4000); }; setTimeout(go, 1400); }
    });
    // Status chips cycle Scheduled -> In progress -> Completed.
    const chips = [...document.querySelectorAll("[data-cycle]")];
    const STATES = [["Scheduled", "bg-tint text-body"], ["In progress", "bg-accent/15 text-heading"], ["Completed", "bg-emerald-100 text-emerald-800"]];
    if (chips.length && !reduce) {
      let step = 0;
      setInterval(() => {
        const chip = chips[step % chips.length];
        const next = (Number(chip.dataset.cycle) + 1) % STATES.length;
        chip.dataset.cycle = next; chip.textContent = STATES[next][0];
        chip.className = "rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-300 " + STATES[next][1];
        step++;
      }, 1600);
    }
    // Event feed: newest slides in at the top, oldest drops off.
    const feed = document.getElementById("event-feed");
    if (feed && !reduce) {
      const pool = JSON.parse(feed.dataset.pool); let n = 0;
      setInterval(() => {
        const [title, meta] = pool[n++ % pool.length];
        const li = document.createElement("li");
        li.className = "m-rise flex items-start gap-3 border-b border-line px-4 py-3 last:border-b-0";
        li.innerHTML = `<span class="mt-1.5 size-2 shrink-0 rounded-full bg-accent"></span><div><p class="text-sm font-medium text-heading">${title}</p><p class="text-xs text-muted">${meta}</p></div>`;
        feed.prepend(li); if (feed.children.length > 3) feed.lastElementChild.remove();
      }, 2800);
    }
  })();
</script>"""

GRAD_BLOCK = """<div aria-hidden="true" data-speed="-0.6" class="absolute left-0 top-0 z-0 aspect-[209/180] w-[30%] sm:left-[5%] sm:w-[16.3%]">
        <div class="m-rise size-full" style="animation-delay:.1s"><div class="m-drift size-full rounded" style="background-image: linear-gradient(135deg, #59bbf7, #1d96fc, #3b6fe0, #203e71, #59bbf7)"></div></div>
      </div>"""

PHOTO = f"""<div class="absolute inset-x-0 top-[5%] z-10 flex justify-center">
        <div class="m-rise aspect-[1062/672] w-full max-w-[82.969%] overflow-hidden rounded bg-white/5" style="animation-delay:.2s">
          <img src="{P}/product/sognos-care-hero-img.png" alt="An older couple sharing a laugh at home" class="size-full object-cover" />
        </div>
      </div>"""

VISIT_CARD = """<div data-speed="0.5" class="absolute right-0 top-[-2%] z-20 hidden w-[280px] sm:top-[15%] sm:block lg:w-[300px]">
        <div class="m-rise" style="animation-delay:.5s"><div class="m-float rounded-lg border border-line bg-white p-5 text-left">
          <div class="flex items-center justify-between">
            <p class="font-heading text-lg text-heading">Visit</p>
            <span class="relative flex size-2.5"><span class="m-pulse absolute inset-0 rounded-full bg-emerald-500"></span><span class="relative size-2.5 rounded-full bg-emerald-500"></span></span>
          </div>
          <dl class="mt-3 divide-y divide-line text-sm">
            <div class="flex justify-between py-2.5"><dt class="text-muted">Service</dt><dd class="text-heading">Personal care</dd></div>
            <div class="flex justify-between py-2.5"><dt class="text-muted">Scheduled</dt><dd class="text-heading">9:00 am</dd></div>
            <div class="flex justify-between py-2.5"><dt class="text-muted">Checked in</dt><dd class="font-medium text-heading">9:02 am</dd></div>
          </dl>
          <p class="mt-3 flex items-center justify-center gap-2 rounded-full bg-care-dark py-3 text-sm font-medium text-white">Progress note signed <span aria-hidden="true">&#10003;</span></p>
        </div></div>
      </div>"""

COPILOT_CARD = """<div data-speed="0.9" class="absolute bottom-[5%] left-0 z-20 w-[300px] sm:w-[340px] lg:w-[380px]">
        <div class="m-rise" style="animation-delay:.7s"><div class="m-float overflow-hidden rounded-lg border border-white/10 bg-care-dark text-left" style="animation-delay:-3s">
          <div class="flex border-b border-white/10 text-sm">
            <span class="border-r border-white/10 px-4 py-3 text-white">Progress note</span>
            <span class="border-r border-white/10 px-4 py-3 text-white/50">Care plan</span>
            <span class="px-4 py-3 text-white/50">Incidents</span>
          </div>
          <div class="p-4">
            <p class="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent"><span aria-hidden="true">&#10022;</span> Copilot draft</p>
            <p class="mt-3 min-h-[5.5rem] font-mono text-[13px] leading-relaxed text-white/85"><span data-type="Client settled after morning routine. Assisted with shower and breakfast; medication taken 9:15. Mood bright, mobility steady. No concerns raised."></span><span aria-hidden="true" class="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-accent align-middle"></span></p>
          </div>
        </div></div>
      </div>"""

COMPLIANCE_CARD = """<div data-speed="0.5" class="absolute right-0 top-[-2%] z-20 hidden w-[280px] sm:top-[12%] sm:block lg:w-[300px]">
        <div class="m-rise" style="animation-delay:.5s"><div class="m-float rounded-lg border border-line bg-white p-5 text-left">
          <p class="font-heading text-lg text-heading">Compliance check</p>
          <ul class="mt-3 space-y-2.5 text-sm">
            <li class="flex items-center justify-between"><span class="text-body">Funding rules</span><span class="text-emerald-700">&#10003; Passed</span></li>
            <li class="flex items-center justify-between"><span class="text-body">Worker credentials</span><span class="text-emerald-700">&#10003; Current</span></li>
            <li class="flex items-center justify-between"><span class="text-body">Audit trail</span><span class="text-emerald-700">&#10003; Logged</span></li>
          </ul>
        </div></div>
      </div>"""

VISITS = [("8:30", "M. Turner", "Personal care", 2), ("9:00", "R. Okafor", "Medication", 1), ("10:15", "J. Morris", "Domestic assist", 0), ("11:00", "A. Nguyen", "Allied health", 0)]
_chip = {0: ("Scheduled", "bg-tint text-body"), 1: ("In progress", "bg-accent/15 text-heading"), 2: ("Completed", "bg-emerald-100 text-emerald-800")}
DASH = f"""<div class="absolute inset-x-0 top-[5%] z-10 flex justify-center">
        <div class="m-rise flex aspect-[1062/672] w-full max-w-[82.969%] overflow-hidden rounded border border-white/10 bg-white text-left" style="animation-delay:.2s">
          <aside class="hidden w-[18%] shrink-0 flex-col gap-3 bg-care-dark p-4 sm:flex">
            <img src="{P}/logos/sognos-care-logo.svg" alt="" class="h-5 w-auto self-start brightness-0 invert" />
            {"".join(f'<span class="rounded px-2.5 py-1.5 text-xs {c}">{t}</span>' for t, c in [("Today", "bg-white/10 text-white"), ("Clients", "text-white/60"), ("Care plans", "text-white/60"), ("Compliance", "text-white/60"), ("Reports", "text-white/60")])}
          </aside>
          <div class="flex min-w-0 flex-1 flex-col p-4 sm:p-6">
            <div class="flex items-center justify-between">
              <p class="font-heading text-lg text-heading sm:text-xl">Today&rsquo;s visits</p>
              <span class="rounded-full border border-line px-3 py-1 text-xs text-muted">Northern region</span>
            </div>
            <div class="mt-4 grid grid-cols-3 gap-3">
              {"".join(f'<div class="rounded border border-line p-3"><p class="text-xs text-muted">{k}</p><p class="mt-1 font-heading text-xl text-heading sm:text-2xl">{v}</p></div>' for k, v in [("Visits", "128"), ("On time", "97%"), ("Notes signed", "112")])}
            </div>
            <ul class="mt-4 divide-y divide-line text-sm">
              {"".join(f'<li class="flex items-center justify-between gap-3 py-2.5"><span class="w-12 shrink-0 tabular-nums text-muted">{t}</span><span class="min-w-0 flex-1 truncate text-heading">{c}</span><span class="hidden flex-1 truncate text-body md:block">{s}</span><span data-cycle="{st}" class="rounded-full px-2.5 py-1 text-xs font-medium {_chip[st][1]}">{_chip[st][0]}</span></li>' for t, c, s, st in VISITS)}
            </ul>
          </div>
        </div>
      </div>"""

FEED_POOL = [["Visit completed", "Personal care · R. Okafor · 9:58 am"], ["Progress note signed", "Copilot draft approved · 10:01 am"], ["Funding check passed", "Support at Home · Level 3"], ["Incident logged", "Minor fall · escalated to coordinator"], ["Care plan reviewed", "Goals updated · next review 12 Dec"]]
import json as _json
FEED_CARD = f"""<div data-speed="0.7" class="absolute bottom-[3%] right-0 z-20 w-[300px] sm:w-[320px]">
        <div class="m-rise" style="animation-delay:.6s"><div class="overflow-hidden rounded-lg border border-line bg-white text-left">
          <div class="flex items-center justify-between border-b border-line px-4 py-3">
            <p class="font-heading text-base text-heading">Live activity</p>
            <span class="flex items-center gap-1.5 text-xs text-muted"><span class="relative flex size-2"><span class="m-pulse absolute inset-0 rounded-full bg-emerald-500"></span><span class="relative size-2 rounded-full bg-emerald-500"></span></span>Live</span>
          </div>
          <ul id="event-feed" data-pool='{_json.dumps(FEED_POOL)}' class="min-h-[12.5rem]">
            {"".join(f'<li class="flex items-start gap-3 border-b border-line px-4 py-3 last:border-b-0"><span class="mt-1.5 size-2 shrink-0 rounded-full bg-accent"></span><div><p class="text-sm font-medium text-heading">{t}</p><p class="text-xs text-muted">{m}</p></div></li>' for t, m in FEED_POOL[:3])}
          </ul>
        </div></div>
      </div>"""


def motion_hero(variant):
    """Swap option A's logo block for an Aria-style stage."""
    base = hero_a()
    start = base.index('    <div class="mx-auto max-w-[1112px]">')
    end = base.index("    <div>\n      <ul aria-label=\"Trusted by\"")
    inner = {
        "a": GRAD_BLOCK + "\n      " + PHOTO + "\n      " + VISIT_CARD + "\n      " + COPILOT_CARD,
        "b": GRAD_BLOCK + "\n      " + DASH + "\n      " + COMPLIANCE_CARD + "\n      " + COPILOT_CARD,
        "c": GRAD_BLOCK + "\n      " + PHOTO + "\n      " + FEED_CARD,
    }[variant]
    stage = f"""    <div id="hero-stage" class="hero-stage relative mx-auto aspect-[1280/1284] w-full max-w-[1280px] sm:aspect-[1280/723]">
      {inner}
    </div>

"""
    return MOTION_CSS + base[:start] + stage + base[end:] + MOTION_JS


# ── 01m-hero-a: three polished options (after helloaria.eu + /saas) ────────
# Stage height capped at 450px (sm+). Stripe block removed 2026-10-24.


def opt_photo():
    return f"""<div class="absolute inset-x-0 inset-y-[7%] z-10 flex justify-center">
        <div class="m-rise h-full w-full max-w-[78%] overflow-hidden rounded-lg bg-white/5" style="animation-delay:.2s">
          <img src="{P}/product/sognos-care-hero-img.png" alt="An older couple sharing a laugh at home" class="size-full object-cover" />
        </div>
      </div>"""


# Option 1: one image block (560px); every animated element sits inside
# it. One 12s timeline drives all three layers:
#   0.0 Scheduled → 1.6 En route (ETA) → 3.2 Checked in (GPS) → 4.4 Copilot
#   types the note → ~8.4 Accept pressed → 9.2 Note signed → 10 SognosCare
#   badge ring completes "Record up to date" → 12 reset.
VISIT_STEPS = [("Scheduled", "9:00 am &middot; Personal care"), ("En route", "P. Shah &middot; ETA 6 min"), ("Checked in", "9:02 am &middot; GPS verified"), ("Note signed", "Progress note added to record")]
OPT1_STAGE = f"""<div class="m-rise relative size-full overflow-hidden rounded-lg" style="animation-delay:.2s">
        <img src="{P}/product/sognos-care-hero-img.png" alt="An older couple sharing a laugh at home" class="absolute inset-0 size-full object-cover" />
        <div aria-hidden="true" class="absolute inset-0" style="background: linear-gradient(90deg, rgba(15,25,54,.55), rgba(15,25,54,0) 45%), linear-gradient(0deg, rgba(15,25,54,.45), rgba(15,25,54,0) 40%)"></div>

        <div class="absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
          <div class="m-rise flex items-center gap-3 rounded-full border border-white/15 bg-care-dark/70 py-1.5 pl-1.5 pr-4 backdrop-blur" style="animation-delay:.4s">
            <span class="relative flex size-10 items-center justify-center">
              <svg viewBox="0 0 40 40" class="absolute inset-0 size-full -rotate-90" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="2"/><circle data-ring cx="20" cy="20" r="18" fill="none" stroke="#59bbf7" stroke-width="2" stroke-linecap="round" stroke-dasharray="113.1" stroke-dashoffset="113.1" style="transition: stroke-dashoffset .9s cubic-bezier(.22,1,.36,1)"/></svg>
              <span class="m-drift flex size-8 items-center justify-center rounded-full" style="background-image: linear-gradient(135deg, #59bbf7, #3b6fe0, #a5b4fc, #59bbf7)"><img src="{P}/logos/icon-sognos-care.svg" alt="" class="size-4 brightness-0 invert" /></span>
            </span>
            <span class="flex flex-col">
              <img src="{P}/logos/sognos-care-logo.svg" alt="SognosCare" class="h-4 w-auto self-start brightness-0 invert" />
              <span data-sync class="mt-0.5 text-[11px] text-white/75">Waiting for visit</span>
            </span>
          </div>
        </div>

        <div class="absolute right-4 top-4 z-20 hidden w-[300px] sm:right-6 sm:top-6 sm:block">
          <div class="m-rise rounded-lg border border-line bg-white p-4 text-left" style="animation-delay:.55s">
            <div class="flex items-center justify-between">
              <p class="font-heading text-lg text-heading">Visit &middot; M. Turner</p>
              <span data-vchip class="rounded-full bg-tint px-2.5 py-1 text-xs font-medium text-body transition-colors duration-300">Scheduled</span>
            </div>
            <div class="mt-3 grid grid-cols-4 gap-1">{"".join('<span data-vseg class="h-1 rounded-full bg-line transition-colors duration-500"></span>' for _ in VISIT_STEPS)}</div>
            <ol class="mt-3 space-y-2.5 text-sm">{"".join(f'<li data-vstep class="group/v flex items-center gap-3" data-state="next"><span class="flex size-5 shrink-0 items-center justify-center rounded-full border border-line text-[10px] text-transparent transition-colors duration-300 group-data-[state=done]/v:border-emerald-600 group-data-[state=done]/v:bg-emerald-600 group-data-[state=done]/v:text-white group-data-[state=now]/v:border-accent group-data-[state=now]/v:bg-accent/15">&#10003;</span><div class="min-w-0"><p class="text-heading transition-colors group-data-[state=next]/v:text-muted">{t}</p><p class="truncate text-xs text-muted">{d}</p></div></li>' for t, d in VISIT_STEPS)}</ol>
          </div>
        </div>

        <div class="absolute bottom-4 left-4 right-4 z-20 sm:bottom-6 sm:left-6 sm:right-auto sm:w-[380px]">
          <div class="m-rise overflow-hidden rounded-lg border border-white/10 bg-care-dark/90 text-left backdrop-blur" style="animation-delay:.7s">
            <div class="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <p class="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent"><span aria-hidden="true">&#10022;</span> Copilot draft</p>
              <span class="text-xs text-white/50">Progress note</span>
            </div>
            <div class="p-4">
              <p class="min-h-[4.5rem] font-mono text-[13px] leading-relaxed text-white/85"><span data-opt1-type="Client settled after morning routine. Assisted with shower and breakfast; medication taken 9:15. Mood bright, mobility steady."></span><span aria-hidden="true" class="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-accent align-middle"></span></p>
              <div class="mt-3 flex items-center gap-2">
                <span data-accept class="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-heading transition-all duration-300">Accept</span>
                <span class="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/80">Edit</span>
                <span data-added class="ml-auto text-xs text-emerald-300 opacity-0 transition-opacity duration-300">&#10003; Added to record</span>
              </div>
            </div>
          </div>
        </div>
      </div>"""

OPT1_JS = """<script>
  (() => {
    const root = document.querySelector('[data-hero-opt="1"]'); if (!root) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const steps = [...root.querySelectorAll("[data-vstep]")], segs = [...root.querySelectorAll("[data-vseg]")];
    const chip = root.querySelector("[data-vchip]"), ring = root.querySelector("[data-ring]"), sync = root.querySelector("[data-sync]");
    const typed = root.querySelector("[data-opt1-type]"), accept = root.querySelector("[data-accept]"), added = root.querySelector("[data-added]");
    const CHIPS = [["Scheduled", "bg-tint text-body"], ["En route", "bg-accent/15 text-heading"], ["Checked in", "bg-accent/15 text-heading"], ["Signed", "bg-emerald-100 text-emerald-800"]];
    const RING = 113.1;
    const visit = (k) => {
      steps.forEach((s, i) => (s.dataset.state = i < k ? "done" : i === k ? "now" : "next"));
      segs.forEach((s, i) => (s.className = "h-1 rounded-full transition-colors duration-500 " + (i <= k ? (k === 3 ? "bg-emerald-600" : "bg-accent") : "bg-line")));
      const [t, c] = CHIPS[Math.max(0, k)]; chip.textContent = t; chip.className = "rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-300 " + c;
      ring.style.strokeDashoffset = RING * (1 - Math.max(0, k + 1) / 5);
    };
    const finish = () => { visit(3); steps[3].dataset.state = "done"; ring.style.strokeDashoffset = 0; sync.textContent = "Record up to date"; typed.textContent = typed.dataset.opt1Type; added.style.opacity = 1; accept.className = "rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white transition-all duration-300"; };
    if (reduce) { finish(); return; }
    const timers = []; const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const run = () => {
      timers.splice(0).forEach(clearTimeout);
      typed.textContent = ""; added.style.opacity = 0; accept.className = "rounded-full bg-white px-3 py-1.5 text-xs font-medium text-heading transition-all duration-300";
      visit(0); sync.textContent = "Visit scheduled";
      at(1600, () => { visit(1); sync.textContent = "Worker en route"; });
      at(3200, () => { visit(2); sync.textContent = "Syncing check-in…"; });
      const text = typed.dataset.opt1Type;
      for (let i = 1; i <= text.length; i++) at(4400 + i * 28, () => (typed.textContent = text.slice(0, i)));
      const end = 4400 + text.length * 28;
      at(end + 500, () => (accept.className = "scale-95 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-white transition-all duration-300"));
      at(end + 900, () => { finish(); });
      at(end + 4200, run);
    };
    new IntersectionObserver(([e], o) => { if (e.isIntersecting) { run(); o.disconnect(); } }).observe(root.querySelector(".hero-stage"));
  })();
</script>"""


# Option 2: Aria /saas + invoice-financing flow — centre product tile, four
# nodes on dotted connectors with diamond ends; a highlight walks the nodes
# and the connector dash flows toward the active node.
FLOW_NODES = [
    # (id, icon path, title, sub, position classes, connector path in 1000x560 space)
    ("intake", "M4 4h16v16H4z M8 9h8 M8 13h5", "Referral received", "Intake &middot; M. Turner", "left-[1%] top-[10%]", "M330 115 H420 V230 H470"),
    ("roster", "M4 6h16 M4 12h16 M4 18h10", "Worker matched", "SognosRoster &middot; P. Shah", "right-[1%] top-[10%]", "M670 115 H580 V230 H530"),
    ("funding", "M3 7h18v10H3z M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0", "Claim submitted", "Support at Home &middot; $184.20", "left-[6%] bottom-[8%]", "M350 455 H420 V330 H470"),
    ("family", "M8 8m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M16 8m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M3 20c0-3 3-5 5-5s5 2 5 5 M11 20c0-3 3-5 5-5s5 2 5 5", "Family notified", "SognosGenogram &middot; 2 contacts", "right-[6%] bottom-[8%]", "M650 455 H580 V330 H530"),
]


def flow_node(i, nid, icon, title, sub, pos):
    return f"""<div data-node="{i}" class="group/n absolute {pos} z-20 w-[44%] sm:w-[31%]">
          <div class="m-rise" style="animation-delay:{.4 + i * .12:.2f}s"><div class="rounded-lg border border-line bg-white text-left transition-colors duration-500 group-data-[on=true]/n:border-accent">
            <div class="flex items-center gap-3 p-3 sm:p-4">
              <span class="flex size-9 shrink-0 items-center justify-center rounded bg-care-dark sm:size-11"><svg viewBox="0 0 24 24" class="size-5 text-accent" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{icon}"/></svg></span>
              <p class="text-sm text-heading sm:text-base">{title}</p>
              <span class="ml-auto hidden size-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white group-data-[on=true]/n:flex">&#10003;</span>
            </div>
            <p class="hidden border-t border-line px-4 py-2.5 text-xs text-muted sm:block">{sub}</p>
          </div></div>
        </div>"""


FLOW_STAGE = f"""<div class="absolute inset-0 rounded-lg" style="background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02))"></div>
      <svg aria-hidden="true" viewBox="0 0 1000 560" preserveAspectRatio="none" class="absolute inset-0 z-10 size-full" fill="none">
        {"".join(f'<path data-wire="{i}" d="{n[5]}" stroke="rgba(255,255,255,.35)" stroke-width="1.5" stroke-dasharray="3 5" vector-effect="non-scaling-stroke" class="transition-[stroke] duration-500"/>' for i, n in enumerate(FLOW_NODES))}
      </svg>
      <div class="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div class="m-rise" style="animation-delay:.25s"><div class="rounded-2xl p-[2px]" style="background: linear-gradient(135deg, #c4b5fd, #59bbf7, #7ee8c4)"><div class="rounded-[14px] bg-care-dark p-2.5">
          <div class="m-drift flex size-24 items-center justify-center rounded-xl sm:size-32" style="background-image: linear-gradient(135deg, #59bbf7, #3b6fe0, #a5b4fc, #59bbf7)">
            <img src="{P}/logos/icon-sognos-care.svg" alt="" class="size-12 brightness-0 invert sm:size-16" />
          </div>
        </div></div></div>
      </div>
      {"".join(flow_node(i, *n[:5]) for i, n in enumerate(FLOW_NODES))}"""

FLOW_JS = """<script>
  (() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = [...document.querySelectorAll("[data-node]")], wires = [...document.querySelectorAll("[data-wire]")];
    if (!nodes.length) return;
    const set = (k) => nodes.forEach((n, i) => {
      n.dataset.on = String(i <= k);
      wires[i].setAttribute("stroke", i === k ? "#59bbf7" : i < k ? "rgba(89,187,247,.6)" : "rgba(255,255,255,.35)");
      wires[i].classList.toggle("flow", i === k);
    });
    if (reduce) { set(nodes.length - 1); return; }
    let k = -1; setInterval(() => { k = (k + 1) % (nodes.length + 1); set(k === nodes.length ? -1 : k); }, 1500);
  })();
</script>"""

# Option 3: budget card (count-up + bar) top-right, notification stack
# bottom-left (newest slides in, stack compresses), stripes in two corners.
BUDGET_CARD = """<div data-speed="0.5" class="absolute right-0 top-[3%] z-20 hidden w-[300px] sm:block lg:w-[24%] lg:min-w-[300px]">
        <div class="m-rise" style="animation-delay:.5s"><div class="m-float rounded-lg border border-line bg-white p-5 text-left">
          <p class="font-heading text-lg text-heading">Support at Home</p>
          <p class="text-xs text-muted">M. Turner &middot; Level 3 &middot; this quarter</p>
          <p class="mt-4 font-heading text-3xl tabular-nums text-heading">$<span data-count="8412">0</span><span class="text-base text-muted"> / $12,000</span></p>
          <div class="mt-3 h-2 overflow-hidden rounded-full bg-tint"><span data-bar class="block h-full w-0 rounded-full bg-accent transition-[width] duration-[1600ms] ease-out" style="--to:70%"></span></div>
          <dl class="mt-4 divide-y divide-line text-sm">
            <div class="flex justify-between py-2.5"><dt class="text-muted">Visits delivered</dt><dd class="text-heading">46</dd></div>
            <div class="flex justify-between py-2.5"><dt class="text-muted">Claims</dt><dd class="font-medium text-emerald-700">&#10003; All lodged</dd></div>
          </dl>
        </div></div>
      </div>"""

TOASTS = [["Visit completed", "Personal care &middot; R. Okafor", "bg-emerald-500"], ["Claim lodged", "Support at Home &middot; $184.20", "bg-accent"], ["Progress note signed", "Copilot draft approved", "bg-[#a5b4fc]"], ["Incident closed", "Coordinator review &middot; 10:40", "bg-[#ffad6e]"]]
TOAST_STACK = f"""<div data-speed="0.9" class="absolute bottom-[3%] left-0 z-20 w-[290px] sm:w-[340px]">
        <div class="m-rise" style="animation-delay:.7s"><ul id="toast-stack" data-pool='{_json.dumps(TOASTS)}' class="relative h-[168px]">
          {"".join(f'<li class="toast absolute inset-x-0 flex items-center gap-3 rounded-lg border border-line bg-white p-3.5 text-left transition-all duration-700" style="bottom:{k * 14}px;transform:scale({1 - k * .05});opacity:{1 - k * .3};z-index:{3 - k}"><span class="size-2.5 shrink-0 rounded-full {c}"></span><div class="min-w-0"><p class="text-sm font-medium text-heading">{a}</p><p class="truncate text-xs text-muted">{b}</p></div><span class="ml-auto text-xs text-muted">now</span></li>' for k, (a, b, c) in enumerate(TOASTS[:3]))}
        </ul></div>
      </div>"""

OPT3_JS = """<script>
  (() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const card = document.querySelector("[data-count]"), bar = document.querySelector("[data-bar]");
    if (card) {
      const to = +card.dataset.count;
      if (reduce) { card.textContent = to.toLocaleString(); bar.style.width = bar.style.getPropertyValue("--to"); }
      else setTimeout(() => {
        bar.style.width = bar.style.getPropertyValue("--to"); let t0;
        const step = (t) => { t0 ??= t; const p = Math.min(1, (t - t0) / 1600); card.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString(); if (p < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step);
      }, 900);
    }
    const stack = document.getElementById("toast-stack");
    if (stack && !reduce) {
      const pool = JSON.parse(stack.dataset.pool); let n = 3;
      const lay = () => [...stack.children].forEach((li, k) => { li.style.bottom = k * 14 + "px"; li.style.transform = `scale(${1 - k * .05})`; li.style.opacity = k > 2 ? 0 : 1 - k * .3; li.style.zIndex = 3 - k; });
      setInterval(() => {
        const [a, b, c] = pool[n++ % pool.length];
        const li = stack.firstElementChild.cloneNode(true);
        li.querySelector("span").className = "size-2.5 shrink-0 rounded-full " + c;
        li.querySelector("p").innerHTML = a; li.querySelectorAll("p")[1].innerHTML = b;
        li.style.transform = "translateY(24px) scale(1)"; li.style.opacity = 0;
        stack.prepend(li); requestAnimationFrame(() => requestAnimationFrame(lay));
        setTimeout(() => { if (stack.children.length > 4) stack.lastElementChild.remove(); }, 800);
      }, 2600);
    }
  })();
</script>"""

# Hero copy per option. Option 1 = live copy. 2 and 3 are copy SUGGESTIONS
# (need approval before they ship).
HERO_OPTS = {
    "1": dict(
        name="Visit verified", note="Live copy. One image block (560px) with every element inside it: SognosCare badge (logo + progress ring + sync status), Visit card stepping Scheduled > En route > Checked in > Note signed, Copilot note that types, is accepted and added to the record - one 12s timeline.",
        h1='<span class="block">One platform.</span><span class="block">From intake to outcome.</span>', sub=SUB,
        stage=lambda: OPT1_STAGE,
        aspect="h-[420px] sm:h-[560px]", maxw="max-w-[1112px]"),
    "2": dict(
        name="Care network", note="Copy suggestion. Aria /saas flow: SognosCare tile centre, four connected outcomes light up in turn (dash flows to the active node).",
        h1='<span class="block">Every service,</span><span class="block">connected.</span>',
        sub="Referrals, rostering, funding and families meet in one SognosCare record on Dynamics 365 - so coordinators see the whole picture and act on it.",
        stage=lambda: FLOW_STAGE,
        aspect="h-[520px] sm:h-[560px]"),
    "3": dict(
        name="Day in motion", note="Copy suggestion. Photo + Support at Home budget card (count-up + bar) + notification stack that cycles.",
        h1='<span class="block">Care delivered.</span><span class="block">Compliance proven.</span>',
        sub="Every visit, note and claim is captured as it happens - so your funding reporting is ready before anyone asks for it.",
        stage=lambda: opt_photo() + "\n      " + BUDGET_CARD + "\n      " + TOAST_STACK,
        aspect="h-[420px] sm:h-[560px]"),
}


def hero_option(key):
    o = HERO_OPTS[key]
    base = hero_a()
    start = base.index('    <div class="mx-auto max-w-[1112px]">')
    end = base.index("    <div>\n      <ul aria-label=\"Trusted by\"")
    stage = f"""    <div class="hero-stage relative mx-auto w-full {o.get("maxw", "max-w-[1280px]")} {o["aspect"]}">
      {o["stage"]()}
    </div>

"""
    h1_old = '<span class="block">One platform.</span><span class="block">From intake to outcome.</span>'
    html = (base[:start] + stage + base[end:]).replace(h1_old, o["h1"]).replace(SUB, o["sub"])
    return f'<div data-hero-opt="{key}"{" hidden" if key != "1" else ""}>{html}</div>'


OPT_SWITCH = """<div class="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-care-dark/90 p-1 text-xs text-white backdrop-blur">
  """ + "".join(f'<button type="button" data-opt-pick="{k}" aria-pressed="{str(k == "1").lower()}" class="rounded-full px-3.5 py-2 transition-colors hover:bg-white/10 aria-pressed:bg-white aria-pressed:text-care-dark">{k} &middot; {o["name"]}</button>' for k, o in HERO_OPTS.items()) + """
</div>
<script>
  (() => {
    const pick = (k) => {
      document.querySelectorAll("[data-hero-opt]").forEach((el) => (el.hidden = el.dataset.heroOpt !== k));
      document.querySelectorAll("[data-opt-pick]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.optPick === k)));
      dispatchEvent(new Event("resize")); try { localStorage.setItem("care-hero-opt", k); } catch {}
    };
    document.querySelectorAll("[data-opt-pick]").forEach((b) => b.addEventListener("click", () => pick(b.dataset.optPick)));
    let s = null; try { s = localStorage.getItem("care-hero-opt"); } catch {}
    if (s) pick(s);
  })();
</script>"""

HERO_OPTS_NOTE = "\n".join(f"OPTION {k} · {o['name']}: {o['note']}" for k, o in HERO_OPTS.items()) + """
Stage height 560px (sm+). Stripe block removed.
Switcher (bottom centre) is review-only. Card data is illustrative demo content - not real clients.
Maps to: sognoscare/Hero.tsx (cards -> Framer Motion; option 1 timeline -> one client state machine)."""


MOTION_NOTE = """Hero motion options 2026-10-24, after helloaria.eu/invoice-financing: 1280 stage, photo/product frame at 82.97% (1062:672, rounded),
CSS gradient block top-left (drifts), HTML cards overlapping the frame edges (borders, no shadows). Motion: staggered rise on load (.1/.2/.5/.7s),
6s float on cards, 9s gradient drift, scroll parallax per layer (data-speed), plus one product loop. Reduced motion: everything static.
Card content is illustrative demo data (fictional initials) - needs approval before it ships.
Maps to: sognoscare/Hero.tsx (Framer Motion: whileInView rise, animate y loop, useScroll parallax; loops via small client state)."""
page("01m-hero-a.html", "SognosCare hero A - three options", HERO_OPTS_NOTE, MOTION_CSS + """<style>
  @keyframes hero-dash { to { stroke-dashoffset: -16; } }
  .hero-stage .flow { animation: hero-dash .8s linear infinite; }
  @media (prefers-reduced-motion: reduce) { .hero-stage .flow { animation: none; } }
</style>""" + SUBNAV + "".join(hero_option(k) for k in HERO_OPTS) + OPT_SWITCH + MOTION_JS + FLOW_JS + OPT3_JS + OPT1_JS)
page("01m-hero-b.html", "SognosCare hero motion B - product dashboard", "OPTION B (product-first, Attio posture): SognosCare 'Today's visits' frame in place of the photo - status chips tick Scheduled > In progress > Completed; Compliance card + Copilot card.\n" + MOTION_NOTE, SUBNAV + motion_hero("b"))
page("01m-hero-c.html", "SognosCare hero motion C - photo + live feed", "OPTION C (calm, one moving part): care photo, gradient block, a single Live activity card bottom-right where events slide in every 2.8s.\n" + MOTION_NOTE, SUBNAV + motion_hero("c"))

# ── Visuals gallery (04b) ─────────────────────────────────────────────────
# One registry entry per page. To add a page: append to GALLERY_PAGES with its
# palettes (6 colours each, in visual order), default palette and sections.
# The menu filters by page; each page has its own panel-colour selector,
# applied to that page's feature / capability visual panels.


def _gal_head(t, d):
    return f'<header class="mx-auto max-w-7xl px-6 pt-16 pb-8"><h2 class="{T["h2"]} text-heading">{t}</h2><p class="mt-2 {T["lede"]} text-muted">{d}</p></header>'


def _hero_label(t):
    return f'<p class="mx-auto max-w-7xl px-6 pb-3 pt-10 text-sm font-medium text-heading">{t}</p>'


def _tag(page_key, panels):
    return [v.replace('class="fv relative', f'data-pal-page="{page_key}" data-pal-i="{i}" class="fv relative', 1) for i, v in enumerate(panels)]


def _grid(items, cols="md:grid-cols-2"):
    return f'<div class="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 {cols}">{"".join(items)}</div>'


def _fig(title, v):
    return f'<figure class="space-y-3"><figcaption class="text-sm font-medium text-heading">{title}</figcaption>{v}</figure>'


ROSTER_PALETTES = {
    "a": ("Roster tints", "12% / 20% of Roster base #59bbf7 - the product's own light blue.", [_mix(RB, 12), _mix(RB, 20)] * 3),
    "b": ("Roster blues", "8% / 14% of Roster dark #1d96fc - cooler, a touch more saturated.", [_mix(RD, 8), _mix(RD, 14)] * 3),
    "c": ("Sky + tint", "Roster base at 15% alternating with brand tint - lighter rhythm.", [_mix(RB, 15), "#f9fafe"] * 3),
    "d": ("Brand tint", "All #f9fafe - calmest; cards carry the colour.", ["#f9fafe"] * 6),
    "e": ("Roster deep", "Roster gradient stops #104b90 / #03112f - dark panels, white cards.", [RX, RN] * 3),
    "f": ("Outlined white", "White with a hairline border.", ["#ffffff"] * 6),
}
FRONTLINE_PALETTES = {
    "a": ("Tint + accent", "Brand tint alternating with 8% accent #1d96fc.", ["#f9fafe", _mix("#1d96fc", 8)] * 3),
    "b": ("Accent blues", "8% / 14% of accent #1d96fc.", [_mix("#1d96fc", 8), _mix("#1d96fc", 14)] * 3),
    "c": ("Industrial neutrals", "Industrial Services ice #f4f8f9 + Facilities mint #ebfbe3 - the sectors Frontline serves.", ["#f4f8f9", "#ebfbe3"] * 3),
    "d": ("Brand tint", "All #f9fafe.", ["#f9fafe"] * 6),
    "e": ("Navy", "Care-dark / navy #0f1936 / #152248 - dark panels, white cards.", ["#0f1936", "#152248"] * 3),
    "f": ("Outlined white", "White with a hairline border.", ["#ffffff"] * 6),
}
CARE_PALETTES = {k: v for k, v in FV_PALETTES.items()}

# ── Home · Solutions + Home · Industries visuals ────────────────────────────
# Replace the /public/dev/ placeholders both home sections use today (Routable
# payout visuals and stock UI) with Sognos graphics in the same system. Copy is
# the live section copy; card data is illustrative.

_steps_ = _steps  # check rows driven by the "run" loop
_HP = _HIDDEN_PROGRESS
_C = "rounded-lg border border-line bg-white"


def _hp(i, loop, body, bg="#f9fafe"):
    return _panel(bg, loop, body)


HOME_SOLUTIONS = [
    ("Frontline", "End-to-end field service management", "Coordinate mobile teams, manage visits and appointments, and keep every service connected from the field to the office.",
     _hp(0, "run", f"""<div class="w-full max-w-sm space-y-2 text-left">
                <div data-in="1" class="{_C} flex items-center gap-3 p-3">{_avatar("JK", "size-9")}<div class="flex-1"><p class="text-sm font-medium text-heading">J. Kelly &middot; HVAC</p><p class="text-xs text-muted">Job #4821 &middot; Level 3, North Sydney</p></div></div>
                <div data-in="2" class="{_C} px-3 py-1">{_HP}<ul class="divide-y divide-line">{_steps_(["Request logged", "Dispatched", "On site", "Completed &amp; signed"])}</ul></div>
              </div>""")),
    ("CRM", "A complete client relationship record", "Centralise every client interaction, service history, and communication in one place — giving every team member the context they need.",
     _hp(1, "audit", f"""<div class="w-full max-w-sm text-left">
                <div data-in="1" class="{_C} overflow-hidden">
                  <div class="flex items-center gap-3 border-b border-line p-3">{_avatar("EL", "size-9")}<div><p class="text-sm font-medium text-heading">E. Lane</p><p class="text-xs text-muted">Client since 2021 &middot; 3 services</p></div></div>
                  <ul data-pool='{__import__("json").dumps([["Call logged", "Service review · 2 min ago"], ["Email sent", "Care plan summary · today"], ["Visit completed", "Personal care · yesterday"], ["Case closed", "Billing query · Mon"]])}' class="min-h-[10.5rem]">
                    {"".join(f'<li class="flex items-center gap-3 border-b border-line px-3 py-2.5 last:border-b-0"><span class="size-1.5 shrink-0 bg-accent"></span><div class="min-w-0 flex-1"><p data-a class="truncate text-sm text-heading">{a}</p><p data-b class="text-xs text-muted">{b}</p></div></li>' for a, b in [("Call logged", "Service review &middot; 2 min ago"), ("Email sent", "Care plan summary &middot; today"), ("Visit completed", "Personal care &middot; yesterday")])}
                  </ul>
                </div>
              </div>""")),
    ("Customer Insights", "Turn service data into operational intelligence", "Unified data from care records, rostering, and field operations — surfaced as live dashboards that show what's working and where to act.",
     _hp(2, "count", f"""<div class="w-full max-w-sm space-y-2 text-left">
                <div class="grid grid-cols-3 gap-2">{"".join(f'<div data-in="{k}" class="{_C} p-2.5"><p class="text-[10px] text-muted">{lab}</p><p class="mt-1 font-heading text-lg text-heading" data-count="{n}" data-suffix="{suf}">0{suf}</p></div>' for k, (lab, n, suf) in enumerate([("Demand", 3120, ""), ("Fill rate", 97, "%"), ("NPS", 64, "")], 1))}</div>
                <div data-in="4" class="{_C} p-3"><p class="text-[10px] text-muted">Visits vs capacity &middot; 12 weeks</p><svg viewBox="0 0 300 70" class="mt-1 h-16 w-full" fill="none" aria-hidden="true"><path class="spark" d="M0 52 L27 48 L54 50 L81 40 L108 44 L135 34 L162 36 L189 26 L216 30 L243 20 L270 18 L300 10" stroke="#1d96fc" stroke-width="2.5" stroke-linecap="round"/><path d="M0 30 H300" stroke="#e2e8f0" stroke-dasharray="4 4"/></svg></div>
              </div>""")),
    ("Customer Experience", "Consistent service quality at every touchpoint", "From first contact through ongoing delivery, every interaction is tracked, measured, and optimised for consistent service quality.",
     _hp(3, "run", f"""<div class="w-full max-w-sm space-y-2 text-left">
                <div data-in="1" class="{_C} flex items-center justify-between p-3"><div><p class="text-xs text-muted">Satisfaction &middot; last 30 days</p><p class="font-heading text-2xl text-heading">4.8 <span class="text-sm text-muted">/ 5</span></p></div><span class="flex gap-0.5 text-[#ffad6e]">{"&#9733;" * 5}</span></div>
                <div data-in="2" class="{_C} px-3 py-1">{_HP}<ul class="divide-y divide-line">{_steps_(["Enquiry answered &lt; 1h", "Onboarding call", "First visit on time", "Follow-up survey"])}</ul></div>
              </div>""")),
]

INDUSTRY_TINTS = {"health-social-care": "#f7edf3", "facilities-management": "#ebfbe3", "local-government": "#f5f6ee", "industrial-services": "#f4f8f9", "energy-utilities": "#dfeacd"}
HOME_INDUSTRIES = [
    ("Health &amp; Social Care", "Coordinate complex care delivery, multidisciplinary teams, and compliance-heavy service operations.",
     _hp(0, "run", f"""<div class="w-full max-w-sm space-y-2 text-left">
                <div data-in="1" class="{_C} flex items-center justify-between p-3"><div><p class="text-sm font-medium text-heading">Care team &middot; M. Turner</p><p class="text-xs text-muted">Nurse &middot; OT &middot; Support worker</p></div><div class="flex -space-x-2">{_avatar("PS", "size-7 border-2 border-white")}{_avatar("JK", "size-7 border-2 border-white")}{_avatar("EL", "size-7 border-2 border-white")}</div></div>
                <div data-in="2" class="{_C} px-3 py-1">{_HP}<ul class="divide-y divide-line">{_steps_(["Care plan reviewed", "Funding rules checked", "Incident register clear"])}</ul></div>
              </div>""")),
    ("Facilities Management", "Dispatch field teams efficiently, manage SLAs, and maintain visibility across sites and clients.",
     _hp(1, None, f"""<div data-in="1" class="{_C} w-full max-w-sm p-4 text-left">
                <p class="text-sm font-medium text-heading">SLA by site</p>
                <ul class="mt-3 space-y-3">{"".join(f'<li><div class="flex justify-between text-xs"><span class="text-body">{s}</span><span class="tabular-nums {c}">{v}%</span></div><div class="mt-1 h-1.5 overflow-hidden rounded-full bg-tint"><span class="hbar block h-full origin-left rounded-full {b}" style="width:{v}%;transition-delay:{k * 120}ms"></span></div></li>' for k, (s, v, c, b) in enumerate([("Westfield Tower", 98, "text-emerald-700", "bg-emerald-600"), ("Harbour Campus", 94, "text-emerald-700", "bg-emerald-600"), ("North Depot", 81, "text-[#c2410c]", "bg-[#ffad6e]")]))}</ul>
              </div>""")),
    ("Local Government", "Support frontline service delivery with clear case management, workforce coordination, and audit trails.",
     _hp(2, "audit", f"""<div class="w-full max-w-sm text-left">
                <div data-in="1" class="{_C} overflow-hidden">
                  <div class="flex items-center justify-between border-b border-line px-3 py-2.5"><p class="text-sm font-medium text-heading">Case #CR-2291 &middot; Footpath repair</p><span class="text-[10px] uppercase tracking-widest text-muted">Audit</span></div>
                  <ul data-pool='{__import__("json").dumps([["Crew assigned", "Roads team B · 09:12"], ["Resident notified", "SMS · 09:14"], ["Works completed", "Photos attached · 13:40"], ["Case closed", "Supervisor · 14:05"]])}' class="min-h-[10.5rem]">
                    {"".join(f'<li class="flex items-center gap-3 border-b border-line px-3 py-2.5 last:border-b-0"><span class="size-1.5 shrink-0 bg-accent"></span><div class="min-w-0 flex-1"><p data-a class="truncate text-sm text-heading">{a}</p><p data-b class="text-xs text-muted">{b}</p></div></li>' for a, b in [("Request received", "Online form &middot; 08:51"), ("Crew assigned", "Roads team B &middot; 09:12"), ("Resident notified", "SMS &middot; 09:14")])}
                  </ul>
                </div>
              </div>""")),
    ("Industrial Services", "Coordinate large-scale field operations, asset-linked work, and complex workforce logistics.",
     _hp(3, None, f"""<div class="relative flex w-full max-w-sm items-center gap-3 text-left">
                <div data-in="1" class="{_C} flex-1 p-3"><p class="text-[10px] uppercase tracking-widest text-muted">Work order</p><p class="text-sm font-medium text-heading">Pump overhaul</p><p class="mt-1 text-xs text-muted">Crew of 4 &middot; 2 shifts</p></div>
                <svg aria-hidden="true" viewBox="0 0 40 60" class="h-16 w-8 shrink-0"><path class="flow" d="M0 30 H40 M20 30 V8 H40 M20 30 V52 H40" stroke="#1d96fc" stroke-width="2" fill="none"/></svg>
                <ul class="flex flex-1 flex-col gap-2">{"".join(f'<li data-in="{k}" class="rounded-lg border border-line bg-white px-3 py-2 text-xs text-heading">{a}</li>' for k, a in enumerate(["Asset P-114", "Permit to work", "Lift plan"], 2))}</ul>
              </div>""")),
    ("Energy &amp; Utilities", "Manage asset-intensive service delivery, compliance, and workforce execution across critical networks.",
     _hp(4, None, f"""<div data-in="1" class="relative w-full max-w-sm overflow-hidden rounded-lg border border-line bg-white">
                <svg viewBox="0 0 320 170" class="block h-auto w-full" aria-hidden="true"><rect width="320" height="170" fill="#f9fafe"/><path d="M20 140 L90 90 L170 110 L240 50 L300 30" stroke="#0f1936" stroke-width="2" fill="none"/>{"".join(f'<rect x="{x - 6}" y="{y - 6}" width="12" height="12" rx="2" fill="#fff" stroke="#0f1936" stroke-width="2"/>' for x, y in [(20, 140), (90, 90), (170, 110), (240, 50), (300, 30)])}</svg>
                {"".join(f'<span class="{c} absolute flex size-7 items-center justify-center rounded-full border-2 border-white text-[9px] font-medium text-white" style="left:{x}%;top:{y}%;background:{bg}">{t}</span>' for c, x, y, t, bg in [("x-a", 24, 30, "C1", "#1d96fc"), ("x-b", 62, 48, "C2", "#00a98f")])}
                <div class="flex justify-between border-t border-line px-3 py-2 text-xs"><span class="text-body">5 assets &middot; 2 crews</span><span class="text-emerald-700">Inspections current</span></div>
              </div>""")),
]

_SOL_ORDER = ["#f9fafe", _mix("#1d96fc", 8)]
HOME_SOLUTION_PALETTES = {
    "a": ("Tint + accent", "Brand tint alternating with 8% accent.", _SOL_ORDER * 2),
    "b": ("Accent blues", "8% / 14% of accent #1d96fc.", [_mix("#1d96fc", 8), _mix("#1d96fc", 14)] * 2),
    "c": ("Brand tint", "All #f9fafe.", ["#f9fafe"] * 4),
    "d": ("Product-coded", "Frontline / CRM / Insights / Experience on Roster base, Care base, accent, Genogram base at 12%.", [_mix("#59bbf7", 14), _mix("#3b6fe0", 10), _mix("#1d96fc", 10), _mix("#91278c", 8)]),
    "e": ("Navy", "Care dark / navy.", ["#0f1936", "#152248"] * 2),
    "f": ("Outlined white", "White with a hairline border.", ["#ffffff"] * 4),
}
_IND = list(INDUSTRY_TINTS.values())
HOME_INDUSTRY_PALETTES = {
    "a": ("Sector tints", "The live per-sector tints (rose / mint / cream / ice / sage).", _IND),
    "b": ("Sector tints, softer", "Each sector tint mixed 50% with white.", [f"color-mix(in srgb, {c} 50%, white)" for c in _IND]),
    "c": ("Brand tint", "All #f9fafe - sector identity carried by the copy only.", ["#f9fafe"] * 5),
    "d": ("Accent blues", "8% / 14% of accent, alternating.", [_mix("#1d96fc", 8), _mix("#1d96fc", 14)] * 2 + [_mix("#1d96fc", 8)]),
    "e": ("Navy", "Care dark / navy.", ["#0f1936", "#152248"] * 2 + ["#0f1936"]),
    "f": ("Outlined white", "White with a hairline border.", ["#ffffff"] * 5),
}


def _kind(kind, html):
    return f'<div data-kind="{kind}">{html}</div>'


# ── Home · Solutions - set B (Paraform direction) ──────────────────────────
# After paraform.com/for-companies (How it works: full-bleed atmospheric image
# in a rounded card, one white UI card centred on it, a translucent blurred
# pill beneath) and Routable's stacked-list visual (one row lifted to white,
# the rest frosted). Frosted surfaces are white/70 + backdrop blur + a white
# hairline - no shadows. Pairs best with the hero-photo background option.

_FROST = "border border-white/60 bg-white/70 backdrop-blur-md"
_PILL = "flex items-center gap-2 rounded-full border border-white/40 bg-care-dark/30 px-4 py-2 text-xs text-white backdrop-blur-md"


def _icon_tile(svg_path, dark=False):
    return (f'<span class="flex size-11 shrink-0 items-center justify-center rounded-lg {"bg-white" if not dark else "bg-tint"}">'
            f'<svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="#1d96fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{svg_path}</svg></span>')


_ICONS = {
    "wrench": '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
    "calendar": '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
    "check": '<path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/>',
    "spark": '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
}

_ROWS = [("wrench", "Reactive jobs", "Dispatched to the nearest qualified engineer"), ("calendar", "Planned maintenance", "Recurring visits scheduled months ahead"), ("check", "Inspections", "Checklists, photos and sign-off in the field")]
B_FRONTLINE = _panel("#f9fafe", "run", f"""<div class="w-full max-w-md space-y-3 text-left">
                {_HIDDEN_PROGRESS}
                {"".join(f'''<div data-step data-state="{"now" if i == 1 else "next"}" class="group/st flex items-center gap-4 rounded-lg p-3 transition-all duration-500 {_FROST} data-[state=now]:scale-[1.04] data-[state=now]:bg-white data-[state=done]:bg-white/70">
                  {_icon_tile(_ICONS[ic], True)}
                  <div class="min-w-0 flex-1"><p class="text-sm font-medium text-heading">{t}</p><p class="truncate text-xs text-muted">{d}</p></div>
                  <span aria-hidden="true" class="text-muted">&rsaquo;</span>
                </div>''' for i, (ic, t, d) in enumerate(_ROWS))}
              </div>""")

B_CRM = _panel(_mix("#1d96fc", 8), None, f"""<div class="w-full max-w-[17rem] space-y-3 text-left">
                <div data-in="1" class="m-float relative aspect-[4/5] overflow-hidden rounded-lg border border-white/60">
                  <img src="{AV["EL"]}" alt="" class="absolute inset-0 size-full object-cover" />
                  <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4"><p class="text-base font-medium text-white">E. Lane</p><p class="text-xs text-white/75">Client since 2021 &middot; 3 services</p></div>
                </div>
                <div data-in="2" class="flex items-center gap-3 rounded-lg p-3 {_FROST}">
                  <span class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-white">&#10003;</span>
                  <div><p class="text-sm font-medium text-heading">Follow-up booked</p><p class="text-xs text-muted"><span class="font-medium text-heading">2 days</span> after last visit</p></div>
                </div>
              </div>""")

B_INSIGHTS = _panel("#f9fafe", None, f"""<div class="w-full max-w-sm space-y-3 text-left">
                <div data-in="1" class="rounded-lg border border-line bg-white p-5">
                  <p class="font-heading text-lg text-heading">Build a report</p>
                  <p class="mt-3 rounded-lg border border-line px-3 py-2.5 text-sm text-heading">Service demand by region</p>
                  <p class="mt-4 text-sm font-medium text-heading">Period</p>
                  <div class="mt-1 flex justify-between text-[10px] text-muted"><span>Jan</span><span>Dec</span></div>
                  <div class="relative mt-1 h-4"><span class="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-line"></span><span class="x-range absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-heading"></span><span class="absolute left-0 top-1/2 size-3 -translate-y-1/2 rounded-full bg-heading"></span><span class="x-handle absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-heading"></span></div>
                  <div class="mt-5 flex items-center justify-between"><span class="text-xs text-muted">&#8615; Export to Power BI</span><span class="rounded-full bg-care-dark px-4 py-2 text-xs font-medium text-white">Run report</span></div>
                </div>
                <p data-in="2" class="{_PILL}"><span class="size-1.5 rounded-full bg-[#59bbf7]"></span>Ask Copilot about this data <span aria-hidden="true" class="ml-auto">&rsaquo;</span></p>
              </div>""")

B_EXPERIENCE = _panel(_mix("#1d96fc", 8), "run", f"""<div class="w-full max-w-sm space-y-3 text-left">
                {_HIDDEN_PROGRESS}
                <div data-in="1" class="rounded-lg p-4 {_FROST}">
                  <div class="flex items-center gap-3">{_avatar("JK", "size-10")}<div><p class="text-sm font-medium text-heading">R. Okafor</p><p class="text-xs text-muted">After visit &middot; Personal care</p></div></div>
                  <p class="mt-3 text-sm leading-relaxed text-body">&ldquo;Arrived on time and took the time to explain everything.&rdquo;</p>
                  <div class="mt-3 flex gap-1 text-lg">{"".join('<span data-step data-state="next" class="text-line transition-colors duration-300 data-[state=done]:text-[#ffad6e] data-[state=now]:text-[#ffad6e]">&#9733;</span>' for _ in range(5))}</div>
                </div>
                <p data-in="2" class="{_PILL}"><span class="size-1.5 rounded-full bg-emerald-400"></span>Feedback received &middot; CSAT 4.8 <span aria-hidden="true" class="ml-auto">&rsaquo;</span></p>
              </div>""")

HOME_SOLUTIONS_B = [B_FRONTLINE, B_CRM, B_INSIGHTS, B_EXPERIENCE]

# Solution hero photos (lib/solutions-content.ts) for the photo-background
# option. Two are Unsplash+ premium: without a licence they render watermarked.
HOME_SOLUTION_PHOTOS = [
    "https://plus.unsplash.com/premium_photo-1681967118118-586c2408d0fc?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1748609160056-7b95f30041f0?auto=format&fit=crop&w=1200&q=80",
    "https://plus.unsplash.com/premium_photo-1682126285167-4bbf25c628c6?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1586936893354-362ad6ae47ba?auto=format&fit=crop&w=1200&q=80",
]

HOME_B_CSS = """<style>
  @keyframes x-handle { 0%, 100% { left: 46%; } 50% { left: 82%; } }
  @keyframes x-range { 0%, 100% { width: 46%; } 50% { width: 82%; } }
  .fv .x-handle { left: 46%; } .fv .x-range { width: 46%; }
  .fv.is-in .x-handle { animation: x-handle 5s ease-in-out infinite; }
  .fv.is-in .x-range { animation: x-range 5s ease-in-out infinite; }
  /* Photo background mode: panels carry the solution hero image. */
  .fv[data-photo] { background-size: cover !important; background-position: center !important; }
  @media (prefers-reduced-motion: reduce) { .fv .x-handle, .fv .x-range { animation: none !important; } }
</style>"""

GALLERY_PAGES = [
    ("care", "SognosCare", CARE_PALETTES, FV_DEFAULT,
     _kind("graphics", _gal_head("SognosCare &middot; Features", "Six feature panels.")
           + _grid([_fig(FEATS[i][1], v) for i, v in enumerate(_tag("care", FEATURE_VIS))]))),
    ("roster", "SognosRoster", ROSTER_PALETTES, "a",
     _kind("hero", _gal_head("SognosRoster &middot; Hero options", "A: field photo + Shift matched + today&rsquo;s stats. B: live schedule board + unavailable alert + Copilot.")
           + _hero_label("Option A &middot; photo") + ROSTER_HERO_A + _hero_label("Option B &middot; live schedule") + ROSTER_HERO_B)
     + _kind("graphics", _gal_head("SognosRoster &middot; Features", "Six feature panels.")
           + _grid([_fig(t, v) for (t, _), v in zip(ROSTER_FV, _tag("roster", [v for _, v in ROSTER_FV]))]))),
    ("frontline", "Solutions &middot; Frontline", FRONTLINE_PALETTES, "a",
     _kind("hero", _gal_head("Solutions &middot; Frontline &middot; Hero options", "A: industrial photo + Job dispatched + live field status. B: live operations map + SLA alert.")
           + _hero_label("Option A &middot; photo") + FRONTLINE_HERO_A + _hero_label("Option B &middot; live map") + FRONTLINE_HERO_B)
     + _kind("graphics", _gal_head("Solutions &middot; Frontline &middot; Capabilities", "Compact capability cards: visual + title + live copy.")
           + _grid([capability_card(t, b, v) for (t, b, _), v in zip(FRONTLINE_CAPS, _tag("frontline", [v for _, _, v in FRONTLINE_CAPS]))], "md:grid-cols-2 lg:grid-cols-3"))),
    ("home-solutions", "Home &middot; Solutions", HOME_SOLUTION_PALETTES, "a",
     _kind("graphics", _gal_head("Home &middot; Solutions", "Replaces the /dev/ payout visuals (third-party) in SolutionsSection. Live headlines + body.")
           + _grid([f'<figure class="space-y-3"><figcaption class="text-sm font-medium text-heading">{lab}</figcaption>{capability_card(h, b, v)}</figure>' for (lab, h, b, _), v in zip(HOME_SOLUTIONS, _tag("home-solutions", [v for *_, v in HOME_SOLUTIONS]))])
           + _gal_head("Home &middot; Solutions &middot; Set B (Paraform direction)", "One white or frosted UI card on an atmospheric panel, a blurred pill beneath; Routable stacked list for Frontline. Try it with Background: Hero photo.")
           + _grid([f'<figure class="space-y-3"><figcaption class="text-sm font-medium text-heading">{lab} &middot; B</figcaption>{capability_card(h, b, v)}</figure>' for (lab, h, b, _), v in zip(HOME_SOLUTIONS, _tag("home-solutions", HOME_SOLUTIONS_B))]))),
    ("home-industries", "Home &middot; Industries", HOME_INDUSTRY_PALETTES, "a",
     _kind("graphics", _gal_head("Home &middot; Industries", "Replaces the /dev/ stock mocks in IndustrySection. Live sector names + descriptions; default palette = the live sector tints.")
           + _grid([capability_card(n, d, v) for (n, d, _), v in zip(HOME_INDUSTRIES, _tag("home-industries", [v for *_, v in HOME_INDUSTRIES]))], "md:grid-cols-2 lg:grid-cols-3"))),
]

HOME_CSS = """<style>
  .fv .hbar { transform: scaleX(0); transition: transform .9s cubic-bezier(.22,1,.36,1); }
  .fv.is-in .hbar { transform: scaleX(1); }
  @media (prefers-reduced-motion: reduce) { .fv .hbar { transform: none !important; transition: none !important; } }
</style>"""

PAGE_PHOTOS = {"home-solutions": HOME_SOLUTION_PHOTOS}
_pal_data = {key: {"default": dflt, "photos": PAGE_PHOTOS.get(key, []), "palettes": {k: {"name": n, "note": d, "colours": cols} for k, (n, d, cols) in pals.items()}} for key, _, pals, dflt, _ in GALLERY_PAGES}
_btn = "rounded-full border border-line px-3 py-1.5 text-xs text-heading transition-colors hover:border-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white"
GALLERY_MENU = f"""<div class="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
  <div class="mx-auto max-w-7xl space-y-3 px-6 py-3">
    <nav aria-label="Pages" class="flex flex-wrap items-center gap-2">
      <p class="mr-2 text-sm font-medium text-heading">Page</p>
      <button type="button" data-page-pick="all" class="{_btn}" aria-pressed="false">All</button>
      {"".join(f'<button type="button" data-page-pick="{key}" class="{_btn}" aria-pressed="false">{label}</button>' for key, label, *_ in GALLERY_PAGES)}
    </nav>
    <div class="flex flex-wrap items-center gap-2">
      <p class="mr-2 text-sm font-medium text-heading">Show</p>
      <button type="button" data-kind-pick="hero" class="{_btn}" aria-pressed="true">Heroes</button>
      <button type="button" data-kind-pick="graphics" class="{_btn}" aria-pressed="true">Graphics</button>
    </div>
    {"".join(f'''<div data-pal-row="{key}" class="flex flex-wrap items-center gap-2">
      <p class="mr-2 text-sm font-medium text-heading">{label} panels</p>
      {"".join(f'<button type="button" data-pal-pick="{key}:{k}" title="{d}" class="flex items-center gap-2 {_btn}" aria-pressed="false"><span class="flex -space-x-1">' + "".join(f'<span class="size-3 rounded-full border border-white" style="background:{c}"></span>' for c in cols[:2]) + f'</span>{chr(65 + n)} &middot; {name}</button>' for n, (k, (name, d, cols)) in enumerate(pals.items()))}
      <p data-pal-note="{key}" class="w-full text-xs text-muted"></p>
      {(f'<div class="flex w-full flex-wrap items-center gap-2"><p class="mr-2 text-sm font-medium text-heading">{label} background</p><button type="button" data-bg-pick="{key}:colour" class="{_btn}" aria-pressed="true">Panel colour</button><button type="button" data-bg-pick="{key}:photo" class="{_btn}" aria-pressed="false">Hero photo</button></div>') if key in PAGE_PHOTOS else ""}
    </div>''' for key, label, pals, *_ in GALLERY_PAGES)}
  </div>
</div>
<script>
  (() => {{
    const DATA = {__import__("json").dumps(_pal_data)};
    const store = {{ get: (k) => {{ try {{ return localStorage.getItem(k); }} catch {{ return null; }} }}, set: (k, v) => {{ try {{ localStorage.setItem(k, v); }} catch {{}} }} }};
    // Panel colours per page.
    const photoMode = {{}};
    const applyPal = (page, key) => {{
      const pal = DATA[page].palettes[key]; if (!pal) return;
      const photos = DATA[page].photos || [];
      document.querySelectorAll(`[data-pal-page="${{page}}"]`).forEach((el) => {{
        const i = +el.dataset.palI;
        const c = pal.colours[i % pal.colours.length];
        if (photoMode[page] && photos[i]) {{
          el.style.background = `linear-gradient(rgb(15 25 54 / .18), rgb(15 25 54 / .18)), url("${{photos[i]}}")`;
          el.dataset.photo = ""; el.style.boxShadow = "";
        }} else {{
          el.style.background = c; delete el.dataset.photo;
          el.style.boxShadow = c === "#ffffff" ? "inset 0 0 0 1px #e2e8f0" : "";
        }}
      }});
      DATA[page].current = key;
      document.querySelectorAll(`[data-pal-pick^="${{page}}:"]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.palPick === `${{page}}:${{key}}`)));
      document.querySelector(`[data-pal-note="${{page}}"]`).textContent = pal.note;
      store.set(`sognos-pal-${{page}}`, key);
    }};
    document.querySelectorAll("[data-pal-pick]").forEach((b) => b.addEventListener("click", () => {{ const [p, k] = b.dataset.palPick.split(":"); applyPal(p, k); }}));
    document.querySelectorAll("[data-bg-pick]").forEach((b) => b.addEventListener("click", () => {{
      const [p, mode] = b.dataset.bgPick.split(":");
      photoMode[p] = mode === "photo"; store.set(`sognos-bg-${{p}}`, mode);
      document.querySelectorAll(`[data-bg-pick^="${{p}}:"]`).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      applyPal(p, DATA[p].current || DATA[p].default);
    }}));
    Object.keys(DATA).forEach((p) => {{
      if (store.get(`sognos-bg-${{p}}`) === "photo") {{ photoMode[p] = true; document.querySelectorAll(`[data-bg-pick^="${{p}}:"]`).forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.bgPick.endsWith(":photo")))); }}
      applyPal(p, store.get(`sognos-pal-${{p}}`) || DATA[p].default);
    }});
    // Show / hide heroes and graphics (independent of the page filter).
    const kinds = {{ hero: store.get("sognos-show-hero") !== "0", graphics: store.get("sognos-show-graphics") !== "0" }};
    const applyKinds = () => {{
      document.querySelectorAll("[data-kind]").forEach((el) => el.hidden = !kinds[el.dataset.kind]);
      document.querySelectorAll("[data-kind-pick]").forEach((b) => b.setAttribute("aria-pressed", String(kinds[b.dataset.kindPick])));
    }};
    document.querySelectorAll("[data-kind-pick]").forEach((b) => b.addEventListener("click", () => {{
      const k = b.dataset.kindPick; kinds[k] = !kinds[k]; store.set(`sognos-show-${{k}}`, kinds[k] ? "1" : "0"); applyKinds();
    }}));
    applyKinds();
    // Page filter.
    const showPage = (page) => {{
      document.querySelectorAll("[data-gallery-page]").forEach((s) => s.hidden = page !== "all" && s.dataset.galleryPage !== page);
      document.querySelectorAll("[data-pal-row]").forEach((r) => r.hidden = page !== "all" && r.dataset.palRow !== page);
      document.querySelectorAll("[data-page-pick]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.pagePick === page)));
      store.set("sognos-gallery-page", page);
      if (location.hash.slice(1) !== page) history.replaceState(null, "", `#${{page}}`);
    }};
    document.querySelectorAll("[data-page-pick]").forEach((b) => b.addEventListener("click", () => {{ showPage(b.dataset.pagePick); scrollTo({{ top: 0 }}); }}));
    showPage(location.hash.slice(1) || store.get("sognos-gallery-page") || "care");
  }})();
</script>"""

GALLERY = (
    FV_CSS + XTRA_CSS + MOTION_CSS + HOME_CSS + HOME_B_CSS + GALLERY_MENU
    + "".join(f'<section data-gallery-page="{key}" class="pb-16">{body}</section>' for key, _, _, _, body in GALLERY_PAGES)
    + FV_JS + MOTION_JS
)
page("04b-feature-visuals.html", "Sognos - Feature + hero visuals", "Visuals gallery: page filter (Care / Roster / Frontline / Home Solutions / Home Industries - extend via GALLERY_PAGES), show/hide heroes + graphics + per-page panel colour selector. Motion graphics after routable.com/product/ap-automation and helloaria.eu. Card data is illustrative.", GALLERY)

# ── index ──────────────────────────────────────────────────────────────────
# Index colour picker: floating panel that recolours the Features cards and
# the graphics inside them, independently. Graphics reuse the Care palettes;
# cards get their own (card surfaces sit on white, so lighter steps).
CARD_PALETTES = {
    "a": ("Tint, alternating", "Brand tint full / 50% (current).", ["#f9fafe", "color-mix(in srgb, #f9fafe 50%, white)"]),
    "b": ("Tint, solid", "Brand tint on every card.", ["#f9fafe"]),
    "c": ("White + border", "White cards with a hairline border.", ["#ffffff"]),
    "d": ("Care blue wash", "3% / 5% of Care base #3b6fe0.", [_mix("#3b6fe0", 3), _mix("#3b6fe0", 5)]),
    "e": ("Grey tint", "Previous brand tint #f0eff2 / 50%.", ["#f0eff2", "color-mix(in srgb, #f0eff2 50%, white)"]),
    "f": ("Navy", "Care dark #0f1936 cards - card copy flips to white.", ["#0f1936"]),
}
_ip = {
    "cards": {"default": "a", "palettes": {k: {"name": n, "note": d, "colours": c} for k, (n, d, c) in CARD_PALETTES.items()}},
    "graphics": {"default": FV_DEFAULT, "palettes": {k: {"name": n, "note": d, "colours": c} for k, (n, d, c) in FV_PALETTES.items()}},
}
_ib = "flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-heading transition-colors hover:border-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white"


def _ipick_row(grp, title, pals):
    btns = "".join(
        f'<button type="button" data-ipick="{grp}:{k}" title="{d}" class="{_ib}" aria-pressed="false"><span class="flex -space-x-1">'
        + "".join(f'<span class="size-3 rounded-full border border-line" style="background:{c}"></span>' for c in cols[:2])
        + f"</span>{chr(65 + n)}</button>"
        for n, (k, (_, d, cols)) in enumerate(pals.items())
    )
    return (
        f'<div class="mt-3 space-y-2 border-t border-line pt-3">'
        f'<p class="text-xs font-medium uppercase tracking-widest text-muted">{title}</p>'
        f'<div class="flex flex-wrap gap-1.5">{btns}</div>'
        f'<p data-inote="{grp}" class="text-xs text-muted"></p></div>'
    )


INDEX_PICKER = (
    '<details class="group fixed bottom-4 right-4 z-[60] w-[min(92vw,26rem)] rounded-lg border border-line bg-white text-left open:p-4">'
    '<summary class="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-heading group-open:p-0 [&::-webkit-details-marker]:hidden">'
    'Feature colours <span aria-hidden="true" class="transition-transform group-open:rotate-180">&#9662;</span></summary>'
    + _ipick_row("cards", "Cards", CARD_PALETTES)
    + _ipick_row("graphics", "Graphics", FV_PALETTES)
    + "</details>"
    + """<script>
  (() => {
    const DATA = """ + __import__("json").dumps(_ip) + """;
    const store = { get: (k) => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };
    const targets = { cards: "[data-card-i]", graphics: "[data-fv]" };
    const apply = (grp, key) => {
      const pal = DATA[grp].palettes[key]; if (!pal) return;
      document.querySelectorAll(targets[grp]).forEach((el) => {
        const i = +(el.dataset.cardI ?? el.dataset.fv);
        const c = pal.colours[i % pal.colours.length];
        el.style.background = c;
        el.style.boxShadow = c === "#ffffff" ? "inset 0 0 0 1px #e2e8f0" : "";
        if (grp === "cards") el.classList.toggle("is-dark-card", c === "#0f1936");
      });
      document.querySelectorAll(`[data-ipick^="${grp}:"]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.ipick === `${grp}:${key}`)));
      document.querySelector(`[data-inote="${grp}"]`).textContent = `${pal.name} - ${pal.note}`;
      store.set(`sognos-index-${grp}`, key);
    };
    document.querySelectorAll("[data-ipick]").forEach((b) => b.addEventListener("click", () => { const [g, k] = b.dataset.ipick.split(":"); apply(g, k); }));
    Object.keys(DATA).forEach((g) => apply(g, store.get(`sognos-index-${g}`) || DATA[g].default));
  })();
</script>
<style>
  /* Navy cards: the card's own copy (not the graphic) flips to the dark ladder. */
  .is-dark-card > div:first-child h3 { color: #fff; }
  .is-dark-card > div:first-child p { color: rgb(255 255 255 / .75); }
  .is-dark-card > div:first-child p:first-child { color: #59bbf7; }
</style>"""
)

INDEX = "\n\n".join([SUBNAV, motion_hero("a"), problems("a"), FEATURES, EDITIONS, ADVANTAGES, STORIES, INDEX_PICKER])
page("index.html", "SognosCare - polish pass mockups (recommended variants)",
     """All sections in page order: hero = motion option A (01m-hero-a: photo + Visit card + typing Copilot note, logo row), Q3-A centred problem band. One type/spacing scale (T) across every section.
Alternates: 01-hero-b.html (Sofia Pro), 03-problems-b.html (problem on the rail).
Audit: docs/audits/sognoscare-polish-audit.md. Global Navbar / CTABand / Footer are out of scope and not mocked.""",
     INDEX)

print("\n".join(sorted(p.name for p in OUT.glob("*.html"))))
