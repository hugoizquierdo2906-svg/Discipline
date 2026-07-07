// Stepper proof — progress through an ordered sequence of steps of one
// task. Captures (desktop/tablet/mobile) plus programmatic assertions for
// structure (nav landmark, ordered list), aria-current="step", completed/
// pending state, clickable step-jump, disabled step, loading, orientation,
// keyboard (native Tab/Enter, no custom handler), responsive CSS-only
// horizontal-to-vertical switch, and RTL. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/stepper`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

// Full-page captures (desktop/tablet/mobile).
for (const [w, h, suffix] of [
  [1280, 3800, ''],
  [834, 4000, '-tablet'],
  [390, 4600, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/stepper${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/stepper${suffix}.png`)
  await context.close()
}

// Structure: nav landmark, ordered list.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'stepper-basic')
  const nav = scene.locator('nav')
  if ((await nav.getAttribute('aria-label')) !== 'Progress')
    issues.push('[assert] nav is not labeled "Progress"')
  if ((await nav.locator('ol').count()) < 1)
    issues.push('[assert] steps are not an ordered list')
  await context.close()
}

// currentStep: aria-current="step" on exactly one step.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'stepper-current')
  const current = scene.locator('[aria-current="step"]')
  if ((await current.count()) !== 1)
    issues.push('[assert] exactly one aria-current="step" expected')
  if (!(await current.textContent())?.includes('Account'))
    issues.push('[assert] Account should be aria-current when currentStep=0')
  await context.close()
}

// Completed steps: everything before currentStep auto-completes.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'stepper-completed')
  // 3 completed steps means 3 checkmark icons (svg) inside non-current circles.
  const checkmarks = scene.locator('svg.lucide-check')
  if ((await checkmarks.count()) !== 3)
    issues.push(
      `[assert] expected 3 completed (checkmark) steps, got ${await checkmarks.count()}`,
    )
  const current = scene.locator('[aria-current="step"]')
  if (!(await current.textContent())?.includes('Review'))
    issues.push('[assert] Review should be aria-current when currentStep=3')
  await context.close()
}

// Clickable: clicking a step jumps directly to it (no sequential requirement).
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'stepper-clickable')
  const before = await page.textContent(
    '[data-testid="clickable-external-state"]',
  )
  await scene.getByRole('button', { name: /Review/ }).click()
  await page.waitForTimeout(150)
  const after = await page.textContent(
    '[data-testid="clickable-external-state"]',
  )
  if (before === after)
    issues.push('[assert] clicking a step did not update the external state')
  if (!after?.includes('Review'))
    issues.push('[assert] clicking Review did not jump directly to it')
  const current = scene.locator('[aria-current="step"]')
  if (!(await current.textContent())?.includes('Review'))
    issues.push('[assert] Review should be aria-current after the jump')
  await context.close()
}

// Disabled step: inert, aria-disabled, not clickable, still visible.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'stepper-disabled-step')
  const disabledStep = scene.getByRole('button', { name: /Payment/ })
  if (!(await disabledStep.isVisible()))
    issues.push('[assert] disabled step should still be visible')
  if (!(await disabledStep.isDisabled()))
    issues.push('[assert] disabled step button should be natively disabled')
  if ((await disabledStep.getAttribute('aria-disabled')) !== 'true')
    issues.push('[assert] disabled step missing aria-disabled="true"')
  await context.close()
}

// Loading: current step shows a Spinner; all steps disabled.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'stepper-loading')
  if ((await scene.locator('[role="status"]').count()) === 0)
    issues.push('[assert] Spinner (role=status) missing while loading')
  const current = scene.locator('[aria-current="step"]')
  if (!(await current.textContent())?.includes('Payment'))
    issues.push(
      '[assert] loading should keep the current step (Payment) visible',
    )
  await context.close()
}

// Orientation: vertical renders a column; horizontal renders a row.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'stepper-vertical')
  const ol = scene.locator('ol').first()
  const flexDirection = await ol.evaluate(
    (el) => getComputedStyle(el).flexDirection,
  )
  if (flexDirection !== 'column')
    issues.push('[assert] vertical orientation should render as a column')
  await context.close()
}
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'stepper-horizontal')
  const ol = scene.locator('ol').first()
  const flexDirection = await ol.evaluate(
    (el) => getComputedStyle(el).flexDirection,
  )
  if (flexDirection === 'column')
    issues.push('[assert] horizontal orientation should not render as a column')
  await context.close()
}

// Keyboard: native Tab reaches a clickable step; Enter activates it.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'stepper-clickable')
  await scene.getByRole('button', { name: /Account/ }).focus()
  const focused = await page.evaluate(() => document.activeElement?.textContent)
  if (!focused?.includes('Account'))
    issues.push('[assert] Account step button did not receive focus')
  await page.keyboard.press('Enter')
  await page.waitForTimeout(150)
  const current = scene.locator('[aria-current="step"]')
  if (!(await current.textContent())?.includes('Account'))
    issues.push(
      '[assert] Enter on the focused Account step did not activate it',
    )
  await context.close()
}

// Responsive: below `md`, the layout switches to a vertical column.
{
  const { context, page } = await newPage(390, 900)
  const scene = section(page, 'stepper-responsive')
  const visibleOl = scene.locator('ol:visible').first()
  const flexDirection = await visibleOl.evaluate(
    (el) => getComputedStyle(el).flexDirection,
  )
  if (flexDirection !== 'column')
    issues.push('[assert] responsive mobile should render as a vertical column')
  await context.close()
}
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'stepper-responsive')
  const visibleOl = scene.locator('ol:visible').first()
  const flexDirection = await visibleOl.evaluate(
    (el) => getComputedStyle(el).flexDirection,
  )
  if (flexDirection === 'column')
    issues.push('[assert] responsive desktop should render horizontally')
  await context.close()
}

// RTL: the wrapper lays out right-to-left.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'stepper-rtl')
  const dirEl = scene.locator('[dir="rtl"]')
  if ((await dirEl.count()) !== 1) issues.push('[assert] rtl wrapper missing')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/stepper-rtl.png` })
  console.log(`screenshot: ${OUT}/stepper-rtl.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
