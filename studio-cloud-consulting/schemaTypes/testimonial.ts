import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 5,
      description: 'The testimonial quote',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Person Name',
      type: 'string',
      description: 'Full name of the person giving the testimonial',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Person Title',
      type: 'string',
      description: 'e.g., "Chief Technical Officer", "Founder & CEO", "Co-founder & CEO"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'Company name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Person Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Photo of the person',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'savings',
      title: 'Savings Percentage',
      type: 'string',
      description: 'Optional: e.g., "49%", "51%", "69%" - Cost reduction percentage',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      company: 'company',
      savings: 'savings',
      media: 'image',
    },
    prepare({name, company, savings, media}) {
      return {
        title: name || 'Testimonial',
        subtitle: `${company || ''}${savings ? ` • ${savings} savings` : ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
})

