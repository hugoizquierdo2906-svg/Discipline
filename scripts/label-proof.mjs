// Label proof — the Forms accessibility primitive. Captures (desktop/tablet/
// mobile) plus programmatic assertions for the accessibility contract: a REAL
// <label>, htmlFor binding (click-to-focus + accessible name), a discreet
// required marker that is NEVER red and is aria-hidden, the disabled state
// (dimmed but visible), long/multiline wrapping, responsive, and RTL. Requires
// the dev server on :3000.
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
  await page.goto(`${BASE}/dev/label`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}
function label(page, testId) {
  return section(page, testId).locator('label').first()
}

// Full-page captures.
for (const [w, h, suffix] of [
  [1280, 2000, ''],
  [834, 2200, '-tablet'],
  [390, 2800, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({ path: `${OUT}/label${suffix}.png`, fullPage: true })
  console.log(`screenshot: ${OUT}/label${suffix}.png`)
  await context.close()
}

// A REAL <label>, bound via htmlFor, that focuses its control on click and
// gives the control its accessible name.
{
  const { context, page } = await newPage(1280, 900)
  const l = label(page, 'lb-basic')
  const tag = await l.evaluate((e) => e.tagName)
  if (tag !== 'LABEL')
    issues.push(`[assert] Label must be a real <label>, got ${tag}`)
  const forId = await l.getAttribute('for')
  if (forId !== 'lb-email')
    issues.push(`[assert] htmlFor should bind to the field, got ${forId}`)
  // Click focuses the field.
  await l.click()
  const focusedId = await page.evaluate(() => document.activeElement?.id)
  if (focusedId !== 'lb-email')
    issues.push(
      `[assert] clicking the label should focus the field, focused=${focusedId}`,
    )
  // The control's accessible name comes from the label text.
  const accName = await page
    .locator('#lb-email')
    .evaluate((e) => e.labels?.[0]?.textContent?.trim())
  if (accName !== 'Email')
    issues.push(
      `[assert] control accessible name should be the label text, got "${accName}"`,
    )
  await context.close()
}

// Required marker: present, aria-hidden, discreet, and NEVER red.
{
  const { context, page } = await newPage(1280, 900)
  const marker = label(page, 'lb-required').locator('span[aria-hidden]')
  if ((await marker.count()) !== 1)
    issues.push(
      '[assert] required should render exactly one aria-hidden marker',
    )
  const info = await marker.evaluate((e) => {
    const c = (getComputedStyle(e).color.match(/[\d.]+/g) ?? []).map(Number)
    return { text: e.textContent, r: c[0], g: c[1], b: c[2] }
  })
  if (info.text?.trim() !== '*')
    issues.push(`[assert] required marker should be "*", got "${info.text}"`)
  // Never red: red would be r markedly greater than g and b (the error token is
  // rgb(185,28,28)). A neutral grey has r≈g≈b.
  if (info.r > info.g + 40 && info.r > info.b + 40)
    issues.push(
      `[assert] required marker must NOT be red, got rgb(${info.r},${info.g},${info.b})`,
    )
  await context.close()
}

// Disabled: dimmed (opacity < 1) but still visible (> 0), cursor not-allowed.
{
  const { context, page } = await newPage(1280, 900)
  const l = label(page, 'lb-disabled')
  const s = await l.evaluate((e) => {
    const cs = getComputedStyle(e)
    return {
      opacity: parseFloat(cs.opacity),
      cursor: cs.cursor,
      display: cs.display,
    }
  })
  if (!(s.opacity > 0 && s.opacity < 1))
    issues.push(
      `[assert] disabled label should be dimmed but visible, opacity=${s.opacity}`,
    )
  if (s.cursor !== 'not-allowed')
    issues.push(
      `[assert] disabled label cursor should be not-allowed, got ${s.cursor}`,
    )
  await context.close()
}

// Long + multiline: the label wraps to more than one line (no truncation),
// and it is not a nowrap/ellipsis box.
{
  const { context, page } = await newPage(1280, 900)
  for (const id of ['lb-long', 'lb-multiline']) {
    const l = label(page, id)
    const m = await l.evaluate((e) => {
      const cs = getComputedStyle(e)
      const line = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2
      return {
        height: e.getBoundingClientRect().height,
        line,
        whiteSpace: cs.whiteSpace,
        overflow: cs.textOverflow,
      }
    })
    if (!(m.height > m.line * 1.5))
      issues.push(
        `[assert] ${id} label should wrap to multiple lines, height=${m.height} line=${m.line}`,
      )
    if (m.whiteSpace === 'nowrap')
      issues.push(`[assert] ${id} label must not be nowrap`)
    if (m.overflow === 'ellipsis')
      issues.push(`[assert] ${id} label must not truncate with an ellipsis`)
  }
  await context.close()
}

// Responsive: the label keeps its role and simply wraps at a narrow width.
{
  const heights = {}
  for (const w of [1280, 390]) {
    const { context, page } = await newPage(w, 900)
    const l = label(page, 'lb-responsive')
    const tag = await l.evaluate((e) => e.tagName)
    if (tag !== 'LABEL')
      issues.push(`[assert] responsive label should stay a <label> at ${w}px`)
    heights[w] = await l.evaluate((e) => e.getBoundingClientRect().height)
    await context.close()
  }
  if (!(heights[1280] > 0 && heights[390] > 0))
    issues.push('[assert] responsive label should render at both widths')
}

// RTL: computed direction rtl, marker still present after the text.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'lb-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const dir = await label(page, 'lb-rtl').evaluate(
    (e) => getComputedStyle(e).direction,
  )
  if (dir !== 'rtl')
    issues.push(`[assert] RTL label direction expected rtl, got ${dir}`)
  if ((await label(page, 'lb-rtl').locator('span[aria-hidden]').count()) !== 1)
    issues.push('[assert] RTL required marker should still render')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/label-rtl.png` })
  console.log(`screenshot: ${OUT}/label-rtl.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
