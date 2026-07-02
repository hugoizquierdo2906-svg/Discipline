// HoverCard proof: the trio (FloatingSurface · Popover · HoverCard), the
// preview cards (user · exercise · book · workout), delays, sides, sizes and
// edge collision — capture background + rich panel, desktop/tablet/mobile;
// plus REAL hover interactions (open by intent, then pointer bridge onto the
// card: it must stay open). Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/hover-card`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  return { context, page }
}

// Full scenes (defaultOpen previews visible).
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
    await scene.screenshot({ path: `${OUT}/hover-card-${tone}${suffix}.png` })
    console.log(`screenshot: ${OUT}/hover-card-${tone}${suffix}.png`)
  }
  await context.close()
}

// Interactive: real hover intent + the forgiving pointer bridge.
{
  const { context, page } = await newPage(1280, 900)
  const canvas = page.locator('section.proof-canvas')

  // 0. The preview cards, opened by real hover.
  for (const [name, suffix] of [
    ['@hugo', 'user'],
    ['Back squat', 'exercise'],
    ['Starting Strength', 'book'],
    ['Hybrid 12-week', 'workout'],
    ['Edge target', 'collision'],
  ]) {
    const target = canvas.getByText(name, { exact: true }).first()
    // Center the trigger so the card has viewport room below it.
    await target.evaluate((el) => el.scrollIntoView({ block: 'center' }))
    await page.waitForTimeout(250)
    await target.hover()
    await page.waitForTimeout(700)
    await page.screenshot({ path: `${OUT}/hover-card-${suffix}.png` })
    console.log(`screenshot: ${OUT}/hover-card-${suffix}.png`)
    await page.mouse.move(10, 10)
    await page.waitForTimeout(400)
  }

  // 1. Hover the 200/150 delay trigger — opens after intent.
  const delayed = canvas.getByRole('button', { name: '200/150 ms' })
  await delayed.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await delayed.hover()
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${OUT}/hover-card-open.png` })
  console.log(`screenshot: ${OUT}/hover-card-open.png`)

  // 2. Bridge: move the pointer from the trigger ONTO the card — must stay open.
  const card = page
    .locator('[data-radix-popper-content-wrapper]')
    .locator('visible=true')
    .last()
  const box = await card.boundingBox()
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, {
    steps: 12,
  })
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/hover-card-bridge.png` })
  console.log(`screenshot: ${OUT}/hover-card-bridge.png (must still be open)`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
