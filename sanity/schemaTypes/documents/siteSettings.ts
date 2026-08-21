import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings & SEO',
  type: 'document',
  groups: [
    { name: 'general', title: 'General & Branding', default: true },
    { name: 'seo', title: 'SEO & Metadata' },
    { name: 'social', title: 'Social & OpenGraph' },
  ],
  fields: [
    // --- General & Branding ---
    defineField({
      name: 'siteTitle',
      title: 'Site Name / Brand Title',
      type: 'string',
      initialValue: 'SPORTOID',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Site Tagline',
      type: 'string',
      initialValue: "Building Tomorrow's Champions",
      group: 'general',
    }),
    defineField({
      name: 'logo',
      title: 'Primary Logo (Light / Dark mode)',
      type: 'image',
      options: { hotspot: true },
      group: 'general',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'general',
    }),

    // --- SEO & Metadata ---
    defineField({
      name: 'metaTitle',
      title: 'Default Meta Title',
      type: 'string',
      description: 'Used for search engine title tags (recommended: 50-60 characters)',
      initialValue: "SPORTOID | Building Tomorrow's Champions",
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
      description: 'Used for search engine descriptions (recommended: 150-160 characters)',
      initialValue:
        'Sportoid is a sports management company committed to the professional representation, execution and valuation of sporting properties in India.',
      group: 'seo',
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Keywords to index in search engines',
      initialValue: ['Sports Management', 'Athlete Representation', 'Cricket Sponsorship', 'Event Execution', 'India Sports'],
      group: 'seo',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical Base URL',
      type: 'url',
      description: 'The production root URL (e.g. https://www.sportoid.com)',
      initialValue: 'https://www.sportoid.com',
      group: 'seo',
    }),
    defineField({
      name: 'robotsIndex',
      title: 'Allow Search Engines to Index (Robots)',
      type: 'boolean',
      initialValue: true,
      group: 'seo',
    }),

    // --- OpenGraph & Social Sharing ---
    defineField({
      name: 'ogImage',
      title: 'OpenGraph / Social Share Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image displayed when sharing the site on WhatsApp, Twitter, LinkedIn, Facebook (1200x630px recommended)',
      group: 'social',
    }),
    defineField({
      name: 'twitterHandle',
      title: 'Twitter / X Handle',
      type: 'string',
      description: 'e.g. @sportoid',
      group: 'social',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      group: 'social',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
        defineField({ name: 'twitter', title: 'Twitter / X URL', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube URL', type: 'url' }),
      ],
    }),
  ],
})
