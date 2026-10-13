import { PageSchema } from '@/components/seo/PageSchema'
import { getPageSeo } from '@/repositories/sanity/seo.repository'
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
    seo: (await getPageSeo('contactPage')) || undefined,
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
      <PageSchema path="/contact" title="Contact Us" contentType="contactPage" type="ContactPage" />
      <ContactHero data={contactData} />
      <Section className="bg-light relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full dotted-grid bg-repeat opacity-50 pointer-events-none"></div>
        
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
          src={`https://www.google.com/maps?q=${encodeURIComponent(contactData?.address || "Mumbai, India")}&output=embed`}
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
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-widest mb-1.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Headquarters</span>
          </div>
          <h4 className="font-heading font-semibold text-lg text-dark mb-1">Sportoid Management</h4>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            {contactData?.address || "Mumbai, Maharashtra, India"}
          </p>
        </div>
      </div>
    </>
  )
}
