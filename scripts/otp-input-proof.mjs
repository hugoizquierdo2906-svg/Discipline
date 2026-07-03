// OTP Input proof: states, lengths — capture background + rich panel,
// desktop/tablet/mobile, plus empty/progressive/filled/error/disabled/
// readonly/autofocus, a full-code paste, and 4/6/8-length behavior.
// Requires the dev server on :3000.
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
    permissions: ['clipboard-read', 'clipboard-write'],
  })
  const page = await context.newPage()
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning')
      issues.push(`[${m.type()}] ${m.text()}`)
  })
  page.on('pageerror', (e) => issues.push(`[pageerror] ${e.message}`))
  await page.goto(`${BASE}/dev/otp-input`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  return { context, page }
}

for (const [width, height, tones, suffix] of [
  [1280, 1800, ['canvas', 'media'], ''],
  [834, 1800, ['canvas'], '-tablet'],
  [390, 1800, ['canvas'], '-mobile'],
]) {
  const { context, page } = await newPage(width, height)
  for (const tone of tones) {
    const scene = page.locator(`section.proof-${tone}`)
    await scene.scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    await scene.screenshot({ path: `${OUT}/otp-input-${tone}${suffix}.png` })
    console.log(`screenshot: ${OUT}/otp-input-${tone}${suffix}.png`)
  }
  await context.close()
}

// States close-up.
{
  const { context, page } = await newPage(1280, 1300)
  const states = page
    .locator('section.proof-canvas')
    .getByText('States', { exact: true })
    .locator('xpath=ancestor::section[1]')
  await states.scrollIntoViewIfNeeded()
  await page.waitForTimeout(200)
  await states.screenshot({ path: `${OUT}/otp-input-states.png` })
  console.log(`screenshot: ${OUT}/otp-input-states.png`)
  await context.close()
}

// Progressive typing.
{
  const { context, page } = await newPage(1280, 900)
  const target = page.locator(
    'section.proof-canvas [data-testid="progressive-target-2"]',
  )
  await target.scrollIntoViewIfNeeded()
  await target.click()
  await page.keyboard.type('34')
  await page.waitForTimeout(200)
  await page.screenshot({ path: `${OUT}/otp-input-progressive.png` })
  console.log(`screenshot: ${OUT}/otp-input-progressive.png`)

  // Assert the value: started at "12" (cells 0/1 prefilled), typed "3" into
  // cell 2 then "4" into cell 3, focus should now sit on cell 4.
  const cell4 = page.locator(
    'section.proof-canvas [data-testid="progressive-target-4"]',
  )
  const isFocused = await cell4.evaluate((el) => el === document.activeElement)
  if (!isFocused) issues.push('[assert] auto-advance did not reach cell 4')
  await context.close()
}

// Smart backspace: clear current cell, then move back and clear previous.
{
  const { context, page } = await newPage(1280, 900)
  const scope = page.locator('section.proof-canvas')
  const target = scope.locator('[data-testid="length-4-0"]')
  await target.scrollIntoViewIfNeeded()
  await target.click()
  await page.keyboard.type('12')
  await scope.locator('[data-testid="length-4-1"]').click()
  await page.keyboard.press('Backspace')
  const cell1Value = await scope
    .locator('[data-testid="length-4-1"]')
    .inputValue()
  if (cell1Value !== '')
    issues.push('[assert] backspace did not clear the current cell')
  await page.keyboard.press('Backspace')
  const focusedAfterSecondBackspace = await scope
    .locator('[data-testid="length-4-0"]')
    .evaluate((el) => el === document.activeElement)
  if (!focusedAfterSecondBackspace)
    issues.push('[assert] backspace on an empty cell did not move back')
  await context.close()
}

// Paste a full code.
{
  const { context, page } = await newPage(1280, 1100)
  const scope = page.locator('section.proof-canvas')
  const target = scope.locator('[data-testid="paste-target-0"]')
  await target.scrollIntoViewIfNeeded()
  await target.click()
  await page.evaluate(async () => {
    await navigator.clipboard.writeText('482913')
  })
  await target.press('Control+v')
  await page.waitForTimeout(200)
  const joined = (
    await Promise.all(
      [0, 1, 2, 3, 4, 5].map((i) =>
        scope.locator(`[data-testid="paste-target-${i}"]`).inputValue(),
      ),
    )
  ).join('')
  if (joined !== '482913')
    issues.push(`[assert] paste did not distribute the full code (${joined})`)
  await page.screenshot({ path: `${OUT}/otp-input-paste.png` })
  console.log(`screenshot: ${OUT}/otp-input-paste.png`)
  await context.close()
}

// Lengths.
{
  const { context, page } = await newPage(1280, 900)
  const section = page
    .locator('section.proof-canvas')
    .getByText('Lengths', { exact: true })
    .locator('xpath=ancestor::section[1]')
  await section.scrollIntoViewIfNeeded()
  await page.waitForTimeout(200)
  await section.screenshot({ path: `${OUT}/otp-input-lengths.png` })
  console.log(`screenshot: ${OUT}/otp-input-lengths.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
