/**
 * Seed script to import Contact Us page content into Sanity
 *
 * Usage:
 * sanity exec scripts/seed-contact-us-page.ts --with-user-token
 *
 * Or:
 * npm run seed:contact-us-page
 */

import {getCliClient} from 'sanity/cli'
import * as path from 'path'
import * as fs from 'fs'
import {createClient} from '@sanity/client'

// Use the token provided in other scripts
const token =
  'skcAJWrDbMNmAdbCXhupMbd9Ol0qrMWg3nIEjVMEoVz6hIpt6qbcoMk1CVn9yQQUt0GVyvgSWmJBiHxju5HKffSr7m2a3PmGFwjl7wRGNkP9PikXlUrOOI97EeyVgI3yWPLCyHBhCBDuM2jay9xsc6uIVIWkM0xV3c5uxSrAqoPDFZTGUDxc'

const client = token
  ? createClient({
      projectId: 'aunx5bko',
      dataset: 'production',
      apiVersion: '2022-06-06',
      token: token,
      useCdn: false,
    })
  : getCliClient()

// Helper to upload image if it exists in public folder
async function uploadImageIfExists(imagePath: string): Promise<string | null> {
  const publicPath = path.join(process.cwd(), '..', 'public', imagePath)

  if (!fs.existsSync(publicPath)) {
    console.log(`⚠️  Image not found: ${publicPath}`)
    return null
  }

  try {
    const imageBuffer = fs.readFileSync(publicPath)
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    })
    return asset._id
  } catch (error) {
    console.error(`❌ Error uploading image ${imagePath}:`, error)
    return null
  }
}

async function seedContactUsPage() {
  console.log('Starting to seed Contact Us page content...\n')

  // Check if Contact Us page already exists
  const existing = await client.fetch(`*[_type == "contactUsPage"][0]`)

  const heroImagePath = '/hero-images/Contact us.png'
  const heroImageId = await uploadImageIfExists(heroImagePath)

  // Hero Section
  const heroSection = {
    mainHeading: 'We want to hear from you!',
    subheading: 'Be it a complaint or a suggestion or a praise! We are all ears!',
    description:
      'Talk to an AWS architect with 10+ YoE about your AWS issues to get free actionable advice & a 20-min audit of your AWS account.',
    bullets: [
      'Free Consultation Call',
      'Any AWS issue in any service',
      '10+ YoE AWS Architect',
      'Upto 69% Monthly Bill Reduction',
    ],
    ctaButtons: [
      {
        label: 'Book a call',
        url: 'https://s.cloudvictor.com/meeting-web-contactus-1',
        openInNewTab: true,
        buttonType: 'primary',
      },
      {
        label: 'Whatsapp us',
        url: 'https://s.cloudvictor.com/whatsapp-web-contactus-1',
        openInNewTab: true,
        buttonType: 'primary',
      },
      {
        label: 'Signup',
        url: 'http://app.cloudvictor.com/',
        openInNewTab: true,
        buttonType: 'primary',
      },
    ],
    phoneNumber: '+91-96255-96336',
    phoneLink: 'tel:+919625596336',
    emailAddress: 'prateek@cloudvictor.com',
    emailLink: 'mailto:prateek@cloudvictor.com',
    heroImage: heroImageId
      ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: heroImageId,
          },
          alt: 'Contact Us Hero Background',
        }
      : undefined,
  }

  // Form Section
  const formSection = {
    title: 'Get in Touch',
    description: "Fill out the form below and we'll get back to you as soon as possible.",
  }

  // SEO Fields
  const metaTitle = 'Contact Us | CloudVictor'
  const metaDescription =
    'Talk to an AWS Architect. Free consultation, WhatsApp, call, or email CloudVictor.'

  const timestamp = Date.now()

  // Build the contact us page document
  const contactUsPageDoc: any = {
    _type: 'contactUsPage',
    heroSection: {
      mainHeading: heroSection.mainHeading,
      subheading: heroSection.subheading,
      description: heroSection.description,
      bullets: heroSection.bullets,
      ctaButtons: heroSection.ctaButtons.map((btn, idx) => ({
        _key: `cta-${idx}-${timestamp}`,
        label: btn.label,
        url: btn.url,
        openInNewTab: btn.openInNewTab !== undefined ? btn.openInNewTab : true,
        buttonType: btn.buttonType || 'primary',
      })),
      phoneNumber: heroSection.phoneNumber,
      phoneLink: heroSection.phoneLink,
      emailAddress: heroSection.emailAddress,
      emailLink: heroSection.emailLink,
      heroImage: heroSection.heroImage,
    },
    formSection: {
      title: formSection.title,
      description: formSection.description,
    },
    metaTitle,
    metaDescription,
  }

  try {
    if (existing) {
      // Delete existing document and create a new one for cleaner data structure
      console.log('📝 Replacing existing Contact Us page...')
      console.log(`Current Contact Us page ID: ${existing._id}`)

      // Delete the existing document
      await client.delete(existing._id)
      console.log(`🗑️  Deleted existing Contact Us page`)
    }

    // Create new document (whether it existed or not)
    console.log('✨ Creating new Contact Us page...')
    const result = await client.create(contactUsPageDoc)
    console.log(`✅ Successfully created Contact Us page (${result._id})`)

    // Verify the creation
    const created = await client.fetch(`*[_id == "${result._id}"][0] {
      _id,
      _rev,
      heroSection {
        mainHeading,
        subheading,
        description,
        "bulletsCount": count(bullets),
        "ctaButtonsCount": count(ctaButtons),
        ctaButtons[0] {
          label,
          url
        },
        phoneNumber,
        phoneLink,
        emailAddress,
        emailLink
      },
      formSection {
        title,
        description
      },
      metaTitle,
      metaDescription
    }`)

    console.log('\n📊 Verification after creation:')
    console.log(JSON.stringify(created, null, 2))

    console.log('\n✅ Contact Us page seeded successfully!')
    console.log('\n📝 Next steps:')
    console.log('1. Go to Sanity Studio and verify the Contact Us page document')
    console.log('2. Edit any fields as needed')
    console.log('3. The page will automatically use the data from Sanity')
  } catch (error) {
    console.error('❌ Error seeding Contact Us page:', error)
    throw error
  }
}

// Run the seed function
seedContactUsPage()
  .then(() => {
    console.log('\n🎉 Seed script completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Seed script failed:', error)
    process.exit(1)
  })
