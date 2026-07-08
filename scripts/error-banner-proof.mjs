// ErrorBanner proof — the persistent, in-flow, non-modal error. Captures
// (desktop/tablet/mobile) plus programmatic assertions for rendering
// (title/description), role="alert" (assertive — the semantic distinction from
// the polite Success/Warning banners), the error-tinted surface + tinted icon,
// the dismiss control (present/absent + self-hide), the optional recovery
// action, sizes, responsive width, RTL direction, and the static (no
// animation) guarantee. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/error-banner`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

// The ErrorBanner root is the element carrying role="alert".
function root(page, testId) {
  return section(page, testId).locator('[role="alert"]').first()
}

// Full-page captures (desktop/tablet/mobile).
for (const [w, h, suffix] of [
  [1280, 4600, ''],
  [834, 5400, '-tablet'],
  [390, 6400, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/error-banner${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/error-banner${suffix}.png`)
  await context.close()
}

// Rendering: title + description present, and role="alert" announces it
// assertively (the non-modal error's appropriate role, distinct from the
// polite role="status" of the Success/Warning banners).
{
  const { context, page } = await newPage(1280, 900)
  const r = root(page, 'eb-description')
  if ((await r.count()) !== 1)
    issues.push('[assert] ErrorBanner root (role="alert") missing')
  const text = await r.textContent()
  if (!text?.includes("Couldn't save your changes"))
    issues.push('[assert] title not rendered')
  if (!text?.includes('network error interrupted'))
    issues.push('[assert] description not rendered')
  // It must NOT use role="status" — that would understate the failure.
  if (
    (await section(page, 'eb-description')
      .locator('[role="status"]')
      .count()) !== 0
  )
    issues.push(
      '[assert] ErrorBanner should use role="alert", not role="status"',
    )
  await context.close()
}

// Error-tinted surface: the banner draws its own background from the error
// token (not transparent) and an error-token border. The tinted icon resolves
// to the error token color, distinct from the neutral body text.
{
  const { context, page } = await newPage(1280, 900)
  const r = root(page, 'eb-basic')
  const styles = await r.evaluate((e) => {
    const s = getComputedStyle(e)
    const channels = (s.backgroundColor.match(/[\d.]+/g) ?? []).map(Number)
    const painted = channels.some((c) => c > 0)
    return { painted, border: s.borderTopWidth }
  })
  if (!styles.painted)
    issues.push('[assert] ErrorBanner should own a tinted background')
  if (parseFloat(styles.border) <= 0)
    issues.push('[assert] ErrorBanner should draw an error-token border')
  const iconColor = await r
    .locator('svg')
    .first()
    .evaluate((e) => getComputedStyle(e).color)
  const bodyColor = await r
    .locator('p')
    .first()
    .evaluate((e) => getComputedStyle(e).color)
  if (iconColor === bodyColor)
    issues.push(
      `[assert] error icon should be tinted (text-error), not the body color; both are ${iconColor}`,
    )
  await context.close()
}

// Dismiss: a close button present, and clicking it self-hides the banner.
{
  const { context, page } = await newPage(1280, 900)
  const s = section(page, 'eb-dismissible')
  const dismiss = s.getByRole('button', { name: /Dismiss/ })
  if ((await dismiss.count()) !== 1)
    issues.push('[assert] Dismissible variant should render a Dismiss button')
  await dismiss.click()
  await page.waitForTimeout(150)
  if ((await s.locator('[role="alert"]').count()) !== 0)
    issues.push('[assert] Dismiss should self-hide the banner')
  await context.close()
}

// Without dismiss / without action: bare error, no buttons.
{
  const { context, page } = await newPage(1280, 900)
  const s = section(page, 'eb-basic')
  if ((await s.locator('button').count()) !== 0)
    issues.push('[assert] Basic banner should have no buttons')
  if ((await s.locator('svg').count()) === 0)
    issues.push('[assert] Basic banner should still render its icon')
  await context.close()
}

// Action: an optional recovery-action button renders.
{
  const { context, page } = await newPage(1280, 900)
  const s = section(page, 'eb-action')
  if ((await s.getByRole('button', { name: /Retry/ }).count()) !== 1)
    issues.push('[assert] Action variant should render a "Retry" button')
  await context.close()
}

// Sizes: title font-size increases sm < md < lg.
{
  const { context, page } = await newPage(1280, 900)
  const sizes = {}
  for (const [id, key] of [
    ['eb-sm', 'sm'],
    ['eb-md', 'md'],
    ['eb-lg', 'lg'],
  ]) {
    // The title is the first Text (<p>) inside the content column; the icon
    // wrapper is a <span>, so scoping to <p> skips it.
    const title = root(page, id).locator('p').first()
    sizes[key] = await title.evaluate((e) =>
      parseFloat(getComputedStyle(e).fontSize),
    )
  }
  if (!(sizes.sm < sizes.md && sizes.md < sizes.lg))
    issues.push(
      `[assert] title size should increase sm<md<lg, got ${JSON.stringify(sizes)}`,
    )
  await context.close()
}

// Responsive: the banner tracks its parent width with no JS measuring.
{
  const { context, page } = await newPage(1280, 900)
  const widths = await section(page, 'eb-responsive').evaluate((s) => {
    const banners = s.querySelectorAll('[role="alert"]')
    return [...banners].map((b) => b.getBoundingClientRect().width)
  })
  if (!(widths.length === 2 && widths[0] > widths[1] * 1.5))
    issues.push(
      `[assert] banner should follow parent width (full vs half), got ${JSON.stringify(widths)}`,
    )
  await context.close()
}

// RTL: wrapper present, computed direction rtl, action + dismiss still render.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'eb-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const dir = await root(page, 'eb-rtl').evaluate(
    (e) => getComputedStyle(e).direction,
  )
  if (dir !== 'rtl')
    issues.push(
      `[assert] RTL ErrorBanner computed direction expected rtl, got ${dir}`,
    )
  if ((await scene.getByRole('button', { name: /تحديث/ }).count()) !== 1)
    issues.push('[assert] RTL ErrorBanner action button missing')
  if ((await scene.getByRole('button', { name: /Dismiss/ }).count()) !== 1)
    issues.push('[assert] RTL ErrorBanner dismiss button missing')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/error-banner-rtl.png` })
  console.log(`screenshot: ${OUT}/error-banner-rtl.png`)
  await context.close()
}

// Static: no animation on the ErrorBanner root (ignore the composed
// IconButton/Button, which own their material and transitions).
{
  const { context, page } = await newPage(1280, 900)
  const animated = await root(page, 'eb-action-dismiss').evaluate((e) => {
    for (const node of [e, ...e.querySelectorAll('*')]) {
      if (node.closest('button')) continue
      if (getComputedStyle(node).animationName !== 'none')
        return `animation on ${node.tagName}`
    }
    return null
  })
  if (animated)
    issues.push(
      `[assert] ErrorBanner should be static (no animation): ${animated}`,
    )
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
