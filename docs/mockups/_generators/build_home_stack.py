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
Updated 2026-11-03: live copy and per-product scroll colour fill (white -> product colour by
40% into view), no Book a Demo or feature list on the cards. Review switcher (bottom right):
stacking effect A Reference (21st.dev ivarunchaudhary "services-stack": sticky cards, the
covered card scales to 0.94, lifts 40px and fades) / B Drift (half-speed exit, as ported), and
three Care graphics that carry the feature list: A Record walkthrough, B Feature deck,
C Journey rail. Graphic data is illustrative.
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
         fill="color-mix(in srgb, #3b6fe0 8%, white)",
         desc="Deliver safer, simpler care in the field. From mental health to aged care, we help providers reduce admin and stay service-ready - whatever changes come next.",
         links=["Case management", "Compliance &amp; audit trail", "Reporting &amp; analytics"],
         card=("Progress note &middot; M. Turner", "Copilot draft ready to sign")),
    dict(label="Workforce scheduling &amp; optimisation", name="SognosRoster", href="/products/sognosroster", logo="sognos-roster-logo.svg",
         photo="product/RosterBg.avif", deep="#104b90", mid="#59bbf7", dot="#1d96fc",
         fill="color-mix(in srgb, #59bbf7 12%, white)",
         desc="From scheduling to routing, SognosRoster puts the right worker on every shift - factoring skills, location, availability and compliance automatically.",
         links=["Intelligent scheduling", "Skills &amp; compliance matching", "Route optimisation"],
         card=("4 visits &middot; optimised order", "&minus;38 min travel today")),
    dict(label="Relationship &amp; family context", name="SognosGenogram", href="/products/sognosgenogram", logo="SognosGenogram-logo.svg",
         photo="product/GenoBg.avif", deep="#3a0f45", mid="#91278c", dot="#91278c",
         fill="#f8eef8",
         desc="SognosGenogram maps the relationships, histories, and support networks that shape service delivery - giving your team the context they need to deliver better outcomes.",
         links=["Genogram builder", "Support network mapping", "Copilot AI narrative"],
         card=("Support network &middot; M. Turner", "6 people &middot; 2 formal supports")),
]

FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d96fc]"
ARW = '<span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">&rarr;</span>'


# ── Care graphics that carry the feature list (illustrative data) ───────────
FROST = "rounded-lg border border-white/60 bg-white/75 backdrop-blur-md text-heading"
CARE_FEATURES = ["Case management", "Compliance &amp; audit trail", "Reporting &amp; analytics"]


def tick():
    return ('<span class="cg-tick flex size-5 shrink-0 items-center justify-center rounded-full border border-emerald-500/40 text-emerald-600">'
            '<svg viewBox="0 0 14 14" class="size-3" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7.5l3 3 6-7"/></svg></span>')


def care_a():
    """A · Record walkthrough: chips on top, one record card plays a scene per feature."""
    chips = "".join(f'<span data-cg-chip="{i}" class="cg-chip rounded-full px-3 py-1.5 text-xs">{f}</span>' for i, f in enumerate(CARE_FEATURES))
    stages = "".join(f'<span class="rounded-full px-2.5 py-1 text-[11px] {"bg-[#3b6fe0] text-white" if k < 3 else "bg-[#eef3fd] text-[#2a55c4]"}">{n}</span>' for k, n in enumerate(["Referral", "Intake", "Goals", "Review"]))
    checks = "".join(f'<li class="flex items-center gap-2.5 border-t border-white/60 py-2 text-sm first:border-t-0" style="--d:{k * 0.25}s">{tick()}{c}</li>' for k, c in enumerate(["Consent on file", "Risk assessment current", "Worker screening valid", "Visit notes signed"]))
    bars = "".join(f'<span class="cg-bar flex-1 rounded-t" style="height:{h}%;--d:{k * 0.05}s;background:{"#3b6fe0" if k == 9 else "#8ea8f0"}"></span>' for k, h in enumerate([34, 40, 38, 47, 52, 58, 61, 66, 72, 80]))
    scene = lambda i, title, body: f'<div data-cg-scene="{i}" class="cg-scene absolute inset-0 p-4"><p class="text-sm font-medium">{title}</p>{body}</div>'
    return f'''<div class="cg cg-a flex w-full max-w-[22rem] flex-col gap-3" data-cg-steps="3">
      <div class="flex flex-wrap justify-center gap-1.5">{chips}</div>
      <div class="relative h-56 {FROST}">
        {scene(0, "Case plan &middot; M. Turner", f'<div class="mt-3 flex flex-wrap gap-1.5">{stages}</div><div class="mt-4 h-1.5 overflow-hidden rounded-full bg-[#eef3fd]"><div class="cg-grow h-full w-3/4 rounded-full bg-[#3b6fe0]"></div></div><p class="mt-2 text-xs text-muted">Goals set &middot; review due 14 Nov</p><p class="mt-4 rounded bg-[#eef3fd] px-3 py-2 text-xs text-[#2a55c4]">Personal care, 3&times; weekly &middot; GP referral</p>')}
        {scene(1, "Audit trail &middot; M. Turner", f'<ul class="mt-2">{checks}</ul>')}
        {scene(2, "Goal progress &middot; 12 weeks", f'<div class="mt-3 flex h-28 items-end gap-1.5">{bars}</div><p class="mt-3 text-sm">4 of 5 goals on track</p>')}
      </div>
    </div>'''


def care_b():
    """B · Feature deck: three stacked mini-cards; the front one moves to the back."""
    mini = [
        ("Case management", '<p class="mt-2 text-xs text-muted">M. Turner &middot; stage</p><div class="mt-2 flex gap-1.5"><span class="rounded-full bg-[#3b6fe0] px-2.5 py-1 text-[11px] text-white">Goals</span><span class="rounded-full bg-[#eef3fd] px-2.5 py-1 text-[11px] text-[#2a55c4]">Review next</span></div>'),
        ("Compliance &amp; audit trail", f'<div class="mt-2 flex items-center gap-2.5 text-sm">{tick()}Visit notes signed</div><p class="mt-2 text-xs text-muted">Audit-ready &middot; 4 of 4 checks</p>'),
        ("Reporting &amp; analytics", '<svg viewBox="0 0 120 32" class="mt-2 h-8 w-full" fill="none"><path d="M2 28 L20 24 L38 25 L56 18 L74 15 L92 10 L118 4" stroke="#3b6fe0" stroke-width="2.5" stroke-linecap="round"/></svg><p class="mt-1 text-xs text-muted">Goals on track &middot; up 12% this quarter</p>'),
    ]
    cards = "".join(f'<div data-cg-card="{i}" class="cg-card absolute inset-x-0 bottom-0 h-36 p-4 {FROST}"><p class="text-sm font-medium">{t}</p>{body}</div>' for i, (t, body) in enumerate(mini))
    return f'<div class="cg cg-b relative h-64 w-full max-w-[20rem]" data-cg-steps="3">{cards}</div>'


def care_c():
    """C · Journey rail: the feature list as stops on one client's path; a pulse walks it."""
    stops = [("Referral", "GP referral received"), ("Case plan", "Personal care, 3&times; weekly"), ("Visit &amp; Copilot note", "Note drafted, ready to sign"),
             ("Compliance", "Audit trail complete"), ("Outcomes", "4 of 5 goals on track")]
    items = "".join(f'''<li data-cg-stop="{i}" class="cg-stop relative grid grid-cols-[1.25rem_1fr] items-start gap-3 pb-5 last:pb-0">
        <span class="cg-node relative z-10 mt-0.5 size-5 rounded-full border-2 border-white/80 bg-white/20"></span>
        <span><span class="block text-base text-white">{t}</span><span class="cg-detail mt-2 block w-fit px-3 py-2 text-sm {FROST}">{d}</span></span></li>''' for i, (t, d) in enumerate(stops))
    return f'''<div class="cg cg-c relative w-full max-w-[21rem]" data-cg-steps="5">
      <span aria-hidden="true" class="absolute top-2 bottom-2 left-[9px] w-0.5 bg-white/35"></span>
      <ol class="relative">{items}</ol></div>'''


CARE_GFX = {"a": care_a(), "b": care_b(), "c": care_c()}

# ── D · Painted UI, after paraform.com "How it works" (all three products) ─────
# White product panels on an animated product-colour mesh (WebGL), frosted chips,
# timed ~6s sequences (data-s stages) with split-flap counters. Data is illustrative.
GLASS = "rounded-lg border border-white/50 bg-white/60 backdrop-blur-[12px] backdrop-saturate-[1.2]"


def avatar(a, b, initials, size="size-full"):
    """Illustrated avatar: head + shoulders on a soft gradient (no photo)."""
    return (f'<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" class="{size}" aria-hidden="true"><defs><linearGradient id="av{initials}" x1="0" y1="0" x2="1" y2="1">'
            f'<stop offset="0" stop-color="{a}"/><stop offset="1" stop-color="{b}"/></linearGradient></defs>'
            f'<rect width="100" height="100" fill="url(#av{initials})"/><circle cx="50" cy="40" r="17" fill="#f1e4d8"/>'
            f'<path d="M18 100c4-22 17-32 32-32s28 10 32 32z" fill="#ffffff" fill-opacity=".85"/></svg>')


def flap(vals, dark=False):
    """Split-flap counter (after Paraform's departures-board digits). data-vals maps stage ->
    value ("1:24,4:38"); the sequence runner flips the digits through to each value."""
    tile = "bg-[#0f1936] text-white" if dark else "bg-white text-[#0f1936] border border-[#e2e8f0]"
    digit = f'<span class="flap-d relative flex h-9 w-7 items-center justify-center overflow-hidden rounded-lg font-heading text-xl tabular-nums {tile}"><span>0</span></span>'
    return f'<span class="flap flex gap-1" data-vals="{vals}">{digit}{digit}</span>'


def care_d():
    """Care board, after Paraform's "Make exceptional hires, faster": clients move Referral ->
    Assessment -> Care plan on a white board over a watercolour, the board slides left, then a
    frosted client frame takes over and the bar turns to the outcome. Timeline in JS (.pdc)."""
    acc = "#3b6fe0"
    strip = {"blue": ("Assessing", "bg-[#dbe7fb] text-[#2a55c4]"), "red": ("Not eligible", "bg-[#fde2e2] text-[#b42318]"),
             "green": ("Plan accepted", "bg-[#dcf5e6] text-[#15803d]"), "sent": ("Plan sent", "bg-[#dcf5e6] text-[#15803d]")}
    people = {"EW": ("Emma Wilson", "Home Care", "#f5c7a9", "#c9826b"), "MT": ("Margaret Turner", "NDIS", "#bcd3f7", "#3b6fe0"),
              "RP": ("Ravi Patel", "NDIS", "#c9e8d9", "#3d8f6a"), "GL": ("Grace Lin", "Home Care", "#e7d3f2", "#91278c")}

    def ccard(key, tone, show, delay):
        name, fund, a1, a2 = people[key]
        label, cls = strip[tone]
        return (f'<div class="pdc-card overflow-hidden rounded-lg border border-[#e2e8f0] bg-[#f8fafc]" data-show="{show}" style="--d:{delay}s">'
                f'<div class="flex items-center gap-2 px-2.5 py-2"><span class="block size-6 shrink-0 overflow-hidden rounded-lg">{avatar(a1, a2, key + show)}</span>'
                f'<span class="min-w-0"><span class="block truncate text-[11px] font-semibold text-[#0f1936]">{name}</span><span class="block text-[9px] text-[#64748b]">&#9733; {fund}</span></span></div>'
                f'<div class="px-2.5 py-1 text-[9px] font-medium {cls}">{label}</div></div>')

    def col(title, counts, cards, last=False):
        n = "".join(f'<span class="pdc-n" data-at="{i}">{c} {"client" if c == 1 else "clients"}</span>' for i, c in enumerate(counts))
        return (f'<div class="flex min-w-0 flex-1 flex-col {"" if last else "border-r border-[#e2e8f0]"}">'
                f'<div class="px-3 pt-3 pb-2"><p class="text-[12px] font-semibold text-[#0f1936]">{title}</p><p class="relative mt-0.5 h-3 text-[9px] text-[#64748b]">{n}</p></div>'
                f'<div class="flex flex-col gap-2 px-2">{cards}</div></div>')

    board = (f'<div class="pdc-board absolute top-[13%] left-[9%] flex h-[62%] w-[125%] rounded-lg border border-[#e2e8f0] bg-white">'
             + col("Referral", [0, 1, 1], ccard("EW", "blue", "1", .1) + ccard("EW", "red", "2", 0))
             + col("Assessment", [0, 3, 1], ccard("MT", "blue", "1", .2) + ccard("RP", "blue", "1", .3) + ccard("GL", "blue", "1", .4) + ccard("RP", "red", "2", 0))
             + col("Care plan", [0, 0, 2], ccard("MT", "green", "2", .15) + ccard("GL", "sent", "2", .3), last=True) + "</div>")
    frame = (f'<div class="pdc-frame absolute top-[7%] right-[17%] bottom-[30%] left-[17%] {GLASS} p-2"><div class="relative size-full overflow-hidden rounded-lg">'
             f'{avatar("#bcd3f7", "#2a55c4", "MTF")}<span class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f1936]/70 to-transparent"></span>'
             f'<span class="absolute bottom-3 left-3.5 text-white"><span class="block text-[15px] font-medium">Margaret Turner</span><span class="block text-[11px] text-white/80">NDIS &middot; Personal care, 3&times; weekly</span></span></div></div>')
    bar = (f'''<div class="pdc-bar absolute right-[14%] bottom-[7%] left-[14%] flex items-center gap-3 rounded-lg border border-white/60 bg-white/80 p-3 backdrop-blur-md">
        <span class="flex size-11 shrink-0 items-center justify-center rounded-lg" style="background:{acc}"><img src="{P}/logos/icon-sognos-care.svg" alt="" class="size-6 brightness-0 invert" /></span>
        <span class="relative h-10 min-w-0 flex-1">
          <span class="pdc-t1 absolute inset-0"><span class="block text-[15px] text-[#0f1936]">Active clients</span><span class="block text-[11px] text-[#64748b]">Total this week</span></span>
          <span class="pdc-t2 absolute inset-0"><span class="block text-[15px] text-[#0f1936]">Care plan active</span><span class="block text-[11px] text-[#64748b]"><b class="font-semibold text-[#0f1936]">3 days</b> from referral</span></span></span>
        <span class="pdc-ring shrink-0">{flap("1:4")}</span>
      </div>''')
    return f'<div class="pds pdc absolute inset-0" data-s="0" data-times="400:1,2600:2,3800:3,6000:4">{board}{frame}{bar}</div>'


def seq_bar(icon_bg, glyph, t1, s1, t2, s2, vals):
    """Frosted bar shared by the sequences: icon, two crossfading labels, split-flap counter."""
    return f'''<div class="absolute right-[10%] bottom-[5%] left-[10%] flex items-center gap-3 rounded-lg border border-white/60 bg-white/80 p-3 backdrop-blur-md">
        <span class="flex size-11 shrink-0 items-center justify-center rounded-lg text-lg text-white" style="background:{icon_bg}">{glyph}</span>
        <span class="relative h-10 min-w-0 flex-1">
          <span class="sq-t1 absolute inset-0"><span class="block text-[15px] text-[#0f1936]">{t1}</span><span class="block text-[11px] text-[#64748b]">{s1}</span></span>
          <span class="sq-t2 absolute inset-0"><span class="block text-[15px] text-[#0f1936]">{t2}</span><span class="block text-[11px] text-[#64748b]">{s2}</span></span></span>
        {flap(vals)}
      </div>'''


def roster_d():
    """Roster: an unfilled shift, AI matching across the team, the best worker assigned, then
    the day's route draws and the bar flips from shifts filled to minutes saved."""
    acc = "#1d96fc"
    hours = "".join(f'<span class="flex-1 border-l border-[#e2e8f0] pl-1 first:border-l-0">{h}</span>' for h in ["8", "9", "10", "11", "12", "1", "2"])
    workers = [("JK", "Jess Kelly", ["Manual handling", "First aid"], "4.2 km", 98, "#59bbf7", "#104b90"),
               ("TN", "Tom Nguyen", ["Manual handling"], "7.8 km", 91, "#c9e8d9", "#3d8f6a"),
               ("PS", "Priya Shah", ["First aid"], "11 km", 84, "#f5c7a9", "#c9826b")]
    rows = "".join(f'''<div class="pdr-row flex items-center gap-2 rounded-lg border bg-white px-2.5 py-1.5 {"pdr-top" if k == 0 else ""}" style="--d:{k * 0.12}s">
        <span class="block size-6 shrink-0 overflow-hidden rounded-lg">{avatar(a1, a2, "R" + key)}</span>
        <span class="min-w-0 flex-1"><span class="block text-[11px] font-semibold text-[#0f1936]">{name}</span>
          <span class="flex gap-1">{"".join(f'<span class="rounded-lg bg-[#eef8fe] px-1.5 text-[9px] text-[#0b6fc4]">{c} &#10003;</span>' for c in chips)}</span></span>
        <span class="text-right"><span class="block text-[11px] font-semibold tabular-nums text-[#0f1936]">{fit}% fit</span><span class="block text-[9px] text-[#64748b]">{dist}</span></span></div>''' for k, (key, name, chips, dist, fit, a1, a2) in enumerate(workers))
    schedule = f'''<div class="absolute top-[7%] right-[8%] left-[8%] rounded-lg border border-[#e2e8f0] bg-white p-3">
        <div class="flex items-baseline justify-between"><p class="text-[12px] font-semibold text-[#0f1936]">Today &middot; Penrith team</p><p class="text-[9px] text-[#64748b]">Tue 4 Nov</p></div>
        <div class="mt-2 flex text-[9px] text-[#64748b]">{hours}</div>
        <div class="relative mt-1.5 h-9 rounded-lg bg-[#f8fafc]">
          <span class="absolute top-1 bottom-1 left-[2%] w-[14%] rounded-lg bg-[#eef8fe]"></span>
          <span class="absolute top-1 bottom-1 left-[52%] w-[20%] rounded-lg bg-[#eef8fe]"></span>
          <span class="pdr-shift absolute top-1 bottom-1 left-[17%] w-[32%] rounded-lg border px-1.5 text-[9px] leading-[1.15]"><span class="pdr-un block pt-0.5">Personal care<br/>9:00 &middot; Unfilled</span><span class="pdr-as block pt-0.5">Assigned &#10003;<br/>Jess Kelly</span></span>
        </div></div>'''
    match = f'''<div class="pdr-match absolute top-[32%] right-[8%] left-[8%] flex items-center gap-2 rounded-lg border border-white/60 bg-white/80 px-3 py-2 text-[11px] text-[#0f1936] backdrop-blur-md">
        <span class="text-[#64748b]">&#9906;</span>Matching across <b class="font-semibold">120 workers</b><span class="pdr-bar ml-auto h-1 w-16 overflow-hidden rounded-lg bg-[#e2e8f0]"><span class="block h-full rounded-lg" style="background:{acc}"></span></span></div>'''
    route = f'''<svg class="pdr-route absolute top-[44%] right-[8%] left-[8%] h-[30%] w-[84%]" viewBox="0 0 200 60" fill="none" aria-hidden="true">
        <path class="pdr-path" d="M14 46 C 50 10, 80 52, 106 26 S 160 8, 186 30" stroke="{acc}" stroke-width="3" stroke-linecap="round" pathLength="1"/>
        {"".join(f'<g class="pdr-pin" style="--d:{k * 0.25}s"><circle cx="{x}" cy="{y}" r="7" fill="#fff" stroke="{acc}" stroke-width="3"/><text x="{x}" y="{y + 3.5}" text-anchor="middle" font-size="8" fill="#0f1936">{k + 1}</text></g>' for k, (x, y) in enumerate([(14, 46), (106, 26), (186, 30)]))}</svg>'''
    bar = seq_bar(acc, "&#9201;", "Shifts filled", "Today &middot; Penrith team", "Route optimised", "Minutes saved today", "1:24,4:38")
    return f'''<div class="pds pdr absolute inset-0" data-s="0" data-times="400:1,1800:2,3600:3,5200:4">{schedule}{match}
      <div class="pdr-rows absolute top-[42%] right-[8%] left-[8%] flex flex-col gap-1.5">{rows}</div>{route}{bar}</div>'''


def geno_d():
    """Genogram: the family map draws around the client (close and strained ties), formal
    supports appear around it, Copilot writes the summary, and the bar flips to teams shared."""
    acc = "#91278c"
    nodes = [("p1", 30, 10, "AT", "Mother", "#e7d3f2", "#91278c"), ("p2", 70, 10, "RT", "Father", "#d9e4f5", "#3a5a9a"),
             ("sb", 18, 33, "DT", "Brother", "#f5d9c7", "#c9826b"), ("pt", 80, 33, "KM", "Partner", "#d4efe4", "#3d8f6a"),
             ("dg", 65, 49, "AN", "Anne &middot; daughter", "#f5e0ec", "#b8166e")]
    node = lambda key, x, y, ini, label, a1, a2, cls: (f'<span class="pdg-node {cls} absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1" style="left:{x}%;top:{y}%;--d:{0}s">'
        f'<span class="block size-9 overflow-hidden rounded-full border-2 border-white/80">{avatar(a1, a2, "G" + key)}</span><span class="rounded-lg bg-white/70 px-1.5 text-[9px] text-[#0f1936] backdrop-blur">{label}</span></span>')
    fam = "".join(node(k, x, y, ini, l, a1, a2, "pdg-fam") for k, x, y, ini, l, a1, a2 in nodes)
    client = node("cl", 50, 33, "MT", "Margaret", "#d9a6d6", "#3a0f45", "pdg-client")
    lines = f'''<svg class="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path class="pdg-l" d="M35 8.4 H65 M50 8.4 V27.6" stroke="#fff" stroke-width=".8" pathLength="1"/>
        <path class="pdg-l" d="M54.5 30.4 H76 M54.5 32.4 H76" stroke="#fff" stroke-width=".8" pathLength="1" style="--d:.15s"/>
        <path class="pdg-l" d="M45.5 31.4 l-2.5 -2 l-2.5 4 l-2.5 -4 l-2.5 4 l-2.5 -2 h-8.5" stroke="#ffd2a6" stroke-width=".8" pathLength="1" style="--d:.3s"/>
        <path class="pdg-l" d="M65.25 32.4 V43.6" stroke="#fff" stroke-width=".8" pathLength="1" style="--d:.45s"/>
        {"".join(f'<path class="pdg-s" d="M50 31.4 L{x} {y}" stroke="rgba(255,255,255,.7)" stroke-width=".5" stroke-dasharray="1.2 1.4" style="--d:{k * .15}s"/>' for k, (x, y) in enumerate([(14, 57), (38, 57), (84, 57)]))}
      </svg>'''
    supports = "".join(f'<span class="pdg-sup absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/60 bg-white/75 px-2 py-1 text-[10px] text-[#0f1936] backdrop-blur" style="left:{x}%;top:{y}%;--d:{k * .15}s">{t}</span>'
                       for k, (t, x, y) in enumerate([("GP &middot; Dr Lee", 14, 57), ("Day centre", 38, 57), ("Support worker", 84, 57)]))
    copilot = (f'''<div class="pdg-ai absolute right-[10%] bottom-[22%] left-[10%] rounded-lg border border-white/60 bg-white/85 px-3 py-2 backdrop-blur-md">
        <p class="text-[10px] font-medium" style="color:{acc}">&#10022; Copilot summary</p><p class="pdg-type mt-0.5 min-h-[1.2em] text-[11px] leading-snug text-[#0f1936]" data-text="Anne (daughter) is Margaret&rsquo;s main carer."></p></div>''')
    bar = seq_bar(acc, "&#9675;", "Support network", "People mapped", "Context shared", "Teams with access", "1:6,4:3")
    return f'<div class="pds pdg absolute inset-0" data-s="0" data-times="400:1,2000:2,3400:3,5600:4">{lines}{fam}{client}{supports}{copilot}{bar}</div>'


# Animated mesh backdrops (after 21st.dev "dwd" mesh drift; own shader below): each product's
# four-colour ladder, deep -> base -> accent -> soft. Static gradient if WebGL is unavailable.
MESH = {
    "SognosCare": ["#0b1430", "#3b6fe0", "#8ea8f0", "#eef3fd"],
    "SognosRoster": ["#03112f", "#1d96fc", "#59bbf7", "#eef8fe"],
    "SognosGenogram": ["#1a0224", "#91278c", "#d9a6d6", "#f8eef8"],
}


def paint_layer(name):
    c = MESH[name]
    return (f'<div aria-hidden="true" class="pd-only absolute inset-0 -z-10 overflow-hidden" style="background:linear-gradient(160deg, {c[0]}, {c[1]} 45%, {c[2]} 75%, {c[3]})">'
            f'<canvas class="pd-mesh absolute inset-0 size-full" data-colors="{",".join(c)}"></canvas></div>')


PD_GFX = {"SognosCare": care_d(), "SognosRoster": roster_d(), "SognosGenogram": geno_d()}




def card(i, p):
    style = f'background:linear-gradient(160deg, color-mix(in srgb, {p["deep"]} 55%, transparent), color-mix(in srgb, {p["mid"]} 35%, transparent)), url({P}/{p["photo"]}) center / cover'
    if p["name"] == "SognosGenogram":
        style += ";" + GENO_VARS
    if p["name"] == "SognosCare":
        gfx = "".join(f'<div data-care-opt="{k}" class="care-opt flex w-full flex-1 items-center justify-center">{g}</div>' for k, g in CARE_GFX.items())
    else:
        gfx = f'<div aria-hidden="true" class="pd-hide flex w-full flex-1 justify-center">{GFX[p["name"]]}</div>'
    # D · Painted UI: every product (shown when data-care="d").
    gfx += f'<div aria-hidden="true" class="pd-only flex w-full flex-1 items-center justify-center">{PD_GFX[p["name"]]}</div>' + paint_layer(p["name"])
    # Photo + product wash, white logo, then the motion graphic (frosted cards; see .pp CSS).
    panel = (f'<div data-prod="{p["name"]}" class="pp relative isolate col-span-full flex aspect-square flex-col items-center gap-6 overflow-hidden rounded-xl px-6 pt-10 pb-6 md:col-[8/-1]" style="{style}">'
             f'<img src="{P}/logos/{p["logo"]}" alt="" class="relative h-9 w-auto shrink-0 brightness-0 invert" />{gfx}</div>')
    return f'''<div class="stack relative w-full {"" if i == 0 else "-mt-6 md:-mt-10"}" style="z-index:{i}">
      <div class="stack-card w-full rounded-t-3xl border-t border-line md:rounded-t-[40px]" style="--fill:{p["fill"]}">
        <div class="mx-auto grid max-w-7xl gap-8 px-6 pt-8 pb-12 md:grid-cols-12 md:pt-12 md:pb-18 lg:pt-16 lg:pb-24">
          <div class="col-span-full flex flex-col items-start gap-6 md:col-span-6">
            <p class="flex items-center gap-2 text-lg text-heading"><span aria-hidden="true" class="size-3 rounded-full" style="background:{p["dot"]}"></span>{p["label"]}</p>
            <div>
              <h2 class="font-heading text-3xl font-normal leading-[1.2] tracking-[-0.01em] text-heading md:text-4xl">{p["name"]}</h2>
              <p class="mt-4 text-lg leading-relaxed text-heading">{p["desc"]}</p>
              <div class="mt-6 flex flex-wrap items-center gap-2">
                <a href="#" class="inline-flex h-12 items-center rounded-full bg-heading px-5 text-base text-white transition-colors hover:bg-accent {FOCUS}">Explore {p["name"]}</a>
              </div>
            </div>
          </div>
          {panel}
        </div>
      </div>
    </div>'''


SWITCHER = ('''<aside class="fixed right-4 bottom-4 z-[60] w-72 rounded-lg border border-line bg-white p-4 text-sm text-heading">
  <p class="font-medium">Review &middot; product stack</p>
  <p class="mt-3 text-xs text-muted">Stacking effect</p>
  <div class="mt-1.5 flex gap-1.5" data-sw="stack"><button class="sw" data-v="ref">A &middot; Reference</button><button class="sw" data-v="drift">B &middot; Drift</button></div>
  <p class="mt-3 text-xs text-muted">Graphics (A&ndash;C Care only, D all products)</p>
  <div class="mt-1.5 flex flex-wrap gap-1.5" data-sw="care"><button class="sw" data-v="a">A &middot; Record</button><button class="sw" data-v="b">B &middot; Deck</button><button class="sw" data-v="c">C &middot; Rail</button><button class="sw" data-v="d">D &middot; Painted UI (all)</button></div>
</aside>''')


HTML = f'''<!doctype html>
<html lang="en" data-stack="ref" data-care="a">
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
  /* Stack cards: colour fill on entry (white -> product colour by 40% in view). Stacking:
     A Reference (sticky; JS scales / lifts / fades the covered card) or B Drift (half-speed exit). */
  .stack-card {{ background-color: var(--fill, #fff); transform-origin: top center; }}
  html[data-stack="ref"] .stack {{ position: sticky; top: var(--stick, 80px); }}
  @supports (animation-timeline: view()) {{
    .stack-card {{ animation: stack-fill linear both; animation-timeline: view(); animation-range: entry 0% cover 40%; }}
    html[data-stack="drift"] .stack-card {{ animation: stack-fill linear both, stack-slow linear both; animation-timeline: view(), view(); animation-range: entry 0% cover 40%, exit 0% exit 100%; }}
    @keyframes stack-fill {{ from {{ background-color: #fff; }} to {{ background-color: var(--fill, #fff); }} }}
    @keyframes stack-slow {{ to {{ transform: translateY(50%); }} }}
  }}
  @media (prefers-reduced-motion: reduce) {{ .stack-card {{ animation: none !important; transform: none !important; opacity: 1 !important; }} .cg * {{ transition: none !important; animation: none !important; }} }}
  /* Care graphics (review options) */
  .care-opt {{ display: none !important; }}
  html[data-care="a"] [data-care-opt="a"], html[data-care="b"] [data-care-opt="b"], html[data-care="c"] [data-care-opt="c"] {{ display: flex !important; }}
  .cg-chip {{ background: rgb(255 255 255 / .18); color: #fff; transition: background-color .4s, color .4s; }}
  .cg[data-step="0"] [data-cg-chip="0"], .cg[data-step="1"] [data-cg-chip="1"], .cg[data-step="2"] [data-cg-chip="2"] {{ background: #fff; color: #0f1936; }}
  .cg-scene {{ opacity: 0; transform: translateY(8px); transition: opacity .5s cubic-bezier(.23,1,.32,1), transform .5s cubic-bezier(.23,1,.32,1); }}
  .cg[data-step="0"] [data-cg-scene="0"], .cg[data-step="1"] [data-cg-scene="1"], .cg[data-step="2"] [data-cg-scene="2"] {{ opacity: 1; transform: none; }}
  .cg-scene .cg-tick {{ opacity: .2; transform: scale(.8); transition: opacity .3s var(--d,0s), transform .3s var(--d,0s); }}
  .cg-scene li {{ --d: 0s; }} .cg-scene li .cg-tick {{ transition-delay: var(--d); }}
  .cg[data-step="0"] [data-cg-scene="0"], .cg[data-step="1"] [data-cg-scene="1"], .cg[data-step="2"] [data-cg-scene="2"] {{ --on: 1; }}
  .cg[data-step="1"] [data-cg-scene="1"] .cg-tick {{ opacity: 1; transform: none; }}
  .cg-bar {{ transform: scaleY(.08); transform-origin: bottom; transition: transform .7s cubic-bezier(.23,1,.32,1) var(--d,0s); }}
  .cg[data-step="2"] [data-cg-scene="2"] .cg-bar {{ transform: none; }}
  .cg-grow {{ transform: scaleX(.2); transform-origin: left; transition: transform 1s cubic-bezier(.23,1,.32,1) .15s; }}
  .cg[data-step="0"] [data-cg-scene="0"] .cg-grow {{ transform: none; }}
  .cg-card {{ transition: transform .6s cubic-bezier(.23,1,.32,1), opacity .6s; transform-origin: top center; }}
  .cg-card[data-pos="0"] {{ transform: none; opacity: 1; z-index: 3; }}
  .cg-card[data-pos="1"] {{ transform: translateY(-26px) scale(.95); opacity: .9; z-index: 2; }}
  .cg-card[data-pos="2"] {{ transform: translateY(-52px) scale(.9); opacity: .75; z-index: 1; }}
  .cg-node {{ transition: background-color .4s, transform .4s cubic-bezier(.23,1,.32,1); }}
  .cg-stop[data-state="done"] .cg-node {{ background: rgb(255 255 255 / .8); }}
  .cg-stop[data-state="active"] .cg-node {{ background: #fff; transform: scale(1.2); }}
  .cg-detail {{ display: none; }}
  .cg-stop[data-state="active"] .cg-detail {{ display: block; animation: cg-in .45s cubic-bezier(.23,1,.32,1) both; }}
  @keyframes cg-in {{ from {{ opacity: 0; transform: translateY(6px); }} }}
  /* D · Painted UI */
  .pd-only {{ display: none !important; }}
  html[data-care="d"] .pd-only {{ display: flex !important; }}
  html[data-care="d"] div.pd-only.absolute {{ display: block !important; }}
  html[data-care="d"] .pd-hide, html[data-care="d"] .care-opt {{ display: none !important; }}
  /* Care board (D): Referral -> Assessment -> Care plan, then the client frame (data-s 0..4). */
  html[data-care="d"] .pp > img {{ visibility: hidden; }}
  .pdc-card {{ display: none; }}
  .pdc[data-s="1"] .pdc-card[data-show="1"] {{ display: block; animation: pdc-drop .55s cubic-bezier(.22,1,.36,1) var(--d, 0s) both; }}
  .pdc[data-s="2"] .pdc-card[data-show="2"], .pdc[data-s="3"] .pdc-card[data-show="2"], .pdc[data-s="4"] .pdc-card[data-show="2"] {{ display: block; animation: pdc-drop .55s cubic-bezier(.22,1,.36,1) var(--d, 0s) both; }}
  @keyframes pdc-drop {{ from {{ opacity: 0; transform: translateY(-10px); }} }}
  .pdc-n {{ position: absolute; left: 0; top: 0; opacity: 0; transition: opacity .3s; }}
  .pdc[data-s="0"] .pdc-n[data-at="0"], .pdc[data-s="1"] .pdc-n[data-at="1"], .pdc[data-s="2"] .pdc-n[data-at="2"], .pdc[data-s="3"] .pdc-n[data-at="2"], .pdc[data-s="4"] .pdc-n[data-at="2"] {{ opacity: 1; }}
  .pdc-board {{ transition: transform .9s cubic-bezier(.22,1,.36,1), opacity .5s ease; }}
  .pdc[data-s="3"] .pdc-board {{ transform: translateX(-30%); }}
  .pdc[data-s="4"] .pdc-board {{ transform: translateX(-30%) translateY(-8px); opacity: 0; }}
  .pdc-frame {{ opacity: 0; transform: scale(.94); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }}
  .pdc[data-s="4"] .pdc-frame {{ opacity: 1; transform: none; }}
  .pdc-t1, .pdc-t2, .pdc-ring {{ transition: opacity .4s ease, transform .4s cubic-bezier(.22,1,.36,1); }}
  .pdc-t2 {{ opacity: 0; transform: translateY(6px); }}
  .pdc[data-s="4"] .pdc-t1 {{ opacity: 0; transform: translateY(-6px); }} .pdc[data-s="4"] .pdc-t2 {{ opacity: 1; transform: none; }} .pdc[data-s="4"] .pdc-ring {{ opacity: 0; }}
  @media (prefers-reduced-motion: reduce) {{ .pdc *, .pdc {{ transition: none !important; animation: none !important; }} }}
  /* Split-flap counters */
  .flap-d.flip > span {{ animation: flap .22s cubic-bezier(.22,1,.36,1); }}
  @keyframes flap {{ 0% {{ transform: rotateX(-90deg); opacity: .2; }} 100% {{ transform: none; opacity: 1; }} }}
  /* Shared sequence bar labels */
  .sq-t1, .sq-t2 {{ transition: opacity .4s ease, transform .4s cubic-bezier(.22,1,.36,1); }}
  .sq-t2 {{ opacity: 0; transform: translateY(6px); }}
  .pds[data-s="4"] .sq-t1 {{ opacity: 0; transform: translateY(-6px); }} .pds[data-s="4"] .sq-t2 {{ opacity: 1; transform: none; }}
  /* Roster sequence */
  .pdr-shift {{ border-color: #f59e0b; background: #fff7e8; color: #9a5b00; animation: pdr-pulse 1.6s ease-in-out infinite; }}
  .pdr-as {{ display: none; }}
  .pdr[data-s="3"] .pdr-shift, .pdr[data-s="4"] .pdr-shift {{ border-color: #15803d; background: #dcf5e6; color: #15803d; animation: none; }}
  .pdr[data-s="3"] .pdr-un, .pdr[data-s="4"] .pdr-un {{ display: none; }} .pdr[data-s="3"] .pdr-as, .pdr[data-s="4"] .pdr-as {{ display: block; }}
  @keyframes pdr-pulse {{ 50% {{ opacity: .55; }} }}
  .pdr-match, .pdr-row, .pdr-route {{ opacity: 0; transform: translateY(10px); transition: opacity .5s cubic-bezier(.22,1,.36,1) var(--d,0s), transform .5s cubic-bezier(.22,1,.36,1) var(--d,0s); }}
  .pdr:not([data-s="0"]) .pdr-match {{ opacity: 1; transform: none; }}
  .pdr-bar > span {{ width: 0; transition: width 1.2s linear; }} .pdr:not([data-s="0"]) .pdr-bar > span {{ width: 100%; }}
  .pdr[data-s="2"] .pdr-row, .pdr[data-s="3"] .pdr-row {{ opacity: 1; transform: none; }}
  .pdr-row {{ border-color: #e2e8f0; }} .pdr[data-s="3"] .pdr-top {{ border-color: #1d96fc; }} .pdr[data-s="3"] .pdr-row:not(.pdr-top) {{ opacity: .35; }}
  .pdr[data-s="4"] .pdr-match {{ opacity: 0; }}
  .pdr[data-s="4"] .pdr-route {{ opacity: 1; transform: none; }}
  .pdr-path {{ stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1) .15s; }} .pdr[data-s="4"] .pdr-path {{ stroke-dashoffset: 0; }}
  .pdr-pin {{ opacity: 0; transition: opacity .3s ease calc(.2s + var(--d)); }} .pdr[data-s="4"] .pdr-pin {{ opacity: 1; }}
  /* Genogram sequence */
  .pdg-fam, .pdg-sup {{ opacity: 0; transition: opacity .5s cubic-bezier(.22,1,.36,1) var(--d,0s), translate .5s cubic-bezier(.22,1,.36,1) var(--d,0s); }}
  .pdg:not([data-s="0"]) .pdg-fam {{ opacity: 1; }}
  .pdg-l {{ stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset .8s cubic-bezier(.22,1,.36,1) var(--d,0s); }} .pdg:not([data-s="0"]) .pdg-l {{ stroke-dashoffset: 0; }}
  .pdg-s {{ opacity: 0; transition: opacity .4s ease var(--d,0s); }}
  .pdg[data-s="2"] .pdg-s, .pdg[data-s="3"] .pdg-s, .pdg[data-s="4"] .pdg-s, .pdg[data-s="2"] .pdg-sup, .pdg[data-s="3"] .pdg-sup, .pdg[data-s="4"] .pdg-sup {{ opacity: 1; }}
  .pdg-ai {{ opacity: 0; transform: translateY(10px); transition: opacity .5s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1); }}
  .pdg[data-s="3"] .pdg-ai, .pdg[data-s="4"] .pdg-ai {{ opacity: 1; transform: none; }}
  @media (prefers-reduced-motion: reduce) {{ .pds *, .pds {{ transition: none !important; animation: none !important; }} }}
  /* Review switcher */
  .sw {{ border: 1px solid #e2e8f0; border-radius: 999px; padding: .35rem .75rem; font-size: .75rem; }}
  .sw[aria-pressed="true"] {{ background: #0f1936; border-color: #0f1936; color: #fff; }}
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
{SWITCHER}
{NS["FV_JS"]}{NS["MOTION_JS"]}
<script>
  // Review switcher: stacking effect + Care graphic.
  (() => {{
    const root = document.documentElement;
    document.querySelectorAll("[data-sw]").forEach((g) => {{
      const key = g.dataset.sw, btns = [...g.querySelectorAll("button")];
      const set = (v) => {{ root.dataset[key] = v; btns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === v))); dispatchEvent(new Event("resize")); }};
      btns.forEach((b) => b.addEventListener("click", () => set(b.dataset.v)));
      set(root.dataset[key]);
    }});
  }})();
  // A · Reference stacking: the covered card scales to .94, lifts 40px and fades as the next rises.
  (() => {{
    const stacks = [...document.querySelectorAll(".stack")];
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {{
      raf = 0;
      const ref = document.documentElement.dataset.stack === "ref", vh = innerHeight;
      stacks.forEach((el, i) => {{
        const card = el.firstElementChild, next = stacks[i + 1];
        el.style.setProperty("--stick", Math.min(80, vh - el.offsetHeight) + "px");
        if (!ref || still || !next) {{ card.style.transform = ""; card.style.opacity = ""; return; }}
        // Progress = how far the next card has covered this one (our cards are shorter than
        // the screen, unlike the reference's full-height panels).
        const stick = parseFloat(el.style.getPropertyValue("--stick")) || 80;
        const t = Math.min(1, Math.max(0, 1 - (next.getBoundingClientRect().top - stick) / el.offsetHeight));
        card.style.transform = `scale(${{1 - t * 0.06}}) translateY(${{-t * 40}}px)`;
        card.style.opacity = String(Math.max(0, 1 - t * 1.4));
      }});
    }};
    addEventListener("scroll", () => {{ raf ||= requestAnimationFrame(update); }}, {{ passive: true }});
    addEventListener("resize", update);
    update();
  }})();
  // D sequences (Care board, Roster match, Genogram map): timed stages from data-times when
  // 35% in view; reset on leave so they replay; reduced motion jumps to the final stage.
  // Split-flap counters flip through to each stage's value; Copilot text types at stage 3.
  (() => {{
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const setFlap = (f, to, animate) => {{
      const ds = [...f.querySelectorAll(".flap-d")];
      const show = (n) => String(n).padStart(ds.length, "0").split("").forEach((c, i) => {{
        const s = ds[i].firstElementChild; if (s.textContent === c) return; s.textContent = c;
        if (animate) {{ ds[i].classList.remove("flip"); void ds[i].offsetWidth; ds[i].classList.add("flip"); }}
      }});
      clearInterval(f._t);
      if (!animate) return show(to);
      const from = +ds.map((d) => d.firstElementChild.textContent).join(""), steps = 8;
      let k = 0;
      f._t = setInterval(() => {{ k++; show(Math.round(from + (to - from) * k / steps)); if (k >= steps) clearInterval(f._t); }}, 90);
    }};
    const type = (el, on) => {{
      clearInterval(el._t);
      const text = el.dataset.text;
      if (!on) return (el.textContent = "");
      if (still) return (el.textContent = text);
      let n = 0; el._t = setInterval(() => {{ el.textContent = text.slice(0, ++n); if (n >= text.length) clearInterval(el._t); }}, 28);
    }};
    document.querySelectorAll(".pds").forEach((el) => {{
      const times = el.dataset.times.split(",").map((p) => p.split(":").map(Number));
      const flaps = [...el.querySelectorAll(".flap")].map((f) => [f, new Map(f.dataset.vals.split(",").map((p) => p.split(":").map(Number)))]);
      const typers = [...el.querySelectorAll("[data-text]")];
      let timers = [];
      const stage = (s, animate) => {{
        el.dataset.s = s;
        flaps.forEach(([f, vals]) => vals.has(s) && setFlap(f, vals.get(s), animate));
        if (s === 3) typers.forEach((t) => type(t, true));
      }};
      const reset = () => {{ timers.forEach(clearTimeout); timers = []; el.dataset.s = "0"; flaps.forEach(([f]) => setFlap(f, 0, false)); typers.forEach((t) => type(t, false)); }};
      const play = () => {{
        reset();
        if (still) {{ times.forEach(([, s]) => stage(s, false)); return; }}
        times.forEach(([ms, s]) => timers.push(setTimeout(() => stage(s, true), ms)));
      }};
      new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? play() : reset())), {{ threshold: 0.35 }}).observe(el);
    }});
  }})();
  // Mesh drift backdrops: domain-warped fbm mapped onto a 4-stop palette, slow drift, light
  // grain + vignette. Half resolution (soft field), DPR <= 1.5, runs only while on screen,
  // one still frame under reduced motion; CSS gradient underneath if WebGL fails.
  (() => {{
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const FS = `precision highp float;
uniform vec2 r; uniform float t; uniform vec3 c0, c1, c2, c3;
float h(vec2 p) {{ p = fract(p * vec2(234.34, 435.345)); p += dot(p, p + 34.23); return fract(p.x * p.y); }}
float n(vec2 p) {{ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3. - 2. * f);
  return mix(mix(h(i), h(i + vec2(1., 0.)), u.x), mix(h(i + vec2(0., 1.)), h(i + vec2(1., 1.)), u.x), u.y); }}
float fbm(vec2 p) {{ float v = 0., a = .5; for (int i = 0; i < 4; i++) {{ v += a * n(p); p *= 2.; a *= .5; }} return v; }}
vec3 pal(float x) {{ x = clamp(x, 0., 1.);
  if (x < .33) return mix(c0, c1, x / .33); if (x < .66) return mix(c1, c2, (x - .33) / .33); return mix(c2, c3, (x - .66) / .34); }}
void main() {{
  vec2 uv = gl_FragCoord.xy / r; vec2 p = uv * vec2(r.x / r.y, 1.) * 1.6; float s = t * .05;
  vec2 q = vec2(fbm(p + vec2(0., s)), fbm(p + vec2(5.2, 1.3) - s));
  vec2 w = vec2(fbm(p + 3. * q + vec2(1.7, 9.2) + s * .6), fbm(p + 3. * q + vec2(8.3, 2.8) - s * .4));
  float x = smoothstep(.15, .85, fbm(p + 2.5 * w) * 1.1 + uv.y * .25 - .1);
  vec3 col = pal(x) * mix(.85, 1., smoothstep(1.2, .2, length(uv - .5)));
  col += (h(gl_FragCoord.xy + fract(t)) - .5) * .03;
  gl_FragColor = vec4(col, 1.);
}}`;
    const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    document.querySelectorAll(".pd-mesh").forEach((cv) => {{
      const gl = cv.getContext("webgl", {{ antialias: false, premultipliedAlpha: false }});
      if (!gl) return cv.remove();
      const sh = (type, src) => {{ const o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); return o; }};
      const prog = gl.createProgram();
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, "attribute vec2 a; void main() {{ gl_Position = vec4(a, 0., 1.); }}"));
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return cv.remove();
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, "a"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      cv.dataset.colors.split(",").forEach((c, i) => gl.uniform3fv(gl.getUniformLocation(prog, "c" + i), rgb(c)));
      const uR = gl.getUniformLocation(prog, "r"), uT = gl.getUniformLocation(prog, "t");
      const size = () => {{ const k = Math.min(devicePixelRatio || 1, 1.5) * 0.5; cv.width = Math.max(1, cv.clientWidth * k | 0); cv.height = Math.max(1, cv.clientHeight * k | 0); gl.viewport(0, 0, cv.width, cv.height); gl.uniform2f(uR, cv.width, cv.height); }};
      const draw = (sec) => {{ gl.uniform1f(uT, sec); gl.drawArrays(gl.TRIANGLES, 0, 3); }};
      let raf = 0, on = false, t0 = performance.now() - Math.random() * 20000;
      const loop = (now) => {{ draw((now - t0) / 1000); raf = on ? requestAnimationFrame(loop) : 0; }};
      size(); draw(8);
      addEventListener("resize", () => {{ size(); if (!on) draw(8); }});
      if (still) return;
      new IntersectionObserver((es) => es.forEach((e) => {{ on = e.isIntersecting; if (on && !raf) raf = requestAnimationFrame(loop); }})).observe(cv);
    }});
  }})();
  // Care graphics: step each one through its features.
  (() => {{
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelectorAll(".cg").forEach((cg) => {{
      const n = +cg.dataset.cgSteps;
      let i = 0;
      const show = () => {{
        cg.dataset.step = i;
        cg.querySelectorAll("[data-cg-card]").forEach((c) => (c.dataset.pos = (+c.dataset.cgCard - i + n) % n));
        cg.querySelectorAll("[data-cg-stop]").forEach((st) => {{ const k = +st.dataset.cgStop; st.dataset.state = k < i ? "done" : k === i ? "active" : ""; }});
      }};
      show();
      if (!still) setInterval(() => {{ i = (i + 1) % n; show(); }}, cg.classList.contains("cg-c") ? 1800 : 2800);
    }});
  }})();
  (() => {{ const h = document.querySelector("header"); const on = () => (h.dataset.scrolled = String(scrollY > 8)); addEventListener("scroll", on, {{ passive: true }}); on(); }})();
</script>
</body>
</html>
'''

OUT.write_text(HTML)
print(f"wrote {OUT.relative_to(ROOT)}")
