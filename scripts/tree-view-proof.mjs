// TreeView proof — the Data Display hierarchical-structure primitive.
// Captures (desktop/tablet/mobile) plus programmatic assertions: compound
// structure, WAI-ARIA Tree View pattern, controlled/uncontrolled/default-
// open/disabled, icon/badge/avatar composition, long labels, responsive,
// RTL, full keyboard navigation. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/tree-view`, { waitUntil: 'networkidle' })
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
    path: `${OUT}/tree-view${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/tree-view${suffix}.png`)
  await context.close()
}

// Native ARIA structure: tree/treeitem/group roles, level/setsize/posinset.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tv-basic')
  const treeRole = await scene.locator('ul').first().getAttribute('role')
  if (treeRole !== 'tree')
    issues.push(
      `[assert] TreeView root should carry role="tree", got ${treeRole}`,
    )
  const item = scene.locator('[role="treeitem"]').first()
  const level = await item.getAttribute('aria-level')
  if (level !== '1')
    issues.push(
      `[assert] top-level treeitem should have aria-level="1", got ${level}`,
    )
  const leaf = scene.locator('[role="treeitem"]').nth(1)
  const leafLevel = await leaf.getAttribute('aria-level')
  if (leafLevel !== '2')
    issues.push(
      `[assert] nested treeitem should have aria-level="2", got ${leafLevel}`,
    )
  const leafExpanded = await leaf.getAttribute('aria-expanded')
  if (leafExpanded !== null)
    issues.push(
      `[assert] a leaf treeitem must NOT carry aria-expanded, got ${leafExpanded}`,
    )
  await context.close()
}

// aria-setsize / aria-posinset reflect real sibling position.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tv-badges')
  const items = scene.locator('[role="group"] [role="treeitem"]')
  const first = items.first()
  const setsize = await first.getAttribute('aria-setsize')
  const posinset = await first.getAttribute('aria-posinset')
  if (setsize !== '3')
    issues.push(
      `[assert] expected aria-setsize="3" among 3 siblings, got ${setsize}`,
    )
  if (posinset !== '1')
    issues.push(
      `[assert] expected aria-posinset="1" for the first sibling, got ${posinset}`,
    )
  const last = items.nth(2)
  const lastPosinset = await last.getAttribute('aria-posinset')
  if (lastPosinset !== '3')
    issues.push(
      `[assert] expected aria-posinset="3" for the third sibling, got ${lastPosinset}`,
    )
  await context.close()
}

// Nested: role="group" wraps children, indentation grows with depth, no
// vertical guide line is drawn (no left border anywhere in the component).
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tv-nested')
  const groupRole = await scene
    .locator('[role="group"]')
    .first()
    .getAttribute('role')
  if (groupRole !== 'group')
    issues.push(
      `[assert] TreeView.Content should carry role="group", got ${groupRole}`,
    )
  const level1Indent = await scene
    .locator('[role="treeitem"]')
    .nth(0)
    .evaluate((e) => getComputedStyle(e).paddingInlineStart)
  const level2Indent = await scene
    .locator('[role="treeitem"]')
    .nth(1)
    .evaluate((e) => getComputedStyle(e).paddingInlineStart)
  if (!(parseFloat(level2Indent) > parseFloat(level1Indent)))
    issues.push(
      `[assert] deeper levels should indent further, level1=${level1Indent} level2=${level2Indent}`,
    )
  const borderLeftWidths = await scene.evaluate((el) =>
    Array.from(el.querySelectorAll('*')).map(
      (n) => getComputedStyle(n).borderLeftWidth,
    ),
  )
  if (borderLeftWidths.some((w) => parseFloat(w) > 0))
    issues.push(
      '[assert] TreeView must never draw a vertical guide line (border-left)',
    )
  await context.close()
}

// Default open / Controlled / Uncontrolled / Disabled.
{
  const { context, page } = await newPage(1280, 900)
  const defaultOpenExpanded = await section(page, 'tv-default-open')
    .locator('[role="treeitem"]')
    .first()
    .getAttribute('aria-expanded')
  if (defaultOpenExpanded !== 'true')
    issues.push(
      `[assert] defaultOpen should start expanded, got aria-expanded=${defaultOpenExpanded}`,
    )

  const controlledExpanded = await section(page, 'tv-controlled')
    .locator('[role="treeitem"]')
    .first()
    .getAttribute('aria-expanded')
  if (controlledExpanded !== 'true')
    issues.push(
      `[assert] open should force expanded, got aria-expanded=${controlledExpanded}`,
    )

  const uncontrolledExpanded = await section(page, 'tv-uncontrolled')
    .locator('[role="treeitem"]')
    .first()
    .getAttribute('aria-expanded')
  if (uncontrolledExpanded !== 'false')
    issues.push(
      `[assert] no open/defaultOpen should start collapsed, got aria-expanded=${uncontrolledExpanded}`,
    )
  const uncontrolledTrigger = section(page, 'tv-uncontrolled')
    .locator('[role="treeitem"]')
    .first()
  await uncontrolledTrigger.click()
  await page.waitForTimeout(150)
  const afterClick = await uncontrolledTrigger.getAttribute('aria-expanded')
  if (afterClick !== 'true')
    issues.push(
      `[assert] clicking an uncontrolled trigger should expand it, got aria-expanded=${afterClick}`,
    )

  const disabledTrigger = section(page, 'tv-disabled')
    .locator('[role="treeitem"]')
    .first()
  const isDisabled = await disabledTrigger.isDisabled()
  if (!isDisabled)
    issues.push(
      '[assert] a disabled TreeView.Item trigger should be a real disabled button',
    )
  await disabledTrigger.click({ force: true })
  await page.waitForTimeout(150)
  const disabledExpandedAfter =
    await disabledTrigger.getAttribute('aria-expanded')
  if (disabledExpandedAfter !== 'false')
    issues.push('[assert] a disabled node must never expand, even when forced')
  await context.close()
}

// Composition: Icon, Badge and Avatar all render inside TreeView slots with
// zero adaptation.
{
  const { context, page } = await newPage(1280, 900)
  const iconSvg = await section(page, 'tv-icons').locator('svg').count()
  if (iconSvg < 1)
    issues.push('[assert] an Icon should render inside TreeView.Icon')
  const badge = section(page, 'tv-badges').getByText('Published', {
    exact: true,
  })
  if ((await badge.count()) !== 1)
    issues.push('[assert] a Badge should render inside a TreeView row')
  const avatarInitials = await section(page, 'tv-avatar')
    .getByText('LM', { exact: true })
    .count()
  if (avatarInitials < 1)
    issues.push('[assert] Avatar initials should render inside TreeView.Icon')
  await context.close()
}

// Long labels: truncate within the row, never break the hierarchy layout.
{
  const { context, page } = await newPage(1280, 900)
  const label = section(page, 'tv-long-label')
    .locator('[role="treeitem"] span')
    .last()
  const overflow = await label.evaluate((e) => getComputedStyle(e).textOverflow)
  if (overflow !== 'ellipsis')
    issues.push(
      `[assert] a long label should truncate with an ellipsis, got text-overflow=${overflow}`,
    )
  await context.close()
}

// Responsive: TreeView stays a real tree at a narrow viewport, hierarchy
// intact.
{
  const { context, page } = await newPage(390, 900)
  const scene = section(page, 'tv-responsive')
  const tag = await scene
    .locator('ul[role="tree"]')
    .first()
    .evaluate((e) => e.tagName)
  if (tag !== 'UL')
    issues.push(
      '[assert] responsive TreeView should stay a real <ul role="tree">',
    )
  await context.close()
}

// RTL: native structure preserved, dedicated screenshot captured.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tv-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const treeRole = await scene
    .locator('[role="tree"]')
    .first()
    .getAttribute('role')
  if (treeRole !== 'tree')
    issues.push('[assert] tv-rtl should render a real role="tree"')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/tree-view-rtl.png` })
  console.log(`screenshot: ${OUT}/tree-view-rtl.png`)
  await context.close()
}

// Full keyboard navigation: ArrowDown/Up, Home/End, ArrowRight/Left,
// Enter/Space — the WAI-ARIA Tree View pattern.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tv-nested')
  const first = scene.locator('[role="treeitem"]').first()
  await first.focus()
  const initialTabIndex = await first.getAttribute('tabindex')
  if (initialTabIndex !== '0')
    issues.push(
      `[assert] the first treeitem should be the roving tabIndex=0, got ${initialTabIndex}`,
    )

  await page.keyboard.press('ArrowDown')
  await page.waitForTimeout(100)
  let active = await page.evaluate(() =>
    document.activeElement?.textContent?.trim(),
  )
  if (active !== 'Upper / Lower')
    issues.push(
      `[assert] ArrowDown should move focus to the next treeitem, got "${active}"`,
    )

  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(100)
  active = await page.evaluate(() =>
    document.activeElement?.textContent?.trim(),
  )
  if (active !== 'Push')
    issues.push(
      `[assert] ArrowRight on an already-open branch should move into its first child, got "${active}"`,
    )

  await page.keyboard.press('ArrowDown')
  await page.waitForTimeout(100)
  active = await page.evaluate(() =>
    document.activeElement?.textContent?.trim(),
  )
  if (!active?.includes('Bench Press'))
    issues.push(
      `[assert] ArrowDown should reach the leaf treeitem, got "${active}"`,
    )

  await page.keyboard.press('ArrowLeft')
  await page.waitForTimeout(100)
  active = await page.evaluate(() =>
    document.activeElement?.textContent?.trim(),
  )
  if (active !== 'Push')
    issues.push(
      `[assert] ArrowLeft on a leaf should move focus to its parent, got "${active}"`,
    )

  await page.keyboard.press('ArrowLeft')
  await page.waitForTimeout(100)
  const pushExpanded = await page.evaluate(() =>
    document.activeElement?.getAttribute('aria-expanded'),
  )
  if (pushExpanded !== 'false')
    issues.push(
      `[assert] ArrowLeft on an open branch should collapse it, got aria-expanded=${pushExpanded}`,
    )

  await page.keyboard.press('Home')
  await page.waitForTimeout(100)
  active = await page.evaluate(() =>
    document.activeElement?.textContent?.trim(),
  )
  if (active !== 'Program')
    issues.push(
      `[assert] Home should move focus to the first treeitem, got "${active}"`,
    )

  await page.keyboard.press('End')
  await page.waitForTimeout(100)
  active = await page.evaluate(() =>
    document.activeElement?.textContent?.trim(),
  )
  if (active !== 'Push')
    issues.push(
      `[assert] End should move focus to the last rendered treeitem, got "${active}"`,
    )

  await page.keyboard.press('Enter')
  await page.waitForTimeout(100)
  const pushExpandedAfterEnter = await page.evaluate(() =>
    document.activeElement?.getAttribute('aria-expanded'),
  )
  if (pushExpandedAfterEnter !== 'true')
    issues.push(
      '[assert] Enter should toggle expand/collapse via the native button click',
    )

  await context.close()
}

// No regression: a spot check across the frozen Data Display / Disclosure
// siblings.
{
  const { context, page } = await newPage(1280, 900)
  for (const path of [
    '/dev/collapsible',
    '/dev/accordion',
    '/dev/activity-feed',
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
