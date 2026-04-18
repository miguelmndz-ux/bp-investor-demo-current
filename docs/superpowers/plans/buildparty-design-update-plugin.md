# Plan: buildparty-design-update Plugin

Spec: `docs/superpowers/specs/buildparty-design-update-plugin.md`

Each phase is self-contained and executable in a single session. Start a new session, read this plan + the spec, and pick up from the next incomplete phase.

---

## Phase 1 — Plugin scaffold + screenshotter

**Goal:** Running `node scripts/screenshot.js` from the plugin root produces correct PNGs for all three screens.

**Pre-conditions:** Dev server running at `localhost:3000`.

### Tasks

- [ ] **1.1** Create plugin directory structure:
  ```
  ~/.claude/plugins/local/buildparty-design-update/
    skills/
    scripts/
    output/    (empty, gitignored)
  ```

- [ ] **1.2** Write `scripts/screens.json` — copy the exact JSON from the spec. Leave `figmaPlaceholderNodeId` as `null` for all screens.

- [ ] **1.3** Write `scripts/check-server.js` — exact code from spec. Test with `node scripts/check-server.js` (should exit 0 when dev server is running, exit 1 when not).

- [ ] **1.4** Write `scripts/screenshot.js`:
  - Resolve Playwright binary relative to `__dirname` using the path in `screens.json` (`playwrightBin` field)
  - Launch Chromium with `--no-sandbox --disable-setuid-sandbox` on Linux, standard args on Mac/Windows (detect via `process.platform`)
  - For each screen: navigate, `waitForLoadState('networkidle')`, `waitForTimeout(waitMs)`, take viewport screenshot (not full page)
  - Write PNGs to `output/` directory
  - Write `output/manifest.json`

- [ ] **1.5** Write `package.json` — exact content from spec.

- [ ] **1.6** Run `npm install` in plugin root (installs `dotenv`).

- [ ] **1.7** Test: run `node scripts/screenshot.js` with dev server running.
  - Verify three PNG files appear in `output/`
  - Verify `output/manifest.json` is written with correct paths
  - Visually inspect each PNG — confirm content renders correctly (not blank, not cut off, iframes loaded)

- [ ] **1.8** Tune `waitMs` values in `screens.json` if iframes aren't loaded in the screenshots. Increase in 500ms increments until content is visible.

**Exit criteria:** Three correct PNGs in `output/` with content fully rendered.

---

## Phase 2 — Figma node ID discovery

**Goal:** Every screen in `screens.json` has a valid `figmaPlaceholderNodeId`.

**Context:** The Figma design file has a section at node `7975-2252` in file `Fl5XvddT3QsN2VRokrFuqs`. Each taxonomy screen has a `[Placeholder] #.# – Name` frame at a known Y position (441). These frame node IDs need to be looked up and added to `screens.json`.

### Tasks

- [ ] **2.1** Use Figma MCP to inspect the file. Call the Figma API to list children of node `7975-2252` in file `Fl5XvddT3QsN2VRokrFuqs`:
  ```
  GET https://api.figma.com/v1/files/Fl5XvddT3QsN2VRokrFuqs/nodes?ids=7975-2252
  ```
  This returns the section's children. Find the frames named `[Placeholder] 1.2 – Community Profile Page`, `[Placeholder] 1.2.1 – Decode Page`, `[Placeholder] 1.2.2 – Course Page`.

- [ ] **2.2** Note each frame's `id` field from the API response.

- [ ] **2.3** Update `screens.json` — fill in `figmaPlaceholderNodeId` for each screen with the IDs from step 2.2.

- [ ] **2.4** If placeholder frames don't exist yet, create them first using the Figma MCP (per the `When changing screens` instructions in CLAUDE.md), then repeat step 2.1–2.3.

**Exit criteria:** All three screens in `screens.json` have non-null `figmaPlaceholderNodeId` values. Verify by reading the file.

---

## Phase 3 — Figma uploader

**Goal:** Running `node scripts/upload-to-figma.js` reads `output/manifest.json` and pushes each PNG as an image fill onto the correct Figma frame.

### Tasks

- [ ] **3.1** Create `.env.example` — exact content from spec.

- [ ] **3.2** Create `.env` — copy `.env.example`, fill in your Figma personal access token.
  - Token location: figma.com → Account Settings → Personal access tokens → Generate new token
  - Required scopes: `files:read`, `files:write`

- [ ] **3.3** Write `scripts/upload-to-figma.js`:
  - Load `.env` via `require('dotenv').config({ path: path.join(__dirname, '../.env') })`
  - Read `output/manifest.json`
  - Skip screens where `figmaPlaceholderNodeId` is null (log warning)
  - For each valid screen:
    - Read PNG from `filePath` in manifest
    - `POST /v1/files/{fileKey}/images` with PNG as multipart — receive `imageRef`
    - `PUT /v1/files/{fileKey}/nodes` to set image fill on the placeholder frame
  - Log success/failure per screen

- [ ] **3.4** Test upload:
  - Run `node scripts/screenshot.js` first to generate fresh `output/manifest.json`
  - Run `node scripts/upload-to-figma.js`
  - Open Figma at `https://www.figma.com/design/Fl5XvddT3QsN2VRokrFuqs?node-id=7975-2252`
  - Verify placeholder frames now show the screenshots

- [ ] **3.5** Fix any API errors (403 = bad token, 404 = wrong node ID, 400 = malformed request).

**Exit criteria:** All three placeholder frames in Figma show the correct screenshots after running the uploader.

---

## Phase 4 — Skill file + Claude Code registration

**Goal:** Typing `/buildparty-design-update` in a Claude Code session runs the full workflow.

### Tasks

- [ ] **4.1** Write `skills/buildparty-design-update.md` — follow the structure in the spec:
  - Pre-flight: call `check-server.js`, verify token
  - Screenshot phase: run `screenshot.js`, show summary
  - Upload phase: run `upload-to-figma.js`, show results + Figma link
  - Parse optional flags from args (`--screens`, `--screenshot-only`, `--upload-only`)

- [ ] **4.2** Register plugin in `~/.claude/settings.json`:
  ```json
  {
    "plugins": ["~/.claude/plugins/local/buildparty-design-update"]
  }
  ```
  If `settings.json` doesn't have a `plugins` key yet, add it. If the file doesn't exist, create it.

- [ ] **4.3** Restart Claude Code to pick up the new plugin.

- [ ] **4.4** Test: type `/buildparty-design-update` in a fresh session with dev server running.
  - Verify pre-flight checks run
  - Verify screenshots are taken
  - Verify Figma is updated
  - Verify the final report shows the Figma link

- [ ] **4.5** Test error paths:
  - With dev server stopped: should show "run `npm run dev` first"
  - With `FIGMA_TOKEN` unset: should show "set FIGMA_TOKEN in .env"

**Exit criteria:** `/buildparty-design-update` works end-to-end in a clean session.

---

## Phase 5 — Cross-platform hardening + polish

**Goal:** Plugin works identically on Mac, Linux, and Windows.

### Tasks

- [ ] **5.1** Test on a second platform (or ask a teammate to test).
  - Key differences per platform:
    - **Windows:** Playwright binary is `.cmd` file, paths use `\`. Check that `path.join` resolves correctly.
    - **Linux:** Chrome needs `--no-sandbox` flag. Headless server may not have fonts installed — check if text renders.
    - **Mac:** Should work out of the box.

- [ ] **5.2** Make Playwright binary path dynamic — don't rely on the hardcoded relative path in `screens.json`. Instead, detect it at runtime:
  ```js
  // Find playwright in the project's node_modules
  const playwrightBin = require.resolve('playwright/node_modules/.bin/chromium')
  // OR walk up from __dirname to find web/node_modules/.bin/playwright
  ```

- [ ] **5.3** Add `README.md`:
  - Setup instructions (create `.env`, run `npm install`)
  - How to add new screens to `screens.json`
  - How to update Figma node IDs when frames are recreated
  - Troubleshooting section (blank screenshots, Figma 403, iframes not loaded)

- [ ] **5.4** Add `output/` to `.gitignore` in the plugin root (PNGs shouldn't be committed).

- [ ] **5.5** Extend `screens.json` with all taxonomy screens that are currently built (see CLAUDE.md taxonomy table). Focus on screens that change frequently.

**Exit criteria:** Plugin works on all target platforms. README is complete enough for a new session to set up from scratch.

---

## Dependency Map

```
Phase 1 (screenshotter)
    ↓
Phase 2 (Figma node IDs) — can run in parallel with Phase 1 if you already have node IDs
    ↓
Phase 3 (uploader) — requires Phase 1 output (manifest.json) + Phase 2 (node IDs)
    ↓
Phase 4 (skill + registration) — requires Phase 3 working
    ↓
Phase 5 (hardening) — can be done any time after Phase 4
```

---

## Session Startup Checklist

When resuming in a new session, read:
1. This plan file — check off completed phases
2. `docs/superpowers/specs/buildparty-design-update-plugin.md` — for API contracts and file contents
3. Current state of `~/.claude/plugins/local/buildparty-design-update/` — to see what's already built

Then identify the first unchecked task and start there.

---

## Estimated Time Per Phase

| Phase | Description | Est. Time |
|-------|-------------|-----------|
| 1 | Scaffold + screenshotter | 1–2 hrs |
| 2 | Figma node ID discovery | 30 min |
| 3 | Figma uploader | 1.5–2 hrs |
| 4 | Skill + registration | 45 min |
| 5 | Cross-platform hardening | 1 hr |
| **Total** | | **4.5–6.5 hrs** |
