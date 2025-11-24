import {defineField, defineType} from 'sanity'

// Pain Point type for HowWeSolve section
export const painPoint = defineType({
  name: 'painPoint',
  title: 'Pain Point',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Background Color Class',
      type: 'string',
      description: 'Tailwind CSS background color class (e.g., "bg-[#00171F]")',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare({title, description}) {
      return {
        title: title || 'Pain Point',
        subtitle: description || '',
      }
    },
  },
})

// Solution type for HowWeSolve section
export const solution = defineType({
  name: 'solution',
  title: 'Solution',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Background Color Class',
      type: 'string',
      description: 'Tailwind CSS background color class (e.g., "bg-[#00171F]")',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare({title, description}) {
      return {
        title: title || 'Solution',
        subtitle: description || '',
      }
    },
  },
})

// Tab type for HowItWorks section
export const ctoTab = defineType({
  name: 'ctoTab',
  title: 'CTO Tab',
  type: 'object',
  fields: [
    defineField({
      name: 'id',
      title: 'Tab ID',
      type: 'string',
      description: 'Unique identifier (e.g., "cost", "security", "automation")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Tab Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide React icon name (e.g., "DollarSign", "Shield", "Zap")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'oneLiner',
      title: 'One Liner',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'benefitsHeading',
      title: 'Benefits Heading',
      type: 'string',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'ctoFeatureStep'}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      label: 'label',
      id: 'id',
    },
    prepare({label, id}) {
      return {
        title: label || 'Tab',
        subtitle: id || '',
      }
    },
  },
})

// Feature Step type for tabs
export const ctoFeatureStep = defineType({
  name: 'ctoFeatureStep',
  title: 'CTO Feature Step',
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
        title: heading || 'Feature Step',
        media,
      }
    },
  },
})

