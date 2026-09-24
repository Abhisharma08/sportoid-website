import * as React from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import type { LinkedInEmbed } from '@/services/site/linkedin.service'
import { ElfsightWidget } from './ElfsightWidget'

export interface LinkedInFeedSectionProps {
  posts?: LinkedInEmbed[]
  profileUrl?: string
  /** Elfsight widget ID; when set, the auto-updating feed replaces the individual posts */
  widgetId?: string | null
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.69 1.69 0 0 0 1.7-1.69 1.7 1.7 0 0 0-1.7-1.7 1.7 1.7 0 0 0-1.7 1.7 1.7 1.7 0 0 0 1.7 1.69m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  )
}

export function LinkedInFeedSection({ posts, profileUrl, widgetId }: LinkedInFeedSectionProps) {
  const hasPosts = !widgetId && posts && posts.length > 0
  if (!widgetId && !hasPosts && !profileUrl) return null

  return (
    <Section variant="light" className="bg-white">
      <Container>
        <FadeIn direction="right" delay={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 md:mb-14">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-1 bg-primary rounded-full" />
                <span className="font-semibold text-xs sm:text-sm uppercase tracking-widest text-dark">
                  Social Feed
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-dark">
                LATEST ON LINKEDIN
              </h2>
            </div>
            {profileUrl && (
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#0a66c2] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#004182] transition-colors self-start sm:self-auto"
              >
                <LinkedInIcon className="w-4 h-4" />
                Follow on LinkedIn
              </a>
            )}
          </div>
        </FadeIn>

        {widgetId && <ElfsightWidget widgetId={widgetId} className="min-h-[300px]" />}

        {hasPosts && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {posts.map((post, idx) => (
              <FadeIn key={post.id} direction="up" delay={0.1 * (idx + 1)}>
                <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                  <iframe
                    src={post.src}
                    title="Embedded LinkedIn post"
                    height={post.height}
                    loading="lazy"
                    allowFullScreen
                    className="w-full block border-0"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
