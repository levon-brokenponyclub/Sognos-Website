"""How Sognos Works - 3 motion-graphic options for the TimerCardDeck panel.

Imported by build_home.py: build(P) -> (css, html, js). Live header + deck copy
(HowSognosWorks.tsx BLOCKS); panel data is illustrative demo content.
"""

STEPS = [
    ("Manage demand", "Built for care teams delivering complex services across communities, homes and frontline environments."),
    ("Coordinate workforce", "Designed around the realities of mobile workforces, scheduling, compliance and service delivery in the field."),
    ("Track outcomes", "Practical AI embedded where it matters most, helping teams reduce admin, improve decisions and focus on people."),
]

CSS = """<style>
  /* Scene plumbing: an element animates only while its step is on, so
     re-adding .is-on replays it (JS forces a reflow between). */
  @keyframes hw-rise { from { opacity: 0; transform: translateY(14px); } }
  @keyframes hw-pop { from { opacity: 0; transform: scale(.9); } }
  @keyframes hw-fill { from { transform: scaleX(0); } }
  @keyframes hw-grow { from { transform: scaleY(0); } }
  @keyframes hw-draw { from { stroke-dashoffset: var(--len, 400); } }
  @keyframes hw-dash { to { stroke-dashoffset: -24; } }
  @keyframes hw-pulse { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
  @keyframes hw-slot { from { opacity: 0; transform: translateY(-8px); } }
  @keyframes hw-ken { from { transform: scale(1.08); } to { transform: scale(1); } }
  .is-on .hw-rise { animation: hw-rise .7s cubic-bezier(.22,1,.36,1) backwards; }
  .is-on .hw-pop { animation: hw-pop .5s cubic-bezier(.22,1,.36,1) backwards; }
  .is-on .hw-fill { transform-origin: left; animation: hw-fill 1.4s cubic-bezier(.22,1,.36,1) backwards; }
  .is-on .hw-grow { transform-origin: bottom; animation: hw-grow 1s cubic-bezier(.22,1,.36,1) backwards; }
  .is-on .hw-draw { stroke-dasharray: var(--len, 400); animation: hw-draw 1.6s cubic-bezier(.22,1,.36,1) backwards; }
  .is-on .hw-slot { animation: hw-slot .45s cubic-bezier(.22,1,.36,1) backwards; }
  .hw-flow { stroke-dasharray: 6 6; animation: hw-dash 1s linear infinite; }
  .hw-live { animation: hw-pulse 1.6s ease-in-out infinite; }
  .hw-scene { transition: opacity .6s ease; }
  .hw-scene:not(.is-on) { opacity: 0; pointer-events: none; }
  .is-on .hw-ken { animation: hw-ken 8s ease-out both; }
  /* Option visibility */
  [data-hsw="1"] [data-hwo]:not([data-hwo="1"]), [data-hsw="2"] [data-hwo]:not([data-hwo="2"]), [data-hsw="3"] [data-hwo]:not([data-hwo="3"]) { display: none; }
  /* Option 1 zones: active zone lit, the rest dimmed; mobile shows the active zone only */
  .hw-zone { transition: opacity .6s ease, border-color .6s ease, background-color .6s ease; opacity: .38; }
  .hw-zone.is-on { opacity: 1; border-color: rgb(255 255 255 / .28); background-color: rgb(255 255 255 / .07); }
  @media (max-width: 767px) { .hw-zone:not(.is-on) { display: none; } }
  /* Deck */
  .hw-deck { transition: grid-template-columns .6s ease-in-out; }
  .hw-card .hw-body { transition: opacity .4s ease, transform .6s ease; }
  .hw-card:not(.is-on) .hw-body { opacity: 0; transform: translateY(12px); }
  /* Mobile: one column deck, inactive steps collapse to their title; inbox trims to fit the 4:3 panel */
  @media (max-width: 767px) {
    .hw-deck { grid-template-columns: 1fr !important; }
    .hw-card:not(.is-on) { min-height: 0; }
    .hw-card:not(.is-on) .hw-body { display: none; }
    .hw-inbox li:nth-child(n+4) { display: none; }
  }
  @media (max-width: 639px) { .hw-inbox li:nth-child(n+3) { display: none; } }
  @media (prefers-reduced-motion: reduce) {
    .is-on .hw-rise, .is-on .hw-pop, .is-on .hw-fill, .is-on .hw-grow, .is-on .hw-draw, .is-on .hw-slot, .hw-flow, .hw-live, .is-on .hw-ken { animation: none; }
    .hw-scene, .hw-zone, .hw-deck, .hw-card .hw-body { transition: none; }
  }
</style>"""

FROST = "rounded border border-white/60 bg-white/75 backdrop-blur-md"
CARD = "rounded border border-line bg-white"
D = lambda s: f'style="animation-delay:{s}s"'


def cu(to, suffix="", dec=0):
    return f'<span data-cu="{to}" data-dec="{dec}" data-suf="{suffix}">0{suffix}</span>'


def avatar(t, bg="#152248", size="size-8"):
    return f'<span class="flex {size} shrink-0 items-center justify-center rounded-full text-[11px] font-medium text-white" style="background:{bg}">{t}</span>'


# ── Option 1 · Pipeline: one navy scene, three zones joined by a live flow ──
Z_HEAD = lambda n, t, c: f'<p class="flex items-center gap-2 text-xs uppercase tracking-widest text-white/75"><span class="size-1.5 rounded-full" style="background:{c}"></span>{n} &middot; {t}</p>'
OPT1 = f"""<div data-hwo="1" class="absolute inset-0 overflow-hidden" style="background: radial-gradient(60% 80% at 15% 20%, rgba(59,111,224,.35), transparent 70%), radial-gradient(50% 70% at 90% 90%, rgba(29,150,252,.25), transparent 70%), #152248">
  <svg aria-hidden="true" class="absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1000 360" preserveAspectRatio="none"><path class="hw-flow" d="M120 180 C 260 180, 300 120, 500 180 S 760 240, 880 180" stroke="rgba(255,255,255,.35)" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"/></svg>
  <div class="relative grid h-full grid-cols-1 gap-3 p-4 md:grid-cols-3 md:gap-4 md:p-8 lg:p-10">
    <div data-z="0" class="hw-zone flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[.03] p-4 lg:p-5">
      {Z_HEAD("01", "Intake", "#1d96fc")}
      {"".join(f'<div class="hw-rise flex items-center justify-between rounded border border-white/15 bg-white/10 px-3 py-2 text-sm text-white" {D(.15 + k * .25)}><span>{a}</span><span class="text-xs text-white/75">{b}</span></div>' for k, (a, b) in enumerate([("Referral &middot; M. Turner", "GP"), ("Call &middot; J. Okafor", "Phone"), ("Request &middot; Site 14", "Portal")]))}
      <p class="hw-pop mt-auto inline-flex items-center gap-2 self-start rounded-full bg-[#1d96fc] px-3 py-1 text-xs text-white" {D(1)}>Triaged &middot; High priority</p>
    </div>
    <div data-z="1" class="hw-zone flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[.03] p-4 lg:p-5">
      {Z_HEAD("02", "Roster", "#59bbf7")}
      <div class="grid grid-cols-5 gap-1.5">{"".join(f'<span class="hw-slot h-6 rounded-sm {"bg-[#59bbf7]" if k in (2, 6, 7, 11, 13) else "bg-white/15"}" {D(.1 + k * .06)}></span>' for k in range(15))}</div>
      <div class="hw-rise mt-auto flex items-center gap-3 rounded border border-white/15 bg-white/10 p-3" {D(1.1)}>{avatar("PS", "#104b90")}<div class="min-w-0"><p class="text-sm text-white">P. Shah assigned</p><p class="text-xs text-white/75">Skills &#10003; &middot; 4.2 km &middot; 11:00</p></div></div>
    </div>
    <div data-z="2" class="hw-zone flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[.03] p-4 lg:p-5">
      {Z_HEAD("03", "Outcomes", "#8ea8f0")}
      <p class="font-heading text-4xl text-white lg:text-5xl">{cu(96, "%")}</p><p class="-mt-2 text-xs text-white/75">Visits completed on time</p>
      <div class="mt-auto flex h-16 items-end gap-1.5">{"".join(f'<span class="hw-grow flex-1 rounded-sm bg-white/25 {"!bg-[#8ea8f0]" if k == 6 else ""}" style="height:{h}%;animation-delay:{.2 + k * .08:.2f}s"></span>' for k, h in enumerate([40, 52, 48, 63, 70, 78, 92]))}</div>
    </div>
  </div>
</div>"""

# ── Option 2 · Product frames: Base set, one product UI per step ─────────────
_inbox = "".join(
    f'<li class="hw-rise grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-line px-4 py-2.5 last:border-b-0" {D(.15 + k * .18)}><span class="truncate text-sm text-heading">{n}</span><span class="text-xs text-muted">{s}</span><span class="rounded-full px-2 py-0.5 text-[11px] {c}">{p}</span></li>'
    for k, (n, s, p, c) in enumerate([("M. Turner &middot; personal care", "GP referral", "High", "bg-[#1d96fc] text-white"), ("J. Okafor &middot; plan review", "Phone", "Medium", "bg-[#e0effe] text-[#0b6fc4]"), ("Site 14 &middot; equipment check", "Portal", "Routine", "bg-tint text-body"), ("A. Lee &middot; allied health", "Email", "Medium", "bg-[#e0effe] text-[#0b6fc4]")]))
SC1 = f"""<div class="grid h-full grid-cols-1 gap-3 md:grid-cols-[3fr_2fr] md:gap-4">
        <div class="hw-rise {CARD} overflow-hidden"><div class="flex items-center justify-between border-b border-line px-4 py-3"><p class="text-sm font-medium text-heading">Intake &middot; today</p><span class="flex items-center gap-1.5 text-xs text-muted"><span class="hw-live size-1.5 rounded-full bg-[#1d96fc]"></span>4 new</span></div><ul class="hw-inbox">{_inbox}</ul></div>
        <div class="hidden flex-col gap-3 md:flex"><div class="hw-rise {CARD} p-4" {D(.9)}><p class="text-xs uppercase tracking-widest text-muted">Copilot summary</p><p class="mt-2 min-h-[3.5rem] text-sm text-heading" data-type="Personal care after hospital discharge. Lives with daughter. Suggest 2 visits a day for 14 days."></p></div>
        <div class="hw-rise {CARD} flex items-center justify-between p-4" {D(1.2)}><span class="text-sm text-body">Triage SLA</span><span class="font-heading text-2xl text-heading">{cu(12, " min")}</span></div></div>
      </div>"""
_days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
SC2 = f"""<div class="grid h-full grid-cols-1 gap-3 md:grid-cols-[3fr_2fr] md:gap-4">
        <div class="hw-rise {CARD} p-4"><div class="flex items-center justify-between"><p class="text-sm font-medium text-heading">Week roster &middot; North team</p><span class="text-xs text-muted">{cu(142)} shifts filled</span></div>
          <div class="mt-3 grid grid-cols-[3.5rem_repeat(5,1fr)] gap-1.5 text-[11px] text-muted"><span></span>{"".join(f'<span class="text-center">{d}</span>' for d in _days)}
          {"".join(f'<span class="flex items-center">{w}</span>' + "".join(f'<span class="hw-slot h-6 rounded-sm" style="background:{"#59bbf7" if (r * 5 + c) % 3 else "#e0f2fe"};animation-delay:{.1 + (r * 5 + c) * .05:.2f}s"></span>' for c in range(5)) for r, w in enumerate(["P. Shah", "A. Ruiz", "K. Ng", "D. Cole"]))}</div></div>
        <div class="hidden flex-col gap-3 md:flex"><div class="hw-rise {CARD} relative overflow-hidden p-4" {D(.8)}><p class="text-xs uppercase tracking-widest text-muted">Route &middot; P. Shah</p>
          <svg viewBox="0 0 220 90" class="mt-2 h-auto w-full" aria-hidden="true"><path class="hw-draw" style="--len:300" d="M10 70 C 50 20, 90 80, 130 40 S 190 30, 210 20" stroke="#104b90" stroke-width="2" fill="none"/>{"".join(f'<circle class="hw-pop" style="animation-delay:{.6 + k * .3:.1f}s" cx="{x}" cy="{y}" r="5" fill="#fff" stroke="#59bbf7" stroke-width="2"/>' for k, (x, y) in enumerate([(10, 70), (130, 40), (210, 20)]))}</svg></div>
        <div class="hw-rise {CARD} flex items-center justify-between p-4" {D(1.2)}><span class="text-sm text-body">Travel saved today</span><span class="font-heading text-2xl text-heading">&minus;{cu(38, " min")}</span></div></div>
      </div>"""
SC3 = f"""<div class="grid h-full grid-cols-1 gap-3 md:grid-cols-[3fr_2fr] md:gap-4">
        <div class="hw-rise {CARD} p-4"><div class="flex items-center justify-between"><p class="text-sm font-medium text-heading">Outcomes &middot; this quarter</p><span class="text-xs text-muted">Live</span></div>
          <div class="mt-4 grid grid-cols-3 gap-3">{"".join(f'<div><p class="font-heading text-3xl text-heading">{cu(v, s)}</p><p class="text-xs text-muted">{l}</p></div>' for v, s, l in [(96, "%", "On-time visits"), (88, "%", "Goals on track"), (0, "", "Audit gaps")])}</div>
          <div class="mt-4 flex h-14 items-end gap-1.5">{"".join(f'<span class="hw-grow flex-1 rounded-sm" style="height:{h}%;background:{"#3b6fe0" if k == 11 else "#dbe4fb"};animation-delay:{.2 + k * .05:.2f}s"></span>' for k, h in enumerate([35, 42, 40, 51, 55, 60, 58, 66, 72, 75, 83, 94]))}</div></div>
        <div class="hidden flex-col gap-3 md:flex"><div class="hw-rise {CARD} flex items-center gap-4 p-4" {D(.6)}><svg viewBox="0 0 36 36" class="size-16 -rotate-90" aria-hidden="true"><circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" stroke-width="3.5"/><circle class="hw-draw" style="--len:100" cx="18" cy="18" r="15.9" fill="none" stroke="#3b6fe0" stroke-width="3.5" pathLength="100" stroke-dasharray="88 100"/></svg><div><p class="text-sm text-heading">Care plans reviewed</p><p class="text-xs text-muted">88% of 412</p></div></div>
        <div class="hw-rise {CARD} p-4" {D(1)}><p class="text-xs uppercase tracking-widest text-muted">Copilot insight</p><p class="mt-2 min-h-[3.5rem] text-sm text-heading" data-type="Missed-visit risk is down 21% since rosters started matching travel time."></p></div></div>
      </div>"""
OPT2 = f"""<div data-hwo="2" class="absolute inset-0 overflow-hidden" style="background: linear-gradient(135deg, #eef4fd, #f9fafe 55%, #eaf0fc)">
  {"".join(f'<div data-scene="{k}" class="hw-scene absolute inset-0 p-4 md:p-8 lg:p-10">{sc}</div>' for k, sc in enumerate([SC1, SC2, SC3]))}
</div>"""

# ── Option 3 · Paraform photo: product photo under a wash, one frosted story per step ──
PH = [("CareBg.avif", "#0f1936", "#3b6fe0"), ("RosterBg.avif", "#104b90", "#59bbf7"), ("GenoBg.avif", "#0f1936", "#8ea8f0")]
ST = [
    (f'<div class="flex items-center gap-3">{avatar("MT", "#0f1936", "size-10")}<div><p class="text-sm font-medium text-heading">New referral &middot; M. Turner</p><p class="text-xs text-muted">GP &middot; personal care after discharge</p></div></div>',
     ["Eligibility checked", "Funding confirmed", "Triaged &middot; High"], "Referral to plan in 12 min"),
    (f'<div class="flex items-center gap-3">{avatar("PS", "#104b90", "size-10")}<div><p class="text-sm font-medium text-heading">Shift filled &middot; P. Shah</p><p class="text-xs text-muted">Personal care &middot; 11:00 &middot; 4.2 km</p></div></div>',
     ["Skills matched", "Compliance current", "Route optimised"], "142 shifts filled this week"),
    (f'<div><p class="text-sm font-medium text-heading">Outcome recorded &middot; M. Turner</p><div class="mt-3 h-2 overflow-hidden rounded-full bg-heading/10"><span class="hw-fill block h-full w-3/4 rounded-full bg-[#3b6fe0]" {D(.4)}></span></div><p class="mt-1.5 text-xs text-muted">3 of 4 goals met</p></div>',
     ["Note signed", "Claim ready", "Family updated"], "Audit-ready &middot; 0 gaps"),
]
OPT3 = f"""<div data-hwo="3" class="absolute inset-0 overflow-hidden bg-[#0f1936]">
  {"".join(f'''<div data-scene="{k}" class="hw-scene absolute inset-0">
    <div class="hw-ken absolute inset-0" style="background: linear-gradient(160deg, color-mix(in srgb, {d} 60%, transparent), color-mix(in srgb, {m} 30%, transparent)), url({{P}}/product/{f}) center / cover"></div>
    <div class="absolute inset-0 flex items-center justify-center p-4 md:justify-start md:p-10 lg:pl-16">
      <div class="hw-rise {FROST} w-full max-w-sm p-4 md:p-5" {D(.2)}>{head}
        <ul class="mt-4 space-y-2">{"".join(f'<li class="hw-rise flex items-center gap-2 text-sm text-heading" {D(.5 + j * .25)}><span class="flex size-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">&#10003;</span>{c}</li>' for j, c in enumerate(checks))}</ul>
      </div>
    </div>
    <p class="hw-pop absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/40 bg-[#0f1936]/30 px-4 py-2 text-xs text-white backdrop-blur-md md:bottom-6" {D(1.3)}><span class="size-1.5 rounded-full" style="background:{m}"></span>{pill}</p>
  </div>''' for k, ((f, d, m), (head, checks, pill)) in enumerate(zip(PH, ST)))}
</div>"""

RING = """<svg viewBox="0 0 40 40" class="size-10 -rotate-90" aria-hidden="true"><circle cx="20" cy="20" r="17" class="fill-none stroke-line" stroke-width="2"/><circle data-ring cx="20" cy="20" r="17" class="fill-none stroke-body" stroke-width="2" pathLength="100" stroke-dasharray="0 100"/></svg>"""


def build(P):
    opt3 = OPT3.replace("{P}", P)
    html = f"""<section id="how-sognos-works" data-hsw-root class="bg-tint py-20 md:py-28">
  <div class="mx-auto max-w-7xl px-6">
    <div class="mx-auto flex max-w-2xl flex-col gap-4 text-center">
      <p class="flex items-center justify-center gap-2.5 text-lg text-heading"><span aria-hidden="true" class="block size-[0.66em] bg-accent"></span>How Sognos works</p>
      <h2 class="mt-4 font-heading text-3xl font-medium tracking-tight text-heading md:text-5xl">Healthcare First. Field Services Always. AI at the Centre.</h2>
      <p class="mx-auto max-w-2xl text-base leading-normal text-body md:text-lg">One connected process takes service demand from first contact to coordinated delivery and measurable outcomes.</p>
      <div class="flex justify-center"><div class="inline-flex flex-wrap items-center justify-center gap-3 rounded-full bg-[#152248]/10 px-4 py-3 sm:gap-5 sm:px-6">
        <img src="{P}/logos/Dynamics365.svg" alt="Microsoft Dynamics 365" class="h-11 w-auto" /><span aria-hidden="true" class="h-8 w-px bg-[#152248]/30"></span>
        <img src="{P}/logos/Microsoft-Solutions-Partner-Logo.webp" alt="Microsoft Solutions Partner" class="h-[5.5rem] w-auto" /><span aria-hidden="true" class="h-8 w-px bg-[#152248]/30"></span>
        <img src="{P}/logos/copilot-logo.svg" alt="Microsoft Copilot" class="h-11 w-auto" /></div></div>
    </div>
    <div class="mt-10 flex flex-col gap-2 md:mt-12 lg:mt-16">
      <div class="relative aspect-[4/3] overflow-hidden rounded-lg sm:aspect-[16/9] md:aspect-[2720/976]" aria-label="How Sognos works - animated illustration" role="img">{OPT1}{OPT2}{opt3}</div>
      <div data-hw-deck class="hw-deck grid gap-2" style="grid-template-columns: 2fr 1fr 1fr">
        {"".join(f'''<button type="button" data-hw-card="{k}" class="hw-card relative flex min-h-[200px] flex-col overflow-hidden rounded-lg bg-white p-6 text-left focus-visible:outline-2 focus-visible:outline-accent md:min-h-[240px]">
          <span class="font-mono text-xs uppercase text-muted">0{k + 1}</span>
          <span data-hw-ring class="absolute right-6 top-6 hidden">{RING}</span>
          <span class="mt-auto font-heading text-xl tracking-tight text-heading">{t}</span>
          <span class="hw-body mt-4 line-clamp-3 text-base leading-[1.4] text-body/80">{c}</span>
        </button>''' for k, (t, c) in enumerate(STEPS))}
      </div>
    </div>
  </div>
</section>"""
    return CSS, html, JS


JS = """<script>
  (() => {
    const root = document.querySelector("[data-hsw-root]"); if (!root) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches, DWELL = 8000;
    const cards = [...root.querySelectorAll("[data-hw-card]")], deck = root.querySelector("[data-hw-deck]");
    let step = 0, t0 = performance.now(), paused = false;
    const countUp = (el) => { const to = +el.dataset.cu, dec = +el.dataset.dec, suf = el.dataset.suf; if (reduce) { el.textContent = to.toFixed(dec) + suf; return; } const s = performance.now(); const f = (n) => { const p = Math.min(1, (n - s) / 1400), e = 1 - Math.pow(1 - p, 3); el.textContent = (to * e).toFixed(dec) + suf; if (p < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); };
    const type = (el) => { const txt = el.dataset.type; if (reduce) { el.textContent = txt; return; } clearInterval(el._t); el.textContent = ""; let i = 0; setTimeout(() => { el._t = setInterval(() => { el.textContent = txt.slice(0, ++i); if (i >= txt.length) clearInterval(el._t); }, 22); }, 900); };
    const activate = (el) => { el.classList.remove("is-on"); void el.offsetWidth; el.classList.add("is-on"); el.querySelectorAll("[data-cu]").forEach(countUp); el.querySelectorAll("[data-type]").forEach(type); };
    const show = (i) => {
      step = (i + 3) % 3; t0 = performance.now();
      root.querySelectorAll("[data-z]").forEach((z) => (+z.dataset.z === step ? activate(z) : z.classList.remove("is-on")));
      root.querySelectorAll("[data-scene]").forEach((s) => (+s.dataset.scene === step ? activate(s) : s.classList.remove("is-on")));
      cards.forEach((c, k) => { c.classList.toggle("is-on", k === step); c.setAttribute("aria-current", String(k === step)); c.querySelector("[data-hw-ring]").classList.toggle("hidden", k !== step || reduce); });
      if (innerWidth >= 768) deck.style.gridTemplateColumns = [0, 1, 2].map((k) => (k === step ? "2fr" : "1fr")).join(" ");
    };
    cards.forEach((c, k) => c.addEventListener("click", () => show(k)));
    root.addEventListener("mouseenter", () => (paused = true)); root.addEventListener("mouseleave", () => { paused = false; t0 = performance.now(); });
    // Mobile: stacked deck, no column animation.
    const mq = matchMedia("(min-width: 768px)"); const lay = () => { deck.style.gridTemplateColumns = mq.matches ? [0, 1, 2].map((k) => (k === step ? "2fr" : "1fr")).join(" ") : "1fr"; }; mq.addEventListener("change", lay);
    const tick = (n) => { if (!paused && !reduce) { const p = (n - t0) / DWELL; const r = cards[step].querySelector("[data-ring]"); if (r) r.setAttribute("stroke-dasharray", `${Math.min(100, p * 100)} 100`); if (p >= 1) show(step + 1); } requestAnimationFrame(tick); };
    // Re-run the active scene when the option switcher changes.
    new MutationObserver(() => show(step)).observe(document.body, { attributes: true, attributeFilter: ["data-hsw"] });
    show(0); lay(); requestAnimationFrame(tick);
  })();
</script>"""
