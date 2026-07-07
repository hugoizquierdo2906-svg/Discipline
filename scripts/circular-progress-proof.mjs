// CircularProgress proof — the ring presentation of the known fraction of
// completion. Captures (desktop/tablet/mobile) plus programmatic assertions
// for ARIA (value/max/valuenow/valuetext), indeterminate (never sets
// aria-valuenow), sizes, colors, disabled (aria-disabled + frozen spin),
// responsive (intrinsic size), and RTL. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/circular-progress`, { waitUntil: 'networkidle' })
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
  [1280, 3800, ''],
  [834, 4000, '-tablet'],
  [390, 4600, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/circular-progress${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/circular-progress${suffix}.png`)
  await context.close()
}

// Basic: role="progressbar" present.
{
  const { context, page } = await newPage(1280, 900)
  if ((await bar(page, 'cp-basic').count()) !== 1)
    issues.push('[assert] progressbar role missing on Basic')
  await context.close()
}

// Determinate: value exposed via aria-valuenow/valuemin/valuemax/valuetext.
{
  const { context, page } = await newPage(1280, 900)
  const el = bar(page, 'cp-determinate')
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
  const label = await section(page, 'cp-determinate').textContent()
  if (!label?.includes('64%'))
    issues.push('[assert] centered label "64%" not rendered')
  await context.close()
}

// Indeterminate: aria-valuenow must NEVER be present; arc spins.
{
  const { context, page } = await newPage(1280, 900)
  const el = bar(page, 'cp-indeterminate')
  const now = await el.getAttribute('aria-valuenow')
  const text = await el.getAttribute('aria-valuetext')
  if (now !== null)
    issues.push(
      `[assert] indeterminate must never set aria-valuenow, got ${now}`,
    )
  if (text !== null)
    issues.push(
      `[assert] indeterminate should not set aria-valuetext, got ${text}`,
    )
  const state = await el.getAttribute('data-state')
  if (state !== 'indeterminate')
    issues.push(`[assert] expected data-state="indeterminate", got ${state}`)
  const animName = await el
    .locator('> span')
    .first()
    .evaluate((e) => getComputedStyle(e).animationName)
  if (animName !== 'spin')
    issues.push(`[assert] indeterminate ring should spin, got ${animName}`)
  await context.close()
}

// Custom max.
{
  const { context, page } = await newPage(1280, 900)
  const el = bar(page, 'cp-custom-max')
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

// 0% and 100% edges.
{
  const { context, page } = await newPage(1280, 900)
  const zeroNow = await bar(page, 'cp-zero').getAttribute('aria-valuenow')
  const hundredNow = await bar(page, 'cp-hundred').getAttribute('aria-valuenow')
  if (zeroNow !== '0')
    issues.push(`[assert] 0% expected aria-valuenow=0, got ${zeroNow}`)
  if (hundredNow !== '100')
    issues.push(`[assert] 100% expected aria-valuenow=100, got ${hundredNow}`)
  await context.close()
}

// Sizes: diameter increases sm < md < lg.
{
  const { context, page } = await newPage(1280, 900)
  const bars = section(page, 'cp-sizes').locator('[role="progressbar"]')
  const widths = []
  for (let i = 0; i < 3; i++)
    widths.push(
      await bars.nth(i).evaluate((e) => e.getBoundingClientRect().width),
    )
  if (!(widths[0] < widths[1] && widths[1] < widths[2]))
    issues.push(
      `[assert] size widths should strictly increase sm<md<lg, got ${JSON.stringify(widths)}`,
    )
  await context.close()
}

// Colors: 6 distinct stroke colors.
{
  const { context, page } = await newPage(1280, 900)
  const circles = section(page, 'cp-colors').locator(
    '[role="progressbar"] circle:nth-child(2)',
  )
  const count = await circles.count()
  const strokes = new Set()
  for (let i = 0; i < count; i++)
    strokes.add(
      await circles.nth(i).evaluate((e) => getComputedStyle(e).stroke),
    )
  if (count !== 6)
    issues.push(`[assert] expected 6 color swatches, got ${count}`)
  if (strokes.size !== count)
    issues.push(
      `[assert] expected ${count} distinct stroke colors, got ${strokes.size}`,
    )
  await context.close()
}

// Disabled: aria-disabled on both; indeterminate spin frozen.
{
  const { context, page } = await newPage(1280, 900)
  const bars = section(page, 'cp-disabled').locator('[role="progressbar"]')
  const count = await bars.count()
  if (count !== 2)
    issues.push(`[assert] expected 2 progressbars in Disabled, got ${count}`)
  for (let i = 0; i < count; i++) {
    const d = await bars.nth(i).getAttribute('aria-disabled')
    if (d !== 'true')
      issues.push(`[assert] disabled progressbar #${i} missing aria-disabled`)
  }
  const animName = await bars
    .nth(1)
    .locator('> span')
    .first()
    .evaluate((e) => getComputedStyle(e).animationName)
  if (animName !== 'none')
    issues.push(
      `[assert] disabled indeterminate spin should be frozen (animation-name: none), got ${animName}`,
    )
  await context.close()
}

// Responsive: intrinsic size stays constant regardless of viewport.
{
  const widths = []
  for (const w of [1280, 390]) {
    const { context, page } = await newPage(w, 900)
    widths.push(
      await bar(page, 'cp-responsive').evaluate(
        (e) => e.getBoundingClientRect().width,
      ),
    )
    await context.close()
  }
  if (widths[0] !== widths[1])
    issues.push(
      `[assert] CircularProgress should be intrinsically sized (identical at any viewport), got ${JSON.stringify(widths)}`,
    )
}

// RTL: wrapper present, ring renders (no directional glyphs to check).
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'cp-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  if ((await bar(page, 'cp-rtl').count()) !== 1)
    issues.push('[assert] rtl progressbar missing')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/circular-progress-rtl.png` })
  console.log(`screenshot: ${OUT}/circular-progress-rtl.png`)
  await context.close()
}

// Long values: large numbers still compute a correct percentage.
{
  const { context, page } = await newPage(1280, 900)
  const el = bar(page, 'cp-long-values')
  const text = await el.getAttribute('aria-valuetext')
  if (text !== '82%')
    issues.push(
      `[assert] long values expected aria-valuetext "82%", got ${text}`,
    )
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
