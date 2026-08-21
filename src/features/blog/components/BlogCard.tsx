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

export function BlogCard({ title, excerpt, date, category, slug, imageSrc }: BlogCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
      <div className="relative h-64 bg-gray-200">
        {imageSrc && <img src={imageSrc} alt={title} className="w-full h-full object-cover" />}
        <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded text-primary text-xs font-bold uppercase tracking-wider">
          {category}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          {date}
        </div>
        <h3 className="text-xl font-heading font-bold text-dark mb-3 leading-snug">
          <Link href={`/blog/${slug}`} className="hover:text-primary transition-colors">
            {title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-6 flex-grow">{excerpt}</p>
        <Link href={`/blog/${slug}`} className="text-primary font-bold text-sm uppercase tracking-wider flex items-center hover:text-red-700 transition-colors">
          Read More <span className="ml-2">→</span>
        </Link>
      </div>
    </div>
  )
}
