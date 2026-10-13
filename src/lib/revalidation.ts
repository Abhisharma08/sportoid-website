export const CONTENT_TYPES = [
  'page', 'homePage', 'aboutPage', 'peoplePage', 'person', 'galleryPage', 'galleryItem',
  'galleryCategory', 'event', 'eventsPage', 'clientLogo', 'linkedinPost', 'blogPage',
  'post', 'postCategory', 'author', 'contactPage', 'siteSettings', 'navigation', 'footerSettings',
] as const

export function isContentType(value: unknown): value is typeof CONTENT_TYPES[number] {
  return typeof value === 'string' && (CONTENT_TYPES as readonly string[]).includes(value)
}
