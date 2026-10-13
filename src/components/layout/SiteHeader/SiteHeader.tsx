'use client'

import Image from 'next/image'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Container } from '../../ui/Container'
import { urlFor } from '@/sanity/image'
import type { SiteSettings, Navigation } from '@/types/content'
import { Menu, X } from 'lucide-react'
import { safeHref } from '@/lib/urls'
import { withRequiredLinks, type NavLink } from '@/lib/navigation'

export interface SiteHeaderProps {
  settings?: SiteSettings | null
  navigation?: Navigation | null
}

const DEFAULT_NAV: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'People', href: '/people' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Events', href: '/events' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Blog', href: '/blog' },
]

export function SiteHeader({ settings, navigation }: SiteHeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const headerRef = React.useRef<HTMLElement>(null)
  const menuButtonRef = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (!mobileMenuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }
      if (event.key === 'Tab') {
        const links = Array.from(headerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') || []).filter((el) => el.offsetParent !== null)
        const first = links[0], last = links[links.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileMenuOpen])

  const siteTitle = settings?.siteTitle || 'SPORTOID'
  const logoUrl = settings?.logo ? urlFor(settings.logo).height(50).url() : null
  const navItems = withRequiredLinks(navigation?.items && navigation.items.length > 0 ? navigation.items : DEFAULT_NAV)
  const ctaButton = navigation?.ctaButton

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  // Close mobile menu on page navigation or resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
            {logoUrl ? (
              <Image width={200} height={60} sizes="200px" src={logoUrl} alt={siteTitle} className="h-9 md:h-10 w-auto object-contain" />
            ) : (
              <span className="font-heading font-semibold text-2xl tracking-tighter">
                SPORT<span className="text-primary">O</span>ID
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-6">
            {navItems.map((item, idx) => {
              const isExternal = item.isExternal || item.href.startsWith('http')
              const active = !isExternal && isLinkActive(item.href)

              return isExternal ? (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sm hover:text-primary transition-colors text-dark uppercase tracking-wider py-1"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={idx}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`font-semibold text-sm transition-colors uppercase tracking-wider py-1 relative ${
                    active ? 'text-primary' : 'text-dark hover:text-primary'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1 inset-x-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              )
            })}

            {ctaButton?.show && ctaButton?.label && (
              <Link
                href={safeHref(ctaButton.href) || '/contact'}
                className="px-5 py-2.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-red-700 transition-colors shadow-sm ml-2"
              >
                {ctaButton.label}
              </Link>
            )}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            ref={menuButtonRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            className="xl:hidden p-2.5 rounded-lg text-dark hover:text-primary hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-20 bottom-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity">
          <div className="bg-white border-b border-gray-200 px-6 py-8 shadow-xl max-h-full overflow-y-auto space-y-5 animate-in slide-in-from-top duration-300">
            <nav id="mobile-navigation" aria-label="Mobile navigation" className="flex flex-col space-y-2">
              {navItems.map((item, idx) => {
                const isExternal = item.isExternal || item.href.startsWith('http')
                const active = !isExternal && isLinkActive(item.href)

                return isExternal ? (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-semibold text-base text-dark hover:text-primary transition-colors uppercase tracking-wider py-2.5 px-3 rounded-lg border-b border-gray-50"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-semibold text-base uppercase tracking-wider py-2.5 px-3 rounded-lg transition-colors flex items-center justify-between ${
                      active
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-dark hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="w-2 h-2 rounded-full bg-primary" />}
                  </Link>
                )
              })}
            </nav>

            {ctaButton?.show && ctaButton?.label && (
              <div className="pt-4">
                <Link
                  href={safeHref(ctaButton.href) || '/contact'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center w-full px-5 py-3.5 bg-primary text-white text-sm font-semibold uppercase tracking-wider rounded-lg hover:bg-red-700 transition-colors shadow-md"
                >
                  {ctaButton.label}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
