// Table proof — the Data Display comparison primitive. Captures (desktop/
// tablet/mobile) plus programmatic assertions: native table semantics,
// caption, header/footer, numeric alignment, mixed content (Avatar/Badge/
// Code), long content, sticky header, responsive horizontal scroll, RTL, and
// ARIA. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/table`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}

// Full-page captures.
for (const [w, h, suffix] of [
  [1280, 8200, ''],
  [834, 8700, '-tablet'],
  [390, 10500, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({ path: `${OUT}/table${suffix}.png`, fullPage: true })
  console.log(`screenshot: ${OUT}/table${suffix}.png`)
  await context.close()
}

// Native semantics: real table/thead/tbody/tr/th/td, ARIA table role
// inherited natively (no role attribute needed).
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tb-basic')
  const table = scene.locator('table')
  const info = await table.evaluate((e) => ({
    tag: e.tagName,
    theadTag: e.querySelector('thead')?.tagName,
    tbodyTag: e.querySelector('tbody')?.tagName,
    thTag: e.querySelector('th')?.tagName,
    tdTag: e.querySelector('td')?.tagName,
    role: e.getAttribute('role'),
  }))
  if (info.tag !== 'TABLE')
    issues.push(`[assert] Table should render a real <table>, got ${info.tag}`)
  if (info.theadTag !== 'THEAD')
    issues.push('[assert] Table.Header should render a real <thead>')
  if (info.tbodyTag !== 'TBODY')
    issues.push('[assert] Table.Body should render a real <tbody>')
  if (info.thTag !== 'TH')
    issues.push('[assert] Table.Head should render a real <th>')
  if (info.tdTag !== 'TD')
    issues.push('[assert] Table.Cell should render a real <td>')
  if (info.role !== null)
    issues.push(
      `[assert] a real <table> needs no explicit role, got "${info.role}"`,
    )
  await context.close()
}

// Caption: a real <caption>, start-aligned (not the browser's centered
// default), preceding the header visually and in the DOM.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tb-caption')
  const caption = scene.locator('caption')
  const info = await caption.evaluate((e) => {
    const cs = getComputedStyle(e)
    return { tag: e.tagName, textAlign: cs.textAlign }
  })
  if (info.tag !== 'CAPTION')
    issues.push(
      `[assert] Table.Caption should render a real <caption>, got ${info.tag}`,
    )
  if (info.textAlign.includes('center'))
    issues.push(
      `[assert] Table.Caption should not centre itself, got text-align=${info.textAlign}`,
    )
  await context.close()
}

// Footer: a real <tfoot>.
{
  const { context, page } = await newPage(1280, 900)
  const tag = await section(page, 'tb-footer')
    .locator('tfoot')
    .evaluate((e) => e.tagName)
  if (tag !== 'TFOOT')
    issues.push(
      `[assert] Table.Footer should render a real <tfoot>, got ${tag}`,
    )
  await context.close()
}

// Numeric alignment: align="end" is a LOGICAL (not hard-coded left/right)
// text-align, verified by its physical rendering in both LTR and RTL — text
// sits flush against the cell's own end edge in each direction.
{
  const { context, page } = await newPage(1280, 900)
  const ltrCell = section(page, 'tb-exercises').locator('td').nth(1)
  const align = await ltrCell.evaluate((e) => getComputedStyle(e).textAlign)
  if (align !== 'end')
    issues.push(
      `[assert] align="end" should compute as the logical value "end", got ${align}`,
    )
  const box = await ltrCell.evaluate((e) => {
    const cellRect = e.getBoundingClientRect()
    const range = document.createRange()
    range.selectNodeContents(e)
    const textRect = range.getBoundingClientRect()
    return { cellRight: cellRect.right, textRight: textRect.right }
  })
  if (Math.abs(box.cellRight - box.textRight) > 20)
    issues.push(
      `[assert] align="end" should render flush against the cell's right edge in LTR, cellRight=${box.cellRight} textRight=${box.textRight}`,
    )
  await context.close()
}
{
  const { context, page } = await newPage(1280, 900)
  const rtlCell = section(page, 'tb-rtl').locator('td').nth(1)
  const align = await rtlCell.evaluate((e) => getComputedStyle(e).textAlign)
  if (align !== 'end')
    issues.push(
      `[assert] RTL align="end" should compute as the logical value "end", got ${align}`,
    )
  const box = await rtlCell.evaluate((e) => {
    const cellRect = e.getBoundingClientRect()
    const range = document.createRange()
    range.selectNodeContents(e)
    const textRect = range.getBoundingClientRect()
    return { cellLeft: cellRect.left, textLeft: textRect.left }
  })
  if (Math.abs(box.cellLeft - box.textLeft) > 20)
    issues.push(
      `[assert] align="end" should render flush against the cell's left edge in RTL, cellLeft=${box.cellLeft} textLeft=${box.textLeft}`,
    )
  await context.close()
}

// Mixed content: Avatar, Badge and Code all render inside cells with zero
// adaptation needed.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tb-clients')
  const avatarCount = await scene
    .locator('td span, td div')
    .locator('text=LM')
    .count()
  if (avatarCount < 1)
    issues.push('[assert] Avatar initials should render inside a Table.Cell')
  const badge = scene.locator('td').getByText('Active', { exact: true })
  if ((await badge.count()) !== 1)
    issues.push('[assert] a Badge should render inside a Table.Cell')
  const codeCount = await section(page, 'tb-caption').locator('td code').count()
  if (codeCount < 1)
    issues.push('[assert] Code should render inside a Table.Cell')
  await context.close()
}

// Long content: text wraps inside its cell — no truncation, no overflow
// breaking the table's own width.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tb-long-content')
  const cell = scene.locator('td').nth(1)
  const info = await cell.evaluate((e) => {
    const cs = getComputedStyle(e)
    return {
      height: e.getBoundingClientRect().height,
      whiteSpace: cs.whiteSpace,
    }
  })
  const lineHeight = await cell.evaluate((e) =>
    parseFloat(getComputedStyle(e).lineHeight),
  )
  if (!(info.height > lineHeight * 1.5))
    issues.push(
      `[assert] long content should wrap onto multiple lines, height=${info.height} line=${lineHeight}`,
    )
  if (info.whiteSpace === 'nowrap')
    issues.push('[assert] long content cell must not be nowrap')
  await context.close()
}

// Sticky header: purely visual position:sticky — no scroll-tracking logic.
{
  const { context, page } = await newPage(1280, 900)
  const thead = section(page, 'tb-sticky').locator('thead')
  const position = await thead.evaluate((e) => getComputedStyle(e).position)
  if (position !== 'sticky')
    issues.push(
      `[assert] stickyHeader should apply position:sticky to the header, got ${position}`,
    )
  await context.close()
}

// Empty cells: an absent value renders as an empty <td> — no placeholder
// graphic, no broken layout.
{
  const { context, page } = await newPage(1280, 900)
  const cell = section(page, 'tb-empty')
    .locator('tr')
    .nth(2)
    .locator('td')
    .nth(1)
  const text = await cell.textContent()
  if (text?.trim() !== '')
    issues.push(
      `[assert] empty cell should render with no content, got "${text}"`,
    )
  await context.close()
}

// Responsive: a narrow viewport scrolls the table horizontally — the table
// itself never shrinks its columns below their natural width, and it is
// never replaced by a stack of Cards.
{
  const { context, page } = await newPage(390, 900)
  const wrapper = section(page, 'tb-responsive')
    .locator('.overflow-x-auto')
    .first()
  const table = wrapper.locator('table')
  const info = await table.evaluate((e) => ({
    tag: e.tagName,
    scrollWidth: e.scrollWidth,
  }))
  const wrapperWidth = await wrapper.evaluate((e) => e.clientWidth)
  if (info.tag !== 'TABLE')
    issues.push(
      '[assert] responsive Table must stay a real <table>, never a stack of Cards',
    )
  if (!(info.scrollWidth > wrapperWidth))
    issues.push(
      '[assert] a wide table at a narrow viewport should require horizontal scroll',
    )
  await context.close()
}

// RTL: computed direction rtl, native semantics preserved.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'tb-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const tag = await scene.locator('table').evaluate((e) => e.tagName)
  if (tag !== 'TABLE')
    issues.push('[assert] tb-rtl should render a real <table>')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/table-rtl.png` })
  console.log(`screenshot: ${OUT}/table-rtl.png`)
  await context.close()
}

// No regression: a spot check across the frozen Disclosure siblings.
{
  const { context, page } = await newPage(1280, 900)
  for (const path of ['/dev/accordion', '/dev/collapsible', '/dev/separator']) {
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
