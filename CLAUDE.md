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

**Liquid glass buttons:** A recurring "liquid glass" style used for interactive elements (action buttons, active filter pills, sidebar active state, preview card CTAs). Apply via inline `style`:

```tsx
style={{
  background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(255, 122, 47, 0.3)',
  boxShadow: '0 8px 32px -4px rgba(194, 78, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
  color: '#7a2e00',
}}
```

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

### `premium-glass` breaks `sticky` positioning

`premium-glass` sets `overflow: hidden`, which breaks `position: sticky` on the same element or its ancestors. When you need a sticky glass card, use two nested divs:

```tsx
{/* Outer div is sticky — no overflow:hidden */}
<div className="sticky top-24">
  {/* Inner div gets premium-glass */}
  <div className="premium-glass rounded-2xl p-6">
    ...
  </div>
</div>
```

Never put `sticky` and `premium-glass` on the same element.

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

### Content-area overlays

The Apex scan overlay covers only the main content area (not SideNav/TopNav) using `fixed top-20 left-20 right-0 bottom-0 z-[45]`. It renders inline (no `createPortal`). Background matches the dashboard gradient (`#fffaf7 → #fff1e6`). See `web/src/components/apex/ApexScanOverlay.tsx`.

### Toasts

Success toasts render via `createPortal(…, document.body)` at `z-[200]`, positioned `fixed top-6 right-6`. They auto-dismiss after a duration and slide in from the right using the `slideIn` keyframe. See `web/src/components/ui/SuccessToast.tsx` as the reference implementation.

### Two-column profile layout

Community profile pages use a sticky left panel (30%) + scrollable right content (70%) with `flex items-start gap-10`. The left panel must use the two-div sticky pattern (see `premium-glass` + `sticky` gotcha above). See `web/src/components/apex/CommunityProfile.tsx`.

### Embedding external HTML files

Static HTML files go in `web/public/apex/` and are embedded via `<iframe>` with `sandbox="allow-scripts allow-same-origin"`. Wrap in a `rounded-lg overflow-hidden border` container. Link out to the full file with `target="_blank"`. See `DecodePreviewCard.tsx`.

### Cross-component events

For communication between unrelated components (e.g., scan overlay → sidebar progress indicator), use `window.dispatchEvent(new CustomEvent(...))` and `window.addEventListener(...)`. See the `apex-scan-progress` event dispatched by `ApexScanOverlay` and consumed by `SideNav`.

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
