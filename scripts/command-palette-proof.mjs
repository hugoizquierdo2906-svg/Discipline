// CommandPalette proof: the Immersive palette (Modal scrim + pane + frozen
// SearchInput + menu-language rows) opened for real — idle groups, live
// filtering, keyboard navigation, empty, loading, long list — on the capture
// background and the rich panel, desktop/tablet/mobile. Requires the dev
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
  await page.goto(`${BASE}/dev/command-palette`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  return { context, page }
}

async function openMain(page, scene = 'canvas') {
  const btn = page
    .locator(`section.proof-${scene}`)
    .locator('[data-open="main"]')
  await btn.scrollIntoViewIfNeeded()
  await btn.click()
  await page.waitForTimeout(500)
}

// Desktop — idle (groups), filtering, keyboard nav, empty.
{
  const { context, page } = await newPage(1280, 900)
  await openMain(page)
  await page.screenshot({ path: `${OUT}/command-palette-idle.png` })
  console.log(`screenshot: ${OUT}/command-palette-idle.png`)

  await page.keyboard.type('go to')
  await page.waitForTimeout(300)
  await page.screenshot({ path: `${OUT}/command-palette-search.png` })
  console.log(`screenshot: ${OUT}/command-palette-search.png`)

  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')
  await page.waitForTimeout(250)
  await page.screenshot({ path: `${OUT}/command-palette-keyboard.png` })
  console.log(`screenshot: ${OUT}/command-palette-keyboard.png`)

  // Escape clears first…
  await page.keyboard.press('Escape')
  await page.waitForTimeout(200)
  await page.keyboard.type('zzzz')
  await page.waitForTimeout(300)
  await page.screenshot({ path: `${OUT}/command-palette-empty.png` })
  console.log(`screenshot: ${OUT}/command-palette-empty.png`)
  await page.keyboard.press('Escape') // clear
  await page.keyboard.press('Escape') // close
  await page.waitForTimeout(300)

  // Loading + long list.
  await page.locator('section.proof-canvas [data-open="loading"]').click()
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/command-palette-loading.png` })
  console.log(`screenshot: ${OUT}/command-palette-loading.png`)
  await page.keyboard.press('Escape')
  await page.waitForTimeout(300)

  await page.locator('section.proof-canvas [data-open="long"]').click()
  await page.waitForTimeout(400)
  for (let i = 0; i < 12; i++) await page.keyboard.press('ArrowDown')
  await page.waitForTimeout(250)
  await page.screenshot({ path: `${OUT}/command-palette-long.png` })
  console.log(`screenshot: ${OUT}/command-palette-long.png`)
  await context.close()
}

// Rich panel — the scrim + immersive pane over the media scene.
{
  const { context, page } = await newPage(1280, 900)
  const media = page.locator('section.proof-media')
  await media.scrollIntoViewIfNeeded()
  await page.waitForTimeout(300)
  await openMain(page, 'media')
  await page.screenshot({ path: `${OUT}/command-palette-media.png` })
  console.log(`screenshot: ${OUT}/command-palette-media.png`)
  await context.close()
}

// Tablet + mobile.
for (const [width, height, suffix] of [
  [834, 1100, 'tablet'],
  [390, 844, 'mobile'],
]) {
  const { context, page } = await newPage(width, height)
  await openMain(page)
  await page.screenshot({ path: `${OUT}/command-palette-${suffix}.png` })
  console.log(`screenshot: ${OUT}/command-palette-${suffix}.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
