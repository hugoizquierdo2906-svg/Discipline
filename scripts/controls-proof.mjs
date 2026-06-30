// Control Surface family proof: capture the generalized family on a light canvas
// and a dark media panel, plus a Select-open shot. Requires dev server on :3000.
import { mkdirSync } from 'node:fs'

import { chromium } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = 'docs/phase-04-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EXEC })
const context = await browser.newContext({
  viewport: { width: 1100, height: 1500 },
  deviceScaleFactor: 2,
})
const page = await context.newPage()
await page.goto(`${BASE}/dev/controls`, { waitUntil: 'networkidle' })
await page.locator('.ds-control').first().waitFor()
await page.waitForTimeout(400)

const sections = await page.locator('section').all()
const labels = ['controls-light', 'controls-dark']
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
