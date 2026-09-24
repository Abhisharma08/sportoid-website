export interface NavLink {
  label: string
  href: string
  isExternal?: boolean
}

/**
 * Pages that must always be reachable from the header and footer, even when the
 * CMS link lists were set up before the page existed. Each is inserted after
 * `after` (or appended) unless the CMS list already links to it.
 */
const REQUIRED_LINKS: Array<{ link: NavLink; after: string }> = [
  { link: { label: 'Events', href: '/events' }, after: '/gallery' },
]

const normalise = (href: string) => href.replace(/\/+$/, '') || '/'

export function withRequiredLinks<T extends NavLink>(links: T[]): T[] {
  const result = [...links]
  for (const { link, after } of REQUIRED_LINKS) {
    if (result.some((item) => normalise(item.href) === link.href)) continue
    const anchor = result.findIndex((item) => normalise(item.href) === after)
    result.splice(anchor === -1 ? result.length : anchor + 1, 0, link as T)
  }
  return result
}
