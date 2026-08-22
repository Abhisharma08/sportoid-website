import * as React from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { fetchSiteSettings } from '@/services/site/settings.service'
import { fetchNavigation, fetchFooterSettings } from '@/services/site/navigation.service'
import { Compass, ArrowLeft, Home, MessageSquare } from 'lucide-react'

export default async function NotFound() {
  const [settings, navigation, footerSettings] = await Promise.all([
    fetchSiteSettings(),
    fetchNavigation(),
    fetchFooterSettings(),
  ])

  return (
    <>
      <SiteHeader settings={settings} navigation={navigation} />
      
      <main className="flex-grow flex items-center justify-center py-20 md:py-32 bg-dark text-white relative overflow-hidden">
        {/* Background graphic elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-dark to-black/90 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary font-bold text-xs uppercase tracking-widest mb-8">
              <Compass className="w-4 h-4" />
              <span>404 - Page Not Found</span>
            </div>

            {/* Giant Number / Heading */}
            <h1 className="text-7xl sm:text-9xl font-heading font-black tracking-tighter text-white/10 select-none mb-2">
              404
            </h1>

            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white leading-tight mb-6 -mt-10 sm:-mt-14 relative z-20">
              OUT OF <span className="text-primary">BOUNDS.</span>
            </h2>

            <p className="text-gray-300 text-base sm:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              The page you are looking for doesn't exist, has been removed, or is temporarily unavailable in the Sportoid playbook.
            </p>

            {/* Navigation Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>Back to Homepage</span>
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 border-white/30 text-white hover:bg-white/10">
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact Support</span>
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <SiteFooter settings={settings} footerSettings={footerSettings} />
    </>
  )
}
