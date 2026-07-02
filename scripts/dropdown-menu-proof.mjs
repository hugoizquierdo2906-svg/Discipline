// DropdownMenu proof: the material trio (FloatingSurface · Popover ·
// DropdownMenu), the full menu language (labels/icons/shortcuts/destructive/
// disabled/loading), checkbox + radio items, long scrollable menu and collision
// on the capture background and a rich panel, at desktop/tablet/mobile; plus an
// interactive nested-submenu capture. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/dropdown-menu`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  return { context, page }
}

for (const [width, height, tones, suffix] of [
  [1280, 1100, ['canvas', 'media'], ''],
  [834, 1100, ['canvas'], '-tablet'],
  [390, 844, ['canvas'], '-mobile'],
]) {
  const { context, page } = await newPage(width, height)
  for (const tone of tones) {
    const scene = page.locator(`section.proof-${tone}`)
    await scene.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await scene.screenshot({
      path: `${OUT}/dropdown-menu-${tone}${suffix}.png`,
    })
    console.log(`screenshot: ${OUT}/dropdown-menu-${tone}${suffix}.png`)
  }
  await context.close()
}

// Interactive: open each menu for real (correct available height + focus) and
// capture the viewport, Escape between shots.
{
  const { context, page } = await newPage(1280, 900)
  const canvas = page.locator('section.proof-canvas')

  const shots = [
    ['Account', 'actions'], // labels · icons · shortcuts · destructive · disabled · loading
    ['View', 'checkbox'],
    ['Sort by', 'radio'],
    ['Move to project…', 'long'],
    ['Prefers right', 'collision'],
  ]
  for (const [name, suffix] of shots) {
    const trigger = canvas.getByRole('button', { name, exact: true })
    await trigger.scrollIntoViewIfNeeded()
    await page.waitForTimeout(150)
    await trigger.click()
    await page.waitForTimeout(400)
    await page.screenshot({ path: `${OUT}/dropdown-menu-${suffix}.png` })
    console.log(`screenshot: ${OUT}/dropdown-menu-${suffix}.png`)
    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)
  }

  // Nested submenu: open "File actions", hover "Export as".
  const nested = canvas.getByRole('button', { name: 'File actions' })
  await nested.scrollIntoViewIfNeeded()
  await nested.click()
  await page.waitForTimeout(250)
  await page.getByRole('menuitem', { name: 'Export as' }).hover()
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/dropdown-menu-nested.png` })
  console.log(`screenshot: ${OUT}/dropdown-menu-nested.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
