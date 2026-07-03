// Date Range Picker proof: states, bounds, real examples — capture
// background + rich panel, desktop/tablet/mobile, plus programmatic
// assertions for open/close, start/end selection, inversion (end picked
// before start), keyboard navigation, month navigation, focus handling,
// ARIA, disabled/readOnly/loading and validation states. Requires the dev
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
  await page.goto(`${BASE}/dev/date-range-picker`, {
    waitUntil: 'networkidle',
  })
  await page.waitForTimeout(500)
  return { context, page }
}

function day(page, n) {
  return page.locator('td.rdp-day:not(.rdp-outside) button', {
    hasText: new RegExp(`^${n}$`),
  })
}

const dialogSel = '[role="dialog"].ds-datepicker-content'

for (const [width, height, tones, suffix] of [
  [1280, 2200, ['canvas', 'media'], ''],
  [834, 2200, ['canvas'], '-tablet'],
  [390, 2200, ['canvas'], '-mobile'],
]) {
  const { context, page } = await newPage(width, height)
  for (const tone of tones) {
    const scene = page.locator(`section.proof-${tone}`)
    await scene.scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    await scene.screenshot({
      path: `${OUT}/date-range-picker-${tone}${suffix}.png`,
    })
    console.log(`screenshot: ${OUT}/date-range-picker-${tone}${suffix}.png`)
  }
  await context.close()
}

// States close-up.
{
  const { context, page } = await newPage(1280, 1600)
  const states = page
    .locator('section.proof-canvas')
    .getByText('States', { exact: true })
    .locator('xpath=ancestor::section[1]')
  await states.scrollIntoViewIfNeeded()
  await page.waitForTimeout(200)
  await states.screenshot({ path: `${OUT}/date-range-picker-states.png` })
  console.log(`screenshot: ${OUT}/date-range-picker-states.png`)
  await context.close()
}

// Open (with a complete range band) + open/close + focus + ARIA.
{
  const { context, page } = await newPage(1280, 1200)
  const scope = page.locator('section.proof-canvas')
  const target = scope.locator('[data-testid="open-target"]')
  await target.scrollIntoViewIfNeeded()
  if ((await target.getAttribute('aria-haspopup')) !== 'dialog')
    issues.push('[assert] trigger is missing aria-haspopup="dialog"')
  await target.click()
  await page.waitForTimeout(350)
  const dialog = page.locator(dialogSel)
  if (!(await dialog.isVisible()))
    issues.push('[assert] dialog did not open on click')
  if ((await target.getAttribute('aria-expanded')) !== 'true')
    issues.push('[assert] aria-expanded did not flip to true')
  if (!(await dialog.getAttribute('aria-label')))
    issues.push('[assert] dialog has no accessible name')
  await page.screenshot({ path: `${OUT}/date-range-picker-opened.png` })
  console.log(`screenshot: ${OUT}/date-range-picker-opened.png`)
  await page.keyboard.press('Escape')
  await page.waitForTimeout(250)
  if (await dialog.isVisible().catch(() => false))
    issues.push('[assert] Escape did not close the dialog')
  if ((await target.getAttribute('aria-expanded')) !== 'false')
    issues.push('[assert] aria-expanded did not flip back to false')
  const refocused = await target.evaluate((el) => el === document.activeElement)
  if (!refocused)
    issues.push('[assert] focus did not return to the field on close')
  await context.close()
}

// Start pick (stays open, partial display) then end pick (closes).
{
  const { context, page } = await newPage(1280, 1200)
  const scope = page.locator('section.proof-canvas')
  const target = scope.locator('[data-testid="empty-target"]')
  await target.scrollIntoViewIfNeeded()
  await target.click()
  await page.waitForTimeout(350)
  await day(page, 10).click()
  await page.waitForTimeout(200)
  const dialog = page.locator(dialogSel)
  if (!(await dialog.isVisible()))
    issues.push('[assert] dialog closed prematurely after the start pick')
  const partial = await target.inputValue()
  if (!partial.includes('10') || !partial.includes('…'))
    issues.push(`[assert] partial display wrong: "${partial}"`)
  await page.screenshot({ path: `${OUT}/date-range-picker-partial.png` })
  console.log(`screenshot: ${OUT}/date-range-picker-partial.png`)
  await day(page, 15).click()
  await page.waitForTimeout(250)
  if (await dialog.isVisible().catch(() => false))
    issues.push('[assert] dialog did not close after the end pick')
  const complete = await target.inputValue()
  if (!complete.includes('10') || !complete.includes('15'))
    issues.push(`[assert] complete display wrong: "${complete}"`)
  await context.close()
}

// Inversion: end picked BEFORE the start swaps into place.
{
  const { context, page } = await newPage(1280, 1200)
  const scope = page.locator('section.proof-canvas')
  const target = scope.locator('[data-testid="inversion-target"]')
  await target.scrollIntoViewIfNeeded()
  await target.click()
  await page.waitForTimeout(350)
  await day(page, 20).click()
  await page.waitForTimeout(150)
  await day(page, 12).click()
  await page.waitForTimeout(250)
  const v = await target.inputValue()
  if (!(
    v.includes('12') &&
    v.includes('20') &&
    v.indexOf('12') < v.indexOf('20')
  ))
    issues.push(`[assert] inversion not normalized: "${v}"`)
  await context.close()
}

// Keyboard: Enter opens, focus lands in the grid, arrows move, Enter
// anchors the end, dialog closes.
{
  const { context, page } = await newPage(1280, 1200)
  const scope = page.locator('section.proof-canvas')
  const target = scope.locator('[data-testid="keyboard-target"]')
  await target.scrollIntoViewIfNeeded()
  await target.focus()
  await page.keyboard.press('Enter')
  await page.waitForTimeout(350)
  const dialog = page.locator(dialogSel)
  if (!(await dialog.isVisible()))
    issues.push('[assert] Enter did not open the dialog')
  const focusInGrid = await page.evaluate(() =>
    document.activeElement?.classList.contains('rdp-day_button'),
  )
  if (!focusInGrid)
    issues.push('[assert] focus did not land on a day button in the grid')
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(150)
  await page.screenshot({ path: `${OUT}/date-range-picker-keyboard.png` })
  console.log(`screenshot: ${OUT}/date-range-picker-keyboard.png`)
  await page.keyboard.press('Enter')
  await page.waitForTimeout(250)
  const v = await target.inputValue()
  if (!v.includes('10') || !v.includes('12'))
    issues.push(`[assert] keyboard selection wrong: "${v}"`)
  if (await dialog.isVisible().catch(() => false))
    issues.push('[assert] dialog did not close after keyboard end pick')
  await context.close()
}

// Month navigation.
{
  const { context, page } = await newPage(1280, 1200)
  const scope = page.locator('section.proof-canvas')
  const target = scope.locator('[data-testid="month-target"]')
  await target.scrollIntoViewIfNeeded()
  await target.click()
  await page.waitForTimeout(350)
  const caption = page.locator('.rdp-month_caption')
  const before = (await caption.textContent())?.trim()
  await page.locator('.rdp-button_next').click()
  await page.waitForTimeout(200)
  const after = (await caption.textContent())?.trim()
  if (!before || !after || before === after)
    issues.push(
      `[assert] month navigation did not change the caption (${before} → ${after})`,
    )
  await context.close()
}

// Disabled / readOnly / loading never open; validation states carry ARIA.
{
  const { context, page } = await newPage(1280, 1600)
  const scope = page.locator('section.proof-canvas')
  for (const t of ['disabled-target', 'readonly-target', 'loading-target']) {
    const el = scope.locator(`[data-testid="${t}"]`)
    await el.scrollIntoViewIfNeeded()
    await el.click({ force: true })
    await page.waitForTimeout(250)
    if (
      await page
        .locator(dialogSel)
        .isVisible()
        .catch(() => false)
    )
      issues.push(`[assert] ${t} opened the dialog`)
  }
  for (const t of ['invalid-target', 'error-target']) {
    const el = scope.locator(`[data-testid="${t}"]`)
    if ((await el.getAttribute('aria-invalid')) !== 'true')
      issues.push(`[assert] ${t} is missing aria-invalid`)
  }
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
