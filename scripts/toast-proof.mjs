// Toast proof: variants, action, long/sticky, progress, promise update, queue
// (max 4 visible), top-center stack — fired for real on the capture background
// and the rich panel, desktop/mobile. Requires the dev server on :3000.
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
  await page.goto(`${BASE}/dev/toast`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  return { context, page }
}

// Desktop canvas: variants stack, then queue, then top-center, then promise.
{
  const { context, page } = await newPage(1280, 900)
  const canvas = page.locator('section.proof-canvas')
  for (const v of ['success', 'warning', 'error', 'info']) {
    await canvas.locator(`[data-fire="${v}"]`).click()
    await page.waitForTimeout(250)
  }
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/toast-variants.png` })
  console.log(`screenshot: ${OUT}/toast-variants.png`)
  await page.keyboard.press('F8')
  for (let i = 0; i < 4; i++) await page.keyboard.press('Escape')
  await page.waitForTimeout(600)

  await canvas.locator('[data-fire="progress"]').click()
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `${OUT}/toast-progress.png` })
  console.log(`screenshot: ${OUT}/toast-progress.png`)
  await page.keyboard.press('F8')
  await page.keyboard.press('Escape')
  await page.waitForTimeout(500)

  await canvas.locator('[data-fire="promise"]').click()
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/toast-loading.png` })
  console.log(`screenshot: ${OUT}/toast-loading.png`)
  await page.waitForTimeout(1600)
  await page.screenshot({ path: `${OUT}/toast-promise-done.png` })
  console.log(`screenshot: ${OUT}/toast-promise-done.png`)
  await page.keyboard.press('F8')
  await page.keyboard.press('Escape')
  await page.waitForTimeout(500)

  await canvas.locator('[data-fire="queue"]').click()
  await page.waitForTimeout(700)
  await page.screenshot({ path: `${OUT}/toast-queue.png` })
  console.log(`screenshot: ${OUT}/toast-queue.png (6 fired, 4 visible)`)
  await page.keyboard.press('F8')
  for (let i = 0; i < 6; i++) await page.keyboard.press('Escape')
  await page.waitForTimeout(600)

  await canvas.locator('[data-position="top-center"]').click()
  await canvas.locator('[data-fire="success"]').click()
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/toast-top-center.png` })
  console.log(`screenshot: ${OUT}/toast-top-center.png`)
  await context.close()
}

// Rich panel + mobile.
{
  const { context, page } = await newPage(1280, 900)
  const media = page.locator('section.proof-media')
  await media.scrollIntoViewIfNeeded()
  await media.locator('[data-fire="error"]').click()
  await media.locator('[data-fire="success"]').click()
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/toast-media.png` })
  console.log(`screenshot: ${OUT}/toast-media.png`)
  await context.close()
}
{
  const { context, page } = await newPage(390, 844)
  const canvas = page.locator('section.proof-canvas')
  await canvas.locator('[data-fire="success"]').click()
  await canvas.locator('[data-fire="error"]').click()
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/toast-mobile.png` })
  console.log(`screenshot: ${OUT}/toast-mobile.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
