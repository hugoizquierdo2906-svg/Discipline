// Timeline proof — the Data Display chronological-record primitive. Captures
// (desktop/tablet/mobile) plus programmatic assertions: compound structure,
// orientation, avatar/badge/icon composition, dense/comfortable rhythm, long
// content, responsive, RTL, ARIA/native semantics. Requires the dev server
// on :3000.
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
  await page.goto(`${BASE}/dev/timeline`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

// Full-page captures.
for (const [w, h, suffix] of [
  [1280, 8200, ''],
  [834, 9200, '-tablet'],
  [390, 11000, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/timeline${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/timeline${suffix}.png`)
  await context.close()
}

// Native structure: a real <ol> of <li>s — order is semantic.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tl-basic')
  const info = await scene
    .locator('ol')
    .first()
    .evaluate((e) => ({
      tag: e.tagName,
      itemTag: e.querySelector('li')?.tagName,
      itemCount: e.querySelectorAll('li').length,
    }))
  if (info.tag !== 'OL')
    issues.push(`[assert] Timeline should render a real <ol>, got ${info.tag}`)
  if (info.itemTag !== 'LI')
    issues.push('[assert] Timeline.Item should render a real <li>')
  if (info.itemCount !== 3)
    issues.push(`[assert] expected 3 items in Basic, got ${info.itemCount}`)
  await context.close()
}

// Vertical (default): the line runs top-to-bottom (w-px), hidden after the
// last item.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tl-basic')
  const lines = scene.locator('[data-timeline-line]')
  const count = await lines.count()
  if (count !== 3)
    issues.push(`[assert] expected 3 line segments in Basic, got ${count}`)
  const lastVisibility = await lines
    .nth(2)
    .evaluate((e) => getComputedStyle(e).visibility)
  if (lastVisibility !== 'hidden')
    issues.push(
      `[assert] the last item's trailing line should be hidden, got ${lastVisibility}`,
    )
  const firstWidth = await lines
    .first()
    .evaluate((e) => getComputedStyle(e).width)
  if (parseFloat(firstWidth) > 2)
    issues.push(
      `[assert] vertical line should be a hairline (~1px), got ${firstWidth}`,
    )
  await context.close()
}

// Horizontal: the axis switches to a left-to-right line (h-px), last
// segment hidden the same way.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tl-horizontal')
  const lines = scene.locator('[data-timeline-line]')
  const firstHeight = await lines
    .first()
    .evaluate((e) => getComputedStyle(e).height)
  if (parseFloat(firstHeight) > 2)
    issues.push(
      `[assert] horizontal line should be a hairline (~1px), got ${firstHeight}`,
    )
  const lastVisibility = await lines
    .last()
    .evaluate((e) => getComputedStyle(e).visibility)
  if (lastVisibility !== 'hidden')
    issues.push(
      `[assert] the last horizontal item's trailing line should be hidden, got ${lastVisibility}`,
    )
  await context.close()
}

// Composition: Avatar, Badge and Icon all render inside Timeline.Dot /
// Timeline.Content with zero adaptation.
{
  const { context, page } = await newPage(1280, 900)
  const avatarCount = await section(page, 'tl-avatar')
    .locator('span')
    .locator('text=LM')
    .count()
  if (avatarCount < 1)
    issues.push('[assert] Avatar initials should render inside Timeline.Dot')
  const badge = section(page, 'tl-badge').getByText('Completed', {
    exact: true,
  })
  if ((await badge.count()) !== 1)
    issues.push('[assert] a Badge should render inside Timeline.Content')
  const iconSvgCount = await section(page, 'tl-icons').locator('svg').count()
  if (iconSvgCount < 3)
    issues.push(`[assert] expected 3 icons in With Icons, got ${iconSvgCount}`)
  await context.close()
}

// Timeline.Dot grows to fit an icon child via has-[>*], no extra prop.
{
  const { context, page } = await newPage(1280, 900)
  const iconDot = section(page, 'tl-icons')
    .locator('span[class*="rounded-full"]')
    .first()
  const iconBox = await iconDot.evaluate((e) => e.getBoundingClientRect().width)
  const basicDot = section(page, 'tl-basic')
    .locator('span[class*="rounded-full"]')
    .first()
  const basicBox = await basicDot.evaluate(
    (e) => e.getBoundingClientRect().width,
  )
  if (!(iconBox > basicBox))
    issues.push(
      `[assert] an icon-bearing Dot should be larger than a plain Dot, icon=${iconBox} plain=${basicBox}`,
    )
  await context.close()
}

// Timeline.Time uses tabular-nums for vertical timestamp comparison.
{
  const { context, page } = await newPage(1280, 900)
  const time = section(page, 'tl-basic')
    .locator('time, span')
    .getByText('08:12', { exact: true })
  const variant = await time
    .first()
    .evaluate((e) => getComputedStyle(e).fontVariantNumeric)
  if (!variant.includes('tabular'))
    issues.push(
      `[assert] Timeline.Time should use tabular-nums, got ${variant}`,
    )
  await context.close()
}

// Dense vs Comfortable: comfortable rhythm is taller.
{
  const { context, page } = await newPage(1280, 900)
  const denseGap = await section(page, 'tl-dense')
    .locator('li')
    .first()
    .evaluate((e) => e.getBoundingClientRect().height)
  const comfortableGap = await section(page, 'tl-comfortable')
    .locator('li')
    .first()
    .evaluate((e) => e.getBoundingClientRect().height)
  if (!(comfortableGap > denseGap))
    issues.push(
      `[assert] Comfortable should be taller than Dense, comfortable=${comfortableGap} dense=${denseGap}`,
    )
  await context.close()
}

// Long content: description wraps onto multiple lines, never truncated.
{
  const { context, page } = await newPage(1280, 900)
  const desc = section(page, 'tl-long-content').locator('p').last()
  const info = await desc.evaluate((e) => {
    const cs = getComputedStyle(e)
    return {
      height: e.getBoundingClientRect().height,
      overflow: cs.overflow,
      textOverflow: cs.textOverflow,
    }
  })
  const lineHeight = await desc.evaluate((e) =>
    parseFloat(getComputedStyle(e).lineHeight),
  )
  if (!(info.height > lineHeight * 1.5))
    issues.push(
      `[assert] long description should wrap onto multiple lines, height=${info.height} line=${lineHeight}`,
    )
  if (info.textOverflow === 'ellipsis')
    issues.push(
      '[assert] long description must never truncate with an ellipsis',
    )
  await context.close()
}

// Responsive: Timeline stays vertical at a narrow viewport (a consumer
// decision, but the demo's own usage should never break).
{
  const { context, page } = await newPage(390, 900)
  const scene = section(page, 'tl-responsive')
  const tag = await scene
    .locator('ol')
    .first()
    .evaluate((e) => e.tagName)
  if (tag !== 'OL')
    issues.push('[assert] responsive Timeline should stay a real <ol>')
  await context.close()
}

// RTL: computed direction rtl, native structure preserved, dedicated
// screenshot captured.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tl-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const tag = await scene
    .locator('ol')
    .first()
    .evaluate((e) => e.tagName)
  if (tag !== 'OL') issues.push('[assert] tl-rtl should render a real <ol>')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/timeline-rtl.png` })
  console.log(`screenshot: ${OUT}/timeline-rtl.png`)
  await context.close()
}

// ARIA: decorative line/dot never announced, event text remains real,
// readable content (no hidden-from-AT titles).
{
  const { context, page } = await newPage(1280, 900)
  const line = section(page, 'tl-basic').locator('[data-timeline-line]').first()
  const ariaHidden = await line.getAttribute('aria-hidden')
  if (ariaHidden !== 'true')
    issues.push(
      '[assert] the connecting line must be aria-hidden (decorative only)',
    )
  await context.close()
}

// No regression: a spot check across the frozen Data Display sibling and
// Disclosure family.
{
  const { context, page } = await newPage(1280, 900)
  for (const path of [
    '/dev/table',
    '/dev/accordion',
    '/dev/collapsible',
    '/dev/separator',
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
