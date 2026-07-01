import { mkdirSync } from 'node:fs'

import { chromium } from '@playwright/test'

const OUT = 'docs/phase-04-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
mkdirSync(OUT, { recursive: true })
const b = await chromium.launch({ executablePath: EXEC })
const c = await b.newContext({
  viewport: { width: 1200, height: 900 },
  deviceScaleFactor: 2,
})
const p = await c.newPage()
await p.goto('http://localhost:3000/dev/components', {
  waitUntil: 'networkidle',
})
await p.locator('button').first().waitFor()
await p.waitForTimeout(400)
// Capture from the "Button — variants" block down to the IconButton block.
const start = p.getByText('Button — variants', { exact: false }).first()
const end = p.getByText('IconButton & LinkButton', { exact: false }).first()
await start.scrollIntoViewIfNeeded()
await p.waitForTimeout(200)
const a = await start.boundingBox()
const z = await end.boundingBox()
const pad = 24
const y = Math.max(0, a.y - 40)
await p.screenshot({
  path: `${OUT}/buttons-current.png`,
  clip: { x: Math.max(0, a.x - pad), y, width: 1100, height: z.y + 120 - y },
})
console.log('buttons-current.png')
await c.close()
await b.close()
