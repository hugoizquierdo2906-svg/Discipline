// Code proof — the Data Display verbatim-technical-value primitive. Captures
// (desktop/tablet/mobile) plus programmatic assertions: a real <code> (or, via
// asChild, a real <kbd>), monospace font, a discreet neutral background, no
// font-size of its own (inherits from context at any size/width), no
// interactive semantics (no role/tabindex/handlers), long values wrap inside
// their container with no overflow, and RTL. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/code`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}
function code(page, testId) {
  return section(page, testId).locator('code, kbd').first()
}

// Full-page captures.
for (const [w, h, suffix] of [
  [1280, 2200, ''],
  [834, 2400, '-tablet'],
  [390, 3200, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({ path: `${OUT}/code${suffix}.png`, fullPage: true })
  console.log(`screenshot: ${OUT}/code${suffix}.png`)
  await context.close()
}

// Basic: a REAL <code>, monospace, a discreet neutral background, a small
// radius — never a Badge/Pill/Chip surface, never interactive.
{
  const { context, page } = await newPage(1280, 900)
  const c = code(page, 'cd-basic')
  const tag = await c.evaluate((e) => e.tagName)
  if (tag !== 'CODE')
    issues.push(`[assert] basic Code must be a real <code>, got ${tag}`)
  const info = await c.evaluate((e) => {
    const cs = getComputedStyle(e)
    const rgb = (cs.backgroundColor.match(/[\d.]+/g) ?? []).map(Number)
    return {
      fontFamily: cs.fontFamily,
      radius: parseFloat(cs.borderTopLeftRadius),
      bg: rgb,
      role: e.getAttribute('role'),
      tabIndex: e.tabIndex,
      hasHref: e.hasAttribute('href'),
    }
  })
  if (!/mono/i.test(info.fontFamily))
    issues.push(
      `[assert] Code font-family should be monospace, got "${info.fontFamily}"`,
    )
  if (!(info.radius > 0 && info.radius <= 12))
    issues.push(
      `[assert] Code radius should be small (0–12px), got ${info.radius}`,
    )
  const [r, g, b] = info.bg
  if (!(r === g && g === b) && !(Math.abs(r - g) <= 3 && Math.abs(g - b) <= 3))
    issues.push(
      `[assert] Code background should be neutral grey, got rgb(${info.bg.join(',')})`,
    )
  if (r < 230 || r > 250)
    issues.push(
      `[assert] Code background should be the discreet surface token, got rgb(${info.bg.join(',')})`,
    )
  if (info.role !== null)
    issues.push(`[assert] Code must carry no role, got "${info.role}"`)
  if (info.tabIndex !== -1)
    issues.push(
      `[assert] Code must not be in the tab order, got tabIndex=${info.tabIndex}`,
    )
  if (info.hasHref) issues.push('[assert] Code must never be a link')
  await context.close()
}

// No font-size of its own: it must match the computed font-size of the
// sibling prose it sits beside, at three different ambient sizes.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'cd-inline-sentence')
  const pairs = await scene.evaluate((el) => {
    const texts = Array.from(el.querySelectorAll('p'))
    return texts.map((p) => {
      const codeEl = p.querySelector('code')
      return {
        textSize: getComputedStyle(p).fontSize,
        codeSize: codeEl ? getComputedStyle(codeEl).fontSize : null,
      }
    })
  })
  for (const { textSize, codeSize } of pairs) {
    if (codeSize !== null && codeSize !== textSize)
      issues.push(
        `[assert] Code should inherit the surrounding font-size, text=${textSize} code=${codeSize}`,
      )
  }
  if (pairs.filter((p) => p.codeSize !== null).length < 3)
    issues.push(
      '[assert] expected at least 3 inline-sentence lines pairing Text with Code',
    )
  await context.close()
}

// Keyboard shortcut: asChild renders a real <kbd> (not <code>), carrying the
// exact same discreet material.
{
  const { context, page } = await newPage(1280, 900)
  const kbd = section(page, 'cd-kbd').locator('kbd').first()
  const tag = await kbd.evaluate((e) => e.tagName)
  if (tag !== 'KBD')
    issues.push(
      `[assert] Keyboard shortcut should render a real <kbd> via asChild, got ${tag}`,
    )
  const codeCount = await section(page, 'cd-kbd').locator('code').count()
  if (codeCount !== 0)
    issues.push(
      '[assert] asChild should replace the <code> element entirely, not nest it',
    )
  const bg = await kbd.evaluate((e) => getComputedStyle(e).backgroundColor)
  const basicBg = await code(page, 'cd-basic').evaluate(
    (e) => getComputedStyle(e).backgroundColor,
  )
  if (bg !== basicBg)
    issues.push(
      `[assert] asChild <kbd> should carry the same material as <code>, got ${bg} vs ${basicBg}`,
    )
  await context.close()
}

// HTTP methods: several independent Code elements, never one joined string.
{
  const { context, page } = await newPage(1280, 900)
  const count = await section(page, 'cd-http-methods').locator('code').count()
  if (count !== 4)
    issues.push(
      `[assert] HTTP methods should render 4 separate Code elements, got ${count}`,
    )
  await context.close()
}

// Long value: wraps inside its narrow container — never overflows, never a
// single unbroken line pushing the layout wider.
{
  const { context, page } = await newPage(1280, 900)
  const wrapper = section(page, 'cd-long-value').locator('div').first()
  const c = code(page, 'cd-long-value')
  const m = await wrapper.evaluate((e) => ({
    scrollWidth: e.scrollWidth,
    clientWidth: e.clientWidth,
  }))
  if (m.scrollWidth > m.clientWidth + 1)
    issues.push(
      `[assert] long value should wrap, not overflow its container (scrollWidth=${m.scrollWidth} clientWidth=${m.clientWidth})`,
    )
  const height = await c.evaluate((e) => e.getBoundingClientRect().height)
  const lineHeight = await c.evaluate((e) =>
    parseFloat(getComputedStyle(e).lineHeight),
  )
  if (!(height > lineHeight * 1.5))
    issues.push(
      `[assert] long value should wrap onto multiple lines, height=${height} line=${lineHeight}`,
    )
  await context.close()
}

// Responsive: the same value keeps inheriting its size (never a fixed px)
// across very different viewport widths.
{
  const sizes = {}
  for (const w of [1280, 390]) {
    const { context, page } = await newPage(w, 900)
    const c = code(page, 'cd-responsive')
    const textSize = await section(page, 'cd-responsive')
      .locator('p')
      .first()
      .evaluate((e) => getComputedStyle(e).fontSize)
    sizes[w] = await c.evaluate((e) => getComputedStyle(e).fontSize)
    if (sizes[w] !== textSize)
      issues.push(
        `[assert] responsive Code should inherit its Text sibling's size at ${w}px, code=${sizes[w]} text=${textSize}`,
      )
    await context.close()
  }
}

// RTL: the sentence flows right-to-left; the Code value renders intact.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'cd-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const c = code(page, 'cd-rtl')
  const text = await c.textContent()
  if (text?.trim() !== 'pnpm build')
    issues.push(`[assert] RTL Code content should render intact, got "${text}"`)
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/code-rtl.png` })
  console.log(`screenshot: ${OUT}/code-rtl.png`)
  await context.close()
}

// Static, non-interactive, everywhere: no Code anywhere on the page carries a
// role, is focusable, or has a transition/animation.
{
  const { context, page } = await newPage(1280, 900)
  const bad = await page.evaluate(
    () =>
      Array.from(document.querySelectorAll('code, kbd')).filter((e) => {
        const cs = getComputedStyle(e)
        return (
          e.getAttribute('role') !== null ||
          e.tabIndex >= 0 ||
          cs.transitionDuration !== '0s' ||
          cs.animationName !== 'none'
        )
      }).length,
  )
  if (bad > 0)
    issues.push(
      `[assert] found ${bad} Code element(s) with interactive/motion styling`,
    )
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
