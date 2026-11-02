"""DigPacks Asset Booker close section for docs/mockups/products (2026-10-26).
Three layouts (A · Split / B · Immersive / C · Editorial), no screenshot: a generated booking
motion graphic (resource -> time slot -> booked, looping through desk / room / parking / equipment).
"What is Asset Booker?" opens a right-side drawer with the live copy, the Asset Booker image and
"Find out more". Copy + links are live (components/layout/sections/digpacks/AssetBooker.tsx).
section(p, d, ctx) -> html; CSS / DRAWER / JS for the page.
"""

FORM_URL = "https://forms.cloud.microsoft/pages/responsepage.aspx?id=dIv2xQ42w0yPgwCF_6izmX_i53x-rohEmvUHAV32Ee5UNEZXVEpVQVZLWkVaUTJCSk5GMTg1Q1pESy4u&amp;route=shorturl"
DIGPACKS_URL = "https://www.digpacks.co.uk/knowledge-base/asset-booker/"
RES = [("Desk", "Desk 2.14 &middot; Second floor"), ("Meeting room", "Room 3B &middot; 6 seats"), ("Parking", "Bay 12 &middot; Level -1"), ("Equipment", "Projector kit 04")]
SLOTS = [("09:00 - 10:30", "Booked"), ("10:30 - 12:00", "Available"), ("14:00 - 16:00", "Available")]


def ui(P):
    tabs = "".join(f'<span data-ab-tab="{i}" class="ab-tab rounded-full border border-line px-2.5 py-1 text-[11px] text-body">{n}</span>' for i, (n, _) in enumerate(RES))
    rows = "".join(f'<li data-ab-row="{i}" class="ab-row flex items-center justify-between gap-3 rounded border border-line px-3 py-2"><span class="text-xs tabular-nums text-heading">{t}</span>'
                   f'<span class="ab-state text-[11px] {"text-muted" if s == "Booked" else "text-emerald-700"}">{s}</span></li>' for i, (t, s) in enumerate(SLOTS))
    return f'''<div data-ab data-keep class="relative w-full max-w-md rounded-lg border border-line bg-white p-4 text-left" data-ab-step="0" data-ab-res="0">
      <div class="flex items-center justify-between"><p class="text-xs font-medium text-heading">Asset Booker &middot; Book a resource</p><span class="text-[11px] text-muted">Mon 5 Jan</span></div>
      <div class="mt-3 flex flex-wrap gap-1.5">{tabs}</div>
      <p class="mt-4 text-[11px] text-muted">Selected</p><p data-ab-name class="font-heading text-lg text-heading">{RES[0][1]}</p>
      <ul class="mt-3 space-y-1.5">{rows}</ul>
      <div class="ab-toast absolute inset-x-4 -bottom-4 flex items-center gap-3 rounded-lg bg-[var(--p-base)] px-4 py-3 text-white"><span class="flex size-6 items-center justify-center rounded-full bg-white/20 text-xs">&#10003;</span><span class="text-xs"><span data-ab-booked>{RES[0][1]}</span> booked &middot; 10:30</span></div>
    </div>'''


def section(p, d, c):
    P, T, eyebrow, FOCUS = c["P"], c["T"], c["eyebrow"], c["FOCUS"]
    lab, h2, b1, b2 = p["asset"]
    dark = d == "b"
    dl = (f'<a href="{FORM_URL}" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-[var(--p-base)] px-7 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90 {FOCUS}">'
          f'Download Asset Booker for free <span aria-hidden="true">&rarr;</span></a>')
    what = (f'<button type="button" data-ab-open aria-haspopup="dialog" aria-controls="ab-drawer" class="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap text-base font-medium '
            f'{"text-white" if dark else "text-heading"} transition-opacity hover:opacity-80 {FOCUS}">What is Asset Booker? <span aria-hidden="true">&rarr;</span></button>')
    ctas = f'<div class="flex flex-wrap items-center gap-x-6 gap-y-3">{dl}{what}</div>'
    body = lambda cls: f'<p class="{T["body"]} {cls}">{b1}</p><p class="{T["small"]} {cls} opacity-80">{b2}</p>'
    if d == "b":
        chips = "".join(f'<span class="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/85 backdrop-blur">{n}</span>' for n, _ in RES)
        return f'''<section class="relative overflow-hidden bg-[var(--p-deep)] py-20 text-white md:py-28"><div aria-hidden="true" class="p-glow absolute inset-0"></div><div aria-hidden="true" class="p-grid absolute inset-0"></div>
  <div class="relative mx-auto max-w-7xl px-6"><div class="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">{eyebrow(lab, True).replace("flex items-center", "inline-flex items-center")}<h2 class="{T["h2"]} text-white text-balance">{h2}</h2>{body("text-white/80")}<div class="mt-2 flex justify-center">{ctas}</div></div>
    <div data-ab-wrap class="relative mx-auto mt-14 flex max-w-4xl flex-col items-center gap-6 rounded-lg border border-white/10 bg-white/5 p-6 pb-12 backdrop-blur md:p-10 md:pb-14">{ui(P)}<div class="mt-6 flex flex-wrap justify-center gap-2">{chips}</div></div></div></section>'''
    if d == "c":
        steps = "".join(f'<li class="border-t border-line pt-5"><p class="text-xs tabular-nums text-muted">{i:02d}</p><p class="mt-2 {T["h3sm"]} text-heading">{t}</p><p class="mt-2 {T["small"]} text-body">{s}</p></li>'
                        for i, (t, s) in enumerate([("Pick a resource", "Desks, rooms, clinical spaces, equipment and parking in one list."), ("Choose a time", "Live availability, so nothing is double-booked."), ("Booked and confirmed", "Administrators see bookings and utilisation as they happen.")], 1))
        return f'''<section class="bg-[var(--p-soft)] py-20 md:py-28"><div class="mx-auto max-w-7xl px-6">
  <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16"><div class="flex flex-col gap-5 lg:col-span-7">{eyebrow(lab)}<h2 class="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-heading text-balance md:text-5xl">{h2}</h2></div>
    <div class="flex flex-col justify-end gap-5 lg:col-span-5">{body("text-body")}{ctas}</div></div>
  <div data-ab-wrap class="mt-14 grid grid-cols-1 items-center gap-10 rounded-lg border border-line bg-white p-6 pb-12 md:p-10 lg:grid-cols-12 lg:gap-16"><div class="flex justify-center lg:col-span-5">{ui(P)}</div><ol class="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1">{steps}</ol></div>
</div></section>'''
    return f'''<section class="bg-white py-20 md:py-28"><div class="mx-auto max-w-7xl px-6"><div data-ab-grid class="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
  <div class="flex flex-col items-start gap-5">{eyebrow(lab)}<h2 class="{T["h2"]} text-heading text-balance">{h2}</h2>{body("text-body")}<div class="mt-2">{ctas}</div></div>
  <div data-ab-wrap class="flex items-center justify-center rounded-lg bg-[var(--p-soft)] p-6 pb-12 md:p-12 md:pb-16">{ui(P)}</div>
</div></div></section>'''


def drawer(P):
    return f'''<div id="ab-drawer" class="ab-drawer fixed inset-0 z-[90]" aria-hidden="true" data-product="digpacks">
  <div data-ab-close class="ab-backdrop absolute inset-0 bg-[#0f1936]/60 backdrop-blur-sm"></div>
  <aside role="dialog" aria-modal="true" aria-labelledby="ab-title" class="ab-panel absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-white text-left">
    <div class="flex shrink-0 items-center justify-between border-b border-line px-6 py-4"><img src="{P}/images/digpacks/digpacks-logo-full.webp" alt="DigPacks" class="h-7 w-auto" />
      <button type="button" data-ab-close aria-label="Close" class="flex size-10 items-center justify-center rounded-full bg-tint text-heading hover:bg-line">&times;</button></div>
    <div class="flex-1 overflow-y-auto overscroll-contain px-6 py-8 md:px-10">
      <h2 id="ab-title" class="font-heading text-3xl font-normal tracking-tight text-heading">What is Asset Booker?</h2>
      <p class="mt-4 text-base leading-relaxed text-body">Asset Booker is a simple resource booking solution designed to help organisations manage shared spaces, equipment and other bookable assets in one place. Teams can check availability and book desks, meeting rooms, clinical spaces, equipment, parking and other shared resources, while administrators get better visibility over bookings and utilisation.</p>
      <p class="mt-4 text-base leading-relaxed text-body">It helps reduce double bookings, manual coordination and spreadsheet-based processes, while making it easier for people to find and reserve what they need. Asset Booker can also be configured around the way your organisation works, including your locations, resources and booking rules.</p>
      <img src="{P}/images/digpacks/Asset-Booker.jpg" alt="Asset Booker resource booking interface" class="mt-8 h-auto w-full rounded-lg border border-line" />
      <div class="mt-8 border-t border-line pt-6"><p class="text-sm text-muted">Find out more about Asset Booker on the DigPacks website.</p>
        <div class="mt-4 flex flex-wrap items-center gap-4"><a href="{DIGPACKS_URL}" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--p-base)] px-6 text-sm font-medium text-white hover:opacity-90">Find out more <span aria-hidden="true">&rarr;</span></a>
          <a href="{FORM_URL}" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-heading hover:opacity-80">Download Asset Booker for free <span aria-hidden="true">&rarr;</span></a></div></div>
    </div>
  </aside>
</div>'''


CSS = """<style>
  .ab-tab { transition: background-color .3s, color .3s, border-color .3s; }
  [data-ab-res="0"] [data-ab-tab="0"], [data-ab-res="1"] [data-ab-tab="1"], [data-ab-res="2"] [data-ab-tab="2"], [data-ab-res="3"] [data-ab-tab="3"] { background: var(--p-base); border-color: var(--p-base); color: #fff; }
  .ab-row { transition: border-color .3s, background-color .3s; }
  [data-ab]:is([data-ab-step="1"], [data-ab-step="2"]) [data-ab-row="1"] { border-color: var(--p-base); background: var(--p-soft); }
  [data-ab][data-ab-step="2"] [data-ab-row="1"] .ab-state { color: var(--p-ink); } [data-ab][data-ab-step="2"] [data-ab-row="1"] .ab-state::after { content: " \\2713"; }
  .ab-toast { opacity: 0; transform: translateY(8px); transition: opacity .35s, transform .35s; } [data-ab][data-ab-step="2"] .ab-toast { opacity: 1; transform: none; }
  /* Section graphic switch (Inspector: Stories / CTA - DigPacks) */
  html[data-ab-graphic="off"] [data-ab-wrap] { display: none; } html[data-ab-graphic="off"] [data-ab-grid] { grid-template-columns: minmax(0, 1fr); max-width: 48rem; }
  .ab-drawer { visibility: hidden; pointer-events: none; } .ab-drawer.is-open { visibility: visible; pointer-events: auto; }
  .ab-backdrop { opacity: 0; transition: opacity .3s; } .ab-drawer.is-open .ab-backdrop { opacity: 1; }
  .ab-panel { transform: translateX(100%); transition: transform .45s cubic-bezier(.22,1,.36,1); } .ab-drawer.is-open .ab-panel { transform: none; }
  @media (prefers-reduced-motion: reduce) { .ab-tab, .ab-row, .ab-toast, .ab-backdrop, .ab-panel { transition: none; } }
</style>"""

JS = """<script>
  (() => {
    const RES = %s, reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Booking loop: select resource -> pick 10:30 -> booked toast -> next resource.
    document.querySelectorAll("[data-ab]").forEach((root) => {
      let k = 0, s = 0; const name = root.querySelector("[data-ab-name]"), booked = root.querySelector("[data-ab-booked]");
      const draw = () => { root.dataset.abStep = s; root.dataset.abRes = k; name.innerHTML = RES[k]; booked.innerHTML = RES[k]; };
      if (reduce) { s = 2; draw(); return; }
      setInterval(() => { if (!root.offsetParent) return; s = (s + 1) %% 4; if (s === 0) k = (k + 1) %% RES.length; draw(); }, 1500);
    });
    // "What is Asset Booker?" drawer: Esc / backdrop / close button, focus returns, body scroll locked.
    const dr = document.getElementById("ab-drawer"); if (!dr) return; let last = null;
    const open = (btn) => { last = btn; dr.classList.add("is-open"); dr.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; document.querySelectorAll("[data-ab-open]").forEach((b) => b.setAttribute("aria-expanded", "true")); dr.querySelector("[data-ab-close].size-10").focus(); };
    const close = () => { dr.classList.remove("is-open"); dr.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; document.querySelectorAll("[data-ab-open]").forEach((b) => b.setAttribute("aria-expanded", "false")); last?.focus(); };
    document.addEventListener("click", (e) => { const b = e.target.closest("[data-ab-open]"); if (b) { e.preventDefault(); open(b); } else if (e.target.closest("[data-ab-close]")) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && dr.classList.contains("is-open")) close(); });
  })();
</script>"""


def js():
    import json
    return JS % json.dumps([n for _, n in RES])
