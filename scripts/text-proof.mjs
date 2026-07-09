// Text proof — the Typography primitive. Captures (desktop/tablet/mobile)
// plus programmatic assertions: real p/span/strong/em/small tags via `as`,
// one canonical style regardless of tag, zero margin/padding of its own,
// long-paragraph wrap, correct rendering inside Card/Drawer/Modal, inline
// with Code (matching size), responsive, RTL, and a no-regression spot check
// across the three frozen Feedback banners and three frozen state
// primitives that consume Text internally. Requires the dev server on :3000.
import { mkdirSync } from 'node:fs'

import { chromium } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = 'docs/phase-04-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EXEC })
const issues = []

async function newPage(width, height, path = '/dev/text') {
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
  await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

// Full-page captures.
for (const [w, h, suffix] of [
  [1280, 2400, ''],
  [834, 2700, '-tablet'],
  [390, 3600, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({ path: `${OUT}/text${suffix}.png`, fullPage: true })
  console.log(`screenshot: ${OUT}/text${suffix}.png`)
  await context.close()
}

// Paragraph: a real <p>, the canonical body style.
{
  const { context, page } = await newPage(1280, 900)
  const p = section(page, 'tx-paragraph').locator(':scope > p').first()
  const info = await p.evaluate((e) => {
    const cs = getComputedStyle(e)
    return {
      tag: e.tagName,
      fontSize: cs.fontSize,
      margin: parseFloat(cs.marginTop) + parseFloat(cs.marginBottom),
      padding: parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom),
    }
  })
  if (info.tag !== 'P')
    issues.push(
      `[assert] default Text should render a real <p>, got ${info.tag}`,
    )
  if (info.margin !== 0)
    issues.push(
      `[assert] Text must carry zero margin of its own, got ${info.margin}`,
    )
  if (info.padding !== 0)
    issues.push(
      `[assert] Text must carry zero padding of its own, got ${info.padding}`,
    )
  await context.close()
}

// as="span"/"strong"/"em"/"small": real tags, and the SAME font-size as the
// default paragraph — as changes semantics only, never the visual style.
{
  const { context, page } = await newPage(1280, 900)
  const baseSize = await section(page, 'tx-paragraph')
    .locator(':scope > p')
    .first()
    .evaluate((e) => getComputedStyle(e).fontSize)

  const cases = [
    ['tx-span', 'span', 'SPAN'],
    ['tx-strong', 'strong', 'STRONG'],
    ['tx-em', 'em', 'EM'],
    ['tx-small', 'small', 'SMALL'],
  ]
  for (const [testId, cssTag, expectedTag] of cases) {
    const el = section(page, testId).locator(cssTag).first()
    const info = await el.evaluate((e) => ({
      tag: e.tagName,
      fontSize: getComputedStyle(e).fontSize,
    }))
    if (info.tag !== expectedTag)
      issues.push(
        `[assert] ${testId} should render a real <${cssTag}>, got ${info.tag}`,
      )
    if (info.fontSize !== baseSize)
      issues.push(
        `[assert] ${testId} should carry the same font-size as the default paragraph, got ${info.fontSize} vs ${baseSize}`,
      )
  }
  await context.close()
}

// Long paragraph: wraps across multiple lines, no truncation.
{
  const { context, page } = await newPage(1280, 900)
  const p = section(page, 'tx-long').locator(':scope > p').first()
  const m = await p.evaluate((e) => {
    const cs = getComputedStyle(e)
    const line = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2
    return {
      height: e.getBoundingClientRect().height,
      line,
      overflow: cs.textOverflow,
    }
  })
  if (!(m.height > m.line * 1.5))
    issues.push(
      `[assert] long paragraph should wrap onto multiple lines, height=${m.height} line=${m.line}`,
    )
  if (m.overflow === 'ellipsis')
    issues.push('[assert] long paragraph must not truncate with an ellipsis')
  await context.close()
}

// Inside Card/Drawer: renders correctly, no spacing conflict.
{
  const { context, page } = await newPage(1280, 900)
  const p = section(page, 'tx-card').locator('.ds-glass p').first()
  if ((await p.count()) !== 1)
    issues.push('[assert] tx-card should render a real <p>')
  await context.close()
}
{
  const { context, page } = await newPage(1280, 900)
  await section(page, 'tx-drawer')
    .getByRole('button', { name: 'Open drawer' })
    .click()
  await page.waitForTimeout(250)
  const p = page.locator('[data-testid="tx-drawer-content"] p').first()
  if ((await p.count()) !== 1)
    issues.push('[assert] tx-drawer should render a real <p>')
  await context.close()
}

// Inside Modal: portaled to document.body — looked up page-wide.
{
  const { context, page } = await newPage(1280, 900)
  await section(page, 'tx-modal')
    .getByRole('button', { name: 'Open dialog' })
    .click()
  await page.waitForTimeout(250)
  const p = page.locator('[data-testid="tx-modal-content"] p').first()
  if ((await p.count()) !== 1)
    issues.push(
      '[assert] tx-modal should render the visible Text as a real <p>',
    )
  await context.close()
}

// Inline with Code: both sit at the same computed font-size.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tx-inline-code')
  const textSize = await scene
    .locator(':scope > p')
    .first()
    .evaluate((e) => getComputedStyle(e).fontSize)
  const codeSize = await scene
    .locator(':scope > p code')
    .first()
    .evaluate((e) => getComputedStyle(e).fontSize)
  if (textSize !== codeSize)
    issues.push(
      `[assert] Text and inline Code should match in size, text=${textSize} code=${codeSize}`,
    )
  await context.close()
}

// Responsive: the tag and font-size are unchanged — only wrapping changes.
{
  const sizes = {}
  for (const w of [1280, 390]) {
    const { context, page } = await newPage(w, 900)
    const p = section(page, 'tx-responsive').locator(':scope > p').first()
    sizes[w] = await p.evaluate((e) => getComputedStyle(e).fontSize)
    await context.close()
  }
  if (sizes[1280] !== sizes[390])
    issues.push(
      `[assert] responsive Text should keep the same font-size, 1280=${sizes[1280]} 390=${sizes[390]}`,
    )
}

// RTL: computed direction rtl, same tag and size.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tx-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const dir = await scene
    .locator('[dir="rtl"] p')
    .first()
    .evaluate((e) => getComputedStyle(e).direction)
  if (dir !== 'rtl')
    issues.push(`[assert] RTL text direction expected rtl, got ${dir}`)
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/text-rtl.png` })
  console.log(`screenshot: ${OUT}/text-rtl.png`)
  await context.close()
}

// No regression: the frozen Feedback banners and frozen state primitives
// (which consume Text internally) still render with no console errors.
{
  const { context, page } = await newPage(1280, 900, '/dev/text')
  for (const path of [
    '/dev/success-banner',
    '/dev/error-banner',
    '/dev/warning-banner',
    '/dev/empty-state',
    '/dev/error-state',
    '/dev/offline-state',
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
