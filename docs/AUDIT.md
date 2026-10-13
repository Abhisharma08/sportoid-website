# Website audit and rollout notes

## Findings and fixes

- **CMS freshness:** every repository used a 3,600-second cache; production also used Sanity's API CDN. A purged Next.js cache could therefore refill from stale CDN content. Reads now use the published perspective and origin API, with a shared cache tag, immediate webhook expiration, and a 60-second revalidation fallback. CMS fetch failures now throw instead of caching false empty results. Settings and article reads are deduplicated within rendering.
- **Ignored CMS fields:** homepage slide copy and several hero headings were hardcoded; About statistics and the contact map also ignored CMS content. These now use CMS values with fallbacks. The requested homepage section order is retained.
- **Webhook security:** previously an unset secret left invalidation unauthenticated. The endpoint now fails closed, verifies Sanity signatures (with backward-compatible shared-secret support), bounds bodies, rejects unsupported document types, and invalidates shared references, slug changes/deletions, sitemap and robots together.
- **SEO:** blog SEO fields were absent from GROQ projections; canonical overrides were ignored; unknown slugs rendered dummy content; sitemap truncated past events and invented modification timestamps. Pages now use CMS SEO fields, canonical/OG/Twitter metadata, accurate modification dates, indexing controls, and Organization, WebSite, WebPage, BreadcrumbList, BlogPosting and SportsEvent JSON-LD. Structured-data JSON escapes HTML delimiters. New CMS `Additional Page` documents work at `/<slug>`, with reserved routes validated in Studio. Published posts/events/pages are discovered automatically. Studio is noindex. Sitemap entries omit noindex and externally canonicalized content.
- **Flow:** blog search, categories and pagination now use real queries; invented posts, fake navigation and inert author buttons were removed. Blog and gallery have empty states. Missing content gets a real not-found response. Single-day events stay current until the end of their local day. Contact form UI and server validation agree.
- **Performance:** responsive Next.js images, lazy below-fold images, preloaded opening hero image, reserved image space, removal of nonexistent image requests, reduced client boundaries, request deduplication and paginated blog queries. Stock portraits are no longer presented as named staff members.
- **Accessibility/responsiveness:** skip link, focus indicators, keyboard mobile navigation, native modal focus containment, reduced-motion support, carousel pause controls, non-nested link/button markup, labeled forms and announced feedback. Navigation switches to its mobile layout before desktop links collide. Contrast failures identified by axe were corrected.
- **Forms/security:** bounded JSON parsing, same-origin checks, honeypots, normalized email, protected private document IDs, opaque email-derived IDs, atomic duplicate prevention and revision-checked rate limits shared across server instances. Server credentials are isolated from browser imports. Responses do not echo backend errors or submission IDs. CSP restricts base URLs, embedded objects and framing without breaking Studio or social embeds.
- **Dependencies:** Next.js upgraded from 16.3.1 to 16.4.0 to resolve reported critical advisories. Compatible transitive fixes were applied. Remaining upstream advisories require review; see the dependency section below.

## Production observations

On 8 October 2026, `https://www.sportoid.com/` returned HTTP 200 from Vercel, with `x-matched-path: /coming-soon` and a cached response. This checkout has no `/coming-soon` route. Verify the Vercel project, production branch, root directory and domain/rewrite assignment before deployment. These code changes have **not** been deployed.

The read-only check against the configured Sanity dataset found one record per existing singleton page/settings type, zero published posts without slugs, and zero form documents readable anonymously. No production content was modified. A revalidation secret was not present in the local environment; production environment variables and actual webhook delivery are not inspectable from this checkout.

## Required production configuration

1. Configure `SANITY_REVALIDATE_SECRET` in Vercel as a long random secret. Do not prefix it with `NEXT_PUBLIC_`.
2. In Sanity Manage → project → API → Webhooks, create a webhook:
   - URL: `https://www.sportoid.com/api/revalidate`
   - Method: POST; dataset: the production dataset; trigger on create, update and delete.
   - Enable it; disable drafts and versions.
   - Filter:
     ```groq
     coalesce(after()._type, before()._type) in ["page", "homePage", "aboutPage", "peoplePage", "person", "galleryPage", "galleryItem", "galleryCategory", "event", "eventsPage", "clientLogo", "linkedinPost", "blogPage", "post", "postCategory", "author", "contactPage", "siteSettings", "navigation", "footerSettings"]
     ```
   - Projection: `{"_id": coalesce(after()._id, before()._id), "_type": coalesce(after()._type, before()._type)}`. Verify create, update and delete deliveries in Sanity's webhook log.
   - Secret: the same value as `SANITY_REVALIDATE_SECRET` (Sanity sends a signed payload).
3. Set `SANITY_API_WRITE_TOKEN` to a server-only token with the write permissions required for submissions and private rate-limit records. The existing `SANITY_API_READ_TOKEN` name remains a compatibility fallback, but a read-only token cannot save forms.
4. Set a stable `FORM_ID_SECRET` for opaque form IDs. Until configured, the server token is the fallback. Set `SITE_URL=https://www.sportoid.com` if the deployment proxy exposes a different request origin. Ensure the hosting proxy overwrites `x-forwarded-for`; never trust unfiltered client-supplied forwarding headers.
5. In Sanity Site Settings, confirm the canonical base URL, global index setting and social sharing image. Each supported page has Search & Social settings; articles retain their existing SEO fields. Publish changes, rather than leaving them in drafts.
6. Deploy the updated application and Studio together. Then publish a harmless content change and verify webhook HTTP 200, fresh page HTML, metadata and sitemap; restore the content afterward. Also verify unpublished/deleted content and changed slugs. Do this on a preview dataset first where possible.

The webhook waits approximately three seconds for Sanity consistency, then expires caches; the next page request fetches fresh published content. Already-open browser tabs are not pushed updates. Without a delivered webhook, 60 seconds is the cache revalidation interval, **not a guaranteed maximum delay**: the first request after expiry can receive the prior page while regeneration runs. Vercel deployments share their cache; custom multi-instance hosts need a shared Next.js cache handler. The Elfsight LinkedIn feed has its own provider-side refresh schedule outside Sanity's control.

## Forms and privacy

New form documents use `private.contact.*` / `private.newsletter.*` IDs. Sanity requires authenticated reads for dotted document IDs, even on public datasets. These remain available to authenticated Studio users. Do not copy them to root-level IDs or publish personal data through public content types. Anonymous count checks found no existing exposed records, so no data migration was performed. Rate-limit records are private and reused per hashed IP/endpoint; operators may periodically remove expired `formRateLimit` records. A hosting firewall should also rate-limit public form endpoints to absorb high-volume attacks before they reach Sanity. The endpoints save submissions/subscriptions; they do not send email campaigns or notification emails.

## Verification and remaining limits

Run:

```sh
npm ci
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
# Start the app, then run against its URL:
TEST_BASE_URL=http://localhost:3000 npm test
node scripts/audit-content.mjs
npm run verify:production
```

Automated browser checks cover the public routes, metadata, responsive widths, axe WCAG checks, search/navigation, invalid requests, 404s and gallery keyboard behavior. Tests do not create production form data. Production webhook publication latency, successful form writes, Studio permissions, and Google indexing must also be verified in the deployed environment. Automated accessibility checks do not replace a full assistive-technology audit. Field Core Web Vitals require real-user data after deployment; do not treat local lab numbers as field scores.

After compatible dependency remediation, `npm audit` still reports upstream issues in dependencies including braces, js-yaml, smol-toml, sprintf-js and uuid through Sanity/CLI/build tooling. The audit tool suggests incompatible downgrades for portions of this tree; these were not forced. Recheck advisories and update upstream packages as compatible fixes become available. Do not expose build tooling to untrusted archives/configuration. No claim of a vulnerability-free dependency tree is made.

## Content review still needed

The dataset contains placeholder/demo content (including an event titled `test`, generic contact details and a logo record named `test`). Replace these in Studio before public launch. Use logo assets with adequate contrast on the white logo strip. Empty LinkedIn widget space can also indicate an unconfigured/unavailable Elfsight feed; the profile link remains available, but its account configuration and upstream content refresh need checking in Elfsight.

## References

- [Sanity caching and revalidation](https://www.sanity.io/docs/nextjs/caching-and-revalidation-in-nextjs)
- [Sanity webhook validation](https://www.sanity.io/docs/nextjs/validating-sanity-webhooks-nextjs)
- [Sanity private document IDs](https://www.sanity.io/docs/content-lake/ids)
- Next.js APIs were checked against the installed version's `node_modules/next/dist/docs/` documentation.
