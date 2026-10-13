import { PageSchema } from '@/components/seo/PageSchema'
import { constructMetadata } from '@/lib/metadata'
import { getPageSeo } from '@/repositories/sanity/seo.repository'
import { fetchHomePage } from '@/services/site/home.service'
import { fetchUpcomingEvents } from '@/services/site/events.service'
import { fetchLinkedInEmbeds, toElfsightWidgetId } from '@/services/site/linkedin.service'
import { fetchSiteSettings } from '@/services/site/settings.service'
import { fetchClientLogos } from '@/services/site/clients.service'
import { HeroSlider } from '@/features/home/components/HeroSlider'
import { WhoWeAreSection } from '@/features/home/components/WhoWeAreSection'
import { StrengthsSection } from '@/features/home/components/StrengthsSection'
import { UpcomingEventsSection } from '@/features/home/components/UpcomingEventsSection'
import { LinkedInFeedSection } from '@/features/linkedin/components/LinkedInFeedSection'
import { ClientLogosMarquee } from '@/features/home/components/ClientLogosMarquee'
import { PartnershipCTA } from '@/features/home/components/PartnershipCTA'

const DEFAULT_LINKEDIN_PROFILE = 'https://www.linkedin.com/in/nitin-khanna-5354349/'

export async function generateMetadata() {
  return constructMetadata({ canonicalPath: '/', seo: (await getPageSeo('homePage')) || undefined })
}

export default async function HomePage() {
  const [homeData, upcomingEvents, linkedinPosts, settings, clientLogos] = await Promise.all([
    fetchHomePage(),
    fetchUpcomingEvents(9),
    fetchLinkedInEmbeds(3),
    fetchSiteSettings(),
    fetchClientLogos(),
  ])

  return (
    <>
      <PageSchema path="/" title="Home" contentType="homePage" type="WebPage" />
      <HeroSlider slides={homeData?.heroSlides} />
      <ClientLogosMarquee clients={clientLogos} />
      <WhoWeAreSection data={homeData?.whoWeAre} />
      <LinkedInFeedSection
        posts={linkedinPosts}
        profileUrl={settings?.linkedinFeedProfile || DEFAULT_LINKEDIN_PROFILE}
        widgetId={toElfsightWidgetId(settings?.linkedinWidget)}
      />
      <StrengthsSection strengths={homeData?.strengths} />
      <UpcomingEventsSection events={upcomingEvents} />
      <PartnershipCTA data={homeData?.partnershipCta} />
    </>
  )
}
