# Discovery Homepage Design Spec

## Overview

A Spotify-inspired discovery homepage for BuildParty where users browse sessions, programs, and communities. The layout adapts Spotify's structural patterns (quick-access cards, horizontal carousels, featured portrait cards) to BuildParty's orange/cream/glass design system.

## Route

`/discover` — new page inside AppShell.

## Layout

- Renders inside AppShell with the same `max-w-[1400px] mx-auto` content width as the Apex dashboard.
- Content is always horizontally centered in the available space.
- When the preview panel opens (380px from the right), the content area shrinks and the centered content shifts left to stay centered in the remaining space. No dead space between content and panel.

## Sections (top to bottom)

### 1. Filter Pills

A horizontal row of pill buttons at the top of the page.

**Pills:** All (active by default), AI Tools, Creators, Schools, Bootcamps, Live Now.

**Styling:**
- Inactive: `rgba(156,63,0,0.08)` background, `rounded-full`, 13px font, 600 weight.
- Active: liquid glass style (same as SideNav active item), 700 weight.
- Hover: slightly darker background.

**Behavior:** Static/visual for now. Filtering logic is out of scope — pills are rendered but do not filter content.

### 2. Trending Programs (Quick-Access Cards)

A 2-column grid of compact program cards, inspired by Spotify's quick-access row.

**Section header:** "Trending Programs" (h2, Plus Jakarta Sans 800) with a "Show all" link aligned right.

**Card layout:**
- 2-column CSS grid, 10px gap.
- Each card is 56px tall with `rounded-[10px]`.
- Glass background: `rgba(255,255,255,0.55)` with `backdrop-filter: blur(16px)` and a 1px border.
- Left: 56x56px square image flush to the left edge (no border-radius).
- Middle: program name (13.5px, 700 weight) + owner name below (11px, muted).
- Right: 32px orange circle play button, hidden by default, fades in on hover.

**Hover:** background brightens, subtle lift (`translateY(-1px)`), soft shadow.

**Click:** opens preview panel with Program content.

**Data:** 6 cards (3 rows x 2 columns). Sourced from fixtures.

### 3. Trending Today (Session Carousel)

A horizontally scrollable row of session cards.

**Section header:** "Trending Today" with "Show all" link.

**Card layout:**
- Horizontal scroll, 220px card width, 16px gap, hidden scrollbar.
- Each card: glass background, `rounded-[14px]`, 14px padding.
- Top: 1:1 square image with `rounded-[10px]`, orange play button (44px) slides up from bottom-right on hover.
- Below image: status badge (pill, 10px uppercase — "Live Now" in red, "Upcoming"/"Tomorrow"/date in orange), title (14.5px, 700, 2-line clamp), subtitle/host (12.5px, muted).

**Hover:** background brightens, lift (`translateY(-3px)`), shadow.

**Click:** opens preview panel with Session content.

**Data:** 6+ cards. Sourced from fixtures.

### 4. Upcoming This Week (Session Carousel)

Same card component and layout as Trending Today.

**Section header:** "Upcoming This Week" with "Show all" link.

**Badges:** day/time format (e.g., "Mon 2pm", "Tue 11am").

**Data:** 5+ cards. Sourced from fixtures.

### 5. Featured Communities (Portrait Cards)

Tall portrait cards with full-bleed background images and gradient overlays.

**Section header:** "Featured Communities" with "Show all" link.

**Card layout:**
- CSS grid, 3 columns (collapses to `minmax(240px, 1fr)` when panel is open), 20px gap.
- Each card: 3:4 aspect ratio, `rounded-[18px]`, overflow hidden.
- Full-bleed background image.
- Two gradient overlays: warm amber tint fading down from top (`rgba(61,28,0,0.4)`), stronger fade up from bottom (`rgba(61,28,0,0.75)`).
- Bottom content (z-index above gradients): community thumbnail (64px, rounded-[14px], white border), "Community" label (11px uppercase), community name (22px, Plus Jakarta Sans 800, white), owner name (13px, muted white).
- Stats row: member count + program count with Material Symbols icons.
- "Join Community" pill button with glass treatment.

**Hover:** lift (`translateY(-4px)`), warm shadow.

**Click:** opens preview panel with Community content.

**Data:** 3 cards. Sourced from fixtures.

## Preview Panel (Slide-in Drawer)

A fixed panel that slides in from the right edge when any card is clicked.

**Dimensions:** 380px wide, full height below TopNav (top: 64px to bottom: 0).

**Styling:**
- Glass background: `rgba(255,250,247,0.88)` with `backdrop-filter: blur(40px) saturate(180%)`.
- Left border: 1px `rgba(156,63,0,0.1)`.
- Soft shadow on the left side.
- Smooth slide transition: `transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)`.
- Scrollable vertically if content overflows.

**Close button:** 32px circle, top-right, `rgba(156,63,0,0.08)` background, close icon.

**Dismiss:** clicking the close button. Clicking a different card swaps the panel content without closing/reopening.

**Content is type-aware — three variants:**

### Session Preview
- Hero image (16:10 aspect ratio, rounded-[14px]).
- "SESSION" type label (11px, uppercase, orange).
- Title (20px, Plus Jakarta Sans 800).
- Host name (13px, muted).
- Description paragraph.
- Divider.
- Details: date/time, duration, attendee count, parent program (each with Material Symbols icon).
- "Join Session" CTA button (full width, rounded-full, orange gradient).

### Program Preview
- Hero image.
- "PROGRAM" type label.
- Title + owner.
- Description.
- Divider.
- Details: session count/duration, start date, enrollment count, completion reward.
- Divider.
- "Sessions" sub-section: list of session items (40px thumbnail + name + date).
- "Enroll in Program" CTA button.

### Community Preview
- Hero image.
- "COMMUNITY" type label.
- Title + owner.
- Description.
- Divider.
- Details: member count, active program count, sessions this month.
- Divider.
- "Active Programs" sub-section: list of program items (40px thumbnail + name + status).
- "Join Community" CTA button.

## Fixture Data

New fixture files needed in `web/src/lib/fixtures/`:

### `discoverSessions.ts`
Array of session objects: `id`, `title`, `host`, `image`, `badge` (label + type: live/upcoming/date), `date`, `duration`, `attendees`, `programName`, `description`.

### `discoverPrograms.ts`
Array of program objects: `id`, `title`, `owner`, `image`, `sessionCount`, `startDate`, `enrolled`, `description`, `reward`, `sessions` (array of `{title, date, image}`).

### `discoverCommunities.ts`
Array of community objects: `id`, `name`, `owner`, `image`, `thumbnail`, `members`, `programCount`, `sessionsThisMonth`, `description`, `programs` (array of `{name, status, image}`).

## Components

### New components in `web/src/components/discover/`:

- **`FilterPills.tsx`** — horizontal pill bar with active state.
- **`TrendingPrograms.tsx`** — section with 2-column quick-access grid.
- **`ProgramCard.tsx`** — single quick-access card.
- **`SessionCarousel.tsx`** — section with horizontal scrolling session cards. Accepts `title` and `sessions` props for reuse across Trending Today and Upcoming This Week.
- **`SessionCard.tsx`** — single carousel card.
- **`FeaturedCommunities.tsx`** — section with portrait card grid.
- **`CommunityCard.tsx`** — single portrait card.
- **`PreviewPanel.tsx`** — slide-in drawer with type-aware content rendering.

### Page component:

- **`web/src/app/discover/page.tsx`** — assembles all sections, manages preview panel state (open/closed, selected item type + data).

## Interactions

- **Card click:** sets selected item in page state, opens preview panel (or swaps content if already open).
- **Panel close:** close button or click outside. Panel slides out, content re-centers.
- **Card hover:** background brightens, subtle lift, play button appears (quick-access and carousel cards).
- **Carousel scroll:** native horizontal scroll, no scrollbar visible.

## Visual Approach

Spotify structure + BuildParty skin:
- Card shapes, hover behaviors, and scroll mechanics from Spotify.
- Colors, glass effects, typography, and border radii from BuildParty's design system.
- Orange replaces Spotify's green for all accent/CTA elements.
- Cream/white glass replaces Spotify's dark card backgrounds.
- Featured community cards keep full-bleed images with warm amber gradient overlays (not dark).

## Non-Goals

- Filter pill functionality (filtering content by category).
- Real API calls or loading states.
- Search functionality.
- Pagination or infinite scroll.
- Mobile/responsive layout beyond the panel collapse behavior.
- Navigation from preview panel to detail pages.
