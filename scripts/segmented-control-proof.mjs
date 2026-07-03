// SegmentedControl proof: states, sizes, orientation, real examples —
// capture background + rich panel, desktop/tablet/mobile, plus hover,
// keyboard focus + Arrow key move. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/segmented-control`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  return { context, page }
}

for (const [width, height, tones, suffix] of [
  [1280, 1400, ['canvas', 'media'], ''],
  [834, 1400, ['canvas'], '-tablet'],
  [390, 1400, ['canvas'], '-mobile'],
]) {
  const { context, page } = await newPage(width, height)
  for (const tone of tones) {
    const scene = page.locator(`section.proof-${tone}`)
    await scene.scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    await scene.screenshot({
      path: `${OUT}/segmented-control-${tone}${suffix}.png`,
    })
    console.log(`screenshot: ${OUT}/segmented-control-${tone}${suffix}.png`)
  }
  await context.close()
}

// Orientation close-up (horizontal + vertical side by side).
{
  const { context, page } = await newPage(1280, 1400)
  const orientation = page
    .locator('section.proof-canvas')
    .getByText('Orientation', { exact: true })
    .locator('xpath=ancestor::section[1]')
  await orientation.scrollIntoViewIfNeeded()
  await page.waitForTimeout(200)
  await orientation.screenshot({
    path: `${OUT}/segmented-control-orientation.png`,
  })
  console.log(
    `screenshot: ${OUT}/segmented-control-orientation.png (horizontal + vertical)`,
  )
  await context.close()
}

// Hover: a light accent on an unselected, hovered segment.
{
  const { context, page } = await newPage(1280, 900)
  const hoverItem = page.locator(
    'section.proof-canvas [data-testid="hover-item"]',
  )
  await hoverItem.scrollIntoViewIfNeeded()
  await hoverItem.hover()
  await page.waitForTimeout(150)
  await page
    .locator('section.proof-canvas [data-testid="hover-target"]')
    .screenshot({ path: `${OUT}/segmented-control-hover.png` })
  console.log(`screenshot: ${OUT}/segmented-control-hover.png`)
  await context.close()
}

// Keyboard: focus the first segment, then ArrowRight to move + select.
{
  const { context, page } = await newPage(1280, 900)
  const target = page
    .locator('section.proof-canvas [data-testid="focus-target"] [role="radio"]')
    .first()
  await target.evaluate((el) => el.scrollIntoView({ block: 'center' }))
  await page.waitForTimeout(200)
  await target.focus()
  await page.waitForTimeout(150)
  await page.screenshot({ path: `${OUT}/segmented-control-focus.png` })
  console.log(`screenshot: ${OUT}/segmented-control-focus.png (focus ring)`)
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(200)
  await page.screenshot({ path: `${OUT}/segmented-control-keyboard.png` })
  console.log(
    `screenshot: ${OUT}/segmented-control-keyboard.png (ArrowRight moves + selects)`,
  )
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
