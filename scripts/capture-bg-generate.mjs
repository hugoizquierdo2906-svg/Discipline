// Generates the standard proof capture background — a soft, greyscale liquid-glass
// field (organic silk folds from fractal noise displacing a smooth grey gradient;
// no colour). Output: public/backgrounds/capture-bg.jpg. Reproducible; re-run to
// regenerate. Requires the Chromium bundled with Playwright (no dev server).
import { chromium } from '@playwright/test'

const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const W = 2400
const H = 1600

// feTurbulence displaces a smooth diagonal grey gradient into silky folds; a light
// vignette and a faint second noise add depth. Everything is grey → pure greyscale.
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <filter id="silk" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.0020 0.0030" numOctaves="4" seed="17" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="500" xChannelSelector="R" yChannelSelector="G"/>
      <feGaussianBlur stdDeviation="4"/>
    </filter>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.16" stop-color="#ccccd5"/>
      <stop offset="0.34" stop-color="#f7f7f9"/>
      <stop offset="0.5" stop-color="#c5c5cf"/>
      <stop offset="0.66" stop-color="#f3f3f6"/>
      <stop offset="0.82" stop-color="#cfcfd8"/>
      <stop offset="1" stop-color="#eeeef2"/>
    </linearGradient>
    <radialGradient id="vig" cx="50%" cy="44%" r="78%">
      <stop offset="0.6" stop-color="#c9c9d0" stop-opacity="0"/>
      <stop offset="1" stop-color="#c9c9d0" stop-opacity="0.3"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#e2e2e7"/>
  <rect x="-500" y="-500" width="${W + 1000}" height="${H + 1000}" fill="url(#g)" filter="url(#silk)"/>
  <rect width="100%" height="100%" fill="url(#vig)"/>
</svg>`

const html = `<!doctype html><html><body style="margin:0;padding:0">${svg}</body></html>`

const browser = await chromium.launch({ executablePath: EXEC })
const context = await browser.newContext({
  viewport: { width: W, height: H },
  deviceScaleFactor: 1,
})
const page = await context.newPage()
await page.setContent(html, { waitUntil: 'networkidle' })
await page.waitForTimeout(200)
await page.screenshot({
  path: 'public/backgrounds/capture-bg.jpg',
  type: 'jpeg',
  quality: 90,
  clip: { x: 0, y: 0, width: W, height: H },
})
console.log('wrote public/backgrounds/capture-bg.jpg')
await context.close()
await browser.close()
