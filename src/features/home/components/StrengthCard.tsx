import * as React from 'react'

interface StrengthCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

export function StrengthCard({ title, description, icon }: StrengthCardProps) {
  return (
    <div className="bg-black border border-gray-800 p-10 rounded-lg text-center hover:border-primary transition-colors flex flex-col items-center">
      <div className="w-20 h-20 rounded-full border-2 border-primary text-primary flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-heading font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
