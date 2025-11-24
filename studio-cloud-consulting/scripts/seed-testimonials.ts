/**
 * Seed script to import testimonials into Sanity
 * 
 * Usage:
 * 1. Make sure you have SANITY_AUTH_TOKEN environment variable set
 * 2. Run: npm run seed:testimonials
 * 
 * Or use Sanity CLI:
 * sanity exec scripts/seed-testimonials.ts --with-user-token
 * 
 * Note: Images need to be uploaded manually in Sanity Studio
 * The script will create testimonials with image paths that you can then
 * upload via the Studio interface.
 */

import {getCliClient} from 'sanity/cli'
import {createClient} from '@sanity/client'
import * as path from 'path'
import * as fs from 'fs'



// Get token from environment or use getCliClient as fallback
const token = "skcAJWrDbMNmAdbCXhupMbd9Ol0qrMWg3nIEjVMEoVz6hIpt6qbcoMk1CVn9yQQUt0GVyvgSWmJBiHxju5HKffSr7m2a3PmGFwjl7wRGNkP9PikXlUrOOI97EeyVgI3yWPLCyHBhCBDuM2jay9xsc6uIVIWkM0xV3c5uxSrAqoPDFZTGUDxc"

console.log('token', token)
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
  // Path relative to project root
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

const testimonials = [
  {
    quote:
      "CloudVictor team broke down our expenses and helped us cut about 49% off our monthly AWS bill. Their detailed, data-backed report made it easy to verify and quickly act on their recommendations after a brief call. We now have more cash flow to invest in growth activities.",
    name: "Harsh Vardhan Sharma",
    title: "Chief Technical Officer",
    company: "Katha Infocom Pvt Ltd",
    image: "/testimonials/Harsh-Vardhan-Sharma.png",
    savings: "49%",
  },
  {
    quote:
      "CloudVictor team delivered outstanding results for BoloSign. We achieved a 51% reduction in our AWS bill and brought our infra in compliance with AWS Well-Architected Security pillar, AWS FTR, and SOC 2. Our security incident response time dropped from over 3 hours to just 30 minutes.",
    name: "Chirag Gupta",
    title: "Chief Technical Officer",
    company: "Bolosign",
    image: "/testimonials/Chirag-Gupta.png",
    savings: "51%",
  },
  {
    quote:
      "Cygnius team enabled us to optimize our AWS costs and provided clear, actionable insights to our tech team. Their support gave us confidence in our cloud security and unlocked cash flow for growth activities.",
    name: "Ishan Mohammed",
    title: "Founder & CEO",
    company: "Katha Infocom Pvt. Ltd.",
    image: "/testimonials/Ishan-Mohammed.png",
    savings: "35%",
  },
  {
    quote:
      "With Cygnius team on our side, I feel confident about our cloud security. They also unlocked a lot of cash flow for us to invest in growth activities.",
    name: "Paresh Deshmukh",
    title: "Founder & CEO",
    company: "Bolosign",
    image: "/testimonials/Paresh-Deshmukh.png",
    savings: "42%",
  },
  {
    quote:
      "We asked them to optimize just our OpenSearch costs. CloudVictor team analyzed and delivered a 69.45% reduction in our monthly bill. They worked with our DevOps team to implement changes phase-by-phase, ensuring smooth operations and system stability.",
    name: "Sreepad Krishnan Mavila",
    title: "Cofounder",
    company: "BotGauge",
    image: "/testimonials/Sreepad-Krishnan-Mavila.png",
    savings: "69%",
  },
  {
    quote:
      "CloudVictor team enabled us to optimize our AWS costs and guided our DevOps team with clear, actionable insights. Their support helped us improve our cloud security and unlock more resources for business growth.",
    name: "Pramin Pradeep",
    title: "Co-founder & CEO",
    company: "BotGauge",
    image: "/testimonials/Pramin-Pradeep.png",
    savings: "38%",
  },
]

async function seedTestimonials() {
  console.log('Starting to seed testimonials...\n')

  for (const testimonial of testimonials) {
    try {
      // Check if testimonial already exists (by name and company)
      const existing = await client.fetch(
        `*[_type == "testimonial" && name == $name && company == $company][0]`,
        {
          name: testimonial.name,
          company: testimonial.company,
        }
      )

      if (existing) {
        console.log(`⏭️  Skipping "${testimonial.name}" - already exists`)
        continue
      }

      // Upload image if it exists
      let imageAssetId: string | null = null
      if (testimonial.image) {
        console.log(`  Uploading image: ${testimonial.image}...`)
        imageAssetId = await uploadImageIfExists(testimonial.image)
      }

      const doc: any = {
        _type: 'testimonial',
        quote: testimonial.quote,
        name: testimonial.name,
        title: testimonial.title,
        company: testimonial.company,
        savings: testimonial.savings || undefined,
      }

      // Add image reference if uploaded successfully
      if (imageAssetId) {
        doc.image = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAssetId,
          },
        }
      }

      const result = await client.create(doc)
      console.log(`✅ Created testimonial for "${testimonial.name}" (${result._id})`)
    } catch (error) {
      console.error(`❌ Error creating testimonial for "${testimonial.name}":`, error)
    }
  }

  console.log('\n✨ Seeding complete!')
  
  // Check if any images failed to upload
  const missingImages = testimonials.filter((t) => {
    const publicPath = path.join(process.cwd(), '..', 'public', t.image)
    return !fs.existsSync(publicPath)
  })
  
  if (missingImages.length > 0) {
    console.log('\n⚠️  Some images were not found. You may need to upload them manually:')
    missingImages.forEach((t) => {
      console.log(`  - ${t.name}: ${t.image}`)
    })
  }
}

seedTestimonials().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})

