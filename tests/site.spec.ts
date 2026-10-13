import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { safeHref, siteOrigin } from '../src/lib/urls'
import { contactSchema, newsletterSchema } from '../src/lib/form-validation'
import { hasEventEnded } from '../src/features/events/utils'
import { isContentType } from '../src/lib/revalidation'

const routes = ['/', '/about', '/people', '/gallery', '/events', '/blog', '/contact']
test('URL, input and event boundary regressions', () => {
  for (const input of ['javascript:alert(1)', '//attacker.test', '/\\attacker', 'data:text/html,x']) expect(safeHref(input)).toBeUndefined()
  expect(safeHref('/about')).toBe('/about')
  expect(siteOrigin('https://www.sportoid.com/path?q=x')).toBe('https://www.sportoid.com')
  expect(siteOrigin('invalid')).toBe('https://www.sportoid.com')
  expect(newsletterSchema.parse({ email: ' A@Example.com ' }).email).toBe('a@example.com')
  expect(contactSchema.safeParse({ name: '  ', email: 'a@example.com', subject: 'abc', message: '12345' }).success).toBe(false)
  expect(isContentType('contactSubmission')).toBe(false)
  expect(isContentType('post')).toBe(true)
  const event = { startDate: '2026-10-08T04:00:00Z' }
  expect(hasEventEnded(event, new Date('2026-10-08T16:00:00Z'))).toBe(false)
  expect(hasEventEnded(event, new Date('2026-10-08T18:31:00Z'))).toBe(true)
})

for (const route of routes) test(`SEO, accessibility and responsive layout: ${route}`, async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  const response = await page.goto(route, { waitUntil: 'domcontentloaded' })
  expect(response?.status()).toBe(200)
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page).toHaveTitle(/SPORTOID/i)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S+/)
  expect(new URL((await page.locator('link[rel="canonical"]').getAttribute('href')) || '').href).toBe(`https://www.sportoid.com${route}`)
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /\S+/)
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https:/)
  const schema = await page.locator('script[type="application/ld+json"]').first().textContent()
  expect(JSON.parse(schema || '{}')['@graph']).toBeTruthy()
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true)
  }
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(audit.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual([])
  expect(errors).toEqual([])
})

test('404s, sitemap, robots and invalid API requests', async ({ request }) => {
  for (const route of ['/blog/no-such-audit-post-98765', '/events/no-such-audit-event-98765']) {
    const response = await request.get(route)
    expect(response.status()).toBe(404)
    expect(await response.text()).toContain('noindex')
  }
  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.ok()).toBe(true)
  expect(await sitemap.text()).toContain('https://www.sportoid.com/about')
  expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /studio')
  for (const endpoint of ['/api/contact', '/api/newsletter']) {
    expect((await request.post(endpoint, { data: '{broken', headers: { 'content-type': 'application/json' } })).status()).toBe(400)
    expect((await request.post(endpoint, { data: {}, headers: { origin: 'https://attacker.example' } })).status()).toBe(403)
    expect((await request.post(endpoint, { data: { email: 'not-an-email' } })).status()).toBe(400)
  }
  expect([401, 503]).toContain((await request.post('/api/revalidate', { data: { _type: 'post' } })).status())
})

test('mobile navigation and blog search work', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  const menu = page.getByRole('button', { name: /Navigation Menu/ })
  await menu.click()
  await expect(menu).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await page.goto('/blog')
  await page.getByRole('searchbox').fill('no-such-audit-article-98765')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await expect(page).toHaveURL(/q=no-such/)
  await expect(page.getByText('No articles match your search.')).toBeVisible()
})

test('signed webhook expires content and rejects tampering', async ({ request }) => {
  const secret = process.env.TEST_WEBHOOK_SECRET
  test.skip(!secret, 'Use a dedicated local/preview server with a test webhook secret')
  const { encodeSignatureHeader } = await import('@sanity/webhook')
  const payload = JSON.stringify({ _type: 'post', _id: 'audit-cache-invalidation' })
  const signature = await encodeSignatureHeader(payload, Date.now(), secret!)
  const response = await request.post('/api/revalidate', { data: payload, headers: { 'content-type': 'application/json', 'sanity-webhook-signature': signature } })
  expect(response.status()).toBe(200)
  expect((await response.json()).revalidated).toBe(true)
  const invalid = await request.post('/api/revalidate', { data: payload.replace('post', 'event'), headers: { 'content-type': 'application/json', 'sanity-webhook-signature': signature } })
  expect(invalid.status()).toBe(401)
  const draft = JSON.stringify({ _type: 'post', _id: 'drafts.audit-cache-invalidation' })
  const draftSignature = await encodeSignatureHeader(draft, Date.now(), secret!)
  const ignored = await request.post('/api/revalidate', { data: draft, headers: { 'content-type': 'application/json', 'sanity-webhook-signature': draftSignature } })
  expect((await ignored.json()).revalidated).toBe(false)
})

test('existing articles, event details and studio metadata', async ({ request, page }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text()
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname)
  for (const prefix of ['/blog/', '/events/']) {
    const path = urls.find((url) => url.startsWith(prefix))
    if (!path) continue
    await page.goto(path)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /\S+/)
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(audit.violations.map((v) => v.id)).toEqual([])
  }
  const studio = await request.get('/studio')
  expect(studio.ok()).toBe(true)
  expect(await studio.text()).toContain('noindex')
})

test('homepage lab metrics and screenshots', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.addInitScript(() => {
    const metrics = { lcp: 0, cls: 0 }
    Object.assign(window, { auditMetrics: metrics })
    new PerformanceObserver((list) => { for (const entry of list.getEntries()) metrics.lcp = entry.startTime }).observe({ type: 'largest-contentful-paint', buffered: true })
    new PerformanceObserver((list) => {
      for (const raw of list.getEntries()) {
        const entry = raw as PerformanceEntry & { hadRecentInput: boolean; value: number }
        if (!entry.hadRecentInput) metrics.cls += entry.value
      }
    }).observe({ type: 'layout-shift', buffered: true })
  })
  await page.goto('/')
  await page.locator('main').waitFor()
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: testInfo.outputPath('home-desktop.png'), fullPage: true })
  const metrics = await page.evaluate(() => (window as unknown as { auditMetrics: { lcp: number; cls: number } }).auditMetrics)
  console.log('Local homepage lab sample:', JSON.stringify(metrics))
  await testInfo.attach('lab-metrics', { body: JSON.stringify(metrics), contentType: 'application/json' })
  await page.setViewportSize({ width: 375, height: 812 })
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  const geometry = await page.evaluate(() => ({ height: document.documentElement.scrollHeight, footerBottom: (document.querySelector('footer')?.getBoundingClientRect().bottom || 0) + window.scrollY }))
  console.log('Mobile page geometry:', JSON.stringify(geometry))
  await page.screenshot({ path: testInfo.outputPath('home-mobile.png'), fullPage: true })
})

test('contact form reports validation and successful submission accessibly', async ({ page }) => {
  await page.route('**/api/contact', (route) => route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({ success: true }) }))
  await page.goto('/contact')
  await page.getByRole('button', { name: 'Send Message' }).click()
  await expect(page.getByLabel('Full Name')).toHaveAttribute('aria-invalid', 'true')
  await page.getByLabel('Full Name').fill('Audit Visitor')
  await page.getByLabel('Email Address', { exact: false }).first().fill('audit@example.com')
  await page.getByLabel('Subject').fill('Website inquiry')
  await page.getByLabel('Message', { exact: false }).fill('This is a local browser test.')
  await page.getByRole('button', { name: 'Send Message' }).click()
  await expect(page.getByRole('status')).toContainText('Thank you for reaching out')
})

test('gallery category filter follows the URL', async ({ page }) => {
  await page.goto('/gallery')
  const group = page.getByRole('group', { name: 'Filter portfolio by category' })
  const choices = group.getByRole('button')
  if (await choices.count() < 2) {
    await expect(choices.first()).toHaveAttribute('aria-pressed', 'true')
    return
  }
  await choices.nth(1).click()
  await expect(choices.nth(1)).toHaveAttribute('aria-pressed', 'true')
  await expect(page).toHaveURL(/category=/)
  await choices.first().click()
  await expect(choices.first()).toHaveAttribute('aria-pressed', 'true')
  await expect(page).not.toHaveURL(/category=/)
})
