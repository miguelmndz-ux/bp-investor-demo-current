# Agents Introduction Screen — Design Spec
**Date:** 2026-04-20  
**Taxonomy:** 0.0  
**Route:** `/agents`

---

## Overview

A new introductory screen that presents all five BuildParty agents (Nova, Echo, Orbit, Flare, Apex) before the user enters any agent-specific flow. This screen gives investors and founders full "constellation" context upfront and serves as the entry point for the Apex PH Activation flow.

---

## Routing & Navigation Changes

- **New route:** `/agents` → `web/src/app/agents/page.tsx`
- **SideNav update:** Rename label `"Apex"` → `"Agents"`, change `href` to `/agents`, update active check to `pathname.startsWith('/agents')`. The `auto_awesome` sparkle icon stays.
- **Apex card click:** navigates to `/apex`
- **Other 4 cards:** non-navigable (coming soon)
- **CLAUDE.md taxonomy:** add row `0.0 | Agents Introduction | /agents | Built`

---

## Page Layout

```
[Page — standard AppShell content area]
  [Header section — fade-up fade-up-1]
    Eyebrow label: "BUILDPARTY AGENTS"
    Headline: "The Constellation"
    Subheadline: "Five agents. One live operating layer."

  [5-column card grid — fade-up fade-up-2]
    5 equal columns, gap-6, full content width
```

---

## Page Header

| Element | Style |
|---|---|
| Eyebrow | `text-xs font-extrabold tracking-widest text-primary uppercase` |
| Headline | `font-jakarta font-black text-4xl text-on-background` |
| Subheadline | `text-base text-on-background/60` |

---

## Agent Card Anatomy

Structure: `premium-glass rounded-2xl p-6 flex flex-col gap-4 relative`

Top to bottom:
1. **Mascot placeholder** — centered `88×88px` `rounded-full` div with a radial gradient + matching `box-shadow` glow. Swap for `<img>` when 3D renders are ready.
2. **Agent name** — `font-jakarta font-black text-xl text-on-background`
3. **Description** — `text-sm text-on-background/70`, 2–3 lines from agent strategy doc

### Agent Colors

| Agent | Placeholder Gradient | Glow color |
|---|---|---|
| Nova | `#f59e0b → #d97706` (amber/gold) | `rgba(245,158,11,0.35)` |
| Echo | `#06b6d4 → #0891b2` (teal/cyan) | `rgba(6,182,212,0.35)` |
| Orbit | `#8b5cf6 → #7c3aed` (violet) | `rgba(139,92,246,0.35)` |
| Flare | `#f43f5e → #e11d48` (rose/coral) | `rgba(244,63,94,0.35)` |
| Apex | `#ff7a2f → #c24e00` (brand orange) | `rgba(255,122,47,0.35)` |

### Active State (Apex only)

- Full opacity
- `cursor-pointer`
- Card hover: liquid glass border `1px solid rgba(255,122,47,0.3)` + `hover:scale-[1.02]` transition
- Click → navigate to `/apex`

### Coming Soon State (Nova, Echo, Orbit, Flare)

- `opacity-50`
- `cursor-not-allowed`
- `LockSimple` Phosphor icon (`size={14}`, `weight="bold"`) in absolute top-right corner of card (`top-4 right-4`)
- No hover effect

---

## Agent Descriptions (from strategy doc)

| Agent | Description |
|---|---|
| **Nova** | Orchestrates every live session — managing introductions, timing, Q&A, and engagement from the moment the room opens. |
| **Echo** | Captures everything said in a session and turns it into structured recaps, personalized follow-ups, and searchable memory. |
| **Orbit** | Lives inside the CoBuild environment — context-aware coding support that adapts to each builder's skill level in real time. |
| **Flare** | Transforms session highlights into platform-native content — quote cards, threads, highlight reels — minutes after a session ends. |
| **Apex** | Full-arc product launch director. Runs D-30 to D+30, coordinating assets, outreach, monitoring, and live BuildParty events. |

---

## Out of Scope

- Real 3D mascot renders (placeholder orbs only)
- Clickable flows for Nova, Echo, Orbit, Flare
- Mascot prompt generation (separate conversation after screen is built)
