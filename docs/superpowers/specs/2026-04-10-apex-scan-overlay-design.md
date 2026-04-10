# Apex Scan Overlay — Design Spec
**Date:** 2026-04-10
**Status:** Approved for implementation

---

## Overview

When a BuildParty admin visits the Apex dashboard (`/apex`), the dashboard is hidden behind a full-screen scan overlay. The overlay presents Apex as a live agent that must be activated before data is shown. Clicking "Run Apex" triggers a sequential 5-phase scan animation. When complete, the overlay fades out and reveals the populated dashboard underneath.

---

## User Flow

1. Admin navigates to `/apex`
2. Full-screen overlay renders immediately, covering the dashboard
3. Admin sees idle state: Apex sparkle icon + headline + "Run Apex" button
4. Admin clicks "Run Apex"
5. Checklist appears; 5 phases run sequentially (~1.8s each)
6. Completion state shown briefly (~2s)
7. Overlay fades out; dashboard is revealed
8. Body scroll unlocked

---

## Overlay: Idle State

### Layout
Two-column layout, vertically and horizontally centered on screen.

**Left column:**
- Large `auto_awesome` Material Symbol icon (~160px, `fontVariationSettings: 'FILL' 1, 'wght' 700`)
- Styled as a glowing 3D object: white radial glow behind it (`radial-gradient` from `rgba(255,255,255,0.3)` to transparent), `drop-shadow` filter
- No animation in idle state (static)
- "Apex" label below in white Plus Jakarta Sans Black, `text-lg`

**Right column:**
- Headline: **"Ready to run Apex?"** — white, Plus Jakarta Sans Black, `text-4xl`
- Subtext: "Apex will scan Product Hunt, enrich founder profiles, and draft your outreach." — white/80 opacity, Inter, `text-base`
- "Run Apex" button: white background, `text-primary` (dark orange), Plus Jakarta Sans ExtraBold, `rounded-full`, `px-8 py-3.5`, `shadow-xl` — matches the existing "Review Drafts" button style

### Background
Rich orange gradient: `background: linear-gradient(135deg, #ff7a2f 0%, #c24e00 50%, #6b2200 100%)`
Two decorative blur blobs (matching HeroCard pattern):
- Top-right: `w-96 h-96 bg-white/20 rounded-full blur-3xl`
- Bottom-left: `w-64 h-64 bg-white/10 rounded-full blur-2xl`

---

## Overlay: Scanning State

Triggered when "Run Apex" is clicked.

### Left column changes
- Sparkle icon begins a slow CSS pulse animation: `scale(1.0) → scale(1.08) → scale(1.0)` over 2s, looping
- Soft white glow intensifies slightly via CSS animation on the radial gradient opacity

### Right column changes
- Headline changes to: **"Apex is running…"**
- Subtext is replaced by the phase checklist (animates in with `fade-up`)
- "Run Apex" button is replaced by a "Stop" ghost button (white border, white text, `rounded-full`, `px-6 py-2`, smaller than Run Apex)

### Phase Checklist
Each row contains:
- **Icon pill**: `w-10 h-10 rounded-xl` with a gradient background (`from-white/30 to-white/10`, `border border-white/30`, `backdrop-filter blur`), Material Symbol icon inside in white at 20px
- **Phase name**: white, Inter SemiBold, `text-sm`
- **Status indicator** (right-aligned): one of three states (see below)

| # | Phase Name | Icon |
|---|-----------|------|
| 1 | Scanning Product Hunt top 10 | `travel_explore` |
| 2 | Enriching founder profiles | `person_search` |
| 3 | Running Decode skill | `psychology` |
| 4 | Running Rapid Course skill | `bolt` |
| 5 | Drafting outreach messages | `edit_note` |

### Phase Status States
- **Waiting**: row at `opacity-40`, no status indicator
- **Active**: row at full opacity, small white spinning circle on the right (`animate-spin`, `border-2 border-white/30 border-t-white`, `w-4 h-4 rounded-full`)
- **Complete**: white checkmark icon (`check_circle`, `FILL 1`, `text-white`, `text-lg`) on the right; row stays at full opacity

### Timing (demo simulation)
Each phase activates sequentially with a 1800ms delay per phase. The previous phase gets its checkmark as the next one becomes active. Implemented via `setTimeout` chains or a `useEffect` with an index counter.

---

## Overlay: Completion State

- All 5 rows show checkmarks
- Headline changes to: **"Apex run complete."**
- Sparkle icon gets a one-shot scale pop: `scale(1.0) → scale(1.15) → scale(1.0)` over 400ms, then pulse animation stops
- "Stop" button disappears
- After 2000ms, overlay fades out (`opacity: 0`, `transition: opacity 600ms ease`) and is unmounted
- Body scroll is re-enabled

---

## Component Architecture

### `ApexScanOverlay.tsx`
Location: `web/src/components/apex/ApexScanOverlay.tsx`

Renders via `createPortal` to `document.body`. Accepts no props — manages its own internal state machine:

```
idle → scanning → complete → dismissed
```

Internal state:
- `phase: 'idle' | 'scanning' | 'complete' | 'dismissed'`
- `activePhaseIndex: number` (0–4, -1 when idle/complete)

Mounts on page load. Locks body scroll on mount (`document.body.style.overflow = 'hidden'`). Unlocks on dismiss.

### `ApexPage` changes
- Import and render `<ApexScanOverlay />` at the top level
- No other changes needed — the overlay sits above everything via `z-[100]`

---

## Design Token Usage
- Background gradient uses raw hex values (`#ff7a2f`, `#c24e00`, `#6b2200`) — these are direct extensions of the `primary-container` and `primary` tokens
- All text uses `text-white` or `text-white/80`
- Buttons follow existing patterns from HeroCard (`bg-white/95 text-primary rounded-full`)
- `font-jakarta font-black` for headlines, `font-body` for body text
- `z-[100]` — above SideNav (`z-50`) and TopNav (`z-40`)

---

## Out of Scope
- Real API calls to Product Hunt or any external service
- Persisting run history or timestamps
- Mobile/responsive layout (demo is desktop-only)
- Actual data refresh after scan (dashboard uses static fixtures)
