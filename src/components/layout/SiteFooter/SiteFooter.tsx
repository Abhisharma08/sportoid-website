'use client'

import * as React from 'react'
import Link from 'next/link'
import { Container } from '../../ui/Container'
import { Phone, Mail, MapPin } from 'lucide-react'
import { urlFor } from '@/sanity/image'

export interface SiteFooterProps {
  settings?: any
  footerSettings?: any
}

const DEFAULT_QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'People', href: '/people' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Blog', href: '/blog' },
]

export function SiteFooter({ settings, footerSettings }: SiteFooterProps) {
  const [email, setEmail] = React.useState('')

  const siteTitle = settings?.siteTitle || 'SPORTOID'
  const footerLogoSource = footerSettings?.footerLogo || settings?.logo
  const footerLogoUrl = footerLogoSource ? urlFor(footerLogoSource).height(60).url() : null

  const siteDescription =
    footerSettings?.aboutText ||
    settings?.metaDescription ||
    'Sportoid is a young start-up committed to the professional representation, execution and valuation of sporting properties in India.'

  const socials = settings?.socialLinks
  const quickLinks =
    footerSettings?.quickLinks && footerSettings.quickLinks.length > 0
      ? footerSettings.quickLinks
      : DEFAULT_QUICK_LINKS

  const phone = footerSettings?.contactDetails?.phone || '+91 12345 67890'
  const emailAddr = footerSettings?.contactDetails?.email || 'info@sportoid.com'
  const location = footerSettings?.contactDetails?.location || 'Mumbai, India'

  const newsletterHeading = footerSettings?.newsletter?.heading || 'Newsletter'
  const newsletterDesc =
    footerSettings?.newsletter?.description || 'Stay updated with the latest news, events and stories.'
  const newsletterPlaceholder = footerSettings?.newsletter?.placeholder || 'Your email address'

  const copyright = footerSettings?.copyrightText || '© Copyright Sportoid. All rights reserved.'
  const credits = footerSettings?.creditText || 'Designed & Developed by Original One'

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [feedback, setFeedback] = React.useState<{ text: string; isError?: boolean } | null>(null)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setFeedback(null)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to subscribe.')
      }

      setFeedback({ text: data.message || 'Thank you for subscribing!' })
      setEmail('')
      setTimeout(() => setFeedback(null), 5000)
    } catch (err: any) {
      setFeedback({ text: err.message || 'Subscription failed.', isError: true })
      setTimeout(() => setFeedback(null), 6000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-black text-white pt-16 pb-6 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Logo & About */}
          <div>
            <div className="mb-6 flex items-center">
              <Link href="/" className="flex items-center gap-3">
                {footerLogoUrl ? (
                  <img src={footerLogoUrl} alt={siteTitle} className="h-10 w-auto object-contain" />
                ) : (
                  <span className="font-heading font-black text-3xl tracking-tighter">
                    SPORT<span className="text-primary">O</span>ID
                  </span>
                )}
              </Link>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {siteDescription}
            </p>
            <div className="flex gap-3">
              {socials?.facebook && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:border-primary hover:text-white hover:bg-primary transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {socials?.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (formerly Twitter)"
                  className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:border-primary hover:text-white hover:bg-primary transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
              {socials?.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:border-primary hover:text-white hover:bg-primary transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.69 1.69 0 0 0 1.7-1.69 1.7 1.7 0 0 0-1.7-1.7 1.7 1.7 0 0 0-1.7 1.7 1.7 1.7 0 0 0 1.7 1.69m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                  </svg>
                </a>
              )}
              {socials?.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:border-primary hover:text-white hover:bg-primary transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {socials?.youtube && (
                <a
                  href={socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:border-primary hover:text-white hover:bg-primary transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold mb-6 text-primary uppercase text-sm tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-white">
              {quickLinks.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="font-heading font-bold mb-6 text-primary uppercase text-sm tracking-widest">
              Get In Touch
            </h4>
            <ul className="space-y-4 text-sm text-white">
              <li className="flex items-start">
                <Phone className="w-4 h-4 text-primary mr-3 mt-0.5" />
                {phone}
              </li>
              <li className="flex items-start">
                <Mail className="w-4 h-4 text-primary mr-3 mt-0.5" />
                {emailAddr}
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-primary mr-3 mt-0.5" />
                {location}
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-bold mb-6 text-primary uppercase text-sm tracking-widest">
              {newsletterHeading}
            </h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              {newsletterDesc}
            </p>
            {feedback && (
              <p
                className={`text-xs mt-2 ${
                  feedback.isError ? 'text-red-400' : 'text-green-400'
                }`}
              >
                {feedback.text}
              </p>
            )}
            <form onSubmit={handleNewsletterSubmit} className="relative mt-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={newsletterPlaceholder}
                required
                disabled={isSubmitting}
                className="w-full bg-transparent border border-gray-800 rounded-md py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-primary text-white disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Subscribe to Newsletter"
                className="absolute right-0 top-0 bottom-0 bg-primary px-4 rounded-r-md flex items-center justify-center hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                <svg
                  className="w-4 h-4 text-white transform rotate-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 text-xs text-gray-500 flex justify-center items-center">
          <p>{copyright}</p>
        </div>
      </Container>
    </footer>
  )
}
