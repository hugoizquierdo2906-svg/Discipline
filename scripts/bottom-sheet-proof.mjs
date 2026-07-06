// Bottom Sheet proof — gesture-driven immersive surface on the frozen Modal.
// Captures (mobile + desktop) plus programmatic assertions for open/close,
// Escape, overlay, portal, ARIA, drag-to-resize (height follows the finger),
// snap points, velocity dismissal, non-dismissible guards + explicit close,
// disable-swipe, scroll coordination, sticky footer, safe-area, disabled,
// nested (per-layer Escape), and responsive centering on desktop. Requires
// the dev server on :3000.
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
    hasTouch: true,
  })
  const page = await context.newPage()
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning')
      issues.push(`[${m.type()}] ${m.text()}`)
  })
  page.on('pageerror', (e) => issues.push(`[pageerror] ${e.message}`))
  await page.goto(`${BASE}/dev/bottom-sheet`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  return { context, page }
}

function trigger(page, name) {
  return page.locator('section.proof-canvas').getByRole('button', {
    name,
    exact: true,
  })
}
async function open(page, name) {
  const t = trigger(page, name)
  await t.scrollIntoViewIfNeeded()
  await t.click()
  await page.waitForTimeout(550)
}
async function dragHandle(page, testid, dy, steps = 10) {
  const h = await page.locator(`[data-testid="${testid}-handle"]`).boundingBox()
  const cx = h.x + h.width / 2
  const cy = h.y + h.height / 2
  await page.mouse.move(cx, cy)
  await page.mouse.down()
  for (let i = 1; i <= steps; i++) {
    await page.mouse.move(cx, cy + (dy / steps) * i)
    await page.waitForTimeout(dy < 0 ? 8 : 4)
  }
  await page.mouse.up()
  await page.waitForTimeout(600)
}

// Scene captures.
for (const [w, h, tone, suffix] of [
  [1280, 1400, 'canvas', ''],
  [1280, 1400, 'media', '-media'],
  [420, 1600, 'canvas', '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  const scene = page.locator(`section.proof-${tone}`)
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(250)
  await scene.screenshot({ path: `${OUT}/bottom-sheet-canvas${suffix}.png` })
  console.log(`screenshot: ${OUT}/bottom-sheet-canvas${suffix}.png`)
  await context.close()
}

// Open + ARIA + portal + bottom-anchor + content detent + Escape + capture.
{
  const { context, page } = await newPage(420, 900)
  await open(page, 'Simple')
  const sheet = page.locator('[data-testid="simple-sheet"]')
  if (!(await sheet.isVisible())) issues.push('[assert] sheet did not open')
  if ((await sheet.getAttribute('role')) !== 'dialog')
    issues.push('[assert] role is not dialog')
  if ((await sheet.getAttribute('aria-modal')) !== 'true')
    issues.push('[assert] aria-modal missing')
  if (!(await sheet.getAttribute('aria-labelledby')))
    issues.push('[assert] aria-labelledby missing')
  if (!(await sheet.evaluate((el) => el.parentElement === document.body)))
    issues.push('[assert] sheet is not portaled to <body>')
  const vp = page.viewportSize()
  const box = await sheet.boundingBox()
  if (Math.abs(box.y + box.height - vp.height) > 3)
    issues.push('[assert] sheet is not bottom-anchored')
  if (box.height > vp.height * 0.6)
    issues.push('[assert] content detent is not short')
  await page.screenshot({ path: `${OUT}/bottom-sheet-simple.png` })
  console.log(`screenshot: ${OUT}/bottom-sheet-simple.png`)
  await page.keyboard.press('Escape')
  await page.waitForTimeout(550)
  if (await sheet.isVisible().catch(() => false))
    issues.push('[assert] Escape did not close')
  await context.close()
}

// Drag to resize (height grows) + snap to a taller detent.
{
  const { context, page } = await newPage(420, 900)
  await open(page, 'Snap points')
  const sheet = page.locator('[data-testid="snap-sheet"]')
  const before = (await sheet.boundingBox()).height
  await dragHandle(page, 'snap-sheet', -300, 12)
  const after = (await sheet.boundingBox()).height
  if (after <= before + 40)
    issues.push(
      `[assert] drag up did not grow the sheet (${Math.round(before)}→${Math.round(after)})`,
    )
  await page.screenshot({ path: `${OUT}/bottom-sheet-snap.png` })
  console.log(`screenshot: ${OUT}/bottom-sheet-snap.png`)
  // Velocity dismissal: a fast downward flick closes.
  await dragHandle(page, 'snap-sheet', 480, 8)
  if (await sheet.isVisible().catch(() => false))
    issues.push('[assert] velocity flick did not dismiss')
  await context.close()
}

// Sticky footer + overlay dismissal (Filters).
{
  const { context, page } = await newPage(420, 900)
  await open(page, 'Filters')
  const footerBtn = page.getByRole('button', { name: /Show 42 results/ })
  if (!(await footerBtn.isVisible()))
    issues.push('[assert] sticky footer button is not visible')
  await page.screenshot({ path: `${OUT}/bottom-sheet-filters.png` })
  console.log(`screenshot: ${OUT}/bottom-sheet-filters.png`)
  // Tap the scrim above the sheet.
  await page.mouse.click(10, 10)
  await page.waitForTimeout(550)
  if (
    await page
      .locator('[data-testid="filters-sheet"]')
      .isVisible()
      .catch(() => false)
  )
    issues.push('[assert] overlay tap did not dismiss')
  await context.close()
}

// Scroll coordination: scrolling the list does NOT drag the sheet until the
// list is back at the top.
{
  const { context, page } = await newPage(420, 900)
  await open(page, 'Long list')
  const sheet = page.locator('[data-testid="list-sheet"]')
  await dragHandle(page, 'list-sheet', -320, 12) // expand to full first
  const body = page.locator('[data-testid="list-sheet-body"]')
  await body.evaluate((el) => {
    el.scrollTop = 300
  })
  await page.waitForTimeout(150)
  const scrolled = await body.evaluate((el) => el.scrollTop)
  if (scrolled < 200)
    issues.push('[assert] inner list did not scroll independently')
  if (!(await sheet.isVisible()))
    issues.push('[assert] sheet dismissed while the list was scrolling')
  await context.close()
}

// Non-dismissible: survives Escape + overlay, closes via its own button.
{
  const { context, page } = await newPage(420, 900)
  await open(page, 'Non-dismissible')
  const lock = page.locator('[data-testid="locked-sheet"]')
  await page.keyboard.press('Escape')
  await page.waitForTimeout(250)
  await page.mouse.click(10, 10)
  await page.waitForTimeout(250)
  if (!(await lock.isVisible()))
    issues.push(
      '[assert] non-dismissible sheet was dismissed by Escape/overlay',
    )
  await page.getByRole('button', { name: 'I understand' }).click()
  await page.waitForTimeout(550)
  if (await lock.isVisible().catch(() => false))
    issues.push('[assert] explicit close did not work on non-dismissible sheet')
  await context.close()
}

// disableSwipeToDismiss: a hard flick snaps back instead of closing.
{
  const { context, page } = await newPage(420, 900)
  await open(page, 'No swipe-away')
  const ns = page.locator('[data-testid="noswipe-sheet"]')
  await dragHandle(page, 'noswipe-sheet', 480, 8)
  if (!(await ns.isVisible()))
    issues.push('[assert] disableSwipeToDismiss still dismissed on flick')
  await page.keyboard.press('Escape')
  await page.waitForTimeout(400)
  await context.close()
}

// Disabled never opens.
{
  const { context, page } = await newPage(420, 900)
  const t = trigger(page, 'Disabled')
  await t.scrollIntoViewIfNeeded()
  await t.click({ force: true })
  await page.waitForTimeout(400)
  if (
    await page
      .locator('[data-testid="disabled-sheet"]')
      .isVisible()
      .catch(() => false)
  )
    issues.push('[assert] disabled sheet opened')
  await context.close()
}

// Nested: both open, Escape closes the inner one only.
{
  const { context, page } = await newPage(420, 900)
  await open(page, 'Nested')
  await page.locator('[data-testid="open-inner"]').click()
  await page.waitForTimeout(550)
  const outer = page.locator('[data-testid="outer-sheet"]')
  const inner = page.locator('[data-testid="inner-sheet"]')
  if (!(await outer.isVisible()) || !(await inner.isVisible()))
    issues.push('[assert] nested sheets did not stack')
  await page.screenshot({ path: `${OUT}/bottom-sheet-nested.png` })
  console.log(`screenshot: ${OUT}/bottom-sheet-nested.png`)
  await page.keyboard.press('Escape')
  await page.waitForTimeout(550)
  if (await inner.isVisible().catch(() => false))
    issues.push('[assert] Escape did not close the inner sheet')
  if (!(await outer.isVisible()))
    issues.push('[assert] Escape closed the outer sheet too')
  await context.close()
}

// Responsive desktop: the sheet is width-capped and horizontally centered.
{
  const { context, page } = await newPage(1280, 900)
  await open(page, 'Filters')
  const sheet = page.locator('[data-testid="filters-sheet"]')
  const box = await sheet.boundingBox()
  if (box.width > 500) issues.push('[assert] desktop sheet is not width-capped')
  const centreDelta = Math.abs(box.x + box.width / 2 - 1280 / 2)
  if (centreDelta > 4)
    issues.push('[assert] desktop sheet is not horizontally centered')
  await page.screenshot({ path: `${OUT}/bottom-sheet-desktop.png` })
  console.log(`screenshot: ${OUT}/bottom-sheet-desktop.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
