"""Section / footer-row tones for docs/mockups/products. tone_css(attr, scope)
returns every tone rule for one controllable block:
  html[data-<attr>="<tone>"] <scope> > section { ... } + text / line / card adaptation.
Cards (.rounded*.bg-white / bg-tint), motion panels (.fv) and photo overlays ([data-keep]) keep their colours.
"""

TONES = [
    ("auto", "Auto"), ("white", "White"), ("gray", "Gray #f3f4f6"), ("stint", "Sognos tint #f9fafe"), ("ptint", "Product tint"),
    ("accent", "Accent #1e96fc"), ("product", "Product"), ("dark", "Dark"), ("grad", "Gradient"), ("glow", "Glow · SognosCare index"),
    # Sognos brand colours (sognos-tint #f9fafe is "stint" above)
    ("navydk", "sognos-navy-darkest #060e28"), ("navy", "sognos-navy #152248"), ("blue", "sognos-blue-accent #1d96fc"), ("heading", "sognos-heading #0f1936"),
]
BG = {"white": "#fff", "gray": "#f3f4f6", "stint": "#f9fafe", "ptint": "var(--p-soft)", "accent": "#1e96fc",
      "product": "var(--p-base)", "dark": "var(--p-deep)", "grad": "var(--p-grad)",
      "navydk": "#060e28", "navy": "#152248", "blue": "#1d96fc", "heading": "#0f1936",
      # SognosCare index hero (HERO_BG): two soft radial glows over the deep colour, product-tinted
      "glow": "radial-gradient(70% 60% at 20% 30%, color-mix(in srgb, var(--p-base) 35%, transparent), transparent 70%), radial-gradient(60% 50% at 85% 70%, color-mix(in srgb, var(--p-dark) 60%, transparent), transparent 70%), var(--p-deep)"}
LIGHT_TEXT = {"accent", "product", "dark", "grad", "glow", "navydk", "navy", "blue", "heading"}
X = ":not(.bg-white, .rounded-lg.bg-white *, .rounded.bg-white *, .rounded-lg.bg-tint *, .fv *, [data-keep] *, [data-keep])"


def tone_css(attr, scope):
    out = []
    for t, bg in BG.items():
        P = f'html[data-{attr}="{t}"] {scope}'
        light = t in LIGHT_TEXT
        fg = "#fff" if light else "#0f1936"
        out.append(f"  {P} section:not(section section), {P}:is(section) {{ background: {bg} !important; color: {fg}; }}")
        out.append(f"  {P} :is(.text-heading, .text-body, .text-muted, h1, h2, h3){X} {{ color: {fg} !important; }}")
        out.append(f"  {P} :is(.text-muted, .text-body){X} {{ opacity: .82; }}")
        out.append(f"  {P} :is(.border-line, .divide-line > *):not(.rounded-lg.bg-white, .rounded-lg.bg-white *, .fv *) {{ border-color: {'rgb(255 255 255 / .16)' if light else '#e2e8f0'} !important; }}")
        if light:
            if t in ("accent", "product", "blue"):
                out.append(f'  {P} [class*="text-[var(--p-"]:not(.fv *, .rounded-lg.bg-white *, .rounded.bg-white *) {{ color: rgb(255 255 255 / .85) !important; }}')
                out.append(f'  {P} [class*="bg-[var(--p-base)]"]:not(.fv *, .fv) {{ background: #fff !important; }}')
                out.append(f'  {P} :is(button, a)[class*="bg-[var(--p-base)]"], {P} :is(button, a)[class*="bg-heading"], {P} :is(button, a)[class*="bg-accent"] {{ color: #0f1936 !important; background: #fff !important; }}')
            out.append(f"  {P} :is(.p-glow, .p-grid) {{ opacity: .5; }}")
        else:
            out.append(f'  {P} [class*="text-white"]:not(button, .fv *, [data-keep], [data-keep] *, [style*="--p-grad"], [style*="--p-grad"] *, [class*="bg-[var(--p-base)]"], [class*="bg-[var(--p-dark)]"] *, [class*="bg-accent"]) {{ color: #0f1936 !important; }}')
            out.append(f'  {P} [class*="bg-white/"]:not(.fv *, [data-keep], [data-keep] *) {{ background: #fff !important; }}')
            out.append(f'  {P} [class*="border-white/"]:not(.fv *, [data-keep], [data-keep] *) {{ border-color: #e2e8f0 !important; }}')
            out.append(f'  {P} [class*="text-[var(--p-accent)]"]:not(.fv *) {{ color: var(--p-ink) !important; }}')
            out.append(f"  {P} :is(.p-glow, .p-grid) {{ display: none; }}")
            out.append(f'  {P} img[class*="brightness-0"][class*="invert"]:not(.fv *, [data-keep] *) {{ filter: none; }}')
    return "\n".join(out)
