import { mkdirSync } from 'node:fs'

import { chromium } from '@playwright/test'
const OUT = 'docs/phase-04-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
mkdirSync(OUT, { recursive: true })
const b = await chromium.launch({ executablePath: EXEC })
const c = await b.newContext({
  viewport: { width: 1200, height: 820 },
  deviceScaleFactor: 2,
})
const p = await c.newPage()
await p.goto('http://localhost:3000/dev/modal', { waitUntil: 'networkidle' })
await p.locator('.ds-immersive').waitFor()
await p.waitForTimeout(500)
await p.screenshot({ path: `${OUT}/modal-scene.png` })
console.log('done')
await c.close()
await b.close()
