# BuildParty Web App — Design Spec
**Date:** 2026-04-09
**Product:** BuildParty investor demo + product foundation
**Approach:** Demo-first, faked data where needed, real camera/video for live session

---

## Goal

Build the BuildParty web app as an investor demo that walks through the Apex PH Activation Flow end-to-end. The product is the live platform for AI builder communities (Owner → Community → Program → Session model). The demo showcases Apex (the launch agent) scanning Product Hunt, enriching founder profiles, drafting outreach, and guiding founders into a live BuildParty session.

The app is screen-by-screen, built one screen at a time. No rigid screen inventory upfront — new routes are added on demand as specs are provided.

---

## Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 15 (App Router) | File-based routing, seamless Vercel deploy, great LiveKit support |
| Language | TypeScript | Type safety for fixtures and components |
| Styling | Tailwind CSS v4 | Existing design system already in Tailwind |
| Icons | Material Symbols Outlined | Already used in existing design |
| Fonts | Plus Jakarta Sans + Inter | Defined in DESIGN.md |
| Video/Audio | LiveKit React SDK (`@livekit/components-react`) | Real camera/video for live session screen |
| Deployment | Vercel | One-click, native Next.js support |
| Data | Typed TypeScript fixtures in `lib/fixtures/` | No backend needed for demo |

---

## Design System

Sourced from `DESIGN.md` and `apex-dashboard.html`.

### Colors (light mode only)

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#FF6B00` | Key actions, branding |
| Secondary | `#bd6001` | Secondary elements, accents |
| Tertiary | `#e5a102` | Highlights, decorative details |
| Neutral | `#9f6c47` | Backgrounds, non-chromatic elements |
| Background | `#fffaf7` | Page background |
| On-background | `#4a2506` | Body text |

Full extended token set (all `primary-fixed`, `surface-container-*`, `on-*` variants) is ported directly from the Tailwind config in `apex-dashboard.html`.

### Typography

| Role | Font | Usage |
|------|------|-------|
| Headlines | Plus Jakarta Sans | `h1`–`h3`, titles, `.font-jakarta` |
| Body | Inter | All body copy |
| Labels | Inter | Form labels, interactive elements |

### Shape

Maximum pill-shaped roundedness — `rounded-full` for buttons and avatars, `rounded-2xl` / `rounded-xl` for cards and containers.

### Glassmorphism

Two reusable glass patterns extracted from `apex-dashboard.html`:

- `.premium-glass` — heavy blur (40px), warm border, radial gradient overlays. Used for cards and panels.
- `.glass-button` — lighter blur (12px), hover lift effect. Used for secondary actions.

### Spacing

Normal spacing. Comfortable padding on cards (`p-6` / `p-8`). Generous gap between sections (`space-y-10`).

### Animation

`fadeUp` keyframe animation with staggered delays (`.fade-up`, `.fade-up-1` through `.fade-up-4`). Used on page load for card entrance.

---

## Architecture

### Folder Structure

```
src/
  app/
    layout.tsx              → Root layout: fonts, globals, AppShell wrapper
    page.tsx                → Redirect to /apex
    apex/
      page.tsx              → Apex Dashboard (first screen)
    [future routes added on demand]
  components/
    layout/
      AppShell.tsx          → Side nav + top nav shared across all screens
      SideNav.tsx           → Icon nav with community avatars
      TopNav.tsx            → Search bar, notifications, user avatar
    ui/                     → Reusable primitives (Button, Card, Modal, Badge, etc.)
    apex/                   → Apex-specific components
    session/                → LiveKit session components (added when live screen is built)
  lib/
    fixtures/               → Typed mock data (founders, sessions, outreach drafts, etc.)
    livekit.ts              → LiveKit token generation + config helpers
  styles/
    globals.css             → premium-glass, glass-button, scrollbar, fadeUp, body base
```

### Routing Philosophy

Flexible and additive. Each new screen is a new file in `app/`. No screen inventory is locked in advance. Routes are added one at a time as specs are provided. Every page wraps in `AppShell` and uses the shared design system.

### Faked Data Strategy

All non-live data lives in `lib/fixtures/` as typed TypeScript objects:
- Founder profiles (name, product, PH rank, avatar, outreach status)
- Outreach drafts (subject, body, channel, status)
- Session data (title, community, time, attendees)
- Discovery page sessions

Components import fixtures directly. No API calls, no loading states needed for demo screens.

### LiveKit Integration

The live session screen is the only piece with real infrastructure. Setup:
1. LiveKit Cloud account (free tier sufficient for demo)
2. Token generated server-side via Next.js Route Handler (`app/api/livekit/route.ts`)
3. `@livekit/components-react` handles camera/video UI in the session page
4. Interactive micro-experiences layer sits on top of the LiveKit stage as absolute-positioned React components

---

## First Screen: Apex Dashboard (`/apex`)

The existing `apex-dashboard.html` is converted 1:1 to React. No visual changes — pixel-perfect migration. This gives a working, deployable app immediately and validates the design system extraction.

Conversion steps:
1. Extract design system → `tailwind.config.ts` + `globals.css`
2. Build `AppShell` with `SideNav` and `TopNav`
3. Port dashboard content sections as React components
4. Faked data (founders list, outreach count, stats) from `lib/fixtures/founders.ts`

---

## Future Screens

Added on demand. Each prompt will provide the spec. The foundation (design system, AppShell, fixtures pattern) is the same for every screen — only content and layout vary.

Known screens from the Apex PH Activation Flow (non-exhaustive, non-sequential):
- Outreach Draft Modal
- "What to Expect" onboarding
- Calendly-style slot selection
- Session Confirmation
- Sign-up / Profile (pre-filled)
- Event page review
- Discovery page
- Session preview panel + RSVP
- PreParty Lobby
- Live Session with camera/video on stage

---

## Live Session Screen (future)

When built, the live session screen will:
- Use `@livekit/components-react` for real camera/video
- Display host video on a centered "stage" area
- Support interactive micro-experiences as absolute-positioned overlays on the stage
- Follow the same AppShell wrapper and design system

LiveKit token endpoint: `app/api/livekit/route.ts` using `livekit-server-sdk`.

---

## Success Criteria

- Investor can be walked through the Apex activation flow end-to-end without dead ends
- Every screen matches the design system (orange/cream palette, glassmorphism, Plus Jakarta Sans headlines)
- Live session screen shows real camera feed
- New screens can be added with a single file — no restructuring needed
- Deploys to Vercel from main branch
