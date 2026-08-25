'use client'

import * as React from 'react'

interface StrengthCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

export function StrengthCard({ title, description, icon }: StrengthCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card p-8 sm:p-10 rounded-2xl text-center flex flex-col items-center h-full group transition-all duration-300 ease-out hover:border-primary/30 relative overflow-hidden cursor-default"
      style={{
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glow-border" />

      {/* Background subtle gradient on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="w-20 h-20 rounded-full border-2 border-primary/40 text-primary flex items-center justify-center mb-6 flex-shrink-0 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 ease-out group-hover:animate-pulse-glow relative z-10">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-heading font-bold text-white mb-4 uppercase tracking-wide min-h-[3.5rem] flex items-center justify-center relative z-10">
        {title}
      </h3>
      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-grow flex items-center justify-center relative z-10">
        {description}
      </p>
    </div>
  )
}
