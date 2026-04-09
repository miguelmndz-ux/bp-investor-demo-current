# BuildParty — Claude Code Guide

## What This Project Is

BuildParty is a live platform for AI builder communities (launch, demo, learn, build together). This repo is the investor demo + product foundation.

The product model is: **Owner → Community → Program → Session**

The first feature being built is the **Apex PH Activation Flow** — Apex (the AI launch agent) scans Product Hunt, enriches founder profiles, drafts outreach, and guides founders into a live BuildParty session.

## Repo Structure

```
bp-investor-demo-current/
  web/                        ← Next.js app (all code lives here)
  docs/                       ← Product docs (PRDs, strategy, specs, plans)
    superpowers/
      specs/                  ← Design specs
      plans/                  ← Implementation plans
  apex-dashboard.html         ← Original design reference (do not edit)
  DESIGN.md                   ← Design system source of truth
  CLAUDE.md                   ← This file
```

## Key Commands

All commands run from `web/`:

```bash
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build
npm run test         # Run tests in watch mode (Vitest)
npm run test:run     # Run tests once
npm run lint         # ESLint
```

## Tech Stack

- **Framework:** Next.js 15 (App Router, client components throughout)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3 with custom design tokens
- **Icons:** Material Symbols Outlined (Google CDN)
- **Fonts:** Plus Jakarta Sans (headlines), Inter (body/labels) via next/font
- **Video:** LiveKit React SDK (for live session screen, not yet built)
- **Testing:** Vitest + React Testing Library
- **Deploy:** Vercel (root directory set to `web/`)

## Design System Rules — Always Follow

Source of truth: `DESIGN.md` and `web/src/styles/globals.css` + `web/tailwind.config.ts`.

**Colors:** Orange/cream palette. Use Tailwind tokens — never hardcode hex values.
- `text-primary` / `bg-primary` — dark orange (`#9c3f00`), used for text and icons
- `bg-primary-container` / `text-on-primary-container` — bright orange (`#ff7a2f`), used for fills
- `bg-background` / `text-on-background` — page base colors

**Typography:**
- Headlines: `font-jakarta font-black` (Plus Jakarta Sans)
- Body: `font-body` or just default (Inter)
- Never use system fonts

**Shape:** Pill-shaped everything. Use `rounded-full` for buttons/avatars, `rounded-2xl` for cards.

**Glass effects:** Use `.premium-glass` class for cards/panels. Use `.glass-button` for secondary action buttons. Do not replicate these styles inline — use the classes.

**Animations:** Use `.fade-up`, `.fade-up-1` through `.fade-up-4` for page-load entrance animations.

**Mode:** Light mode only. No dark mode.

## Architecture Patterns

### Adding a new screen

1. Create `web/src/app/<route>/page.tsx`
2. Mark it `'use client'` at the top
3. The root layout (`web/src/app/layout.tsx`) automatically wraps all pages in `AppShell` (SideNav + TopNav + main content area)
4. No additional wiring needed

### Adding new components

- Apex-specific: `web/src/components/apex/`
- Layout: `web/src/components/layout/`
- Shared UI primitives: `web/src/components/ui/`
- Session/LiveKit: `web/src/components/session/`

### Faked data

All mock data lives in `web/src/lib/fixtures/` as typed TypeScript objects. Components import directly — no API calls, no loading states for demo screens. Types are defined in `web/src/lib/fixtures/types.ts`.

### Testing

Each component gets a test file at `__tests__/<ComponentName>.test.tsx` next to the component. Tests are smoke tests — render the component, check key text/elements are present. Keep them focused and fast.

## Important Constraints

- **Demo-first:** Data is faked in fixtures. Don't add real API calls unless specifically asked.
- **No dark mode:** Light mode only.
- **No feature creep:** Build exactly what's asked per prompt. Don't add extra screens, components, or behaviors beyond the spec.
- **Design fidelity:** Every screen must match the orange/cream glassmorphism aesthetic. When in doubt, check `apex-dashboard.html` as the visual reference.
- **Flexible routing:** Don't lock in a rigid navigation structure. New routes are added one at a time as prompted.
- **Tailwind v3:** The project uses Tailwind v3, not v4. Do not upgrade or use v4 syntax.

## Product Context

Full product context in `docs/`:
- `docs/BuildParty_PRD.md` — original PRD
- `docs/033126_build_party_prd_reframed_mvp_v_1_v_2_v_3.md` — reframed PRD (MVP → V3)
- `docs/buildparty-agent-strategy.md` — the five agents (Nova, Echo, Orbit, Flare, Apex)
- `docs/product-launch-agent-competitive-analysis.md` — Apex competitive analysis

## Live Session Screen (future)

When building the live session screen:
- Use `@livekit/components-react` for real camera/video
- Token endpoint goes at `web/src/app/api/livekit/route.ts`
- Interactive micro-experiences are absolute-positioned React components layered over the stage
- This is the only screen requiring real infrastructure — everything else uses fixtures
