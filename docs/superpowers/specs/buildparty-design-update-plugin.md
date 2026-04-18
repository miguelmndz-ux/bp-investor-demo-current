# Spec: buildparty-design-update Plugin

## Purpose

A Claude Code plugin that automates the full workflow of taking screenshots of BuildParty screens running on the local dev server and pushing them into the correct positions in the Figma design file. Invoked with `/buildparty-design-update`.

---

## Problem Being Solved

Currently this workflow is manual and fragile:
1. User asks Claude Code to use the Playwright MCP to screenshot screens
2. Playwright MCP is unreliable (token bloat from accessibility trees stuffed into context)
3. User manually provides Figma section URL and asks Claude to place screenshots
4. This requires re-typing a long prompt every session

The plugin replaces all of this with a single slash command.

---

## Constraints

- Must work on Windows, Mac, and Linux
- Uses Playwright CLI (already in `web/node_modules`) — not the MCP
- Uses the Figma REST API (not the Figma MCP) for image placement
- Dev server must already be running at `localhost:3000` before invoking
- `FIGMA_TOKEN` must be set as an environment variable or in a `.env` file at plugin root
- No new npm dependencies beyond what's already in `web/package.json`

---

## Plugin Location

```
~/.claude/plugins/local/buildparty-design-update/
```

Claude Code loads local plugins from `~/.claude/plugins/local/`. The plugin name maps to the slash command: `buildparty-design-update` → `/buildparty-design-update`.

---

## File Structure

```
~/.claude/plugins/local/buildparty-design-update/
  skills/
    buildparty-design-update.md     ← skill invoked by /buildparty-design-update
  scripts/
    screenshot.js                   ← Playwright screenshotter
    upload-to-figma.js              ← Figma REST API uploader
    check-server.js                 ← verifies dev server is running
    screens.json                    ← screen registry (source of truth)
  output/                           ← generated PNGs and manifest (gitignored)
    manifest.json                   ← written by screenshot.js, read by uploader
  .env                              ← FIGMA_TOKEN (gitignored, never committed)
  .env.example                      ← template committed to plugin repo
  package.json                      ← declares node >=18, no extra deps
  README.md
```

---

## screens.json — Screen Registry

Single source of truth for which screens exist, their routes, and their Figma positions.

```json
{
  "baseUrl": "http://localhost:3000",
  "viewport": { "width": 1440, "height": 900 },
  "figmaFileKey": "Fl5XvddT3QsN2VRokrFuqs",
  "figmaSectionNodeId": "7975-2252",
  "playwrightBin": "../../../Documents/Code/bp-investor-demo-current/web/node_modules/.bin/playwright",
  "screens": [
    {
      "id": "1.2",
      "name": "Community Profile Page",
      "route": "/apex/community/velo/owner",
      "waitMs": 1500,
      "fullPage": false,
      "figmaPlaceholderNodeId": null,
      "figmaX": 0,
      "figmaY": 441
    },
    {
      "id": "1.2.1",
      "name": "Decode Page",
      "route": "/apex/community/velo/decode",
      "waitMs": 2500,
      "fullPage": false,
      "figmaPlaceholderNodeId": null,
      "figmaX": 3212,
      "figmaY": 441
    },
    {
      "id": "1.2.2",
      "name": "Course Page",
      "route": "/apex/community/velo/courses",
      "waitMs": 2500,
      "fullPage": false,
      "figmaPlaceholderNodeId": null,
      "figmaX": 6424,
      "figmaY": 441
    }
  ]
}
```

**Notes:**
- `figmaPlaceholderNodeId` is `null` until Phase 2 fills it in by inspecting the Figma file.
- `waitMs` accounts for iframe/JS load time per page. Decode and Course are higher because they load external HTML files into iframes.
- `fullPage: false` captures only the viewport (1440×900) — not the full scrollable page — to match the Figma frame dimensions.
- X positions are spaced 3212px apart (2962px content + 250px gap), matching the existing taxonomy layout.

---

## screenshot.js — Screenshotter

### Behavior
1. Reads `screens.json`
2. Launches Chromium headless via Playwright (uses the binary already in `web/node_modules`)
3. For each screen: navigates, waits, takes a viewport screenshot
4. Saves PNGs to `output/<id>_<timestamp>.png`
5. Writes `output/manifest.json` with paths and metadata

### Cross-platform requirements
- Use `path.join()` for all file paths — never string concatenation with `/` or `\`
- Playwright binary path: resolve relative to `__dirname` using `path.resolve()`
- On Linux headless: launch with `--no-sandbox --disable-setuid-sandbox` args
- Detect platform via `process.platform`: `'win32'` | `'darwin'` | `'linux'`

### API contract

**Input:** `scripts/screens.json`

**Output:** 
- `output/<id>_<timestamp>.png` — one file per screen
- `output/manifest.json`:
```json
[
  {
    "id": "1.2",
    "name": "Community Profile Page",
    "route": "/apex/community/velo/owner",
    "filePath": "/absolute/path/to/output/1_2_1713000000000.png",
    "figmaPlaceholderNodeId": "7975:2253",
    "figmaX": 0,
    "figmaY": 441,
    "capturedAt": "2026-04-17T20:00:00.000Z"
  }
]
```

### Error handling
- If Playwright binary not found at configured path: print clear error with correct path
- If page navigation fails (localhost not running): exit with code 1 and message "Dev server not found at <url> — run `npm run dev` first"
- If a single screen fails: log error, continue with remaining screens, mark screen as failed in manifest

---

## upload-to-figma.js — Figma Uploader

### Behavior
1. Reads `output/manifest.json`
2. For each screen with a valid `filePath`:
   a. Reads PNG from disk
   b. `POST /v1/files/{fileKey}/images` — uploads image, receives `imageHash`
   c. `PATCH /v1/files/{fileKey}/nodes` — sets the `fills` of the placeholder frame to use the image hash
3. Reports success/failure per screen

### Figma REST API details

**Upload image:**
```
POST https://api.figma.com/v1/files/{file_key}/images
Content-Type: multipart/form-data
X-Figma-Token: {token}

Body: PNG file as multipart
Response: { "error": false, "status": 200, "meta": { "images": { "<nodeId>": "<imageRef>" } } }
```

**Set image fill on a frame:**
```
PUT https://api.figma.com/v1/files/{file_key}/nodes
X-Figma-Token: {token}
Content-Type: application/json

Body:
{
  "nodes": {
    "<nodeId>": {
      "document": {
        "fills": [{
          "type": "IMAGE",
          "scaleMode": "FILL",
          "imageRef": "<imageRef from upload>"
        }]
      }
    }
  }
}
```

**Important:** The `figmaPlaceholderNodeId` in `screens.json` must be the node ID of a pre-existing frame in Figma that the image will fill. These frames must be created manually (or by Claude via Figma MCP) before the uploader runs.

### Environment
- `FIGMA_TOKEN` — loaded from `.env` at plugin root (use `dotenv`) or from `process.env`
- Never hardcode the token

### Error handling
- If `FIGMA_TOKEN` missing: exit with message "Set FIGMA_TOKEN in ~/.claude/plugins/local/buildparty-design-update/.env"
- If Figma API returns 403: token is invalid or expired
- If `figmaPlaceholderNodeId` is null: skip with warning "No Figma node ID set for screen <id> — run Phase 2 setup first"

---

## Skill File — buildparty-design-update.md

The skill instructs Claude Code to:

1. **Pre-flight checks:**
   - Run `check-server.js` to verify `localhost:3000` is responding
   - Verify `FIGMA_TOKEN` is set (check `.env` or `process.env`)
   - If either fails: stop and give the user a specific fix instruction

2. **Screenshot phase:**
   - Run `node scripts/screenshot.js` from the plugin root
   - Read `output/manifest.json` to confirm which screens succeeded
   - Show the user a summary of captured screenshots

3. **Upload phase:**
   - Run `node scripts/upload-to-figma.js`
   - Report which screens were successfully pushed to Figma
   - Print the Figma section URL for the user to open

4. **Optional flags** (parsed from args when skill is invoked):
   - `--screens 1.2,1.2.1` — screenshot only specific screen IDs
   - `--screenshot-only` — skip the Figma upload step
   - `--upload-only` — skip screenshots, re-upload from last `manifest.json`

---

## check-server.js — Server Check

Simple HTTP GET to `http://localhost:3000`. Exits 0 if server responds, exits 1 with a message if not.

```js
// Uses only Node.js built-ins (http module) — no dependencies
const http = require('http')
http.get('http://localhost:3000', (res) => {
  process.exit(res.statusCode < 500 ? 0 : 1)
}).on('error', () => {
  console.error('Dev server not running at localhost:3000')
  process.exit(1)
})
```

---

## .env.example

```
# Copy this to .env and fill in your token
# Get your token at: https://www.figma.com/settings → Personal access tokens
FIGMA_TOKEN=your_figma_personal_access_token_here
```

---

## package.json

```json
{
  "name": "buildparty-design-update",
  "version": "1.0.0",
  "description": "Screenshot BuildParty screens and push to Figma",
  "engines": { "node": ">=18" },
  "scripts": {
    "screenshot": "node scripts/screenshot.js",
    "upload": "node scripts/upload-to-figma.js",
    "run-all": "node scripts/check-server.js && node scripts/screenshot.js && node scripts/upload-to-figma.js"
  },
  "dependencies": {
    "dotenv": "^16.0.0"
  }
}
```

`dotenv` is the only new dependency — it's tiny and universal.

---

## Registration in Claude Code

Add the plugin to `~/.claude/settings.json`:

```json
{
  "plugins": [
    "~/.claude/plugins/local/buildparty-design-update"
  ]
}
```

---

## Known Limitations

1. **iframes in Decode/Course pages:** Playwright screenshots the React shell, but the iframe content (velo-decode.html, velo-microcourse.html) may not be fully rendered at screenshot time. The `waitMs` values in `screens.json` are tuned for this but may need adjustment.

2. **Figma node IDs are static:** If frames in Figma are deleted and recreated, node IDs change and `screens.json` must be updated manually.

3. **Figma image fills vs. frames:** The upload script sets an image *fill* on an existing frame node. It does not create new frames. The placeholder frames in Figma must exist before running the uploader.

4. **Authentication:** The Figma token is a personal access token — it has full read/write access to all files the user owns. Store it only in `.env`, never in version control.
