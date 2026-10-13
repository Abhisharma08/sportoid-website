import { PageSchema } from '@/components/seo/PageSchema'
import Link from 'next/link'
import { BlogHero } from '@/features/blog/components/BlogHero'
import { BlogCard } from '@/features/blog/components/BlogCard'
import { BlogSidebar } from '@/features/blog/components/BlogSidebar'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { fetchBlogPage } from '@/services/site/blog.service'
import { getBlogListingData } from '@/repositories/sanity/blog.repository'
import { getPageSeo } from '@/repositories/sanity/seo.repository'
import { constructMetadata } from '@/lib/metadata'
import { urlFor } from '@/sanity/image'

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }
export async function generateMetadata({ searchParams }: Props) {
  const params = await searchParams
  return constructMetadata({
    seo: (await getPageSeo('blogPage')) || undefined,
    title: 'Latest News & Insights', description: 'Sports business perspectives, industry analysis and partnership insights from Sportoid.',
    canonicalPath: '/blog', noIndex: !!(params.q || params.category || params.page),
  })
}
export default async function BlogListingPage({ searchParams }: Props) {
  const params = await searchParams
  const search = typeof params.q === 'string' ? params.q.trim().slice(0, 100) : ''
  const category = typeof params.category === 'string' ? params.category.slice(0, 100) : ''
  const rawPage = typeof params.page === 'string' ? Number(params.page) : 1
  const page = Number.isSafeInteger(rawPage) ? Math.min(10000, Math.max(1, rawPage)) : 1
  const [result, settings] = await Promise.all([getBlogListingData(page, search, category), fetchBlogPage()])
  const pageCount = Math.ceil(result.total / 9)
  const pageUrl = (n: number) => `/blog?${new URLSearchParams({ ...(search ? { q: search } : {}), ...(category ? { category } : {}), page: String(n) })}`
  return <>
      <PageSchema path="/blog" title="Latest Articles" contentType="blogPage" type="CollectionPage" />
    <BlogHero data={settings} />
    <Section className="bg-white"><Container>
      <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="min-w-0">
          <h2 className="mb-8 font-heading text-2xl font-semibold">{search || category ? 'Search results' : 'Latest articles'}</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {result.posts.map((post) => <BlogCard key={post._id} slug={post.slug} title={post.title} excerpt={post.excerpt || ''} category={post.category || 'Insights'} date={post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-IN', { dateStyle: 'medium', timeZone: 'Asia/Kolkata' }) : ''} imageSrc={post.mainImage ? urlFor(post.mainImage).width(800).height(500).url() : undefined} />)}
          </div>
          {result.posts.length === 0 && <p className="py-8 text-gray-600">{search || category ? 'No articles match your search.' : 'New articles will appear here when published.'}</p>}
          {pageCount > 1 && <nav aria-label="Blog pagination" className="mt-10 flex flex-wrap items-center gap-4">
            {page > 1 && <Link href={pageUrl(page - 1)} className="rounded border p-3">← Previous</Link>}
            <span>Page {page} of {pageCount}</span>
            {page < pageCount && <Link href={pageUrl(page + 1)} className="rounded border p-3">Next →</Link>}
          </nav>}
        </div>
        <BlogSidebar categories={result.categories} />
      </div>
    </Container></Section>
  </>
}
