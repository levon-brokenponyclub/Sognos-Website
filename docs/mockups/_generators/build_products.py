"""Product pages (Care, Roster, Genogram, DigPacks) - three system directions.
  python3 -I <this file> docs/mockups/sognoscare docs/mockups/products
Writes index.html (product + direction switchers) and care/roster/genogram/digpacks.html.
"""
import re
import runpy
import sys
from pathlib import Path

CARE_OUT, OUT = sys.argv[1], Path(sys.argv[2])
sys.argv = [sys.argv[0], CARE_OUT]
ns = runpy.run_path(str(Path(__file__).with_name("build_mockups.py")))
OUT.mkdir(parents=True, exist_ok=True)
page = ns["page"]
page.__globals__["OUT"] = OUT
T, P = ns["T"], ns["P"]

FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--p-base)]"
ARR = '<span aria-hidden="true">&#8599;</span>'

# ── Product token ladder (refined within each hue; DigPacks per brand guide) ──
TOKENS = {
    "care": dict(deep="#0b1430", dark="#0f1936", base="#3b6fe0", accent="#8ea8f0", soft="#eef3fd", tint="#dfe7fb", ink="#2a55c4", glow="rgba(59,111,224,.45)",
                 grad="linear-gradient(135deg,#0f1936 0%,#203e71 55%,#3b6fe0 100%)", second="#1d96fc"),
    "roster": dict(deep="#03112f", dark="#104b90", base="#1d96fc", accent="#59bbf7", soft="#eef8fe", tint="#d9effd", ink="#0b6fc4", glow="rgba(29,150,252,.40)",
                   grad="linear-gradient(135deg,#03112f 0%,#104b90 55%,#1d96fc 100%)", second="#59bbf7"),
    "genogram": dict(deep="#1a0224", dark="#3a0f45", base="#91278c", accent="#d9a6d6", soft="#f8eef8", tint="#efdcee", ink="#7a1f75", glow="rgba(145,39,140,.45)",
                     grad="linear-gradient(135deg,#1a0224 0%,#4a1670 55%,#91278c 100%)", second="#c084c9"),
    # DigPacks Brand Guidelines v1.0 (Mar 2025): primary #B8166E, secondary #005EB8, grey #4C4C4C,
    # magenta -> plum gradient (cover). Tints from the guide's 25/50/75% steps.
    "digpacks": dict(deep="#2a0a22", dark="#5a1e4a", base="#b8166e", accent="#e8a6c8", soft="#fbeef5", tint="#f3d3e4", ink="#9a1259", glow="rgba(184,22,110,.45)",
                     grad="linear-gradient(135deg,#b8166e 0%,#8a1a5e 50%,#5a1e4a 100%)", second="#005eb8"),
}
TOKENS["sognos"] = dict(deep="#0b1430", dark="#0f1936", base="#1e96fc", accent="#59bbf7", soft="#f9fafe", tint="#e8f0fb", ink="#0b6fc4", glow="rgba(30,150,252,.40)",  # Sognos brand ladder (theme only)
                        grad="linear-gradient(135deg,#0f1936 0%,#16336b 55%,#1e96fc 100%)", second="#59bbf7")
PHOTOS = {"sognos": "product/CareBg.avif", "care": "product/CareBg.avif", "roster": "product/RosterBg.avif", "genogram": "product/GenoBg.avif", "digpacks": "images/digpacks/nurse.png"}
TOKEN_CSS = "<style>\n" + "\n".join(
    f'  [data-product="{k}"] {{ ' + " ".join(f"--p-{n}: {v};" for n, v in t.items()) + f" --p-photo: url({P}/{PHOTOS[k]});" + " }"
    for k, t in TOKENS.items()) + """
  .p-grad { background: var(--p-grad); }
  .p-glow { background: radial-gradient(55% 60% at 15% 10%, var(--p-glow), transparent 70%), radial-gradient(45% 50% at 95% 90%, color-mix(in srgb, var(--p-second) 30%, transparent), transparent 70%); }
  .p-grid { background-image: linear-gradient(rgb(255 255 255 / .06) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / .06) 1px, transparent 1px); background-size: 64px 64px; mask-image: radial-gradient(70% 70% at 50% 30%, black, transparent); }
  .p-wash { background: linear-gradient(160deg, color-mix(in srgb, var(--p-dark) 55%, transparent), color-mix(in srgb, var(--p-base) 30%, transparent)); }
  [data-s] { display: none; }
  html[data-s-hero="g1"] [data-s="hero"][data-v="g1"] { display: block; }\n  html[data-s-hero="g2"] [data-s="hero"][data-v="g2"] { display: block; }\n  html[data-s-hero="g3"] [data-s="hero"][data-v="g3"] { display: block; }\n  html[data-s-hero="ga"] [data-s="hero"][data-v="ga"] { display: block; }\n  html[data-s-hero="gb"] [data-s="hero"][data-v="gb"] { display: block; }\n  html[data-s-hero="a"] [data-s="hero"][data-v="a"], html[data-s-hero="b"] [data-s="hero"][data-v="b"], html[data-s-hero="c"] [data-s="hero"][data-v="c"] { display: block; }
  html[data-s-problem="a"] [data-s="problem"][data-v="a"], html[data-s-problem="b"] [data-s="problem"][data-v="b"], html[data-s-problem="c"] [data-s="problem"][data-v="c"] { display: block; }
  html[data-s-features="a"] [data-s="features"][data-v="a"], html[data-s-features="b"] [data-s="features"][data-v="b"], html[data-s-features="c"] [data-s="features"][data-v="c"] { display: block; }
  html[data-s-extra="a"] [data-s="extra"][data-v="a"], html[data-s-extra="b"] [data-s="extra"][data-v="b"], html[data-s-extra="c"] [data-s="extra"][data-v="c"] { display: block; }
  html[data-s-adv="a"] [data-s="adv"][data-v="a"], html[data-s-adv="b"] [data-s="adv"][data-v="b"], html[data-s-adv="c"] [data-s="adv"][data-v="c"] { display: block; }
  html[data-s-close="a"] [data-s="close"][data-v="a"], html[data-s-close="b"] [data-s="close"][data-v="b"], html[data-s-close="c"] [data-s="close"][data-v="c"], html[data-s-close="d"] [data-s="close"][data-v="d"] { display: block; }
  /* Sub-nav colour variants */
  [data-subnav] { background: var(--sn-bg); border-color: var(--sn-border); }
  [data-subnav] .sn-link { color: var(--sn-muted); } [data-subnav] .sn-link:hover, [data-subnav] .sn-link[aria-current="true"] { color: var(--sn-fg); }
  [data-subnav] .sn-link[aria-current="true"] { box-shadow: none; text-decoration: underline; text-decoration-color: var(--sn-mark); text-decoration-thickness: 2px; text-underline-offset: 18px; }
  [data-subnav] .sn-sep { background: var(--sn-border); } [data-subnav] .sn-cta { background: var(--sn-cta-bg); color: var(--sn-cta-fg); }
  html[data-subnav="gray"] [data-subnav] { --sn-bg: #f3f4f6; --sn-border: #e5e7eb; --sn-fg: #0f1936; --sn-muted: #4b5563; --sn-mark: var(--p-base); --sn-cta-bg: #0f1936; --sn-cta-fg: #fff; }
  html[data-subnav="stint"] [data-subnav] { --sn-bg: #f9fafe; --sn-border: #e2e8f0; --sn-fg: #0f1936; --sn-muted: #68706f; --sn-mark: var(--p-base); --sn-cta-bg: #0f1936; --sn-cta-fg: #fff; }
  html[data-subnav="white"] [data-subnav] { --sn-bg: #fff; --sn-border: #e2e8f0; --sn-fg: #0f1936; --sn-muted: #68706f; --sn-mark: var(--p-base); --sn-cta-bg: #0f1936; --sn-cta-fg: #fff; }
  html[data-subnav="ptint"] [data-subnav] { --sn-bg: var(--p-soft); --sn-border: var(--p-tint); --sn-fg: #0f1936; --sn-muted: #4a5568; --sn-mark: var(--p-base); --sn-cta-bg: var(--p-base); --sn-cta-fg: #fff; }
  html[data-subnav="dark"] [data-subnav] { --sn-bg: var(--p-deep); --sn-border: rgb(255 255 255 / .1); --sn-fg: #fff; --sn-muted: rgb(255 255 255 / .7); --sn-mark: var(--p-accent); --sn-cta-bg: #fff; --sn-cta-fg: #0f1936; }
  html[data-subnav="grad"] [data-subnav] { --sn-bg: var(--p-grad); --sn-border: rgb(255 255 255 / .15); --sn-fg: #fff; --sn-muted: rgb(255 255 255 / .75); --sn-mark: #fff; --sn-cta-bg: #fff; --sn-cta-fg: #0f1936; }
  html[data-subnav="glass"] [data-subnav] { --sn-bg: rgb(255 255 255 / .72); --sn-border: rgb(15 25 54 / .08); --sn-fg: #0f1936; --sn-muted: #68706f; --sn-mark: var(--p-base); --sn-cta-bg: var(--p-base); --sn-cta-fg: #fff; }
  html[data-subnav="dark"] [data-subnav] .sn-logo, html[data-subnav="grad"] [data-subnav] .sn-logo { filter: brightness(0) invert(1); }
  /* Panel background modes (04b "Background" toggle + Works-with Paraform set) */
  html[data-pbg="photo"] .fv[data-fi] { background: var(--p-photo) center / cover !important; }
  html[data-pbg="paraform"] .fv[data-fi] { background: linear-gradient(160deg, color-mix(in srgb, var(--p-deep) 55%, transparent), color-mix(in srgb, var(--p-base) 35%, transparent)), var(--p-photo) center / cover !important; }
  html[data-pbg="paraform"] .fv[data-fi] :is(.bg-white, [class*="bg-white/"]) { background: rgb(255 255 255 / .72) !important; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-color: rgb(255 255 255 / .6) !important; }
  html[data-pbg="paraform"] .fv[data-fi] .border-line { border-color: rgb(255 255 255 / .55); }
  html[data-pbg]:is([data-pbg="photo"], [data-pbg="paraform"]) .fv[data-fi] > div > p.text-muted { color: rgb(255 255 255 / .9); }
  /* DigPacks panels: motion graphic or real product screen */
  html:not([data-pvis="screen"]) [data-pvis-only="screen"], html[data-pvis="screen"] [data-pvis-only="graphic"] { display: none; }
  [data-pp] { display: none; }
  html[data-pprod="care"] [data-pp="care"], html[data-pprod="roster"] [data-pp="roster"], html[data-pprod="genogram"] [data-pp="genogram"], html[data-pprod="digpacks"] [data-pp="digpacks"] { display: flex; flex-direction: column; }
  html[data-snpos="above"] [data-pp] > [data-subnav] { order: -1; margin-top: 5rem; }
  html[data-snpos="above"] [data-pp] > [id$="-hero"] section:first-of-type { padding-top: 5rem; }
  @keyframes p-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  .p-float { animation: p-float 6s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) { .p-float { animation: none; } }
</style>"""

# ── Live copy ─────────────────────────────────────────────────────────────────
STORIES = [
    ("Congratulations and well done to everyone that has been a part of this magnificent success! You should all be very proud of the quality of work you produce. You make us very proud - Thank you!", "Susan McCarthy", "Chief Operating Officer, Flourish Australia", "flourish-australia-logo.png"),
    ("Thank you to the Sognos team. Hoping to see you and thank you in person for such a successful implementation. Looking forward to a continued successful partnership with Sognos as our Field Service support partners!", "Anthony Hart", "Operations Delivery Lead, Auckland Airport", "auckland-airport-logo.png"),
    ("We've moved from reactive to proactive compliance. Every inspection now, the auditors comment on how thorough our records are. That wasn't possible before Sognos.", "Claire Donovan", "Service Delivery Manager, Penrith City Council", "penrith-city-council-logo.png"),
]
PRODUCTS = {
    "care": dict(
        key="care", name="SognosCare", logo="sognos-care-logo-color.svg", wlogo="sognos-care-logo.svg", photo="product/sognos-care-hero-img.png", tagline="Care operations &amp; compliance platform",
        h1="One platform.<br/>From intake to outcome.", sub="Manage cases, track service delivery, meet compliance obligations, and report with confidence - in one platform built end-to-end for care.",
        prob_label="The problem", prob_h2="Care providers shouldn't operate like this.",
        prob_intro="Fragmented systems, manual compliance, disconnected workforce data, and spreadsheet-driven reporting have become accepted as normal. Every disconnected workflow creates more administration, more risk, and less time for delivering care.",
        items_label="The solution", items_h2="Sognos unifies demand, workforce and outcomes on a single operational platform.",
        items=[("Unified Care Records", "Referrals, assessments, care plans, incidents, service agreements and progress notes in one system."), ("Built-In Compliance", "Audit trails, funding controls and evidence captured automatically as work happens."), ("Connected Workforce", "SognosCare and SognosRoster share the same data layer across visits, plans and participant history."), ("Real-Time Reporting", "Operational, workforce, compliance and funding reports generated continuously, not manually assembled.")],
        feat_h2="Everything a care operation needs",
        feats=[("Full lifecycle, one place", "Case Management", "Manage every stage of a participant's journey - from initial referral and intake through assessment, goal setting, service delivery, review, and case closure. Every touchpoint recorded, every team member aligned."),
               ("Real-time visibility", "Service Delivery Tracking", "Know exactly what services were scheduled, what was delivered, and what was missed - in real time. Field workers record visits on mobile, coordinators see variance instantly, and nothing falls through the gaps."),
               ("Audit-ready by default", "Compliance &amp; Audit Trail", "Every action timestamped. Every document versioned. Every funding rule enforced at the point of care, not retrospectively. SognosCare treats compliance as infrastructure - not a reporting exercise."),
               ("Generated, not assembled", "Reporting &amp; Analytics", "Funding-body reports, operational dashboards, and participant outcome summaries generated automatically from live data. No more month-end spreadsheet marathons."),
               ("AI where staff already work", "Microsoft Copilot AI", "AI-assisted documentation, anomaly detection, and operational insights - surfaced inside Dynamics 365, not in a separate tool. Staff don't change their workflow to access AI."),
               ("Workflows your way", "Power Platform Automation", "Configurable low-code automation for approvals, escalations, and notifications - built to match your organisation's specific processes without requiring a developer.")],
        extra=("editions", "Choose the Right SognosCare Edition for Your Service", "SognosCare offers six tailored editions, each pre-configured for its funding model, compliance framework, and operational workflows.",
               [("Disability &amp; Mental Health", "Plan around participant goals, manage incidents, and streamline progress notes - with NDIS funding rules and Quality &amp; Safeguards requirements enforced at every step.", "#00a98f"),
                ("Allied Health", "Manage referrals, coordinate therapy schedules, and record multi-disciplinary notes in one place - with mobile-first access designed for practitioners who work across multiple sites.", "#ffad6e"),
                ("Hospital in the Home", "Manage home-based treatment, mobile clinical teams, patient visits, and care documentation while maintaining visibility across Hospital in the Home delivery.", "#cbdd61"),
                ("Support at Home", "Manage client services, budgets, and care workers while staying ahead of the Support at Home program - with funding model changes tracked and compliance pre-configured.", "#ff8e90"),
                ("Residential Aged Care", "From care planning to staff coordination and resident reporting - built for residential providers demonstrating quality against Aged Care Quality Standards.", "#caa4ff"),
                ("Child &amp; Family Services", "Manage casework, family relationships, referrals, safety planning, and frontline service delivery with a connected platform built for child and family services.", "#ff7dbc")]),
        adv_h2="Key Advantages", adv_intro=None,
        adv=["Purpose-built for Australian care compliance - not adapted from generic CRM", "Reduces documentation time with AI-assisted clinical notes", "Keeps you audit-ready with continuous compliance tracking", "Integrates with Microsoft 365, Teams, and Dynamics 365 out of the box", "Connects care management, workforce rostering, and billing in one system", "Scales from community care to residential aged care without re-implementation"],
        close="stories"),
    "roster": dict(
        key="roster", name="SognosRoster", logo="sognos-roster-logo-color.svg", wlogo="sognos-roster-logo.svg", photo="product/RosterBg.avif", tagline="Workforce scheduling &amp; optimisation engine",
        h1="The right worker -<br/>for every job", sub="Allocate the right people, at the right time, to the right services - automatically. Putting real-time optimisation in the hands of your operations team.",
        prob_label="The problem", prob_h2="Workforce scheduling shouldn't work like this.", prob_intro="Manual rostering, compliance risks, real-time disruptions and disconnected data are still the default for most service operations.",
        items_label=None, items_h2=None,
        items=[("Manual rostering", "Workforce managers spend weeks each month juggling spreadsheets, phone calls, availability and last-minute changes."), ("Compliance risk", "Skills, qualifications, certifications and client-specific requirements are checked manually at scale."), ("Disconnected workforce data", "Rostering runs separately from care management, forcing coordinators to reconcile visits, plans and records by hand.")],
        feat_h2="Built for the full scheduling lifecycle",
        feats=[("Demand-driven, automatically", "Intelligent Scheduling", "Demand-driven roster generation that works from confirmed service demand — matching workers to shifts based on skills, certifications, availability, and location in a single automated pass."),
               ("Qualified, every time", "Skills &amp; Compliance Matching", "Every worker allocation is validated against qualification requirements, active certifications, and client-specific preferences before confirmation. Compliance isn't a post-hoc check — it's a scheduling precondition."),
               ("Less travel, more service", "Route Optimisation", "Geography and travel time are factored into every scheduling decision — reducing drive time, fuel cost, and lateness across field-based service environments."),
               ("Respond in minutes, not hours", "Real-Time Adjustments", "When plans change — sick leave, service additions, cancellations — SognosRoster reoptimises the affected day in minutes and notifies the right workers automatically. No phone cascade."),
               ("Field-ready, offline-capable", "Mobile Worker App", "Field workers see their schedule, accept shifts, check in on arrival, record service notes, and capture signatures — entirely from their phone. No paper, no manual entry, no separate login."),
               ("AI where operations happen", "Copilot AI Optimisation", "AI surfaces scheduling inefficiencies, predicts demand gaps, and recommends workforce actions — embedded directly in the Dynamics 365 environment. No new tool to log into.")],
        extra=None,
        adv_h2="Why operations teams choose SognosRoster", adv_intro="Built for the scheduling complexity of real-world service operations — not adapted from a generic workforce tool.",
        adv=["Demand-driven rostering that matches workers to services automatically", "Skills, certifications, and compliance requirements checked at every allocation", "Real-time reoptimisation when disruptions hit — not after the fact", "Connects directly to SognosCare so care and workforce data share one layer", "Scales from small teams to enterprise-wide multi-site operations", "Mobile-first worker app with instant schedule updates and job details"],
        close="stories"),
    "genogram": dict(
        key="genogram", name="SognosGenogram", logo="sognos-genogram-logo-color.svg", wlogo="SognosGenogram-logo.svg", photo="product/GenoBg.avif", tagline="Relationship &amp; family context platform",
        h1="Family context.<br/>Built into every record.", sub="Manage cases, track service delivery, meet compliance obligations, and report with confidence - in one platform built end-to-end for care.",
        prob_label="The problem", prob_h2="Case records have facts. They're missing people.", prob_intro="Standard case management captures what happened. SognosGenogram captures who is involved — and what those relationships mean for service delivery.",
        items_label=None, items_h2=None,
        items=[("Missing relationship context", "Workers arrive with case facts but no understanding of who is in the client's life, who provides support, and who creates risk. That gap affects every decision."), ("Disconnected family picture", "Information about family dynamics lives in handwritten notes, old files, and people's memory - not in the system where it can inform active service delivery."), ("Context lost between workers", "When cases change hands, the relational picture doesn't transfer. New workers start from zero, ask the same questions, and miss things the previous worker knew.")],
        feat_h2="Everything you need to map relationships that matter",
        feats=[("Clinical notation, built in", "Interactive genogram builder", "Create structured family and relationship maps directly within a case record using standard clinical genogram notation — without leaving the platform."),
               ("See the full picture", "Support network mapping", "Identify formal and informal supports, map relationship nature (supportive, strained, absent), and flag who is actively involved in the client's life."),
               ("Context where it's needed", "Risk and protective factor tagging", "Tag relationships with clinical context — who provides stability, who presents risk, and which connections need monitoring or intervention."),
               ("No separate attachment", "Embedded in the case record", "Genograms are part of the case record, not a separate attachment. Every worker on the case sees the same relationship picture, in context, when they need it."),
               ("Track change over time", "Historical snapshots", "Capture how a client's network changes over time. Compare relationship maps across different periods to understand how circumstances have evolved."),
               ("Plain language from structured data", "Copilot AI narrative", "Generate a plain-language summary of the family and support picture from the genogram data — ready to include in reports, referrals, or handover notes.")],
        # Advantages derived from the live product page (sognos.com.au/products/sognosgenogram: problems, features, integration)
        # and components/layout/sections/sognosgenogram/*. Heading is a SUGGESTION; intro is the live Integration heading.
        extra=None, adv_h2="Why practitioners choose SognosGenogram", adv_intro="Context that lives inside the case, not beside it.",
        adv=["Relationship maps sit inside the case record - no separate system, attachment or version mismatch",
             "Standard clinical genogram notation, built directly in the platform",
             "Formal and informal supports mapped, including the nature of each relationship",
             "Risk and protective factors tagged where workers make decisions",
             "The relationship picture carries over when cases change hands - no starting from zero",
             "Copilot AI turns the genogram into plain-language summaries for reports, referrals and handovers"],
        close="stories"),
    "digpacks": dict(
        key="digpacks", name="DigPacks", logo=None, wlogo=None, photo="images/digpacks/nurse.png", tagline="Apps, Automation, Data &amp; AI",
        kicker="DigPacks &times; Sognos",
        h1="Proven in UK healthcare. Shaped for Australia and New Zealand.", sub="Sognos is partnering with DigPacks to bring Microsoft-based applications, automation and AI capabilities from the NHS and public sector to health, social care and public services across Australia and New Zealand.",
        prob_label="Real outcomes in the UK", prob_h2="Start faster, adapt easily and integrate with what you already have through DigPacks accelerator solutions.", prob_intro="Outcomes achieved by DigPacks across NHS and public-sector engagements.",
        items_label=None, items_h2=None,
        stats=[("10,000+", "hours saved annually"), ("20,000+", "referrals &amp; applications processed each year"), ("Up to 85%", "reduction in manual processing time"), ("4,500", "staff supported at Berkshire Healthcare NHS Foundation Trust")],
        items=[],
        feat_h2="Solutions for today&rsquo;s operational pressure",
        feats=[("Move from fragmented registers to visible, accountable action", "Risk Management", "Bring assessments, actions, evidence, approvals, reminders and reporting into one configurable workflow.", "risk-management.png"),
               ("A clearer starting point for environmental risk assessment", "Safety Lens", "Safety Lens, part of Ligature Risk Management app, uses an app-integrated Copilot to analyse photographs of rooms or service environments and prepare a structured draft environmental risk assessment.", "safety-lens.png"),
               ("Give employees one clearer way to access routine people services", "People &amp; HR Management", "Selected DigPacks people and HR workflows can support personal information changes, leave and flexible-working requests, onboarding processes, structured approvals, audit history and guided employee self-service.", "people-and-hr.png"),
               ("Bring bookings, records and reporting into one workflow", "Vaccination Hub", "Vaccination Hub supports clinic and appointment management, employee self-service booking, real-time availability, recording of vaccinations received externally, secure records and program reporting.", "vaccination-hub.png"),
               ("Make privacy by design a visible, auditable process", "Privacy Impact Assessment", "Sognos and DigPacks are adapting the UK privacy-assessment capability into a Privacy Impact Assessment workflow for Australia and New Zealand.", "privacy-impact-assessment.png"),
               ("Reduce repeated support work without reducing access to support", "IT Service Management", "The IT Service Management capability and FixIT Agent can provide one place to raise and track requests, clearer categorisation and ownership, guided self-service, AI-assisted responses and escalation when human support is required.", "it-service-management.png")],
        extra=("why", "Why DigPacks and Sognos?", None, dict(
            why=["NHS and healthcare experience you can build on", "Solutions built on Microsoft Power Platform, with Copilot and AI", "Localisation for Australian and New Zealand regulation, workflows and privacy", "Integration with your existing Microsoft and third-party systems", "Adoption, training and ongoing improvement"],
            who=("Who should start the conversation?", ["Health services &amp; hospitals", "Aged care &amp; support at home", "Disability &amp; community services", "Mental health &amp; wellbeing teams", "Government &amp; not-for-profits", "IT, Digital, Risk, Quality, People leaders"]),
            local=("Localisation is more than changing terminology.", "We work with you to ensure each solution is configured for:", ["Australian &amp; NZ regulatory requirements", "Privacy, security &amp; governance", "Hosting &amp; data residency", "Integration with your systems", "Roles, approvals &amp; escalation", "Adoption &amp; measurable outcomes"]))),
        adv_h2=None, adv_intro=None, adv=[],
        close="asset", asset=("Try it free", "Make shared resource booking simpler with Asset Booker", "Asset Booker gives your teams one place to book and manage shared resources, from desks and meeting rooms to equipment, parking and specialist spaces.", "Built for the Microsoft environment, Asset Booker comes with step-by-step installation and setup guidance to help you get started.")),
}

# ── Feature motion graphics (04b gallery system) ─────────────────────────────
GENO_FV, DIGPACKS_FV = runpy.run_path(str(Path(__file__).with_name("product_visuals.py")))["build"](ns)
VISUALS = {
    "care": ns["FEATURE_VIS"],
    "roster": [v for _, v in ns["ROSTER_FV"]],
    "genogram": [v for _, v in GENO_FV],
    "digpacks": [v for _, v in DIGPACKS_FV],
}
SIZE = {"bento": ("min-h-0", "md:min-h-0"), "card": ("min-h-[260px]", "md:min-h-[280px]"), "tile": ("min-h-[240px]", "md:min-h-[260px]"), "row": ("min-h-[340px]", "md:min-h-[400px]")}


def vis(p, f, i, size="card"):
    """Feature panel: the product's motion graphic. DigPacks also carries its real
    solution screen (Panels: Screen) - toggled by html[data-pvis]."""
    v = VISUALS[p["key"]][i % 6]
    v = re.sub(r'min-h-\[340px\]', SIZE[size][0], v, count=1).replace("md:min-h-[400px]", SIZE[size][1], 1)
    v = v.replace('class="fv relative', f'data-fi="{i}" class="fv {"absolute inset-0" if size == "bento" else "relative"}', 1)
    if len(f) > 3:
        screen = f'<div data-pvis-only="screen" class="relative overflow-hidden rounded bg-[var(--p-soft)]" style="aspect-ratio:16/10"><img src="{P}/images/digpacks/{f[3]}" alt="" class="absolute inset-0 size-full object-cover object-top" /></div>'
        if size == "bento":
            screen = screen.replace('class="relative overflow-hidden', 'class="absolute inset-0 overflow-hidden').replace(' style="aspect-ratio:16/10"', "")
            return f'<div data-pvis-only="graphic" class="absolute inset-0">{v}</div>{screen}'
        return f'<div data-pvis-only="graphic">{v}</div>{screen}'
    return v


# ── Shared bits ───────────────────────────────────────────────────────────────
def logo(p, dark):
    if p["logo"] is None:  # DigPacks: brand-guide main logo (white on dark, colour on light)
        return f'<img src="{P}/images/digpacks/{"digpacks-logo-white.webp" if dark else "digpacks-logo-full.webp"}" alt="DigPacks" class="h-9 w-auto" />'
    return f'<img src="{P}/logos/{p["wlogo"] if dark else p["logo"]}" alt="{p["name"]}" class="h-8 w-auto {"brightness-0 invert" if dark else ""}" />'


def kicker(p, dark=False):
    txt = p.get("kicker", p["name"])
    return f'<p class="flex items-center gap-2.5 text-lg leading-[1.6] {"text-white/80" if dark else "text-heading"}"><span aria-hidden="true" class="block size-[0.66em] bg-[var(--p-base)]"></span>{txt}</p>'


def eyebrow(t, dark=False):
    return f'<p class="flex items-center gap-2.5 text-base {"text-white/75" if dark else "text-heading"}"><span aria-hidden="true" class="block size-[0.66em] bg-[var(--p-base)]"></span>{t}</p>'


def book(cls):
    return f'<button type="button" class="min-h-11 rounded-full px-7 py-3.5 text-base font-medium transition-colors {cls} {FOCUS}">Book a Demo</button>'


def sales(cls):
    return f'<a href="#" class="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-base font-medium transition-opacity hover:opacity-80 {cls} {FOCUS}">Talk to Sales {ARR}</a>'


def fragment(p, f, i, dark=False):
    """Feature visual: DigPacks uses its real solution screens; products get a tinted UI fragment."""
    if len(f) > 3:
        return f'<div class="relative aspect-[16/10] overflow-hidden rounded {"bg-white/5" if dark else "bg-[var(--p-soft)]"}"><img src="{P}/images/digpacks/{f[3]}" alt="" class="absolute inset-0 size-full object-cover object-top" /></div>'
    surf = "border-white/10 bg-white/[.06]" if dark else "border-line bg-white"
    bars = "".join(f'<span class="block h-2 rounded-full {"bg-white/15" if dark else "bg-[var(--p-tint)]"}" style="width:{w}%"></span>' for w in ((88, 64, 72), (70, 92, 50), (60, 80, 90))[i % 3])
    return f'''<div aria-hidden="true" class="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded {"bg-white/[.04]" if dark else "bg-[var(--p-soft)]"} p-6">
        <div class="w-full max-w-xs rounded-lg border {surf} p-4">
          <div class="flex items-center justify-between"><span class="text-[11px] font-medium {"text-white/80" if dark else "text-[var(--p-ink)]"}">{f[0]}</span><span class="size-2 rounded-full bg-[var(--p-base)]"></span></div>
          <div class="mt-3 space-y-2">{bars}</div>
          <div class="mt-4 flex gap-1.5">{"".join(f'<span class="h-6 flex-1 rounded {"bg-white/10" if dark else "bg-[var(--p-soft)]"}" style="{"background:var(--p-base)" if k == i % 4 else ""}"></span>' for k in range(4))}</div>
        </div>
      </div>'''


# ── A · Product Light ─────────────────────────────────────────────────────────
def dir_a(p):
    hero = f'''<section class="bg-white pt-36 pb-20 md:pt-44 md:pb-28">
  <div class="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-16">
    <div class="flex flex-col items-start gap-5 lg:col-span-6">{logo(p, False)}
      <h1 class="font-heading text-5xl font-normal leading-[1.05] tracking-[-0.02em] text-heading text-balance md:text-6xl">{p["h1"]}</h1>
      <p class="{T["herosub"]} text-body">{p["sub"]}</p>
      <div class="mt-2 flex flex-wrap items-center gap-3">{book("bg-heading text-white hover:bg-[var(--p-base)]")}{sales("text-heading")}</div>
    </div>
    <div class="lg:col-span-6"><div class="relative aspect-[4/5] max-h-[540px] w-full overflow-hidden rounded-lg bg-[var(--p-soft)] lg:aspect-auto lg:h-[540px]">
      <img src="{P}/{p["photo"]}" alt="" class="absolute inset-0 size-full object-cover" /><div class="p-wash absolute inset-0"></div>
      <div data-keep class="p-float absolute bottom-5 left-5 right-5 rounded-lg border border-line bg-white p-4 sm:right-auto sm:w-80"><p class="text-xs text-muted">{p["name"]}</p><p class="mt-1 font-heading text-lg text-heading">{p["tagline"]}</p><div class="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--p-soft)]"><span class="block h-full w-2/3 rounded-full bg-[var(--p-base)]"></span></div></div>
    </div></div>
  </div>
</section>'''
    if p.get("stats"):
        mid = "".join(f'<div class="border-t-2 border-[var(--p-base)] pt-5"><p class="font-heading text-4xl text-heading md:text-5xl">{v}</p><p class="mt-2 text-sm text-body">{l}</p></div>' for v, l in p["stats"])
        body = f'<div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">{mid}</div>'
    else:
        body = f'<ol class="lg:col-span-7">{"".join(f"<li class=\"grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-6 last:border-b\"><span class=\"font-heading text-2xl text-[var(--p-base)] tabular-nums\">{i:02d}</span><div><h3 class=\"{T['h3sm']} text-heading md:text-xl\">{t}</h3><p class=\"mt-2 {T['body']} text-body\">{b}</p></div></li>" for i, (t, b) in enumerate(p["items"], 1))}</ol>'
    head = f'<div class="flex flex-col gap-4 lg:col-span-5 lg:sticky lg:top-32 lg:self-start">{eyebrow(p["prob_label"])}<h2 class="{T["h2"]} text-heading">{p["prob_h2"]}</h2><p class="{T["lede"]} text-body">{p["prob_intro"]}</p>{f"<p class=\"mt-4 {T['h3sm']} text-heading\">{p['items_h2']}</p>" if p["items_h2"] else ""}</div>'
    problem = f'''<section class="bg-tint py-20 md:py-28"><div class="mx-auto max-w-7xl px-6">{f'<div class="max-w-3xl">{head}</div>{body}' if p.get("stats") else f'<div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">{head}{body}</div>'}</div></section>'''
    feats = f'''<section class="bg-white py-20 md:py-28"><div class="mx-auto max-w-7xl px-6">
  <div class="flex max-w-3xl flex-col gap-4">{eyebrow("Features")}<h2 class="{T["h2"]} text-heading">{p["feat_h2"]}</h2></div>
  <div class="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">{"".join(f'<article class="group flex flex-col gap-5 rounded-lg border border-line bg-white p-3 transition-colors hover:border-[var(--p-base)]">{vis(p, f, i, "card")}<div class="px-3 pb-3"><p class="text-xs font-medium text-[var(--p-ink)]">{f[0]}</p><h3 class="mt-2 {T["h3sm"]} text-heading">{f[1]}</h3><p class="mt-2 line-clamp-4 {T["small"]} text-body">{f[2]}</p></div></article>' for i, f in enumerate(p["feats"]))}</div>
</div></section>'''
    return [("hero", hero), ("problem", problem), ("features", feats), ("extra", extra(p, "a")), ("adv", advantages(p, "a")), ("close", close(p, "a"))]


# ── B · Immersive Dark ────────────────────────────────────────────────────────
def dir_b(p):
    hero = f'''<section class="relative overflow-hidden bg-[var(--p-deep)] pt-36 pb-16 text-white md:pt-44 md:pb-24">
  <div aria-hidden="true" class="p-glow absolute inset-0"></div><div aria-hidden="true" class="p-grid absolute inset-0"></div>
  <div class="relative mx-auto max-w-7xl px-6">
    <div class="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center">{logo(p, True)}
      <h1 class="font-heading text-5xl font-normal leading-[1.05] tracking-[-0.02em] text-balance md:text-6xl lg:text-7xl">{p["h1"]}</h1>
      <p class="max-w-2xl text-lg leading-relaxed text-white/75 text-pretty">{p["sub"]}</p>
      <div class="mt-2 flex flex-wrap items-center justify-center gap-3">{book("bg-white text-heading hover:bg-[var(--p-base)] hover:text-white")}{sales("text-white")}</div>
    </div>
    <div class="relative mx-auto mt-14 max-w-6xl md:mt-20"><div class="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10 md:aspect-[16/7]">
      <img src="{P}/{p["photo"]}" alt="" class="absolute inset-0 size-full object-cover" /><div class="p-wash absolute inset-0"></div></div>
      <div data-keep class="p-float absolute -bottom-6 left-4 rounded-lg border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-md md:left-10"><p class="text-xs text-white/70">{p["name"]}</p><p class="font-heading text-lg">{p["tagline"]}</p></div>
    </div>
  </div>
</section>'''
    if p.get("stats"):
        cards = "".join(f'<div class="rounded-lg border border-white/10 bg-white/5 p-6 lg:p-8"><p class="font-heading text-4xl text-[var(--p-accent)] md:text-5xl">{v}</p><p class="mt-3 text-sm text-white/75">{l}</p></div>' for v, l in p["stats"])
        grid = f'<div class="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">{cards}</div>'
    else:
        n = len(p["items"])
        grid = f'<div class="mt-12 grid grid-cols-1 gap-3 md:grid-cols-{2 if n == 4 else 3} lg:grid-cols-{n} lg:gap-4">{"".join(f"<article class=\"flex min-h-[260px] flex-col justify-between rounded-lg border border-white/10 bg-white/5 p-6 lg:p-8\"><span aria-hidden=\"true\" class=\"font-heading text-5xl font-light tabular-nums text-[var(--p-accent)]/60\">{i:02d}</span><div><h3 class=\"{T['h3sm']} text-white md:text-xl\">{t}</h3><p class=\"mt-3 {T['small']} text-white/75\">{b}</p></div></article>" for i, (t, b) in enumerate(p["items"], 1))}</div>'
    problem = f'''<section class="bg-[var(--p-deep)] pt-28 pb-20 text-white md:pt-36 md:pb-28"><div class="mx-auto max-w-7xl px-6">
  <div class="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">{eyebrow(p["prob_label"], True)}<h2 class="{T["h2"]} text-white">{p["prob_h2"]}</h2><p class="{T["lede"]} mx-auto text-white/75">{p["prob_intro"]}</p></div>{grid}</div></section>'''
    fs = p["feats"]

    def tile(f, k, big=False):
        span = "md:col-span-2 lg:col-span-2 lg:row-span-2" if big else ""
        body_cls = "" if big else "line-clamp-2"
        return (f'<article class="flex min-h-0 flex-col gap-4 overflow-hidden rounded-lg border border-white/10 bg-white/[.04] p-3 {span}">'
                f'<div class="relative min-h-[240px] flex-1 overflow-hidden rounded lg:min-h-0">{vis(p, f, k, "bento")}</div>'
                f'<div class="shrink-0 px-2 pb-1"><p class="text-xs text-[var(--p-accent)]">{f[0]}</p><h3 class="mt-1 {T["h3"] if big else T["h3sm"]}">{f[1]}</h3><p class="mt-1 {body_cls} {T["small"]} text-white/70">{f[2]}</p></div></article>')
    bento = tile(fs[0], 0, True) + "".join(tile(f, k) for k, f in enumerate(fs[1:], 1))
    feats = f'''<section class="bg-[var(--p-dark)] py-20 text-white md:py-28"><div class="mx-auto max-w-7xl px-6">
  <div class="flex max-w-3xl flex-col gap-4">{eyebrow("Features", True)}<h2 class="{T["h2"]} text-white">{p["feat_h2"]}</h2></div>
  <div class="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[23rem] lg:gap-4">{bento}</div></div></section>'''
    return [("hero", hero), ("problem", problem), ("features", feats), ("extra", extra(p, "b")), ("adv", advantages(p, "b")), ("close", close(p, "b"))]


# ── C · Signature (editorial rhythm, oversized mark) ──────────────────────────
def dir_c(p):
    idx = "".join(f'<li><a href="#" class="group flex min-h-12 items-center justify-between gap-4 border-b border-line py-3 text-heading {FOCUS}"><span class="flex items-center gap-3"><span class="text-xs tabular-nums text-muted">{i:02d}</span>{f[1]}</span><span aria-hidden="true" class="text-[var(--p-base)] transition-transform group-hover:translate-x-0.5">&rarr;</span></a></li>' for i, f in enumerate(p["feats"][:4], 1))
    hero = f'''<section class="relative overflow-hidden bg-[var(--p-soft)] pt-36 pb-20 md:pt-44 md:pb-28">
  <div aria-hidden="true" class="pointer-events-none absolute -right-24 -top-16 size-[34rem] rounded-full opacity-[.12]" style="background:var(--p-grad)"></div>
  <div class="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16">
    <div class="flex flex-col items-start gap-6 lg:col-span-8">{kicker(p)}
      <h1 class="font-heading text-5xl font-normal leading-[1.02] tracking-[-0.03em] text-heading text-balance md:text-7xl">{p["h1"]}</h1>
      <p class="{T["herosub"]} text-body">{p["sub"]}</p>
      <div class="flex flex-wrap items-center gap-3">{book("bg-[var(--p-base)] text-white hover:bg-heading")}{sales("text-heading")}</div>
    </div>
    <div class="flex flex-col justify-end gap-4 lg:col-span-4">{logo(p, False)}<p class="text-sm text-muted">{p["tagline"]}</p><ul class="border-t border-line">{idx}</ul></div>
  </div>
  <div class="relative mx-auto mt-16 max-w-7xl px-6"><div class="relative aspect-[16/9] overflow-hidden rounded-lg md:aspect-[21/8]"><img src="{P}/{p["photo"]}" alt="" class="absolute inset-0 size-full object-cover" /><div class="absolute inset-0" style="background:linear-gradient(90deg, color-mix(in srgb, var(--p-dark) 70%, transparent), transparent 60%)"></div>
    <p data-keep class="absolute bottom-6 left-6 max-w-sm font-heading text-2xl text-white md:bottom-10 md:left-10 md:text-3xl">{p["tagline"]}</p></div></div>
</section>'''
    if p.get("stats"):
        right = f'<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7 lg:gap-4">{"".join(f"<div class=\"rounded-lg border-t-[3px] border-[var(--p-base)] bg-white p-6 lg:p-8\"><p class=\"font-heading text-4xl text-heading\">{v}</p><p class=\"mt-2 text-sm text-body\">{l}</p></div>" for v, l in p["stats"])}</div>'
    else:
        right = f'<div class="space-y-3 lg:col-span-7 lg:space-y-4">{"".join(f"<article class=\"rounded-lg border-t-[3px] border-[var(--p-base)] bg-white p-6 lg:p-8\"><p class=\"text-xs tabular-nums text-[var(--p-ink)]\">{i:02d}</p><h3 class=\"mt-2 {T['h3']} text-heading\">{t}</h3><p class=\"mt-3 {T['body']} text-body\">{b}</p></article>" for i, (t, b) in enumerate(p["items"], 1))}</div>'
    problem = f'''<section class="bg-tint py-20 md:py-28"><div class="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16">
  <div class="flex flex-col gap-4 lg:col-span-5 lg:sticky lg:top-32 lg:self-start">{eyebrow(p["prob_label"])}<h2 class="{T["h2"]} text-heading">{p["prob_h2"]}</h2><p class="{T["lede"]} text-body">{p["prob_intro"]}</p></div>{right}</div></section>'''
    n = len(p["feats"])
    rows = "".join(f'''<article class="fc border-line">
      <div class="fc-txt"><div class="fc-head"><p class="fc-num text-xs tabular-nums text-muted">{i + 1:02d} / {n:02d}</p><p class="fc-eb text-sm font-medium">{f[0]}</p><h3 class="fc-title {T["h3"]} text-heading text-balance">{f[1]}</h3></div>
        <div class="fc-foot"><p class="fc-copy max-w-[46ch] {T["body"]} text-body text-pretty">{f[2]}</p><div class="fc-act"><a href="#" class="fc-link inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-heading transition-opacity hover:opacity-80 {FOCUS}">Explore {f[1]} {ARR}</a><button type="button" class="fc-btn min-h-11 rounded-full bg-[var(--p-base)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 {FOCUS}">Book a Demo</button></div></div></div>
      <div class="fc-vis min-w-0">{vis(p, f, i, "row")}</div>
    </article>''' for i, f in enumerate(p["feats"]))
    feats = f'''<section class="bg-white py-20 md:py-28"><div class="mx-auto max-w-7xl px-6"><div class="flex max-w-3xl flex-col gap-4">{eyebrow("Features")}<h2 class="{T["h2"]} text-heading">{p["feat_h2"]}</h2></div><div class="fc-list mt-12">{rows}</div></div></section>'''
    return [("hero", hero), ("problem", problem), ("features", feats), ("extra", extra(p, "c")), ("adv", advantages(p, "c")), ("close", close(p, "c"))]


# ── Shared sections with per-direction treatment ──────────────────────────────
def extra(p, d):
    if not p["extra"]:
        return ""
    kind, h2, intro, data = p["extra"]
    dark = d == "b"
    sec = "bg-[var(--p-deep)] text-white" if dark else ("bg-tint" if d == "a" else "bg-white")
    head = f'<div class="flex max-w-3xl flex-col gap-4">{eyebrow("Editions" if kind == "editions" else "Why DigPacks", dark)}<h2 class="{T["h2"]} {"text-white" if dark else "text-heading"}">{h2}</h2>{f"<p class=\"{T['lede']} {'text-white/75' if dark else 'text-body'}\">{intro}</p>" if intro else ""}</div>'
    if kind == "editions":
        if d == "c":
            cards = "".join(f'<article class="flex w-[80%] shrink-0 snap-start flex-col justify-between gap-10 rounded-lg bg-tint p-6 sm:w-[340px] lg:p-8" style="border-top:4px solid {c}"><span class="size-3 rounded-full" style="background:{c}"></span><div><h3 class="{T["h3"]} text-heading">{t}</h3><p class="mt-3 {T["small"]} text-body">{b}</p></div></article>' for t, b, c in data)
            body = f'<div class="-mx-6 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:gap-4">{cards}</div>'
        else:
            card = ("border-white/10 bg-white/5" if dark else "border-line bg-white")
            body = f'<div class="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">{"".join(f"<article class=\"flex flex-col gap-6 rounded-lg border {card} p-6 lg:p-8\"><span class=\"h-1 w-10 rounded-full\" style=\"background:{c}\"></span><div><h3 class=\"{T['h3sm']} {'text-white' if dark else 'text-heading'} md:text-xl\">{t}</h3><p class=\"mt-3 {T['small']} {'text-white/75' if dark else 'text-body'}\">{b}</p></div></article>" for t, b, c in data)}</div>'
    else:
        tick = '<span aria-hidden="true" class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--p-base)] text-[10px] text-white">&#10003;</span>'
        li = lambda items, cls: "".join(f'<li class="flex gap-3 {cls}">{tick}<span>{x}</span></li>' for x in items)
        tc = "text-white/85" if dark else "text-heading"
        card = "border-white/10 bg-white/5" if dark else ("border-line bg-white" if d == "a" else "border-line bg-tint")
        who_t, who = data["who"]
        loc_t, loc_i, loc = data["local"]
        body = f'''<div class="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4">
      <ul class="space-y-4 rounded-lg border {card} p-6 text-base lg:p-8">{li(data["why"], tc)}</ul>
      <div class="rounded-lg border {card} p-6 lg:p-8"><h3 class="{T["h3sm"]} {"text-white" if dark else "text-heading"}">{who_t}</h3><ul class="mt-5 space-y-3 text-sm">{li(who, tc)}</ul></div>
      <div class="rounded-lg p-6 text-white lg:p-8" style="background:var(--p-grad)"><h3 class="{T["h3sm"]}">{loc_t}</h3><p class="mt-2 text-sm text-white/80">{loc_i}</p><ul class="mt-5 space-y-3 text-sm">{"".join(f'<li class="flex gap-3"><span aria-hidden="true" class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-[10px] text-[var(--p-base)]">&#10003;</span>{x}</li>' for x in loc)}</ul></div>
    </div>'''
    return f'<section class="{sec} py-20 md:py-28"><div class="mx-auto max-w-7xl px-6">{head}{body}</div></section>'


def advantages(p, d):
    if not p["adv"]:
        return ""
    intro = f'<p class="{T["lede"]} {"text-white/80" if d == "b" else "text-body"}">{p["adv_intro"]}</p>' if p["adv_intro"] else ""
    if d == "b":
        tiles = "".join(f'<li class="flex flex-col gap-6 rounded-lg border border-white/15 bg-white/10 p-6 backdrop-blur"><span class="font-heading text-3xl tabular-nums text-white/60">{i:02d}</span><p class="text-base text-white">{x}</p></li>' for i, x in enumerate(p["adv"], 1))
        return f'<section class="p-grad py-20 text-white md:py-28"><div class="mx-auto max-w-7xl px-6"><div class="flex max-w-3xl flex-col gap-4">{eyebrow("Advantages", True)}<h2 class="{T["h2"]}">{p["adv_h2"]}</h2>{intro}</div><ul class="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">{tiles}</ul></div></section>'
    if d == "c":
        rows = "".join(f'<li class="grid grid-cols-[4rem_1fr] items-baseline gap-4 border-t border-line py-6 md:grid-cols-[6rem_1fr]"><span class="font-heading text-4xl tabular-nums text-[var(--p-base)] md:text-5xl">{i:02d}</span><p class="{T["h3"]} text-heading">{x}</p></li>' for i, x in enumerate(p["adv"], 1))
        return f'<section class="bg-[var(--p-soft)] py-20 md:py-28"><div class="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16"><div class="flex flex-col gap-4 lg:col-span-4 lg:sticky lg:top-32 lg:self-start">{eyebrow("Advantages")}<h2 class="{T["h2"]} text-heading">{p["adv_h2"]}</h2>{intro}</div><ol class="lg:col-span-8">{rows}</ol></div></section>'
    tick = '<span aria-hidden="true" class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--p-soft)] text-xs text-[var(--p-ink)]">&#10003;</span>'
    return f'<section class="bg-white py-20 md:py-28"><div class="mx-auto max-w-7xl px-6"><div class="flex max-w-3xl flex-col gap-4">{eyebrow("Advantages")}<h2 class="{T["h2"]} text-heading">{p["adv_h2"]}</h2>{intro}</div><ul class="mt-12 grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">{"".join(f"<li class=\"flex gap-4 border-b border-line pb-5 text-lg text-heading\">{tick}<span>{x}</span></li>" for x in p["adv"])}</ul></div></section>'


def close(p, d):
    if d == "d":
        return stage(p)
    if p["close"] == "asset":  # DigPacks Asset Booker: A / B / C layouts, booking motion graphic, drawer (asset_booker.py)
        return AB["section"](p, d, dict(P=P, T=T, eyebrow=eyebrow, FOCUS=FOCUS))
    if d == "b":
        q, n, r, lg = STORIES[0]
        others = "".join(f'<li class="flex h-16 items-center justify-center rounded border border-white/10 bg-white px-4"><img src="{P}/logos/{l}" alt="" class="max-h-8 w-auto" /></li>' for _, _, _, l in STORIES)
        return f'<section class="bg-[var(--p-deep)] py-20 text-white md:py-28"><div class="mx-auto max-w-5xl px-6 text-center">{eyebrow("Customer Stories", True).replace("flex items-center", "inline-flex items-center")}<blockquote class="mt-8 font-heading text-2xl leading-snug md:text-4xl">&ldquo;{q}&rdquo;</blockquote><p class="mt-6 text-sm text-white/75">{n} &middot; {r}</p><ul class="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-3">{others}</ul></div></section>'
    card = "bg-[var(--p-soft)]" if d == "c" else "border border-line bg-white"
    cards = "".join(f'<figure class="flex flex-col justify-between gap-8 rounded-lg {card} p-6 lg:p-8"><img src="{P}/logos/{l}" alt="" class="h-8 w-auto self-start" /><blockquote class="{T["body"]} text-heading">&ldquo;{q}&rdquo;</blockquote><figcaption class="border-t border-line pt-4 text-sm"><span class="text-heading">{n}</span><br/><span class="text-muted">{r}</span></figcaption></figure>' for q, n, r, l in STORIES)
    return f'<section class="{"bg-tint" if d == "a" else "bg-white"} py-20 md:py-28"><div class="mx-auto max-w-7xl px-6"><div class="flex max-w-3xl flex-col gap-4">{eyebrow("Customer Stories")}<h2 class="{T["h2"]} text-heading">Customer Stories</h2></div><div class="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">{cards}</div></div></section>'


CARDS = runpy.run_path(str(Path(__file__).with_name("products_cards.py")))
AB = runpy.run_path(str(Path(__file__).with_name("asset_booker.py")))


def stage(p):
    return close(p, "a") if p["close"] == "asset" else CARDS["stage"](P, T, FOCUS, ARR, eyebrow, STORIES)


# ── Page assembly ─────────────────────────────────────────────────────────────
NAV = f'''<header class="fixed inset-x-0 top-0 z-50 border-b border-line bg-white/95 backdrop-blur"><div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6"><img src="{P}/logos/sognos-logo.svg" alt="Sognos" class="h-6 w-auto" /><nav class="hidden items-center gap-1 rounded-full bg-tint p-1 text-sm text-heading lg:flex">{"".join(f'<span class="rounded-full px-4 py-2">{n}</span>' for n in ["Why Sognos", "Products", "Solutions", "Industries", "Knowledge Hub"])}</nav><span class="rounded bg-heading px-4 py-2.5 text-sm font-medium text-white">Book a Demo</span></div></header>'''
DIRS = [("a", "A · Split (light)", dir_a), ("b", "B · Immersive (dark)", dir_b), ("c", "C · Editorial (signature)", dir_c)]
PRODS = [("care", "SognosCare"), ("roster", "SognosRoster"), ("genogram", "SognosGenogram"), ("digpacks", "DigPacks")]


SECTIONS = [("hero", "Hero"), ("problem", "Problem"), ("features", "Features"), ("extra", "Editions / Why"), ("adv", "Advantages"), ("close", "Stories / CTA")]


SUBNAV_LABELS = {  # SognosCare: live ProductSubNav labels; others follow the same pattern
    "care": [("problem", "What it solves"), ("features", "Features"), ("extra", "Editions"), ("adv", "Key Advantages"), ("close", "Customer Stories")],
    "roster": [("problem", "What it solves"), ("features", "Features"), ("adv", "Key Advantages"), ("close", "Customer Stories")],
    "genogram": [("problem", "What it solves"), ("features", "Features"), ("adv", "Key Advantages"), ("close", "Customer Stories")],
    "digpacks": [("problem", "Outcomes"), ("features", "Solutions"), ("extra", "Why DigPacks"), ("close", "Asset Booker")],
}


def subnav(k):
    """Sticky sub-nav. Layout (html data-sn-*): brand logo / text / none, menu left / right,
    actions button / links (02b-subnav.html: Schedule a Call + Download Datasheet) / both / none, line solid / dashed."""
    p = PRODUCTS[k]
    mark = (f'<img src="{P}/logos/{p["logo"]}" alt="" class="sn-logo h-5 w-auto" />' if p["logo"] else f'<img src="{P}/images/digpacks/digpacks-logo-full.webp" alt="" class="sn-logo h-6 w-auto" />')
    links = "".join(f'<li><a href="#{k}-{key}" data-spy="{k}-{key}" class="sn-link whitespace-nowrap py-2 text-sm transition-colors">{t}</a></li>' for key, t in SUBNAV_LABELS[k])
    xl = f"sn-xl whitespace-nowrap text-sm transition-colors max-sm:hidden {FOCUS}"
    return (f'<div data-subnav class="sticky top-20 z-40 border-b backdrop-blur"><div class="mx-auto flex h-14 max-w-7xl items-center gap-6 px-6">'
            f'<a href="#{k}-hero" class="sn-brand flex shrink-0 items-center gap-2 {FOCUS}">{mark}<span class="sn-name text-sm font-medium">{p["name"]}</span></a><span aria-hidden="true" class="sn-sep hidden h-5 w-px sm:block"></span>'
            f'<nav aria-label="{p["name"]} sections" class="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none]"><ul class="sn-ul flex items-center gap-6">{links}</ul></nav>'
            f'<span class="sn-acts flex shrink-0 items-center gap-5"><a href="#" class="{xl}">Schedule a Call</a><a href="#" class="{xl} inline-flex items-center gap-1.5 font-medium">Download Datasheet <span aria-hidden="true">&darr;</span></a>'
            f'<button type="button" class="sn-cta hidden min-h-9 shrink-0 rounded-full px-4 text-sm font-medium transition-colors sm:block {FOCUS}">Book a Demo</button></span></div></div>')


SN_LAYOUT = [  # (attr, label, options, default)
    ("sn-brand", "Brand", [("logo", "Logo"), ("text", "Text"), ("none", "None")], "logo"),
    ("sn-menu", "Menu position", [("left", "Left"), ("right", "Right")], "left"),
    ("sn-acts", "Actions", [("button", "Button"), ("links", "Links"), ("both", "Links + button"), ("none", "None")], "button"),
    ("sn-line", "Border", [("solid", "Solid"), ("dashed", "Dashed")], "solid"),
]
SN_DEFAULTS = {a: d for a, _, _, d in SN_LAYOUT}
SN_02B = {"subnav": "dark", "sn-brand": "text", "sn-menu": "right", "sn-acts": "links", "sn-line": "dashed"}
SN_CSS = """<style>
  [data-subnav] .sn-name { color: var(--sn-fg); }
  html[data-sn-brand="logo"] [data-subnav] .sn-name { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  html[data-sn-brand="text"] [data-subnav] :is(.sn-logo, .sn-sep), html[data-sn-brand="none"] [data-subnav] :is(.sn-brand, .sn-sep) { display: none !important; }
  html[data-sn-menu="right"] [data-subnav] .sn-ul { justify-content: flex-end; }
  [data-subnav] .sn-xl { color: var(--sn-fg); } [data-subnav] .sn-xl:hover { color: var(--sn-mark); }
  html:is([data-sn-acts="button"], [data-sn-acts="none"]) [data-subnav] .sn-xl, html:is([data-sn-acts="links"], [data-sn-acts="none"]) [data-subnav] .sn-cta { display: none !important; }
  html[data-sn-acts="none"] [data-subnav] .sn-acts { display: none; }
  html[data-sn-line="dashed"] [data-subnav] { border-style: dashed; border-top-width: 1px; }
</style>"""


def _gallery_hero(html):
    # Gallery / 01m heroes: unhide, clear the fixed header.
    return html.replace(" hidden>", ">", 1).replace("pt-24 pb-16", "pt-36 pb-16 md:pt-44", 1)


GALLERY_HEROES = {  # docs/mockups/sognoscare/04b-feature-visuals.html + 01m-hero-a.html
    "care": [("g1", "Care motion 1 · Visit verified", _gallery_hero(ns["hero_option"]("1"))), ("g2", "Care motion 2 · Care network", _gallery_hero(ns["hero_option"]("2"))), ("g3", "Care motion 3 · Day in motion", _gallery_hero(ns["hero_option"]("3")))],
    "roster": [("ga", "Roster · Photo", _gallery_hero(ns["ROSTER_HERO_A"])), ("gb", "Roster · Live schedule", _gallery_hero(ns["ROSTER_HERO_B"]))],
}
GKEYS = ["g1", "g2", "g3", "ga", "gb"]


def body(products):
    out = []
    for k in products:
        variants = {d: dict(fn(PRODUCTS[k])) for d, _, fn in DIRS}
        variants["d"] = {"close": stage(PRODUCTS[k])}
        for gk, _, html in GALLERY_HEROES.get(k, []):
            variants[gk] = {"hero": html}
        secs = ""
        for key, _ in SECTIONS:
            group = "".join(f'<div data-s="{key}" data-v="{d}">{variants[d][key]}</div>' for d in variants if variants[d].get(key))
            if group:
                secs += f'<div id="{k}-{key}" class="scroll-mt-36">{group}</div>' + (subnav(k) if key == "hero" else "")
        out.append(f'<div data-pp="{k}" data-product="{k}">{secs}</div>')
    return "".join(out)


BTN = "whitespace-nowrap rounded-full px-3 py-2 hover:bg-white/10 aria-pressed:bg-white aria-pressed:text-care-dark"


def switcher_unused(products):
    prod = "" if len(products) == 1 else '<span class="px-2 text-white/60">Product</span>' + "".join(f'<button type="button" data-set-p="{k}" class="{BTN}">{n}</button>' for k, n in PRODS) + '<span class="mx-1 h-5 w-px bg-white/20"></span>'
    return ('<div class="fixed top-24 left-1/2 z-[60] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-care-dark/90 p-1 text-xs text-white backdrop-blur">'
            + prod + '<span class="px-2 text-white/60">Direction</span>' + "".join(f'<button type="button" data-set-d="{d}" class="{BTN}">{n}</button>' for d, n, _ in DIRS) + "</div>")


import json as _json
_argv = sys.argv; sys.argv = [_argv[0], CARE_OUT, str(OUT.parent / "footer")]
FT = runpy.run_path(str(Path(__file__).with_name("build_footer.py")))  # footer data + helpers
sys.argv = _argv
CH = runpy.run_path(str(Path(__file__).with_name("products_chrome.py")))["build"](dict(P=P, T=T, PRODUCTS=PRODUCTS, SUBNAV_LABELS=SUBNAV_LABELS, footer=FT))
page.__globals__["OUT"] = OUT  # build_footer retargets its own writer only; keep ours
ED = runpy.run_path(str(Path(__file__).with_name("products_editor.py")))
_g = lambda d: {k: [c for c in v[2]] for k, v in d.items()}
PAL_GROUPS = [  # every panel palette from docs/mockups/sognoscare/04b-feature-visuals.html + the product ladder
    ("Product ladder", "prod", {"auth": [], "tints": ["var(--p-soft)", "var(--p-tint)"], "brand": ["#f9fafe"], "white": ["#ffffff"], "deep": ["var(--p-dark)", "var(--p-deep)"], "grad": ["var(--p-grad)"]},
     {"auth": "As authored", "tints": "Product tints", "brand": "Brand tint", "white": "Outlined white", "deep": "Product deep", "grad": "Product gradient"}),
    ("SognosCare (04b)", "care", _g(ns["FV_PALETTES"]), {k: v[0] for k, v in ns["FV_PALETTES"].items()}),
    ("SognosRoster (04b)", "roster", _g(ns["ROSTER_PALETTES"]), {k: v[0] for k, v in ns["ROSTER_PALETTES"].items()}),
    ("Solutions · Frontline (04b)", "frontline", _g(ns["FRONTLINE_PALETTES"]), {k: v[0] for k, v in ns["FRONTLINE_PALETTES"].items()}),
    ("Home · Solutions (04b)", "homesol", _g(ns["HOME_SOLUTION_PALETTES"]), {k: v[0] for k, v in ns["HOME_SOLUTION_PALETTES"].items()}),
    ("Home · Industries (04b)", "homeind", _g(ns["HOME_INDUSTRY_PALETTES"]), {k: v[0] for k, v in ns["HOME_INDUSTRY_PALETTES"].items()}),
]
PAL_DATA = {f"{gk}-{k}": cols for _, gk, d, _ in PAL_GROUPS for k, cols in d.items()}
TN = runpy.run_path(str(Path(__file__).with_name("products_tones.py")))
TONES = TN["TONES"]
LAYOUT_NAMES = {"a": "A · Split", "b": "B · Immersive", "c": "C · Editorial"}
SUBNAVS = [("white", "White"), ("gray", "Gray #f3f4f6"), ("stint", "Sognos tint #f9fafe"), ("ptint", "Product tint"), ("dark", "Dark"), ("grad", "Gradient"), ("glass", "Glass"), ("bar", "Header bar (SognosCare index)")]
PILL = "rounded-full border border-line px-2.5 py-1 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white"


def controls(products):
    row = lambda title, attr, opts: (f'<div class="space-y-1.5 border-t border-line pt-3"><p class="text-[10px] font-medium uppercase tracking-widest text-muted">{title}</p><div class="flex flex-wrap gap-1.5">'
                                     + "".join(f'<button type="button" data-ctl="{attr}:{v}" class="{PILL}">{n}</button>' for v, n in opts) + "</div></div>")
    btns = lambda attr, opts: "".join(f'<button type="button" {attr}="{v}" class="{PILL}">{n}</button>' for v, n in opts)
    top = (("" if len(products) == 1 else f'<div class="space-y-1.5"><p class="text-[10px] font-medium uppercase tracking-widest text-muted">Product</p><div class="flex flex-wrap gap-1.5">{btns("data-set-p", PRODS)}</div></div>')
           + f'<div class="space-y-1.5 border-t border-line pt-3"><p class="text-[10px] font-medium uppercase tracking-widest text-muted">Direction (all sections)</p><div class="flex flex-wrap gap-1.5">{btns("data-set-d", [(d, n) for d, n, _ in DIRS])}</div></div>')
    gal = lambda k: ("" if k != "hero" else "".join(f'<button type="button" data-ctl="s-hero:{g}" data-only-p="{pk}" class="{PILL}">{lab}</button>' for pk, items in GALLERY_HEROES.items() for g, lab, _ in items))
    secs = "".join(f'<div class="grid grid-cols-[6.5rem_1fr] items-center gap-2 border-t border-line pt-2"><p class="text-xs text-heading">{n}</p><div class="flex flex-wrap gap-1">'
                   + "".join(f'<button type="button" data-ctl="s-{k}:{d}" class="{PILL}">{LAYOUT_NAMES[d]}</button>' for d in "abc") + gal(k)
                   + f'<button type="button" data-ctl="rail-{k}:on" class="{PILL}">Rail on</button><button type="button" data-ctl="rail-{k}:off" class="{PILL}">Rail off</button>' + '<span class="basis-full"></span>'
                   + "".join(f'<button type="button" data-ctl="tone-{k}:{t}" class="{PILL}">{tn}</button>' for t, tn in TONES) + "</div></div>" for k, n in SECTIONS)
    frows = "".join(f'<div class="grid grid-cols-[6.5rem_1fr] items-start gap-2 border-t border-line pt-2"><p class="pt-1 text-xs text-heading">{n}</p><div class="flex flex-wrap gap-1">'
                    + "".join(f'<button type="button" data-ctl="fr-{rk}:{st}" class="{PILL}">{sn}</button>' for st, sn in CH["FOOTER_STYLES"] if st != "none" or rk == "graphic") + '<span class="basis-full"></span>'
                    + "".join(f'<button type="button" data-ctl="ftone-{rk}:{t}" class="{PILL}">{tn}</button>' for t, tn in TONES) + "</div></div>" for rk, n in CH["FOOTER_ROWS"])
    sw = lambda cols: "".join(f'<span class="size-3 rounded-full border border-line" style="background:{c}"></span>' for c in (cols[:2] or ["#fff"]))
    pals = "".join(f'<div class="space-y-1"><p class="text-[10px] text-muted">{title}</p><div class="flex flex-wrap gap-1">'
                   + "".join(f'<button type="button" data-ctl="pal:{gk}-{k}" title="{names[k]}" class="{PILL} inline-flex items-center gap-1.5"><span class="flex -space-x-1">{sw(cols)}</span>{k.upper() if gk != "prod" else names[k]}</button>' for k, cols in d.items())
                   + "</div></div>" for title, gk, d, names in PAL_GROUPS)
    custom = ('<div class="space-y-1"><p class="text-[10px] text-muted">Custom</p><div class="flex flex-wrap items-center gap-1.5">'
              f'<button type="button" data-ctl="pal:custom" class="{PILL}">Custom</button>'
              '<input type="color" data-custom-pal="0" value="#eef3fd" aria-label="Custom panel colour 1" class="h-6 w-8 cursor-pointer rounded border border-line"><input type="color" data-custom-pal="1" value="#dfe7fb" aria-label="Custom panel colour 2" class="h-6 w-8 cursor-pointer rounded border border-line"></div></div>')
    tabs = ('<div class="mt-3 flex gap-1 rounded-full bg-tint p-1 text-xs">'
            + "".join(f'<button type="button" data-tab="{t}" aria-pressed="{str(t == "main").lower()}" class="flex-1 rounded-full px-3 py-1.5 text-heading aria-pressed:bg-heading aria-pressed:text-white">{n}</button>' for t, n in [("main", "Layout &amp; variations"), ("editor", "Colour editor")])
            + "</div>")
    return ('<details open class="group fixed bottom-4 right-4 z-[60] w-[min(92vw,26rem)] rounded-lg border border-line bg-white text-left open:p-4">'
            '<summary class="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-heading group-open:p-0 [&::-webkit-details-marker]:hidden">Products · sections &amp; colours <span aria-hidden="true" class="transition-transform group-open:rotate-180">&#9662;</span></summary>'
            + tabs + '<div data-tabpane="main" class="mt-3 max-h-[70vh] space-y-3 overflow-y-auto pr-1">' + top
            + '<div class="border-t border-line pt-3"><p class="text-[10px] font-medium uppercase tracking-widest text-muted">Sections · layout + tone</p></div>' + secs
            + '<div class="border-t border-line pt-3"><p class="text-[10px] font-medium uppercase tracking-widest text-muted">Header</p></div>'
            + row("Header · start (top of page)", "hd-start", CH["HD_STATES"]) + row("Header · on scroll", "hd-scroll", [("same", "Same as start")] + CH["HD_STATES"])
            + row("Sub-nav style", "subnav", SUBNAVS) + row("Sub-nav position", "snpos", [("below", "Below hero"), ("above", "Above hero")])
            + '<div class="border-t border-line pt-3"><p class="text-[10px] font-medium uppercase tracking-widest text-muted">Footer rows · layout + tone</p></div>' + frows
            + row("Graphic panel background", "pbg", [("colour", "Panel colour"), ("photo", "Product photo"), ("paraform", "Paraform")])
            + f'<div class="space-y-2 border-t border-line pt-3"><p class="text-[10px] font-medium uppercase tracking-widest text-muted">Feature panel colours</p>{pals}{custom}</div>'
            + row("DigPacks panels", "pvis", [("graphic", "Motion graphic"), ("screen", "Product screen")])
            + "</div>" + ED["EDITOR_HTML"] + "</details>")


def js(default_p, secs=("hero", "problem", "features", "extra", "adv", "close"), prefix="sognos-products-", rail_on=()):
    return ("""<script>
  (() => {
    const h = document.documentElement, store = (k, v) => { try { localStorage.setItem(k, v); } catch {} }, read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
    const GKEYS = ["g1", "g2", "g3", "ga", "gb"];
    const setP = (k) => { h.dataset.pprod = k; document.querySelectorAll("[data-set-p]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.setP === k))); store("sognos-products-p", k);
      document.querySelectorAll("[data-only-p]").forEach((b) => (b.hidden = b.dataset.onlyP !== k));
      const hk = h.getAttribute("data-s-hero"); if (GKEYS.includes(hk) && !document.querySelector(`[data-pp="${k}"] [data-s="hero"][data-v="${hk}"]`)) h.setAttribute("data-s-hero", "a");
      document.dispatchEvent(new CustomEvent("products:product", { detail: k })); scrollTo(0, 0); };
    const SECS = __SECS__, RAILON = __RAILON__;  // RAILON: areas built with a rail start with Rail on
    const PAL = %s;
    document.querySelectorAll("[data-custom-pal]").forEach((inp) => { try { const v = localStorage.getItem("sognos-products-custompal-" + inp.dataset.customPal); if (v) inp.value = v; } catch {} inp.addEventListener("input", () => { store("sognos-products-custompal-" + inp.dataset.customPal, inp.value); PAL.custom = [...document.querySelectorAll("[data-custom-pal]")].map((x) => x.value); setCtl("pal", "custom"); }); });
    PAL.custom = [...document.querySelectorAll("[data-custom-pal]")].map((x) => x.value);
    if (!PAL.custom.length) PAL.custom = (() => { try { return [localStorage.getItem("sognos-products-custompal-0") || "#eef3fd", localStorage.getItem("sognos-products-custompal-1") || "#dfe7fb"]; } catch { return ["#eef3fd", "#dfe7fb"]; } })();
    const applyPal = () => { const cols = PAL[h.dataset.pal] || []; document.querySelectorAll(".fv[data-fi]").forEach((el) => { if (el.dataset.orig === undefined) el.dataset.orig = el.style.background; const c = cols.length ? cols[+el.dataset.fi %% cols.length] : el.dataset.orig; el.style.background = c; el.style.outline = c === "#ffffff" ? "1px solid #e2e8f0" : ""; el.style.outlineOffset = "-1px"; }); };
    const mark = () => { document.querySelectorAll("[data-ctl]").forEach((b) => { const [a, v] = b.dataset.ctl.split(":"); b.setAttribute("aria-pressed", String(h.dataset[a.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] === v)); }); document.querySelectorAll("[data-set-d]").forEach((b) => b.setAttribute("aria-pressed", String(SECS.every((s) => h.getAttribute("data-s-" + s) === b.dataset.setD)))); };
    let setCtl = (a, v) => { h.setAttribute("data-" + a, v); store("sognos-products-" + a, v); mark(); if (a === "pal") applyPal(); };
    const setD = (k) => { SECS.forEach((s) => setCtl("s-" + s, k)); store("sognos-products-d", k); };
    document.querySelectorAll("[data-ctl]").forEach((b) => b.addEventListener("click", () => { const [a, v] = b.dataset.ctl.split(":"); setCtl(a, v); }));
    document.querySelectorAll("[data-set-p]").forEach((b) => b.addEventListener("click", () => setP(b.dataset.setP)));
    document.querySelectorAll("[data-set-d]").forEach((b) => b.addEventListener("click", () => setD(b.dataset.setD)));
    const lockP = "%s";
    setP(lockP || read("sognos-products-p") || "care"); document.dispatchEvent(new CustomEvent("products:product", { detail: h.dataset.pprod }));
    const d0 = read("sognos-products-d") || "a"; SECS.forEach((s) => setCtl("s-" + s, read("sognos-products-s-" + s) || d0));
    SECS.forEach((s) => setCtl("tone-" + s, read("sognos-products-tone-" + s) || "auto"));
    // Rail: move each section's eyebrow into a sticky left rail (lg), any layout.
    // Sections already built with a rail ([data-nrail]) are handled in CSS; [data-rail-label] is a label injected for sections without one.
    const railify = (sec, on) => {
      const box = sec.querySelector(".max-w-7xl"); if (!box || box.querySelector("[data-nrail]")) return;
      if (on && !box.dataset.railed) {
        const eb = [...box.querySelectorAll("p")].find((p) => p.querySelector("span[class*='size-[0.66em]']") && !p.closest("[data-item], a, button")); if (!eb) return;
        const ph = document.createComment("rail-eyebrow"); eb.before(ph); eb._ph = ph;
        const grid = document.createElement("div"); grid.className = "lg:grid lg:grid-cols-12 lg:gap-8"; grid.dataset.railgrid = "";
        const rail = document.createElement("div"); rail.className = "mb-6 lg:col-span-2 lg:mb-0"; const content = document.createElement("div"); content.className = "min-w-0 lg:col-[3/-1]";
        while (box.firstChild) content.appendChild(box.firstChild); rail.appendChild(eb); eb.classList.add("lg:sticky", "lg:top-40"); grid.append(rail, content); box.appendChild(grid); box.dataset.railed = "1"; box._eb = eb;
      } else if (!on && box.dataset.railed) {
        const grid = box.querySelector(":scope > [data-railgrid]"), content = grid.children[1], eb = box._eb;
        while (content.firstChild) box.appendChild(content.firstChild); eb.classList.remove("lg:sticky", "lg:top-40"); eb._ph.replaceWith(eb); grid.remove(); delete box.dataset.railed;
      }
    };
    const topSections = (w) => (w.matches("section") ? [w] : [...w.querySelectorAll("section")].filter((x) => !x.parentElement.closest("section")));
    const applyRail = (s) => document.querySelectorAll(`[data-s="${s}"]`).forEach((w) => topSections(w).forEach((sec) => railify(sec, h.getAttribute("data-rail-" + s) === "on")));
    const _set = setCtl; setCtl = (a, v) => { _set(a, v); if (a.startsWith("rail-")) applyRail(a.slice(5)); };
    SECS.forEach((s) => setCtl("rail-" + s, read("sognos-products-rail-" + s) || (RAILON.includes(s) ? "on" : "off")));
    ["cta", "menu", "accred", "ack", "legal", "graphic"].forEach((r) => { setCtl("fr-" + r, read("sognos-products-fr-" + r) || "a2"); setCtl("ftone-" + r, read("sognos-products-ftone-" + r) || "auto"); });
    setCtl("hd-start", read("sognos-products-hd-start") || "trans-dark"); setCtl("hd-scroll", read("sognos-products-hd-scroll") || "white"); setCtl("snpos", read("sognos-products-snpos") || "below");
    const pal0 = read("sognos-products-pal"); setCtl("pal", pal0 && PAL[pal0] ? pal0 : "prod-auth"); setCtl("subnav", ({ light: "white", tint: "ptint" })[read("sognos-products-subnav")] || read("sognos-products-subnav") || "white"); setCtl("pbg", read("sognos-products-pbg") || "colour"); setCtl("pvis", read("sognos-products-pvis") || "graphic");
    // Sub-nav scroll spy
    const spy = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) document.querySelectorAll(`[data-spy="${e.target.id}"]`).forEach((a) => { a.closest("ul").querySelectorAll("a").forEach((x) => x.removeAttribute("aria-current")); a.setAttribute("aria-current", "true"); }); }), { rootMargin: "-40%% 0px -55%% 0px" });
    document.querySelectorAll("[data-pp] > [id]").forEach((el) => spy.observe(el));
    Object.entries(%s).forEach(([a, d]) => setCtl(a, read("sognos-products-" + a) || d));
    Object.entries(%s).forEach(([a, d]) => setCtl(a, read("sognos-products-" + a) || d));
    setCtl("ab-graphic", read("sognos-products-ab-graphic") || "on");  // DigPacks Asset Booker section graphic
    window.PCtl = { set: (a, v) => setCtl(a, v), setP, setD, PAL };
  })();
</script>""" % (_json.dumps(PAL_DATA), default_p, _json.dumps(CARDS["FC_DEFAULTS"]), _json.dumps(SN_DEFAULTS))).replace("__SECS__", _json.dumps(list(secs))).replace("__RAILON__", _json.dumps(list(rail_on))).replace("sognos-products-", prefix)


NOTE = """Product pages - three system directions, 2026-10-26. Audit: docs/audits/products-audit.md. Live copy throughout.
A Product Light: white/tint surfaces, product colour as accent; split hero with photo + floating card; numbered problem list beside a sticky header; 3-col feature cards; checklist advantages; quote cards.
B Immersive Dark: product-deep surfaces, glow + grid hero, centred copy, wide image stage; glass problem cards; bento features; product-gradient advantages tiles; single spotlight quote + logo row.
C Signature: product-soft hero with large gradient orb, 8/4 split with a feature index; sticky split problem with accent-top cards; alternating feature rows; editions slider; big-numeral advantages index; quote cards.
Tokens (proposed, additive): per-product ladder --p-deep / dark / base / accent / soft / tint / ink / glow / grad / second.
DigPacks aligned to Brand Guidelines v1.0: base #B8166E, secondary #005EB8, grey #4C4C4C, magenta-to-plum gradient (#B8166E > #8A1A5E > #5A1E4A); Sognos type kept (Grover/Gotham not licensed in repo).
Feature panels: motion graphics from the 04b gallery system - SognosCare + SognosRoster (existing), SognosGenogram + DigPacks (new, product-token coloured). DigPacks can switch to its real solution screens.
Controls panel (bottom-right): Product, Direction (sets every section), per-section layout A/B/C + tone (Auto / Light / Tint / Accent / Dark / Gradient), sub-nav colour (Light / Tint / Dark / Gradient / Glass), feature-panel colours (product ladder + every 04b gallery palette: SognosCare, SognosRoster, Frontline, Home Solutions, Home Industries A-F), DigPacks panels (motion graphic / product screen).
Sub-nav: sticky under the header after the hero, anchors to each section with scroll-spy (SognosCare labels live; others follow the pattern - DigPacks labels suggested).
Direction B features: true bento - 3 columns, fixed 23rem rows, feature 1 spans 2x2, panels fill each tile."""


INSP = runpy.run_path(str(Path(__file__).with_name("products_inspector.py")))


def inspector(products):
    tone_bg = dict(TN["BG"])
    cfg = dict(
        products=[(k, n) for k, n in PRODS if k in products],
        sections=SECTIONS, footerRows=CH["FOOTER_ROWS"], footerStyles=CH["FOOTER_STYLES"],
        layouts=[(d, LAYOUT_NAMES[d]) for d in "abc"],
        gallery={pk: [(g, lab) for g, lab, _ in items] for pk, items in GALLERY_HEROES.items()},
        tones=[(k, n, tone_bg.get(k, "")) for k, n in TONES],
        header=[(k, n, CH["HD_SWATCH"][k]) for k, n in CH["HD_STATES"]],
        subnav=[(k, n, {"white": "#fff", "gray": "#f3f4f6", "stint": "#f9fafe", "ptint": "var(--p-soft)", "dark": "var(--p-deep)", "grad": "var(--p-grad)", "glass": "rgb(255 255 255 / .7)", "bar": "#0f1936"}[k]) for k, n in SUBNAVS],
        palettes=[(t, gk, d, names) for t, gk, d, names in PAL_GROUPS],
        directions=[(d, n) for d, n, _ in DIRS],
        closeLayouts=[("d", "D · Story stage")], extraAttrs=["ab-graphic"],
        fc=CARDS["FC"], fcToggles=CARDS["FC_TOGGLES"], fcCare=CARDS["FC_CARE"], fcDefaults=CARDS["FC_DEFAULTS"],
        snLayout=SN_LAYOUT, snDefaults=SN_DEFAULTS, sn02b=SN_02B,
    )
    return INSP["build"](cfg)


def build(name, products, default_p=""):
    ihtml, icss, ijs = inspector(products)
    page(name, f"Products - {'all' if len(products) > 1 else PRODUCTS[products[0]]['name']} - three directions", NOTE,
         ns["FV_CSS"] + ns["XTRA_CSS"] + ns["MOTION_CSS"] + TOKEN_CSS + "<style>\n" + "\n".join(TN["tone_css"](f"tone-{k}", f'[data-s="{k}"]') for k, _ in SECTIONS) + "\n" + "\n".join(TN["tone_css"](f"ftone-{rk}", f'[data-fr="{rk}"] > [data-frv]') for rk, _ in CH["FOOTER_ROWS"]) + "\n" + CH["HEADER_CSS"] + CH["FOOTER_CSS"] + "\n</style>" + CARDS["FC_CSS"] + CARDS["STAGE_CSS"] + SN_CSS + AB["CSS"]
         + CH["HEADER"] + body(products) + CH["FOOTER"] + icss + ihtml + js(default_p) + ns["FV_JS"] + ns["MOTION_JS"] + CH["HEADER_JS"] + ED["EDITOR_JS"] + CARDS["STAGE_JS"] + ijs + (AB["drawer"](P) + AB["js"]() if "digpacks" in products else ""))


if __name__ == "__main__":
    build("index.html", [k for k, _ in PRODS])
    for k, _ in PRODS:
        build(f"{k}.html", [k], k)
    print("wrote", sorted(f.name for f in OUT.glob("*.html")))
