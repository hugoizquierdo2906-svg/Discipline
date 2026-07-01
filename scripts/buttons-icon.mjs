import { chromium } from '@playwright/test'
const OUT = 'docs/phase-04-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const b = await chromium.launch({ executablePath: EXEC })
const c = await b.newContext({
  viewport: { width: 1200, height: 900 },
  deviceScaleFactor: 2,
})
const p = await c.newPage()
await p.goto('http://localhost:3000/dev/components', {
  waitUntil: 'networkidle',
})
const link = p.getByText('Link button', { exact: false }).first()
await link.scrollIntoViewIfNeeded()
await p.waitForTimeout(300)
const lb = await link.boundingBox()
// icon buttons are to the left of the link on the same row
await p.screenshot({
  path: `${OUT}/buttons-iconlink.png`,
  clip: { x: 40, y: lb.y - 30, width: 900, height: 120 },
})
console.log('linkY', lb.y)
await c.close()
await b.close()
