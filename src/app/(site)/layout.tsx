import { SiteSchema } from '@/components/seo/SiteSchema'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { fetchSiteSettings } from '@/services/site/settings.service'
import { fetchNavigation, fetchFooterSettings } from '@/services/site/navigation.service'

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [settings, navigation, footerSettings] = await Promise.all([
    fetchSiteSettings(),
    fetchNavigation(),
    fetchFooterSettings(),
  ])

  return (
    <>
      <SiteSchema />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:p-4 focus:text-dark">Skip to content</a>
      <SiteHeader settings={settings} navigation={navigation} />
      <main id="main-content" tabIndex={-1} className="flex-grow">
        {children}
      </main>
      <SiteFooter settings={settings} footerSettings={footerSettings} />
    </>
  )
}
