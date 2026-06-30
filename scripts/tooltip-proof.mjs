// Floating Surface (Tooltip) reference proof: capture the pane on a light canvas
// and over a rich media panel. Requires the dev server on :3000.
import { mkdirSync } from 'node:fs'

import { chromium } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = 'docs/phase-04-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EXEC })
const context = await browser.newContext({
  viewport: { width: 1100, height: 760 },
  deviceScaleFactor: 3,
})
const page = await context.newPage()
await page.goto(`${BASE}/dev/tooltip`, { waitUntil: 'networkidle' })
await page.locator('.fl-tip').first().waitFor()
await page.waitForTimeout(400)

const labels = ['tooltip-light', 'tooltip-media']
const sections = await page.locator('section').all()
for (let i = 0; i < sections.length; i++) {
  if (!labels[i]) continue
  await sections[i].scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  const box = await sections[i].boundingBox()
  await page.screenshot({
    path: `${OUT}/${labels[i]}.png`,
    clip: { x: box.x, y: box.y, width: box.width, height: box.height },
  })
  console.log(`screenshot: ${OUT}/${labels[i]}.png`)
}

await context.close()
await browser.close()
