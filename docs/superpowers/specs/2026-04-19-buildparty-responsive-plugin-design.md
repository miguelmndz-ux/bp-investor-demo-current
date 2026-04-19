# buildparty-responsive Plugin — Design Spec

**Date:** 2026-04-19
**Status:** Approved

---

## Overview

`/buildparty-responsive` is a project-scoped Claude Code skill that makes BuildParty screens fully mobile-optimized. It targets iPhone-class viewports (the primary use case: Rob showing the app to investors at conferences) and handles both the one-time retrofit of all 14 existing screens and all future screens as they are built.

The plugin shows a plan before making any edits, learns from every run by writing decisions to a structured knowledge base, and trends toward zero-input over time as the KB fills up.

---

## Goals

- Every built screen works natively on iPhone — full mobile nav, stacked layouts, touch-friendly
- Future screens can be made responsive with a single command and minimal input
- The plugin never asks the same question twice
- Suggestions stay within the BuildParty design system (orange/cream tokens, Phosphor icons, pill shapes)

---

## Plugin Structure

### Files

```
.claude/
  skills/
    buildparty-responsive.md          ← the skill definition
  buildparty-responsive/
    responsive-kb.json                ← structured knowledge base of resolved decisions
    responsive-guidelines.md          ← BuildParty-specific responsive principles
```

### Invocation

```
/buildparty-responsive                         # targets current screen (inferred from context)
/buildparty-responsive path/to/Component.tsx   # explicit target
/buildparty-responsive audit                   # scan all screens, report responsive status
```

---

## Knowledge Base Schema

`responsive-kb.json` has two top-level keys:

**`globalRules`** — mechanical transforms applied silently on every run, no KB lookup needed:
```json
"globalRules": [
  "grid-cols-12 → grid-cols-1 md:grid-cols-6 lg:grid-cols-12",
  "grid-cols-4  → grid-cols-2 md:grid-cols-4",
  "grid-cols-3  → grid-cols-1 md:grid-cols-3",
  "grid-cols-2  → grid-cols-1 md:grid-cols-2",
  "px-12        → px-4 md:px-12",
  "pt-28        → pt-20 md:pt-28"
]
```

**`decisions`** — per-component decisions made interactively, never asked again:
```json
"decisions": [
  {
    "component": "PreviewPanel",
    "pattern": "mobile-variant",
    "decision": "Renders as a bottom sheet on mobile, full drawer on desktop",
    "rationale": "Fixed 380px drawer breaks on screens narrower than 768px",
    "breakpoints": { "mobile": "< 768px", "desktop": ">= 768px" },
    "resolvedAt": "2026-04-19"
  }
]
```

`pattern` is one of two values:
- `"inline-responsive"` — responsive Tailwind classes added directly to the existing component
- `"mobile-variant"` — a dedicated mobile component file is created and conditionally swapped in

---

## Execution Flow

When `/buildparty-responsive` is invoked on a screen:

1. **Read** — scans the target file and all imported child components
2. **Consult KB** — checks `responsive-kb.json`; components already in `decisions` are applied silently using their recorded decision; `globalRules` are always applied without prompting
3. **Read design system** — reads `DESIGN.md` and `web/src/app/globals.css` so all suggestions stay within BuildParty tokens, icons, and conventions
4. **Detect unknowns** — identifies layout patterns not yet in the KB: fixed pixel widths, absolute/fixed positioning, JS-calculated dimensions, non-responsive grids, inline styles with hardcoded values
5. **Generate plan** — outputs a structured before/after summary including:
   - Changes to be made and why (grouped by component)
   - Confidence level per change: `high` (safe to auto-apply), `medium` (likely right, worth a glance), `low` (ambiguous, needs a call)
   - Pattern classification: inline-responsive vs. mobile-variant
   - Flags: potential issues, cross-screen inconsistencies, patterns worth extracting as shared components
   - Questions: only for genuinely ambiguous decisions not yet in the KB
6. **Wait for approval** — user reviews the plan, approves as-is, adjusts, or answers any open questions
7. **Execute** — makes all edits
8. **Update KB** — appends any new decisions (with rationale) to `responsive-kb.json` so they are never asked again

### Confidence scoring

Over time, as more components are resolved and `globalRules` covers more patterns, the majority of changes will score `high` confidence. The plan becomes shorter with each passing screen. This is the mechanism that drives toward zero-input.

---

## AppShell Mobile Architecture

The AppShell change is the single highest-leverage edit — it unlocks all 14 screens at once.

### Current state
- `SideNav`: fixed 80px left sidebar, desktop-only icon nav
- `TopNav`: fixed 64px top bar, desktop-only
- Main content: `ml-20 pt-28` (80px left, 112px top) — assumes sidebar presence

### Mobile state (below `md` / 768px)
- `SideNav` and `TopNav` are hidden
- A new `BottomNav` component renders fixed at the bottom of the viewport
- Main content expands to full width with adjusted padding (`pt-4 pb-20` to clear the bottom nav)

### `BottomNav` component
- Location: `web/src/components/layout/BottomNav.tsx`
- 4–5 tabs matching current SideNav items
- Phosphor icons, consistent with the rest of the app — no Material Symbols
- Active state uses the existing liquid glass style from SideNav
- Uses `usePathname()` for active detection — same pattern as SideNav
- Fixed at bottom with `z-50` to match SideNav z-index

### `AppShell.tsx` change
- Adds a lightweight `useIsMobile()` custom hook (no external library — wraps `window.matchMedia` with a `resize` listener, returns a boolean)
- Below `md` (767px): renders `BottomNav` only, hides `SideNav` + `TopNav`, adjusts content area padding
- At `md` and above: current desktop layout is entirely untouched
- Hook lives at `web/src/hooks/useIsMobile.ts`

---

## Component Classification

### Mobile-variant components (new file created)
These components have sufficiently different mobile behavior that inline classes would be unreadable or insufficient:

| Component | Mobile behavior |
|---|---|
| `BottomNav` (new) | New component; AppShell conditionally renders it below `md` in place of SideNav + TopNav |
| `SessionCarousel` | CSS scroll-snap replaces JS pixel calculations |
| `PreviewPanel` | Bottom sheet replaces fixed 380px drawer |

### Inline-responsive components (classes added in place)
Everything else — grid collapses, padding adjustments, typography scaling. The plugin applies `globalRules` and adds breakpoint variants directly to the existing file.

---

## Audit Command

`/buildparty-responsive audit` scans all routes in `web/src/app/` and returns a status table:

| Screen | Route | Responsive Status |
|---|---|---|
| 1.1 Apex Dashboard | /apex | Not started |
| 5.0 Discovery | /discover | Not started |
| … | … | … |

Status values: `complete`, `partial`, `not started`. Useful before conferences to know exactly where coverage stands.

---

## Breakpoints

Uses Tailwind v3 defaults (no custom breakpoints added):

| Token | Width | Use |
|---|---|---|
| (default) | 0px+ | Mobile — primary target |
| `md` | 768px+ | Tablet / small desktop |
| `lg` | 1024px+ | Desktop |

The plugin targets mobile-first: styles are written for mobile by default, with `md:` and `lg:` overrides for larger viewports.

---

## Retrofit Strategy

The existing 14 screens are retrofitted in a single focused pass before Rob's conferences, using the plugin itself. Recommended order:

1. **AppShell** — do this first; unlocks the mobile shell for all screens
2. **Onboarding flow** (signup → profile-details → what-to-expect → slot-selection → session-confirmation) — simpler layouts, quick wins
3. **Apex dashboard + community profile** — more complex grids, establishes KB decisions for apex components
4. **Discover page** — SessionCarousel and PreviewPanel are the hard ones; resolved here
5. **PreParty** — full-width layout, relatively straightforward

Each run populates the KB so subsequent screens require less input.

---

## Responsive Guidelines File

`responsive-guidelines.md` captures BuildParty-specific principles the plugin reads before every run:

- Mobile-first breakpoints (default → `md:` → `lg:`)
- Bottom nav as the mobile navigation pattern
- Touch targets minimum 44×44px
- Phosphor icons only (no Material Symbols in new mobile components)
- Design tokens from `DESIGN.md` — no hardcoded hex values
- `rounded-full` for buttons/avatars, `rounded-2xl` for cards — same as desktop
- No dark mode
- `createPortal` + `position: fixed` for any mobile overlays/sheets that need to escape scroll containers

---

## Success Criteria

- All 14 built screens pass a manual iPhone viewport check before May conferences
- Future screens can be made responsive in a single `/buildparty-responsive` invocation with ≤2 questions
- The KB grows with each screen; no decision is asked twice
- All responsive output stays within BuildParty design system conventions
- The audit command gives accurate coverage status at any point
