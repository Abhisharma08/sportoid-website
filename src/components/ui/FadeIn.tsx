'use client'

import * as React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface FadeInProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  distance?: number
  className?: string
  stagger?: number
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 35,
  className = '',
}: FadeInProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    let x = 0
    let y = 0

    if (direction === 'up') y = distance
    if (direction === 'down') y = -distance
    if (direction === 'left') x = distance
    if (direction === 'right') x = -distance

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          x,
          y,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [direction, delay, duration, distance])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
