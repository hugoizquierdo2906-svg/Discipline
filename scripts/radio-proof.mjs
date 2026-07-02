// Radio proof: every state, vertical + horizontal groups, permission/template
// selectors — capture background + rich panel, desktop/tablet/mobile, plus
// keyboard traversal (focus, ArrowDown moves AND selects, loop). Requires the
// dev server on :3000.
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
  await page.goto(`${BASE}/dev/radio`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
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
    await page.waitForTimeout(250)
    await scene.screenshot({ path: `${OUT}/radio-${tone}${suffix}.png` })
    console.log(`screenshot: ${OUT}/radio-${tone}${suffix}.png`)
  }
  await context.close()
}

// Keyboard: focus the horizontal Frequency group, ArrowRight twice (moves AND
// selects), capture focus ring + new selection.
{
  const { context, page } = await newPage(1280, 900)
  const group = page
    .locator('section.proof-canvas [data-testid="frequency"]')
    .locator('[role="radio"][data-state="checked"]')
  await group.evaluate((el) => el.scrollIntoView({ block: 'center' }))
  await page.waitForTimeout(200)
  await group.focus()
  await page.waitForTimeout(150)
  await page.screenshot({ path: `${OUT}/radio-focus.png` })
  console.log(`screenshot: ${OUT}/radio-focus.png (focus on "4 days")`)
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(250)
  await page.screenshot({ path: `${OUT}/radio-keyboard.png` })
  console.log(
    `screenshot: ${OUT}/radio-keyboard.png (ArrowRight x2 -> "6 days")`,
  )
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
