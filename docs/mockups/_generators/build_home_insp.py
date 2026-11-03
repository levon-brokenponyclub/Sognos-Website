"""Home page mockup with the products Inspector drawer + options gallery.
  python3 -I <this file> docs/mockups/sognoscare docs/mockups/home docs/mockups/products
Every home section gets three options in the page-wide system (A · Split light /
B · Immersive dark / C · Editorial soft) plus the existing home options kept as extra
layouts. Audit: docs/audits/home-audit.md. Built by archive_insp.py.
"""
import re
import runpy
import atexit
import shutil
import sys
import tempfile
from datetime import date
from pathlib import Path

CARE, OUT_DIR, PR_DIR = sys.argv[1:4]
HERE = Path(__file__).parent
LIB_OUT = tempfile.mkdtemp(prefix="sognos-mockups-lib-")  # library runs of other generators write their own pages here, not into the repo
atexit.register(shutil.rmtree, LIB_OUT, True)
sys.argv = [sys.argv[0], CARE, OUT_DIR]
HM = runpy.run_path(str(HERE / "build_home.py"))
sys.argv = [sys.argv[0], CARE, LIB_OUT]
KH = runpy.run_path(str(HERE / "build_kh.py"))  # library: Sanity posts + image URLs
sys.argv = [sys.argv[0], CARE, LIB_OUT]
CS = runpy.run_path(str(HERE / "build_cs.py"))  # library: customer stories
sys.argv = [sys.argv[0], CARE, PR_DIR]
BP = runpy.run_path(str(HERE / "build_products.py"))  # library mode
sys.argv = [sys.argv[0], CARE, LIB_OUT, LIB_OUT]
HS = runpy.run_path(str(HERE / "build_hsc.py"))  # library: Other-industries helpers (section files go to lib-out)
AR = runpy.run_path(str(HERE / "archive_insp.py"))
ns = HM["ns"]
page, P, T = HM["page"], HM["P"], HM["T"]
page.__globals__["OUT"] = Path(OUT_DIR)
eyebrow, book, sales, FOCUS, ARR = BP["eyebrow"], BP["book"], BP["sales"], BP["FOCUS"], BP["ARR"]
SEC = "py-20 md:py-28"
W = "mx-auto max-w-7xl px-6"
H1 = HM["H1_SPANS"]
SUB = HM["SUB"]
PRODUCTS = HM["PRODUCTS"]
LOGOS = HM["LOGOS"]
ARW = '<span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">&rarr;</span>'


def h2(t, dark=False, cls=""):
    return f'<h2 class="{T["h2"]} {"text-white" if dark else "text-heading"} text-balance {cls}">{t}</h2>'


def photo(src, cls=""):
    return f'<img src="{src}" alt="" class="absolute inset-0 size-full object-cover {cls}" />'


PHOTO = {p["name"]: f'{P}/product/{p["photo"]}' for p in PRODUCTS}
PLOGO = {p["name"]: p["logo"] for p in PRODUCTS}

# ── 1 · Hero ──────────────────────────────────────────────────────────────────
HERO_CARD = ('<div data-keep class="absolute inset-x-4 bottom-4 rounded-lg border border-line bg-white p-4 sm:inset-x-auto sm:left-5 sm:w-[21rem] lg:p-5">'
             '<p class="text-xs text-muted">One platform</p><p class="mt-1 font-heading text-lg text-heading">Demand &middot; Workforce &middot; Outcomes</p><ul class="mt-3">'
             + "".join(f'<li class="flex items-center justify-between gap-3 border-t border-line py-2.5"><span class="flex items-center gap-2.5 text-sm text-heading"><span class="size-2 rounded-full" style="background:{p["acc"]}"></span>{p["name"]}</span>'
                       f'<span class="flex items-center gap-1.5 text-xs text-muted"><span class="size-1.5 animate-pulse rounded-full bg-emerald-500"></span>{s}</span></li>'
                       for p, s in zip(PRODUCTS, ["142 visits today", "38 shifts filled", "64 networks mapped"])) + "</ul></div>")
HERO_A = f'''<section class="bg-white pt-36 pb-20 md:pt-44 md:pb-28"><div class="{W} grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
  <div class="flex flex-col items-start gap-5 lg:col-span-6">{eyebrow("Sognos platform")}
    <h1 class="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-heading text-balance sm:text-5xl lg:text-6xl">{H1}</h1>
    <p class="{T["herosub"]} text-body">{SUB}</p>
    <div class="mt-2 flex flex-wrap items-center gap-3">{book("bg-heading text-white hover:bg-[var(--p-base)]")}{sales("text-heading").replace("Talk to Sales", "Explore products")}</div></div>
  <div class="lg:col-span-6"><div class="relative aspect-[4/5] max-h-[560px] w-full overflow-hidden rounded-lg bg-[var(--p-soft)] lg:aspect-auto lg:h-[560px]">{photo(PHOTO["SognosCare"])}<div class="p-wash absolute inset-0"></div>{HERO_CARD}</div></div>
</div></section>'''
HERO_B = f'''<section class="relative overflow-hidden bg-[var(--p-deep)] pt-36 pb-16 text-white md:pt-44 md:pb-24">
  <div aria-hidden="true" class="p-glow absolute inset-0"></div><div aria-hidden="true" class="p-grid absolute inset-0"></div>
  <div class="relative {W}"><div class="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center">{eyebrow("Sognos platform", True).replace("flex items-center", "inline-flex items-center")}
    <h1 class="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-balance sm:text-5xl lg:text-7xl">{H1}</h1>
    <p class="max-w-2xl text-lg leading-relaxed text-white/75 text-pretty">{SUB}</p>
    <div class="mt-2 flex flex-wrap items-center justify-center gap-3">{book("bg-white text-heading hover:bg-[var(--p-base)] hover:text-white")}{sales("text-white").replace("Talk to Sales", "Explore products")}</div></div>
    <div class="mt-14 grid grid-cols-1 gap-3 md:mt-20 md:grid-cols-3 lg:gap-4">{"".join(f'<div data-keep class="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10">{photo(PHOTO[p["name"]])}<div class="absolute inset-0 bg-gradient-to-t from-[var(--p-deep)] via-transparent to-transparent"></div><span class="absolute bottom-4 left-4 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white backdrop-blur-md">{p["name"]}</span></div>' for p in PRODUCTS)}</div>
  </div></section>'''
HERO_C = f'''<section class="relative overflow-hidden bg-[var(--p-soft)] pt-36 pb-20 md:pt-44 md:pb-28"><div class="{W} grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
  <div class="flex flex-col items-start gap-6 lg:col-span-8">{eyebrow("Sognos platform")}
    <h1 class="font-heading text-5xl font-normal leading-[1.02] tracking-[-0.03em] text-heading text-balance md:text-7xl">{H1}</h1>
    <p class="{T["herosub"]} text-body">{SUB}</p><div class="flex flex-wrap items-center gap-3">{book("bg-[var(--p-base)] text-white hover:bg-heading")}{sales("text-heading").replace("Talk to Sales", "Explore products")}</div></div>
  <div class="flex flex-col justify-end gap-4 lg:col-span-4"><p class="font-heading text-2xl text-heading">Products</p><p class="text-sm text-muted">Standalone, or together on one data layer</p>
    <ul class="border-t border-line">{"".join(f'<li><a href="#" class="group flex min-h-12 items-center justify-between gap-4 border-b border-line py-3 text-heading {FOCUS}"><span class="flex items-center gap-3"><span class="text-xs tabular-nums text-muted">{i:02d}</span>{p["name"]}</span><span class="text-[var(--p-base)]">{ARW}</span></a></li>' for i, p in enumerate(PRODUCTS, 1))}</ul></div>
</div>
<div class="relative {W} mt-16"><div class="relative aspect-[16/9] overflow-hidden rounded-lg md:aspect-[21/8]">{photo(PHOTO["SognosRoster"])}<div class="absolute inset-0" style="background:linear-gradient(90deg, color-mix(in srgb, var(--p-dark) 70%, transparent), transparent 60%)"></div>
  <p data-keep class="absolute bottom-6 left-6 max-w-sm font-heading text-2xl text-white md:bottom-10 md:left-10 md:text-3xl">Manage demand. Coordinate workforce. Track outcomes.</p></div></div></section>'''
LIVE_SHELL = lambda inner, attrs="": f'<div data-img="paraform" {attrs}><section class="relative overflow-hidden bg-[var(--navy)] pt-40 md:pt-44">{HM["GLOW"]}<div class="relative z-40 {W} pb-16 md:pb-24">{inner}</div></section></div>'
HERO_LA = LIVE_SHELL(HM["HERO_A"])
HERO_LB = LIVE_SHELL(HM["HERO_B"])

# ── 2 · Product cards ─────────────────────────────────────────────────────────
def pcard_a(p):
    return (f'<a href="#" class="group flex flex-col gap-5 rounded-lg border border-line bg-white p-3 transition-colors hover:border-heading {FOCUS}">'
            f'<div class="relative aspect-[4/3] overflow-hidden rounded">{photo(PHOTO[p["name"]], "transition-transform duration-700 group-hover:scale-[1.03]")}<div class="absolute inset-0" style="background:linear-gradient(160deg, color-mix(in srgb, {p["deep"]} 55%, transparent), color-mix(in srgb, {p["mid"]} 30%, transparent))"></div>'
            f'<span data-keep class="absolute left-4 top-4 rounded border border-white/30 bg-white/10 px-3 py-2 backdrop-blur-md"><img src="{P}/logos/{p["logo"]}" alt="" class="h-6 w-auto" /></span></div>'
            f'<div class="flex flex-1 flex-col gap-3 px-3 pb-3"><span aria-hidden="true" class="block h-1 w-10 rounded-full" style="background:{p["acc"]}"></span><h3 class="{T["h3sm"]} text-heading">{p["name"]}</h3>'
            f'<p class="{T["small"]} text-body"><span class="text-heading">{p["lead"]}</span>{p["rest"]}</p><span class="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-heading">Explore {p["name"]} {ARW}</span></div></a>')


CARDS_A = f'''<section class="bg-white {SEC}"><div class="{W}"><div class="flex max-w-3xl flex-col gap-4">{eyebrow("Products")}{h2("Three products. One platform.")}</div>
  <div class="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">{"".join(pcard_a(p) for p in PRODUCTS)}</div></div></section>'''
c, r, g = PRODUCTS


def bento(p, big):
    return (f'<a href="#" class="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-lg border border-white/10 {"md:col-span-2 md:row-span-2 md:min-h-[560px]" if big else ""} {FOCUS}">'
            f'{photo(PHOTO[p["name"]], "transition-transform duration-700 group-hover:scale-[1.03]")}<div class="absolute inset-0" style="background:linear-gradient(180deg, transparent 20%, color-mix(in srgb, {p["deep"]} 92%, transparent))"></div>'
            f'<div data-keep class="relative p-6 lg:p-8"><img src="{P}/logos/{p["logo"]}" alt="{p["name"]}" class="h-7 w-auto" /><p class="mt-4 max-w-md {T["small"] if not big else T["body"]} text-white/80"><span class="text-white">{p["lead"]}</span>{p["rest"]}</p>'
            f'<span class="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white">Explore {ARW}</span></div></a>')


CARDS_B = f'''<section class="bg-[var(--p-dark)] {SEC} text-white"><div class="{W}"><div class="flex max-w-3xl flex-col gap-4">{eyebrow("Products", True)}{h2("Three products. One platform.", True)}</div>
  <div class="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">{bento(c, True)}{bento(r, False)}{bento(g, False)}</div></div></section>'''
CARDS_C = f'''<section class="bg-white {SEC}"><div class="{W}"><div class="flex max-w-3xl flex-col gap-4">{eyebrow("Products")}{h2("Three products. One platform.")}</div>
  <ol class="mt-12 border-b border-line">{"".join(f'<li><a href="#" class="group grid grid-cols-1 items-center gap-4 border-t border-line py-8 md:grid-cols-[6rem_1fr_1.4fr_auto] md:gap-8 lg:py-10 {FOCUS}"><span class="font-heading text-4xl tabular-nums text-[var(--p-base)] md:text-5xl">{i:02d}</span><span class="font-heading text-2xl text-heading md:text-3xl">{p["name"]}</span><p class="{T["body"]} text-body"><span class="text-heading">{p["lead"]}</span>{p["rest"]}</p><span class="hidden size-11 items-center justify-center rounded-full border border-line text-heading transition-colors group-hover:border-[var(--p-base)] group-hover:bg-[var(--p-base)] group-hover:text-white md:flex">&rarr;</span></a></li>' for i, p in enumerate(PRODUCTS, 1))}</ol></div></section>'''
CARDS_LA = LIVE_SHELL(HM["CARDS_A"]).replace("pt-40 md:pt-44", "pt-16 md:pt-20")
CARDS_LB = LIVE_SHELL(HM["CARDS_B"]).replace("pt-40 md:pt-44", "pt-16 md:pt-20")

# ── 3 · Trust strip ───────────────────────────────────────────────────────────
def lg(f, a, dark=False, h="max-h-8"):
    if not f:
        return f'<span class="font-heading text-lg font-semibold uppercase tracking-[0.2em] {"text-white" if dark else "text-heading"}">{a}</span>'
    return f'<img src="{P}/logos/clients/{f}" alt="{a}" class="h-auto {h} w-auto max-w-full object-contain brightness-0 {"invert" if dark else "opacity-70"}" />'


TRUST = HM["TRUST"]
TRUST_A = f'''<section class="border-y border-line bg-white py-12 md:py-16"><div class="{W} grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
  <p class="text-base text-heading lg:col-span-3">{TRUST}</p>
  <ul class="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-5 lg:col-span-9">{"".join(f'<li class="flex h-12 items-center justify-center">{lg(f, a)}</li>' for f, a in LOGOS)}</ul></div></section>'''
_row = "".join(f'<li class="flex h-16 w-48 shrink-0 items-center justify-center px-8">{lg(f, a, True)}</li>' for f, a in LOGOS)
TRUST_B = f'''<section class="bg-[var(--p-deep)] py-14 text-white md:py-20"><div class="{W} text-center"><p class="text-sm uppercase tracking-widest text-white/60">{TRUST}</p></div>
  <div class="relative mt-8 overflow-hidden"><div aria-hidden="true" class="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--p-deep)] to-transparent"></div><div aria-hidden="true" class="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--p-deep)] to-transparent"></div>
  <ul aria-label="Trusted by" class="h-marquee flex w-max">{_row}{_row.replace("<li class=", '<li aria-hidden="true" class=')}{_row.replace("<li class=", '<li aria-hidden="true" class=')}{_row.replace("<li class=", '<li aria-hidden="true" class=')}</ul></div></section>'''
TRUST_C = f'''<section class="bg-[var(--p-soft)] {SEC}"><div class="{W} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
  <div class="flex flex-col gap-4 lg:col-span-4">{eyebrow("Customers")}<p class="{T["h3"]} text-heading text-balance">{TRUST}</p></div>
  <ul class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-8 lg:gap-4">{"".join(f'<li class="flex h-28 items-center justify-center rounded-lg border border-line bg-white px-6">{lg(f, a, h="max-h-9")}</li>' for f, a in LOGOS)}
    <li class="flex h-28 items-center justify-center rounded-lg bg-heading px-6"><a href="#" class="inline-flex items-center gap-1.5 text-sm font-medium text-white">Customer stories {ARW}</a></li></ul></div></section>'''
TRUST_L = LIVE_SHELL(HM["TRUST_ROW"]).replace("pt-40 md:pt-44", "pt-16 md:pt-20")

# ── 4 · How Sognos Works ──────────────────────────────────────────────────────
HSW_H = "Healthcare First. Field Services Always. AI at the Centre."
HSW_INTRO = "One connected process takes service demand from first contact to coordinated delivery and measurable outcomes."
STEPS = [("Manage demand", "Built for care teams delivering complex services across communities, homes and frontline environments.", ns["FV_CASE"]),
         ("Coordinate workforce", "Designed around the realities of mobile workforces, scheduling, compliance and service delivery in the field.", ns["R_SCHED"]),
         ("Track outcomes", "Practical AI embedded where it matters most, helping teams reduce admin, improve decisions and focus on people.", ns["FV_REPORTING"])]
PARTNERS = f'<div class="flex flex-wrap items-center gap-6"><img src="{P}/logos/Dynamics365.svg" alt="Dynamics 365" class="h-8 w-auto" /><img src="{P}/logos/Microsoft-Solutions-Partner-Logo.webp" alt="Microsoft Solutions Partner" class="h-8 w-auto" /><img src="{P}/logos/copilot-logo.svg" alt="Microsoft Copilot" class="h-8 w-auto" /></div>'


def small_vis(v):
    return v.replace("min-h-[340px]", "min-h-[260px]", 1).replace("md:min-h-[400px]", "md:min-h-[280px]", 1)


HSW_A = f'''<section class="bg-white {SEC}"><div class="{W} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
  <div class="flex flex-col gap-5 lg:sticky lg:top-32 lg:col-span-4 lg:self-start">{eyebrow("How Sognos works")}{h2(HSW_H)}<p class="{T["lede"]} text-body">{HSW_INTRO}</p>{PARTNERS}</div>
  <ol class="space-y-3 lg:col-span-8 lg:space-y-4">{"".join(f'<li class="grid grid-cols-1 items-center gap-6 rounded-lg border border-line p-3 md:grid-cols-2"><div class="px-3 py-2 md:px-5"><p class="text-xs tabular-nums text-[var(--p-ink)]">{i:02d}</p><h3 class="mt-2 {T["h3"]} text-heading">{t}</h3><p class="mt-3 {T["body"]} text-body">{b}</p></div><div>{small_vis(v)}</div></li>' for i, (t, b, v) in enumerate(STEPS, 1))}</ol>
</div></section>'''
HSW_B = f'''<section class="relative overflow-hidden bg-[var(--p-deep)] {SEC} text-white"><div aria-hidden="true" class="p-glow absolute inset-0"></div><div class="relative {W}">
  <div class="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">{eyebrow("How Sognos works", True).replace("flex items-center", "inline-flex items-center")}{h2(HSW_H, True)}<p class="{T["lede"]} text-white/75">{HSW_INTRO}</p></div>
  <ol class="relative mt-16 grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4"><span aria-hidden="true" class="absolute left-[16.6%] right-[16.6%] top-6 hidden h-px md:block" style="background:linear-gradient(90deg, transparent, var(--p-base), transparent)"></span>
    {"".join(f'<li class="relative flex flex-col items-center gap-5 rounded-lg border border-white/10 bg-white/[.04] p-6 text-center lg:p-8"><span class="relative flex size-12 items-center justify-center rounded-full border border-white/20 bg-[var(--p-deep)] font-heading text-lg text-[var(--p-accent)]">{i:02d}<span aria-hidden="true" class="absolute inset-0 animate-ping rounded-full border border-[var(--p-base)] opacity-30"></span></span><h3 class="{T["h3"]}">{t}</h3><p class="{T["small"]} text-white/75">{b}</p></li>' for i, (t, b, _) in enumerate(STEPS, 1))}</ol>
  <div class="mt-12 flex justify-center opacity-90">{PARTNERS.replace('class="h-8 w-auto"', 'class="h-8 w-auto brightness-0 invert"')}</div></div></section>'''
HSW_C = f'''<section class="bg-[var(--p-soft)] {SEC}"><div class="{W}" data-tabs>
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-12"><div class="flex flex-col gap-4 lg:col-span-7">{eyebrow("How Sognos works")}{h2(HSW_H)}</div><p class="{T["lede"]} text-body lg:col-span-5 lg:self-end">{HSW_INTRO}</p></div>
  <div class="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-4"><div role="tablist" aria-label="How Sognos works" class="flex flex-col gap-3 lg:col-span-5">
    {"".join(f'<button type="button" role="tab" data-tab="{i}" aria-selected="{str(i == 0).lower()}" class="tb-tab group rounded-lg border border-line bg-white p-5 text-left transition-colors aria-selected:border-heading lg:p-6 {FOCUS}"><span class="flex items-baseline gap-4"><span class="text-xs tabular-nums text-muted">{i + 1:02d}</span><span class="{T["h3sm"]} text-heading">{t}</span></span><span class="tb-body mt-2 block pl-8 {T["small"]} text-body">{b}</span><span aria-hidden="true" class="tb-bar mt-4 block h-0.5 overflow-hidden bg-line"><span></span></span></button>' for i, (t, b, _) in enumerate(STEPS))}</div>
    <div class="relative grid lg:col-span-7">{"".join(f'<div data-tab-panel="{i}" class="tb-panel [grid-area:1/1]{" is-on" if i == 0 else ""}">{v}</div>' for i, (_, _, v) in enumerate(STEPS))}</div></div>
</div></section>'''
HSW_LIVE = HM["HSW_HTML"].replace(' id="how-sognos-works"', "", 1)

# ── 5 · Solutions ─────────────────────────────────────────────────────────────
SOLS = ns["HOME_SOLUTIONS"]  # (name, title, desc, visual)
SOL_H, SOL_SUB = "Solutions that extend the platform", "Supporting engagements that extend SognosCare and SognosRoster — from field service and CRM through to Power Platform and rapid deployment."
SOL_LINK = lambda dark=False: f'<a href="#" class="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border {"border-white/20 text-white" if dark else "border-line bg-white text-heading"} px-5 text-sm font-medium transition-colors hover:border-[var(--p-base)] {FOCUS}">Explore all Solutions {ARW}</a>'
SOL_HEAD = lambda dark=False: f'<div class="flex flex-wrap items-end justify-between gap-6"><div class="flex max-w-3xl flex-col gap-4">{eyebrow("Solutions", dark)}{h2(SOL_H, dark)}<p class="{T["lede"]} {"text-white/75" if dark else "text-body"}">{SOL_SUB}</p></div>{SOL_LINK(dark)}</div>'
SOL_A = f'''<section class="bg-[var(--p-soft)] {SEC}"><div class="{W}">{SOL_HEAD()}
  <div class="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">{"".join(f'<a href="#" class="group grid grid-cols-1 gap-5 rounded-lg border border-line bg-white p-3 transition-colors hover:border-heading sm:grid-cols-2 {FOCUS}"><div>{small_vis(v)}</div><div class="flex flex-col gap-3 px-3 pb-3 sm:py-3"><p class="text-xs font-medium text-[var(--p-ink)]">{n}</p><h3 class="{T["h3sm"]} text-heading">{t}</h3><p class="{T["small"]} text-body">{d}</p><span class="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-heading">Explore {n} {ARW}</span></div></a>' for n, t, d, v in SOLS)}</div></div></section>'''
SOL_B = f'''<section class="bg-[var(--p-dark)] {SEC} text-white"><div class="{W}">{SOL_HEAD(True)}
  <div class="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">{"".join(f'<a href="#" class="group flex flex-col gap-5 rounded-lg border border-white/10 bg-white/[.04] p-3 transition-colors hover:border-white/30 {FOCUS}"><div class="overflow-hidden rounded">{small_vis(v)}</div><div class="flex flex-1 flex-col gap-2 px-2 pb-2"><p class="text-xs text-[var(--p-accent)]">{n}</p><h3 class="{T["h3sm"]}">{t}</h3><p class="line-clamp-3 {T["small"]} text-white/70">{d}</p><span class="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-medium">Explore {ARW}</span></div></a>' for n, t, d, v in SOLS)}</div></div></section>'''
SOL_C = f'''<section class="bg-white {SEC}"><div class="{W}" data-tabs>{SOL_HEAD()}
  <div class="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16"><ol role="tablist" aria-label="Solutions" class="border-b border-line lg:col-span-6">{"".join(f'<li><button type="button" role="tab" data-tab="{i}" aria-selected="{str(i == 0).lower()}" class="tb-tab group grid w-full grid-cols-[3rem_1fr_auto] items-baseline gap-4 border-t border-line py-6 text-left {FOCUS}"><span class="font-heading text-2xl tabular-nums text-muted group-aria-selected:text-[var(--p-base)]">{i + 1:02d}</span><span><span class="block {T["h3"]} text-heading">{n}</span><span class="tb-body mt-2 block {T["small"]} text-body">{d}</span><span aria-hidden="true" class="tb-bar mt-4 block h-0.5 overflow-hidden bg-line"><span></span></span></span><span class="text-[var(--p-base)]">&rarr;</span></button></li>' for i, (n, t, d, v) in enumerate(SOLS))}</ol>
    <div class="relative grid lg:sticky lg:top-32 lg:col-span-6 lg:self-start">{"".join(f'<div data-tab-panel="{i}" class="tb-panel [grid-area:1/1]{" is-on" if i == 0 else ""}">{v}</div>' for i, (_, _, _, v) in enumerate(SOLS))}</div></div></div></section>'''

# ── 6 · CTA band ──────────────────────────────────────────────────────────────
CTA_H = 'Stop managing complexity.<br class="hidden sm:block" /> Start delivering outcomes.'
CTA_A = f'''<section class="bg-white {SEC}"><div class="{W}"><div class="flex flex-col items-center gap-6 rounded-lg bg-[var(--p-soft)] px-6 py-16 text-center md:py-20">{h2(CTA_H)}<p class="{T["lede"]} max-w-xl text-body">See how one platform runs demand, workforce and outcomes for your service.</p><div class="flex flex-wrap justify-center gap-3">{book("bg-heading text-white hover:bg-[var(--p-base)]")}{sales("text-heading")}</div></div></div></section>'''
CTA_B = f'''<section class="relative overflow-hidden bg-[var(--p-deep)] {SEC} text-white"><div aria-hidden="true" class="p-glow absolute inset-0"></div><img src="{P}/images/home/cta-background-image.png" alt="" class="absolute inset-0 size-full object-cover opacity-20 mix-blend-luminosity" />
  <div class="relative {W} flex flex-col items-center gap-6 text-center"><h2 class="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-balance md:text-6xl">{CTA_H}</h2><div class="flex flex-wrap justify-center gap-3">{book("bg-white text-heading hover:bg-[var(--p-base)] hover:text-white")}{sales("text-white")}</div></div></section>'''
CTA_C = f'''<section class="border-y border-line bg-[var(--p-soft)] {SEC}"><div class="{W} grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
  <h2 class="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-heading text-balance md:text-6xl lg:col-span-8">{CTA_H}</h2>
  <div class="flex flex-col gap-4 lg:col-span-4"><p class="{T["body"]} text-body">A 30-minute walkthrough with a Sognos specialist, on your own service model.</p><div class="flex flex-wrap items-center gap-3">{book("bg-[var(--p-base)] text-white hover:bg-heading")}{sales("text-heading")}</div><p class="text-xs text-muted">[Suggested copy]</p></div></div></section>'''

# ── 7 · Industries ────────────────────────────────────────────────────────────
INDS = ns["HOME_INDUSTRIES"]  # (name, desc, visual)
SLUG = {"Health &amp; Social Care": "health-social-care", "Facilities Management": "facilities-management", "Local Government": "local-government", "Industrial Services": "industrial-services", "Energy &amp; Utilities": "energy-utilities"}
IND_H, IND_SUB = "Purpose-built for service-intensive sectors", "Sectors where coordinating people, compliance and service delivery is the whole operational problem."
IMG = lambda n: f'{P}/images/industries/{SLUG[n]}.webp'
IND_A = f'''<section class="bg-white {SEC}"><div class="{W}"><div class="flex max-w-3xl flex-col gap-4">{eyebrow("Industries")}{h2(IND_H)}<p class="{T["lede"]} text-body">{IND_SUB}</p></div>
  <div class="mt-12 grid grid-cols-1 gap-3 md:grid-cols-6 lg:gap-4">{"".join(f'<a href="#" class="group flex flex-col gap-5 rounded-lg border border-line bg-white p-3 transition-colors hover:border-heading {"md:col-span-3" if k < 2 else "md:col-span-2"} {FOCUS}"><div class="relative aspect-[16/10] overflow-hidden rounded">{photo(IMG(n), "transition-transform duration-700 group-hover:scale-[1.03]")}</div><div class="flex flex-1 flex-col gap-2 px-3 pb-3"><h3 class="{T["h3sm"]} text-heading">{n}</h3><p class="{T["small"]} text-body">{d}</p><span class="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-medium text-heading">Explore {n} {ARW}</span></div></a>' for k, (n, d, v) in enumerate(INDS))}</div></div></section>'''
IND_B = f'''<section class="bg-[var(--p-deep)] {SEC} text-white"><div class="{W}"><div class="flex max-w-3xl flex-col gap-4">{eyebrow("Industries", True)}{h2(IND_H, True)}<p class="{T["lede"]} text-white/75">{IND_SUB}</p></div>
  <div class="ind-acc mt-12 flex flex-col gap-3 lg:h-[520px] lg:flex-row lg:gap-4">{"".join(f'<a href="#" data-keep class="ind-col group relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-lg border border-white/10 {FOCUS}">{photo(IMG(n), "transition-transform duration-700 group-hover:scale-[1.04]")}<div class="absolute inset-0 bg-gradient-to-t from-[var(--p-deep)] via-[color-mix(in_srgb,var(--p-deep)_40%,transparent)] to-transparent"></div><div class="relative p-5 lg:p-6"><h3 class="{T["h3sm"]} text-white">{n}</h3><p class="ind-desc mt-2 {T["small"]} text-white/80">{d}</p></div></a>' for n, d, v in INDS)}</div></div></section>'''
IND_C = f'''<section class="bg-[var(--p-soft)] {SEC}"><div class="{W}" data-tabs><div class="grid grid-cols-1 gap-6 lg:grid-cols-12"><div class="flex flex-col gap-4 lg:col-span-7">{eyebrow("Industries")}{h2(IND_H)}</div><p class="{T["lede"]} text-body lg:col-span-5 lg:self-end">{IND_SUB}</p></div>
  <div class="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16"><ol role="tablist" aria-label="Industries" class="border-b border-line lg:col-span-6">{"".join(f'<li><button type="button" role="tab" data-tab="{i}" aria-selected="{str(i == 0).lower()}" class="tb-tab group grid w-full grid-cols-[3rem_1fr] items-baseline gap-4 border-t border-line py-5 text-left {FOCUS}"><span class="text-sm tabular-nums text-muted">{i + 1:02d}</span><span><span class="block font-heading text-2xl text-heading">{n}</span><span class="tb-body mt-2 block {T["small"]} text-body">{d}</span><span aria-hidden="true" class="tb-bar mt-4 block h-0.5 overflow-hidden bg-line"><span></span></span></span></button></li>' for i, (n, d, v) in enumerate(INDS))}</ol>
    <div class="relative grid lg:sticky lg:top-32 lg:col-span-6 lg:self-start">{"".join(f'<div data-tab-panel="{i}" class="tb-panel relative aspect-[4/5] overflow-hidden rounded-lg [grid-area:1/1] lg:aspect-auto lg:min-h-[520px]{" is-on" if i == 0 else ""}">{photo(IMG(n))}</div>' for i, (n, d, v) in enumerate(INDS))}</div></div></div></section>'''

# ── 8 · Customer stories ──────────────────────────────────────────────────────
QUOTED = CS["QUOTED"]
SPH = lambda st: f'{P}/images/customers/{st["photo"]}'
f0, rest = QUOTED[0], QUOTED[1:4]
ST_HEAD = lambda dark=False: f'<div class="flex flex-wrap items-end justify-between gap-6"><div class="flex max-w-3xl flex-col gap-4">{eyebrow("Customer Stories", dark)}{h2("Proof from the people who run it", dark)}</div><a href="#" class="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium {"text-white" if dark else "text-heading"} {FOCUS}">See more customer stories {ARW}</a></div>'
STORY_A = f'''<section class="bg-white {SEC}"><div class="{W}">{ST_HEAD()}
  <a href="#" class="group mt-12 grid grid-cols-1 items-stretch gap-3 rounded-lg bg-[var(--p-soft)] p-3 md:grid-cols-[3fr_2fr] lg:gap-4 {FOCUS}"><div class="relative min-h-[320px] overflow-hidden rounded md:min-h-[420px]">{photo(SPH(f0), "transition-transform duration-700 group-hover:scale-[1.02]")}<span data-keep class="absolute left-4 top-4 rounded bg-white px-3 py-2"><img src="{P}/logos/{f0["logo"]}" alt="{f0["company"]}" class="h-6 w-auto" /></span></div>
    <div class="flex flex-col justify-between gap-8 p-5 lg:p-8"><blockquote class="border-l-2 border-[var(--p-base)] pl-4 {T["body"]} text-heading">&ldquo;{f0["quote"]}&rdquo;</blockquote><div class="flex items-end justify-between gap-4 border-t border-line pt-5"><span class="text-sm"><span class="text-heading">{f0["author"]}</span><br/><span class="text-muted">{f0["role"]}</span></span><span class="text-sm font-medium text-heading">Read story {ARW}</span></div></div></a>
  <div class="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3 lg:mt-4 lg:gap-4">{"".join(f'<figure class="flex flex-col justify-between gap-6 rounded-lg border border-line bg-white p-6"><img src="{P}/logos/{st["logo"]}" alt="{st["company"]}" class="h-7 w-auto self-start" /><blockquote class="line-clamp-4 {T["small"]} text-heading">&ldquo;{st["quote"]}&rdquo;</blockquote><figcaption class="border-t border-line pt-4 text-xs"><span class="text-heading">{st["author"]}</span><br/><span class="text-muted">{st["role"]}</span></figcaption></figure>' for st in rest)}</div></div></section>'''
STORY_B = f'''<section class="bg-[var(--p-deep)] {SEC} text-white"><div class="{W}" data-tabs>{ST_HEAD(True)}
  <div class="relative mt-12 grid">{"".join(f'<div data-tab-panel="{i}" class="tb-panel grid grid-cols-1 items-stretch gap-3 [grid-area:1/1] lg:grid-cols-12 lg:gap-4{" is-on" if i == 0 else ""}"><div data-keep class="relative min-h-[300px] overflow-hidden rounded-lg lg:col-span-5">{photo(SPH(st))}</div><div class="flex flex-col justify-between gap-8 rounded-lg border border-white/10 bg-white/[.04] p-6 lg:col-span-7 lg:p-10"><blockquote class="font-heading text-xl leading-snug md:text-3xl">&ldquo;{st["quote"]}&rdquo;</blockquote><p class="text-sm text-white/75"><span class="text-white">{st["author"]}</span> &middot; {st["role"]}</p></div></div>' for i, st in enumerate(QUOTED))}</div>
  <div role="tablist" aria-label="Customer stories" class="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4 lg:mt-4 lg:gap-4">{"".join(f'<button type="button" role="tab" data-tab="{i}" aria-selected="{str(i == 0).lower()}" class="tb-tab flex h-20 flex-col justify-between rounded-lg border border-white/10 bg-white p-3 aria-selected:outline aria-selected:outline-2 aria-selected:outline-[var(--p-base)] {FOCUS}"><img src="{P}/logos/{st["logo"]}" alt="{st["company"]}" class="mx-auto max-h-8 w-auto" /><span aria-hidden="true" class="tb-bar block h-0.5 overflow-hidden bg-line"><span></span></span></button>' for i, st in enumerate(QUOTED))}</div></div></section>'''
STORY_C = BP["CARDS"]["stage"](P, T, FOCUS, ARR, eyebrow, BP["STORIES"]).replace("bg-white py-20 md:py-28", "bg-[var(--p-soft)] py-20 md:py-28", 1)

# ── 9 · News & insights ───────────────────────────────────────────────────────
POSTS = KH["ITEMS"][:5]
img, esc = KH["img"], KH["esc"]
fmt = lambda d: date(*map(int, d.split("-"))).strftime("%d %b %Y")
NEWS_H, NEWS_SUB = "The latest from Sognos", "News, insights and milestones from across care operations, workforce scheduling and the sectors we serve."
NEWS_HEAD = lambda dark=False: f'<div class="flex flex-wrap items-end justify-between gap-6"><div class="flex max-w-3xl flex-col gap-4">{eyebrow("Knowledge Hub", dark)}{h2(NEWS_H, dark)}<p class="{T["lede"]} {"text-white/75" if dark else "text-body"}">{NEWS_SUB}</p></div><a href="#" class="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium {"text-white" if dark else "text-heading"} {FOCUS}">View more resources {ARW}</a></div>'
lead, more = POSTS[0], POSTS[1:4]
NEWS_A = f'''<section class="bg-white {SEC}"><div class="{W}">{NEWS_HEAD()}
  <div class="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12"><a href="#" class="group lg:col-span-7 {FOCUS}"><div class="overflow-hidden rounded-lg"><img src="{img(lead["img"], 1200, 680)}" alt="" class="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" /></div><p class="mt-5 text-xs font-medium uppercase tracking-widest text-[var(--p-ink)]">{lead["chip"]}</p><h3 class="mt-2 {T["h3"]} text-heading text-balance">{esc(lead["title"])}</h3><p class="mt-2 text-sm text-muted">{fmt(lead["date"])}</p></a>
    <ul class="border-t border-line lg:col-span-5">{"".join(f'<li><a href="#" class="group grid grid-cols-[7rem_1fr] items-center gap-4 border-b border-line py-5 {FOCUS}"><img src="{img(x["img"], 280, 200)}" alt="" class="aspect-[7/5] w-full rounded object-cover" /><div><p class="text-xs font-medium uppercase tracking-widest text-[var(--p-ink)]">{x["chip"]}</p><h3 class="mt-1 line-clamp-2 text-base text-heading group-hover:text-[var(--p-base)]">{esc(x["title"])}</h3><p class="mt-1 text-xs text-muted">{fmt(x["date"])}</p></div></a></li>' for x in more)}</ul></div></div></section>'''
NEWS_B = f'''<section class="bg-[var(--p-dark)] {SEC} text-white"><div class="{W}">{NEWS_HEAD(True)}
  <div class="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">{"".join(f'<a href="#" class="group flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[.04] p-3 transition-colors hover:border-white/30 {FOCUS}"><div class="overflow-hidden rounded"><img src="{img(x["img"], 600, 400)}" alt="" class="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /></div><div class="flex flex-1 flex-col px-2 pb-2"><p class="text-xs uppercase tracking-widest text-[var(--p-accent)]">{x["chip"]}</p><h3 class="mt-2 line-clamp-3 text-base">{esc(x["title"])}</h3><p class="mt-auto pt-4 text-xs text-white/60">{fmt(x["date"])}</p></div></a>' for x in POSTS[:4])}</div></div></section>'''
NEWS_C = f'''<section class="bg-[var(--p-soft)] {SEC}"><div class="{W}">{NEWS_HEAD()}
  <ol class="mt-12 border-b border-line">{"".join(f'<li><a href="#" class="group grid grid-cols-1 items-baseline gap-2 border-t border-line py-7 md:grid-cols-[9rem_10rem_1fr_auto] md:gap-8 {FOCUS}"><span class="text-sm tabular-nums text-muted">{fmt(x["date"])}</span><span class="text-xs font-medium uppercase tracking-widest text-[var(--p-ink)]">{x["chip"]}</span><span class="font-heading text-xl text-heading text-balance group-hover:text-[var(--p-base)] md:text-2xl">{esc(x["title"])}</span><span class="hidden text-[var(--p-base)] md:block">{ARW}</span></a></li>' for x in POSTS)}</ol></div></section>'''

IND_HEAD = lambda dark=False: f'<div class="flex max-w-3xl flex-col gap-4">{eyebrow("Industries", dark)}{h2(IND_H, dark)}<p class="{T["lede"]} {"text-white/75" if dark else "text-body"}">{IND_SUB}</p></div>'
X = runpy.run_path(str(HERE / "home_extras.py"))
EX = X["build"](dict(P=P, T=T, FOCUS=FOCUS, ARW=ARW, eyebrow=eyebrow, photo=photo, SEC=SEC, W=W, SOLS=SOLS, small_vis=small_vis, SOL_HEAD=SOL_HEAD,
                     HS=HS, INDS=INDS, IND_HEAD=IND_HEAD, SLUG=SLUG, QUOTED=QUOTED, SPH=SPH, ST_HEAD=ST_HEAD, PRODUCTS=PRODUCTS, PHOTO=PHOTO))
HF = runpy.run_path(str(HERE / "hsw_flow.py"))["build"](dict(T=T, FOCUS=FOCUS, eyebrow=eyebrow, SEC=SEC, W=W))  # How Sognos Works D-G
GLOW_SOFT = EX["soft_glow"]()
# Hero / cards: soft glow layer on the layouts that had none, then the show / hide hooks.
HERO_A = HERO_A.replace('<section class="bg-white pt-36', '<section class="relative overflow-hidden bg-white pt-36', 1).replace(f'<div class="{W} grid', GLOW_SOFT + f'<div class="relative {W} grid', 1)
HERO_C = HERO_C.replace(f'pb-20 md:pt-44 md:pb-28"><div class="{W} grid', f'pb-20 md:pt-44 md:pb-28">{GLOW_SOFT}<div class="relative {W} grid', 1)
HERO_A, HERO_B, HERO_C, HERO_LA, HERO_LB = map(EX["mark_hero"], (HERO_A, HERO_B, HERO_C, HERO_LA, HERO_LB))
_glowsec = lambda h, pos: h.replace(f'<section class="bg-white {SEC}"><div class="{W}">', f'<section class="relative overflow-hidden bg-white {SEC}">{EX["soft_glow"](pos)}<div class="relative {W}">', 1)
CARDS_A, CARDS_C = _glowsec(CARDS_A, "15% 20%"), _glowsec(CARDS_C, "90% 10%")
CARDS_B = CARDS_B.replace(f'<section class="bg-[var(--p-dark)] {SEC} text-white"><div class="{W}">', f'<section class="relative overflow-hidden bg-[var(--p-dark)] {SEC} text-white"><div data-x="glow" aria-hidden="true" class="p-glow absolute inset-0"></div><div class="relative {W}">', 1)
CARDS_A, CARDS_B, CARDS_C, CARDS_LA, CARDS_LB = map(EX["mark_cards"], (CARDS_A, CARDS_B, CARDS_C, CARDS_LA, CARDS_LB))

# ── Slots, presets ────────────────────────────────────────────────────────────
SLOTS = [
    ("hero", "Hero", [("a", "A · Split", HERO_A), ("b", "B · Immersive", HERO_B), ("c", "C · Editorial", HERO_C), ("la", "Current · Centred (navy)", HERO_LA), ("lb", "Current · Split (navy)", HERO_LB)], False),
    ("cards", "Product cards", [("a", "A · Split", CARDS_A), ("b", "B · Immersive", CARDS_B), ("c", "C · Editorial", CARDS_C), ("d", "D · Expanding columns", EX["mark_cards"](EX["CARDS_D"])), ("la", "Current · 3-up", CARDS_LA), ("lb", "Current · Featured", CARDS_LB)], True),
    ("trust", "Trust strip", [("a", "A · Split", TRUST_A), ("b", "B · Immersive", TRUST_B), ("c", "C · Editorial", TRUST_C), ("la", "Current · Navy row", TRUST_L)], True),
    ("hsw", "How Sognos Works", [("a", "A · Split", HSW_A), ("b", "B · Immersive", HSW_B), ("c", "C · Editorial", HSW_C), ("sg", "D · Statement grid", HF["HSW_D"]), ("ft", "E · Flow track (animated)", HF["HSW_E"]), ("sp", "F · Steps + proof", HF["HSW_F"]), ("hb1", "G1 · Platform hub · tint", HF["HSW_G1"]), ("hb2", "G2 · Platform hub · white", HF["HSW_G2"]), ("t1", "Current · Deck · 1 Pipeline", HSW_LIVE), ("t2", "Current · Deck · 2 Product", ""), ("t3", "Current · Deck · 3 Photo", "")], False),
    ("solutions", "Solutions", [("a", "A · Split", SOL_A), ("b", "B · Immersive · bento", EX["SOL_B"]), ("c", "C · Editorial · cards", EX["SOL_C"]), ("ct", "C2 · Index + preview", SOL_C), ("bd", "B2 · Dark 4-up", SOL_B),
                                ("d", "D · Graphic cards (Frontline)", EX["SOL_D"]), ("e", "E · List rows (Frontline)", EX["SOL_E"]), ("f", "F · Slider (Frontline)", EX["SOL_F"])], False),
    ("cta", "CTA band", [("a", "A · Split", CTA_A), ("b", "B · Immersive", CTA_B), ("c", "C · Editorial", CTA_C)], True),
    ("industries", "Industries", [("a", "A · Split", IND_A), ("b", "B · Immersive", IND_B), ("c", "C · Editorial", IND_C),
                                  ("d", "D · Graphic tint cards (HSC)", EX["IND_D"]), ("e", "E · Photo + stat (HSC)", EX["IND_E"]), ("f", "F · Bordered graphic cards (HSC)", EX["IND_F"]), ("g", "G · Photo slider (HSC)", EX["IND_G"])], False),
    ("stories", "Customer Stories", [("a", "A · Split", STORY_A), ("b", "B · Immersive", STORY_B), ("c", "C · Editorial", STORY_C), ("d", "D · Expanding stories", EX["STORY_D"]), ("e", "E · Testimonial slider", EX["STORY_E"])], False),
    ("news", "News & Insights", [("a", "A · Split", NEWS_A), ("b", "B · Immersive", NEWS_B), ("c", "C · Editorial", NEWS_C)], False),
]
FOOT = lambda st: {f"fr-{rk}": st for rk, _ in BP["CH"]["FOOTER_ROWS"]}
PRESETS = [
    ("a", "A · Split (light)", {**{k: "a" for k, *_ in SLOTS}, "hd-start": "trans-dark", "hd-scroll": "white", **FOOT("a2")}),
    ("b", "B · Immersive (dark)", {**{k: "b" for k, *_ in SLOTS}, "hd-start": "trans-light", "hd-scroll": "dark", **FOOT("a3b")}),
    ("c", "C · Editorial (signature)", {**{k: "c" for k, *_ in SLOTS}, "hd-start": "trans-dark", "hd-scroll": "stint", **FOOT("c")}),
]
EXTRA_CSS = HM["CSS"] + HM["HSW_CSS"].replace('[data-hsw="1"]', 'html:not([data-s-hsw="t2"], [data-s-hsw="t3"])').replace('[data-hsw="2"]', 'html[data-s-hsw="t2"]').replace('[data-hsw="3"]', 'html[data-s-hsw="t3"]') + """<style>
  html:is([data-s-hsw="t2"], [data-s-hsw="t3"]) [data-s="hsw"][data-v="t1"] { display: block; }
  .tb-panel { opacity: 0; visibility: hidden; transition: opacity .5s ease, visibility .5s; } .tb-panel.is-on { opacity: 1; visibility: visible; }
  .tb-tab .tb-body { display: none; } .tb-tab[aria-selected="true"] .tb-body { display: block; }
  .tb-bar > span { display: block; height: 100%; width: 0; background: var(--p-base); } .tb-tab[aria-selected="true"] .tb-bar > span { animation: tb-prog 6s linear forwards; }
  [data-tabs]:is(:hover, :focus-within) .tb-tab[aria-selected="true"] .tb-bar > span { animation-play-state: paused; }
  @keyframes tb-prog { to { width: 100%; } }
  @media (min-width: 1024px) { .ind-col { flex: 1 1 0; transition: flex-grow .6s cubic-bezier(.22,1,.36,1); } .ind-acc:hover .ind-col:hover, .ind-acc:not(:hover) .ind-col:first-child { flex-grow: 3; } .ind-col .ind-desc { opacity: 0; transition: opacity .4s; } .ind-acc:hover .ind-col:hover .ind-desc, .ind-acc:not(:hover) .ind-col:first-child .ind-desc { opacity: 1; } }
  @media (prefers-reduced-motion: reduce) { .tb-tab[aria-selected="true"] .tb-bar > span { animation: none; width: 100%; } .tb-panel, .ind-col { transition: none; } }
</style>"""
TABS_JS = """<script>
  // Autoplay tabs (How Sognos Works C, Solutions C, Industries C, Stories B): click to pick, progress bar advances, hover pauses.
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = [...root.querySelectorAll("[data-tab]")], panels = [...root.querySelectorAll("[data-tab-panel]")]; let k = 0;
    const go = (i) => { k = (i + tabs.length) % tabs.length; tabs.forEach((t, j) => t.setAttribute("aria-selected", String(j === k))); panels.forEach((p, j) => p.classList.toggle("is-on", j === k)); };
    tabs.forEach((t, j) => t.addEventListener("click", () => go(j)));
    root.addEventListener("animationend", (e) => { if (e.animationName === "tb-prog") go(k + 1); });
  });
</script>"""
STAGE = BP["CARDS"]
NOTE = """Home + Inspector, 2026-10-26. Audit: docs/audits/home-audit.md. Every section: A Split (light) / B Immersive (dark) / C Editorial (signature soft); presets set every section + header state + footer rows (A2 / A3b / C).
Hero: A photo + live platform card / B deep glow + three product tiles / C soft 8/4 with product index + photo band; Current centred / split kept.
Product cards: A photo cards / B bento (SognosCare leads) / C editorial rows; Current 3-up / featured kept. Trust strip: A logo row / B dark marquee / C statement + logo tiles; Current navy row kept.
How Sognos Works: A sticky header + step cards with visuals / B connected flow on deep / C autoplay tabs + panel; Current timer deck kept (motion 1 Pipeline / 2 Product / 3 Photo).
Solutions: A 2x2 visual cards / B dark 4-up / C index + sticky preview (autoplay). CTA band: A tint panel / B deep glow / C editorial split (copy suggested).
Industries: A photo cards 2+3 / B expanding columns / C index + photo (autoplay). Stories: A featured split + 3 quotes / B spotlight + logo tabs / C story stage. News: A lead + list / B dark cards / C editorial index (live Sanity posts).
Every section: rail, tone, Colours; Sognos brand theme default. options.html shows every option stacked. Live copy; statuses in visuals illustrative."""
n = AR["build"](page=page, BP=BP, out_dir=OUT_DIR, pkey="home", name="Home", slots=SLOTS, presets=PRESETS, theme_default="sognos", sognos_theme=True,
                base_css=ns["FV_CSS"] + ns["XTRA_CSS"] + ns["MOTION_CSS"] + HS["PARA_CSS"] + STAGE["STAGE_CSS"] + STAGE["FC_CSS"] + EXTRA_CSS + EX["CSS"] + HF["CSS"] + X["toggle_css"]("hero", EX["HERO_TOGGLES"]) + X["toggle_css"]("cards", EX["CARD_TOGGLES"]) + X["toggle_css"]("stories", EX["STORY_TOGGLES"]),
                toggles={"hero": EX["HERO_TOGGLES"], "cards": EX["CARD_TOGGLES"], "stories": EX["STORY_TOGGLES"]}, fc_area="solutions",
                page_js=ns["FV_JS"] + ns["MOTION_JS"] + HM["HSW_JS"] + STAGE["STAGE_JS"] + TABS_JS + EX["JS"] + HF["JS"],
                root_attr="data-home", empty="", prefix="sognos-home-v1-", note=NOTE, crumb="Home",
                opt_note="Every home section option stacked (hero, product cards, trust, how Sognos works, solutions, CTA band, industries, customer stories, news), per-block tone, Sognos brand theme, footer rows. Composition: index.html (Inspector).")
print(f"wrote home/index.html + options.html ({n} blocks)")
