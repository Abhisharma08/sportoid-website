import { PageSchema } from '@/components/seo/PageSchema'
import type { Person } from '@/types/content'
import { getPageSeo } from '@/repositories/sanity/seo.repository'
import { PeopleHero } from '@/features/people/components/PeopleHero'
import { PersonCard } from '@/features/people/components/PersonCard'
import { AboutStats } from '@/features/about/components/AboutStats'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { fetchPeople, fetchPeoplePage } from '@/services/site/people.service'
import { constructMetadata } from '@/lib/metadata'
import { fetchLinkedInEmbeds, toElfsightWidgetId } from '@/services/site/linkedin.service'
import { fetchSiteSettings } from '@/services/site/settings.service'
import { LinkedInFeedSection } from '@/features/linkedin/components/LinkedInFeedSection'

const DEFAULT_LINKEDIN_PROFILE = 'https://www.linkedin.com/in/nitin-khanna-5354349/'

export async function generateMetadata() {
  return constructMetadata({
    seo: (await getPageSeo('peoplePage')) || undefined,
    title: 'Our Founder',
    description:
      'Meet Nitin Khanna, Founding Partner of Sportoid, in sports marketing since 2006 across sponsorship, athlete management, property valuation and event management.',
    canonicalPath: '/founder',
  })
}

import { urlFor } from '@/sanity/image'

// Blank lines in the CMS biography separate paragraphs.
const toParagraphs = (bio?: string) =>
  (bio || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean).map((p, i) => <p key={i}>{p}</p>)

export default async function PeoplePage() {
  const [peopleFromCms, pageSettings, linkedinPosts, settings] = await Promise.all([
    fetchPeople(),
    fetchPeoplePage(),
    fetchLinkedInEmbeds(3),
    fetchSiteSettings(),
  ])
  const people: Person[] = peopleFromCms || []
  const single = people.length <= 1

  return (
    <>
      <PageSchema path="/founder" title="Our Founder" contentType="peoplePage" type="CollectionPage" />
      <PeopleHero data={pageSettings} />
      <Section className="bg-light relative">
        {/* Decorative dots background */}
        <div className="absolute top-0 left-0 right-0 h-64 dotted-grid bg-repeat opacity-50 pointer-events-none"></div>

        <Container className="relative z-10">
          <div className={single ? 'max-w-3xl mx-auto' : 'grid grid-cols-1 md:grid-cols-2 gap-8'}>
            {people.length > 0 ? (
              people.map((person) => (
                <PersonCard
                  key={person._id}
                  name={person.name}
                  role={person.role}
                  imageSrc={person.avatar ? urlFor(person.avatar).width(600).height(600).url() : undefined}
                  align={single ? 'center' : 'left'}
                  bio={toParagraphs(person.bio)}
                />
              ))
            ) : (
              <PersonCard
                name="Nitin Khanna"
                role="Founding Partner"
                align="center"
                bio={
                  <>
                    <p>Nitin has been in the sports industry since 2006, before the IPL, with experience across sponsorship, athlete management, property valuation and event management.</p>
                    <p>His last corporate assignment was as GM, Business Development at World Sport Group, and he has managed the commercial endorsements of leading Indian cricketers including Sachin Tendulkar, Gautam Gambhir, Harbhajan Singh, Cheteshwar Pujara and Sanju Samson.</p>
                  </>
                }
              />
            )}
          </div>
        </Container>
      </Section>
      <LinkedInFeedSection
        posts={linkedinPosts}
        profileUrl={settings?.linkedinFeedProfile || DEFAULT_LINKEDIN_PROFILE}
        widgetId={toElfsightWidgetId(settings?.linkedinWidget)}
      />
      <AboutStats />
    </>
  )
}
