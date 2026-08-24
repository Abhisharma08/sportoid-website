import * as React from 'react'

interface StrengthCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

export function StrengthCard({ title, description, icon }: StrengthCardProps) {
  return (
    <div className="bg-black border border-gray-800 p-8 sm:p-10 rounded-xl text-center hover:border-primary transition-all duration-300 flex flex-col items-center h-full group hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10">
      <div className="w-20 h-20 rounded-full border-2 border-primary text-primary flex items-center justify-center mb-6 flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-heading font-bold text-white mb-4 uppercase tracking-wide min-h-[3.5rem] flex items-center justify-center">
        {title}
      </h3>
      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-grow flex items-center justify-center">
        {description}
      </p>
    </div>
  )
}
