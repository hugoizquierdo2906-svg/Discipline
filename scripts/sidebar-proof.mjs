// Sidebar proof: capture a generic GlassPanel beside the Sidebar (expanded +
// collapsed) on the standard capture background and a rich panel. Requires the
// dev server on :3000.
import { mkdirSync } from 'node:fs'

import { chromium } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = 'docs/phase-04-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EXEC })
const context = await browser.newContext({
  viewport: { width: 1200, height: 900 },
  deviceScaleFactor: 2,
})
const page = await context.newPage()
await page.goto(`${BASE}/dev/sidebar`, { waitUntil: 'networkidle' })
await page.locator('aside.ds-card').first().waitFor()
await page.waitForTimeout(400)

for (const tone of ['canvas', 'media']) {
  const scene = page.locator(`section.proof-${tone}`)
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/sidebar-${tone}.png` })
  console.log(`screenshot: ${OUT}/sidebar-${tone}.png`)
}

await context.close()
await browser.close()
