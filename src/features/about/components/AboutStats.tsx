import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Trophy, Calendar, Users, Handshake } from 'lucide-react'
interface Stat { value?: string; label?: string; icon?: string }
const defaults: Stat[] = [
  { value: '10+', label: 'Years of Experience', icon: 'trophy' },
  { value: '250+', label: 'Events Executed', icon: 'calendar' },
  { value: '100+', label: 'Athletes Managed', icon: 'users' },
  { value: '50+', label: 'Brand Partnerships', icon: 'handshake' },
]
export function AboutStats({ stats }: { stats?: Stat[] }) {
  const items = stats?.length ? stats : defaults
  const icons = { trophy: Trophy, calendar: Calendar, users: Users, handshake: Handshake }
  return <Section variant="light" className="bg-white border-y border-gray-100 py-12 md:py-20"><Container>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
      {items.map((item, i) => {
        const Icon = icons[item.icon as keyof typeof icons] || Trophy
        return <div key={i} className="flex flex-col items-center text-center px-4">
          <Icon className="mb-4 h-10 w-10 text-primary" />
          <div className="mb-2 font-heading text-4xl font-semibold text-dark md:text-5xl">{item.value}</div>
          <div className="text-sm font-semibold text-gray-600">{item.label}</div>
        </div>
      })}
    </div>
  </Container></Section>
}
