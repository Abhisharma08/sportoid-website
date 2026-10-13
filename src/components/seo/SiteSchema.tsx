import { fetchSiteSettings } from '@/services/site/settings.service'
import { urlFor } from '@/sanity/image'
import { siteOrigin, httpUrl } from '@/lib/urls'
import { JsonLd } from './JsonLd'
export async function SiteSchema() {
  const settings = await fetchSiteSettings()
  const url = siteOrigin(settings?.canonicalUrl)
  const name = settings?.siteTitle || 'SPORTOID'
  return <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
    { '@type': 'Organization', '@id': `${url}/#organization`, name, url,
      logo: settings?.logo ? urlFor(settings.logo).width(600).url() : undefined,
      sameAs: Object.values(settings?.socialLinks || {}).flatMap((value) => typeof value === 'string' && httpUrl(value) ? [value] : []),
    },
    { '@type': 'WebSite', '@id': `${url}/#website`, name, url, publisher: { '@id': `${url}/#organization` } },
  ] }} />
}
