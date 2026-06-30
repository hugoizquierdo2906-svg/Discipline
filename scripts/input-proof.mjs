// Control Surface (Input) reference: capture the field over a light canvas and
// a dark media panel, plus tight crops. Requires the dev server on :3000.
import { mkdirSync } from 'node:fs'

import { chromium } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const ROUTE = '/dev/input'
const OUT = 'docs/phase-04-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EXEC })
const context = await browser.newContext({
  viewport: { width: 1200, height: 1400 },
  deviceScaleFactor: 2,
})
const page = await context.newPage()
await page.goto(`${BASE}${ROUTE}`, { waitUntil: 'networkidle' })
await page.locator('.ci-field').first().waitFor()
await page.waitForTimeout(400)

await page.screenshot({ path: `${OUT}/input-fullpage.png`, fullPage: true })
console.log(`screenshot: ${OUT}/input-fullpage.png`)

const sections = await page.locator('section').all()
const labels = ['input-light', 'input-dark']
for (let i = 0; i < sections.length; i++) {
  if (!labels[i]) continue
  const box = await sections[i].boundingBox()
  if (!box) continue
  await page.screenshot({
    path: `${OUT}/${labels[i]}.png`,
    clip: { x: box.x, y: box.y, width: box.width, height: box.height },
  })
  console.log(`screenshot: ${OUT}/${labels[i]}.png`)
}

await context.close()
await browser.close()
