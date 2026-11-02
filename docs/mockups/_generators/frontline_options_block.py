
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
    ("Frontline", "Sognos solution", "bg-accent text-white", None),
    ("Power Platform", "Workflow automation and reporting", "bg-white text-heading", "platform/PowerAutomate_scalable.svg"),
    ("Copilot AI", "Intelligent scheduling", "bg-white text-heading", "copilot-logo.svg"),
    ("Dynamics 365 Field Service", "Microsoft Dynamics 365", "bg-care-dark text-white", "Dynamics365.svg"),
]
PLAT_A = f"""<section id="platform" class="bg-white {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Platform")}</div>
      <div class="{CONTENT} grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div class="flex flex-col gap-8"><div class="{HEAD}">{_PLAT_HEAD}</div><div class="border-t border-line pt-8">{_LOGO_ROW}</div></div>
        <div class="fv flex flex-col gap-2 rounded-lg bg-tint p-6 sm:p-8">
          {"".join(f'''<div class="flx-slab flex items-center gap-4 rounded-lg border border-line p-4 {c}" style="transition-delay:{(3 - k) * .18 + .1:.2f}s;margin-inline:{k * 4}%">
            {f'<img src="{P}/logos/{logo}" alt="" class="h-6 w-auto {"brightness-0 invert" if "care-dark" in c else ""}" />' if logo else f'<img src="{P}/logos/icon-sognos-care.svg" alt="" class="size-6 brightness-0 invert" />'}
            <div class="min-w-0"><p class="text-sm font-medium">{n}</p><p class="text-xs opacity-70">{d}</p></div>
          </div>''' for k, (n, d, c, logo) in enumerate(_SLABS))}
        </div>
      </div>
    </div>
  </div>
</section>"""

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

# ── 06 Works with (SognosRoster only) ───────────────────────────────────────
_WHEAD = f"""<h2 class="{T["h2"]} text-heading">Connects to the Sognos platform</h2>"""
_RLINK = '<a href="#" class="inline-flex min-h-11 items-center gap-1.5 text-base font-medium text-heading transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">Explore SognosRoster <span aria-hidden="true">&rarr;</span></a>'

WORKS_A = f"""<section id="works-with" class="bg-white {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Works with")}</div>
      <div class="{CONTENT}">
        <div class="{HEAD}">{_WHEAD}</div>
        <div class="{GAP} grid grid-cols-1 items-stretch gap-3 rounded-lg bg-tint p-3 md:grid-cols-2 lg:gap-4">
          <div class="flex flex-col justify-between gap-10 p-5 lg:p-8">
            <img src="{P}/logos/sognos-roster-logo-color.svg" alt="{ROSTER[0]}" class="h-8 w-auto self-start" />
            <div><p class="{T["h3"]} text-heading">{ROSTER[1]}</p><div class="mt-6">{_RLINK}</div></div>
          </div>
          {R_SCHED}
        </div>
      </div>
    </div>
  </div>
</section>"""

WORKS_B = f"""<section id="works-with" class="bg-white {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Works with")}</div>
      <div class="{CONTENT}">
        <div class="{HEAD}">{_WHEAD}<p class="{T["small"]} text-muted">{ROSTER[0]} &middot; {ROSTER[1]}</p></div>
        <div data-pair="0" class="{GAP} rounded-lg bg-tint p-5 sm:p-8">
          <div class="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_minmax(8rem,1fr)_1fr]">
            <div class="{_C} p-4 text-left">
              <p class="text-[10px] uppercase tracking-widest text-muted">Frontline</p>
              <p class="mt-1 text-sm font-medium text-heading">Job #4821 &middot; HVAC service</p>
              <p class="text-xs text-muted">Level 3, North Sydney &middot; needs HVAC ticket</p>
            </div>
            <div class="relative mx-auto h-3 w-full max-w-xs">
              <span class="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-accent/40"></span>
              <span class="pair-dot absolute top-0 size-3 rounded-full bg-care-dark"></span>
              <p class="absolute inset-x-0 top-5 text-center text-xs text-muted"><span data-ps="0">Job created</span><span data-ps="1">Sent to SognosRoster</span><span data-ps="2">Matching skills + distance&hellip;</span><span data-ps="3">Worker assigned &#10003;</span></p>
            </div>
            <div class="pair-worker {_C} flex items-center gap-3 p-4 text-left transition-colors">
              {_avatar("PS", "size-10")}
              <div class="min-w-0 flex-1"><p class="text-[10px] uppercase tracking-widest text-muted">SognosRoster</p><p class="mt-1 text-sm font-medium text-heading">P. Shah &middot; 4.2 km</p><p class="text-xs text-muted">HVAC ticket &middot; available 11:00</p></div>
              <span class="pair-tick flex size-6 items-center justify-center rounded-full bg-emerald-600 text-[11px] text-white opacity-0 transition-opacity">&#10003;</span>
            </div>
          </div>
          <div class="mt-10 flex items-center justify-between gap-4 border-t border-line pt-5"><img src="{P}/logos/sognos-roster-logo-color.svg" alt="{ROSTER[0]}" class="h-6 w-auto" />{_RLINK}</div>
        </div>
      </div>
    </div>
  </div>
</section>"""

WORKS_C = f"""<section id="works-with" class="bg-white {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Works with")}</div>
      <div class="{CONTENT}">
        <div class="{HEAD}">{_WHEAD}</div>
        <a href="#" class="group relative {GAP} block overflow-hidden rounded-lg p-8 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:p-12">
          <span aria-hidden="true" class="m-drift absolute inset-0" style="background-image: linear-gradient(120deg, #03112f, #104b90, #1d96fc, #104b90, #03112f)"></span>
          <span aria-hidden="true" class="absolute inset-y-6 right-6 hidden w-[42%] grid-cols-5 grid-rows-4 gap-1.5 md:grid">{"".join(f'<span class="flx-slot rounded-sm bg-white" style="animation-delay:{(k * 37 % 23) / 10:.1f}s"></span>' for k in range(20))}</span>
          <span class="relative flex max-w-md flex-col gap-6">
            <img src="{P}/logos/sognos-roster-logo.svg" alt="{ROSTER[0]}" class="h-8 w-auto self-start brightness-0 invert" />
            <span class="{T["h3"]} text-white">{ROSTER[1]}</span>
            <span class="inline-flex min-h-11 items-center gap-1.5 self-start rounded-full bg-white px-6 text-base font-medium text-heading transition-colors group-hover:bg-accent group-hover:text-white">Explore SognosRoster <span aria-hidden="true">&rarr;</span></span>
          </span>
        </a>
      </div>
    </div>
  </div>
</section>"""

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
SECTION_OPTS = {
    "problem": ("The problem", [("a", "Symptom tiles", PROB_A), ("b", "Sticky rail", PROB_B), ("c", "Broken workflow", PROB_C)]),
    "platform": ("Platform", [("a", "Layer stack", PLAT_A), ("b", "Hub", PLAT_B), ("c", "Navy cards", PLAT_C)]),
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
    const pair = document.querySelector("[data-pair]");
    if (pair) { if (reduce) pair.dataset.pair = "3"; else { let p = 0; setInterval(() => { p = (p + 1) % 5; pair.dataset.pair = String(Math.min(p, 3)); }, 1400); } }

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
Platform: A layer stack builds up / B hub, dots run the spokes to 6 platform logos / C care-dark band, 3 cards (route draws, Copilot types, automation runs).
Works with (Roster only): A product card + roster graphic / B pairing - job goes to Roster, matched worker comes back / C Roster gradient band, slots breathe.
Related: A graphic cards / B list rows, graphic slides in on hover / C slider with arrows.
Graphic data is illustrative. Reduced motion: final states, nothing moves."""
