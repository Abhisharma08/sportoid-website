import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArticleHeader } from '@/features/blog/components/ArticleHeader'
import { ArticleMeta } from '@/features/blog/components/ArticleMeta'
import { AuthorCard } from '@/features/blog/components/AuthorCard'
import { BlogSidebar } from '@/features/blog/components/BlogSidebar'
import { PortableTextRenderer } from '@/components/portable-text/PortableTextRenderer'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { JsonLd } from '@/components/seo/JsonLd'
import { fetchPostBySlug } from '@/services/site/blog.service'
import { fetchSiteSettings } from '@/services/site/settings.service'
import { constructMetadata } from '@/lib/metadata'
import { siteOrigin } from '@/lib/urls'
import { urlFor } from '@/sanity/image'

type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) {
  const post = await fetchPostBySlug((await params).slug)
  if (!post) notFound()
  return constructMetadata({
    title: post.seoTitle || post.title, description: post.seoDescription || post.excerpt,
    keywords: post.keywords, canonicalPath: `/blog/${encodeURIComponent(post.slug)}`, canonicalUrl: post.canonicalUrl,
    ogImage: post.ogImage || post.mainImage, noIndex: post.noIndex, type: 'article',
    publishedTime: post.publishedAt, modifiedTime: post._updatedAt, author: post.author?.name,
  })
}
export default async function BlogArticlePage({ params }: Props) {
  const post = await fetchPostBySlug((await params).slug)
  if (!post) notFound()
  const settings = await fetchSiteSettings()
  const origin = siteOrigin(settings?.canonicalUrl)
  const url = `${origin}/blog/${encodeURIComponent(post.slug)}`
  const image = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).fit('crop').url() : undefined
  return <>
    <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
      { '@type': 'BlogPosting', '@id': `${url}#article`, headline: post.title, description: post.excerpt, image, datePublished: post.publishedAt, dateModified: post._updatedAt, mainEntityOfPage: url,
        author: post.author ? { '@type': 'Person', name: post.author.name } : { '@id': `${origin}/#organization` }, publisher: { '@id': `${origin}/#organization` } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: origin },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${origin}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ] },
    ] }} />
    <ArticleHeader title={post.title} category={post.category || 'Insights'} />
    <Section className="bg-white"><Container>
      <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
        <article className="min-w-0">
          <ArticleMeta category={post.category || 'Insights'} date={post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-IN', { dateStyle: 'medium', timeZone: 'Asia/Kolkata' }) : ''} author={post.author?.name || 'Sportoid Team'} readingTime={post.readingTime || ''} />
          {image && <Image src={image} alt={post.title} width={1200} height={630} sizes="(max-width: 1024px) 100vw, 800px" className="mb-10 h-auto w-full rounded-xl" />}
          <PortableTextRenderer value={post.body || []} />
          <Link href="/blog" className="mt-12 inline-block font-semibold text-primary">← All articles</Link>
        </article>
        <div><AuthorCard author={post.author} /><BlogSidebar /></div>
      </div>
    </Container></Section>
  </>
}
