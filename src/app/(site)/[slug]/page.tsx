import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getContentPage } from '@/repositories/sanity/page.repository'
import { constructMetadata } from '@/lib/metadata'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PortableTextRenderer } from '@/components/portable-text/PortableTextRenderer'
import { JsonLd } from '@/components/seo/JsonLd'
import { fetchSiteSettings } from '@/services/site/settings.service'
import { siteOrigin } from '@/lib/urls'
import { urlFor } from '@/sanity/image'

type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) {
  const page = await getContentPage((await params).slug)
  if (!page) notFound()
  return constructMetadata({ title: page.title, description: page.description, seo: page.seo, ogImage: page.image, canonicalPath: `/${encodeURIComponent(page.slug)}` })
}
export default async function ContentPage({ params }: Props) {
  const page = await getContentPage((await params).slug)
  if (!page) notFound()
  const origin = siteOrigin((await fetchSiteSettings())?.canonicalUrl)
  const url = `${origin}/${encodeURIComponent(page.slug)}`
  return <>
    <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebPage', name: page.title, description: page.description, url, isPartOf: { '@id': `${origin}/#website` } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: origin },
        { '@type': 'ListItem', position: 2, name: page.title, item: url },
      ] },
    ] }} />
    <Section><Container className="max-w-4xl">
      <h1 className="mb-6 font-heading text-3xl font-semibold md:text-5xl">{page.title}</h1>
      {page.description && <p className="mb-8 text-lg leading-relaxed text-gray-600">{page.description}</p>}
      {page.image && <Image src={urlFor(page.image).width(1200).height(630).fit('crop').url()} width={1200} height={630} alt={page.title} sizes="(max-width: 1024px) 100vw, 900px" className="mb-10 h-auto w-full rounded-xl" />}
      <PortableTextRenderer value={page.body || []} />
    </Container></Section>
  </>
}
