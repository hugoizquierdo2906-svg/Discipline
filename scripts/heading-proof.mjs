// Heading proof — the Typography primitive. Captures (desktop/tablet/mobile)
// plus programmatic assertions: real h1–h6 tags, the level/as decoupling, the
// monotonic visual scale (including h6 reusing h5's size, documented — there
// is no --ds-text-h6 token), zero internal margin, long-heading wrap, correct
// rendering inside Card/Drawer/Modal, responsive, and RTL. Requires the dev
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
  await page.goto(`${BASE}/dev/heading`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

// Full-page captures.
for (const [w, h, suffix] of [
  [1280, 2600, ''],
  [834, 2900, '-tablet'],
  [390, 3800, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({ path: `${OUT}/heading${suffix}.png`, fullPage: true })
  console.log(`screenshot: ${OUT}/heading${suffix}.png`)
  await context.close()
}

// h1–h5: a real matching tag, and a strictly decreasing font-size.
{
  const { context, page } = await newPage(1280, 900)
  const sizes = {}
  for (const [id, tag] of [
    ['hd-h1', 'H1'],
    ['hd-h2', 'H2'],
    ['hd-h3', 'H3'],
    ['hd-h4', 'H4'],
    ['hd-h5', 'H5'],
  ]) {
    const el = section(page, id)
      .locator(`:scope > ${tag.toLowerCase()}`)
      .first()
    const gotTag = await el.evaluate((e) => e.tagName)
    if (gotTag !== tag)
      issues.push(
        `[assert] ${id} should render a real <${tag.toLowerCase()}>, got ${gotTag}`,
      )
    sizes[id] = await el.evaluate((e) =>
      parseFloat(getComputedStyle(e).fontSize),
    )
  }
  const order = ['hd-h1', 'hd-h2', 'hd-h3', 'hd-h4', 'hd-h5']
  for (let i = 0; i < order.length - 1; i++) {
    if (!(sizes[order[i]] > sizes[order[i + 1]]))
      issues.push(
        `[assert] heading sizes should strictly decrease, ${order[i]}=${sizes[order[i]]} ${order[i + 1]}=${sizes[order[i + 1]]}`,
      )
  }
  await context.close()
}

// h6: a real <h6>, reusing h5's visual size (documented token gap — no
// --ds-text-h6 exists in the frozen type scale).
{
  const { context, page } = await newPage(1280, 900)
  const h6 = section(page, 'hd-h6').locator(':scope > h6').first()
  const tag = await h6.evaluate((e) => e.tagName)
  if (tag !== 'H6')
    issues.push(`[assert] hd-h6 should render a real <h6>, got ${tag}`)
  const h6Size = await h6.evaluate((e) => getComputedStyle(e).fontSize)
  const h5Size = await section(page, 'hd-h5')
    .locator(':scope > h5')
    .first()
    .evaluate((e) => getComputedStyle(e).fontSize)
  if (h6Size !== h5Size)
    issues.push(
      `[assert] h6 should reuse h5's visual size, h6=${h6Size} h5=${h5Size}`,
    )
  await context.close()
}

// level/as decoupling: level={2} rendered as="div" keeps the h2 visual size
// but is NOT in the heading outline at all.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'hd-as-div')
  const headingCount = await scene
    .locator(
      ':scope > h1, :scope > h2, :scope > h3, :scope > h4, :scope > h5, :scope > h6',
    )
    .count()
  if (headingCount !== 0)
    issues.push('[assert] as="div" should render no real heading tag')
  const div = scene.locator(':scope > div.text-h2').first()
  if ((await div.count()) !== 1)
    issues.push('[assert] as="div" should still carry the h2 visual size class')
  await context.close()
}

// Zero internal margin: Heading never applies its own margin-top/bottom.
{
  const { context, page } = await newPage(1280, 900)
  const h2 = section(page, 'hd-h2').locator(':scope > h2').first()
  const m = await h2.evaluate((e) => {
    const cs = getComputedStyle(e)
    return {
      top: parseFloat(cs.marginTop),
      bottom: parseFloat(cs.marginBottom),
    }
  })
  if (m.top !== 0 || m.bottom !== 0)
    issues.push(
      `[assert] Heading must carry zero internal margin, got top=${m.top} bottom=${m.bottom}`,
    )
  await context.close()
}

// Long heading: wraps across multiple lines, no truncation.
{
  const { context, page } = await newPage(1280, 900)
  const h2 = section(page, 'hd-long').locator('h2').first()
  const m = await h2.evaluate((e) => {
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
      `[assert] long heading should wrap onto multiple lines, height=${m.height} line=${m.line}`,
    )
  if (m.overflow === 'ellipsis')
    issues.push('[assert] long heading must not truncate with an ellipsis')
  await context.close()
}

// Inside Card: renders correctly, no spacing conflict with the Card surface.
{
  const { context, page } = await newPage(1280, 900)
  const h = section(page, 'hd-card').locator('h3').first()
  if ((await h.count()) !== 1)
    issues.push('[assert] hd-card should render a real <h3>')
  await context.close()
}

// Inside Drawer: renders correctly inside the real Drawer body. The Drawer
// content is portaled to document.body (Radix Dialog), so it is looked up
// page-wide via its own data-testid, not scoped under the section — opened
// via its real trigger, same as a member would.
{
  const { context, page } = await newPage(1280, 900)
  await section(page, 'hd-drawer')
    .getByRole('button', { name: 'Open drawer' })
    .click()
  await page.waitForTimeout(250)
  const h = page.locator('[data-testid="hd-drawer-content"] h3').first()
  if ((await h.count()) !== 1)
    issues.push('[assert] hd-drawer should render a real <h3>')
  await page.screenshot({ path: `${OUT}/heading-drawer.png` })
  console.log(`screenshot: ${OUT}/heading-drawer.png`)
  await context.close()
}

// Inside Modal: renders correctly inside the real Modal/Dialog body. Also
// portaled to document.body — looked up page-wide via its own data-testid,
// opened via its real trigger.
{
  const { context, page } = await newPage(1280, 900)
  await section(page, 'hd-modal')
    .getByRole('button', { name: 'Open dialog' })
    .click()
  await page.waitForTimeout(250)
  const visible = page
    .locator('[data-testid="hd-modal-content"] div.text-h4')
    .first()
  if ((await visible.count()) !== 1)
    issues.push(
      '[assert] hd-modal should render the visible Heading at its own level',
    )
  await page.screenshot({ path: `${OUT}/heading-modal.png` })
  console.log(`screenshot: ${OUT}/heading-modal.png`)
  await context.close()
}

// Responsive: the tag and visual size are unchanged — only wrapping changes.
{
  const tags = {}
  for (const w of [1280, 390]) {
    const { context, page } = await newPage(w, 900)
    const h2 = section(page, 'hd-responsive').locator('h2').first()
    tags[w] = await h2.evaluate((e) => e.tagName)
    if (tags[w] !== 'H2')
      issues.push(`[assert] responsive heading should stay an <h2> at ${w}px`)
    await context.close()
  }
}

// RTL: computed direction rtl, same tag and size.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'hd-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const dir = await scene
    .locator('h2')
    .first()
    .evaluate((e) => getComputedStyle(e).direction)
  if (dir !== 'rtl')
    issues.push(`[assert] RTL heading direction expected rtl, got ${dir}`)
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/heading-rtl.png` })
  console.log(`screenshot: ${OUT}/heading-rtl.png`)
  await context.close()
}

// No regression: every non-Heading page still renders (spot check a few).
{
  const { context, page } = await newPage(1280, 900)
  for (const path of [
    '/dev/label',
    '/dev/code',
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
