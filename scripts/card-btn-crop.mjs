import { chromium } from '@playwright/test'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const b = await chromium.launch({ executablePath: EXEC })
const c = await b.newContext({
  viewport: { width: 1100, height: 820 },
  deviceScaleFactor: 3,
})
const p = await c.newPage()
await p.goto('http://localhost:3000/dev/card', { waitUntil: 'networkidle' })
await p.locator('.btn-embedded').first().waitFor()
const btn = p.locator('section').nth(1).locator('.cd-card__footer').first()
await btn.scrollIntoViewIfNeeded()
await p.waitForTimeout(400)
await btn.screenshot({ path: 'docs/phase-04-screenshots/embedded-btn.png' })
await c.close()
await b.close()
console.log('done')
