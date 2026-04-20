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
