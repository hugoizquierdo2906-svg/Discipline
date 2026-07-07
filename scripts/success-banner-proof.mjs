// SuccessBanner proof — the persistent, in-flow success confirmation. Captures
// (desktop/tablet/mobile) plus programmatic assertions for rendering
// (title/description), role="status", the success-tinted surface, the dismiss
// control (present/absent + self-hide), the optional action button, sizes,
// responsive width, RTL direction, and the static (no animation) guarantee.
// Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/success-banner`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

// The SuccessBanner root is the element carrying role="status".
function root(page, testId) {
  return section(page, testId).locator('[role="status"]').first()
}

// Full-page captures (desktop/tablet/mobile).
for (const [w, h, suffix] of [
  [1280, 4200, ''],
  [834, 5000, '-tablet'],
  [390, 6000, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/success-banner${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/success-banner${suffix}.png`)
  await context.close()
}

// Rendering: title + description present, and role="status" announces it.
{
  const { context, page } = await newPage(1280, 900)
  const r = root(page, 'sb-description')
  if ((await r.count()) !== 1)
    issues.push('[assert] SuccessBanner root (role="status") missing')
  const text = await r.textContent()
  if (!text?.includes('Changes saved'))
    issues.push('[assert] title not rendered')
  if (!text?.includes('now live for everyone'))
    issues.push('[assert] description not rendered')
  await context.close()
}

// Success-tinted surface: the banner draws its own background from the
// success token (not transparent) and a success-token border.
{
  const { context, page } = await newPage(1280, 900)
  const styles = await root(page, 'sb-basic').evaluate((e) => {
    const s = getComputedStyle(e)
    // Opaque channels only appear when the tint token is applied; a fully
    // transparent background parses to zeros across every channel.
    const channels = (s.backgroundColor.match(/[\d.]+/g) ?? []).map(Number)
    const painted = channels.some((c) => c > 0)
    return { painted, border: s.borderTopWidth }
  })
  if (!styles.painted)
    issues.push('[assert] SuccessBanner should own a tinted background')
  if (parseFloat(styles.border) <= 0)
    issues.push('[assert] SuccessBanner should draw a success-token border')
  await context.close()
}

// Dismiss: a close button present, and clicking it self-hides the banner.
{
  const { context, page } = await newPage(1280, 900)
  const s = section(page, 'sb-dismissible')
  const dismiss = s.getByRole('button', { name: /Dismiss/ })
  if ((await dismiss.count()) !== 1)
    issues.push('[assert] Dismissible variant should render a Dismiss button')
  await dismiss.click()
  await page.waitForTimeout(150)
  if ((await s.locator('[role="status"]').count()) !== 0)
    issues.push('[assert] Dismiss should self-hide the banner')
  await context.close()
}

// Without dismiss / without action: bare confirmation, no buttons.
{
  const { context, page } = await newPage(1280, 900)
  const s = section(page, 'sb-basic')
  if ((await s.locator('button').count()) !== 0)
    issues.push('[assert] Basic banner should have no buttons')
  if ((await s.locator('svg').count()) === 0)
    issues.push('[assert] Basic banner should still render its icon')
  await context.close()
}

// Action: an optional primary action button renders.
{
  const { context, page } = await newPage(1280, 900)
  const s = section(page, 'sb-action')
  if ((await s.getByRole('button', { name: /View/ }).count()) !== 1)
    issues.push('[assert] Action variant should render a "View" button')
  await context.close()
}

// Sizes: title font-size increases sm < md < lg.
{
  const { context, page } = await newPage(1280, 900)
  const sizes = {}
  for (const [id, key] of [
    ['sb-sm', 'sm'],
    ['sb-md', 'md'],
    ['sb-lg', 'lg'],
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
  const widths = await section(page, 'sb-responsive').evaluate((s) => {
    const banners = s.querySelectorAll('[role="status"]')
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
  const scene = section(page, 'sb-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const dir = await root(page, 'sb-rtl').evaluate(
    (e) => getComputedStyle(e).direction,
  )
  if (dir !== 'rtl')
    issues.push(
      `[assert] RTL SuccessBanner computed direction expected rtl, got ${dir}`,
    )
  if ((await scene.getByRole('button', { name: /عرض/ }).count()) !== 1)
    issues.push('[assert] RTL SuccessBanner action button missing')
  if ((await scene.getByRole('button', { name: /Dismiss/ }).count()) !== 1)
    issues.push('[assert] RTL SuccessBanner dismiss button missing')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/success-banner-rtl.png` })
  console.log(`screenshot: ${OUT}/success-banner-rtl.png`)
  await context.close()
}

// Static: no animation on the SuccessBanner root (ignore the composed
// IconButton/Button, which own their material and transitions).
{
  const { context, page } = await newPage(1280, 900)
  const animated = await root(page, 'sb-action-dismiss').evaluate((e) => {
    for (const node of [e, ...e.querySelectorAll('*')]) {
      if (node.closest('button')) continue
      if (getComputedStyle(node).animationName !== 'none')
        return `animation on ${node.tagName}`
    }
    return null
  })
  if (animated)
    issues.push(
      `[assert] SuccessBanner should be static (no animation): ${animated}`,
    )
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
