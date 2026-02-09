import {defineField, defineType} from 'sanity'

export const caseStudiesPage = defineType({
  name: 'caseStudiesPage',
  title: 'Case Studies Page',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'mainHeading',
          title: 'Main Heading',
          type: 'string',
          description: 'The main heading text (supports HTML-like structure)',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          rows: 3,
          description: 'Subheading text below the main heading',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: {hotspot: true},
          description: 'Hero section background image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Alternative text for the image',
            },
          ],
        }),
        defineField({
          name: 'ctaButtons',
          title: 'CTA Buttons',
          type: 'array',
          of: [{type: 'button'}],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),

    // SEO Fields
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO meta title for the case studies page',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'SEO meta description for the case studies page',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Open Graph image for social sharing',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternative text for the image',
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Case Studies Page',
    }),
  },
})
