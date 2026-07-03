// Switch proof: every state, preference/permission/workout panels, nested
// master switch — capture background + rich panel, desktop/tablet/mobile,
// plus keyboard focus + Space toggle. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/switch`, { waitUntil: 'networkidle' })
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
    await scene.screenshot({ path: `${OUT}/switch-${tone}${suffix}.png` })
    console.log(`screenshot: ${OUT}/switch-${tone}${suffix}.png`)
  }
  await context.close()
}

// Keyboard: focus the master switch (on), Space toggles it off — children dim.
{
  const { context, page } = await newPage(1280, 900)
  const master = page
    .locator('section.proof-canvas [data-testid="master"]')
    .first()
  await master.evaluate((el) => el.scrollIntoView({ block: 'center' }))
  await page.waitForTimeout(200)
  await master.focus()
  await page.waitForTimeout(150)
  await page.screenshot({ path: `${OUT}/switch-focus.png` })
  console.log(`screenshot: ${OUT}/switch-focus.png (focus ring, master on)`)
  await page.keyboard.press('Space')
  await page.waitForTimeout(300)
  await page.screenshot({ path: `${OUT}/switch-keyboard.png` })
  console.log(
    `screenshot: ${OUT}/switch-keyboard.png (Space -> off, children disabled)`,
  )
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
