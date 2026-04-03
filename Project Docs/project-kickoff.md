# Sognos Website — Execution Rules

> Alignment note: Updated during the architecture-alignment pass so kickoff guidance reflects takeover/continuation rules for the in-progress build rather than initial project setup.

## Role of the Primary Agent

The primary agent is responsible for:
- project planning
- architecture enforcement
- documentation maintenance
- implementation coordination

This role continues an in-progress build. It does not restart or redesign the project.

## Mandatory First Step for Any New Work

Before implementation:
1. read all markdown files in `/Project Docs/`
2. read the current homepage section components
3. read navigation config
4. confirm the current architecture against the live codebase

Do not begin new build work without first checking for drift between docs and code.

## Architecture Rules

### Products

Primary:
- SognosCare
- SognosRoster

### Solutions

Supporting:
- Field Service
- Customer Relationship Management
- Customer Insights
- Customer Experience
- Customer Service
- Power Platform
- Quick Start

### Industries

Separate:
- Health & Social Care
- Facilities Management
- Local Government
- Industrial Services
- Energy & Utilities

### Platform Rule

Dynamics 365, Copilot, and Power Platform are embedded supporting proof only.

They must not become:
- a top-level nav item
- a standalone page layer
- a primary positioning message

## Homepage Source of Truth

```tsx
<Hero />
<LogoStrip />
<HowSognosWorksPreview />
<ProductSection />
<HowItWorks />
<SolutionsSection />
<IndustrySection />
<ProofSection />
<CTASection />
```

Additional rules:
- `HowSognosWorksPreview` is visual-first
- `HowItWorks` is the detailed operational flow
- `SolutionsSection` must not include industries
- `IndustrySection` must include Industrial Services and Energy & Utilities

## Documentation Rules

Keep these files aligned with code:
- `/Project Docs/project-overview.md`
- `/Project Docs/project-plan.md`
- `/Project Docs/project-kickoff.md`
- `/Project Docs/sognos_website_strategy.md`

Never leave:
- outdated phase descriptions
- outdated component names
- outdated nav references
- contradictory architecture statements

## Execution Method

For each task:
1. state what is outdated
2. state what must change
3. make the changes
4. verify consistency
5. summarize files changed, what was fixed, and what remains next

Be conservative.
Do not make speculative design decisions unless explicitly asked.
