import * as React from 'react'
import { BlogHero } from '@/features/blog/components/BlogHero'
import { BlogCard } from '@/features/blog/components/BlogCard'
import { BlogSidebar } from '@/features/blog/components/BlogSidebar'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'

import { fetchPosts } from '@/services/site/blog.service'
import { constructMetadata } from '@/lib/metadata'

export async function generateMetadata() {
  return constructMetadata({
    title: 'Latest News & Insights',
    description:
      'Read industry analyses, sports business perspectives, and commercial partnership trends from Sportoid experts.',
    canonicalPath: '/blog',
  })
}

const FALLBACK_POSTS = [
  {
    slug: 'business-of-cricket',
    title: 'The Business of Cricket: Beyond the Boundary',
    excerpt: 'Exploring how cricket has evolved into a powerful global business driven by passion and strategy.',
    date: 'May 12, 2024',
    category: 'CRICKET'
  },
  {
    slug: 'winning-partnerships',
    title: 'Building Winning Partnerships in Sports',
    excerpt: 'Why the right partnerships create more than visibility - they build lasting value.',
    date: 'Apr 28, 2024',
    category: 'SPONSORSHIP'
  }
]

export default async function BlogListingPage() {
  const cmsPosts = await fetchPosts()
  const posts = cmsPosts && cmsPosts.length > 0
    ? cmsPosts.map((p: any) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt || '',
        date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'May 12, 2024',
        category: (p.category || 'CRICKET').toUpperCase(),
      }))
    : FALLBACK_POSTS

  return (
    <>
      <BlogHero />
      <Section className="bg-white">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-4 mb-8 border-b-2 border-gray-100 pb-2">
                <span className="font-bold text-sm uppercase tracking-widest text-dark border-b-2 border-primary pb-2 -mb-[10px]">Latest Articles</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {posts.map((post: any) => (
                  <BlogCard key={post.slug} {...post} />
                ))}
              </div>
              
              {/* Pagination placeholder */}
              <div className="flex justify-center gap-2 mt-12">
                <button className="px-4 py-2 border rounded text-gray-600 hover:border-primary hover:text-primary transition-colors">&lt; Prev</button>
                <button className="px-4 py-2 border rounded bg-primary text-white border-primary">1</button>
                <button className="px-4 py-2 border rounded text-gray-600 hover:border-primary hover:text-primary transition-colors">2</button>
                <button className="px-4 py-2 border rounded text-gray-600 hover:border-primary hover:text-primary transition-colors">Next &gt;</button>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <BlogSidebar />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
