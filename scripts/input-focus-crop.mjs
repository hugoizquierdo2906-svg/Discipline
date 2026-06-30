// One-off: tight crop of the focused field on the dark panel.
import { chromium } from '@playwright/test'

const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const b = await chromium.launch({ executablePath: EXEC })
const c = await b.newContext({
  viewport: { width: 1200, height: 1400 },
  deviceScaleFactor: 2,
})
const p = await c.newPage()
await p.goto('http://localhost:3000/dev/input', { waitUntil: 'networkidle' })
await p.waitForTimeout(400)
const focused = p.locator('.proof-dark .ci-field').nth(1)
await focused.scrollIntoViewIfNeeded()
await p.waitForTimeout(200)
const box = await focused.boundingBox()
const pad = 60
await p.screenshot({
  path: 'docs/phase-04-screenshots/input-dark-focus.png',
  clip: {
    x: box.x - pad,
    y: box.y - pad,
    width: box.width + pad * 2,
    height: box.height + pad * 2,
  },
})
await c.close()
await b.close()
console.log('done')
