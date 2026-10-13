import type { SanityImageSource } from '@/sanity/image'
import type { TypedObject } from '@portabletext/types'
import type { SeoFields } from '@/lib/metadata'
import type { NavLink } from '@/lib/navigation'
export interface PageContent {
  title?: string
  seo?: SeoFields
  heroHeading?: string
  heroSubtitle?: string
  heroDescription?: string
  heroBackgroundImage?: SanityImageSource
  missionTitle?: string; missionDescription?: string
  visionTitle?: string; visionDescription?: string
  beliefTitle?: string; beliefDescription?: string
  phone?: string; email?: string; address?: string; officeHours?: string
}
export interface SiteSettings {
  siteTitle?: string; metaDescription?: string
  logo?: SanityImageSource
  socialLinks?: Record<string, string>
}
export interface Navigation {
  items?: NavLink[]
  ctaButton?: { show?: boolean; label?: string; href?: string }
}
export interface FooterSettings {
  footerLogo?: SanityImageSource
  aboutText?: string
  quickLinks?: NavLink[]
  contactDetails?: { phone?: string; email?: string; location?: string }
  newsletter?: { heading?: string; description?: string; placeholder?: string }
  copyrightText?: string; creditText?: string
}
export interface Author { name: string; role?: string; bio?: string; avatar?: SanityImageSource }
export interface Post {
  _id: string; _updatedAt?: string
  title: string; slug: string; excerpt?: string
  mainImage?: SanityImageSource
  publishedAt?: string; readingTime?: string
  author?: Author; category?: string
  body?: TypedObject[]
  seoTitle?: string; seoDescription?: string; keywords?: string[]
  ogImage?: SanityImageSource; canonicalUrl?: string; noIndex?: boolean
}
export interface Service {
  category?: string; title?: string; image?: SanityImageSource
  imageAlignment?: 'left' | 'right'; paragraphs?: string[]
}
export interface Person { _id: string; name: string; role: string; bio?: string; avatar?: SanityImageSource }
