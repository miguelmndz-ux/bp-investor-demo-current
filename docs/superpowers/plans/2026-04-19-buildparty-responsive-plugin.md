# buildparty-responsive Plugin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/buildparty-responsive` Claude Code skill and make all 14 existing BuildParty screens fully mobile-optimized for iPhone viewports.

**Architecture:** A project-scoped Claude Code skill backed by a structured JSON knowledge base that records responsive decisions per component. Core mobile infrastructure (useIsMobile hook, BottomNav, AppShell changes) is built first; then the skill is written; then it is used to retrofit all existing screens. The skill learns from each run and never asks the same question twice.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v3, Phosphor Icons, Vitest + React Testing Library

---

## File Map

**New files:**
- `web/src/hooks/useIsMobile.ts` — SSR-safe matchMedia hook returning `boolean`
- `web/src/hooks/__tests__/useIsMobile.test.ts` — hook tests
- `web/src/components/layout/BottomNav.tsx` — mobile bottom tab bar (4 items, Phosphor icons, liquid glass active state)
- `web/src/components/layout/__tests__/BottomNav.test.tsx` — smoke tests
- `.claude/buildparty-responsive/responsive-guidelines.md` — BuildParty-specific responsive principles read by the skill on every run
- `.claude/buildparty-responsive/responsive-kb.json` — structured knowledge base of resolved decisions (starts with global grid rules, grows with each plugin run)
- `.claude/skills/buildparty-responsive.md` — the skill definition

**Modified files:**
- `web/src/components/layout/AppShell.tsx` — conditionally renders BottomNav + compact layout on mobile
- `web/src/components/layout/TopNav.tsx` — full-width on mobile (remove left-20 offset)
- `web/src/components/layout/__tests__/AppShell.test.tsx` — update existing smoke tests

---

## Task 1: Create `useIsMobile` hook

**Files:**
- Create: `web/src/hooks/useIsMobile.ts`
- Create: `web/src/hooks/__tests__/useIsMobile.test.ts`

- [ ] **Step 1: Create the hooks directory and write the failing test**

Create `web/src/hooks/__tests__/useIsMobile.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useIsMobile } from '../useIsMobile'

function mockMatchMedia(matches: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = []
  const mql = {
    matches,
    media: '',
    onchange: null,
    addEventListener: vi.fn((_: string, fn: (e: MediaQueryListEvent) => void) => {
      listeners.push(fn)
    }),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    _trigger: (newMatches: boolean) => {
      listeners.forEach(fn => fn({ matches: newMatches } as MediaQueryListEvent))
    },
  }
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockReturnValue(mql),
  })
  return mql
}

describe('useIsMobile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns true when viewport is narrower than 768px', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('returns false when viewport is 768px or wider', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('updates when viewport crosses the breakpoint', () => {
    const mql = mockMatchMedia(false)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
    act(() => mql._trigger(true))
    expect(result.current).toBe(true)
  })

  it('respects a custom breakpoint', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useIsMobile(1024))
    expect(window.matchMedia).toHaveBeenCalledWith('(max-width: 1023px)')
    expect(result.current).toBe(true)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd web && npm run test:run -- src/hooks/__tests__/useIsMobile.test.ts
```

Expected: FAIL — `Cannot find module '../useIsMobile'`

- [ ] **Step 3: Create the hook**

Create `web/src/hooks/useIsMobile.ts`:

```ts
import { useState, useEffect } from 'react'

export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    setIsMobile(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [breakpoint])

  return isMobile
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd web && npm run test:run -- src/hooks/__tests__/useIsMobile.test.ts
```

Expected: PASS — 4 tests

- [ ] **Step 5: Commit**

```bash
git add web/src/hooks/useIsMobile.ts web/src/hooks/__tests__/useIsMobile.test.ts
git commit -m "feat: add useIsMobile hook with matchMedia and SSR safety"
```

---

## Task 2: Create `BottomNav` component

**Files:**
- Create: `web/src/components/layout/BottomNav.tsx`
- Create: `web/src/components/layout/__tests__/BottomNav.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `web/src/components/layout/__tests__/BottomNav.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import BottomNav from '../BottomNav'

vi.mock('next/navigation', () => ({
  usePathname: () => '/discover',
}))

describe('BottomNav', () => {
  it('renders all four nav items', () => {
    render(<BottomNav />)
    expect(screen.getByLabelText('Home')).toBeInTheDocument()
    expect(screen.getByLabelText('Discover')).toBeInTheDocument()
    expect(screen.getByLabelText('Calendar')).toBeInTheDocument()
    expect(screen.getByLabelText('Apex')).toBeInTheDocument()
  })

  it('marks the active route with aria-current', () => {
    render(<BottomNav />)
    expect(screen.getByLabelText('Discover').closest('a')).toHaveAttribute('aria-current', 'page')
  })

  it('renders as a fixed bottom bar', () => {
    const { container } = render(<BottomNav />)
    const nav = container.querySelector('nav')
    expect(nav?.className).toContain('fixed')
    expect(nav?.className).toContain('bottom-0')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd web && npm run test:run -- src/components/layout/__tests__/BottomNav.test.tsx
```

Expected: FAIL — `Cannot find module '../BottomNav'`

- [ ] **Step 3: Create the BottomNav component**

Create `web/src/components/layout/BottomNav.tsx`:

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { House, Compass, CalendarBlank, Sparkle } from '@phosphor-icons/react'

interface BottomNavItem {
  href: string
  label: string
  icon: React.ReactNode
  activeIcon: React.ReactNode
  match: (pathname: string) => boolean
}

const NAV_ITEMS: BottomNavItem[] = [
  {
    href: '/apex',
    label: 'Home',
    icon: <House size={24} weight="regular" />,
    activeIcon: <House size={24} weight="fill" />,
    match: (p) => p === '/apex' || p === '/',
  },
  {
    href: '/discover',
    label: 'Discover',
    icon: <Compass size={24} weight="regular" />,
    activeIcon: <Compass size={24} weight="fill" />,
    match: (p) => p === '/discover',
  },
  {
    href: '#',
    label: 'Calendar',
    icon: <CalendarBlank size={24} weight="regular" />,
    activeIcon: <CalendarBlank size={24} weight="fill" />,
    match: () => false,
  },
  {
    href: '/apex',
    label: 'Apex',
    icon: <Sparkle size={24} weight="regular" />,
    activeIcon: <Sparkle size={24} weight="fill" />,
    match: (p) => p.startsWith('/apex'),
  },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 pb-safe"
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        height: 64,
      }}
    >
      {NAV_ITEMS.map(({ href, label, icon, activeIcon, match }) => {
        const active = match(pathname)
        return (
          <Link
            key={label}
            href={href}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            className="flex flex-col items-center justify-center gap-0.5 min-w-[44px] min-h-[44px] rounded-2xl transition-all duration-200"
            style={active ? {
              background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 122, 47, 0.3)',
              boxShadow: '0 8px 32px -4px rgba(194, 78, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
              color: '#7a2e00',
            } : { color: '#a8a29e' }}
          >
            {active ? activeIcon : icon}
            <span className="text-[10px] font-bold font-body leading-none">
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd web && npm run test:run -- src/components/layout/__tests__/BottomNav.test.tsx
```

Expected: PASS — 3 tests

- [ ] **Step 5: Commit**

```bash
git add web/src/components/layout/BottomNav.tsx web/src/components/layout/__tests__/BottomNav.test.tsx
git commit -m "feat: add BottomNav component for mobile navigation"
```

---

## Task 3: Update `AppShell` and `TopNav` for mobile

**Files:**
- Modify: `web/src/components/layout/AppShell.tsx`
- Modify: `web/src/components/layout/TopNav.tsx`
- Modify: `web/src/components/layout/__tests__/AppShell.test.tsx`

- [ ] **Step 1: Read TopNav to understand its current left offset**

```bash
cat web/src/components/layout/TopNav.tsx
```

Find the fixed positioning. It will have `left-20` or `left: 80` to account for SideNav. Note the exact class or inline style value — you'll change it to be conditionally `left-0` on mobile.

- [ ] **Step 2: Update AppShell.test.tsx to add mobile mock**

Replace the entire contents of `web/src/components/layout/__tests__/AppShell.test.tsx` with:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

// vi.mock is hoisted before imports by Vitest — put it before component import
vi.mock('@/hooks/useIsMobile', () => ({
  useIsMobile: vi.fn(() => false),
}))

import AppShell from '../AppShell'
import { useIsMobile } from '@/hooks/useIsMobile'

describe('AppShell', () => {
  beforeEach(() => {
    vi.mocked(useIsMobile).mockReturnValue(false)
  })

  it('renders children inside the main content area', () => {
    render(<AppShell><div data-testid="child-content">Hello</div></AppShell>)
    expect(screen.getByTestId('child-content')).toBeInTheDocument()
  })

  it('renders the BuildParty wordmark from TopNav', () => {
    render(<AppShell><div /></AppShell>)
    expect(screen.getByText('BuildParty')).toBeInTheDocument()
  })

  it('renders BottomNav on mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue(true)
    render(<AppShell><div /></AppShell>)
    expect(screen.getByLabelText('Home')).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run existing AppShell tests to confirm they still pass before touching AppShell**

```bash
cd web && npm run test:run -- src/components/layout/__tests__/AppShell.test.tsx
```

Expected: PASS (2 existing tests)

- [ ] **Step 4: Update AppShell.tsx**

Replace the entire contents of `web/src/components/layout/AppShell.tsx` with:

```tsx
'use client'

import { usePathname } from 'next/navigation'
import SideNav from './SideNav'
import TopNav from './TopNav'
import BottomNav from './BottomNav'
import { useIsMobile } from '@/hooks/useIsMobile'

interface AppShellProps {
  children: React.ReactNode
}

const BARE_ROUTES = ['/signup', '/profile-details', '/what-to-expect', '/slot-selection', '/session-confirmation']

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  if (BARE_ROUTES.includes(pathname)) {
    return <>{children}</>
  }

  if (isMobile) {
    return (
      <>
        <TopNav />
        <main className="pt-16 px-4 pb-24">
          <div className="max-w-[1400px] mx-auto space-y-6">
            {children}
          </div>
        </main>
        <BottomNav />
      </>
    )
  }

  return (
    <>
      <SideNav />
      <TopNav />
      {/* ── Header bottom border ── */}
      <div
        className="fixed pointer-events-none"
        style={{ top: 64, left: 112, right: 0, height: 1, background: 'rgba(0,0,0,0.06)', zIndex: 55 }}
      />
      {/* ── Sidebar right border ── */}
      <div
        className="fixed pointer-events-none"
        style={{ top: 96, left: 80, width: 1, bottom: 0, background: 'rgba(0,0,0,0.06)', zIndex: 55 }}
      />
      {/* ── Concave corner ── */}
      <div
        className="fixed pointer-events-none"
        style={{ top: 64, left: 80, width: 32, height: 32, zIndex: 55 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: '#ffffff',
            clipPath: 'path("M 24 0 A 24 24 0 0 0 0 24 L 0 0 Z")',
          }}
        />
      </div>
      <div
        className="fixed pointer-events-none"
        style={{
          top: 64,
          left: 80,
          width: 32,
          height: 32,
          borderTopLeftRadius: 24,
          borderTop: '1px solid rgba(0,0,0,0.06)',
          borderLeft: '1px solid rgba(0,0,0,0.06)',
          zIndex: 55,
        }}
      />
      <main className="ml-20 pt-28 px-12 pb-12">
        <div className="max-w-[1400px] mx-auto space-y-10">
          {children}
        </div>
      </main>
    </>
  )
}
```

- [ ] **Step 5: Update TopNav to be full-width on mobile**

In `web/src/components/layout/TopNav.tsx`, find the fixed container that has `left-20` (or equivalent `left: 80`). Import `useIsMobile` and conditionally apply `left: 0` on mobile, `left: 80` on desktop. The change is isolated to the left offset only — everything else in TopNav stays the same.

Example pattern (adapt to the actual TopNav code):

```tsx
// Add to imports:
import { useIsMobile } from '@/hooks/useIsMobile'

// Inside the component:
const isMobile = useIsMobile()

// Change the container's left value:
// Before: className="fixed top-0 left-20 right-0 ..."
// After:  className={`fixed top-0 right-0 ${isMobile ? 'left-0' : 'left-20'} ...`}
// Or if it's an inline style: style={{ left: isMobile ? 0 : 80, ... }}
```

- [ ] **Step 6: Run all layout tests**

```bash
cd web && npm run test:run -- src/components/layout/
```

Expected: All tests pass

- [ ] **Step 7: Verify in the browser at mobile viewport**

Start the dev server:
```bash
cd web && npm run dev
```

Open `http://localhost:3000/apex` and use browser DevTools to set viewport to 375×812 (iPhone). Confirm:
- SideNav is hidden
- BottomNav appears at the bottom with 4 tabs
- TopNav spans full width
- Content is padded correctly (not hidden under TopNav or BottomNav)

- [ ] **Step 8: Commit**

```bash
git add web/src/components/layout/AppShell.tsx \
        web/src/components/layout/TopNav.tsx \
        web/src/components/layout/__tests__/AppShell.test.tsx
git commit -m "feat: mobile AppShell — BottomNav replaces SideNav below md breakpoint"
```

---

## Task 4: Create plugin support files

**Files:**
- Create: `.claude/buildparty-responsive/responsive-guidelines.md`
- Create: `.claude/buildparty-responsive/responsive-kb.json`

- [ ] **Step 1: Create `.claude/buildparty-responsive/responsive-guidelines.md`**

```markdown
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
```

- [ ] **Step 2: Create `.claude/buildparty-responsive/responsive-kb.json`**

```json
{
  "version": 1,
  "lastUpdated": "2026-04-19",
  "decisions": [],
  "globalRules": [
    "grid-cols-12 → grid-cols-1 md:grid-cols-6 lg:grid-cols-12",
    "grid-cols-4  → grid-cols-2 md:grid-cols-4",
    "grid-cols-3  → grid-cols-1 md:grid-cols-3",
    "grid-cols-2  → grid-cols-1 md:grid-cols-2",
    "px-12        → px-4 md:px-12",
    "px-8         → px-4 md:px-8",
    "gap-8        → gap-4 md:gap-8",
    "gap-6        → gap-3 md:gap-6",
    "text-4xl     → text-2xl md:text-4xl",
    "text-3xl     → text-xl md:text-3xl"
  ]
}
```

- [ ] **Step 3: Commit**

```bash
git add .claude/buildparty-responsive/
git commit -m "feat: add responsive-guidelines and initial responsive-kb for buildparty-responsive plugin"
```

---

## Task 5: Write the `buildparty-responsive` skill

**Files:**
- Create: `.claude/skills/buildparty-responsive.md`

- [ ] **Step 1: Create `.claude/skills/buildparty-responsive.md`**

```markdown
# buildparty-responsive

Make BuildParty screens fully mobile-responsive for iPhone viewports. Follows the BuildParty design system and learns from decisions recorded in the knowledge base so the same question is never asked twice.

## Invocation

- `/buildparty-responsive` — target the screen currently being worked on (infer from recent conversation context which page/component file is active)
- `/buildparty-responsive path/to/Component.tsx` — explicit file target
- `/buildparty-responsive audit` — scan all built screens and report responsive status

---

## AUDIT MODE

When invoked as `/buildparty-responsive audit`:

1. List all directories under `web/src/app/` that contain a `page.tsx` file
2. For each page, read the file and check for:
   - Any `sm:`, `md:`, or `lg:` Tailwind prefix
   - Any import of `useIsMobile`
   - Any `@media` in associated CSS
3. Score each screen:
   - **Complete** — has thorough responsive coverage (multiple breakpoint classes or useIsMobile usage across the key layout elements)
   - **Partial** — some responsive classes present but incomplete
   - **Not started** — no responsive code found
4. Output a markdown table:

| # | Screen | Route | Status |
|---|--------|-------|--------|
| 1.1 | Apex Dashboard | /apex | Not started |
| ... | ... | ... | ... |

Use the Screen Taxonomy from `CLAUDE.md` for the # and Screen Name columns.

---

## STANDARD MODE

### Step 1: Read the target

Read the target page file (`web/src/app/<route>/page.tsx`) and all component files it imports from `web/src/components/`. Build a list of every component involved in rendering this screen.

### Step 2: Consult the knowledge base

Read `.claude/buildparty-responsive/responsive-kb.json`.

- Apply all `globalRules` automatically and silently — never ask about these
- For each component in the target, check `decisions` for an existing entry
  - If found: apply the recorded decision silently, no prompt
  - If not found: flag as unknown — handle in Step 4

### Step 3: Read the design system

Read `DESIGN.md` (project root) and `web/src/app/globals.css`. All suggestions must use BuildParty tokens and existing utility classes. Never hardcode hex values. Also read `.claude/buildparty-responsive/responsive-guidelines.md` for BuildParty-specific conventions.

### Step 4: Detect unknowns

Scan each component not already in the KB for patterns that need responsive treatment:

- `grid-cols-N` without any responsive prefixes
- Fixed pixel widths: `w-[Xpx]`, `style={{ width: Xpx }}`
- `position: fixed` or `absolute` with hardcoded pixel offsets tied to desktop dimensions (e.g., `left: 80`, `top: 64`)
- JS-calculated pixel dimensions: `getBoundingClientRect`, `offsetWidth`, `window.innerWidth` used for layout math
- Inline styles with hardcoded pixel values for padding, margin, or size
- `overflow-x: hidden` on a parent that would clip mobile content
- Text that is too small for mobile: `text-[10px]` or smaller on content (ok on labels)

### Step 5: Generate and present the plan

Output a structured plan with these sections:

---
**RESPONSIVE PLAN: [Screen Name]**

**Auto-applied (no input needed):**
List changes coming from globalRules and existing KB decisions. Show component name and what changes.

**Proposed changes:**
For each new change, show:
```
Component: ComponentName
File: web/src/components/.../ComponentName.tsx
Current: [relevant code snippet]
Change: [proposed responsive code]
Confidence: high | medium | low
Pattern: inline-responsive | mobile-variant
Reason: [one sentence]
```

**Flags:**
- Any potential issues (conflicts with CLAUDE.md gotchas, broken patterns)
- Cross-screen inconsistencies (if a similar component was handled differently on another screen)
- Suggestions (patterns worth extracting as shared components, touch target violations)

**Questions (only if needed):**
For components where behavior on mobile is genuinely ambiguous and not in the KB, ask one clear question per component. Do not ask about anything covered by globalRules or existing decisions.

---

Confidence guidance:
- `high` — mechanical transform (grid collapse, spacing), safe to apply without review
- `medium` — likely right but involves a judgment call (e.g., which stacking order on mobile)
- `low` — ambiguous; component has non-obvious mobile behavior or JS-calculated layout

### Step 6: Wait for approval

Do NOT proceed until the user either:
- Approves the plan as-is
- Adjusts specific items and approves the adjusted version
- Answers any open questions

If the user answers a question, incorporate the answer into the plan and confirm before executing.

### Step 7: Execute

Apply all approved changes.

**For `inline-responsive` pattern:**
Add Tailwind breakpoint variants directly to the existing component file. Apply `globalRules` transforms. Ensure all interactive elements meet the 44×44px touch target minimum.

**For `mobile-variant` pattern:**
Create a new component file (e.g., `ComponentName.mobile.tsx` or a new component entirely like `BottomSheet.tsx`). Import it in the parent and conditionally render using `useIsMobile()` from `@/hooks/useIsMobile`.

**Do not touch:**
- AppShell's core mobile/desktop split — it is already implemented
- BottomNav — already implemented
- Any component that already has a `decisions` entry in the KB with matching behavior

### Step 8: Update the knowledge base

After executing, for each new decision made during this run (from user answers, or medium/low confidence items the user approved), update `.claude/buildparty-responsive/responsive-kb.json`:

- If the component already has an entry in `decisions`: **update** it (replace, do not duplicate)
- If new: **append** to the `decisions` array

Entry format:
```json
{
  "component": "ComponentName",
  "file": "web/src/components/.../ComponentName.tsx",
  "pattern": "inline-responsive",
  "decision": "Clear description of what was decided",
  "rationale": "Why — the constraint or behavior driving this decision",
  "breakpoints": { "mobile": "< 768px", "desktop": ">= 768px" },
  "resolvedAt": "YYYY-MM-DD"
}
```

Also update `lastUpdated` at the top of the JSON file.

---

## BuildParty conventions (always apply)

- Mobile-first: write styles for mobile, override at `md:` for desktop
- Phosphor icons (`@phosphor-icons/react`) for any new mobile UI — never Material Symbols
- No hardcoded hex — use design tokens
- `rounded-full` buttons/avatars, `rounded-2xl` cards
- No dark mode
- Bottom sheets use `createPortal(…, document.body)` + body scroll lock
- `useIsMobile()` from `@/hooks/useIsMobile` for programmatic breakpoint detection

---

## Complex component reference

These components have non-trivial mobile behavior. Consult the KB for their recorded decisions before proposing changes:

- **SessionCarousel** (`web/src/components/discover/SessionCarousel.tsx`): Uses JS pixel math tied to SideNav width. On mobile, SideNav is gone — carousel must not assume `SIDEBAR_WIDTH = 80`. The KB decision for this component will specify the approach.
- **PreviewPanel** (`web/src/components/discover/PreviewPanel.tsx`): Fixed 380px right drawer. On mobile this must become a bottom sheet or full-page overlay. The KB decision will specify.
- **ApexScanOverlay** (`web/src/components/apex/ApexScanOverlay.tsx`): Uses `fixed top-16 left-20` — `left-20` assumes SideNav. On mobile: `left-0`.
- **PhTable** (Apex dashboard table): `grid-cols-12` with nested `grid-cols-3` sub-grids. On mobile: horizontal scroll container with `overflow-x-auto min-w-[600px]` on the inner grid.
```

- [ ] **Step 2: Verify the skill appears in Claude Code**

In the terminal:
```bash
ls .claude/skills/buildparty-responsive.md
```

Expected: file exists. In a Claude Code session, `/buildparty-responsive` should now appear as an available skill.

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/buildparty-responsive.md
git commit -m "feat: add /buildparty-responsive Claude Code skill"
```

---

## Task 6: Retrofit — Onboarding flow

Screens: signup (3.0), profile-details (3.1), what-to-expect (3.2), slot-selection (3.3), session-confirmation (3.4)

These are BARE_ROUTES — AppShell renders nothing around them, so there's no BottomNav or SideNav to worry about. Layout is simpler.

- [ ] **Step 1: Run the plugin on the signup screen**

```
/buildparty-responsive web/src/app/signup/page.tsx
```

Review the plan. The plugin should detect no complex JS layout, just fixed sizing and possibly non-responsive grids. Approve.

- [ ] **Step 2: Verify signup at mobile viewport**

Open `http://localhost:3000/signup` at 375px viewport width. Content should be readable and not overflow horizontally.

- [ ] **Step 3: Repeat for remaining onboarding screens**

Run in sequence, reviewing each plan:
```
/buildparty-responsive web/src/app/profile-details/page.tsx
/buildparty-responsive web/src/app/what-to-expect/page.tsx
/buildparty-responsive web/src/app/slot-selection/page.tsx
/buildparty-responsive web/src/app/session-confirmation/page.tsx
```

- [ ] **Step 4: Commit after all onboarding screens pass**

```bash
git add web/src/app/signup/ web/src/app/profile-details/ web/src/app/what-to-expect/ web/src/app/slot-selection/ web/src/app/session-confirmation/
git commit -m "feat: mobile-responsive onboarding flow (screens 3.0–3.4)"
```

---

## Task 7: Retrofit — Apex screens

Screens: Apex Dashboard (1.1), Community Profile (1.2), Course Page (1.2.2), Both View (1.2.3)

These screens use the AppShell with SideNav — the BottomNav is already handled by Task 3. The plugin needs to handle the 12-column Apex grid and nested sub-grids.

- [ ] **Step 1: Run the plugin on the Apex dashboard**

```
/buildparty-responsive web/src/app/apex/page.tsx
```

Expect the plugin to:
- Apply grid-cols-12 → responsive collapse (from globalRules)
- Flag `ApexScanOverlay`'s `left-20` offset (needs `left-0` on mobile since SideNav is hidden)
- Ask about the Apex table (PhTable) mobile behavior

For PhTable: the right answer is **horizontal scroll on mobile** — wrap the grid in `overflow-x-auto` with `min-w-[600px]` on the inner element. Tell the plugin this if asked.

- [ ] **Step 2: Verify Apex dashboard at mobile viewport**

Open `http://localhost:3000/apex` at 375px. Key checks:
- Cards stack vertically
- Table scrolls horizontally (not clipped)
- No horizontal overflow on the page itself

- [ ] **Step 3: Run on Community Profile**

```
/buildparty-responsive web/src/app/apex/community/[slug]/owner/page.tsx
```

The two-column sticky panel layout (30%/70% split) will need to stack on mobile — left panel on top, right content below.

- [ ] **Step 4: Run on Course Page and Both View**

```
/buildparty-responsive web/src/app/apex/community/[slug]/courses/page.tsx
/buildparty-responsive web/src/app/apex/community/[slug]/both/page.tsx
```

- [ ] **Step 5: Commit after all Apex screens pass visual check**

```bash
git add web/src/app/apex/
git commit -m "feat: mobile-responsive Apex screens (1.1, 1.2, 1.2.2, 1.2.3)"
```

---

## Task 8: Retrofit — Discover page

Screens: Discovery (5.0), Session preview panel (5.0.1)

This is the most complex retrofit. `SessionCarousel` uses JS pixel math that assumes the sidebar, and `PreviewPanel` is a fixed 380px drawer.

- [ ] **Step 1: Run the plugin on the Discover page**

```
/buildparty-responsive web/src/app/discover/page.tsx
```

Expect the plugin to flag both `SessionCarousel` and `PreviewPanel` as complex components and ask for decisions.

**SessionCarousel decision to give the plugin:**
Replace JS pixel-based width calculations with CSS on mobile. On mobile (below `md`), the carousel should be a standard horizontal scroll container with `overflow-x-auto scroll-snap-type-x mandatory` and fixed card widths (`w-72 shrink-0`). The `SIDEBAR_WIDTH` constant and `getBoundingClientRect` calculations only run on desktop (`>= md`).

**PreviewPanel decision to give the plugin:**
On mobile, PreviewPanel renders as a bottom sheet: `fixed bottom-0 left-0 right-0`, sliding up from off-screen when open, with a drag handle and `max-h-[85vh] overflow-y-auto`. On desktop, it remains the fixed right drawer.

- [ ] **Step 2: Verify Discover page at mobile viewport**

Open `http://localhost:3000/discover` at 375px. Check:
- Carousel scrolls horizontally with snap behavior
- Preview panel opens as a bottom sheet, not a side drawer
- No horizontal page overflow

- [ ] **Step 3: Commit**

```bash
git add web/src/app/discover/ web/src/components/discover/
git commit -m "feat: mobile-responsive Discover page (5.0, 5.0.1) — scroll-snap carousel, bottom sheet preview"
```

---

## Task 9: Retrofit — PreParty lobby

Screen: Nova PreParty Lobby (6.0)

- [ ] **Step 1: Run the plugin**

```
/buildparty-responsive web/src/app/preparty/page.tsx
```

- [ ] **Step 2: Verify at mobile viewport**

Open `http://localhost:3000/preparty` at 375px. Content should be fully readable.

- [ ] **Step 3: Commit**

```bash
git add web/src/app/preparty/
git commit -m "feat: mobile-responsive PreParty lobby (6.0)"
```

---

## Task 10: Run full audit and verify coverage

- [ ] **Step 1: Run the audit command**

```
/buildparty-responsive audit
```

Every built screen should show **Complete** status. If any show **Partial**, run the plugin on those screens.

- [ ] **Step 2: Run the full test suite**

```bash
cd web && npm run test:run
```

Expected: All tests pass

- [ ] **Step 3: Run a production build**

```bash
cd web && npm run build
```

Expected: Build succeeds with no TypeScript errors

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete mobile-responsive retrofit — all 14 screens, audit passing"
```
