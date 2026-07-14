// Grid proof — the Layout 2-D track primitive. Captures (desktop/tablet/
// mobile/RTL) plus programmatic assertions: fixed column counts, auto-fit /
// auto-fill breakpoint-free reflow, the gap scale mapped to --ds-space, align/
// justify, nested grids, DOM order preserved, responsive via consumer
// className, RTL, and composition. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/grid`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  return { context, page }
}

const t = (page, id) => page.locator(`[data-testid="${id}"]`)
const style = (loc, prop) =>
  loc.evaluate((el, p) => getComputedStyle(el)[p], prop)
// computed grid-template-columns resolves to a space-separated px track list.
const trackCount = async (loc) =>
  (await style(loc, 'gridTemplateColumns')).trim().split(/\s+/).length

// Full-page captures.
for (const [w, h, suffix] of [
  [1280, 4200, ''],
  [834, 4600, '-tablet'],
  [390, 6400, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({ path: `${OUT}/grid${suffix}.png`, fullPage: true })
  console.log(`screenshot: ${OUT}/grid${suffix}.png`)
  await context.close()
}

// RTL capture.
{
  const { context, page } = await newPage(1280, 4200)
  await t(page, 'gr-rtl').scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await t(page, 'gr-rtl').screenshot({ path: `${OUT}/grid-rtl.png` })
  console.log(`screenshot: ${OUT}/grid-rtl.png`)
  await context.close()
}

// Display + fixed column counts.
{
  const { context, page } = await newPage(1280, 4200)
  if ((await style(t(page, 'gr-2'), 'display')) !== 'grid')
    issues.push('[assert] Grid should render display:grid')
  if ((await trackCount(t(page, 'gr-2'))) !== 2)
    issues.push('[assert] columns=2 should lay 2 tracks')
  if ((await trackCount(t(page, 'gr-3'))) !== 3)
    issues.push('[assert] columns=3 should lay 3 tracks')
  if ((await trackCount(t(page, 'gr-4'))) !== 4)
    issues.push('[assert] columns=4 should lay 4 tracks')
  await context.close()
}

// Auto-fit reflows the track count with the available width — no media query.
{
  const wide = await newPage(1280, 4200)
  const wideTracks = await trackCount(t(wide.page, 'gr-autofit-grid'))
  await wide.context.close()
  const narrow = await newPage(420, 6400)
  const narrowTracks = await trackCount(t(narrow.page, 'gr-autofit-grid'))
  await narrow.context.close()
  if (!(wideTracks > narrowTracks))
    issues.push(
      `[assert] auto-fit should reflow more tracks when wider (got ${wideTracks} vs ${narrowTracks})`,
    )
}

// Auto-fill keeps empty trailing tracks (3 items but more tracks at desktop).
{
  const { context, page } = await newPage(1280, 4200)
  const tracks = await trackCount(t(page, 'gr-autofill-grid'))
  const items = await t(page, 'gr-autofill-grid').evaluate(
    (el) => el.children.length,
  )
  if (!(tracks > items))
    issues.push(
      `[assert] auto-fill should reserve empty tracks (${tracks} tracks for ${items} items)`,
    )
  await context.close()
}

// Gap maps to --ds-space (xl -> 32 css px).
{
  const { context, page } = await newPage(1280, 4200)
  const gap = parseFloat(
    String(await style(t(page, 'gr-gap-grid'), 'gap')).split(' ')[0],
  )
  if (gap !== 32)
    issues.push(`[assert] gap="xl" should be 32 css px, got ${gap}`)
  await context.close()
}

// Align (align-items) + justify (justify-items).
{
  const { context, page } = await newPage(1280, 4200)
  const g = t(page, 'gr-align-grid')
  if ((await style(g, 'alignItems')) !== 'center')
    issues.push('[assert] align=center should set align-items:center')
  if ((await style(g, 'justifyItems')) !== 'center')
    issues.push('[assert] justify=center should set justify-items:center')
  await context.close()
}

// Nested grid: a Grid inside a Grid cell is itself display:grid, DOM intact.
{
  const { context, page } = await newPage(1280, 4200)
  const nested = t(page, 'gr-nested-grid')
  if ((await style(nested, 'display')) !== 'grid')
    issues.push('[assert] a nested Grid should also be display:grid')
  if ((await trackCount(nested)) !== 2)
    issues.push('[assert] nested Grid columns=2 should lay 2 tracks')
  const firstText = await nested.evaluate((el) => el.children[0].textContent)
  if (!firstText.includes('Force'))
    issues.push('[assert] nested Grid should preserve DOM/source order')
  await context.close()
}

// Responsive: 1 column below sm, 3 at desktop (consumer className).
{
  const wide = await newPage(1280, 4200)
  if ((await trackCount(t(wide.page, 'gr-responsive-grid'))) !== 3)
    issues.push('[assert] responsive Grid should be 3 columns at desktop')
  await wide.context.close()
  const narrow = await newPage(360, 6400)
  if ((await trackCount(t(narrow.page, 'gr-responsive-grid'))) !== 1)
    issues.push('[assert] responsive Grid should be 1 column below sm')
  await narrow.context.close()
}

// RTL: columns run right-to-left — the DOM-first cell sits on the right.
{
  const { context, page } = await newPage(1280, 4200)
  const g = t(page, 'gr-rtl-grid')
  if ((await style(g, 'direction')) !== 'rtl')
    issues.push('[assert] RTL Grid should compute direction:rtl')
  const rects = await g.evaluate((el) => {
    const first = el.children[0].getBoundingClientRect()
    const last = el.children[el.children.length - 1].getBoundingClientRect()
    return { firstX: first.left, lastX: last.left }
  })
  if (!(rects.firstX > rects.lastX))
    issues.push('[assert] under RTL the first cell should sit to the right')
  await context.close()
}

// Composition renders the real Design System (Table + Button present).
{
  const { context, page } = await newPage(1280, 4200)
  const rows = await t(page, 'gr-app-grid').locator('tbody tr').count()
  if (rows !== 3)
    issues.push(
      `[assert] composition should render the real Table rows, got ${rows}`,
    )
  if (
    (await t(page, 'gr-marketing-grid')
      .getByRole('button', { name: 'Commencer' })
      .count()) === 0
  )
    issues.push('[assert] composition should render a real Button')
  await context.close()
}

// No regression: a spot check across the frozen siblings.
{
  const { context, page } = await newPage(1280, 900)
  for (const path of [
    '/dev/stack',
    '/dev/chart-container',
    '/dev/carousel',
    '/dev/table',
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
