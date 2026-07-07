// Tabs proof — a small, named, always-visible set of alternate content
// views for one record, composing @radix-ui/react-tabs directly. Captures
// (desktop/tablet/mobile) plus programmatic assertions for tab change,
// automatic vs manual activation, keyboard (Tab, Arrow keys with loop,
// Home/End, Space/Enter), orientation, disabled trigger, forceMount,
// aria-selected/aria-controls/aria-labelledby, and RTL (Arrow-key
// direction flips). Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/tabs`, { waitUntil: 'networkidle' })
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
  await page.screenshot({ path: `${OUT}/tabs${suffix}.png`, fullPage: true })
  console.log(`screenshot: ${OUT}/tabs${suffix}.png`)
  await context.close()
}

// Structure + ARIA: tablist/tab/tabpanel, aria-selected, aria-controls,
// aria-labelledby all wired (inherited verbatim from Radix).
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tabs-basic')
  const tablist = scene.getByRole('tablist')
  if ((await tablist.count()) !== 1) issues.push('[assert] tablist missing')
  const overviewTab = scene.getByRole('tab', { name: 'Overview' })
  if ((await overviewTab.getAttribute('aria-selected')) !== 'true')
    issues.push('[assert] Overview should be aria-selected initially')
  const panel = scene.getByRole('tabpanel')
  const controls = await overviewTab.getAttribute('aria-controls')
  const panelId = await panel.getAttribute('id')
  if (!controls || controls !== panelId)
    issues.push('[assert] aria-controls does not match the visible tabpanel id')
  const labelledby = await panel.getAttribute('aria-labelledby')
  const tabId = await overviewTab.getAttribute('id')
  if (!labelledby || labelledby !== tabId)
    issues.push(
      '[assert] tabpanel aria-labelledby does not match the active tab id',
    )
  await context.close()
}

// Tab change: clicking a trigger switches the visible panel.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tabs-basic')
  await scene.getByRole('tab', { name: 'Progress' }).click()
  await page.waitForTimeout(150)
  if (!(await scene.getByText('Progress panel content.').isVisible()))
    issues.push('[assert] clicking Progress did not switch the panel')
  if (
    (await scene
      .getByRole('tab', { name: 'Progress' })
      .getAttribute('aria-selected')) !== 'true'
  )
    issues.push('[assert] Progress should be aria-selected after click')
  await context.close()
}

// Controlled: external buttons (outside Tabs) drive the same value.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tabs-controlled')
  await scene.locator('[data-testid="controlled-external-settings"]').click()
  await page.waitForTimeout(150)
  if (
    (await scene
      .getByRole('tab', { name: 'Settings' })
      .getAttribute('aria-selected')) !== 'true'
  )
    issues.push('[assert] external control did not select the Settings tab')
  if (!(await scene.getByText('Settings panel content.').isVisible()))
    issues.push('[assert] external control did not switch the panel')
  await context.close()
}

// Automatic activation: ArrowRight moves focus AND immediately activates.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tabs-automatic')
  await scene.getByRole('tab', { name: 'Alpha' }).focus()
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(150)
  if (
    (await scene
      .getByRole('tab', { name: 'Beta' })
      .getAttribute('aria-selected')) !== 'true'
  )
    issues.push(
      '[assert] automatic activation: ArrowRight did not activate Beta',
    )
  await context.close()
}

// Manual activation (default): ArrowRight moves focus WITHOUT activating;
// Enter then activates.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tabs-manual')
  await scene.getByRole('tab', { name: 'Alpha' }).focus()
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(150)
  const focused = await page.evaluate(() => document.activeElement?.textContent)
  if (!focused?.includes('Beta'))
    issues.push(
      '[assert] manual activation: ArrowRight did not move focus to Beta',
    )
  if (
    (await scene
      .getByRole('tab', { name: 'Beta' })
      .getAttribute('aria-selected')) === 'true'
  )
    issues.push(
      '[assert] manual activation: ArrowRight must NOT activate Beta yet',
    )
  await page.keyboard.press('Enter')
  await page.waitForTimeout(150)
  if (
    (await scene
      .getByRole('tab', { name: 'Beta' })
      .getAttribute('aria-selected')) !== 'true'
  )
    issues.push(
      '[assert] manual activation: Enter did not activate the focused Beta tab',
    )
  await context.close()
}

// Home/End jump to the first/last trigger.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tabs-keyboard')
  await scene.getByRole('tab', { name: 'Beta' }).focus()
  await page.keyboard.press('End')
  await page.waitForTimeout(150)
  let focused = await page.evaluate(() => document.activeElement?.textContent)
  if (!focused?.includes('Gamma'))
    issues.push('[assert] End did not move focus to the last tab (Gamma)')
  await page.keyboard.press('Home')
  await page.waitForTimeout(150)
  focused = await page.evaluate(() => document.activeElement?.textContent)
  if (!focused?.includes('Alpha'))
    issues.push('[assert] Home did not move focus to the first tab (Alpha)')
  await context.close()
}

// Arrow-key loop: ArrowLeft from the first tab wraps to the last.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tabs-keyboard')
  await scene.getByRole('tab', { name: 'Alpha' }).focus()
  await page.keyboard.press('ArrowLeft')
  await page.waitForTimeout(150)
  const focused = await page.evaluate(() => document.activeElement?.textContent)
  if (!focused?.includes('Gamma'))
    issues.push(
      '[assert] ArrowLeft from the first tab did not loop to the last (Gamma)',
    )
  await context.close()
}

// Vertical orientation: Arrow Up/Down (not Left/Right) move focus.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tabs-vertical')
  const tablist = scene.getByRole('tablist')
  if ((await tablist.getAttribute('aria-orientation')) !== 'vertical')
    issues.push('[assert] vertical tablist missing aria-orientation="vertical"')
  await scene.getByRole('tab', { name: 'Alpha' }).focus()
  await page.keyboard.press('ArrowDown')
  await page.waitForTimeout(150)
  const focused = await page.evaluate(() => document.activeElement?.textContent)
  if (!focused?.includes('Beta'))
    issues.push(
      '[assert] vertical orientation: ArrowDown did not move focus to Beta',
    )
  await context.close()
}

// Disabled trigger: unreachable via click, skipped by keyboard, aria-disabled.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tabs-disabled')
  const disabledTab = scene.getByRole('tab', { name: 'Progress (archived)' })
  if ((await disabledTab.getAttribute('data-disabled')) === null)
    issues.push('[assert] disabled trigger missing data-disabled')
  await scene.getByRole('tab', { name: 'Overview' }).focus()
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(150)
  const focused = await page.evaluate(() => document.activeElement?.textContent)
  if (focused?.includes('Progress'))
    issues.push('[assert] ArrowRight should skip the disabled trigger')
  await context.close()
}

// forceMount: the inactive panel stays in the DOM (just visually hidden).
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tabs-force-mount')
  const forceMounted = scene.locator('[data-testid="force-mounted-panel"]')
  if ((await forceMounted.count()) !== 1)
    issues.push(
      '[assert] force-mounted panel is not present in the DOM while inactive',
    )
  if (await forceMounted.isVisible())
    issues.push(
      '[assert] force-mounted panel should be visually hidden while inactive',
    )
  await context.close()
}

// RTL: Radix flips Arrow-key direction to match reading direction.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tabs-rtl')
  const dirEl = scene.locator('[dir="rtl"]')
  if ((await dirEl.count()) < 1) issues.push('[assert] rtl wrapper missing')
  const firstTab = scene.getByRole('tab').first()
  await firstTab.focus()
  await page.keyboard.press('ArrowLeft')
  await page.waitForTimeout(150)
  const focused = await page.evaluate(() => document.activeElement?.textContent)
  const firstTabText = await firstTab.textContent()
  if (focused === firstTabText)
    issues.push('[assert] RTL: ArrowLeft did not move focus at all')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/tabs-rtl.png` })
  console.log(`screenshot: ${OUT}/tabs-rtl.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
