// MultiSelect proof: states, real examples — capture background + rich
// panel, desktop/tablet/mobile, plus opened/closed, selection, disabled,
// keyboard navigation. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/multiselect`, { waitUntil: 'networkidle' })
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
    await scene.screenshot({ path: `${OUT}/multiselect-${tone}${suffix}.png` })
    console.log(`screenshot: ${OUT}/multiselect-${tone}${suffix}.png`)
  }
  await context.close()
}

// Closed (isolated, zoomed on the States section) for a clean before/after.
{
  const { context, page } = await newPage(1280, 900)
  const states = page
    .locator('section.proof-canvas')
    .getByText('States', { exact: true })
    .locator('xpath=ancestor::section[1]')
  await states.scrollIntoViewIfNeeded()
  await page.waitForTimeout(200)
  await states.screenshot({ path: `${OUT}/multiselect-closed.png` })
  console.log(`screenshot: ${OUT}/multiselect-closed.png`)
  await context.close()
}

// Opened + focus-on-open + keyboard navigation + selection.
{
  const { context, page } = await newPage(1280, 1100)
  const trigger = page.locator(
    'section.proof-canvas [data-testid="open-target"]',
  )
  await trigger.scrollIntoViewIfNeeded()
  await trigger.click()
  await page.waitForTimeout(250)
  await page.screenshot({ path: `${OUT}/multiselect-opened.png` })
  console.log(`screenshot: ${OUT}/multiselect-opened.png (focus on first row)`)

  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')
  await page.waitForTimeout(150)
  await page.screenshot({ path: `${OUT}/multiselect-keyboard.png` })
  console.log(
    `screenshot: ${OUT}/multiselect-keyboard.png (ArrowDown x2 moves reachability)`,
  )

  await page.keyboard.press('Space')
  await page.waitForTimeout(150)
  await page.screenshot({ path: `${OUT}/multiselect-selection.png` })
  console.log(
    `screenshot: ${OUT}/multiselect-selection.png (Space toggles, stays open)`,
  )

  await page.keyboard.press('Escape')
  await page.waitForTimeout(150)
  await context.close()
}

// Disabled close-up.
{
  const { context, page } = await newPage(1280, 900)
  const disabled = page
    .locator('section.proof-canvas')
    .getByText('Disabled', { exact: true })
    .locator('xpath=following-sibling::*[1]')
  await disabled.scrollIntoViewIfNeeded()
  await page.waitForTimeout(200)
  await disabled.screenshot({ path: `${OUT}/multiselect-disabled.png` })
  console.log(`screenshot: ${OUT}/multiselect-disabled.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
