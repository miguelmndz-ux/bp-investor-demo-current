# Apex Ready State — Design Spec

**Date:** 2026-04-25  
**Status:** Approved for implementation

## Context

Clicking the Apex card on `/agents/constellation` navigates directly to `/apex`, where `ApexScanOverlay` auto-starts the scan immediately. This is abrupt — the user has no moment to understand what Apex does or consciously trigger the run. The fix is a `'ready'` pre-launch state inside `ApexScanOverlay` itself, not a separate screen, so the transition into scanning feels continuous and native to the same component.

## Architecture

`ApexScanOverlay` gains `'ready'` as the initial `scanPhase` (was `'scanning'`). The state machine becomes:

```
'ready' → 'scanning' → 'complete' → 'dismissed'
```

No new route. No new page. No changes to `/apex/page.tsx` — the overlay still mounts unconditionally on load. The entire experience lives inside `ApexScanOverlay`.

## Layout

The overlay's existing two-column glass frame is shared across `'ready'` and `'scanning'` states. Only the content inside each column changes.

### Ready state — Left column

- **Headline:** "Ready to run Apex?" — `font-jakarta font-black`, large
- **Description:** 2-sentence body copy explaining what Apex does (scans Product Hunt, enriches founder profiles, drafts outreach)
- **Step list:** 5 rows, each: small circled orange-tinted icon + phase name, full opacity, `gap-3` spacing
- **CTA:** `PrimaryButton` — label "Run Apex", no icon

### Ready state — Right column

- Apex 3D mascot image (`/apex/apex-mascot.png`) — large, centered vertically (~360–400px wide)
- Soft orange radial glow behind the image (can be removed if it doesn't read well on the cream background)
- `mix-blend-mode: lighten` on the `<img>` to drop the PNG's black background against the page (consistent with how Apex renders in the constellation card)

### Step rows — ready state styling

Each row: a small pill-circle container (orange-tinted glass, ~28px) with the relevant Phosphor icon inside (size 14, `weight="bold"`) + phase name text at full opacity. No disabled treatment — reads as a clean capability list.

The 5 phases and their icons:

| Phase | Icon |
|---|---|
| Scanning Product Hunt top 10 | `MagnifyingGlass` |
| Enriching founder profiles | `UserCircle` |
| Creating community profile pages | `UsersThree` |
| Running Decode and Course skills | `Brain` |
| Drafting outreach messages | `PaperPlaneTilt` |

### Scanning state — unchanged

Left column: step list transitions in-place. Circled icons morph to the existing spinner/waiting style. Headline + description fade out. Right column: mascot fades out, scan preview panel fades in. All within the same glass frame.

## Transition (ready → scanning)

Triggered by clicking "Run Apex":

1. Headline + description area fades out (opacity transition, ~200ms)
2. Step rows animate in-place from ready style → scanning/waiting style
3. Right panel: mascot fades out, scan preview fades in
4. `scanPhase` flips to `'scanning'` — existing phase progression logic takes over

The transition should feel like a single component waking up, not two screens swapping.

## Files to Change

- `web/src/components/apex/ApexScanOverlay.tsx` — primary change:
  - Change initial `scanPhase` from `'scanning'` to `'ready'`
  - Add `'ready'` branch to the render logic (headline, description, ready-styled step list, Run Apex button)
  - Add handler: clicking "Run Apex" sets `scanPhase` to `'scanning'`
  - Add fade-out animation for headline/description on transition
  - Add ready → scanning style transition for step rows
- `web/public/apex/apex-mascot.png` — already present (added in prior commit)

## Verification

1. Navigate to `/agents/constellation` — click Apex card
2. `/apex` loads — scan does NOT auto-start; overlay shows "Ready to run Apex?" with step list and mascot
3. Click "Run Apex" — scan starts smoothly within the same overlay frame (no page transition, no jarring swap)
4. Scan proceeds through all 5 phases as before — complete, dismiss behavior unchanged
5. Verify mascot image renders cleanly (no black box from PNG) via `mix-blend-mode: lighten`
6. Verify the radial glow reads well; if not, remove it
