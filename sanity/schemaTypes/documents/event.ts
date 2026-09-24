import { defineField, defineType } from 'sanity'
import { SPORT_OPTIONS } from '../constants/sports'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sport',
      title: 'Sport',
      type: 'string',
      options: { list: SPORT_OPTIONS },
      initialValue: 'cricket',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      description: 'e.g. Tournament, League, Clinic, Talent Hunt, Corporate Match',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
      description: 'Leave empty for single-day events',
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          const startDate = (context.document as { startDate?: string } | undefined)?.startDate
          if (endDate && startDate && new Date(endDate) < new Date(startDate)) {
            return 'End date must be after the start date'
          }
          return true
        }),
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Event Image / Poster',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      rows: 3,
      description: 'Shown on event cards (max ~200 characters)',
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: 'body',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration / Tickets URL',
      type: 'url',
    }),
    defineField({
      name: 'registrationLabel',
      title: 'Registration Button Label',
      type: 'string',
      initialValue: 'Register Now',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      description: 'Featured events are shown first on the homepage',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Start Date (soonest first)',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
      city: 'city',
      media: 'image',
    },
    prepare({ title, startDate, city, media }) {
      const date = startDate ? new Date(startDate).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : 'No date'
      return { title, subtitle: [date, city].filter(Boolean).join(' · '), media }
    },
  },
})
