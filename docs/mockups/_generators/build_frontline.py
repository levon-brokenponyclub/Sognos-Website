"""Frontline (solutions/[slug]) polish-pass mockups.

Reuses the SognosCare generator's shell, type scale, labels, motion and
Frontline visuals via runpy, then writes docs/mockups/frontline/*.html.
Run from the redesign repo root:
  python3 -I <this file> docs/mockups/sognoscare docs/mockups/frontline
"""
import runpy
import sys
from pathlib import Path

CARE_OUT, FL_OUT = sys.argv[1], Path(sys.argv[2])
sys.argv = [sys.argv[0], CARE_OUT]
ns = runpy.run_path(str(Path(__file__).with_name("build_mockups.py")))
FL_OUT.mkdir(parents=True, exist_ok=True)
ns["page"].__globals__["OUT"] = FL_OUT  # page() now writes Frontline files (run_path returns a copy of globals)

page, T, label, eyebrow, P = ns["page"], ns["T"], ns["label"], ns["eyebrow"], ns["P"]
SECTION, HEAD, GAP, RAIL = ns["SECTION"], ns["HEAD"], ns["GAP"], ns["RAIL"]
FRONTLINE_CAPS, capability_card, FRONTLINE_HERO_A = ns["FRONTLINE_CAPS"], ns["capability_card"], ns["FRONTLINE_HERO_A"]
CSS = ns["FV_CSS"] + ns["XTRA_CSS"] + ns["MOTION_CSS"]
JS = ns["FV_JS"] + ns["MOTION_JS"]
CONTENT = "min-w-0 lg:col-[3/-1]"

# Live copy - lib/solutions-content.ts (frontline) + lib/constants.ts.
HERO_H1 = "Coordinate field teams without the chaos"
HERO_IMG = "https://plus.unsplash.com/premium_photo-1681967118118-586c2408d0fc?auto=format&fit=crop&w=1600&q=80"  # live image, Unsplash+ - licence to confirm
HERO_SUB = "Coordinate mobile teams, manage visits and appointments, and keep every service connected from the field to the office."
PROBLEM_INTRO = "Most field service problems come from the same place: disconnected systems, manual dispatch, and no real-time view of what's happening on the ground."
PAINS = [
    ("Scheduling delays and mismatches", "Manual rostering creates bottlenecks. The wrong person gets sent to a job, and fixing it takes hours of phone calls."),
    ("SLA compliance under pressure", "Without automated tracking, SLA breaches are only visible after they've happened - not when there's still time to act."),
    ("No real-time ground visibility", "Operations teams work from stale information. Job status, location, and worker availability are all guesswork."),
]
PLATFORM_LABEL = "Dynamics 365 Field Service"
PLATFORM_DESC = "Built on Microsoft Dynamics 365 Field Service, with Copilot AI for intelligent scheduling and Power Platform for workflow automation and reporting."
RELATED = [
    ("Customer Relationship Management", "Centralise client records, service history, and interactions so your team always has the context they need - and nothing falls through the cracks."),
    ("Customer Service", "Give your service team a single place to log, track, and close every case - with full context, SLA visibility, and a complete audit trail."),
    ("Power Platform", "Build custom apps, automate workflows, and connect your systems without a development team. Power Platform turns your operational needs into working solutions - fast."),
]
ROSTER = ("SognosRoster", "Workforce scheduling & optimisation engine")
MS_LOGOS = [("Dynamics365.svg", "Dynamics 365"), ("copilot-logo.svg", "Microsoft Copilot"), ("platform/PowerBI_scalable.svg", "Power BI"), ("platform/PowerAutomate_scalable.svg", "Power Automate"), ("platform/PowerApps_scalable.svg", "Power Apps"), ("platform/PowerPages_scalable.svg", "Power Pages"), ("platform/Dataverse_scalable.svg", "Dataverse")]

# ── Header (live Navbar, LIGHT theme - solutions are not dark-hero pages) ──
NAV = ["Why Sognos", "Products", "Solutions", "Industries", "Knowledge Hub"]
def header(theme):
    dark = theme == "dark"
    item = ("text-white hover:bg-white hover:text-heading" if dark else "text-heading hover:bg-care-dark hover:text-white")
    group = "bg-white/5" if dark else "bg-gray-100"
    cta = "bg-white text-heading hover:bg-accent hover:text-white" if dark else "bg-care-dark text-white hover:bg-accent"
    bar = ("border-transparent group-data-[scrolled=true]/header:border-navy group-data-[scrolled=true]/header:bg-care-dark" if dark
           else "border-transparent bg-white group-data-[scrolled=true]/header:border-line")
    logo_filter = "brightness-0 invert" if dark else ""
    items = "".join(
        f'<li><button type="button" class="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-base font-normal tracking-tight transition-colors duration-200 {item}">{n}<svg aria-hidden="true" class="h-3.5 w-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m19 9-7 7-7-7"/></svg></button></li>'
        for n in NAV)
    return f"""<div id="site-header" data-scrolled="false" class="group/header fixed inset-x-0 top-0 z-50">
  <header class="border-b transition-[background-color,border-color] duration-300 {bar}">
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
      <a href="#hero" class="justify-self-start"><img src="{P}/logos/sognos-logo.svg" alt="Sognos" class="h-7 w-auto {logo_filter}" /></a>
      <nav aria-label="Main" class="hidden h-14 items-center justify-self-center rounded-full p-2 lg:flex {group}"><ul class="flex items-center gap-0.5">{items}</ul></nav>
      <a href="#" class="hidden h-12 items-center justify-center justify-self-end rounded-sm px-4 text-base tracking-tight transition-colors lg:inline-flex {cta}">Book a Demo</a>
    </div>
  </header>
</div>
<script>(() => {{ const h = document.getElementById("site-header"); const f = () => h.dataset.scrolled = String(scrollY > 8); addEventListener("scroll", f, {{ passive: true }}); f(); }})();</script>"""

CTA_PRIMARY = '<button type="button" class="min-h-11 rounded-full bg-accent px-7 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Book a Demo</button>'
CTA_SECONDARY = '<a href="#capabilities" class="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-base font-medium text-heading transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">Explore capabilities <span aria-hidden="true">&darr;</span></a>'
# Secondary CTA (2026-10-25): SognosCare hero "Learn More" text-link style.
# Label is a copy SUGGESTION (S2) - not on the live page.
CTA_SECONDARY_BTN = '<a href="#capabilities" class="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-base font-medium text-heading transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Explore capabilities <span aria-hidden="true">&#8599;</span></a>'
BREADCRUMB = '<p class="flex items-center gap-2.5 text-lg leading-[1.6] text-heading"><span aria-hidden="true" class="block size-[0.66em] bg-accent"></span><a href="#" class="text-muted underline-offset-4 hover:text-accent hover:underline">Solutions</a><span aria-hidden="true" class="text-muted">/</span>Frontline</p>'

# ── 01 Hero ─────────────────────────────────────────────────────────────────
HERO_A = f"""<section id="hero" class="bg-white pt-32 pb-20 md:pb-28 lg:pt-40">
  <div class="mx-auto max-w-7xl px-6">
    <div class="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
      <div class="flex flex-col items-start gap-4 lg:col-span-7">
        {BREADCRUMB}
        <h1 class="font-heading text-5xl font-normal leading-[1.05] tracking-[-0.02em] text-balance text-heading">{HERO_H1}</h1>
        <p class="{T["herosub"]} text-body">{HERO_SUB}</p>
        <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">{CTA_PRIMARY}{CTA_SECONDARY_BTN}</div>
      </div>
      <div class="lg:col-span-5">
        <div class="relative aspect-[4/5] max-h-[480px] w-full overflow-hidden rounded-lg bg-tint lg:aspect-auto lg:h-[480px]">
          <img src="{HERO_IMG}" alt="Frontline preview" class="absolute inset-0 size-full object-cover" />
          <div class="absolute bottom-4 left-4 right-4 rounded-lg border border-line bg-white p-4 sm:right-auto sm:w-72">
            <div class="flex items-center justify-between"><p class="font-heading text-base text-heading">Job dispatched</p><span class="text-xs text-muted">#4821</span></div>
            <p class="mt-1 text-xs text-muted">J. Kelly &middot; ETA 22 min &middot; <span class="text-emerald-700">SLA on track</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>"""
HERO_NOTE = """Audit: H1 (local image, tint frame - no off-palette purple gradient), H2 (breadcrumb label), H3 (H1/sub on the scale), H4 (secondary link - copy, S2).
Benchmark: AngelList hero discipline - one primary CTA, quiet secondary; light hero keeps solutions below products in the hierarchy.
Maps to: app/(marketing)/solutions/[slug]/page.tsx hero + SolutionHeroDemoButton (unchanged). Card on the image is illustrative."""
page("01-hero-a.html", "Frontline 01 - Hero A (light, recommended)", "OPTION A (recommended, Q2): light split hero, polished.\n" + HERO_NOTE, CSS + header("light") + HERO_A + JS)
page("01-hero-b.html", "Frontline 01 - Hero B (dark motion)", "OPTION B (Q2): dark Aria-style motion hero - photo + Job dispatched + live field status (from the visuals gallery).\n" + HERO_NOTE,
     CSS + header("dark") + FRONTLINE_HERO_A.replace('<section class="relative overflow-hidden pt-24', '<section id="hero" class="relative overflow-hidden pt-40') + JS)

# ── 02 Problem ──────────────────────────────────────────────────────────────
PROBLEM = f"""<section id="problem" class="bg-navy {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="grid gap-3 md:grid-cols-2 lg:gap-4">
      <div class="flex flex-col justify-center gap-4 p-2 md:p-6 lg:p-8">
        {label("The problem", "dark", sticky=False)}
        <h2 class="{T["h2"]} text-white">What Frontline solves</h2>
        <p class="{T["lede"]} text-white/75">{PROBLEM_INTRO}</p>
      </div>
      {"".join(f'''<div class="flex min-h-[300px] flex-col justify-between rounded-lg bg-white/5 p-6 lg:p-8">
        <span aria-hidden="true" class="font-heading text-5xl font-light tabular-nums text-white/25">{i:02d}</span>
        <div><h3 class="{T["h3sm"]} text-white md:text-xl">{t}</h3><p class="mt-3 {T["body"]} text-white/75">{b}</p></div>
      </div>''' for i, (t, b) in enumerate(PAINS, 1))}
    </div>
  </div>
</section>"""
page("02-problem.html", "Frontline 02 - Problem", """Audit: P1 (white/75), P2 (numeral in the display face, low alpha - About Beliefs signature), P3 (min-h 300), P4 + G4 (SectionLabel), G5 (H2 400).
Benchmark: dark statement band. Maps to: solutions/[slug]/page.tsx problem band.""", CSS + PROBLEM)

# ── 03 Capabilities ─────────────────────────────────────────────────────────
CAP_HEAD = f"""<div class="{RAIL}">
      <div class="lg:col-span-2">{label("Capabilities")}</div>
      <div class="{CONTENT}"><div class="{HEAD}"><h2 class="{T["h2"]} text-heading">What you get with Frontline</h2></div></div>
    </div>"""
CAPS_A = f"""<section id="capabilities" class="bg-tint {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    {CAP_HEAD}
    <div class="{GAP} grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
      {"".join(capability_card(t, b, v).replace('rounded-lg bg-tint p-3', 'rounded-lg bg-white p-3') for t, b, v in FRONTLINE_CAPS)}
    </div>
  </div>
</section>"""
CAPS_B = f"""<section id="capabilities" class="bg-tint {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    {CAP_HEAD}
    <div class="{GAP}">
      {"".join(f'''<article class="sticky grid grid-cols-1 overflow-hidden rounded-t-lg border-t border-line bg-white lg:grid-cols-2" style="top:{80 + i * 96}px;z-index:{i + 1}">
        <div class="flex flex-col px-6 py-5 lg:px-8"><div class="flex items-baseline gap-4"><span class="text-xs font-semibold tabular-nums text-muted">{i + 1:02d}</span><h3 class="{T["h3sm"]} text-heading">{t}</h3></div><p class="mt-2 max-w-md pl-9 {T["small"]} text-body">{b}</p></div>
        <div class="lg:min-h-[380px]">{v}</div>
      </article>''' for i, (t, b, v) in enumerate(FRONTLINE_CAPS))}
      <div aria-hidden="true" style="height:{5 * 96 + 160}px"></div>
    </div>
  </div>
</section>"""
CAP_NOTE = """Audit: C1 (third-party images replaced by Frontline capability motion graphics), C2 (bodies readable), C3 (H2 on the scale), G7 (rail).
Maps to: components/layout/sections/SolutionUseCases.tsx. Per-solution visual sets needed before the template ships (S3)."""
page("03-capabilities-a.html", "Frontline 03 - Capabilities A (grid, recommended)", "OPTION A (recommended, Q1): 3-col compact cards - visual + title + body, all six readable.\n" + CAP_NOTE, CSS + CAPS_A + JS)
page("03-capabilities-b.html", "Frontline 03 - Capabilities B (sticky stack)", "OPTION B (Q1): sticky stack kept; body moved into the always-visible header strip; visual panel per card.\n" + CAP_NOTE, CSS + CAPS_B + JS)

# ── 04 Platform ─────────────────────────────────────────────────────────────
PLATFORM = f"""<section id="platform" class="bg-white {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Platform")}</div>
      <div class="{CONTENT}">
        <div class="{HEAD}">
          <h2 class="{T["h2"]} text-heading">Built on {PLATFORM_LABEL}</h2>
          <p class="{T["lede"]} text-body">{PLATFORM_DESC}</p>
        </div>
        <ul class="{GAP} flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-line pt-10">
          {"".join(f'<li><img src="{P}/logos/{f}" alt="{a}" class="h-6 w-auto sm:h-7" /></li>' for f, a in MS_LOGOS)}
        </ul>
      </div>
    </div>
  </div>
</section>"""
page("04-platform.html", "Frontline 04 - Platform", """Audit: L1 (logos grow with the screen, not shrink), L2 (dead heading code), L3 ("Platform" becomes the rail label; "Built on ..." the H2 - no copy change), G7.
Maps to: solutions/[slug]/page.tsx platform block + shared/PlatformLogoRow.tsx (page-only).""", CSS + PLATFORM)

# ── 05 Trust logos ──────────────────────────────────────────────────────────
LOGOS = [("deloitte.webp", "Deloitte"), ("water-nsw.webp", "Water NSW"), ("neca.webp", "NECA"), ("apm.webp", "APM"), ("flourish.webp", "Flourish")]
TRUST = f"""<section aria-label="Trusted organisations" class="bg-navy">
  <div class="mx-auto max-w-5xl px-6 py-16 text-center md:py-20">
    <p class="{T["h3"]} text-white">Trusted by industry leaders and professionals worldwide</p>
    <ul class="mt-10 grid grid-cols-2 gap-y-4 sm:grid-cols-3 md:mt-12 md:grid-cols-5">
      {"".join(f'<li class="flex h-20 items-center justify-center px-6 md:border-l md:border-white/20 md:first:border-l-0"><img src="{P}/logos/clients/{f}" alt="{a}" class="h-auto max-h-10 w-auto max-w-full object-contain opacity-90 brightness-0 invert" /></li>' for f, a in LOGOS)}
    </ul>
  </div>
</section>"""
page("05-trust.html", "Frontline 05 - Trust logos", """Audit: G1 (P0 - strip was white-on-white; now on a page-local navy band, shared LogoStrip unchanged). Live logos come from Sanity; local files stand in.
Maps to: solutions/[slug]/page.tsx (wrap <LogoStrip /> in <section class="bg-sognos-navy">).""", CSS + TRUST)

# ── 06 Works with ───────────────────────────────────────────────────────────
WORKS = f"""<section id="works-with" class="bg-white {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Works with")}</div>
      <div class="{CONTENT}">
        <div class="{HEAD}"><h2 class="{T["h2"]} text-heading">Connects to the Sognos platform</h2></div>
        <a href="#" class="group {GAP} flex max-w-md items-center gap-4 rounded-lg border border-line bg-white px-6 py-5 transition-colors hover:border-heading focus-visible:outline-2 focus-visible:outline-accent">
          <span class="size-2.5 shrink-0 rounded-full bg-accent"></span>
          <span class="flex-1"><span class="block text-sm font-medium text-heading">{ROSTER[0]}</span><span class="mt-0.5 block text-xs text-muted">{ROSTER[1]}</span></span>
          <span aria-hidden="true" class="text-heading transition-transform group-hover:translate-x-0.5">&rarr;</span>
        </a>
      </div>
    </div>
  </div>
</section>"""
page("06-works-with.html", "Frontline 06 - Works with", """Audit: W1 (arrow always visible), W2 (Roster dot = roster-base #59bbf7 - Q4), W3 + G6 (tokens, no inline hex), G7 (rail). Frontline links Roster only (worksWithCare: false).
Maps to: solutions/[slug]/page.tsx works-with block.""", CSS + WORKS)

# ── 07 Related ──────────────────────────────────────────────────────────────
RELATED_HTML = f"""<section id="related" class="bg-tint {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Solutions")}</div>
      <div class="{CONTENT}">
        <div class="{HEAD}"><h2 class="{T["h2"]} text-heading">Extend your operation further</h2></div>
        <div class="{GAP} grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">
          {"".join(f'''<a href="#" class="group flex flex-col rounded-lg border border-line bg-white p-6 transition-colors hover:border-heading focus-visible:outline-2 focus-visible:outline-accent">
            <h3 class="{T["h3sm"]} text-heading">{n}</h3>
            <p class="mt-2 line-clamp-3 {T["small"]} text-body">{d}</p>
            <span class="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-heading group-hover:text-accent">Explore <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">&rarr;</span></span>
          </a>''' for n, d in RELATED)}
        </div>
      </div>
    </div>
  </div>
</section>"""
page("07-related.html", "Frontline 07 - Related solutions", """Audit: R1 (Explore always visible), R2 (gap rule), R3 (line-clamp-3), G6, G7. Surface tint (G3 rhythm).
Maps to: solutions/[slug]/page.tsx related block. Related copy = each related page's hero subtext (live).""", CSS + RELATED_HTML)

# ── index ───────────────────────────────────────────────────────────────────
CAP_TOGGLE = """<div class="sticky top-20 z-40 border-y border-line bg-white/95 backdrop-blur">
  <div class="mx-auto flex max-w-7xl items-center gap-2 px-6 py-3">
    <p class="mr-2 text-sm font-medium text-heading">Capabilities layout</p>
    <button type="button" data-cap="a" aria-pressed="true" class="rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">A &middot; Grid</button>
    <button type="button" data-cap="b" aria-pressed="false" class="rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">B &middot; Sticky stack</button>
  </div>
</div>
<script>
  (() => {
    const show = (v) => {
      document.querySelectorAll("[data-cap-variant]").forEach((s) => s.hidden = s.dataset.capVariant !== v);
      document.querySelectorAll("[data-cap]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cap === v)));
      try { localStorage.setItem("sognos-frontline-cap", v); } catch {}
    };
    document.querySelectorAll("[data-cap]").forEach((b) => b.addEventListener("click", () => show(b.dataset.cap)));
    let v = "a"; try { v = localStorage.getItem("sognos-frontline-cap") || "a"; } catch {}
    show(v);
  })();
</script>"""
CAPS_BOTH = (CAP_TOGGLE
    + CAPS_A.replace('<section id="capabilities"', '<section data-cap-variant="a" id="capabilities"', 1)
    + CAPS_B.replace('<section id="capabilities"', '<section data-cap-variant="b" hidden id="capabilities-stack"', 1))

# ── Colour picker (index) ───────────────────────────────────────────────────
# Floating panel, same mechanics as the SognosCare index picker: recolours the
# capability cards and the graphics inside them independently, in both
# capability layouts. Graphics use the Frontline palettes from the gallery.
import json as _json
_mix = ns["_mix"]
FL_CARD_PALETTES = {
    "a": ("White (current)", "White cards on the tint section.", ["#ffffff"]),
    "b": ("White + border", "White with a hairline border.", ["#ffffff|line"]),
    "c": ("Grey tint", "Live --sognos-tint #f0eff2 - a step darker than the section tint.", ["#f0eff2"]),
    "d": ("Accent wash", "3% / 5% of accent #1d96fc.", [_mix("#1d96fc", 3), _mix("#1d96fc", 5)]),
    "e": ("Navy", "Care dark #0f1936 cards - card copy flips to white.", ["#0f1936"]),
}
FL_GRAPHIC_PALETTES = ns["FRONTLINE_PALETTES"]
_ib = "flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-heading transition-colors hover:border-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white"


def _row(grp, title, pals):
    btns = "".join(
        f'<button type="button" data-ipick="{grp}:{k}" title="{d}" class="{_ib}" aria-pressed="false"><span class="flex -space-x-1">'
        + "".join(f'<span class="size-3 rounded-full border border-line" style="background:{c.split("|")[0]}"></span>' for c in cols[:2])
        + f"</span>{chr(65 + n)}</button>"
        for n, (k, (_, d, cols)) in enumerate(pals.items())
    )
    return (f'<div class="mt-3 space-y-2 border-t border-line pt-3"><p class="text-xs font-medium uppercase tracking-widest text-muted">{title}</p>'
            f'<div class="flex flex-wrap gap-1.5">{btns}</div><p data-inote="{grp}" class="text-xs text-muted"></p></div>')


_data = {
    "cards": {"default": "a", "palettes": {k: {"name": n, "note": d, "colours": c} for k, (n, d, c) in FL_CARD_PALETTES.items()}},
    "graphics": {"default": "a", "palettes": {k: {"name": n, "note": d, "colours": c} for k, (n, d, c) in FL_GRAPHIC_PALETTES.items()}},
}
FL_PICKER = (
    '<details class="group fixed bottom-4 right-4 z-[60] w-[min(92vw,26rem)] rounded-lg border border-line bg-white text-left open:p-4">'
    '<summary class="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-heading group-open:p-0 [&::-webkit-details-marker]:hidden">'
    'Capability colours <span aria-hidden="true" class="transition-transform group-open:rotate-180">&#9662;</span></summary>'
    + _row("cards", "Cards", FL_CARD_PALETTES) + _row("graphics", "Graphics", FL_GRAPHIC_PALETTES) + "</details>"
    + """<script>
  (() => {
    const DATA = """ + _json.dumps(_data) + """;
    const store = { get: (k) => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };
    const targets = { cards: "[data-card-i]", graphics: "[data-fv]" };
    const apply = (grp, key) => {
      const pal = DATA[grp].palettes[key]; if (!pal) return;
      document.querySelectorAll(targets[grp]).forEach((el) => {
        const i = +(el.dataset.cardI ?? el.dataset.fv);
        const [c, mod] = pal.colours[i % pal.colours.length].split("|");
        el.style.background = c;
        el.style.boxShadow = mod === "line" || c === "#ffffff" && grp === "graphics" ? "inset 0 0 0 1px #e2e8f0" : "";
        if (grp === "cards") el.classList.toggle("is-dark-card", c === "#0f1936");
      });
      document.querySelectorAll(`[data-ipick^="${grp}:"]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.ipick === `${grp}:${key}`)));
      document.querySelector(`[data-inote="${grp}"]`).textContent = `${pal.name} - ${pal.note}`;
      store.set(`sognos-frontline-${grp}`, key);
    };
    document.querySelectorAll("[data-ipick]").forEach((b) => b.addEventListener("click", () => { const [g, k] = b.dataset.ipick.split(":"); apply(g, k); }));
    Object.keys(DATA).forEach((g) => apply(g, store.get(`sognos-frontline-${g}`) || DATA[g].default));
  })();
</script>
<style>
  /* Navy cards: the card's own copy (not the graphic) flips to the dark ladder. */
  .is-dark-card > div:not(.fv) h3 { color: #fff; }
  .is-dark-card > div:not(.fv) p, .is-dark-card > div:not(.fv) span { color: rgb(255 255 255 / .75); }
</style>"""
)


def _tag_cards(html):
    """Number capability cards (grid + stack) and their graphic panels."""
    out, ci, gi = [], 0, 0
    import re as _re
    def card(m):
        nonlocal ci
        r = f'{m.group(1)} data-card-i="{ci}"'; ci += 1; return r
    html = _re.sub(r'(<article class="(?:flex flex-col gap-5 rounded-lg bg-white p-3|sticky grid)[^"]*")', card, html)
    def panel(m):
        nonlocal gi
        r = f'data-fv="{gi % 6}" {m.group(0)}'; gi += 1; return r
    return _re.sub(r'class="fv relative', panel, html)


# ── Section options (index): 3 per section, review-only switchers ───────────
# Problem / Platform / Works with / Related. Layout + styling only - copy is
# the live copy above. Motion: .fv panels reuse FV_JS (in-view + loops);
# FLX_CSS / FLX_JS add the section-specific effects. Reduced motion: final
# state, nothing moves.

_avatar, _steps, _HP, R_SCHED = ns["_avatar"], ns["_steps"], ns["_HIDDEN_PROGRESS"], ns["R_SCHED"]
_C = "rounded-lg border border-line bg-white"


def _mx(c, n):
    return f"color-mix(in srgb, {c} {n}%, white)"


FLX_CSS = """<style>
  .flx-rise { opacity: 0; transform: translateY(18px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
  .fv.is-in .flx-rise, .fv.is-in.flx-rise { opacity: 1; transform: none; }
  .fv.is-in .flx-d1 { transition-delay: .12s; } .fv.is-in .flx-d2 { transition-delay: .24s; } .fv.is-in .flx-d3 { transition-delay: .36s; } .fv.is-in .flx-d4 { transition-delay: .48s; }
  /* Problem B: issue chip flips to resolved once in view */
  .flip-chip span { transition: opacity .5s, transform .5s; }
  .flip-chip .ok { position: absolute; inset: 0; opacity: 0; transform: translateY(6px); }
  .fv.is-in .flip-chip .bad { opacity: 0; transform: translateY(-6px); transition-delay: 1.4s; }
  .fv.is-in .flip-chip .ok { opacity: 1; transform: none; transition-delay: 1.4s; }
  /* Problem A: skill mismatch shake, stale dot */
  @keyframes flx-shake { 0%, 86%, 100% { transform: none; } 88% { transform: translateX(-3px); } 92% { transform: translateX(3px); } 96% { transform: translateX(-2px); } }
  .flx-shake { animation: flx-shake 3.2s ease-in-out infinite; }
  @keyframes flx-fade { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }
  .flx-stale { animation: flx-fade 2.4s ease-in-out infinite; }
  /* Problem C: broken links flicker */
  @keyframes flx-flicker { 0%, 100% { opacity: .55; } 40% { opacity: .15; } 45% { opacity: .6; } 70% { opacity: .2; } }
  .flx-broken { animation: flx-flicker 2.8s steps(1, end) infinite; }
  [data-pc][data-on="true"] .pc-badge { background: #ff8e90; color: #0f1936; }
  [data-pc][data-on="true"].pc-item { background: rgb(255 255 255 / .08); }
  /* Platform A: stack builds up */
  .flx-slab { opacity: 0; transform: translateY(24px) scale(.98); transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
  .fv.is-in .flx-slab { opacity: 1; transform: none; }
  /* Works B: job / worker packet */
  .pair-dot { left: 0; transition: left 1.1s cubic-bezier(.65,0,.35,1), background-color .3s; }
  [data-pair="1"] .pair-dot { left: calc(100% - 12px); }
  [data-pair="2"] .pair-dot { left: calc(100% - 12px); background: #59bbf7; }
  [data-pair="3"] .pair-dot { left: 0; background: #59bbf7; }
  [data-pair] [data-ps] { display: none; } [data-pair="0"] [data-ps="0"], [data-pair="1"] [data-ps="1"], [data-pair="2"] [data-ps="2"], [data-pair="3"] [data-ps="3"] { display: inline; }
  [data-pair="3"] .pair-worker { border-color: #1d96fc; }
  [data-pair="3"] .pair-worker .pair-tick { opacity: 1; }
  /* Works C: roster slots breathe */
  @keyframes flx-slot { 0%, 100% { opacity: .06; } 50% { opacity: .24; } }
  .flx-slot { animation: flx-slot 3.6s ease-in-out infinite; }
  /* Related: case status chip cycles */
  @keyframes flx-c1 { 0%, 30% { opacity: 1; } 33%, 100% { opacity: 0; } }
  @keyframes flx-c2 { 0%, 30% { opacity: 0; } 33%, 63% { opacity: 1; } 66%, 100% { opacity: 0; } }
  @keyframes flx-c3 { 0%, 63% { opacity: 0; } 66%, 97% { opacity: 1; } 100% { opacity: 0; } }
  .flx-chip > span { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
  .flx-chip > span:nth-child(1) { animation: flx-c1 6s infinite; } .flx-chip > span:nth-child(2) { animation: flx-c2 6s infinite; } .flx-chip > span:nth-child(3) { animation: flx-c3 6s infinite; }
  @keyframes flx-sla { from { width: 20%; } to { width: 78%; } }
  .flx-sla { animation: flx-sla 6s linear infinite; }
  .rel-track { scrollbar-width: none; } .rel-track::-webkit-scrollbar { display: none; }
  @media (prefers-reduced-motion: reduce) {
    .flx-rise, .flx-slab { opacity: 1 !important; transform: none !important; transition: none !important; }
    .flx-shake, .flx-stale, .flx-broken, .flx-slot, .flx-sla, .flx-chip > span { animation: none !important; }
    .flx-chip > span:nth-child(n+2) { opacity: 0; }
    .flip-chip .bad { opacity: 0 !important; } .flip-chip .ok { opacity: 1 !important; transform: none !important; }
    .pair-dot { transition: none !important; }
    .flx-anim { display: none; }
  }
</style>"""

# ── 02 The problem ──────────────────────────────────────────────────────────
_PHEAD_DARK = f"""{label("The problem", "dark", sticky=False)}
        <h2 class="{T["h2"]} text-white">What Frontline solves</h2>
        <p class="{T["lede"]} text-white/75">{PROBLEM_INTRO}</p>"""

_SYMPTOM = [
    # 01 scheduling mismatch: required vs assigned, a call counter climbing
    f"""<div class="w-full space-y-2 text-left">
          <div class="flex items-center justify-between rounded border border-white/10 bg-white/5 px-3 py-2 text-xs"><span class="text-white/60">Job #4821 needs</span><span class="text-white">Licensed electrician</span></div>
          <div class="flx-shake flex items-center justify-between rounded border border-[#ff8e90]/50 bg-[#ff8e90]/10 px-3 py-2 text-xs"><span class="flex items-center gap-2 text-white/60">{_avatar("JK", "size-5")} Assigned</span><span class="text-[#ff8e90]">Plumber &#10005;</span></div>
          <p class="flex items-center gap-2 text-xs text-white/60"><span aria-hidden="true">&#9742;</span><span><span data-calls>1</span> calls to reassign</span></p>
        </div>""",
    # 02 SLA countdown ring draining to red
    """<div class="flex w-full items-center gap-4 text-left">
          <svg viewBox="0 0 64 64" class="size-16 shrink-0 -rotate-90" aria-hidden="true"><circle cx="32" cy="32" r="28" fill="none" stroke="rgb(255 255 255 / .1)" stroke-width="5"/><circle data-sla-ring cx="32" cy="32" r="28" fill="none" stroke="#ffad6e" stroke-width="5" stroke-linecap="round" stroke-dasharray="175.9" stroke-dashoffset="20" style="transition: stroke-dashoffset 1s linear, stroke .3s"/></svg>
          <div><p class="text-xs text-white/60">SLA &middot; P2 callout</p><p data-sla class="font-heading text-2xl tabular-nums text-white">00:14:59</p><p data-sla-note class="text-xs text-[#ffad6e]">At risk</p></div>
        </div>""",
    # 03 stale map: last update climbing, dot fading
    """<div class="relative h-24 w-full overflow-hidden rounded border border-white/10 bg-white/5">
          <svg viewBox="0 0 240 96" class="absolute inset-0 size-full" preserveAspectRatio="none" aria-hidden="true"><path d="M0 30 H240 M0 70 H240 M60 0 V96 M170 0 V96" stroke="rgb(255 255 255 / .08)" stroke-width="6"/></svg>
          <span class="flx-stale absolute left-[58%] top-[38%] size-3 rounded-full border-2 border-white/70 bg-white/40"></span>
          <span class="absolute bottom-2 left-2 rounded bg-black/30 px-2 py-1 text-[11px] text-white/70">Last update <span data-stale>2h 04m</span> ago</span>
        </div>""",
]

PROB_A = f"""<section id="problem" class="bg-navy {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center [&_p]:mx-auto">{_PHEAD_DARK}</div>
    <div class="fv {GAP} grid gap-3 md:grid-cols-3 lg:gap-4">
      {"".join(f'''<article class="flx-rise flx-d{i} flex flex-col gap-8 rounded-lg bg-white/5 p-6 lg:p-8">
        <div class="flex min-h-28 items-center">{_SYMPTOM[i - 1]}</div>
        <div><span aria-hidden="true" class="font-heading text-4xl font-light tabular-nums text-white/25">{i:02d}</span>
        <h3 class="mt-3 {T["h3sm"]} text-white md:text-xl">{t}</h3><p class="mt-3 {T["body"]} text-white/75">{b}</p></div>
      </article>''' for i, (t, b) in enumerate(PAINS, 1))}
    </div>
  </div>
</section>"""

PROB_B = f"""<section id="problem" class="bg-navy {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
      <div class="lg:col-span-5"><div class="flex flex-col gap-4 lg:sticky lg:top-36">{_PHEAD_DARK}</div></div>
      <ol class="lg:col-span-7 lg:col-start-6">
        {"".join(f'''<li class="fv flx-rise grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-white/15 py-10 last:border-b sm:grid-cols-[4rem_1fr_auto]">
          <span aria-hidden="true" class="font-heading text-5xl font-light tabular-nums text-white/25">{i:02d}</span>
          <div><h3 class="{T["h3"]} text-white">{t}</h3><p class="mt-3 max-w-[46ch] {T["body"]} text-white/75">{b}</p></div>
          <span class="flip-chip relative col-start-2 inline-flex h-8 w-36 self-start text-xs font-medium sm:col-start-3"><span class="bad flex w-full items-center justify-center gap-1.5 rounded-full border border-[#ff8e90]/50 text-[#ff8e90]"><span class="size-1.5 rounded-full bg-[#ff8e90]"></span>Issue today</span><span class="ok flex w-full items-center justify-center gap-1.5 rounded-full bg-emerald-500/15 text-emerald-300">&#10003; Frontline fixes</span></span>
        </li>''' for i, (t, b) in enumerate(PAINS, 1))}
      </ol>
    </div>
  </div>
</section>"""

# Broken workflow: Office / Dispatch / Field crew / Customer, links break.
_NODES = [("Office", 90, 60), ("Dispatch", 330, 60), ("Field crew", 330, 230), ("Customer", 90, 230)]
_LINKS = [((150, 60), (270, 60), 1, (210, 60)), ((330, 95), (330, 195), 2, (330, 145)), ((150, 230), (270, 230), 3, (210, 230))]
PROB_C = f"""<section id="problem" class="bg-navy {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div class="flex flex-col gap-4">{_PHEAD_DARK}
        <ol data-pc-group class="mt-6 space-y-1">
          {"".join(f'''<li data-pc="{i}" class="pc-item flex gap-4 rounded-lg p-4 transition-colors duration-500"><span class="pc-badge flex size-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs tabular-nums text-white transition-colors duration-500">{i:02d}</span><div><h3 class="{T["h3sm"]} text-white">{t}</h3><p class="mt-1 {T["small"]} text-white/75">{b}</p></div></li>''' for i, (t, b) in enumerate(PAINS, 1))}
        </ol>
      </div>
      <div class="fv rounded-lg border border-white/10 bg-white/5 p-4 sm:p-8">
        <svg viewBox="0 0 420 290" class="h-auto w-full" aria-hidden="true">
          <path d="M90 95 V195" stroke="rgb(255 255 255 / .35)" stroke-width="1.5" stroke-dasharray="3 5"/>
          {"".join(f'<path class="flx-broken" style="animation-delay:{k * .7}s" d="M{a[0]} {a[1]} L{b[0]} {b[1]}" stroke="#ff8e90" stroke-width="1.5" stroke-dasharray="3 5"/>' for k, (a, b, n, m) in enumerate(_LINKS))}
          {"".join(f'<g data-pc="{n}"><circle cx="{m[0]}" cy="{m[1]}" r="12" fill="#152248" stroke="#ff8e90" stroke-width="1.5"/><text x="{m[0]}" y="{m[1] + 4}" text-anchor="middle" font-size="10" fill="#ff8e90" font-family="sans-serif">{n:02d}</text></g>' for a, b, n, m in _LINKS)}
          {"".join(f'<g><rect x="{x - 60}" y="{y - 30}" width="120" height="60" rx="8" fill="#0f1936" stroke="rgb(255 255 255 / .15)"/><text x="{x}" y="{y + 5}" text-anchor="middle" font-size="14" fill="#fff" font-family="AngelList, sans-serif">{t}</text></g>' for t, x, y in _NODES)}
        </svg>
        <p class="mt-4 text-center text-xs text-white/60">Disconnected systems &middot; manual dispatch &middot; no live view</p>
      </div>
    </div>
  </div>
</section>"""

# ── 04 Platform ─────────────────────────────────────────────────────────────
_PLAT_HEAD = f"""<h2 class="{T["h2"]} text-heading">Built on {PLATFORM_LABEL}</h2>
          <p class="{T["lede"]} text-body">{PLATFORM_DESC}</p>"""
_LOGO_ROW = f"""<ul class="flex flex-wrap items-center gap-x-8 gap-y-5">{"".join(f'<li><img src="{P}/logos/{f}" alt="{a}" class="h-6 w-auto sm:h-7" /></li>' for f, a in MS_LOGOS)}</ul>"""

_SLABS = [
    ("Frontline", "Sognos solution", "slab-top", None),
    ("Power Platform", "Workflow automation and reporting", "slab-mid", "platform/PowerAutomate_scalable.svg"),
    ("Copilot AI", "Intelligent scheduling", "slab-mid", "copilot-logo.svg"),
    ("Dynamics 365 Field Service", "Microsoft Dynamics 365", "slab-base", "Dynamics365.svg"),
]
# Layer stack, no rail: label + heading + lede + logo tiles left, the stack
# right. Motion: copy and logo tiles rise in, slabs build bottom-up, a
# signal runs up the connectors and lights each layer in turn (Dynamics ->
# Frontline), the Frontline slab's gradient drifts. Background tone is a
# review control (white / tint / navy / accent) on the Platform bar.
_CONNECTOR = '<div aria-hidden="true" class="plat-conn relative mx-auto h-7 w-px"><span class="plat-dot absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full"></span></div>'
# Layer-stack designs for Platform A (review control "Stack"). All four share
# the tone tokens and the layer cycle in PLAT_JS (data-slab 0 = Dynamics ...
# 3 = Frontline; data-on marks the lit layer, data-k on the stack the step).
_BOTTOM_UP = list(reversed(_SLABS))  # Dynamics, Copilot, Power Platform, Frontline


def _logo_img(cls, logo, size="h-6"):
    if not logo:
        return f'<img src="{P}/logos/icon-sognos-care.svg" alt="" class="size-6 brightness-0 invert" />'
    return f'<img src="{P}/logos/{logo}" alt="" class="{size} w-auto {"brightness-0 invert" if cls == "slab-base" else ""}" />'


_DRIFT = '<span aria-hidden="true" class="m-drift absolute inset-0" style="background-image: linear-gradient(120deg, #1d96fc, #3b6fe0, #59bbf7, #1d96fc)"></span>'

# 1 · Isometric - three polished compositions (review control "Iso 1/2/3")
# in two image styles ("Base": tone panel, solid plates; "Paraform": the
# Frontline hero photo under a colour wash, frosted plates and labels, a
# blurred status pill). Plates have a thickness edge, a logo on every face,
# and lift when lit (shared layer cycle). Data is illustrative.
_ISO_GEOM = {
    # option: [(size px, x px, y px) bottom -> top], label side
    "1": [(230, 0, 96), (230, 0, 28), (230, 0, -40), (230, 0, -108)],      # exploded column
    "2": [(165, -54, 84), (165, -14, 30), (165, 26, -24), (165, 66, -78)],  # staircase
    "3": [(300, 0, 70), (236, 0, 18), (172, 0, -34), (108, 0, -86)],       # pyramid
}


def _iso_plate(i, n, d, cls, logo, size, x, y):
    face = f'<div class="iso-face {cls}">{_DRIFT if cls == "slab-top" else ""}<span class="iso-logo relative flex items-center justify-center rounded-full">{_logo_img(cls, logo, "h-7")}</span></div>'
    return f'''<div data-slab="{i}" class="iso-l" style="--s:{size}px;--x:{x}px;--y:{y}px;--i:{i}"><div class="iso-edge {cls}"></div>{face}</div>'''


def _iso_option(opt):
    geom = _ISO_GEOM[opt]
    plates = "".join(_iso_plate(i, *_BOTTOM_UP[i], *geom[i]) for i in range(4))
    if opt == "3":
        # pyramid: a pulse ring rises through the layers
        plates += '<div aria-hidden="true" class="iso-pulse"></div>'
    labels = "".join(
        f'''<li data-slab="{3 - k}" class="iso-label flx-rise flx-d{k + 1} flex items-center gap-3 rounded-lg border px-3 py-2.5"><span class="iso-num flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] tabular-nums">{4 - k}</span><div class="min-w-0"><p class="text-sm font-medium">{n}</p><p class="text-xs opacity-75">{d}</p></div><span class="iso-tick ml-auto size-2 shrink-0 rounded-full"></span></li>'''
        for k, (n, d, cls, logo) in enumerate(_SLABS)
    )
    return f'''<div data-iso="{opt}" class="iso-opt relative h-full">
            <div class="iso-stage absolute left-[30%] top-1/2 sm:left-[29%]">{plates}</div>
            <ul class="absolute right-[4%] top-1/2 w-[40%] max-w-[17rem] -translate-y-1/2 space-y-2">{labels}</ul>
          </div>'''


# Isometric scenes 4-6 - true 3D (CSS preserve-3d) on one tilted plane,
# 280 x 280 plane units. Cubes have top / south / east faces shaded from one
# light; the plane sits left, numbered layer labels right (shared cycle:
# data-slab 0 Dynamics ... 3 Frontline). Data is illustrative.

def _cube(x, y, w, d, h, kind, top="", slab=None, extra_cls="", style=""):
    s = f' data-slab="{slab}"' if slab is not None else ""
    return (f'<div class="c3 {extra_cls}"{s} style="left:{x}px;top:{y}px;width:{w}px;height:{d}px;--h:{h}px;{style}">'
            f'<div class="c3-s {kind}"></div><div class="c3-e {kind}"></div><div class="c3-top {kind}">{top}</div></div>')


def _top_logo(f, size=26, invert=False):
    return f'<img src="{P}/logos/{f}" alt="" class="c3-logo" style="width:{size}px;height:{size}px{";filter:brightness(0) invert(1)" if invert else ""}" />'


def _labels(rows):
    return "".join(
        f'''<li data-slab="{slab}" class="iso-label flx-rise flx-d{k + 1} flex items-center gap-3 rounded-lg border px-3 py-2.5"><span class="iso-num flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] tabular-nums">{4 - k}</span><div class="min-w-0"><p class="text-sm font-medium">{n}</p><p class="text-xs opacity-75">{d}</p></div><span class="iso-tick ml-auto size-2 shrink-0 rounded-full"></span></li>'''
        for k, (slab, n, d) in enumerate(rows)
    )


def _scene(opt, plane, rows):
    return f'''<div data-iso="{opt}" class="iso-opt relative h-full">
            <div class="iso3-wrap absolute left-[29%] top-1/2"><div class="iso3">{plane}</div></div>
            <ul class="absolute right-[4%] top-1/2 w-[40%] max-w-[17rem] -translate-y-1/2 space-y-2">{_labels(rows)}</ul>
          </div>'''


# 4 · Ops board - Dynamics is the floor; a Frontline van drives the job loop,
# Copilot's route draws itself, Power Automate and job pins sit on the board.
_PINS = [(212, 52), (212, 212), (52, 212)]
SCENE_OPS = _scene("4", f"""
              <div data-slab="0" class="iso3-floor k-floor"><svg viewBox="0 0 280 280" class="absolute inset-0 size-full" aria-hidden="true">
                <path d="M60 60 H220 V220 H60 Z" fill="none" stroke="rgb(255 255 255 / .16)" stroke-width="16" stroke-linejoin="round"/>
                <path data-slab="1" class="ops-route" d="M60 60 H220 V220 H60 Z" fill="none" stroke="#59bbf7" stroke-width="3" stroke-dasharray="8 8" stroke-linejoin="round"/>
              </svg><img src="{P}/logos/Dynamics365.svg" alt="" class="absolute bottom-4 right-4 h-6 w-auto opacity-60 brightness-0 invert" /></div>
              {"".join(f'<span class="ops-ping" style="left:{x - 14}px;top:{y - 14}px;animation-delay:{k * .8}s"></span>' for k, (x, y) in enumerate(_PINS))}
              {"".join(_cube(x - 7, y - 7, 14, 14, 18 + k * 6, "k-white") for k, (x, y) in enumerate(_PINS))}
              {_cube(110, 110, 60, 60, 34, "k-white", _top_logo("copilot-logo.svg", 30), slab=1)}
              {_cube(30, 150, 44, 44, 22, "k-white", _top_logo("platform/PowerAutomate_scalable.svg", 24), slab=2)}
              {_cube(26, 26, 64, 64, 54, "k-accent", _top_logo("icon-sognos-care.svg", 28, True), slab=3)}
              {_cube(0, 0, 26, 16, 14, "k-van", "", extra_cls="ops-van")}
""", [(3, "Frontline", "Depot + van on the job loop"), (2, "Power Platform", "Automates the follow-ups"), (1, "Copilot AI", "Draws the best route"), (0, "Dynamics 365 Field Service", "The board everything runs on")])

# 5 · Modules - Dynamics is the core block; data packets run out along tracks
# to Copilot, Power Platform and Frontline, each lighting as packets land.
_CORE = (140, 140)
_MODS = [((37, 37), 1), ((233, 47), 2), ((220, 228), 3)]
SCENE_MODS = _scene("5", f"""
              <div class="iso3-floor k-grid"></div>
              <svg viewBox="0 0 280 280" class="absolute inset-0 size-full" aria-hidden="true">{"".join(f'<path d="M{_CORE[0]} {_CORE[1]} L{x} {y}" stroke="var(--s-conn)" stroke-width="4" stroke-linecap="round"/>' for (x, y), _ in _MODS)}</svg>
              {_cube(100, 100, 80, 80, 36, "k-navy", _top_logo("Dynamics365.svg", 34, True), slab=0)}
              {_cube(10, 10, 54, 54, 52, "k-white", _top_logo("copilot-logo.svg", 28), slab=1)}
              {_cube(206, 20, 54, 54, 40, "k-white", _top_logo("platform/PowerAutomate_scalable.svg", 26), slab=2)}
              {_cube(190, 198, 60, 60, 70, "k-accent", _top_logo("icon-sognos-care.svg", 28, True), slab=3)}
              {"".join(_cube(_CORE[0] - 5, _CORE[1] - 5, 10, 10, 10, "k-packet", extra_cls=f"mod-pk mod-pk{t}", style=f"animation-delay:{d}s") for t in (1, 2, 3) for d in (0, 1.1))}
""", [(3, "Frontline", "Field teams + mobile app"), (2, "Power Platform", "Workflows and reporting"), (1, "Copilot AI", "Scheduling intelligence"), (0, "Dynamics 365 Field Service", "Core data + work orders")])

# 6 · Device - the Frontline app on an isometric tablet; Dynamics, Copilot and
# Power Platform cards lift off the screen in turn and hover above it.
_ROWS = [("Job #4821 &middot; HVAC", "#34d399"), ("Job #4822 &middot; Electrical", "#1d96fc"), ("Job #4823 &middot; Plumbing", "#cbd5e1")]
_SCREEN = f"""<div class="dev-screen"><p class="dev-app">Frontline &middot; Today</p>{"".join(f'<p class="dev-row"><span style="background:{c}"></span>{t}</p>' for t, c in _ROWS)}</div>"""
_CARDS = [
    (0, 56, "k-navy", "Dynamics365.svg", True, "Work order #4821", "Created &middot; 08:42"),
    (1, 114, "k-white", "copilot-logo.svg", False, "Best slot &middot; 11:00", "P. Shah &middot; 4.2 km"),
    (2, 172, "k-white", "platform/PowerAutomate_scalable.svg", False, "Customer notified", "SMS + email sent"),
]
SCENE_DEVICE = _scene("6", f"""
              <div class="iso3-floor k-grid"></div>
              {_cube(40, 40, 200, 200, 12, "k-bezel", _SCREEN, slab=3)}
              {"".join(f'''<div data-slab="{s}" class="dev-card {kind}" style="--z:{z}px;--d:{s * .25}s"><span class="dev-ic">{_top_logo(logo, 22, inv)}</span><div><p class="dev-t">{t}</p><p class="dev-s">{sub}</p></div></div>''' for s, z, kind, logo, inv, t, sub in _CARDS)}
""", [(2, "Power Platform", "Automates the follow-up"), (1, "Copilot AI", "Suggests the slot"), (0, "Dynamics 365 Field Service", "Creates the work order"), (3, "Frontline", "The app in the field")])


STACK_ISO = f"""<div class="plat-panel iso-panel relative h-[480px] overflow-hidden rounded-lg border">
          <span aria-hidden="true" class="iso-photo absolute inset-0"></span>
          {"".join(_iso_option(o) for o in "123")}{SCENE_OPS}{SCENE_MODS}{SCENE_DEVICE}
          <p class="iso-pill absolute bottom-5 left-[30%] z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/40 bg-care-dark/30 px-4 py-2 text-xs text-white backdrop-blur-md"><span class="size-1.5 rounded-full bg-emerald-400"></span>Live on Dynamics 365 &middot; 4 layers</p>
        </div>"""

# 2 · Nested - each layer contains the next; Frontline is the core, a ripple
# runs outward from it and the lit layer is outlined.
def _nest(i):
    n, d, cls, logo = _BOTTOM_UP[i]
    head = f'<div class="relative flex items-center gap-3"><span class="flex size-9 shrink-0 items-center justify-center rounded {"bg-white/15" if cls != "slab-mid" else "bg-tint"}">{_logo_img(cls, logo, "h-5")}</span><div class="min-w-0"><p class="text-sm font-medium">{n}</p><p class="text-xs opacity-75">{d}</p></div></div>'
    if i == 3:
        return f'''<div data-slab="3" class="nest slab-top flx-rise flx-d4 relative mt-4 overflow-hidden rounded-lg p-5">{_DRIFT}<span aria-hidden="true" class="nest-ripple"></span><span aria-hidden="true" class="nest-ripple" style="animation-delay:1.2s"></span>{head}</div>'''
    tone = {0: "slab-base", 1: "slab-mid", 2: "nest-tint"}[i]
    return f'''<div data-slab="{i}" class="nest {tone} flx-rise flx-d{i + 1} relative rounded-lg border p-4 sm:p-5 {"mt-4" if i else ""}">{head}{_nest(i + 1)}</div>'''


STACK_NEST = f"""<div class="plat-panel rounded-lg border p-5 sm:p-8">{_nest(0)}</div>"""

# 3 · Flow - the layers side by side as a pipeline; a job travels through and
# each layer leaves its result behind.
_FLOW_RES = ["Work order created", "Best slot &middot; 11:00", "Approval sent", "Dispatched &middot; P. Shah"]
STACK_FLOW = f"""<div class="plat-panel rounded-lg border p-5 sm:p-8">
          <div data-flow class="relative">
            <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {"".join(f'''<div data-slab="{i}" data-col="{i}" class="flow-col {cls} flx-rise flx-d{i + 1} relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-lg border p-4">
                {_DRIFT if cls == "slab-top" else ""}
                <div class="relative"><span class="flex size-9 items-center justify-center rounded {"bg-white/15" if cls != "slab-mid" else "bg-tint"}">{_logo_img(cls, logo, "h-5")}</span><p class="mt-3 text-sm font-medium leading-snug">{n}</p></div>
                <p class="flow-res relative flex items-center gap-1.5 text-xs"><span class="text-emerald-500">&#10003;</span>{r}</p>
              </div>''' for i, ((n, d, cls, logo), r) in enumerate(zip(_BOTTOM_UP, _FLOW_RES)))}
            </div>
            <div class="relative mt-5 hidden h-10 sm:block">
              <span class="flow-track absolute inset-x-[12.5%] top-1/2 border-t-2 border-dashed"></span>
              <span class="flow-packet absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-care-dark px-3 py-1.5 text-xs font-medium text-white"><span class="size-1.5 rounded-full bg-accent"></span>Job #4821</span>
            </div>
          </div>
        </div>"""

STACK_OPTS = [("classic", "Classic"), ("iso", "Isometric"), ("nest", "Nested"), ("flow", "Flow")]

STACK_CSS = """<style>
  [data-plat-stack-v="classic"] [data-stack-v]:not([data-stack-v="classic"]), [data-plat-stack-v="iso"] [data-stack-v]:not([data-stack-v="iso"]),
  [data-plat-stack-v="nest"] [data-stack-v]:not([data-stack-v="nest"]), [data-plat-stack-v="flow"] [data-stack-v]:not([data-stack-v="flow"]) { display: none; }
  .plat-a .nest-tint { background: var(--s-panel-alt, #f9fafe); color: #0f1936; border-color: #e2e8f0; }
  [data-plat-bg="tint"] .plat-a { --s-panel-alt: #eef3fd; }
  [data-plat-bg="navy"] .plat-a .slab-base { border-color: rgb(255 255 255 / .25) !important; }
  /* Nested */
  .plat-a .nest { outline: 2px solid transparent; outline-offset: 3px; transition: outline-color .4s; }
  .plat-a .nest[data-on="true"] { outline-color: var(--s-sig); }
  @keyframes nest-ripple { from { transform: translate(-50%, -50%) scale(.2); opacity: .6; } to { transform: translate(-50%, -50%) scale(3.2); opacity: 0; } }
  .plat-a .nest-ripple { position: absolute; left: 50%; top: 50%; width: 120px; height: 120px; border-radius: 9999px; border: 2px solid rgb(255 255 255 / .6); pointer-events: none; }
  .plat-a .fv.is-in .nest-ripple { animation: nest-ripple 2.4s ease-out infinite; }
  /* Flow */
  .plat-a .flow-col { outline: 2px solid transparent; outline-offset: 3px; transition: outline-color .4s; }
  .plat-a .flow-col[data-on="true"] { outline-color: var(--s-sig); }
  .plat-a .flow-res { opacity: 0; transform: translateY(6px); transition: opacity .4s, transform .4s; }
  .plat-a .flow-track { border-color: var(--s-conn); }
  .plat-a .flow-packet { left: 12.5%; transition: left .9s cubic-bezier(.65,0,.35,1); }
  [data-k="1"] .flow-packet { left: 37.5%; } [data-k="2"] .flow-packet { left: 62.5%; } [data-k="3"] .flow-packet, [data-k="4"] .flow-packet, [data-k="5"] .flow-packet { left: 87.5%; }
""" + "\n".join(
    f'  [data-k="{k}"] [data-col="{i}"] .flow-res {{ opacity: 1; transform: none; }}' for k in range(6) for i in range(min(k, 3) + 1)
) + """
  @media (prefers-reduced-motion: reduce) {
    .plat-a .iso-layer { opacity: 1 !important; animation: none !important; }
    .plat-a .nest-ripple { animation: none !important; display: none; }
    .plat-a .flow-res { opacity: 1; transform: none; }
    .plat-a .flow-packet { left: 87.5%; transition: none; }
  }
</style>"""

STACK_BAR = '<p class="ml-2 mr-1 text-sm font-medium text-heading">Stack</p>' + "".join(
    f'<button type="button" data-plat-stackpick="{v}" aria-pressed="{str(v == "classic").lower()}" class="rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{n}</button>'
    for v, n in STACK_OPTS
)

STACK_JS = """<script>
  (() => {
    const root = document.querySelector("[data-plat-bg]"); if (!root) return;
    const set = (v) => {
      root.dataset.platStackV = v;
      document.querySelectorAll("[data-plat-stackpick]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.platStackpick === v)));
      try { localStorage.setItem("sognos-frontline-plat-stack", v); } catch {}
    };
    document.querySelectorAll("[data-plat-stackpick]").forEach((b) => b.addEventListener("click", () => set(b.dataset.platStackpick)));
    let v = "classic"; try { v = localStorage.getItem("sognos-frontline-plat-stack") || v; } catch {} set(v);
  })();
</script>"""

ISO_CSS = f"""
  /* Isometric: option + style */
  [data-iso-v="1"] .iso-opt:not([data-iso="1"]), [data-iso-v="2"] .iso-opt:not([data-iso="2"]), [data-iso-v="3"] .iso-opt:not([data-iso="3"]), [data-iso-v="4"] .iso-opt:not([data-iso="4"]), [data-iso-v="5"] .iso-opt:not([data-iso="5"]), [data-iso-v="6"] .iso-opt:not([data-iso="6"]) {{ display: none; }}
  .plat-a .iso-photo, .plat-a .iso-pill {{ display: none; }}
  .plat-a .iso-stage {{ width: 0; height: 0; }}
  .plat-a .iso-l {{ position: absolute; left: 0; top: 0; width: var(--s); height: var(--s); margin: calc(var(--s) / -2) 0 0 calc(var(--s) / -2); opacity: 0; transform: translate(var(--x), var(--y)); transition: transform .6s cubic-bezier(.22,1,.36,1); }}
  .plat-a .fv.is-in .iso-l {{ opacity: 1; animation: iso2-in .9s cubic-bezier(.22,1,.36,1) backwards; animation-delay: calc(var(--i) * .16s); }}
  @keyframes iso2-in {{ from {{ opacity: 0; transform: translate(var(--x), calc(var(--y) - 120px)); }} to {{ opacity: 1; transform: translate(var(--x), var(--y)); }} }}
  .plat-a .iso-l[data-on="true"] {{ transform: translate(var(--x), calc(var(--y) - 16px)); }}
  .plat-a .iso-face, .plat-a .iso-edge {{ position: absolute; inset: 0; border-radius: 22px; transform: rotateX(58deg) rotateZ(-45deg); }}
  .plat-a .iso-edge {{ transform: translateY(10px) rotateX(58deg) rotateZ(-45deg); }}
  .plat-a .iso-face {{ display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid transparent; transition: border-color .4s, background-color .4s; }}
  .plat-a .iso-logo {{ width: 52px; height: 52px; background: rgb(255 255 255 / .14); transform: rotateZ(45deg) scaleY(1.85); }}
  .plat-a .iso-face.slab-mid .iso-logo {{ background: #fff; border: 1px solid #e2e8f0; }}
  /* Base plate colours (follow the section tone) */
  .plat-a .iso-face.slab-base {{ background: var(--s-base); }} .plat-a .iso-edge.slab-base {{ background: #060e28; }}
  .plat-a .iso-face.slab-mid {{ background: #eef4fe; border-color: #b9cdf3; }} .plat-a .iso-edge.slab-mid {{ background: #b9cdf3; }}
  .plat-a .iso-face.slab-top {{ border-color: rgb(255 255 255 / .35); }} .plat-a .iso-edge.slab-top {{ background: #1b5fd0; }}
  .plat-a .iso-l[data-on="true"] .iso-face {{ border-color: var(--s-sig); }}
  [data-plat-bg="navy"] .plat-a .iso-face.slab-base {{ border-color: rgb(255 255 255 / .25); }}
  /* option 3 - pulse ring rising through the pyramid */
  .plat-a .iso-pulse {{ position: absolute; left: -60px; top: -60px; width: 120px; height: 120px; border: 2px solid var(--s-sig); border-radius: 22px; opacity: 0; transform: translateY(80px) rotateX(58deg) rotateZ(-45deg); }}
  .plat-a .fv.is-in .iso-pulse {{ animation: iso-rise 2.8s ease-in infinite 1s; }}
  @keyframes iso-rise {{ 0% {{ opacity: 0; transform: translateY(90px) rotateX(58deg) rotateZ(-45deg) scale(1.9); }} 20% {{ opacity: .9; }} 100% {{ opacity: 0; transform: translateY(-110px) rotateX(58deg) rotateZ(-45deg) scale(.5); }} }}
  /* labels */
  .plat-a .iso-label {{ background: var(--s-mid); color: var(--s-mid-t); border-color: #e2e8f0; transition: border-color .4s, transform .4s; }}
  .plat-a .iso-num {{ background: #f1f5f9; color: #0f1936; transition: background-color .4s, color .4s; }}
  .plat-a .iso-tick {{ background: transparent; transition: background-color .4s; }}
  .plat-a .iso-label[data-on="true"] {{ border-color: var(--s-sig); transform: translateX(-6px); }}
  .plat-a .iso-label[data-on="true"] .iso-num {{ background: #1d96fc; color: #fff; }}
  .plat-a .iso-label[data-on="true"] .iso-tick {{ background: #34d399; }}
  /* Paraform style */
  [data-iso-style="paraform"] .plat-a .iso-panel {{ border-color: transparent; }}
  [data-iso-style="paraform"] .plat-a .iso-photo {{ display: block; background: linear-gradient(160deg, rgb(15 25 54 / .55), rgb(29 150 252 / .28)), url({P}/images/solutions/FrontlineHero.webp) center / cover; }}
  [data-iso-style="paraform"] .plat-a .iso-pill {{ display: flex; }}
  [data-iso-style="paraform"] .plat-a .iso-face.slab-mid {{ background: rgb(255 255 255 / .6); border-color: rgb(255 255 255 / .75); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }}
  [data-iso-style="paraform"] .plat-a .iso-edge.slab-mid {{ background: rgb(255 255 255 / .35); }}
  [data-iso-style="paraform"] .plat-a .iso-face.slab-base {{ background: rgb(15 25 54 / .78); border-color: rgb(255 255 255 / .3); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }}
  [data-iso-style="paraform"] .plat-a .iso-edge.slab-base {{ background: rgb(6 14 40 / .7); }}
  [data-iso-style="paraform"] .plat-a .iso-label {{ background: rgb(255 255 255 / .72); border-color: rgb(255 255 255 / .6); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }}
  @media (prefers-reduced-motion: reduce) {{
    .plat-a .iso-l {{ opacity: 1 !important; animation: none !important; }}
    .plat-a .iso-l[data-on="true"] {{ transform: translate(var(--x), var(--y)); }}
    .plat-a .iso-pulse {{ display: none; }}
  }}
"""

ISO3_CSS = """
  /* 3D plane + cubes */
  .plat-a .iso3-wrap { width: 0; height: 0; transform: scale(1.15); }
  .plat-a .iso3 { position: absolute; left: -140px; top: -140px; width: 280px; height: 280px; transform: rotateX(58deg) rotateZ(-45deg); transform-style: preserve-3d; }
  .plat-a .iso3 > * { transform-style: preserve-3d; }
  .plat-a .iso3-floor { position: absolute; inset: 0; border-radius: 18px; }
  .plat-a .k-floor { background: var(--s-base); outline: 2px solid transparent; outline-offset: 6px; transition: outline-color .4s; }
  .plat-a .k-floor[data-on="true"] { outline-color: var(--s-sig); }
  .plat-a .k-grid { background-image: linear-gradient(var(--s-conn) 1px, transparent 1px), linear-gradient(90deg, var(--s-conn) 1px, transparent 1px); background-size: 28px 28px; opacity: .55; }
  .plat-a .c3 { position: absolute; transform-style: preserve-3d; transition: transform .6s cubic-bezier(.22,1,.36,1); }
  .plat-a .c3 > div { position: absolute; }
  .plat-a .c3-top { inset: 0; transform: translateZ(var(--h)); display: flex; align-items: center; justify-content: center; border-radius: 4px; overflow: hidden; }
  .plat-a .c3-s { left: 0; top: 100%; width: 100%; height: var(--h); transform-origin: top; transform: rotateX(90deg); }
  .plat-a .c3-e { right: 100%; top: 0; width: var(--h); height: 100%; transform-origin: right; transform: rotateY(90deg); }
  .plat-a .c3[data-on="true"] { transform: translateZ(14px); }
  .plat-a .c3[data-on="true"] > .c3-top { outline: 2px solid var(--s-sig); outline-offset: -2px; }
  .plat-a .c3-logo { transform: rotateZ(45deg) scaleY(1.85); object-fit: contain; }
  /* shading: top light, south mid, east dark */
  .plat-a .c3-top.k-white { background: #fff; } .plat-a .c3-s.k-white { background: #e3ebf9; } .plat-a .c3-e.k-white { background: #c6d6f2; }
  .plat-a .c3-top.k-navy, .plat-a .c3-top.k-bezel { background: #1b2a55; } .plat-a .c3-s.k-navy, .plat-a .c3-s.k-bezel { background: #0f1936; } .plat-a .c3-e.k-navy, .plat-a .c3-e.k-bezel { background: #08102a; }
  .plat-a .c3-top.k-accent { background: linear-gradient(135deg, #59bbf7, #1d96fc 60%, #3b6fe0); } .plat-a .c3-s.k-accent { background: #1679d8; } .plat-a .c3-e.k-accent { background: #0f5fb4; }
  .plat-a .c3-top.k-van { background: #fff; border-top: 5px solid #1d96fc; } .plat-a .c3-s.k-van { background: #dbe6f8; } .plat-a .c3-e.k-van { background: #b7cbef; }
  .plat-a .c3-top.k-packet { background: #59bbf7; } .plat-a .c3-s.k-packet { background: #1d96fc; } .plat-a .c3-e.k-packet { background: #1279d6; }
  [data-plat-bg="accent"] .plat-a .c3-top.k-accent { background: linear-gradient(135deg, #3b6fe0, #203e71); } [data-plat-bg="accent"] .plat-a .c3-s.k-accent { background: #182f63; } [data-plat-bg="accent"] .plat-a .c3-e.k-accent { background: #0f1f45; }
  [data-plat-bg="navy"] .plat-a .k-floor { box-sizing: border-box; border: 1px solid rgb(255 255 255 / .2); }
  /* 4 · ops board */
  @keyframes ops-van { 0% { left: 47px; top: 52px; } 25% { left: 207px; top: 52px; } 50% { left: 207px; top: 212px; } 75% { left: 47px; top: 212px; } 100% { left: 47px; top: 52px; } }
  .plat-a .fv.is-in .ops-van { animation: ops-van 9s linear infinite; }
  .plat-a .ops-van { left: 47px; top: 52px; margin: -8px 0 0 -13px; }
  @keyframes ops-dash { to { stroke-dashoffset: -32; } }
  .plat-a .fv.is-in .ops-route { animation: ops-dash 1s linear infinite; }
  @keyframes ops-ping { from { transform: scale(.4); opacity: .8; } to { transform: scale(2.2); opacity: 0; } }
  .plat-a .ops-ping { position: absolute; width: 28px; height: 28px; border-radius: 9999px; border: 2px solid #59bbf7; opacity: 0; }
  .plat-a .fv.is-in .ops-ping { animation: ops-ping 2.4s ease-out infinite; }
  /* 5 · modules: packets out along each track */
  @keyframes pk1 { from { left: 135px; top: 135px; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } to { left: 32px; top: 32px; opacity: 0; } }
  @keyframes pk2 { from { left: 135px; top: 135px; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } to { left: 228px; top: 42px; opacity: 0; } }
  @keyframes pk3 { from { left: 135px; top: 135px; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } to { left: 215px; top: 223px; opacity: 0; } }
  .plat-a .mod-pk { opacity: 0; }
  .plat-a .fv.is-in .mod-pk1 { animation: pk1 2.2s ease-in-out infinite; } .plat-a .fv.is-in .mod-pk2 { animation: pk2 2.2s ease-in-out infinite; } .plat-a .fv.is-in .mod-pk3 { animation: pk3 2.2s ease-in-out infinite; }
  /* 6 · device */
  .plat-a .dev-screen { position: absolute; inset: 10px; border-radius: 6px; background: #f9fafe; padding: 14px; display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: #0f1936; }
  .plat-a .dev-app { font-weight: 600; font-size: 13px; }
  .plat-a .dev-row { display: flex; align-items: center; gap: 8px; border-radius: 6px; background: #fff; border: 1px solid #e2e8f0; padding: 8px 10px; }
  .plat-a .dev-row span { width: 8px; height: 8px; border-radius: 9999px; flex: none; }
  .plat-a .dev-card { position: absolute; left: 92px; top: 52px; width: 152px; height: 92px; display: flex; gap: 10px; align-items: center; padding: 12px; border-radius: 10px; font-size: 12px; opacity: 0; transform: translateZ(12px); transition: outline-color .4s; outline: 2px solid transparent; outline-offset: 2px; }
  .plat-a .dev-card.k-white { background: rgb(255 255 255 / .96); color: #0f1936; border: 1px solid #e2e8f0; }
  .plat-a .dev-card.k-navy { background: #1b2a55; color: #fff; }
  .plat-a .dev-t { font-weight: 600; } .plat-a .dev-s { opacity: .7; margin-top: 2px; }
  .plat-a .dev-ic { flex: none; display: flex; }
  .plat-a .dev-ic .c3-logo { transform: none; }
  @keyframes dev-lift { from { opacity: 0; transform: translateZ(12px); } to { opacity: 1; transform: translateZ(var(--z)); } }
  @keyframes dev-bob { 0%, 100% { transform: translateZ(var(--z)); } 50% { transform: translateZ(calc(var(--z) + 8px)); } }
  .plat-a .fv.is-in .dev-card { opacity: 1; animation: dev-lift 1s cubic-bezier(.22,1,.36,1) backwards, dev-bob 4s ease-in-out infinite; animation-delay: var(--d), calc(1.2s + var(--d)); transform: translateZ(var(--z)); }
  .plat-a .dev-card[data-on="true"] { outline-color: var(--s-sig); }
  /* Paraform: frost the light surfaces */
  [data-iso-style="paraform"] .plat-a .c3-top.k-white, [data-iso-style="paraform"] .plat-a .dev-card.k-white { background: rgb(255 255 255 / .72); }
  [data-iso-style="paraform"] .plat-a .k-grid { opacity: .35; }
  @media (prefers-reduced-motion: reduce) {
    .plat-a .ops-van, .plat-a .ops-route, .plat-a .ops-ping, .plat-a .mod-pk { animation: none !important; }
    .plat-a .mod-pk, .plat-a .ops-ping { display: none; }
    .plat-a .dev-card { animation: none !important; opacity: 1; transform: translateZ(var(--z)); }
  }
"""

ISO_BAR = '<p class="ml-2 mr-1 text-sm font-medium text-heading">Iso</p>' + "".join(
    f'<button type="button" data-isopick="v:{v}" aria-pressed="{str(v == "1").lower()}" class="rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{v} &middot; {n}</button>'
    for v, n in [("1", "Exploded"), ("2", "Staircase"), ("3", "Pyramid"), ("4", "Ops board"), ("5", "Modules"), ("6", "Device")]
) + '<p class="ml-2 mr-1 text-sm font-medium text-heading">Iso style</p>' + "".join(
    f'<button type="button" data-isopick="style:{v}" aria-pressed="{str(v == "base").lower()}" class="rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{n}</button>'
    for v, n in [("base", "Base"), ("paraform", "Paraform")]
)

ISO_JS = """<script>
  (() => {
    const root = document.querySelector("[data-plat-bg]"); if (!root) return;
    const KEYS = { v: "isoV", style: "isoStyle" }, DEF = { v: "1", style: "base" };
    const set = (k, v) => {
      root.dataset[KEYS[k]] = v;
      document.querySelectorAll(`[data-isopick^="${k}:"]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.isopick === `${k}:${v}`)));
      try { localStorage.setItem("sognos-frontline-iso-" + k, v); } catch {}
    };
    document.querySelectorAll("[data-isopick]").forEach((b) => b.addEventListener("click", () => { const [k, v] = b.dataset.isopick.split(":"); set(k, v); }));
    Object.keys(DEF).forEach((k) => { let v = DEF[k]; try { v = localStorage.getItem("sognos-frontline-iso-" + k) || v; } catch {} set(k, v); });
  })();
</script>"""



PLAT_A = f"""<section id="platform" class="plat-a {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
      <div class="fv flex flex-col gap-4 lg:col-span-5">
        <div class="flx-rise"><p class="plat-label flex items-center gap-2.5 text-lg leading-[1.6]"><span aria-hidden="true" class="plat-mark block size-[0.66em] shrink-0"></span>Platform</p></div>
        <h2 class="flx-rise flx-d1 plat-h {T["h2"]}">Built on {PLATFORM_LABEL}</h2>
        <p class="flx-rise flx-d2 plat-b {T["lede"]}">{PLATFORM_DESC}</p>
        <ul class="plat-line mt-6 flex flex-wrap gap-2 border-t pt-8">
          {"".join(f'<li class="flx-rise" style="transition-delay:{.3 + k * .06:.2f}s"><span title="{a}" class="plat-tile flex size-12 items-center justify-center rounded-lg border"><img src="{P}/logos/{f}" alt="{a}" class="h-6 w-auto" /></span></li>' for k, (f, a) in enumerate(MS_LOGOS))}
        </ul>
      </div>
      <div class="fv lg:col-span-7">
        <div data-stack-v="classic"><div data-plat-stack class="plat-panel rounded-lg border p-6 sm:p-10">
          {_CONNECTOR.join(f'''<div data-slab="{3 - k}" class="flx-slab {cls} relative flex items-center gap-4 overflow-hidden rounded-lg border p-4 transition-[box-shadow,transform,border-color] duration-500 sm:p-5" style="transition-delay:{(3 - k) * .18 + .1:.2f}s;margin-inline:{k * 4}%">
            {"" if cls != "slab-top" else '<span aria-hidden="true" class="m-drift absolute inset-0" style="background-image: linear-gradient(120deg, #1d96fc, #3b6fe0, #59bbf7, #1d96fc)"></span>'}
            <span class="relative flex size-10 shrink-0 items-center justify-center rounded {"bg-white/15" if cls != "slab-mid" else "bg-tint"}">{f'<img src="{P}/logos/{logo}" alt="" class="h-6 w-auto {"brightness-0 invert" if cls == "slab-base" else ""}" />' if logo else f'<img src="{P}/logos/icon-sognos-care.svg" alt="" class="size-6 brightness-0 invert" />'}</span>
            <div class="relative min-w-0 flex-1"><p class="text-base font-medium">{n}</p><p class="text-sm opacity-75">{d}</p></div>
            <span aria-hidden="true" class="slab-live relative flex size-2.5 shrink-0"><span class="absolute inset-0 animate-ping rounded-full bg-emerald-400"></span><span class="relative size-2.5 rounded-full bg-emerald-400"></span></span>
          </div>''' for k, (n, d, cls, logo) in enumerate(_SLABS))}
        </div></div>
        <div data-stack-v="iso">{STACK_ISO}</div>
        <div data-stack-v="nest">{STACK_NEST}</div>
        <div data-stack-v="flow">{STACK_FLOW}</div>
      </div>
    </div>
  </div>
</section>"""

PLAT_TONES = [("white", "White"), ("tint", "Tint"), ("navy", "Navy"), ("accent", "Accent")]
PLAT_CSS = """<style>
  /* Tone tokens per background option (Platform A). */
  [data-plat-bg] .plat-a { --s-bg:#fff; --s-h:#0f1936; --s-b:#152248; --s-mark:#1d96fc; --s-line:#e2e8f0; --s-tile:#fff; --s-panel:#f9fafe; --s-panel-b:transparent; --s-mid:#fff; --s-mid-t:#0f1936; --s-base:#0f1936; --s-top-t:#fff; --s-conn:#cbd5e1; --s-sig:#1d96fc; transition: background-color .5s; background: var(--s-bg); }
  [data-plat-bg="tint"] .plat-a { --s-bg:#f9fafe; --s-panel:#fff; --s-panel-b:#e2e8f0; --s-mid:#f9fafe; }
  [data-plat-bg="navy"] .plat-a { --s-bg:#0f1936; --s-h:#fff; --s-b:rgb(255 255 255 / .75); --s-line:rgb(255 255 255 / .12); --s-tile:#fff; --s-panel:rgb(255 255 255 / .04); --s-panel-b:rgb(255 255 255 / .1); --s-mid:#fff; --s-base:#152248; --s-conn:rgb(255 255 255 / .25); --s-sig:#59bbf7; }
  [data-plat-bg="accent"] .plat-a { --s-bg:#1d96fc; --s-h:#fff; --s-b:rgb(255 255 255 / .85); --s-mark:#fff; --s-line:rgb(255 255 255 / .25); --s-tile:#fff; --s-panel:rgb(255 255 255 / .12); --s-panel-b:rgb(255 255 255 / .2); --s-mid:#fff; --s-base:#0f1936; --s-conn:rgb(255 255 255 / .45); --s-sig:#fff; }
  .plat-a .plat-h { color: var(--s-h); } .plat-a .plat-b, .plat-a .plat-label { color: var(--s-b); } .plat-a .plat-label { color: var(--s-h); }
  .plat-a .plat-mark { background: var(--s-mark); } .plat-a .plat-line { border-color: var(--s-line); }
  .plat-a .plat-tile { background: var(--s-tile); border-color: var(--s-line); transition: transform .3s; } .plat-a .plat-tile:hover { transform: translateY(-2px); }
  .plat-a .plat-panel { background: var(--s-panel); border-color: var(--s-panel-b); }
  .plat-a .slab-mid { background: var(--s-mid); color: var(--s-mid-t); border-color: #e2e8f0; }
  .plat-a .slab-base { background: var(--s-base); color: #fff; border-color: transparent; }
  .plat-a .slab-top { color: var(--s-top-t); border-color: transparent; }
  [data-plat-bg="accent"] .plat-a .slab-top > .m-drift { background-image: linear-gradient(120deg, #0f1936, #203e71, #3b6fe0, #0f1936) !important; }
  .plat-a .plat-conn { background: var(--s-conn); }
  /* Signal: a dot climbs each connector; the layer it reaches lights up. */
  @keyframes plat-climb { from { top: 100%; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } to { top: 0; opacity: 0; } }
  .plat-a .fv.is-in .plat-dot { background: var(--s-sig); animation: plat-climb 1.4s ease-in-out infinite; }
  .plat-a .slab-live { opacity: 0; transition: opacity .4s; }
  .plat-a .flx-slab[data-on="true"] { transform: translateX(6px); border-color: var(--s-sig); }
  .plat-a .flx-slab[data-on="true"] .slab-live { opacity: 1; }
  @media (prefers-reduced-motion: reduce) {
    .plat-a .plat-dot { animation: none !important; opacity: 0; }
    .plat-a .flx-slab[data-on="true"] { transform: none; }
    .plat-a .slab-live .animate-ping { animation: none; }
  }
</style>"""

PLAT_BAR = '<span class="mx-2 hidden h-5 w-px bg-line sm:block"></span><p class="mr-1 text-sm font-medium text-heading">A &middot; Background</p>' + "".join(
    f'<button type="button" data-plat-tone="{v}" aria-pressed="{str(v == "white").lower()}" class="rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{n}</button>'
    for v, n in PLAT_TONES
)

PLAT_JS = """<script>
  (() => {
    const root = document.querySelector("[data-plat-bg]"); if (!root) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const set = (v) => {
      root.dataset.platBg = v;
      document.querySelectorAll("[data-plat-tone]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.platTone === v)));
      try { localStorage.setItem("sognos-frontline-plat-bg", v); } catch {}
    };
    document.querySelectorAll("[data-plat-tone]").forEach((b) => b.addEventListener("click", () => set(b.dataset.platTone)));
    let v = "white"; try { v = localStorage.getItem("sognos-frontline-plat-bg") || v; } catch {} set(v);
    // Light the layers bottom-up (Dynamics 0 -> Frontline 3), hold, restart.
    const slabs = [...root.querySelectorAll("[data-slab]")];
    if (!slabs.length) return;
    if (reduce) { slabs.forEach((s) => (s.dataset.on = String(s.dataset.slab === "3"))); root.querySelectorAll("[data-flow]").forEach((f) => (f.dataset.k = 3)); return; }
    // Drop the build-in stagger once it has played so highlights respond at once.
    setTimeout(() => slabs.forEach((s) => (s.style.transitionDelay = "0s")), 2000);
    let k = -1;
    const flows = [...root.querySelectorAll("[data-flow]")];
    setInterval(() => { k = (k + 1) % 6; slabs.forEach((s) => (s.dataset.on = String(+s.dataset.slab === k))); flows.forEach((f) => (f.dataset.k = k)); }, 1400);
  })();
</script>"""


# Hub: Frontline centre, seven platform logos round it, dots run the spokes.
_HUB = [(500, 200), (210, 80), (790, 80), (130, 230), (870, 230), (240, 360), (760, 360)]
PLAT_B = f"""<section id="platform" class="bg-white {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center [&_p]:mx-auto">{label("Platform", sticky=False)}{_PLAT_HEAD}</div>
    <div class="fv relative mx-auto {GAP} aspect-[1000/440] w-full max-w-5xl overflow-hidden rounded-lg bg-tint">
      <svg viewBox="0 0 1000 440" class="absolute inset-0 size-full" fill="none" aria-hidden="true">
        {"".join(f'<path id="spoke{k}" class="flow" d="M500 220 L{x} {y}" stroke="#cbd5e1" stroke-width="1.5"/>' for k, (x, y) in enumerate(_HUB[1:]))}
        {"".join(f'<circle class="flx-anim" r="4" fill="#1d96fc"><animateMotion dur="{2.4 + k * .3:.1f}s" repeatCount="indefinite" begin="{k * .4:.1f}s"><mpath href="#spoke{k}"/></animateMotion></circle>' for k in range(6))}
      </svg>
      {"".join(f'''<div class="flx-rise flx-d{min(k, 4)} absolute flex h-[13%] w-[17%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-line bg-white" style="left:{x / 10}%;top:{y / 4.4}%"><img src="{P}/logos/{f}" alt="{a}" class="max-h-[55%] max-w-[70%] object-contain" /></div>''' for k, ((x, y), (f, a)) in enumerate(zip(_HUB[1:], MS_LOGOS[:6])))}
      <div class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
        <div class="rounded-2xl p-[2px]" style="background: linear-gradient(135deg, #59bbf7, #1d96fc, #3b6fe0)"><div class="m-drift flex size-20 items-center justify-center rounded-[14px] sm:size-28" style="background-image: linear-gradient(135deg, #1d96fc, #3b6fe0, #59bbf7, #1d96fc)"><span class="font-heading text-base text-white sm:text-xl">Frontline</span></div></div>
      </div>
    </div>
    <div class="mx-auto mt-8 flex max-w-5xl justify-center"><span class="text-xs text-muted">Also on: <img src="{P}/logos/{MS_LOGOS[6][0]}" alt="{MS_LOGOS[6][1]}" class="ml-2 inline h-5 w-auto align-middle" /></span></div>
  </div>
</section>"""

_PC_CARDS = [
    ("Dynamics365.svg", "Dynamics 365 Field Service", "Built on Microsoft Dynamics 365 Field Service.",
     f"""<div class="fv relative h-36 overflow-hidden rounded bg-white/5"><svg viewBox="0 0 300 140" class="size-full" aria-hidden="true"><path d="M0 40 H300 M0 100 H300 M80 0 V140 M210 0 V140" stroke="rgb(255 255 255 / .08)" stroke-width="8"/><path class="route" d="M30 115 L80 100 L80 40 L210 40 L210 100 L270 100" stroke="#59bbf7" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>{"".join(f'<circle cx="{x}" cy="{y}" r="7" fill="#1d96fc" stroke="#152248" stroke-width="2"/>' for x, y in [(30, 115), (80, 40), (210, 100), (270, 100)])}</svg></div>"""),
    ("copilot-logo.svg", "Copilot AI", "Copilot AI for intelligent scheduling.",
     """<div class="fv relative h-36 overflow-hidden rounded bg-white/5 p-4 text-left" data-loop="type"><p class="text-[10px] font-medium uppercase tracking-widest text-accent">&#10022; Copilot</p><p class="mt-2 font-mono text-xs leading-relaxed text-white/85"><span data-type="Move J. Kelly's 2pm to 11am - same site, saves 38 min travel and clears the P2 callout."></span><span aria-hidden="true" class="ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 bg-accent align-middle"></span></p></div>"""),
    ("platform/PowerAutomate_scalable.svg", "Power Platform", "Power Platform for workflow automation and reporting.",
     f"""<div class="fv relative h-36 overflow-hidden rounded bg-white px-3 py-1" data-loop="run">{_HP}<ul class="divide-y divide-line">{_steps(["Job closed", "Invoice drafted", "Customer notified"])}</ul></div>"""),
]
PLAT_C = f"""<section id="platform" class="bg-care-dark {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Platform", "dark")}</div>
      <div class="{CONTENT}">
        <div class="{HEAD}"><h2 class="{T["h2"]} text-white">Built on {PLATFORM_LABEL}</h2><p class="{T["lede"]} text-white/75">{PLATFORM_DESC}</p></div>
        <div class="{GAP} grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">
          {"".join(f'''<article class="flex flex-col gap-5 rounded-lg border border-white/10 bg-white/5 p-5">
            {vis}
            <div><img src="{P}/logos/{logo}" alt="" class="h-6 w-auto" /><h3 class="mt-4 {T["h3sm"]} text-white">{n}</h3><p class="mt-1 {T["small"]} text-white/75">{d}</p></div>
          </article>''' for logo, n, d, vis in _PC_CARDS)}
        </div>
      </div>
    </div>
  </div>
</section>"""

# ── 06 Works with (1-3 products) ────────────────────────────────────────────
# Roster, Care, Genogram in that order; a "Products 1 / 2 / 3" control on the
# switcher bar sets how many show (data-count on each variant). Live names +
# taglines (lib/constants PRODUCTS). Graphic data is illustrative.
_WHEAD = f"""<h2 class="{T["h2"]} text-heading">Connects to the Sognos platform</h2>"""

# Genogram panel: two-generation family + support network, nodes rise in.
_GENO_SVG = """<svg viewBox="0 0 300 170" class="h-auto w-full" aria-hidden="true">
              <path d="M70 40 H140 M105 40 V80 M60 80 H150 M60 80 V110 M150 80 V110 M195 40 H250" stroke="#91278c" stroke-width="2" fill="none"/>
              <path class="flow" d="M150 125 C190 125 200 70 222 55" stroke="#c084c9" stroke-width="1.5" fill="none"/>
              <rect class="flx-rise flx-d1" x="55" y="27" width="26" height="26" rx="3" fill="#fff" stroke="#91278c" stroke-width="2"/>
              <circle class="flx-rise flx-d1" cx="140" cy="40" r="13" fill="#fff" stroke="#91278c" stroke-width="2"/>
              <rect class="flx-rise flx-d2" x="47" y="110" width="26" height="26" rx="3" fill="#fff" stroke="#91278c" stroke-width="2"/>
              <circle class="flx-rise flx-d2" cx="150" cy="123" r="13" fill="#91278c"/>
              <rect class="flx-rise flx-d3" x="182" y="27" width="26" height="26" rx="3" fill="#fff" stroke="#c084c9" stroke-width="2" stroke-dasharray="3 3"/>
              <circle class="flx-rise flx-d3" cx="250" cy="40" r="13" fill="#fff" stroke="#c084c9" stroke-width="2" stroke-dasharray="3 3"/>
              <text x="150" y="160" text-anchor="middle" font-size="10" fill="#68706f" font-family="sans-serif">Client</text>
              <text x="222" y="78" text-anchor="middle" font-size="10" fill="#68706f" font-family="sans-serif">Support network</text>
            </svg>"""
GENO_PANEL = f"""<div class="fv relative flex min-h-[340px] w-full items-center justify-center overflow-hidden rounded px-5 py-8 sm:p-8 md:min-h-[400px] lg:p-10" style="background:{_mx("#91278c", 8)}">
              <div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="{_C} p-4"><p class="text-sm font-medium text-heading">M. Turner &middot; family context</p>{_GENO_SVG}</div>
                <div data-in="2" class="{_C} flex items-center justify-between p-3 text-sm"><span class="text-body">Emergency contact</span><span class="font-medium text-heading">Daughter &middot; S. Turner</span></div>
              </div>
            </div>"""

PRODUCTS3 = [
    # name, tagline, colour logo, white logo, graphic panel, band gradient, accent, pairing (job, result-title, result-sub, status labels)
    dict(name="SognosRoster", tag="Workforce scheduling &amp; optimisation engine", logo="sognos-roster-logo-color.svg", wlogo="sognos-roster-logo.svg",
         panel=R_SCHED, band="linear-gradient(120deg, #03112f, #104b90, #1d96fc, #104b90, #03112f)", acc="#59bbf7",
         job=("Job #4821 &middot; HVAC service", "Level 3, North Sydney &middot; needs HVAC ticket"), res=(_avatar("PS", "size-10"), "P. Shah &middot; 4.2 km", "HVAC ticket &middot; available 11:00"),
         steps=("Job created", "Sent to SognosRoster", "Matching skills + distance&hellip;", "Worker assigned &#10003;")),
    dict(name="SognosCare", tag="Care operations &amp; compliance platform", logo="sognos-care-logo-color.svg", wlogo="sognos-care-logo.svg",
         panel=ns["FV_CASE"].replace('style="background:#f4f8f9"', f'style="background:{_mx("#3b6fe0", 8)}"', 1), band="linear-gradient(120deg, #0f1936, #203e71, #3b6fe0, #203e71, #0f1936)", acc="#8ea8f0",
         job=("Visit #2207 &middot; Personal care", "M. Turner &middot; checked out 10:02"), res=('<span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-care-dark text-xs font-medium text-white">MT</span>', "Care record &middot; M. Turner", "Progress note + service logged"),
         steps=("Visit completed", "Sent to SognosCare", "Checking funding rules&hellip;", "Care record updated &#10003;")),
    dict(name="SognosGenogram", tag="Relationship &amp; family context platform", logo="sognos-genogram-logo-color.svg", wlogo="SognosGenogram-logo.svg",
         panel=GENO_PANEL, band="linear-gradient(120deg, #1a0224, #4a1670, #91278c, #4a1670, #1a0224)", acc="#d9a6d6",
         job=("Site visit &middot; family home", "M. Turner &middot; new contact recorded"), res=('<span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#91278c] text-xs font-medium text-white">ST</span>', "Support network &middot; M. Turner", "2 family contacts linked"),
         steps=("Contact recorded", "Sent to SognosGenogram", "Mapping relationships&hellip;", "Network updated &#10003;")),
]


def _rlink(p):
    return f'<a href="#" class="inline-flex min-h-11 items-center gap-1.5 text-base font-medium text-heading transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">Explore {p["name"]} <span aria-hidden="true">&rarr;</span></a>'


def _works(body):
    return f"""<section id="works-with" class="bg-white {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Works with")}</div>
      <div class="{CONTENT}">
        <div class="{HEAD}">{_WHEAD}</div>
        {body}
      </div>
    </div>
  </div>
</section>"""


# Works with A - product cards. Three review controls (A only): card layout
# (stacked / alternating / 3-up grid), graphic (1 / 2 / 3 per product) and
# image style (Base: tint panel + white cards, as the gallery; Paraform:
# product photo under a colour wash, frosted cards, a blurred pill beneath).
# Graphic data is illustrative.

def _gp(body, loop=None):
    return ns["_panel"]("#f9fafe", loop, body)


# Genogram 2 - support network: client centre, six contacts round it.
_NET = [("Daughter", 150, 22), ("GP", 262, 62), ("Support worker", 262, 150), ("OT", 150, 190), ("Pharmacist", 38, 150), ("Neighbour", 38, 62)]
GENO_NETWORK = _gp(f"""<div data-in="1" class="{_C} w-full max-w-md p-4 text-left">
                <p class="text-sm font-medium text-heading">Support network &middot; M. Turner</p>
                <svg viewBox="0 0 300 212" class="mt-2 h-auto w-full" aria-hidden="true">
                  {"".join(f'<path class="flow" d="M150 106 L{x} {y}" stroke="#c084c9" stroke-width="1.5" fill="none"/>' for _, x, y in _NET)}
                  <circle cx="150" cy="106" r="22" fill="#91278c"/><text x="150" y="110" text-anchor="middle" font-size="11" fill="#fff" font-family="sans-serif">MT</text>
                  {"".join(f'<g class="flx-rise flx-d{min(k + 1, 4)}"><circle cx="{x}" cy="{y}" r="9" fill="#fff" stroke="#91278c" stroke-width="2"/><text x="{x}" y="{y + 22 if y > 106 else y - 14}" text-anchor="middle" font-size="9" fill="#68706f" font-family="sans-serif">{n}</text></g>' for k, (n, x, y) in enumerate(_NET))}
                </svg>
              </div>""")

# Genogram 3 - relationship history: dated events land in the record.
GENO_HISTORY = _gp(f"""<div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="{_C} overflow-hidden">
                  <div class="flex items-center justify-between border-b border-line px-4 py-3"><p class="text-sm font-medium text-heading">Relationship history</p><span class="text-[10px] uppercase tracking-widest text-muted">M. Turner</span></div>
                  <ol class="px-4 py-2">{"".join(f'<li class="flx-rise flx-d{min(k + 1, 4)} grid grid-cols-[3rem_1fr] gap-3 border-b border-line py-2.5 last:border-b-0"><span class="text-xs tabular-nums text-muted">{yr}</span><span class="text-sm text-heading">{ev}</span></li>' for k, (yr, ev) in enumerate([("2019", "Moved in with daughter, S. Turner"), ("2022", "S. Turner recorded as primary carer"), ("2025", "Bereavement - spouse"), ("2026", "Neighbour added as local contact")]))}</ol>
                </div>
                <p data-in="2" class="flex items-center gap-2 text-xs text-muted"><span class="size-1.5 rounded-full bg-[#91278c]"></span>Updated from a Frontline visit &middot; today</p>
              </div>""")

GFX = {
    "SognosRoster": [(R_SCHED, "Auto-roster &middot; 142 shifts filled"), (ns["R_MATCH"], "98% match &middot; P. Shah"), (ns["R_ROUTE"], "&minus;38 min travel today")],
    "SognosCare": [(ns["FV_CASE"], "Next review &middot; 12 Dec"), (ns["FV_COMPLIANCE"], "Audit-ready &middot; 0 gaps"), (ns["FV_COPILOT"], "Copilot draft ready to sign")],
    "SognosGenogram": [(GENO_PANEL, "2 family contacts linked"), (GENO_NETWORK, "Support network &middot; 6 people"), (GENO_HISTORY, "History updated from a visit")],
}
# Base panel tint + Paraform photo / wash per product.
PSTYLE = {
    "SognosRoster": (_mx("#59bbf7", 14), "RosterBg.avif", "#104b90", "#59bbf7"),
    "SognosCare": (_mx("#3b6fe0", 10), "CareBg.avif", "#0f1936", "#3b6fe0"),
    "SognosGenogram": (_mx("#91278c", 8), "GenoBg.avif", "#3a0f45", "#91278c"),
}


def _gfx(p):
    base, photo, deep, mid = PSTYLE[p["name"]]
    out = []
    for g, (panel, pill) in enumerate(GFX[p["name"]], 1):
        pill_html = f'<p data-pill class="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/40 bg-care-dark/30 px-4 py-2 text-xs text-white backdrop-blur-md"><span class="size-1.5 rounded-full" style="background:{mid}"></span>{pill}</p>'
        out.append(f'<div data-g="{g}" class="w-graphic relative" style="--pb:{base};--pimg:url({P}/product/{photo});--pdeep:{deep};--pmid:{mid}">{panel}{pill_html}</div>')
    return "".join(out)


WORKS_A = _works(f"""<div data-works-list class="works-a-list {GAP} space-y-3 lg:space-y-4">
          {"".join(f'''<div data-prod-i="{i}" class="w-card grid grid-cols-1 items-stretch gap-3 rounded-lg bg-tint p-3 md:grid-cols-2 lg:gap-4">
            <div class="w-copy flex flex-col justify-between gap-10 p-5 lg:p-8">
              <img src="{P}/logos/{p["logo"]}" alt="{p["name"]}" class="h-8 w-auto self-start" />
              <div><span aria-hidden="true" class="mb-5 block h-1 w-10 rounded-full" style="background:{PSTYLE[p["name"]][3]}"></span><p class="w-tag {T["h3"]} text-heading">{p["tag"]}</p><div class="mt-6">{_rlink(p)}</div></div>
            </div>
            <div class="w-graphics">{_gfx(p)}</div>
          </div>''' for i, p in enumerate(PRODUCTS3))}
        </div>""")

WORKS_A_CSS = """<style>
  /* Graphic 1 / 2 / 3 */
  [data-works-g="1"] .w-graphic:not([data-g="1"]), [data-works-g="2"] .w-graphic:not([data-g="2"]), [data-works-g="3"] .w-graphic:not([data-g="3"]) { display: none; }
  .w-graphic, .w-graphic > .fv { height: 100%; }
  /* Base style: product tint panel, white cards, no pill */
  [data-works-style="base"] .w-graphic > .fv { background: var(--pb) !important; }
  [data-works-style="base"] [data-pill] { display: none; }
  /* Paraform style: product photo under a colour wash, frosted cards, pill */
  [data-works-style="paraform"] .w-graphic > .fv {
    background: linear-gradient(160deg, color-mix(in srgb, var(--pdeep) 55%, transparent), color-mix(in srgb, var(--pmid) 35%, transparent)), var(--pimg) center / cover !important;
    padding-bottom: 4.5rem !important;
  }
  [data-works-style="paraform"] .w-graphic .bg-white { background: rgb(255 255 255 / .72) !important; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-color: rgb(255 255 255 / .6) !important; }
  [data-works-style="paraform"] .w-graphic .border-line { border-color: rgb(255 255 255 / .55); }
  [data-works-style="paraform"] .w-graphic .divide-line > * { border-color: rgb(15 25 54 / .08); }
  [data-works-style="paraform"] .w-graphic [data-in="2"].text-muted, [data-works-style="paraform"] .w-graphic > .fv > div > p.text-muted { color: rgb(255 255 255 / .85); }
  /* Layout: alternating - graphic leads on every second card */
  @media (min-width: 768px) {
    [data-works-layout="alt"] .w-card:nth-child(even) .w-graphics { order: -1; }
    /* Layout: 3-up grid - graphic on top, copy below, cards side by side */
    [data-works-layout="grid"] .works-a-list { display: grid; gap: 1rem; }
    [data-works-layout="grid"] .works-a-list > * + * { margin-top: 0; }
    [data-works-layout="grid"][data-works-count="2"] .works-a-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    [data-works-layout="grid"][data-works-count="3"] .works-a-list { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    [data-works-layout="grid"] .w-card { grid-template-columns: minmax(0, 1fr); align-content: start; }
    [data-works-layout="grid"] .w-graphics { order: -1; }
    [data-works-layout="grid"] .w-copy { gap: 1.5rem; padding: 1.25rem; }
    [data-works-layout="grid"]:not([data-works-count="1"]) .w-tag { font-size: 1.25rem; }
    [data-works-layout="grid"]:not([data-works-count="1"]) .w-graphic > .fv { min-height: 360px; padding: 1.25rem; }
  }
</style>"""

_PILLBTN = "rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white"
WORKS_A_BAR = (
    '<span class="mx-2 hidden h-5 w-px bg-line sm:block"></span><p class="mr-1 text-sm font-medium text-heading">A &middot; Layout</p>'
    + "".join(f'<button type="button" data-wa="layout:{v}" aria-pressed="{str(v == "stack").lower()}" class="{_PILLBTN}">{n}</button>' for v, n in [("stack", "Stacked"), ("alt", "Alternating"), ("grid", "Grid")])
    + '<p class="ml-2 mr-1 text-sm font-medium text-heading">Graphic</p>'
    + "".join(f'<button type="button" data-wa="g:{v}" aria-pressed="{str(v == "1").lower()}" class="{_PILLBTN}">{v}</button>' for v in "123")
    + '<p class="ml-2 mr-1 text-sm font-medium text-heading">Style</p>'
    + "".join(f'<button type="button" data-wa="style:{v}" aria-pressed="{str(v == "base").lower()}" class="{_PILLBTN}">{n}</button>' for v, n in [("base", "Base"), ("paraform", "Paraform")])
)

WORKS_A_JS = """<script>
  (() => {
    const root = document.querySelector("[data-works-root]"); if (!root) return;
    const KEYS = { layout: "worksLayout", g: "worksG", style: "worksStyle" };
    const set = (k, v) => {
      root.dataset[KEYS[k]] = v;
      document.querySelectorAll(`[data-wa^="${k}:"]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.wa === `${k}:${v}`)));
      try { localStorage.setItem("sognos-frontline-wa-" + k, v); } catch {}
    };
    document.querySelectorAll("[data-wa]").forEach((b) => b.addEventListener("click", () => { const [k, v] = b.dataset.wa.split(":"); set(k, v); }));
    const DEF = { layout: "stack", g: "1", style: "base" };
    Object.keys(DEF).forEach((k) => { let v = DEF[k]; try { v = localStorage.getItem("sognos-frontline-wa-" + k) || v; } catch {} set(k, v); });
  })();
</script>"""

WORKS_B = _works(f"""<div data-works-list class="{GAP} space-y-3 lg:space-y-4">
          {"".join(f'''<div data-prod-i="{i}" data-pair="0" class="rounded-lg bg-tint p-5 sm:p-8">
            <div class="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_minmax(8rem,1fr)_1fr]">
              <div class="{_C} p-4 text-left">
                <p class="text-[10px] uppercase tracking-widest text-muted">Frontline</p>
                <p class="mt-1 text-sm font-medium text-heading">{p["job"][0]}</p>
                <p class="text-xs text-muted">{p["job"][1]}</p>
              </div>
              <div class="relative mx-auto h-3 w-full max-w-xs">
                <span class="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-accent/40"></span>
                <span class="pair-dot absolute top-0 size-3 rounded-full bg-care-dark"></span>
                <p class="absolute inset-x-0 top-5 text-center text-xs text-muted">{"".join(f'<span data-ps="{k}">{t}</span>' for k, t in enumerate(p["steps"]))}</p>
              </div>
              <div class="pair-worker {_C} flex items-center gap-3 p-4 text-left transition-colors">
                {p["res"][0]}
                <div class="min-w-0 flex-1"><p class="text-[10px] uppercase tracking-widest text-muted">{p["name"]}</p><p class="mt-1 text-sm font-medium text-heading">{p["res"][1]}</p><p class="text-xs text-muted">{p["res"][2]}</p></div>
                <span class="pair-tick flex size-6 items-center justify-center rounded-full bg-emerald-600 text-[11px] text-white opacity-0 transition-opacity">&#10003;</span>
              </div>
            </div>
            <div class="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5"><span class="flex items-center gap-4"><img src="{P}/logos/{p["logo"]}" alt="{p["name"]}" class="h-6 w-auto" /><span class="hidden {T["small"]} text-muted sm:inline">{p["tag"]}</span></span>{_rlink(p)}</div>
          </div>''' for i, p in enumerate(PRODUCTS3))}
        </div>""")

WORKS_C = _works(f"""<div data-works-list class="works-c-grid {GAP} grid grid-cols-1 gap-3 lg:gap-4">
          {"".join(f'''<a href="#" data-prod-i="{i}" class="group relative block overflow-hidden rounded-lg p-8 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:p-10">
            <span aria-hidden="true" class="m-drift absolute inset-0" style="background-image: {p["band"]}"></span>
            <span aria-hidden="true" class="works-c-slots absolute inset-y-6 right-6 hidden w-[42%] grid-cols-5 grid-rows-4 gap-1.5">{"".join(f'<span class="flx-slot rounded-sm bg-white" style="animation-delay:{(k * 37 % 23) / 10:.1f}s"></span>' for k in range(20))}</span>
            <span class="relative flex max-w-md flex-col gap-6">
              <img src="{P}/logos/{p["wlogo"]}" alt="{p["name"]}" class="h-8 w-auto self-start brightness-0 invert" />
              <span class="{T["h3"]} text-white">{p["tag"]}</span>
              <span class="works-c-cta inline-flex whitespace-nowrap min-h-11 items-center gap-1.5 self-start rounded-full bg-white px-6 text-base font-medium text-heading transition-colors group-hover:bg-accent group-hover:text-white">Explore {p["name"]} <span aria-hidden="true">&rarr;</span></span>
            </span>
          </a>''' for i, p in enumerate(PRODUCTS3))}
        </div>""")

# Product-count control (Works with only). Hides items past the count; the
# band layout goes to 2 / 3 columns and drops its slot grid when shared.
WORKS_COUNT_CSS = """<style>
  [data-works-count="1"] [data-prod-i="1"], [data-works-count="1"] [data-prod-i="2"], [data-works-count="2"] [data-prod-i="2"] { display: none; }
  @media (min-width: 768px) {
    [data-works-count="1"] .works-c-slots { display: grid; }
    [data-works-count="2"] .works-c-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    [data-works-count="3"] .works-c-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    [data-works-count="3"] .works-c-grid .flex-col { gap: 1.25rem; }
    [data-works-count="3"] .works-c-grid > a { padding: 1.75rem; }
    [data-works-count="3"] .works-c-cta { padding-inline: 1rem; font-size: .875rem; }
  }
</style>"""

WORKS_COUNT_BAR = """<span class="mx-2 hidden h-5 w-px bg-line sm:block"></span><p class="mr-1 text-sm font-medium text-heading">Products</p>""" + "".join(
    f'<button type="button" data-works-n="{n}" aria-pressed="{str(n == 1).lower()}" class="rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{n}</button>'
    for n in (1, 2, 3)
)

WORKS_COUNT_JS = """<script>
  (() => {
    const root = document.querySelector("[data-works-root]"); if (!root) return;
    const set = (n) => {
      root.dataset.worksCount = n;
      document.querySelectorAll("[data-works-n]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.worksN === n)));
      try { localStorage.setItem("sognos-frontline-works-n", n); } catch {}
    };
    document.querySelectorAll("[data-works-n]").forEach((b) => b.addEventListener("click", () => set(b.dataset.worksN)));
    let n = "1"; try { n = localStorage.getItem("sognos-frontline-works-n") || "1"; } catch {}
    set(n);
  })();
</script>"""

# ── 07 Related ──────────────────────────────────────────────────────────────
# Mini graphics for the three related solutions (illustrative data).
REL_GFX = [
    f"""<div class="w-full max-w-[16rem] {_C} overflow-hidden text-left">
          <div class="flex items-center gap-2 border-b border-line p-2.5">{_avatar("EL", "size-6")}<p class="text-xs font-medium text-heading">E. Lane</p></div>
          <ul data-pool='[["Call logged", "2 min ago"], ["Email sent", "today"], ["Visit completed", "yesterday"], ["Case closed", "Mon"]]'>{"".join(f'<li class="flex items-center gap-2 border-b border-line px-2.5 py-1.5 last:border-b-0"><span class="size-1 bg-accent"></span><p data-a class="flex-1 truncate text-[11px] text-heading">{a}</p><p data-b class="text-[10px] text-muted">{b}</p></li>' for a, b in [("Call logged", "2 min ago"), ("Email sent", "today"), ("Visit completed", "yesterday")])}</ul>
        </div>""",
    f"""<div class="w-full max-w-[16rem] {_C} p-3 text-left">
          <div class="flex items-center justify-between"><p class="text-xs font-medium text-heading">Case #CS-1182</p><span class="flx-chip relative h-5 w-20 text-[10px] font-medium"><span class="rounded-full bg-tint text-body">Open</span><span class="rounded-full bg-accent/15 text-heading">In progress</span><span class="rounded-full bg-emerald-100 text-emerald-800">Closed</span></span></div>
          <p class="mt-1 text-[11px] text-muted">Billing query &middot; P3</p>
          <p class="mt-3 flex justify-between text-[10px] text-muted"><span>SLA used</span><span>4h target</span></p>
          <div class="mt-1 h-1.5 overflow-hidden rounded-full bg-tint"><span class="flx-sla block h-full rounded-full bg-accent"></span></div>
        </div>""",
    f"""<div class="flex w-full max-w-[16rem] items-center gap-2">
          {"".join(f'<div class="{_C} flex flex-1 flex-col items-center gap-1.5 p-2.5"><img src="{P}/logos/platform/{f}" alt="" class="size-6" /><span class="text-[10px] text-heading">{n}</span></div>' + ('<svg viewBox="0 0 24 8" class="w-5 shrink-0" aria-hidden="true"><path class="flow" d="M0 4 H24" stroke="#1d96fc" stroke-width="2"/></svg>' if k < 2 else '') for k, (f, n) in enumerate([("PowerApps_scalable.svg", "App"), ("PowerAutomate_scalable.svg", "Flow"), ("PowerBI_scalable.svg", "Report")]))}
        </div>""",
]
REL_BG = ["#f9fafe", _mx("#1d96fc", 8), _mx("#3b6fe0", 8)]
_EXPLORE = '<span class="inline-flex items-center gap-1.5 text-sm font-medium text-heading group-hover:text-accent">Explore <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">&rarr;</span></span>'
_RHEAD = f"""<h2 class="{T["h2"]} text-heading">Extend your operation further</h2>"""


def _rel_panel(k, cls="h-48"):
    loop = ' data-loop="audit"' if k == 0 else ""
    return f'<div class="fv flex {cls} items-center justify-center rounded px-4" style="background:{REL_BG[k]}"{loop}>{REL_GFX[k]}</div>'


REL_A = f"""<section id="related" class="bg-tint {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Solutions")}</div>
      <div class="{CONTENT}">
        <div class="{HEAD}">{_RHEAD}</div>
        <div class="{GAP} grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">
          {"".join(f'''<a href="#" class="group flex flex-col gap-5 rounded-lg border border-line bg-white p-3 transition-colors hover:border-heading focus-visible:outline-2 focus-visible:outline-accent">
            {_rel_panel(k).replace('style="background:#f9fafe"', 'style="background:#f4f7fd"')}
            <div class="flex flex-1 flex-col px-3 pb-3"><h3 class="{T["h3sm"]} text-heading">{n}</h3><p class="mt-2 line-clamp-3 {T["small"]} text-body">{d}</p><div class="mt-auto pt-6">{_EXPLORE}</div></div>
          </a>''' for k, (n, d) in enumerate(RELATED))}
        </div>
      </div>
    </div>
  </div>
</section>"""

REL_B = f"""<section id="related" class="bg-tint {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Solutions")}</div>
      <div class="{CONTENT}">
        <div class="{HEAD}">{_RHEAD}</div>
        <ul class="{GAP} border-t border-line">
          {"".join(f'''<li><a href="#" class="group relative grid grid-cols-1 items-center gap-3 border-b border-line px-2 py-7 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-accent md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)_auto] md:gap-8 md:px-4">
            <h3 class="{T["h3"]} text-heading">{n}</h3>
            <p class="line-clamp-2 max-w-[52ch] {T["small"]} text-body">{d}</p>
            <span class="flex items-center gap-6">
              <span class="pointer-events-none hidden w-56 translate-x-3 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 lg:block">{_rel_panel(k, "h-32")}</span>
              <span aria-hidden="true" class="flex size-11 items-center justify-center rounded-full border border-line text-heading transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">&rarr;</span>
            </span>
          </a></li>''' for k, (n, d) in enumerate(RELATED))}
        </ul>
      </div>
    </div>
  </div>
</section>"""

REL_C = f"""<section id="related" class="bg-tint {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Solutions")}</div>
      <div class="{CONTENT}">
        <div class="flex items-end justify-between gap-6"><div class="{HEAD}">{_RHEAD}</div>
          <div class="hidden shrink-0 gap-2 md:flex">{"".join(f'<button type="button" data-rel-nav="{d}" aria-label="{"Previous" if d < 0 else "Next"}" class="flex size-11 items-center justify-center rounded-full border border-line bg-white text-heading transition-colors hover:border-heading focus-visible:outline-2 focus-visible:outline-accent">{"&larr;" if d < 0 else "&rarr;"}</button>' for d in (-1, 1))}</div>
        </div>
        <div data-rel-track class="rel-track {GAP} -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 lg:gap-4">
          {"".join(f'''<a href="#" class="group flex w-[85%] shrink-0 snap-start flex-col gap-5 rounded-lg bg-white p-3 transition-colors focus-visible:outline-2 focus-visible:outline-accent sm:w-[420px]">
            {_rel_panel(k, "h-56")}
            <div class="flex flex-1 flex-col px-3 pb-3"><span class="mb-3 h-1 w-10 rounded-full" style="background:{["#1d96fc", "#3b6fe0", "#59bbf7"][k]}"></span><h3 class="{T["h3sm"]} text-heading">{n}</h3><p class="mt-2 line-clamp-3 {T["small"]} text-body">{d}</p><div class="mt-auto pt-6">{_EXPLORE}</div></div>
          </a>''' for k, (n, d) in enumerate(RELATED))}
        </div>
      </div>
    </div>
  </div>
</section>"""

# ── Switchers ───────────────────────────────────────────────────────────────
# ── Platform D · rebuilt (2026-10-25) ───────────────────────────────────────
# Three layouts x three graphics x two image styles, the Works-with A pattern:
# gallery panels (white UI cards on a tint panel, .fv motion) in Base, or the
# Frontline hero photo under a wash with frosted cards + pill in Paraform.
# Copy is the live Platform copy; graphic data is illustrative.

def _ic(f, cls="size-4"):
    return f'<img src="{P}/logos/{f}" alt="" class="{cls} shrink-0 object-contain" />'


_PD_PANEL = ns["_panel"]

# G1 · Work order flow - one job runs through every layer.
PD_G1 = _PD_PANEL("#f9fafe", "run", f"""<div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="{_C} flex items-center justify-between gap-3 p-4"><div class="min-w-0"><p class="text-sm font-medium text-heading">Work order #4821</p><p class="text-xs text-muted">HVAC service &middot; Level 3, North Sydney</p></div><span class="shrink-0 rounded-full bg-tint px-2.5 py-1 text-[10px] font-medium text-heading">Priority P2</span></div>
                <div data-in="2" class="{_C} px-4 py-2">{_HP}<ul class="divide-y divide-line">{_steps([
                    f'<span class="flex items-center gap-2.5">{_ic("Dynamics365.svg")}Created in Dynamics 365</span>',
                    f'<span class="flex items-center gap-2.5">{_ic("copilot-logo.svg")}Copilot picks the slot &middot; 11:00</span>',
                    f'<span class="flex items-center gap-2.5">{_ic("platform/PowerAutomate_scalable.svg")}Customer notified</span>',
                    f'<span class="flex items-center gap-2.5">{_ic("icon-sognos-care.svg", "size-4 rounded-full bg-accent p-0.5 brightness-100")}Dispatched to Frontline</span>'])}</ul></div>
              </div>""")

# G2 · Copilot scheduling - the day board, then Copilot's suggestion types.
_BOARD = [("J. Kelly", [(4, 30, "bg-care-dark"), (40, 22, "bg-accent")]), ("P. Shah", [(10, 26, "bg-accent"), (52, 30, "bg-[#59bbf7]")]), ("E. Lane", [(0, 20, "bg-[#59bbf7]"), (30, 40, "bg-care-dark")])]
PD_G2 = _PD_PANEL("#f9fafe", "type", f"""<div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="{_C} p-4">
                  <div class="flex items-center justify-between"><p class="text-sm font-medium text-heading">Tuesday &middot; North Sydney crew</p><span class="text-[10px] text-muted">8:00 &ndash; 17:00</span></div>
                  <div class="mt-3 space-y-2">{"".join(f'<div class="flex items-center gap-3"><span class="w-14 shrink-0 text-[11px] text-muted">{n}</span><div class="relative h-5 flex-1 rounded bg-tint">{"".join(f"<span class=&quot;bar absolute inset-y-0 rounded {c}&quot; style=&quot;left:{l}%;width:{w}%;transition-delay:{k * 120}ms&quot;></span>".replace("&quot;", chr(34)) for k, (l, w, c) in enumerate(blocks))}</div></div>' for n, blocks in _BOARD)}</div>
                </div>
                <div data-in="2" class="rounded-lg border border-white/10 bg-care-dark p-4">
                  <p class="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent">{_ic("copilot-logo.svg")} Copilot suggestion</p>
                  <p class="mt-2 min-h-[3.25rem] font-mono text-[13px] leading-relaxed text-white/85"><span data-type="Move E. Lane's 2pm to 11am - same site as P. Shah, saves 38 min travel."></span><span aria-hidden="true" class="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-accent align-middle"></span></p>
                  <div class="mt-3 flex gap-2"><span class="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-heading">Apply</span><span class="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/80">Dismiss</span></div>
                </div>
              </div>""")

# G3 · Connected apps (enhanced) - four platform apps feed one live
# Frontline view: the active app lights, its line carries a pulse down, the
# sync row names it; KPIs count up, the trend draws.
_APPS = [("Dynamics365.svg", "Dynamics 365"), ("copilot-logo.svg", "Copilot"), ("platform/PowerAutomate_scalable.svg", "Automate"), ("platform/PowerBI_scalable.svg", "Power BI")]
_X = [37, 112, 188, 263]
PD_G3 = _PD_PANEL("#f9fafe", "count", f"""<div data-pd-cycle data-k="0" class="w-full max-w-md text-left">
                <div class="pd-chips grid grid-cols-4 gap-2">{"".join(f'<div data-in="{k + 1}" data-app="{k}" class="pd-chip {_C} flex flex-col items-center gap-1.5 px-2 py-3 transition-colors">{_ic(f, "size-6")}<span class="truncate text-[11px] font-medium text-heading">{n}</span></div>' for k, (f, n) in enumerate(_APPS))}</div>
                <svg viewBox="0 0 300 46" class="h-11 w-full" aria-hidden="true" fill="none">{"".join(f'<path data-app="{k}" class="pd-wire flow" d="M{x} 0 C{x} 26 150 20 150 46" stroke="#cbd5e1" stroke-width="2"/>' for k, x in enumerate(_X))}</svg>
                <div data-in="4" class="{_C} overflow-hidden">
                  <div class="flex items-center justify-between border-b border-line px-4 py-3"><p class="flex items-center gap-2 text-sm font-medium text-heading">{_ic("icon-sognos-care.svg", "size-5 rounded bg-accent p-0.5")}Frontline &middot; live</p><span class="flex items-center gap-1.5 text-[10px] text-muted"><span class="relative flex size-1.5"><span class="absolute inset-0 animate-ping rounded-full bg-emerald-500"></span><span class="relative size-1.5 rounded-full bg-emerald-500"></span></span>Synced</span></div>
                  <div class="grid grid-cols-3 gap-2 p-4 pb-2">{"".join(f'<div class="rounded bg-tint p-2.5"><p class="text-[10px] text-muted">{lab}</p><p class="mt-1 font-heading text-xl text-heading" data-count="{n}" data-suffix="{suf}">0{suf}</p></div>' for lab, n, suf in [("Jobs today", 128, ""), ("On time", 97, "%"), ("SLA met", 99, "%")])}</div>
                  <svg viewBox="0 0 300 50" class="h-12 w-full px-4" fill="none" aria-hidden="true"><path class="spark" d="M0 40 L30 36 L60 38 L90 28 L120 31 L150 22 L180 24 L210 15 L240 18 L270 9 L300 6" stroke="#1d96fc" stroke-width="2.5" stroke-linecap="round"/></svg>
                  <p class="flex items-center gap-2 border-t border-line px-4 py-2.5 text-xs text-muted"><span class="size-1.5 rounded-full bg-accent"></span>Last sync &middot; {"".join(f'<span data-app="{k}" class="pd-sync font-medium text-heading">{n}</span>' for k, (_, n) in enumerate(_APPS))} &middot; just now</p>
                </div>
              </div>""")

PD_GFX = [(PD_G1, "Work order dispatched &middot; 4 steps"), (PD_G2, "Copilot &middot; saves 38 min"), (PD_G3, "One data model &middot; live")]
PD_PART = [("Dynamics365.svg", "Dynamics 365 Field Service", "Built on Microsoft Dynamics 365 Field Service"), ("copilot-logo.svg", "Copilot AI", "Copilot AI for intelligent scheduling"), ("platform/PowerAutomate_scalable.svg", "Power Platform", "Power Platform for workflow automation and reporting")]


_PD_STRIP = f'<ul class="pd-strip absolute inset-x-0 top-5 z-10 hidden justify-center gap-1.5 px-4">{"".join(f"<li><span title=&quot;{a}&quot; class=&quot;flex size-10 items-center justify-center rounded-lg border border-line bg-white&quot;><img src=&quot;{P}/logos/{f}&quot; alt=&quot;{a}&quot; class=&quot;h-5 w-auto&quot; /></span></li>".replace("&quot;", chr(34)) for f, a in MS_LOGOS)}</ul>'


def _pd_graphic(k, panel, pill):
    return (f'<div data-g="{k}" class="pd-g relative">{_PD_STRIP}{panel}<p data-pill class="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/40 bg-care-dark/30 px-4 py-2 text-xs text-white backdrop-blur-md"><span class="size-1.5 rounded-full bg-[#59bbf7]"></span>{pill}</p></div>')


_PD_ALL = "".join(_pd_graphic(k, p, pl) for k, (p, pl) in enumerate(PD_GFX, 1))
_PD_LOGOS = f'<ul class="pd-copy-logos flex flex-wrap gap-2">{"".join(f"<li><span title=&quot;{a}&quot; class=&quot;flex size-12 items-center justify-center rounded-lg border border-line bg-white&quot;><img src=&quot;{P}/logos/{f}&quot; alt=&quot;{a}&quot; class=&quot;h-6 w-auto&quot; /></span></li>".replace("&quot;", chr(34)) for f, a in MS_LOGOS)}</ul>'
_PD_LABEL = label("Platform", sticky=False)
_PD_H2 = f'<h2 class="pd-h {T["h2"]} text-heading">Built on {PLATFORM_LABEL}</h2>'
_PD_DESC = f'<p class="pd-b {T["lede"]} text-body">{PLATFORM_DESC}</p>'
_PD_RULE = '<span aria-hidden="true" class="block h-1 w-10 rounded-full bg-accent"></span>'

# L1 · Split card - label pinned top; accent rule, heading, lede and logo
# tiles pinned bottom (Works-with A card rhythm); graphic right, 5 / 7.
PD_L1 = f"""<div data-pd-l="1" class="pd-frame grid grid-cols-1 items-stretch gap-3 rounded-lg border p-3 md:grid-cols-12 lg:gap-4">
          <div class="pd-copy flex flex-col justify-between gap-12 p-5 md:col-span-5 lg:p-8">{_PD_LABEL}<div class="flex flex-col gap-5">{_PD_RULE}{_PD_H2}{_PD_DESC}{_PD_LOGOS}</div></div>
          <div class="pd-gs md:col-span-7">{_PD_ALL}</div>
        </div>"""

# L2 · Centred - header centred, one wide graphic, logos beneath.
PD_L2 = f"""<div data-pd-l="2">
          <div class="pd-copy mx-auto flex max-w-3xl flex-col items-center gap-4 text-center [&_p]:mx-auto">{_PD_LABEL}{_PD_H2}{_PD_DESC}</div>
          <div class="pd-gs pd-frame pd-wide {GAP} rounded-lg border p-3">{_PD_ALL}</div>
          <div class="mt-8 flex justify-center">{_PD_LOGOS}</div>
        </div>"""

# L3 · Three-up - header row, then one card per platform part (graphics 1-3).
PD_L3 = f"""<div data-pd-l="3">
          <div class="pd-copy grid grid-cols-1 items-end gap-6 lg:grid-cols-2 lg:gap-8"><div class="flex flex-col gap-4">{_PD_LABEL}{_PD_H2}</div><div class="flex flex-col gap-6">{_PD_DESC}{_PD_LOGOS}</div></div>
          <div class="{GAP} grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">
            {"".join(f'''<article class="pd-frame flex flex-col gap-5 rounded-lg border p-3"><div class="pd-gs pd-fixed">{_pd_graphic(k, p, pl)}</div><div class="pd-copy px-3 pb-3"><span class="flex items-center gap-2">{_ic(f, "size-5")}<span class="pd-h {T["h3sm"]} text-heading">{n}</span></span><p class="pd-b mt-2 {T["small"]} text-body">{d}.</p></div></article>''' for k, ((p, pl), (f, n, d)) in enumerate(zip(PD_GFX, PD_PART), 1))}
          </div>
        </div>"""

PLAT_D_SECTION = f"""<section id="platform" class="pd-sec {SECTION}">
  <div class="mx-auto max-w-7xl px-6">{PD_L1}{PD_L2}{PD_L3}</div>
</section>"""

PD_CSS = f"""<style>
  [data-pd-layout="1"] [data-pd-l]:not([data-pd-l="1"]), [data-pd-layout="2"] [data-pd-l]:not([data-pd-l="2"]), [data-pd-layout="3"] [data-pd-l]:not([data-pd-l="3"]) {{ display: none; }}
  [data-pd-g="1"] .pd-gs:not(.pd-fixed) .pd-g:not([data-g="1"]), [data-pd-g="2"] .pd-gs:not(.pd-fixed) .pd-g:not([data-g="2"]), [data-pd-g="3"] .pd-gs:not(.pd-fixed) .pd-g:not([data-g="3"]) {{ display: none; }}
  .pd-g, .pd-g > .fv {{ height: 100%; }}
  .pd-wide .pd-g > .fv {{ min-height: 440px; }}
  .pd-fixed .pd-g > .fv {{ min-height: 360px; padding: 1.25rem; }}
  [data-pd-style="base"] .pd-g > .fv {{ background: color-mix(in srgb, #1d96fc 8%, white) !important; }}
  [data-pd-style="base"] .pd-g [data-pill] {{ display: none; }}
  [data-pd-style="paraform"] .pd-g > .fv {{ background: linear-gradient(160deg, color-mix(in srgb, var(--pd-deep) 55%, transparent), color-mix(in srgb, var(--pd-mid) 32%, transparent)), var(--pd-img) center / cover !important; padding-bottom: 4.5rem !important; }}
  /* Paraform photo + wash - the Works-with A options plus Frontline */
  [data-pd-photo="frontline"] {{ --pd-img: url({P}/images/solutions/FrontlineHero.webp); --pd-deep: #0f1936; --pd-mid: #1d96fc; }}
  [data-pd-photo="roster"] {{ --pd-img: url({P}/product/RosterBg.avif); --pd-deep: #104b90; --pd-mid: #59bbf7; }}
  [data-pd-photo="care"] {{ --pd-img: url({P}/product/CareBg.avif); --pd-deep: #0f1936; --pd-mid: #3b6fe0; }}
  [data-pd-photo="geno"] {{ --pd-img: url({P}/product/GenoBg.avif); --pd-deep: #3a0f45; --pd-mid: #91278c; }}
  /* Logos inside the graphic */
  [data-pd-logos="inside"] .pd-copy-logos {{ display: none; }}
  [data-pd-logos="inside"] .pd-strip {{ display: flex; }}
  [data-pd-logos="inside"] .pd-g > .fv {{ padding-top: 5.5rem !important; }}
  [data-pd-logos="inside"] .pd-fixed .pd-strip {{ gap: .25rem; }} [data-pd-logos="inside"] .pd-fixed .pd-strip span {{ width: 2rem; height: 2rem; }}
  /* Section tone */
  .pd-sec {{ background: #fff; transition: background-color .5s; }}
  .pd-frame {{ background: #f9fafe; border-color: transparent; }}
  [data-pd-bg="tint"] .pd-sec {{ background: #f9fafe; }} [data-pd-bg="tint"] .pd-frame {{ background: #fff; border-color: #e2e8f0; }}
  [data-pd-bg="navy"] .pd-sec {{ background: #0f1936; }} [data-pd-bg="navy"] .pd-frame {{ background: rgb(255 255 255 / .04); border-color: rgb(255 255 255 / .1); }}
  [data-pd-bg="accent"] .pd-sec {{ background: #1d96fc; }} [data-pd-bg="accent"] .pd-frame {{ background: rgb(255 255 255 / .12); border-color: rgb(255 255 255 / .2); }}
  [data-pd-bg="navy"] .pd-copy .pd-h, [data-pd-bg="accent"] .pd-copy .pd-h, [data-pd-bg="navy"] .pd-copy p.text-heading, [data-pd-bg="accent"] .pd-copy p.text-heading {{ color: #fff; }}
  [data-pd-bg="navy"] .pd-copy .pd-b {{ color: rgb(255 255 255 / .75); }} [data-pd-bg="accent"] .pd-copy .pd-b {{ color: rgb(255 255 255 / .85); }}
  [data-pd-bg="accent"] .pd-copy .bg-accent {{ background: #fff; }}
  [data-pd-bg="navy"] .pd-copy-logos span, [data-pd-bg="accent"] .pd-copy-logos span {{ border-color: transparent; }}
  /* Connected apps: active app, its wire and the sync label */
  .pd-chip {{ transition: border-color .4s, transform .4s; }}
  .pd-sync {{ display: none; }}
  [data-pd-cycle][data-k="0"] [data-app="0"].pd-chip, [data-pd-cycle][data-k="1"] [data-app="1"].pd-chip, [data-pd-cycle][data-k="2"] [data-app="2"].pd-chip, [data-pd-cycle][data-k="3"] [data-app="3"].pd-chip {{ border-color: #1d96fc !important; transform: translateY(-3px); }}
  [data-pd-cycle][data-k="0"] [data-app="0"].pd-wire, [data-pd-cycle][data-k="1"] [data-app="1"].pd-wire, [data-pd-cycle][data-k="2"] [data-app="2"].pd-wire, [data-pd-cycle][data-k="3"] [data-app="3"].pd-wire {{ stroke: #1d96fc; stroke-width: 2.5; }}
  [data-pd-cycle][data-k="0"] [data-app="0"].pd-sync, [data-pd-cycle][data-k="1"] [data-app="1"].pd-sync, [data-pd-cycle][data-k="2"] [data-app="2"].pd-sync, [data-pd-cycle][data-k="3"] [data-app="3"].pd-sync {{ display: inline; }}
  [data-pd-logos="inside"] .pd-chips {{ display: none; }}
  [data-pd-style="paraform"] .pd-g .bg-white, [data-pd-style="paraform"] .pd-g .bg-tint {{ background: rgb(255 255 255 / .72) !important; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-color: rgb(255 255 255 / .6) !important; }}
  [data-pd-style="paraform"] .pd-g .divide-line > * {{ border-color: rgb(15 25 54 / .08); }}
</style>"""

_PDBTN = "rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white"
PD_BAR = f"""<div class="border-b border-line bg-white/95"><div class="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-3">
    <p class="mr-1 text-sm font-medium text-heading">D &middot; Layout</p>{"".join(f'<button type="button" data-pd="layout:{v}" aria-pressed="{str(v == "1").lower()}" class="{_PDBTN}">{n}</button>' for v, n in [("1", "Split card"), ("2", "Centred"), ("3", "Three-up")])}
    <p class="ml-2 mr-1 text-sm font-medium text-heading">Graphic</p>{"".join(f'<button type="button" data-pd="g:{v}" aria-pressed="{str(v == "1").lower()}" class="{_PDBTN}">{v} &middot; {n}</button>' for v, n in [("1", "Work order flow"), ("2", "Copilot scheduling"), ("3", "Connected apps")])}
    <p class="ml-2 mr-1 text-sm font-medium text-heading">Style</p>{"".join(f'<button type="button" data-pd="style:{v}" aria-pressed="{str(v == "base").lower()}" class="{_PDBTN}">{n}</button>' for v, n in [("base", "Base"), ("paraform", "Paraform")])}
    <p class="ml-2 mr-1 text-sm font-medium text-heading">Section</p>{"".join(f'<button type="button" data-pd="bg:{v}" aria-pressed="{str(v == "white").lower()}" class="{_PDBTN}">{n}</button>' for v, n in [("white", "White"), ("tint", "Tint"), ("navy", "Navy"), ("accent", "Accent")])}
    <p class="ml-2 mr-1 text-sm font-medium text-heading">Logos</p>{"".join(f'<button type="button" data-pd="logos:{v}" aria-pressed="{str(v == "copy").lower()}" class="{_PDBTN}">{n}</button>' for v, n in [("copy", "With copy"), ("inside", "Inside graphic")])}
    <p class="ml-2 mr-1 text-sm font-medium text-heading">Paraform photo</p>{"".join(f'<button type="button" data-pd="photo:{v}" aria-pressed="{str(v == "frontline").lower()}" class="{_PDBTN}">{n}</button>' for v, n in [("frontline", "Frontline"), ("roster", "Roster"), ("care", "Care"), ("geno", "Genogram")])}
    <p class="text-xs text-muted">Three-up shows graphics 1-3 together.</p>
  </div></div>"""

PD_JS = """<script>
  (() => {
    const root = document.querySelector("[data-pd-root]"); if (!root) return;
    const KEYS = { layout: "pdLayout", g: "pdG", style: "pdStyle", bg: "pdBg", logos: "pdLogos", photo: "pdPhoto" };
    const DEF = { layout: "1", g: "1", style: "base", bg: "white", logos: "copy", photo: "frontline" };
    const set = (k, v) => {
      root.dataset[KEYS[k]] = v;
      document.querySelectorAll(`[data-pd^="${k}:"]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.pd === `${k}:${v}`)));
      try { localStorage.setItem("sognos-frontline-pd-" + k, v); } catch {}
    };
    document.querySelectorAll("[data-pd]").forEach((b) => b.addEventListener("click", () => { const [k, v] = b.dataset.pd.split(":"); set(k, v); }));
    Object.keys(DEF).forEach((k) => { let v = DEF[k]; try { v = localStorage.getItem("sognos-frontline-pd-" + k) || v; } catch {} set(k, v); });
    // Connected apps: step the active app every 1.6s (static under reduced motion).
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      let k = 0; setInterval(() => { k = (k + 1) % 4; root.querySelectorAll("[data-pd-cycle]").forEach((c) => (c.dataset.k = k)); }, 1600);
    }
  })();
</script>"""

PLAT_D = f'<div data-pd-root data-pd-layout="1" data-pd-g="1" data-pd-style="base" data-pd-bg="white" data-pd-logos="copy" data-pd-photo="frontline">{PD_BAR}{PLAT_D_SECTION}</div>'


SECTION_OPTS = {
    "problem": ("The problem", [("a", "Symptom tiles", PROB_A), ("b", "Sticky rail", PROB_B), ("c", "Broken workflow", PROB_C)]),
    "platform": ("Platform", [("a", "Layer stack", PLAT_A), ("b", "Hub", PLAT_B), ("c", "Navy cards", PLAT_C), ("d", "Rebuilt", PLAT_D)]),
    "works": ("Works with", [("a", "Product card", WORKS_A), ("b", "Pairing", WORKS_B), ("c", "Roster band", WORKS_C)]),
    "related": ("Related", [("a", "Graphic cards", REL_A), ("b", "List rows", REL_B), ("c", "Slider", REL_C)]),
}


def switch_group(key):
    title, opts = SECTION_OPTS[key]
    bar = f"""<div class="border-y border-line bg-white/95">
  <div class="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-3">
    <p class="mr-2 text-sm font-medium text-heading">{title} layout</p>
    {"".join(f'<button type="button" data-sw-pick="{key}:{v}" aria-pressed="{str(v == "a").lower()}" class="rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{v.upper()} &middot; {n}</button>' for v, n, _ in opts)}
  </div>
</div>"""
    body = "".join(
        f'<div data-sw="{key}" data-sw-v="{v}"{"" if v == "a" else " hidden"}>{html.replace(chr(60) + "section id=", chr(60) + "section data-variant id=", 1) if v == "a" else html.replace(" id=" + chr(34), " data-id=" + chr(34), 1)}</div>'
        for v, n, html in opts
    )
    return bar + body


def works_group():
    """Works-with switcher + the 1 / 2 / 3 product-count control."""
    html = switch_group("works")
    bar_end = html.index("</div>\n</div>")
    html = html[:bar_end] + WORKS_COUNT_BAR + WORKS_A_BAR + "\n  " + html[bar_end:]
    return f'<div data-works-root data-works-count="1" data-works-layout="stack" data-works-g="1" data-works-style="base">{html}</div>'


def platform_group():
    """Platform switcher + the A background-tone control."""
    html = switch_group("platform")
    bar_end = html.index("</div>\n</div>")
    html = html[:bar_end] + PLAT_BAR + STACK_BAR + ISO_BAR + "\n  " + html[bar_end:]
    return f'<div data-plat-bg="white" data-plat-stack-v="classic" data-iso-v="1" data-iso-style="base">{html}</div>'


FLX_JS = """<script>
  (() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Section switchers (review-only), remembered per section.
    const show = (key, v) => {
      document.querySelectorAll(`[data-sw="${key}"]`).forEach((el) => (el.hidden = el.dataset.swV !== v));
      document.querySelectorAll(`[data-sw-pick^="${key}:"]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.swPick === `${key}:${v}`)));
      try { localStorage.setItem("sognos-frontline-sw-" + key, v); } catch {}
    };
    document.querySelectorAll("[data-sw-pick]").forEach((b) => b.addEventListener("click", () => { const [k, v] = b.dataset.swPick.split(":"); show(k, v); }));
    ["problem", "platform", "works", "related"].forEach((k) => { let v = null; try { v = localStorage.getItem("sognos-frontline-sw-" + k); } catch {} if (v) show(k, v); });

    // Problem A: call counter, SLA countdown, stale timer.
    const calls = document.querySelector("[data-calls]"), sla = document.querySelector("[data-sla]"), ring = document.querySelector("[data-sla-ring]"), note = document.querySelector("[data-sla-note]"), stale = document.querySelector("[data-stale]");
    if (reduce) { if (sla) { sla.textContent = "00:02:10"; ring.style.strokeDashoffset = 150; ring.style.stroke = "#ff8e90"; note.textContent = "Breach imminent"; } }
    else {
      let n = 1; setInterval(() => { n = n >= 7 ? 1 : n + 1; if (calls) calls.textContent = n; }, 900);
      let left = 899; setInterval(() => {
        left = left <= 120 ? 899 : left - 13;
        const m = Math.floor(left / 60), s = left % 60;
        if (sla) { sla.textContent = `00:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`; ring.style.strokeDashoffset = 175.9 * (1 - left / 960); const red = left < 300; ring.style.stroke = red ? "#ff8e90" : "#ffad6e"; note.textContent = red ? "Breach imminent" : "At risk"; note.style.color = red ? "#ff8e90" : "#ffad6e"; }
      }, 250);
      let mins = 124; setInterval(() => { mins = mins >= 190 ? 124 : mins + 1; if (stale) stale.textContent = `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, "0")}m`; }, 700);
    }

    // Problem C: the active pain walks the list + diagram badges.
    const pcs = [...document.querySelectorAll("[data-pc]")];
    if (pcs.length) { let k = 0; const set = () => { pcs.forEach((el) => (el.dataset.on = String(+el.dataset.pc === k + 1))); }; set(); if (!reduce) setInterval(() => { k = (k + 1) % 3; set(); }, 2200); }

    // Works B: job -> Roster -> matched worker back.
    // One loop per pairing row, offset so stacked rows don't move in lockstep.
    document.querySelectorAll("[data-pair]").forEach((pair, i) => {
      if (reduce) { pair.dataset.pair = "3"; return; }
      let p = 4 - (i % 5); setInterval(() => { p = (p + 1) % 5; pair.dataset.pair = String(Math.min(p, 3)); }, 1400);
    });

    // Related C: arrow buttons scroll the track by one card.
    const track = document.querySelector("[data-rel-track]");
    document.querySelectorAll("[data-rel-nav]").forEach((b) => b.addEventListener("click", () => {
      const card = track.firstElementChild; const step = card.getBoundingClientRect().width + 16;
      track.scrollBy({ left: step * +b.dataset.relNav, behavior: reduce ? "auto" : "smooth" });
    }));
  })();
</script>"""

FLX_NOTE = """Section options 2026-10-24 (review-only switchers above each section, remembered per section). Layout + styling only - live copy.
The problem: A symptom tiles (mismatch, SLA countdown, stale map) / B sticky rail, chips flip Issue -> Frontline fixes / C broken-workflow diagram synced to the list.
Platform: D rebuilt (layout Split / Centred / Three-up x graphic Work order flow / Copilot scheduling / Connected apps x style Base / Paraform, Works-with A pattern); A layer stack, no rail, background White / Tint / Navy / Accent, stack design Classic / Isometric / Nested / Flow / B hub, dots run the spokes to 6 platform logos / C care-dark band, 3 cards (route draws, Copilot types, automation runs).
Works with: Roster, Care, Genogram - "Products 1 / 2 / 3" control on the bar picks how many show. A product cards (layout stacked / alternating / grid; graphic 1-3 per product; style Base or Paraform) / B pairing rows (Frontline -> product) / C gradient bands (2-3 go side by side).
Related: A graphic cards / B list rows, graphic slides in on hover / C slider with arrows.
Graphic data is illustrative. Reduced motion: final states, nothing moves."""


if __name__ == "__main__":  # legacy switcher index; *_insp.py writes the Inspector index
    page("index.html", "Solutions / Frontline - polish pass mockups (approved direction)",
         """Approved 2026-10-24: Q2-A light hero; Q3 live Unsplash+ photo kept (licence to confirm); Q1 both capability layouts built - toggle bar above the section.
    Colour picker (bottom-right) recolours capability cards + graphics in both layouts.
    Unanswered / not approved: Q4 (Roster dot stays accent), S2 (no secondary hero link). Surfaces: white > navy > tint > platform (tone control) > white > tint. Trust-logo band removed from the index 2026-10-25.
    Audit: docs/audits/frontline-polish-audit.md. CTABand + Footer (global) not mocked.
    """ + FLX_NOTE,
         CSS + FLX_CSS + WORKS_COUNT_CSS + WORKS_A_CSS + PLAT_CSS + STACK_CSS + "<style>" + ISO_CSS + ISO3_CSS + "</style>" + PD_CSS + header("light") + HERO_A + switch_group("problem") + _tag_cards(CAPS_BOTH) + platform_group() + works_group() + switch_group("related") + JS + FL_PICKER + FLX_JS + WORKS_COUNT_JS + WORKS_A_JS + PLAT_JS + STACK_JS + ISO_JS + PD_JS)
print("\n".join(sorted(p.name for p in FL_OUT.glob("*.html"))))
