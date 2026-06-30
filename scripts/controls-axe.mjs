// axe-core scan of the Control Surface family proof. Requires dev server :3000.
import AxeBuilder from '@axe-core/playwright'
import { chromium } from '@playwright/test'

const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const browser = await chromium.launch({ executablePath: EXEC })
const context = await browser.newContext()
const page = await context.newPage()
await page.goto('http://localhost:3000/dev/controls', {
  waitUntil: 'networkidle',
})
await page.locator('.ds-control').first().waitFor()
const { violations } = await new AxeBuilder({ page }).analyze()
console.log(`violations: ${violations.length}`)
for (const v of violations) {
  console.log(`- [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`)
}
await context.close()
await browser.close()
process.exit(violations.length ? 1 : 0)
