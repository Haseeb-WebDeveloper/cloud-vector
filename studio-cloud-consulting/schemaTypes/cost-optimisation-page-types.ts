import {defineField, defineType} from 'sanity'

// Industry Fact type
export const industryFact = defineType({
  name: 'industryFact',
  title: 'Industry Fact',
  type: 'object',
  fields: [
    defineField({
      name: 'fact',
      title: 'Fact Text',
      type: 'text',
      rows: 3,
      description: 'Fact text (supports HTML like <span>)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'e.g., "Gartner", "McKinsey & Company"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'report',
      title: 'Report Name',
      type: 'string',
      description: 'Name of the report',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Report Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternative text for the image (for accessibility)',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Image Title/Name',
          description: 'Custom name/title for this image (for organization)',
        },
      ],
    }),
  ],
  preview: {
    select: {
      fact: 'fact',
      source: 'source',
      media: 'image',
    },
    prepare({fact, source, media}) {
      const preview = fact?.substring(0, 50) || 'Industry Fact'
      return {
        title: preview,
        subtitle: source || '',
        media,
      }
    },
  },
})

// Approach Step type
export const approachStep = defineType({
  name: 'approachStep',
  title: 'Approach Step',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'oneLiner',
      title: 'One Liner',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternative text for the image (for accessibility)',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Image Title/Name',
          description: 'Custom name/title for this image (for organization)',
        },
      ],
    }),
    defineField({
      name: 'isReversed',
      title: 'Is Reversed Layout',
      type: 'boolean',
      description: 'If true, image appears on the left',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      media: 'image',
    },
    prepare({heading, media}) {
      return {
        title: heading || 'Approach Step',
        media,
      }
    },
  },
})

// Step type for Steps Section
export const costOptimisationStep = defineType({
  name: 'costOptimisationStep',
  title: 'Cost Optimisation Step',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "30 mins", "12-15 days", "Ongoing"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'points',
      title: 'Points',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide React icon name (e.g., "Shield", "Search", "BarChart3")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternative text for the image (for accessibility)',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Image Title/Name',
          description: 'Custom name/title for this image (for organization)',
        },
      ],
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
      duration: 'duration',
      media: 'image',
    },
    prepare({headline, duration, media}) {
      return {
        title: headline || 'Step',
        subtitle: duration || '',
        media,
      }
    },
  },
})

