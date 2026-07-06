// Fullscreen Overlay proof — maximal immersive surface on the frozen Modal.
// Captures (desktop/tablet/mobile) plus programmatic assertions for open/
// close, Escape, portal, ARIA, edge-to-edge full-viewport geometry, sticky
// header/footer with a single scrollable body (viewport never scrolls),
// optional sidebar/inspector/toolbar/status slots, loading, disabled,
// restore focus, nested (per-layer Escape) and responsive layout. Requires
// the dev server on :3000.
import { mkdirSync } from 'node:fs'

import { chromium } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = 'docs/phase-04-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EXEC })
const issues = []

async function newPage(width, height) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning')
      issues.push(`[${m.type()}] ${m.text()}`)
  })
  page.on('pageerror', (e) => issues.push(`[pageerror] ${e.message}`))
  await page.goto(`${BASE}/dev/fullscreen-overlay`, {
    waitUntil: 'networkidle',
  })
  await page.waitForTimeout(500)
  return { context, page }
}

function trigger(page, name) {
  return page
    .locator('section.proof-canvas')
    .getByRole('button', { name, exact: true })
}
async function open(page, name) {
  const t = trigger(page, name)
  await t.scrollIntoViewIfNeeded()
  await t.click()
  await page.waitForTimeout(500)
}

// Scene captures.
for (const [w, h, tone, suffix] of [
  [1280, 1400, 'canvas', ''],
  [1280, 1400, 'media', '-media'],
  [834, 1400, 'canvas', '-tablet'],
  [390, 1600, 'canvas', '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  const scene = page.locator(`section.proof-${tone}`)
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(250)
  await scene.screenshot({
    path: `${OUT}/fullscreen-overlay-canvas${suffix}.png`,
  })
  console.log(`screenshot: ${OUT}/fullscreen-overlay-canvas${suffix}.png`)
  await context.close()
}

// Open + ARIA + portal + full-viewport geometry + Escape + restore focus.
{
  const { context, page } = await newPage(1280, 900)
  const t = trigger(page, 'Simple')
  await t.scrollIntoViewIfNeeded()
  await t.click()
  await page.waitForTimeout(500)
  const overlay = page.locator('[data-testid="simple-overlay"]')
  if (!(await overlay.isVisible())) issues.push('[assert] overlay did not open')
  if ((await overlay.getAttribute('role')) !== 'dialog')
    issues.push('[assert] role is not dialog')
  if (!(await overlay.getAttribute('aria-labelledby')))
    issues.push('[assert] aria-labelledby missing')
  if (!(await overlay.evaluate((el) => el.parentElement === document.body)))
    issues.push('[assert] overlay is not portaled to <body>')
  const vp = page.viewportSize()
  const box = await overlay.boundingBox()
  if (
    Math.abs(box.x) > 1 ||
    Math.abs(box.y) > 1 ||
    Math.abs(box.width - vp.width) > 1 ||
    Math.abs(box.height - vp.height) > 1
  )
    issues.push(
      `[assert] overlay is not edge-to-edge full viewport (${JSON.stringify(box)})`,
    )
  await page.screenshot({ path: `${OUT}/fullscreen-overlay-simple.png` })
  console.log(`screenshot: ${OUT}/fullscreen-overlay-simple.png`)
  await page.keyboard.press('Escape')
  await page.waitForTimeout(400)
  if (await overlay.isVisible().catch(() => false))
    issues.push('[assert] Escape did not close')
  if (!(await t.evaluate((el) => el === document.activeElement)))
    issues.push('[assert] focus was not restored to the trigger')
  await context.close()
}

// Sticky header/footer + single scroll region (viewport does not scroll).
{
  const { context, page } = await newPage(1280, 900)
  await open(page, 'Simple')
  const bodyRegion = page.locator('[data-testid="simple-overlay-body"]')
  await bodyRegion.evaluate((el) => {
    el.scrollTop = 500
  })
  await page.waitForTimeout(150)
  const scrolled = await bodyRegion.evaluate((el) => el.scrollTop)
  if (scrolled < 400) issues.push('[assert] body scroll region did not scroll')
  const pageScroll = await page.evaluate(
    () => document.scrollingElement.scrollTop,
  )
  if (pageScroll !== 0)
    issues.push('[assert] the viewport itself scrolled (it must not)')
  const headerVisible = await page
    .locator('[data-testid="simple-overlay-header"]')
    .isVisible()
  const footerVisible = await page
    .locator('[data-testid="simple-overlay-footer"]')
    .isVisible()
  if (!headerVisible) issues.push('[assert] sticky header not visible')
  if (!footerVisible) issues.push('[assert] sticky footer not visible')
  await page.keyboard.press('Escape')
  await context.close()
}

// Optional slots: sidebar + status bar (Program builder) all render.
{
  const { context, page } = await newPage(1280, 900)
  await open(page, 'Program builder')
  for (const slot of ['header', 'sidebar', 'body', 'footer', 'status']) {
    if (
      !(await page
        .locator(`[data-testid="builder-overlay-${slot}"]`)
        .isVisible())
    )
      issues.push(`[assert] builder slot missing: ${slot}`)
  }
  await page.screenshot({ path: `${OUT}/fullscreen-overlay-builder.png` })
  console.log(`screenshot: ${OUT}/fullscreen-overlay-builder.png`)
  await page.keyboard.press('Escape')
  await context.close()
}

// Split view: sidebar + inspector both render, each independent.
{
  const { context, page } = await newPage(1280, 900)
  await open(page, 'Split view')
  if (
    !(await page.locator('[data-testid="split-overlay-sidebar"]').isVisible())
  )
    issues.push('[assert] split view sidebar missing')
  if (
    !(await page.locator('[data-testid="split-overlay-inspector"]').isVisible())
  )
    issues.push('[assert] split view inspector missing')
  await page.screenshot({ path: `${OUT}/fullscreen-overlay-split.png` })
  console.log(`screenshot: ${OUT}/fullscreen-overlay-split.png`)
  await page.keyboard.press('Escape')
  await context.close()
}

// Editor: toolbar + status.
{
  const { context, page } = await newPage(1280, 900)
  await open(page, 'Editor')
  if (
    !(await page.locator('[data-testid="editor-overlay-toolbar"]').isVisible())
  )
    issues.push('[assert] editor toolbar missing')
  await page.screenshot({ path: `${OUT}/fullscreen-overlay-editor.png` })
  console.log(`screenshot: ${OUT}/fullscreen-overlay-editor.png`)
  await page.keyboard.press('Escape')
  await context.close()
}

// AI assistant capture.
{
  const { context, page } = await newPage(1280, 900)
  await open(page, 'AI assistant')
  await page.screenshot({ path: `${OUT}/fullscreen-overlay-ai.png` })
  console.log(`screenshot: ${OUT}/fullscreen-overlay-ai.png`)
  await page.keyboard.press('Escape')
  await context.close()
}

// Loading + disabled.
{
  const { context, page } = await newPage(1280, 900)
  await open(page, 'Loading')
  if (
    !(await page
      .locator(
        '[data-testid="loading-overlay-body"] [role="status"], [data-testid="loading-overlay-body"] svg',
      )
      .first()
      .isVisible())
  )
    issues.push('[assert] loading spinner missing')
  await page.keyboard.press('Escape')
  await page.waitForTimeout(300)
  const dt = trigger(page, 'Disabled')
  await dt.scrollIntoViewIfNeeded()
  await dt.click({ force: true })
  await page.waitForTimeout(300)
  if (
    await page
      .locator('[data-testid="disabled-overlay"]')
      .isVisible()
      .catch(() => false)
  )
    issues.push('[assert] disabled overlay opened')
  await context.close()
}

// Nested: both open, Escape closes the inner one only.
{
  const { context, page } = await newPage(1280, 900)
  await open(page, 'Nested')
  await page.locator('[data-testid="open-inner"]').click()
  await page.waitForTimeout(500)
  const outer = page.locator('[data-testid="outer-overlay"]')
  const inner = page.locator('[data-testid="inner-overlay"]')
  if (!(await outer.isVisible()) || !(await inner.isVisible()))
    issues.push('[assert] nested overlays did not stack')
  await page.keyboard.press('Escape')
  await page.waitForTimeout(400)
  if (await inner.isVisible().catch(() => false))
    issues.push('[assert] Escape did not close the inner overlay')
  if (!(await outer.isVisible()))
    issues.push('[assert] Escape closed the outer overlay too')
  await context.close()
}

// Responsive mobile: still full-viewport, header + footer present.
{
  const { context, page } = await newPage(390, 844)
  await open(page, 'Client creation')
  const overlay = page.locator('[data-testid="client-overlay"]')
  const vp = page.viewportSize()
  const box = await overlay.boundingBox()
  if (
    Math.abs(box.width - vp.width) > 1 ||
    Math.abs(box.height - vp.height) > 1
  )
    issues.push('[assert] mobile overlay is not full viewport')
  await page.screenshot({ path: `${OUT}/fullscreen-overlay-mobile-open.png` })
  console.log(`screenshot: ${OUT}/fullscreen-overlay-mobile-open.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
