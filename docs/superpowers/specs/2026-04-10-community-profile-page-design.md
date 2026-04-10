# Community Profile Page — Design Spec

**Date:** 2026-04-10
**Status:** Draft
**Route:** `/apex/community/[slug]`

---

## Overview

A dedicated community profile page for products discovered by Apex during its Product Hunt scan. When a user clicks a product row in the PhTable on the Apex dashboard, they navigate to that product's community profile page. The page uses a two-column layout: a fixed left sidebar with product identity and at-a-glance info, and a scrollable right column with detailed content, images, and Apex-generated learning materials (Decode and Rapid Course previews).

Velo is the fully built-out demo product. All other products resolve to a "Coming soon" placeholder state.

---

## Routing & Navigation

- **Route pattern:** `/apex/community/[slug]/page.tsx` (dynamic route)
- **Example:** `/apex/community/velo`
- **Entry point:** Clicking any product row in `PhTable` navigates to `/apex/community/<slug>` via `useRouter().push()`
- **Back navigation:** A back button at the top of the page that returns to `/apex`
- **Slug resolution:** Look up product by `slug` field in fixtures. If not found or product has no full profile, render "Coming soon" state.

---

## Layout

Two-column layout inside the existing AppShell (SideNav + TopNav stay visible).

### Left Column (fixed, ~40% width)

This column is `position: sticky` so it stays in view as the right column scrolls. Content stacked vertically:

1. **Back button** — text link with left arrow icon, navigates to `/apex`
2. **Product logo** — large, `rounded-2xl`, displayed prominently
3. **Product name** — `text-3xl font-black font-jakarta text-primary`
4. **Tagline** — `text-base text-on-background/70`, one-liner below the name
5. **Category pill** — small pill badge (e.g. "Developer Tools"), uses the liquid glass button style
6. **Stats row** — horizontal row showing votes, comments, and score with Material Symbols icons, compact layout
7. **Brief overview** — 2-3 sentence summary of the product
8. **Founder card** — `premium-glass` card with founder avatar (rounded-full), name, and role. Only shown if the product has a matched founder in the founders fixture.

### Right Column (scrollable, ~60% width)

Stacked vertically with spacing between sections:

1. **Full product description** — detailed multi-paragraph text about what the product does, its value proposition, target audience
2. **Product images** — stacked product screenshots/images with `rounded-2xl` corners and subtle shadow
3. **Decode preview card** — `premium-glass` card containing:
   - Section label: "Apex Decode"
   - Title (e.g. "Velo — Deep Dive")
   - Brief description of what the Decode file covers (2-3 sentences)
   - "View Decode" button — liquid glass style, opens the static HTML file in a new browser tab
4. **Rapid Course preview card** — same `premium-glass` card treatment:
   - Section label: "Apex Rapid Course"
   - Title (e.g. "Velo — Microcourse")
   - Brief description of the course content
   - "View Course" button — liquid glass style, opens the static HTML file in a new browser tab

---

## Data Model

### Type Changes

Expand the `PhProduct` interface in `web/src/lib/fixtures/types.ts`:

```typescript
interface PhProduct {
  // Existing fields
  name: string
  category: string
  votes: number
  comments: number
  score: number
  logo: string

  // New fields
  slug: string
  tagline: string
  briefOverview: string
  description: string
  images: string[]
  makerName: string
  decodeUrl: string | null
  rapidCourseUrl: string | null
}
```

### Fixture Data

- **Velo:** Full profile data — all fields populated, including `decodeUrl` and `rapidCourseUrl` pointing to static HTML files
- **Other 9 products:** Add `slug` field (derived from name, e.g. "chrome-vertical-tabs"). All new detail fields (`tagline`, `description`, `briefOverview`, `images`, `decodeUrl`, `rapidCourseUrl`) set to empty/null values.

### Static HTML Files

Place the Decode and Rapid Course HTML files in the Next.js public directory so they are served as static assets:

- `web/public/apex/velo-decode.html`
- `web/public/apex/velo-rapidcourse.html`

These are opened in a new tab via `window.open()` or `<a target="_blank">`. They are self-contained HTML files with their own styles and scripts — no integration with the React app needed.

### Founder Matching

The existing `founders` fixture has a `role` field like "Maker, Velo". To match a founder to a product, check if the founder's role string contains the product name. This is a simple string match — no new data structure needed.

---

## Component Structure

### New Files

| Path | Responsibility |
|------|---------------|
| `web/src/app/apex/community/[slug]/page.tsx` | Page component — loads product by slug, renders two-column layout or "Coming soon" |
| `web/src/components/apex/CommunityProfile.tsx` | Main profile layout — receives full product data, renders left + right columns |
| `web/src/components/apex/DecodePreviewCard.tsx` | Preview card for Decode file with "View Decode" link |
| `web/src/components/apex/RapidCoursePreviewCard.tsx` | Preview card for Rapid Course file with "View Course" link |

### Modified Files

| Path | Change |
|------|--------|
| `web/src/lib/fixtures/types.ts` | Add new fields to `PhProduct` |
| `web/src/lib/fixtures/products.ts` | Add `slug` + full data for Velo, `slug` + empty fields for others |
| `web/src/components/apex/PhTable.tsx` / `PhProductRow.tsx` | Make product name in each row a clickable link to `/apex/community/<slug>`. The existing "Preview Outreach" hover button on Velo's row stays as-is — it opens the outreach modal independently of navigation. |

---

## "Coming Soon" State

When a user navigates to `/apex/community/<slug>` for a product without full profile data:

- Same two-column layout shell
- Left column: product logo, name, category pill, stats (from existing fixture data)
- Right column: centered message — "Apex is still building this community profile. Check back soon." styled with `text-on-background/50`, no other content

---

## Visual Design

All styling follows the existing design system:

- **Cards:** `premium-glass` class
- **Buttons:** Liquid glass style (dark-orange tinted, backdrop-blur, as established in the scan overlay)
- **Typography:** `font-jakarta font-black` for headlines, default Inter for body
- **Colors:** Orange/cream palette via Tailwind tokens (`text-primary`, `bg-background`, etc.)
- **Shapes:** `rounded-2xl` for cards and images, `rounded-full` for avatars and pills
- **Animations:** `.fade-up` with staggered delays for page-load entrance
- **Mode:** Light mode only

---

## Testing

Smoke tests for the new components:

- `CommunityProfile` — renders product name, tagline, stats, description
- `DecodePreviewCard` — renders title, description, and "View Decode" link
- `RapidCoursePreviewCard` — renders title, description, and "View Course" link
- Community page — renders "Coming soon" for unknown slugs
