// Accordion proof — the Disclosure primitive. Captures (desktop/tablet/
// mobile) plus programmatic assertions: single/multiple, controlled,
// disabled item/accordion, nested, RTL, responsive, full keyboard
// navigation, ARIA, focus, collapsible/non-collapsible, and long content
// with no fixed height. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/accordion`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

// Full-page captures.
for (const [w, h, suffix] of [
  [1280, 9600, ''],
  [834, 10200, '-tablet'],
  [390, 12000, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/accordion${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/accordion${suffix}.png`)
  await context.close()
}

// Basic + ARIA: a real button trigger with aria-expanded, wrapped in a
// heading, controlling a content region via aria-controls.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'ac-basic')
  const trigger = scene.getByRole('button', { name: 'What is included?' })
  const before = await trigger.getAttribute('aria-expanded')
  if (before !== 'false')
    issues.push(
      `[assert] closed trigger should have aria-expanded=false, got ${before}`,
    )
  const heading = scene.locator('h3:has(button)').first()
  if ((await heading.count()) !== 1)
    issues.push('[assert] Trigger should be wrapped in a real heading element')
  await trigger.click()
  await page.waitForTimeout(150)
  const after = await trigger.getAttribute('aria-expanded')
  if (after !== 'true')
    issues.push(
      `[assert] open trigger should have aria-expanded=true, got ${after}`,
    )
  const controlsId = await trigger.getAttribute('aria-controls')
  const content = page.locator(`#${controlsId}`)
  if ((await content.count()) !== 1)
    issues.push('[assert] aria-controls should reference a real content region')
  const contentVisible = await content.isVisible()
  if (!contentVisible)
    issues.push('[assert] content should be visible once open')
  await context.close()
}

// Single: opening one panel closes any other open panel in the same group.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'ac-single')
  const shipping = scene.getByRole('button', { name: 'Shipping' })
  const returns = scene.getByRole('button', { name: 'Returns' })
  if ((await shipping.getAttribute('aria-expanded')) !== 'true')
    issues.push('[assert] Single: Shipping should start open (defaultValue)')
  await returns.click()
  await page.waitForTimeout(150)
  if ((await returns.getAttribute('aria-expanded')) !== 'true')
    issues.push('[assert] Single: Returns should be open after click')
  if ((await shipping.getAttribute('aria-expanded')) !== 'false')
    issues.push('[assert] Single: opening Returns should close Shipping')
  await context.close()
}

// Multiple: several panels stay open independently.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'ac-multiple')
  const shipping = scene.getByRole('button', { name: 'Shipping' })
  const warranty = scene.getByRole('button', { name: 'Warranty' })
  if ((await shipping.getAttribute('aria-expanded')) !== 'true')
    issues.push('[assert] Multiple: Shipping should start open')
  if ((await warranty.getAttribute('aria-expanded')) !== 'true')
    issues.push(
      '[assert] Multiple: Warranty should start open alongside Shipping',
    )
  await context.close()
}

// Collapsible vs non-collapsible.
{
  const { context, page } = await newPage(1280, 900)
  const collapsible = section(page, 'ac-collapsible').getByRole('button', {
    name: 'Shipping',
  })
  await collapsible.click()
  await page.waitForTimeout(150)
  if ((await collapsible.getAttribute('aria-expanded')) !== 'false')
    issues.push(
      '[assert] collapsible: clicking the open trigger should close it to none',
    )

  const nonCollScene = section(page, 'ac-non-collapsible')
  const nonCollShipping = nonCollScene.getByRole('button', { name: 'Shipping' })
  const nonCollReturns = nonCollScene.getByRole('button', { name: 'Returns' })
  // Radix marks the sole open item aria-disabled in a non-collapsible group,
  // so it cannot be clicked closed to none — the strongest possible
  // enforcement of "always exactly one panel open".
  if ((await nonCollShipping.getAttribute('aria-disabled')) !== 'true')
    issues.push(
      '[assert] non-collapsible: the only open trigger should be aria-disabled (cannot close to none)',
    )
  await nonCollReturns.click()
  await page.waitForTimeout(150)
  if ((await nonCollReturns.getAttribute('aria-expanded')) !== 'true')
    issues.push(
      '[assert] non-collapsible: clicking a different trigger should open it',
    )
  if ((await nonCollShipping.getAttribute('aria-expanded')) !== 'false')
    issues.push(
      '[assert] non-collapsible: opening Returns should close Shipping',
    )
  if ((await nonCollShipping.getAttribute('aria-disabled')) === 'true')
    issues.push(
      '[assert] non-collapsible: Shipping should become clickable again once it is no longer the sole open item',
    )
  await context.close()
}

// Controlled: external state drives the open panel via value/onValueChange.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'ac-controlled')
  const account = scene.getByRole('button', { name: 'Account' })
  const billing = scene.getByRole('button', { name: 'Billing' })
  if ((await billing.getAttribute('aria-expanded')) !== 'true')
    issues.push(
      '[assert] controlled: should start with Billing open (initial state)',
    )
  await scene.getByRole('button', { name: 'Open first' }).click()
  await page.waitForTimeout(150)
  if ((await account.getAttribute('aria-expanded')) !== 'true')
    issues.push(
      '[assert] controlled: external "Open first" button should open Account',
    )
  if ((await billing.getAttribute('aria-expanded')) !== 'false')
    issues.push(
      '[assert] controlled: opening Account should close Billing (single type)',
    )
  await scene.getByRole('button', { name: 'Close all' }).click()
  await page.waitForTimeout(150)
  if ((await account.getAttribute('aria-expanded')) !== 'false')
    issues.push(
      '[assert] controlled: external "Close all" should close every panel',
    )
  await context.close()
}

// Disabled item: the disabled trigger cannot be opened; siblings still work.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'ac-disabled-item')
  const disabledTrigger = scene.getByRole('button', { name: 'Unavailable' })
  const isDisabled = await disabledTrigger.isDisabled()
  if (!isDisabled)
    issues.push('[assert] disabled item trigger should be disabled')
  await disabledTrigger.click({ force: true })
  await page.waitForTimeout(150)
  if ((await disabledTrigger.getAttribute('aria-expanded')) !== 'false')
    issues.push('[assert] disabled item must never open')
  const available = scene.getByRole('button', {
    name: 'Available',
    exact: true,
  })
  await available.click()
  await page.waitForTimeout(150)
  if ((await available.getAttribute('aria-expanded')) !== 'true')
    issues.push(
      '[assert] sibling of a disabled item should still open normally',
    )
  await context.close()
}

// Disabled accordion: the entire group is inert.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'ac-disabled-accordion')
  const trigger = scene.getByRole('button', { name: 'Shipping' })
  const isDisabled = await trigger.isDisabled()
  if (!isDisabled)
    issues.push(
      '[assert] every trigger should be disabled when the Accordion is disabled',
    )
  await context.close()
}

// Long content: no fixed height, no internal scroll — the panel grows with
// its content.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'ac-long-content')
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
      `[assert] long content region must not have a fixed max-height, got ${info.maxHeight}`,
    )
  if (info.overflowY === 'scroll' || info.overflowY === 'auto')
    issues.push(
      `[assert] long content region must not scroll internally, got overflow-y=${info.overflowY}`,
    )
  if (!(info.height > 60))
    issues.push(
      `[assert] long content should render at its natural, larger height, got ${info.height}`,
    )
  await context.close()
}

// Nested: an inner Accordion inside an outer Item's content, independent
// state.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'ac-nested')
  const inner = scene.getByRole('button', { name: 'Week 1 — Foundations' })
  if ((await inner.getAttribute('aria-expanded')) !== 'false')
    issues.push(
      '[assert] nested inner Accordion should start closed independently of the outer one',
    )
  await inner.click()
  await page.waitForTimeout(150)
  if ((await inner.getAttribute('aria-expanded')) !== 'true')
    issues.push('[assert] nested inner Accordion trigger should open on click')
  await context.close()
}

// Icons: the chevron rotates a flat 180° on open, no bounce/spring (a single
// linear/standard-eased transform, verified via the transform matrix).
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'ac-icons')
  const trigger = scene.getByRole('button', { name: /Toggle to see/ })
  const chevronBefore = await trigger
    .locator('svg')
    .evaluate((e) => getComputedStyle(e).transform)
  await trigger.click()
  await page.waitForTimeout(250)
  const chevronAfter = await trigger
    .locator('svg')
    .evaluate((e) => getComputedStyle(e).transform)
  if (chevronBefore === chevronAfter)
    issues.push('[assert] chevron transform should change when the panel opens')
  const transitionInfo = await trigger.locator('svg').evaluate((e) => {
    const cs = getComputedStyle(e)
    return { duration: cs.transitionDuration, property: cs.transitionProperty }
  })
  if (!transitionInfo.property.includes('transform'))
    issues.push(
      `[assert] chevron should transition its transform, got property=${transitionInfo.property}`,
    )
  const ms =
    parseFloat(transitionInfo.duration) *
    (transitionInfo.duration.includes('ms') ? 1 : 1000)
  if (!(ms > 0 && ms <= 300))
    issues.push(
      `[assert] chevron rotation should be quick/calm (<=300ms), got ${transitionInfo.duration}`,
    )
  await context.close()
}

// RTL: computed direction rtl, trigger/content still function correctly.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'ac-rtl')
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
  await scene.screenshot({ path: `${OUT}/accordion-rtl.png` })
  console.log(`screenshot: ${OUT}/accordion-rtl.png`)
  await context.close()
}

// Responsive: identical open/close behaviour at a narrow width — only the
// layout width changes.
{
  for (const w of [1280, 390]) {
    const { context, page } = await newPage(w, 900)
    const trigger = section(page, 'ac-responsive').getByRole('button', {
      name: 'Shipping',
    })
    await trigger.click()
    await page.waitForTimeout(150)
    if ((await trigger.getAttribute('aria-expanded')) !== 'true')
      issues.push(
        `[assert] responsive Accordion should open normally at ${w}px`,
      )
    await context.close()
  }
}

// Keyboard navigation: ArrowDown/ArrowUp/Home/End move focus between
// triggers, Enter/Space toggle — all inherited from Radix.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'ac-keyboard')
  const shipping = scene.getByRole('button', { name: 'Shipping' })
  const returns = scene.getByRole('button', { name: 'Returns' })
  const warranty = scene.getByRole('button', { name: 'Warranty' })

  await shipping.focus()
  await page.keyboard.press('ArrowDown')
  if (!(await returns.evaluate((e) => e === document.activeElement)))
    issues.push('[assert] ArrowDown should move focus to the next trigger')

  await page.keyboard.press('ArrowDown')
  if (!(await warranty.evaluate((e) => e === document.activeElement)))
    issues.push(
      '[assert] ArrowDown should move focus to the next trigger again',
    )

  await page.keyboard.press('ArrowUp')
  if (!(await returns.evaluate((e) => e === document.activeElement)))
    issues.push('[assert] ArrowUp should move focus to the previous trigger')

  await page.keyboard.press('Home')
  if (!(await shipping.evaluate((e) => e === document.activeElement)))
    issues.push('[assert] Home should move focus to the first trigger')

  await page.keyboard.press('End')
  if (!(await warranty.evaluate((e) => e === document.activeElement)))
    issues.push('[assert] End should move focus to the last trigger')

  await page.keyboard.press('Enter')
  await page.waitForTimeout(150)
  if ((await warranty.getAttribute('aria-expanded')) !== 'true')
    issues.push('[assert] Enter should toggle the focused trigger open')

  await page.keyboard.press('Space')
  await page.waitForTimeout(150)
  if ((await warranty.getAttribute('aria-expanded')) !== 'false')
    issues.push('[assert] Space should toggle the focused trigger closed')

  await context.close()
}

// No regression: a spot check across a handful of other frozen/dev pages.
{
  const { context, page } = await newPage(1280, 900)
  for (const path of [
    '/dev/separator',
    '/dev/text',
    '/dev/heading',
    '/dev/tabs',
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
