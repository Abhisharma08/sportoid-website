import { JsonLd } from './JsonLd'
import { fetchSiteSettings } from '@/services/site/settings.service'
import { getPageSeo } from '@/repositories/sanity/seo.repository'
import { siteOrigin } from '@/lib/urls'
export async function PageSchema({ path, title, contentType, type = 'WebPage' }: { path: string; title: string; contentType: string; type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' }) {
  const [settings, seo] = await Promise.all([fetchSiteSettings(), getPageSeo(contentType)])
  const origin = siteOrigin(settings?.canonicalUrl)
  const url = new URL(path, origin).href
  const name = seo?.title || title
  return <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
    { '@type': type, '@id': `${url}#webpage`, name, url, description: seo?.description, isPartOf: { '@id': `${origin}/#website` } },
    ...(path !== '/' ? [{ '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: origin },
      { '@type': 'ListItem', position: 2, name, item: url },
    ] }] : []),
  ] }} />
}
