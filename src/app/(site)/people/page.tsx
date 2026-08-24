import { PeopleHero } from '@/features/people/components/PeopleHero'
import { PersonCard } from '@/features/people/components/PersonCard'
import { AboutStats } from '@/features/about/components/AboutStats'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { fetchPeople, fetchPeoplePage } from '@/services/site/people.service'
import { constructMetadata } from '@/lib/metadata'

export async function generateMetadata() {
  return constructMetadata({
    title: 'Leadership & People',
    description:
      'Meet the founding partners and leadership behind Sportoid, bringing over 30 years of sports industry and athlete management experience.',
    canonicalPath: '/people',
  })
}

import { urlFor } from '@/sanity/image'

export default async function PeoplePage() {
  const [peopleFromCms, pageSettings] = await Promise.all([
    fetchPeople(),
    fetchPeoplePage(),
  ])

  return (
    <>
      <PeopleHero data={pageSettings} />
      <Section className="bg-light relative">
        {/* Decorative dots background */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-[url('/dots.svg')] bg-repeat opacity-50 pointer-events-none"></div>
        
        <Container className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {peopleFromCms && peopleFromCms.length > 0 ? (
              peopleFromCms.map((person: any) => {
                const avatarUrl = person.avatar ? urlFor(person.avatar).width(600).height(600).url() : undefined
                return (
                  <PersonCard
                    key={person._id}
                    name={person.name}
                    role={person.role}
                    imageSrc={avatarUrl}
                    bio={<p className="leading-relaxed">{person.bio}</p>}
                  />
                )
              })
            ) : (
              <>
                <PersonCard 
                  name="Harish Krishnamachar"
                  role="Founding Partner"
                  bio={
                    <>
                      <p>Harish has 30 years of work experience and has been in the sports industry since 2006. He brings a conceptual and strategic perspective to the business and has in his early days in the industry actively managed event delivery as well.</p>
                      <p>A desire to see brands and players get fair value and a belief that sport as a marketing multiplier is unrivalled have kept his interest in the industry alive.</p>
                      <p>An amateur poker player and recent dog lover, Harish spends some of his time teaching almost anyone willing to listen.</p>
                    </>
                  }
                />
                <PersonCard 
                  name="Nitin Khanna"
                  role="Founding Partner"
                  bio={
                    <>
                      <p>Nitin has 20 years of work experience and has been in the sports industry since 2006. With the strength of his relationships — across both clients and sportspeople, Nitin has created substantial value across the spectrum of the sports value chain.</p>
                      <p>He is driven in part by the idea that Indian sport has only one way forward and that is exponential growth. His mandate to himself has been to curb over exuberance in sporting values and ensure stronger foundations.</p>
                      <p>A passionate sports fan with an encyclopedic memory for events and statistics, his passion is matched by that for his personal fitness.</p>
                    </>
                  }
                />
              </>
            )}
          </div>
        </Container>
      </Section>
      <AboutStats />
    </>
  )
}
