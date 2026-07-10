// Collapsible proof — the Disclosure atom. Captures (desktop/tablet/mobile)
// plus programmatic assertions: basic open/close, controlled, uncontrolled,
// defaultOpen, disabled, forceMount, long content with no fixed height,
// nested independence, custom asChild trigger, RTL, responsive, keyboard
// (Tab/Enter/Space), and ARIA/focus. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/collapsible`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

// Full-page captures.
for (const [w, h, suffix] of [
  [1280, 6500, ''],
  [834, 7000, '-tablet'],
  [390, 8500, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/collapsible${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/collapsible${suffix}.png`)
  await context.close()
}

// Basic + ARIA: a real button trigger with aria-expanded, controlling a
// content region via aria-controls, no group/heading semantics imposed.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'cl-basic')
  const trigger = scene.getByRole('button', { name: 'Show details' })
  if ((await trigger.getAttribute('aria-expanded')) !== 'false')
    issues.push('[assert] closed trigger should have aria-expanded=false')
  const parentTag = await trigger.evaluate((e) => e.parentElement?.tagName)
  if (parentTag && /^H[1-6]$/.test(parentTag))
    issues.push(
      `[assert] Collapsible must NOT wrap its trigger in a heading (unlike Accordion), got parent <${parentTag}>`,
    )
  await trigger.click()
  await page.waitForTimeout(150)
  if ((await trigger.getAttribute('aria-expanded')) !== 'true')
    issues.push('[assert] open trigger should have aria-expanded=true')
  const controlsId = await trigger.getAttribute('aria-controls')
  const content = page.locator(`#${controlsId}`)
  if ((await content.count()) !== 1)
    issues.push('[assert] aria-controls should reference a real content region')
  if (!(await content.isVisible()))
    issues.push('[assert] content should be visible once open')
  await context.close()
}

// Controlled: external state drives open/closed via open + onOpenChange.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'cl-controlled')
  const trigger = scene.getByRole('button', { name: 'Session notes' })
  if ((await trigger.getAttribute('aria-expanded')) !== 'false')
    issues.push('[assert] controlled: should start closed')
  await scene.getByRole('button', { name: 'Open' }).click()
  await page.waitForTimeout(150)
  if ((await trigger.getAttribute('aria-expanded')) !== 'true')
    issues.push(
      '[assert] controlled: external "Open" button should open the region',
    )
  await scene.getByRole('button', { name: 'Close' }).click()
  await page.waitForTimeout(150)
  if ((await trigger.getAttribute('aria-expanded')) !== 'false')
    issues.push(
      '[assert] controlled: external "Close" button should close the region',
    )
  await context.close()
}

// Uncontrolled: click toggles its own internal state with no external prop.
{
  const { context, page } = await newPage(1280, 900)
  const trigger = section(page, 'cl-uncontrolled').getByRole('button', {
    name: 'Equipment needed',
  })
  await trigger.click()
  await page.waitForTimeout(150)
  if ((await trigger.getAttribute('aria-expanded')) !== 'true')
    issues.push('[assert] uncontrolled: clicking should open it')
  await trigger.click()
  await page.waitForTimeout(150)
  if ((await trigger.getAttribute('aria-expanded')) !== 'false')
    issues.push('[assert] uncontrolled: clicking again should close it')
  await context.close()
}

// Default open: defaultOpen starts revealed.
{
  const { context, page } = await newPage(1280, 900)
  const trigger = section(page, 'cl-default-open').getByRole('button', {
    name: 'Coach notes',
  })
  if ((await trigger.getAttribute('aria-expanded')) !== 'true')
    issues.push('[assert] defaultOpen should start expanded')
  await context.close()
}

// Disabled: the trigger cannot be toggled at all.
{
  const { context, page } = await newPage(1280, 900)
  const trigger = section(page, 'cl-disabled').getByRole('button', {
    name: 'Locked section',
  })
  if (!(await trigger.isDisabled()))
    issues.push('[assert] disabled Collapsible trigger should be disabled')
  await context.close()
}

// forceMount: the content stays mounted in the DOM even while closed.
{
  const { context, page } = await newPage(1280, 900)
  const trigger = section(page, 'cl-force-mount').getByRole('button', {
    name: 'Advanced settings',
  })
  if ((await trigger.getAttribute('aria-expanded')) !== 'false')
    issues.push('[assert] forceMount trigger should start closed')
  const content = page.locator('[data-testid="cl-force-mount-content"]')
  if ((await content.count()) !== 1)
    issues.push(
      '[assert] forceMount content should be present in the DOM even while closed',
    )
  await context.close()
}

// Long content: no fixed height, no internal scroll.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'cl-long-content')
  const trigger = scene.getByRole('button', { name: 'Terms of service' })
  const controlsId = await trigger.getAttribute('aria-controls')
  const content = page.locator(`#${controlsId}`)
  const info = await content.evaluate((e) => {
    const cs = getComputedStyle(e)
    return {
      maxHeight: cs.maxHeight,
      overflowY: cs.overflowY,
      height: e.getBoundingClientRect().height,
    }
  })
  if (info.maxHeight !== 'none')
    issues.push(
      `[assert] long content must not have a fixed max-height, got ${info.maxHeight}`,
    )
  if (info.overflowY === 'scroll' || info.overflowY === 'auto')
    issues.push(
      `[assert] long content must not scroll internally, got overflow-y=${info.overflowY}`,
    )
  if (!(info.height > 60))
    issues.push(
      `[assert] long content should render at its natural, larger height, got ${info.height}`,
    )
  await context.close()
}

// Nested: an inner Collapsible inside an outer one's content, independent
// state.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'cl-nested')
  const inner = scene.getByRole('button', { name: 'Week 1 — Foundations' })
  if ((await inner.getAttribute('aria-expanded')) !== 'false')
    issues.push(
      '[assert] nested inner Collapsible should start closed independently',
    )
  await inner.click()
  await page.waitForTimeout(150)
  if ((await inner.getAttribute('aria-expanded')) !== 'true')
    issues.push(
      '[assert] nested inner Collapsible trigger should open on click',
    )
  await context.close()
}

// Icon: the chevron rotates a flat 180° on open, no bounce/spring.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'cl-icon')
  const trigger = scene.getByRole('button', { name: /Toggle to see/ })
  const before = await trigger
    .locator('svg')
    .evaluate((e) => getComputedStyle(e).transform)
  await trigger.click()
  await page.waitForTimeout(250)
  const after = await trigger
    .locator('svg')
    .evaluate((e) => getComputedStyle(e).transform)
  if (before === after)
    issues.push(
      '[assert] chevron transform should change when the region opens',
    )
  const transitionInfo = await trigger.locator('svg').evaluate((e) => {
    const cs = getComputedStyle(e)
    return { duration: cs.transitionDuration, property: cs.transitionProperty }
  })
  if (!transitionInfo.property.includes('transform'))
    issues.push('[assert] chevron should transition its transform')
  const ms =
    parseFloat(transitionInfo.duration) *
    (transitionInfo.duration.includes('ms') ? 1 : 1000)
  if (!(ms > 0 && ms <= 300))
    issues.push(
      `[assert] chevron rotation should be quick/calm (<=300ms), got ${transitionInfo.duration}`,
    )
  await context.close()
}

// Custom trigger (asChild): the consumer's own element becomes the trigger
// verbatim — no default chevron/className imposed on top of it.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'cl-custom-trigger')
  const trigger = scene.getByRole('button', { name: 'Custom button trigger' })
  const tag = await trigger.evaluate((e) => e.tagName)
  if (tag !== 'BUTTON')
    issues.push(
      `[assert] asChild trigger should render the consumer's own element, got ${tag}`,
    )
  const chevronCount = await trigger.locator('svg.transition-transform').count()
  if (chevronCount !== 0)
    issues.push('[assert] asChild trigger must not receive the default chevron')
  const hasMarker = await trigger.evaluate((e) =>
    e.classList.contains('cl-custom-marker'),
  )
  if (!hasMarker)
    issues.push(
      "[assert] a className passed alongside asChild must merge onto the consumer's own element, not be dropped",
    )
  await trigger.click()
  await page.waitForTimeout(150)
  if ((await trigger.getAttribute('aria-expanded')) !== 'true')
    issues.push('[assert] asChild trigger should still toggle the region open')
  await context.close()
}

// RTL: computed direction rtl, trigger/content still function correctly.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'cl-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const trigger = scene.getByRole('button', { name: 'الشحن' })
  const dir = await trigger.evaluate((e) => getComputedStyle(e).direction)
  if (dir !== 'rtl')
    issues.push(`[assert] RTL trigger direction expected rtl, got ${dir}`)
  await trigger.click()
  await page.waitForTimeout(150)
  if ((await trigger.getAttribute('aria-expanded')) !== 'true')
    issues.push('[assert] RTL trigger should still open on click')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/collapsible-rtl.png` })
  console.log(`screenshot: ${OUT}/collapsible-rtl.png`)
  await context.close()
}

// Responsive: identical behaviour at a narrow width — only layout changes.
{
  for (const w of [1280, 390]) {
    const { context, page } = await newPage(w, 900)
    const trigger = section(page, 'cl-responsive').getByRole('button', {
      name: 'Shipping',
    })
    await trigger.click()
    await page.waitForTimeout(150)
    if ((await trigger.getAttribute('aria-expanded')) !== 'true')
      issues.push(
        `[assert] responsive Collapsible should open normally at ${w}px`,
      )
    await context.close()
  }
}

// Keyboard + focus: Tab focuses the trigger; Enter and Space both toggle —
// all inherited from Radix.
{
  const { context, page } = await newPage(1280, 900)
  const trigger = section(page, 'cl-keyboard').getByRole('button', {
    name: 'Returns',
  })
  await trigger.focus()
  const focused = await trigger.evaluate((e) => e === document.activeElement)
  if (!focused) issues.push('[assert] trigger should be focusable via keyboard')

  await page.keyboard.press('Enter')
  await page.waitForTimeout(150)
  if ((await trigger.getAttribute('aria-expanded')) !== 'true')
    issues.push('[assert] Enter should toggle the focused trigger open')

  await page.keyboard.press('Space')
  await page.waitForTimeout(150)
  if ((await trigger.getAttribute('aria-expanded')) !== 'false')
    issues.push('[assert] Space should toggle the focused trigger closed')
  await context.close()
}

// No regression: a spot check across the frozen Accordion (Collapsible's
// own parent primitive) and a couple of other pages.
{
  const { context, page } = await newPage(1280, 900)
  for (const path of ['/dev/accordion', '/dev/separator', '/dev/text']) {
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
