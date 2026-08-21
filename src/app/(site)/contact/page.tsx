import * as React from 'react'
import { ContactHero } from '@/features/contact/components/ContactHero'
import { ContactForm } from '@/features/contact/components/ContactForm'
import { ContactInfo } from '@/features/contact/components/ContactInfo'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'

import { fetchContactPage } from '@/services/site/contact.service'
import { constructMetadata } from '@/lib/metadata'

export async function generateMetadata() {
  return constructMetadata({
    title: 'Contact Us',
    description:
      'Get in touch with the Sportoid team for athlete representation, tournament rights management, and sports marketing inquiries.',
    canonicalPath: '/contact',
  })
}

export default async function ContactPage() {
  const contactData = await fetchContactPage()
  return (
    <>
      <ContactHero />
      <Section className="bg-light relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[url('/dots.svg')] bg-repeat opacity-50 pointer-events-none"></div>
        
        <Container className="relative z-10">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <ContactInfo data={contactData} />
            </div>
            <div className="lg:w-2/3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Map Section */}
      <div className="w-full h-[400px] bg-gray-200 relative flex items-center justify-center">
        <div className="absolute inset-0 grayscale opacity-80 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Mumbai,India&zoom=12&size=1200x400&sensor=false')] bg-cover bg-center"></div>
        <div className="bg-white p-6 shadow-lg rounded-lg relative z-10 max-w-sm text-center">
          <h4 className="font-heading font-black text-xl mb-2">Our Headquarters</h4>
          <p className="text-gray-500 text-sm">Mumbai, Maharashtra, India</p>
        </div>
      </div>
    </>
  )
}
