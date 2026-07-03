// Alert Dialog proof: variants, states, sizes — capture background + rich
// panel, desktop/mobile, plus programmatic assertions for open/close,
// Escape, Cancel click, Confirm click, initial focus (on Cancel), focus
// trap, TAB order, focus return, outside-click NON-dismissal, ARIA
// (role=alertdialog, aria-modal, labelledby/describedby), variants,
// loading (all dismissal paths locked) and disabled. Requires the dev
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
  await page.goto(`${BASE}/dev/alert-dialog`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  return { context, page }
}

for (const [width, height, tones, suffix] of [
  [1280, 1400, ['canvas', 'media'], ''],
  [834, 1400, ['canvas'], '-tablet'],
  [390, 1600, ['canvas'], '-mobile'],
]) {
  const { context, page } = await newPage(width, height)
  for (const tone of tones) {
    const scene = page.locator(`section.proof-${tone}`)
    await scene.scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    await scene.screenshot({
      path: `${OUT}/alert-dialog-${tone}${suffix}.png`,
    })
    console.log(`screenshot: ${OUT}/alert-dialog-${tone}${suffix}.png`)
  }
  await context.close()
}

// Open + ARIA + initial focus + TAB order + focus trap + outside click +
// Escape + focus return.
{
  const { context, page } = await newPage(1280, 1000)
  const scope = page.locator('section.proof-canvas')
  const trigger = scope.getByRole('button', { name: 'Publish program' })
  const dialog = page.locator('[data-testid="neutral-dialog"]')
  await trigger.scrollIntoViewIfNeeded()
  await trigger.click()
  await page.waitForTimeout(400)
  if (!(await dialog.isVisible()))
    issues.push('[assert] dialog did not open from the trigger')
  if ((await dialog.getAttribute('role')) !== 'alertdialog')
    issues.push('[assert] role is not alertdialog')
  if ((await dialog.getAttribute('aria-modal')) !== 'true')
    issues.push('[assert] aria-modal is not true')
  if (!(await dialog.getAttribute('aria-labelledby')))
    issues.push('[assert] aria-labelledby missing')
  if (!(await dialog.getAttribute('aria-describedby')))
    issues.push('[assert] aria-describedby missing')
  const active = () => page.evaluate(() => document.activeElement?.textContent)
  if ((await active()) !== 'Cancel')
    issues.push(
      `[assert] initial focus on "${await active()}", expected Cancel`,
    )
  await page.keyboard.press('Tab')
  if ((await active()) !== 'Publish')
    issues.push('[assert] Tab did not move to Confirm')
  await page.keyboard.press('Tab')
  if ((await active()) !== 'Cancel')
    issues.push('[assert] focus trap did not wrap back to Cancel')
  await page.keyboard.press('Shift+Tab')
  if ((await active()) !== 'Publish')
    issues.push('[assert] Shift+Tab did not wrap back to Confirm')
  await page.screenshot({ path: `${OUT}/alert-dialog-neutral.png` })
  console.log(`screenshot: ${OUT}/alert-dialog-neutral.png`)
  await page.mouse.click(20, 20)
  await page.waitForTimeout(250)
  if (!(await dialog.isVisible()))
    issues.push('[assert] outside click dismissed the alert (it must not)')
  await page.keyboard.press('Escape')
  await page.waitForTimeout(300)
  if (await dialog.isVisible().catch(() => false))
    issues.push('[assert] Escape did not close')
  const refocused = await trigger.evaluate(
    (el) => el === document.activeElement,
  )
  if (!refocused)
    issues.push('[assert] focus did not return to the trigger on close')
  await context.close()
}

// Cancel click, Confirm click (uncontrolled closes itself), callbacks.
{
  const { context, page } = await newPage(1280, 1000)
  const scope = page.locator('section.proof-canvas')
  const trigger = scope.getByRole('button', { name: 'Publish program' })
  const dialog = page.locator('[data-testid="neutral-dialog"]')
  const last = scope.locator('[data-testid="last-action"]')
  await trigger.scrollIntoViewIfNeeded()
  await trigger.click()
  await page.waitForTimeout(300)
  await page.locator('[data-testid="neutral-dialog-cancel"]').click()
  await page.waitForTimeout(300)
  if (await dialog.isVisible().catch(() => false))
    issues.push('[assert] Cancel did not close')
  if ((await last.textContent()) !== 'cancelled')
    issues.push('[assert] onCancel did not fire')
  await trigger.click()
  await page.waitForTimeout(300)
  await page.locator('[data-testid="neutral-dialog-confirm"]').click()
  await page.waitForTimeout(300)
  if (await dialog.isVisible().catch(() => false))
    issues.push('[assert] Confirm did not close')
  if ((await last.textContent()) !== 'confirmed')
    issues.push('[assert] onConfirm did not fire')
  await context.close()
}

// Destructive variant capture + the frozen destructive Button.
{
  const { context, page } = await newPage(1280, 1000)
  const scope = page.locator('section.proof-canvas')
  const trigger = scope.getByRole('button', { name: 'Delete client' })
  await trigger.scrollIntoViewIfNeeded()
  await trigger.click()
  await page.waitForTimeout(400)
  const confirm = page.locator('[data-testid="destructive-dialog-confirm"]')
  if ((await confirm.getAttribute('data-glass-variant')) !== 'destructive')
    issues.push(
      '[assert] destructive variant does not use the frozen destructive Button',
    )
  await page.screenshot({ path: `${OUT}/alert-dialog-destructive.png` })
  console.log(`screenshot: ${OUT}/alert-dialog-destructive.png`)
  await page.keyboard.press('Escape')
  await context.close()
}

// Long content capture.
{
  const { context, page } = await newPage(1280, 1000)
  const scope = page.locator('section.proof-canvas')
  const trigger = scope.getByRole('button', { name: 'Long content' })
  await trigger.scrollIntoViewIfNeeded()
  await trigger.click()
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/alert-dialog-long.png` })
  console.log(`screenshot: ${OUT}/alert-dialog-long.png`)
  await page.keyboard.press('Escape')
  await context.close()
}

// Loading: every dismissal path locked while the action is in flight,
// closes when the async action completes.
{
  const { context, page } = await newPage(1280, 1000)
  const scope = page.locator('section.proof-canvas')
  const trigger = scope.getByRole('button', { name: 'Delete with loading' })
  const dialog = page.locator('[data-testid="loading-dialog"]')
  await trigger.scrollIntoViewIfNeeded()
  await trigger.click()
  await page.waitForTimeout(300)
  await page.locator('[data-testid="loading-dialog-confirm"]').click()
  await page.waitForTimeout(150)
  const confirm = page.locator('[data-testid="loading-dialog-confirm"]')
  if ((await confirm.getAttribute('aria-busy')) !== 'true')
    issues.push('[assert] confirm is not aria-busy while loading')
  if (
    !(await page.locator('[data-testid="loading-dialog-cancel"]').isDisabled())
  )
    issues.push('[assert] cancel is not disabled while loading')
  // Escape lock is asserted BEFORE the (slow, 2x-scale) screenshot so the
  // demo's 1.5s simulated action cannot complete in between.
  await page.keyboard.press('Escape')
  await page.waitForTimeout(100)
  if (!(await dialog.isVisible()))
    issues.push(
      '[assert] Escape closed the dialog while loading (must be locked)',
    )
  await page.screenshot({ path: `${OUT}/alert-dialog-loading.png` })
  console.log(`screenshot: ${OUT}/alert-dialog-loading.png`)
  await dialog.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {
    issues.push(
      '[assert] dialog did not close after the async action completed',
    )
  })
  await context.close()
}

// Disabled confirm.
{
  const { context, page } = await newPage(1280, 1000)
  const scope = page.locator('section.proof-canvas')
  const trigger = scope.getByRole('button', { name: 'Disabled confirm' })
  await trigger.scrollIntoViewIfNeeded()
  await trigger.click()
  await page.waitForTimeout(300)
  if (
    !(await page
      .locator('[data-testid="disabled-dialog-confirm"]')
      .isDisabled())
  )
    issues.push('[assert] confirm is not disabled')
  await page.keyboard.press('Escape')
  await context.close()
}

// Sizes.
{
  const { context, page } = await newPage(1280, 1000)
  const scope = page.locator('section.proof-canvas')
  const widths = {}
  for (const [name, key] of [
    ['Small', 'sm'],
    ['Medium', 'md'],
    ['Large', 'lg'],
  ]) {
    const trigger = scope.getByRole('button', { name, exact: true })
    await trigger.scrollIntoViewIfNeeded()
    await trigger.click()
    await page.waitForTimeout(350)
    const dialog = page.locator(`[data-testid="${key}-dialog"]`)
    const box = await dialog.boundingBox()
    widths[key] = box?.width ?? 0
    if (key === 'lg') {
      await page.screenshot({ path: `${OUT}/alert-dialog-sizes.png` })
      console.log(`screenshot: ${OUT}/alert-dialog-sizes.png`)
    }
    await page.keyboard.press('Escape')
    await page.waitForTimeout(250)
  }
  if (!(widths.sm < widths.md && widths.md < widths.lg))
    issues.push(
      `[assert] size scale not increasing: sm=${widths.sm} md=${widths.md} lg=${widths.lg}`,
    )
  await context.close()
}

// Mobile with a dialog open.
{
  const { context, page } = await newPage(390, 900)
  const scope = page.locator('section.proof-canvas')
  const trigger = scope.getByRole('button', { name: 'Delete client' })
  await trigger.scrollIntoViewIfNeeded()
  await trigger.click()
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/alert-dialog-mobile-open.png` })
  console.log(`screenshot: ${OUT}/alert-dialog-mobile-open.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
