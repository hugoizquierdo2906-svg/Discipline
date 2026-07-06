// Drawer proof: sides, sizes, workspaces, states — capture background +
// rich panel, desktop/mobile, plus programmatic assertions for open/close,
// Escape, overlay dismissal (and closeOnOverlay=false), focus trap,
// restore focus, tab order, internal scroll, sticky header/footer, nested
// drawers, portal, ARIA, every side and every size. Requires the dev
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
  await page.goto(`${BASE}/dev/drawer`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  return { context, page }
}

for (const [width, height, tones, suffix] of [
  [1280, 1600, ['canvas', 'media'], ''],
  [834, 1600, ['canvas'], '-tablet'],
  [390, 1900, ['canvas'], '-mobile'],
]) {
  const { context, page } = await newPage(width, height)
  for (const tone of tones) {
    const scene = page.locator(`section.proof-${tone}`)
    await scene.scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    await scene.screenshot({ path: `${OUT}/drawer-${tone}${suffix}.png` })
    console.log(`screenshot: ${OUT}/drawer-${tone}${suffix}.png`)
  }
  await context.close()
}

// Open + ARIA + portal + focus trap + tab order + overlay + Escape +
// restore focus, on the right drawer.
{
  const { context, page } = await newPage(1280, 900)
  const scope = page.locator('section.proof-canvas')
  const trigger = scope.getByRole('button', { name: 'right', exact: true })
  const drawer = page.locator('[data-testid="right-drawer"]')
  await trigger.scrollIntoViewIfNeeded()
  await trigger.click()
  await page.waitForTimeout(400)
  if (!(await drawer.isVisible())) issues.push('[assert] drawer did not open')
  if ((await drawer.getAttribute('role')) !== 'dialog')
    issues.push('[assert] role is not dialog')
  if ((await drawer.getAttribute('aria-modal')) !== 'true')
    issues.push('[assert] aria-modal missing in modal mode')
  if (!(await drawer.getAttribute('aria-labelledby')))
    issues.push('[assert] aria-labelledby missing')
  if (!(await drawer.getAttribute('aria-describedby')))
    issues.push('[assert] aria-describedby missing')
  const inPortal = await drawer.evaluate(
    (el) => el.parentElement === document.body,
  )
  if (!inPortal) issues.push('[assert] drawer is not portaled to <body>')
  const vp = page.viewportSize()
  const box = await drawer.boundingBox()
  if (Math.abs(box.x + box.width - (vp.width - 8)) > 2)
    issues.push('[assert] right drawer is not anchored to the right edge')
  if (Math.abs(box.height - (vp.height - 16)) > 2)
    issues.push('[assert] right drawer is not full height')
  const inside = () =>
    page.evaluate(() =>
      document
        .querySelector('[data-testid="right-drawer"]')
        ?.contains(document.activeElement),
    )
  if (!(await inside()))
    issues.push('[assert] initial focus is not inside the drawer')
  for (let i = 0; i < 6; i++) await page.keyboard.press('Tab')
  if (!(await inside()))
    issues.push('[assert] focus escaped the trap after tabbing')
  await page.screenshot({ path: `${OUT}/drawer-right-open.png` })
  console.log(`screenshot: ${OUT}/drawer-right-open.png`)
  await page.mouse.click(20, 450)
  await page.waitForTimeout(300)
  if (await drawer.isVisible().catch(() => false))
    issues.push('[assert] overlay click did not close')
  const restored = await trigger.evaluate((el) => el === document.activeElement)
  if (!restored) issues.push('[assert] focus was not restored to the trigger')
  await trigger.click()
  await page.waitForTimeout(300)
  await page.keyboard.press('Escape')
  await page.waitForTimeout(300)
  if (await drawer.isVisible().catch(() => false))
    issues.push('[assert] Escape did not close')
  await context.close()
}

// Every side anchors to its edge.
{
  const { context, page } = await newPage(1280, 900)
  const scope = page.locator('section.proof-canvas')
  const vp = page.viewportSize()
  for (const side of ['left', 'top', 'bottom']) {
    const t = scope.getByRole('button', { name: side, exact: true })
    await t.scrollIntoViewIfNeeded()
    await t.click()
    await page.waitForTimeout(350)
    const b = await page.locator(`[data-testid="${side}-drawer"]`).boundingBox()
    const ok =
      side === 'left'
        ? b.x < 10
        : side === 'top'
          ? b.y < 10
          : Math.abs(b.y + b.height - (vp.height - 8)) < 2
    if (!ok) issues.push(`[assert] ${side} drawer is not anchored to its edge`)
    if (side === 'bottom') {
      await page.screenshot({ path: `${OUT}/drawer-bottom-open.png` })
      console.log(`screenshot: ${OUT}/drawer-bottom-open.png`)
    }
    await page.keyboard.press('Escape')
    await page.waitForTimeout(250)
  }
  await context.close()
}

// Every size, strictly increasing; full spans the viewport minus gutter.
{
  const { context, page } = await newPage(1280, 900)
  const scope = page.locator('section.proof-canvas')
  const widths = {}
  for (const size of ['xs', 'sm', 'md', 'lg', 'xl', 'full']) {
    const t = scope.getByRole('button', { name: size, exact: true })
    await t.scrollIntoViewIfNeeded()
    await t.click()
    await page.waitForTimeout(350)
    const b = await page.locator(`[data-testid="${size}-drawer"]`).boundingBox()
    widths[size] = b.width
    if (size === 'xl') {
      await page.screenshot({ path: `${OUT}/drawer-xl-open.png` })
      console.log(`screenshot: ${OUT}/drawer-xl-open.png`)
    }
    await page.keyboard.press('Escape')
    await page.waitForTimeout(250)
  }
  const ordered =
    widths.xs < widths.sm &&
    widths.sm < widths.md &&
    widths.md < widths.lg &&
    widths.lg < widths.xl &&
    widths.xl < widths.full
  if (!ordered)
    issues.push(`[assert] size scale not increasing: ${JSON.stringify(widths)}`)
  if (Math.abs(widths.full - (1280 - 16)) > 2)
    issues.push('[assert] full size does not span the viewport')
  await context.close()
}

// Internal scroll + sticky header/footer.
{
  const { context, page } = await newPage(1280, 900)
  const scope = page.locator('section.proof-canvas')
  const t = scope.getByRole('button', { name: 'Long content' })
  await t.scrollIntoViewIfNeeded()
  await t.click()
  await page.waitForTimeout(350)
  const body = page.locator('[data-testid="long-drawer-body"]')
  await body.evaluate((el) => {
    el.scrollTop = 500
  })
  await page.waitForTimeout(150)
  const scrolled = await body.evaluate((el) => el.scrollTop)
  if (scrolled < 400)
    issues.push('[assert] internal scroll did not move the body')
  const headerVisible = await page
    .locator('[data-testid="long-drawer"] [id][class*="text-h"]')
    .first()
    .isVisible()
  if (!headerVisible)
    issues.push('[assert] sticky header not visible after scrolling')
  if (!(await page.locator('[data-testid="long-drawer-footer"]').isVisible()))
    issues.push('[assert] sticky footer not visible after scrolling')
  await page.screenshot({ path: `${OUT}/drawer-long-scrolled.png` })
  console.log(`screenshot: ${OUT}/drawer-long-scrolled.png`)
  await page.keyboard.press('Escape')
  await context.close()
}

// closeOnOverlay=false + disabled + loading.
{
  const { context, page } = await newPage(1280, 900)
  const scope = page.locator('section.proof-canvas')
  const noT = scope.getByRole('button', { name: 'No overlay close' })
  await noT.scrollIntoViewIfNeeded()
  await noT.click()
  await page.waitForTimeout(350)
  await page.mouse.click(20, 450)
  await page.waitForTimeout(250)
  if (!(await page.locator('[data-testid="no-overlay-drawer"]').isVisible()))
    issues.push('[assert] closeOnOverlay=false still closed on overlay click')
  await page.keyboard.press('Escape')
  await page.waitForTimeout(250)

  const disT = scope.getByRole('button', { name: 'Disabled', exact: true })
  await disT.scrollIntoViewIfNeeded()
  await disT.click({ force: true })
  await page.waitForTimeout(300)
  if (
    await page
      .locator('[data-testid="disabled-drawer"]')
      .isVisible()
      .catch(() => false)
  )
    issues.push('[assert] disabled drawer opened')

  const loadT = scope.getByRole('button', { name: 'Loading', exact: true })
  await loadT.scrollIntoViewIfNeeded()
  await loadT.click()
  await page.waitForTimeout(350)
  if (!(await page.locator('[data-testid="loading-drawer-body"]').isVisible()))
    issues.push('[assert] loading drawer body missing')
  await page.screenshot({ path: `${OUT}/drawer-loading.png` })
  console.log(`screenshot: ${OUT}/drawer-loading.png`)
  await page.keyboard.press('Escape')
  await context.close()
}

// Nested drawers: both open, Escape closes the top one only.
{
  const { context, page } = await newPage(1280, 900)
  const scope = page.locator('section.proof-canvas')
  const t = scope.getByRole('button', { name: 'Nested' })
  await t.scrollIntoViewIfNeeded()
  await t.click()
  await page.waitForTimeout(350)
  await page.locator('[data-testid="open-inner"]').click()
  await page.waitForTimeout(350)
  const outer = page.locator('[data-testid="outer-drawer"]')
  const inner = page.locator('[data-testid="inner-drawer"]')
  if (!(await outer.isVisible()) || !(await inner.isVisible()))
    issues.push('[assert] nested drawers did not stack')
  await page.screenshot({ path: `${OUT}/drawer-nested.png` })
  console.log(`screenshot: ${OUT}/drawer-nested.png`)
  await page.keyboard.press('Escape')
  await page.waitForTimeout(300)
  if (await inner.isVisible().catch(() => false))
    issues.push('[assert] Escape did not close the inner drawer')
  if (!(await outer.isVisible()))
    issues.push('[assert] Escape closed the outer drawer too')
  await page.keyboard.press('Escape')
  await context.close()
}

// Workspace capture (settings panel with form) + mobile full-width.
{
  const { context, page } = await newPage(1280, 900)
  const scope = page.locator('section.proof-canvas')
  const t = scope.getByRole('button', { name: 'Settings panel' })
  await t.scrollIntoViewIfNeeded()
  await t.click()
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/drawer-settings.png` })
  console.log(`screenshot: ${OUT}/drawer-settings.png`)
  await context.close()
}
{
  const { context, page } = await newPage(390, 844)
  const scope = page.locator('section.proof-canvas')
  const t = scope.getByRole('button', { name: 'Settings panel' })
  await t.scrollIntoViewIfNeeded()
  await t.click()
  await page.waitForTimeout(400)
  const b = await page.locator('[data-testid="settings-drawer"]').boundingBox()
  if (b.width > 390 - 14)
    issues.push('[assert] drawer overflows the mobile viewport')
  await page.screenshot({ path: `${OUT}/drawer-mobile-open.png` })
  console.log(`screenshot: ${OUT}/drawer-mobile-open.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
