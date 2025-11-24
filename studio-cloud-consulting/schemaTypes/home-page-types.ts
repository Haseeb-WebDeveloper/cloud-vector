import {defineField, defineType} from 'sanity'

// Button type for CTAs
export const button = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Button Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Button URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'buttonType',
      title: 'Button Type',
      type: 'string',
      options: {
        list: [
          {title: 'Primary (Orange Gradient)', value: 'primary'},
          {title: 'Secondary (Outline)', value: 'secondary'},
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      url: 'url',
    },
    prepare({label, url}) {
      return {
        title: label || 'Button',
        subtitle: url || '',
      }
    },
  },
})

// Stat type for client section
export const stat = defineType({
  name: 'stat',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Stat Value',
      type: 'string',
      description: 'e.g., "10+", "$60M+", "68%"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Stat Description',
      type: 'string',
      description: 'e.g., "Companies", "Annual Savings"',
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
        title: title || 'Stat',
        subtitle: description || '',
      }
    },
  },
})

// Partner Logo type
export const partnerLogo = defineType({
  name: 'partnerLogo',
  title: 'Partner Logo',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Partner Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo Image',
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
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Alternative text for the image',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      media: 'logo',
    },
    prepare({name, media}) {
      return {
        title: name || 'Partner Logo',
        media,
      }
    },
  },
})

// Offer type for animated sections
export const offer = defineType({
  name: 'offer',
  title: 'Offer',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'subTagline',
      title: 'Sub Tagline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'feature'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'afterFeaturesText',
      title: 'Text After Features',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'tagline',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Offer',
        subtitle: subtitle || '',
      }
    },
  },
})

// Feature type for offers
export const feature = defineType({
  name: 'feature',
  title: 'Feature',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Icon name from lucide-react (e.g., "PiggyBank", "ShieldCheck", "Rocket")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Feature Text',
      type: 'text',
      rows: 3,
      description: 'Feature description. Use "→" to separate heading from description, and newlines for lists',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      text: 'text',
      icon: 'icon',
    },
    prepare({text, icon}) {
      const preview = text?.split('→')[0]?.trim() || text || 'Feature'
      return {
        title: preview,
        subtitle: icon ? `Icon: ${icon}` : '',
      }
    },
  },
})

// Animated Stat type
export const animatedStat = defineType({
  name: 'animatedStat',
  title: 'Animated Stat',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Stat Value',
      type: 'string',
      description: 'e.g., "$362k+", "40%", "80+"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Stat Label',
      type: 'string',
      description: 'e.g., "Savings delivered", "Avg Cost Reduction results"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Icon name from lucide-react',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      value: 'value',
      label: 'label',
    },
    prepare({value, label}) {
      return {
        title: value || 'Stat',
        subtitle: label || '',
      }
    },
  },
})

// Value Prop Card type
export const valuePropCard = defineType({
  name: 'valuePropCard',
  title: 'Value Prop Card',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Icon name from lucide-react (e.g., "Award", "Rocket", "DollarSign", "Server")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Card Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Card Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
    },
    prepare({title, icon}) {
      return {
        title: title || 'Value Prop',
        subtitle: icon ? `Icon: ${icon}` : '',
      }
    },
  },
})

// Chip type for get started section
export const chip = defineType({
  name: 'chip',
  title: 'Chip',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Icon name from lucide-react',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Chip Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      text: 'text',
      icon: 'icon',
    },
    prepare({text, icon}) {
      return {
        title: text || 'Chip',
        subtitle: icon ? `Icon: ${icon}` : '',
      }
    },
  },
})

// FAQ Item type
export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      question: 'question',
    },
    prepare({question}) {
      return {
        title: question || 'FAQ Item',
      }
    },
  },
})

