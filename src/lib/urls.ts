export function httpUrl(value?: string | null): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value)
    return ['https:', 'http:'].includes(url.protocol) ? url.href : undefined
  } catch { return undefined }
}

export function siteOrigin(value?: string | null): string {
  return new URL(httpUrl(value) || 'https://www.sportoid.com').origin
}

export function safeHref(value?: string | null): string | undefined {
  if (!value || /[\u0000-\u0020\\]/.test(value)) return undefined
  if ((value.startsWith('/') && !value.startsWith('//')) || value.startsWith('#')) return value
  if (/^(mailto:|tel:)/i.test(value)) return value
  return httpUrl(value)
}
