import { readFileSync, writeFileSync } from 'node:fs'

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
const btn = p.getByRole('button', { name: 'Primary' }).first()
await btn.scrollIntoViewIfNeeded()
await p.waitForTimeout(300)
const box = await btn.boundingBox()
const pad = 26
await p.screenshot({
  path: `${OUT}/_btn_tmp.png`,
  clip: {
    x: box.x - pad,
    y: box.y - pad,
    width: box.width + pad * 2,
    height: box.height + pad * 2,
  },
})
const data =
  'data:image/png;base64,' +
  readFileSync(`${OUT}/_btn_tmp.png`).toString('base64')
const png = await p.evaluate(async (d) => {
  const img = await new Promise((r) => {
    const i = new Image()
    i.onload = () => r(i)
    i.src = d
  })
  const w = img.width,
    h = img.height,
    gap = 48
  const cw = w * 2 + Math.round(w * 0.5) + Math.round(w * 0.25) + gap * 5
  const ch = h + 90
  const c = document.createElement('canvas')
  c.width = cw
  c.height = ch
  const x = c.getContext('2d')
  x.fillStyle = 'whitesmoke'
  x.fillRect(0, 0, cw, ch)
  let cx = gap
  for (const s of [1, 0.5, 0.25]) {
    const sw = Math.round(w * s),
      sh = Math.round(h * s)
    x.drawImage(img, cx, 45 + (h - sh) / 2, sw, sh)
    cx += sw + gap
  }
  // silhouette: same button, blurred so text is unreadable
  x.filter = 'blur(7px)'
  x.drawImage(img, cx, 45, w, h)
  x.filter = 'none'
  return c.toDataURL('image/png').split(',')[1]
}, data)
writeFileSync(`${OUT}/buttons-zoom.png`, Buffer.from(png, 'base64'))
console.log('done')
await c.close()
await b.close()
