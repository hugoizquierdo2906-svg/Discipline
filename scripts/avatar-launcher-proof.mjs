// AvatarLauncher proof — the single, calm entry point to the DISCIPLINE Guide.
// Captures (desktop/tablet/mobile) plus programmatic assertions for every state
// (idle, unread, active, coach, loading, unavailable, disabled), the accessible
// name + ARIA (haspopup dialog, expanded, busy), keyboard activation (Enter +
// Space) and no keyboard trap, the touch target, sizes, and RTL flipping.
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
  await page.goto(`${BASE}/dev/avatar-launcher`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}
function launcher(page, testId) {
  return section(page, testId).locator('button[data-state]').first()
}

// Full-page captures.
for (const [w, h, suffix] of [
  [1280, 2600, ''],
  [834, 2900, '-tablet'],
  [390, 3600, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/avatar-launcher${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/avatar-launcher${suffix}.png`)
  await context.close()
}

// Idle: accessible name, ARIA disclosure semantics, enabled.
{
  const { context, page } = await newPage(1280, 900)
  const b = launcher(page, 'al-idle')
  const a = await b.evaluate((e) => ({
    name: e.getAttribute('aria-label'),
    haspopup: e.getAttribute('aria-haspopup'),
    expanded: e.getAttribute('aria-expanded'),
    disabled: e.disabled,
    state: e.getAttribute('data-state'),
  }))
  if (!a.name || !/Open the DISCIPLINE Guide/.test(a.name))
    issues.push(`[assert] idle accessible name wrong: ${a.name}`)
  if (a.haspopup !== 'dialog')
    issues.push(
      `[assert] launcher should have aria-haspopup="dialog", got ${a.haspopup}`,
    )
  if (a.expanded !== 'false')
    issues.push(
      `[assert] idle aria-expanded should be false, got ${a.expanded}`,
    )
  if (a.disabled) issues.push('[assert] idle should be enabled')
  await context.close()
}

// Click activation + keyboard activation (Enter, Space) + no keyboard trap.
{
  const { context, page } = await newPage(1280, 900)
  const b = launcher(page, 'al-idle')
  const count = () =>
    section(page, 'al-idle')
      .locator('[data-testid="al-open-count"]')
      .innerText()
  await b.click()
  if (!/Opened 1 times/.test(await count()))
    issues.push(`[assert] click should open once, got "${await count()}"`)
  await b.focus()
  await page.keyboard.press('Enter')
  if (!/Opened 2 times/.test(await count()))
    issues.push(`[assert] Enter should activate, got "${await count()}"`)
  await b.focus()
  await page.keyboard.press('Space')
  if (!/Opened 3 times/.test(await count()))
    issues.push(`[assert] Space should activate, got "${await count()}"`)
  // No keyboard trap: after focusing, Tab moves focus away from the launcher.
  await b.focus()
  await page.keyboard.press('Tab')
  const stillOnLauncher = await b.evaluate((e) => e === document.activeElement)
  if (stillOnLauncher)
    issues.push('[assert] launcher must not trap keyboard focus')
  await context.close()
}

// Unread: a neutral Badge count, and the count folded into the accessible name.
{
  const { context, page } = await newPage(1280, 900)
  const s = section(page, 'al-unread')
  const badges = s.locator('span.ds-badge')
  if ((await badges.count()) < 1)
    issues.push('[assert] unread should render a Badge')
  const first = await badges.first().innerText()
  if (first.trim() !== '3')
    issues.push(`[assert] unread badge should read 3, got ${first}`)
  const capped = await badges.nth(1).innerText()
  if (capped.trim() !== '99+')
    issues.push(`[assert] unread 128 should cap to 99+, got ${capped}`)
  const name = await launcher(page, 'al-unread').getAttribute('aria-label')
  if (!/3 unread/.test(name ?? ''))
    issues.push(`[assert] unread should announce the count, got ${name}`)
  await context.close()
}

// Conversation active: aria-expanded true + the engaged (primary) halo variant.
{
  const { context, page } = await newPage(1280, 900)
  const b = launcher(page, 'al-active')
  const a = await b.evaluate((e) => ({
    expanded: e.getAttribute('aria-expanded'),
    glass: e.getAttribute('data-glass-variant'),
  }))
  if (a.expanded !== 'true')
    issues.push(
      `[assert] active aria-expanded should be true, got ${a.expanded}`,
    )
  if (a.glass !== 'primary')
    issues.push(
      `[assert] active should use the engaged primary variant, got ${a.glass}`,
    )
  await context.close()
}

// Coach active: the coach's presence marker (Avatar initials) + accessible name.
{
  const { context, page } = await newPage(1280, 900)
  const s = section(page, 'al-coach')
  if (!/MC/.test(await s.innerText()))
    issues.push(
      '[assert] coach state should render the coach presence marker (initials)',
    )
  const name = await launcher(page, 'al-coach').getAttribute('aria-label')
  if (!/coach has joined/.test(name ?? ''))
    issues.push(`[assert] coach accessible name wrong: ${name}`)
  await context.close()
}

// Loading: Spinner present, aria-busy, non-interactive.
{
  const { context, page } = await newPage(1280, 900)
  const b = launcher(page, 'al-loading')
  const a = await b.evaluate((e) => ({
    busy: e.getAttribute('aria-busy'),
    disabled: e.disabled,
    spinner: !!e.querySelector('[role="status"]'),
  }))
  if (a.busy !== 'true')
    issues.push(`[assert] loading should set aria-busy, got ${a.busy}`)
  if (!a.disabled) issues.push('[assert] loading should be non-interactive')
  if (!a.spinner)
    issues.push('[assert] loading should render a Spinner (role=status)')
  await context.close()
}

// Unavailable + disabled: both non-interactive; unavailable stays honest in its name.
{
  const { context, page } = await newPage(1280, 900)
  const un = launcher(page, 'al-unavailable')
  if (!(await un.isDisabled()))
    issues.push('[assert] unavailable should be disabled')
  if (!/unavailable/i.test((await un.getAttribute('aria-label')) ?? ''))
    issues.push('[assert] unavailable accessible name should say so')
  const dis = launcher(page, 'al-disabled')
  if (!(await dis.isDisabled()))
    issues.push('[assert] disabled should be disabled')
  await context.close()
}

// Touch target: the single considered launcher comfortably clears the 44px
// minimum, on every viewport (the target never shrinks responsively).
{
  for (const [w, h] of [
    [1280, 900],
    [390, 844],
  ]) {
    const { context, page } = await newPage(w, h)
    const box = await launcher(page, 'al-size').boundingBox()
    if (!box || box.height < 44 || box.width < 44)
      issues.push(
        `[assert] launcher must be ≥44px touch target at ${w}px, got ${JSON.stringify(box)}`,
      )
    await context.close()
  }
}

// RTL: the corner unread marker flips to the inline-start (visual left) side.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'al-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const b = launcher(page, 'al-rtl')
  const badge = scene.locator('span.ds-badge').first()
  const geo = await b.evaluate((el) => el.getBoundingClientRect())
  const bgeo = await badge.evaluate((el) => el.getBoundingClientRect())
  const buttonCenter = geo.x + geo.width / 2
  const badgeCenter = bgeo.x + bgeo.width / 2
  if (!(badgeCenter < buttonCenter))
    issues.push(
      '[assert] under RTL the unread marker should flip to the start (left) corner',
    )
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/avatar-launcher-rtl.png` })
  console.log(`screenshot: ${OUT}/avatar-launcher-rtl.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
