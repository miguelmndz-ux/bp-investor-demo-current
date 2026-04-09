# BuildParty Web App — Project Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a Next.js 15 app with the full BuildParty design system extracted from `apex-dashboard.html`, build the shared `AppShell` layout, and ship the Apex Dashboard as the first working screen at a Vercel URL.

**Architecture:** Next.js 15 App Router with client components throughout. Design tokens live in `tailwind.config.ts` (Tailwind v3). Faked data in typed TypeScript fixtures. All screens share an `AppShell` wrapper containing `SideNav` and `TopNav`. The app lives in a `web/` subdirectory alongside the existing `docs/` and reference HTML.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v3, `@tailwindcss/forms`, `@tailwindcss/container-queries`, Material Symbols (Google CDN), Plus Jakarta Sans + Inter (next/font), Vitest + React Testing Library, Vercel.

---

## File Map

```
web/
  src/
    app/
      layout.tsx                        root layout — fonts, head links, AppShell
      page.tsx                          redirect → /apex
      apex/
        page.tsx                        Apex Dashboard screen
    components/
      layout/
        AppShell.tsx                    wraps SideNav + TopNav + children
        SideNav.tsx                     left icon nav with community avatars
        TopNav.tsx                      top bar with search, notifs, avatar
      apex/
        HeroCard.tsx                    gradient hero "Apex has drafted 10 new outreaches"
        PhProductRow.tsx                single row in PH table
        PhTable.tsx                     full PH Top 10 table
        FounderCard.tsx                 single founder intel card
        FounderGrid.tsx                 2-column grid of FounderCards
        LiveStatsPanel.tsx              right-column stats section
        AgentWorkflowLog.tsx            agent activity log
    lib/
      fixtures/
        types.ts                        shared TypeScript interfaces
        communities.ts                  community/creator avatars for SideNav
        products.ts                     PH top 10 products
        founders.ts                     founder intel cards
        workflowLog.ts                  agent workflow log items
    test/
      setup.ts                          @testing-library/jest-dom import
  tailwind.config.ts
  postcss.config.mjs
  vitest.config.ts
  next.config.ts
  tsconfig.json
  package.json
```

---

## Task 1: Scaffold the project

**Files:**
- Create: `web/` directory (via create-next-app)
- Create: `web/vitest.config.ts`
- Create: `web/src/test/setup.ts`

- [ ] **Step 1: Create the Next.js app (no Tailwind — we install v3 manually)**

Run from `bp-investor-demo-current/`:
```bash
npx create-next-app@latest web --typescript --app --src-dir --no-tailwind --eslint --no-import-alias
```

When prompted:
- TypeScript: Yes (already flagged)
- ESLint: Yes (already flagged)
- Tailwind: skip (--no-tailwind)
- src/ dir: Yes (already flagged)
- App Router: Yes (already flagged)

- [ ] **Step 2: Install Tailwind v3 and plugins**

```bash
cd web
npm install -D tailwindcss@^3 postcss autoprefixer @tailwindcss/forms @tailwindcss/container-queries
npx tailwindcss init -p --ts
```

Expected: creates `tailwind.config.ts` and `postcss.config.mjs`.

- [ ] **Step 3: Install test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 4: Create `web/vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 5: Create `web/src/test/setup.ts`**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Add test scripts to `web/package.json`**

Open `web/package.json` and add to the `"scripts"` section:
```json
"test": "vitest",
"test:run": "vitest run"
```

- [ ] **Step 7: Verify the scaffold builds**

```bash
npm run build
```

Expected: successful build with default Next.js placeholder content.

- [ ] **Step 8: Commit**

```bash
cd ..
git add web/
git commit -m "feat: scaffold Next.js 15 app with Tailwind v3 and Vitest"
```

---

## Task 2: Design system — Tailwind config

**Files:**
- Modify: `web/tailwind.config.ts`

- [ ] **Step 1: Replace `web/tailwind.config.ts` with the full BuildParty design system**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-fixed':             '#ff7a2f',
        'surface-container-high':    '#ffdcc6',
        'primary':                   '#9c3f00',
        'on-tertiary':               '#fff1df',
        'on-secondary':              '#fff0e8',
        'tertiary-container':        '#fbb423',
        'surface-container-lowest':  '#ffffff',
        'outline-variant':           '#dba078',
        'on-error':                  '#ffefec',
        'on-tertiary-fixed-variant': '#5e4000',
        'on-secondary-fixed':        '#552800',
        'surface-container-highest': '#ffd4b9',
        'tertiary-fixed-dim':        '#eba60f',
        'on-error-container':        '#520c00',
        'on-secondary-container':    '#723700',
        'surface-dim':               '#ffc9a6',
        'surface-variant':           '#ffd4b9',
        'tertiary-fixed':            '#fbb423',
        'on-background':             '#4a2506',
        'on-primary-fixed':          '#000000',
        'background':                '#fffaf7',
        'on-tertiary-fixed':         '#372400',
        'on-secondary-fixed-variant':'#803f00',
        'error-container':           '#f95630',
        'on-primary-container':      '#401500',
        'on-primary-fixed-variant':  '#4f1c00',
        'inverse-on-surface':        '#c99169',
        'surface':                   '#fffaf7',
        'on-surface':                '#4a2506',
        'tertiary-dim':              '#6b4900',
        'error':                     '#b02500',
        'tertiary':                  '#7a5400',
        'secondary-fixed':           '#ffc69f',
        'secondary':                 '#904800',
        'primary-dim':               '#893600',
        'surface-bright':            '#fffaf7',
        'inverse-primary':           '#fe6b00',
        'error-dim':                 '#b92902',
        'on-primary':                '#fff0ea',
        'secondary-dim':             '#7e3e00',
        'surface-container':         '#ffe3d2',
        'inverse-surface':           '#1c0900',
        'secondary-fixed-dim':       '#ffb37d',
        'surface-tint':              '#9c3f00',
        'on-tertiary-container':     '#523700',
        'primary-container':         '#ff7a2f',
        'on-surface-variant':        '#7f512e',
        'primary-fixed-dim':         '#f66700',
        'surface-container-low':     '#ffede4',
        'outline':                   '#9e6b47',
        'secondary-container':       '#ffc69f',
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px',
      },
      fontFamily: {
        headline: ['var(--font-plus-jakarta-sans)', 'Plus Jakarta Sans', 'sans-serif'],
        body:     ['var(--font-inter)', 'Inter', 'sans-serif'],
        label:    ['var(--font-inter)', 'Inter', 'sans-serif'],
        jakarta:  ['var(--font-plus-jakarta-sans)', 'Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}

export default config
```

- [ ] **Step 2: Commit**

```bash
git add web/tailwind.config.ts
git commit -m "feat: add BuildParty design system tokens to Tailwind config"
```

---

## Task 3: globals.css + root layout

**Files:**
- Create: `web/src/styles/globals.css`
- Modify: `web/src/app/layout.tsx`
- Create: `web/src/app/page.tsx`

- [ ] **Step 1: Create `web/src/styles/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─── Body ──────────────────────────────────────────────────────────── */
body {
  background-color: #fffaf7;
  background-image: linear-gradient(180deg, #fffaf7 0%, #fff1e6 100%);
  background-attachment: fixed;
  background-size: cover;
  color: #4a2506;
  font-family: var(--font-inter), 'Inter', sans-serif;
}

h1, h2, h3, .font-jakarta {
  font-family: var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif;
}

/* ─── Glass ──────────────────────────────────────────────────────────── */
.premium-glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 237, 213, 0.5);
  box-shadow:
    0 15px 35px -5px rgba(74, 37, 6, 0.1),
    0 10px 15px -10px rgba(74, 37, 6, 0.05);
  position: relative;
  overflow: hidden;
}

.premium-glass::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0) 45%,
    rgba(255,247,237,0.4) 50%,
    rgba(255,255,255,0) 55%,
    rgba(255,255,255,0) 100%
  );
  pointer-events: none;
  z-index: 0;
  transform: rotate(15deg);
}

.premium-glass::after {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background:
    radial-gradient(circle at top left, rgba(255,237,213,0.3) 0%, transparent 20%),
    radial-gradient(circle at bottom right, rgba(255,247,237,0.2) 0%, transparent 15%);
  pointer-events: none;
  z-index: 0;
}

.premium-glass > * {
  position: relative;
  z-index: 1;
}

/* ─── Glass Button ───────────────────────────────────────────────────── */
.glass-button {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 237, 213, 0.4);
  transition: all 0.3s ease;
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.7);
  transform: translateY(-1px);
}

/* ─── Avatar ─────────────────────────────────────────────────────────── */
.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: -0.01em;
}

/* ─── Scrollbar ──────────────────────────────────────────────────────── */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(156,63,0,0.2); border-radius: 9999px; }
::-webkit-scrollbar-thumb:hover { background: rgba(156,63,0,0.35); }

/* ─── Animations ─────────────────────────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fade-up   { animation: fadeUp 0.5s ease both; }
.fade-up-1 { animation-delay: 0.05s; }
.fade-up-2 { animation-delay: 0.12s; }
.fade-up-3 { animation-delay: 0.19s; }
.fade-up-4 { animation-delay: 0.26s; }
```

- [ ] **Step 2: Write `web/src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BuildParty',
  description: 'The live platform for AI builder communities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={`${inter.variable} ${plusJakartaSans.variable} min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Write `web/src/app/page.tsx`**

```tsx
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/apex')
}
```

- [ ] **Step 4: Verify dev server runs**

```bash
npm run dev
```

Expected: localhost:3000 redirects to /apex (404 for now, that's correct — the page doesn't exist yet).

- [ ] **Step 5: Commit**

```bash
git add web/src/styles/globals.css web/src/app/layout.tsx web/src/app/page.tsx
git commit -m "feat: add globals.css design system and root layout with fonts"
```

---

## Task 4: Fixtures

**Files:**
- Create: `web/src/lib/fixtures/types.ts`
- Create: `web/src/lib/fixtures/communities.ts`
- Create: `web/src/lib/fixtures/products.ts`
- Create: `web/src/lib/fixtures/founders.ts`
- Create: `web/src/lib/fixtures/workflowLog.ts`

- [ ] **Step 1: Write `web/src/lib/fixtures/types.ts`**

```ts
export type CommunityType = 'creator' | 'community'

export interface Community {
  name: string
  href: string
  avatar: string
  type: CommunityType
}

export interface PhProduct {
  name: string
  category: string
  votes: number
  comments: number
  score: number
  logo: string
}

export interface Founder {
  name: string
  role: string
  quote: string
  avatar: string
}

export type WorkflowStatus = 'done' | 'pending'

export interface WorkflowLogItem {
  id: string
  icon: string
  label: string
  timestamp: string
  status: WorkflowStatus
}
```

- [ ] **Step 2: Write `web/src/lib/fixtures/communities.ts`**

```ts
import type { Community } from './types'

export const communities: Community[] = [
  {
    name: 'Nate Herk',
    href: 'https://www.nateherk.com/',
    avatar: 'https://assets.skool.com/f/fcb8f1ac74644b298f8268197d647ad4/e0e152d7d928434ba31cc71508f527540cb693055c6349fb957fb87218400612.jpg',
    type: 'creator',
  },
  {
    name: 'The AI Collective',
    href: 'https://www.aicollective.com/',
    avatar: 'https://pbs.twimg.com/profile_images/1996758647947620352/PTPrFCoA_400x400.jpg',
    type: 'community',
  },
  {
    name: 'Sabrina Ramonov',
    href: 'https://substack.com/@sabrinaramonov',
    avatar: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F81242e60-f559-4c97-a7f1-463711221580_1484x1640.png',
    type: 'creator',
  },
  {
    name: "Ben's Bites",
    href: 'https://www.bensbites.com/',
    avatar: 'https://pbs.twimg.com/profile_images/1619276533964611584/xzZLlgqI_400x400.jpg',
    type: 'community',
  },
  {
    name: 'Liam Ottley',
    href: 'https://www.liamottley.com/',
    avatar: 'https://assets.skool.com/f/27b812ec778f472c84f256638d6c47d6/3a034b65c58147fe82358b9de0cde621ce7ee1099f9c454082076d124e0a6b20',
    type: 'creator',
  },
  {
    name: 'Every.to',
    href: 'https://every.to/',
    avatar: 'https://media.licdn.com/dms/image/v2/D560BAQGyAJgmI647ew/company-logo_100_100/company-logo_100_100/0/1724875535217/everyinc_logo?e=2147483647&v=beta&t=C3reOrG5eQTpkttqV1HNoh-YgkPjPraWenfvcvd8LEE',
    type: 'community',
  },
  {
    name: 'Claude',
    href: 'https://claude.ai/',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvgh0KFUOOElGtYXHkvB6uaOyQuYcRgOpK7w&s',
    type: 'community',
  },
  {
    name: 'LiveKit',
    href: 'https://livekit.io/',
    avatar: 'https://livekit.com/images/livekit-apple-touch.png',
    type: 'community',
  },
]
```

- [ ] **Step 3: Write `web/src/lib/fixtures/products.ts`**

```ts
import type { PhProduct } from './types'

export const phProducts: PhProduct[] = [
  { name: 'Velo',                 category: 'Video Messaging',           votes: 617, comments: 143, score: 103, logo: 'https://ph-files.imgix.net/35242a30-6f23-4a79-aa44-0a1752c38f00.png' },
  { name: 'Chrome Vertical Tabs', category: 'Browser Enhancement',       votes: 368, comments: 19,  score: 61,  logo: 'https://ph-files.imgix.net/f27f20c5-816f-4210-bbfa-8bdf797ffa3b.jpeg' },
  { name: 'Flint',                category: 'Campaign Landing Pages',    votes: 345, comments: 27,  score: 58,  logo: 'https://ph-files.imgix.net/9c15287e-cffa-466c-80e8-85a03721354d.png' },
  { name: 'LookAway 2',           category: 'Eye Health for Mac',        votes: 265, comments: 23,  score: 44,  logo: 'https://ph-files.imgix.net/6662a41b-1fc4-4ef1-97de-682533b0020c.png' },
  { name: 'MindsDB Anton',        category: 'Autonomous BI Agent',       votes: 185, comments: 16,  score: 31,  logo: 'https://ph-files.imgix.net/4a8b9470-4b71-466c-a8dd-8e27ee706f17.gif' },
  { name: 'Browser Arena',        category: 'Cloud Browser Benchmarks',  votes: 174, comments: 29,  score: 29,  logo: 'https://ph-files.imgix.net/a5d945d7-db55-4fd6-a412-0b332c5cc687.png' },
  { name: 'Career-Ops on Claude', category: 'AI Job Search',             votes: 137, comments: 11,  score: 23,  logo: 'https://ph-files.imgix.net/0ec7ef46-3cb1-4694-bb9a-6b4a6c8450cb.png' },
  { name: 'Keeby',                category: 'Keyboard Sounds for Mac',   votes: 136, comments: 12,  score: 23,  logo: 'https://ph-files.imgix.net/fb80aea5-1784-4115-ba24-3ebb42e83db0.png' },
  { name: 'PassportReader',       category: 'Identity Verification API', votes: 113, comments: 10,  score: 19,  logo: 'https://ph-files.imgix.net/48e83c11-841f-40f6-975f-b20c548ed680.png' },
  { name: 'FeatDrop',             category: 'Public Product Changelog',  votes: 110, comments: 16,  score: 18,  logo: 'https://ph-files.imgix.net/3fa5cb0b-6684-485c-8935-5706d51c4ebb.png' },
]
```

- [ ] **Step 4: Write `web/src/lib/fixtures/founders.ts`**

```ts
import type { Founder } from './types'

export const founders: Founder[] = [
  {
    name: 'Ajay Kumar',
    role: 'Maker, Velo',
    quote: 'Video is the most human form of async communication. We\'re making it instant.',
    avatar: 'https://ph-avatars.imgix.net/5672627/e909456b-451a-4305-a963-a7bae3bba563.jpeg',
  },
  {
    name: 'Michelle Lim',
    role: 'Co-founder, Flint',
    quote: 'Every campaign deserves a landing page that actually converts — built in minutes, not days.',
    avatar: 'https://ph-avatars.imgix.net/3569751/original.jpeg',
  },
  {
    name: 'Jorge Torres',
    role: 'CEO, MindsDB',
    quote: 'Business intelligence shouldn\'t just tell you what happened — it should act on it.',
    avatar: 'https://ph-avatars.imgix.net/1630350/f356f703-e7f0-42fb-be4d-14712e6b2db6.png',
  },
  {
    name: 'Kushagra Agarwal',
    role: 'Maker, LookAway 2',
    quote: 'Your eyes deserve breaks. LookAway makes it effortless and completely native on Mac.',
    avatar: 'https://ph-avatars.imgix.net/245831/original.jpeg',
  },
  {
    name: 'Andrea Pinto',
    role: 'Founder, Nottelabs',
    quote: 'Browser infrastructure should be open and benchmarked — we\'re building that standard.',
    avatar: 'https://ph-avatars.imgix.net/6365170/e1d24e85-e471-467e-9b5c-7ab806e951de.jpeg',
  },
  {
    name: 'Allan Jiang',
    role: 'Maker, FeatDrop (YC W22)',
    quote: 'Builders deserve a simple, public place to share what they\'ve shipped.',
    avatar: 'https://ph-avatars.imgix.net/14905/f705e2c7-3fa4-41de-9ce9-e819a70658c6.jpeg',
  },
]
```

- [ ] **Step 5: Write `web/src/lib/fixtures/workflowLog.ts`**

```ts
import type { WorkflowLogItem } from './types'

export const workflowLog: WorkflowLogItem[] = [
  {
    id: '1',
    icon: 'search_check',
    label: 'Scanned PH top 10 — April 8',
    timestamp: '2 mins ago',
    status: 'done',
  },
  {
    id: '2',
    icon: 'edit_note',
    label: 'Drafted outreach for Ajay Kumar (Velo)',
    timestamp: '15 mins ago',
    status: 'done',
  },
  {
    id: '3',
    icon: 'pending_actions',
    label: 'Awaiting Approval: 8 Drafts',
    timestamp: '1 hour ago',
    status: 'pending',
  },
  {
    id: '4',
    icon: 'analytics',
    label: 'Analyzed landing page for Flint',
    timestamp: '2 hours ago',
    status: 'done',
  },
  {
    id: '5',
    icon: 'manage_search',
    label: 'Extracted founder data for MindsDB',
    timestamp: '3 hours ago',
    status: 'done',
  },
]
```

- [ ] **Step 6: Write a type-check test for fixtures**

Create `web/src/lib/fixtures/__tests__/fixtures.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { communities } from '../communities'
import { phProducts } from '../products'
import { founders } from '../founders'
import { workflowLog } from '../workflowLog'

describe('fixtures', () => {
  it('communities has 8 entries', () => {
    expect(communities).toHaveLength(8)
  })

  it('every community has required fields', () => {
    communities.forEach(c => {
      expect(c.name).toBeTruthy()
      expect(c.href).toBeTruthy()
      expect(c.avatar).toBeTruthy()
      expect(['creator', 'community']).toContain(c.type)
    })
  })

  it('phProducts has 10 entries', () => {
    expect(phProducts).toHaveLength(10)
  })

  it('founders has 6 entries', () => {
    expect(founders).toHaveLength(6)
  })

  it('workflowLog has 5 entries', () => {
    expect(workflowLog).toHaveLength(5)
  })

  it('one workflowLog item is pending', () => {
    const pending = workflowLog.filter(w => w.status === 'pending')
    expect(pending).toHaveLength(1)
  })
})
```

- [ ] **Step 7: Run the test — expect PASS**

```bash
npm run test:run
```

Expected: 6 tests pass.

- [ ] **Step 8: Commit**

```bash
git add web/src/lib/ 
git commit -m "feat: add typed fixtures for communities, products, founders, workflow log"
```

---

## Task 5: SideNav component

**Files:**
- Create: `web/src/components/layout/SideNav.tsx`
- Create: `web/src/components/layout/__tests__/SideNav.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `web/src/components/layout/__tests__/SideNav.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SideNav from '../SideNav'

describe('SideNav', () => {
  it('renders the home nav link', () => {
    render(<SideNav />)
    expect(screen.getByTitle('Home')).toBeInTheDocument()
  })

  it('renders community avatars', () => {
    render(<SideNav />)
    expect(screen.getByTitle('Nate Herk')).toBeInTheDocument()
    expect(screen.getByTitle('LiveKit')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test — expect FAIL**

```bash
npm run test:run -- src/components/layout/__tests__/SideNav.test.tsx
```

Expected: FAIL — `Cannot find module '../SideNav'`

- [ ] **Step 3: Write `web/src/components/layout/SideNav.tsx`**

```tsx
'use client'

import Link from 'next/link'
import { communities } from '@/lib/fixtures/communities'

export default function SideNav() {
  return (
    <aside
      className="fixed left-0 top-0 h-full flex flex-col items-center py-6 px-4 z-50 w-20"
      style={{
        background: 'rgba(255,255,255,0.45)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        borderRight: '1px solid rgba(255,237,213,0.6)',
        boxShadow: '0 8px 32px -4px rgba(74,37,6,0.12), 0 2px 8px -2px rgba(74,37,6,0.06)',
      }}
    >
      {/* Main nav icons */}
      <div className="space-y-3 flex flex-col items-center w-full shrink-0">
        <Link
          href="/apex"
          title="Home"
          className="flex items-center justify-center w-12 h-12 bg-primary/10 shadow-sm rounded-2xl text-primary transition-all duration-300 border border-primary/20"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}
          >
            home
          </span>
        </Link>
        <Link
          href="#"
          title="Explore"
          className="flex items-center justify-center w-12 h-12 text-stone-400 hover:text-primary hover:bg-orange-50 rounded-2xl transition-all duration-300"
        >
          <span className="material-symbols-outlined">explore</span>
        </Link>
        <Link
          href="#"
          title="Calendar"
          className="flex items-center justify-center w-12 h-12 text-stone-400 hover:text-primary hover:bg-orange-50 rounded-2xl transition-all duration-300"
        >
          <span className="material-symbols-outlined">calendar_today</span>
        </Link>
      </div>

      {/* Divider */}
      <div className="my-3 w-8 h-px bg-orange-200/60 shrink-0" />

      {/* Community avatars */}
      <div
        className="flex-1 overflow-y-auto w-full flex flex-col items-center space-y-2.5 pb-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {communities.map((community) => (
          <a
            key={community.name}
            href={community.href}
            target="_blank"
            rel="noopener noreferrer"
            title={community.name}
            className={`flex items-center justify-center w-11 h-11 overflow-hidden shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 ${
              community.type === 'creator'
                ? 'rounded-full ring-2 ring-white/60'
                : 'rounded-2xl'
            }`}
          >
            <img
              src={community.avatar}
              alt={community.name}
              className="w-full h-full object-cover"
            />
          </a>
        ))}
      </div>
    </aside>
  )
}
```

- [ ] **Step 4: Run the test — expect PASS**

```bash
npm run test:run -- src/components/layout/__tests__/SideNav.test.tsx
```

Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/layout/SideNav.tsx web/src/components/layout/__tests__/SideNav.test.tsx
git commit -m "feat: add SideNav component with community avatars"
```

---

## Task 6: TopNav component

**Files:**
- Create: `web/src/components/layout/TopNav.tsx`
- Create: `web/src/components/layout/__tests__/TopNav.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `web/src/components/layout/__tests__/TopNav.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TopNav from '../TopNav'

describe('TopNav', () => {
  it('renders the BuildParty wordmark', () => {
    render(<TopNav />)
    expect(screen.getByText('BuildParty')).toBeInTheDocument()
  })

  it('renders the search input', () => {
    render(<TopNav />)
    expect(screen.getByPlaceholderText('Search insights, founders, or drafts…')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test — expect FAIL**

```bash
npm run test:run -- src/components/layout/__tests__/TopNav.test.tsx
```

Expected: FAIL — `Cannot find module '../TopNav'`

- [ ] **Step 3: Write `web/src/components/layout/TopNav.tsx`**

```tsx
'use client'

export default function TopNav() {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-5rem)] flex justify-between items-center px-12 z-40 bg-white/30 backdrop-blur-2xl h-20 border-b border-white/40">
      <div className="flex items-center gap-10 flex-1">
        {/* Wordmark */}
        <div className="flex flex-col shrink-0">
          <span className="text-xl font-black text-stone-700 block leading-tight tracking-tight font-jakarta">
            BuildParty
          </span>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-md premium-glass rounded-full px-4 border-white/60 flex items-center h-10">
          <span className="material-symbols-outlined text-stone-500 shrink-0 mr-2 text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search insights, founders, or drafts…"
            className="w-full bg-transparent border-none py-1.5 pl-0 pr-2 text-sm focus:ring-0 text-on-background placeholder-stone-400 font-medium outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button className="p-2.5 text-stone-500 hover:bg-white/70 rounded-full transition-all cursor-pointer relative border border-transparent hover:border-white/60 hover:shadow-sm">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-white/80" />
          </button>

          {/* Filters */}
          <button className="p-2.5 text-stone-500 hover:bg-white/70 rounded-full transition-all cursor-pointer border border-transparent hover:border-white/60 hover:shadow-sm">
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=ff7a2f&color=fff&bold=true"
            alt="Admin User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 4: Run the test — expect PASS**

```bash
npm run test:run -- src/components/layout/__tests__/TopNav.test.tsx
```

Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/layout/TopNav.tsx web/src/components/layout/__tests__/TopNav.test.tsx
git commit -m "feat: add TopNav component with search and notifications"
```

---

## Task 7: AppShell component

**Files:**
- Create: `web/src/components/layout/AppShell.tsx`
- Create: `web/src/components/layout/__tests__/AppShell.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `web/src/components/layout/__tests__/AppShell.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AppShell from '../AppShell'

describe('AppShell', () => {
  it('renders children inside the main content area', () => {
    render(
      <AppShell>
        <div data-testid="child-content">Hello</div>
      </AppShell>
    )
    expect(screen.getByTestId('child-content')).toBeInTheDocument()
  })

  it('renders the BuildParty wordmark from TopNav', () => {
    render(<AppShell><div /></AppShell>)
    expect(screen.getByText('BuildParty')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test — expect FAIL**

```bash
npm run test:run -- src/components/layout/__tests__/AppShell.test.tsx
```

Expected: FAIL — `Cannot find module '../AppShell'`

- [ ] **Step 3: Write `web/src/components/layout/AppShell.tsx`**

```tsx
import SideNav from './SideNav'
import TopNav from './TopNav'

interface AppShellProps {
  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <>
      <SideNav />
      <TopNav />
      <main className="ml-20 pt-24 p-12">
        <div className="max-w-[1400px] mx-auto space-y-10">
          {children}
        </div>
      </main>
    </>
  )
}
```

- [ ] **Step 4: Run the test — expect PASS**

```bash
npm run test:run -- src/components/layout/__tests__/AppShell.test.tsx
```

Expected: 2 tests pass.

- [ ] **Step 5: Update `web/src/app/layout.tsx` to use AppShell**

Replace the `<body>` content:

```tsx
import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import AppShell from '@/components/layout/AppShell'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BuildParty',
  description: 'The live platform for AI builder communities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={`${inter.variable} ${plusJakartaSans.variable} min-h-screen`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add web/src/components/layout/AppShell.tsx web/src/components/layout/__tests__/AppShell.test.tsx web/src/app/layout.tsx
git commit -m "feat: add AppShell layout wrapper, wire into root layout"
```

---

## Task 8: HeroCard component

**Files:**
- Create: `web/src/components/apex/HeroCard.tsx`
- Create: `web/src/components/apex/__tests__/HeroCard.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `web/src/components/apex/__tests__/HeroCard.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HeroCard from '../HeroCard'

describe('HeroCard', () => {
  it('renders the outreach count headline', () => {
    render(<HeroCard draftCount={10} />)
    expect(screen.getByText(/10 new/)).toBeInTheDocument()
  })

  it('renders the Review Drafts button', () => {
    render(<HeroCard draftCount={10} />)
    expect(screen.getByRole('button', { name: /Review Drafts/i })).toBeInTheDocument()
  })

  it('renders the scan count', () => {
    render(<HeroCard draftCount={10} />)
    expect(screen.getByText(/420\+/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test — expect FAIL**

```bash
npm run test:run -- src/components/apex/__tests__/HeroCard.test.tsx
```

Expected: FAIL — `Cannot find module '../HeroCard'`

- [ ] **Step 3: Write `web/src/components/apex/HeroCard.tsx`**

```tsx
interface HeroCardProps {
  draftCount: number
}

export default function HeroCard({ draftCount }: HeroCardProps) {
  return (
    <section className="fade-up relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-container via-primary-container to-primary p-12 text-on-primary-container shadow-2xl border-t border-l border-orange-100/40 flex items-center justify-between">
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_25%)] pointer-events-none" />

      <div className="relative z-10 space-y-6 max-w-2xl">
        <h1 className="text-5xl font-black font-jakarta tracking-tight leading-tight drop-shadow-sm text-white">
          Apex has drafted{' '}
          <span className="text-on-primary-container/90">{draftCount} new</span>{' '}
          outreaches.
        </h1>
        <div className="flex items-center gap-4 flex-wrap">
          <button className="bg-white/95 text-primary font-extrabold px-8 py-3.5 rounded-full text-base shadow-xl hover:bg-white active:scale-95 transition-all border border-white font-jakarta">
            Review Drafts
          </button>
          <p className="text-white font-semibold bg-black/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 text-sm">
            Scanned 420+ products in last 24h
          </p>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-8 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-20 drop-shadow-2xl pointer-events-none select-none">
        <span
          className="material-symbols-outlined text-[200px] text-white"
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}
        >
          auto_awesome
        </span>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run the test — expect PASS**

```bash
npm run test:run -- src/components/apex/__tests__/HeroCard.test.tsx
```

Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/apex/HeroCard.tsx web/src/components/apex/__tests__/HeroCard.test.tsx
git commit -m "feat: add HeroCard component"
```

---

## Task 9: PhTable component

**Files:**
- Create: `web/src/components/apex/PhProductRow.tsx`
- Create: `web/src/components/apex/PhTable.tsx`
- Create: `web/src/components/apex/__tests__/PhTable.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `web/src/components/apex/__tests__/PhTable.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PhTable from '../PhTable'
import { phProducts } from '@/lib/fixtures/products'

describe('PhTable', () => {
  it('renders the section heading', () => {
    render(<PhTable products={phProducts} />)
    expect(screen.getByText('ProductHunt Top 10')).toBeInTheDocument()
  })

  it('renders a row for each product', () => {
    render(<PhTable products={phProducts} />)
    expect(screen.getByText('Velo')).toBeInTheDocument()
    expect(screen.getByText('FeatDrop')).toBeInTheDocument()
  })

  it('renders vote counts', () => {
    render(<PhTable products={phProducts} />)
    expect(screen.getByText('617')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test — expect FAIL**

```bash
npm run test:run -- src/components/apex/__tests__/PhTable.test.tsx
```

Expected: FAIL — `Cannot find module '../PhTable'`

- [ ] **Step 3: Write `web/src/components/apex/PhProductRow.tsx`**

```tsx
import type { PhProduct } from '@/lib/fixtures/types'

interface PhProductRowProps {
  product: PhProduct
  rank: number
}

export default function PhProductRow({ product, rank }: PhProductRowProps) {
  return (
    <div className="grid grid-cols-12 items-center p-3 rounded-2xl bg-white/30 hover:bg-white/55 transition-all group cursor-pointer border border-orange-100/30 shadow-sm relative overflow-hidden">
      {/* Rank */}
      <div className="col-span-1 flex items-center justify-center">
        <span className="text-[11px] font-black text-stone-400">{rank}</span>
      </div>

      {/* Product info */}
      <div className="col-span-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-md overflow-hidden shadow-md shrink-0 bg-white border border-stone-100">
          <img src={product.logo} alt={`${product.name} logo`} className="w-full h-full object-cover" />
        </div>
        <div className="truncate flex-1 min-w-0">
          <h3 className="font-extrabold text-sm text-on-background group-hover:text-primary transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="text-[10px] text-stone-500 font-bold truncate leading-tight">{product.category}</p>
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white text-primary text-[10px] font-extrabold px-3 py-1.5 rounded-xl shadow-sm hover:shadow-md hover:bg-orange-50/50 active:scale-95 whitespace-nowrap shrink-0 border border-orange-50/80 font-jakarta">
          Preview Outreach
        </button>
      </div>

      {/* Stats */}
      <div className="col-span-6 grid grid-cols-3">
        <div className="text-center">
          <span className="text-sm font-black text-on-background">{product.votes.toLocaleString()}</span>
        </div>
        <div className="text-center">
          <span className="text-sm font-black text-on-background">{product.comments}</span>
        </div>
        <div className="text-center">
          <span className="text-sm font-black text-primary">{product.score}</span>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Write `web/src/components/apex/PhTable.tsx`**

```tsx
import type { PhProduct } from '@/lib/fixtures/types'
import PhProductRow from './PhProductRow'

interface PhTableProps {
  products: PhProduct[]
}

export default function PhTable({ products }: PhTableProps) {
  return (
    <div className="premium-glass rounded-xl p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black font-jakarta text-on-background">ProductHunt Top 10</h2>
          <p className="text-xs text-stone-500 font-semibold mt-0.5">Updated · Today</p>
        </div>
        <button className="glass-button px-4 py-2 rounded-full text-xs font-bold text-primary flex items-center gap-1.5 border-white/50">
          <span className="material-symbols-outlined text-sm">refresh</span> Refresh
        </button>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-12 px-4 mb-3 text-[10px] uppercase font-extrabold text-stone-400 tracking-widest items-center">
        <div className="col-span-6">Product</div>
        <div className="col-span-6 grid grid-cols-3 text-center">
          <div className="flex flex-col items-center gap-0.5">
            <span className="material-symbols-outlined text-primary text-base">arrow_upward</span>
            <span>Votes</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="material-symbols-outlined text-primary text-base">mode_comment</span>
            <span>Cmts</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="material-symbols-outlined text-primary text-base">bolt</span>
            <span>Score</span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {products.map((product, index) => (
          <PhProductRow key={product.name} product={product} rank={index + 1} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Run the test — expect PASS**

```bash
npm run test:run -- src/components/apex/__tests__/PhTable.test.tsx
```

Expected: 3 tests pass.

- [ ] **Step 6: Commit**

```bash
git add web/src/components/apex/PhProductRow.tsx web/src/components/apex/PhTable.tsx web/src/components/apex/__tests__/PhTable.test.tsx
git commit -m "feat: add PhProductRow and PhTable components"
```

---

## Task 10: FounderCard + FounderGrid

**Files:**
- Create: `web/src/components/apex/FounderCard.tsx`
- Create: `web/src/components/apex/FounderGrid.tsx`
- Create: `web/src/components/apex/__tests__/FounderGrid.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `web/src/components/apex/__tests__/FounderGrid.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FounderGrid from '../FounderGrid'
import { founders } from '@/lib/fixtures/founders'

describe('FounderGrid', () => {
  it('renders a card for each founder', () => {
    render(<FounderGrid founders={founders} />)
    expect(screen.getByText('Ajay Kumar')).toBeInTheDocument()
    expect(screen.getByText('Allan Jiang')).toBeInTheDocument()
  })

  it('renders outreach draft buttons', () => {
    render(<FounderGrid founders={founders} />)
    const buttons = screen.getAllByRole('button', { name: /Outreach Draft/i })
    expect(buttons).toHaveLength(founders.length)
  })
})
```

- [ ] **Step 2: Run the test — expect FAIL**

```bash
npm run test:run -- src/components/apex/__tests__/FounderGrid.test.tsx
```

Expected: FAIL — `Cannot find module '../FounderGrid'`

- [ ] **Step 3: Write `web/src/components/apex/FounderCard.tsx`**

```tsx
import type { Founder } from '@/lib/fixtures/types'

interface FounderCardProps {
  founder: Founder
}

export default function FounderCard({ founder }: FounderCardProps) {
  return (
    <div className="premium-glass p-6 rounded-xl">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-14 h-14 rounded-full shadow-xl ring-4 ring-orange-100/40 shrink-0 border-2 border-white overflow-hidden">
          <img src={founder.avatar} alt={founder.name} className="w-full h-full object-cover" />
        </div>
        <div className="pt-1">
          <h4 className="font-extrabold text-base text-on-background leading-tight">{founder.name}</h4>
          <span className="text-primary text-[11px] font-extrabold font-jakarta bg-primary-container/25 px-2 py-0.5 rounded-full inline-block mt-1">
            {founder.role}
          </span>
        </div>
      </div>

      <p className="text-xs text-on-surface font-medium mb-5 leading-relaxed italic text-stone-600">
        "{founder.quote}"
      </p>

      <div className="flex gap-2.5">
        <button className="flex-1 bg-white py-2 rounded-xl flex items-center justify-center gap-1.5 text-[10px] font-extrabold text-primary shadow-sm hover:shadow-md transition-all active:scale-95 border border-orange-50/80 hover:bg-orange-50/50">
          <span className="material-symbols-outlined text-xs">mail</span> Outreach Draft
        </button>
        <button className="flex-1 bg-white py-2 rounded-xl flex items-center justify-center gap-1.5 text-[10px] font-extrabold text-primary shadow-sm hover:shadow-md transition-all active:scale-95 border border-orange-50/80 hover:bg-orange-50/50">
          <span className="material-symbols-outlined text-xs">open_in_new</span> Preview
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Write `web/src/components/apex/FounderGrid.tsx`**

```tsx
import type { Founder } from '@/lib/fixtures/types'
import FounderCard from './FounderCard'

interface FounderGridProps {
  founders: Founder[]
}

export default function FounderGrid({ founders }: FounderGridProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-5">
        {founders.map((founder) => (
          <FounderCard key={founder.name} founder={founder} />
        ))}
      </div>
      <div className="flex justify-center pt-2">
        <button className="bg-gradient-to-br from-primary-container via-primary-container to-primary hover:brightness-105 active:scale-95 transition-all px-10 py-3.5 rounded-full text-sm font-extrabold text-white flex items-center gap-3 shadow-lg shadow-primary/30 font-jakarta">
          View all founders
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Run the test — expect PASS**

```bash
npm run test:run -- src/components/apex/__tests__/FounderGrid.test.tsx
```

Expected: 2 tests pass.

- [ ] **Step 6: Commit**

```bash
git add web/src/components/apex/FounderCard.tsx web/src/components/apex/FounderGrid.tsx web/src/components/apex/__tests__/FounderGrid.test.tsx
git commit -m "feat: add FounderCard and FounderGrid components"
```

---

## Task 11: LiveStatsPanel component

**Files:**
- Create: `web/src/components/apex/LiveStatsPanel.tsx`
- Create: `web/src/components/apex/__tests__/LiveStatsPanel.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `web/src/components/apex/__tests__/LiveStatsPanel.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LiveStatsPanel from '../LiveStatsPanel'

describe('LiveStatsPanel', () => {
  it('renders the Live Stats heading', () => {
    render(<LiveStatsPanel />)
    expect(screen.getByText('Live Stats')).toBeInTheDocument()
  })

  it('renders the upvote velocity stat', () => {
    render(<LiveStatsPanel />)
    expect(screen.getByText(/\+31 upvotes per hour/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test — expect FAIL**

```bash
npm run test:run -- src/components/apex/__tests__/LiveStatsPanel.test.tsx
```

Expected: FAIL — `Cannot find module '../LiveStatsPanel'`

- [ ] **Step 3: Write `web/src/components/apex/LiveStatsPanel.tsx`**

```tsx
const statGrid = [
  { label: 'Most Upvotes',    value: '617' },
  { label: 'Upvote Speed',   value: '31 upvotes per hour' },
  { label: 'Total Upvotes',  value: '2,450' },
  { label: 'Most Comments',  value: '143' },
  { label: 'Total Comments', value: '306' },
  { label: '#1 Today',       value: 'Velo' },
  { label: 'Products Today', value: '10' },
  { label: 'Avg Score',      value: '43' },
]

export default function LiveStatsPanel() {
  return (
    <div className="premium-glass rounded-xl p-7">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black font-jakarta text-on-background">Live Stats</h2>
      </div>

      {/* Velocity hero */}
      <div className="p-5 rounded-2xl bg-white/30 border border-orange-100/30 shadow-inner relative overflow-hidden group mb-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,237,213,0.2),transparent_40%)] pointer-events-none" />
        <div className="relative z-10">
          <span className="text-[10px] font-extrabold text-stone-500 uppercase tracking-widest block mb-1">
            Upvote Velocity
          </span>
          <span className="text-4xl font-black font-jakarta text-primary">+31 upvotes per hour</span>
          <p className="text-[10px] text-stone-500 font-medium mt-1">#1 Velo · 617 upvotes today</p>
          <div className="mt-3 h-1.5 w-full bg-white/60 rounded-full overflow-hidden border border-white/60">
            <div className="h-full bg-gradient-to-r from-primary-container to-primary w-2/3 rounded-full shadow-[0_0_10px_rgba(156,63,0,0.35)]" />
          </div>
        </div>
        <span
          className="material-symbols-outlined absolute -right-3 -bottom-3 text-primary/10 text-8xl transition-transform duration-500 group-hover:scale-110 select-none"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          trending_up
        </span>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 gap-3">
        {statGrid.map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-2xl bg-white/60 shadow-sm border border-orange-100/20 hover:bg-white/80 transition-all"
          >
            <span className="block text-[9px] uppercase font-extrabold text-stone-400 tracking-widest mb-1.5">
              {stat.label}
            </span>
            <span className="text-xl font-black text-on-background font-jakarta truncate block">
              {stat.value}
            </span>
          </div>
        ))}
        <div className="col-span-2 p-4 rounded-2xl bg-white/60 shadow-sm border border-orange-100/20 hover:bg-white/80 transition-all">
          <span className="block text-[9px] uppercase font-extrabold text-stone-400 tracking-widest mb-1.5">
            Most Popular Topic
          </span>
          <span className="text-lg font-black text-on-background font-jakarta">
            Productivity &amp; AI Tools
          </span>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run the test — expect PASS**

```bash
npm run test:run -- src/components/apex/__tests__/LiveStatsPanel.test.tsx
```

Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/apex/LiveStatsPanel.tsx web/src/components/apex/__tests__/LiveStatsPanel.test.tsx
git commit -m "feat: add LiveStatsPanel component"
```

---

## Task 12: AgentWorkflowLog component

**Files:**
- Create: `web/src/components/apex/AgentWorkflowLog.tsx`
- Create: `web/src/components/apex/__tests__/AgentWorkflowLog.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `web/src/components/apex/__tests__/AgentWorkflowLog.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AgentWorkflowLog from '../AgentWorkflowLog'
import { workflowLog } from '@/lib/fixtures/workflowLog'

describe('AgentWorkflowLog', () => {
  it('renders the Agent Workflow heading', () => {
    render(<AgentWorkflowLog items={workflowLog} />)
    expect(screen.getByText('Agent Workflow')).toBeInTheDocument()
  })

  it('renders the pending item with highlighted style', () => {
    render(<AgentWorkflowLog items={workflowLog} />)
    expect(screen.getByText('Awaiting Approval: 8 Drafts')).toBeInTheDocument()
  })

  it('renders all log items', () => {
    render(<AgentWorkflowLog items={workflowLog} />)
    expect(screen.getByText(/Scanned PH top 10/)).toBeInTheDocument()
    expect(screen.getByText(/Extracted founder data/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test — expect FAIL**

```bash
npm run test:run -- src/components/apex/__tests__/AgentWorkflowLog.test.tsx
```

Expected: FAIL — `Cannot find module '../AgentWorkflowLog'`

- [ ] **Step 3: Write `web/src/components/apex/AgentWorkflowLog.tsx`**

```tsx
import type { WorkflowLogItem } from '@/lib/fixtures/types'

interface AgentWorkflowLogProps {
  items: WorkflowLogItem[]
}

export default function AgentWorkflowLog({ items }: AgentWorkflowLogProps) {
  return (
    <div className="premium-glass rounded-xl p-7 fade-up fade-up-3">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black font-jakarta text-on-background">Agent Workflow</h2>
        <button className="p-1.5 text-stone-400 hover:text-primary hover:bg-white/60 rounded-lg transition-all">
          <span className="material-symbols-outlined text-xl">settings</span>
        </button>
      </div>

      <div className="space-y-2.5">
        {items.map((item) =>
          item.status === 'pending' ? (
            <div
              key={item.id}
              className="flex gap-3 items-start p-3.5 rounded-2xl bg-primary/5 border border-primary/25 hover:bg-primary/10 transition-all cursor-default group"
            >
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-md shadow-primary/25">
                <span className="material-symbols-outlined text-white text-lg">{item.icon}</span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm font-extrabold text-primary truncate">{item.label}</p>
                <p className="text-[10px] font-bold text-primary/60 mt-0.5">{item.timestamp}</p>
              </div>
              <span className="material-symbols-outlined text-xs text-primary/50 mt-1 shrink-0">
                arrow_forward_ios
              </span>
            </div>
          ) : (
            <div
              key={item.id}
              className="flex gap-3 items-start p-3.5 rounded-2xl bg-white/20 border border-white/40 hover:bg-white/40 transition-all cursor-default group"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <span className="material-symbols-outlined text-primary text-lg">{item.icon}</span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm font-bold text-on-background truncate">{item.label}</p>
                <p className="text-[10px] font-semibold text-stone-400 mt-0.5">{item.timestamp}</p>
              </div>
              <span className="material-symbols-outlined text-xs text-stone-300 mt-1 shrink-0 group-hover:text-stone-400 transition-colors">
                check_circle
              </span>
            </div>
          )
        )}
      </div>

      <button className="mt-4 w-full bg-transparent hover:bg-primary/8 active:scale-95 transition-all py-2.5 rounded-full text-sm font-extrabold text-primary flex items-center justify-center gap-3 font-jakarta">
        View full log
        <span className="material-symbols-outlined text-xl">arrow_forward</span>
      </button>
    </div>
  )
}
```

- [ ] **Step 4: Run the test — expect PASS**

```bash
npm run test:run -- src/components/apex/__tests__/AgentWorkflowLog.test.tsx
```

Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/apex/AgentWorkflowLog.tsx web/src/components/apex/__tests__/AgentWorkflowLog.test.tsx
git commit -m "feat: add AgentWorkflowLog component"
```

---

## Task 13: Apex Dashboard page

**Files:**
- Create: `web/src/app/apex/page.tsx`
- Create: `web/src/app/apex/__tests__/page.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `web/src/app/apex/__tests__/page.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ApexPage from '../page'

describe('ApexPage', () => {
  it('renders the hero headline', () => {
    render(<ApexPage />)
    expect(screen.getByText(/Apex has drafted/)).toBeInTheDocument()
  })

  it('renders the PH Top 10 section', () => {
    render(<ApexPage />)
    expect(screen.getByText('ProductHunt Top 10')).toBeInTheDocument()
  })

  it('renders the Live Stats panel', () => {
    render(<ApexPage />)
    expect(screen.getByText('Live Stats')).toBeInTheDocument()
  })

  it('renders the Agent Workflow log', () => {
    render(<ApexPage />)
    expect(screen.getByText('Agent Workflow')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test — expect FAIL**

```bash
npm run test:run -- src/app/apex/__tests__/page.test.tsx
```

Expected: FAIL — `Cannot find module '../page'`

- [ ] **Step 3: Write `web/src/app/apex/page.tsx`**

```tsx
'use client'

import HeroCard from '@/components/apex/HeroCard'
import PhTable from '@/components/apex/PhTable'
import FounderGrid from '@/components/apex/FounderGrid'
import LiveStatsPanel from '@/components/apex/LiveStatsPanel'
import AgentWorkflowLog from '@/components/apex/AgentWorkflowLog'
import { phProducts } from '@/lib/fixtures/products'
import { founders } from '@/lib/fixtures/founders'
import { workflowLog } from '@/lib/fixtures/workflowLog'

export default function ApexPage() {
  return (
    <>
      <HeroCard draftCount={10} />

      <div className="grid grid-cols-12 gap-8">
        {/* Left: PH Scouting + Founders */}
        <div className="col-span-8 space-y-10 fade-up fade-up-1">
          <PhTable products={phProducts} />
          <FounderGrid founders={founders} />
        </div>

        {/* Right: Stats + Log */}
        <div className="col-span-4 space-y-8 fade-up fade-up-2">
          <LiveStatsPanel />
          <AgentWorkflowLog items={workflowLog} />
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Run the test — expect PASS**

```bash
npm run test:run -- src/app/apex/__tests__/page.test.tsx
```

Expected: 4 tests pass.

- [ ] **Step 5: Run the full test suite**

```bash
npm run test:run
```

Expected: all tests pass across all files.

- [ ] **Step 6: Start the dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:3000` — should redirect to `/apex` and display the full Apex Dashboard matching `apex-dashboard.html`.

- [ ] **Step 7: Commit**

```bash
git add web/src/app/apex/
git commit -m "feat: add Apex Dashboard page — first screen complete"
```

---

## Task 14: Deploy to Vercel

- [ ] **Step 1: Push to GitHub**

If no GitHub repo exists yet, create one at github.com/new, then:

```bash
git remote add origin https://github.com/<your-username>/buildparty.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Connect to Vercel**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Set **Root Directory** to `web` (since Next.js lives in `web/`, not the repo root)
4. Framework: Next.js (auto-detected)
5. Click **Deploy**

- [ ] **Step 3: Verify the deployment**

After deploy completes, open the Vercel URL — should show the Apex Dashboard at `/`.

- [ ] **Step 4: Add Vercel URL to project notes**

```bash
# From repo root:
echo "VERCEL_URL=https://your-app.vercel.app" >> .env.local
git add .env.local
git commit -m "chore: record Vercel deployment URL"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Next.js 15 + TypeScript + Tailwind v3 — Task 1
- ✅ Design system tokens — Task 2
- ✅ globals.css (premium-glass, glass-button, animations, body) — Task 3
- ✅ Plus Jakarta Sans + Inter fonts via next/font — Task 3
- ✅ Material Symbols via CDN link — Task 3
- ✅ Typed fixtures (communities, products, founders, workflow) — Task 4
- ✅ SideNav with community avatars — Task 5
- ✅ TopNav with search, notifications, avatar — Task 6
- ✅ AppShell wrapper — Task 7
- ✅ Root layout wired to AppShell — Task 7
- ✅ / redirects to /apex — Task 3
- ✅ HeroCard hero section — Task 8
- ✅ PhTable (PhProductRow + PhTable) — Task 9
- ✅ FounderCard + FounderGrid — Task 10
- ✅ LiveStatsPanel — Task 11
- ✅ AgentWorkflowLog — Task 12
- ✅ Apex Dashboard page assembling all components — Task 13
- ✅ Vercel deploy — Task 14
- ✅ Flexible routing — one file per screen, no restructuring needed for new screens

**Placeholder scan:** No TBDs, no incomplete steps found.

**Type consistency:** `PhProduct`, `Founder`, `Community`, `WorkflowLogItem` defined in `types.ts` Task 4 and used consistently in all component props throughout Tasks 5–13.
