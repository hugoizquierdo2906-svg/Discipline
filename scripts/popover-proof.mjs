// Popover proof: the FloatingSurface-vs-Popover duo, placements, arrow,
// collision auto-flip, long/interactive content and the Tooltip·Popover·Modal
// hierarchy, on the capture background and a rich panel, at desktop/tablet/
// mobile; plus interactive captures (nested popovers open). Requires the dev
// server on :3000.
import { mkdirSync } from 'node:fs'

import { chromium } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = 'docs/phase-04-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EXEC })
const issues = []

async function newPage(width, height) {
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
  await page.goto(`${BASE}/dev/popover`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  return { context, page }
}

// Full scenes: desktop both tones; tablet/mobile canvas only. Static defaultOpen
// popovers are portaled → capture the viewport-sized page area per scene.
for (const [width, height, tones, suffix] of [
  [1280, 1100, ['canvas', 'media'], ''],
  [834, 1100, ['canvas'], '-tablet'],
  [390, 844, ['canvas'], '-mobile'],
]) {
  const { context, page } = await newPage(width, height)
  for (const tone of tones) {
    const scene = page.locator(`section.proof-${tone}`)
    await scene.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await scene.screenshot({ path: `${OUT}/popover-${tone}${suffix}.png` })
    console.log(`screenshot: ${OUT}/popover-${tone}${suffix}.png`)
  }
  await context.close()
}

// Interactive: open the nested pair on the canvas scene and capture the viewport.
{
  const { context, page } = await newPage(1280, 900)
  const canvas = page.locator('section.proof-canvas')
  await canvas.getByRole('button', { name: 'nested', exact: true }).click()
  await page.waitForTimeout(250)
  await page.getByRole('button', { name: '…opens another' }).click()
  await page.waitForTimeout(350)
  await page.screenshot({ path: `${OUT}/popover-nested.png` })
  console.log(`screenshot: ${OUT}/popover-nested.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
