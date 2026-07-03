// Slider proof: states, sizes, orientation, values, real examples — capture
// background + rich panel, desktop/tablet/mobile, plus keyboard focus + arrow
// key move. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/slider`, { waitUntil: 'networkidle' })
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
    await scene.screenshot({ path: `${OUT}/slider-${tone}${suffix}.png` })
    console.log(`screenshot: ${OUT}/slider-${tone}${suffix}.png`)
  }
  await context.close()
}

// Orientation close-ups (horizontal row + vertical row) on the canvas scene.
{
  const { context, page } = await newPage(1280, 1400)
  const horizontal = page
    .locator('section.proof-canvas')
    .getByText('Horizontal', { exact: true })
    .locator('xpath=ancestor::section[1]')
  await horizontal.scrollIntoViewIfNeeded()
  await page.waitForTimeout(200)
  await horizontal.screenshot({ path: `${OUT}/slider-orientation.png` })
  console.log(
    `screenshot: ${OUT}/slider-orientation.png (horizontal + vertical)`,
  )
  await context.close()
}

// Keyboard: focus the labeled target, then ArrowRight ×3 to move the value.
{
  const { context, page } = await newPage(1280, 900)
  const target = page
    .locator(
      'section.proof-canvas [data-testid="focus-target"] [role="slider"]',
    )
    .first()
  await target.evaluate((el) => el.scrollIntoView({ block: 'center' }))
  await page.waitForTimeout(200)
  await target.focus()
  await page.waitForTimeout(150)
  await page.screenshot({ path: `${OUT}/slider-focus.png` })
  console.log(`screenshot: ${OUT}/slider-focus.png (focus ring)`)
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(200)
  await page.screenshot({ path: `${OUT}/slider-keyboard.png` })
  console.log(`screenshot: ${OUT}/slider-keyboard.png (ArrowRight ×3)`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
