import { getLinkedInPostsData } from '../../repositories/sanity/linkedin.repository'

export interface LinkedInEmbed {
  id: string
  src: string
  height: number
}

/**
 * Accepts either LinkedIn's "Embed this post" iframe code or a post URL and
 * returns the official embed URL, or null if no post ID can be found.
 */
export const toLinkedInEmbedUrl = (input: string): string | null => {
  // Pasted embed code: keep LinkedIn's own src, including display options like ?collapsed=1
  const iframeSrc = input.match(/src=["'](https:\/\/www\.linkedin\.com\/embed\/feed\/update\/urn:li:(?:share|ugcPost|activity):\d+[^"']*)["']/)?.[1]
  if (iframeSrc) return iframeSrc.replace(/&amp;/g, '&')

  const urn = input.match(/urn:li:(share|ugcPost|activity):\d+/)?.[0]
  if (urn) return `https://www.linkedin.com/embed/feed/update/${urn}`

  const activityId = input.match(/activity-(\d+)/)?.[1]
  if (activityId) return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityId}`

  return null
}

/**
 * Accepts Elfsight's install code, a bare widget ID or a share link
 * (https://<id-without-hyphens>.elf.site) and returns the hyphenated widget ID.
 */
export const toElfsightWidgetId = (input?: string | null): string | null => {
  if (!input) return null

  const uuid = input.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i)?.[0]
  if (uuid) return uuid.toLowerCase()

  const compact = input.match(/([0-9a-f]{32})\.elf\.site/i)?.[1]?.toLowerCase()
  if (compact) {
    return [compact.slice(0, 8), compact.slice(8, 12), compact.slice(12, 16), compact.slice(16, 20), compact.slice(20)].join('-')
  }

  return null
}

interface LinkedInPostRecord {
  _id: string
  embed?: string
  embedHeight?: number
}

export const fetchLinkedInEmbeds = async (limit?: number): Promise<LinkedInEmbed[]> => {
  const posts: LinkedInPostRecord[] = await getLinkedInPostsData(limit)
  return (posts || []).flatMap((post) => {
    const src = toLinkedInEmbedUrl(post.embed || '')
    // The height in LinkedIn's embed code fits the post; the Studio field covers pasted URLs
    const codeHeight = Number(post.embed?.match(/height=["']?(\d+)/)?.[1])
    return src ? [{ id: post._id, src, height: codeHeight || post.embedHeight || 560 }] : []
  })
}
