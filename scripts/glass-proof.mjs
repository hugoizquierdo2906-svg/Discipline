// Phase 03 glass reference: capture the Primary reference button over a light
// canvas and a dark media panel. Requires the dev server on :3000.
import { mkdirSync } from 'node:fs'

import { chromium } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const ROUTE = '/dev/glass'
const OUT = 'docs/phase-03-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EXEC })
const context = await browser.newContext({
  viewport: { width: 1200, height: 900 },
  deviceScaleFactor: 2,
})
const page = await context.newPage()
await page.goto(`${BASE}${ROUTE}`, { waitUntil: 'networkidle' })
await page.locator('.gbp').first().waitFor()
await page.waitForTimeout(400)

await page.screenshot({ path: `${OUT}/glass-fullpage.png`, fullPage: true })
console.log(`screenshot: ${OUT}/glass-fullpage.png`)

// Tight crops around each button (button bbox + generous padding).
const buttons = await page.locator('.gbp').all()
const labels = ['glass-light', 'glass-dark']
for (let i = 0; i < buttons.length; i++) {
  const box = await buttons[i].boundingBox()
  if (!box) continue
  const pad = 80
  await page.screenshot({
    path: `${OUT}/${labels[i]}.png`,
    clip: {
      x: Math.max(0, box.x - pad),
      y: Math.max(0, box.y - pad),
      width: box.width + pad * 2,
      height: box.height + pad * 2,
    },
  })
  console.log(`screenshot: ${OUT}/${labels[i]}.png`)
}

await context.close()
await browser.close()
