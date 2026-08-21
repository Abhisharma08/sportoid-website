import * as React from 'react'
import Link from 'next/link'
import { Container } from '../../ui/Container'
import { urlFor } from '@/sanity/image'

export interface SiteHeaderProps {
  settings?: any
  navigation?: any
}

const DEFAULT_NAV = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'People', href: '/people' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Blog', href: '/blog' },
]

export function SiteHeader({ settings, navigation }: SiteHeaderProps) {
  const siteTitle = settings?.siteTitle || 'SPORTOID'
  const logoUrl = settings?.logo ? urlFor(settings.logo).height(50).url() : null
  const navItems = navigation?.items && navigation.items.length > 0 ? navigation.items : DEFAULT_NAV
  const ctaButton = navigation?.ctaButton

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            {logoUrl ? (
              <img src={logoUrl} alt={siteTitle} className="h-10 w-auto object-contain" />
            ) : (
              <span className="font-heading font-black text-2xl tracking-tighter">
                SPORT<span className="text-primary">O</span>ID
              </span>
            )}
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item: any, idx: number) => {
              const isExternal = item.isExternal || item.href.startsWith('http')
              return isExternal ? (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-sm hover:text-primary transition-colors text-dark uppercase tracking-wider"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={idx}
                  href={item.href}
                  className="font-bold text-sm hover:text-primary transition-colors text-dark uppercase tracking-wider"
                >
                  {item.label}
                </Link>
              )
            })}

            {ctaButton?.show && ctaButton?.label && (
              <Link
                href={ctaButton.href || '/contact'}
                className="px-5 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-red-700 transition-colors"
              >
                {ctaButton.label}
              </Link>
            )}
          </nav>
        </div>
      </Container>
    </header>
  )
}
