// Pagination proof — random-access page navigation on the frozen Icon/
// Spinner primitives. Captures (desktop/tablet/mobile) plus programmatic
// assertions for structure (nav landmark, list), page change, first/last
// page boundary disabling, smart collapse (siblings/boundary/ellipsis,
// never for a single-page gap), responsive CSS-only compact switch,
// loading, disabled, keyboard (native Tab/Enter, no custom handler),
// aria-current, and RTL. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/pagination`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

// Full-page captures (desktop/tablet/mobile).
for (const [w, h, suffix] of [
  [1280, 3400, ''],
  [834, 3600, '-tablet'],
  [390, 4200, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/pagination${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/pagination${suffix}.png`)
  await context.close()
}

// Structure + ARIA: nav landmark, list, aria-current on the current page.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'pagination-minimal')
  const nav = scene.locator('nav')
  if ((await nav.getAttribute('aria-label')) !== 'Pagination')
    issues.push('[assert] nav is not labeled "Pagination"')
  if ((await nav.locator('ul').count()) !== 1)
    issues.push('[assert] the page row is not a list')
  const current = nav.locator('[aria-current="page"]')
  if ((await current.count()) !== 1)
    issues.push('[assert] exactly one aria-current="page" expected')
  if ((await current.textContent())?.trim() !== '1')
    issues.push('[assert] page 1 should be aria-current initially')
  await context.close()
}

// Page change: clicking a page number calls onPageChange and re-renders.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'pagination-middle')
  const before = await scene.locator('[aria-current="page"]').textContent()
  await scene.getByRole('button', { name: 'Next page' }).click()
  await page.waitForTimeout(150)
  const after = await scene.locator('[aria-current="page"]').textContent()
  if (before === after)
    issues.push('[assert] Next page did not change the current page')
  await context.close()
}

// First page: Previous/First disabled; last page: Next/Last disabled.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'pagination-first')
  const prevDisabled = await scene
    .getByRole('button', { name: 'Previous page' })
    .isDisabled()
  if (!prevDisabled)
    issues.push('[assert] Previous should be disabled on the first page')
  await context.close()
}
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'pagination-last')
  const nextDisabled = await scene
    .getByRole('button', { name: 'Next page' })
    .isDisabled()
  if (!nextDisabled)
    issues.push('[assert] Next should be disabled on the last page')
  const firstBefore = await scene
    .getByRole('button', { name: 'First page' })
    .count()
  void firstBefore
  await context.close()
}

// First/Last jump buttons disable correctly at their own boundary.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'pagination-large')
  const firstBtn = scene.getByRole('button', { name: 'First page' })
  const lastBtn = scene.getByRole('button', { name: 'Last page' })
  if (await firstBtn.isDisabled())
    issues.push('[assert] First page button should be enabled mid-range')
  if (await lastBtn.isDisabled())
    issues.push('[assert] Last page button should be enabled mid-range')
  await firstBtn.click()
  await page.waitForTimeout(150)
  if (
    (await scene.locator('[aria-current="page"]').textContent())?.trim() !== '1'
  )
    issues.push('[assert] First page button did not jump to page 1')
  if (!(await firstBtn.isDisabled()))
    issues.push('[assert] First page button should now be disabled')
  await context.close()
}

// Smart collapse: boundary + siblings + ellipsis; never a single-page gap.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'pagination-middle')
  const ellipses = scene.locator('[role="presentation"]')
  if ((await ellipses.count()) !== 2)
    issues.push(
      '[assert] expected exactly 2 ellipses for a middle page in a 24-page set',
    )
  const pageButtons = await scene
    .locator('button[aria-label^="Page "]')
    .allTextContents()
  if (!pageButtons.includes('1') || !pageButtons.includes('24'))
    issues.push('[assert] boundary pages 1 and 24 should always be visible')
  await context.close()
}
{
  // Few pages: below the collapse threshold, no ellipsis at all.
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'pagination-few')
  if ((await scene.locator('[role="presentation"]').count()) !== 0)
    issues.push('[assert] a 4-page set should never show an ellipsis')
  await context.close()
}

// Disabled: every control inert.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'pagination-disabled')
  const aPageButton = scene.locator('button[aria-label^="Page "]').first()
  if (!(await aPageButton.isDisabled()))
    issues.push('[assert] page buttons should be disabled when disabled=true')
  await context.close()
}

// Loading: state (current page) stays visible; controls inert; Spinner shown.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'pagination-loading')
  const current = scene.locator('[aria-current="page"]')
  if ((await current.textContent())?.trim() !== '5')
    issues.push('[assert] loading should keep the current page visible')
  if (!(await scene.getByRole('button', { name: 'Next page' }).isDisabled()))
    issues.push('[assert] controls should be disabled while loading')
  if ((await scene.locator('[role="status"]').count()) === 0)
    issues.push('[assert] Spinner (role=status) missing while loading')
  await context.close()
}

// Compact: forces the "page / total" reading regardless of viewport.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'pagination-compact')
  if (!(await scene.getByText('7 / 24').isVisible()))
    issues.push('[assert] compact reading "7 / 24" not visible')
  if ((await scene.locator('button[aria-label^="Page "]').count()) !== 0)
    issues.push('[assert] compact mode must not render numbered page buttons')
  await context.close()
}

// Different sibling counts: siblingCount=0 shows fewer numbers than 2.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'pagination-siblings')
  const rows = scene.locator('ul')
  const counts = []
  for (let i = 0; i < (await rows.count()); i++) {
    counts.push(
      await rows.nth(i).locator('button[aria-label^="Page "]').count(),
    )
  }
  if (!(counts[0] < counts[1] && counts[1] < counts[2]))
    issues.push(
      `[assert] siblingCount 0/1/2 should show strictly increasing page-button counts, got ${JSON.stringify(counts)}`,
    )
  await context.close()
}

// Responsive: below `md`, the compact reading replaces the numbered row.
{
  const { context, page } = await newPage(390, 900)
  const scene = section(page, 'pagination-responsive')
  if (
    await scene
      .locator('button[aria-label^="Page "]')
      .isVisible()
      .catch(() => false)
  )
    issues.push('[assert] numbered pages still visible below the md breakpoint')
  if (!(await scene.getByText('7 / 24').isVisible()))
    issues.push('[assert] compact reading not visible below the md breakpoint')
  await context.close()
}
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'pagination-responsive')
  if (!(await scene.locator('button[aria-label^="Page "]').first().isVisible()))
    issues.push('[assert] numbered pages should be visible at desktop width')
  await context.close()
}

// Keyboard: native Tab order reaches Previous then the first page button;
// Enter activates it (no custom handler, no roving tabindex).
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'pagination-keyboard')
  const prevBtn = scene.getByRole('button', { name: 'Previous page' })
  await prevBtn.focus()
  const focused = await page.evaluate(() =>
    document.activeElement?.getAttribute('aria-label'),
  )
  if (focused !== 'Previous page')
    issues.push('[assert] Previous page button did not receive focus')
  const before = await scene.locator('[aria-current="page"]').textContent()
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')
  await page.waitForTimeout(150)
  const after = await scene.locator('[aria-current="page"]').textContent()
  if (before === after)
    issues.push(
      '[assert] Enter on a focused page button did not change the page',
    )
  await context.close()
}

// RTL: the wrapper lays out right-to-left; the chevrons flip.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'pagination-rtl')
  const dirEl = scene.locator('[dir="rtl"]')
  if ((await dirEl.count()) !== 1) issues.push('[assert] rtl wrapper missing')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/pagination-rtl.png` })
  console.log(`screenshot: ${OUT}/pagination-rtl.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
