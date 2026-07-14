// Carousel proof — the Data Display sequential-browsing primitive. Captures
// (desktop/tablet/mobile) plus programmatic assertions: WAI-ARIA Carousel
// pattern, basic stepping, indicators, loop/non-loop, horizontal/vertical,
// keyboard, responsive and RTL. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/carousel`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

// Full-page captures.
for (const [w, h, suffix] of [
  [1280, 6800, ''],
  [834, 7200, '-tablet'],
  [390, 8600, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/carousel${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/carousel${suffix}.png`)
  await context.close()
}

// WAI-ARIA Carousel structure: root carousel region, live track group,
// slides labelled "N of M", controls wired to the track.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'cr-basic')
  const root = scene.locator('[aria-roledescription="carousel"]')
  if ((await root.count()) !== 1)
    issues.push(
      '[assert] the Carousel root should carry aria-roledescription="carousel"',
    )
  const rootLabel = await root.getAttribute('aria-label')
  if (!rootLabel)
    issues.push('[assert] the Carousel root should carry an aria-label')
  const track = scene.locator('[role="group"][aria-live="polite"]').first()
  if ((await track.count()) !== 1)
    issues.push(
      '[assert] Carousel.Content should be a role="group" with aria-live="polite"',
    )
  const trackId = await track.getAttribute('id')
  const firstSlide = scene.locator('[aria-roledescription="slide"]').first()
  const slideLabel = await firstSlide.getAttribute('aria-label')
  if (slideLabel !== '1 of 4')
    issues.push(
      `[assert] the first slide should be aria-label="1 of 4", got "${slideLabel}"`,
    )
  const nextControls = await scene
    .getByRole('button', { name: 'Next slide' })
    .getAttribute('aria-controls')
  if (nextControls !== trackId)
    issues.push(
      `[assert] Carousel.Next should aria-controls the track id, got ${nextControls} vs ${trackId}`,
    )
  await context.close()
}

// Native scroll-snap track: a real overflow scroll container with snap.
{
  const { context, page } = await newPage(1280, 900)
  const track = section(page, 'cr-basic')
    .locator('[role="group"][aria-live="polite"]')
    .first()
  const info = await track.evaluate((e) => {
    const cs = getComputedStyle(e)
    return { overflowX: cs.overflowX, snapType: cs.scrollSnapType }
  })
  if (!['auto', 'scroll'].includes(info.overflowX))
    issues.push(
      `[assert] the horizontal track should be an overflow-x scroll container, got ${info.overflowX}`,
    )
  if (!info.snapType.includes('x') || !info.snapType.includes('mandatory'))
    issues.push(
      `[assert] the track should use scroll-snap-type x mandatory, got ${info.snapType}`,
    )
  await context.close()
}

// Basic stepping: Next advances the active slide, Previous goes back.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'cr-basic')
  await scene.scrollIntoViewIfNeeded()
  const active0 = await scene
    .locator('[aria-current="true"]')
    .getAttribute('aria-label')
  if (active0 !== 'Go to slide 1')
    issues.push(
      `[assert] the first indicator should start active, got "${active0}"`,
    )
  await scene.getByRole('button', { name: 'Next slide' }).click()
  await page.waitForTimeout(500)
  const active1 = await scene
    .locator('[aria-current="true"]')
    .getAttribute('aria-label')
  if (active1 !== 'Go to slide 2')
    issues.push(
      `[assert] Next should advance the active slide to 2, got "${active1}"`,
    )
  await scene.getByRole('button', { name: 'Previous slide' }).click()
  await page.waitForTimeout(500)
  const active2 = await scene
    .locator('[aria-current="true"]')
    .getAttribute('aria-label')
  if (active2 !== 'Go to slide 1')
    issues.push(`[assert] Previous should return to slide 1, got "${active2}"`)
  await context.close()
}

// Indicators: clicking a dot jumps directly to that slide.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'cr-basic')
  await scene.scrollIntoViewIfNeeded()
  await scene.getByRole('button', { name: 'Go to slide 3' }).click()
  // The active segment's width class only flips once the smooth scroll has
  // settled, then morphs on the token-driven width transition — wait past both
  // so the elongation is measured at rest, not mid-animation.
  await page.waitForTimeout(1200)
  const active = await scene
    .locator('[aria-current="true"]')
    .getAttribute('aria-label')
  if (active !== 'Go to slide 3')
    issues.push(
      `[assert] clicking indicator 3 should activate slide 3, got "${active}"`,
    )
  // active dot is wider than an inactive one (the gentle elongation).
  const widths = await scene.evaluate((el) => {
    const dots = el.querySelectorAll('[aria-label^="Go to slide"]')
    const active = [...dots].find(
      (d) => d.getAttribute('aria-current') === 'true',
    )
    const inactive = [...dots].find(
      (d) => d.getAttribute('aria-current') !== 'true',
    )
    return {
      active: active.getBoundingClientRect().width,
      inactive: inactive.getBoundingClientRect().width,
    }
  })
  if (!(widths.active > widths.inactive))
    issues.push(
      `[assert] the active indicator should be wider than an inactive one, got ${widths.active} vs ${widths.inactive}`,
    )
  await context.close()
}

// Non-loop: Previous disabled at the start; after stepping to the end Next
// disables.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'cr-non-loop')
  const prev = scene.getByRole('button', { name: 'Previous slide' })
  const next = scene.getByRole('button', { name: 'Next slide' })
  if (!(await prev.isDisabled()))
    issues.push('[assert] non-loop Previous should be disabled at the start')
  if (await next.isDisabled())
    issues.push('[assert] non-loop Next should be enabled at the start')
  await next.click()
  await page.waitForTimeout(400)
  await next.click()
  await page.waitForTimeout(400)
  if (!(await next.isDisabled()))
    issues.push('[assert] non-loop Next should disable at the last slide')
  await context.close()
}

// Loop: controls stay enabled at the ends and Next past the last wraps to
// the first.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'cr-loop')
  const prev = scene.getByRole('button', { name: 'Previous slide' })
  const next = scene.getByRole('button', { name: 'Next slide' })
  if ((await prev.isDisabled()) || (await next.isDisabled()))
    issues.push('[assert] loop controls should never be disabled at the ends')
  // step to the last, then once more to wrap to the first
  await next.click()
  await page.waitForTimeout(700)
  await next.click()
  await page.waitForTimeout(700)
  await next.click()
  await page.waitForTimeout(900)
  const track = scene.locator('[role="group"][aria-live="polite"]').first()
  const scrollLeft = await track.evaluate((e) => Math.abs(e.scrollLeft))
  if (scrollLeft > 8)
    issues.push(
      `[assert] Next past the last slide should wrap back to the first (scrollLeft ~0), got ${scrollLeft}`,
    )
  await context.close()
}

// Vertical: the track scrolls on the block axis and ArrowDown steps.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'cr-vertical')
  const track = scene.locator('[role="group"][aria-live="polite"]').first()
  const overflowY = await track.evaluate((e) => getComputedStyle(e).overflowY)
  if (!['auto', 'scroll'].includes(overflowY))
    issues.push(
      `[assert] a vertical Carousel track should scroll on the y axis, got ${overflowY}`,
    )
  await scene.getByRole('button', { name: 'Next slide' }).focus()
  await page.keyboard.press('ArrowDown')
  await page.waitForTimeout(500)
  const scrolled = await track.evaluate((e) => e.scrollTop)
  if (!(scrolled > 0))
    issues.push(
      `[assert] ArrowDown should step a vertical carousel forward, got scrollTop=${scrolled}`,
    )
  await context.close()
}

// Keyboard (horizontal): ArrowRight steps forward, End/Home jump to the
// ends. Driven from an indicator dot — a control that (unlike Next, which
// disables at the last slide like the frozen Pagination) always stays
// focusable, so the keydown keeps bubbling to the carousel region.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'cr-basic')
  await scene.scrollIntoViewIfNeeded()
  await scene.getByRole('button', { name: 'Go to slide 1' }).focus()
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(600)
  let active = await scene
    .locator('[aria-current="true"]')
    .getAttribute('aria-label')
  if (active !== 'Go to slide 2')
    issues.push(`[assert] ArrowRight should step to slide 2, got "${active}"`)
  await page.keyboard.press('End')
  await page.waitForTimeout(900)
  active = await scene
    .locator('[aria-current="true"]')
    .getAttribute('aria-label')
  if (active !== 'Go to slide 4')
    issues.push(
      `[assert] End should jump to the last slide (4), got "${active}"`,
    )
  await page.keyboard.press('Home')
  await page.waitForTimeout(900)
  active = await scene
    .locator('[aria-current="true"]')
    .getAttribute('aria-label')
  if (active !== 'Go to slide 1')
    issues.push(`[assert] Home should jump to the first slide, got "${active}"`)
  await context.close()
}

// Controls compose the frozen IconButton (a real <button>, not a redrawn
// control).
{
  const { context, page } = await newPage(1280, 900)
  const next = section(page, 'cr-basic').getByRole('button', {
    name: 'Next slide',
  })
  const tag = await next.evaluate((e) => e.tagName)
  if (tag !== 'BUTTON')
    issues.push(
      `[assert] Carousel.Next should render a real <button> (IconButton), got ${tag}`,
    )
  await context.close()
}

// RTL: dir rtl preserved, track present, dedicated screenshot.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'cr-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const dir = await scene
    .locator('[role="group"][aria-live="polite"]')
    .first()
    .evaluate((e) => getComputedStyle(e).direction)
  if (dir !== 'rtl')
    issues.push(
      `[assert] the RTL track should compute direction: rtl, got ${dir}`,
    )
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/carousel-rtl.png` })
  console.log(`screenshot: ${OUT}/carousel-rtl.png`)
  await context.close()
}

// Responsive: at a narrow viewport the track stays a scroll container (no
// layout break, no reflow into a stack).
{
  const { context, page } = await newPage(390, 900)
  const track = section(page, 'cr-responsive')
    .locator('[role="group"][aria-live="polite"]')
    .first()
  const overflowX = await track.evaluate((e) => getComputedStyle(e).overflowX)
  if (!['auto', 'scroll'].includes(overflowX))
    issues.push(
      '[assert] the responsive Carousel should stay a horizontal scroll track at a narrow viewport',
    )
  await context.close()
}

// No regression: a spot check across the frozen Data Display siblings.
{
  const { context, page } = await newPage(1280, 900)
  for (const path of [
    '/dev/data-grid',
    '/dev/table',
    '/dev/tree-view',
    '/dev/timeline',
  ]) {
    const res = await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' })
    if (!res || res.status() >= 400)
      issues.push(
        `[assert] regression: ${path} failed to load (${res?.status()})`,
      )
  }
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
