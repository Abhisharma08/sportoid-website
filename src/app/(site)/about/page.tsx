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

import { urlFor } from '@/sanity/image'

export default async function AboutPage() {
  const data = await fetchAboutPage()
  const cmsServices = data?.services

  return (
    <>
      <AboutHero data={data} />
      {cmsServices && cmsServices.length > 0 ? (
        cmsServices.map((svc: any, idx: number) => {
          const imgUrl = svc.image ? urlFor(svc.image).width(1200).height(900).url() : undefined
          return (
            <ServiceSection
              key={idx}
              category={svc.category || 'Service'}
              title={svc.title || 'Our Expertise'}
              imageSrc={imgUrl}
              imageAlignment={svc.imageAlignment || (idx % 2 === 0 ? 'left' : 'right')}
              variant="light"
              description={
                Array.isArray(svc.paragraphs) && svc.paragraphs.length > 0 ? (
                  svc.paragraphs.map((p: string, pIdx: number) => <p key={pIdx}>{p}</p>)
                ) : (
                  <p>{svc.title}</p>
                )
              }
            />
          )
        })
      ) : (
        <>
          <ServiceSection
            category="Players"
            title="Empowering Talent. Building Careers."
            imageSrc="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80"
            imageAlignment="left"
            variant="light"
            description={
              <>
                <p>
                  Having entered the industry to manage the commercial interest of India's biggest
                  personal sports brand in cricket and tennis, we at Sportoid soon realised the growing vacuum
                  that is in the management of players, not brands.
                </p>
                <p>
                  A void of them in — attitude matters for players and brands, available opportunities
                  for physical, individual sponsorship rights and adequate representation.
                </p>
                <p>
                  We're not just representing players currently, we advise players and brand owners
                  on long-term commercial valuation and athlete brand identity.
                </p>
              </>
            }
          />
          <ServiceSection
            category="Sponsorship"
            title="Building Partnerships That Last."
            imageSrc="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80"
            imageAlignment="right"
            variant="light"
            description={
              <>
                <p>
                  Over 85% of the Indian sponsorship market lay with 4 to 5 sports.
                  With decades of deep roots within cricket, we unlock premier brand partnerships
                  across international tournaments, IPL franchises, and bilateral tours.
                </p>
                <p>
                  We have over the years worked within the BCCI, on Indian cricket,
                  other federations and have also worked with top sponsors to
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
            imageSrc="https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1200&q=80"
            imageAlignment="left"
            variant="light"
            description={
              <>
                <p>
                  Whether it's a live stadium tournament, corporate cricket championship, or fan engagement arena, we
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
        </>
      )}
      <AboutStats />
    </>
  )
}
