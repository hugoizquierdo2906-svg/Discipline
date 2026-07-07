// Skeleton proof — the silent layout placeholder. Captures (desktop/
// tablet/mobile) plus programmatic assertions for animation (animate-pulse
// present/absent), width, height, circle, radius, responsive, RTL, and the
// absence of any interactive role/tabindex. Requires the dev server on
// :3000.
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
  await page.goto(`${BASE}/dev/skeleton`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

// Full-page captures (desktop/tablet/mobile).
for (const [w, h, suffix] of [
  [1280, 4200, ''],
  [834, 4400, '-tablet'],
  [390, 5000, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/skeleton${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/skeleton${suffix}.png`)
  await context.close()
}

// Basic: no interactive role, no tabindex, aria-hidden.
{
  const { context, page } = await newPage(1280, 900)
  const el = section(page, 'skeleton-basic').locator('.bg-surface').first()
  const info = await el.evaluate((e) => ({
    ariaHidden: e.getAttribute('aria-hidden'),
    role: e.getAttribute('role'),
    tabindex: e.getAttribute('tabindex'),
  }))
  if (info.ariaHidden !== 'true')
    issues.push('[assert] Skeleton must be aria-hidden')
  if (info.role !== null)
    issues.push(`[assert] Skeleton must have no role, got ${info.role}`)
  if (info.tabindex !== null)
    issues.push(`[assert] Skeleton must have no tabindex, got ${info.tabindex}`)
  await context.close()
}

// Rectangle: exact width/height from numeric props.
{
  const { context, page } = await newPage(1280, 900)
  const el = section(page, 'skeleton-rectangle').locator('.bg-surface').first()
  const rect = await el.evaluate((e) => e.getBoundingClientRect())
  if (rect.width !== 240)
    issues.push(`[assert] rectangle width expected 240, got ${rect.width}`)
  if (rect.height !== 80)
    issues.push(`[assert] rectangle height expected 80, got ${rect.height}`)
  await context.close()
}

// Circle: equal width/height, fully rounded.
{
  const { context, page } = await newPage(1280, 900)
  const el = section(page, 'skeleton-circle').locator('.bg-surface').first()
  const info = await el.evaluate((e) => ({
    rect: e.getBoundingClientRect(),
    borderRadius: getComputedStyle(e).borderRadius,
  }))
  if (info.rect.width !== info.rect.height)
    issues.push(
      `[assert] circle width/height should match, got ${info.rect.width}x${info.rect.height}`,
    )
  if (!info.borderRadius.includes('999') && info.borderRadius !== '50%')
    issues.push(
      `[assert] circle should be fully rounded, got ${info.borderRadius}`,
    )
  await context.close()
}

// Radius: none/sm/md/lg/full each produce a distinct border-radius.
{
  const { context, page } = await newPage(1280, 900)
  const radii = new Set()
  radii.add(
    await section(page, 'skeleton-basic')
      .locator('.bg-surface')
      .first()
      .evaluate((e) => getComputedStyle(e).borderRadius),
  ) // default md
  radii.add(
    await section(page, 'skeleton-text')
      .locator('.bg-surface')
      .first()
      .evaluate((e) => getComputedStyle(e).borderRadius),
  ) // sm
  radii.add(
    await section(page, 'skeleton-image')
      .locator('.bg-surface')
      .first()
      .evaluate((e) => getComputedStyle(e).borderRadius),
  ) // lg
  radii.add(
    await section(page, 'skeleton-circle')
      .locator('.bg-surface')
      .first()
      .evaluate((e) => getComputedStyle(e).borderRadius),
  ) // full
  if (radii.size < 4)
    issues.push(
      `[assert] expected at least 4 distinct radius values across md/sm/lg/full, got ${radii.size}`,
    )
  await context.close()
}

// Multiple lines: correct count, uniform width except the last at 60%.
{
  const { context, page } = await newPage(1280, 900)
  const lines = section(page, 'skeleton-multiple-lines').locator('.bg-surface')
  const count = await lines.count()
  if (count !== 4) issues.push(`[assert] expected 4 lines, got ${count}`)
  const widths = []
  for (let i = 0; i < count; i++)
    widths.push(
      await lines.nth(i).evaluate((e) => e.getBoundingClientRect().width),
    )
  const full = widths[0]
  const allButLastMatch = widths
    .slice(0, -1)
    .every((w) => Math.abs(w - full) < 1)
  const lastIsShorter =
    widths[count - 1] < full * 0.7 && widths[count - 1] > full * 0.5
  if (!allButLastMatch)
    issues.push(
      `[assert] all lines but the last should share the same width, got ${JSON.stringify(widths)}`,
    )
  if (!lastIsShorter)
    issues.push(
      `[assert] last line should render at ~60% width, got ${JSON.stringify(widths)}`,
    )
  await context.close()
}

// Animated vs static: animate-pulse present/absent.
{
  const { context, page } = await newPage(1280, 900)
  const animatedName = await section(page, 'skeleton-animated')
    .locator('.bg-surface')
    .first()
    .evaluate((e) => getComputedStyle(e).animationName)
  if (animatedName !== 'pulse')
    issues.push(`[assert] animated Skeleton should pulse, got ${animatedName}`)
  const staticName = await section(page, 'skeleton-static')
    .locator('.bg-surface')
    .first()
    .evaluate((e) => getComputedStyle(e).animationName)
  if (staticName !== 'none')
    issues.push(
      `[assert] static (animated=false) Skeleton should not animate, got ${staticName}`,
    )
  await context.close()
}

// Responsive: percentage width follows the container at any viewport.
{
  const widths = []
  for (const w of [1280, 390]) {
    const { context, page } = await newPage(w, 900)
    const containerWidth = await section(page, 'skeleton-responsive')
      .locator('.rounded-lg')
      .first()
      .evaluate((e) => e.getBoundingClientRect().width)
    const skeletonWidth = await section(page, 'skeleton-responsive')
      .locator('.bg-surface')
      .first()
      .evaluate((e) => e.getBoundingClientRect().width)
    widths.push({ containerWidth, skeletonWidth })
    await context.close()
  }
  const fillsContainer = widths.every(
    ({ containerWidth, skeletonWidth }) =>
      Math.abs(containerWidth - skeletonWidth) < 60, // padding allowance
  )
  if (!fillsContainer)
    issues.push(
      `[assert] responsive Skeleton should fill its container at any viewport, got ${JSON.stringify(widths)}`,
    )
  if (widths[0].skeletonWidth === widths[1].skeletonWidth)
    issues.push(
      '[assert] responsive Skeleton widths should differ between viewports (proves no fixed px)',
    )
}

// RTL: wrapper present, lines still render (no directional behavior expected).
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'skeleton-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  if ((await scene.locator('.bg-surface').count()) !== 3)
    issues.push('[assert] rtl lines missing')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/skeleton-rtl.png` })
  console.log(`screenshot: ${OUT}/skeleton-rtl.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
