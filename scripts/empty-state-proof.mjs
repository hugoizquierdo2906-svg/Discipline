// EmptyState proof — the meaningful-absence indicator. Captures (desktop/
// tablet/mobile) plus programmatic assertions for rendering (title/
// description), icon present/absent, action present/absent, sizes, alignment
// (center vs logical start), responsive centering, and RTL. Requires the dev
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
  await page.goto(`${BASE}/dev/empty-state`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

// Root of an EmptyState inside a section: the section's card > first div.
function root(page, testId) {
  return section(page, testId).locator('.rounded-lg > div').first()
}

// Full-page captures (desktop/tablet/mobile).
for (const [w, h, suffix] of [
  [1280, 4400, ''],
  [834, 5200, '-tablet'],
  [390, 6400, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/empty-state${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/empty-state${suffix}.png`)
  await context.close()
}

// Rendering: title + description present; Basic has no icon, no button.
{
  const { context, page } = await newPage(1280, 900)
  const basic = section(page, 'empty-basic')
  const text = await basic.textContent()
  if (!text?.includes('Nothing here yet'))
    issues.push('[assert] Basic title not rendered')
  if (!text?.includes('When there is content'))
    issues.push('[assert] Basic description not rendered')
  if ((await basic.locator('svg').count()) !== 0)
    issues.push('[assert] Basic should have no icon')
  if ((await basic.locator('button').count()) !== 0)
    issues.push('[assert] Basic should have no action button')
  await context.close()
}

// Icon present, no action.
{
  const { context, page } = await newPage(1280, 900)
  const s = section(page, 'empty-icon')
  if ((await s.locator('svg').count()) === 0)
    issues.push('[assert] Icon variant should render an icon')
  if ((await s.locator('button').count()) !== 0)
    issues.push('[assert] Icon variant should have no action button')
  await context.close()
}

// With action: icon + a real button.
{
  const { context, page } = await newPage(1280, 900)
  const s = section(page, 'empty-action')
  if ((await s.locator('svg').count()) === 0)
    issues.push('[assert] With-action should render an icon')
  if ((await s.getByRole('button', { name: /Add client/ }).count()) !== 1)
    issues.push('[assert] With-action should render an "Add client" button')
  await context.close()
}

// Without action: icon present, no button.
{
  const { context, page } = await newPage(1280, 900)
  const s = section(page, 'empty-no-action')
  if ((await s.locator('svg').count()) === 0)
    issues.push('[assert] Without-action should still render an icon')
  if ((await s.locator('button').count()) !== 0)
    issues.push('[assert] Without-action should have no button')
  await context.close()
}

// Sizes: the title font-size increases sm < md < lg.
{
  const { context, page } = await newPage(1280, 900)
  const sizes = {}
  for (const [id, key] of [
    ['empty-sm', 'sm'],
    ['empty-md', 'md'],
    ['empty-lg', 'lg'],
  ]) {
    const heading = root(page, id).locator('h3').first()
    sizes[key] = await heading.evaluate((e) =>
      parseFloat(getComputedStyle(e).fontSize),
    )
  }
  if (!(sizes.sm < sizes.md && sizes.md < sizes.lg))
    issues.push(
      `[assert] title size should increase sm<md<lg, got ${JSON.stringify(sizes)}`,
    )
  await context.close()
}

// Alignment: center → text-align center + centered items; left → start.
{
  const { context, page } = await newPage(1280, 900)
  const centerAlign = await root(page, 'empty-center').evaluate(
    (e) => getComputedStyle(e).textAlign,
  )
  if (centerAlign !== 'center')
    issues.push(
      `[assert] centered EmptyState text-align expected center, got ${centerAlign}`,
    )
  const leftAlign = await root(page, 'empty-left').evaluate(
    (e) => getComputedStyle(e).textAlign,
  )
  // logical `text-start` resolves to `start` (or `left` in an LTR context)
  if (leftAlign !== 'start' && leftAlign !== 'left')
    issues.push(
      `[assert] left EmptyState text-align expected start/left, got ${leftAlign}`,
    )
  // The icon should sit at the container's left edge (not centered) when left-aligned.
  const leftGeom = await root(page, 'empty-left').evaluate((e) => {
    const box = e.getBoundingClientRect()
    const icon = e.querySelector('svg')
    const iconBox = icon.getBoundingClientRect()
    return {
      iconLeftOffset: iconBox.left - box.left,
      containerWidth: box.width,
    }
  })
  if (leftGeom.iconLeftOffset > leftGeom.containerWidth * 0.25)
    issues.push(
      `[assert] left-aligned icon should hug the start edge, offset ${leftGeom.iconLeftOffset}`,
    )
  await context.close()
}

// Responsive: centered content stays horizontally centered at any viewport.
{
  for (const w of [1280, 390]) {
    const { context, page } = await newPage(w, 900)
    const centered = await root(page, 'empty-center').evaluate((e) => {
      const box = e.getBoundingClientRect()
      const icon = e.querySelector('svg')
      const iconBox = icon.getBoundingClientRect()
      const iconCenter = iconBox.left + iconBox.width / 2
      const boxCenter = box.left + box.width / 2
      return Math.abs(iconCenter - boxCenter)
    })
    if (centered > 2)
      issues.push(
        `[assert] centered EmptyState should stay centered at ${w}px, icon off-center by ${centered}px`,
      )
    await context.close()
  }
}

// RTL: wrapper present, computed direction is rtl, still renders content.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'empty-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const dir = await scene
    .locator('[dir="rtl"] > div')
    .first()
    .evaluate((e) => getComputedStyle(e).direction)
  if (dir !== 'rtl')
    issues.push(
      `[assert] RTL EmptyState computed direction expected rtl, got ${dir}`,
    )
  if ((await scene.locator('button').count()) !== 1)
    issues.push('[assert] RTL EmptyState action button missing')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/empty-state-rtl.png` })
  console.log(`screenshot: ${OUT}/empty-state-rtl.png`)
  await context.close()
}

// Static: no animation/transition anywhere in the component root.
{
  const { context, page } = await newPage(1280, 900)
  const animated = await root(page, 'empty-action').evaluate((e) => {
    for (const node of [e, ...e.querySelectorAll('*')]) {
      const cs = getComputedStyle(node)
      // Ignore the composed Button's own material (it is not EmptyState's).
      if (node.closest('button')) continue
      if (cs.animationName !== 'none') return `animation on ${node.tagName}`
    }
    return null
  })
  if (animated)
    issues.push(
      `[assert] EmptyState should be static (no animation): ${animated}`,
    )
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
