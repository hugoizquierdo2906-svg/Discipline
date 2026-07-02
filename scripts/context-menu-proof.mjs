// ContextMenu proof: the derivation chain (FloatingSurface · Popover ·
// DropdownMenu · ContextMenu), object zones (image / selected text / file /
// workspace / list / edge), nested submenu, checkbox+radio, long menu and edge
// collision — on the capture background and a rich panel, desktop/tablet/
// mobile; opened by REAL right-clicks (and a dispatched contextmenu on the
// touch viewport for the long-press path). Requires the dev server on :3000.
import { mkdirSync } from 'node:fs'

import { chromium } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = 'docs/phase-04-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EXEC })
const issues = []

async function newPage(width, height, opts = {}) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
    ...opts,
  })
  const page = await context.newPage()
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning')
      issues.push(`[${m.type()}] ${m.text()}`)
  })
  page.on('pageerror', (e) => issues.push(`[pageerror] ${e.message}`))
  await page.goto(`${BASE}/dev/context-menu`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  return { context, page }
}

// Full scenes (trio open, zones closed): desktop both tones; tablet/mobile canvas.
for (const [width, height, tones, suffix] of [
  [1280, 1100, ['canvas', 'media'], ''],
  [834, 1100, ['canvas'], '-tablet'],
  [390, 844, ['canvas'], '-mobile'],
]) {
  const { context, page } = await newPage(width, height)
  for (const tone of tones) {
    const scene = page.locator(`section.proof-${tone}`)
    await scene.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await scene.screenshot({
      path: `${OUT}/context-menu-${tone}${suffix}.png`,
    })
    console.log(`screenshot: ${OUT}/context-menu-${tone}${suffix}.png`)
  }
  await context.close()
}

// Interactive right-clicks on the canvas scene.
{
  const { context, page } = await newPage(1280, 900)
  const canvas = page.locator('section.proof-canvas')

  const shots = [
    ['[data-zone="image"]', 'image'], // label · shortcuts · loading · destructive
    ['[data-zone="workspace"]', 'workspace'], // checkbox + radio
    ['[data-zone="list"]', 'long'], // long scrollable
    ['[data-zone="edge"]', 'collision'], // right-edge collision
  ]
  for (const [selector, suffix] of shots) {
    const zone = canvas.locator(selector)
    await zone.scrollIntoViewIfNeeded()
    await page.waitForTimeout(150)
    await zone.click({ button: 'right' })
    await page.waitForTimeout(400)
    await page.screenshot({ path: `${OUT}/context-menu-${suffix}.png` })
    console.log(`screenshot: ${OUT}/context-menu-${suffix}.png`)
    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)
  }

  // Nested: right-click the file, hover "Export as".
  const file = canvas.locator('[data-zone="file"]')
  await file.scrollIntoViewIfNeeded()
  await file.click({ button: 'right' })
  await page.waitForTimeout(250)
  await page.getByRole('menuitem', { name: 'Export as' }).hover()
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/context-menu-nested.png` })
  console.log(`screenshot: ${OUT}/context-menu-nested.png`)
  await context.close()
}

// Touch viewport — the long-press path resolves to the same contextmenu open;
// dispatch it at the zone (Playwright has no native long-press gesture).
{
  const { context, page } = await newPage(390, 844, { hasTouch: true })
  const zone = page.locator('section.proof-canvas [data-zone="workspace"]')
  await zone.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await zone.dispatchEvent('contextmenu', { bubbles: true })
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/context-menu-touch.png` })
  console.log(`screenshot: ${OUT}/context-menu-touch.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
