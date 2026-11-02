"""Knowledge Hub layout options (mockup).

Three full-page options on one page with a review-only switcher. Reuses the
SognosCare generator's shell, type scale and label via runpy; content is the
live Sanity dataset (kh_data.py, queried read-only). Run from the redesign
repo root:
  python3 -I <this file> docs/mockups/sognoscare docs/mockups/knowledge-hub
"""
import html
import runpy
import sys
from datetime import date
from pathlib import Path

CARE_OUT, KH_OUT = sys.argv[1], Path(sys.argv[2])
sys.argv = [sys.argv[0], CARE_OUT]
HERE = Path(__file__).parent
ns = runpy.run_path(str(HERE / "build_mockups.py"))
KH_OUT.mkdir(parents=True, exist_ok=True)
ns["page"].__globals__["OUT"] = KH_OUT
page, T, label, P = ns["page"], ns["T"], ns["label"], ns["P"]
SECTION, HEAD, GAP = ns["SECTION"], ns["HEAD"], ns["GAP"]
data = runpy.run_path(str(HERE / "kh_data.py"))
C = data["C"]

# Live copy (app/(marketing)/knowledge-hub/page.tsx + KnowledgeHubArchive).
TITLE = "Knowledge Hub"
DESC = "News, guides, case studies, and product updates - covering care operations, workforce scheduling, compliance, and the sectors we serve."
# Section order + headings as live. Category value -> section.
SECTIONS = [("news", "News"), ("insights", "Insights"), ("newsletters", "Newsletters"), ("events", "Events &amp; Webinars"), ("milestones", "Milestones")]
CAT_SECTION = {"News": "news", "Insights": "insights", "Newsletter": "newsletters", "Webinar": "events", "Milestone": "milestones"}
CAT_LABEL = {"News": "News", "Insights": "Insights", "Newsletter": "Newsletter", "Webinar": "Webinar recording", "Milestone": "Milestone"}
# SUGGESTION - no live copy exists for a newsletter sign-up; needs approval.
NL_HEAD = "Get The Sognos Pulse"
NL_SUB = "[Suggested copy] The newsletter, in your inbox."


def esc(s):
    return html.escape(s or "", quote=True)


def fmt(d):
    y, m, dd = map(int, d.split("-"))
    return date(y, m, dd).strftime("%-d %b %Y")


def img(name, w=800, h=500):
    return f"{C}{name}?w={w}&h={h}&fit=crop&auto=format"


ITEMS = [
    dict(slug=s, title=t, cat=c, sec=CAT_SECTION[c], chip=CAT_LABEL[c], excerpt=e, date=d, read=r, img=i, kind="post")
    for s, t, c, e, d, r, i in data["POSTS"]
]
EVENTS = [
    dict(slug=s, title=t, cat=fmt_, sec="events", chip=f"{fmt_} &middot; Past event", excerpt=loc, date=d, read=None, img=i, kind="event")
    for s, t, fmt_, d, loc, i in data["EVENTS"]
]
BY_SEC = {k: [x for x in ITEMS if x["sec"] == k] for k, _ in SECTIONS}
BY_SEC["events"] = EVENTS + BY_SEC["events"]


def meta(x):
    bits = ["Sognos Solutions", fmt(x["date"])] if x["kind"] == "post" else [fmt(x["date"])]
    if x.get("read"):
        bits.append(x["read"])
    return " &middot; ".join(bits)


def attrs(x):
    """Search + filter hooks on every card / row."""
    return f'data-item data-sec="{x["sec"]}" data-q="{esc((x["title"] + " " + x["excerpt"]).lower())}"'


SEARCH = lambda tone="light": f"""<label class="relative block w-full max-w-md">
          <span class="sr-only">Search the Knowledge Hub</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 {"text-white/60" if tone == "dark" else "text-muted"}" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input data-search type="search" placeholder="Search articles" class="h-12 w-full rounded-full border pl-11 pr-4 text-sm outline-none transition-colors {"border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-white/60" if tone == "dark" else "border-line bg-white text-heading placeholder:text-muted focus:border-heading"}" />
        </label>"""

NL_FORM = lambda dark=False: f"""<form class="flex w-full max-w-md flex-col gap-2 sm:flex-row" onsubmit="event.preventDefault(); this.querySelector('button').textContent = 'Subscribed &#10003;';">
          <label class="flex-1"><span class="sr-only">Email address</span><input type="email" required placeholder="Work email" class="h-12 w-full rounded-full border px-5 text-sm outline-none {"border-white/25 bg-white/10 text-white placeholder:text-white/60" if dark else "border-line bg-white text-heading placeholder:text-muted focus:border-heading"}" /></label>
          <button type="submit" class="h-12 shrink-0 rounded-full px-6 text-sm font-medium transition-colors {"bg-white text-heading hover:bg-accent hover:text-white" if dark else "bg-heading text-white hover:bg-accent"}">Subscribe</button>
        </form>"""

EMPTY = '<p data-empty hidden class="py-16 text-center text-body">No articles match that search.</p>'

STYLE = """<style>
  [data-kh-opt="1"]:not(.is-filtering) [data-extra] { display: none; }
  [data-kh-opt="1"]:not(.is-filtering) [data-past-list]:not(.is-open) [data-past-extra] { display: none; }
  [data-kh-opt="1"].is-filtering [data-past-more] { display: none; }
</style>"""
HEADER = f"""<header class="fixed inset-x-0 top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
  <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
    <img src="{P}/logos/sognos-logo.svg" alt="Sognos" class="h-6 w-auto" onerror="this.replaceWith(Object.assign(document.createElement('span'),{{textContent:'sognos',className:'font-heading text-2xl text-heading'}}))" />
    <nav class="hidden items-center gap-1 rounded-full bg-tint p-1 text-sm text-heading lg:flex">{"".join(f'<span class="rounded-full px-4 py-2">{n} <span aria-hidden="true" class="text-muted">&#8964;</span></span>' for n in ["Why Sognos", "Products", "Solutions", "Industries", "Knowledge Hub"])}</nav>
    <span class="rounded bg-heading px-4 py-2.5 text-sm font-medium text-white">Book a Demo</span>
  </div>
</header>"""


# ── Option 1 · Close to Synthesia ───────────────────────────────────────────
def card1(x, big=False):
    # Frontline card language (index Related A / capability grid): white card,
    # hairline border, p-3 frame round an inset image, copy padded px-3, a
    # footer row pinned to the bottom. Hover: border darkens, image zooms.
    return f"""<a href="#" {attrs(x)} class="group flex flex-col gap-5 rounded-lg border border-line bg-white p-3 transition-colors hover:border-heading focus-visible:outline-2 focus-visible:outline-accent">
            <div class="overflow-hidden rounded bg-tint"><img src="{img(x["img"])}" alt="" loading="lazy" class="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /></div>
            <div class="flex flex-1 flex-col px-3 pb-3">
              <p class="flex items-center gap-2 text-xs text-muted"><span class="font-medium uppercase tracking-widest text-accent-strong">{x["chip"]}</span><span aria-hidden="true">&middot;</span>{fmt(x["date"])}</p>
              <h3 class="mt-3 {T["h3sm"]} text-heading text-balance">{esc(x["title"])}</h3>
              <p class="mt-2 line-clamp-3 {T["small"]} text-body">{esc(x["excerpt"])}</p>
              <div class="mt-auto flex items-center justify-between gap-4 pt-6"><span class="text-xs text-muted">{x.get("read") or "Sognos Solutions"}</span><span class="inline-flex items-center gap-1.5 text-sm font-medium text-heading group-hover:text-accent-strong">Read more <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">&rarr;</span></span></div>
            </div>
          </a>"""


TODAY = "2026-10-24"


def event_upcoming(x, sample=False):
    # Frontline Works with A (product card): white frame on the tint section, copy column with the
    # event details pinned top / CTA bottom, image panel right.
    note = '<p class="mb-3 text-xs text-muted">Upcoming layout &middot; shown with the latest event as a sample (no upcoming events in Sanity)</p>' if sample else ""
    loc = esc(x["excerpt"])
    return f"""{note}<div {attrs(x)} class="grid grid-cols-1 items-stretch gap-3 rounded-lg bg-white p-3 md:grid-cols-2 lg:gap-4">
            <div class="flex flex-col justify-between gap-10 p-5 lg:p-8">
              <div>
                <p class="inline-flex items-center gap-2 rounded-full bg-tint px-3 py-1 text-xs font-medium text-heading"><span class="size-1.5 rounded-full bg-emerald-500"></span>Upcoming &middot; {esc(x["cat"])}</p>
                <h3 class="mt-6 {T["h3"]} text-heading text-balance">{esc(x["title"])}</h3>
              </div>
              <div>
                <dl class="divide-y divide-line border-y border-line text-sm">
                  <div class="flex justify-between gap-4 py-3"><dt class="text-muted">Date</dt><dd class="text-heading">{fmt(x["date"])}</dd></div>
                  <div class="flex justify-between gap-4 py-3"><dt class="text-muted">Where</dt><dd class="text-right text-heading">{loc}</dd></div>
                </dl>
                <div class="mt-6 flex flex-wrap items-center gap-4"><a href="#" class="inline-flex min-h-11 items-center rounded-full bg-heading px-6 text-sm font-medium text-white transition-colors hover:bg-accent">Register</a><a href="#" class="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-heading hover:text-accent-strong">Event details <span aria-hidden="true">&rarr;</span></a></div>
              </div>
            </div>
            <div class="relative min-h-[300px] overflow-hidden rounded md:min-h-[400px]"><img src="{img(x["img"], 1000, 800)}" alt="" class="absolute inset-0 size-full object-cover" /></div>
          </div>"""


def event_past(x, extra=False):
    # Option 3 index row: date column (events get the blue date block),
    # label, title, one-line excerpt, thumbnail right.
    d = date(*map(int, x["date"].split("-")))
    is_post = x["kind"] == "post"
    datecell = (f'<span class="pt-1 text-sm tabular-nums text-muted">{d.strftime("%-d %b")}</span>' if is_post else
                f'<span class="flex size-14 flex-col items-center justify-center rounded bg-accent text-white"><span class="text-lg leading-none">{d.day}</span><span class="text-[10px] uppercase tracking-widest">{d.strftime("%b")}</span></span>')
    tag = "Webinar recording" if is_post else f"{esc(x['cat'])} &middot; {esc(x['excerpt'])}"
    sub = f'<p class="mt-1 line-clamp-1 {T["small"]} text-body">{esc(x["excerpt"])}</p>' if is_post else ""
    return f"""<li {attrs(x)}{" data-past-extra" if extra else ""}><a href="#" class="group grid grid-cols-[4rem_1fr] gap-4 border-b border-line py-6 transition-colors hover:bg-white sm:grid-cols-[4.5rem_1fr_10rem] sm:gap-6 sm:px-3">
            {datecell}
            <div class="min-w-0"><p class="text-xs font-medium uppercase tracking-widest text-accent-strong">{tag}</p><h3 class="mt-1 {T["h3sm"]} text-heading text-balance group-hover:text-accent-strong md:text-xl">{esc(x["title"])}</h3>{sub}</div>
            <div class="hidden overflow-hidden rounded sm:block"><img src="{img(x["img"], 400, 260)}" alt="" loading="lazy" class="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" /></div>
          </a></li>"""


def milestone_row(x):
    # Frontline Related B (list rows): title column, clamped excerpt, image
    # thumbnail slides in on hover, round arrow button.
    return f"""<li {attrs(x)}><a href="#" class="group relative grid grid-cols-1 items-center gap-3 border-b border-line px-2 py-7 transition-colors hover:bg-tint focus-visible:outline-2 focus-visible:outline-accent md:grid-cols-[minmax(0,26rem)_minmax(0,1fr)_auto] md:gap-8 md:px-4">
            <div><p class="text-xs text-muted">{fmt(x["date"])}</p><h3 class="mt-1 {T["h3sm"]} text-heading text-balance md:text-xl">{esc(x["title"])}</h3></div>
            <p class="line-clamp-2 max-w-[52ch] {T["small"]} text-body">{esc(x["excerpt"])}</p>
            <span class="flex items-center gap-6">
              <span class="pointer-events-none hidden w-56 translate-x-3 overflow-hidden rounded opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 lg:block"><img src="{img(x["img"], 448, 256)}" alt="" loading="lazy" class="aspect-[7/4] w-full object-cover" /></span>
              <span aria-hidden="true" class="flex size-11 items-center justify-center rounded-full border border-line text-heading transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">&rarr;</span>
            </span>
          </a></li>"""


def section_body(k, items):
    if k == "events":
        upcoming = [x for x in items if x["kind"] == "event" and x["date"] >= TODAY]
        sample = not upcoming
        lead = upcoming[0] if upcoming else next(x for x in items if x["kind"] == "event")
        past = sorted([x for x in items if x is not lead], key=lambda x: x["date"], reverse=True)
        more = f'<div class="mt-8 flex justify-center"><button type="button" data-past-more class="min-h-11 rounded-full border border-line bg-white px-6 text-sm font-medium text-heading transition-colors hover:border-heading">Load more</button></div>' if len(past) > 2 else ""
        return f"""<div class="{GAP}">{event_upcoming(lead, sample)}
          <p class="mt-16 text-lg text-heading">Past events &amp; recordings</p>
          <ul data-past-list class="mt-4 border-t border-line">{"".join(event_past(x, extra=j >= 2) for j, x in enumerate(past))}</ul>{more}</div>"""
    if k == "milestones":
        return f'<ul class="{GAP} border-t border-line">{"".join(milestone_row(x) for x in items)}</ul>'
    return f"""<div class="{GAP} grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">{"".join(card1(x).replace("<a href", "<a data-extra href", 1) if j >= 3 else card1(x) for j, x in enumerate(items))}</div>"""


def nl_band():
    # Live: the newsletter's name and its welcome-post excerpt. Heading verb,
    # form labels and the note are SUGGESTED copy (no live sign-up exists).
    post = next(x for x in ITEMS if x["cat"] == "Newsletter")
    return f"""<section data-nl class="relative overflow-hidden bg-care-dark {SECTION} text-white">
      <div aria-hidden="true" class="pointer-events-none absolute inset-0" style="background: radial-gradient(55% 70% at 85% 30%, rgba(29,150,252,.28), transparent 70%), radial-gradient(45% 60% at 10% 90%, rgba(59,111,224,.3), transparent 70%)"></div>
      <div class="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-6">
          {label("Newsletter", "dark", sticky=False)}
          <h2 class="mt-4 {T["h2"]} text-white">{NL_HEAD}</h2>
          <p class="mt-4 {T["lede"]} text-white/75">{esc(post["excerpt"])}</p>
        </div>
        <div class="lg:col-span-5 lg:col-start-8">
          <div class="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur">
            <a href="#" class="group grid grid-cols-[7rem_1fr] items-center gap-4 rounded bg-white/5 p-2 pr-4 transition-colors hover:bg-white/10">
              <img src="{img(post["img"], 280, 180)}" alt="" class="aspect-[14/9] w-full rounded object-cover" />
              <div class="min-w-0"><p class="text-xs uppercase tracking-widest text-white/60">Latest edition &middot; {fmt(post["date"])}</p><p class="mt-1 truncate text-base text-white group-hover:text-accent">{esc(post["title"])}</p></div>
            </a>
            <div class="p-3 pt-5">{NL_FORM(dark=True).replace("max-w-md flex-col gap-2 sm:flex-row", "flex-col gap-2 sm:flex-row")}
              <p class="mt-3 text-xs text-white/60">[Suggested copy] One email per edition. Unsubscribe anytime.</p></div>
          </div>
        </div>
      </div>
    </section>"""


def opt1():
    feat = ITEMS[0]
    chips = "".join(
        f'<button type="button" data-cat="{k}" aria-pressed="{str(k == "all").lower()}" class="min-h-10 shrink-0 rounded-full border border-line px-4 text-sm text-heading transition-colors hover:border-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{n}</button>'
        for k, n in [("all", "All")] + SECTIONS
    )
    # Surfaces alternate by rendered order (tint first, after the white hero);
    # the newsletter band is the one dark break, before Milestones.
    secs, n_rendered = [], 0
    for k, n in SECTIONS:
        items = [x for x in BY_SEC[k] if x is not feat]
        if not items:  # e.g. Newsletters when its only post is the featured one
            continue
        bg = "bg-tint" if n_rendered % 2 == 0 else "bg-white"
        n_rendered += 1
        count = f'<span class="ml-3 align-middle text-base text-muted tabular-nums">{len(items)}</span>'
        secs.append((nl_band() if k == "milestones" else "") + f"""<section data-section="{k}" id="o1-{k}" class="scroll-mt-40 {bg} {SECTION}">
      <div class="mx-auto max-w-7xl px-6">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <h2 class="{T["h2"]} text-heading">{n}{count}</h2>
          <a href="#" class="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border border-line bg-white px-4 text-sm font-medium text-heading transition-colors hover:border-heading">View all posts <span aria-hidden="true">&rarr;</span></a>
        </div>
        {section_body(k, items)}
      </div>
    </section>""")
    return f"""<div data-kh-opt="1">
  <section class="bg-white pt-36 pb-16 md:pt-44 md:pb-20">
    <div class="mx-auto grid max-w-7xl grid-cols-1 items-end gap-8 px-6 md:grid-cols-2">
      <div><h1 class="{T["h1"]} text-heading">{TITLE}</h1><p class="mt-5 {T["herosub"]} text-body">{DESC}</p></div>
      <div class="md:justify-self-end md:w-full md:max-w-md">{SEARCH()}</div>
    </div>
    <div class="mx-auto mt-14 max-w-7xl px-6">
      <a href="#" {attrs(feat)} data-noreveal class="group grid grid-cols-1 items-stretch gap-3 rounded-lg bg-tint p-3 md:grid-cols-[3fr_2fr] lg:gap-4">
        <div class="overflow-hidden rounded"><img src="{img(feat["img"], 1400, 700)}" alt="" class="aspect-[2/1] size-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" /></div>
        <div class="flex flex-col justify-between gap-8 p-5 lg:p-8">
          <div><p class="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-heading"><span class="size-1.5 bg-accent"></span>Featured &middot; {feat["chip"]}</p>
          <h2 class="mt-6 {T["h2"]} text-heading">{esc(feat["title"])}</h2><p class="mt-4 line-clamp-4 {T["body"]} text-body">{esc(feat["excerpt"])}</p></div>
          <div class="flex items-center justify-between gap-4 border-t border-line pt-5"><span class="text-sm text-muted">{meta(feat)}</span><span class="inline-flex items-center gap-1.5 text-sm font-medium text-heading group-hover:text-accent-strong">Read more <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">&rarr;</span></span></div>
        </div>
      </a>
    </div>
  </section>
  <div class="sticky top-20 z-40 border-y border-line bg-white/95 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-6 py-3"><p class="mr-3 hidden shrink-0 text-sm text-muted sm:block">Explore by category</p>{chips}</div>
  </div>
  {"".join(secs)}
  <div class="mx-auto max-w-7xl px-6">{EMPTY}</div>
</div>"""


# ── Option 2 · Editorial magazine ───────────────────────────────────────────
def card2(x, big=False):
    if big:
        return f"""<a href="#" {attrs(x)} class="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-lg md:col-span-2 md:row-span-2">
            <img src="{img(x["img"], 1200, 900)}" alt="" class="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <span class="absolute inset-0 bg-gradient-to-t from-care-dark/90 via-care-dark/30 to-transparent"></span>
            <div class="relative p-6 md:p-8"><p class="{T["small"]} text-white/75">{x["chip"]}</p><h3 class="mt-2 {T["h3"]} text-white text-balance">{esc(x["title"])}</h3><p class="mt-3 text-xs text-white/75">{meta(x)}</p></div>
          </a>"""
    return f"""<a href="#" {attrs(x)} class="group flex flex-col rounded-lg border border-line bg-white p-3 transition-colors hover:border-heading">
            <div class="overflow-hidden rounded"><img src="{img(x["img"])}" alt="" loading="lazy" class="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /></div>
            <div class="flex flex-1 flex-col px-2 pb-2 pt-4"><p class="text-xs font-medium uppercase tracking-widest text-accent-strong">{x["chip"]}</p><h3 class="mt-2 {T["h3sm"]} text-heading text-balance">{esc(x["title"])}</h3><p class="mt-auto pt-4 text-xs text-muted">{meta(x)}</p></div>
          </a>"""


def opt2():
    lead, latest = ITEMS[0], ITEMS[1:5]
    rest = [x for x in ITEMS if x not in [lead] + latest and x["sec"] != "events"]
    grid = []
    for k, x in enumerate(rest):
        grid.append(card2(x, big=(k == 0)))
        if k == 4:
            grid.append(f"""<div data-nl class="flex flex-col justify-between gap-8 rounded-lg bg-accent p-6 text-white md:p-8"><div><p class="{T["h3"]} text-white">{NL_HEAD}</p><p class="mt-2 {T["small"]} text-white/80">{NL_SUB}</p></div>{NL_FORM(dark=True).replace("max-w-md flex-col gap-2 sm:flex-row", "flex-col gap-2")}</div>""")
    tabs = "".join(
        f'<button type="button" data-cat="{k}" aria-pressed="{str(k == "all").lower()}" class="relative shrink-0 py-4 text-sm text-muted transition-colors hover:text-heading aria-pressed:text-heading aria-pressed:after:absolute aria-pressed:after:inset-x-0 aria-pressed:after:bottom-0 aria-pressed:after:h-0.5 aria-pressed:after:bg-accent">{n}</button>'
        for k, n in [("all", "All")] + [s for s in SECTIONS if s[0] != "events"]
    )
    timeline = BY_SEC["events"]
    return f"""<div data-kh-opt="2" hidden>
  <section class="relative bg-care-dark pt-36 pb-16 text-white md:pt-44 md:pb-20">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0" style="background: radial-gradient(60% 50% at 15% 20%, rgba(59,111,224,.35), transparent 70%)"></div>
    <div class="relative mx-auto max-w-7xl px-6">
      <div class="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><h1 class="{T["h1"]} text-white">{TITLE}</h1><p class="mt-5 {T["herosub"]} text-white/75">{DESC}</p></div>{SEARCH("dark")}</div>
      <div class="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <a href="#" {attrs(lead)} class="group lg:col-span-7"><div class="overflow-hidden rounded-lg"><img src="{img(lead["img"], 1400, 700)}" alt="" class="aspect-[2/1] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" /></div><p class="mt-5 {T["small"]} text-white/60">{lead["chip"]}</p><h2 class="mt-2 {T["h2"]} text-white">{esc(lead["title"])}</h2><p class="mt-3 line-clamp-2 {T["body"]} text-white/75">{esc(lead["excerpt"])}</p></a>
        <div class="lg:col-span-5"><p class="border-b border-white/15 pb-4 text-sm text-white/60">Latest</p>
          <ul>{"".join(f'''<li><a href="#" {attrs(x)} class="group grid grid-cols-[6rem_1fr] gap-4 border-b border-white/15 py-5"><img src="{img(x["img"], 240, 180)}" alt="" class="aspect-[4/3] w-full rounded object-cover" /><div><p class="text-xs text-white/60">{x["chip"]} &middot; {fmt(x["date"])}</p><p class="mt-1 line-clamp-2 text-base text-white transition-colors group-hover:text-accent">{esc(x["title"])}</p></div></a></li>''' for x in latest)}</ul>
        </div>
      </div>
    </div>
  </section>
  <div class="sticky top-20 z-40 border-b border-line bg-white/95 backdrop-blur"><div class="mx-auto flex max-w-7xl gap-8 overflow-x-auto px-6">{tabs}</div></div>
  <section class="bg-white py-16 md:py-20"><div class="mx-auto max-w-7xl px-6">
    <div data-grid class="grid grid-cols-1 gap-4 md:grid-cols-3 [&>[data-extra]]:hidden [&.is-open>[data-extra]]:flex">{"".join(g.replace("<a href", "<a data-extra href", 1) if k >= 12 else g for k, g in enumerate(grid))}</div>
    {EMPTY}
    <div class="mt-10 flex justify-center"><button type="button" data-more class="rounded-full border border-line px-6 py-3 text-sm font-medium text-heading hover:border-heading">Load more</button></div>
  </div></section>
  <section data-section="events" class="bg-tint py-16 md:py-20"><div class="mx-auto max-w-7xl px-6">
    <h2 class="{T["h2"]} text-heading">Events &amp; Webinars</h2>
    <ol class="relative mt-12 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
      <span aria-hidden="true" class="absolute left-0 right-0 top-[7px] hidden h-px bg-line md:block"></span>
      {"".join(f'''<li {attrs(x)} class="relative"><span class="relative block size-[15px] rounded-full border-2 border-tint {"bg-accent" if x["kind"] == "event" else "bg-heading"}"></span>
        <p class="mt-5 text-xs uppercase tracking-widest text-muted">{fmt(x["date"])}</p>
        <a href="#" class="group mt-3 block"><img src="{img(x["img"], 600, 380)}" alt="" class="aspect-[16/10] w-full rounded-lg object-cover" /><p class="mt-4 text-xs font-medium text-accent-strong">{x["chip"] if x["kind"] == "post" else esc(x["cat"]) + " &middot; " + esc(x["excerpt"])}</p><h3 class="mt-1 {T["h3sm"]} text-heading text-balance group-hover:text-accent-strong">{esc(x["title"])}</h3></a></li>''' for x in sorted(timeline, key=lambda x: x["date"]))}
    </ol>
  </div></section>
</div>"""


# ── Option 3 · Index with side rail ─────────────────────────────────────────
def opt3():
    feat = ITEMS[0]
    allx = sorted([x for x in ITEMS if x is not feat] + EVENTS, key=lambda x: x["date"], reverse=True)
    counts = {k: sum(1 for x in allx if x["sec"] == k) for k, _ in SECTIONS}
    rail = "".join(
        f'<li><button type="button" data-cat="{k}" aria-pressed="{str(k == "all").lower()}" class="flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm text-body transition-colors hover:bg-tint aria-pressed:bg-heading aria-pressed:text-white"><span>{n}</span><span class="text-xs opacity-60">{len(allx) if k == "all" else counts[k]}</span></button></li>'
        for k, n in [("all", "All")] + SECTIONS
    )
    rows, month = [], None
    for x in allx:
        m = date(*map(int, x["date"].split("-"))).strftime("%B %Y")
        if m != month:
            rows.append(f'<li data-month class="pt-10 first:pt-0"><p class="border-b border-heading pb-3 text-sm font-medium text-heading">{m}</p></li>')
            month = m
        d = date(*map(int, x["date"].split("-")))
        is_event = x["kind"] == "event"
        datecell = (f'<span class="flex size-14 flex-col items-center justify-center rounded bg-accent text-white"><span class="text-lg leading-none">{d.day}</span><span class="text-[10px] uppercase tracking-widest">{d.strftime("%b")}</span></span>'
                    if is_event else f'<span class="pt-1 text-sm tabular-nums text-muted">{d.strftime("%d %b")}</span>')
        rows.append(f"""<li {attrs(x)}><a href="#" class="group grid grid-cols-[4rem_1fr] gap-4 border-b border-line py-6 transition-colors hover:bg-tint sm:grid-cols-[4.5rem_1fr_9rem] sm:gap-6 sm:px-2">
          {datecell}
          <div class="min-w-0"><p class="text-xs font-medium uppercase tracking-widest text-accent-strong">{x["chip"] if not is_event else esc(x["cat"]) + " &middot; " + esc(x["excerpt"])}</p><h3 class="mt-1 {T["h3sm"]} text-heading text-balance group-hover:text-accent-strong">{esc(x["title"])}</h3>{"" if is_event else f'<p class="mt-1 line-clamp-1 {T["small"]} text-body">{esc(x["excerpt"])}</p>'}</div>
          <img src="{img(x["img"], 360, 240)}" alt="" loading="lazy" class="hidden aspect-[3/2] w-full rounded object-cover sm:block" />
        </a></li>""")
    return f"""<div data-kh-opt="3" hidden>
  <section class="bg-white pt-36 pb-10 md:pt-44"><div class="mx-auto max-w-7xl px-6"><h1 class="{T["h1"]} text-heading">{TITLE}</h1><p class="mt-5 {T["herosub"]} text-body">{DESC}</p></div></section>
  <section class="bg-white pb-24"><div class="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8">
    <aside class="lg:col-span-3"><div class="space-y-8 lg:sticky lg:top-28">
      {SEARCH()}
      <div>{label("Categories", sticky=False)}<ul class="mt-4 space-y-1">{rail}</ul></div>
      <div data-nl class="rounded-lg bg-tint p-5"><p class="{T["h3sm"]} text-heading">{NL_HEAD}</p><p class="mt-1 text-xs text-muted">{NL_SUB}</p><div class="mt-4">{NL_FORM().replace("max-w-md flex-col gap-2 sm:flex-row", "flex-col gap-2")}</div></div>
    </div></aside>
    <div class="lg:col-span-9">
      <a href="#" {attrs(feat)} class="group grid grid-cols-1 items-center gap-6 rounded-lg bg-tint p-3 md:grid-cols-[2fr_3fr]">
        <img src="{img(feat["img"], 900, 600)}" alt="" class="aspect-[3/2] w-full rounded object-cover" />
        <div class="p-3 md:p-5"><p class="text-xs font-medium uppercase tracking-widest text-accent-strong">Featured &middot; {feat["chip"]}</p><h2 class="mt-2 {T["h3"]} text-heading">{esc(feat["title"])}</h2><p class="mt-3 line-clamp-3 {T["small"]} text-body">{esc(feat["excerpt"])}</p><p class="mt-4 text-xs text-muted">{meta(feat)}</p></div>
      </a>
      <ul class="mt-12">{"".join(rows)}</ul>
      {EMPTY}
    </div>
  </div></section>
</div>"""


OPTS = [("1", "Synthesia close"), ("2", "Editorial"), ("3", "Index + rail")]
SWITCH = """<div class="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-care-dark/90 p-1 text-xs text-white backdrop-blur">""" + "".join(
    f'<button type="button" data-opt-pick="{k}" aria-pressed="{str(k == "1").lower()}" class="rounded-full px-3.5 py-2 transition-colors hover:bg-white/10 aria-pressed:bg-white aria-pressed:text-care-dark">{k} &middot; {n}</button>' for k, n in OPTS) + "</div>"

JS = """<script>
  (() => {
    // Option switcher (review-only, remembered).
    const pick = (k) => {
      document.querySelectorAll("[data-kh-opt]").forEach((el) => (el.hidden = el.dataset.khOpt !== k));
      document.querySelectorAll("[data-opt-pick]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.optPick === k)));
      try { localStorage.setItem("sognos-kh-opt", k); } catch {}
      scrollTo(0, 0);
    };
    document.querySelectorAll("[data-opt-pick]").forEach((b) => b.addEventListener("click", () => pick(b.dataset.optPick)));
    let s = null; try { s = localStorage.getItem("sognos-kh-opt"); } catch {} if (s) pick(s);

    // Per option: search (title + excerpt) and category filter, combined.
    document.querySelectorAll("[data-kh-opt]").forEach((root) => {
      let cat = "all", q = "";
      const apply = () => {
        const filtering = cat !== "all" || q;
        root.classList.toggle("is-filtering", !!filtering);
        root.querySelectorAll("[data-item]").forEach((el) => {
          el.hidden = !((cat === "all" || el.dataset.sec === cat) && (!q || el.dataset.q.includes(q)));
        });
        // Sections with nothing left disappear (option 1); month headers too (option 3).
        root.querySelectorAll("[data-section]").forEach((sec) => (sec.hidden = !sec.querySelector("[data-item]:not([hidden])")));
        root.querySelectorAll("[data-month]").forEach((m) => {
          let n = m.nextElementSibling, any = false;
          while (n && !n.hasAttribute("data-month")) { if (!n.hidden) any = true; n = n.nextElementSibling; }
          m.hidden = !any;
        });
        root.querySelectorAll("[data-nl]").forEach((el) => (el.hidden = !!filtering));
        const grid = root.querySelector("[data-grid]"); if (grid && filtering) grid.classList.add("is-open");
        const more = root.querySelector("[data-more]"); if (more) more.hidden = !!filtering || grid.classList.contains("is-open");
        const empty = root.querySelector("[data-empty]"); if (empty) empty.hidden = !!root.querySelector("[data-item]:not([hidden])");
      };
      root.querySelectorAll("[data-cat]").forEach((b) => b.addEventListener("click", () => {
        cat = b.dataset.cat;
        root.querySelectorAll("[data-cat]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        apply();
      }));
      root.querySelectorAll("[data-search]").forEach((i) => i.addEventListener("input", () => { q = i.value.trim().toLowerCase(); apply(); }));
      const pastMore = root.querySelector("[data-past-more]");
      if (pastMore) pastMore.addEventListener("click", () => { root.querySelector("[data-past-list]").classList.add("is-open"); pastMore.parentElement.remove(); });
      const more = root.querySelector("[data-more]");
      if (more) more.addEventListener("click", () => { root.querySelector("[data-grid]").classList.add("is-open"); more.hidden = true; });
    });

    // Subtle scroll-in for cards.
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = "none"; io.unobserve(e.target); } }), { threshold: 0, rootMargin: "0px 0px -8% 0px" });
      document.querySelectorAll("[data-item]:not([data-noreveal])").forEach((el) => { el.style.opacity = 0; el.style.transform = "translateY(12px)"; el.style.transition = "opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1)"; io.observe(el); });
    }
  })();
</script>"""

NOTE = """Knowledge Hub layout options 2026-10-24 (reference: synthesia.io/blog). Live Sanity content (development dataset, read-only), live title/description/section names.
1 Synthesia close: light hero + search, large featured post, sticky "Explore by category" chips (filter in place), News/Insights/Newsletters in Frontline-style cards (rows of 3 + View all), Events as a Works-with-A product card (upcoming) + reduced rows (past/recordings), Milestones as Related-B list rows, newsletter band before Milestones.
2 Editorial: dark hero with lead + Latest list, sticky tabs filtering one mixed grid (lead tile spans 2x2, newsletter tile, Load more), events timeline.
3 Index + rail: sticky left rail (search, categories with counts, newsletter), featured card, dense rows grouped by month, events with date blocks.
Search matches title + excerpt across every post and combines with the category filter (option 1 shows 3 per section until you search or filter). Newsletter copy is a SUGGESTION (no live copy). Customer stories excluded, as live.
Maps to: components/layout/sections/KnowledgeHubArchive.tsx (+ page.tsx query unchanged)."""

if __name__ == "__main__":  # legacy switcher index; build_kh_insp.py writes the Inspector index
    page("index.html", "Knowledge Hub - layout options", NOTE, STYLE + HEADER + opt1() + opt2() + opt3() + SWITCH + JS)
    print("wrote", KH_OUT / "index.html")
