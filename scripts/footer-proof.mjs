// Footer proof: (1) GlassPanel vs Footer on the standard capture background and a
// rich panel at desktop width; (2) a populated Footer at tablet + mobile widths to
// check responsive spacing. Requires the dev server on :3000.
import { mkdirSync } from 'node:fs'

import { chromium } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = 'docs/phase-04-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EXEC })
const context = await browser.newContext({
  viewport: { width: 1200, height: 1000 },
  deviceScaleFactor: 2,
})
const page = await context.newPage()
await page.goto(`${BASE}/dev/footer`, { waitUntil: 'networkidle' })
await page.locator('footer.ds-card').first().waitFor()
await page.waitForTimeout(400)

// 1) Desktop comparison — GlassPanel vs Footer on both backgrounds.
for (const tone of ['canvas', 'media']) {
  const scene = page.locator(`section.proof-${tone}`)
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/footer-${tone}.png` })
  console.log(`screenshot: ${OUT}/footer-${tone}.png`)
}

// 2) Responsive — same warm page (route already compiled), resize + reload so the
// media queries re-evaluate at the new width, then capture the first Footer.
for (const [label, width] of [
  ['tablet', 820],
  ['mobile', 390],
]) {
  await page.setViewportSize({ width, height: 1200 })
  await page.reload({ waitUntil: 'domcontentloaded' })
  const footer = page.locator('footer.ds-card').first()
  await footer.waitFor({ timeout: 60000 })
  await footer.scrollIntoViewIfNeeded()
  await page.waitForTimeout(400)
  const cols = await footer
    .locator('div.grid')
    .first()
    .evaluate((el) => getComputedStyle(el).gridTemplateColumns)
  const n = cols.split(' ').length
  console.log(`${label} (${width}px): ${n} columns [${cols}]`)
  await footer.screenshot({ path: `${OUT}/footer-${label}.png` })
  console.log(`screenshot: ${OUT}/footer-${label}.png`)
}

await context.close()
await browser.close()
