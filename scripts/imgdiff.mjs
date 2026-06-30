import { chromium } from '@playwright/test'
const [a, b, thr] = process.argv.slice(2)
const T = Number(thr || 30)
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const fs = await import('node:fs')
const br = await chromium.launch({ executablePath: EXEC })
const p = await (await br.newContext()).newPage()
const toData = (f) =>
  'data:image/png;base64,' + fs.readFileSync(f).toString('base64')
const r = await p.evaluate(
  async ([da, db, T]) => {
    const load = (s) =>
      new Promise((res) => {
        const i = new Image()
        i.onload = () => res(i)
        i.src = s
      })
    const ia = await load(da),
      ib = await load(db)
    const w = Math.min(ia.width, ib.width),
      h = Math.min(ia.height, ib.height)
    const c = document.createElement('canvas')
    c.width = w
    c.height = h
    const x = c.getContext('2d')
    x.drawImage(ia, 0, 0)
    const A = x.getImageData(0, 0, w, h).data
    x.clearRect(0, 0, w, h)
    x.drawImage(ib, 0, 0)
    const B = x.getImageData(0, 0, w, h).data
    let sig = 0,
      minx = w,
      miny = h,
      maxx = 0,
      maxy = 0
    for (let yy = 0; yy < h; yy++)
      for (let xx = 0; xx < w; xx++) {
        const i = (yy * w + xx) * 4
        const d =
          Math.abs(A[i] - B[i]) +
          Math.abs(A[i + 1] - B[i + 1]) +
          Math.abs(A[i + 2] - B[i + 2])
        if (d > T) {
          sig++
          if (xx < minx) minx = xx
          if (xx > maxx) maxx = xx
          if (yy < miny) miny = yy
          if (yy > maxy) maxy = yy
        }
      }
    return { w, h, sigDiff: sig, sigBox: [minx, miny, maxx, maxy] }
  },
  [toData(a), toData(b), T],
)
console.log(JSON.stringify(r))
await br.close()
