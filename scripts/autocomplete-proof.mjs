// Autocomplete proof: states, real examples — capture background + rich
// panel, desktop/tablet/mobile, plus opened/closed, typing (matched),
// free-text (unmatched, still accepted), keyboard navigation. Requires the
// dev server on :3000.
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
  await page.goto(`${BASE}/dev/autocomplete`, { waitUntil: 'networkidle' })
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
    await scene.screenshot({ path: `${OUT}/autocomplete-${tone}${suffix}.png` })
    console.log(`screenshot: ${OUT}/autocomplete-${tone}${suffix}.png`)
  }
  await context.close()
}

// Closed close-up.
{
  const { context, page } = await newPage(1280, 900)
  const states = page
    .locator('section.proof-canvas')
    .getByText('States', { exact: true })
    .locator('xpath=ancestor::section[1]')
  await states.scrollIntoViewIfNeeded()
  await page.waitForTimeout(200)
  await states.screenshot({ path: `${OUT}/autocomplete-closed.png` })
  console.log(`screenshot: ${OUT}/autocomplete-closed.png`)
  await context.close()
}

// Opened + keyboard navigation.
{
  const { context, page } = await newPage(1280, 1100)
  const target = page.locator(
    'section.proof-canvas [data-testid="open-target"]',
  )
  await target.scrollIntoViewIfNeeded()
  await target.click()
  await page.waitForTimeout(250)
  await page.screenshot({ path: `${OUT}/autocomplete-opened.png` })
  console.log(`screenshot: ${OUT}/autocomplete-opened.png`)

  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')
  await page.waitForTimeout(150)
  await page.screenshot({ path: `${OUT}/autocomplete-keyboard.png` })
  console.log(`screenshot: ${OUT}/autocomplete-keyboard.png`)
  await context.close()
}

// Typing — suggestions appear, matched.
{
  const { context, page } = await newPage(1280, 1100)
  const target = page.locator(
    'section.proof-canvas [data-testid="typing-target"]',
  )
  await target.scrollIntoViewIfNeeded()
  await target.click()
  await target.fill('Pa')
  await page.waitForTimeout(200)
  await page.screenshot({ path: `${OUT}/autocomplete-typing.png` })
  console.log(`screenshot: ${OUT}/autocomplete-typing.png`)
  await context.close()
}

// Free text — no match, still a valid value (no forced "no results" panel).
{
  const { context, page } = await newPage(1280, 1100)
  const target = page.locator(
    'section.proof-canvas [data-testid="freetext-target"]',
  )
  await target.scrollIntoViewIfNeeded()
  await target.click()
  await target.fill('Nowhereville')
  await page.waitForTimeout(200)
  await page.screenshot({ path: `${OUT}/autocomplete-freetext.png` })
  console.log(`screenshot: ${OUT}/autocomplete-freetext.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
