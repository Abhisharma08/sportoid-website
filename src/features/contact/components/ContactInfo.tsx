import * as React from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'

export interface ContactInfoProps {
  data?: any
}

export function ContactInfo({ data }: ContactInfoProps) {
  const phone = data?.phone || '+91 12345 67890'
  const email = data?.email || 'info@sportoid.com'
  const officeHours = data?.officeHours || 'Mon-Fri, 9am - 6pm IST'
  const address = data?.address || 'Sportoid Sports Management\nMumbai, Maharashtra\nIndia'

  return (
    <div className="space-y-12 h-full">
      <div>
        <h3 className="text-4xl font-heading font-black text-dark mb-8">Contact Information</h3>
        <p className="text-gray-600 mb-10 text-lg leading-relaxed">
          Whether you're an athlete looking for representation, a brand seeking a partnership, 
          or an organization planning an event, our team is ready to assist you.
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-primary flex-shrink-0 mt-1">
            <Phone className="w-5 h-5" />
          </div>
          <div className="ml-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-1">Call Us</h4>
            <div className="text-xl font-bold text-dark">{phone}</div>
            <div className="text-gray-500 text-sm mt-1">{officeHours}</div>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-primary flex-shrink-0 mt-1">
            <Mail className="w-5 h-5" />
          </div>
          <div className="ml-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-1">Email Us</h4>
            <div className="text-xl font-bold text-dark">{email}</div>
            <div className="text-gray-500 text-sm mt-1">We'll reply within 24 hours</div>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-primary flex-shrink-0 mt-1">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="ml-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-1">Visit Us</h4>
            <div className="text-xl font-bold text-dark leading-tight whitespace-pre-line">
              {address}
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-gray-200">
        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Follow Us</h4>
        <div className="flex gap-3">
          <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-white hover:bg-primary transition-colors">f</button>
          <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-white hover:bg-primary transition-colors">t</button>
          <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-white hover:bg-primary transition-colors">in</button>
          <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-white hover:bg-primary transition-colors">ig</button>
        </div>
      </div>
    </div>
  )
}
