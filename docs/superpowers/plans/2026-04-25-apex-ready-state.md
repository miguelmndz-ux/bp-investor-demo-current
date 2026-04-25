# Apex Ready State Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `'ready'` pre-launch state to `ApexScanOverlay` so `/apex` opens with a "Ready to run Apex?" briefing screen instead of auto-starting the scan, with the Apex 3D mascot on the right and a "Run Apex" CTA that transitions in-place into the scanning state.

**Architecture:** `ApexScanOverlay` gains `'ready'` as its initial `scanPhase` (state machine: `'ready' → 'scanning' → 'complete' → 'dismissed'`). No new route or component — everything lives inside the existing overlay. The desktop layout shows "Ready to run Apex?" + description + step list + button on the left, Apex mascot on the right. Clicking "Run Apex" fades out the heading/description, flips to `'scanning'`, and the overlay continues as before. Mobile gets a stacked equivalent.

**Tech Stack:** React, TypeScript, Tailwind CSS v3, Vitest + React Testing Library

---

## File Map

| File | Action | What changes |
|---|---|---|
| `web/src/components/apex/ApexScanOverlay.tsx` | Modify | ScanPhase type, initial state, progress guard, ready-state JSX (desktop + mobile), step opacity logic |
| `web/src/components/apex/__tests__/ApexScanOverlay.test.tsx` | Modify | Update existing tests that expect old initial state; add ready-state tests |

Asset `web/public/apex/apex-mascot.png` is already present (untracked in git — will be committed in Task 10).

---

## Task 1: Update ScanPhase type, initial state, and progress broadcast guard

**Files:**
- Modify: `web/src/components/apex/ApexScanOverlay.tsx:7`
- Modify: `web/src/components/apex/ApexScanOverlay.tsx:591`
- Modify: `web/src/components/apex/ApexScanOverlay.tsx:602-605`

- [ ] **Step 1: Add `'ready'` to the ScanPhase union type (line 7)**

Replace:
```tsx
type ScanPhase = 'scanning' | 'complete' | 'dismissed'
```
With:
```tsx
type ScanPhase = 'ready' | 'scanning' | 'complete' | 'dismissed'
```

- [ ] **Step 2: Change the initial state to `'ready'` (line 591)**

Replace:
```tsx
const [scanPhase, setScanPhase]               = useState<ScanPhase>('scanning')
```
With:
```tsx
const [scanPhase, setScanPhase]               = useState<ScanPhase>('ready')
```

- [ ] **Step 3: Guard the progress broadcast so it doesn't fire in ready state (lines 602-605)**

Replace:
```tsx
  // Broadcast scan progress for SideNav indicator
  useEffect(() => {
    const progress = scanPhase === 'complete' ? 1 : activePhaseIndex / PHASES.length
    window.dispatchEvent(new CustomEvent('apex-scan-progress', { detail: { progress, phase: scanPhase } }))
  }, [scanPhase, activePhaseIndex])
```
With:
```tsx
  // Broadcast scan progress for SideNav indicator
  useEffect(() => {
    if (scanPhase === 'ready') return
    const progress = scanPhase === 'complete' ? 1 : activePhaseIndex / PHASES.length
    window.dispatchEvent(new CustomEvent('apex-scan-progress', { detail: { progress, phase: scanPhase } }))
  }, [scanPhase, activePhaseIndex])
```

---

## Task 2: Update existing tests and add ready-state tests

**Files:**
- Modify: `web/src/components/apex/__tests__/ApexScanOverlay.test.tsx`

The existing tests assert `'scanning'` as the initial state — they will fail after Task 1 and must be rewritten to assert `'ready'` state. New tests verify clicking "Run Apex" transitions to scanning.

- [ ] **Step 1: Replace the entire test file contents**

```tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('@/hooks/useIsMobile', () => ({
  useIsMobile: vi.fn(() => false),
}))

import { render, screen, fireEvent } from '@testing-library/react'
import ApexScanOverlay from '../ApexScanOverlay'

describe('ApexScanOverlay', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    document.body.style.overflow = ''
  })

  it('shows ready state on mount — not scanning', () => {
    render(<ApexScanOverlay />)
    expect(screen.getByText('Ready to run Apex?')).toBeInTheDocument()
    expect(screen.queryByText(/Apex is running/)).not.toBeInTheDocument()
  })

  it('shows Run Apex button in ready state', () => {
    render(<ApexScanOverlay />)
    expect(screen.getByRole('button', { name: 'Run Apex' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Stop' })).not.toBeInTheDocument()
  })

  it('shows all five phase names in ready state', () => {
    render(<ApexScanOverlay />)
    expect(screen.getAllByText('Scanning Product Hunt top 10').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Enriching founder profiles').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Creating community profile pages').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Running Decode and Course skills').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Drafting outreach messages').length).toBeGreaterThan(0)
  })

  it('transitions to scanning when Run Apex is clicked', () => {
    render(<ApexScanOverlay />)
    fireEvent.click(screen.getByRole('button', { name: 'Run Apex' }))
    expect(screen.getByText(/Apex is running/)).toBeInTheDocument()
    expect(screen.queryByText('Ready to run Apex?')).not.toBeInTheDocument()
  })

  it('shows Stop button after Run Apex is clicked', () => {
    render(<ApexScanOverlay />)
    fireEvent.click(screen.getByRole('button', { name: 'Run Apex' }))
    expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument()
  })
})
```

---

## Task 3: Run tests to verify they fail

**Files:** none

- [ ] **Step 1: Run the overlay test suite**

```bash
cd web && npm run test:run -- ApexScanOverlay
```

Expected: FAIL — tests looking for `'Ready to run Apex?'` and `'Run Apex'` button will not find them because the ready-state JSX hasn't been added yet.

---

## Task 4: Add `isReadyFading` state and `handleRunApex` handler

**Files:**
- Modify: `web/src/components/apex/ApexScanOverlay.tsx` (around line 593, in the state declarations block)

This state drives a CSS fade on the heading/description when "Run Apex" is clicked, before `scanPhase` flips to `'scanning'`. The 300ms delay lets the heading fade out while the step rows are already transitioning in-place.

- [ ] **Step 1: Add `isReadyFading` state and `handleRunApex` callback**

Find the block of state declarations starting at line 591 (right after `export default function ApexScanOverlay()`). Add after the existing `const [selectedPhaseIndex, ...]` line:

```tsx
  const [isReadyFading, setIsReadyFading] = useState(false)

  const handleRunApex = useCallback(() => {
    setIsReadyFading(true)
    setTimeout(() => setScanPhase('scanning'), 300)
  }, [])
```

---

## Task 5: Add ready-state content to desktop left column

**Files:**
- Modify: `web/src/components/apex/ApexScanOverlay.tsx` (desktop left column, around lines 796-888)

The left column currently renders a heading then the step list then a button. We conditionally replace the heading and button when `scanPhase === 'ready'`.

- [ ] **Step 1: Replace the desktop left column heading (around line 796-799)**

Find:
```tsx
        {/* Left: title + steps + button */}
        <div className="w-[42%] flex flex-col justify-center gap-6 py-4 shrink-0">
          <h1 className="text-4xl font-black font-jakarta text-primary leading-tight pl-4">
            {scanPhase === 'complete' ? 'Apex run complete.' : 'Apex is running…'}
          </h1>
```

Replace with:
```tsx
        {/* Left: title + steps + button */}
        <div className="w-[42%] flex flex-col justify-center gap-6 py-4 shrink-0">
          {scanPhase === 'ready' ? (
            <div
              className="pl-4"
              style={{ opacity: isReadyFading ? 0 : 1, transition: 'opacity 300ms ease' }}
            >
              <h1 className="text-4xl font-black font-jakarta text-primary leading-tight">
                Ready to run Apex?
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: 'rgba(26,10,0,0.55)', maxWidth: 360 }}>
                Apex scans today's top Product Hunt launches, enriches founder profiles, and drafts
                personalized outreach — so you're ready to run a live BuildParty session.
              </p>
            </div>
          ) : (
            <h1 className="text-4xl font-black font-jakarta text-primary leading-tight pl-4">
              {scanPhase === 'complete' ? 'Apex run complete.' : 'Apex is running…'}
            </h1>
          )}
```

- [ ] **Step 2: Replace the desktop bottom button (around lines 882-888)**

Find:
```tsx
          <button
            onClick={handleDismiss}
            className="self-start font-jakarta font-bold text-sm rounded-full px-8 py-3 transition-all duration-300 active:scale-95"
            style={liquidGlass}
          >
            {scanPhase === 'complete' ? 'See results' : 'Stop'}
          </button>
```

Replace with:
```tsx
          {scanPhase === 'ready' ? (
            <button
              onClick={handleRunApex}
              className="self-start font-jakarta font-bold text-sm rounded-full px-8 py-3 transition-all duration-300 active:scale-95 text-white"
              style={{
                background: 'linear-gradient(135deg, rgba(255,122,47,0.97) 0%, rgba(194,78,0,0.92) 100%)',
                boxShadow: '0 4px 16px rgba(194,78,0,0.3)',
              }}
            >
              Run Apex
            </button>
          ) : (
            <button
              onClick={handleDismiss}
              className="self-start font-jakarta font-bold text-sm rounded-full px-8 py-3 transition-all duration-300 active:scale-95"
              style={liquidGlass}
            >
              {scanPhase === 'complete' ? 'See results' : 'Stop'}
            </button>
          )}
```

---

## Task 6: Update step row opacity for ready state

**Files:**
- Modify: `web/src/components/apex/ApexScanOverlay.tsx`

In ready state all 5 phase rows should render at full opacity (they read as a capability list, not a disabled queue). Two places to change: the desktop step row and the mobile `mobileStep` function.

- [ ] **Step 1: Update desktop step row opacity (around line 817)**

Find:
```tsx
                    opacity: isWaiting ? 0.35 : 1,
```

Replace with:
```tsx
                    opacity: isWaiting && scanPhase !== 'ready' ? 0.35 : 1,
```

- [ ] **Step 2: Update mobile mobileStep opacity (around line 703)**

Find:
```tsx
          opacity: (!isActive && !isComplete) ? 0.35 : 1,
```

Replace with:
```tsx
          opacity: (!isActive && !isComplete) && scanPhase !== 'ready' ? 0.35 : 1,
```

---

## Task 7: Add Apex mascot to desktop right panel for ready state

**Files:**
- Modify: `web/src/components/apex/ApexScanOverlay.tsx` (desktop right column, around lines 891-898)

- [ ] **Step 1: Replace the desktop right column**

Find:
```tsx
        {/* Right: output preview */}
        <div className="flex-1 min-h-0 py-4">
          <StepPreview
            phaseIndex={scanPhase === 'complete' ? (selectedPhaseIndex ?? PHASES.length - 1) : activePhaseIndex}
            visibleCount={scanPhase === 'complete' ? 999 : visibleCount}
            isMobile={false}
          />
        </div>
```

Replace with:
```tsx
        {/* Right: mascot (ready) or output preview (scanning/complete) */}
        <div className="flex-1 min-h-0 py-4 flex items-center justify-center">
          {scanPhase === 'ready' ? (
            <div className="relative flex items-center justify-center h-full">
              <div
                className="absolute pointer-events-none"
                style={{
                  width: 340,
                  height: 340,
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(255,122,47,0.18) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />
              <img
                src="/apex/apex-mascot.png"
                alt="Apex"
                style={{ width: 380, maxWidth: '100%', mixBlendMode: 'lighten', position: 'relative' }}
              />
            </div>
          ) : (
            <StepPreview
              phaseIndex={scanPhase === 'complete' ? (selectedPhaseIndex ?? PHASES.length - 1) : activePhaseIndex}
              visibleCount={scanPhase === 'complete' ? 999 : visibleCount}
              isMobile={false}
            />
          )}
        </div>
```

---

## Task 8: Add mobile ready state

**Files:**
- Modify: `web/src/components/apex/ApexScanOverlay.tsx` (mobile branch, around line 731)

- [ ] **Step 1: Insert ready-state return at the top of the mobile branch**

Find the comment and return statement that begins the mobile branch:
```tsx
  // ── Mobile layout ──────────────────────────────────────────────────────────
  if (isMobile) {
    const mobileStep = (p: (typeof PHASES)[number], i: number, isActive: boolean, isComplete: boolean, isSelected: boolean) => (
```

After the `mobileStep` function definition (which ends around line 729 with `)`), and before the existing `return (` for the mobile scanning layout, insert:

```tsx
    if (scanPhase === 'ready') {
      return (
        <div className="fixed top-16 left-0 right-0 bottom-0 z-[45] overflow-hidden" style={overlayStyle}>
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-primary-container/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col w-full h-full px-4 pt-6 pb-6 items-center overflow-y-auto">
            {/* Mascot */}
            <div className="relative flex items-center justify-center mb-2">
              <div
                className="absolute pointer-events-none"
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(255,122,47,0.18) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />
              <img
                src="/apex/apex-mascot.png"
                alt="Apex"
                style={{ width: 180, mixBlendMode: 'lighten', position: 'relative' }}
              />
            </div>

            {/* Heading + description */}
            <h1 className="text-2xl font-black font-jakarta text-primary text-center mb-2">
              Ready to run Apex?
            </h1>
            <p className="text-sm text-center leading-relaxed mb-5 px-2" style={{ color: 'rgba(26,10,0,0.55)' }}>
              Apex scans today's top Product Hunt launches, enriches founder profiles, and drafts personalized outreach.
            </p>

            {/* Steps */}
            <div className="w-full max-w-sm space-y-1 mb-6">
              {PHASES.map((p, i) => mobileStep(p, i, false, false, false))}
            </div>

            {/* CTA */}
            <button
              onClick={handleRunApex}
              className="w-full max-w-sm font-jakarta font-bold text-base rounded-full px-8 py-4 transition-all duration-300 active:scale-95 text-white"
              style={{
                background: 'linear-gradient(135deg, rgba(255,122,47,0.97) 0%, rgba(194,78,0,0.92) 100%)',
                boxShadow: '0 4px 16px rgba(194,78,0,0.3)',
              }}
            >
              Run Apex
            </button>
          </div>
        </div>
      )
    }
```

---

## Task 9: Run tests to verify they pass

**Files:** none

- [ ] **Step 1: Run the full overlay test suite**

```bash
cd web && npm run test:run -- ApexScanOverlay
```

Expected output: all 5 tests PASS.

- [ ] **Step 2: Run the full test suite to check for regressions**

```bash
cd web && npm run test:run
```

Expected: all existing tests pass. If any fail, investigate and fix before committing.

---

## Task 10: Commit

**Files:** all modified above + `web/public/apex/apex-mascot.png`

- [ ] **Step 1: Stage all changes**

```bash
git add web/src/components/apex/ApexScanOverlay.tsx \
        web/src/components/apex/__tests__/ApexScanOverlay.test.tsx \
        web/public/apex/apex-mascot.png
```

- [ ] **Step 2: Commit**

```bash
git commit -m "feat: add 'ready' pre-launch state to ApexScanOverlay

Apex overlay now starts in 'ready' state showing 'Ready to run Apex?'
headline, description, step list, Apex mascot, and 'Run Apex' CTA.
Clicking the button transitions in-place to the scanning state.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Verification (end-to-end)

1. Start the dev server: `cd web && npm run dev`
2. Navigate to `/agents/constellation`
3. Click the Apex card — `/apex` loads, scan does **not** auto-start
4. Overlay shows "Ready to run Apex?" with the Apex gem on the right and 5 steps at full opacity
5. Click "Run Apex" — heading fades out, scan starts in-place within the same overlay frame
6. Scan proceeds through all 5 phases as before — complete and dismiss behavior unchanged
7. Verify mascot renders cleanly (no black box) via `mix-blend-mode: lighten`
8. If the radial glow behind the mascot looks bad on the cream background, remove the glow `<div>` from both desktop (Task 7) and mobile (Task 8) and commit the cleanup
