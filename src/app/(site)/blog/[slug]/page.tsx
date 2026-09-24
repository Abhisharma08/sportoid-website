import * as React from 'react'
import { ArticleHeader } from '@/features/blog/components/ArticleHeader'
import { ArticleMeta } from '@/features/blog/components/ArticleMeta'
import { AuthorCard } from '@/features/blog/components/AuthorCard'
import { BlogSidebar } from '@/features/blog/components/BlogSidebar'
import { PortableTextRenderer } from '@/components/portable-text/PortableTextRenderer'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'

// Dummy post data simulating Sanity response
const DUMMY_POST = {
  title: 'The Future of Sports Management in India',
  category: 'SPORTS MANAGEMENT',
  date: 'Apr 15, 2024',
  author: 'Sportoid Team',
  readingTime: '6 min read',
  mainImage: '/blog-article-img.jpg',
  content: [
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Indian sport is at an exciting crossroads. With a new generation of athletes, increased commercial investment, and a passionate fan base, the need for professional sports management has never been greater.',
          marks: ['strong']
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'From athlete representation to event execution, data analytics to fan engagement — sports management touches every aspect of the modern game. As the industry grows, so do the opportunities for creating sustainable, long-term value.'
        }
      ]
    },
    {
      _type: 'block',
      style: 'h2',
      children: [{ _type: 'span', text: 'A Growing Industry' }]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The sports business in India is projected to reach $3.5 billion by 2027. Cricket continues to lead, but sports like Kabaddi, Football, Badminton, and Tennis are rapidly gaining traction. This growth brings with it the need for structured planning, strategic partnerships, and world-class execution.'
        }
      ]
    },
    {
      _type: 'block',
      style: 'h2',
      children: [{ _type: 'span', text: 'Key Areas Shaping the Future' }]
    },
    {
      _type: 'block',
      listItem: 'bullet',
      children: [{ _type: 'span', text: "Athlete Management: Holistic management of athletes' careers, endorsements, fitness, and personal brand." }]
    },
    {
      _type: 'block',
      listItem: 'bullet',
      children: [{ _type: 'span', text: 'Commercial Partnerships: Building strong sponsor relationships and unlocking new revenue streams.' }]
    },
    {
      _type: 'block',
      style: 'blockquote',
      children: [{ _type: 'span', text: "Sports is no longer just a game. It's a powerful platform for impact, inspiration and economic growth." }]
    }
  ]
}

import { fetchPostBySlug } from '@/services/site/blog.service'
import { constructMetadata } from '@/lib/metadata'
import { urlFor } from '@/sanity/image'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await fetchPostBySlug(slug)

  if (!post) {
    return constructMetadata({
      title: 'Article Not Found',
      canonicalPath: `/blog/${slug}`,
    })
  }

  return constructMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.keywords,
    canonicalPath: `/blog/${post.slug}`,
    ogImage: post.ogImage || post.mainImage,
    noIndex: post.noIndex,
  })
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cmsPost = await fetchPostBySlug(slug)

  const post = cmsPost || {
    ...DUMMY_POST,
    slug,
  }

  const title = post.title || 'Blog Post'
  const category = post.category || 'SPORTS MANAGEMENT'
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : post.date || 'Apr 15, 2024'
  const authorName = post.author?.name || post.author || 'Sportoid Team'
  const readingTime = post.readingTime || '5 min read'
  const content = post.body || post.content

  return (
    <>
      <ArticleHeader title={title} category={category} />
      <Section className="bg-white">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <ArticleMeta 
                category={category} 
                date={date} 
                author={authorName} 
                readingTime={readingTime} 
              />
              
              <div className="mb-10 rounded-xl overflow-hidden bg-dark aspect-[21/9] shadow-md relative">
                <img
                  src={
                    post.mainImage
                      ? urlFor(post.mainImage).width(1200).height(514).url()
                      : 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80'
                  }
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <PortableTextRenderer value={content} />
              
              {/* Article Navigation Placeholder */}
              <div className="flex justify-between border-t border-gray-100 mt-16 pt-8">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-12 bg-gray-200 rounded"></div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">&lt; Previous Post</div>
                    <div className="font-semibold text-sm">Building Winning Partnerships</div>
                  </div>
                </div>
                <div className="flex gap-4 items-center text-right border-l border-gray-100 pl-4">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Next Post &gt;</div>
                    <div className="font-semibold text-sm">{"Kabaddi's Rise: From Roots"}</div>
                  </div>
                  <div className="w-16 h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <AuthorCard />
              <BlogSidebar />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
