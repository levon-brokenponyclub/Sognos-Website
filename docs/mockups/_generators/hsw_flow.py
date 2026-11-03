"""How Sognos Works · options D-G (2026-11-03), used by build_home_insp.py. No photos or images.

  D · Statement grid    customer.io "Support every stage" shared-border panels + a statement that fills on scroll
  E · Flow track        Paraform's moving UI chips: a request card travels Manage demand -> Coordinate workforce
                        -> Track outcomes along a line on navy (the animated option; illustrative data)
  F · Steps + proof     Paraform "A hiring partner" step list + customer.io Agent accordion, pinned dot-grid proof panel
  G · Platform hub      customer.io /platform/data-integrations "Our difference": a shared-border grid around a drawn hub;
                        demand arrows in, workforce arrows out up/down, outcomes out right; plays once, stops on step 3.
                        G1 = tint section, white cells; G2 = white section, tint centre panel. Left column = in
                        (01 + Book a Demo), right column = out (02 workforce, 03 outcomes beside the outcomes arrow).

build(ctx) -> dict(HSW_D, HSW_E, HSW_F, HSW_G1, HSW_G2, CSS, JS).
Step copy is the live HowSognosWorks copy. Step colours: Care base, Roster base, neutral heading navy (step 3 has
no product). Proof figures in F come from published customer stories and are placeholders to confirm.
"""

STEPS = [
    dict(n="01", title="Manage demand", label="Intake and triage", c="#3b6fe0",
         copy="Built for care teams delivering complex services across communities, homes and frontline environments."),
    dict(n="02", title="Coordinate workforce", label="Planning and delivery", c="#1d96fc",
         copy="Designed around the realities of mobile workforces, scheduling, compliance and service delivery in the field."),
    dict(n="03", title="Track outcomes", label="Insight and improvement", c="#0f1936",
         copy="Practical AI embedded where it matters most, helping teams reduce admin, improve decisions and focus on people."),
]
H = "Healthcare First. Field Services Always. AI at the Centre."
INTRO = "One connected process takes service demand from first contact to coordinated delivery and measurable outcomes."
BUILT_ON = "Built on Microsoft Dynamics 365 &middot; Power Platform &middot; Copilot"


def build(c):
    T, FOCUS, eyebrow, SEC, W = c["T"], c["FOCUS"], c["eyebrow"], c["SEC"], c["W"]
    out = {}
    head = lambda dark=False, center=False: (
        f'<div class="flex max-w-3xl flex-col gap-4{" mx-auto items-center text-center" if center else ""}">'
        + (eyebrow("How Sognos works", dark).replace("flex items-center", "inline-flex items-center") if center else eyebrow("How Sognos works", dark))
        + f'<h2 class="{T["h2"]} {"text-white" if dark else "text-heading"} text-balance">{H}</h2></div>')
    chip = lambda s, dark=False: (f'<span class="flex items-center gap-2.5 text-sm {"text-white/75" if dark else "text-muted"}">'
                                  f'<span class="flex h-6 min-w-6 items-center justify-center rounded px-1 text-xs font-medium tabular-nums text-white" style="background:{s["c"] if not dark or s["n"] != "03" else "rgb(255 255 255 / .18)"}">{s["n"]}</span>{s["label"]}</span>')

    # ── D · Statement grid ──
    words = " ".join(f'<span class="sg-w">{w}</span>' for w in INTRO.split())
    out["HSW_D"] = (
        f'<section class="bg-tint {SEC}"><div class="{W}">{head()}'
        f'<p data-sg class="mt-10 max-w-5xl font-heading text-3xl font-normal leading-[1.2] tracking-[-0.015em] text-balance md:mt-14 md:text-[2.75rem]">{words}</p>'
        f'<div class="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded border border-line bg-line md:mt-20 md:grid-cols-3">'
        + "".join(f'<article class="flex min-h-[18rem] flex-col justify-between gap-12 bg-white p-7 lg:min-h-[22rem] lg:p-10">'
                  f'<div class="flex items-start justify-between gap-6"><span class="text-sm text-muted">{s["label"]}</span>'
                  f'<span class="font-heading text-6xl leading-none tracking-[-0.03em] tabular-nums" style="color:{s["c"]}">{s["n"]}</span></div>'
                  f'<div><h3 class="{T["h3sm"]} text-heading">{s["title"]}</h3><p class="mt-3 max-w-[34ch] {T["small"]} text-body">{s["copy"]}</p></div></article>' for s in STEPS)
        + f'</div><p class="mt-6 text-sm text-muted">{BUILT_ON}</p></div></section>')

    # ── E · Flow track (animated) ──
    cards = [("Referral received", "Margaret T. &middot; Personal care &middot; NDIS"),
             ("Shift assigned", "Jess K. &middot; Tue 9:00 &middot; Penrith"),
             ("Outcome logged", "Care plan on track &middot; 3 visits this week")]
    station = lambda k, s: (f'<span class="hwf-st hwf-st{k + 1} absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">'
                            f'<span class="hwf-dot relative block size-4 rounded-full border-2 border-white/40 bg-[var(--navy)]" style="--c:{s["c"] if k < 2 else "#ffffff"}"></span>'
                            f'<span class="hwf-lab whitespace-nowrap text-xs text-white/50">{s["n"]} &middot; {s["title"]}</span></span>')
    out["HSW_E"] = (
        f'<section class="bg-[var(--p-deep)] {SEC} text-white"><div class="{W}">{head(True, True)}'
        f'<p class="mx-auto mt-5 max-w-2xl text-center {T["lede"]} text-white/75">{INTRO}</p>'
        f'<div data-flow data-times="300:1,2300:2,4300:3" class="hwf relative mt-12 h-[30rem] overflow-hidden rounded border border-white/10 bg-white/[.03] md:mt-16 md:h-[22rem]" aria-hidden="true">'
        f'<span class="absolute top-4 right-4 text-[11px] text-white/40">Illustrative</span>'
        f'<svg class="hwf-line absolute inset-0 hidden size-full md:block" viewBox="0 0 1000 300" preserveAspectRatio="none" fill="none">'
        f'<path d="M160 165 C 280 75, 380 255, 500 165 S 720 75, 840 165" stroke="rgb(255 255 255 / .12)" stroke-width="2" vector-effect="non-scaling-stroke"/>'
        f'<path class="hwf-draw" d="M160 165 C 280 75, 380 255, 500 165 S 720 75, 840 165" stroke="#59bbf7" stroke-width="2" pathLength="1"/></svg>'
        f'<svg class="hwf-line absolute inset-0 size-full md:hidden" viewBox="0 0 100 300" preserveAspectRatio="none" fill="none">'
        f'<path d="M14 50 V250" stroke="rgb(255 255 255 / .12)" stroke-width="2" vector-effect="non-scaling-stroke"/>'
        f'<path class="hwf-draw" d="M14 50 V250" stroke="#59bbf7" stroke-width="2" pathLength="1"/></svg>'
        + "".join(station(k, s) for k, s in enumerate(STEPS))
        + '<div class="hwf-card absolute w-[15rem] -translate-x-1/2 -translate-y-full rounded border border-white/15 bg-white/[.08] p-4 backdrop-blur-md">'
        + '<span class="relative block h-12">' + "".join(f'<span class="hwf-c hwf-c{k + 1} absolute inset-0"><span class="block text-sm text-white">{a}</span><span class="mt-1 block text-xs text-white/60">{b}</span></span>' for k, (a, b) in enumerate(cards)) + '</span>'
        + '<span class="mt-3 flex gap-1">' + "".join(f'<span class="hwf-pip h-0.5 flex-1 rounded-full bg-white/15" style="--c:{s["c"] if k < 2 else "#ffffff"}"></span>' for k, s in enumerate(STEPS)) + '</span></div>'
        + '</div>'
        + '<div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4">'
        + "".join(f'<div class="hwf-txt hwf-txt{k + 1} md:px-6 md:text-center"><h3 class="{T["h3sm"]} text-white">{s["title"]}</h3><p class="mt-2 max-w-[34ch] md:mx-auto {T["small"]} text-white/70">{s["copy"]}</p></div>' for k, s in enumerate(STEPS))
        + f'</div><p class="mt-10 text-center text-sm text-white/50">{BUILT_ON}</p></div></section>')

    # ── F · Steps + proof ──
    PROOF = [dict(big="1,100+", label="users on a single platform", src="Flourish Australia &middot; customer story", prod="Delivered with SognosCare"),
             dict(big="100%", label="user adoption at go-live", src="Auckland Airport &middot; customer story", prod="Delivered with SognosRoster"),
             dict(big="Customer Insights", label="Live dashboards across care records, rostering and field operations", src="Solution", prod="Explore Customer Insights")]
    proof = lambda p, s, inline=False: (
        f'<div class="flex flex-col {"gap-2" if inline else "gap-4"}"><p class="font-heading {"text-4xl" if inline else ("text-5xl md:text-7xl" if len(p["big"]) < 8 else "text-4xl md:text-5xl")} leading-none tracking-[-0.03em]" style="color:{s["c"]}">{p["big"]}</p>'
        f'<p class="max-w-[30ch] text-base text-heading">{p["label"]}</p>'
        f'<p class="{"mt-1" if inline else "mt-6 border-t border-line pt-5"} flex flex-wrap items-center justify-between gap-3 text-sm text-muted"><span>{p["src"]}</span><a href="#" class="inline-flex items-center gap-1.5 font-medium text-heading {FOCUS}">{p["prod"]} &rarr;</a></p></div>')
    out["HSW_F"] = (
        f'<section class="bg-white {SEC}"><div class="{W}" data-sp>'
        f'<div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"><div class="lg:col-span-5">{head()}'
        f'<p class="mt-5 {T["lede"]} text-body">{INTRO}</p>'
        f'<ol class="mt-10 border-l-2 border-line">'
        + "".join(f'<li class="sp-step relative -ml-0.5 border-l-2 border-transparent pl-6{" is-on" if k == 0 else ""}" style="--c:{s["c"]}"><span aria-hidden="true" class="sp-bar absolute top-0 -left-0.5 w-0.5"></span>'
                  f'<button type="button" data-sp-tab="{k}" aria-expanded="{str(k == 0).lower()}" class="flex w-full items-baseline gap-4 py-5 text-left {FOCUS}"><span class="text-sm tabular-nums text-muted">{s["n"]}</span><span class="sp-title font-heading text-2xl text-heading md:text-[1.75rem]">{s["title"]}</span></button>'
                  f'<div class="sp-body grid"><div class="overflow-hidden"><p class="max-w-[42ch] pb-6 pl-9 {T["small"]} text-body">{s["copy"]}</p>'
                  f'<div class="mb-6 ml-9 rounded border border-line p-5 lg:hidden">{proof(PROOF[k], s, True)}</div></div></div></li>' for k, s in enumerate(STEPS))
        + '</ol></div>'
        '<div class="hidden lg:sticky lg:top-32 lg:col-span-7 lg:block lg:self-start"><div class="sp-panel relative grid min-h-[30rem] overflow-hidden rounded border border-line bg-tint p-10 lg:p-14">'
        + "".join(f'<div data-sp-panel="{k}" class="sp-p flex flex-col justify-end [grid-area:1/1]{" is-on" if k == 0 else ""}">{proof(PROOF[k], s)}</div>' for k, s in enumerate(STEPS))
        + f'</div><p class="mt-4 text-sm text-muted">{BUILT_ON}</p></div></div></div></section>')

    # ── G · Platform hub ──
    def hub():
        arrow = lambda k, d, head: (f'<g class="hwg-ar hwg-ar{k}"><path class="hwg-line" d="{d}" pathLength="1"/><path class="hwg-head" d="{head}"/></g>')
        dots = [(118, 118, "#3b6fe0", 1), (260, 118, "#1d96fc", 2), (118, 260, "#91278c", 1), (260, 260, "#0f1936", 3)]
        return ('<svg viewBox="0 0 400 400" class="hwg-svg size-full max-h-[26rem]" fill="none" aria-hidden="true">'
                '<defs><pattern id="hwgdots" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.1" fill="#ffffff" fill-opacity=".28"/></pattern></defs>'
                + arrow(1, "M40 200 H138", "M128 191 L138 200 L128 209")
                + arrow(2, "M200 140 V44", "M191 54 L200 44 L209 54") + arrow(2, "M200 260 V356", "M191 346 L200 356 L209 346")
                + arrow(3, "M262 200 H360", "M350 191 L360 200 L350 209")
                + "".join(f'<rect class="hwg-dot" data-at="{at}" x="{x}" y="{y}" width="22" height="22" rx="2" style="--c:{col}"/>' for x, y, col, at in dots)
                + '<rect x="155" y="155" width="90" height="90" rx="4" fill="#0f1936"/><rect x="155" y="155" width="90" height="90" rx="4" fill="url(#hwgdots)"/>'
                '<text x="200" y="205" text-anchor="middle" font-size="13" fill="#ffffff" font-family="inherit">Sognos</text></svg>')
    cell = lambda k, s, pos: (f'<article data-hwg-cell="{k + 1}" tabindex="0" class="hwg-cell relative flex flex-col gap-5 bg-white p-7 lg:p-9 {pos} {FOCUS}" style="--c:{s["c"]}">'
                              f'<span aria-hidden="true" class="hwg-bar absolute inset-x-0 top-0 h-0.5"></span>{chip(s)}'
                              f'<div class="mt-auto"><h3 class="{T["h3sm"]} text-heading">{s["title"]}</h3><p class="mt-2 max-w-[36ch] {T["small"]} text-body">{s["copy"]}</p></div></article>')

    def hub_section(variant):
        sec_bg, hub_bg = ("bg-tint", "bg-white") if variant == 1 else ("bg-white", "bg-tint")
        return (f'<section class="{sec_bg} {SEC}"><div class="{W}">{head()}<p class="mt-5 max-w-2xl {T["lede"]} text-body">{INTRO}</p>'
                f'<div data-flow data-once data-times="400:1,2800:2,5200:3" class="hwg mt-12 grid grid-cols-1 gap-px overflow-hidden rounded border border-line bg-line md:mt-16 md:grid-cols-2 lg:grid-cols-[1fr_1.3fr_1fr] lg:grid-rows-2">'
                f'<div class="flex flex-col items-center justify-center gap-4 {hub_bg} p-8 md:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1">{hub()}'
                f'<p class="text-xs text-muted">Sognos on Microsoft Dynamics 365</p></div>'
                + cell(0, STEPS[0], "lg:col-start-1 lg:row-start-1") + cell(1, STEPS[1], "lg:col-start-3 lg:row-start-1") + cell(2, STEPS[2], "lg:col-start-3 lg:row-start-2")
                + f'<div class="flex flex-col justify-between gap-6 bg-heading p-7 text-white lg:col-start-1 lg:row-start-2 lg:p-9"><p class="font-heading text-2xl leading-snug text-balance">See it on your own service model</p>'
                f'<div><p class="{T["small"]} text-white/70">A 30-minute walkthrough with a Sognos specialist.</p>'
                f'<a href="#" class="mt-5 inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-medium text-heading transition-[background-color,scale] duration-150 ease-out hover:bg-[var(--p-accent)] active:scale-[0.97] {FOCUS}">Book a Demo</a></div></div>'
                '</div></div></section>')
    out["HSW_G1"], out["HSW_G2"] = hub_section(1), hub_section(2)

    out["CSS"] = """<style>
  /* D · statement words fill from muted to heading as the paragraph crosses the viewport (JS sets .on). */
  .sg-w { color: rgb(15 25 54 / .2); transition: color .25s ease; } .sg-w.on { color: var(--color-heading, #0f1936); }
  /* E · flow track: stages on [data-st]; the card glides station to station, the line draws behind it. */
  .hwf-st1 { left: 16%; top: 55%; } .hwf-st2 { left: 50%; top: 55%; } .hwf-st3 { left: 84%; top: 55%; }
  .hwf-card { left: 16%; top: calc(55% - 1.75rem); opacity: 0; transition: left .9s cubic-bezier(.77,0,.175,1), top .9s cubic-bezier(.77,0,.175,1), opacity .4s ease; }
  .hwf:not([data-st="0"]) .hwf-card { opacity: 1; } .hwf[data-st="2"] .hwf-card { left: 50%; } .hwf[data-st="3"] .hwf-card { left: 84%; }
  .hwf-draw { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 1.2s cubic-bezier(.77,0,.175,1); }
  .hwf[data-st="2"] .hwf-draw { stroke-dashoffset: .5; } .hwf[data-st="3"] .hwf-draw { stroke-dashoffset: 0; }
  .hwf-dot { transition: background-color .3s ease, border-color .3s ease, transform .3s cubic-bezier(.23,1,.32,1); }
  .hwf[data-st="1"] .hwf-st1 .hwf-dot, .hwf[data-st="2"] :is(.hwf-st1, .hwf-st2) .hwf-dot, .hwf[data-st="3"] .hwf-dot { background: var(--c); border-color: var(--c); transform: scale(1.15); }
  .hwf-lab { transition: color .3s ease; } .hwf[data-st="1"] .hwf-st1 .hwf-lab, .hwf[data-st="2"] .hwf-st2 .hwf-lab, .hwf[data-st="3"] .hwf-st3 .hwf-lab { color: #fff; }
  .hwf-c { opacity: 0; transform: translateY(4px); transition: opacity .3s ease .25s, transform .3s cubic-bezier(.23,1,.32,1) .25s; }
  .hwf[data-st="1"] .hwf-c1, .hwf[data-st="2"] .hwf-c2, .hwf[data-st="3"] .hwf-c3 { opacity: 1; transform: none; }
  .hwf[data-st="1"] .hwf-pip:nth-child(1), .hwf[data-st="2"] .hwf-pip:nth-child(-n+2), .hwf[data-st="3"] .hwf-pip { background: var(--c); }
  .hwf-txt { opacity: .45; transition: opacity .4s ease; }
  section:has(.hwf[data-st="1"]) .hwf-txt1, section:has(.hwf[data-st="2"]) .hwf-txt2, section:has(.hwf[data-st="3"]) .hwf-txt3 { opacity: 1; }
  @media (max-width: 767px) {
    .hwf-st1, .hwf-st2, .hwf-st3 { left: 14%; } .hwf-st1 { top: 16.7%; } .hwf-st2 { top: 50%; } .hwf-st3 { top: 83.3%; }
    .hwf-st { flex-direction: row; transform: translate(-.5rem, -50%); } .hwf-lab { display: none; }
    .hwf-card { left: 58%; top: calc(16.7% + 2.4rem); width: 13rem; transition: top .9s cubic-bezier(.77,0,.175,1), opacity .4s ease; }
    .hwf[data-st="2"] .hwf-card { left: 58%; top: calc(50% + 2.4rem); } .hwf[data-st="3"] .hwf-card { left: 58%; top: calc(83.3% + 2.4rem); }
    .hwf-txt { opacity: 1; }
  }
  /* F · steps + proof */
  .sp-bar { height: 0; background: var(--c); transition: height .5s cubic-bezier(.23,1,.32,1); } .sp-step.is-on .sp-bar { height: 100%; }
  .sp-title { transition: color .2s ease; } .sp-step:not(.is-on) .sp-title { color: rgb(15 25 54 / .45); }
  .sp-body { grid-template-rows: 0fr; transition: grid-template-rows .4s cubic-bezier(.23,1,.32,1); } .sp-step.is-on .sp-body { grid-template-rows: 1fr; }
  .sp-panel { background-image: radial-gradient(rgb(15 25 54 / .1) 1px, transparent 1px); background-size: 14px 14px; }
  .sp-p { opacity: 0; visibility: hidden; transform: translateY(8px); transition: opacity .35s ease, transform .35s cubic-bezier(.23,1,.32,1), visibility 0s linear .35s; }
  .sp-p.is-on { opacity: 1; visibility: visible; transform: none; transition: opacity .35s ease, transform .35s cubic-bezier(.23,1,.32,1); }
  @media (max-width: 1023px) { .sp-step .sp-body { grid-template-rows: 1fr; } .sp-step .sp-title { color: inherit; } .sp-step .sp-bar { height: 100%; } }
  /* G · platform hub: arrows draw per step, product dots light, the active cell's bar fills over its dwell. */
  .hwg-line { stroke: #0f1936; stroke-width: 1.6; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset .7s cubic-bezier(.77,0,.175,1); }
  .hwg-head { stroke: #0f1936; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; opacity: 0; transition: opacity .2s ease .6s; }
  .hwg-dot { fill: #e4e9f5; transition: fill .4s ease; }
  .hwg[data-st="1"] .hwg-ar1 .hwg-line, .hwg[data-st="2"] :is(.hwg-ar1, .hwg-ar2) .hwg-line, .hwg[data-st="3"] .hwg-line { stroke-dashoffset: 0; }
  .hwg[data-st="1"] .hwg-ar1 .hwg-head, .hwg[data-st="2"] :is(.hwg-ar1, .hwg-ar2) .hwg-head, .hwg[data-st="3"] .hwg-head { opacity: 1; }
  .hwg[data-st="1"] .hwg-dot[data-at="1"], .hwg[data-st="2"] .hwg-dot:is([data-at="1"], [data-at="2"]), .hwg[data-st="3"] .hwg-dot { fill: var(--c); }
  .hwg-bar { background: var(--c); transform: scaleX(0); transform-origin: left; opacity: .35; }
  .hwg[data-st="1"] [data-hwg-cell="1"] .hwg-bar, .hwg[data-st="2"] [data-hwg-cell="2"] .hwg-bar, .hwg[data-st="3"] [data-hwg-cell="3"] .hwg-bar { opacity: 1; transform: none; transition: transform 2.4s linear; }
  .hwg[data-st="2"] [data-hwg-cell="1"] .hwg-bar, .hwg[data-st="3"] :is([data-hwg-cell="1"], [data-hwg-cell="2"]) .hwg-bar { transform: none; }
  .hwg-cell { transition: background-color .3s ease; } .hwg-cell:hover { background-color: #fbfcff; }
  @media (prefers-reduced-motion: reduce) { .hwf *, .sp-step *, .sp-p, .hwg *, .sg-w { transition: none !important; } }
</style>"""

    out["JS"] = """<script>
  // HSW D: statement words light up as the paragraph crosses from 85% to 35% of the viewport.
  document.querySelectorAll("[data-sg]").forEach((p) => {
    const ws = [...p.querySelectorAll(".sg-w")];
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = () => { const r = p.getBoundingClientRect(), vh = innerHeight;
      const t = still ? 1 : Math.min(1, Math.max(0, (vh * .85 - r.top) / (vh * .5)));
      const n = Math.round(t * ws.length); ws.forEach((w, i) => w.classList.toggle("on", i < n)); };
    addEventListener("scroll", run, { passive: true }); addEventListener("resize", run); run();
  });
  // HSW E + G: timed stages (data-times "ms:stage,...") once 35% in view. data-once plays a single
  // time and stops on the last stage (G); otherwise it resets off screen and replays (E). Reduced
  // motion jumps to the last stage. G cells jump to their step on hover / focus and stop the timeline.
  document.querySelectorAll("[data-flow]").forEach((el) => {
    const times = el.dataset.times.split(",").map((p) => p.split(":").map(Number));
    const last = times[times.length - 1][1], once = "once" in el.dataset;
    let timers = [], played = false;
    const stop = () => { timers.forEach(clearTimeout); timers = []; };
    el.dataset.st = "0";
    const play = () => { if (matchMedia("(prefers-reduced-motion: reduce)").matches) return (el.dataset.st = last);
      stop(); el.dataset.st = "0"; times.forEach(([ms, s]) => timers.push(setTimeout(() => (el.dataset.st = s), ms))); };
    new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && e.intersectionRatio >= .35) { if (!(once && played)) { played = true; play(); } }
      else if (!e.isIntersecting && !once) { stop(); el.dataset.st = "0"; }
    }), { threshold: [0, .35] }).observe(el);
    el.querySelectorAll("[data-hwg-cell]").forEach((c) => {
      const go = () => { stop(); played = true; el.dataset.st = c.dataset.hwgCell; };
      c.addEventListener("mouseenter", go); c.addEventListener("focus", go);
    });
  });
  // HSW F: step accordion with the proof panel; autoplays every 6s until a step is picked.
  document.querySelectorAll("[data-sp]").forEach((root) => {
    const steps = [...root.querySelectorAll(".sp-step")], panels = [...root.querySelectorAll("[data-sp-panel]")];
    let at = 0, auto = !matchMedia("(prefers-reduced-motion: reduce)").matches, t;
    const go = (i) => { at = i;
      steps.forEach((s, k) => { s.classList.toggle("is-on", k === i); s.querySelector("button").setAttribute("aria-expanded", String(k === i)); });
      panels.forEach((p, k) => p.classList.toggle("is-on", k === i)); };
    const tick = () => { clearTimeout(t); if (auto) t = setTimeout(() => { go((at + 1) % steps.length); tick(); }, 6000); };
    root.querySelectorAll("[data-sp-tab]").forEach((b) => b.addEventListener("click", () => { auto = false; clearTimeout(t); go(+b.dataset.spTab); }));
    new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? tick() : clearTimeout(t))), { threshold: .3 }).observe(root);
  });
</script>"""
    return out
