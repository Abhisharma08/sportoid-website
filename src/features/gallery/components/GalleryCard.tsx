import * as React from 'react'

export interface GalleryCardProps {
  title: string
  year: string
  imageSrc?: string
}

export function GalleryCard({ title, year, imageSrc }: GalleryCardProps) {
  return (
    <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
      <div className="w-48 h-48 rounded-full overflow-hidden border border-gray-100 mb-8 p-4 bg-white flex items-center justify-center">
        {imageSrc ? (
          <img src={imageSrc} alt={title} className="max-w-full max-h-full object-contain" />
        ) : (
          <div className="w-full h-full bg-gray-100 rounded-full"></div>
        )}
      </div>
      
      <div className="w-full text-left">
        <div className="w-12 h-1 bg-primary mb-4"></div>
        <h3 className="text-lg font-heading font-bold text-dark mb-2 leading-snug">{title}</h3>
        <div className="text-gray-500 text-sm">{year}</div>
      </div>
    </div>
  )
}
