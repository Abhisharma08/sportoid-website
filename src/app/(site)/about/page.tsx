import { AboutHero } from '@/features/about/components/AboutHero'
import { ServiceSection } from '@/features/about/components/ServiceSection'
import { AboutStats } from '@/features/about/components/AboutStats'
import { fetchAboutPage } from '@/services/site/about.service'

import { constructMetadata } from '@/lib/metadata'

export async function generateMetadata() {
  return constructMetadata({
    title: 'About Us',
    description:
      'Learn about Sportoid, our mission, vision, and leadership team delivering elite sports management, athlete representation, and commercial partnerships across India.',
    canonicalPath: '/about',
  })
}

export default async function AboutPage() {
  const data = await fetchAboutPage()
  return (
    <>
      <AboutHero data={data} />
      <ServiceSection
        category="Players"
        title="Empowering Talent. Building Careers."
        imageSrc="/players.jpg"
        imageAlignment="left"
        variant="light"
        description={
          <>
            <p>
              Having entered the industry to manage the commercial interest of India's biggest
              personal sports brand in tennis, we at Sportoid soon realised the growing vacuum
              that is in the management of players, not brands.
            </p>
            <p>
              A void of them in — attitude matters for players and brands, available opportunities
              for physical, individual sponsorship right and adequately representation.
            </p>
            <p>
              We're not just representing players currently, we advise players and brand owners
              on how aspects — sportoidity for us are from years' experience of managing players.
            </p>
          </>
        }
      />
      <ServiceSection
        category="Sponsorship"
        title="Building Partnerships That Last."
        imageSrc="/sponsorship.jpg"
        imageAlignment="right"
        variant="light"
        description={
          <>
            <p>
              Over 85% of the Indian sponsorship market lay with 4 to 5 sports.
              Without experience with cricket — attempting to use regulation and
              consult six-sports sponsorship, we felt like new starters.
            </p>
            <p>
              We have over the years worked within the BCCI, on Indian cricket,
              other federations and have also been work with sponsors to
              invest at the ICC.
            </p>
            <p>
              These have opened opportunities on the International, National,
              League, and Franchise levels.
            </p>
          </>
        }
      />
      <ServiceSection
        category="Event Delivery"
        title="Flawless Execution. Unforgettable Impact."
        imageSrc="/events.jpg"
        imageAlignment="left"
        variant="light"
        description={
          <>
            <p>
              Whether it's a live match, league, or fan engagement activity, we
              craft experiences that leave a lasting impression.
            </p>
            <p>
              From concept to completion, our team ensures every detail is
              planned, executed and perfected — creating moments that
              connect brands, fans and the game.
            </p>
          </>
        }
      />
      <AboutStats />
    </>
  )
}
