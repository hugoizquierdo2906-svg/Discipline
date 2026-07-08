// Avatar proof — the foundational Data Display primitive. Captures
// (desktop/tablet/mobile) plus programmatic assertions for the image, the
// automatic fallback (broken image → initials), the initials + icon fallbacks,
// sizes (one token scale), shapes, groups, overflow (+N), responsive
// size-only, and RTL. Requires the dev server on :3000.
import { mkdirSync } from 'node:fs'

import { chromium } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = 'docs/phase-04-screenshots'
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EXEC })
const issues = []

async function newPage(width, height) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning')
      issues.push(`[${m.type()}] ${m.text()}`)
  })
  page.on('pageerror', (e) => issues.push(`[pageerror] ${e.message}`))
  await page.goto(`${BASE}/dev/avatar`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  return { context, page }
}

function section(page, testId) {
  return page.locator(`[data-testid="${testId}"]`)
}
// The Avatar Root is the only element with overflow-hidden (the Group wrapper
// and the image are not), so this matches avatar roots at any nesting.
function roots(page, testId) {
  return section(page, testId).locator('.overflow-hidden')
}

// Full-page captures.
for (const [w, h, suffix] of [
  [1280, 2200, ''],
  [834, 2400, '-tablet'],
  [390, 3000, '-mobile'],
]) {
  const { context, page } = await newPage(w, h)
  await page.screenshot({ path: `${OUT}/avatar${suffix}.png`, fullPage: true })
  console.log(`screenshot: ${OUT}/avatar${suffix}.png`)
  await context.close()
}

// Image displayed: a loaded <img> filling the surface, object-fit cover.
{
  const { context, page } = await newPage(1280, 900)
  const img = section(page, 'av-basic').locator('img')
  await img.waitFor({ state: 'attached', timeout: 5000 }).catch(() => {})
  if ((await img.count()) !== 1)
    issues.push('[assert] Basic should render the loaded image')
  else {
    const info = await img.evaluate((e) => ({
      nw: e.naturalWidth,
      fit: getComputedStyle(e).objectFit,
      alt: e.getAttribute('alt'),
    }))
    if (!(info.nw > 0)) issues.push('[assert] Basic image should actually load')
    if (info.fit !== 'cover')
      issues.push(`[assert] image should be object-cover, got ${info.fit}`)
    if (!info.alt) issues.push('[assert] image should carry alt text')
  }
  await context.close()
}

// Initials fallback: two uppercase letters, never more.
{
  const { context, page } = await newPage(1280, 900)
  const txt = (await section(page, 'av-initials').innerText()).trim()
  if (!/HI/.test(txt) || !/MC/.test(txt))
    issues.push(`[assert] initials should render HI and MC, got "${txt}"`)
  await context.close()
}

// Icon fallback: neither image nor initials — a generic user svg, no letters.
{
  const { context, page } = await newPage(1280, 900)
  const s = section(page, 'av-icon')
  const avatar = roots(page, 'av-icon').first()
  if ((await avatar.locator('svg').count()) === 0)
    issues.push('[assert] icon fallback should render a user svg')
  if ((await s.locator('img').count()) !== 0)
    issues.push('[assert] icon fallback should have no image')
  // The avatar root itself carries no letters (only the user icon).
  const txt = (await avatar.innerText()).trim()
  if (/[A-Za-z]/.test(txt))
    issues.push(
      `[assert] icon fallback avatar should show no letters, got "${txt}"`,
    )
  await context.close()
}

// Broken image → automatic fallback to the initials, image element removed.
{
  const { context, page } = await newPage(1280, 900)
  const s = section(page, 'av-broken')
  await page.waitForTimeout(400)
  if ((await s.locator('img').count()) !== 0)
    issues.push('[assert] broken image should be removed by the fallback')
  if (!/MC/.test(await s.innerText()))
    issues.push('[assert] broken image should fall back to initials (MC)')
  await context.close()
}

// Sizes: one token scale, height strictly increases xs<sm<md<lg<xl.
{
  const { context, page } = await newPage(1280, 900)
  const hs = await roots(page, 'av-sizes').evaluateAll((els) =>
    els.map((e) => e.getBoundingClientRect().height),
  )
  const ok = hs.length === 5 && hs.every((h, i) => i === 0 || h > hs[i - 1])
  if (!ok)
    issues.push(
      `[assert] sizes should increase xs<sm<md<lg<xl, got ${JSON.stringify(hs)}`,
    )
  await context.close()
}

// Shapes: circle (pill) > rounded > square (≈0).
{
  const { context, page } = await newPage(1280, 900)
  const r = await roots(page, 'av-shapes').evaluateAll((els) =>
    els.map((e) => parseFloat(getComputedStyle(e).borderTopLeftRadius)),
  )
  const [circle, rounded, square] = r
  if (!(square < 1))
    issues.push(`[assert] square should be ~0 radius, got ${square}`)
  if (!(rounded > square && circle > rounded))
    issues.push(
      `[assert] radius should increase square<rounded<circle, got ${JSON.stringify(r)}`,
    )
  await context.close()
}

// Group: composition renders every avatar, overlapping via a NEGATIVE logical
// margin so neighbours tuck under (and it flips under RTL).
{
  const { context, page } = await newPage(1280, 900)
  const s = section(page, 'av-group')
  // Three groups of 2 + 3 + 5 = 10 avatar roots, none collapsed (no max).
  const total = await s.locator('.overflow-hidden').count()
  if (total !== 10)
    issues.push(`[assert] groups should render all 10 avatars, got ${total}`)
  // The second ring wrapper overall is the 2nd avatar of the first group — it
  // carries the negative overlap margin (the first, i=0, does not).
  const marginOfSecond = await s
    .locator('span.ring-2')
    .nth(1)
    .evaluate((e) => parseFloat(getComputedStyle(e).marginInlineStart))
  if (!(marginOfSecond < 0))
    issues.push(
      `[assert] group items should overlap (negative margin), got ${marginOfSecond}`,
    )
  await context.close()
}

// Overflow: past max, a calm +N chip with the exact remainder.
{
  const { context, page } = await newPage(1280, 900)
  const t = await section(page, 'av-overflow').innerText()
  if (!/\+3\b/.test(t))
    issues.push(`[assert] 6 items max 3 should show +3, got "${t}"`)
  if (!/\+12\b/.test(t))
    issues.push(`[assert] 14 items max 2 should show +12, got "${t}"`)
  await context.close()
}

// Responsive: the Avatar only changes size, never shape (both stay circles).
{
  const { context, page } = await newPage(1280, 900)
  const r = await roots(page, 'av-responsive').evaluateAll((els) =>
    els.map((e) => {
      const b = e.getBoundingClientRect()
      return {
        h: Math.round(b.height),
        radius: parseFloat(getComputedStyle(e).borderTopLeftRadius),
        circle:
          parseFloat(getComputedStyle(e).borderTopLeftRadius) >=
          b.height / 2 - 1,
      }
    }),
  )
  if (!(r[0].h !== r[1].h))
    issues.push('[assert] responsive avatars should differ in size')
  if (!(r[0].circle && r[1].circle))
    issues.push(
      '[assert] responsive avatars should stay circles (shape never changes)',
    )
  await context.close()
}

// RTL: computed direction rtl and the overflow chip still resolves.
{
  const { context, page } = await newPage(1280, 900)
  const scene = section(page, 'av-rtl')
  if ((await scene.locator('[dir="rtl"]').count()) !== 1)
    issues.push('[assert] rtl wrapper missing')
  const dir = await scene
    .locator('[dir="rtl"] > div')
    .first()
    .evaluate((e) => getComputedStyle(e).direction)
  if (dir !== 'rtl')
    issues.push(`[assert] RTL group direction expected rtl, got ${dir}`)
  if (!/\+3\b/.test(await scene.innerText()))
    issues.push('[assert] RTL group should still show its +N overflow')
  await scene.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await scene.screenshot({ path: `${OUT}/avatar-rtl.png` })
  console.log(`screenshot: ${OUT}/avatar-rtl.png`)
  await context.close()
}

console.log(`\n=== console issues (${issues.length}) ===`)
for (const i of [...new Set(issues)]) console.log(i)

await browser.close()
