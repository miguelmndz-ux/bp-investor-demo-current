import { readFileSync, writeFileSync } from 'fs';

const mapping = [
  { file: '1.0-apex-scan-in-progress', frameId: '7975:2254' },
  { file: '1.1-apex-scan-complete', frameId: '7975:2255' },
  { file: '1.2-apex-admin-dashboard', frameId: '7975:2253' },
  { file: '1.2.1-outreach-draft-modal', frameId: '7975:2258' },
  { file: '1.2.2-outreach-sent-success-overlay', frameId: '7991:32' },
  { file: '1.3-community-profile-page', frameId: '7975:2256' },
  { file: '5.0-discovery-page', frameId: '7975:2259' },
  { file: '5.0.1-session-preview-panel', frameId: '7991:38' },
];

for (const m of mapping) {
  const b64 = readFileSync(`screenshots/compressed/${m.file}.jpg`).toString('base64');
  const code = `const b64 = '${b64}';\nconst page = figma.root.children.find(p => p.id === '2503:2');\nawait figma.setCurrentPageAsync(page);\nconst raw = Uint8Array.from(atob(b64), c => c.charCodeAt(0));\nconst img = figma.createImage(raw);\nconst node = await figma.getNodeByIdAsync('${m.frameId}');\nnode.fills = [{ type: 'IMAGE', imageHash: img.hash, scaleMode: 'FILL' }];\nreturn { done: '${m.file}', hash: img.hash };`;
  console.log(`${m.file} → ${m.frameId} (code length: ${code.length})`);
  writeFileSync(`screenshots/code-${m.file}.txt`, code);
}
