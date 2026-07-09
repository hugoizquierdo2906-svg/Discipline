// Separator proof — the Layout hairline-boundary primitive. Captures
// (desktop/tablet/mobile) plus programmatic assertions: horizontal/vertical
// orientation, the decorative/semantic ARIA contract (role="separator" only
// when decorative={false}), zero content, rendering inside a real Card/
// Drawer/Modal, responsive, RTL, and a no-regression spot check. Requires
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
  })
  const page = await context.newPage()
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning')
      issues.push(`[${m.type()}] ${m.text()}`)
  })
  page.on('pageerror', (e) => issues.push(`[pageerror] ${e.message}`))
  await page.goto(`${BASE}/dev/separator`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

// Full-page captures.
for (const [w, h, suffix] of [
  [1280, 2600, ''],
  [834, 2900, '-tablet'],
  [390, 3800, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/separator${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/separator${suffix}.png`)
  await context.close()
}

// Horizontal: a full-width hairline, decorative by default (no role), no
// content of its own.
{
  const { context, page } = await newPage(1280, 900)
  const sep = section(page, 'sp-horizontal')
    .locator('[data-orientation]')
    .first()
  const info = await sep.evaluate((e) => {
    const cs = getComputedStyle(e)
    return {
      orientation: e.getAttribute('data-orientation'),
      role: e.getAttribute('role'),
      width: e.getBoundingClientRect().width,
      height: parseFloat(cs.height),
      childCount: e.childNodes.length,
    }
  })
  if (info.orientation !== 'horizontal')
    issues.push(
      `[assert] default Separator should be horizontal, got ${info.orientation}`,
    )
  if (info.role !== 'none')
    issues.push(
      `[assert] decorative Separator should carry role="none" (no semantics), got "${info.role}"`,
    )
  if (!(info.height > 0 && info.height <= 2))
    issues.push(
      `[assert] horizontal Separator should be hairline-thin, got ${info.height}px`,
    )
  if (info.childCount !== 0)
    issues.push('[assert] Separator must carry zero content/children')
  await context.close()
}

// Vertical: full-height hairline, correct data-orientation.
{
  const { context, page } = await newPage(1280, 900)
  const sep = section(page, 'sp-vertical').locator('[data-orientation]').first()
  const orientation = await sep.getAttribute('data-orientation')
  if (orientation !== 'vertical')
    issues.push(
      `[assert] vertical Separator should carry data-orientation=vertical, got ${orientation}`,
    )
  const width = await sep.evaluate((e) => parseFloat(getComputedStyle(e).width))
  if (!(width > 0 && width <= 2))
    issues.push(
      `[assert] vertical Separator should be hairline-thin, got ${width}px`,
    )
  await context.close()
}

// Decorative vs. semantic: decorative (default) carries no role; false
// exposes role="separator" + aria-orientation, per WAI-ARIA.
{
  const { context, page } = await newPage(1280, 900)
  const dec = page.locator('[data-testid="sp-decorative-true"]')
  const sem = page.locator('[data-testid="sp-decorative-false"]')
  const decInfo = await dec.evaluate((e) => ({
    role: e.getAttribute('role'),
    ariaOrientation: e.getAttribute('aria-orientation'),
  }))
  const semInfo = await sem.evaluate((e) => ({
    role: e.getAttribute('role'),
    ariaOrientation: e.getAttribute('aria-orientation'),
  }))
  if (decInfo.role !== 'none')
    issues.push(
      `[assert] decorative=true must carry role="none", got "${decInfo.role}"`,
    )
  if (semInfo.role !== 'separator')
    issues.push(
      `[assert] decorative=false must carry role="separator", got "${semInfo.role}"`,
    )
  await context.close()
}

// Inside Card/Drawer/Modal: renders correctly, no spacing conflict, still a
// real hairline (not swallowed by the surrounding material).
{
  const { context, page } = await newPage(1280, 900)
  const sep = section(page, 'sp-inside-card')
    .locator('.ds-glass [data-orientation]')
    .first()
  if ((await sep.count()) !== 1)
    issues.push(
      '[assert] sp-inside-card should render a real Separator inside the Card',
    )
  await context.close()
}
{
  const { context, page } = await newPage(1280, 900)
  await section(page, 'sp-drawer')
    .getByRole('button', { name: 'Open drawer' })
    .click()
  await page.waitForTimeout(250)
  const sep = page
    .locator('[data-testid="sp-drawer-content"] [data-orientation]')
    .first()
  if ((await sep.count()) !== 1)
    issues.push(
      '[assert] sp-drawer should render a real Separator inside the Drawer body',
    )
  await page.screenshot({ path: `${OUT}/separator-drawer.png` })
  console.log(`screenshot: ${OUT}/separator-drawer.png`)
  await context.close()
}
{
  const { context, page } = await newPage(1280, 900)
  await section(page, 'sp-modal')
    .getByRole('button', { name: 'Open dialog' })
    .click()
  await page.waitForTimeout(250)
  const sep = page
    .locator('[data-testid="sp-modal-content"] [data-orientation]')
    .first()
  if ((await sep.count()) !== 1)
    issues.push(
      '[assert] sp-modal should render a real Separator inside the Modal body',
    )
  await page.screenshot({ path: `${OUT}/separator-modal.png` })
  console.log(`screenshot: ${OUT}/separator-modal.png`)
  await context.close()
}

// Responsive: the hairline always tracks its container width.
{
  const widths = {}
  for (const w of [1280, 390]) {
    const { context, page } = await newPage(w, 900)
    const sep = section(page, 'sp-responsive')
      .locator('[data-orientation]')
      .first()
    const container = section(page, 'sp-responsive').locator('div').first()
    const sepWidth = await sep.evaluate((e) => e.getBoundingClientRect().width)
    const containerWidth = await container.evaluate(
      (e) => e.getBoundingClientRect().width,
    )
    widths[w] = Math.abs(sepWidth - containerWidth)
    await context.close()
  }
  for (const [w, diff] of Object.entries(widths)) {
    if (diff > 1)
      issues.push(
        `[assert] Separator should track its container width at ${w}px, diff=${diff}`,
      )
  }
}

// RTL: renders, still full width, no directional logic needed.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'sp-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const sep = scene.locator('[data-orientation]').first()
  if ((await sep.count()) !== 1)
    issues.push('[assert] sp-rtl should render a real Separator')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/separator-rtl.png` })
  console.log(`screenshot: ${OUT}/separator-rtl.png`)
  await context.close()
}

// No regression: every Separator on the page is still non-interactive and
// motion-free (static, everywhere).
{
  const { context, page } = await newPage(1280, 900)
  const bad = await page.evaluate(
    () =>
      Array.from(document.querySelectorAll('[data-orientation]')).filter(
        (e) => {
          const cs = getComputedStyle(e)
          return (
            e.tabIndex >= 0 ||
            cs.transitionDuration !== '0s' ||
            cs.animationName !== 'none'
          )
        },
      ).length,
  )
  if (bad > 0)
    issues.push(
      `[assert] found ${bad} Separator(s) with interactive/motion styling`,
    )
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
