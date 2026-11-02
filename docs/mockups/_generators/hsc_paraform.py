
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
              <img src="{P}/logos/{STORY[0]}" alt="{STORY[1]}" class="h-8 w-auto brightness-0 invert" />
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
