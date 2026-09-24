import * as React from 'react'
import { Container } from '@/components/ui/Container'
import { urlFor, type SanityImageSource } from '@/sanity/image'

export interface ClientLogo {
  _id: string
  name: string
  logo: SanityImageSource
  url?: string
}

export interface ClientLogosMarqueeProps {
  clients?: ClientLogo[]
}

// Repeat short lists so one half of the track is always wider than the screen
const MIN_LOGOS_PER_LOOP = 8

function LogoItem({ client, duplicate }: { client: ClientLogo; duplicate?: boolean }) {
  const img = (
    <img
      src={urlFor(client.logo).height(96).url()}
      alt={duplicate ? '' : client.name}
      loading="lazy"
      className="h-10 sm:h-12 w-auto max-w-[160px] object-contain transition-transform duration-300 hover:scale-105"
    />
  )

  return (
    <li
      className={`flex-shrink-0 flex items-center justify-center px-8 sm:px-12 ${duplicate ? 'marquee-duplicate' : ''}`}
      aria-hidden={duplicate || undefined}
    >
      {client.url ? (
        <a href={client.url} target="_blank" rel="noopener noreferrer" tabIndex={duplicate ? -1 : undefined}>
          {img}
        </a>
      ) : (
        img
      )}
    </li>
  )
}

export function ClientLogosMarquee({ clients }: ClientLogosMarqueeProps) {
  // No placeholder brands: listing clients we don't have would be misleading
  if (!clients || clients.length === 0) return null

  const repeats = Math.ceil(MIN_LOGOS_PER_LOOP / clients.length)
  const loop = Array.from({ length: repeats }, () => clients).flat()
  const duration = `${Math.max(loop.length * 3, 20)}s`

  return (
    <section className="bg-white border-y border-gray-100 py-12 sm:py-16">
      <Container>
        <div className="flex items-center justify-center gap-4 mb-8 sm:mb-10">
          <div className="w-8 h-1 bg-primary rounded-full" />
          <h2 className="text-xs sm:text-sm font-sans font-semibold tracking-widest text-dark">
            TRUSTED BY OUR CLIENTS
          </h2>
          <div className="w-8 h-1 bg-primary rounded-full" />
        </div>
      </Container>

      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul
          className="animate-marquee flex w-max items-center"
          style={{ '--marquee-duration': duration } as React.CSSProperties}
        >
          {/* The track holds the loop twice; the identical second half makes the -50% translate seamless */}
          {[...loop, ...loop].map((client, idx) => (
            <LogoItem key={`${client._id}-${idx}`} client={client} duplicate={idx >= clients.length} />
          ))}
        </ul>
      </div>
    </section>
  )
}
