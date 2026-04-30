/**
 * Seed script to import homepage content into Sanity
 *
 * Usage:
 * sanity exec scripts/seed-homepage.ts --with-user-token
 *
 * Or:
 * npm run seed:homepage
 */

import {getCliClient} from 'sanity/cli'
import * as path from 'path'
import * as fs from 'fs'
import {createClient} from '@sanity/client'

// Get token from environment or use getCliClient as fallback
const token =
  'skcAJWrDbMNmAdbCXhupMbd9Ol0qrMWg3nIEjVMEoVz6hIpt6qbcoMk1CVn9yQQUt0GVyvgSWmJBiHxju5HKffSr7m2a3PmGFwjl7wRGNkP9PikXlUrOOI97EeyVgI3yWPLCyHBhCBDuM2jay9xsc6uIVIWkM0xV3c5uxSrAqoPDFZTGUDxc'

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

async function seedHomePage() {
  console.log('Starting to seed homepage content...\n')

  // Check if homepage already exists
  const existing = await client.fetch(`*[_type == "homePage"][0]`)

  const heroImagePath = '/hero-images/Homepage(1).png'
  const heroImageId = await uploadImageIfExists(heroImagePath)

  // Hero Section
  const heroSection = {
    mainHeading: 'Turn your AWS into your weapon With',
    animatedTexts: [
      '40-70% Cost Savings',
      'Always-On Security',
      'Tailored Launchpad',
      'Performance at Scale',
      'Lightning-Fast Dev Delivery',
      'Disaster-Proof Resilience',
    ],
    subheading:
      'Trusted by 15+ customers, driving $362K+ in yearly savings with 13+ years of AWS and Amazon expertise.',
    ctaButtons: [
      {
        label: 'Book a call',
        url: 'https://s.cloudvictor.com/meeting-web-home-1',
        openInNewTab: true,
        buttonType: 'primary',
      },
      {
        label: 'Whatsapp Us',
        url: 'https://s.cloudvictor.com/whatsapp-w-home-1',
        openInNewTab: true,
        buttonType: 'secondary',
      },
      {
        label: 'Signup',
        url: 'http://app.cloudvictor.com/',
        openInNewTab: true,
        buttonType: 'secondary',
      },
    ],
    heroImage: heroImageId
      ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: heroImageId,
          },
          alt: 'Homepage Hero Background',
        }
      : undefined,
  }

  // Client Section
  const clientSection = {
    title: 'Proven Savings. Real Impact',
    stats: [
      {title: '10+', description: 'Companies'},
      {title: '12+', description: 'Years in Amazon/AWS'},
      {title: '$60M+', description: 'Annual Savings'},
      {title: '68%', description: 'Annual Savings'},
    ],
    partnerLogos: [
      {name: 'Partner 1', alt: 'Partner 1', logoPath: '/Partners-logos/1.png'},
      {name: 'Partner 2', alt: 'Partner 2', logoPath: '/Partners-logos/2.png'},
      {name: 'Partner 3', alt: 'Partner 3', logoPath: '/Partners-logos/3.png'},
      {name: 'Partner 4', alt: 'Partner 4', logoPath: '/Partners-logos/4.png'},
      {name: 'Partner 5', alt: 'Partner 5', logoPath: '/Partners-logos/5.png'},
      {name: 'Partner 6', alt: 'Partner 6', logoPath: '/Partners-logos/6.png'},
      {name: 'Partner 7', alt: 'Partner 7', logoPath: '/Partners-logos/7.png'},
      {name: 'Partner 8', alt: 'Partner 8', logoPath: '/Partners-logos/8.png'},
      {name: 'Partner 9', alt: 'Partner 9', logoPath: '/Partners-logos/9.png'},
      {name: 'Partner 10', alt: 'Partner 10', logoPath: '/Partners-logos/10.png'},
    ],
  }

  // Upload partner logos
  console.log('Uploading partner logos...')
  const partnerLogosWithImages = await Promise.all(
    clientSection.partnerLogos.map(async (logo) => {
      const imageId = await uploadImageIfExists(logo.logoPath)
      return {
        name: logo.name,
        alt: logo.alt,
        logo: imageId
          ? {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageId,
              },
            }
          : undefined,
      }
    }),
  )

  // Animated Sections
  const animatedSections = {
    mainTitle: 'Optimize. Secure. Accelerate, Disaster-proof, Scale — AWS Done Right.',
    offers: [
      {
        title: 'Run cloud the way Amazon does',
        headline: 'Run cloud the way Amazon does',
        tagline: '',
        features: [
          {icon: 'PiggyBank', text: 'Use less of cloud and pay less for it →'},
          {icon: 'ShieldCheck', text: '24x7 InfoSec Team →'},
          {icon: 'BadgeCheck', text: '100% Uptime That Builds Trust →'},
          {icon: 'Rocket', text: 'Lightning-fast Customer Experience →'},
          {icon: 'Clock', text: 'Daily Releases on Autopilot. →'},
        ],
        afterFeaturesText: 'Five pillars, one mission - Make your cloud work BETTER for YOU!.',
      },
      {
        title: 'Cost & Performance Optimization',
        headline: 'Use less of cloud and pay less for it',
        tagline:
          'Unlock 40–70% savings with our data-backed approach, continuously optimized as you grow.',
        features: [
          {
            icon: 'Check',
            text: 'Exhaustive Audit → Every dollar tracked.\nEvery AWS Service Covered.',
          },
          {
            icon: 'Clock',
            text: 'Fast Fixes → Rightsize, Reconfigure, Smarter Purchase Plans.\nMinimal code change.',
          },
          {
            icon: 'DollarSign',
            text: 'Success-Based Fees → One-time outcome-based Fees.\nNo recurring subscription.',
          },
          {
            icon: 'TrendingUp',
            text: 'Guaranteed ROI → 100% ROI in 3 months by Design.\nSustained savings that scale as you grow.',
          },
        ],
      },
      {
        title: 'Devops',
        headline: '100% Uptime That Builds Trust',
        tagline:
          "IaC & CI/CD backed Serverless Containerized Architectures. Just like Amazon's own systems. Tailored for You.",
        features: [
          {
            icon: 'Rocket',
            text: 'Tailored Launchpad → Aligned with your needs.\nPerformance, Security, and Compliance',
          },
          {
            icon: 'Check',
            text: "Performance, Security, and Compliance → Amazon's Best Practices built-in By Design\nCost-Efficient\nSecurity-Compliant\nScalable",
          },
          {
            icon: 'Server',
            text: 'Next-Gen Foundations →\n Serverless, Containerized\n AWS-native By Design',
          },
          {
            icon: 'Award',
            text: 'Proven Reliability → 80+ production launches\nAcross 300+ AWS Accounts.\nSaaS, FinTech, and enterprise workloads.',
          },
        ],
      },
      {
        title: 'Secops',
        headline: '24x7 InfoSec Team',
        tagline: 'Your team builds in peace while we guard.',
        features: [
          {
            icon: 'ShieldCheck',
            text: 'Continuous Monitoring → Real-time scans\nCatch security gaps before exploits.',
          },
          {
            icon: 'BadgeCheck',
            text: 'Compliance-First → SOC2, HIPAA, GDPR + 15 more.\nEnforced by Design.',
          },
          {
            icon: 'Award',
            text: 'Intruder Defense → Instant alerts on suspicious activity. Internal or External.\nWe stand Guard for you!',
          },
        ],
      },
      {
        title: 'Resilience and disaster recovery',
        headline: 'Lightning-fast Customer Experience.',
        tagline: 'Disaster Resistant with Automated Recovery',
        features: [
          {icon: 'LifeBuoy', text: 'Self-Healing. →'},
          {icon: 'Rocket', text: 'Blue/Green Deployments →'},
          {icon: 'Clock', text: 'Automated Rollbacks. →'},
          {icon: 'ShieldCheck', text: 'Automated Cross-Account Backups. →'},
        ],
      },
      {
        title: 'Performance',
        headline: 'Daily Releases on Autopilot',
        tagline: 'Fluid Customer Experience. Higher Retention. Higher Revenue.',
        features: [
          {icon: 'TrendingUp', text: 'Upto 70% faster page/app loads.'},
          {icon: 'Users', text: '25% increase in customer NPS.'},
          {icon: 'Award', text: 'Avg 15% boost in revenue.'},
        ],
      },
    ],
    statsTitle: 'Results That Speak Volumes',
    statsSubtitle: "Numbers don't lie — here's the impact we've delivered",
    stats: [
      {value: '$362k+', label: 'Savings delivered', icon: 'PiggyBank'},
      {value: '40%', label: 'Avg Cost Reduction results', icon: 'BarChart3'},
      {value: '68%', label: 'Max Cost Reduction results', icon: 'Percent'},
      {value: '80+', label: 'Production launches', icon: 'Rocket'},
      {value: '300+', label: 'AWS accounts under management', icon: 'Server'},
      {value: '15+', label: 'Compliance standards', icon: 'ShieldCheck'},
      {value: '12+', label: 'Years at Amazon/AWS', icon: 'Users'},
      {value: '100%', label: 'ROI in 3 months', icon: 'TrendingUp'},
    ],
    stepImages: [
      '/home-page/updated-01.png',
      '/home-page/updated-02.png',
      '/home-page/updated-03.png',
      '/home-page/updated-04.png',
      '/home-page/updated-05.png',
      '/home-page/updated-06.png',
    ],
    centerImagePath: '/home-page/middle-center-one.png',
  }

  // Upload animated section images
  console.log('Uploading animated section images...')
  const centerImageId = await uploadImageIfExists(animatedSections.centerImagePath)
  const stepImageIds = await Promise.all(
    animatedSections.stepImages.map((imgPath) => uploadImageIfExists(imgPath)),
  )

  // Value Props Section
  const valuePropsSection = {
    title: 'We are Different!',
    cards: [
      {
        icon: 'Award',
        title: 'Built by a 12-Year AWS/Amazon Veteran',
        description:
          'Led by a former Amazon engineer who spent 12+ years building and optimizing large-scale AWS systems powering global products. The same expertise now powers your cloud.',
      },
      {
        icon: 'Rocket',
        title: 'Results in Days, Not Months',
        description:
          "Our automation-first approach delivers measurable ROI fast- whether it's AWS savings, tighter security, or faster delivery. No endless audits. Just outcomes that show up quickly.",
      },
      {
        icon: 'DollarSign',
        title: '100% Success-Based Billing',
        description:
          'You pay only for the savings or performance gains we deliver. No retainers. No hidden fees. Just aligned incentives and verified impact - dollar for dollar.',
      },
      {
        icon: 'Server',
        title: 'Tailored Launchpad. Proven Reliability.',
        description:
          'Every architecture is designed for cost-efficiency, security, performance, and compliance from Day 1. Built on next-gen foundations - serverless, containerized, and AWS-native - backed by 80+ launches across 300+ AWS accounts.',
      },
    ],
  }

  // Get Started Section
  const getStartedSection = {
    logoPath: '/logo/cloudVictor-logo-Icon.png',
    heading: 'Turn Your AWS infrastructure from Cost Center to Secret Growth Engine.',
    bodyText:
      'We optimize, automate, and secure your cloud - so your team can focus on building, not firefighting.',
    chips: [
      {icon: 'BarChart3', text: 'Metric-Driven, Verified Results'},
      {icon: 'CheckCircle', text: '100% ROI Guarantee'},
      {icon: 'Users', text: 'Built by Amazon Veterans'},
      {icon: 'Sparkles', text: 'Tailored Service'},
    ],
    ctaButtons: [
      {
        label: 'Schedule a Free Audit',
        url: 'https://s.cloudvictor.com/meeting-web-home-2',
        openInNewTab: true,
        buttonType: 'primary',
      },
      {
        label: 'Chat on WhatsApp',
        url: 'https://s.cloudvictor.com/whatsapp-w-home-2',
        openInNewTab: true,
        buttonType: 'secondary',
      },
      {
        label: 'Signup',
        url: 'http://app.cloudvictor.com/',
        openInNewTab: true,
        buttonType: 'primary',
      },
    ],
    backgroundImagePath: '/cta-bg.jpg',
  }

  // Upload get started section images
  console.log('Uploading get started section images...')
  const logoImageId = await uploadImageIfExists(getStartedSection.logoPath)
  const backgroundImageId = await uploadImageIfExists(getStartedSection.backgroundImagePath)

  // Testimonials Section
  const testimonialsData = [
    {
      quote:
        'CloudVictor team broke down our expenses and helped us cut about 49% off our monthly AWS bill. Their detailed, data-backed report made it easy to verify and quickly act on their recommendations after a brief call. We now have more cash flow to invest in growth activities.',
      name: 'Harsh Vardhan Sharma',
      title: 'Chief Technical Officer',
      company: 'Katha Infocom Pvt Ltd',
      imagePath: '/testimonials/Harsh-Vardhan-Sharma.png',
      savings: '49%',
    },
    {
      quote:
        'CloudVictor team delivered outstanding results for BoloSign. We achieved a 51% reduction in our AWS bill and brought our infra in compliance with AWS Well-Architected Security pillar, AWS FTR, and SOC 2. Our security incident response time dropped from over 3 hours to just 30 minutes.',
      name: 'Chirag Gupta',
      title: 'Chief Technical Officer',
      company: 'Bolosign',
      imagePath: '/testimonials/Chirag-Gupta.png',
      savings: '51%',
    },
    {
      quote:
        'Cygnius team enabled us to optimize our AWS costs and provided clear, actionable insights to our tech team. Their support gave us confidence in our cloud security and unlocked cash flow for growth activities.',
      name: 'Ishan Mohammed',
      title: 'Founder & CEO',
      company: 'Katha Infocom Pvt. Ltd.',
      imagePath: '/testimonials/Ishan-Mohammed.png',
      savings: '35%',
    },
    {
      quote:
        'With Cygnius team on our side, I feel confident about our cloud security. They also unlocked a lot of cash flow for us to invest in growth activities.',
      name: 'Paresh Deshmukh',
      title: 'Founder & CEO',
      company: 'Bolosign',
      imagePath: '/testimonials/Paresh-Deshmukh.png',
      savings: '42%',
    },
    {
      quote:
        'We asked them to optimize just our OpenSearch costs. CloudVictor team analyzed and delivered a 69.45% reduction in our monthly bill. They worked with our DevOps team to implement changes phase-by-phase, ensuring smooth operations and system stability.',
      name: 'Sreepad Krishnan Mavila',
      title: 'Cofounder',
      company: 'BotGauge',
      imagePath: '/testimonials/Sreepad-Krishnan-Mavila.png',
      savings: '69%',
    },
    {
      quote:
        'CloudVictor team enabled us to optimize our AWS costs and guided our DevOps team with clear, actionable insights. Their support helped us improve our cloud security and unlock more resources for business growth.',
      name: 'Pramin Pradeep',
      title: 'Co-founder & CEO',
      company: 'BotGauge',
      imagePath: '/testimonials/Pramin-Pradeep.png',
      savings: '38%',
    },
  ]

  // Upload testimonial images
  console.log('Uploading testimonial images...')
  const testimonialsWithImages = await Promise.all(
    testimonialsData.map(async (testimonial) => {
      const imageId = await uploadImageIfExists(testimonial.imagePath)

      if (!imageId) {
        console.warn(`⚠️  Warning: Image not found for ${testimonial.name}, skipping testimonial`)
        return null
      }

      // Structure matches the schema: array of objects with quote, name, title, company, image, savings
      // For inline objects in arrays, Sanity auto-generates _key, but we can provide it for better control
      return {
        _type: 'testimonial',
        _key: `testimonial-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        quote: testimonial.quote,
        name: testimonial.name,
        title: testimonial.title,
        company: testimonial.company,
        savings: testimonial.savings || undefined,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageId,
          },
        },
      }
    }),
  )

  // Filter out null values (testimonials without images)
  const validTestimonials = testimonialsWithImages.filter((t) => t !== null)

  if (validTestimonials.length === 0) {
    console.warn('⚠️  No valid testimonials with images found!')
  } else {
    console.log(`✅ Prepared ${validTestimonials.length} testimonials with images`)
  }

  const testimonialsSection = {
    title: 'Results Our Customers Count On, Month After Month',
    testimonials: validTestimonials,
  }

  // FAQ Section
  const faqSection = {
    title: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'How quickly can you identify cost savings, and how much can be saved?',
        answer:
          'Most businesses uncover 20–68% in AWS savings within the first month through rightsizing, Reserved Instances/Savings Plans, and eliminating idle resources.',
      },
      {
        question: 'Do you support all AWS accounts, regions, and resource types?',
        answer:
          'Yes—our solution integrates with Cost Optimization Hub and Compute Optimizer to cover EC2, RDS, EBS, Fargate, DynamoDB, and more.',
      },
      {
        question: 'What kinds of threats and misconfigurations do you detect?',
        answer:
          'We continuously monitor AWS API activity, IAM permissions, public access policies, resource misconfigurations, and suspicious behavior—providing 24×7 threat detection with automated alerts and remediation.',
      },
      {
        question: 'How do you ensure compliance and best practices?',
        answer:
          'Our platform maps to industry frameworks (e.g. CIS, PCI, NIST), audits IAM, encryption, logging and access policies, and secures your architecture end-to-end.',
      },
      {
        question: 'How is scaling managed across EC2, ECS, and managed services?',
        answer:
          'We leverage intelligent auto-scaling plans—including predictive and target-tracking—to dynamically adjust EC2, ECS, DynamoDB, and more, ensuring uptime and cost-efficiency.',
      },
      {
        question: 'What happens during traffic spikes or instance failures?',
        answer:
          'Our auto-scaling setup not only adds capacity but also replaces unhealthy instances, ensuring high availability, fault tolerance, and zero human intervention.',
      },
      {
        question: 'How does this integrate with our infrastructure and workflows?',
        answer:
          'We integrate via IAM roles for cross-account visibility, our agent-less API-driven monitoring, and seamless CI/CD toolchain support—no heavy agents or refactoring required.',
      },
      {
        question: 'What kind of reporting and alerts can we expect?',
        answer:
          'Get real‑time dashboards, weekly savings/security/performance reports, Slack/email alerts, and strategy reviews. All data is stored for audits and continuous improvement.',
      },
      {
        question: 'Who should use this service—finance, dev, ops teams?',
        answer:
          'Perfect for cross-functional teams: FinOps tracks savings, DevOps accelerates releases, and security teams monitor risk—all with shared dashboards and actionable alerts.',
      },
      {
        question: 'How fast can we see ROI & reduce cloud toil?',
        answer:
          'Most clients see ROI in 4–8 weeks and reclaim 10–30 hours/month from engineering teams once cost, security, and scaling automation takes over.',
      },
    ],
  }

  // Build the homepage document
  const homePageDoc: any = {
    _type: 'homePage',
    heroSection,
    clientSection: {
      ...clientSection,
      partnerLogos: partnerLogosWithImages,
    },
    animatedSections: {
      ...animatedSections,
      centerImage: centerImageId
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: centerImageId,
            },
          }
        : undefined,
      stepImages: stepImageIds
        .filter((id) => id !== null)
        .map((id) => ({
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: id,
          },
        })),
    },
    valuePropsSection,
    getStartedSection: {
      ...getStartedSection,
      logo: logoImageId
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: logoImageId,
            },
          }
        : undefined,
      backgroundImage: backgroundImageId
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: backgroundImageId,
            },
          }
        : undefined,
    },
    testimonialsSection,
    faqSection,
  }

  try {
    if (existing) {
      // Update existing homepage - update ALL sections to ensure full data sync
      console.log('Updating existing homepage with full data...')
      console.log(`Current homepage ID: ${existing._id}`)

      // Create a clean document for updating
      const cleanDoc = {...homePageDoc}
      delete cleanDoc._type // Don't try to change the type

      const patch = client.patch(existing._id).set(cleanDoc)
      const result = await patch.commit()

      console.log(`✅ Updated homepage document (${result._id})`)
      
      // Also check if there's a draft and update it too if it exists
      // This ensures the user sees the changes in Sanity Studio immediately
      if (!existing._id.startsWith('drafts.')) {
        const draftId = `drafts.${existing._id}`
        try {
          console.log(`Checking for draft document: ${draftId}...`)
          const draft = await client.fetch(`*[_id == $draftId][0]`, {draftId})
          if (draft) {
            console.log('Updating existing draft to match...')
            await client.patch(draftId).set(cleanDoc).commit()
            console.log('✅ Updated draft document')
          }
        } catch (e) {
          console.log('No draft to update or error updating draft.')
        }
      }

      console.log(`✅ Updated homepage content (${result._id})`)
      console.log(`   Testimonials count: ${testimonialsSection.testimonials.length}`)

      // Verify the update - fetch full testimonials to see structure
      const updated = await client.fetch(`*[_id == "${existing._id}"][0] {
        testimonialsSection {
          title,
          "testimonialsCount": count(testimonials),
          testimonials[] {
            _key,
            name,
            title,
            company,
            quote,
            savings,
            "hasImage": defined(image),
            image {
              asset-> {
                _id,
                url
              }
            }
          }
        }
      }`)
      console.log('\n📊 Verification after update:')
      console.log(JSON.stringify(updated, null, 2))

      if (updated?.testimonialsSection?.testimonialsCount === 0) {
        console.warn('\n⚠️  WARNING: Testimonials array appears to be empty after update!')
        console.warn('This might be a Sanity Studio display issue. Try refreshing the Studio.')
      } else {
        console.log(
          `\n✅ Successfully saved ${updated?.testimonialsSection?.testimonialsCount || 0} testimonials`,
        )
      }
    } else {
      // Create new homepage
      console.log('Creating new homepage...')
      const result = await client.create(homePageDoc)
      console.log(`✅ Created homepage (${result._id})`)
      console.log(`   Testimonials count: ${testimonialsSection.testimonials.length}`)
    }

    console.log('\n✨ Homepage seeding complete!')
    console.log('\n📝 Next steps:')
    console.log('  1. Go to Sanity Studio and open the Home Page document')
    console.log('  2. Check the Testimonials Section to verify testimonials are displayed')
    console.log('  3. Review and adjust any content as needed')
  } catch (error) {
    console.error('❌ Error seeding homepage:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message)
      console.error('Stack:', error.stack)
    }
    throw error
  }
}

seedHomePage().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
