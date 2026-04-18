# Community Profile Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a two-column community profile page at `/apex/community/[slug]` that shows product details, images, founder info, and Apex-generated learning material previews (Decode + Rapid Course).

**Architecture:** Dynamic route with slug-based product lookup from fixtures. Left column (sticky, 40%) holds product identity. Right column (scrollable, 60%) holds detailed content, images, and two preview cards linking out to static HTML files. Velo is the only fully built-out product; others show a "Coming soon" state.

**Tech Stack:** Next.js 15 (App Router, client components), TypeScript, Tailwind CSS v3, Vitest + React Testing Library, Material Symbols Outlined

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `web/src/lib/fixtures/types.ts` | Add new fields to `PhProduct` interface |
| Modify | `web/src/lib/fixtures/products.ts` | Add `slug` + full detail data for Velo, `slug` for all others |
| Create | `web/public/apex/velo-decode.html` | Static Decode HTML file (copied from `input/storybook-decode.html`) |
| Create | `web/public/apex/velo-rapidcourse.html` | Static Rapid Course HTML file (copied from `input/storybook-rapidcourse.html`) |
| Create | `web/src/components/apex/DecodePreviewCard.tsx` | Preview card for Decode file with "View Decode" link |
| Create | `web/src/components/apex/__tests__/DecodePreviewCard.test.tsx` | Smoke test for DecodePreviewCard |
| Create | `web/src/components/apex/RapidCoursePreviewCard.tsx` | Preview card for Rapid Course file with "View Course" link |
| Create | `web/src/components/apex/__tests__/RapidCoursePreviewCard.test.tsx` | Smoke test for RapidCoursePreviewCard |
| Create | `web/src/components/apex/CommunityProfile.tsx` | Two-column profile layout component |
| Create | `web/src/components/apex/__tests__/CommunityProfile.test.tsx` | Smoke test for CommunityProfile |
| Create | `web/src/app/apex/community/[slug]/page.tsx` | Dynamic route page — slug lookup, renders profile or "Coming soon" |
| Create | `web/src/app/apex/community/[slug]/__tests__/page.test.tsx` | Smoke test for community page |
| Modify | `web/src/components/apex/PhProductRow.tsx` | Make product name a clickable link to `/apex/community/<slug>` |

---

## Task 1: Expand PhProduct type and fixture data

**Files:**
- Modify: `web/src/lib/fixtures/types.ts`
- Modify: `web/src/lib/fixtures/products.ts`

- [ ] **Step 1: Add new fields to PhProduct interface**

Open `web/src/lib/fixtures/types.ts` and replace the `PhProduct` interface:

```typescript
export interface PhProduct {
  name: string
  slug: string
  category: string
  votes: number
  comments: number
  score: number
  logo: string
  tagline: string | null
  briefOverview: string | null
  description: string | null
  images: string[]
  makerName: string | null
  decodeUrl: string | null
  rapidCourseUrl: string | null
}
```

- [ ] **Step 2: Update all product fixtures with the new fields**

Replace the contents of `web/src/lib/fixtures/products.ts`:

```typescript
import type { PhProduct } from './types'

export const phProducts: PhProduct[] = [
  {
    name: 'Velo',
    slug: 'velo',
    category: 'Video Messaging',
    votes: 617,
    comments: 143,
    score: 103,
    logo: 'https://ph-files.imgix.net/35242a30-6f23-4a79-aa44-0a1752c38f00.png',
    tagline: 'Async video messaging that feels like being in the room',
    briefOverview: 'Velo lets teams send rich async video messages with instant transcription, AI summaries, and threaded replies. It replaces long meetings with quick, expressive video updates.',
    description: 'Velo reimagines async communication for modern teams. Record a quick video, and Velo automatically transcribes it, generates a TL;DR summary, and lets teammates reply inline — threaded by timestamp. No scheduling. No meeting fatigue.\n\nDesigned for remote-first teams, Velo integrates with Slack, Notion, and Linear so your video updates land where your team already works. The AI-powered search lets you find any moment across your team\'s entire video history.\n\nKey features include screen + camera recording, instant transcription with speaker labels, AI-generated summaries and action items, threaded timestamp replies, and a searchable team video library.',
    images: [
      'https://ph-files.imgix.net/35242a30-6f23-4a79-aa44-0a1752c38f00.png',
      'https://ph-files.imgix.net/35242a30-6f23-4a79-aa44-0a1752c38f00.png',
    ],
    makerName: 'Ajay Kumar',
    decodeUrl: '/apex/velo-decode.html',
    rapidCourseUrl: '/apex/velo-rapidcourse.html',
  },
  {
    name: 'Chrome Vertical Tabs',
    slug: 'chrome-vertical-tabs',
    category: 'Browser Enhancement',
    votes: 368,
    comments: 19,
    score: 61,
    logo: 'https://ph-files.imgix.net/f27f20c5-816f-4210-bbfa-8bdf797ffa3b.jpeg',
    tagline: null, briefOverview: null, description: null, images: [], makerName: null, decodeUrl: null, rapidCourseUrl: null,
  },
  {
    name: 'Flint',
    slug: 'flint',
    category: 'Campaign Landing Pages',
    votes: 345,
    comments: 27,
    score: 58,
    logo: 'https://ph-files.imgix.net/9c15287e-cffa-466c-80e8-85a03721354d.png',
    tagline: null, briefOverview: null, description: null, images: [], makerName: null, decodeUrl: null, rapidCourseUrl: null,
  },
  {
    name: 'LookAway 2',
    slug: 'lookaway-2',
    category: 'Eye Health for Mac',
    votes: 265,
    comments: 23,
    score: 44,
    logo: 'https://ph-files.imgix.net/6662a41b-1fc4-4ef1-97de-682533b0020c.png',
    tagline: null, briefOverview: null, description: null, images: [], makerName: null, decodeUrl: null, rapidCourseUrl: null,
  },
  {
    name: 'MindsDB Anton',
    slug: 'mindsdb-anton',
    category: 'Autonomous BI Agent',
    votes: 185,
    comments: 16,
    score: 31,
    logo: 'https://ph-files.imgix.net/4a8b9470-4b71-466c-a8dd-8e27ee706f17.gif',
    tagline: null, briefOverview: null, description: null, images: [], makerName: null, decodeUrl: null, rapidCourseUrl: null,
  },
  {
    name: 'Browser Arena',
    slug: 'browser-arena',
    category: 'Cloud Browser Benchmarks',
    votes: 174,
    comments: 29,
    score: 29,
    logo: 'https://ph-files.imgix.net/a5d945d7-db55-4fd6-a412-0b332c5cc687.png',
    tagline: null, briefOverview: null, description: null, images: [], makerName: null, decodeUrl: null, rapidCourseUrl: null,
  },
  {
    name: 'Career-Ops on Claude',
    slug: 'career-ops-on-claude',
    category: 'AI Job Search',
    votes: 137,
    comments: 11,
    score: 23,
    logo: 'https://ph-files.imgix.net/0ec7ef46-3cb1-4694-bb9a-6b4a6c8450cb.png',
    tagline: null, briefOverview: null, description: null, images: [], makerName: null, decodeUrl: null, rapidCourseUrl: null,
  },
  {
    name: 'Keeby',
    slug: 'keeby',
    category: 'Keyboard Sounds for Mac',
    votes: 136,
    comments: 12,
    score: 23,
    logo: 'https://ph-files.imgix.net/fb80aea5-1784-4115-ba24-3ebb42e83db0.png',
    tagline: null, briefOverview: null, description: null, images: [], makerName: null, decodeUrl: null, rapidCourseUrl: null,
  },
  {
    name: 'PassportReader',
    slug: 'passport-reader',
    category: 'Identity Verification API',
    votes: 113,
    comments: 10,
    score: 19,
    logo: 'https://ph-files.imgix.net/48e83c11-841f-40f6-975f-b20c548ed680.png',
    tagline: null, briefOverview: null, description: null, images: [], makerName: null, decodeUrl: null, rapidCourseUrl: null,
  },
  {
    name: 'FeatDrop',
    slug: 'featdrop',
    category: 'Public Product Changelog',
    votes: 110,
    comments: 16,
    score: 18,
    logo: 'https://ph-files.imgix.net/3fa5cb0b-6684-485c-8935-5706d51c4ebb.png',
    tagline: null, briefOverview: null, description: null, images: [], makerName: null, decodeUrl: null, rapidCourseUrl: null,
  },
]
```

- [ ] **Step 3: Run existing tests to verify nothing broke**

```bash
cd web
npm run test:run
```

All existing tests should still pass — the new fields are additive and all existing references to `name`, `votes`, etc. still work.

- [ ] **Step 4: Commit**

```bash
git add src/lib/fixtures/types.ts src/lib/fixtures/products.ts
git commit -m "feat: expand PhProduct type with profile fields, add Velo detail data"
```

---

## Task 2: Copy static HTML files to public directory

**Files:**
- Create: `web/public/apex/velo-decode.html`
- Create: `web/public/apex/velo-rapidcourse.html`

- [ ] **Step 1: Create the apex directory in public and copy the HTML files**

```bash
cd web
mkdir -p public/apex
cp ../input/storybook-decode.html public/apex/velo-decode.html
cp ../input/storybook-rapidcourse.html public/apex/velo-rapidcourse.html
```

- [ ] **Step 2: Verify the files are accessible**

```bash
ls -la public/apex/
```

Expected: both `velo-decode.html` and `velo-rapidcourse.html` are present.

- [ ] **Step 3: Commit**

```bash
git add public/apex/velo-decode.html public/apex/velo-rapidcourse.html
git commit -m "feat: add Velo Decode and Rapid Course static HTML files"
```

---

## Task 3: Create DecodePreviewCard component (TDD)

**Files:**
- Create: `web/src/components/apex/__tests__/DecodePreviewCard.test.tsx`
- Create: `web/src/components/apex/DecodePreviewCard.tsx`

- [ ] **Step 1: Write the failing test**

Create `web/src/components/apex/__tests__/DecodePreviewCard.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DecodePreviewCard from '../DecodePreviewCard'

describe('DecodePreviewCard', () => {
  it('renders the card title and description', () => {
    render(
      <DecodePreviewCard
        productName="Velo"
        description="A deep-dive analysis of Velo's product strategy and technology."
        decodeUrl="/apex/velo-decode.html"
      />
    )
    expect(screen.getByText('Apex Decode')).toBeInTheDocument()
    expect(screen.getByText('Velo — Deep Dive')).toBeInTheDocument()
    expect(screen.getByText("A deep-dive analysis of Velo's product strategy and technology.")).toBeInTheDocument()
  })

  it('renders the View Decode link pointing to the correct URL', () => {
    render(
      <DecodePreviewCard
        productName="Velo"
        description="A deep-dive analysis."
        decodeUrl="/apex/velo-decode.html"
      />
    )
    const link = screen.getByRole('link', { name: /View Decode/i })
    expect(link).toHaveAttribute('href', '/apex/velo-decode.html')
    expect(link).toHaveAttribute('target', '_blank')
  })
})
```

- [ ] **Step 2: Run tests — expect failure**

```bash
cd web
npm run test:run -- src/components/apex/__tests__/DecodePreviewCard.test.tsx
```

Expected: 2 tests fail with `Cannot find module '../DecodePreviewCard'`

- [ ] **Step 3: Create DecodePreviewCard.tsx**

Create `web/src/components/apex/DecodePreviewCard.tsx`:

```tsx
'use client'

interface DecodePreviewCardProps {
  productName: string
  description: string
  decodeUrl: string
}

export default function DecodePreviewCard({ productName, description, decodeUrl }: DecodePreviewCardProps) {
  return (
    <div className="premium-glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1", color: '#ff7a2f' }}
        >
          psychology
        </span>
        <span className="text-xs font-bold text-primary uppercase tracking-wider">Apex Decode</span>
      </div>
      <h3 className="text-lg font-black font-jakarta text-on-background mb-2">
        {productName} — Deep Dive
      </h3>
      <p className="text-sm text-on-background/70 mb-5 leading-relaxed">{description}</p>
      <a
        href={decodeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block font-jakarta font-bold text-sm rounded-full px-6 py-2.5 transition-all duration-300 active:scale-95 no-underline"
        style={{
          background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 122, 47, 0.3)',
          boxShadow: '0 8px 32px -4px rgba(194, 78, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
          color: '#7a2e00',
        }}
      >
        View Decode
      </a>
    </div>
  )
}
```

- [ ] **Step 4: Run tests — expect all to pass**

```bash
cd web
npm run test:run -- src/components/apex/__tests__/DecodePreviewCard.test.tsx
```

Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/apex/DecodePreviewCard.tsx src/components/apex/__tests__/DecodePreviewCard.test.tsx
git commit -m "feat: add DecodePreviewCard component with liquid glass button"
```

---

## Task 4: Create RapidCoursePreviewCard component (TDD)

**Files:**
- Create: `web/src/components/apex/__tests__/RapidCoursePreviewCard.test.tsx`
- Create: `web/src/components/apex/RapidCoursePreviewCard.tsx`

- [ ] **Step 1: Write the failing test**

Create `web/src/components/apex/__tests__/RapidCoursePreviewCard.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import RapidCoursePreviewCard from '../RapidCoursePreviewCard'

describe('RapidCoursePreviewCard', () => {
  it('renders the card title and description', () => {
    render(
      <RapidCoursePreviewCard
        productName="Velo"
        description="A hands-on microcourse covering Velo's core workflows."
        rapidCourseUrl="/apex/velo-rapidcourse.html"
      />
    )
    expect(screen.getByText('Apex Rapid Course')).toBeInTheDocument()
    expect(screen.getByText('Velo — Microcourse')).toBeInTheDocument()
    expect(screen.getByText("A hands-on microcourse covering Velo's core workflows.")).toBeInTheDocument()
  })

  it('renders the View Course link pointing to the correct URL', () => {
    render(
      <RapidCoursePreviewCard
        productName="Velo"
        description="A hands-on microcourse."
        rapidCourseUrl="/apex/velo-rapidcourse.html"
      />
    )
    const link = screen.getByRole('link', { name: /View Course/i })
    expect(link).toHaveAttribute('href', '/apex/velo-rapidcourse.html')
    expect(link).toHaveAttribute('target', '_blank')
  })
})
```

- [ ] **Step 2: Run tests — expect failure**

```bash
cd web
npm run test:run -- src/components/apex/__tests__/RapidCoursePreviewCard.test.tsx
```

Expected: 2 tests fail with `Cannot find module '../RapidCoursePreviewCard'`

- [ ] **Step 3: Create RapidCoursePreviewCard.tsx**

Create `web/src/components/apex/RapidCoursePreviewCard.tsx`:

```tsx
'use client'

interface RapidCoursePreviewCardProps {
  productName: string
  description: string
  rapidCourseUrl: string
}

export default function RapidCoursePreviewCard({ productName, description, rapidCourseUrl }: RapidCoursePreviewCardProps) {
  return (
    <div className="premium-glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1", color: '#ff7a2f' }}
        >
          bolt
        </span>
        <span className="text-xs font-bold text-primary uppercase tracking-wider">Apex Rapid Course</span>
      </div>
      <h3 className="text-lg font-black font-jakarta text-on-background mb-2">
        {productName} — Microcourse
      </h3>
      <p className="text-sm text-on-background/70 mb-5 leading-relaxed">{description}</p>
      <a
        href={rapidCourseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block font-jakarta font-bold text-sm rounded-full px-6 py-2.5 transition-all duration-300 active:scale-95 no-underline"
        style={{
          background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 122, 47, 0.3)',
          boxShadow: '0 8px 32px -4px rgba(194, 78, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
          color: '#7a2e00',
        }}
      >
        View Course
      </a>
    </div>
  )
}
```

- [ ] **Step 4: Run tests — expect all to pass**

```bash
cd web
npm run test:run -- src/components/apex/__tests__/RapidCoursePreviewCard.test.tsx
```

Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/apex/RapidCoursePreviewCard.tsx src/components/apex/__tests__/RapidCoursePreviewCard.test.tsx
git commit -m "feat: add RapidCoursePreviewCard component with liquid glass button"
```

---

## Task 5: Create CommunityProfile component (TDD)

**Files:**
- Create: `web/src/components/apex/__tests__/CommunityProfile.test.tsx`
- Create: `web/src/components/apex/CommunityProfile.tsx`

- [ ] **Step 1: Write the failing test**

Create `web/src/components/apex/__tests__/CommunityProfile.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CommunityProfile from '../CommunityProfile'
import type { PhProduct } from '@/lib/fixtures/types'

const mockProduct: PhProduct = {
  name: 'Velo',
  slug: 'velo',
  category: 'Video Messaging',
  votes: 617,
  comments: 143,
  score: 103,
  logo: 'https://example.com/logo.png',
  tagline: 'Async video messaging that feels like being in the room',
  briefOverview: 'Velo lets teams send rich async video messages.',
  description: 'Velo reimagines async communication for modern teams.',
  images: ['https://example.com/img1.png'],
  makerName: 'Ajay Kumar',
  decodeUrl: '/apex/velo-decode.html',
  rapidCourseUrl: '/apex/velo-rapidcourse.html',
}

const mockFounder = {
  name: 'Ajay Kumar',
  role: 'Maker, Velo',
  quote: 'Video is the most human form of async communication.',
  avatar: 'https://example.com/avatar.png',
}

describe('CommunityProfile', () => {
  it('renders product name, tagline, and category', () => {
    render(<CommunityProfile product={mockProduct} founder={mockFounder} />)
    expect(screen.getByText('Velo')).toBeInTheDocument()
    expect(screen.getByText('Async video messaging that feels like being in the room')).toBeInTheDocument()
    expect(screen.getByText('Video Messaging')).toBeInTheDocument()
  })

  it('renders stats', () => {
    render(<CommunityProfile product={mockProduct} founder={mockFounder} />)
    expect(screen.getByText('617')).toBeInTheDocument()
    expect(screen.getByText('143')).toBeInTheDocument()
    expect(screen.getByText('103')).toBeInTheDocument()
  })

  it('renders founder card', () => {
    render(<CommunityProfile product={mockProduct} founder={mockFounder} />)
    expect(screen.getByText('Ajay Kumar')).toBeInTheDocument()
    expect(screen.getByText('Maker, Velo')).toBeInTheDocument()
  })

  it('renders description and preview cards', () => {
    render(<CommunityProfile product={mockProduct} founder={mockFounder} />)
    expect(screen.getByText('Velo reimagines async communication for modern teams.')).toBeInTheDocument()
    expect(screen.getByText('Apex Decode')).toBeInTheDocument()
    expect(screen.getByText('Apex Rapid Course')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests — expect failure**

```bash
cd web
npm run test:run -- src/components/apex/__tests__/CommunityProfile.test.tsx
```

Expected: 4 tests fail with `Cannot find module '../CommunityProfile'`

- [ ] **Step 3: Create CommunityProfile.tsx**

Create `web/src/components/apex/CommunityProfile.tsx`:

```tsx
'use client'

import type { PhProduct, Founder } from '@/lib/fixtures/types'
import DecodePreviewCard from './DecodePreviewCard'
import RapidCoursePreviewCard from './RapidCoursePreviewCard'

interface CommunityProfileProps {
  product: PhProduct
  founder: Founder | null
}

export default function CommunityProfile({ product, founder }: CommunityProfileProps) {
  return (
    <div className="flex gap-10 fade-up">
      {/* Left column — fixed identity panel */}
      <div className="w-[40%] shrink-0">
        <div className="sticky top-28">
          {/* Product logo */}
          <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg border border-orange-100/40 mb-5 bg-white">
            <img src={product.logo} alt={`${product.name} logo`} className="w-full h-full object-cover" />
          </div>

          {/* Name + tagline */}
          <h1 className="text-3xl font-black font-jakarta text-primary leading-tight mb-1">
            {product.name}
          </h1>
          {product.tagline && (
            <p className="text-base text-on-background/70 mb-4">{product.tagline}</p>
          )}

          {/* Category pill */}
          <span
            className="inline-block text-xs font-bold rounded-full px-4 py-1.5 mb-5"
            style={{
              background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 122, 47, 0.3)',
              color: '#7a2e00',
            }}
          >
            {product.category}
          </span>

          {/* Stats row */}
          <div className="flex items-center gap-5 mb-5">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>arrow_upward</span>
              <span className="text-sm font-black text-on-background">{product.votes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>mode_comment</span>
              <span className="text-sm font-black text-on-background">{product.comments.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>bolt</span>
              <span className="text-sm font-black text-primary">{product.score}</span>
            </div>
          </div>

          {/* Brief overview */}
          {product.briefOverview && (
            <p className="text-sm text-on-background/70 leading-relaxed mb-6">{product.briefOverview}</p>
          )}

          {/* Founder card */}
          {founder && (
            <div className="premium-glass rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm shrink-0 border border-white/60">
                <img src={founder.avatar} alt={founder.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-black text-on-background leading-tight">{founder.name}</p>
                <p className="text-xs text-on-background/60 font-semibold">{founder.role}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right column — scrollable content */}
      <div className="flex-1 space-y-8 fade-up fade-up-1">
        {/* Full description */}
        {product.description && (
          <div>
            <h2 className="text-xl font-black font-jakarta text-on-background mb-3">About</h2>
            {product.description.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-sm text-on-background/80 leading-relaxed mb-3">{paragraph}</p>
            ))}
          </div>
        )}

        {/* Product images */}
        {product.images.length > 0 && (
          <div className="space-y-4">
            {product.images.map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-lg border border-orange-100/30">
                <img src={src} alt={`${product.name} screenshot ${i + 1}`} className="w-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Decode preview card */}
        {product.decodeUrl && (
          <DecodePreviewCard
            productName={product.name}
            description={`A deep-dive analysis of ${product.name}'s product strategy, technology stack, and competitive positioning generated by Apex.`}
            decodeUrl={product.decodeUrl}
          />
        )}

        {/* Rapid Course preview card */}
        {product.rapidCourseUrl && (
          <RapidCoursePreviewCard
            productName={product.name}
            description={`A hands-on microcourse covering ${product.name}'s core workflows, key concepts, and practical use cases generated by Apex.`}
            rapidCourseUrl={product.rapidCourseUrl}
          />
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run tests — expect all to pass**

```bash
cd web
npm run test:run -- src/components/apex/__tests__/CommunityProfile.test.tsx
```

Expected: 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/apex/CommunityProfile.tsx src/components/apex/__tests__/CommunityProfile.test.tsx
git commit -m "feat: add CommunityProfile two-column layout component"
```

---

## Task 6: Create the community page route (TDD)

**Files:**
- Create: `web/src/app/apex/community/[slug]/__tests__/page.test.tsx`
- Create: `web/src/app/apex/community/[slug]/page.tsx`

- [ ] **Step 1: Write the failing test**

Create `web/src/app/apex/community/[slug]/__tests__/page.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CommunityPage from '../page'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => ({ slug: 'velo' }),
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe('CommunityPage', () => {
  it('renders Velo community profile', () => {
    render(<CommunityPage />)
    expect(screen.getByText('Velo')).toBeInTheDocument()
    expect(screen.getByText(/Async video messaging/)).toBeInTheDocument()
  })

  it('renders back button', () => {
    render(<CommunityPage />)
    const backLink = screen.getByRole('link', { name: /Back to Apex/i })
    expect(backLink).toHaveAttribute('href', '/apex')
  })
})
```

- [ ] **Step 2: Write a test for the Coming Soon state**

Add to the same test file:

```tsx
// Add a separate describe block for unknown slugs
describe('CommunityPage — unknown slug', () => {
  beforeEach(() => {
    vi.mocked(require('next/navigation').useParams).mockReturnValue({ slug: 'unknown-product' })
  })

  afterEach(() => {
    vi.mocked(require('next/navigation').useParams).mockReturnValue({ slug: 'velo' })
  })

  it('renders Coming Soon for unknown slugs', () => {
    render(<CommunityPage />)
    expect(screen.getByText(/still building this community profile/i)).toBeInTheDocument()
  })
})
```

Actually, this mock approach is fragile. Better to test both states in a simpler way. Replace the entire test file with:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock next/navigation — default to velo
const mockParams = { slug: 'velo' }
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => mockParams,
}))

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import CommunityPage from '../page'

describe('CommunityPage', () => {
  it('renders Velo community profile', () => {
    mockParams.slug = 'velo'
    render(<CommunityPage />)
    expect(screen.getByText('Velo')).toBeInTheDocument()
    expect(screen.getByText(/Async video messaging/)).toBeInTheDocument()
  })

  it('renders back button', () => {
    mockParams.slug = 'velo'
    render(<CommunityPage />)
    const backLink = screen.getByRole('link', { name: /Back to Apex/i })
    expect(backLink).toHaveAttribute('href', '/apex')
  })

  it('renders Coming Soon for products without full profiles', () => {
    mockParams.slug = 'flint'
    render(<CommunityPage />)
    expect(screen.getByText(/still building this community profile/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run tests — expect failure**

```bash
cd web
npm run test:run -- src/app/apex/community/\\[slug\\]/__tests__/page.test.tsx
```

Expected: 3 tests fail with `Cannot find module '../page'`

- [ ] **Step 4: Create the page component**

Create `web/src/app/apex/community/[slug]/page.tsx`:

```tsx
'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { phProducts } from '@/lib/fixtures/products'
import { founders } from '@/lib/fixtures/founders'
import CommunityProfile from '@/components/apex/CommunityProfile'

export default function CommunityPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = phProducts.find(p => p.slug === slug)

  if (!product) {
    return (
      <div className="text-center py-20 fade-up">
        <span className="material-symbols-outlined text-stone-300 mb-4" style={{ fontSize: '48px' }}>error_outline</span>
        <p className="text-on-background/50 text-lg">Product not found.</p>
        <Link href="/apex" className="text-primary font-bold text-sm mt-4 inline-block hover:underline">
          Back to Apex
        </Link>
      </div>
    )
  }

  const hasFullProfile = product.description !== null
  const founder = founders.find(f => f.role.includes(product.name)) ?? null

  return (
    <div className="fade-up">
      {/* Back button */}
      <Link
        href="/apex"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors mb-8"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
        Back to Apex
      </Link>

      {hasFullProfile ? (
        <CommunityProfile product={product} founder={founder} />
      ) : (
        <div className="flex gap-10">
          {/* Minimal left column with available data */}
          <div className="w-[40%] shrink-0">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg border border-orange-100/40 mb-5 bg-white">
              <img src={product.logo} alt={`${product.name} logo`} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl font-black font-jakarta text-primary leading-tight mb-2">
              {product.name}
            </h1>
            <span
              className="inline-block text-xs font-bold rounded-full px-4 py-1.5 mb-4"
              style={{
                background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
                border: '1px solid rgba(255, 122, 47, 0.3)',
                color: '#7a2e00',
              }}
            >
              {product.category}
            </span>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>arrow_upward</span>
                <span className="text-sm font-black text-on-background">{product.votes.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>mode_comment</span>
                <span className="text-sm font-black text-on-background">{product.comments.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>bolt</span>
                <span className="text-sm font-black text-primary">{product.score}</span>
              </div>
            </div>
          </div>

          {/* Coming soon message */}
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="text-center">
              <span className="material-symbols-outlined text-stone-300 mb-3" style={{ fontSize: '40px', fontVariationSettings: "'FILL' 1" }}>
                construction
              </span>
              <p className="text-on-background/50 text-base">
                Apex is still building this community profile. Check back soon.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 5: Run tests — expect all to pass**

```bash
cd web
npm run test:run -- src/app/apex/community/\\[slug\\]/__tests__/page.test.tsx
```

Expected: 3 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/app/apex/community/
git commit -m "feat: add community profile page at /apex/community/[slug]"
```

---

## Task 7: Make PhProductRow link to community page

**Files:**
- Modify: `web/src/components/apex/PhProductRow.tsx`

- [ ] **Step 1: Add the slug prop and make the product name a link**

Replace the contents of `web/src/components/apex/PhProductRow.tsx`:

```tsx
'use client'

import Link from 'next/link'
import type { PhProduct } from '@/lib/fixtures/types'

interface PhProductRowProps {
  product: PhProduct
  rank: number
  onPreviewClick?: () => void
}

export default function PhProductRow({ product, rank, onPreviewClick }: PhProductRowProps) {
  return (
    <div className="grid grid-cols-12 items-center p-3 rounded-2xl bg-white/30 hover:bg-white/55 transition-all group cursor-pointer border border-orange-100/30 shadow-sm">
      <div className="col-span-1 flex items-center justify-center">
        <span className="text-[11px] font-black text-stone-400">{rank}</span>
      </div>
      <div className="col-span-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-md overflow-hidden shadow-md shrink-0 bg-white border border-stone-100">
          <img src={product.logo} alt={`${product.name} logo`} className="w-full h-full object-cover" />
        </div>
        <div className="truncate flex-1 min-w-0">
          <Link
            href={`/apex/community/${product.slug}`}
            className="font-extrabold text-sm text-on-background group-hover:text-primary transition-colors leading-tight hover:underline"
          >
            {product.name}
          </Link>
          <p className="text-[10px] text-stone-500 font-bold truncate leading-tight">{product.category}</p>
        </div>
        {onPreviewClick && (
          <button
            onClick={(e) => { e.stopPropagation(); onPreviewClick() }}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white text-primary text-[10px] font-extrabold px-3 py-1.5 rounded-xl shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap shrink-0 border border-orange-50/80 font-jakarta"
          >
            Preview Outreach
          </button>
        )}
      </div>
      <div className="col-span-6 grid grid-cols-3">
        <div className="text-center"><span className="text-sm font-black text-on-background">{product.votes.toLocaleString()}</span></div>
        <div className="text-center"><span className="text-sm font-black text-on-background">{product.comments}</span></div>
        <div className="text-center"><span className="text-sm font-black text-primary">{product.score}</span></div>
      </div>
    </div>
  )
}
```

Changes from original:
- Added `import Link from 'next/link'`
- Product name `<h3>` replaced with `<Link href={/apex/community/${product.slug}}>` (uses the new `slug` field)
- Added `e.stopPropagation()` on the "Preview Outreach" button click to prevent navigation when clicking the button
- Added `hover:underline` to the product name link

- [ ] **Step 2: Run the full test suite**

```bash
cd web
npm run test:run
```

All tests should pass. The PhTable test checks for `screen.getByText('Velo')` which still matches the Link text content.

- [ ] **Step 3: Commit**

```bash
git add src/components/apex/PhProductRow.tsx
git commit -m "feat: make product names in PhTable link to community profile pages"
```

---

## Done

The community profile page is now:
1. Accessible at `/apex/community/velo` (and any other slug)
2. Linked from every product row in the PhTable
3. Shows a full two-column profile for Velo (left: identity panel, right: description + images + Decode/RapidCourse preview cards)
4. Shows a "Coming soon" state for all other products
5. Decode and Rapid Course HTML files open in new tabs via liquid glass buttons
6. Back button returns to `/apex`
