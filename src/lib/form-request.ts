import { NextRequest } from 'next/server'
export class RequestError extends Error {
  constructor(message: string, public status: number) { super(message) }
}
export async function readFormBody(req: NextRequest) {
  if (!req.headers.get('content-type')?.toLowerCase().startsWith('application/json')) throw new RequestError('Expected JSON', 415)
  const origin = req.headers.get('origin')
  if (origin && origin !== req.nextUrl.origin && origin !== process.env.SITE_URL) throw new RequestError('Invalid request origin', 403)
  if (req.headers.get('sec-fetch-site') === 'cross-site') throw new RequestError('Cross-site submission denied', 403)
  try { return JSON.parse(await readLimitedText(req)) }
  catch (error) {
    if (error instanceof RequestError) throw error
    throw new RequestError('Invalid JSON', 400)
  }
}

export async function readLimitedText(req: NextRequest) {
  const reader = req.body?.getReader()
  if (!reader) throw new RequestError('Missing request body', 400)
  const chunks: Uint8Array[] = []
  let bytes = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    bytes += value.byteLength
    if (bytes > 16384) { await reader.cancel(); throw new RequestError('Request too large', 413) }
    chunks.push(value)
  }
  return Buffer.concat(chunks).toString('utf8')
}
