# Discovery Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Spotify-inspired discovery homepage at `/discover` where users browse sessions, programs, and communities with a slide-in preview panel.

**Architecture:** Single page component manages preview panel state (open/closed, selected item type + data). Six section components render fixture data. The page lives inside AppShell, inheriting the existing SideNav + TopNav chrome. Content stays centered and shifts left when the 380px preview panel opens.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v3, Material Symbols icons, Vitest + React Testing Library.

**Spec:** `docs/superpowers/specs/2026-04-11-discovery-homepage-design.md`

---

## File Structure

### New files to create:

**Fixture types and data:**
- `web/src/lib/fixtures/discover-types.ts` — TypeScript interfaces for DiscoverSession, DiscoverProgram, DiscoverCommunity
- `web/src/lib/fixtures/discover-sessions.ts` — Mock session data (11 items)
- `web/src/lib/fixtures/discover-programs.ts` — Mock program data (6 items)
- `web/src/lib/fixtures/discover-communities.ts` — Mock community data (3 items)

**Components:**
- `web/src/components/discover/FilterPills.tsx` — Horizontal pill bar
- `web/src/components/discover/ProgramCard.tsx` — Single quick-access card
- `web/src/components/discover/TrendingPrograms.tsx` — Section with 2-column grid of ProgramCards
- `web/src/components/discover/SessionCard.tsx` — Single carousel card
- `web/src/components/discover/SessionCarousel.tsx` — Section with horizontal scroll of SessionCards
- `web/src/components/discover/CommunityCard.tsx` — Single portrait card
- `web/src/components/discover/FeaturedCommunities.tsx` — Section with portrait card grid
- `web/src/components/discover/PreviewPanel.tsx` — Slide-in drawer with type-aware content

**Tests:**
- `web/src/components/discover/__tests__/FilterPills.test.tsx`
- `web/src/components/discover/__tests__/TrendingPrograms.test.tsx`
- `web/src/components/discover/__tests__/SessionCarousel.test.tsx`
- `web/src/components/discover/__tests__/FeaturedCommunities.test.tsx`
- `web/src/components/discover/__tests__/PreviewPanel.test.tsx`
- `web/src/components/discover/__tests__/DiscoverPage.test.tsx`

**Page:**
- `web/src/app/discover/page.tsx` — Page component assembling all sections

---

## Task 1: Fixture Types and Data

**Files:**
- Create: `web/src/lib/fixtures/discover-types.ts`
- Create: `web/src/lib/fixtures/discover-sessions.ts`
- Create: `web/src/lib/fixtures/discover-programs.ts`
- Create: `web/src/lib/fixtures/discover-communities.ts`

- [ ] **Step 1: Create fixture types**

```ts
// web/src/lib/fixtures/discover-types.ts

export interface SessionBadge {
  label: string
  type: 'live' | 'upcoming' | 'date'
}

export interface DiscoverSession {
  id: string
  title: string
  host: string
  image: string
  badge: SessionBadge
  date: string
  duration: string
  attendees: number
  programName: string
  description: string
}

export interface ProgramSession {
  title: string
  date: string
  image: string
}

export interface DiscoverProgram {
  id: string
  title: string
  owner: string
  image: string
  sessionCount: number
  startDate: string
  enrolled: number
  description: string
  reward: string
  sessions: ProgramSession[]
}

export interface CommunityProgram {
  name: string
  status: string
  image: string
}

export interface DiscoverCommunity {
  id: string
  name: string
  owner: string
  image: string
  thumbnail: string
  members: string
  programCount: number
  sessionsThisMonth: number
  description: string
  programs: CommunityProgram[]
}
```

- [ ] **Step 2: Create session fixtures**

```ts
// web/src/lib/fixtures/discover-sessions.ts

import type { DiscoverSession } from './discover-types'

export const trendingSessions: DiscoverSession[] = [
  {
    id: 'ts-1',
    title: 'NovaVoice Live: Build with TTS in SF',
    host: 'Rustam Khasanov',
    image: 'https://picsum.photos/seed/s1/440',
    badge: { label: 'Live Now', type: 'live' },
    date: 'April 11, 2025 at 2:00 PM PST',
    duration: '60 minutes',
    attendees: 142,
    programName: 'Voice Builders Launch Week',
    description: 'Join us for a hands-on session building text-to-speech applications with the latest NovaVoice API. Live coding, Q&A, and demos.',
  },
  {
    id: 'ts-2',
    title: 'AI Agent World Tour in SF',
    host: 'MLOps Community',
    image: 'https://picsum.photos/seed/s2/440',
    badge: { label: 'Upcoming', type: 'upcoming' },
    date: 'April 12, 2025 at 10:00 AM PST',
    duration: '90 minutes',
    attendees: 310,
    programName: 'AI Agent World Tour',
    description: 'A deep dive into building production-ready AI agents with top practitioners from the MLOps community.',
  },
  {
    id: 'ts-3',
    title: 'GenAI Week Silicon Valley',
    host: 'GPTDAO & Microsoft',
    image: 'https://picsum.photos/seed/s3/440',
    badge: { label: 'Tomorrow', type: 'upcoming' },
    date: 'April 12, 2025 at 9:00 AM PST',
    duration: '3 hours',
    attendees: 520,
    programName: 'GenAI Week',
    description: 'Silicon Valley\'s premier generative AI event covering LLMs, agents, and multimodal applications.',
  },
  {
    id: 'ts-4',
    title: 'Encode AI London Hackathon',
    host: 'Encode Club',
    image: 'https://picsum.photos/seed/s4/440',
    badge: { label: 'Apr 15', type: 'date' },
    date: 'April 15, 2025 at 9:00 AM GMT',
    duration: '8 hours',
    attendees: 200,
    programName: 'Encode AI Hackathon Series',
    description: 'Build AI-powered applications in a day. Prizes, mentorship, and networking with London\'s top builders.',
  },
  {
    id: 'ts-5',
    title: 'Agentic AI Summit Live',
    host: 'Berkeley RDI',
    image: 'https://picsum.photos/seed/s5/440',
    badge: { label: 'Apr 18', type: 'date' },
    date: 'April 18, 2025 at 1:00 PM PST',
    duration: '4 hours',
    attendees: 890,
    programName: 'Berkeley AI Summit Series',
    description: 'Research talks and demos on the frontiers of autonomous AI agents from UC Berkeley researchers.',
  },
  {
    id: 'ts-6',
    title: 'AI+ Multimodal Day',
    host: 'AI+',
    image: 'https://picsum.photos/seed/s6/440',
    badge: { label: 'Apr 20', type: 'date' },
    date: 'April 20, 2025 at 11:00 AM PST',
    duration: '2 hours',
    attendees: 175,
    programName: 'AI+ Monthly Series',
    description: 'Exploring the latest in multimodal AI: vision, audio, and cross-modal reasoning.',
  },
]

export const upcomingSessions: DiscoverSession[] = [
  {
    id: 'us-1',
    title: 'ODSC East 2025: AI Builder Track',
    host: 'ODSC AI',
    image: 'https://picsum.photos/seed/u1/440',
    badge: { label: 'Mon 2pm', type: 'date' },
    date: 'Monday at 2:00 PM EST',
    duration: '90 minutes',
    attendees: 430,
    programName: 'ODSC East 2025',
    description: 'The builder track at ODSC East, focused on hands-on implementation of AI/ML tools and frameworks.',
  },
  {
    id: 'us-2',
    title: 'F50 Physical AI Summit',
    host: 'F50',
    image: 'https://picsum.photos/seed/u2/440',
    badge: { label: 'Tue 11am', type: 'date' },
    date: 'Tuesday at 11:00 AM PST',
    duration: '3 hours',
    attendees: 260,
    programName: 'F50 Summit Series',
    description: 'Where AI meets robotics and physical systems. Demos, talks, and networking for hardware-AI builders.',
  },
  {
    id: 'us-3',
    title: 'Weekly Live Build #14',
    host: 'Sabrina Ramonov',
    image: 'https://picsum.photos/seed/u3/440',
    badge: { label: 'Wed 3pm', type: 'date' },
    date: 'Wednesday at 3:00 PM PST',
    duration: '60 minutes',
    attendees: 95,
    programName: 'Weekly Live Builds',
    description: 'Sabrina builds a complete AI tool from scratch in 60 minutes. This week: a voice-powered note-taking app.',
  },
  {
    id: 'us-4',
    title: 'Ask Me & AI: Office Hours',
    host: 'AI Collective',
    image: 'https://picsum.photos/seed/u4/440',
    badge: { label: 'Thu 1pm', type: 'date' },
    date: 'Thursday at 1:00 PM PST',
    duration: '45 minutes',
    attendees: 68,
    programName: 'AI Collective Office Hours',
    description: 'Open office hours with the AI Collective team. Bring your questions, get live answers and code reviews.',
  },
  {
    id: 'us-5',
    title: 'Hack Day: Build an Agent in 3 Hours',
    host: "Ben's Bites",
    image: 'https://picsum.photos/seed/u5/440',
    badge: { label: 'Fri 5pm', type: 'date' },
    date: 'Friday at 5:00 PM GMT',
    duration: '3 hours',
    attendees: 150,
    programName: "Ben's Bites Hack Days",
    description: 'Speed-build challenge: create a working AI agent in 3 hours. Community voting for the best build.',
  },
]
```

- [ ] **Step 3: Create program fixtures**

```ts
// web/src/lib/fixtures/discover-programs.ts

import type { DiscoverProgram } from './discover-types'

export const trendingPrograms: DiscoverProgram[] = [
  {
    id: 'tp-1',
    title: 'Build a Coding Agent that Fixes Bugs',
    owner: 'AWS Builder Loft',
    image: 'https://picsum.photos/seed/bp1/112',
    sessionCount: 4,
    startDate: 'April 14, 2025',
    enrolled: 238,
    description: 'A 4-session program covering autonomous bug detection, code analysis, and fix generation using foundation models on AWS.',
    reward: 'Certificate on completion',
    sessions: [
      { title: 'Session 1: Agent Architecture', date: 'Apr 14 at 11am', image: 'https://picsum.photos/seed/ps1/80' },
      { title: 'Session 2: Bug Detection Pipelines', date: 'Apr 16 at 11am', image: 'https://picsum.photos/seed/ps2/80' },
      { title: 'Session 3: Code Fix Generation', date: 'Apr 21 at 11am', image: 'https://picsum.photos/seed/ps3/80' },
      { title: 'Session 4: Production Deployment', date: 'Apr 23 at 11am', image: 'https://picsum.photos/seed/ps4/80' },
    ],
  },
  {
    id: 'tp-2',
    title: 'AI Vibe Coding Workshop',
    owner: 'Dr. Paul Fang',
    image: 'https://picsum.photos/seed/bp2/112',
    sessionCount: 3,
    startDate: 'April 15, 2025',
    enrolled: 156,
    description: 'Learn to build AI applications with a creative, intuitive approach. Hands-on coding with modern LLM APIs.',
    reward: 'Community badge',
    sessions: [
      { title: 'Intro to Vibe Coding', date: 'Apr 15 at 2pm', image: 'https://picsum.photos/seed/vc1/80' },
      { title: 'Building with LLM APIs', date: 'Apr 17 at 2pm', image: 'https://picsum.photos/seed/vc2/80' },
      { title: 'Ship Your Project', date: 'Apr 22 at 2pm', image: 'https://picsum.photos/seed/vc3/80' },
    ],
  },
  {
    id: 'tp-3',
    title: 'Build a 1-Page MVP Live in 60 Minutes',
    owner: 'Anand Chivaparenne',
    image: 'https://picsum.photos/seed/bp3/112',
    sessionCount: 1,
    startDate: 'April 13, 2025',
    enrolled: 89,
    description: 'Watch a founder build a complete MVP landing page from scratch in 60 minutes. Live coding, real decisions.',
    reward: 'MVP template access',
    sessions: [
      { title: 'Live MVP Build', date: 'Apr 13 at 1pm', image: 'https://picsum.photos/seed/mvp1/80' },
    ],
  },
  {
    id: 'tp-4',
    title: 'AI Toolbox & Live Build with AI',
    owner: 'GSA for Startups',
    image: 'https://picsum.photos/seed/bp4/112',
    sessionCount: 2,
    startDate: 'April 16, 2025',
    enrolled: 192,
    description: 'Google for Startups presents a hands-on series on the best AI tools for early-stage companies.',
    reward: 'Google Cloud credits',
    sessions: [
      { title: 'AI Tool Landscape', date: 'Apr 16 at 10am', image: 'https://picsum.photos/seed/gsa1/80' },
      { title: 'Live Build Session', date: 'Apr 18 at 10am', image: 'https://picsum.photos/seed/gsa2/80' },
    ],
  },
  {
    id: 'tp-5',
    title: 'Build Your AI Agent in 45 Minutes',
    owner: 'Regal',
    image: 'https://picsum.photos/seed/bp5/112',
    sessionCount: 1,
    startDate: 'April 17, 2025',
    enrolled: 114,
    description: 'A speed-run through building a production-ready AI agent using Regal\'s agent framework.',
    reward: 'Free tier access',
    sessions: [
      { title: 'Agent Speed Build', date: 'Apr 17 at 3pm', image: 'https://picsum.photos/seed/rgl1/80' },
    ],
  },
  {
    id: 'tp-6',
    title: 'Agents in Action: Google Cloud & Meta',
    owner: 'Article AI',
    image: 'https://picsum.photos/seed/bp6/112',
    sessionCount: 2,
    startDate: 'April 19, 2025',
    enrolled: 340,
    description: 'See real-world agent deployments from Google Cloud and Meta engineers. Architecture deep-dives and live demos.',
    reward: 'Recording access',
    sessions: [
      { title: 'Google Cloud Agents', date: 'Apr 19 at 11am', image: 'https://picsum.photos/seed/aia1/80' },
      { title: 'Meta Agent Systems', date: 'Apr 21 at 11am', image: 'https://picsum.photos/seed/aia2/80' },
    ],
  },
]
```

- [ ] **Step 4: Create community fixtures**

```ts
// web/src/lib/fixtures/discover-communities.ts

import type { DiscoverCommunity } from './discover-types'

export const featuredCommunities: DiscoverCommunity[] = [
  {
    id: 'fc-1',
    name: 'Voice Builders',
    owner: 'ElevenLabs',
    image: 'https://picsum.photos/seed/fc1/600/800',
    thumbnail: 'https://picsum.photos/seed/fc1t/144',
    members: '2.4k',
    programCount: 3,
    sessionsThisMonth: 12,
    description: 'The home for developers building with voice AI. Weekly office hours, launch events, and hands-on workshops with the ElevenLabs team.',
    programs: [
      { name: 'Launch Week', status: '5 sessions remaining', image: 'https://picsum.photos/seed/cp1/80' },
      { name: 'Weekly Office Hours', status: 'Every Thursday', image: 'https://picsum.photos/seed/cp2/80' },
      { name: 'Voice Hackathon', status: 'Starting May 1', image: 'https://picsum.photos/seed/cp3/80' },
    ],
  },
  {
    id: 'fc-2',
    name: 'AI Collective',
    owner: 'AI Collective',
    image: 'https://picsum.photos/seed/fc2/600/800',
    thumbnail: 'https://picsum.photos/seed/fc2t/144',
    members: '5.1k',
    programCount: 7,
    sessionsThisMonth: 18,
    description: 'The largest independent AI builder community. Founder meetups, demo nights, office hours, and hack sessions every week.',
    programs: [
      { name: 'Demo Night Series', status: 'Next: April 15', image: 'https://picsum.photos/seed/ac1/80' },
      { name: 'Founder Office Hours', status: 'Every Tuesday', image: 'https://picsum.photos/seed/ac2/80' },
    ],
  },
  {
    id: 'fc-3',
    name: 'Prompt Engineers',
    owner: 'Stanford AI Club',
    image: 'https://picsum.photos/seed/fc3/600/800',
    thumbnail: 'https://picsum.photos/seed/fc3t/144',
    members: '890',
    programCount: 2,
    sessionsThisMonth: 4,
    description: 'A student-run community focused on prompt engineering techniques, research papers, and hands-on workshops.',
    programs: [
      { name: 'Prompt Engineering Cohort', status: 'Week 3 of 8', image: 'https://picsum.photos/seed/pe1/80' },
      { name: 'Research Paper Club', status: 'Biweekly Fridays', image: 'https://picsum.photos/seed/pe2/80' },
    ],
  },
]
```

- [ ] **Step 5: Commit**

```bash
git add web/src/lib/fixtures/discover-types.ts web/src/lib/fixtures/discover-sessions.ts web/src/lib/fixtures/discover-programs.ts web/src/lib/fixtures/discover-communities.ts
git commit -m "feat: add fixture types and data for discovery homepage"
```

---

## Task 2: FilterPills Component

**Files:**
- Create: `web/src/components/discover/FilterPills.tsx`
- Create: `web/src/components/discover/__tests__/FilterPills.test.tsx`

- [ ] **Step 1: Write the test**

```tsx
// web/src/components/discover/__tests__/FilterPills.test.tsx

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FilterPills from '../FilterPills'

describe('FilterPills', () => {
  it('renders all filter labels', () => {
    render(<FilterPills />)
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('AI Tools')).toBeInTheDocument()
    expect(screen.getByText('Creators')).toBeInTheDocument()
    expect(screen.getByText('Schools')).toBeInTheDocument()
    expect(screen.getByText('Bootcamps')).toBeInTheDocument()
    expect(screen.getByText('Live Now')).toBeInTheDocument()
  })

  it('marks "All" as active by default', () => {
    render(<FilterPills />)
    const allButton = screen.getByText('All')
    expect(allButton.className).toContain('border')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web && npx vitest run src/components/discover/__tests__/FilterPills.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement FilterPills**

```tsx
// web/src/components/discover/FilterPills.tsx

'use client'

const FILTERS = ['All', 'AI Tools', 'Creators', 'Schools', 'Bootcamps', 'Live Now']

export default function FilterPills() {
  return (
    <div className="flex gap-2 flex-wrap mb-7">
      {FILTERS.map((label) => (
        <button
          key={label}
          className={
            label === 'All'
              ? 'h-[34px] px-4 rounded-full text-[13px] font-bold cursor-pointer transition-all border border-primary-fixed/30 text-primary'
              : 'h-[34px] px-4 rounded-full text-[13px] font-semibold cursor-pointer transition-all border-none text-primary/70 hover:bg-primary/[0.14]'
          }
          style={
            label === 'All'
              ? {
                  background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 16px -2px rgba(194,78,0,0.12)',
                }
              : { background: 'rgba(156,63,0,0.08)' }
          }
        >
          {label}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd web && npx vitest run src/components/discover/__tests__/FilterPills.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add web/src/components/discover/FilterPills.tsx web/src/components/discover/__tests__/FilterPills.test.tsx
git commit -m "feat: add FilterPills component for discovery homepage"
```

---

## Task 3: ProgramCard and TrendingPrograms

**Files:**
- Create: `web/src/components/discover/ProgramCard.tsx`
- Create: `web/src/components/discover/TrendingPrograms.tsx`
- Create: `web/src/components/discover/__tests__/TrendingPrograms.test.tsx`

- [ ] **Step 1: Write the test**

```tsx
// web/src/components/discover/__tests__/TrendingPrograms.test.tsx

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TrendingPrograms from '../TrendingPrograms'
import { trendingPrograms } from '@/lib/fixtures/discover-programs'

describe('TrendingPrograms', () => {
  it('renders the section title', () => {
    render(<TrendingPrograms programs={trendingPrograms} onSelect={() => {}} />)
    expect(screen.getByText('Trending Programs')).toBeInTheDocument()
  })

  it('renders program titles', () => {
    render(<TrendingPrograms programs={trendingPrograms} onSelect={() => {}} />)
    expect(screen.getByText('Build a Coding Agent that Fixes Bugs')).toBeInTheDocument()
    expect(screen.getByText('AI Vibe Coding Workshop')).toBeInTheDocument()
  })

  it('renders program owners', () => {
    render(<TrendingPrograms programs={trendingPrograms} onSelect={() => {}} />)
    expect(screen.getByText('AWS Builder Loft')).toBeInTheDocument()
  })

  it('calls onSelect when a card is clicked', () => {
    const onSelect = vi.fn()
    render(<TrendingPrograms programs={trendingPrograms} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Build a Coding Agent that Fixes Bugs'))
    expect(onSelect).toHaveBeenCalledWith(trendingPrograms[0])
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web && npx vitest run src/components/discover/__tests__/TrendingPrograms.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement ProgramCard**

```tsx
// web/src/components/discover/ProgramCard.tsx

import type { DiscoverProgram } from '@/lib/fixtures/discover-types'

interface ProgramCardProps {
  program: DiscoverProgram
  onClick: () => void
}

export default function ProgramCard({ program, onClick }: ProgramCardProps) {
  return (
    <div
      onClick={onClick}
      className="group flex items-center h-14 rounded-[10px] overflow-hidden cursor-pointer transition-all border border-primary/[0.08] hover:shadow-md hover:-translate-y-px"
      style={{
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <img
        src={program.image}
        alt={program.title}
        className="w-14 h-14 object-cover flex-shrink-0"
      />
      <div className="flex-1 px-3.5 min-w-0">
        <strong className="block text-[13.5px] font-bold text-on-surface truncate">
          {program.title}
        </strong>
        <span className="block text-[11px] text-on-surface/50 truncate">
          {program.owner}
        </span>
      </div>
      <button
        className="w-8 h-8 rounded-full flex-shrink-0 mr-2.5 opacity-0 scale-[0.8] group-hover:opacity-100 group-hover:scale-100 transition-all flex items-center justify-center border-none cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #ff7a2f, #e06520)',
          boxShadow: '0 4px 12px rgba(194,78,0,0.3)',
        }}
        aria-label={`Play ${program.title}`}
      >
        <span className="material-symbols-outlined text-white" style={{ fontSize: '16px' }}>
          play_arrow
        </span>
      </button>
    </div>
  )
}
```

- [ ] **Step 4: Implement TrendingPrograms**

```tsx
// web/src/components/discover/TrendingPrograms.tsx

import type { DiscoverProgram } from '@/lib/fixtures/discover-types'
import ProgramCard from './ProgramCard'

interface TrendingProgramsProps {
  programs: DiscoverProgram[]
  onSelect: (program: DiscoverProgram) => void
}

export default function TrendingPrograms({ programs, onSelect }: TrendingProgramsProps) {
  return (
    <div className="mb-9">
      <div className="flex items-baseline justify-between mb-3.5">
        <h2 className="font-jakarta font-black text-[22px] text-on-surface">
          Trending Programs
        </h2>
        <a href="#" className="text-[13px] font-bold text-primary uppercase tracking-wide hover:underline">
          Show all
        </a>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {programs.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            onClick={() => onSelect(program)}
          />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd web && npx vitest run src/components/discover/__tests__/TrendingPrograms.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add web/src/components/discover/ProgramCard.tsx web/src/components/discover/TrendingPrograms.tsx web/src/components/discover/__tests__/TrendingPrograms.test.tsx
git commit -m "feat: add ProgramCard and TrendingPrograms components"
```

---

## Task 4: SessionCard and SessionCarousel

**Files:**
- Create: `web/src/components/discover/SessionCard.tsx`
- Create: `web/src/components/discover/SessionCarousel.tsx`
- Create: `web/src/components/discover/__tests__/SessionCarousel.test.tsx`

- [ ] **Step 1: Write the test**

```tsx
// web/src/components/discover/__tests__/SessionCarousel.test.tsx

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SessionCarousel from '../SessionCarousel'
import { trendingSessions } from '@/lib/fixtures/discover-sessions'

describe('SessionCarousel', () => {
  it('renders the section title', () => {
    render(<SessionCarousel title="Trending Today" sessions={trendingSessions} onSelect={() => {}} />)
    expect(screen.getByText('Trending Today')).toBeInTheDocument()
  })

  it('renders session titles', () => {
    render(<SessionCarousel title="Trending Today" sessions={trendingSessions} onSelect={() => {}} />)
    expect(screen.getByText('NovaVoice Live: Build with TTS in SF')).toBeInTheDocument()
    expect(screen.getByText('Encode AI London Hackathon')).toBeInTheDocument()
  })

  it('renders session hosts', () => {
    render(<SessionCarousel title="Trending Today" sessions={trendingSessions} onSelect={() => {}} />)
    expect(screen.getByText('by Rustam Khasanov')).toBeInTheDocument()
  })

  it('renders badge labels', () => {
    render(<SessionCarousel title="Trending Today" sessions={trendingSessions} onSelect={() => {}} />)
    expect(screen.getByText('Live Now')).toBeInTheDocument()
  })

  it('calls onSelect when a card is clicked', () => {
    const onSelect = vi.fn()
    render(<SessionCarousel title="Trending Today" sessions={trendingSessions} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('NovaVoice Live: Build with TTS in SF'))
    expect(onSelect).toHaveBeenCalledWith(trendingSessions[0])
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web && npx vitest run src/components/discover/__tests__/SessionCarousel.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement SessionCard**

```tsx
// web/src/components/discover/SessionCard.tsx

import type { DiscoverSession } from '@/lib/fixtures/discover-types'

interface SessionCardProps {
  session: DiscoverSession
  onClick: () => void
}

export default function SessionCard({ session, onClick }: SessionCardProps) {
  const isLive = session.badge.type === 'live'

  return (
    <div
      onClick={onClick}
      className="group flex flex-col gap-3 p-3.5 rounded-[14px] cursor-pointer transition-all border border-primary/[0.06] hover:shadow-lg hover:-translate-y-[3px]"
      style={{
        background: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="relative w-full aspect-square rounded-[10px] overflow-hidden bg-primary/[0.06]">
        <img
          src={session.image}
          alt={session.title}
          className="w-full h-full object-cover block"
        />
        <button
          className="absolute bottom-2.5 right-2.5 w-11 h-11 rounded-full border-none flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #ff7a2f, #e06520)',
            boxShadow: '0 6px 20px rgba(194,78,0,0.35)',
          }}
          aria-label={`Play ${session.title}`}
        >
          <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>
            play_arrow
          </span>
        </button>
      </div>
      <div
        className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide rounded-md px-2 py-[3px] w-fit ${
          isLive ? 'text-red-600 bg-red-600/10' : 'text-primary-fixed-dim bg-primary-fixed/10'
        }`}
      >
        {isLive && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
        {session.badge.label}
      </div>
      <div className="text-[14.5px] font-bold text-on-surface leading-tight line-clamp-2">
        {session.title}
      </div>
      <div className="text-[12.5px] text-on-surface/50 leading-snug line-clamp-2">
        by {session.host}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Implement SessionCarousel**

```tsx
// web/src/components/discover/SessionCarousel.tsx

import type { DiscoverSession } from '@/lib/fixtures/discover-types'
import SessionCard from './SessionCard'

interface SessionCarouselProps {
  title: string
  sessions: DiscoverSession[]
  onSelect: (session: DiscoverSession) => void
}

export default function SessionCarousel({ title, sessions, onSelect }: SessionCarouselProps) {
  return (
    <div className="mb-9">
      <div className="flex items-baseline justify-between mb-3.5">
        <h2 className="font-jakarta font-black text-[22px] text-on-surface">
          {title}
        </h2>
        <a href="#" className="text-[13px] font-bold text-primary uppercase tracking-wide hover:underline">
          Show all
        </a>
      </div>
      <div
        className="grid grid-flow-col gap-4 overflow-x-auto pb-1 pt-1"
        style={{
          gridAutoColumns: '220px',
          scrollbarWidth: 'none',
        }}
      >
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            onClick={() => onSelect(session)}
          />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd web && npx vitest run src/components/discover/__tests__/SessionCarousel.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add web/src/components/discover/SessionCard.tsx web/src/components/discover/SessionCarousel.tsx web/src/components/discover/__tests__/SessionCarousel.test.tsx
git commit -m "feat: add SessionCard and SessionCarousel components"
```

---

## Task 5: CommunityCard and FeaturedCommunities

**Files:**
- Create: `web/src/components/discover/CommunityCard.tsx`
- Create: `web/src/components/discover/FeaturedCommunities.tsx`
- Create: `web/src/components/discover/__tests__/FeaturedCommunities.test.tsx`

- [ ] **Step 1: Write the test**

```tsx
// web/src/components/discover/__tests__/FeaturedCommunities.test.tsx

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FeaturedCommunities from '../FeaturedCommunities'
import { featuredCommunities } from '@/lib/fixtures/discover-communities'

describe('FeaturedCommunities', () => {
  it('renders the section title', () => {
    render(<FeaturedCommunities communities={featuredCommunities} onSelect={() => {}} />)
    expect(screen.getByText('Featured Communities')).toBeInTheDocument()
  })

  it('renders community names', () => {
    render(<FeaturedCommunities communities={featuredCommunities} onSelect={() => {}} />)
    expect(screen.getByText('Voice Builders')).toBeInTheDocument()
    expect(screen.getByText('AI Collective')).toBeInTheDocument()
    expect(screen.getByText('Prompt Engineers')).toBeInTheDocument()
  })

  it('renders owner names', () => {
    render(<FeaturedCommunities communities={featuredCommunities} onSelect={() => {}} />)
    expect(screen.getByText('by ElevenLabs')).toBeInTheDocument()
  })

  it('renders member counts', () => {
    render(<FeaturedCommunities communities={featuredCommunities} onSelect={() => {}} />)
    expect(screen.getByText(/2\.4k members/)).toBeInTheDocument()
  })

  it('calls onSelect when a card is clicked', () => {
    const onSelect = vi.fn()
    render(<FeaturedCommunities communities={featuredCommunities} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Voice Builders'))
    expect(onSelect).toHaveBeenCalledWith(featuredCommunities[0])
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web && npx vitest run src/components/discover/__tests__/FeaturedCommunities.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement CommunityCard**

```tsx
// web/src/components/discover/CommunityCard.tsx

import type { DiscoverCommunity } from '@/lib/fixtures/discover-types'

interface CommunityCardProps {
  community: DiscoverCommunity
  onClick: () => void
}

export default function CommunityCard({ community, onClick }: CommunityCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-[18px] overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl"
      style={{ aspectRatio: '3/4' }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={community.image} alt={community.name} className="w-full h-full object-cover block" />
      </div>

      {/* Top gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(rgba(61,28,0,0.4) 0%, transparent 50%)' }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(transparent 40%, rgba(61,28,0,0.75) 100%)' }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        <div className="flex items-end gap-3.5 mb-2.5">
          <div className="w-16 h-16 rounded-[14px] overflow-hidden flex-shrink-0 border-2 border-white/30">
            <img src={community.thumbnail} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-white/70 uppercase tracking-wider">
              Community
            </div>
            <div className="font-jakarta font-black text-[22px] text-white leading-tight">
              {community.name}
            </div>
            <div className="text-[13px] text-white/70">
              by {community.owner}
            </div>
          </div>
        </div>

        <div className="flex gap-4 text-[12px] text-white/65 mb-2">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>group</span>
            {community.members} members
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>event</span>
            {community.programCount} programs
          </span>
        </div>

        <button
          className="h-[34px] px-[18px] rounded-full text-[13px] font-bold text-white cursor-pointer transition-all w-fit border border-white/25"
          style={{
            background: 'linear-gradient(135deg, rgba(255,122,47,0.4), rgba(194,78,0,0.3))',
            backdropFilter: 'blur(16px)',
          }}
        >
          Join Community
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Implement FeaturedCommunities**

```tsx
// web/src/components/discover/FeaturedCommunities.tsx

import type { DiscoverCommunity } from '@/lib/fixtures/discover-types'
import CommunityCard from './CommunityCard'

interface FeaturedCommunitiesProps {
  communities: DiscoverCommunity[]
  onSelect: (community: DiscoverCommunity) => void
}

export default function FeaturedCommunities({ communities, onSelect }: FeaturedCommunitiesProps) {
  return (
    <div className="mb-9">
      <div className="flex items-baseline justify-between mb-3.5">
        <h2 className="font-jakarta font-black text-[22px] text-on-surface">
          Featured Communities
        </h2>
        <a href="#" className="text-[13px] font-bold text-primary uppercase tracking-wide hover:underline">
          Show all
        </a>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {communities.map((community) => (
          <CommunityCard
            key={community.id}
            community={community}
            onClick={() => onSelect(community)}
          />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd web && npx vitest run src/components/discover/__tests__/FeaturedCommunities.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add web/src/components/discover/CommunityCard.tsx web/src/components/discover/FeaturedCommunities.tsx web/src/components/discover/__tests__/FeaturedCommunities.test.tsx
git commit -m "feat: add CommunityCard and FeaturedCommunities components"
```

---

## Task 6: PreviewPanel

**Files:**
- Create: `web/src/components/discover/PreviewPanel.tsx`
- Create: `web/src/components/discover/__tests__/PreviewPanel.test.tsx`

- [ ] **Step 1: Write the test**

```tsx
// web/src/components/discover/__tests__/PreviewPanel.test.tsx

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import PreviewPanel from '../PreviewPanel'
import { trendingSessions } from '@/lib/fixtures/discover-sessions'
import { trendingPrograms } from '@/lib/fixtures/discover-programs'
import { featuredCommunities } from '@/lib/fixtures/discover-communities'

describe('PreviewPanel', () => {
  it('renders session preview when type is session', () => {
    render(<PreviewPanel type="session" data={trendingSessions[0]} open onClose={() => {}} />)
    expect(screen.getByText('Session')).toBeInTheDocument()
    expect(screen.getByText('NovaVoice Live: Build with TTS in SF')).toBeInTheDocument()
    expect(screen.getByText('by Rustam Khasanov')).toBeInTheDocument()
    expect(screen.getByText('Join Session')).toBeInTheDocument()
  })

  it('renders program preview when type is program', () => {
    render(<PreviewPanel type="program" data={trendingPrograms[0]} open onClose={() => {}} />)
    expect(screen.getByText('Program')).toBeInTheDocument()
    expect(screen.getByText('Build a Coding Agent that Fixes Bugs')).toBeInTheDocument()
    expect(screen.getByText('Enroll in Program')).toBeInTheDocument()
  })

  it('renders community preview when type is community', () => {
    render(<PreviewPanel type="community" data={featuredCommunities[0]} open onClose={() => {}} />)
    expect(screen.getByText('Community')).toBeInTheDocument()
    expect(screen.getByText('Voice Builders')).toBeInTheDocument()
    expect(screen.getByText('Join Community')).toBeInTheDocument()
  })

  it('renders session program list for programs', () => {
    render(<PreviewPanel type="program" data={trendingPrograms[0]} open onClose={() => {}} />)
    expect(screen.getByText('Sessions')).toBeInTheDocument()
    expect(screen.getByText('Session 1: Agent Architecture')).toBeInTheDocument()
  })

  it('renders active programs list for communities', () => {
    render(<PreviewPanel type="community" data={featuredCommunities[0]} open onClose={() => {}} />)
    expect(screen.getByText('Active Programs')).toBeInTheDocument()
    expect(screen.getByText('Launch Week')).toBeInTheDocument()
  })

  it('does not render content when data is null', () => {
    render(<PreviewPanel type={null} data={null} open={false} onClose={() => {}} />)
    expect(screen.queryByText('Session')).not.toBeInTheDocument()
    expect(screen.queryByText('Program')).not.toBeInTheDocument()
    expect(screen.queryByText('Community')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web && npx vitest run src/components/discover/__tests__/PreviewPanel.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement PreviewPanel**

```tsx
// web/src/components/discover/PreviewPanel.tsx

'use client'

import type { DiscoverSession, DiscoverProgram, DiscoverCommunity } from '@/lib/fixtures/discover-types'

type PreviewType = 'session' | 'program' | 'community' | null
type PreviewData = DiscoverSession | DiscoverProgram | DiscoverCommunity | null

interface PreviewPanelProps {
  type: PreviewType
  data: PreviewData
  open: boolean
  onClose: () => void
}

function SessionPreview({ session }: { session: DiscoverSession }) {
  return (
    <>
      <div className="w-full rounded-[14px] overflow-hidden mb-5 bg-primary/[0.06]" style={{ aspectRatio: '16/10' }}>
        <img src={session.image} alt={session.title} className="w-full h-full object-cover" />
      </div>
      <div className="text-[11px] font-bold uppercase tracking-wider text-primary-fixed-dim mb-1.5">
        Session
      </div>
      <h3 className="font-jakarta font-black text-xl text-on-surface mb-2">{session.title}</h3>
      <div className="text-[13px] text-on-surface/50 mb-4">by {session.host}</div>
      <p className="text-sm text-on-surface/70 leading-relaxed mb-5">{session.description}</p>
      <div className="h-px bg-primary/10 my-4" />
      <Detail icon="calendar_today" text={session.date} />
      <Detail icon="schedule" text={session.duration} />
      <Detail icon="group" text={`${session.attendees} attending`} />
      <Detail icon="folder" text={`Part of: ${session.programName}`} />
      <CTAButton label="Join Session" />
    </>
  )
}

function ProgramPreview({ program }: { program: DiscoverProgram }) {
  return (
    <>
      <div className="w-full rounded-[14px] overflow-hidden mb-5 bg-primary/[0.06]" style={{ aspectRatio: '16/10' }}>
        <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
      </div>
      <div className="text-[11px] font-bold uppercase tracking-wider text-primary-fixed-dim mb-1.5">
        Program
      </div>
      <h3 className="font-jakarta font-black text-xl text-on-surface mb-2">{program.title}</h3>
      <div className="text-[13px] text-on-surface/50 mb-4">by {program.owner}</div>
      <p className="text-sm text-on-surface/70 leading-relaxed mb-5">{program.description}</p>
      <div className="h-px bg-primary/10 my-4" />
      <Detail icon="event_repeat" text={`${program.sessionCount} sessions`} />
      <Detail icon="calendar_today" text={`Starts ${program.startDate}`} />
      <Detail icon="group" text={`${program.enrolled} enrolled`} />
      <Detail icon="workspace_premium" text={program.reward} />
      <div className="h-px bg-primary/10 my-4" />
      <div className="text-xs font-bold uppercase tracking-wide text-on-surface/50 mb-2.5">
        Sessions
      </div>
      {program.sessions.map((s) => (
        <div key={s.title} className="flex items-center gap-2.5 py-2 text-[13px] text-on-surface">
          <img src={s.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
          <div>
            <strong className="text-[13px]">{s.title}</strong>
            <br />
            <span className="text-[12px] text-on-surface/50">{s.date}</span>
          </div>
        </div>
      ))}
      <CTAButton label="Enroll in Program" />
    </>
  )
}

function CommunityPreview({ community }: { community: DiscoverCommunity }) {
  return (
    <>
      <div className="w-full rounded-[14px] overflow-hidden mb-5 bg-primary/[0.06]" style={{ aspectRatio: '16/10' }}>
        <img src={community.image} alt={community.name} className="w-full h-full object-cover" />
      </div>
      <div className="text-[11px] font-bold uppercase tracking-wider text-primary-fixed-dim mb-1.5">
        Community
      </div>
      <h3 className="font-jakarta font-black text-xl text-on-surface mb-2">{community.name}</h3>
      <div className="text-[13px] text-on-surface/50 mb-4">by {community.owner}</div>
      <p className="text-sm text-on-surface/70 leading-relaxed mb-5">{community.description}</p>
      <div className="h-px bg-primary/10 my-4" />
      <Detail icon="group" text={`${community.members} members`} />
      <Detail icon="event" text={`${community.programCount} active programs`} />
      <Detail icon="trending_up" text={`${community.sessionsThisMonth} sessions this month`} />
      <div className="h-px bg-primary/10 my-4" />
      <div className="text-xs font-bold uppercase tracking-wide text-on-surface/50 mb-2.5">
        Active Programs
      </div>
      {community.programs.map((p) => (
        <div key={p.name} className="flex items-center gap-2.5 py-2 text-[13px] text-on-surface">
          <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
          <div>
            <strong className="text-[13px]">{p.name}</strong>
            <br />
            <span className="text-[12px] text-on-surface/50">{p.status}</span>
          </div>
        </div>
      ))}
      <CTAButton label="Join Community" />
    </>
  )
}

function Detail({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 text-[13px] text-primary mb-2.5">
      <span className="material-symbols-outlined text-primary-fixed-dim" style={{ fontSize: '18px' }}>
        {icon}
      </span>
      {text}
    </div>
  )
}

function CTAButton({ label }: { label: string }) {
  return (
    <button
      className="w-full h-11 rounded-full border-none text-sm font-bold text-white cursor-pointer mt-5 transition-all hover:-translate-y-px"
      style={{
        background: 'linear-gradient(135deg, #ff7a2f, #e06520)',
        boxShadow: '0 4px 16px rgba(194,78,0,0.25)',
      }}
    >
      {label}
    </button>
  )
}

export default function PreviewPanel({ type, data, open, onClose }: PreviewPanelProps) {
  return (
    <div
      className={`fixed top-16 right-0 bottom-0 w-[380px] z-[45] p-7 px-6 overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{
        background: 'rgba(255,250,247,0.88)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        borderLeft: '1px solid rgba(156,63,0,0.1)',
        boxShadow: '-8px 0 40px rgba(194,78,0,0.08)',
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 rounded-full border-none cursor-pointer flex items-center justify-center text-primary transition-colors hover:bg-primary/[0.15]"
        style={{ background: 'rgba(156,63,0,0.08)' }}
        aria-label="Close preview"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
      </button>

      {type === 'session' && data && <SessionPreview session={data as DiscoverSession} />}
      {type === 'program' && data && <ProgramPreview program={data as DiscoverProgram} />}
      {type === 'community' && data && <CommunityPreview community={data as DiscoverCommunity} />}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd web && npx vitest run src/components/discover/__tests__/PreviewPanel.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add web/src/components/discover/PreviewPanel.tsx web/src/components/discover/__tests__/PreviewPanel.test.tsx
git commit -m "feat: add PreviewPanel slide-in drawer component"
```

---

## Task 7: Discover Page Assembly

**Files:**
- Create: `web/src/app/discover/page.tsx`
- Create: `web/src/components/discover/__tests__/DiscoverPage.test.tsx`

- [ ] **Step 1: Write the test**

```tsx
// web/src/components/discover/__tests__/DiscoverPage.test.tsx

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DiscoverPage from '@/app/discover/page'

describe('DiscoverPage', () => {
  it('renders all section headers', () => {
    render(<DiscoverPage />)
    expect(screen.getByText('Trending Programs')).toBeInTheDocument()
    expect(screen.getByText('Trending Today')).toBeInTheDocument()
    expect(screen.getByText('Upcoming This Week')).toBeInTheDocument()
    expect(screen.getByText('Featured Communities')).toBeInTheDocument()
  })

  it('renders filter pills', () => {
    render(<DiscoverPage />)
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Live Now')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web && npx vitest run src/components/discover/__tests__/DiscoverPage.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the page**

```tsx
// web/src/app/discover/page.tsx

'use client'

import { useState, useCallback } from 'react'
import FilterPills from '@/components/discover/FilterPills'
import TrendingPrograms from '@/components/discover/TrendingPrograms'
import SessionCarousel from '@/components/discover/SessionCarousel'
import FeaturedCommunities from '@/components/discover/FeaturedCommunities'
import PreviewPanel from '@/components/discover/PreviewPanel'
import { trendingPrograms } from '@/lib/fixtures/discover-programs'
import { trendingSessions, upcomingSessions } from '@/lib/fixtures/discover-sessions'
import { featuredCommunities } from '@/lib/fixtures/discover-communities'
import type { DiscoverSession, DiscoverProgram, DiscoverCommunity } from '@/lib/fixtures/discover-types'

type PreviewType = 'session' | 'program' | 'community' | null
type PreviewData = DiscoverSession | DiscoverProgram | DiscoverCommunity | null

export default function DiscoverPage() {
  const [panelOpen, setPanelOpen] = useState(false)
  const [previewType, setPreviewType] = useState<PreviewType>(null)
  const [previewData, setPreviewData] = useState<PreviewData>(null)

  const openPreview = useCallback((type: PreviewType, data: PreviewData) => {
    setPreviewType(type)
    setPreviewData(data)
    setPanelOpen(true)
  }, [])

  const closePreview = useCallback(() => {
    setPanelOpen(false)
  }, [])

  return (
    <div
      className="transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{ marginRight: panelOpen ? 380 : 0 }}
    >
      <FilterPills />
      <TrendingPrograms
        programs={trendingPrograms}
        onSelect={(p) => openPreview('program', p)}
      />
      <SessionCarousel
        title="Trending Today"
        sessions={trendingSessions}
        onSelect={(s) => openPreview('session', s)}
      />
      <SessionCarousel
        title="Upcoming This Week"
        sessions={upcomingSessions}
        onSelect={(s) => openPreview('session', s)}
      />
      <FeaturedCommunities
        communities={featuredCommunities}
        onSelect={(c) => openPreview('community', c)}
      />
      <PreviewPanel
        type={previewType}
        data={previewData}
        open={panelOpen}
        onClose={closePreview}
      />
    </div>
  )
}
```

**Note on centering:** The page content is already centered by AppShell's `max-w-[1400px] mx-auto` wrapper. When the panel opens, `marginRight: 380` on the page's outer div pushes the content left. Since AppShell uses `mx-auto`, the content re-centers within the remaining space automatically.

- [ ] **Step 4: Run test to verify it passes**

Run: `cd web && npx vitest run src/components/discover/__tests__/DiscoverPage.test.tsx`
Expected: PASS

- [ ] **Step 5: Run the full test suite**

Run: `cd web && npx vitest run`
Expected: All tests PASS, including existing Apex tests.

- [ ] **Step 6: Commit**

```bash
git add web/src/app/discover/page.tsx web/src/components/discover/__tests__/DiscoverPage.test.tsx
git commit -m "feat: add discovery homepage at /discover"
```

---

## Task 8: Visual QA in Browser

**Files:** No new files. Manual verification.

- [ ] **Step 1: Start the dev server**

Run: `cd web && npm run dev`

- [ ] **Step 2: Verify discovery page renders**

Open `http://localhost:3000/discover` in the browser. Confirm:
- Filter pills row renders with "All" active.
- Trending Programs section shows 6 cards in 2-column grid.
- Trending Today carousel scrolls horizontally with 6 session cards.
- Upcoming This Week carousel scrolls horizontally with 5 session cards.
- Featured Communities shows 3 portrait cards with gradient overlays.

- [ ] **Step 3: Verify preview panel behavior**

Click a program card → panel slides in from right showing program details with session list and "Enroll in Program" CTA. Content shifts left.

Click a session card → panel swaps to session details with date, duration, attendees, and "Join Session" CTA.

Click a community card → panel swaps to community details with member count, active programs list, and "Join Community" CTA.

Click close button → panel slides out, content re-centers.

- [ ] **Step 4: Verify hover effects**

- Quick-access cards: background brightens, play button fades in on right.
- Session cards: card lifts, play button slides up from bottom-right of image.
- Community cards: card lifts, shadow deepens.

- [ ] **Step 5: Verify existing pages still work**

Navigate to `http://localhost:3000/apex` and confirm it still renders correctly with no regressions.

- [ ] **Step 6: Run lint**

Run: `cd web && npm run lint`
Expected: No errors.

- [ ] **Step 7: Run production build**

Run: `cd web && npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 8: Final commit if any fixes were needed**

If any visual issues were fixed during QA:
```bash
git add -A
git commit -m "fix: visual QA adjustments for discovery homepage"
```
