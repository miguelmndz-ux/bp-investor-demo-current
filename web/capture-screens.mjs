import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const DIR = './screenshots';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });

  // ── 1.2  Apex Admin Dashboard (load page, wait for scan to finish, dismiss) ──
  console.log('Capturing 1.2 - Apex Admin Dashboard...');
  const apex = await context.newPage();
  await apex.goto(`${BASE}/apex`, { waitUntil: 'networkidle' });

  // Wait for scan overlay to appear, then capture it
  await apex.waitForTimeout(2000);

  // ── 1.0  Apex scan in progress ──
  console.log('Capturing 1.0 - Apex scan in progress...');
  // Capture just the overlay area
  const scanOverlay = apex.locator('div.fixed').filter({ has: apex.locator('text=Apex') }).first();
  try {
    await apex.screenshot({ path: `${DIR}/1.0-apex-scan-in-progress.png` });
    console.log('  ✓ 1.0 captured (full viewport with overlay)');
  } catch (e) {
    console.log('  ✗ 1.0 failed:', e.message);
  }

  // Wait for scan to progress further
  await apex.waitForTimeout(12000);

  // ── 1.1  Apex scan complete ──
  console.log('Capturing 1.1 - Apex scan complete...');
  await apex.screenshot({ path: `${DIR}/1.1-apex-scan-complete.png` });
  console.log('  ✓ 1.1 captured');

  // Wait for overlay to fully finish and dismiss
  await apex.waitForTimeout(12000);

  // Try to click "See Results" or wait for auto-dismiss
  try {
    const seeResults = apex.locator('button:has-text("See Results")');
    if (await seeResults.isVisible({ timeout: 2000 })) {
      await seeResults.click();
      await apex.waitForTimeout(1000);
    }
  } catch (e) {
    // overlay may have auto-dismissed
  }

  // Try clicking any remaining dismiss button
  try {
    const stop = apex.locator('button:has-text("Stop")');
    if (await stop.isVisible({ timeout: 1000 })) {
      await stop.click();
      await apex.waitForTimeout(1000);
    }
  } catch (e) {}

  // If overlay is still there, wait longer
  await apex.waitForTimeout(3000);

  // ── 1.2  Dashboard clean state ──
  console.log('Capturing 1.2 - Apex Admin Dashboard (clean)...');
  await apex.screenshot({ path: `${DIR}/1.2-apex-admin-dashboard.png` });
  console.log('  ✓ 1.2 captured');

  // ── 1.2.1  Outreach Draft Modal ──
  console.log('Capturing 1.2.1 - Outreach Draft Modal...');
  try {
    // Find and hover over the first product row to reveal the Preview Outreach button
    const veloRow = apex.locator('tr').filter({ hasText: 'Velo' }).first();
    if (await veloRow.isVisible({ timeout: 3000 })) {
      await veloRow.hover();
      await apex.waitForTimeout(500);
    }

    // Try clicking Preview Outreach
    const previewBtn = apex.locator('button:has-text("Preview Outreach")');
    if (await previewBtn.isVisible({ timeout: 2000 })) {
      await previewBtn.click();
    } else {
      // Try alternative: click on the outreach icon/button in the row
      const outreachBtn = apex.locator('button:has-text("Outreach")').first();
      if (await outreachBtn.isVisible({ timeout: 2000 })) {
        await outreachBtn.click();
      }
    }

    await apex.waitForTimeout(1000);
    // Capture the modal - full viewport shows modal + backdrop
    await apex.screenshot({ path: `${DIR}/1.2.1-outreach-draft-modal.png` });
    console.log('  ✓ 1.2.1 captured');

    // ── 1.2.2  Outreach Sent Success Overlay ──
    console.log('Capturing 1.2.2 - Outreach Sent Success Overlay...');
    const approveBtn = apex.locator('button:has-text("Approve")').first();
    if (await approveBtn.isVisible({ timeout: 2000 })) {
      await approveBtn.click();
      await apex.waitForTimeout(1500);
      await apex.screenshot({ path: `${DIR}/1.2.2-outreach-sent-success-overlay.png` });
      console.log('  ✓ 1.2.2 captured');
    } else {
      console.log('  ✗ 1.2.2 - Approve button not found');
    }
  } catch (e) {
    console.log('  ✗ Modal flow failed:', e.message);
  }

  await apex.close();

  // ── 1.3  Community Profile Page ──
  console.log('Capturing 1.3 - Community Profile Page...');
  const community = await context.newPage();
  await community.goto(`${BASE}/apex/community/velo/owner`, { waitUntil: 'networkidle' });
  await community.waitForTimeout(1500);
  await community.screenshot({ path: `${DIR}/1.3-community-profile-page.png`, fullPage: false });
  console.log('  ✓ 1.3 captured');
  await community.close();

  // ── 5.0  Discovery Page ──
  console.log('Capturing 5.0 - Discovery Page...');
  const discover = await context.newPage();
  await discover.goto(`${BASE}/discover`, { waitUntil: 'networkidle' });
  await discover.waitForTimeout(1500);
  await discover.screenshot({ path: `${DIR}/5.0-discovery-page.png`, fullPage: false });
  console.log('  ✓ 5.0 captured');

  // ── 5.0.1  Session Preview Panel ──
  console.log('Capturing 5.0.1 - Session Preview Panel...');
  try {
    // Click on a session card to trigger the preview panel
    const sessionCard = discover.locator('text=ElevenLabs').first();
    if (await sessionCard.isVisible({ timeout: 3000 })) {
      await sessionCard.click();
    } else {
      // Try clicking any card-like element
      const anyCard = discover.locator('[class*="cursor-pointer"]').first();
      await anyCard.click();
    }
    await discover.waitForTimeout(1000);
    await discover.screenshot({ path: `${DIR}/5.0.1-session-preview-panel.png`, fullPage: false });
    console.log('  ✓ 5.0.1 captured');
  } catch (e) {
    console.log('  ✗ 5.0.1 failed:', e.message);
  }

  await discover.close();
  await browser.close();

  console.log('\nDone! Screenshots saved to ./screenshots/');
})();
