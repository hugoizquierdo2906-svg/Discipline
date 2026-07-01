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
// Inject a light gradient behind everything and make the block cards transparent
await p.addStyleTag({
  content: `
  html, body, main { background: linear-gradient(135deg,#e9e4ff 0%,#e6f0ff 45%,#ffe8f3 100%) !important; }
  section > div.bg-surface-raised { background: transparent !important; border-color: transparent !important; box-shadow: none !important; }
`,
})
await p.waitForTimeout(300)
const start = p.getByText('Button — variants', { exact: false }).first()
await start.scrollIntoViewIfNeeded()
await p.waitForTimeout(200)
const a = await start.boundingBox()
const y = Math.max(0, a.y - 40)
await p.screenshot({
  path: `${OUT}/buttons-gradient.png`,
  clip: { x: Math.max(0, a.x - 24), y, width: 1120, height: 760 },
})
console.log('done')
await c.close()
await b.close()
