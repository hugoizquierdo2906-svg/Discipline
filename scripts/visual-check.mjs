// Phase 03 validation: capture /dev/components at three widths and run an
// axe-core accessibility scan. Requires the dev server running on :3000.
// Usage: node scripts/visual-check.mjs
import { mkdirSync } from 'node:fs'

import AxeBuilder from '@axe-core/playwright'
import { chromium } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const ROUTE = '/dev/components'
const OUT = 'docs/phase-03-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

const viewports = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'tablet-1024', width: 1024, height: 800 },
  { name: 'mobile-390', width: 390, height: 844 },
]

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EXEC })

async function open(width, height) {
  const context = await browser.newContext({ viewport: { width, height } })
  const page = await context.newPage()
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: 'networkidle' })
  // Fail loudly if we somehow captured a 404 instead of the gallery.
  await page
    .getByRole('heading', { name: 'DISCIPLINE — Level 1 Components' })
    .waitFor({
      timeout: 15000,
    })
  return { context, page }
}

for (const vp of viewports) {
  const { context, page } = await open(vp.width, vp.height)
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/${vp.name}.png`, fullPage: true })
  console.log(`screenshot: ${OUT}/${vp.name}.png (${vp.width}x${vp.height})`)
  await context.close()
}

// Accessibility scan at desktop width.
const { context, page } = await open(1440, 900)
const results = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
  .analyze()

console.log(`\naxe-core violations: ${results.violations.length}`)
for (const v of results.violations) {
  console.log(`- [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))`)
  console.log(`  ${v.helpUrl}`)
  for (const n of v.nodes) {
    console.log(`  target: ${JSON.stringify(n.target)}`)
    console.log(`  html: ${n.html.slice(0, 160)}`)
    console.log(`  why: ${(n.failureSummary ?? '').replace(/\n/g, ' | ')}`)
  }
}
await context.close()
await browser.close()

if (results.violations.length > 0) process.exitCode = 1
