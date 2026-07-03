// Combobox proof: states, real examples — capture background + rich panel,
// desktop/tablet/mobile, plus opened/closed, searching, filtered, no
// result, keyboard navigation. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/combobox`, { waitUntil: 'networkidle' })
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
    await scene.screenshot({ path: `${OUT}/combobox-${tone}${suffix}.png` })
    console.log(`screenshot: ${OUT}/combobox-${tone}${suffix}.png`)
  }
  await context.close()
}

// Closed close-up (isolated States section).
{
  const { context, page } = await newPage(1280, 900)
  const states = page
    .locator('section.proof-canvas')
    .getByText('States', { exact: true })
    .locator('xpath=ancestor::section[1]')
  await states.scrollIntoViewIfNeeded()
  await page.waitForTimeout(200)
  await states.screenshot({ path: `${OUT}/combobox-closed.png` })
  console.log(`screenshot: ${OUT}/combobox-closed.png`)
  await context.close()
}

// Opened + keyboard navigation (focus stays on the input; activedescendant
// moves virtually).
{
  const { context, page } = await newPage(1280, 1100)
  const target = page.locator(
    'section.proof-canvas [data-testid="open-target"]',
  )
  await target.scrollIntoViewIfNeeded()
  await target.click()
  await page.waitForTimeout(250)
  await page.screenshot({ path: `${OUT}/combobox-opened.png` })
  console.log(`screenshot: ${OUT}/combobox-opened.png`)

  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')
  await page.waitForTimeout(150)
  await page.screenshot({ path: `${OUT}/combobox-keyboard.png` })
  console.log(
    `screenshot: ${OUT}/combobox-keyboard.png (ArrowDown x2 moves aria-activedescendant)`,
  )
  await context.close()
}

// Searching + filtered.
{
  const { context, page } = await newPage(1280, 1100)
  const target = page.locator(
    'section.proof-canvas [data-testid="search-target"]',
  )
  await target.scrollIntoViewIfNeeded()
  await target.click()
  await target.fill('g')
  await page.waitForTimeout(200)
  await page.screenshot({ path: `${OUT}/combobox-searching.png` })
  console.log(`screenshot: ${OUT}/combobox-searching.png`)

  await target.fill('ger')
  await page.waitForTimeout(200)
  await page.screenshot({ path: `${OUT}/combobox-filtered.png` })
  console.log(`screenshot: ${OUT}/combobox-filtered.png`)
  await context.close()
}

// No result.
{
  const { context, page } = await newPage(1280, 1100)
  const target = page.locator(
    'section.proof-canvas [data-testid="noresult-target"]',
  )
  await target.scrollIntoViewIfNeeded()
  await target.click()
  await target.fill('xyzxyz')
  await page.waitForTimeout(200)
  await page.screenshot({ path: `${OUT}/combobox-noresult.png` })
  console.log(`screenshot: ${OUT}/combobox-noresult.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
