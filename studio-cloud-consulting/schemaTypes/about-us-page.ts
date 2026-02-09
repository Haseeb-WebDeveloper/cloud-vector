import {defineField, defineType} from 'sanity'

export const aboutUsPage = defineType({
  name: 'aboutUsPage',
  title: 'About Us Page',
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
          description: 'The main heading text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          description: 'Description text',
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
      ],
    }),

    // SEO Fields
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO meta title for the about us page',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'SEO meta description for the about us page',
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
      title: 'About Us Page',
    }),
  },
})
