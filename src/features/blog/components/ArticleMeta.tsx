import * as React from 'react'
import { Calendar, User, Clock } from 'lucide-react'
export interface ArticleMetaProps {
  category: string
  date: string
  author: string
  readingTime: string
}

export function ArticleMeta({ category, date, author, readingTime }: ArticleMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-6 py-6 border-b border-gray-100 mb-8 text-sm">
      <div className="bg-primary text-white px-3 py-1 rounded font-bold uppercase tracking-wider text-xs">
        {category}
      </div>
      
      <div className="flex items-center text-gray-500">
        <Calendar className="w-4 h-4 mr-2 text-primary" /> {date}
      </div>
      
      <div className="flex items-center text-gray-500">
        <User className="w-4 h-4 mr-2 text-primary" /> {author}
      </div>
      
      <div className="flex items-center text-gray-500">
        <Clock className="w-4 h-4 mr-2 text-primary" /> {readingTime}
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <span className="text-gray-500 text-sm">Share:</span>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-colors">f</button>
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-colors">t</button>
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-colors">in</button>
        </div>
      </div>
    </div>
  )
}
