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

## Known Gotchas

### Material Symbols icon sizing

The Google Fonts Material Symbols CDN stylesheet sets `font-size: 24px` on `.material-symbols-outlined`. This has the same CSS specificity as Tailwind utility classes (`text-8xl`, `text-[200px]`, etc.) and the CDN rule can win due to load order. **Always use inline `style` for any non-default icon size:**

```tsx
// ✅ correct — inline style always wins
<span className="material-symbols-outlined" style={{ fontSize: '96px', lineHeight: '1' }}>
  trending_up
</span>

// ❌ wrong — may be overridden by CDN stylesheet
<span className="material-symbols-outlined text-8xl">trending_up</span>
```

Default nav icons at ~24px are fine with just the class.

### Custom border radius tokens override Tailwind defaults

`tailwind.config.ts` overrides several radius values — know what you're getting:
- `rounded` (DEFAULT) = `1rem` (16px)
- `rounded-lg` = `2rem` (32px)
- `rounded-xl` = `3rem` (48px) — fully rounds anything narrower than 96px
- `rounded-full` = `9999px`
- `rounded-2xl`, `rounded-3xl`, etc. = Tailwind defaults (not overridden)

Use arbitrary values like `rounded-[10px]` when the tokens don't fit (e.g. tooltip pills, small icon containers).

### Tooltips/popovers inside `overflow-y-auto` containers

CSS forces `overflow-x: auto` whenever `overflow-y: auto` is set on the same element, clipping any absolutely-positioned children horizontally. Use `createPortal` + `position: fixed` + `getBoundingClientRect()` for anything that needs to escape a scroll container:

```tsx
function Tooltip({ label, y }: { label: string; y: number }) {
  return createPortal(
    <div className="fixed pointer-events-none z-[200]"
         style={{ left: 92, top: y, transform: 'translateY(-50%)' }}>
      ...
    </div>,
    document.body
  )
}
// Anchor: onMouseEnter → getBoundingClientRect() → set y in state
```

See `web/src/components/layout/SideNav.tsx` for the full pattern.

### `overflow-hidden` + `hover:scale-*` clips the first item

When a scroll container (`overflow-y-auto`) holds items with a scale hover effect, the first item gets clipped at the container's top boundary. Add `pt-1` to the scroll container to give the first item room.

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

### Modals

All modals must:
- Render via `createPortal(…, document.body)` to escape AppShell's stacking context
- Lock body scroll on mount: `document.body.style.overflow = 'hidden'`, restore on unmount
- Close on backdrop click (`if (e.target === e.currentTarget) onClose()`) and on `×` button
- Use `z-[60]` or higher (SideNav is `z-50`, TopNav is `z-40`)

See `web/src/components/apex/OutreachDraftModal.tsx` as the reference implementation.

### Full-screen overlays

Same portal + scroll-lock rules as modals, with two differences:
- Use `z-[100]` to guarantee they sit above everything (SideNav `z-50`, TopNav `z-40`, modals `z-[60]`)
- No backdrop click-to-close — they own the full screen and dismiss on their own terms

See `web/src/components/apex/ApexScanOverlay.tsx` as the reference implementation.

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

## Deployment

- **Platform:** Vercel
- **Root directory:** `web/`
- **Production branch:** `master` (not `main`)
- **Live URL:** https://bp-investor-demo-current-k890mz3n0-miguels-projects-854c1db4.vercel.app/apex
- Vercel auto-deploys on every push to `master`

## Live Session Screen (future)

When building the live session screen:
- Use `@livekit/components-react` for real camera/video
- Token endpoint goes at `web/src/app/api/livekit/route.ts`
- Interactive micro-experiences are absolute-positioned React components layered over the stage
- This is the only screen requiring real infrastructure — everything else uses fixtures
