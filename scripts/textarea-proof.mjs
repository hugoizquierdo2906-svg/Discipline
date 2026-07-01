// Textarea proof: every state inside a GlassPanel, plus Input↔Textarea comparison,
// on the standard capture background and a rich panel. Requires the dev server.
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
await page.goto(`${BASE}/dev/textarea`, { waitUntil: 'networkidle' })
await page.locator('textarea').first().waitFor()
await page.waitForTimeout(500)

for (const tone of ['canvas', 'media']) {
  const scene = page.locator(`section.proof-${tone}`)
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/textarea-${tone}.png` })
  console.log(`screenshot: ${OUT}/textarea-${tone}.png`)
}

await context.close()
await browser.close()
