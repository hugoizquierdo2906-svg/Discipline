// ChartContainer proof — the Data Display "surface that hosts a
// visualization" primitive. Captures (desktop/tablet/mobile/RTL) plus
// programmatic assertions: figure semantics + labelledby/describedby wiring,
// header/title/description, legend, footer, render-zone aspect ratio, the
// loading/empty/error states composing the frozen primitives, responsive and
// RTL. Every "chart" is a token-only SVG placeholder — no chart library.
// Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/chart-container`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

// Full-page captures.
for (const [w, h, suffix] of [
  [1280, 5200, ''],
  [834, 5600, '-tablet'],
  [390, 7200, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/chart-container${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/chart-container${suffix}.png`)
  await context.close()
}

// RTL capture.
{
  const { context, page } = await newPage(1280, 5200)
  await section(page, 'cc-rtl').scrollIntoViewIfNeeded()
  await page.waitForTimeout(200)
  await section(page, 'cc-rtl').screenshot({
    path: `${OUT}/chart-container-rtl.png`,
  })
  console.log(`screenshot: ${OUT}/chart-container-rtl.png`)
  await context.close()
}

// Semantics: the root is a <figure>, labelled by its Title and described by
// its Description (structural aria wiring, never dangling).
{
  const { context, page } = await newPage(1280, 5200)
  const fig = section(page, 'cc-header').locator('figure')
  const tag = await fig.evaluate((el) => el.tagName.toLowerCase())
  if (tag !== 'figure')
    issues.push(`[assert] root should be a <figure>, got <${tag}>`)

  const wiring = await fig.evaluate((el) => {
    const lb = el.getAttribute('aria-labelledby')
    const db = el.getAttribute('aria-describedby')
    const doc = el.ownerDocument
    return {
      lb,
      db,
      labelText: lb ? doc.getElementById(lb)?.textContent : null,
      descText: db ? doc.getElementById(db)?.textContent : null,
    }
  })
  if (!wiring.lb || !wiring.labelText)
    issues.push('[assert] header figure should be labelled by its Title')
  if (!wiring.db || !wiring.descText)
    issues.push('[assert] header figure should be described by its Description')

  // Basic (no Title) must NOT carry a dangling aria-labelledby.
  const basicFig = section(page, 'cc-basic').locator('figure')
  const danglers = await basicFig.evaluate((el) => ({
    lb: el.getAttribute('aria-labelledby'),
    db: el.getAttribute('aria-describedby'),
  }))
  if (danglers.lb || danglers.db)
    issues.push(
      '[assert] a ChartContainer without Title/Description must not set aria-labelledby/describedby',
    )
  await context.close()
}

// Render zone honours the ratio (aspect-ratio applied on Content).
{
  const { context, page } = await newPage(1280, 5200)
  const content = section(page, 'cc-header')
    .locator('figure div[style]')
    .first()
  const ar = await content.evaluate((el) => getComputedStyle(el).aspectRatio)
  if (!ar || ar === 'auto')
    issues.push(`[assert] Content should carry an aspect-ratio, got "${ar}"`)
  await context.close()
}

// Legend renders the consumer's items (never invented series).
{
  const { context, page } = await newPage(1280, 5200)
  const legendText = await section(page, 'cc-legend').textContent()
  if (!legendText.includes('Charge') || !legendText.includes('Récupération'))
    issues.push('[assert] legend should render the consumer-supplied items')
  await context.close()
}

// Footer renders muted consumer text.
{
  const { context, page } = await newPage(1280, 5200)
  const footer = await section(page, 'cc-footer').textContent()
  if (!footer.includes('minutes par jour'))
    issues.push('[assert] footer should render the consumer note')
  await context.close()
}

// Loading composes the frozen Spinner (role=status) inside the render zone.
{
  const { context, page } = await newPage(1280, 5200)
  const status = section(page, 'cc-loading').locator('[role="status"]')
  if ((await status.count()) === 0)
    issues.push('[assert] Loading should compose a role=status Spinner')
  await context.close()
}

// Empty composes the frozen EmptyState (title + action), not an error.
{
  const { context, page } = await newPage(1280, 5200)
  const empty = section(page, 'cc-empty')
  const txt = await empty.textContent()
  if (!txt.includes('Aucune donnée'))
    issues.push('[assert] Empty should compose the EmptyState title')
  const btn = empty.getByRole('button', { name: 'Commencer' })
  if ((await btn.count()) === 0)
    issues.push('[assert] Empty should render its action button')
  await context.close()
}

// Error composes the frozen ErrorState with a retry action.
{
  const { context, page } = await newPage(1280, 5200)
  const err = section(page, 'cc-error')
  const txt = await err.textContent()
  if (!txt.includes('Impossible de charger'))
    issues.push('[assert] Error should compose the ErrorState title')
  const retry = err.getByRole('button', { name: /Réessayer/ })
  if ((await retry.count()) === 0)
    issues.push('[assert] Error should render its retry action')
  await context.close()
}

// Heading hierarchy: every Title is an <h3> (semantic), regardless of visual
// level — a labelled, consistent structure across cards.
{
  const { context, page } = await newPage(1280, 5200)
  const titles = section(page, 'cc-placeholders').locator('figure h3')
  const count = await titles.count()
  if (count !== 3)
    issues.push(
      `[assert] each placeholder card should expose an <h3> Title, got ${count}`,
    )
  await context.close()
}

// Responsive: render zone keeps its ratio at a narrow viewport (no collapse).
{
  const { context, page } = await newPage(390, 7200)
  const content = section(page, 'cc-responsive')
    .locator('figure div[style]')
    .first()
  const box = await content.boundingBox()
  if (!box || box.height < 40)
    issues.push(
      '[assert] responsive render zone should keep a real height on mobile',
    )
  await context.close()
}

// RTL: the figure inherits rtl direction from the dir="rtl" wrapper.
{
  const { context, page } = await newPage(1280, 5200)
  const dir = await section(page, 'cc-rtl')
    .locator('figure')
    .evaluate((el) => getComputedStyle(el).direction)
  if (dir !== 'rtl')
    issues.push(
      `[assert] RTL figure should compute direction rtl, got "${dir}"`,
    )
  await context.close()
}

// No regression: a spot check across the frozen Data Display siblings.
{
  const { context, page } = await newPage(1280, 900)
  for (const path of [
    '/dev/carousel',
    '/dev/data-grid',
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
