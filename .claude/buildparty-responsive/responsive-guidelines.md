# BuildParty Responsive Guidelines

These principles apply to every /buildparty-responsive run. Do not re-ask about any of these — apply them automatically.

## Horizontal Scroll Prevention (global rule)
`html` and `body` both have `overflow-x: hidden` in `globals.css` — this is the page-level guard against any element accidentally scrolling the viewport. Components that legitimately need horizontal scroll (e.g. carousels) use `overflow-x: auto` on their own inner container, which creates a separate scroll context unaffected by the page rule.

**Root cause to avoid:** `useIsMobile` initializes to `false` on the server. If a component renders a wide fixed/absolute element in the desktop layout (e.g. `PreviewPanel` at `w-[380px]` + `translate-x-full`), that element overshoots the viewport right edge during the brief pre-hydration window, and mobile browsers include it in the scroll width. The fix is to use a lazy `useState` initializer that reads `matchMedia` synchronously on the client, plus `useLayoutEffect` for the change listener — both already in `useIsMobile.ts`.

**Never add `overflow-x: hidden` to individual page wrappers** to work around a leaking element — instead find and fix the element that overflows.

## Header Clearance (global rule)
Mobile main uses `pt-20` (80px = 64px TopNav + 16px gap). Never use `pt-16` alone — content sits flush against the header with no breathing room.

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
- **Phosphor icons: `weight="bold"` is the project standard.** Use `weight="fill"` for active/selected states only. Never `weight="regular"`.
- Do not add new Material Symbols icons to any component — replace existing ones with Phosphor when touching a component
- `rounded-full` for buttons/avatars, `rounded-2xl` for cards — same as desktop
- Light mode only — no dark mode
- Use existing utility classes: `.premium-glass`, `.glass-button`, `.fade-up`

## Bottom Sheet / Drawer Pattern
When a desktop sidebar panel becomes a mobile bottom sheet:
- Panel wrapper: `flex flex-col` + `maxHeight: 85vh` — **no** `overflowY` on the wrapper itself
- **Sticky header** (`shrink-0`): drag handle (w-8 h-1 rounded-full bg-stone-300, centered) + action buttons. This stays visible as content scrolls.
- **No X button, no collapse chevron** — backdrop tap (fixed inset-0 overlay) closes the sheet
- Content area: `flex-1 overflow-y-auto` — only the content scrolls, never the header
- Action buttons in mobile header: `h-10 px-5` (larger than desktop equivalents), Phosphor icons `weight="bold"`
- Cover/hero images inside the sheet: `w-3/5 mx-auto` max — full-width images are too dominant on a phone

## Horizontal Scroll Carousels (mobile)
To make a carousel extend edge-to-edge and align the first card with the section title:
- Wrap the scroll container in a `relative` div with `-ml-3.5 -mr-6` (assumes AppShell `px-6` margins). This extends left so the first card's image (behind `p-3.5` internal card padding) aligns with the section title, and extends right to the screen edge.
- Attach `ref={scrollRef}` to the **mobile** scroll div (not just desktop) so scroll-tracking state works for fade visibility.
- Add `pr-6` trailing padding to the scroll container so the last card scrolls fully clear of the right fade.
- Left fade (`opacity` driven by `scrolled` state) + right fade (always visible) are `absolute` overlays on the wrapper — **outside** the scroll container so they don't scroll with content.
- Fade color matches page background: `rgba(255,243,234,0.9)` → transparent.
- Card width: `w-[200px]` for session cards (shows ~1.9 cards on a 390px phone).
- Always include `scrollbarWidth: 'none'` + `hide-scrollbar` class to suppress the scrollbar.

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
