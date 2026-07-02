// FileInput proof: the whole Control family + every FileInput state (previews,
// progress, validation) on the capture background and a rich panel, at desktop,
// tablet and mobile widths. Requires the dev server on :3000.
import { mkdirSync } from 'node:fs'

import { chromium } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = 'docs/phase-04-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EXEC })
const issues = []

async function capture(width, height, suffixes) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning')
      issues.push(`[${m.type()}] ${m.text()}`)
  })
  page.on('pageerror', (e) => issues.push(`[pageerror] ${e.message}`))
  await page.goto(`${BASE}/dev/file-input`, { waitUntil: 'networkidle' })
  // File rows appear once the demo Files are constructed client-side.
  await page
    .locator('ul[aria-label="Selected files"]')
    .first()
    .waitFor({ state: 'attached' })
  await page.waitForTimeout(600)

  for (const [tone, suffix] of suffixes) {
    const scene = page.locator(`section.proof-${tone}`)
    await scene.scrollIntoViewIfNeeded()
    await page.waitForTimeout(150)
    await scene.screenshot({ path: `${OUT}/file-input-${suffix}.png` })
    console.log(`screenshot: ${OUT}/file-input-${suffix}.png`)
  }
  await context.close()
}

// Desktop: both tones. Tablet/mobile: canvas only (responsive check).
await capture(1100, 1000, [
  ['canvas', 'canvas'],
  ['media', 'media'],
])
await capture(834, 1000, [['canvas', 'tablet']])
await capture(390, 844, [['canvas', 'mobile']])

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
