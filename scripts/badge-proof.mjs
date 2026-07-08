// Badge proof — the Data Display property label. Captures (desktop/tablet/
// mobile) plus programmatic assertions for rendering, the semantic variants,
// the soft/solid/outline appearances, sizes, shapes, icon present/absence, the
// static NON-INTERACTIVE contract (a <span> with no role, no tabindex, not
// focusable), size-stability (it never resizes), and RTL. Requires the dev
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
  await page.goto(`${BASE}/dev/badge`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

// A Badge is the only `span.inline-flex` in the tree — Text/Heading render p/h,
// the icon renders an svg — so this matches badges robustly at any nesting.
function badges(page, testId) {
  return section(page, testId).locator('span.inline-flex')
}

// Full-page captures (desktop/tablet/mobile).
for (const [w, h, suffix] of [
  [1280, 3200, ''],
  [834, 3600, '-tablet'],
  [390, 4600, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/badge${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/badge${suffix}.png`)
  await context.close()
}

// Rendering: the basic badge renders its label.
{
  const { context, page } = await newPage(1280, 900)
  const b = badges(page, 'bd-basic')
  if ((await b.count()) !== 1)
    issues.push('[assert] Basic should render exactly one badge')
  if ((await b.first().textContent())?.trim() !== 'Active')
    issues.push('[assert] Basic badge label not rendered')
  await context.close()
}

// Variants: a semantic badge is tinted, distinct from the neutral one.
{
  const { context, page } = await newPage(1280, 900)
  const list = badges(page, 'bd-variants')
  if ((await list.count()) !== 5)
    issues.push('[assert] Variants should render five badges')
  const colorOf = (i) => list.nth(i).evaluate((e) => getComputedStyle(e).color)
  const neutral = await colorOf(0)
  const success = await colorOf(1)
  const error = await colorOf(3)
  if (success === neutral)
    issues.push(
      '[assert] success variant should be tinted, distinct from neutral',
    )
  if (success === error)
    issues.push('[assert] success and error variants should differ in color')
  await context.close()
}

// Appearances: soft has a translucent tint, solid an opaque fill, outline a
// transparent background with a visible border.
{
  const { context, page } = await newPage(1280, 900)
  const soft = badges(page, 'bd-soft').first()
  const solid = badges(page, 'bd-solid').first()
  const outline = badges(page, 'bd-outline').first()
  const bg = (loc) =>
    loc.evaluate((e) => {
      const c = (
        getComputedStyle(e).backgroundColor.match(/[\d.]+/g) ?? []
      ).map(Number)
      return c.length === 4 ? c[3] : c.length === 3 ? 1 : 0
    })
  const softA = await bg(soft)
  const solidA = await bg(solid)
  const outlineA = await bg(outline)
  if (!(softA > 0 && softA < 1))
    issues.push(
      `[assert] soft appearance should have a translucent tint, alpha=${softA}`,
    )
  if (solidA !== 1)
    issues.push(
      `[assert] solid appearance should have an opaque fill, alpha=${solidA}`,
    )
  if (outlineA !== 0)
    issues.push(
      `[assert] outline appearance should have no background, alpha=${outlineA}`,
    )
  const borderW = await outline.evaluate((e) =>
    parseFloat(getComputedStyle(e).borderTopWidth),
  )
  if (borderW <= 0)
    issues.push('[assert] outline appearance should draw a visible border')
  await context.close()
}

// Sizes: height increases xs < sm < md < lg.
{
  const { context, page } = await newPage(1280, 900)
  const list = badges(page, 'bd-sizes')
  const heights = []
  for (let i = 0; i < 4; i++)
    heights.push(
      await list.nth(i).evaluate((e) => e.getBoundingClientRect().height),
    )
  if (!(
    heights[0] < heights[1] &&
    heights[1] < heights[2] &&
    heights[2] < heights[3]
  ))
    issues.push(
      `[assert] sizes should increase xs<sm<md<lg, got ${JSON.stringify(heights)}`,
    )
  await context.close()
}

// Shapes: square ≈ 0 radius, rounded a moderate radius, pill a large radius.
{
  const { context, page } = await newPage(1280, 900)
  const list = badges(page, 'bd-shapes')
  const radiusOf = (i) =>
    list
      .nth(i)
      .evaluate((e) => parseFloat(getComputedStyle(e).borderTopLeftRadius))
  const rounded = await radiusOf(0)
  const pill = await radiusOf(1)
  const square = await radiusOf(2)
  if (square > 0.5)
    issues.push(`[assert] square shape should have ~0 radius, got ${square}`)
  if (!(rounded > square && pill > rounded))
    issues.push(
      `[assert] radius should increase square<rounded<pill, got ${JSON.stringify({ square, rounded, pill })}`,
    )
  await context.close()
}

// Icon present/absent: the with-icon badges render an svg, the without-icon ones don't.
{
  const { context, page } = await newPage(1280, 900)
  const withIcon = badges(page, 'bd-icon').first()
  if ((await withIcon.locator('svg').count()) === 0)
    issues.push('[assert] with-icon badge should render an svg')
  const list = badges(page, 'bd-no-icon')
  for (let i = 0; i < (await list.count()); i++)
    if ((await list.nth(i).locator('svg').count()) !== 0)
      issues.push('[assert] without-icon badge should render no svg')
  await context.close()
}

// Static & non-interactive: a <span>, no role, no tabindex, not focusable, no
// button. This is the core contract — a Badge must never be interactive.
{
  const { context, page } = await newPage(1280, 900)
  const all = page.locator('span.inline-flex')
  const n = await all.count()
  const before = issues.length
  for (let i = 0; i < n; i++) {
    const info = await all.nth(i).evaluate((e) => ({
      tag: e.tagName,
      role: e.getAttribute('role'),
      tabindex: e.getAttribute('tabindex'),
      button: e.closest('button') ? true : false,
      anim: getComputedStyle(e).animationName,
    }))
    if (info.tag !== 'SPAN')
      issues.push(`[assert] badge ${i} should be a <span>, got ${info.tag}`)
    if (info.role)
      issues.push(`[assert] badge ${i} must have no role, got ${info.role}`)
    if (info.tabindex !== null)
      issues.push(
        `[assert] badge ${i} must have no tabindex, got ${info.tabindex}`,
      )
    if (info.button)
      issues.push(`[assert] badge ${i} must not be inside a button`)
    if (info.anim !== 'none')
      issues.push(
        `[assert] badge ${i} must be static (no animation), got ${info.anim}`,
      )
  }
  // Focusability: no badge should receive focus via keyboard (tabindex absent → not tabbable for a span).
  const focusable = await all.evaluateAll(
    (els) =>
      els.filter((e) =>
        e.matches(
          ':is(a,button,input,select,textarea,[tabindex]):not([tabindex="-1"])',
        ),
      ).length,
  )
  if (focusable !== 0)
    issues.push(`[assert] no badge should be focusable, ${focusable} are`)
  if (issues.length === before)
    console.log(`non-interactive contract: ${n} badges all clean`)
  await context.close()
}

// Size-stability: a badge keeps its exact size across viewports (it never resizes).
{
  const measures = {}
  for (const w of [1280, 390]) {
    const { context, page } = await newPage(w, 900)
    measures[w] = await badges(page, 'bd-responsive')
      .first()
      .evaluate((e) => {
        const r = e.getBoundingClientRect()
        return { w: Math.round(r.width), h: Math.round(r.height) }
      })
    await context.close()
  }
  if (measures[1280].h !== measures[390].h)
    issues.push(
      `[assert] badge height should be stable across viewports, got ${JSON.stringify(measures)}`,
    )
}

// RTL: computed direction rtl, icon + label still render.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'bd-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const b = badges(page, 'bd-rtl').first()
  const dir = await b.evaluate((e) => getComputedStyle(e).direction)
  if (dir !== 'rtl')
    issues.push(
      `[assert] RTL badge computed direction expected rtl, got ${dir}`,
    )
  if ((await b.locator('svg').count()) === 0)
    issues.push('[assert] RTL badge icon missing')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/badge-rtl.png` })
  console.log(`screenshot: ${OUT}/badge-rtl.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
