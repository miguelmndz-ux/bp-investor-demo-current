# Apex Scan Overlay Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-screen Apex scan overlay that greets the admin on page load, runs a 5-phase animated scan when triggered, then fades out to reveal the dashboard.

**Architecture:** A single `ApexScanOverlay` component renders via `createPortal` to `document.body` above all other content (`z-[100]`). It owns a state machine (`idle → scanning → complete → dismissed`) and drives phase progression with sequential `setTimeout` chains. `ApexPage` renders it unconditionally alongside the existing dashboard — the overlay sits on top while active, disappears when dismissed.

**Tech Stack:** Next.js 15 App Router, React 18 (useState/useEffect/useCallback/createPortal), TypeScript, Tailwind CSS v3, Vitest + React Testing Library, Material Symbols Outlined

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `web/src/styles/globals.css` | Add `apexPulse` and `apexPop` keyframe animations |
| Create | `web/src/components/apex/ApexScanOverlay.tsx` | Full-screen overlay component with state machine |
| Create | `web/src/components/apex/__tests__/ApexScanOverlay.test.tsx` | Smoke tests: idle render, Run Apex button, scanning state |
| Modify | `web/src/app/apex/page.tsx` | Import and render `<ApexScanOverlay />` |

---

## Task 1: Add animation keyframes to globals.css

**Files:**
- Modify: `web/src/styles/globals.css`

- [ ] **Step 1: Add the two keyframe animations and utility classes**

Open `web/src/styles/globals.css` and append the following at the end of the file:

```css
@keyframes apexPulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.08); }
}
.animate-apex-pulse {
  animation: apexPulse 2s ease-in-out infinite;
}

@keyframes apexPop {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.15); }
  100% { transform: scale(1); }
}
.animate-apex-pop {
  animation: apexPop 0.4s ease-out forwards;
}
```

- [ ] **Step 2: Commit**

```bash
cd web
git add src/styles/globals.css
git commit -m "style: add apexPulse and apexPop animation keyframes"
```

---

## Task 2: Create ApexScanOverlay component (TDD)

**Files:**
- Create: `web/src/components/apex/__tests__/ApexScanOverlay.test.tsx`
- Create: `web/src/components/apex/ApexScanOverlay.tsx`

- [ ] **Step 1: Write the failing tests**

Create `web/src/components/apex/__tests__/ApexScanOverlay.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ApexScanOverlay from '../ApexScanOverlay'

describe('ApexScanOverlay', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    document.body.style.overflow = ''
  })

  it('renders idle state on mount', () => {
    render(<ApexScanOverlay />)
    expect(screen.getByText('Ready to run Apex?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Run Apex' })).toBeInTheDocument()
  })

  it('shows scanning headline after clicking Run Apex', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<ApexScanOverlay />)
    await user.click(screen.getByRole('button', { name: 'Run Apex' }))
    expect(screen.getByText('Apex is running\u2026')).toBeInTheDocument()
  })

  it('shows all five phase names when scanning', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<ApexScanOverlay />)
    await user.click(screen.getByRole('button', { name: 'Run Apex' }))
    expect(screen.getByText('Scanning Product Hunt top 10')).toBeInTheDocument()
    expect(screen.getByText('Enriching founder profiles')).toBeInTheDocument()
    expect(screen.getByText('Running Decode skill')).toBeInTheDocument()
    expect(screen.getByText('Running Rapid Course skill')).toBeInTheDocument()
    expect(screen.getByText('Drafting outreach messages')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests — expect failure**

```bash
cd web
npm run test:run -- src/components/apex/__tests__/ApexScanOverlay.test.tsx
```

Expected output: 3 tests fail with `Cannot find module '../ApexScanOverlay'`

- [ ] **Step 3: Create ApexScanOverlay.tsx**

Create `web/src/components/apex/ApexScanOverlay.tsx`:

```tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

type ScanPhase = 'idle' | 'scanning' | 'complete' | 'dismissed'

const PHASES = [
  { id: 1, name: 'Scanning Product Hunt top 10', icon: 'travel_explore' },
  { id: 2, name: 'Enriching founder profiles',   icon: 'person_search'  },
  { id: 3, name: 'Running Decode skill',          icon: 'psychology'     },
  { id: 4, name: 'Running Rapid Course skill',    icon: 'bolt'           },
  { id: 5, name: 'Drafting outreach messages',    icon: 'edit_note'      },
] as const

const PHASE_DURATION_MS  = 1800
const COMPLETE_HOLD_MS   = 2000
const FADE_DURATION_MS   = 600

export default function ApexScanOverlay() {
  const [scanPhase, setScanPhase]           = useState<ScanPhase>('idle')
  const [activePhaseIndex, setActivePhaseIndex] = useState(-1)
  const [isExiting, setIsExiting]           = useState(false)

  // Lock body scroll while overlay is visible
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Unlock scroll when dismissed
  useEffect(() => {
    if (scanPhase === 'dismissed') document.body.style.overflow = ''
  }, [scanPhase])

  // Advance through phases sequentially
  useEffect(() => {
    if (scanPhase !== 'scanning' || activePhaseIndex < 0) return

    if (activePhaseIndex >= PHASES.length) {
      setScanPhase('complete')
      const t = setTimeout(() => {
        setIsExiting(true)
        setTimeout(() => setScanPhase('dismissed'), FADE_DURATION_MS)
      }, COMPLETE_HOLD_MS)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => setActivePhaseIndex(i => i + 1), PHASE_DURATION_MS)
    return () => clearTimeout(t)
  }, [scanPhase, activePhaseIndex])

  const handleRunApex = useCallback(() => {
    setScanPhase('scanning')
    setActivePhaseIndex(0)
  }, [])

  const handleStop = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => setScanPhase('dismissed'), FADE_DURATION_MS)
  }, [])

  if (scanPhase === 'dismissed') return null

  const sparkleClass =
    scanPhase === 'scanning' ? 'animate-apex-pulse' :
    scanPhase === 'complete' ? 'animate-apex-pop'   : ''

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #ff7a2f 0%, #c24e00 50%, #6b2200 100%)',
        opacity: isExiting ? 0 : 1,
        transition: `opacity ${FADE_DURATION_MS}ms ease`,
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      {/* Two-column layout */}
      <div className="relative z-10 flex items-center gap-20 max-w-4xl w-full px-12">

        {/* Left: Apex sparkle icon */}
        <div className="flex flex-col items-center gap-4 shrink-0">
          <div className={`relative flex items-center justify-center ${sparkleClass}`}>
            <div
              className="absolute w-56 h-56 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)' }}
            />
            <span
              className="material-symbols-outlined text-white relative"
              style={{ fontSize: '160px', lineHeight: '1', fontVariationSettings: "'FILL' 1, 'wght' 700" }}
            >
              auto_awesome
            </span>
          </div>
          <span className="text-white font-jakarta font-black text-lg tracking-wide">Apex</span>
        </div>

        {/* Right: Content */}
        <div className="flex-1">

          {/* ── Idle state ── */}
          {scanPhase === 'idle' && (
            <div>
              <h1 className="text-4xl font-black font-jakarta text-white leading-tight mb-3">
                Ready to run Apex?
              </h1>
              <p className="text-white/80 text-base mb-8">
                Apex will scan Product Hunt, enrich founder profiles, and draft your outreach.
              </p>
              <button
                onClick={handleRunApex}
                className="bg-white/95 text-primary font-extrabold font-jakarta px-8 py-3.5 rounded-full text-base shadow-xl hover:bg-white active:scale-95 transition-all border border-white"
              >
                Run Apex
              </button>
            </div>
          )}

          {/* ── Scanning / Complete state ── */}
          {(scanPhase === 'scanning' || scanPhase === 'complete') && (
            <div>
              <h1 className="text-4xl font-black font-jakarta text-white leading-tight mb-6">
                {scanPhase === 'complete' ? 'Apex run complete.' : 'Apex is running\u2026'}
              </h1>
              <div className="space-y-3 fade-up">
                {PHASES.map((p, i) => {
                  const isActive   = i === activePhaseIndex
                  const isComplete = i < activePhaseIndex || scanPhase === 'complete'
                  const isWaiting  = !isActive && !isComplete
                  return (
                    <div
                      key={p.id}
                      className={`flex items-center gap-4 transition-opacity duration-300 ${isWaiting ? 'opacity-40' : 'opacity-100'}`}
                    >
                      {/* Icon pill */}
                      <div
                        className="w-10 h-10 flex items-center justify-center shrink-0"
                        style={{
                          borderRadius: '10px',
                          background: 'rgba(255,255,255,0.2)',
                          border: '1px solid rgba(255,255,255,0.3)',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        <span
                          className="material-symbols-outlined text-white"
                          style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}
                        >
                          {p.icon}
                        </span>
                      </div>

                      {/* Phase name */}
                      <span className="text-white text-sm font-semibold flex-1">{p.name}</span>

                      {/* Status: spinner or checkmark */}
                      {isActive && (
                        <div
                          className="w-4 h-4 rounded-full border-2 animate-spin shrink-0"
                          style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'rgba(255,255,255,1)' }}
                        />
                      )}
                      {isComplete && (
                        <span
                          className="material-symbols-outlined text-white shrink-0"
                          style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stop button — only during active scan */}
      {scanPhase === 'scanning' && (
        <button
          onClick={handleStop}
          className="absolute bottom-8 right-8 text-white/80 hover:text-white text-sm font-semibold border border-white/30 hover:border-white/60 px-5 py-2 rounded-full transition-all"
        >
          Stop
        </button>
      )}
    </div>,
    document.body
  )
}
```

- [ ] **Step 4: Run tests — expect all to pass**

```bash
cd web
npm run test:run -- src/components/apex/__tests__/ApexScanOverlay.test.tsx
```

Expected output:
```
✓ renders idle state on mount
✓ shows scanning headline after clicking Run Apex
✓ shows all five phase names when scanning

Test Files  1 passed (1)
Tests       3 passed (3)
```

- [ ] **Step 5: Commit**

```bash
git add src/components/apex/ApexScanOverlay.tsx src/components/apex/__tests__/ApexScanOverlay.test.tsx
git commit -m "feat: add ApexScanOverlay component with idle/scanning/complete states"
```

---

## Task 3: Wire ApexScanOverlay into ApexPage

**Files:**
- Modify: `web/src/app/apex/page.tsx`

- [ ] **Step 1: Add the import and render ApexScanOverlay**

Open `web/src/app/apex/page.tsx`. The file currently looks like:

```tsx
'use client'

import { useState } from 'react'
import HeroCard from '@/components/apex/HeroCard'
import PhTable from '@/components/apex/PhTable'
import FounderGrid from '@/components/apex/FounderGrid'
import LiveStatsPanel from '@/components/apex/LiveStatsPanel'
import AgentWorkflowLog from '@/components/apex/AgentWorkflowLog'
import OutreachDraftModal from '@/components/apex/OutreachDraftModal'
import { phProducts } from '@/lib/fixtures/products'
import { founders } from '@/lib/fixtures/founders'
import { workflowLog } from '@/lib/fixtures/workflowLog'

export default function ApexPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <HeroCard draftCount={10} />
      ...
    </>
  )
}
```

Add the import and render the overlay:

```tsx
'use client'

import { useState } from 'react'
import HeroCard from '@/components/apex/HeroCard'
import PhTable from '@/components/apex/PhTable'
import FounderGrid from '@/components/apex/FounderGrid'
import LiveStatsPanel from '@/components/apex/LiveStatsPanel'
import AgentWorkflowLog from '@/components/apex/AgentWorkflowLog'
import OutreachDraftModal from '@/components/apex/OutreachDraftModal'
import ApexScanOverlay from '@/components/apex/ApexScanOverlay'
import { phProducts } from '@/lib/fixtures/products'
import { founders } from '@/lib/fixtures/founders'
import { workflowLog } from '@/lib/fixtures/workflowLog'

export default function ApexPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <ApexScanOverlay />
      <HeroCard draftCount={10} />
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-10 fade-up fade-up-1">
          <PhTable products={phProducts} onVeloPreview={() => setModalOpen(true)} />
          <FounderGrid founders={founders} />
        </div>
        <div className="col-span-4 space-y-8 fade-up fade-up-2">
          <LiveStatsPanel />
          <AgentWorkflowLog items={workflowLog} />
        </div>
      </div>
      {modalOpen && <OutreachDraftModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
```

- [ ] **Step 2: Run the full test suite**

```bash
cd web
npm run test:run
```

Expected output: all existing page tests still pass because:
- The overlay renders via `createPortal` and does not replace any dashboard DOM nodes
- Existing tests query for "Apex has drafted", "ProductHunt Top 10", "Live Stats", "Agent Workflow" — none of which conflict with overlay text
- The overlay's `useEffect` cleanup restores `document.body.style.overflow` on unmount, keeping tests isolated

All test files should show `passed`.

- [ ] **Step 3: Commit**

```bash
git add src/app/apex/page.tsx
git commit -m "feat: wire ApexScanOverlay into ApexPage — overlay shows on load"
```

---

## Done

The overlay now:
1. Appears immediately when `/apex` loads
2. Shows idle state with the glowing Apex sparkle and "Run Apex" button
3. On click: transitions to scanning state, runs 5 phases at 1.8s each with spinner → checkmark per phase
4. On completion: headline changes to "Apex run complete.", sparkle pops, overlay fades out after 2s
5. Stop button dismisses the overlay mid-scan
6. Body scroll is locked during the overlay and restored on dismissal
