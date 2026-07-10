// ActivityFeed proof — the Data Display "what happened recently?" primitive.
// Captures (desktop/tablet/mobile) plus programmatic assertions: compound
// structure, compact/comfortable rhythm, avatar/icon/badge/action
// composition, metadata, long content, responsive, RTL, ARIA/native
// semantics. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/activity-feed`, { waitUntil: 'networkidle' })
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
    path: `${OUT}/activity-feed${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/activity-feed${suffix}.png`)
  await context.close()
}

// Native structure: a real <ul> of <li>s.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'af-basic')
  const info = await scene
    .locator('ul')
    .first()
    .evaluate((e) => ({
      tag: e.tagName,
      itemTag: e.querySelector('li')?.tagName,
      itemCount: e.querySelectorAll('li').length,
    }))
  if (info.tag !== 'UL')
    issues.push(
      `[assert] ActivityFeed should render a real <ul>, got ${info.tag}`,
    )
  if (info.itemTag !== 'LI')
    issues.push('[assert] ActivityFeed.Item should render a real <li>')
  if (info.itemCount !== 2)
    issues.push(`[assert] expected 2 items in Basic, got ${info.itemCount}`)
  await context.close()
}

// Rows are separated by the real, frozen Separator — faded, hidden after
// the last item.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'af-basic')
  const separators = scene.locator('[data-activity-separator]')
  const count = await separators.count()
  if (count !== 2)
    issues.push(`[assert] expected 2 Separator elements in Basic, got ${count}`)
  const info = await separators.first().evaluate((e) => ({
    role: e.getAttribute('role'),
  }))
  if (info.role !== 'none')
    issues.push(
      `[assert] the row Separator should be the frozen decorative Separator (role="none"), got ${info.role}`,
    )
  const lastVisibility = await separators
    .nth(1)
    .evaluate((e) => getComputedStyle(e).display)
  if (lastVisibility !== 'none')
    issues.push(
      `[assert] the last item's trailing Separator should be hidden, got display=${lastVisibility}`,
    )
  await context.close()
}

// Compact vs Comfortable: compact rhythm is tighter.
{
  const { context, page } = await newPage(1280, 900)
  const compactHeight = await section(page, 'af-compact')
    .locator('li')
    .first()
    .evaluate((e) => e.getBoundingClientRect().height)
  const comfortableHeight = await section(page, 'af-comfortable')
    .locator('li')
    .first()
    .evaluate((e) => e.getBoundingClientRect().height)
  if (!(comfortableHeight > compactHeight))
    issues.push(
      `[assert] Comfortable should be taller than Compact, comfortable=${comfortableHeight} compact=${compactHeight}`,
    )
  await context.close()
}

// Composition: Avatar, Icon, Badge, Button and Code all render inside
// ActivityFeed slots with zero adaptation.
{
  const { context, page } = await newPage(1280, 900)
  const avatarCount = await section(page, 'af-avatar')
    .getByText('CH', { exact: true })
    .count()
  if (avatarCount < 1)
    issues.push(
      '[assert] Avatar initials should render inside ActivityFeed.Avatar',
    )
  const iconSvg = await section(page, 'af-icon').locator('svg').count()
  if (iconSvg < 1)
    issues.push('[assert] an Icon should render inside ActivityFeed.Icon')
  const badge = section(page, 'af-badge').getByText('Published', {
    exact: true,
  })
  if ((await badge.count()) !== 1)
    issues.push('[assert] a Badge should render inside ActivityFeed.Content')
  const button = section(page, 'af-actions').getByRole('button', {
    name: 'View',
  })
  if ((await button.count()) !== 1)
    issues.push('[assert] a Button should render inside ActivityFeed.Actions')
  const code = section(page, 'af-actions').locator('code')
  if ((await code.count()) !== 1)
    issues.push('[assert] Code should render inside ActivityFeed.Description')
  await context.close()
}

// Avatar and Icon slots share the same footprint — rows stay aligned.
{
  const { context, page } = await newPage(1280, 900)
  const avatarSlotWidth = await section(page, 'af-avatar')
    .locator('li')
    .first()
    .locator('> div > span')
    .first()
    .evaluate((e) => e.getBoundingClientRect().width)
  const iconSlotWidth = await section(page, 'af-icon')
    .locator('li')
    .first()
    .locator('> div > span')
    .first()
    .evaluate((e) => e.getBoundingClientRect().width)
  if (Math.abs(avatarSlotWidth - iconSlotWidth) > 1)
    issues.push(
      `[assert] Avatar and Icon slots should share the same footprint, avatar=${avatarSlotWidth} icon=${iconSlotWidth}`,
    )
  await context.close()
}

// Metadata: plain tabular-nums display strings, no relative-time logic.
{
  const { context, page } = await newPage(1280, 900)
  const meta = section(page, 'af-metadata').getByText('2 min ago', {
    exact: true,
  })
  const variant = await meta
    .first()
    .evaluate((e) => getComputedStyle(e).fontVariantNumeric)
  if (!variant.includes('tabular'))
    issues.push(
      `[assert] ActivityFeed.Meta should use tabular-nums, got ${variant}`,
    )
  await context.close()
}

// Long content: description wraps onto multiple lines, never truncated.
{
  const { context, page } = await newPage(1280, 900)
  const desc = section(page, 'af-long-content').locator('p').last()
  const info = await desc.evaluate((e) => {
    const cs = getComputedStyle(e)
    return {
      height: e.getBoundingClientRect().height,
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

// Responsive: ActivityFeed stays a real <ul> at a narrow viewport, never a
// horizontal layout.
{
  const { context, page } = await newPage(390, 900)
  const scene = section(page, 'af-responsive')
  const tag = await scene
    .locator('ul')
    .first()
    .evaluate((e) => e.tagName)
  if (tag !== 'UL')
    issues.push('[assert] responsive ActivityFeed should stay a real <ul>')
  const flexDirection = await scene
    .locator('ul')
    .first()
    .evaluate((e) => getComputedStyle(e).flexDirection)
  if (flexDirection !== 'column')
    issues.push(
      `[assert] ActivityFeed must stay vertical at a narrow viewport, got flex-direction=${flexDirection}`,
    )
  await context.close()
}

// RTL: native structure preserved, dedicated screenshot captured.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'af-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const tag = await scene
    .locator('ul')
    .first()
    .evaluate((e) => e.tagName)
  if (tag !== 'UL') issues.push('[assert] af-rtl should render a real <ul>')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/activity-feed-rtl.png` })
  console.log(`screenshot: ${OUT}/activity-feed-rtl.png`)
  await context.close()
}

// ARIA / empty state: no fabricated live-region, unread-count or
// notification semantics anywhere.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'af-basic')
  const liveRegionCount = await scene
    .locator('[aria-live], [role="alert"], [role="status"]')
    .count()
  if (liveRegionCount > 0)
    issues.push(
      '[assert] ActivityFeed must never fabricate a live-region/alert/status role',
    )
  await context.close()
}

// No regression: a spot check across the frozen Data Display siblings.
{
  const { context, page } = await newPage(1280, 900)
  for (const path of [
    '/dev/timeline',
    '/dev/table',
    '/dev/accordion',
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
