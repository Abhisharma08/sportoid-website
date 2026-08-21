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
      <SiteHeader settings={settings} navigation={navigation} />
      <main className="flex-grow">
        {children}
      </main>
      <SiteFooter settings={settings} footerSettings={footerSettings} />
    </>
  )
}
