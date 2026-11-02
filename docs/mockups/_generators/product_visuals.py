"""SognosGenogram + DigPacks feature motion graphics, in the 04b gallery system
(.fv panel, data-in rises, FV_JS loops: journey / run / type / audit / count).
Colours come from the product token ladder (--p-*), so they theme per product.
Card data is illustrative. build(ns) -> (GENO_FV, DIGPACKS_FV), lists of (name, html).
"""
import json


def build(ns):
    _panel = ns["_panel"]
    HP = '<div data-progress class="hidden" style="height:0%"></div>'
    C = "rounded-lg border border-line bg-white"

    def panel(i, loop, body):
        # Alternating product soft / tint by default (palette switcher can override).
        return _panel("var(--p-soft)" if i % 2 == 0 else "var(--p-tint)", loop, body)

    def steps(items):
        return "".join(
            f'<li data-step data-state="next" class="group/st flex items-center justify-between gap-3 py-2 text-sm"><span class="text-body">{a}</span>'
            '<span class="flex size-6 items-center justify-center rounded-full border border-line text-[11px] text-transparent transition-colors duration-300 group-data-[state=done]/st:border-emerald-600 group-data-[state=done]/st:bg-emerald-600 group-data-[state=done]/st:text-white group-data-[state=now]/st:border-[var(--p-base)]">&#10003;</span></li>'
            for a in items)

    def journey(stages, start=1):
        return "".join(
            f'<li data-stage class="group/s flex flex-col gap-2" data-state="{"done" if j < start else "now" if j == start else "next"}"><span class="h-1.5 rounded-full bg-line transition-colors duration-500 group-data-[state=done]/s:bg-[var(--p-dark)] group-data-[state=now]/s:bg-[var(--p-base)]"></span><span class="truncate text-[10px] text-muted transition-colors group-data-[state=now]/s:font-medium group-data-[state=now]/s:text-heading">{s}</span></li>'
            for j, s in enumerate(stages))

    pulse = lambda c: f'<span class="relative flex size-2"><span class="pulse absolute inset-0 rounded-full" style="background:{c}"></span><span class="relative size-2 rounded-full" style="background:{c}"></span></span>'
    av = lambda t, bg="var(--p-dark)", s="size-9": f'<span class="flex {s} shrink-0 items-center justify-center rounded-full text-[11px] font-medium text-white" style="background:{bg}">{t}</span>'

    # ── SognosGenogram ────────────────────────────────────────────────────────
    TREE = """<svg viewBox="0 0 300 170" class="mt-2 h-auto w-full" aria-hidden="true">
                  <path d="M70 40 H140 M105 40 V80 M60 80 H150 M60 80 V110 M150 80 V110 M195 40 H250" stroke="var(--p-base)" stroke-width="2" fill="none"/>
                  <path class="flow" d="M150 125 C190 125 200 70 222 55" stroke="var(--p-accent)" stroke-width="1.5" fill="none"/>
                  <rect data-in="1" x="55" y="27" width="26" height="26" rx="3" fill="#fff" stroke="var(--p-base)" stroke-width="2"/>
                  <circle data-in="1" cx="140" cy="40" r="13" fill="#fff" stroke="var(--p-base)" stroke-width="2"/>
                  <rect data-in="2" x="47" y="110" width="26" height="26" rx="3" fill="#fff" stroke="var(--p-base)" stroke-width="2"/>
                  <circle data-in="2" cx="150" cy="123" r="13" fill="var(--p-base)"/>
                  <rect data-in="3" x="182" y="27" width="26" height="26" rx="3" fill="#fff" stroke="var(--p-accent)" stroke-width="2" stroke-dasharray="3 3"/>
                  <circle data-in="3" cx="250" cy="40" r="13" fill="#fff" stroke="var(--p-accent)" stroke-width="2" stroke-dasharray="3 3"/>
                  <text x="150" y="160" text-anchor="middle" font-size="10" fill="#68706f" font-family="sans-serif">Client</text>
                </svg>"""
    G1 = panel(0, None, f"""<div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="{C} p-4"><div class="flex items-center justify-between"><p class="text-sm font-medium text-heading">M. Turner &middot; family</p><span class="rounded-full bg-[var(--p-soft)] px-2.5 py-1 text-[10px] font-medium text-[var(--p-ink)]">Genogram</span></div>{TREE}</div>
                <div data-in="2" class="flex gap-2">{"".join(f'<span class="rounded-full border border-line bg-white px-3 py-1.5 text-xs text-heading">{t}</span>' for t in ["+ Person", "Relationship", "Notation"])}</div>
              </div>""")

    NET = [("Daughter", 150, 22, "var(--p-base)"), ("GP", 262, 62, "#00a98f"), ("Support worker", 262, 150, "var(--p-base)"), ("OT", 150, 190, "#00a98f"), ("Pharmacist", 38, 150, "#ffad6e"), ("Neighbour", 38, 62, "var(--p-accent)")]
    G2 = panel(1, None, f"""<div data-in="1" class="{C} w-full max-w-md p-4 text-left">
                <div class="flex items-center justify-between"><p class="text-sm font-medium text-heading">Support network &middot; M. Turner</p><span class="text-xs text-muted">6 people</span></div>
                <svg viewBox="0 0 300 212" class="mt-2 h-auto w-full" aria-hidden="true">
                  {"".join(f'<path class="flow" d="M150 106 L{x} {y}" stroke="{c}" stroke-width="1.5" fill="none"/>' for _, x, y, c in NET)}
                  <circle cx="150" cy="106" r="22" fill="var(--p-base)"/><text x="150" y="110" text-anchor="middle" font-size="11" fill="#fff" font-family="sans-serif">MT</text>
                  {"".join(f'<g data-in="{min(k + 1, 4)}"><circle cx="{x}" cy="{y}" r="9" fill="#fff" stroke="{c}" stroke-width="2"/><text x="{x}" y="{y + 22 if y > 106 else y - 14}" text-anchor="middle" font-size="9" fill="#68706f" font-family="sans-serif">{n}</text></g>' for k, (n, x, y, c) in enumerate(NET))}
                </svg>
                <p class="flex gap-4 text-[10px] text-muted"><span class="flex items-center gap-1"><span class="size-2 rounded-full bg-[var(--p-base)]"></span>Family</span><span class="flex items-center gap-1"><span class="size-2 rounded-full bg-[#00a98f]"></span>Formal</span><span class="flex items-center gap-1"><span class="size-2 rounded-full bg-[#ffad6e]"></span>Strained</span></p>
              </div>""")

    G3 = panel(2, "run", f"""<div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="{C} px-4 py-2">{HP}<p class="pt-1 text-xs text-muted">Relationship tags &middot; M. Turner</p><ul class="divide-y divide-line">{steps(["S. Turner &middot; Protective", "J. Turner &middot; Risk - monitor", "Neighbour &middot; Protective", "Ex-partner &middot; No contact order"])}</ul></div>
                <div data-in="2" class="{C} flex items-center gap-3 p-3">{pulse("#ff8e90")}<p class="text-xs text-heading">1 relationship needs review before the next visit</p></div>
              </div>""")

    G4 = panel(3, None, f"""<div class="w-full max-w-md text-left">
                <div data-in="1" class="{C} overflow-hidden">
                  <div class="flex items-center gap-3 border-b border-line p-4">{av("MT")}<div class="min-w-0 flex-1"><p class="text-sm font-medium text-heading">M. Turner</p><p class="text-xs text-muted">Case #C-2207 &middot; Child &amp; Family</p></div></div>
                  <div class="flex gap-4 border-b border-line px-4 text-xs">{"".join(f'<span class="py-2.5 {"border-b-2 border-[var(--p-base)] font-medium text-heading" if t == "Genogram" else "text-muted"}">{t}</span>' for t in ["Overview", "Notes", "Genogram", "Plans"])}</div>
                  <div class="p-4"><svg viewBox="0 0 300 90" class="h-auto w-full" aria-hidden="true"><path d="M90 25 H200 M145 25 V55 M100 55 H190 M100 55 V70 M190 55 V70" stroke="var(--p-base)" stroke-width="2" fill="none"/><rect x="76" y="12" width="26" height="26" rx="3" fill="#fff" stroke="var(--p-base)" stroke-width="2"/><circle cx="200" cy="25" r="13" fill="#fff" stroke="var(--p-base)" stroke-width="2"/><rect x="87" y="66" width="22" height="22" rx="3" fill="#fff" stroke="var(--p-base)" stroke-width="2"/><circle cx="190" cy="77" r="11" fill="var(--p-base)"/></svg></div>
                </div>
                <div data-in="3" class="mt-3 flex items-center justify-between rounded-lg border border-line bg-white p-3"><span class="flex -space-x-2">{"".join(av(t, c, "size-7") for t, c in [("PS", "var(--p-base)"), ("JK", "#00a98f"), ("AL", "#ff7dbc"), ("EL", "var(--p-dark)")])}</span><span class="text-xs text-body">Same picture for 4 workers</span></div>
              </div>""")

    G5 = panel(4, "journey", f"""<div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="{C} p-4"><p class="text-xs text-muted">Network over time</p><ol class="mt-3 grid grid-cols-4 gap-1.5">{journey(["2019", "2022", "2025", "2026"], 2)}</ol></div>
                <div data-in="2" class="grid grid-cols-2 gap-3">{"".join(f'<div class="{C} p-3"><p class="text-[10px] uppercase tracking-widest text-muted">{y}</p><p class="mt-1 font-heading text-2xl text-heading">{n}</p><p class="text-xs text-muted">{l}</p></div>' for y, n, l in [("2022", "4", "supports"), ("2026", "6", "supports")])}</div>
                <div data-in="3" class="{C} flex items-center gap-3 p-3"><span class="flex size-8 items-center justify-center rounded bg-[var(--p-soft)] text-xs text-[var(--p-ink)]">&plus;2</span><p class="text-xs text-heading">Neighbour and OT added since last snapshot</p></div>
              </div>""")

    G6 = panel(5, "type", f"""<div class="relative w-full max-w-md text-left">
                <div data-in="1" class="overflow-hidden rounded-lg border border-white/10 bg-[var(--p-dark)]">
                  <div class="flex items-center justify-between border-b border-white/10 px-4 py-3"><p class="text-sm text-white">Family summary &middot; M. Turner</p><span class="text-xs text-white/50">Dynamics 365</span></div>
                  <div class="p-4"><p class="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[var(--p-accent)]"><span aria-hidden="true">&#10022;</span> Copilot narrative</p>
                    <p class="mt-3 min-h-[6rem] font-mono text-[13px] leading-relaxed text-white/85"><span data-type="M. Turner lives with her daughter, S. Turner, who is her primary carer. A neighbour checks in daily. Contact with her son is strained and is being monitored."></span><span aria-hidden="true" class="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-[var(--p-accent)] align-middle"></span></p>
                    <div class="mt-4 flex gap-2"><span class="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-heading">Add to handover</span><span class="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/80">Edit</span></div></div>
                </div>
              </div>""")

    GENO_FV = [("Interactive genogram builder", G1), ("Support network mapping", G2), ("Risk and protective factor tagging", G3),
               ("Embedded in the case record", G4), ("Historical snapshots", G5), ("Copilot AI narrative", G6)]

    # ── DigPacks ──────────────────────────────────────────────────────────────
    RAG = {"High": "#ff8e90", "Med": "#ffad6e", "Low": "#00a98f"}
    D1 = panel(0, "run", f"""<div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="{C} overflow-hidden"><div class="flex items-center justify-between border-b border-line px-4 py-3"><p class="text-sm font-medium text-heading">Risk register</p><span class="text-xs text-muted">3 sites</span></div>
                  <ul>{"".join(f'<li class="flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-b-0"><span class="rounded px-1.5 py-0.5 text-[10px] font-medium text-white" style="background:{RAG[r]}">{r}</span><span class="flex-1 truncate text-sm text-heading">{t}</span><span class="text-xs text-muted">{o}</span></li>' for r, t, o in [("High", "Ward 4 ligature points", "J. Patel"), ("Med", "Lone working - community", "A. Shaw"), ("Low", "Equipment servicing", "R. Moss")])}</ul></div>
                <div data-in="2" class="{C} px-4 py-2">{HP}<ul class="divide-y divide-line">{steps(["Assessment complete", "Action assigned", "Evidence uploaded", "Approved"])}</ul></div>
              </div>""")

    D2 = panel(1, "type", f"""<div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="relative overflow-hidden rounded-lg border border-line bg-[var(--p-dark)]">
                  <svg viewBox="0 0 300 140" class="block h-auto w-full" aria-hidden="true"><rect width="300" height="140" fill="var(--p-dark)"/><path d="M0 110 L300 110 M40 110 L40 30 L120 30 L120 110 M200 30 H260 V80 H200 Z" stroke="rgb(255 255 255 / .25)" stroke-width="2" fill="none"/><circle cx="108" cy="72" r="4" fill="rgb(255 255 255 / .6)"/></svg>
                  <span class="pulse absolute left-[32%] top-[44%] size-8 rounded border-2 border-[#ff8e90]"></span><span class="absolute left-[32%] top-[44%] size-8 rounded border-2 border-[#ff8e90]"></span>
                  <span class="absolute left-[64%] top-[18%] h-12 w-20 rounded border-2 border-[#ffad6e]"></span>
                  <span class="absolute bottom-2 left-2 rounded bg-black/40 px-2 py-1 text-[10px] text-white">Room 4B &middot; photo analysed</span>
                </div>
                <div data-in="2" class="{C} p-4"><p class="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[var(--p-ink)]"><span aria-hidden="true">&#10022;</span> Draft assessment</p>
                  <p class="mt-2 min-h-[3.5rem] font-mono text-[12px] leading-relaxed text-heading"><span data-type="Door handle: potential ligature point (high). Window restrictor present. Recommend anti-ligature fitting before next review."></span></p></div>
              </div>""")

    D3 = panel(2, "run", f"""<div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="{C} flex items-center gap-3 p-4">{av("AS")}<div class="min-w-0 flex-1"><p class="text-sm font-medium text-heading">Leave request &middot; 3 days</p><p class="text-xs text-muted">A. Shaw &middot; 12-14 Nov</p></div><span class="rounded-full bg-[var(--p-soft)] px-2.5 py-1 text-[10px] font-medium text-[var(--p-ink)]">Self-service</span></div>
                <div data-in="2" class="{C} px-4 py-2">{HP}<ul class="divide-y divide-line">{steps(["Request submitted", "Line manager approved", "Roster updated", "Employee notified"])}</ul></div>
              </div>""")

    SL = [(0, 0), (0, 2), (1, 1), (1, 3), (2, 0), (2, 4), (3, 2), (3, 3), (4, 1), (4, 4)]
    D4 = panel(3, "count", f"""<div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="{C} p-4"><div class="flex items-center justify-between"><p class="text-sm font-medium text-heading">Flu clinic &middot; week 46</p><span class="text-xs text-muted">Booked <span data-count="186">0</span></span></div>
                  <div class="mt-3 grid grid-cols-5 gap-1.5 text-center text-[10px] text-muted">{"".join(f"<span>{d}</span>" for d in ["Mon", "Tue", "Wed", "Thu", "Fri"])}</div>
                  <div class="mt-1.5 grid grid-cols-5 grid-rows-5 gap-1.5">{"".join(f'<span class="slot h-6 rounded" style="grid-column:{c + 1};grid-row:{r + 1};transition-delay:{(c * 5 + r) * 70}ms;background:var(--p-base)"></span>' for c, r in SL)}{"".join(f'<span class="h-6 rounded border border-dashed border-line" style="grid-column:{c + 1};grid-row:{r + 1}"></span>' for c in range(5) for r in range(5) if (c, r) not in SL)}</div></div>
                <div data-in="2" class="{C} flex items-center justify-between p-3 text-sm"><span class="text-body">Recorded externally</span><span class="font-medium text-heading" data-count="42">0</span></div>
              </div>""")

    D5 = panel(4, "journey", f"""<div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="{C} p-4"><p class="text-sm font-medium text-heading">PIA &middot; New referral portal</p><p class="text-xs text-muted">Privacy Impact Assessment</p><ol class="mt-4 grid grid-cols-5 gap-1.5">{journey(["Screening", "Assessment", "Risks", "Mitigation", "Approval"], 2)}</ol></div>
                <div data-in="2" class="{C} grid grid-cols-3 divide-x divide-line">{"".join(f'<div class="p-3"><p class="font-heading text-2xl text-heading">{n}</p><p class="text-[10px] text-muted">{l}</p></div>' for n, l in [("7", "risks logged"), ("5", "mitigated"), ("2", "for approval")])}</div>
                <div data-in="3" class="{C} flex items-center gap-3 p-3"><span class="flex size-7 items-center justify-center rounded-full bg-[var(--p-second)] text-[11px] text-white">&#10022;</span><p class="text-xs text-heading">Agent: 2 questions left in this section</p></div>
              </div>""")

    POOL = [["Password reset", "Resolved by FixIT Agent · 1 min"], ["New starter laptop", "Assigned to Service Desk · P2"], ["Teams access", "Resolved by FixIT Agent · 2 min"], ["Printer offline - Ward 3", "Escalated to on-site · P3"], ["VPN not connecting", "Guided self-service · resolved"]]
    D6 = panel(5, "audit", f"""<div class="relative w-full max-w-md text-left">
                <div data-in="1" class="{C} overflow-hidden"><div class="flex items-center justify-between border-b border-line px-4 py-3"><p class="text-sm font-medium text-heading">Service requests</p><span class="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted">{pulse("var(--p-base)")}Live</span></div>
                  <ul data-pool='{json.dumps(POOL)}' class="min-h-[13rem]">{"".join(f'<li class="flex items-center gap-3 border-b border-line px-4 py-3 last:border-b-0"><span class="size-1.5 shrink-0 bg-[var(--p-base)]"></span><div class="min-w-0 flex-1"><p data-a class="truncate text-sm text-heading">{a}</p><p data-b class="text-xs text-muted">{b}</p></div></li>' for a, b in POOL[:4])}</ul></div>
                <div data-in="3" class="absolute -right-2 -top-4 flex items-center gap-2 rounded-full bg-[var(--p-second)] px-4 py-2 text-xs font-medium text-white sm:-right-6">&#10022; FixIT Agent</div>
              </div>""")

    DIGPACKS_FV = [("Risk Management", D1), ("Safety Lens", D2), ("People &amp; HR Management", D3),
                   ("Vaccination Hub", D4), ("Privacy Impact Assessment", D5), ("IT Service Management", D6)]
    return GENO_FV, DIGPACKS_FV
