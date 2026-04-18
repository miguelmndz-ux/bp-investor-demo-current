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
  input/                      ← Design references, HTML prototypes, and meeting transcripts from Rob
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

**Outlined status badges:** Used for lifecycle/status labels in tables and data views. Style: `border-2` colored border, `bg-white`, `text-on-background` (black text), `rounded-[6px]`, `px-2.5 py-1`, `text-[10px] font-extrabold`. Border color distinguishes the status — never fill the background with color. Use `rounded-[6px]` (not `rounded-full`) to match the reference style.

```tsx
<span className="border-2 border-emerald-400 bg-white text-on-background text-[10px] font-extrabold px-2.5 py-1 rounded-[6px] whitespace-nowrap">
  Confirmed
</span>
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

### `premium-glass` warm tint from `saturate(180%)`

`premium-glass` applies `backdrop-filter: saturate(180%)`, which amplifies the page's orange/cream gradient into a visible warm peach tint behind the element. For panels or cards where you want a neutral white/transparent background, skip `premium-glass` and set the background directly instead (e.g. `background: 'rgba(255,255,255,0.85)'`).

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

### Full-screen iframes cover the concave corner

The AppShell's concave corner (the clip-path white wedge at the SideNav/TopNav junction) cannot reliably appear above a `position: fixed` iframe via z-index alone — the iframe creates its own stacking context that can paint above even high z-index values in practice.

**Fix:** Add `rounded-tl-3xl overflow-hidden` to the iframe wrapper div. This clips the iframe content at a 24px radius (matching the AppShell arc), letting the AppShell background show through the corner naturally — no z-index required.

```tsx
// ✅ correct — concave corner shows through clipped corner
<div className="fixed top-16 left-20 right-0 bottom-0 rounded-tl-3xl overflow-hidden">
  <iframe className="w-full h-full border-0" ... />
</div>

// ❌ wrong — concave corner gets buried by iframe stacking context
<div className="fixed top-16 left-20 right-0 bottom-0">
  <iframe className="w-full h-full border-0" ... />
</div>
```

### Editing large static HTML files in `web/public/`

Files like `web/public/apex/luma-event.html` can exceed 1MB and cannot be read directly with the Read tool. Use Python scripts for all edits. Key gotchas:

- **CSS is base64-encoded:** Styles are stored as data URIs in `<link href="data:text/css;base64,...">` tags — injecting a `<style>` override block is not reliable.
- **CSS custom property cascade:** `!important` on a custom property set on an ancestor does **not** override the same property declared directly on a descendant element. If colors persist after an injected override, the fix is to decode all base64 CSS blocks with Python, replace the hex values, and re-encode them.
- **Unicode in Python scripts:** Add `sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')` to avoid `UnicodeEncodeError` on Windows when printing non-ASCII characters.
- **`email-body.html` must stay in sync with `email.html`:** `web/public/gmail-flow/email-body.html` is extracted from `web/public/gmail-flow/email.html` via `input/rev/extract_email_body.py`. They share the same email body HTML. Always update both files together — run the Python replacement against both paths in the same script. Never edit one without the other.

### Resetting component state across renders with `key`

`useState(initialValue)` only uses the initial value on *first mount* — it doesn't reset when the parent re-renders with new props. If you need a child to always start fresh (e.g. an overlay that must begin at `opacity: 1` on every phase change), extract it as its own component and pass a changing `key`:

```tsx
// ✅ Each phase gets a fresh component — useState(1) is guaranteed on first paint
<PhaseOverlay key={activePhaseIndex} />

// ❌ Reuses the same instance — state carries over from the previous phase
<PhaseOverlay activePhaseIndex={activePhaseIndex} />
```

This is especially useful for animations that must start from a fixed initial value on every trigger. See `PhaseOverlay` in `web/src/components/apex/ApexScanOverlay.tsx`.

### One-sided overflow clipping with `clip-path`

`overflow: hidden` clips all four sides, which breaks elements that intentionally extend past one edge (e.g., a carousel whose left fade/arrow use negative positioning to reach the sidebar). Use `clip-path: inset()` with a large negative value on the side you want to keep open:

```tsx
// Clips right, top, bottom — but lets left side overflow freely
<div style={{ clipPath: 'inset(0 0 0 -9999px)' }}>
```

See `web/src/components/discover/SessionCarousel.tsx` for this pattern.

## Architecture Patterns

### Adding a new screen

1. Create `web/src/app/<route>/page.tsx`
2. Mark it `'use client'` at the top
3. The root layout (`web/src/app/layout.tsx`) automatically wraps all pages in `AppShell` (SideNav + TopNav + main content area)
4. No additional wiring needed
5. **Assign a taxonomy number** — every screen in the demo must have one (see Screen Taxonomy below). Update the FigJam board, Figma design file, and screen inventory spreadsheet to reflect the new screen.

### Adding new components

- Apex-specific: `web/src/components/apex/`
- Discover/browse: `web/src/components/discover/`
- Layout: `web/src/components/layout/`
- Shared UI primitives: `web/src/components/ui/`
- Session/LiveKit: `web/src/components/session/`

### Shared UI components

When a UI pattern appears in more than one page, extract it to `web/src/components/ui/`. Don't duplicate styling across components — import the shared primitive.

Existing shared components:
- `PillButton` — liquid glass filter pill used on discover page and community profile. Always use this instead of inlining the pill style.

### SideNav active state

SideNav uses `usePathname()` to determine which icon is active — never hardcode the `active` prop. When adding a new route to the sidebar, add a NavItem with a pathname check (e.g., `active={pathname === '/discover'}` or `active={pathname.startsWith('/apex')}`).

### Hover effects

Don't use `hover:-translate-y-*` or `hover:shadow-*` on cards. Use a simple opacity change on hover instead (e.g., `hover:opacity-80` or brightening the background). Keep it subtle.

### Preview side panels

The Discover page's preview panel is a full-height right sidebar (`fixed top-16 right-0 bottom-0`), styled to match the PreParty channel sidebar: `rgba(255,255,255,0.45)` background with `blur(40px)` backdrop and a left border. It uses a solid background (`#fef9f4`) to prevent content from showing through. Content uses `flex-col h-full` with a `flex-1` spacer to pin the CTA button to the bottom. See `web/src/components/discover/PreviewPanel.tsx`.

When the panel opens, the parent content area applies `marginRight: 380` to avoid overlap. Full-bleed elements (like carousels) must react to this margin — see the carousel pattern below.

### Full-bleed carousels

`SessionCarousel` extends edge-to-edge (sidebar to viewport right) by measuring its position with `getBoundingClientRect()` and setting explicit pixel widths. Key details:

- **Right edge:** Uses `window.innerWidth` when the preview panel is closed. When open, detects the parent's `marginRight` via `getComputedStyle()` and subtracts it: `rightTarget = window.innerWidth - parentMarginRight`.
- **Left edge:** Extends to the sidebar (80px) using negative `marginLeft` and compensating `paddingLeft` on the scroll container.
- **Card alignment:** The first card's cover image aligns with the section title by offsetting `paddingLeft` by the card's internal padding (`p-3.5` = 14px).
- **Fade effects:** Left and right fades use matching dynamic widths (`leftOffset + 56` px). Right side uses `clip-path: inset(0 0 0 -9999px)` to clip overflow without breaking the left fade's negative positioning.
- **Arrow buttons:** Only visible on hover. Left arrow appears only when scrolled. Right arrow aligns with the "Show All" link (`right: 48px` matching `pr-12`).
- **Reactivity:** A `ResizeObserver` on the parent re-measures on panel open/close.

See `web/src/components/discover/SessionCarousel.tsx`.

### Faked data

All mock data lives in `web/src/lib/fixtures/` as typed TypeScript objects. Components import directly — no API calls, no loading states for demo screens. Types are defined in `web/src/lib/fixtures/types.ts` and `web/src/lib/fixtures/discover-types.ts`.

When populating fixtures, prefer real data from public sources (Luma events, Maven courses, Unsplash photos) over placeholder content like picsum.photos. Use real community logos, real event titles, and real instructor names — it makes the demo more convincing.

### Modals

All modals must:
- Render via `createPortal(…, document.body)` to escape AppShell's stacking context
- Lock body scroll on mount: `document.body.style.overflow = 'hidden'`, restore on unmount
- Close on backdrop click (`if (e.target === e.currentTarget) onClose()`) and on `×` button
- Use `z-[60]` or higher (SideNav is `z-50`, TopNav is `z-40`)

See `web/src/components/apex/OutreachDraftModal.tsx` as the reference implementation.

### Content-area overlays

The Apex scan overlay covers only the main content area (not SideNav/TopNav) using `fixed top-16 left-20 right-0 bottom-0 z-[45]`. It renders inline (no `createPortal`). Background matches the dashboard gradient (`#fffaf7 → #fff1e6`). See `web/src/components/apex/ApexScanOverlay.tsx`.

### Toasts

Success toasts render via `createPortal(…, document.body)` at `z-[200]`, positioned `fixed top-6 right-6`. They auto-dismiss after a duration and slide in from the right using the `slideIn` keyframe. See `web/src/components/ui/SuccessToast.tsx` as the reference implementation.

### Two-column profile layout

Community profile pages use a sticky left panel (30%) + scrollable right content (70%) with `flex items-start gap-10`. The left panel must use the two-div sticky pattern (see `premium-glass` + `sticky` gotcha above). See `web/src/components/apex/CommunityProfile.tsx`.

### Embedding external HTML files

Static HTML files go in `web/public/apex/` and are embedded via `<iframe>` with `sandbox="allow-scripts allow-same-origin"`. Wrap in a `rounded-lg overflow-hidden border` container. Link out to the full file with `target="_blank"`. See `DecodePreviewCard.tsx`.

For full-screen iframes (pages that render the iframe as the entire content area), always add `rounded-tl-3xl overflow-hidden` to the wrapper div so the AppShell concave corner renders correctly (see gotcha above).

### Canvas-based animations

For pixel/particle animations, use an HTML Canvas with `requestAnimationFrame` inside `useEffect`. Key details:

- **Sizing:** Measure the canvas with `canvas.offsetWidth / offsetHeight` inside `useEffect` (after first paint), then assign to `canvas.width / canvas.height`. Never rely on CSS `width: 100%` alone — the canvas drawing buffer stays at its default 300×150 until explicitly set.
- **Time origin:** Capture `t0` from the first RAF timestamp (`if (t0 < 0) t0 = now`) rather than `Date.now()` to avoid drift between the animation loop and the browser's rendering pipeline.
- **Cleanup:** Always return `() => cancelAnimationFrame(rafId)` from the effect.
- **Performance:** With many canvas instances running in parallel (e.g. 10 loading cards), skip invisible pixels early: `if (intensity < 0.02) continue`.

See `DotGridCard` in `web/src/components/apex/ApexScanOverlay.tsx` for the reference implementation.

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
- **No competitors in demo data:** Don't feature competing platforms (e.g., Build Club) in fixture data. Use non-competing AI communities instead.

## Screen Taxonomy

Every screen in the investor demo has a numeric taxonomy label (e.g., `1.0`, `1.2.1`, `5.0`). This taxonomy is the shared language between design, code, and investor conversations. Rob references screens by number.

### Current taxonomy

| # | Screen | Route / Location | Status |
|---|--------|-----------------|--------|
| 0.0 | Agents Introduction | — | Not built |
| 1.0 | Apex is running (scan overlay) | `/apex` (overlay) | Built |
| 1.0.1 | Apex run complete | `/apex` (overlay final state) | Built |
| 1.1 | Apex Admin Dashboard | `/apex` | Built |
| 1.1.1 | Outreach Draft Modal | `/apex` (modal) | Built |
| 1.1.2 | Outreach Sent Success Overlay | `/apex` (overlay) | Built |
| 1.2 | Community Profile Page | `/apex/community/[slug]/owner` | Built |
| 1.2.1 | Decode Page | — | Not built |
| 1.2.2 | Course Page | `/apex/community/[slug]/courses` | Built |
| 1.2.3 | Both View (Split Decode + Course) | `/apex/community/[slug]/both` | Built |
| 2.0 | Founder checks Gmail inbox | — | External |
| 2.1 | Founder opens BuildParty email | — | External |
| 3.0 | BuildParty Sign-Up Screen | `/signup` | Built |
| 3.1 | BuildParty Profile Details | `/profile-details` | Built |
| 3.2 | "What to Expect" Screen | `/what-to-expect` | Built |
| 3.3 | Slot Selection Screen | `/slot-selection` | Built |
| 3.4 | Session Confirmation Screen | `/session-confirmation` | Built |
| 4.0 | Luma Event Page Live | — | External |
| 5.0 | Discovery Page | `/discover` | Built |
| 5.0.1 | Session preview panel + RSVP | `/discover` (panel) | Built |
| 5.0.2 | You're in! Overlay | — | Not built |
| 5.0.3 | Rob clicks "Join the PreParty" | — | Not built |
| 6.0 | Nova: PreParty Lobby | `/preparty` | Built |

### Taxonomy rules

- **Every screen gets a number.** No screen exists in the app without a taxonomy entry.
- **Hierarchical dot notation:** top-level flows are integers (1, 2, 3…), sub-screens use decimals (1.2, 1.2.1). Modals/overlays on a parent screen are sub-numbers of that parent (e.g., 1.2.1 is a modal on 1.2).
- **Three artifacts must stay in sync** when adding, removing, or renaming screens:
  1. **FigJam board** — workflow diagram with numbered labels (file key: `lHeDvpwvVswnuSVF0tAcao`, section `252:1435`)
  2. **Figma design file** — frame with taxonomy badge + colored border (file key: `Fl5XvddT3QsN2VRokrFuqs`, section `7975:2252`, page "THUMBNAIL")
  3. **Screen inventory spreadsheet** — `Investor Sequence.xlsx` at `bp-investor-demo-current/Investor Sequence.xlsx`. Columns: `#`, `Screen`, `Notes` (Rob's feedback per screen), `Estimates (hrs)`.
- **Border colors in the Figma design file** indicate build status:
  - **Gray** — Not started
  - **Orange** — In development
  - **Red** — Rob to review
  - **Green** — Rob approved

### When changing screens

If you add, remove, rename, or restructure a screen:
1. Update the taxonomy table above in this file
2. Update the **FigJam board** using `use_figma` on file key `lHeDvpwvVswnuSVF0tAcao`: create a `ShapeWithTextNode` (shapeType `SQUARE`, salmon fill matching existing nodes), a text label for the taxonomy number, and a connector to the adjacent node. Nodes are spaced ~336px apart horizontally at y=256; taxonomy labels sit at y=408.
3. Update the **Figma design file** using `use_figma` on file key `Fl5XvddT3QsN2VRokrFuqs`, appending to section `7975:2252`: add a `[Taxonomy] #.#` frame (320×150, y=231), a `[Placeholder] #.# – Name` frame (2962×1547, y=441), and a `[Border] #.#` rectangle (same dimensions, no fill, colored stroke). Screens are spaced 3212px apart (2962px content + 250px gap). Border stroke color: **gray** = not started, **orange** = in development, **red** = Rob to review, **green** = Rob approved.
4. Update `Investor Sequence.xlsx` — add a row with the taxonomy number, screen name, notes, and estimate.

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
