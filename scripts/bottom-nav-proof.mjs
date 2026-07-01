// BottomNav proof: capture a generic GlassPanel beside the BottomNav
// (floating / attached / inset, mobile frames + desktop) on the standard capture
// background and a rich panel. Requires the dev server on :3000.
import { mkdirSync } from 'node:fs'

import { chromium } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = 'docs/phase-04-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EXEC })
const context = await browser.newContext({
  viewport: { width: 1280, height: 1000 },
  deviceScaleFactor: 2,
})
const page = await context.newPage()
await page.goto(`${BASE}/dev/bottom-nav`, { waitUntil: 'networkidle' })
await page.locator('nav.ds-card').first().waitFor()
await page.waitForTimeout(400)

for (const tone of ['canvas', 'media']) {
  const scene = page.locator(`section.proof-${tone}`)
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/bottom-nav-${tone}.png` })
  console.log(`screenshot: ${OUT}/bottom-nav-${tone}.png`)
}

await context.close()
await browser.close()
