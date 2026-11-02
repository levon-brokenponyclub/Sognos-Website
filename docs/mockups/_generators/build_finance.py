"""Finance & Operations solution - audit + layout options (2026-11-02).
Writes docs/mockups/finance-operations/options.html. Run from the redesign repo root:
  python3 -I docs/mockups/_generators/build_finance.py

Copy is verbatim from prod (sognos-react main, lib/solutions-content.ts, slug finance-operations);
the route and content do not exist on the redesign branch yet. Every section is shown in 2-3
layout options, labelled A/B/C, built on the approved Solutions / Industries patterns and
tokens. Graphic data (figures, PO numbers, dates) is illustrative. Lines marked SUGGESTED
are not live copy. No shadows; rounded / rounded-lg only.
"""
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
P = "../../../public"
OUT = ROOT / "docs/mockups/finance-operations/options.html"

# ── Live copy (prod) ─────────────────────────────────────────────────────────
NAME = "Finance &amp; Operations"
H1 = "Bring finance and operations into one connected view"
SUB = ("Run financial management, procurement, supply chain and operational processes on Microsoft Dynamics 365, "
       "with the visibility and control to manage complexity as your organisation grows.")
PROBLEM_INTRO = ("When finance, procurement and operational teams work across separate systems, every close, approval "
                 "and decision takes more effort than it should.")
PAINS = [
    ("Too much manual work between systems", "Teams spend time reconciling spreadsheets, re-entering data and chasing information across different systems before they can act."),
    ("Limited visibility across the operation", "Finance, purchasing, inventory and operational data sit in different places, making it difficult to understand costs, performance and what is happening right now."),
    ("ERP that cannot keep pace", "Heavy customisation and ageing processes make change harder than it needs to be, from adding new services and entities to meeting new reporting and compliance requirements."),
]
CAPS = [
    ("Financial management", "Manage general ledger, accounts payable and receivable, cash, budgeting, fixed assets and financial reporting in one connected environment."),
    ("Procurement &amp; sourcing", "Bring purchasing, approvals and supplier processes together so teams have greater control from requisition through to receipt."),
    ("Supply chain &amp; inventory", "Track inventory, stock movements, orders and supply across locations with clearer operational visibility."),
    ("Asset &amp; cost management", "Connect assets, maintenance activity and costs so teams can understand performance and make better decisions across the asset lifecycle."),
    ("Reporting &amp; business performance", "Give finance and operational leaders clearer access to the numbers that matter, with reporting and analytics built around how your organisation works."),
    ("Integration &amp; automation", "Connect Finance &amp; Operations with the wider Microsoft ecosystem and automate the workflows around approvals, data movement and day-to-day processes."),
]
EXP_INTRO = "Sognos is delivering Dynamics 365 Finance &amp; Operations services for organisations operating in complex, high-accountability environments."
CUSTOMERS = ["St Vincent&#39;s Health Australia", "Hearing Australia", "Genetic Technologies"]
# SUGGESTED sector tags (inferred, confirm with Sognos).
SECTORS = ["Healthcare", "National service delivery", "Commercial"]
EXP_OUTRO = ("From healthcare and national service delivery to commercial operations, our teams understand that ERP needs to "
             "work around the reality of your organisation, not force your organisation around the system.")
PLAT_LABEL = "Microsoft Dynamics 365 Finance and Supply Chain Management"
PLAT_DESC = ("Sognos works across the Microsoft Finance &amp; Operations platform to connect financial management with the operational "
             "processes behind it. Our capability brings together Dynamics 365 Finance and Supply Chain Management with Power Platform, "
             "Power BI, Microsoft 365 and the wider Dynamics 365 ecosystem, giving you a Microsoft-native foundation that can evolve with your organisation.")
ECO_HEAD = "One platform. Finance through to operations."
ECO = [
    ("Dynamics 365 Finance", "Bring financial management, planning, reporting and control into one core system.", "logos/Dynamics365.svg"),
    ("Dynamics 365 Supply Chain Management", "Connect procurement, inventory, supply chain, assets and operational activity across the organisation.", "logos/Dynamics365.svg"),
    ("Power Platform", "Extend workflows and automate processes without building another disconnected system.", "logos/PowerPlatform_scalable.svg"),
    ("Power BI", "Turn finance and operational data into clear reporting for the people making decisions.", "logos/platform/PowerBI_scalable.svg"),
]
CTA_H = "Get more from Dynamics 365 Finance &amp; Operations"
CTA_SUB = ("Whether you are implementing Finance &amp; Operations, improving an existing environment or need experienced delivery "
           "support, talk to a team that understands complex operations and the Microsoft platform.")
WORKS = [
    ("SognosCare", "Care operations &amp; compliance platform", "logos/sognos-care-logo-color.svg", "product/CareBg.avif", "#0f1936", "#3b6fe0"),
    ("SognosRoster", "Workforce scheduling &amp; optimisation engine", "logos/sognos-roster-logo-color.svg", "product/RosterBg.avif", "#104b90", "#59bbf7"),
]

# ── Shared bits ──────────────────────────────────────────────────────────────
FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
SECTION = "py-20 md:py-28"
H2 = "font-heading text-3xl font-normal leading-[1.2] tracking-[-0.01em] text-balance md:text-4xl"
H3 = "font-heading text-xl font-normal leading-snug tracking-[-0.005em]"
LEDE = "max-w-2xl text-base leading-relaxed text-pretty"
ARW = '<span aria-hidden="true">&rarr;</span>'


def label(text, dark=False):
    c = "text-white/80" if dark else "text-heading"
    return f'<p class="flex items-center gap-2.5 text-lg leading-[1.6] {c}"><span aria-hidden="true" class="block size-[0.66em] shrink-0 bg-accent"></span>{text}</p>'


def crumb(dark=False):
    a, b = ("text-white/80", "text-white/60") if dark else ("text-heading", "text-muted")
    return (f'<p class="flex items-center gap-2.5 text-lg leading-[1.6] {a}"><span aria-hidden="true" class="block size-[0.66em] bg-accent"></span>'
            f'<span class="{b}">Solutions</span><span aria-hidden="true" class="{b}">/</span>{NAME}</p>')


def ctas(dark=False):
    primary = "bg-white text-heading hover:bg-accent hover:text-white" if dark else "bg-heading text-white hover:bg-accent"
    second = "text-white" if dark else "text-heading"
    return (f'<div class="mt-8 flex flex-wrap items-center gap-3"><a href="#" class="inline-flex h-12 items-center rounded-full px-6 text-base transition-colors {primary} {FOCUS}">Book a Demo</a>'
            f'<a href="#" class="inline-flex h-12 items-center gap-1.5 rounded-full px-2 text-base {second} transition-opacity hover:opacity-80 {FOCUS}">Talk to Sales <span aria-hidden="true">&#8599;</span></a></div>')


def tick(on=True):
    return (f'<span class="flex size-5 shrink-0 items-center justify-center rounded-full {"bg-emerald-500/15 text-emerald-600" if on else "border border-line text-transparent"}">'
            '<svg viewBox="0 0 14 14" class="size-3" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7.5l3 3 6-7"/></svg></span>')


# ── Graphics (illustrative data) ─────────────────────────────────────────────
def g_close():
    """Month-end close tracker."""
    steps = [("Bank reconciliation", True), ("Accruals posted", True), ("Intercompany matched", True), ("Management reports", False)]
    rows = "".join(f'<li class="flex items-center gap-3 border-t border-line py-2.5 text-sm text-heading">{tick(on)}{s}</li>' for s, on in steps)
    return (f'<div class="rounded-lg border border-line bg-white p-4 lg:p-5"><div class="flex items-center justify-between"><p class="text-sm text-heading">Month-end close</p>'
            f'<span class="rounded-full bg-tint px-2.5 py-0.5 text-xs text-muted">Day 3 of 5</span></div><ul class="mt-3">{rows}</ul>'
            f'<div class="mt-3 h-1.5 overflow-hidden rounded-full bg-tint"><div class="fo-grow h-full w-[82%] rounded-full bg-accent"></div></div><p class="mt-2 text-xs text-muted">82% reconciled</p></div>')


def g_p2p(dark=False):
    """Requisition-to-payment chain, steps light in sequence."""
    steps = ["Requisition", "Purchase order", "Receipt", "Invoice", "Payment"]
    base = "border-white/15 bg-white/5 text-white" if dark else "border-line bg-white text-heading"
    items = "".join(
        f'<li class="fo-step flex items-center gap-3 rounded border px-4 py-3 text-sm {base}" style="animation-delay:{i * 0.5}s">'
        f'<span class="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] text-white tabular-nums">{i + 1}</span>{s}'
        f'<span class="ml-auto text-xs {"text-white/60" if dark else "text-muted"}">{["PR-2041", "PO-8812", "GRN-551", "INV-3307", "Paid"][i]}</span></li>'
        for i, s in enumerate(steps))
    return f'<ol class="flex flex-col gap-2">{items}</ol>'


def g_kpis():
    k = [("Cash position", "$4.82m", "+3.1% WoW"), ("Open purchase orders", "128", "14 awaiting approval"), ("Inventory value", "$2.36m", "6 sites")]
    return "".join(f'<div class="rounded-lg border border-line bg-white p-5"><p class="text-xs uppercase tracking-widest text-muted">{a}</p>'
                   f'<p class="mt-3 font-heading text-4xl tabular-nums text-heading">{b}</p><p class="mt-1 text-sm text-muted">{c}</p></div>' for a, b, c in k)


def g_bars(n=10, tone="bg-accent"):
    hs = [38, 46, 41, 55, 60, 52, 66, 72, 69, 80][:n]
    return ('<div class="flex h-28 items-end gap-1.5">' + "".join(
        f'<span class="fo-bar flex-1 rounded-t {tone if i == n - 1 else "bg-accent/30"}" style="height:{h}%;animation-delay:{i * 0.06}s"></span>' for i, h in enumerate(hs)) + "</div>")


CAP_GFX = [
    lambda: ('<div class="space-y-2 text-sm">' + "".join(f'<div class="flex justify-between rounded bg-white px-3 py-2"><span class="text-muted">{a}</span><span class="tabular-nums text-heading">{b}</span></div>'
             for a, b in [("Accounts payable", "$612,400"), ("Accounts receivable", "$1,048,900"), ("Cash at bank", "$4.82m")]) + "</div>"),
    lambda: ('<div class="space-y-2 text-sm">' + "".join(f'<div class="flex items-center justify-between rounded bg-white px-3 py-2"><span class="text-heading">{a}</span><span class="rounded-full px-2 py-0.5 text-xs {c}">{b}</span></div>'
             for a, b, c in [("PO-8812 · Medical supplies", "Approved", "bg-emerald-500/15 text-emerald-700"), ("PO-8813 · IT hardware", "Awaiting", "bg-amber-400/20 text-amber-700"), ("PO-8814 · Cleaning", "Draft", "bg-tint text-muted")]) + "</div>"),
    lambda: ('<div class="space-y-3 text-sm">' + "".join(f'<div><div class="flex justify-between text-heading"><span>{a}</span><span class="tabular-nums text-muted">{b}%</span></div><div class="mt-1 h-1.5 rounded-full bg-white"><div class="h-full rounded-full bg-accent" style="width:{b}%"></div></div></div>'
             for a, b in [("Sydney DC", 82), ("Melbourne", 64), ("Brisbane", 41)]) + "</div>"),
    lambda: ('<div class="grid grid-cols-3 gap-2 text-center text-sm">' + "".join(f'<div class="rounded bg-white px-2 py-3"><p class="font-heading text-2xl tabular-nums text-heading">{b}</p><p class="mt-1 text-xs text-muted">{a}</p></div>'
             for a, b in [("Assets", "1,240"), ("Due service", "37"), ("Cost YTD", "$1.1m")]) + "</div>"),
    lambda: '<div class="rounded bg-white p-3">' + g_bars(10) + "</div>",
    lambda: ('<div class="flex items-center justify-between gap-2 text-xs text-heading">' + '<span aria-hidden="true" class="h-px flex-1 bg-accent/40"></span>'.join(
             f'<span class="rounded bg-white px-2.5 py-2">{a}</span>' for a in ["Finance", "Power Automate", "Teams"]) + "</div>"),
]


# ── Sections ─────────────────────────────────────────────────────────────────
def hero_a():
    return f'''<section class="bg-white pt-36 pb-16 md:pt-44 md:pb-24"><div class="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-8">
  <div class="lg:col-span-6">{crumb()}<h1 class="mt-6 font-heading text-5xl font-normal leading-[1.05] tracking-[-0.02em] text-balance text-heading md:text-6xl">{H1}</h1>
    <p class="mt-6 {LEDE} text-lg text-body">{SUB}</p>{ctas()}</div>
  <div class="relative lg:col-span-6"><div class="relative aspect-[4/5] overflow-hidden rounded-lg sm:aspect-[4/3] lg:aspect-[5/6]" style="background:linear-gradient(160deg, color-mix(in srgb,#152248 70%,transparent), color-mix(in srgb,#1d96fc 35%,transparent)), url({P}/images/solutions/SolutionsHero.avif) center/cover"></div>
    <div class="absolute inset-x-4 bottom-4 sm:inset-x-auto sm:left-5 sm:w-[22rem]">{g_close()}</div></div>
</div></section>'''


def hero_b():
    return f'''<section class="bg-white pt-36 pb-16 md:pt-44 md:pb-24"><div class="mx-auto max-w-7xl px-6">
  <div class="mx-auto flex max-w-4xl flex-col items-center text-center">{crumb()}<h1 class="mt-6 font-heading text-5xl font-normal leading-[1.05] tracking-[-0.02em] text-balance text-heading md:text-6xl">{H1}</h1>
    <p class="mt-6 {LEDE} text-lg text-body">{SUB}</p><div class="flex justify-center">{ctas()}</div></div>
  <div class="mt-14 rounded-lg bg-tint p-3 md:mt-20"><div class="grid grid-cols-1 gap-3 md:grid-cols-3">{g_kpis()}</div>
    <div class="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3"><div class="rounded-lg border border-line bg-white p-5 md:col-span-2"><p class="text-sm text-heading">Operating cost vs budget</p><div class="mt-4">{g_bars(10)}</div></div>{g_close()}</div></div>
</div></section>'''


def hero_c():
    return f'''<section class="relative overflow-hidden bg-navy pt-36 pb-16 text-white md:pt-44 md:pb-24">
  <div aria-hidden="true" class="pointer-events-none absolute inset-0" style="background:radial-gradient(55% 60% at 85% 20%, rgba(29,150,252,.28), transparent 70%)"></div>
  <div class="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-8">
  <div class="lg:col-span-6">{crumb(True)}<h1 class="mt-6 font-heading text-5xl font-normal leading-[1.05] tracking-[-0.02em] text-balance md:text-6xl">{H1}</h1>
    <p class="mt-6 {LEDE} text-lg text-white/75">{SUB}</p>{ctas(True)}</div>
  <div class="lg:col-span-5 lg:col-start-8"><div class="rounded-lg border border-white/10 bg-white/5 p-4 lg:p-6"><p class="mb-4 text-sm text-white/60">Requisition to payment, one record</p>{g_p2p(True)}</div></div>
</div></section>'''


def problem_a():
    rows = "".join(f'''<li class="grid grid-cols-[3rem_1fr] gap-4 border-t border-white/15 py-8 md:grid-cols-[4rem_1fr_auto] md:gap-8">
      <span class="font-heading text-3xl tabular-nums text-accent">{i + 1:02d}</span>
      <div><h3 class="{H3} text-white">{t}</h3><p class="mt-2 text-sm leading-normal text-white/75">{b}</p></div>
      <span class="col-start-2 self-start rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/75 md:col-start-auto">Issue today</span></li>''' for i, (t, b) in enumerate(PAINS))
    return f'''<section class="bg-navy text-white {SECTION}"><div class="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8">
  <div class="lg:col-span-5"><div class="lg:sticky lg:top-28">{label("The problem", True)}<h2 class="mt-4 {H2}">What {NAME} solves</h2><p class="mt-4 {LEDE} text-white/75">{PROBLEM_INTRO}</p></div></div>
  <ol class="border-b border-white/15 lg:col-span-7">{rows}</ol></div></section>'''


def problem_b():
    cols = "".join(f'<div class="border-t-2 border-white/15 pt-5"><p class="font-heading text-4xl tabular-nums text-accent md:text-5xl">{i + 1:02d}</p><h3 class="mt-4 {H3} text-white">{t}</h3><p class="mt-2 text-sm leading-normal text-white/75">{b}</p></div>' for i, (t, b) in enumerate(PAINS))
    return f'''<section class="bg-navy text-white {SECTION}"><div class="mx-auto max-w-7xl px-6"><div class="flex max-w-3xl flex-col gap-4">{label("The problem", True)}<h2 class="{H2}">What {NAME} solves</h2><p class="{LEDE} text-white/75">{PROBLEM_INTRO}</p></div>
  <div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">{cols}</div></div></section>'''


def problem_c():
    # SUGGESTED "with" lines - not live copy.
    after = ["One ledger: data entered once flows to finance, procurement and reporting.", "Costs, purchasing, stock and operations in one live view.", "Configurable, Microsoft-native processes that change as you grow."]
    rows = "".join(f'''<div class="grid grid-cols-1 border-t border-line md:grid-cols-2"><div class="py-6 md:pr-8"><p class="text-xs uppercase tracking-widest text-muted">Today</p><h3 class="mt-2 {H3} text-heading">{t}</h3><p class="mt-2 text-sm text-body">{b}</p></div>
      <div class="border-line py-6 md:border-l md:pl-8"><p class="text-xs uppercase tracking-widest text-accent-strong">With {NAME}</p><p class="mt-2 {H3} text-heading">{a}</p><p class="mt-2 text-xs text-muted">SUGGESTED copy</p></div></div>''' for (t, b), a in zip(PAINS, after))
    return f'''<section class="bg-tint {SECTION}"><div class="mx-auto max-w-7xl px-6"><div class="flex max-w-3xl flex-col gap-4">{label("The problem")}<h2 class="{H2} text-heading">What {NAME} solves</h2><p class="{LEDE} text-body">{PROBLEM_INTRO}</p></div>
  <div class="mt-12 border-b border-line">{rows}</div></div></section>'''


def caps_head(dark=False):
    return f'<div class="flex max-w-3xl flex-col gap-4">{label("Capabilities", dark)}<h2 class="{H2} {"text-white" if dark else "text-heading"}">What you get with {NAME}</h2></div>'


def caps_a():
    cards = "".join(f'''<div class="flex flex-col gap-5 rounded-lg border border-line bg-white p-3"><div class="rounded bg-[#edf6ff] p-4">{CAP_GFX[i]()}</div>
      <div class="px-3 pb-3"><h3 class="{H3} text-heading">{t}</h3><p class="mt-2 text-sm leading-normal text-body">{b}</p></div></div>''' for i, (t, b) in enumerate(CAPS))
    return f'<section class="bg-tint {SECTION}"><div class="mx-auto max-w-7xl px-6">{caps_head()}<div class="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">{cards}</div></div></section>'


def caps_b():
    tabs = "".join(f'<button type="button" data-tab="{i}" aria-selected="{str(i == 0).lower()}" class="fo-tab flex w-full items-center justify-between border-t border-line py-4 text-left text-base text-muted transition-colors hover:text-heading aria-selected:text-heading {FOCUS}"><span>{t}</span><span aria-hidden="true" class="text-accent opacity-0 transition-opacity">&rarr;</span></button>' for i, (t, _) in enumerate(CAPS))
    panels = "".join(f'<div data-panel="{i}" {"" if i == 0 else "hidden"} class="flex h-full flex-col justify-between gap-8"><div class="mx-auto w-full max-w-sm">{CAP_GFX[i]()}</div><div><h3 class="{H3} text-heading">{t}</h3><p class="mt-2 {LEDE} text-body">{b}</p></div></div>' for i, (t, b) in enumerate(CAPS))
    return f'''<section class="bg-white {SECTION}" data-tabs><div class="mx-auto max-w-7xl px-6">{caps_head()}
  <div class="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12"><div class="border-b border-line lg:col-span-4">{tabs}</div>
    <div class="min-h-[420px] rounded-lg bg-[#edf6ff] p-6 lg:col-span-8 lg:p-10">{panels}</div></div></div></section>'''


def caps_c():
    groups = [("Finance", [0, 4]), ("Operations", [1, 2, 3]), ("Platform", [5])]
    cols = "".join(f'<div><p class="border-b-2 border-heading pb-3 text-sm uppercase tracking-widest text-heading">{g}</p>' + "".join(
        f'<div class="border-b border-line py-6"><h3 class="{H3} text-heading">{CAPS[i][0]}</h3><p class="mt-2 text-sm leading-normal text-body">{CAPS[i][1]}</p></div>' for i in idx) + "</div>" for g, idx in groups)
    return f'<section class="bg-white {SECTION}"><div class="mx-auto max-w-7xl px-6">{caps_head()}<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">{cols}</div></div></section>'


def exp_head(dark=False):
    return f'<div class="flex max-w-3xl flex-col gap-4">{label("Experience", dark)}<h2 class="{H2} {"text-white" if dark else "text-heading"}">{NAME} delivery in complex organisations</h2></div>'


def exp_a():
    names = "".join(f'<li class="flex flex-wrap items-baseline justify-between gap-4 border-t border-line py-6"><span class="font-heading text-3xl text-heading md:text-4xl">{c}</span><span class="text-sm text-muted">{s} &middot; SUGGESTED tag</span></li>' for c, s in zip(CUSTOMERS, SECTORS))
    return f'''<section class="bg-white {SECTION}"><div class="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8">
  <div class="lg:col-span-5">{exp_head()}<p class="mt-4 {LEDE} text-body">{EXP_INTRO}</p></div>
  <div class="lg:col-span-7"><ul class="border-b border-line">{names}</ul><p class="mt-8 {LEDE} text-body">{EXP_OUTRO}</p></div></div></section>'''


def exp_b():
    cards = "".join(f'<div class="flex min-h-56 flex-col justify-between rounded-lg border border-white/10 bg-white/5 p-6"><span class="self-start rounded-full border border-white/15 px-3 py-1 text-xs text-white/75">{s}</span><div><p class="font-heading text-2xl text-white">{c}</p><p class="mt-2 text-sm text-white/60">Dynamics 365 Finance &amp; Operations</p></div></div>' for c, s in zip(CUSTOMERS, SECTORS))
    return f'''<section class="bg-navy text-white {SECTION}"><div class="mx-auto max-w-7xl px-6">{exp_head(True)}<p class="mt-4 {LEDE} text-white/75">{EXP_INTRO}</p>
  <div class="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">{cards}</div><p class="mt-10 {LEDE} text-white/75">{EXP_OUTRO}</p></div></section>'''


def exp_c():
    return f'''<section class="bg-tint {SECTION}"><div class="mx-auto max-w-5xl px-6 text-center"><div class="flex justify-center">{label("Experience")}</div>
  <p class="mx-auto mt-6 max-w-4xl font-heading text-3xl leading-[1.25] text-balance text-heading md:text-4xl">&ldquo;{EXP_OUTRO}&rdquo;</p>
  <ul class="mt-12 grid grid-cols-1 border-y border-line sm:grid-cols-3">{"".join(f'<li class="py-6 text-lg text-heading sm:border-l sm:border-line sm:first:border-l-0">{c}</li>' for c in CUSTOMERS)}</ul>
  <p class="mx-auto mt-8 {LEDE} text-body">{EXP_INTRO}</p></div></section>'''


def plat_a():
    cards = "".join(f'<div class="flex flex-col gap-6 rounded-lg border border-white/10 bg-white/5 p-6"><img src="{P}/{l}" alt="" class="h-9 w-auto self-start" /><div><h3 class="{H3} text-white">{t}</h3><p class="mt-2 text-sm leading-normal text-white/75">{b}</p></div></div>' for t, b, l in ECO)
    return f'''<section class="bg-navy text-white {SECTION}"><div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 lg:grid-cols-12 lg:gap-8">
  <div class="lg:col-span-2">{label("Platform", True)}</div><div class="min-w-0 lg:col-[3/-1]"><h2 class="{H2}">{ECO_HEAD}</h2><p class="mt-4 max-w-3xl text-base leading-relaxed text-white/75">{PLAT_DESC}</p>
  <div class="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">{cards}</div></div></div></section>'''


def plat_b():
    core = "".join(f'<div class="rounded bg-white/10 px-5 py-4"><p class="text-base text-white">{t}</p><p class="mt-1 text-xs text-white/70">{b}</p></div>' for t, b, _ in ECO[:2])
    ring = "".join(f'<div class="rounded-lg border border-line bg-white p-5"><img src="{P}/{l}" alt="" class="h-7 w-auto" /><p class="mt-4 text-base text-heading">{t}</p><p class="mt-1 text-sm text-body">{b}</p></div>' for t, b, l in ECO[2:])
    return f'''<section class="bg-white {SECTION}"><div class="mx-auto max-w-7xl px-6"><div class="flex max-w-3xl flex-col gap-4">{label("Platform")}<h2 class="{H2} text-heading">{ECO_HEAD}</h2><p class="{LEDE} text-body">{PLAT_DESC}</p></div>
  <div class="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4"><div class="rounded-lg bg-navy p-6 lg:col-span-2 lg:p-8"><p class="text-xs uppercase tracking-widest text-white/60">Core &middot; {PLAT_LABEL}</p><div class="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">{core}</div>
    <p class="mt-5 text-xs text-white/60">Microsoft 365 &middot; Dataverse &middot; Copilot underneath</p></div><div class="grid grid-cols-1 gap-3">{ring}</div></div></div></section>'''


def plat_c():
    rows = "".join(f'<li class="grid grid-cols-[3rem_1fr] items-center gap-6 border-t border-line py-6 md:grid-cols-[3rem_18rem_1fr]"><img src="{P}/{l}" alt="" class="h-8 w-auto" /><h3 class="{H3} text-heading">{t}</h3><p class="col-span-2 text-sm text-body md:col-span-1">{b}</p></li>' for t, b, l in ECO)
    return f'''<section class="bg-tint {SECTION}"><div class="mx-auto max-w-7xl px-6"><div class="flex max-w-3xl flex-col gap-4">{label("Platform")}<h2 class="{H2} text-heading">Built on {PLAT_LABEL}</h2><p class="{LEDE} text-body">{PLAT_DESC}</p></div>
  <ul class="mt-12 border-b border-line">{rows}</ul></div></section>'''


def works_a():
    cards = "".join(f'''<div class="flex flex-col gap-6 rounded-lg border border-white bg-white p-3"><div class="flex h-[220px] items-center justify-center rounded" style="background:linear-gradient(160deg, color-mix(in srgb,{d} 55%,transparent), color-mix(in srgb,{m} 35%,transparent)), url({P}/{ph}) center/cover"><img src="{P}/{lg}" alt="{n}" class="h-8 w-auto brightness-0 invert" /></div>
      <div class="px-3 pb-4"><span aria-hidden="true" class="mb-5 block h-1 w-10 rounded-full" style="background:{m}"></span><h3 class="{H3} text-heading">{t}</h3><a href="#" class="mt-6 inline-flex min-h-11 items-center gap-1.5 text-base text-heading hover:text-accent {FOCUS}">Explore {n} {ARW}</a></div></div>''' for n, t, lg, ph, d, m in WORKS)
    return f'''<section class="bg-tint {SECTION}"><div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 lg:grid-cols-12 lg:gap-8"><div class="lg:col-span-2">{label("Works with")}</div>
  <div class="min-w-0 lg:col-[3/-1]"><h2 class="{H2} text-heading">Connects to the Sognos platform</h2><div class="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">{cards}</div></div></div></section>'''


def cta_a():
    return f'''<section class="relative overflow-hidden bg-navy text-white {SECTION}"><div aria-hidden="true" class="pointer-events-none absolute inset-0" style="background:radial-gradient(50% 70% at 90% 50%, rgba(29,150,252,.25), transparent 70%)"></div>
  <div class="relative mx-auto max-w-7xl px-6"><h2 class="max-w-3xl {H2} md:text-5xl">{CTA_H}</h2><p class="mt-5 {LEDE} text-white/75">{CTA_SUB}</p>{ctas(True)}</div></section>'''


def cta_b():
    return f'''<section class="border-y border-line bg-white {SECTION}"><div class="mx-auto grid max-w-7xl grid-cols-1 items-end gap-10 px-6 lg:grid-cols-12">
  <h2 class="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-balance text-heading md:text-6xl lg:col-span-8">{CTA_H}</h2>
  <div class="lg:col-span-4"><p class="text-base leading-relaxed text-body">{CTA_SUB}</p>{ctas()}</div></div></section>'''


SECTIONS = [
    ("hero", "Hero", [("A", "Split &middot; photo + close tracker (Solutions standard)", hero_a), ("B", "Centred + KPI dashboard panel", hero_b), ("C", "Navy &middot; requisition-to-payment flow", hero_c)]),
    ("problem", "Problem", [("A", "Sticky rail rows &middot; navy (Solutions B)", problem_a), ("B", "Numbered columns &middot; navy (Industries challenge)", problem_b), ("C", "Today vs with F&amp;O &middot; tint", problem_c)]),
    ("caps", "Capabilities", [("A", "Card grid with graphics &middot; tint (Solutions A)", caps_a), ("B", "Tabs + graphic panel &middot; white (Industries A)", caps_b), ("C", "Grouped Finance / Operations / Platform", caps_c)]),
    ("exp", "Experience (new section)", [("A", "Editorial customer list &middot; white", exp_a), ("B", "Proof cards &middot; navy", exp_b), ("C", "Pull statement + names &middot; tint", exp_c)]),
    ("plat", "Platform (merges prod Platform + Microsoft ecosystem)", [("A", "Navy cards with the rail (Solutions C)", plat_a), ("B", "Core + extensions diagram &middot; white", plat_b), ("C", "Logo rows &middot; tint", plat_c)]),
    ("works", "Works with", [("A", "Product cards &middot; Care + Roster (Solutions A)", works_a)]),
    ("cta", "CTA", [("A", "Navy band", cta_a), ("B", "Editorial &middot; between hairlines (Home C)", cta_b)]),
]

AUDIT = [
    ("Missing on redesign", "No <code>finance-operations</code> entry in <code>lib/constants.ts</code> or <code>lib/solutions-content.ts</code> on the redesign branch, so <code>/solutions/finance-operations</code> 404s on preview. Prod has 8 solutions; redesign has 7."),
    ("Broken stats", "Prod shows &ldquo;0&times; Faster Compliance Reporting&rdquo; and &ldquo;0% Quality Standard Compliance&rdquo;: counters that never ran, and compliance claims that do not fit F&amp;O. Drop."),
    ("Duplicate platform story", "&ldquo;Built on Dynamics 365 Finance and SCM&rdquo; and &ldquo;One platform. Finance through to operations.&rdquo; say the same thing twice, plus a &ldquo;Powered by&rdquo; logo carousel. Merge into one Platform section."),
    ("Off-topic blocks", "The &ldquo;Field Service Innovations with Microsoft Dynamics&rdquo; banner and a date-picker booking widget sit mid-page. Replace with the standard CTA (Book a Demo + Talk to Sales)."),
    ("Proof without links", "Experience names St Vincent&#39;s, Hearing Australia and Genetic Technologies with no stories or detail. Confirm permission to name them; add story links when they exist."),
    ("Positioning", "F&amp;O is a delivery service, not a product. Keep it a supporting solution: Works with links it back to SognosCare + SognosRoster."),
    ("No visuals", "Every section is text-only on prod. Options here add illustrative finance graphics (close tracker, P2P chain, KPIs) in the Frontline style."),
]

CSS = """<style>
  @font-face { font-family: "AngelList"; src: url("../../../public/app/AngelList.woff2") format("woff2"); font-weight: 100 900; font-display: swap; }
  @keyframes fo-grow { from { width: 0 } }
  @keyframes fo-rise { from { transform: scaleY(0) } }
  @keyframes fo-step { 0%, 100% { border-color: inherit } 10%, 30% { border-color: #1d96fc } }
  .fo-grow { animation: fo-grow 1.4s cubic-bezier(.22,1,.36,1) both; }
  .fo-bar { transform-origin: bottom; animation: fo-rise .9s cubic-bezier(.22,1,.36,1) both; }
  .fo-step { animation: fo-step 2.5s ease-in-out infinite; }
  .fo-tab[aria-selected="true"] span[aria-hidden] { opacity: 1; }
  @media (prefers-reduced-motion: reduce) { .fo-grow, .fo-bar, .fo-step { animation: none !important; } }
</style>
<style type="text/tailwindcss">
  @theme {
    --font-sans: "AngelList", ui-sans-serif, system-ui, sans-serif;
    --font-heading: "AngelList", ui-sans-serif, system-ui, sans-serif;
    --color-heading: #0f1936; --color-body: #152248; --color-muted: #68706f; --color-line: #e2e8f0;
    --color-tint: #f9fafe; --color-accent: #1d96fc; --color-navy: #152248; --color-accent-strong: #0b6fc4;
  }
</style>"""

JS = """<script>
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = root.querySelectorAll("[data-tab]"), panels = root.querySelectorAll("[data-panel]");
    tabs.forEach((t) => t.addEventListener("click", () => {
      tabs.forEach((x) => x.setAttribute("aria-selected", String(x === t)));
      panels.forEach((p) => (p.hidden = p.dataset.panel !== t.dataset.tab));
    }));
  });
</script>"""


def build():
    index = "".join(f'<a href="#{k}" class="shrink-0 rounded-full border border-line px-3 py-1.5 text-xs text-heading hover:border-heading">{n.split(" (")[0]}</a>' for k, n, _ in SECTIONS)
    audit = "".join(f'<li class="grid grid-cols-1 gap-1 border-t border-line py-4 md:grid-cols-[14rem_1fr] md:gap-6"><p class="text-sm text-heading">{t}</p><p class="text-sm leading-relaxed text-body">{b}</p></li>' for t, b in AUDIT)
    body = []
    for k, n, opts in SECTIONS:
        body.append(f'<div id="{k}" class="scroll-mt-16 border-t-4 border-heading bg-white px-6 py-5"><p class="mx-auto max-w-7xl font-heading text-2xl text-heading">{n}</p></div>')
        for letter, desc, fn in opts:
            body.append(f'<div class="sticky top-12 z-30 border-y border-line bg-white/95 px-6 py-2 backdrop-blur"><p class="mx-auto max-w-7xl text-sm text-heading"><span class="mr-2 rounded bg-heading px-2 py-0.5 text-xs text-white">{k.title()} {letter}</span>{desc}</p></div>')
            body.append(fn())
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Finance &amp; Operations - layout options</title>
<!-- Generated by docs/mockups/_generators/build_finance.py - edit the script, not this file. -->
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
{CSS}
</head>
<body class="bg-white font-sans text-body antialiased">
<nav class="sticky top-0 z-40 flex h-12 items-center gap-2 overflow-x-auto border-b border-line bg-white px-6"><span class="mr-2 shrink-0 text-sm text-heading">F&amp;O options</span><a href="#audit" class="shrink-0 rounded-full bg-heading px-3 py-1.5 text-xs text-white">Audit</a>{index}</nav>
<section id="audit" class="scroll-mt-16 bg-tint px-6 py-16"><div class="mx-auto max-w-7xl">{label("Audit &middot; sognos.com.au/solutions/finance-operations")}
  <h1 class="mt-4 {H2} text-heading">Finance &amp; Operations: what to fix before porting</h1>
  <p class="mt-4 {LEDE} text-body">Prod order: Hero &rarr; Problem (3) &rarr; Capabilities (6) &rarr; Experience &rarr; Platform &rarr; Microsoft ecosystem (4) &rarr; Works with &rarr; Booking widget &rarr; Powered-by logos &rarr; Stats &rarr; Promo banner. Copy below is live; graphics and data are illustrative; SUGGESTED marks new copy.</p>
  <ul class="mt-8 border-b border-line">{audit}</ul></div></section>
{"".join(body)}
{JS}
</body>
</html>
'''


OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(build())
print(f"wrote {OUT.relative_to(ROOT)}")
