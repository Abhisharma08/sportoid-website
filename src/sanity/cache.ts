// One shared policy for content, metadata and discovery routes. Webhooks expire
// these entries immediately; 60 seconds is the fallback if delivery is missed.
export const CONTENT_REVALIDATE_SECONDS = 60
export const CONTENT_TAG = 'sanity-content'
