# SPORTOID --- Enterprise Component Architecture

## 1. Architecture Objective

Build SPORTOID as a **production-ready, maintainable content platform**,
not as a collection of page-specific React components.

The architecture must support:

-   Home, About Us, People, Gallery, Blog Listing, and Blog Article
    pages.
-   Sanity CMS as the source of editorial content.
-   Next.js App Router and TypeScript.
-   Server-first rendering.
-   Strong separation between presentation, feature logic, CMS access,
    and domain types.
-   Reusable design primitives without creating an over-abstracted
    component library.
-   SEO, accessibility, caching, observability, testing, and safe
    content updates.

### Core principle

``` text
Page / Route
    ↓
Feature Composition
    ↓
Feature Components
    ↓
Shared Components / Design System
    ↓
Application Services
    ↓
Sanity Repository
    ↓
Sanity CMS
```

React components must **not directly contain GROQ queries or
CMS-specific business logic**.

------------------------------------------------------------------------

# 2. Recommended Technology Baseline

## Application

-   Next.js with App Router
-   React
-   TypeScript with `strict: true`
-   Tailwind CSS
-   Sanity CMS
-   `next-sanity`
-   GROQ
-   Portable Text for rich blog content
-   Zod for runtime validation at system boundaries

## UI

Use a small internal design system.

Recommended building blocks:

-   Button
-   Link
-   Container
-   Stack
-   Grid
-   Section
-   Heading
-   Text
-   Card
-   Badge
-   IconButton
-   Input
-   Dialog
-   Carousel primitives

Do not create wrappers around every HTML element. Shared components
should exist only when they provide real consistency, behavior,
accessibility, or reuse.

## Motion

Use motion selectively for:

-   Hero transitions
-   Slider transitions
-   Gallery filtering
-   Reveal effects
-   Micro-interactions

All animation must respect `prefers-reduced-motion`.

------------------------------------------------------------------------

# 3. Top-Level Project Structure

``` text
sportoid/
├── src/
│   ├── app/
│   │   ├── (site)/
│   │   │   ├── page.tsx
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── people/
│   │   │   │   └── page.tsx
│   │   │   ├── gallery/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   └── blog/
│   │   │       ├── page.tsx
│   │   │       └── [slug]/
│   │   │           └── page.tsx
│   │   ├── api/
│   │   │   ├── contact/
│   │   │   │   └── route.ts
│   │   │   ├── newsletter/
│   │   │   │   └── route.ts
│   │   │   └── revalidate/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   │
│   ├── features/
│   │   ├── home/
│   │   ├── about/
│   │   ├── people/
│   │   ├── gallery/
│   │   ├── blog/
│   │   ├── contact/
│   │   └── newsletter/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── shared/
│   │   └── portable-text/
│   │
│   ├── services/
│   │   ├── site/
│   │   ├── posts/
│   │   ├── gallery/
│   │   ├── people/
│   │   └── contact/
│   │
│   ├── repositories/
│   │   └── sanity/
│   │
│   ├── sanity/
│   │   ├── client.ts
│   │   ├── image.ts
│   │   ├── queries/
│   │   └── types/
│   │
│   ├── lib/
│   │   ├── env.ts
│   │   ├── utils.ts
│   │   ├── metadata.ts
│   │   ├── pagination.ts
│   │   └── constants.ts
│   │
│   ├── types/
│   └── styles/
│
├── sanity/
│   ├── schemaTypes/
│   ├── structure/
│   └── sanity.config.ts
│
├── public/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── package.json
```

------------------------------------------------------------------------

# 4. Layer Responsibilities

## 4.1 `app/` --- Routing and framework composition

The `app/` directory should remain thin.

A route should primarily:

1.  Fetch page-level data through a service.
2.  Handle `notFound()` or route-level errors.
3.  Generate metadata.
4.  Pass normalized data into feature composition.

### Good

``` text
app/blog/[slug]/page.tsx
    ↓
getPostBySlug(slug)
    ↓
BlogArticlePage
```

### Avoid

``` text
page.tsx
    ├── 300-line GROQ query
    ├── data transformation
    ├── business logic
    ├── validation
    └── entire page UI
```

------------------------------------------------------------------------

## 4.2 `features/` --- Business and page domains

A feature owns page-specific behavior and composition.

Example:

``` text
features/blog/
├── components/
│   ├── BlogCard.tsx
│   ├── BlogGrid.tsx
│   ├── BlogFilters.tsx
│   ├── BlogSidebar.tsx
│   ├── ArticleHeader.tsx
│   ├── ArticleBody.tsx
│   ├── ArticleShare.tsx
│   ├── ArticleNavigation.tsx
│   └── PopularPosts.tsx
├── BlogListingPage.tsx
├── BlogArticlePage.tsx
├── blog.types.ts
└── blog.utils.ts
```

Feature components may depend on:

-   Domain types
-   Services through route composition
-   Shared UI components
-   Shared layout components

Feature components should not become a dumping ground for unrelated
global utilities.

------------------------------------------------------------------------

## 4.3 `components/ui/` --- Design system primitives

``` text
components/ui/
├── Button/
├── Container/
├── Section/
├── Stack/
├── Grid/
├── Card/
├── Badge/
├── Input/
├── IconButton/
├── Divider/
├── Skeleton/
├── VisuallyHidden/
└── index.ts
```

Each primitive should have a narrow responsibility.

Example:

``` text
Button
    = visual variants + accessibility + loading/disabled behavior

Section
    = vertical spacing + background + semantic section support

Container
    = width + horizontal padding

Card
    = reusable surface, border, shadow, radius behavior
```

Do not put SPORTOID-specific business content into generic UI
primitives.

------------------------------------------------------------------------

## 4.4 `components/shared/` --- Reused product-level components

``` text
components/shared/
├── SectionHeading/
├── StatBand/
├── StatItem/
├── NewsletterForm/
├── SocialLinks/
├── ShareLinks/
├── EmptyState/
├── Pagination/
├── SearchForm/
└── ImageWithFallback/
```

These components can understand SPORTOID-level patterns but should
remain reusable across features.

------------------------------------------------------------------------

## 4.5 `components/layout/` --- Site shell

``` text
components/layout/
├── SiteHeader/
│   ├── SiteHeader.tsx
│   ├── DesktopNavigation.tsx
│   ├── MobileNavigation.tsx
│   └── navigation.config.ts
├── SiteFooter/
│   ├── SiteFooter.tsx
│   ├── FooterLinks.tsx
│   ├── FooterContact.tsx
│   └── FooterNewsletter.tsx
├── PageHero/
└── SiteShell/
```

The site shell should be composed once in the route-group layout.

------------------------------------------------------------------------

# 5. Feature Architecture by Page

## 5.1 Home

``` text
features/home/
├── HomePage.tsx
├── components/
│   ├── HeroSlider/
│   │   ├── HeroSlider.tsx
│   │   ├── HeroSlide.tsx
│   │   ├── HeroControls.tsx
│   │   └── HeroPagination.tsx
│   ├── WhoWeAreSection.tsx
│   ├── StrengthsSection.tsx
│   ├── StrengthCard.tsx
│   ├── FeaturedEventsSection.tsx
│   ├── EventCarousel.tsx
│   └── PartnershipCta.tsx
└── home.types.ts
```

### Important rule

`HeroSlider` is interactive and can be a Client Component.

Individual content-heavy sections should remain Server Components
whenever possible.

------------------------------------------------------------------------

## 5.2 About

``` text
features/about/
├── AboutPage.tsx
├── components/
│   ├── AboutHero.tsx
│   ├── MissionVisionBelief.tsx
│   ├── CapabilitySection.tsx
│   ├── ServiceSection.tsx
│   └── AboutStats.tsx
└── about.types.ts
```

`ServiceSection` can be a reusable composition component supporting:

``` text
imageLeft
imageRight
light
dark
primary CTA
outline CTA
```

Avoid creating separate nearly-identical components for Players,
Sponsorship, and Event Delivery.

------------------------------------------------------------------------

## 5.3 People

``` text
features/people/
├── PeoplePage.tsx
├── components/
│   ├── PeopleHero.tsx
│   ├── PersonGrid.tsx
│   ├── PersonCard.tsx
│   └── LeadershipStats.tsx
└── people.types.ts
```

`PersonCard` receives normalized domain data and should not query
Sanity.

------------------------------------------------------------------------

## 5.4 Gallery

``` text
features/gallery/
├── GalleryPage.tsx
├── components/
│   ├── GalleryHero.tsx
│   ├── GalleryFilters.tsx
│   ├── GalleryGrid.tsx
│   ├── GalleryCard.tsx
│   └── GalleryEmptyState.tsx
└── gallery.types.ts
```

### Filtering strategy

For a modest portfolio, prefer:

``` text
Server-render initial gallery
    ↓
Client filter state
    ↓
Local filtering or URL search params
```

If the gallery becomes very large, move filtering and pagination to
query-driven server rendering.

The filter state should be URL-addressable:

``` text
/gallery?category=cricket
```

This improves sharing, navigation, SEO consistency, and refresh
behavior.

------------------------------------------------------------------------

## 5.5 Blog

``` text
features/blog/
├── BlogListingPage.tsx
├── BlogArticlePage.tsx
├── components/
│   ├── BlogHero.tsx
│   ├── BlogGrid.tsx
│   ├── BlogCard.tsx
│   ├── BlogFilters.tsx
│   ├── BlogSearch.tsx
│   ├── BlogSidebar.tsx
│   ├── CategoryList.tsx
│   ├── PopularPosts.tsx
│   ├── ArticleHeader.tsx
│   ├── ArticleMeta.tsx
│   ├── ArticleBody.tsx
│   ├── ArticleShare.tsx
│   ├── ArticleNavigation.tsx
│   └── AuthorCard.tsx
└── blog.types.ts
```

### Portable Text

Keep CMS content rendering isolated:

``` text
components/portable-text/
├── PortableTextRenderer.tsx
├── serializers.tsx
├── CodeBlock.tsx
├── QuoteBlock.tsx
├── ImageBlock.tsx
└── CalloutBlock.tsx
```

Do not scatter Portable Text serializers throughout article pages.

------------------------------------------------------------------------

# 6. Component Composition Rules

## Rule 1 --- Prefer composition over configuration explosion

Bad:

``` text
<Section
  isDark
  hasImage
  reverse
  largeTitle
  compactMobile
  dottedBackground
  showButton
  buttonOutline
  ...
/>
```

Better:

``` text
<ServiceSection
  media={<ServiceImage ... />}
  content={<ServiceContent ... />}
/>
```

## Rule 2 --- Avoid components that know too much

Bad:

``` text
<BlogCard
  fetchRelatedPosts
  updateViews
  renderSidebar
  trackAnalytics
/>
```

Better:

``` text
<BlogCard post={post} />
```

## Rule 3 --- Data flows down

``` text
Route
  → Service
  → Feature Page
  → Feature Components
  → UI
```

Avoid children independently fetching the same page data.

## Rule 4 --- Keep client boundaries small

Use Client Components only for:

-   Sliders
-   Menus
-   Search interactions
-   Gallery filters
-   Forms
-   Share interactions
-   Animation requiring browser state

Do not add `"use client"` to an entire page because one child is
interactive.

------------------------------------------------------------------------

# 7. Enterprise Data Access Architecture

Use:

``` text
Route
    ↓
Service
    ↓
Repository
    ↓
Sanity Client
```

Example:

``` text
services/posts/
├── getPostBySlug.ts
├── getPosts.ts
├── getFeaturedPosts.ts
└── getRelatedPosts.ts

repositories/sanity/
├── post.repository.ts
├── person.repository.ts
├── gallery.repository.ts
└── settings.repository.ts
```

### Repository responsibility

-   Execute GROQ queries.
-   Return raw or minimally mapped CMS data.
-   Isolate Sanity implementation details.

### Service responsibility

-   Normalize data.
-   Apply business rules.
-   Combine multiple repositories.
-   Produce application/domain models.

### Component responsibility

-   Render data.
-   Handle local interaction only.

------------------------------------------------------------------------

# 8. Sanity Content Architecture

## Recommended document types

``` text
documents/
├── siteSettings
├── navigation
├── homePage
├── aboutPage
├── person
├── galleryItem
├── galleryCategory
├── post
├── postCategory
└── author
```

## Recommended object types

``` text
objects/
├── seo
├── cta
├── statistic
├── socialLink
├── navigationItem
├── heroSlide
├── imageWithAlt
└── portableTextBlock
```

### Important recommendation

Use page documents for **page-specific editorial content**, but do not
over-model every visual pixel in Sanity.

Good CMS responsibility:

-   Text
-   Images
-   CTA labels and URLs
-   Stats
-   Cards
-   Ordering
-   Visibility
-   SEO

Avoid storing implementation details such as:

-   Tailwind classes
-   Arbitrary padding
-   Component names
-   Raw CSS
-   Uncontrolled layout instructions

The codebase should own the design system.

------------------------------------------------------------------------

# 9. Domain Types

Do not expose raw Sanity response types throughout the application.

Example domain model:

``` ts
type Post = {
  id: string
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  readingTime: number
  category: Category
  author: Author
  image: ImageAsset
  content: PortableTextBlock[]
}
```

Sanity mapping occurs at the repository/service boundary.

This prevents the UI from becoming tightly coupled to CMS query shapes.

------------------------------------------------------------------------

# 10. State Management Strategy

## Server state

Primary source:

-   Server Components
-   Sanity queries
-   Next.js cache and revalidation

Do not put CMS data into React Context.

## Client state

Use local React state for:

-   Mobile navigation
-   Slider state
-   Gallery UI filtering
-   Modal/dialog state

Use URL search params for state that should survive refresh/share:

-   Blog category
-   Search
-   Pagination
-   Gallery category

Example:

``` text
/blog?category=cricket&page=2
```

Do not introduce a global state library unless the application develops
genuine cross-page client state requirements.

------------------------------------------------------------------------

# 11. Forms Architecture

## Newsletter

``` text
NewsletterForm
    ↓
Zod validation
    ↓
Server Action or Route Handler
    ↓
Newsletter provider
```

## Contact

``` text
ContactForm
    ↓
React Hook Form
    ↓
Zod
    ↓
Server Action / Route Handler
    ↓
Email / CRM / automation provider
```

Server-side validation is mandatory even when client validation exists.

### Security controls

-   Rate limiting.
-   Honeypot or bot protection.
-   Input validation.
-   Sanitization where needed.
-   No secrets exposed to the client.
-   Generic error responses where detailed errors expose internals.

------------------------------------------------------------------------

# 12. Caching and Revalidation

The site is primarily editorial and should aggressively leverage
caching.

## Recommended approach

### Cacheable content

-   Site settings
-   Navigation
-   People
-   Gallery
-   Blog posts
-   Static pages

### Content updates

``` text
Sanity publish
    ↓
Webhook
    ↓
Protected Next.js revalidation endpoint
    ↓
Revalidate tag/path
    ↓
Fresh content served
```

Use logical cache tags such as:

``` text
site-settings
navigation
home
about
people
gallery
posts
post:{slug}
```

Do not invalidate the entire site for every editorial update.

------------------------------------------------------------------------

# 13. Image Architecture

All CMS images should:

-   Have required alt text.
-   Use Sanity image references.
-   Support crop/hotspot where editorially useful.
-   Be transformed to appropriate dimensions.
-   Use responsive sizes.
-   Avoid shipping oversized originals.

Create one image utility boundary:

``` text
sanity/image.ts
```

Components should consume normalized image URLs/props rather than
constructing Sanity URLs repeatedly.

------------------------------------------------------------------------

# 14. SEO Architecture

Create reusable metadata helpers.

``` text
lib/metadata.ts
```

Support:

-   Title
-   Description
-   Canonical URL
-   Open Graph
-   Twitter/X metadata
-   Article metadata
-   Structured data

## Structured data

Recommended:

-   Organization
-   WebSite
-   BreadcrumbList
-   BlogPosting for articles

Blog metadata should be generated from CMS content at the route level.

------------------------------------------------------------------------

# 15. Error Boundaries

Implement:

``` text
app/error.tsx
app/not-found.tsx
app/blog/[slug]/not-found.tsx
```

Feature-level error boundaries can be added around unstable interactive
components if justified.

Requirements:

-   User-friendly fallback.
-   Retry action where meaningful.
-   Error reporting in production.
-   Never expose stack traces or secrets to users.

------------------------------------------------------------------------

# 16. Observability

Production architecture should include:

## Error monitoring

Track:

-   Runtime errors.
-   Route failures.
-   Form failures.
-   Client-side exceptions.

## Performance monitoring

Track:

-   Core Web Vitals.
-   Slow route rendering.
-   Image performance.
-   JavaScript bundle regressions.

## Application events

Useful events:

-   CTA clicks.
-   Newsletter submissions.
-   Contact form submissions.
-   Blog searches.
-   Gallery category interactions.

Analytics events should be centralized:

``` text
lib/analytics/
├── events.ts
└── track.ts
```

Do not scatter analytics provider calls throughout components.

------------------------------------------------------------------------

# 17. Testing Strategy

## Unit tests

Test:

-   Utilities.
-   Data mappers.
-   Validation schemas.
-   Service business rules.
-   Pagination logic.

## Component tests

Test critical behavior:

-   Navigation accessibility.
-   Newsletter validation.
-   Gallery filtering.
-   Blog search UI.
-   Error states.

## Integration tests

Test:

-   Sanity repository mapping.
-   Route handlers.
-   Revalidation endpoint authorization.
-   Form submission pipeline.

## End-to-end tests

Critical journeys:

1.  Navigate all main pages.
2.  Open a blog article.
3.  Filter gallery.
4.  Search/filter blog.
5.  Submit contact form.
6.  Submit newsletter.
7.  Mobile navigation.
8.  404 handling.

------------------------------------------------------------------------

# 18. CI/CD Quality Gates

Every pull request should run:

``` text
Install
  ↓
Lint
  ↓
Type Check
  ↓
Unit Tests
  ↓
Build
  ↓
E2E / Smoke Tests
  ↓
Preview Deployment
```

Production deployment should require successful checks.

Recommended standards:

-   ESLint
-   Prettier
-   Strict TypeScript
-   Dependency update policy
-   Environment validation
-   Conventional commit format if the team benefits from it

------------------------------------------------------------------------

# 19. Recommended Component Naming

Use explicit names.

Good:

``` text
BlogArticleHeader
BlogArticleMeta
BlogArticleNavigation
GalleryCategoryFilter
HomeHeroSlider
SiteMobileNavigation
```

Avoid ambiguous names:

``` text
Content
Data
Section2
CardNew
MainComponent
Common
Helper
```

Folder and component names should reveal domain ownership.

------------------------------------------------------------------------

# 20. Server vs Client Component Matrix

  Component              Recommended rendering
  ---------------------- -------------------------------------------
  SiteHeader             Server with small client navigation child
  SiteFooter             Server
  HomeHeroSlider         Client
  WhoWeAreSection        Server
  StrengthsSection       Server
  EventCarousel          Client only if interactive
  AboutHero              Server
  PersonCard             Server
  GalleryGrid            Server
  GalleryFilters         Client or URL-driven server interaction
  BlogGrid               Server
  BlogSearch             Client/URL interaction
  BlogArticle            Server
  PortableTextRenderer   Server where possible
  NewsletterForm         Client
  ContactForm            Client
  ShareButtons           Client

The goal is to minimize client JavaScript without sacrificing
interaction quality.

------------------------------------------------------------------------

# 21. Dependency Direction

Dependencies should move inward toward stable abstractions:

``` text
app
  ↓
features
  ↓
shared components
  ↓
ui primitives

app / services
  ↓
repositories
  ↓
sanity client
```

A UI primitive must never import a feature.

Example of forbidden dependency:

``` text
components/ui/Button
    ↓ imports
features/blog/blog.service
```

This creates architectural coupling in the wrong direction.

------------------------------------------------------------------------

# 22. Production-Ready Folder Example

``` text
src/
├── app/
│   ├── (site)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/page.tsx
│   │   ├── people/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── contact/page.tsx
│   │   └── blog/
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   ├── api/
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
│
├── features/
│   ├── home/
│   ├── about/
│   ├── people/
│   ├── gallery/
│   ├── blog/
│   ├── contact/
│   └── newsletter/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── shared/
│   └── portable-text/
│
├── services/
│   ├── site/
│   ├── posts/
│   ├── people/
│   ├── gallery/
│   └── contact/
│
├── repositories/
│   └── sanity/
│
├── sanity/
│   ├── client.ts
│   ├── image.ts
│   ├── queries/
│   └── mappers/
│
├── lib/
│   ├── analytics/
│   ├── env.ts
│   ├── metadata.ts
│   ├── pagination.ts
│   └── utils.ts
│
├── types/
└── styles/
```

------------------------------------------------------------------------

# 23. Architectural Decisions

## Decision: Feature-first organization

Use feature folders because SPORTOID's complexity is organized around
domains:

-   Blog
-   Gallery
-   People
-   Home
-   Contact

This scales better than placing every component in one global directory.

## Decision: Thin routes

Routes orchestrate; they do not contain application complexity.

## Decision: Server-first

CMS-driven content should render on the server by default.

## Decision: CMS isolation

Sanity is an implementation detail outside feature UI.

## Decision: Reuse by stable patterns

Reuse components for stable patterns such as:

-   Cards
-   Statistics
-   Editorial image/text sections
-   Page heroes
-   Buttons
-   Sidebar modules

Do not force unrelated page sections into one "universal component."

------------------------------------------------------------------------

# 24. Production Checklist

## Code Quality

-   [ ] TypeScript strict mode enabled.
-   [ ] ESLint configured.
-   [ ] Formatting enforced.
-   [ ] No `any` for CMS domain models without justification.
-   [ ] No direct Sanity queries inside presentation components.
-   [ ] No duplicated domain types.

## Performance

-   [ ] Server Components used by default.
-   [ ] Client boundaries minimized.
-   [ ] Images optimized.
-   [ ] Hero assets sized appropriately.
-   [ ] Pagination implemented for growing blog content.
-   [ ] Dynamic imports used for heavy optional client features.

## Security

-   [ ] Environment variables validated at startup.
-   [ ] Sanity write credentials never exposed to the browser.
-   [ ] Webhook endpoint protected.
-   [ ] Forms rate-limited.
-   [ ] All form input validated server-side.
-   [ ] Security headers configured.

## SEO & Accessibility

-   [ ] Semantic landmarks used.
-   [ ] All meaningful images have alt text.
-   [ ] Keyboard navigation tested.
-   [ ] Focus states visible.
-   [ ] Color contrast meets accessibility requirements.
-   [ ] Metadata generated for all indexable routes.
-   [ ] Sitemap generated.
-   [ ] Robots configuration defined.
-   [ ] Article structured data implemented.

## Reliability

-   [ ] Error boundaries exist.
-   [ ] 404 page exists.
-   [ ] Production error monitoring enabled.
-   [ ] CMS publishing triggers targeted revalidation.
-   [ ] Contact/newsletter failure states handled.
-   [ ] CI checks run before production deployment.

------------------------------------------------------------------------

# 25. Final Recommended Architecture

The SPORTOID website should follow this operational model:

``` text
                    ┌─────────────────────┐
                    │     Sanity CMS      │
                    │ Content + Media     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Sanity Repositories │
                    │ GROQ + CMS Mapping  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Services       │
                    │ Domain Composition  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Next.js Routes   │
                    │ Metadata + Routing  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Features       │
                    │ Page Composition    │
                    └──────────┬──────────┘
                               │
                               ▼
              ┌────────────────────────────────┐
              │ Shared Components + UI System  │
              └────────────────────────────────┘
```

## Guiding principle

**Build reusable systems, not reusable everything.**

SPORTOID is primarily a high-performance editorial and marketing
website. The architecture should therefore prioritize:

1.  Clear domain ownership.
2.  Server-first rendering.
3.  Small client boundaries.
4.  Sanity isolation.
5.  Strong content modeling.
6.  Reusable visual primitives.
7.  Targeted caching and revalidation.
8.  Production observability and testing.

This provides enterprise-grade maintainability without introducing
unnecessary microservices, global state, or abstraction layers.
