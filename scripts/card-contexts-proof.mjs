// Card context demonstration proof: capture the reference Card on five
// backgrounds. Requires the dev server on :3000.
import { mkdirSync } from 'node:fs'

import { chromium } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = 'docs/phase-04-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EXEC })
const context = await browser.newContext({
  viewport: { width: 1100, height: 820 },
  deviceScaleFactor: 2,
})
const page = await context.newPage()
await page.goto(`${BASE}/dev/card-contexts`, { waitUntil: 'networkidle' })
await page.locator('.cd-card').first().waitFor()
await page.waitForTimeout(900) // let the video paint a frame

const labels = ['ctx-white', 'ctx-gradient', 'ctx-image', 'ctx-video', 'ctx-ui']
const sections = await page.locator('section.ctx').all()
for (let i = 0; i < sections.length; i++) {
  if (!labels[i]) continue
  await sections[i].scrollIntoViewIfNeeded()
  await page.waitForTimeout(400)
  const box = await sections[i].boundingBox()
  await page.screenshot({
    path: `${OUT}/${labels[i]}.png`,
    clip: { x: box.x, y: box.y, width: box.width, height: box.height },
  })
  console.log(`screenshot: ${OUT}/${labels[i]}.png`)
}

await context.close()
await browser.close()
