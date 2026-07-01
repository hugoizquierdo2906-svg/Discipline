// DatePicker proof: the Input→Textarea→SearchInput→Select→DatePicker family +
// every DatePicker state (states, min/max bounds, locales, formats) inside a
// GlassPanel, on the capture background and a rich panel; plus one open calendar
// (Floating Surface — month grid, today, selected, disabled bounds). Requires the
// dev server on :3000.
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
const issues = []
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning')
    issues.push(`[${m.type()}] ${m.text()}`)
})
page.on('pageerror', (e) => issues.push(`[pageerror] ${e.message}`))
await page.goto(`${BASE}/dev/date-picker`, { waitUntil: 'networkidle' })
await page.locator('[role="combobox"]').first().waitFor()
await page.waitForTimeout(500)

for (const tone of ['canvas', 'media']) {
  const scene = page.locator(`section.proof-${tone}`)
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/date-picker-${tone}.png` })
  console.log(`screenshot: ${OUT}/date-picker-${tone}.png`)
}

// Open the "Bounded (min → max)" calendar (shows today, selected day, and the
// disabled dates outside the bounds). Portaled — needs a viewport screenshot.
await page.locator('section.proof-canvas').scrollIntoViewIfNeeded()
const trigger = page
  .locator('section.proof-canvas')
  .getByLabel('Bounded (min → max)')
  .first()
await trigger.scrollIntoViewIfNeeded()
await trigger.click()
await page.waitForTimeout(400)
await page.screenshot({ path: `${OUT}/date-picker-open.png` })
console.log(`screenshot: ${OUT}/date-picker-open.png`)

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await context.close()
await browser.close()
