import * as React from 'react'

export interface PersonCardProps {
  name: string
  role: string
  bio: React.ReactNode
  imageSrc?: string
}

import { FadeIn } from '@/components/ui/FadeIn'

export function PersonCard({ name, role, bio, imageSrc }: PersonCardProps) {
  return (
    <FadeIn direction="up" delay={0.15}>
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 flex flex-col h-full group">
        <div className="relative self-center mb-10 mt-4">
          <div className="w-48 h-48 rounded-full overflow-hidden border-[6px] border-white shadow-lg z-10 relative bg-gray-200 group-hover:scale-105 transition-transform duration-300">
            {imageSrc && (
              <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
            )}
          </div>
          {/* Red accent circle behind image */}
          <div className="absolute -top-4 -left-4 w-48 h-48 rounded-full border-2 border-primary -z-0 transition-transform duration-300 group-hover:scale-110"></div>
          {/* Floating icon */}
          <div className="absolute bottom-0 right-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white z-20 shadow-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
        </div>
        
        <div className="flex-grow">
          <div className="text-primary font-bold text-sm mb-1 uppercase tracking-wider">{role}</div>
          <h3 className="text-2xl font-heading font-black text-dark mb-4 uppercase group-hover:text-primary transition-colors">{name}</h3>
          <div className="w-12 h-1 bg-gray-200 mb-6 group-hover:w-20 group-hover:bg-primary transition-all duration-300"></div>
          <div className="text-gray-600 space-y-4 text-sm leading-relaxed">
            {bio}
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
