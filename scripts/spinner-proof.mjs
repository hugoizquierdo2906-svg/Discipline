// Spinner proof — the purely indeterminate activity indicator. Captures
// (desktop/tablet/mobile) plus programmatic assertions for role="status",
// aria-live="polite", absence of role="progressbar"/aria-valuenow, sizes,
// colors, label (default + custom), disabled (dimmed + frozen spin),
// responsive, and RTL. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/spinner`, { waitUntil: 'networkidle' })
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
    path: `${OUT}/spinner${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/spinner${suffix}.png`)
  await context.close()
}

// role="status", aria-live="polite", never role="progressbar"/aria-valuenow.
{
  const { context, page } = await newPage(1280, 900)
  const el = section(page, 'spinner-basic').locator('[role="status"]').first()
  if ((await el.count()) !== 1)
    issues.push('[assert] role="status" missing on Basic')
  const live = await el.getAttribute('aria-live')
  if (live !== 'polite')
    issues.push(`[assert] aria-live expected "polite", got ${live}`)
  const hasProgressbar = await el.evaluate(
    (e) => e.querySelector('[role="progressbar"]') !== null,
  )
  if (hasProgressbar)
    issues.push('[assert] Spinner must never contain role="progressbar"')
  const valuenow = await el.getAttribute('aria-valuenow')
  if (valuenow !== null)
    issues.push('[assert] Spinner must never set aria-valuenow')
  await context.close()
}

// Sizes: xs<sm<md<lg<xl (measure the outer role=status wrapper, not the
// spinning ring, since the ring's own transform makes its bounding rect
// rotation-angle-dependent even though it's a fixed-size layout box).
{
  const { context, page } = await newPage(1280, 900)
  const wrappers = section(page, 'spinner-sizes').locator('[role="status"]')
  const widths = []
  for (let i = 0; i < 5; i++)
    widths.push(
      await wrappers.nth(i).evaluate((e) => e.getBoundingClientRect().width),
    )
  const strictlyIncreasing = widths.every(
    (w, i) => i === 0 || w > widths[i - 1],
  )
  if (!strictlyIncreasing)
    issues.push(
      `[assert] sizes should strictly increase xs<sm<md<lg<xl, got ${JSON.stringify(widths)}`,
    )
  await context.close()
}

// Colors: 6 distinct border colors; omitting color falls back to currentColor.
{
  const { context, page } = await newPage(1280, 900)
  const rings = section(page, 'spinner-colors').locator(
    '[role="status"] > span:first-child',
  )
  const count = await rings.count()
  const colors = new Set()
  for (let i = 0; i < count; i++)
    colors.add(
      await rings.nth(i).evaluate((e) => getComputedStyle(e).borderTopColor),
    )
  if (count !== 6)
    issues.push(`[assert] expected 6 color swatches, got ${count}`)
  if (colors.size !== count)
    issues.push(
      `[assert] expected ${count} distinct border colors, got ${colors.size}`,
    )
  const basicRing = section(page, 'spinner-basic').locator(
    '[role="status"] > span:first-child',
  )
  const usesCurrentColor = await basicRing.evaluate((e) => {
    const border = getComputedStyle(e).borderTopColor
    const text = getComputedStyle(e.parentElement).color
    return border === text
  })
  if (!usesCurrentColor)
    issues.push(
      '[assert] omitting `color` should inherit currentColor (border matches ambient text color)',
    )
  await context.close()
}

// Label: custom label is sr-only and accessible; default label is "Loading".
{
  const { context, page } = await newPage(1280, 900)
  const withLabel = await section(page, 'spinner-with-label')
    .locator('.sr-only')
    .textContent()
  if (withLabel !== 'Loading options')
    issues.push(
      `[assert] custom label expected "Loading options", got ${withLabel}`,
    )
  const withoutLabel = await section(page, 'spinner-without-label')
    .locator('.sr-only')
    .textContent()
  if (withoutLabel !== 'Loading')
    issues.push(
      `[assert] default label expected "Loading", got ${withoutLabel}`,
    )
  await context.close()
}

// Disabled: dimmed wrapper, spin frozen (animation-name: none).
{
  const { context, page } = await newPage(1280, 900)
  const wrapper = section(page, 'spinner-disabled')
    .locator('[role="status"]')
    .first()
  const opacity = await wrapper.evaluate((e) => getComputedStyle(e).opacity)
  if (Number(opacity) >= 1)
    issues.push(
      `[assert] disabled Spinner should be dimmed, got opacity ${opacity}`,
    )
  const ring = wrapper.locator('> span:first-child')
  const animName = await ring.evaluate((e) => getComputedStyle(e).animationName)
  if (animName !== 'none')
    issues.push(
      `[assert] disabled Spinner spin should be frozen (animation-name: none), got ${animName}`,
    )
  await context.close()
}

// Non-disabled: spin is active.
{
  const { context, page } = await newPage(1280, 900)
  const ring = section(page, 'spinner-basic').locator(
    '[role="status"] > span:first-child',
  )
  const animName = await ring.evaluate((e) => getComputedStyle(e).animationName)
  if (animName !== 'spin')
    issues.push(`[assert] Spinner should spin by default, got ${animName}`)
  await context.close()
}

// Responsive: intrinsic size stays constant regardless of viewport.
{
  const widths = []
  for (const w of [1280, 390]) {
    const { context, page } = await newPage(w, 900)
    widths.push(
      await section(page, 'spinner-responsive')
        .locator('[role="status"]')
        .evaluate((e) => e.getBoundingClientRect().width),
    )
    await context.close()
  }
  if (widths[0] !== widths[1])
    issues.push(
      `[assert] Spinner should be intrinsically sized (identical at any viewport), got ${JSON.stringify(widths)}`,
    )
}

// RTL: wrapper present, status role still renders.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'spinner-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  if ((await scene.locator('[role="status"]').count()) !== 1)
    issues.push('[assert] rtl status role missing')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/spinner-rtl.png` })
  console.log(`screenshot: ${OUT}/spinner-rtl.png`)
  await context.close()
}

// Inside Button: composition still renders a single status role.
{
  const { context, page } = await newPage(1280, 900)
  if (
    (await section(page, 'spinner-inside-button')
      .locator('[role="status"]')
      .count()) !== 1
  )
    issues.push('[assert] Spinner inside Button missing')
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
