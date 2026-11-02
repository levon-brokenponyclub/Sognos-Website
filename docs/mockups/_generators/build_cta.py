"""Home · CTA band - five layout options (2026-11-02, design-taste-frontend pass).
Writes docs/mockups/home/cta-options.html. Run from the redesign repo root:
  python3 -I docs/mockups/_generators/build_cta.py

Single section, so no direction draw: Sognos tokens and type, house rules (no eyebrow, no
rules, no gradients, no shadows) and one idea per option taken from the CTA itself - the
30-minute walkthrough, the three products, the people who run it. Neighbours on the page:
Solutions (white) above, Industries slider (tint) below, so every option is a field of colour.
Headline and line are live copy; agenda lines are SUGGESTED. Rounded / rounded-lg only.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
P = "../../../public"
OUT = ROOT / "docs/mockups/home/cta-options.html"

H = "Stop managing complexity.", "Start delivering outcomes."
LINE = "A 30-minute walkthrough with a Sognos specialist, on your own service model."
FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4"

# SUGGESTED agenda copy - one per service model (A).
AGENDA = {
    "care": ("Care operations", [("0&ndash;5", "Your service model and the outcomes you report on"),
                                  ("5&ndash;15", "Referral to case plan in SognosCare"),
                                  ("15&ndash;25", "Compliance and the audit trail, live"),
                                  ("25&ndash;30", "Your questions and next steps")]),
    "field": ("Field service", [("0&ndash;5", "Your service model and SLAs"),
                                ("5&ndash;15", "Dispatch and job tracking in Frontline"),
                                ("15&ndash;25", "The mobile app and SLA alerts, live"),
                                ("25&ndash;30", "Your questions and next steps")]),
    "work": ("Workforce", [("0&ndash;5", "Your rosters and where they break"),
                           ("5&ndash;15", "Skills-matched rostering in SognosRoster"),
                           ("15&ndash;25", "Real-time changes and route optimisation"),
                           ("25&ndash;30", "Your questions and next steps")]),
}

PRODUCTS = [
    ("SognosCare", "Care operations &amp; compliance", "logos/sognos-care-logo-color.svg", "product/CareBg.avif", "#0f1936", "#3b6fe0"),
    ("SognosRoster", "Workforce scheduling &amp; optimisation", "logos/sognos-roster-logo-color.svg", "product/RosterBg.avif", "#104b90", "#59bbf7"),
    ("SognosGenogram", "Relationship &amp; family context", "logos/sognos-genogram-logo-color.svg", "product/GenoBg.avif", "#3a0f45", "#91278c"),
]


# 28px on phones keeps each sentence on one line (two lines total) at 390px.
def h2(cls="text-white", size="text-[1.75rem] sm:text-5xl lg:text-6xl"):
    return (f'<h2 data-r class="font-heading {size} font-normal leading-[1.02] tracking-[-0.03em] text-balance {cls}">'
            f'<span class="block">{H[0]}</span><span class="block">{H[1]}</span></h2>')


def ctas(primary, second, outline):
    return (f'<div data-r class="flex flex-wrap items-center gap-3"><button type="button" class="cta-press min-h-12 rounded-full px-7 text-base font-medium transition-colors {primary} {FOCUS} {outline}" data-demo>Book a Demo</button>'
            f'<a href="#" class="inline-flex min-h-12 items-center gap-1.5 rounded-full px-2 text-base font-medium transition-opacity hover:opacity-80 {second} {FOCUS} {outline}">Talk to Sales <span aria-hidden="true">&#8599;</span></a></div>')


# ── A · Agenda: the walkthrough itself, tailored by service model ────────────
def option_a():
    tabs = "".join(f'<button type="button" role="tab" data-model="{k}" aria-selected="{str(k == "care").lower()}" class="seg min-h-10 flex-1 rounded-full px-3 text-sm transition-colors {FOCUS} focus-visible:outline-accent">{v[0]}</button>' for k, v in AGENDA.items())
    lists = "".join(f'<ol data-agenda="{k}" {"" if k == "care" else "hidden"}>' + "".join(
        f'<li class="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-line py-4 first:border-t-0"><span class="text-base tabular-nums text-muted">{t} min</span><span class="text-base text-heading">{d}</span></li>' for t, d in items) + "</ol>" for k, (_, items) in AGENDA.items())
    return f'''<section class="bg-navy py-24 text-white md:py-32" data-reveal>
  <div class="mx-auto max-w-7xl px-6">{h2()}
  <div class="mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-8">
    <div class="flex flex-col gap-8 lg:col-span-5"><p data-r class="max-w-md text-lg leading-relaxed text-white">{LINE}</p>{ctas("bg-white text-heading hover:bg-accent hover:text-white", "text-white", "focus-visible:outline-white")}</div>
    <div data-r class="lg:col-span-6 lg:col-start-7" data-ui>
      <div class="rounded-lg bg-white p-5 text-heading md:p-7">
        <div class="flex items-baseline justify-between gap-4"><p class="font-heading text-2xl">Your 30 minutes</p><p class="text-sm text-muted">Pick your service</p></div>
        <div role="tablist" aria-label="Service model" class="mt-5 flex gap-1 rounded-full bg-tint p-1">{tabs}</div>
        <div class="mt-4">{lists}</div>
      </div>
    </div>
  </div></div></section>'''


# ── B · Pick a product: each tile books a demo of that product ───────────────
def option_b():
    tiles = "".join(f'''<button data-r type="button" data-demo="{n}" class="cta-tile group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-lg p-6 text-left text-white {FOCUS} focus-visible:outline-white md:min-h-[320px]"
      style="background:url({P}/{ph}) center/cover">
      <span aria-hidden="true" class="absolute inset-0" style="background:color-mix(in srgb,{d} 55%,transparent)"></span>
      <img src="{P}/{lg}" alt="{n}" class="relative h-8 w-auto self-start brightness-0 invert" />
      <span class="relative"><span class="block text-lg">{t}</span><span class="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white px-5 text-sm font-medium text-heading transition-colors group-hover:bg-accent group-hover:text-white">Book a {n} demo</span></span>
    </button>''' for n, t, lg, ph, d, m in PRODUCTS)
    return f'''<section class="bg-[#060e28] py-24 text-white md:py-32" data-reveal>
  <div class="mx-auto max-w-7xl px-6">
    {h2()}
    <div class="mt-8 flex flex-wrap items-end justify-between gap-6"><p data-r class="max-w-xl text-lg leading-relaxed text-white">{LINE} Start with the product you run first.</p>
        <a data-r href="#" class="inline-flex min-h-11 items-center gap-1.5 self-start text-base font-medium text-white transition-opacity hover:opacity-80 {FOCUS} focus-visible:outline-white">Not sure? Talk to Sales <span aria-hidden="true">&#8599;</span></a>
    </div>
    <div class="mt-14 grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">{tiles}</div>
  </div></section>'''


# ── C · Poster: the promise set at poster size on the accent ─────────────────
def option_c():
    return f'''<section class="bg-accent py-24 text-heading md:py-36" data-reveal>
  <div class="mx-auto max-w-7xl px-6">
    {h2("text-heading", "text-[1.75rem] sm:text-5xl lg:text-[5.75rem]")}
    <div class="mt-12 grid grid-cols-1 items-end gap-8 md:mt-16 md:grid-cols-12">
      <p data-r class="max-w-md text-xl leading-relaxed text-heading md:col-span-6">{LINE}</p>
      <div class="md:col-span-6 md:justify-self-end">{ctas("bg-heading text-white hover:bg-white hover:text-heading", "text-heading", "focus-visible:outline-heading")}</div>
    </div>
  </div></section>'''


# ── D · The people: the real Sognos team beside the promise ──────────────────
def option_d():
    return f'''<section class="bg-[#0f1936] text-white" data-reveal>
  <div class="mx-auto max-w-7xl px-6 py-24 md:py-32">{h2()}
  <div class="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
    <figure data-r class="lg:col-span-7">
      <div class="cta-drift overflow-hidden rounded-lg"><img src="{P}/images/about/sognos-team.webp" alt="The Sognos team" class="aspect-[3/2] w-full object-cover" /></div>
      <figcaption class="mt-3 text-sm text-white/75">The Sognos team</figcaption>
    </figure>
    <div class="flex flex-col gap-8 lg:col-span-4 lg:col-start-9"><p data-r class="text-lg leading-relaxed text-white">{LINE} You talk to the people who build and implement it.</p>
      {ctas("bg-white text-heading hover:bg-accent hover:text-white", "text-white", "focus-visible:outline-white")}</div>
  </div></div></section>'''


# ── E · Platform orbit: after 21st.dev ruixen.ui "stack-feature-section" ─────
# The Microsoft platform Sognos is built on, in slow orbit around Sognos at the
# card's right edge. Reference adapted to the rules: flat white chips with a
# hairline (no shadows), rounded-lg card, rounded-full buttons.
PLATFORM = [("Dynamics 365", "logos/Dynamics365.svg"), ("Microsoft Copilot", "logos/copilot-logo.svg"),
            ("Power BI", "logos/platform/PowerBI_scalable.svg"), ("Power Apps", "logos/platform/PowerApps_scalable.svg"),
            ("Power Automate", "logos/platform/PowerAutomate_scalable.svg"), ("Power Pages", "logos/platform/PowerPages_scalable.svg"),
            ("Dataverse", "logos/platform/Dataverse_scalable.svg"), ("Power Platform", "logos/PowerPlatform_scalable.svg"),
            ("Microsoft", "logos/Microsoft-icon-logo.svg")]
RINGS = [(170, 4, 90, 60), (290, 6, 120, -1), (410, 8, 150, 72)]  # radius, chips, seconds, size (or -1 = 56)


def option_e(dark=False):
    # dark: navy card, white type, white/25 rings; chips and hub stay white.
    import math
    rings, k = [], 0
    for ri, (r, n, secs, size) in enumerate(RINGS):
        size = 64 if size == -1 else size
        rev = "reverse" if ri % 2 else "normal"
        chips = ""
        for j in range(n):
            name, logo = PLATFORM[k % len(PLATFORM)]
            k += 1
            a = 2 * math.pi * j / n + ri * 0.4
            x, y = r * math.cos(a), r * math.sin(a)
            chips += (f'<span class="orbit-chip absolute flex items-center justify-center rounded-full border {'border-white/10' if dark else 'border-line'} bg-white" '
                      f'style="width:{size}px;height:{size}px;left:{x - size / 2:.1f}px;top:{y - size / 2:.1f}px;animation-duration:{secs}s;animation-direction:{rev}">'
                      f'<img src="{P}/{logo}" alt="{name}" class="w-[55%]" /></span>')
        rings.append(f'<div class="orbit-ring absolute left-0 top-0" style="animation-duration:{secs}s;animation-direction:{rev}">{chips}</div>')
    circles = "".join(f'<circle cx="0" cy="0" r="{r}" fill="none" stroke="{'rgb(255 255 255 / .28)' if dark else '#b7becc'}" stroke-width="1.5" stroke-dasharray="2 7" stroke-linecap="round" />' for r, *_ in RINGS)
    orbit = (f'<div class="orbit absolute top-1/2 right-[96px] lg:right-[120px]">'
             f'<svg aria-hidden="true" class="absolute" style="left:-460px;top:-460px" width="920" height="920" viewBox="-460 -460 920 920">{circles}</svg>'
             f'{"".join(rings)}'
             f'<span class="absolute flex size-44 items-center justify-center rounded-full border {'border-white/10' if dark else 'border-line'} bg-white" style="left:-88px;top:-88px"><img src="{P}/logos/sognos-logo.svg" alt="Sognos" class="h-7 w-auto" /></span></div>')
    return f'''<section class="bg-white py-16 md:py-24" data-reveal>
  <div class="mx-auto max-w-7xl px-6">
    <div class="relative -mx-6 grid grid-cols-1 overflow-hidden {'bg-navy' if dark else 'bg-tint'} sm:mx-0 sm:rounded-lg lg:min-h-[560px] lg:grid-cols-12">
      <div class="relative z-10 flex flex-col justify-center gap-6 p-6 md:p-12 lg:col-span-7">
        {h2("text-white" if dark else "text-heading", "text-[1.625rem] sm:text-5xl")}
        <p data-r class="max-w-xl text-lg leading-relaxed {'text-white' if dark else 'text-body'}">{LINE} Built on the Microsoft platform you already trust.</p>
        {ctas("bg-white text-heading hover:bg-accent hover:text-white", "border border-white/25 px-6 text-white hover:border-white", "focus-visible:outline-white") if dark else ctas("bg-heading text-white hover:bg-accent", "bg-white px-6 text-heading", "focus-visible:outline-accent")}
      </div>
      <div class="orbit-wrap relative h-[340px] max-lg:overflow-hidden lg:col-span-5 lg:h-auto">{orbit}</div>
    </div>
  </div></section>'''


OPTIONS = [
    ("a", "A · Agenda", "The walkthrough as a real agenda. Pick a service model and the 30 minutes change. Book a Demo carries the choice. Navy.", option_a),
    ("b", "B · Pick a product", "Three product tiles (photo under a flat product scrim); each opens Book a Demo already set to that product (the modal takes a product key). Navy-darkest.", option_b),
    ("c", "C · Poster", "The promise at poster size in navy on a whole accent field (5.7:1). Type only, the page's one colour field.", option_c),
    ("d", "D · The people", "The real team photo beside the promise: the walkthrough is with the people who build it. Care-dark.", option_d),
    ("e", "E · Platform orbit", "After 21st.dev ruixen.ui stack-feature-section: the Microsoft platform Sognos runs on (Dynamics 365, Copilot, Power Platform, Power BI, Dataverse...) orbiting Sognos at the card edge. Flat chips, no shadows. White section, tint card.", option_e),
    ("e2", "E2 · Platform orbit · navy", "Option E on a navy card (#152248): white type, white Book a Demo, Talk to Sales as a white/25 outline pill, rings at white/28. Chips and the Sognos hub stay white so the logos keep their colours.", lambda: option_e(dark=True)),
]

CSS = """<style>
  @font-face { font-family: "AngelList"; src: url("../../../public/app/AngelList.woff2") format("woff2"); font-weight: 100 900; font-display: swap; }
  .seg[aria-selected="true"] { background: #0f1936; color: #fff; }
  .seg[aria-selected="false"] { color: #0f1936; }
  .seg[aria-selected="false"]:hover { background: #fff; }
  .cta-press { transition: transform .16s cubic-bezier(.22,1,.36,1), background-color .2s, color .2s; }
  .cta-press:active { transform: scale(.97); }
  .cta-tile { transition: transform .4s cubic-bezier(.22,1,.36,1); }
  .cta-tile:hover { transform: translateY(-4px); }
  .cta-tile:active { transform: translateY(-1px) scale(.99); }
  [data-r] { opacity: 0; transform: translateY(24px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); transition-delay: calc(var(--i, 0) * 80ms); }
  .in [data-r] { opacity: 1; transform: none; }
  .cta-drift img { animation: drift 18s ease-in-out infinite alternate; }
  @keyframes drift { to { transform: scale(1.06) translateX(-1.5%); } }
  [data-agenda] li { animation: rise .45s cubic-bezier(.22,1,.36,1) both; }
  [data-agenda] li:nth-child(2) { animation-delay: .05s; } [data-agenda] li:nth-child(3) { animation-delay: .1s; } [data-agenda] li:nth-child(4) { animation-delay: .15s; }
  @keyframes rise { from { opacity: 0; transform: translateY(8px); } }
  @media (prefers-reduced-motion: reduce) { [data-r] { opacity: 1; transform: none; transition: none; } .cta-drift img { animation: none; } [data-agenda] li { animation: none; } .cta-tile, .cta-drift img, .cta-press { transition: none; transform: none !important; } }
  .no-js [data-r] { opacity: 1; transform: none; }
  .orbit-ring { animation: orbit linear infinite; }
  .orbit-chip { animation: orbit linear infinite; animation-direction: reverse; }
  .orbit-ring[style*="reverse"] .orbit-chip { animation-direction: normal !important; }
  @keyframes orbit { to { transform: rotate(360deg); } }
  @media (max-width: 1023px) { .orbit { transform: scale(.62); transform-origin: 0 0; } }
  @media (prefers-reduced-motion: reduce) { .orbit-ring, .orbit-chip { animation: none; } }
</style>
<style type="text/tailwindcss">
  @theme {
    --font-sans: "AngelList", ui-sans-serif, system-ui, sans-serif;
    --font-heading: "AngelList", ui-sans-serif, system-ui, sans-serif;
    --color-heading: #0f1936; --color-body: #152248; --color-muted: #68706f; --color-line: #e2e8f0;
    --color-tint: #f9fafe; --color-accent: #1d96fc; --color-navy: #152248;
  }
</style>"""

JS = """<script>
  document.documentElement.classList.remove("no-js");
  const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: 0.2 });
  document.querySelectorAll("[data-reveal]").forEach((el) => { el.querySelectorAll("[data-r]").forEach((r, i) => r.style.setProperty("--i", i)); io.observe(el); });
  document.querySelectorAll('[role="tablist"]').forEach((list) => {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    const pick = (t) => { tabs.forEach((x) => x.setAttribute("aria-selected", String(x === t)));
      list.parentElement.querySelectorAll("[data-agenda]").forEach((l) => (l.hidden = l.dataset.agenda !== t.dataset.model)); };
    tabs.forEach((t, i) => { t.addEventListener("click", () => pick(t));
      t.addEventListener("keydown", (e) => { const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (d) { const n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); pick(n); } }); });
  });
</script>"""


def build():
    blocks = []
    for k, name, note, fn in OPTIONS:
        blocks.append(f'<div id="opt-{k}" class="scroll-mt-12 bg-white px-6 py-6"><div class="mx-auto max-w-7xl"><h2 class="font-heading text-3xl text-heading">{name}</h2><p class="mt-2 max-w-[60ch] text-base text-body">{note}</p></div></div>')
        blocks.append('<div aria-hidden="true" class="h-16 bg-white"></div>')  # Solutions (white) above
        blocks.append(fn())
        blocks.append('<div aria-hidden="true" class="h-16 bg-tint"></div>')  # Industries (tint) below
    nav = "".join(f'<a href="#opt-{k}" class="rounded-full bg-tint px-4 py-2 text-sm text-heading hover:bg-heading hover:text-white">{n}</a>' for k, n, _, _ in OPTIONS)
    return f'''<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Home CTA band options</title>
<!-- Generated by docs/mockups/_generators/build_cta.py - edit the script, not this file. -->
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
{CSS}
</head>
<body class="bg-white font-sans text-body antialiased">
<header class="bg-white px-6 pt-16 pb-6"><div class="mx-auto max-w-7xl"><h1 class="font-heading text-4xl text-heading md:text-5xl">Home CTA band options</h1><nav class="mt-6 flex flex-wrap gap-2">{nav}</nav></div></header>
<main>{"".join(blocks)}</main>
{JS}
</body>
</html>
'''


OUT.write_text(build())
print(f"wrote {OUT.relative_to(ROOT)}")
