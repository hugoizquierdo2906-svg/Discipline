// Time Picker proof: states, granularities — capture background + rich
// panel, desktop/tablet/mobile, plus closed/open/selected/keyboard/disabled/
// readonly/error/loading, and hour-only vs hour+minutes granularities.
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
  })
  const page = await context.newPage()
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning')
      issues.push(`[${m.type()}] ${m.text()}`)
  })
  page.on('pageerror', (e) => issues.push(`[pageerror] ${e.message}`))
  await page.goto(`${BASE}/dev/time-picker`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  return { context, page }
}

for (const [width, height, tones, suffix] of [
  [1280, 1900, ['canvas', 'media'], ''],
  [834, 1900, ['canvas'], '-tablet'],
  [390, 1900, ['canvas'], '-mobile'],
]) {
  const { context, page } = await newPage(width, height)
  for (const tone of tones) {
    const scene = page.locator(`section.proof-${tone}`)
    await scene.scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    await scene.screenshot({ path: `${OUT}/time-picker-${tone}${suffix}.png` })
    console.log(`screenshot: ${OUT}/time-picker-${tone}${suffix}.png`)
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
  await states.screenshot({ path: `${OUT}/time-picker-states.png` })
  console.log(`screenshot: ${OUT}/time-picker-states.png`)
  await context.close()
}

// Opened popup.
{
  const { context, page } = await newPage(1280, 1100)
  const scope = page.locator('section.proof-canvas')
  const target = scope.locator('[data-testid="open-target"]')
  await target.scrollIntoViewIfNeeded()
  await target.click()
  await page.waitForTimeout(250)
  await page.screenshot({ path: `${OUT}/time-picker-opened.png` })
  console.log(`screenshot: ${OUT}/time-picker-opened.png`)

  // Assert: clicking hour 09 keeps the popup open (waiting for minute).
  const hourRow = page.locator('[role="listbox"][aria-label="Hour"] button', {
    hasText: /^09$/,
  })
  await hourRow.click()
  await page.waitForTimeout(150)
  const minuteVisible = await page
    .locator('[role="listbox"][aria-label="Minute"]')
    .isVisible()
  if (!minuteVisible)
    issues.push(
      '[assert] popup closed prematurely after selecting only the hour',
    )
  const minuteRow = page.locator(
    '[role="listbox"][aria-label="Minute"] button',
    {
      hasText: /^15$/,
    },
  )
  await minuteRow.click()
  await page.waitForTimeout(150)
  const value = await target.inputValue()
  if (value !== '09:15')
    issues.push(
      `[assert] hour+minute pick produced "${value}", expected "09:15"`,
    )
  await context.close()
}

// Keyboard: type "14:30" + Enter commits without opening the popup pointer.
{
  const { context, page } = await newPage(1280, 900)
  const scope = page.locator('section.proof-canvas')
  const target = scope.locator('[data-testid="closed-target"]')
  await target.scrollIntoViewIfNeeded()
  await target.click()
  await target.fill('14:30')
  await page.keyboard.press('Enter')
  await page.waitForTimeout(150)
  const value = await target.inputValue()
  if (value !== '14:30')
    issues.push(`[assert] typed "14:30" + Enter produced "${value}"`)
  await context.close()
}

// Keyboard: Arrow navigation inside the popup (open, focus hour column,
// move down twice, switch to minutes, move down once, commit).
{
  const { context, page } = await newPage(1280, 1100)
  const scope = page.locator('section.proof-canvas')
  const target = scope.locator('[data-testid="keyboard-target"]')
  await target.scrollIntoViewIfNeeded()
  await target.click()
  await page.waitForTimeout(150)
  await page.keyboard.press('ArrowDown')
  await page.waitForTimeout(150)
  await page.screenshot({ path: `${OUT}/time-picker-keyboard.png` })
  console.log(`screenshot: ${OUT}/time-picker-keyboard.png`)
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  await page.waitForTimeout(150)
  const value = await target.inputValue()
  if (value !== '13:05')
    issues.push(
      `[assert] full keyboard flow produced "${value}", expected "13:05"`,
    )
  await context.close()
}

// Granularities close-up.
{
  const { context, page } = await newPage(1280, 900)
  const section = page
    .locator('section.proof-canvas')
    .getByText('Granularities', { exact: true })
    .locator('xpath=ancestor::section[1]')
  await section.scrollIntoViewIfNeeded()
  await page.waitForTimeout(200)
  await section.screenshot({ path: `${OUT}/time-picker-granularities.png` })
  console.log(`screenshot: ${OUT}/time-picker-granularities.png`)

  // Assert: hour-only granularity closes on a single hour pick.
  const scope = page.locator('section.proof-canvas')
  const hourOnly = scope.locator('[data-testid="hour-only-target"]')
  await hourOnly.click()
  await page.waitForTimeout(150)
  const hourRow = page.locator('[role="listbox"][aria-label="Hour"] button', {
    hasText: /^18$/,
  })
  await hourRow.click()
  await page.waitForTimeout(150)
  const value = await hourOnly.inputValue()
  if (value !== '18:00')
    issues.push(`[assert] hour-only pick produced "${value}", expected "18:00"`)
  const stillOpen = await page
    .locator('[role="listbox"][aria-label="Hour"]')
    .isVisible()
    .catch(() => false)
  if (stillOpen)
    issues.push(
      '[assert] hour-only granularity did not close after picking the hour',
    )
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
