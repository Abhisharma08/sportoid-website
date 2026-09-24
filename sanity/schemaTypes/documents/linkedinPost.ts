import { defineField, defineType } from 'sanity'

export const LINKEDIN_URN_PATTERN = /urn:li:(share|ugcPost|activity):\d+/
export const LINKEDIN_ACTIVITY_PATTERN = /activity-(\d+)/

export default defineType({
  name: 'linkedinPost',
  title: 'LinkedIn Post',
  type: 'document',
  fields: [
    defineField({
      name: 'embed',
      title: 'LinkedIn Embed Code or Post URL',
      type: 'text',
      rows: 3,
      description:
        'On LinkedIn, open the post → "…" menu → "Embed this post" → copy the code and paste it here. A post URL also works for most posts.',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true
          return LINKEDIN_URN_PATTERN.test(value) || LINKEDIN_ACTIVITY_PATTERN.test(value)
            ? true
            : 'Could not find a LinkedIn post ID. Paste the embed code from "Embed this post".'
        }),
    }),
    defineField({
      name: 'label',
      title: 'Internal Label',
      type: 'string',
      description: 'Only shown in the Studio, to help you recognise the post',
    }),
    defineField({
      name: 'postedAt',
      title: 'Posted On',
      type: 'date',
      description: 'Used to order posts (newest first)',
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
    defineField({
      name: 'embedHeight',
      title: 'Embed Height (px)',
      type: 'number',
      description: 'Only used when you paste a post URL. Pasted embed code already includes the right height.',
      initialValue: 560,
      validation: (Rule) => Rule.min(300).max(1200),
    }),
  ],
  orderings: [
    {
      title: 'Posted (newest first)',
      name: 'postedAtDesc',
      by: [{ field: 'postedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'label', subtitle: 'postedAt' },
    prepare({ title, subtitle }) {
      return { title: title || 'LinkedIn post', subtitle }
    },
  },
})
