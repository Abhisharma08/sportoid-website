interface RateLimitRecord {
  count: number
  resetTime: number
}

// In-memory sliding window store for IP rate limiting
const ipRequestStore = new Map<string, RateLimitRecord>()

/**
 * Validates request rate limit based on client IP or fallback identifier.
 *
 * @param identifier Client IP address or key
 * @param maxRequests Maximum allowed requests within the window
 * @param windowMs Time window in milliseconds (e.g. 60,000ms = 1 minute)
 * @returns { success: boolean, remaining: number, resetInSeconds: number }
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60000
) {
  const now = Date.now()
  const record = ipRequestStore.get(identifier)

  // Clean expired entries periodically
  if (ipRequestStore.size > 5000) {
    for (const [key, val] of ipRequestStore.entries()) {
      if (now > val.resetTime) {
        ipRequestStore.delete(key)
      }
    }
  }

  if (!record || now > record.resetTime) {
    ipRequestStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })
    return {
      success: true,
      remaining: maxRequests - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    }
  }

  if (record.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetInSeconds: Math.ceil((record.resetTime - now) / 1000),
    }
  }

  record.count += 1
  return {
    success: true,
    remaining: maxRequests - record.count,
    resetInSeconds: Math.ceil((record.resetTime - now) / 1000),
  }
}
