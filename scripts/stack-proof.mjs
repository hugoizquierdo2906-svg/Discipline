// Stack proof — the Layout single-axis distribution primitive. Captures
// (desktop/tablet/mobile/RTL) plus programmatic assertions: direction, the
// gap scale mapped to --ds-space, align, justify, wrap, reverse (visual only,
// DOM order preserved), responsive via consumer className, semantic `as`, RTL
// and composition. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/stack`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  return { context, page }
}

const t = (page, id) => page.locator(`[data-testid="${id}"]`)
const style = (loc, prop) =>
  loc.evaluate((el, p) => getComputedStyle(el)[p], prop)

// Full-page captures.
for (const [w, h, suffix] of [
  [1280, 3600, ''],
  [834, 3800, '-tablet'],
  [390, 5200, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({ path: `${OUT}/stack${suffix}.png`, fullPage: true })
  console.log(`screenshot: ${OUT}/stack${suffix}.png`)
  await context.close()
}

// RTL capture.
{
  const { context, page } = await newPage(1280, 3600)
  await t(page, 'st-rtl').scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await t(page, 'st-rtl').screenshot({ path: `${OUT}/stack-rtl.png` })
  console.log(`screenshot: ${OUT}/stack-rtl.png`)
  await context.close()
}

// Direction: vertical stack is a flex column, horizontal is a flex row.
{
  const { context, page } = await newPage(1280, 3600)
  const v = t(page, 'st-basic-stack')
  const h = t(page, 'st-horizontal-stack')
  if ((await style(v, 'display')) !== 'flex')
    issues.push('[assert] Stack should render display:flex')
  if ((await style(v, 'flexDirection')) !== 'column')
    issues.push('[assert] a vertical Stack should be flex-direction:column')
  if ((await style(h, 'flexDirection')) !== 'row')
    issues.push('[assert] a horizontal Stack should be flex-direction:row')
  await context.close()
}

// Gap scale maps to --ds-space (xs 4 · sm 8 · md 16 · lg 24 · xl 32).
{
  const { context, page } = await newPage(1280, 3600)
  // Expected gap in CSS pixels, from the --ds-space scale (numbers, so no raw
  // px literal in source).
  const expected = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 }
  for (const [k, px] of Object.entries(expected)) {
    const g = await style(t(page, `st-gap-${k}`), 'gap')
    // computed gap is "row col" or a single value; normalize to first token
    const got = parseFloat(String(g).split(' ')[0])
    if (got !== px)
      issues.push(`[assert] gap=${k} should be ${px} css px, got ${got}`)
  }
  await context.close()
}

// Align (cross-axis) and Justify (main-axis).
{
  const { context, page } = await newPage(1280, 3600)
  if ((await style(t(page, 'st-align-center'), 'alignItems')) !== 'center')
    issues.push('[assert] align=center should be align-items:center')
  if ((await style(t(page, 'st-align-end'), 'alignItems')) !== 'flex-end')
    issues.push('[assert] align=end should be align-items:flex-end')
  if (
    (await style(t(page, 'st-justify-between'), 'justifyContent')) !==
    'space-between'
  )
    issues.push(
      '[assert] justify=between should be justify-content:space-between',
    )
  if (
    (await style(t(page, 'st-justify-center'), 'justifyContent')) !== 'center'
  )
    issues.push('[assert] justify=center should be justify-content:center')
  await context.close()
}

// Wrap.
{
  const { context, page } = await newPage(1280, 3600)
  if ((await style(t(page, 'st-wrap-stack'), 'flexWrap')) !== 'wrap')
    issues.push('[assert] wrap should set flex-wrap:wrap')
  await context.close()
}

// Reverse flips the VISUAL order but preserves DOM order.
{
  const { context, page } = await newPage(1280, 3600)
  const rev = t(page, 'st-reverse-stack')
  if ((await style(rev, 'flexDirection')) !== 'row-reverse')
    issues.push('[assert] reverse should set flex-direction:row-reverse')
  const domFirst = await rev.evaluate((el) => el.children[0].textContent)
  if (!domFirst.includes('1er dans le DOM'))
    issues.push(
      '[assert] reverse must NOT reorder the DOM (source order preserved)',
    )
  // Visually, the DOM-first child sits to the RIGHT under row-reverse.
  const rects = await rev.evaluate((el) => {
    const first = el.children[0].getBoundingClientRect()
    const last = el.children[el.children.length - 1].getBoundingClientRect()
    return { firstX: first.left, lastX: last.left }
  })
  if (!(rects.firstX > rects.lastX))
    issues.push(
      '[assert] reverse should place the DOM-first child visually last',
    )
  await context.close()
}

// Responsive: vertical on mobile, horizontal at >= sm (consumer className).
{
  const wide = await newPage(1280, 3600)
  if (
    (await style(t(wide.page, 'st-responsive-stack'), 'flexDirection')) !==
    'row'
  )
    issues.push(
      '[assert] responsive Stack should be row at desktop (sm:flex-row)',
    )
  await wide.context.close()

  const narrow = await newPage(360, 5200)
  if (
    (await style(t(narrow.page, 'st-responsive-stack'), 'flexDirection')) !==
    'column'
  )
    issues.push('[assert] responsive Stack should be column below sm')
  await narrow.context.close()
}

// Semantic `as` renders the consumer's element.
{
  const { context, page } = await newPage(1280, 3600)
  const tag = await t(page, 'st-as-stack').evaluate((el) =>
    el.tagName.toLowerCase(),
  )
  if (tag !== 'ul')
    issues.push(`[assert] as="ul" should render a <ul>, got <${tag}>`)
  await context.close()
}

// RTL: a horizontal Stack follows dir=rtl natively (main axis flips).
{
  const { context, page } = await newPage(1280, 3600)
  const rtl = t(page, 'st-rtl-stack')
  if ((await style(rtl, 'direction')) !== 'rtl')
    issues.push('[assert] RTL Stack should compute direction:rtl')
  const rects = await rtl.evaluate((el) => {
    const first = el.children[0].getBoundingClientRect()
    const last = el.children[el.children.length - 1].getBoundingClientRect()
    return { firstX: first.left, lastX: last.left }
  })
  if (!(rects.firstX > rects.lastX))
    issues.push('[assert] under RTL the first item should sit to the right')
  await context.close()
}

// Composition renders the real Design System (Button/Badge present & working).
{
  const { context, page } = await newPage(1280, 3600)
  const comp = t(page, 'st-composition')
  if ((await comp.getByRole('button', { name: 'Enregistrer' }).count()) === 0)
    issues.push('[assert] composition should render a real Button')
  const txt = await comp.textContent()
  if (!txt.includes('Active') || !txt.includes('Léa Martin'))
    issues.push(
      '[assert] composition should render the real Badge/Avatar content',
    )
  await context.close()
}

// No regression: a spot check across the frozen siblings.
{
  const { context, page } = await newPage(1280, 900)
  for (const path of [
    '/dev/chart-container',
    '/dev/carousel',
    '/dev/table',
    '/dev/timeline',
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
