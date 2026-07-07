// Progress proof — the known fraction of completion of one continuous
// operation. Captures (desktop/tablet/mobile) plus programmatic assertions
// for value/aria-valuenow, max/aria-valuemax, indeterminate (never sets
// aria-valuenow), disabled (aria-disabled, frozen pulse), sizes, responsive
// (identical markup, width follows the container), and RTL (fill anchors to
// the inline-start edge). Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/progress`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

function bar(page, testId) {
  return section(page, testId).locator('[role="progressbar"]').first()
}

// Full-page captures (desktop/tablet/mobile).
for (const [w, h, suffix] of [
  [1280, 3400, ''],
  [834, 3600, '-tablet'],
  [390, 4200, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/progress${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/progress${suffix}.png`)
  await context.close()
}

// Basic: role="progressbar" present.
{
  const { context, page } = await newPage(1280, 900)
  const el = bar(page, 'progress-basic')
  if ((await el.count()) !== 1)
    issues.push('[assert] progressbar role missing on Basic')
  await context.close()
}

// Determinate: value exposed via aria-valuenow/valuemin/valuemax/valuetext.
{
  const { context, page } = await newPage(1280, 900)
  const el = bar(page, 'progress-determinate')
  const now = await el.getAttribute('aria-valuenow')
  const min = await el.getAttribute('aria-valuemin')
  const max = await el.getAttribute('aria-valuemax')
  const text = await el.getAttribute('aria-valuetext')
  if (now !== '64')
    issues.push(`[assert] aria-valuenow expected 64, got ${now}`)
  if (min !== '0') issues.push(`[assert] aria-valuemin expected 0, got ${min}`)
  if (max !== '100')
    issues.push(`[assert] aria-valuemax expected 100, got ${max}`)
  if (text !== '64%')
    issues.push(`[assert] aria-valuetext expected "64%", got ${text}`)
  await context.close()
}

// Indeterminate: aria-valuenow must NEVER be present.
{
  const { context, page } = await newPage(1280, 900)
  const el = bar(page, 'progress-indeterminate')
  const now = await el.getAttribute('aria-valuenow')
  if (now !== null)
    issues.push(
      `[assert] indeterminate must never set aria-valuenow, got ${now}`,
    )
  const state = await el.getAttribute('data-state')
  if (state !== 'indeterminate')
    issues.push(`[assert] expected data-state="indeterminate", got ${state}`)
  const indicator = el.locator('> div').first()
  const animName = await indicator.evaluate(
    (e) => getComputedStyle(e).animationName,
  )
  if (animName !== 'pulse')
    issues.push(
      `[assert] indeterminate indicator should pulse, got ${animName}`,
    )
  await context.close()
}

// Custom max: aria-valuemax reflects the custom max, percentage computed against it.
{
  const { context, page } = await newPage(1280, 900)
  const el = bar(page, 'progress-custom-max')
  const max = await el.getAttribute('aria-valuemax')
  const now = await el.getAttribute('aria-valuenow')
  const text = await el.getAttribute('aria-valuetext')
  if (max !== '50')
    issues.push(`[assert] aria-valuemax expected 50, got ${max}`)
  if (now !== '30')
    issues.push(`[assert] aria-valuenow expected 30, got ${now}`)
  if (text !== '60%')
    issues.push(
      `[assert] custom max aria-valuetext expected "60%", got ${text}`,
    )
  await context.close()
}

// Sizes: track height increases sm < md < lg.
{
  const { context, page } = await newPage(1280, 900)
  const heights = {}
  for (const id of ['progress-small', 'progress-medium', 'progress-large']) {
    heights[id] = await bar(page, id).evaluate(
      (e) => e.getBoundingClientRect().height,
    )
  }
  if (!(
    heights['progress-small'] < heights['progress-medium'] &&
    heights['progress-medium'] < heights['progress-large']
  ))
    issues.push(
      `[assert] size heights should strictly increase sm<md<lg, got ${JSON.stringify(heights)}`,
    )
  await context.close()
}

// Label: custom label overrides the auto percentage caption.
{
  const { context, page } = await newPage(1280, 900)
  const caption = await section(page, 'progress-label').textContent()
  if (!caption?.includes('Uploading 3 of 5 files'))
    issues.push('[assert] custom label caption not rendered')
  await context.close()
}

// Percentage: showLabel auto-renders "{percent}%".
{
  const { context, page } = await newPage(1280, 900)
  const caption = await section(page, 'progress-percentage').textContent()
  if (!caption?.includes('64%'))
    issues.push('[assert] showLabel should render the auto "64%" caption')
  await context.close()
}

// Disabled: aria-disabled on both determinate and indeterminate; the
// indeterminate pulse must be frozen (no animation) while disabled.
{
  const { context, page } = await newPage(1280, 900)
  const bars = section(page, 'progress-disabled').locator(
    '[role="progressbar"]',
  )
  const count = await bars.count()
  if (count !== 2)
    issues.push(`[assert] expected 2 progressbars in Disabled, got ${count}`)
  for (let i = 0; i < count; i++) {
    const d = await bars.nth(i).getAttribute('aria-disabled')
    if (d !== 'true')
      issues.push(`[assert] disabled progressbar #${i} missing aria-disabled`)
  }
  const indeterminateIndicator = bars.nth(1).locator('> div').first()
  const animName = await indeterminateIndicator.evaluate(
    (e) => getComputedStyle(e).animationName,
  )
  if (animName !== 'none')
    issues.push(
      `[assert] disabled indeterminate pulse should be frozen (animation-name: none), got ${animName}`,
    )
  await context.close()
}

// Responsive: same component twice at different container widths — the
// rendered track width should differ (it follows the container), matching
// "identical component, only the available width changes."
{
  const { context, page } = await newPage(1280, 900)
  const bars = section(page, 'progress-responsive').locator(
    '[role="progressbar"]',
  )
  const wFull = await bars
    .nth(0)
    .evaluate((e) => e.getBoundingClientRect().width)
  const wHalf = await bars
    .nth(1)
    .evaluate((e) => e.getBoundingClientRect().width)
  if (!(wHalf < wFull))
    issues.push(
      `[assert] the half-width container's progressbar should render narrower, got full=${wFull} half=${wHalf}`,
    )
  await context.close()
}

// RTL: the fill anchors to the inline-start edge (the right, under rtl).
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'progress-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const el = bar(page, 'progress-rtl')
  const indicator = el.locator('> div').first()
  const anchored = await indicator.evaluate((ind) => {
    const track = ind.parentElement.getBoundingClientRect()
    const box = ind.getBoundingClientRect()
    return Math.abs(box.right - track.right) < 1 && box.left > track.left
  })
  if (!anchored)
    issues.push(
      "[assert] rtl fill should anchor to the track's right edge (inline-start) and extend left",
    )
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/progress-rtl.png` })
  console.log(`screenshot: ${OUT}/progress-rtl.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
