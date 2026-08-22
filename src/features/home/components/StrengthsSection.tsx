import * as React from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { StrengthCard } from './StrengthCard'
import { Users, Trophy, Handshake, Calendar } from 'lucide-react'

import { FadeIn } from '@/components/ui/FadeIn'

export interface StrengthsSectionProps {
  strengths?: Array<{
    title?: string
    description?: string
    icon?: string
  }>
}

export function StrengthsSection({ strengths }: StrengthsSectionProps) {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'trophy':
        return <Trophy className="w-8 h-8" />
      case 'handshake':
        return <Handshake className="w-8 h-8" />
      case 'calendar':
        return <Calendar className="w-8 h-8" />
      case 'users':
      default:
        return <Users className="w-8 h-8" />
    }
  }

  const items = strengths && strengths.length > 0
    ? strengths
    : [
        {
          title: 'Athlete Management',
          description: 'We manage and represent some of the finest talents in Indian cricket and help them achieve their dreams.',
          icon: 'users',
        },
        {
          title: 'Cricket Expertise',
          description: 'Extensive experience with the BCCI and IPL ecosystem gives us deep industry insights.',
          icon: 'trophy',
        },
        {
          title: 'Execution Excellence',
          description: 'End-to-end execution of sponsorships, events, operations and strategic partnerships.',
          icon: 'handshake',
        },
      ]

  return (
    <Section variant="dark-gray">
      <Container>
        <FadeIn direction="up" delay={0.1}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-1 bg-primary"></div>
            <span className="font-bold text-sm uppercase tracking-widest text-white">What We Do</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-16 text-white">
            OUR CORE STRENGTHS
          </h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.slice(0, 3).map((item, idx) => (
            <FadeIn key={idx} direction="up" delay={0.15 * (idx + 1)}>
              <StrengthCard 
                title={item.title || ''}
                description={item.description || ''}
                icon={getIcon(item.icon)} 
              />
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  )
}
