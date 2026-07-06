// Breadcrumb proof — hierarchical position indicator on the frozen Icon/
// Skeleton primitives. Captures (desktop/tablet/mobile) plus programmatic
// assertions for structure (nav landmark, ordered list), ARIA (aria-current
// on the current page, decorative separator excluded from the a11y tree),
// last-item-never-a-link, collapse (first + trailing run + expand-in-place),
// disabled items, loading, responsive CSS-only mobile collapse, keyboard
// (native Tab order, no custom handler), and RTL layout. Requires the dev
// server on :3000.
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
  await page.goto(`${BASE}/dev/breadcrumb`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

// Full-page captures (desktop/tablet/mobile).
for (const [w, h, suffix] of [
  [1280, 3400, ''],
  [834, 3600, '-tablet'],
  [390, 4200, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/breadcrumb${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/breadcrumb${suffix}.png`)
  await context.close()
}

// Structure + ARIA: nav landmark, ordered list, aria-current, decorative
// separator excluded from the accessibility tree, last item never a link.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'breadcrumb-minimal')
  const nav = scene.locator('nav')
  if ((await nav.getAttribute('aria-label')) !== 'Breadcrumb')
    issues.push('[assert] nav is not labeled "Breadcrumb"')
  if ((await nav.locator('ol').count()) !== 1)
    issues.push('[assert] trail is not an ordered list')
  const current = nav.locator('[aria-current="page"]')
  if ((await current.count()) !== 1)
    issues.push('[assert] exactly one aria-current="page" expected')
  if ((await current.evaluate((el) => el.tagName)) === 'A')
    issues.push('[assert] the current page must not be a link')
  const links = nav.locator('a')
  if ((await links.count()) !== 2)
    issues.push('[assert] expected exactly 2 ancestor links (Home, Clients)')
  const separators = nav.locator(
    'li[role="presentation"]:not([data-slot="responsive-ellipsis"])',
  )
  const sepCount = await separators.count()
  if (sepCount !== 2) issues.push('[assert] expected 2 separators')
  for (let i = 0; i < sepCount; i++) {
    if ((await separators.nth(i).getAttribute('aria-hidden')) !== 'true')
      issues.push('[assert] separator is not aria-hidden')
  }
  // Full keyboard support: native Tab order reaches both links, then the
  // page loses reachability (current page is not a link, not focusable).
  await page.keyboard.press('Tab')
  const first = await page.evaluate(() => document.activeElement?.textContent)
  await page.keyboard.press('Tab')
  const second = await page.evaluate(() => document.activeElement?.textContent)
  if (!first?.includes('Home') || !second?.includes('Clients'))
    issues.push(
      '[assert] Tab order did not reach the two ancestor links in order',
    )
  await context.close()
}

// Collapse: first crumb + a trailing run + ellipsis; expand-in-place reveals
// everything, no overlay/portal involved.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'breadcrumb-collapsed')
  const items = scene.locator('nav li')
  const beforeLinks = await scene.locator('nav a').count()
  const ellipsis = scene.getByRole('button', { name: /hidden/i })
  if (!(await ellipsis.isVisible()))
    issues.push('[assert] ellipsis button not visible')
  await ellipsis.click()
  await page.waitForTimeout(200)
  const afterLinks = await scene.locator('nav a').count()
  if (afterLinks <= beforeLinks)
    issues.push('[assert] expanding the ellipsis did not reveal more links')
  if ((await scene.locator('nav [role="presentation"]').count()) === 0)
    issues.push('[assert] separators missing after expand')
  void items
  await context.close()
}

// Collapse on mobile: the JS ellipsis must stay visible/reachable even
// though it is structurally a "middle" entry — the CSS responsive layer
// must not hide the one control that reveals the hidden crumbs.
{
  const { context, page } = await newPage(390, 900)
  const scene = section(page, 'breadcrumb-collapsed')
  const ellipsis = scene.getByRole('button', { name: /hidden/i })
  if (!(await ellipsis.isVisible()))
    issues.push(
      '[assert] ellipsis is hidden on mobile — hidden crumbs unreachable',
    )
  await context.close()
}

// Disabled items: inert text, not a link, but still visible for context.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'breadcrumb-disabled')
  const disabled = scene.locator('[aria-disabled="true"]').first()
  if (!(await disabled.isVisible()))
    issues.push('[assert] disabled crumb not visible')
  if ((await disabled.evaluate((el) => el.tagName)) === 'A')
    issues.push('[assert] disabled crumb must not be a real link')
  await context.close()
}

// Loading: Skeleton placeholders, aria-hidden (announced elsewhere).
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'breadcrumb-loading')
  const skeletons = scene.locator('[aria-hidden="true"]')
  if ((await skeletons.count()) < 4)
    issues.push('[assert] expected at least 4 loading skeleton pills')
  await context.close()
}

// Responsive: below `sm`, middle crumbs collapse to a static CSS-only
// ellipsis — no JS measuring, verified by viewport alone.
{
  const { context, page } = await newPage(390, 900)
  const scene = section(page, 'breadcrumb-responsive')
  const middleLink = scene.getByRole('link', { name: 'Programs' })
  if (await middleLink.isVisible().catch(() => false))
    issues.push(
      '[assert] a middle crumb is still visible below the sm breakpoint',
    )
  await context.close()
}
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'breadcrumb-responsive')
  const middleLink = scene.getByRole('link', { name: 'Programs' })
  if (!(await middleLink.isVisible()))
    issues.push(
      '[assert] a middle crumb is hidden at desktop width (should be visible)',
    )
  await context.close()
}

// RTL: the wrapper lays out right-to-left; the chevron flips.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'breadcrumb-rtl')
  const dirEl = scene.locator('[dir="rtl"]')
  if ((await dirEl.count()) !== 1) issues.push('[assert] rtl wrapper missing')
  await page.screenshot({ path: `${OUT}/breadcrumb-rtl.png` })
  console.log(`screenshot: ${OUT}/breadcrumb-rtl.png`)
  await context.close()
}

// Home icon convenience.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'breadcrumb-home-icon')
  if ((await scene.locator('nav svg').count()) === 0)
    issues.push('[assert] home icon not rendered')
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
