# Sportoid

Next.js App Router website with Sanity Studio at `/studio`.

## Development

```sh
npm ci
npm run dev
```

Create `.env.local` using the variable names in `.env.example`. Public CMS reads require a Sanity project ID and dataset. Only server-side form handlers need a write token. Never put credentials in `NEXT_PUBLIC_*` variables.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run verify:production
```

`verify:production` creates an isolated `.next-audit` build, starts it on loopback port 3101 with a temporary webhook secret, runs the browser/security/accessibility regression suite, scans browser bundles for configured server credentials, and stops the temporary server. It leaves the development server alone. The suite reads CMS content and does not write production submissions or documents.

To test an already-running app: `TEST_BASE_URL=http://localhost:3000 npm test`. The signed-webhook test requires a dedicated test server configured with a matching `TEST_WEBHOOK_SECRET`/`SANITY_REVALIDATE_SECRET`; it is skipped otherwise. Do not send test cache invalidations to production.

## CMS and deployment

See [the audit and rollout guide](docs/AUDIT.md) for the findings, Sanity webhook configuration, SEO authoring, environment variables, production verification and remaining limitations. After deployment, Sanity publication webhooks expire the content cache. A 60-second revalidation interval is the fallback for missed deliveries.

New articles, events and Additional Pages receive SEO defaults and sitemap entries automatically. Add a navigation link in Studio if an Additional Page should appear in the menu. Individual documents can override their SEO fields or be excluded from search results.
