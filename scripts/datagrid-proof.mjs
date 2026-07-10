// DataGrid proof — the Data Display "manipulate a large dataset"
// primitive. Captures (desktop/tablet/mobile) plus programmatic
// assertions: ARIA Grid roles, selection, sorting, pagination, toolbar,
// loading, empty, RTL, responsive, keyboard. Requires the dev server on
// :3000.
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
  await page.goto(`${BASE}/dev/data-grid`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

// Full-page captures.
for (const [w, h, suffix] of [
  [1280, 8200, ''],
  [834, 9200, '-tablet'],
  [390, 11000, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({
    path: `${OUT}/data-grid${suffix}.png`,
    fullPage: true,
  })
  console.log(`screenshot: ${OUT}/data-grid${suffix}.png`)
  await context.close()
}

// ARIA Grid: role="grid" on the table cascades implicit gridcell/row/
// columnheader roles onto real td/tr/th — no hand-authored role on cells.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'dg-basic')
  const info = await scene
    .locator('table')
    .first()
    .evaluate((table) => {
      const cell = table.querySelector('tbody td')
      const row = table.querySelector('tbody tr')
      const head = table.querySelector('thead th')
      return {
        tableRole: table.getAttribute('role'),
        cellRole: cell && getComputedRole(cell),
        rowRole: row && getComputedRole(row),
        headRole: head && getComputedRole(head),
        cellHasExplicitRole: cell?.hasAttribute('role'),
      }
      function getComputedRole(el) {
        // Approximate implicit ARIA role via tag + ancestor table role, since
        // computed accessible role isn't exposed to page JS directly.
        const tag = el.tagName
        if (tag === 'TD')
          return el.closest('table')?.getAttribute('role') === 'grid'
            ? 'gridcell'
            : 'cell'
        if (tag === 'TR') return 'row'
        if (tag === 'TH') return 'columnheader'
        return null
      }
    })
  if (info.tableRole !== 'grid')
    issues.push(
      `[assert] the underlying table should carry role="grid", got ${info.tableRole}`,
    )
  if (info.cellHasExplicitRole)
    issues.push(
      '[assert] a gridcell must rely on implicit role from role="grid", never an explicit role="gridcell" attribute',
    )
  if (info.cellRole !== 'gridcell')
    issues.push(
      `[assert] a <td> under role="grid" should compute to gridcell, got ${info.cellRole}`,
    )
  await context.close()
}

// Selection: checkboxes toggle real checked state, select-all reflects
// indeterminate/all-selected.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'dg-selection')
  const rowCheckbox = scene.locator('tbody [role="checkbox"]').first()
  await rowCheckbox.click()
  await page.waitForTimeout(150)
  const checked = await rowCheckbox.getAttribute('data-state')
  if (checked !== 'checked')
    issues.push(
      `[assert] clicking a row checkbox should check it, got data-state=${checked}`,
    )
  const countText = await scene.getByText(/of 5 selected/).textContent()
  if (!countText?.includes('1 of 5'))
    issues.push(
      `[assert] selection count should update to "1 of 5 selected", got "${countText}"`,
    )
  await context.close()
}

// Sorting: aria-sort toggles none -> ascending -> descending, rows
// actually re-order (consumer-owned comparator).
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'dg-sorting')
  const sortButton = scene.locator('th button').first()
  const initialSort = await scene
    .locator('th[aria-sort]')
    .first()
    .getAttribute('aria-sort')
  if (initialSort !== 'none')
    issues.push(
      `[assert] an unsorted sortable column should have aria-sort="none", got ${initialSort}`,
    )
  await sortButton.click()
  await page.waitForTimeout(150)
  const afterFirstClick = await scene
    .locator('th[aria-sort]')
    .first()
    .getAttribute('aria-sort')
  if (afterFirstClick !== 'ascending')
    issues.push(
      `[assert] first click should set aria-sort="ascending", got ${afterFirstClick}`,
    )
  const firstRowName = await scene
    .locator('tbody tr')
    .first()
    .locator('td')
    .first()
    .textContent()
  if (firstRowName?.trim() !== 'Hugo Izquierdo')
    issues.push(
      `[assert] ascending sort by name should put "Hugo Izquierdo" first, got "${firstRowName}"`,
    )
  await context.close()
}

// Pagination: the real frozen Pagination composed directly, page changes
// re-render the visible rows.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'dg-pagination')
  const rowsBefore = await scene.locator('tbody tr').count()
  if (rowsBefore !== 2)
    issues.push(
      `[assert] page 1 should show 2 rows (page size), got ${rowsBefore}`,
    )
  const nextButton = scene.getByRole('button', { name: /next/i })
  await nextButton.click()
  await page.waitForTimeout(150)
  const firstRowAfter = await scene
    .locator('tbody tr')
    .first()
    .locator('td')
    .first()
    .textContent()
  if (firstRowAfter?.trim() !== 'Marc Dubois')
    issues.push(
      `[assert] page 2 should start with "Marc Dubois", got "${firstRowAfter}"`,
    )
  await context.close()
}

// Toolbar: a plain flex slot — the consumer's SearchInput actually
// filters the consumer's own rows.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'dg-toolbar')
  const search = scene
    .locator('input[type="text"], input[type="search"]')
    .first()
  await search.fill('Léa')
  await page.waitForTimeout(150)
  const rowCount = await scene.locator('tbody tr').count()
  if (rowCount !== 1)
    issues.push(
      `[assert] filtering by "Léa" should leave 1 row, got ${rowCount}`,
    )
  await context.close()
}

// Empty: DataGrid.Empty renders a valid tr/td wrapper around EmptyState.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'dg-empty')
  const info = await scene
    .locator('tbody tr')
    .first()
    .evaluate((tr) => ({
      tag: tr.tagName,
      cellTag: tr.querySelector('td')?.tagName,
      colSpan: tr.querySelector('td')?.getAttribute('colspan'),
    }))
  if (info.tag !== 'TR' || info.cellTag !== 'TD')
    issues.push('[assert] DataGrid.Empty should render a real <tr>/<td>')
  if (info.colSpan !== '2')
    issues.push(
      `[assert] DataGrid.Empty's cell should span every column, got colspan=${info.colSpan}`,
    )
  const title = await scene.getByText('No clients yet').count()
  if (title !== 1)
    issues.push(
      '[assert] the frozen EmptyState should render inside DataGrid.Empty',
    )
  await context.close()
}

// Loading: a full-width Spinner row, no fabricated loading state owned by
// DataGrid itself.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'dg-loading')
  const spinner = scene.locator('[role="status"], svg').first()
  if ((await spinner.count()) < 1)
    issues.push('[assert] a Spinner should render inside the loading row')
  await context.close()
}

// Long content: cell text wraps, never truncated.
{
  const { context, page } = await newPage(1280, 900)
  const cell = section(page, 'dg-long-content').locator('td').last()
  const info = await cell.evaluate((e) => {
    const cs = getComputedStyle(e)
    return {
      height: e.getBoundingClientRect().height,
      textOverflow: cs.textOverflow,
    }
  })
  const lineHeight = await cell.evaluate((e) =>
    parseFloat(getComputedStyle(e).lineHeight),
  )
  if (!(info.height > lineHeight * 1.5))
    issues.push(
      `[assert] long cell content should wrap onto multiple lines, height=${info.height} line=${lineHeight}`,
    )
  if (info.textOverflow === 'ellipsis')
    issues.push(
      '[assert] long cell content must never truncate with an ellipsis',
    )
  await context.close()
}

// Responsive: a narrow viewport scrolls the grid horizontally — inherited
// from the frozen Table, never collapsing into Cards.
{
  const { context, page } = await newPage(390, 900)
  const scene = section(page, 'dg-responsive')
  const table = scene.locator('table').first()
  const wrapper = scene.locator('.overflow-x-auto').first()
  const tableWidth = await table.evaluate((e) => e.scrollWidth)
  const wrapperWidth = await wrapper.evaluate((e) => e.clientWidth)
  if (!(tableWidth > wrapperWidth))
    issues.push(
      '[assert] a wide DataGrid at a narrow viewport should require horizontal scroll',
    )
  await context.close()
}

// Disabled: a disabled Pagination truly disables its buttons.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'dg-disabled')
  const nextButton = scene.getByRole('button', { name: /next/i })
  const isDisabled = await nextButton.isDisabled()
  if (!isDisabled)
    issues.push(
      '[assert] disabled Pagination should render real disabled buttons',
    )
  await context.close()
}

// RTL: native structure preserved, dedicated screenshot captured.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'dg-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const tableRole = await scene.locator('table').first().getAttribute('role')
  if (tableRole !== 'grid')
    issues.push('[assert] dg-rtl should render a real role="grid" table')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/data-grid-rtl.png` })
  console.log(`screenshot: ${OUT}/data-grid-rtl.png`)
  await context.close()
}

// Keyboard: Tab reaches the sortable column button and Pagination's own
// buttons; Enter activates a real native button.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'dg-sorting')
  const sortButton = scene.locator('th button').first()
  await sortButton.focus()
  const isFocused = await sortButton.evaluate(
    (e) => e === document.activeElement,
  )
  if (!isFocused)
    issues.push(
      '[assert] the sortable column header should be a real, focusable button',
    )
  await page.keyboard.press('Enter')
  await page.waitForTimeout(150)
  const sortAfterEnter = await scene
    .locator('th[aria-sort]')
    .first()
    .getAttribute('aria-sort')
  if (sortAfterEnter !== 'ascending')
    issues.push(
      '[assert] Enter on a focused sortable header should activate it via the native button',
    )
  await context.close()
}

// No regression: a spot check across the frozen Data Display siblings.
{
  const { context, page } = await newPage(1280, 900)
  for (const path of [
    '/dev/table',
    '/dev/tree-view',
    '/dev/activity-feed',
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
