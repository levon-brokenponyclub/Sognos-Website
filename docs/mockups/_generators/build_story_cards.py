"""Customer-story card image options (mockup).

Writes docs/mockups/customer-stories/card-images.html. Run from the redesign
repo root:  python3 -I <this file> docs/mockups/customer-stories
"""
import sys
from pathlib import Path

OUT = Path(sys.argv[1])
P = "../../../public"

# Brand colours sampled from each logo file (mean of the dominant hue
# cluster) — confirm against the customers' brand guides before shipping.
# accent = the logo's secondary colour, or a light mix of the base.
STORIES = [
    ("flourish-australia", "Flourish Australia", "Transforming Service Operations with Microsoft Dynamics 365", "13 Aug 2024", "/logos/flourish-australia-logo.png", "#01a77f", "#9be3c9", "Mental health"),
    ("auckland-airport", "Auckland Airport", "Expanding Digital Capabilities with Microsoft Dynamics 365 and Power Platform", "10 Jun 2024", "/logos/auckland-airport-logo.png", "#141c6b", "#7f86c9", "Transport"),
    ("penrith-city-council", "Penrith City Council", "Transforming Field Operations with a Custom Dynamics 365 Solution", "20 Mar 2024", "/logos/penrith-city-council-logo.png", "#f66622", "#ffc29f", "Local government"),
    ("gentari", "Gentari Solar Australia", "End-to-End Asset Management with Microsoft Dynamics 365 Field Service", "5 Nov 2024", "/logos/gentari-logo-rect.webp", "#3b1a6e", "#02c9e9", "Energy"),
    ("all-purpose-pumps", "All Purpose Pumps", "From System Repair to Strategic Technology Partnership", "15 May 2024", "/logos/all-purpose-pumps-logo.webp", "#e68220", "#ffd9a8", "Industrial services"),
    ("asset-security-concepts", "Asset Security Concepts", "A Unified Platform for Growth with Dynamics 365 and Business Central", "22 Apr 2024", "/logos/asc-logo.webp", "#0569a5", "#7cc4ee", "Security"),
    ("neca", "NECA", "Transforming Operations with Microsoft Dynamics 365 and Power Platform", "10 Feb 2024", "/logos/neca-logo.webp", "#035dad", "#7fb3e6", "Industry body"),
    ("natural-power-solutions", "Natural Power Solutions", "End-to-End Digital Transformation with Dynamics 365", "18 Jan 2024", "/logos/nps-logo.webp", "#0269b3", "#f0b400", "Energy"),
]

OPTIONS = {
    "a": ("Halftone glow", "Brand base; a soft accent glow from the top-right; a white dot grid that fades out from one corner and drifts on hover. White logo centred."),
    "b": ("Logo echo", "Brand base; the customer's own logo blown up ~4x as a cropped, rotated watermark at 9% white, over a fine line grid. White logo bottom-left with the sector as a small label - most ownable, reads as editorial."),
    "c": ("Facets + tile", "Brand base cut into diagonal facets (darker / lighter mixes of the brand colour) with light film grain; the full-colour logo sits on a white tile - keeps multi-colour marks (Gentari, NPS) true."),
}

CSS = """
@font-face { font-family: "AngelList"; src: url("../../../public/app/AngelList.woff2") format("woff2"); font-weight: 100 900; font-display: swap; }
:root { --heading:#0f1936; --body:#152248; --muted:#68706f; --line:#e2e8f0; --tint:#f9fafe; --accent:#1d96fc; }
* { box-sizing: border-box; }
body { margin:0; font-family:"AngelList", ui-sans-serif, system-ui, sans-serif; color:var(--body); background:#fff; -webkit-font-smoothing:antialiased; }
.wrap { max-width:1280px; margin:0 auto; padding:0 24px; }
header.top { position:sticky; top:0; z-index:10; background:rgba(255,255,255,.95); backdrop-filter:blur(8px); border-bottom:1px solid var(--line); }
header.top .wrap { display:flex; gap:8px; align-items:center; flex-wrap:wrap; padding-top:12px; padding-bottom:12px; }
header.top strong { margin-right:12px; font-weight:500; color:var(--heading); }
header.top a { font-size:12px; color:var(--heading); text-decoration:none; border:1px solid var(--line); border-radius:999px; padding:6px 12px; }
header.top a:hover { border-color:var(--heading); }
section.opt { padding:72px 0 24px; }
h1 { font-weight:400; font-size:36px; line-height:1.2; letter-spacing:-.01em; color:var(--heading); margin:48px 0 8px; }
h2 { font-weight:400; font-size:30px; line-height:1.2; letter-spacing:-.01em; color:var(--heading); margin:0; }
.lede { max-width:42rem; font-size:16px; line-height:1.6; color:var(--muted); margin:8px 0 0; }
.grid { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:16px 24px; margin-top:40px; }
@media (max-width:900px) { .grid { grid-template-columns:repeat(2, minmax(0,1fr)); } }
@media (max-width:600px) { .grid { grid-template-columns:1fr; } }
.story { text-decoration:none; color:inherit; display:flex; flex-direction:column; }
.meta { margin-top:16px; font:12px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; color:var(--muted); text-transform:uppercase; letter-spacing:.06em; }
.title { margin-top:8px; font-size:18px; line-height:1.4; color:var(--heading); }
.scale { display:flex; gap:24px; align-items:flex-end; margin-top:32px; flex-wrap:wrap; }
.scale > div { flex:none; }
.scale p { font:12px ui-monospace, monospace; color:var(--muted); margin:8px 0 0; }

/* ── Card image base: 16:9, container-query sized so every layer scales ── */
.ci { --b:#333; --a:#999; position:relative; aspect-ratio:16/9; overflow:hidden; border-radius:8px; background:var(--b); container-type:inline-size; isolation:isolate; }
.ci .logo { position:absolute; z-index:3; object-fit:contain; }
.ci .white { filter:brightness(0) invert(1); }
.ci > * { transition: transform .8s cubic-bezier(.22,1,.36,1), opacity .8s; }
@media (prefers-reduced-motion: reduce) { .ci > *, .ci * { transition:none !important; animation:none !important; } }

/* A · Halftone glow */
.ci.a { background:
  radial-gradient(90% 120% at 100% 0%, color-mix(in srgb, var(--a) 55%, transparent), transparent 60%),
  radial-gradient(80% 90% at 0% 100%, color-mix(in srgb, var(--b) 60%, black), transparent 70%),
  var(--b); }
.ci.a .dots { position:absolute; inset:-10%; z-index:1;
  background-image: radial-gradient(circle, rgba(255,255,255,.28) 0 1.1cqw, transparent 1.25cqw);
  background-size: 4.4cqw 4.4cqw;
  -webkit-mask-image: radial-gradient(75% 85% at 85% 15%, #000 0%, transparent 70%);
          mask-image: radial-gradient(75% 85% at 85% 15%, #000 0%, transparent 70%); }
.ci.a .logo { left:50%; top:50%; width:46cqw; height:16cqw; transform:translate(-50%,-50%); }
.story:hover .ci.a .dots { transform: translate(-3cqw, 3cqw); }
.story:hover .ci.a .logo { transform: translate(-50%,-50%) scale(1.04); }

/* B · Logo echo */
.ci.b { background:
  linear-gradient(160deg, color-mix(in srgb, var(--b) 85%, white) 0%, var(--b) 45%, color-mix(in srgb, var(--b) 70%, black) 100%); }
.ci.b .grid-lines { position:absolute; inset:0; z-index:1; opacity:.5;
  background-image: linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
  background-size: 8cqw 8cqw; }
.ci.b .echo { position:absolute; z-index:2; right:-34cqw; top:-14cqw; width:150cqw; height:62cqw; object-fit:contain; opacity:.09; transform:rotate(-12deg); filter:brightness(0) invert(1); }
.ci.b .logo { left:6cqw; bottom:7cqw; width:34cqw; height:11cqw; object-position:left bottom; }
.ci.b .tag { position:absolute; z-index:3; left:6cqw; top:6cqw; display:flex; align-items:center; gap:1.6cqw; font-size:max(10px, 2.6cqw); color:rgba(255,255,255,.85); letter-spacing:.02em; }
.ci.b .tag::before { content:""; width:1.8cqw; height:1.8cqw; min-width:6px; min-height:6px; background:var(--a); }
.story:hover .ci.b .echo { transform: rotate(-12deg) translate(-4cqw, 2cqw); opacity:.14; }

/* C · Facets + tile */
.ci.c { background:
  linear-gradient(115deg, transparent 0 38%, color-mix(in srgb, var(--b) 78%, black) 38% 62%, transparent 62%),
  linear-gradient(115deg, color-mix(in srgb, var(--b) 82%, white) 0 22%, transparent 22%),
  linear-gradient(65deg, transparent 0 70%, color-mix(in srgb, var(--a) 45%, var(--b)) 70% 100%),
  var(--b); }
.ci.c .grain { position:absolute; inset:0; z-index:1; opacity:.18; mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
.ci.c .tile { position:absolute; z-index:2; left:50%; top:50%; width:52cqw; height:24cqw; transform:translate(-50%,-50%); background:#fff; border-radius:max(4px, 1.4cqw); }
.ci.c .logo { left:50%; top:50%; width:40cqw; height:13cqw; transform:translate(-50%,-50%); }
.story:hover .ci.c .tile { transform:translate(-50%,-50%) scale(1.04); }
.story:hover .ci.c .logo { transform:translate(-50%,-50%) scale(1.04); }
"""


def card_image(opt, s):
    slug, company, title, date, logo, base, acc, sector = s
    style = f'style="--b:{base};--a:{acc}"'
    src = P + logo
    if opt == "a":
        inner = f'<div class="dots"></div><img class="logo white" src="{src}" alt="{company}">'
    elif opt == "b":
        inner = f'<div class="grid-lines"></div><img class="echo" src="{src}" alt=""><span class="tag">{sector}</span><img class="logo white" src="{src}" alt="{company}">'
    else:
        inner = f'<div class="grain"></div><div class="tile"></div><img class="logo" src="{src}" alt="{company}">'
    return f'<div class="ci {opt}" {style}>{inner}</div>'


def story_card(opt, s):
    return f'<a class="story" href="#">{card_image(opt, s)}<p class="meta">{s[3]} &middot; 4 min read</p><p class="title">{s[1]}: {s[2]}</p></a>'


sections = []
for opt, (name, note) in OPTIONS.items():
    cards = "".join(story_card(opt, s) for s in STORIES)
    demo = STORIES[2]
    scale = "".join(f'<div style="width:{w}px">{card_image(opt, demo)}<p>{w}px</p></div>' for w in (200, 360, 640))
    sections.append(f'''<section class="opt" id="opt-{opt}"><div class="wrap">
  <h2>Option {opt.upper()} &middot; {name}</h2>
  <p class="lede">{note}</p>
  <div class="grid">{cards}</div>
  <div class="scale">{scale}</div>
</div></section>''')

nav = "".join(f'<a href="#opt-{k}">{k.upper()} &middot; {n}</a>' for k, (n, _) in OPTIONS.items())
html = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Customer story card images - options</title>
<!--
Customer story card images, 3 options (2026-10-24). Pure CSS on a 16:9 box - no raster backgrounds, so one
component scales from thumbnail to hero: every layer is sized in container-query units (cqw).
Inputs per story: logo file + brand base (--b) + accent (--a). Brand colours are sampled from the logo files - confirm
against brand guides. Hover: subtle layer drift (off under reduced motion).
Maps to: a <StoryCardImage brand accent logo variant /> component replacing the photo + dark overlay in
app/(marketing)/customer-stories/page.tsx (StoryCard, FeaturedCard) and the homepage CustomerStories.
-->
<style>{CSS}</style></head>
<body>
<header class="top"><div class="wrap"><strong>Customer story card images</strong>{nav}</div></header>
<div class="wrap"><h1>Card image options</h1><p class="lede">Logo + customer brand colour + one background effect each. All CSS, container-query sized - shown at archive size, then at 200 / 360 / 640px to prove scaling.</p></div>
{"".join(sections)}
</body></html>"""
OUT.mkdir(parents=True, exist_ok=True)
(OUT / "card-images.html").write_text(html)
print("wrote", OUT / "card-images.html")
