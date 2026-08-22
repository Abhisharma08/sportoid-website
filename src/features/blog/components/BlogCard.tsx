import * as React from 'react'
import Link from 'next/link'

export interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  category: string
  slug: string
  imageSrc?: string
}

import { FadeIn } from '@/components/ui/FadeIn'

export function BlogCard({ title, excerpt, date, category, slug, imageSrc }: BlogCardProps) {
  return (
    <FadeIn direction="up" delay={0.1}>
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col h-full group">
        <div className="relative h-64 bg-gray-200 overflow-hidden">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded text-primary text-xs font-bold uppercase tracking-wider shadow-sm">
            {category}
          </div>
        </div>
        
        <div className="p-8 flex flex-col flex-grow">
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {date}
          </div>
          <h3 className="text-xl font-heading font-bold text-dark mb-3 leading-snug group-hover:text-primary transition-colors">
            <Link href={`/blog/${slug}`}>
              {title}
            </Link>
          </h3>
          <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">{excerpt}</p>
          <Link href={`/blog/${slug}`} className="text-primary font-bold text-sm uppercase tracking-wider flex items-center hover:text-red-700 transition-colors group-hover:translate-x-1 duration-200">
            Read More <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </FadeIn>
  )
}
