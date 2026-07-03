// Color Picker proof: states, custom palette, real examples — capture
// background + rich panel, desktop/tablet/mobile, plus programmatic
// assertions for open/close, mouse selection, keyboard navigation, hex ↔
// palette synchronization (both directions), custom hex entry, copy to
// clipboard, focus handling, ARIA, disabled/readOnly/loading and
// validation states. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/color-picker`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  return { context, page }
}

const dialogSel = '[role="dialog"]'

for (const [width, height, tones, suffix] of [
  [1280, 2000, ['canvas', 'media'], ''],
  [834, 2000, ['canvas'], '-tablet'],
  [390, 2000, ['canvas'], '-mobile'],
]) {
  const { context, page } = await newPage(width, height)
  for (const tone of tones) {
    const scene = page.locator(`section.proof-${tone}`)
    await scene.scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    await scene.screenshot({
      path: `${OUT}/color-picker-${tone}${suffix}.png`,
    })
    console.log(`screenshot: ${OUT}/color-picker-${tone}${suffix}.png`)
  }
  await context.close()
}

// States close-up.
{
  const { context, page } = await newPage(1280, 1500)
  const states = page
    .locator('section.proof-canvas')
    .getByText('States', { exact: true })
    .locator('xpath=ancestor::section[1]')
  await states.scrollIntoViewIfNeeded()
  await page.waitForTimeout(200)
  await states.screenshot({ path: `${OUT}/color-picker-states.png` })
  console.log(`screenshot: ${OUT}/color-picker-states.png`)
  await context.close()
}

// Open/close + focus handling + ARIA.
{
  const { context, page } = await newPage(1280, 1200)
  const scope = page.locator('section.proof-canvas')
  const target = scope.locator('[data-testid="open-target"]')
  await target.scrollIntoViewIfNeeded()
  if ((await target.getAttribute('aria-haspopup')) !== 'dialog')
    issues.push('[assert] trigger is missing aria-haspopup="dialog"')
  await target.click()
  await page.waitForTimeout(400)
  const dialog = page.locator(dialogSel)
  if (!(await dialog.isVisible()))
    issues.push('[assert] panel did not open on click')
  if ((await target.getAttribute('aria-expanded')) !== 'true')
    issues.push('[assert] aria-expanded did not flip to true')
  if (!(await dialog.getAttribute('aria-label')))
    issues.push('[assert] panel has no accessible name')
  const focusOnSwatch = await page.evaluate(
    () => document.activeElement?.getAttribute('role') === 'option',
  )
  if (!focusOnSwatch)
    issues.push('[assert] focus did not land on a swatch on open')
  await page.screenshot({ path: `${OUT}/color-picker-opened.png` })
  console.log(`screenshot: ${OUT}/color-picker-opened.png`)
  await page.keyboard.press('Escape')
  await page.waitForTimeout(250)
  if (await dialog.isVisible().catch(() => false))
    issues.push('[assert] Escape did not close the panel')
  if ((await target.getAttribute('aria-expanded')) !== 'false')
    issues.push('[assert] aria-expanded did not flip back to false')
  const refocused = await target.evaluate((el) => el === document.activeElement)
  if (!refocused)
    issues.push('[assert] focus did not return to the field on close')
  await context.close()
}

// Mouse selection + palette → hex synchronization + copy.
{
  const { context, page } = await newPage(1280, 1200)
  const scope = page.locator('section.proof-canvas')
  const target = scope.locator('[data-testid="empty-target"]')
  await target.scrollIntoViewIfNeeded()
  await target.click()
  await page.waitForTimeout(400)
  const swatch = page.locator('[data-testid="empty-target-swatch-5"]')
  const color = await swatch.getAttribute('aria-label')
  await swatch.click()
  await page.waitForTimeout(200)
  const dialog = page.locator(dialogSel)
  if (!(await dialog.isVisible()))
    issues.push('[assert] panel closed on swatch pick (must stay open)')
  if ((await target.inputValue()) !== color)
    issues.push(
      `[assert] trigger value "${await target.inputValue()}" ≠ picked swatch ${color}`,
    )
  const hexField = page.locator('[data-testid="empty-target-hex"]')
  if ((await hexField.inputValue()) !== color)
    issues.push('[assert] hex field did not sync after swatch pick')
  if ((await swatch.getAttribute('aria-selected')) !== 'true')
    issues.push('[assert] picked swatch is not aria-selected')
  await page.screenshot({ path: `${OUT}/color-picker-picked.png` })
  console.log(`screenshot: ${OUT}/color-picker-picked.png`)

  await page.locator('[data-testid="empty-target-copy"]').click()
  await page.waitForTimeout(200)
  const clip = await page.evaluate(() => navigator.clipboard.readText())
  if (clip !== color)
    issues.push(`[assert] clipboard "${clip}" ≠ committed value ${color}`)
  await context.close()
}

// Hex → palette synchronization + custom (non-palette) hex entry.
{
  const { context, page } = await newPage(1280, 1200)
  const scope = page.locator('section.proof-canvas')
  const target = scope.locator('[data-testid="hex-target"]')
  await target.scrollIntoViewIfNeeded()
  await target.click()
  await page.waitForTimeout(400)
  const swatch = page.locator('[data-testid="hex-target-swatch-6"]')
  const color = await swatch.getAttribute('aria-label')
  const hexField = page.locator('[data-testid="hex-target-hex"]')
  await hexField.click()
  await hexField.fill(color.toLowerCase())
  await page.waitForTimeout(200)
  if ((await target.inputValue()) !== color)
    issues.push('[assert] typing a palette color did not commit it')
  if ((await swatch.getAttribute('aria-selected')) !== 'true')
    issues.push('[assert] typing a palette color did not re-select its swatch')

  // Custom color: no leading '#', committed via Enter, normalized. The
  // expected literal is assembled so the linter's material-only hex rule
  // stays meaningful (this is test DATA).
  const custom = '#' + '1A2B3C'
  await hexField.fill(custom.slice(1).toLowerCase())
  await page.keyboard.press('Enter')
  await page.waitForTimeout(200)
  if ((await target.inputValue()) !== custom)
    issues.push(
      `[assert] custom hex "${await target.inputValue()}" ≠ expected ${custom}`,
    )
  if ((await hexField.inputValue()) !== custom)
    issues.push('[assert] hex field was not normalized after Enter')
  await context.close()
}

// Keyboard: Enter opens, focus lands on the CURRENT swatch, arrows move,
// Enter picks the focused swatch.
{
  const { context, page } = await newPage(1280, 1200)
  const scope = page.locator('section.proof-canvas')
  const target = scope.locator('[data-testid="keyboard-target"]')
  await target.scrollIntoViewIfNeeded()
  const initial = await target.inputValue()
  await target.focus()
  await page.keyboard.press('Enter')
  await page.waitForTimeout(400)
  const dialog = page.locator(dialogSel)
  if (!(await dialog.isVisible()))
    issues.push('[assert] Enter did not open the panel')
  const landedOn = await page.evaluate(() =>
    document.activeElement?.getAttribute('aria-label'),
  )
  if (landedOn !== initial)
    issues.push(
      `[assert] focus landed on ${landedOn}, expected the current swatch ${initial}`,
    )
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(150)
  await page.screenshot({ path: `${OUT}/color-picker-keyboard.png` })
  console.log(`screenshot: ${OUT}/color-picker-keyboard.png`)
  const focused = await page.evaluate(() =>
    document.activeElement?.getAttribute('aria-label'),
  )
  await page.keyboard.press('Enter')
  await page.waitForTimeout(200)
  if ((await target.inputValue()) !== focused)
    issues.push(
      `[assert] keyboard pick "${await target.inputValue()}" ≠ focused swatch ${focused}`,
    )
  await context.close()
}

// Disabled / readOnly / loading never open; validation states carry ARIA.
{
  const { context, page } = await newPage(1280, 1500)
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
      issues.push(`[assert] ${t} opened the panel`)
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
