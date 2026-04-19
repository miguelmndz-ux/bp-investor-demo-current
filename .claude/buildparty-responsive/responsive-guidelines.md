# BuildParty Responsive Guidelines

These principles apply to every /buildparty-responsive run. Do not re-ask about any of these — apply them automatically.

## Breakpoints
Mobile-first. Write styles for mobile (default), override at `md:` (768px+) for tablet/desktop.
- Default (0px+): Mobile — iPhone viewport, primary investor demo target
- `md:` (768px+): Tablet and desktop — desktop layout restored here
- `lg:` (1024px+): Wide desktop only — rarely needed

## Navigation
- Desktop: SideNav (80px left) + TopNav (64px top) — unchanged
- Mobile: TopNav (full width) + BottomNav (fixed bottom, 64px tall) — SideNav hidden
- BottomNav is already implemented at `web/src/components/layout/BottomNav.tsx`
- Never re-implement mobile nav inline on individual screens

## Touch Targets
All interactive elements must be at least 44×44px: `min-h-[44px] min-w-[44px]`

## Design System
- No hardcoded hex values — use design tokens from `DESIGN.md` and `tailwind.config.ts`
- Phosphor icons only for new mobile UI elements (`@phosphor-icons/react`)
- Do not add new Material Symbols icons to any component
- `rounded-full` for buttons/avatars, `rounded-2xl` for cards — same as desktop
- Light mode only — no dark mode
- Use existing utility classes: `.premium-glass`, `.glass-button`, `.fade-up`

## Grid Collapse Rules (apply automatically from globalRules in KB)
- `grid-cols-12` → `grid-cols-1 md:grid-cols-6 lg:grid-cols-12`
- `grid-cols-4`  → `grid-cols-2 md:grid-cols-4`
- `grid-cols-3`  → `grid-cols-1 md:grid-cols-3`
- `grid-cols-2`  → `grid-cols-1 md:grid-cols-2`

## Spacing Adjustments (apply automatically)
- `px-12` → `px-4 md:px-12`
- `px-8`  → `px-4 md:px-8`
- `gap-8` → `gap-4 md:gap-8`
- `gap-6` → `gap-3 md:gap-6`

## Modals and Bottom Sheets
- Use `createPortal(…, document.body)` for mobile overlays and bottom sheets
- Lock body scroll on open: `document.body.style.overflow = 'hidden'`
- Restore on unmount: `document.body.style.overflow = ''`
- Minimum drag handle: 32px wide, 4px tall, `rounded-full`, centered at top of sheet

## Known CLAUDE.md Gotchas to Check During Every Run
- `premium-glass` breaks `sticky` — use two-div pattern
- `overflow-hidden` + `hover:scale-*` clips first item — add `pt-1` to scroll container
- `padding-bottom` ignored in `overflow-y-auto` — use spacer div
- Tooltips/popovers in scroll containers — use `createPortal` + `position: fixed`
- Full-screen iframes — add `rounded-tl-3xl overflow-hidden` to wrapper
