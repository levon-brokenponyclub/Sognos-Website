"""Industries / Health & Social Care polish-pass mockups.

Reuses the SognosCare + Frontline generators (shell, type scale, labels,
gallery graphics, Works-with product cards) via runpy, then writes
docs/mockups/health-social-care/*.html. Run from the redesign repo root:
  python3 -I <this file> docs/mockups/sognoscare docs/mockups/frontline docs/mockups/health-social-care
"""
import re
import runpy
import sys
from pathlib import Path

CARE_OUT, FL_OUT, OUT = sys.argv[1], sys.argv[2], Path(sys.argv[3])
sys.argv = [sys.argv[0], CARE_OUT, FL_OUT]
fl = runpy.run_path(str(Path(__file__).with_name("build_frontline.py")))
ns = fl["ns"]
OUT.mkdir(parents=True, exist_ok=True)
page = fl["page"]
page.__globals__["OUT"] = OUT

T, label, P = ns["T"], ns["label"], ns["P"]
SECTION, HEAD, GAP, RAIL = ns["SECTION"], ns["HEAD"], ns["GAP"], ns["RAIL"]
CONTENT = "min-w-0 lg:col-[3/-1]"
CSS = fl["CSS"] + fl["FLX_CSS"]
JS = fl["JS"]
header = fl["header"]
_C, _steps, _HP, _avatar = fl["_C"], fl["_steps"], fl["_HP"], fl["_avatar"]
_panel = ns["_panel"]

# ── Live copy (lib/industries-content.ts, lib/constants.ts, IndustryPlatformSection) ──
NAME = "Health &amp; Social Care"
H1 = "Service operations built for care"
SUB = "From disability support to aged care, Sognos helps health and social care providers coordinate delivery, maintain compliance, and scale with confidence."
META_DESC = "Coordinate complex care delivery, multidisciplinary teams, and compliance-heavy service operations."
CHALLENGES = [
    ("Compliance pressure is constant", "NDIS, aged care, and state-level regulations require evidence of service delivery, participant outcomes, and audit-ready records - at all times."),
    ("Workforce complexity is high", "Matching support workers to participants based on skills, qualifications, location, and relationship history is a daily coordination challenge."),
    ("Admin load crowds out care time", "Documentation, reporting, and scheduling tasks consume significant capacity that should be directed toward participant outcomes."),
]
HELPS = [
    ("Compliance built into every workflow", "SognosCare embeds compliance checks, audit trails, and outcome recording directly into service delivery - so evidence exists without extra admin effort."),
    ("Intelligent workforce matching", "SognosRoster matches workers to participants automatically, factoring skills, compliance status, travel time, and continuity of care."),
    ("Reporting without the overhead", "Generate funder and regulatory reports from live operational data - no manual compilation, no reconciliation."),
]
OTHER = [  # INDUSTRIES minus this one (name, slug, description)
    ("Facilities Management", "facilities-management", "Dispatch field teams efficiently, manage SLAs, and maintain visibility across sites and clients."),
    ("Local Government", "local-government", "Support frontline service delivery with clear case management, workforce coordination, and audit trails."),
    ("Industrial Services", "industrial-services", "Coordinate large-scale field operations, asset-linked work, and complex workforce logistics."),
    ("Energy &amp; Utilities", "energy-utilities", "Manage asset-intensive service delivery, compliance, and workforce execution across critical networks."),
]
PLATFORM = [  # name, byline, description (IndustryPlatformSection), Works-with product
    ("SognosCare", "One platform. From intake to outcome.", "Manage cases, track service delivery, meet compliance obligations, and report with confidence - in one platform built end-to-end for care.", 1),
    ("SognosRoster", "The right worker for every job, in real time.", "Allocate the right people, at the right time, to the right services - automatically. Putting real-time optimisation in the hands of your operations team.", 0),
    ("SognosGenogram", "Family context. Built into every record.", "Map family structures, understand kinship networks, track relationship changes, and make better informed care decisions — in one connected view built for frontline practice.", 2),
]
TAGLINE = "Manage demand - Coordinate workforce - Track outcomes"
ROSE = "#f7edf3"  # sector tint (IndustrySection SECTOR_TINT)

CTA = '<button type="button" class="min-h-11 rounded-full bg-accent px-7 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Book a Demo</button>'
# Secondary hero CTA - SognosCare "Learn More" text-link style (mirrors Frontline). Label is a copy SUGGESTION (S2).
CTA_2 = '<a href="#how" class="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-base font-medium text-heading transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">See how Sognos helps <span aria-hidden="true">&#8599;</span></a>'
BREADCRUMB = '<p class="flex items-center gap-2.5 text-lg leading-[1.6] text-heading"><span aria-hidden="true" class="block size-[0.66em] bg-accent"></span><a href="#" class="text-muted underline-offset-4 hover:text-accent hover:underline">Industries</a><span aria-hidden="true" class="text-muted">/</span>' + NAME + "</p>"
IMG = f"{P}/images/industries/health-social-care.webp"


def recolour(panel, bg):
    return re.sub(r'style="background:[^"]*"', f'style="background:{bg}"', panel, count=1)


# ── 01 Hero ─────────────────────────────────────────────────────────────────
# Overlay block (mirrors the Frontline "Job dispatched" card). Data is illustrative.
OVERLAY = """<div class="absolute bottom-4 left-4 right-4 rounded-lg border border-line bg-white p-4 sm:right-auto sm:w-72">
            <div class="flex items-center justify-between"><p class="font-heading text-base text-heading">Visit completed</p><span class="text-xs text-muted">#2207</span></div>
            <p class="mt-1 text-xs text-muted">P. Shah &middot; Personal care &middot; <span class="text-emerald-700">Note signed</span></p>
          </div>"""


def hero(variant):
    float_card = ""
    if variant == "b":
        float_card = f"""<div class="fv absolute -bottom-8 -left-6 hidden w-[300px] sm:block lg:-left-12" data-loop="run">
            <div class="space-y-2 text-left">
              <div data-in="1" class="{_C} flex items-center justify-between p-3"><div><p class="text-sm font-medium text-heading">Care team &middot; M. Turner</p><p class="text-xs text-muted">Nurse &middot; OT &middot; Support worker</p></div><div class="flex -space-x-2">{_avatar("PS", "size-7 border-2 border-white")}{_avatar("JK", "size-7 border-2 border-white")}{_avatar("EL", "size-7 border-2 border-white")}</div></div>
              <div data-in="2" class="{_C} px-3 py-1">{_HP}<ul class="divide-y divide-line">{_steps(["Care plan reviewed", "Funding rules checked", "Incident register clear"])}</ul></div>
            </div>
          </div>"""
    return f"""<section id="hero" class="bg-white pt-32 pb-20 md:pb-28 lg:pt-40">
  <div class="mx-auto max-w-7xl px-6">
    <div class="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
      <div class="flex flex-col items-start gap-4 lg:col-span-7 lg:pr-16 xl:pr-24">
        {BREADCRUMB}
        <h1 class="font-heading text-5xl font-normal leading-[1.05] tracking-[-0.02em] text-heading"><span class="block">Service operations</span><span class="block">built for care</span></h1>
        <p class="{T["herosub"]} text-body">{SUB}</p>
        <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">{CTA}{CTA_2}</div>
      </div>
      <div class="relative lg:col-span-5">
        <div class="relative aspect-[4/5] max-h-[480px] overflow-hidden rounded bg-tint lg:aspect-auto lg:h-[480px]"><img src="{IMG}" alt="Health &amp; Social Care preview" class="size-full object-cover" />{OVERLAY if variant == "a" else ""}</div>
        {float_card}
      </div>
    </div>
  </div>
</section>"""


# ── 02 The challenge ────────────────────────────────────────────────────────
CHALLENGE = f"""<section id="challenge" class="bg-navy {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("The challenge", "dark")}</div>
      <div class="{CONTENT}">
        <div class="{HEAD}"><h2 class="{T["h2"]} text-white">What makes {NAME} hard to run</h2><p class="{T["lede"]} text-white/75">{META_DESC}</p></div>
        <div class="fv {GAP} grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">
          {"".join(f'''<article class="flx-rise flx-d{i} flex min-h-[300px] flex-col justify-between rounded-lg bg-white/5 p-6 lg:p-8">
            <span aria-hidden="true" class="font-heading text-5xl font-light tabular-nums text-white/25">{i:02d}</span>
            <div><h3 class="{T["h3sm"]} text-white md:text-xl">{t}</h3><p class="mt-3 {T["body"]} text-white/75">{b}</p></div>
          </article>''' for i, (t, b) in enumerate(CHALLENGES, 1))}
        </div>
      </div>
    </div>
  </div>
</section>"""


# ── 03 How Sognos helps ─────────────────────────────────────────────────────
HELP_GFX = [recolour(ns["FV_COMPLIANCE"], ROSE), recolour(ns["R_MATCH"], ns["_mix"]("#1d96fc", 8)), recolour(ns["FV_REPORTING"], ROSE)]
HOW_HEAD = f"""<div class="{HEAD}"><h2 class="{T["h2"]} text-heading">Purpose-built for {NAME}</h2><p class="{T["lede"]} text-body">{META_DESC}</p></div>"""

HOW_A = f"""<section id="how" class="bg-tint {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("How Sognos helps")}</div>
      <div class="{CONTENT}">
        {HOW_HEAD}
        <div data-how class="{GAP} grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-4">
          <div role="tablist" aria-label="How Sognos helps" aria-orientation="vertical" class="flex flex-col gap-2 lg:col-span-5">
            {"".join(f'''<button type="button" role="tab" id="how-tab-{i}" aria-controls="how-panel-{i}" aria-selected="{str(i == 0).lower()}" tabindex="{0 if i == 0 else -1}" data-how-tab="{i}" class="group rounded-lg border border-transparent bg-white p-5 text-left transition-colors hover:border-line focus-visible:outline-2 focus-visible:outline-accent aria-selected:border-heading lg:p-6">
              <span class="flex items-baseline gap-4"><span class="font-heading text-sm tabular-nums text-muted group-aria-selected:text-accent-strong">{i + 1:02d}</span><span class="{T["h3sm"]} text-heading">{t}</span></span>
              <span class="mt-2 block pl-9 {T["small"]} text-body group-aria-[selected=false]:hidden">{b}</span>
              <span aria-hidden="true" class="mt-4 ml-9 block h-0.5 overflow-hidden rounded-full bg-line group-aria-[selected=false]:hidden"><span class="how-progress block h-full w-0 bg-accent"></span></span>
            </button>''' for i, (t, b) in enumerate(HELPS))}
          </div>
          <div class="lg:col-span-7">
            {"".join(f'<div role="tabpanel" id="how-panel-{i}" aria-labelledby="how-tab-{i}" data-how-panel="{i}" class="h-full [&>.fv]:h-full"{"" if i == 0 else " hidden"}>{g}</div>' for i, g in enumerate(HELP_GFX))}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>"""

HOW_B = f"""<section id="how" class="bg-tint {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("How Sognos helps")}</div>
      <div class="{CONTENT}">
        {HOW_HEAD}
        <div class="{GAP} grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">
          {"".join(f'''<article class="flex flex-col gap-5 rounded-lg bg-white p-3">
            <div class="[&>.fv]:min-h-[300px] [&>.fv]:p-5">{g}</div>
            <div class="px-3 pb-3"><span class="font-heading text-sm tabular-nums text-accent-strong">{i + 1:02d}</span><h3 class="mt-2 {T["h3sm"]} text-heading">{t}</h3><p class="mt-2 {T["small"]} text-body">{b}</p></div>
          </article>''' for i, ((t, b), g) in enumerate(zip(HELPS, HELP_GFX)))}
        </div>
      </div>
    </div>
  </div>
</section>"""

HOW_JS = """<script>
  (() => {
    document.querySelectorAll("[data-how]").forEach((root) => {
      const tabs = [...root.querySelectorAll("[data-how-tab]")], panels = [...root.querySelectorAll("[data-how-panel]")];
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      let i = 0, timer = null, paused = false, inView = false;
      const show = (k, focus) => {
        i = k;
        tabs.forEach((t, j) => { t.setAttribute("aria-selected", String(j === k)); t.tabIndex = j === k ? 0 : -1; const bar = t.querySelector(".how-progress"); bar.style.transition = "none"; bar.style.width = "0"; });
        panels.forEach((p, j) => (p.hidden = j !== k));
        if (focus) tabs[k].focus();
        const bar = tabs[k].querySelector(".how-progress");
        if (!reduce && !paused && inView) requestAnimationFrame(() => { bar.style.transition = "width 6s linear"; bar.style.width = "100%"; });
      };
      const loop = () => { clearInterval(timer); if (reduce || paused || !inView) return; timer = setInterval(() => show((i + 1) % tabs.length), 6000); };
      tabs.forEach((t, k) => {
        t.addEventListener("click", () => { show(k); loop(); });
        t.addEventListener("keydown", (e) => {
          const map = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
          if (e.key in map) { e.preventDefault(); show((k + map[e.key] + tabs.length) % tabs.length, true); }
          if (e.key === "Home") { e.preventDefault(); show(0, true); }
          if (e.key === "End") { e.preventDefault(); show(tabs.length - 1, true); }
        });
      });
      // Rotate only while in view; pause on hover / keyboard focus (WCAG 2.2.2).
      root.addEventListener("mouseenter", () => { paused = true; clearInterval(timer); });
      root.addEventListener("mouseleave", () => { paused = false; show(i); loop(); });
      root.addEventListener("focusin", () => { paused = true; clearInterval(timer); });
      new IntersectionObserver(([e]) => { inView = e.isIntersecting; show(i); loop(); }, { threshold: 0.3 }).observe(root);
    });
  })();
</script>"""


# ── 04 Other industries ─────────────────────────────────────────────────────
TINTS = ns["INDUSTRY_TINTS"]
HOME_IND = {re.sub("&amp;", "&", n): g for n, _, g in ns["HOME_INDUSTRIES"]}
OTHERS = f"""<section id="other-industries" class="bg-white {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Industries")}</div>
      <div class="{CONTENT}">
        <div class="flex flex-wrap items-end justify-between gap-6"><div class="{HEAD}"><h2 class="{T["h2"]} text-heading">Explore other industries</h2></div><a href="#" class="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line px-4 text-sm font-medium text-heading transition-colors hover:border-heading">All industries <span aria-hidden="true">&rarr;</span></a></div>
        <div class="{GAP} grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
          {"".join(f'''<a href="#" class="group flex flex-col gap-5 rounded-lg bg-tint p-3 transition-colors hover:bg-[color-mix(in_srgb,var(--color-accent)_6%,white)] focus-visible:outline-2 focus-visible:outline-accent">
            <div class="[&>.fv]:min-h-[280px] [&>.fv]:p-6">{recolour(HOME_IND[re.sub("&amp;", "&", n)], TINTS[s])}</div>
            <div class="flex items-end justify-between gap-6 px-3 pb-3"><div><h3 class="{T["h3sm"]} text-heading">{n}</h3><p class="mt-2 line-clamp-2 {T["small"]} text-body">{d}</p></div><span aria-hidden="true" class="flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-white text-heading transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">&rarr;</span></div>
          </a>''' for n, s, d in OTHER)}
        </div>
      </div>
    </div>
  </div>
</section>"""
# NOTE copy: "All industries" link label is a SUGGESTION (S6) - not on the live page.


# ── 05 Customer stories (shared component - unchanged) ──────────────────────
STORIES = f"""<section id="stories" class="bg-white pb-20 md:pb-28">
  <div class="mx-auto max-w-7xl px-6">
    <div class="flex min-h-40 items-center justify-center rounded-lg border border-dashed border-line p-8 text-center"><p class="{T["small"]} text-muted">Customer stories &middot; shared <code>ProductCustomerStories</code> (Flourish Australia) &middot; unchanged in this pass</p></div>
  </div>
</section>"""


# ── 06 Platform ─────────────────────────────────────────────────────────────
P3 = fl["PRODUCTS3"]
PSTYLE = fl["PSTYLE"]
GFX = fl["GFX"]


def platform_a():
    cards = []
    for name, byline, desc, pi in PLATFORM:
        p = P3[pi]
        base = PSTYLE[name][0]
        panel = recolour(GFX[name][0][0], base)
        cards.append(f'''<a href="#" class="group grid grid-cols-1 items-stretch gap-3 rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white md:grid-cols-2 lg:gap-4">
            <div class="flex flex-col justify-between gap-10 p-5 lg:p-8">
              <img src="{P}/logos/{p["wlogo"]}" alt="{name}" class="h-8 w-auto self-start brightness-0 invert" />
              <div><span aria-hidden="true" class="mb-5 block h-1 w-10 rounded-full" style="background:{PSTYLE[name][3]}"></span><p class="{T["h3"]} text-white">{byline}</p><p class="mt-3 max-w-[46ch] {T["body"]} text-white/75">{desc}</p>
                <span class="mt-6 inline-flex items-center gap-3 text-base font-medium text-white">{name}<span aria-hidden="true" class="flex size-10 items-center justify-center rounded-full border border-white/30 transition-colors group-hover:border-transparent group-hover:bg-accent">&rarr;</span></span></div>
            </div>
            <div class="[&>.fv]:h-full">{panel}</div>
          </a>''')
    return "".join(cards)


POWERED = f"""<div class="mt-3 flex flex-col items-center justify-center gap-4 rounded-lg bg-white/5 p-6 text-center lg:mt-4 md:flex-row md:gap-8">
          <p class="{T["h3sm"]} text-white">{TAGLINE}</p>
          <span aria-hidden="true" class="hidden h-8 w-px bg-white/20 md:block"></span>
          <span class="flex items-center gap-5"><span class="text-sm text-white/75">Powered by</span><span class="flex items-center gap-4 rounded-full bg-white px-5 py-2.5"><img src="{P}/logos/Dynamics365.svg" alt="Microsoft Dynamics 365" class="h-7 w-auto" /><span aria-hidden="true" class="h-6 w-px bg-line"></span><img src="{P}/logos/Sognos-Solutions-Solutions-Partner.webp" alt="Microsoft Solutions Partner" class="h-7 w-auto" /><span aria-hidden="true" class="h-6 w-px bg-line"></span><img src="{P}/logos/copilot-logo.svg" alt="Microsoft Copilot" class="h-8 w-auto" /></span></span>
        </div>"""

PLAT_HEAD = f"""<div class="{HEAD}"><h2 class="{T["h2"]} text-white">One platform to run {NAME} end-to-end</h2></div>"""

PLATFORM_A = f"""<section id="platform" class="bg-navy {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Platform", "dark")}</div>
      <div class="{CONTENT}">
        {PLAT_HEAD}
        <div class="{GAP} space-y-3 lg:space-y-4">{platform_a()}</div>
        {POWERED}
      </div>
    </div>
  </div>
</section>"""

PLATFORM_B = f"""<section id="platform" class="bg-navy {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Platform", "dark")}</div>
      <div class="{CONTENT}">
        {PLAT_HEAD}
        <div class="{GAP} grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">
          {"".join(f'''<a href="#" class="group flex min-h-[420px] flex-col rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white">
            <div class="flex items-center justify-center rounded bg-navy-dark py-12 transition-colors" style="background:#0f1936"><img src="{P}/logos/{P3[pi]["wlogo"]}" alt="" class="h-9 w-auto brightness-0 invert" /></div>
            <div class="flex flex-1 flex-col p-4"><p class="{T["h3sm"]} text-white">{byline}</p><p class="mt-2 {T["small"]} text-white/75">{desc}</p>
              <span class="mt-auto flex items-center justify-between gap-4 pt-6"><span class="font-heading text-xl text-white">{name}</span><span aria-hidden="true" class="flex size-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors group-hover:border-transparent group-hover:bg-accent">&rarr;</span></span></div>
          </a>''' for name, byline, desc, pi in PLATFORM)}
        </div>
        {POWERED}
      </div>
    </div>
  </div>
</section>"""


# ── Paraform-direction heroes (2026-10-25, after paraform.com/for-companies) ──
# Paraform: split hero, H1 with its last phrase at 40% ink, lede + CTA pinned
# low, a tall photo with an inset hairline frame, a big stat top-left and a
# frosted dark customer card at the foot. Motion: frame draws in, stat counts,
# cards rise, photo drifts (slow zoom). Each industry's hero photo is reused
# on its "Explore other industries" card. Stat values are ILLUSTRATIVE -
# need real customer data before shipping. Customer card copy = the live
# Flourish Australia story title.
H1_SPLIT = '<span class="block">Service operations</span><span class="block">built for</span><span class="block text-heading/40">care</span>'
STORY = ("flourish-australia-logo.png", "Flourish Australia", "Transforming Service Operations with Microsoft Dynamics 365")
IND_IMG = {s: f"{P}/images/industries/{s}.webp" for s in ["health-social-care", "facilities-management", "local-government", "industrial-services", "energy-utilities"]}
IND_STAT = {  # illustrative
    "health-social-care": ("Visits delivered on time", 97, "%"),
    "facilities-management": ("SLA response met", 98, "%"),
    "local-government": ("Cases closed on time", 94, "%"),
    "industrial-services": ("First-visit completion", 92, "%"),
    "energy-utilities": ("Inspections current", 100, "%"),
}

PARA_CSS = """<style>
  @keyframes hp-frame { from { clip-path: inset(50% 50% 50% 50% round 6px); opacity: 0; } to { clip-path: inset(0 0 0 0 round 6px); opacity: 1; } }
  .fv.is-in .hp-frame { animation: hp-frame 1.2s cubic-bezier(.22,1,.36,1) .2s both; }
  .hp-frame { opacity: 0; }
  @keyframes hp-drift { from { transform: scale(1.02); } to { transform: scale(1.09); } }
  .hp-photo { animation: hp-drift 14s ease-in-out infinite alternate; }
  @media (prefers-reduced-motion: reduce) { .hp-frame { opacity: 1; animation: none !important; } .hp-photo { animation: none !important; } }
</style>"""


def stat_block(label_, n, suf, cls="left-[12%] top-[12%]", size="text-6xl lg:text-7xl"):
    return f'<div data-in="1" class="absolute {cls} text-white"><p class="text-sm text-white/85">{label_}</p><p class="mt-1 font-heading {size} font-light leading-none tabular-nums"><span data-count="{n}" data-suffix="">0</span><span class="ml-1 align-top text-[0.45em]">{suf}</span></p></div>'


CUSTOMER_CARD = f"""<div data-in="2" class="rounded-lg border border-white/15 bg-care-dark/55 p-5 text-left backdrop-blur-md">
              <span class="inline-flex rounded bg-white px-2.5 py-1.5"><img src="{P}/logos/{STORY[0]}" alt="{STORY[1]}" class="h-7 w-auto" /></span>
              <p class="mt-3 text-sm leading-relaxed text-white/75">{STORY[2]}</p>
            </div>"""

CARE_CARD = f"""<div class="space-y-2 text-left">
              <div data-in="1" class="flex items-center justify-between rounded-lg border border-white/60 bg-white/80 p-3 backdrop-blur-md"><div><p class="text-sm font-medium text-heading">Care team &middot; M. Turner</p><p class="text-xs text-muted">Nurse &middot; OT &middot; Support worker</p></div><div class="flex -space-x-2">{_avatar("PS", "size-7 border-2 border-white")}{_avatar("JK", "size-7 border-2 border-white")}{_avatar("EL", "size-7 border-2 border-white")}</div></div>
              <div data-in="2" class="rounded-lg border border-white/60 bg-white/80 px-3 py-1 backdrop-blur-md">{_HP}<ul class="divide-y divide-line">{_steps(["Care plan reviewed", "Funding rules checked", "Incident register clear"])}</ul></div>
            </div>"""
H1_PARA = f'<h1 class="{T["h1"]} text-heading">{H1_SPLIT}</h1>'


def photo(src, cls=""):
    return f'<img src="{src}" alt="Health &amp; Social Care preview" class="hp-photo absolute inset-0 size-full object-cover {cls}" />'


HSC_STAT = IND_STAT["health-social-care"]

# P1 · Paraform split - copy left (H1 top, lede + CTA pinned low), framed photo right.
HERO_P1 = f"""<section id="hero" class="bg-tint pt-32 pb-20 md:pb-28 lg:pt-40">
  <div class="mx-auto max-w-7xl px-6">
    <div class="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
      <div class="flex flex-col justify-between gap-12">
        <div class="flex flex-col gap-6">{BREADCRUMB}{H1_PARA}</div>
        <div class="flex flex-col gap-6"><p class="max-w-md {T["herosub"]} text-body">{SUB}</p><div>{CTA}</div></div>
      </div>
      <div class="fv relative aspect-[4/4.2] overflow-hidden rounded" data-loop="count">
        {photo(IMG)}
        <span aria-hidden="true" class="absolute inset-0 bg-gradient-to-b from-care-dark/35 via-transparent to-care-dark/30"></span>
        <span aria-hidden="true" class="hp-frame absolute inset-[8%] rounded border border-white/70"></span>
        {stat_block(*HSC_STAT)}
        <div class="absolute inset-x-[9.5%] bottom-[9.5%]">{CUSTOMER_CARD}</div>
      </div>
    </div>
  </div>
</section>"""

# P2 · Photo-led - one wide photo panel; copy on a frosted panel bottom-left,
# the live care-team card floats right, stat chip top-right.
HERO_P2 = f"""<section id="hero" class="bg-white pt-28 pb-20 md:pb-28 lg:pt-32">
  <div class="mx-auto max-w-7xl px-6">
    <div class="fv relative min-h-[680px] overflow-hidden rounded" data-loop="run">
      {photo(IMG)}
      <span aria-hidden="true" class="absolute inset-0 bg-gradient-to-r from-care-dark/45 via-care-dark/10 to-transparent"></span>
      <div class="absolute inset-x-4 bottom-4 flex max-w-xl flex-col gap-5 rounded-lg border border-white/60 bg-white/85 p-6 backdrop-blur-md sm:inset-x-6 sm:bottom-6 lg:p-10">
        {BREADCRUMB}{H1_PARA}<p class="{T["lede"]} text-body">{SUB}</p><div>{CTA}</div>
      </div>
      <div class="m-float absolute right-6 top-1/2 hidden w-[320px] -translate-y-1/2 lg:block">{CARE_CARD}</div>
      <div data-in="3" class="absolute right-6 top-6 hidden items-center gap-3 rounded-full border border-white/40 bg-care-dark/40 py-2 pl-2 pr-5 text-white backdrop-blur-md sm:flex"><span class="flex size-9 items-center justify-center rounded-full bg-white/15 font-heading text-sm tabular-nums">{HSC_STAT[1]}%</span><span class="text-sm">{HSC_STAT[0]}</span></div>
    </div>
  </div>
</section>"""

# P3 · Centred editorial - centred copy, then a wide 16:7 photo with three
# frosted cards staggered across it (stat, live checklist, customer).
HERO_P3 = f"""<section id="hero" class="bg-tint pt-32 pb-20 md:pb-28 lg:pt-40">
  <div class="mx-auto max-w-7xl px-6">
    <div class="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center [&>p]:mx-auto">{BREADCRUMB}{H1_PARA}<p class="max-w-xl {T["herosub"]} text-body">{SUB}</p><div>{CTA}</div></div>
    <div class="fv relative {GAP} aspect-[16/12] overflow-hidden rounded md:aspect-[16/7]" data-loop="count">
      {photo(IMG)}
      <span aria-hidden="true" class="absolute inset-0 bg-care-dark/25"></span>
      <span aria-hidden="true" class="hp-frame absolute inset-[5%] rounded border border-white/60"></span>
      {stat_block(*HSC_STAT, cls="left-[8%] top-[10%]", size="text-5xl lg:text-6xl")}
      <div class="m-float absolute right-[8%] top-[10%] hidden w-[300px] md:block">{CARE_CARD.replace('data-in="1"', 'data-in="2"', 1)}</div>
      <div class="absolute bottom-[10%] left-[8%] hidden w-[360px] md:block">{CUSTOMER_CARD.replace('data-in="2"', 'data-in="3"')}</div>
    </div>
  </div>
</section>"""


# Explore other industries - photo cards reusing each industry's hero photo,
# with the same hairline frame + stat (illustrative) and a frosted name chip.
def other_photo_card(n, s, d):
    lab, num, suf = IND_STAT[s]
    return f'''<a href="#" class="group flex flex-col gap-5 rounded-lg bg-tint p-3 transition-colors hover:bg-[color-mix(in_srgb,var(--color-accent)_6%,white)] focus-visible:outline-2 focus-visible:outline-accent">
            <div class="fv relative aspect-[4/3] overflow-hidden rounded" data-loop="count">
              <img src="{IND_IMG[s]}" alt="" class="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span aria-hidden="true" class="absolute inset-0 bg-gradient-to-b from-care-dark/40 via-transparent to-care-dark/30"></span>
              <span aria-hidden="true" class="hp-frame absolute inset-[6%] rounded border border-white/60"></span>
              {stat_block(lab, num, suf, cls="left-[10%] top-[10%]", size="text-5xl")}
            </div>
            <div class="flex items-end justify-between gap-6 px-3 pb-3"><div><h3 class="{T["h3sm"]} text-heading">{n}</h3><p class="mt-2 line-clamp-2 {T["small"]} text-body">{d}</p></div><span aria-hidden="true" class="flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-white text-heading transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">&rarr;</span></div>
          </a>'''


OTHERS_PHOTO = OTHERS.split('<div class="{GAP} grid'.replace("{GAP}", GAP))[0] + f'''<div class="{GAP} grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
          {"".join(other_photo_card(n, s, d) for n, s, d in OTHER)}
        </div>
      </div>
    </div>
  </div>
</section>'''


# ── Explore other industries - Frontline "Related" layouts (2026-10-25) ─────
# C: graphic cards (Frontline Related A) - white bordered cards, gallery
# graphic panel, title, clamped description, "Explore" link.
# D: slider (Frontline Related C) - snap track, arrow buttons, sector rule.
# Graphics: Home · Industries gallery set, each on its sector tint.
_OTH_HEAD_ROW = f'<div class="{HEAD}"><h2 class="{T["h2"]} text-heading">Explore other industries</h2></div>'
_EXPLORE = '<span class="inline-flex items-center gap-1.5 text-sm font-medium text-heading group-hover:text-accent">Explore <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">&rarr;</span></span>'
_SECTOR_RULE = {"facilities-management": "#58b368", "local-government": "#b9b26a", "industrial-services": "#6a9fb5", "energy-utilities": "#8fae5a"}


def _oth_panel(n, s, h="h-56"):
    g = recolour(HOME_IND[re.sub("&amp;", "&", n)], TINTS[s])
    return f'<div class="overflow-hidden rounded [&>.fv]:{h} [&>.fv]:min-h-0 [&>.fv]:p-5 [&>.fv>*]:scale-90">{g}</div>'


def _oth_photo(s, h="h-60"):
    """Paraform photo style - the industry's hero photo, wash, hairline frame, counted stat (illustrative)."""
    lab, num, suf = IND_STAT[s]
    return f'''<div class="fv relative {h} overflow-hidden rounded" data-loop="count">
              <img src="{IND_IMG[s]}" alt="" class="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span aria-hidden="true" class="absolute inset-0 bg-gradient-to-b from-care-dark/40 via-transparent to-care-dark/30"></span>
              <span aria-hidden="true" class="hp-frame absolute inset-[6%] rounded border border-white/60"></span>
              {stat_block(lab, num, suf, cls="left-[10%] top-[10%]", size="text-5xl")}
            </div>'''


OTHERS_CARDS = f"""<section id="other-industries" class="bg-tint {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Industries")}</div>
      <div class="{CONTENT}">
        {_OTH_HEAD_ROW}
        <div class="{GAP} grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
          {"".join(f'''<a href="#" class="group flex flex-col gap-5 rounded-lg border border-line bg-white p-3 transition-colors hover:border-heading focus-visible:outline-2 focus-visible:outline-accent">
            {_oth_panel(n, s)}
            <div class="flex flex-1 flex-col px-3 pb-3"><h3 class="{T["h3sm"]} text-heading">{n}</h3><p class="mt-2 line-clamp-3 {T["small"]} text-body">{d}</p><div class="mt-auto pt-6">{_EXPLORE}</div></div>
          </a>''' for n, s, d in OTHER)}
        </div>
      </div>
    </div>
  </div>
</section>"""

OTHERS_SLIDER = f"""<section id="other-industries" class="bg-tint {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Industries")}</div>
      <div class="{CONTENT}">
        <div class="flex items-end justify-between gap-6">{_OTH_HEAD_ROW}
          <div class="hidden shrink-0 gap-2 md:flex">{"".join(f'<button type="button" data-oth-nav="{d}" aria-label="{"Previous" if d < 0 else "Next"}" class="flex size-11 items-center justify-center rounded-full border border-line bg-white text-heading transition-colors hover:border-heading focus-visible:outline-2 focus-visible:outline-accent">{"&larr;" if d < 0 else "&rarr;"}</button>' for d in (-1, 1))}</div>
        </div>
        <div data-oth-track class="rel-track {GAP} -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 lg:gap-4">
          {"".join(f'''<a href="#" class="group flex w-[85%] shrink-0 snap-start flex-col gap-5 rounded-lg bg-white p-3 transition-colors focus-visible:outline-2 focus-visible:outline-accent sm:w-[420px]">
            {_oth_photo(s)}
            <div class="flex flex-1 flex-col px-3 pb-3"><span class="mb-3 h-1 w-10 rounded-full" style="background:{_SECTOR_RULE[s]}"></span><h3 class="{T["h3sm"]} text-heading">{n}</h3><p class="mt-2 line-clamp-3 {T["small"]} text-body">{d}</p><div class="mt-auto pt-6">{_EXPLORE}</div></div>
          </a>''' for n, s, d in OTHER)}
        </div>
      </div>
    </div>
  </div>
</section>"""

OTH_JS = """<script>
  (() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelectorAll("[data-oth-nav]").forEach((b) => b.addEventListener("click", () => {
      const track = b.closest("section").querySelector("[data-oth-track]");
      const step = track.firstElementChild.getBoundingClientRect().width + 16;
      track.scrollBy({ left: step * +b.dataset.othNav, behavior: reduce ? "auto" : "smooth" });
    }));
  })();
</script>"""


# ── Pages ───────────────────────────────────────────────────────────────────
AUDIT = "docs/audits/health-social-care-polish-audit.md"
SHELL = CSS + header("light")
page("01-hero-a.html", "HSC 01 - Hero A (recommended)", f"Audit H1-H4, G4, G8 (breadcrumb -> /industries). Benchmark: AngelList split hero, light. Maps to: industries/[slug]/page.tsx hero. {AUDIT}", SHELL + hero("a") + JS)
page("01-hero-b.html", "HSC 01 - Hero B (floating gallery card)", f"Audit H1-H4. Hero A + the Home Industries Health graphic floating over the image (run loop). Maps to: industries/[slug]/page.tsx hero. {AUDIT}", SHELL + hero("b") + JS)
page("01-hero-p1.html", "HSC 01 - Hero P1 (Paraform split)", f"Paraform split: H1 last phrase at 40% ink, framed photo, counted stat (illustrative), frosted customer card (live Flourish story title). {AUDIT}", PARA_CSS + SHELL + HERO_P1 + JS)
page("01-hero-p2.html", "HSC 01 - Hero P2 (photo-led)", f"Wide photo panel, frosted copy panel, floating live care-team card, stat chip (illustrative). {AUDIT}", PARA_CSS + SHELL + HERO_P2 + JS)
page("01-hero-p3.html", "HSC 01 - Hero P3 (centred editorial)", f"Centred copy, 16:7 framed photo, three frosted cards staggered (stat, checklist, customer). {AUDIT}", PARA_CSS + SHELL + HERO_P3 + JS)
page("04-other-industries-photo.html", "HSC 04 - Other industries (hero photos)", f"Each industry's hero photo with the hero frame + counted stat (illustrative). {AUDIT}", PARA_CSS + CSS + OTHERS_PHOTO + JS)
page("04-other-industries-cards.html", "HSC 04 - Other industries (graphic cards)", f"Frontline Related A pattern: white bordered cards, gallery graphic on the sector tint, Explore link (mockup copy). {AUDIT}", CSS + OTHERS_CARDS + JS)
page("04-other-industries-slider.html", "HSC 04 - Other industries (slider, photo)", f"Frontline Related C pattern: snap slider, arrow buttons, sector rule; card image = the industry hero photo in the Paraform style (frame + counted stat, illustrative). {AUDIT}", PARA_CSS + CSS + OTHERS_SLIDER + JS + OTH_JS)
page("02-challenge.html", "HSC 02 - The challenge", f"Audit C1-C4, G4, G5, G7. Benchmark: dark statement band, rail. Maps to: industries/IndustryChallengeStack.tsx. {AUDIT}", CSS + CHALLENGE + JS)
page("03-how-a.html", "HSC 03 - How Sognos helps A (tabs, recommended)", f"Audit T1-T6, G2, G3. Vertical tab rail (keyboard, pause on hover/focus, rotate in view only) + one gallery graphic per item. Maps to: industries/IndustryHowTabs.tsx. {AUDIT}", CSS + HOW_A + JS + HOW_JS)
page("03-how-b.html", "HSC 03 - How Sognos helps B (cards)", f"Audit T1-T6. Three numbered cards, graphic each, no tabs. Maps to: industries/IndustryHowTabs.tsx (replaced). {AUDIT}", CSS + HOW_B + JS)
page("04-other-industries.html", "HSC 04 - Other industries", f"Audit O1-O3, G1 (P0 /dev/ art replaced with Home Industries gallery graphics), G5. Maps to: page-local wrapper around IndustrySection / FeatureRail (shared - homepage untouched). {AUDIT}", CSS + OTHERS + JS)
page("06-platform-a.html", "HSC 06 - Platform A (Works-with cards, recommended)", f"Audit P1-P5, G6. Works-with product cards on navy, live bylines + descriptions always visible, product graphics. Maps to: industries/IndustryPlatformSection.tsx. {AUDIT}", CSS + PLATFORM_A + JS)
page("06-platform-b.html", "HSC 06 - Platform B (current cards, fixed)", f"Audit P1-P5. Current card anatomy, description permanent, max-w-7xl, rule gap. Maps to: industries/IndustryPlatformSection.tsx. {AUDIT}", CSS + PLATFORM_B + JS)

SW = """<div class="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 flex-wrap items-center justify-center gap-1 rounded-full border border-white/15 bg-care-dark/90 p-1 text-xs text-white backdrop-blur">""" + "".join(
    f'<button type="button" data-hsc="{k}:{v}" aria-pressed="{str(v == "a").lower()}" class="rounded-full px-3 py-2 transition-colors hover:bg-white/10 aria-pressed:bg-white aria-pressed:text-care-dark">{n}</button>'
    for k, v, n in [("hero", "a", "Hero A"), ("hero", "b", "Hero B"), ("hero", "p1", "Hero P1"), ("hero", "p2", "Hero P2"), ("hero", "p3", "Hero P3"), ("oth", "a", "Industries · graphic"), ("oth", "b", "Industries · photo"), ("oth", "c", "Industries · cards"), ("oth", "d", "Industries · slider"), ("how", "a", "How A · tabs"), ("how", "b", "How B · cards"), ("plat", "a", "Platform A"), ("plat", "b", "Platform B")]
) + """</div>
<script>
  (() => {
    const pick = (k, v) => {
      document.querySelectorAll(`[data-hsc-v^="${k}:"]`).forEach((el) => (el.hidden = el.dataset.hscV !== `${k}:${v}`));
      document.querySelectorAll(`[data-hsc^="${k}:"]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.hsc === `${k}:${v}`)));
      try { localStorage.setItem("sognos-hsc-" + k, v); } catch {}
    };
    document.querySelectorAll("[data-hsc]").forEach((b) => b.addEventListener("click", () => pick(...b.dataset.hsc.split(":"))));
    ["hero", "oth", "how", "plat"].forEach((k) => { let v = null; try { v = localStorage.getItem("sognos-hsc-" + k); } catch {} if (v) pick(k, v); });
  })();
</script>"""


def var(k, v, html):
    return f'<div data-hsc-v="{k}:{v}"{"" if v == "a" else " hidden"}>{html if v == "a" else html.replace(" id=" + chr(34), " data-id=" + chr(34), 1)}</div>'


INDEX = (PARA_CSS + SHELL + var("hero", "a", hero("a")) + var("hero", "b", hero("b")) + var("hero", "p1", HERO_P1) + var("hero", "p2", HERO_P2) + var("hero", "p3", HERO_P3)
         + CHALLENGE + var("how", "a", HOW_A) + var("how", "b", HOW_B)
         + var("oth", "a", OTHERS) + var("oth", "b", OTHERS_PHOTO) + var("oth", "c", OTHERS_CARDS) + var("oth", "d", OTHERS_SLIDER) + STORIES + var("plat", "a", PLATFORM_A) + var("plat", "b", PLATFORM_B) + JS + HOW_JS + OTH_JS + SW)
if __name__ == "__main__":  # legacy switcher index; *_insp.py writes the Inspector index
    page("index.html", "Industries / Health & Social Care - polish pass mockups",
         f"""All sections in page order. Surfaces (Q2-A): white hero > navy challenge > tint how > white other industries > white stories (shared, unchanged) > navy platform.
    Switcher (bottom centre, review-only): Hero A/B/P1/P2/P3 (Q1; P = Paraform direction), Other industries graphic/photo, How A/B (Q3), Platform A/B (Q4). Breadcrumb links Industries -> /industries (Q5).
    Copy is live; "All industries" link label is a suggestion (S6). Graphic data is illustrative. Audit: {AUDIT}.""", INDEX)
print("\n".join(sorted(p.name for p in OUT.glob("*.html"))))
