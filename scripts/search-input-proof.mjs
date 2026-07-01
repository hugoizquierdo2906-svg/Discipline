// SearchInput proof: every state + the Input→Textarea→SearchInput family, inside a
// GlassPanel, on the standard capture background and a rich panel. Requires dev.
import { mkdirSync } from 'node:fs'

import { chromium } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = 'docs/phase-04-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EXEC })
const context = await browser.newContext({
  viewport: { width: 1100, height: 1000 },
  deviceScaleFactor: 2,
})
const page = await context.newPage()
await page.goto(`${BASE}/dev/search-input`, { waitUntil: 'networkidle' })
await page.locator('input[type="search"]').first().waitFor()
await page.waitForTimeout(500)

for (const tone of ['canvas', 'media']) {
  const scene = page.locator(`section.proof-${tone}`)
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/search-input-${tone}.png` })
  console.log(`screenshot: ${OUT}/search-input-${tone}.png`)
}

await context.close()
await browser.close()
