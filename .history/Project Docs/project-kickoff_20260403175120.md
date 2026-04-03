## 🔴 INITIAL INSTRUCTION (MANDATORY)

Before doing anything:

1. Read ALL markdown files inside:
   `/Project Docs/`

This includes:
- Project overview
- Project phases
- Website strategy
- Architecture & build spec

You MUST fully understand:
- Product-first positioning
- SognosCare + SognosRoster system
- Next.js architecture
- Component structure

Reference files:
- project-overview.md
- project-plan.md
- sognos_website_strategy.md

Do NOT begin building until this is complete.

---

## ⚙️ SETUP REQUIREMENTS (MANDATORY)

You MUST use the following setup:

1. Create project:
   `npx create-next-app@latest sognos-react`

2. Ensure configuration:
- App Router enabled
- TypeScript enabled
- Tailwind CSS enabled
- NO `/src` directory (use root)

3. Install additional packages:
- shadcn/ui (setup only)
- framer-motion

4. Clean boilerplate:
- Remove all default content
- Keep minimal structure only

---

## 🚫 HARD RULES

- DO NOT redesign anything
- DO NOT add styling decisions
- DO NOT simplify architecture
- DO NOT reintroduce “solutions” structure
- DO NOT deviate from provided file structure

You are:
👉 Builder + Architect (NOT designer)

---

## 🧠 YOUR ROLE

You are responsible for:

- Structure
- Content placement
- Component architecture
- File creation
- Build logic

You are NOT responsible for design.

---

## 📄 REQUIRED ACTION (MANDATORY FIRST STEP)

Create a file:

`/claude.md`

This file must include:

### 1. Project Understanding
- What Sognos is
- Product system (Care + Roster)
- Core objective

### 2. Build Plan
- Phase-by-phase breakdown (from project phases doc)

### 3. File Structure Plan
- Next.js app structure
- Components to be created

### 4. Current Task
- What you are about to build next

### 5. Next Tasks
- Ordered execution steps

This file will act as your execution control system.

---

## 🚀 AFTER claude.md

Begin **Phase 1: Foundation & Setup**

### Tasks:

1. Initialize Next.js App Router structure
2. Create `/app/(marketing)/layout.tsx`
3. Create:
   - `Navbar.tsx`
   - `Footer.tsx`
4. Setup navigation config:
   `/lib/navigation.ts`

5. Ensure navigation includes:
- SognosCare
- SognosRoster

---

## 📦 OUTPUT FORMAT

- File-by-file output
- Clean, production-ready code
- No styling beyond basic structure

---

## 🎯 SUCCESS CONDITION

You have succeeded when:

- `claude.md` is complete
- Project scaffold is correct
- Navbar + Footer exist
- Navigation matches product-first spec

---

## 🔥 FINAL RULE

Think like:
👉 You are building the foundation of a SaaS product platform

NOT:
👉 A marketing template

Proceed.
