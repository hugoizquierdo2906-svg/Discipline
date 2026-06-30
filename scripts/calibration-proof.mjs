import { mkdirSync } from 'node:fs'

import { chromium } from '@playwright/test'

const OUT = 'docs/phase-04-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
mkdirSync(OUT, { recursive: true })
const b = await chromium.launch({ executablePath: EXEC })
const c = await b.newContext({
  viewport: { width: 1300, height: 820 },
  deviceScaleFactor: 2,
})
const p = await c.newPage()
await p.goto('http://localhost:3000/dev/calibration', {
  waitUntil: 'networkidle',
})
await p.locator('.im-modal').first().waitFor()
await p.waitForTimeout(500)
const labels = ['calib-media', 'calib-gradient']
const secs = await p.locator('section.calib').all()
for (let i = 0; i < secs.length; i++) {
  await secs[i].scrollIntoViewIfNeeded()
  await p.waitForTimeout(200)
  const box = await secs[i].boundingBox()
  await p.screenshot({
    path: `${OUT}/${labels[i]}.png`,
    clip: { x: box.x, y: box.y, width: box.width, height: box.height },
  })
  console.log(labels[i])
}
await c.close()
await b.close()
