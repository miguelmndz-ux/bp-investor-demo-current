# Agents Introduction Screen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new `/agents` route that presents all five BuildParty agents as a glass card grid, rename the SideNav "Apex" entry to "Agents", and update the taxonomy in CLAUDE.md.

**Architecture:** Three new files — an `AgentCard` component, the `AgentsPage`, and a test for each — plus targeted edits to `SideNav.tsx` and `CLAUDE.md`. All data is static (inline in the page). No API calls, no new fixtures file needed.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v3, Phosphor Icons (`@phosphor-icons/react`), Vitest + React Testing Library.

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `web/src/components/agents/AgentCard.tsx` | Single agent card — handles active vs coming-soon states |
| Create | `web/src/components/agents/__tests__/AgentCard.test.tsx` | Smoke test for AgentCard |
| Create | `web/src/app/agents/page.tsx` | Agents intro page — header + 5-column card grid |
| Create | `web/src/app/agents/__tests__/page.test.tsx` | Smoke test for AgentsPage |
| Modify | `web/src/components/layout/SideNav.tsx` | Rename Apex → Agents, update href and active check |
| Modify | `CLAUDE.md` | Add taxonomy row 0.0 |

---

## Task 1: AgentCard component

**Files:**
- Create: `web/src/components/agents/AgentCard.tsx`

- [ ] **Step 1: Create the file**

```tsx
'use client'

import Link from 'next/link'
import { LockSimple } from '@phosphor-icons/react'

interface AgentCardProps {
  name: string
  description: string
  gradientFrom: string
  gradientTo: string
  glowColor: string
  href?: string
}

export default function AgentCard({
  name,
  description,
  gradientFrom,
  gradientTo,
  glowColor,
  href,
}: AgentCardProps) {
  const isActive = !!href

  const card = (
    <div
      className={`premium-glass rounded-2xl p-6 flex flex-col gap-4 relative h-full${
        isActive ? ' cursor-pointer' : ' opacity-50 cursor-not-allowed'
      }`}
      style={
        isActive
          ? { border: '1px solid rgba(255,122,47,0.3)' }
          : undefined
      }
    >
      {!isActive && (
        <div className="absolute top-4 right-4">
          <LockSimple size={14} weight="bold" className="text-on-background/60" />
        </div>
      )}
      <div className="flex justify-center">
        <div
          className="w-[88px] h-[88px] rounded-full shrink-0"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${gradientFrom}, ${gradientTo})`,
            boxShadow: `0 8px 32px ${glowColor}`,
          }}
        />
      </div>
      <h3 className="font-jakarta font-black text-xl text-on-background">{name}</h3>
      <p className="text-sm text-on-background/70 leading-relaxed">{description}</p>
    </div>
  )

  if (isActive && href) {
    return (
      <Link href={href} className="block transition-opacity duration-200 hover:opacity-90">
        {card}
      </Link>
    )
  }

  return card
}
```

- [ ] **Step 2: Commit**

```bash
git add web/src/components/agents/AgentCard.tsx
git commit -m "feat: add AgentCard component"
```

---

## Task 2: AgentCard smoke test

**Files:**
- Create: `web/src/components/agents/__tests__/AgentCard.test.tsx`

- [ ] **Step 1: Create the test file**

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import AgentCard from '../AgentCard'

vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}))

const baseProps = {
  name: 'Nova',
  description: 'Orchestrates every live session.',
  gradientFrom: '#f59e0b',
  gradientTo: '#d97706',
  glowColor: 'rgba(245,158,11,0.35)',
}

describe('AgentCard', () => {
  it('renders agent name and description', () => {
    render(<AgentCard {...baseProps} />)
    expect(screen.getByText('Nova')).toBeInTheDocument()
    expect(screen.getByText('Orchestrates every live session.')).toBeInTheDocument()
  })

  it('does not render as a link when no href provided', () => {
    render(<AgentCard {...baseProps} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders as a link when href is provided', () => {
    render(<AgentCard {...baseProps} href="/apex" />)
    expect(screen.getByRole('link')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/apex')
  })
})
```

- [ ] **Step 2: Run tests to verify they pass**

```bash
cd web && npm run test:run -- AgentCard
```

Expected output: 3 tests pass.

- [ ] **Step 3: Commit**

```bash
git add web/src/components/agents/__tests__/AgentCard.test.tsx
git commit -m "test: add AgentCard smoke test"
```

---

## Task 3: Agents page

**Files:**
- Create: `web/src/app/agents/page.tsx`

- [ ] **Step 1: Create the file**

```tsx
'use client'

import AgentCard from '@/components/agents/AgentCard'

const agents = [
  {
    name: 'Nova',
    description:
      'Orchestrates every live session — managing introductions, timing, Q&A, and engagement from the moment the room opens.',
    gradientFrom: '#f59e0b',
    gradientTo: '#d97706',
    glowColor: 'rgba(245,158,11,0.35)',
    href: undefined,
  },
  {
    name: 'Echo',
    description:
      'Captures everything said in a session and turns it into structured recaps, personalized follow-ups, and searchable memory.',
    gradientFrom: '#06b6d4',
    gradientTo: '#0891b2',
    glowColor: 'rgba(6,182,212,0.35)',
    href: undefined,
  },
  {
    name: 'Orbit',
    description:
      "Lives inside the CoBuild environment — context-aware coding support that adapts to each builder's skill level in real time.",
    gradientFrom: '#8b5cf6',
    gradientTo: '#7c3aed',
    glowColor: 'rgba(139,92,246,0.35)',
    href: undefined,
  },
  {
    name: 'Flare',
    description:
      'Transforms session highlights into platform-native content — quote cards, threads, highlight reels — minutes after a session ends.',
    gradientFrom: '#f43f5e',
    gradientTo: '#e11d48',
    glowColor: 'rgba(244,63,94,0.35)',
    href: undefined,
  },
  {
    name: 'Apex',
    description:
      'Full-arc product launch director. Runs D-30 to D+30, coordinating assets, outreach, monitoring, and live BuildParty events.',
    gradientFrom: '#ff7a2f',
    gradientTo: '#c24e00',
    glowColor: 'rgba(255,122,47,0.35)',
    href: '/apex',
  },
] as const

export default function AgentsPage() {
  return (
    <>
      <div className="mb-10 fade-up fade-up-1">
        <p className="text-xs font-extrabold tracking-widest text-primary uppercase mb-3">
          BuildParty Agents
        </p>
        <h1 className="font-jakarta font-black text-4xl text-on-background mb-2">
          The Constellation
        </h1>
        <p className="text-base text-on-background/60">
          Five agents. One live operating layer.
        </p>
      </div>
      <div className="grid grid-cols-5 gap-6 fade-up fade-up-2">
        {agents.map((agent) => (
          <AgentCard key={agent.name} {...agent} />
        ))}
      </div>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add web/src/app/agents/page.tsx
git commit -m "feat: add agents intro page at /agents"
```

---

## Task 4: Agents page smoke test

**Files:**
- Create: `web/src/app/agents/__tests__/page.test.tsx`

- [ ] **Step 1: Create the test file**

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import AgentsPage from '../page'

vi.mock('@/components/agents/AgentCard', () => ({
  default: ({ name }: { name: string }) => (
    <div data-testid="agent-card">{name}</div>
  ),
}))

describe('AgentsPage', () => {
  it('renders the page headline', () => {
    render(<AgentsPage />)
    expect(screen.getByText('The Constellation')).toBeInTheDocument()
  })

  it('renders the eyebrow label', () => {
    render(<AgentsPage />)
    expect(screen.getByText('BuildParty Agents')).toBeInTheDocument()
  })

  it('renders five agent cards', () => {
    render(<AgentsPage />)
    expect(screen.getAllByTestId('agent-card')).toHaveLength(5)
  })

  it('renders all agent names', () => {
    render(<AgentsPage />)
    for (const name of ['Nova', 'Echo', 'Orbit', 'Flare', 'Apex']) {
      expect(screen.getByText(name)).toBeInTheDocument()
    }
  })
})
```

- [ ] **Step 2: Run tests to verify they pass**

```bash
cd web && npm run test:run -- agents
```

Expected output: 4 tests pass (page) + 3 tests pass (AgentCard) = 7 total.

- [ ] **Step 3: Commit**

```bash
git add web/src/app/agents/__tests__/page.test.tsx
git commit -m "test: add agents page smoke test"
```

---

## Task 5: Update SideNav

**Files:**
- Modify: `web/src/components/layout/SideNav.tsx`

Three changes to the existing `NavItem` for Apex (currently around line 166):
1. `href="/apex"` → `href="/agents"`
2. `label="Apex"` → `label="Agents"`
3. `active={pathname.startsWith('/apex')}` → `active={pathname.startsWith('/agents') || pathname.startsWith('/apex')}`

The third change keeps the nav item highlighted when the user clicks through to the Apex dashboard, since `/apex` is still a sub-flow of the Agents section.

- [ ] **Step 1: Apply the changes**

Find this block in `web/src/components/layout/SideNav.tsx`:

```tsx
        <div className="relative">
          {scanProgress >= 0 && <ScanProgressDot progress={scanProgress} />}
          <NavItem href="/apex" label="Apex" active={pathname.startsWith('/apex')}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}>auto_awesome</span>
          </NavItem>
        </div>
```

Replace with:

```tsx
        <div className="relative">
          {scanProgress >= 0 && <ScanProgressDot progress={scanProgress} />}
          <NavItem href="/agents" label="Agents" active={pathname.startsWith('/agents') || pathname.startsWith('/apex')}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}>auto_awesome</span>
          </NavItem>
        </div>
```

- [ ] **Step 2: Run full test suite to check for regressions**

```bash
cd web && npm run test:run
```

Expected: all existing tests pass.

- [ ] **Step 3: Commit**

```bash
git add web/src/components/layout/SideNav.tsx
git commit -m "feat: rename Apex nav item to Agents, point to /agents"
```

---

## Task 6: Update CLAUDE.md taxonomy

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Add taxonomy row**

In `CLAUDE.md`, find the taxonomy table row for `1.0` (the first built screen). Insert a new row immediately **above** it:

```markdown
| 0.0 | Agents Introduction | `/agents` | Built |
```

So the table begins:

```markdown
| 0.0 | Agents Introduction | `/agents` | Built |
| 1.0 | Apex is running (scan overlay) | `/apex` (overlay) | Built |
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add taxonomy 0.0 Agents Introduction"
```
