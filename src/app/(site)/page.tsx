import { fetchHomePage } from '@/services/site/home.service'
import { HeroSlider } from '@/features/home/components/HeroSlider'
import { WhoWeAreSection } from '@/features/home/components/WhoWeAreSection'
import { StrengthsSection } from '@/features/home/components/StrengthsSection'

export default async function HomePage() {
  const homeData = await fetchHomePage()

  return (
    <>
      <HeroSlider slides={homeData?.heroSlides} />
      <WhoWeAreSection data={homeData?.whoWeAre} />
      <StrengthsSection strengths={homeData?.strengths} />
    </>
  )
}
