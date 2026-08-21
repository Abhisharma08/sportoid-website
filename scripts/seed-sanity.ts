import { createClient } from 'next-sanity'
import * as fs from 'fs'
import * as path from 'path'

// Parse .env manually
const envPath = path.resolve(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split('\n').forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
    if (match) {
      const key = match[1]
      let value = match[2] || ''
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1)
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1)
      process.env[key] = value.trim()
    }
  })
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ixh5rcbm'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_READ_TOKEN

if (!token) {
  console.error('Missing SANITY_API_READ_TOKEN in .env')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

async function seed() {
  console.log(`Starting Sanity Seed for Project: ${projectId} [${dataset}]...`)

  // 1. Site Settings
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: 'SPORTOID | Building Tomorrow’s Champions',
    description: 'Sportoid is a young start-up committed to the professional representation, execution and valuation of sporting properties in India.',
  })
  console.log('✔ Seeded siteSettings')

  // 2. Home Page
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    title: 'Home Page',
    heroSlides: [
      {
        _key: 'slide-1',
        title: 'BUILDING TOMORROW’S CHAMPIONS.',
        subtitle: 'SPORTS MANAGEMENT',
        description: 'Empowering athletes and sports properties with strategic commercial management and unmatched execution.',
        ctaText: 'DISCOVER OUR WORK',
        ctaLink: '/about',
      },
      {
        _key: 'slide-2',
        title: 'PARTNERSHIPS THAT SHAPE THE GAME.',
        subtitle: 'GLOBAL SPONSORSHIPS',
        description: 'Connecting top brands with premier sporting events, leagues, and athletes globally.',
        ctaText: 'EXPLORE PARTNERSHIPS',
        ctaLink: '/gallery',
      },
    ],
    whoWeAre: {
      tagline: 'WHO WE ARE',
      heading: 'PASSION BEYOND PLAY.',
      description: 'Sportoid is committed to the professional representation, execution and valuation of sporting properties in India. We bridge talent and opportunity.',
    },
    strengths: [
      {
        _key: 'strength-1',
        title: 'Athlete Management',
        description: 'Holistic management of athletes’ careers, commercial rights, sponsorships, and brand endorsements.',
        icon: 'trophy',
      },
      {
        _key: 'strength-2',
        title: 'Sponsorship & Valuation',
        description: 'Maximizing the commercial value of sports tournaments, leagues, and franchise rights.',
        icon: 'handshake',
      },
      {
        _key: 'strength-3',
        title: 'Event Delivery',
        description: 'Flawless execution of international sporting events, fan parks, and activation campaigns.',
        icon: 'calendar',
      },
      {
        _key: 'strength-4',
        title: 'Strategic Advisory',
        description: 'Advising federations, leagues, and brand owners on governance and market positioning.',
        icon: 'users',
      },
    ],
    partnershipCta: {
      heading: 'READY TO ELEVATE YOUR SPORTING PROPERTY?',
      description: 'Partner with Sportoid to build powerful commercial collaborations and lasting legacies in the sporting ecosystem.',
      buttonText: 'GET IN TOUCH',
      buttonLink: '/contact',
    },
  })
  console.log('✔ Seeded homePage')

  // 3. About Page
  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    title: 'About Us',
    heroSubtitle: 'Who We Are',
    heroHeading: 'PASSION BEYOND PLAY.',
    heroDescription: 'Sportoid is a young start-up committed to the professional representation, execution and valuation of sporting properties in India.',
    missionTitle: 'Our Mission',
    missionDescription: 'To grow the game, create value and leave a lasting legacy in the world of sport.',
    visionTitle: 'Our Vision',
    visionDescription: "To be India's most trusted partner in sports management and property representation.",
    beliefTitle: 'Our Belief',
    beliefDescription: 'Integrity, commitment and performance — on and off the field.',
    services: [
      {
        _key: 'service-1',
        category: 'Players',
        title: 'Empowering Talent. Building Careers.',
        imageAlignment: 'left',
        paragraphs: [
          'Having entered the industry to manage the commercial interest of India’s biggest personal sports brand in tennis, we at Sportoid soon realised the growing vacuum that is in the management of players, not brands.',
          'A void of them in — attitude matters for players and brands, available opportunities for physical, individual sponsorship right and adequately representation.',
          'We’re not just representing players currently, we advise players and brand owners on how aspects — sportoidity for us are from years’ experience of managing players.',
        ],
      },
      {
        _key: 'service-2',
        category: 'Sponsorship',
        title: 'Building Partnerships That Last.',
        imageAlignment: 'right',
        paragraphs: [
          'Over 85% of the Indian sponsorship market lay with 4 to 5 sports. Without experience with cricket — attempting to use regulation and consult six-sports sponsorship, we felt like new starters.',
          'We have over the years worked within the BCCI, on Indian cricket, other federations and have also been work with sponsors to invest at the ICC.',
          'These have opened opportunities on the International, National, League, and Franchise levels.',
        ],
      },
      {
        _key: 'service-3',
        category: 'Event Delivery',
        title: 'Flawless Execution. Unforgettable Impact.',
        imageAlignment: 'left',
        paragraphs: [
          'Whether it’s a live match, league, or fan engagement activity, we craft experiences that leave a lasting impression.',
          'From concept to completion, our team ensures every detail is planned, executed and perfected — creating moments that connect brands, fans and the game.',
        ],
      },
    ],
    stats: [
      { _key: 'stat-1', value: '15+', label: 'Years of Experience', icon: 'calendar' },
      { _key: 'stat-2', value: '50+', label: 'Properties Managed', icon: 'trophy' },
      { _key: 'stat-3', value: '100+', label: 'Brand Partnerships', icon: 'handshake' },
      { _key: 'stat-4', value: '25+', label: 'Athletes Advised', icon: 'users' },
    ],
  })
  console.log('✔ Seeded aboutPage')

  // 4. People (Team / Leadership)
  await client.createOrReplace({
    _id: 'person-harish',
    _type: 'person',
    name: 'Harish Krishnamachar',
    role: 'Founding Partner',
    category: 'leadership',
    order: 1,
    bio: 'Harish has 30 years of work experience and has been in the sports industry since 2006. He brings a conceptual and strategic perspective to the business and has in his early days in the industry actively managed event delivery as well. A desire to see brands and players get fair value and a belief that sport as a marketing multiplier is unrivalled have kept his interest in the industry alive. An amateur poker player and recent dog lover, Harish spends some of his time teaching almost anyone willing to listen.',
  })

  await client.createOrReplace({
    _id: 'person-nitin',
    _type: 'person',
    name: 'Nitin Khanna',
    role: 'Founding Partner',
    category: 'leadership',
    order: 2,
    bio: 'Nitin has 20 years of work experience and has been in the sports industry since 2006. With the strength of his relationships — across both clients and sportspeople, Nitin has created substantial value across the spectrum of the sports value chain. He is driven in part by the idea that Indian sport has only one way forward and that is exponential growth. His mandate to himself has been to curb over exuberance in sporting values and ensure stronger foundations.',
  })
  console.log('✔ Seeded people')

  // 5. Gallery Categories & Items
  const cricketCategory = await client.createOrReplace({
    _id: 'category-cricket',
    _type: 'galleryCategory',
    title: 'Cricket',
    slug: { _type: 'slug', current: 'cricket' },
  })

  const galleryEvents = [
    { title: "ICC Women's Cricket World Cup", date: '2022-03-04' },
    { title: "ICC Men's T20 World Cup", date: '2021-10-17' },
    { title: 'ICC World Test Championship Final', date: '2021-06-18' },
    { title: 'ICC Cricket World Cup England & Wales', date: '2019-05-30' },
    { title: 'Indian Premier League', date: '2019-03-23' },
    { title: 'Indian Premier League', date: '2018-04-07' },
    { title: 'ICC Champions Trophy', date: '2017-06-01' },
    { title: 'Indian Premier League', date: '2017-04-05' },
    { title: 'Paytm T20 Trophy', date: '2016-01-26' },
    { title: 'ICC World Twenty20 India', date: '2016-03-08' },
    { title: 'Indian Premier League', date: '2016-04-09' },
  ]

  for (let i = 0; i < galleryEvents.length; i++) {
    const ev = galleryEvents[i]
    await client.createOrReplace({
      _id: `gallery-item-${i + 1}`,
      _type: 'galleryItem',
      title: ev.title,
      eventDate: ev.date,
      category: { _type: 'reference', _ref: cricketCategory._id },
      featured: i < 3,
    })
  }
  console.log('✔ Seeded gallery items')

  // 6. Blog Authors, Categories & Posts
  const authorRajeev = await client.createOrReplace({
    _id: 'author-rajeev',
    _type: 'author',
    name: 'Rajeev Kumar',
    role: 'Sports Strategist & Managing Editor',
    bio: 'Sports industry analyst covering media rights, franchise economics, and athlete branding.',
  })

  const blogCatCricket = await client.createOrReplace({
    _id: 'post-cat-cricket',
    _type: 'postCategory',
    title: 'Cricket',
    slug: { _type: 'slug', current: 'cricket' },
    description: 'Insights on the commercial evolution of cricket.',
  })

  const blogCatSponsorship = await client.createOrReplace({
    _id: 'post-cat-sponsorship',
    _type: 'postCategory',
    title: 'Sponsorship',
    slug: { _type: 'slug', current: 'sponsorship' },
    description: 'Best practices for brand partnerships and sponsorships.',
  })

  await client.createOrReplace({
    _id: 'post-business-of-cricket',
    _type: 'post',
    title: 'The Business of Cricket: Beyond the Boundary',
    slug: { _type: 'slug', current: 'business-of-cricket' },
    excerpt: 'Exploring how cricket has evolved into a powerful global business driven by passion and strategy.',
    publishedAt: '2024-05-12T10:00:00Z',
    readingTime: '5 min read',
    author: { _type: 'reference', _ref: authorRajeev._id },
    category: { _type: 'reference', _ref: blogCatCricket._id },
    body: [
      {
        _key: 'block-1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'span-1',
            _type: 'span',
            text: 'Over the last two decades, cricket has transformed from a beloved sport into a multi-billion-dollar global economic powerhouse. The proliferation of premier franchise leagues like the Indian Premier League (IPL) alongside major ICC events has redefined sports broadcasting, athlete valuations, and digital fan engagement.',
          },
        ],
      },
    ],
  })

  await client.createOrReplace({
    _id: 'post-winning-partnerships',
    _type: 'post',
    title: 'Building Winning Partnerships in Sports',
    slug: { _type: 'slug', current: 'winning-partnerships' },
    excerpt: 'Why the right partnerships create more than visibility - they build lasting value.',
    publishedAt: '2024-04-28T10:00:00Z',
    readingTime: '4 min read',
    author: { _type: 'reference', _ref: authorRajeev._id },
    category: { _type: 'reference', _ref: blogCatSponsorship._id },
    body: [
      {
        _key: 'block-1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'span-1',
            _type: 'span',
            text: 'Effective sponsorship is no longer about logo placement on jerseys or boundary boards. Modern sports marketing requires authentic brand integrations, shared community values, and creative storytelling that resonates with fans on a deeply personal level.',
          },
        ],
      },
    ],
  })
  console.log('✔ Seeded blog posts')

  // 7. Contact Page
  await client.createOrReplace({
    _id: 'contactPage',
    _type: 'contactPage',
    title: 'Contact Us',
    heroHeading: 'Let’s Build the Future of Sports Together',
    heroDescription: 'Have a question, partnership proposal, or athlete inquiry? Connect with the Sportoid team.',
    phone: '+91 12345 67890',
    email: 'info@sportoid.com',
    address: 'Sportoid Sports Management\nMumbai, Maharashtra\nIndia',
    officeHours: 'Mon-Fri, 9am - 6pm IST',
  })
  console.log('✔ Seeded contactPage')

  console.log('🎉 All website data successfully seeded into Sanity!')
}

seed().catch((err) => {
  console.error('Error during seeding:', err)
  process.exit(1)
})
