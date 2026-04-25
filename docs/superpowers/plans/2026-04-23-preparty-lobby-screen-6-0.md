# PreParty Lobby — Screen 6.0 Refresh

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Nova's violet sphere avatar with a pulsating ring animation to the stage, session state indicators (Live / Up Next / Starting Soon), a YouTube-style session timeline, and a clear orientation header to the PreParty Lobby screen (Screen 6.0).

**Architecture:** Three focused subcomponents (`NovaAvatar`, `SessionStateBar`, `SessionTimeline`) are extracted into `web/src/components/preparty/` and composed into the existing `preparty/page.tsx`. The stage background changes from dark to a light purple gradient. The `nova-pulse` CSS keyframe is added to `globals.css`. All data remains static fixtures — no API calls.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v3, Vitest + React Testing Library.

---

## Context

This is the **BuildParty investor demo** — a Next.js app at `web/`. All data is faked; there is no backend. The PreParty Lobby is at `/preparty` (`web/src/app/preparty/page.tsx`).

**Design system rules (from CLAUDE.md):**
- Use `@phosphor-icons/react` for new icons (not Material Symbols)
- `font-vcr` for all-caps micro-labels
- `rounded-full` for pills, `rounded-2xl` for cards
- Never hardcode hex values — but inline `style` is fine when Tailwind tokens don't cover a one-off value
- Light mode only, no dark mode

**The four changes being implemented:**

| # | Change | Source |
|---|---|---|
| 1 | Pulsating ring animation around Nova avatar center-stage | Rob Investor Sequence spreadsheet |
| 2 | Session state indicators: Live (green), Up Next (amber), Starting Soon (countdown) | Rob Investor Sequence spreadsheet |
| 3 | YouTube-style session timeline (elapsed left, remaining right, scrubber dot) | Rob's Figma sketch + transcript |
| 4 | "PreParty Lobby" orientation header so users know where they are | Rob Investor Sequence spreadsheet |

Nova's violet sphere (placeholder avatar) goes center-stage. The stage background changes to light purple. Timeline and state bar live inside the stage card; orientation header sits above it.

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Modify | `web/src/styles/globals.css` | Add `@keyframes nova-pulse` |
| **Create** | `web/src/components/preparty/NovaAvatar.tsx` | Violet sphere avatar with 3-ring pulsating animation |
| **Create** | `web/src/components/preparty/SessionStateBar.tsx` | Three-state session indicator (Live / Up Next / Starting Soon) |
| **Create** | `web/src/components/preparty/SessionTimeline.tsx` | YouTube-style elapsed/remaining progress bar |
| **Create** | `web/src/components/preparty/__tests__/NovaAvatar.test.tsx` | Smoke test |
| **Create** | `web/src/components/preparty/__tests__/SessionStateBar.test.tsx` | Smoke test |
| **Create** | `web/src/components/preparty/__tests__/SessionTimeline.test.tsx` | Smoke test |
| **Create** | `web/src/app/preparty/__tests__/page.test.tsx` | Page integration smoke test |
| Modify | `web/src/app/preparty/page.tsx` | Compose new components, replace dark stage with light purple |

---

## Task 1: Add `nova-pulse` keyframe to globals.css

**Files:**
- Modify: `web/src/styles/globals.css`

- [ ] **Step 1: Append the keyframe after the last existing `@keyframes` block**

  The file currently ends with `@keyframes dotBounce { ... }` at line ~151. Add `nova-pulse` immediately after it:

  ```css
  @keyframes nova-pulse {
    0% {
      transform: scale(1);
      opacity: 0.65;
    }
    100% {
      transform: scale(1.9);
      opacity: 0;
    }
  }
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add web/src/styles/globals.css
  git commit -m "feat: add nova-pulse keyframe for PreParty avatar rings"
  ```

---

## Task 2: Create `NovaAvatar` component

**Files:**
- Create: `web/src/components/preparty/__tests__/NovaAvatar.test.tsx`
- Create: `web/src/components/preparty/NovaAvatar.tsx`

The component renders a violet sphere (radial gradient) surrounded by three concentric ring divs that each play `nova-pulse` staggered 0.8 s apart, producing a continuous ripple outward. The `nova-pulse` keyframe (Task 1) must be in `globals.css` before this runs in a browser, but tests will pass regardless because JSDOM ignores unknown animations.

- [ ] **Step 1: Write the failing test**

  Create `web/src/components/preparty/__tests__/NovaAvatar.test.tsx`:

  ```tsx
  import { render } from '@testing-library/react'
  import { NovaAvatar } from '../NovaAvatar'

  describe('NovaAvatar', () => {
    it('renders without crashing', () => {
      const { container } = render(<NovaAvatar />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('applies the size prop to the wrapper', () => {
      const { container } = render(<NovaAvatar size={240} />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toHaveStyle({ width: '240px', height: '240px' })
    })
  })
  ```

- [ ] **Step 2: Run test — expect FAIL**

  ```bash
  cd web && npm run test:run -- --reporter=verbose NovaAvatar
  ```

  Expected failure: `Cannot find module '../NovaAvatar'`

- [ ] **Step 3: Implement the component**

  Create `web/src/components/preparty/NovaAvatar.tsx`:

  ```tsx
  'use client'

  export function NovaAvatar({ size = 180 }: { size?: number }) {
    const sphereSize = Math.round(size * 0.55)

    return (
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Three rings — each plays nova-pulse staggered 0.8s apart */}
        {[0, 0.8, 1.6].map((delay) => (
          <div
            key={delay}
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: 'rgba(139, 92, 246, 0.45)',
              animation: `nova-pulse 2.4s ease-out infinite ${delay}s`,
            }}
          />
        ))}

        {/* Violet sphere */}
        <div
          className="relative rounded-full"
          style={{
            width: sphereSize,
            height: sphereSize,
            background:
              'radial-gradient(circle at 35% 35%, #c4b5fd 0%, #8b5cf6 45%, #5b21b6 80%, #3b0764 100%)',
            boxShadow:
              '0 0 40px rgba(139,92,246,0.35), 0 0 80px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.25)',
            border: '2px solid rgba(255,255,255,0.3)',
          }}
        />
      </div>
    )
  }
  ```

- [ ] **Step 4: Run test — expect PASS**

  ```bash
  cd web && npm run test:run -- --reporter=verbose NovaAvatar
  ```

  Expected: 2 tests PASS

- [ ] **Step 5: Commit**

  ```bash
  git add web/src/components/preparty/NovaAvatar.tsx \
          web/src/components/preparty/__tests__/NovaAvatar.test.tsx
  git commit -m "feat: add NovaAvatar component with pulsating ring animation"
  ```

---

## Task 3: Create `SessionStateBar` component

**Files:**
- Create: `web/src/components/preparty/__tests__/SessionStateBar.test.tsx`
- Create: `web/src/components/preparty/SessionStateBar.tsx`

Three pill badges in a row: **Live** (green, animated dot), **Up Next** (amber), **Starting Soon** (gray, shows countdown instead of segment name). All data is hardcoded in the component for the demo.

- [ ] **Step 1: Write the failing test**

  Create `web/src/components/preparty/__tests__/SessionStateBar.test.tsx`:

  ```tsx
  import { render, screen } from '@testing-library/react'
  import { SessionStateBar } from '../SessionStateBar'

  describe('SessionStateBar', () => {
    it('renders the Live label', () => {
      render(<SessionStateBar />)
      expect(screen.getByText('Live')).toBeInTheDocument()
    })

    it('renders the Up Next label', () => {
      render(<SessionStateBar />)
      expect(screen.getByText('Up Next')).toBeInTheDocument()
    })

    it('renders the Starting Soon label', () => {
      render(<SessionStateBar />)
      expect(screen.getByText('Starting Soon')).toBeInTheDocument()
    })

    it('renders the live segment name', () => {
      render(<SessionStateBar />)
      expect(screen.getByText('Nova: PreParty Lobby')).toBeInTheDocument()
    })

    it('renders the countdown for the starting-soon segment', () => {
      render(<SessionStateBar />)
      expect(screen.getByText('12:00')).toBeInTheDocument()
    })
  })
  ```

- [ ] **Step 2: Run test — expect FAIL**

  ```bash
  cd web && npm run test:run -- --reporter=verbose SessionStateBar
  ```

  Expected failure: `Cannot find module '../SessionStateBar'`

- [ ] **Step 3: Implement the component**

  Create `web/src/components/preparty/SessionStateBar.tsx`:

  ```tsx
  'use client'

  type SegmentState = 'live' | 'up-next' | 'starting-soon'

  interface Segment {
    label: string
    name: string
    state: SegmentState
    countdown?: string
  }

  const SEGMENTS: Segment[] = [
    { label: 'Live', name: 'Nova: PreParty Lobby', state: 'live' },
    { label: 'Up Next', name: 'Live Build Session', state: 'up-next' },
    { label: 'Starting Soon', name: 'Q&A + Demo', state: 'starting-soon', countdown: '12:00' },
  ]

  const STATE_STYLES: Record<SegmentState, { dot: string; pill: string; labelColor: string }> = {
    live: {
      dot: 'bg-emerald-500 animate-pulse',
      pill: 'bg-emerald-50 border-emerald-200',
      labelColor: 'text-emerald-700',
    },
    'up-next': {
      dot: 'bg-amber-400',
      pill: 'bg-amber-50 border-amber-200',
      labelColor: 'text-amber-700',
    },
    'starting-soon': {
      dot: 'bg-stone-400',
      pill: 'bg-white/70 border-stone-200',
      labelColor: 'text-stone-500',
    },
  }

  export function SessionStateBar() {
    return (
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {SEGMENTS.map((seg) => {
          const s = STATE_STYLES[seg.state]
          const detail =
            seg.state === 'starting-soon' && seg.countdown ? seg.countdown : seg.name
          return (
            <div
              key={seg.state}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[10px] ${s.pill}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
              <span className={`font-black uppercase tracking-wider ${s.labelColor}`}>
                {seg.label}
              </span>
              <span className="text-stone-400">·</span>
              <span className="text-stone-600 font-medium">{detail}</span>
            </div>
          )
        })}
      </div>
    )
  }
  ```

- [ ] **Step 4: Run test — expect PASS**

  ```bash
  cd web && npm run test:run -- --reporter=verbose SessionStateBar
  ```

  Expected: 5 tests PASS

- [ ] **Step 5: Commit**

  ```bash
  git add web/src/components/preparty/SessionStateBar.tsx \
          web/src/components/preparty/__tests__/SessionStateBar.test.tsx
  git commit -m "feat: add SessionStateBar with Live/Up Next/Starting Soon indicators"
  ```

---

## Task 4: Create `SessionTimeline` component

**Files:**
- Create: `web/src/components/preparty/__tests__/SessionTimeline.test.tsx`
- Create: `web/src/components/preparty/SessionTimeline.tsx`

A thin horizontal scrubber bar. Elapsed time on the left (violet), total duration on the right (gray). A filled gradient track + circle dot marks the current position. All values are props with demo defaults.

- [ ] **Step 1: Write the failing test**

  Create `web/src/components/preparty/__tests__/SessionTimeline.test.tsx`:

  ```tsx
  import { render, screen } from '@testing-library/react'
  import { SessionTimeline } from '../SessionTimeline'

  describe('SessionTimeline', () => {
    it('renders elapsed time', () => {
      render(<SessionTimeline elapsed="14:32" total="45:00" />)
      expect(screen.getByText('14:32')).toBeInTheDocument()
    })

    it('renders total duration', () => {
      render(<SessionTimeline elapsed="14:32" total="45:00" />)
      expect(screen.getByText('45:00')).toBeInTheDocument()
    })

    it('renders default values when no props provided', () => {
      render(<SessionTimeline />)
      expect(screen.getByText('14:32')).toBeInTheDocument()
      expect(screen.getByText('45:00')).toBeInTheDocument()
    })
  })
  ```

- [ ] **Step 2: Run test — expect FAIL**

  ```bash
  cd web && npm run test:run -- --reporter=verbose SessionTimeline
  ```

  Expected failure: `Cannot find module '../SessionTimeline'`

- [ ] **Step 3: Implement the component**

  Create `web/src/components/preparty/SessionTimeline.tsx`:

  ```tsx
  'use client'

  interface SessionTimelineProps {
    elapsed?: string
    total?: string
    progressPercent?: number
  }

  export function SessionTimeline({
    elapsed = '14:32',
    total = '45:00',
    progressPercent = 32,
  }: SessionTimelineProps) {
    return (
      <div className="flex items-center gap-3 w-full">
        <span
          className="text-[11px] font-bold tabular-nums"
          style={{ color: '#7c3aed' }}
        >
          {elapsed}
        </span>

        <div
          className="flex-1 relative h-[3px] rounded-full"
          style={{ background: 'rgba(139, 92, 246, 0.15)' }}
        >
          {/* Filled track */}
          <div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #8b5cf6, #a855f7)',
            }}
          />
          {/* Scrubber dot */}
          <div
            className="absolute w-3 h-3 rounded-full border-2 border-white shadow-md"
            style={{
              left: `${progressPercent}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#8b5cf6',
            }}
          />
        </div>

        <span className="text-[11px] font-medium tabular-nums text-stone-400">
          {total}
        </span>
      </div>
    )
  }
  ```

- [ ] **Step 4: Run test — expect PASS**

  ```bash
  cd web && npm run test:run -- --reporter=verbose SessionTimeline
  ```

  Expected: 3 tests PASS

- [ ] **Step 5: Commit**

  ```bash
  git add web/src/components/preparty/SessionTimeline.tsx \
          web/src/components/preparty/__tests__/SessionTimeline.test.tsx
  git commit -m "feat: add SessionTimeline YouTube-style progress bar"
  ```

---

## Task 5: Update `preparty/page.tsx` — integrate components, redesign stage

**Files:**
- Create: `web/src/app/preparty/__tests__/page.test.tsx`
- Modify: `web/src/app/preparty/page.tsx`

The stage block is rebuilt: light purple gradient background, `SessionStateBar` pinned to the top, `NovaAvatar` + name label centered, `SessionTimeline` pinned to the bottom. An orientation header ("PreParty Lobby / Velo · Nova is hosting") is added above the stage. The channel sidebar, chat sidebar, tables grid, and control dock are unchanged.

- [ ] **Step 1: Write the failing page smoke test**

  Create `web/src/app/preparty/__tests__/page.test.tsx`:

  ```tsx
  import { render, screen } from '@testing-library/react'
  import { vi } from 'vitest'
  import PrePartyPage from '../page'

  vi.mock('@/hooks/useIsMobile', () => ({ useIsMobile: () => false }))

  describe('PrePartyPage', () => {
    it('renders the orientation header', () => {
      render(<PrePartyPage />)
      expect(screen.getByText('PreParty Lobby')).toBeInTheDocument()
    })

    it('renders the Live session state badge', () => {
      render(<PrePartyPage />)
      expect(screen.getByText('Live')).toBeInTheDocument()
    })

    it('renders the session timeline elapsed time', () => {
      render(<PrePartyPage />)
      expect(screen.getByText('14:32')).toBeInTheDocument()
    })

    it('renders the Nova host label', () => {
      render(<PrePartyPage />)
      expect(screen.getByText('Nova')).toBeInTheDocument()
    })
  })
  ```

- [ ] **Step 2: Run test — expect FAIL**

  ```bash
  cd web && npm run test:run -- --reporter=verbose "preparty"
  ```

  Expected failure: `PreParty Lobby`, `Live`, `14:32`, and `Nova` not found (old page has none of these)

- [ ] **Step 3: Replace the stage section in `web/src/app/preparty/page.tsx`**

  Add the three new imports at the top of the file (after the existing `useIsMobile` import):

  ```tsx
  import { NovaAvatar } from '@/components/preparty/NovaAvatar'
  import { SessionStateBar } from '@/components/preparty/SessionStateBar'
  import { SessionTimeline } from '@/components/preparty/SessionTimeline'
  ```

  Then replace the entire center canvas `<section>` (the block that starts with `{/* ── Center canvas ─── */}` and ends before `{/* ── Chat sidebar ─── */}`) with:

  ```tsx
  {/* ── Center canvas ─────────────────────────────────────────────────── */}
  <section className="flex-1 flex flex-col overflow-hidden relative min-w-0">
    <div
      className="flex-1 overflow-y-auto px-3 md:px-6 pt-4 md:pt-6 pb-36"
      style={{ scrollbarWidth: 'none' }}
    >
      <div className="flex flex-col items-center space-y-4 w-full">

        {/* Orientation header */}
        <div className="flex items-center justify-between w-full px-1">
          <div>
            <h2 className="text-[15px] font-black text-stone-800">PreParty Lobby</h2>
            <p className="text-[12px] text-stone-500 font-medium">Velo · Nova is hosting</p>
          </div>
        </div>

        {/* Stage */}
        <div
          className="relative w-full rounded-[2rem] overflow-hidden shadow-xl"
          style={{
            aspectRatio: '16/9',
            background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 45%, #ddd6fe 100%)',
            border: '1px solid rgba(167,139,250,0.25)',
            boxShadow: '0 20px 60px rgba(139,92,246,0.12)',
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[60%] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
            }}
          />

          {/* Session state bar — top of stage */}
          <div className="absolute top-4 left-0 right-0 flex justify-center px-4">
            <SessionStateBar />
          </div>

          {/* Nova — center stage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <NovaAvatar size={160} />
            <div className="text-center">
              <p className="text-[14px] font-black text-violet-700">Nova</p>
              <p className="text-[11px] font-medium text-violet-500/80">AI Host · BuildParty</p>
            </div>
          </div>

          {/* Session timeline — bottom of stage */}
          <div className="absolute bottom-4 left-6 right-6">
            <SessionTimeline />
          </div>
        </div>

        {/* Collaborative Tables */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
          {TABLES.map((slots, i) => (
            <div
              key={i}
              className="flex justify-center rounded-full px-5 py-2.5 cursor-pointer transition-opacity hover:opacity-80"
              style={{
                background: 'rgba(255,255,255,0.4)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              }}
            >
              <div className="flex items-center justify-between w-full">
                {slots.map((slot, j) => (
                  <TableSlot key={j} avatarIndex={slot} />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>

    {/* Floating Control Dock — unchanged */}
    <div className="absolute bottom-6 left-0 right-0 px-4 md:px-8 z-20 pointer-events-none">
      <div className="flex justify-center items-center gap-2 md:gap-4 pointer-events-auto">

        <button
          className="hidden md:flex rounded-full items-center justify-center gap-0.5 w-20 h-20 transition-all hover:scale-105 active:scale-95 shrink-0"
          style={dockGlass}
        >
          <div className="flex items-center gap-[2px]">
            <div className="w-[3px] h-3 bg-stone-500 rounded-full" />
            <div className="w-[3px] h-5 bg-stone-500 rounded-full" />
            <div className="w-[3px] h-4 bg-stone-500 rounded-full" />
          </div>
          <span
            className="material-symbols-outlined text-stone-500 ml-0.5"
            style={{ fontSize: '16px' }}
          >
            expand_more
          </span>
        </button>

        <div
          className="rounded-[2rem] p-2 md:p-3 flex items-center gap-2 md:gap-3 px-3 md:px-5"
          style={dockGlass}
        >
          <button
            className="w-11 h-11 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
            style={{ background: '#fff7f0', border: '1px solid rgba(255,122,47,0.3)' }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '20px', color: '#c24e00', fontVariationSettings: "'FILL' 1" }}
            >
              mic
            </span>
          </button>
          <button
            className="w-11 h-11 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
            style={{ background: '#fff7f0', border: '1px solid rgba(255,122,47,0.3)' }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '20px', color: '#c24e00', fontVariationSettings: "'FILL' 1" }}
            >
              videocam
            </span>
          </button>
          <button
            className="w-11 h-11 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(209,213,219,0.4)' }}
          >
            <span className="material-symbols-outlined text-stone-500" style={{ fontSize: '20px' }}>
              present_to_all
            </span>
          </button>
          <button
            className="w-11 h-11 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(209,213,219,0.4)' }}
          >
            <span className="material-symbols-outlined text-stone-500" style={{ fontSize: '20px' }}>
              image
            </span>
          </button>
          <button
            className="w-11 h-11 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(209,213,219,0.4)' }}
          >
            <span className="material-symbols-outlined text-stone-500" style={{ fontSize: '20px' }}>
              settings
            </span>
          </button>
        </div>

      </div>
    </div>
  </section>
  ```

- [ ] **Step 4: Run the page test — expect PASS**

  ```bash
  cd web && npm run test:run -- --reporter=verbose "preparty"
  ```

  Expected: 4 tests PASS

- [ ] **Step 5: Run the full test suite — no regressions**

  ```bash
  cd web && npm run test:run
  ```

  Expected: All pre-existing tests still PASS

- [ ] **Step 6: Visual verification**

  ```bash
  cd web && npm run dev
  ```

  Open `http://localhost:3000/preparty`. Confirm:

  - Stage has a **light purple gradient** background (not the old dark one)
  - **Nova's violet sphere** is centered on stage
  - **Three rings pulse outward** from the avatar continuously (ripple effect)
  - **Three state pills** appear at top of stage: green "Live · Nova: PreParty Lobby", amber "Up Next · Live Build Session", gray "Starting Soon · 12:00"
  - **Progress bar** at bottom of stage shows `14:32 ——●—— 45:00` with a violet scrubber dot
  - **"PreParty Lobby"** heading and **"Velo · Nova is hosting"** subtext appear above the stage
  - Channel sidebar, chat sidebar, control dock, and tables grid are all unchanged

- [ ] **Step 7: Commit**

  ```bash
  git add web/src/app/preparty/page.tsx \
          web/src/app/preparty/__tests__/page.test.tsx
  git commit -m "feat: integrate Nova avatar, session state bar, and timeline into PreParty Lobby (Screen 6.0)"
  ```
