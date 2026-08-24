import * as React from 'react'
import { ContactHero } from '@/features/contact/components/ContactHero'
import { ContactForm } from '@/features/contact/components/ContactForm'
import { ContactInfo } from '@/features/contact/components/ContactInfo'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'

import { fetchContactPage } from '@/services/site/contact.service'
import { fetchSiteSettings } from '@/services/site/settings.service'
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
  const [contactData, settings] = await Promise.all([
    fetchContactPage(),
    fetchSiteSettings(),
  ])

  return (
    <>
      <ContactHero />
      <Section className="bg-light relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[url('/dots.svg')] bg-repeat opacity-50 pointer-events-none"></div>
        
        <Container className="relative z-10">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <ContactInfo data={contactData} settings={settings} />
            </div>
            <div className="lg:w-2/3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Map Section */}
      <div className="w-full h-[450px] bg-dark relative overflow-hidden">
        <iframe
          title="Sportoid Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160982357!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full grayscale contrast-125 opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        />
        
        {/* Floating Headquarters Info Card */}
        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-10 bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-gray-100 max-w-xs sm:max-w-sm">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Headquarters</span>
          </div>
          <h4 className="font-heading font-black text-lg text-dark mb-1">Sportoid Management</h4>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            Mumbai, Maharashtra, India
          </p>
        </div>
      </div>
    </>
  )
}
