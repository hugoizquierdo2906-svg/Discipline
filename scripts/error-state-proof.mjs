// ErrorState proof — the failed-load indicator. Captures (desktop/tablet/
// mobile) plus programmatic assertions for rendering (title/description),
// the error-tinted icon, the Retry action present/absent, sizes, alignment
// (center vs logical start), responsive centering, RTL, and the static (no
// animation) guarantee. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/error-state`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

function root(page, testId) {
  return section(page, testId).locator('.rounded-lg > div').first()
}

// Full-page captures (desktop/tablet/mobile).
for (const [w, h, suffix] of [
  [1280, 4200, ''],
  [834, 5000, '-tablet'],
  [390, 6000, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/error-state${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/error-state${suffix}.png`)
  await context.close()
}

// Rendering: title + description present.
{
  const { context, page } = await newPage(1280, 900)
  const basic = section(page, 'error-basic')
  const text = await basic.textContent()
  if (!text?.includes('Something went wrong'))
    issues.push('[assert] Basic title not rendered')
  if (!text?.includes("couldn't load"))
    issues.push('[assert] Basic description not rendered')
  await context.close()
}

// Error-tinted icon: the icon wrapper resolves to the error token color,
// distinct from neutral body text (the one semantic marker of an error).
{
  const { context, page } = await newPage(1280, 900)
  const r = root(page, 'error-basic')
  const iconColor = await r
    .locator('svg')
    .first()
    .evaluate((e) => getComputedStyle(e).color)
  const bodyColor = await r.evaluate((e) => getComputedStyle(e).color)
  if (iconColor === bodyColor)
    issues.push(
      `[assert] error icon should be tinted (text-error), not the body color; both are ${iconColor}`,
    )
  await context.close()
}

// Retry: a real recovery button present.
{
  const { context, page } = await newPage(1280, 900)
  const s = section(page, 'error-retry')
  if ((await s.getByRole('button', { name: /Try again/ }).count()) !== 1)
    issues.push('[assert] Retry variant should render a "Try again" button')
  await context.close()
}

// Without action: no button.
{
  const { context, page } = await newPage(1280, 900)
  const s = section(page, 'error-no-action')
  if ((await s.locator('button').count()) !== 0)
    issues.push('[assert] Without-action should have no button')
  if ((await s.locator('svg').count()) === 0)
    issues.push('[assert] Without-action should still render an icon')
  await context.close()
}

// Sizes: title font-size increases sm < md < lg.
{
  const { context, page } = await newPage(1280, 900)
  const sizes = {}
  for (const [id, key] of [
    ['error-sm', 'sm'],
    ['error-md', 'md'],
    ['error-lg', 'lg'],
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

// Alignment: center → text-align center; inline → logical start.
{
  const { context, page } = await newPage(1280, 900)
  const centerAlign = await root(page, 'error-center').evaluate(
    (e) => getComputedStyle(e).textAlign,
  )
  if (centerAlign !== 'center')
    issues.push(
      `[assert] centered ErrorState text-align expected center, got ${centerAlign}`,
    )
  const inlineAlign = await root(page, 'error-inline').evaluate(
    (e) => getComputedStyle(e).textAlign,
  )
  if (inlineAlign !== 'start' && inlineAlign !== 'left')
    issues.push(
      `[assert] inline ErrorState text-align expected start/left, got ${inlineAlign}`,
    )
  await context.close()
}

// Responsive: centered content stays horizontally centered at any viewport.
{
  for (const w of [1280, 390]) {
    const { context, page } = await newPage(w, 900)
    const off = await root(page, 'error-center').evaluate((e) => {
      const box = e.getBoundingClientRect()
      const icon = e.querySelector('svg')
      const ib = icon.getBoundingClientRect()
      return Math.abs(ib.left + ib.width / 2 - (box.left + box.width / 2))
    })
    if (off > 2)
      issues.push(
        `[assert] centered ErrorState should stay centered at ${w}px, icon off by ${off}px`,
      )
    await context.close()
  }
}

// RTL: wrapper present, computed direction rtl, retry button still renders.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'error-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const dir = await scene
    .locator('[dir="rtl"] > div')
    .first()
    .evaluate((e) => getComputedStyle(e).direction)
  if (dir !== 'rtl')
    issues.push(
      `[assert] RTL ErrorState computed direction expected rtl, got ${dir}`,
    )
  if ((await scene.locator('button').count()) !== 1)
    issues.push('[assert] RTL ErrorState retry button missing')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/error-state-rtl.png` })
  console.log(`screenshot: ${OUT}/error-state-rtl.png`)
  await context.close()
}

// Static: no animation on the ErrorState root (ignore the composed Button).
{
  const { context, page } = await newPage(1280, 900)
  const animated = await root(page, 'error-retry').evaluate((e) => {
    for (const node of [e, ...e.querySelectorAll('*')]) {
      if (node.closest('button')) continue
      if (getComputedStyle(node).animationName !== 'none')
        return `animation on ${node.tagName}`
    }
    return null
  })
  if (animated)
    issues.push(
      `[assert] ErrorState should be static (no animation): ${animated}`,
    )
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
