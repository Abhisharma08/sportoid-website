'use client'

import * as React from 'react'

const PLATFORM_URL = 'https://static.elfsight.com/platform/platform.js'

export interface ElfsightWidgetProps {
  widgetId: string
  className?: string
}

/**
 * Renders an Elfsight widget. Elfsight's platform script finds and fills any
 * `elfsight-app-{id}` element on the page; it must only be loaded once.
 */
export function ElfsightWidget({ widgetId, className = '' }: ElfsightWidgetProps) {
  React.useEffect(() => {
    if ('eapps' in window || document.querySelector(`script[src="${PLATFORM_URL}"]`)) return

    const script = document.createElement('script')
    script.src = PLATFORM_URL
    script.async = true
    document.body.appendChild(script)
  }, [])

  return <div className={`elfsight-app-${widgetId} ${className}`} data-elfsight-app-lazy="in-viewport" />
}
