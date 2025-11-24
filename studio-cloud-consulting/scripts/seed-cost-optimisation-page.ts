/**
 * Seed script to import Cost Optimisation page content into Sanity
 * 
 * Usage:
 * sanity exec scripts/seed-cost-optimisation-page.ts --with-user-token
 * 
 * Or:
 * npm run seed:cost-optimisation-page
 */

import {getCliClient} from 'sanity/cli'
import * as path from 'path'
import * as fs from 'fs'
import {createClient} from '@sanity/client'

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

async function seedCostOptimisationPage() {
  console.log('Starting to seed Cost Optimisation page content...\n')

  // Check if Cost Optimisation page already exists
  const existing = await client.fetch(`*[_type == "costOptimisationPage"][0]`)

  // Hero Section
  const heroSection = {
    mainHeading: "Stop Overpaying AWS Unlock <span className=\"text-primary\"> Savings Up to 68%</span>",
    subheading: "All-in-one cloud cost optimisation",
    animatedTexts: ["Cost", "Size", "Configuration", "Purchase Plan"],
    animatedTextPrefix: "Optimize",
    animatedTextSuffix: "of your AWS Infrastructure",
    ctaButtons: [
      {
        label: "Book a call",
        url: "https://s.cloudvictor.com/meeting-web-finops-1",
        openInNewTab: true,
        buttonType: "primary",
      },
      {
        label: "Whatsapp Us",
        url: "https://s.cloudvictor.com/whatsapp-web-finops-1",
        openInNewTab: true,
        buttonType: "secondary",
      },
      {
        label: "Signup",
        url: "http://app.cloudvictor.com/",
        openInNewTab: true,
        buttonType: "secondary",
      },
    ],
    heroImagePath: "/images/cost-optimisation-hero-section.png",
  }

  // Upload hero image
  console.log('Uploading hero image...')
  const heroImageId = await uploadImageIfExists(heroSection.heroImagePath)

  // Client Section
  const clientSection = {
    title: "Proven Savings. Real Impact",
    stats: [
      { title: "12+", description: "Years in Amazon/AWS" },
      { title: "$60M+", description: "Annual Savings" },
      { title: "68%", description: "Max Cost Reduction" },
    ],
    partnerLogos: [],
  }

  // Industry Facts Section
  const industryFactsData = [
    {
      fact: "Organizations waste up to <span class=\"text-[#FF8703] font-semibold\">30%</span> of their cloud spend due to underutilized resources and poor governance.",
      source: "Gartner",
      report: "How to Identify and Reduce Public Cloud Waste 2024",
      imagePath: "/Cloud Spending & Waste is Escalating Fast/Gartner (How to Identify and Reduce Public Cloud Waste 2024).png",
    },
    {
      fact: "Approximately <span class=\"text-[#FF8703] font-semibold\">35%</span> of cloud spend is wasted due to overprovisioning, unused resources, and inefficient architecture.",
      source: "McKinsey & Company",
      report: "Cloud's trillion-dollar prize is up for grabs. Report",
      imagePath: "/Cloud Spending & Waste is Escalating Fast/McKinsey Company (Cloud's trillion-dollar prize is up for grabs. Report).png",
    },
    {
      fact: "82% of global organizations struggle with more than <span class=\"text-[#FF8703] font-semibold\">10%</span> of their cloud spend being wasted, and 38% experience more than <span class=\"text-[#FF8703] font-semibold\">30%</span> wastage.",
      source: "Everest Group",
      report: "Cloud Waste Survey 2024",
      imagePath: "/Cloud Spending & Waste is Escalating Fast/Everest Group (Cloud Waste Survey 2024).png",
    },
    {
      fact: "More than three-quarters <span class=\"text-[#FF8703] font-semibold\">(78%)</span> of enterprises estimate that <span class=\"text-[#FF8703] font-semibold\">21-50%</span> of their cloud spend is wasted, with preventable mistakes costing some organizations over $50,000 per month.",
      source: "Omdia",
      report: "State of Cloud Usage Optimization 2024",
      imagePath: "/Cloud Spending & Waste is Escalating Fast/Omdia (State of Cloud Usage Optimization 2024).jpg",
    },
    {
      fact: "Integrating cloud cost management practices (FinOps) into engineering processes could unlock nearly <span class=\"text-[#FF8703] font-semibold\">$120 billion</span> in value.",
      source: "McKinsey & Company",
      report: "Everything Is Better as Code: Using FinOps to Manage Cloud Costs 2025",
      imagePath: "/Cloud Spending & Waste is Escalating Fast/McKinsey  Company (Everything Is Better as Code Using FinOps to Manage Cloud Costs 2025).jpg",
    },
  ]

  // Upload industry fact images
  console.log('Uploading industry fact images...')
  const industryFactsWithImages = await Promise.all(
    industryFactsData.map(async (fact) => {
      const imageId = await uploadImageIfExists(fact.imagePath)
      
      if (!imageId) {
        console.warn(`⚠️  Warning: Image not found for ${fact.source}, skipping fact`)
        return null
      }

      return {
        _key: `fact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        fact: fact.fact,
        source: fact.source,
        report: fact.report,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageId,
          },
        },
      }
    })
  )

  const validIndustryFacts = industryFactsWithImages.filter((f) => f !== null)

  const industryFactsSection = {
    title: "Cloud Spending & Waste is Escalating Fast",
    subtitle: "Industry Facts quantifying the problem.",
    facts: validIndustryFacts,
  }

  // Root Case Section
  const rootCaseSection = {
    title: "Under The Hood of Every Bloated AWS Bill",
    videoUrl: "/videos/root-case.mp4",
  }

  // Testimonials Section (reuse from CTO page)
  const testimonialsData = [
    {
      quote: "CloudVictor team broke down our expenses and helped us cut about 49% off our monthly AWS bill. Their detailed, data-backed report made it easy to verify and quickly act on their recommendations after a brief call. We now have more cash flow to invest in growth activities.",
      name: "Harsh Vardhan Sharma",
      title: "Chief Technical Officer",
      company: "Katha Infocom Pvt Ltd",
      imagePath: "/testimonials/Harsh-Vardhan-Sharma.png",
      savings: "49%",
    },
    {
      quote: "CloudVictor team delivered outstanding results for BoloSign. We achieved a 51% reduction in our AWS bill and brought our infra in compliance with AWS Well-Architected Security pillar, AWS FTR, and SOC 2. Our security incident response time dropped from over 3 hours to just 30 minutes.",
      name: "Chirag Gupta",
      title: "Chief Technical Officer",
      company: "Bolosign",
      imagePath: "/testimonials/Chirag-Gupta.png",
      savings: "51%",
    },
    {
      quote: "Cygnius team enabled us to optimize our AWS costs and provided clear, actionable insights to our tech team. Their support gave us confidence in our cloud security and unlocked cash flow for growth activities.",
      name: "Ishan Mohammed",
      title: "Founder & CEO",
      company: "Katha Infocom Pvt. Ltd.",
      imagePath: "/testimonials/Ishan-Mohammed.png",
      savings: "35%",
    },
    {
      quote: "With Cygnius team on our side, I feel confident about our cloud security. They also unlocked a lot of cash flow for us to invest in growth activities.",
      name: "Paresh Deshmukh",
      title: "Founder & CEO",
      company: "Bolosign",
      imagePath: "/testimonials/Paresh-Deshmukh.png",
      savings: "42%",
    },
    {
      quote: "We asked them to optimize just our OpenSearch costs. CloudVictor team analyzed and delivered a 69.45% reduction in our monthly bill. They worked with our DevOps team to implement changes phase-by-phase, ensuring smooth operations and system stability.",
      name: "Sreepad Krishnan Mavila",
      title: "Cofounder",
      company: "BotGauge",
      imagePath: "/testimonials/Sreepad-Krishnan-Mavila.png",
      savings: "69%",
    },
    {
      quote: "CloudVictor team enabled us to optimize our AWS costs and guided our DevOps team with clear, actionable insights. Their support helped us improve our cloud security and unlock more resources for business growth.",
      name: "Pramin Pradeep",
      title: "Co-founder & CEO",
      company: "BotGauge",
      imagePath: "/testimonials/Pramin-Pradeep.png",
      savings: "38%",
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

      return {
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
    })
  )

  const validTestimonials = testimonialsWithImages.filter((t) => t !== null)

  const testimonialsSection = {
    title: "Results Our Customers Count On, Month After Month",
    testimonials: validTestimonials,
  }

  // Our Approach Section
  const approachStepsData = [
    {
      heading: "Exhaustive Analysis",
      oneLiner: "Across every AWS service to surface hidden waste",
      details: [
        "Identify idle, misconfigured, and overprovisioned resources.",
        "Analyze workload requirements & resource configurations.",
      ],
      imagePath: "/home-page/Exhaustive Analysis.png",
      isReversed: false,
    },
    {
      heading: "Lean Resources",
      oneLiner: "Right Size/Optimally Configure each resource",
      details: [
        "Align resource configuration with workload requirement.",
        "Configuration/Size optimized at individual resource level. E.g.",
        "EC2, RDS, Sagemaker Instance Type & Instance Size.",
        "Storage Class & Life cycle policies of your S3 data.",
      ],
      imagePath: "/home-page/Lean Resources.png",
      isReversed: true,
    },
    {
      heading: "Lean Scale your resources",
      oneLiner: "Deliver the same customer experience with fewer, fully-utilised resources.",
      details: [
        "Adjust your auto-scaling policies to minimum required while maintaining the same level of customer experience.",
        "Calculate and deploy the optimal number of resources, not more.",
        "Consolidate clusters/machines to remove excess hardware.",
      ],
      imagePath: "/home-page/Lean Scale your resources.png",
      isReversed: false,
    },
    {
      heading: "Pay the Lowest Possible Price for AWS",
      oneLiner: "Balance commitment & discount for best price.",
      details: [
        "Analyse every purchase option & your planned usage.",
        "Purchase commitment strategy engineered for maximum ROI with minimum commitment risk.",
        "We analyze 1000's of Reserved Instances, Savings Plans, and Private Pricing options for you.",
      ],
      imagePath: "/home-page/Pay the Lowest Possible Price for AWS.png",
      isReversed: true,
    },
    {
      heading: "Sustained Savings, Guaranteed.",
      oneLiner: "Sustained monthly savings verified on Your Bill.",
      details: [
        "Transparent verification with your AWS account's Cost Explorer and CUR data.",
        "Guardrails ensure that we (& you) are alarmed if costs are creeping back over time.",
        "100% ROI in 3 months - guaranteed.",
      ],
      imagePath: "/home-page/Sustained Savings, Guaranteed..png",
      isReversed: false,
    },
  ]

  // Upload approach step images
  console.log('Uploading approach step images...')
  const approachStepsWithImages = await Promise.all(
    approachStepsData.map(async (step) => {
      const imageId = await uploadImageIfExists(step.imagePath)
      
      if (!imageId) {
        console.warn(`⚠️  Warning: Image not found for ${step.heading}, skipping step`)
        return null
      }

      return {
        _key: `approach-step-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        heading: step.heading,
        oneLiner: step.oneLiner,
        details: step.details,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageId,
          },
        },
        isReversed: step.isReversed || false,
      }
    })
  )

  const validApproachSteps = approachStepsWithImages.filter((s) => s !== null)

  const ourApproachSection = {
    title: "Our Unique Approach to Cloud Cost Optimization",
    subtitle: "Our method optimizes efficiency at every level so that your savings scale with your business, not your costs.",
    steps: validApproachSteps,
  }

  // Get Started Section
  const getStartedSection = {
    logoPath: "/logo/cloudVictor-logo-Icon.png",
    heading: "Turn Your AWS infrastructure from Cost Center to Secret Growth Engine.",
    bodyText: "We optimize, automate, and secure your cloud - so your team can focus on building, not firefighting.",
    chips: [
      { icon: "BarChart3", text: "Metric-Driven, Verified Results" },
      { icon: "CheckCircle", text: "100% ROI Guarantee" },
      { icon: "Users", text: "Built by Amazon Veterans" },
      { icon: "Sparkles", text: "Tailored Service" },
    ],
    ctaButtons: [
      {
        label: "Schedule a Free Audit",
        url: "https://s.cloudvictor.com/meeting-web-finops-2",
        openInNewTab: true,
        buttonType: "primary",
      },
      {
        label: "Chat on WhatsApp",
        url: "https://s.cloudvictor.com/whatsapp-web-finops-2",
        openInNewTab: true,
        buttonType: "secondary",
      },
      {
        label: "Signup",
        url: "http://app.cloudvictor.com/",
        openInNewTab: true,
        buttonType: "primary",
      },
    ],
    backgroundImagePath: "/cta-bg.jpg",
    whatsappLink: "https://s.cloudvictor.com/whatsapp-web-finops-2",
    scheduleLink: "https://s.cloudvictor.com/meeting-web-finops-2",
  }

  // Upload get started section images
  console.log('Uploading get started section images...')
  const logoImageId = await uploadImageIfExists(getStartedSection.logoPath)
  const backgroundImageId = await uploadImageIfExists(getStartedSection.backgroundImagePath)

  // Steps Section
  const stepsData = [
    {
      headline: "Confidentiality First. Access in Minutes.",
      duration: "30 mins",
      points: [
        "E-sign a NDA to protect your company's confidentiality.",
        "Single-Click Deploy our CloudFormation stack.",
        "Grants Read-only access to your infrastructure metadata.",
        "No access to your actual data/instances/files.",
        "Zero disruption to production workloads.",
        "Small engagement fee, adjusted against final deliverables.",
      ],
      iconName: "Shield",
      imagePath: "/How do we do it/Step 1 Confidentiality First. Access in Minutes..png",
    },
    {
      headline: "Exhaustive Resource Audit",
      duration: "12-15 days",
      points: [
        "Every $ traced to actual resource and classified as idle/ misconfigured/ overprovisioned.",
        "For each workload, we analyze 1000+ config combination & workload' requirements to determine the most cost-effective configs + resource counts + purchase options.",
      ],
      iconName: "Search",
      imagePath: "/How do we do it/Step 2 Exhaustive Resource Audit.jpg",
    },
    {
      headline: "Your Costs & Savings, Clearly Mapped",
      duration: "2-3 days",
      points: [
        "Summary report shared: Service-wise spends & guaranteed saving % possible.",
        "One cost-saving area detailed with impact, metrics, root cause and step-by-step solution.",
        "Summary Report with in-depth research, data-backed insights, and transparent solutions for a key cost-saving area",
        "Implementation with your DevOps team, showing verified savings in AWS Cost Explorer within 2–3 days",
        "This acts as a trust builder exercise between CloudVictor & customer.",
      ],
      iconName: "BarChart3",
      imagePath: "/How do we do it/Step 3 Your Costs & Savings, Clearly Mapped.png",
    },
    {
      headline: "No Savings, No Fee - Simple.",
      duration: "Immediate",
      points: [
        "Our model is 100% success-based: If you don't see savings in your bill, you don't pay.",
        "Total fee = 25% of annual savings visible in your bill (one-time, no recurring charges).",
        "Split into 2 installments: first 50% now, balance after final verification of delivered savings in your AWS bill.",
        "Every dollar you pay is recovered within 3 months of optimisation.",
        "Backed by a 100% money-back guarantee if verified savings don't match our promise.",
      ],
      iconName: "DollarSign",
      imagePath: "/How do we do it/Step 4 No Savings, No Fee - Simple..jpg",
    },
    {
      headline: "Implement Data-Backed Recommendations",
      duration: "Ongoing",
      points: [
        "Review all the cost saving areas between both the teams.",
        "Your Dev(Ops) team executes all approved right-configure/right-sizing recommendation.",
        "CloudVictor supports your Dev(Ops) team with POC code + hands-on guidance at every step.",
      ],
      iconName: "Settings",
      imagePath: "/How do we do it/Step 5 Implement Data-Backed Recommendations.png",
    },
    {
      headline: "Savings Verification with your AWS Bill.",
      duration: "Final",
      points: [
        "Final verification report with before/after data from AWS CUR, Cost Explorer & Bill.",
        "Guaranteed 100% ROI in 3 months — or your money back.",
        "Alarms set up to alert both teams of cost creeps.",
        "Savings achieved scale as your AWS usage expands since unit level efficiency is maximized.",
        "Successful delivery with remaining 50% payment, completing a results-driven partnership.",
      ],
      iconName: "FileCheck",
      imagePath: "/How do we do it/Step 6 Savings Verification with your AWS Bill..png",
    },
  ]

  // Upload step images
  console.log('Uploading step images...')
  const stepsWithImages = await Promise.all(
    stepsData.map(async (step) => {
      const imageId = await uploadImageIfExists(step.imagePath)
      
      if (!imageId) {
        console.warn(`⚠️  Warning: Image not found for ${step.headline}, skipping step`)
        return null
      }

      return {
        _key: `step-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        headline: step.headline,
        duration: step.duration,
        points: step.points,
        iconName: step.iconName,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageId,
          },
        },
      }
    })
  )

  const validSteps = stepsWithImages.filter((s) => s !== null)

  const stepsSection = {
    title: "How do we do it?",
    subtitle: "Six steps that transform hidden costs into sustained savings.",
    steps: validSteps,
  }

  // Build the complete Cost Optimisation page document
  console.log('\n📦 Building Cost Optimisation page document structure...')
  console.log(`  Hero section: ${heroSection.animatedTexts.length} animated texts`)
  console.log(`  Client section: ${clientSection.stats.length} stats`)
  console.log(`  Industry Facts: ${validIndustryFacts.length} facts`)
  console.log(`  Testimonials: ${validTestimonials.length} testimonials`)
  console.log(`  Approach Steps: ${validApproachSteps.length} steps`)
  console.log(`  Steps: ${validSteps.length} steps`)
  
  const timestamp = Date.now()
  
  const costOptimisationPageDoc: any = {
    _type: 'costOptimisationPage',
    heroSection: {
      mainHeading: heroSection.mainHeading,
      subheading: heroSection.subheading,
      animatedTexts: heroSection.animatedTexts,
      animatedTextPrefix: heroSection.animatedTextPrefix,
      animatedTextSuffix: heroSection.animatedTextSuffix,
      ctaButtons: heroSection.ctaButtons.map((btn, idx) => ({
        _key: `cta-${idx}-${timestamp}`,
        label: btn.label,
        url: btn.url,
        openInNewTab: btn.openInNewTab !== undefined ? btn.openInNewTab : true,
        buttonType: btn.buttonType || 'primary',
      })),
      heroImage: heroImageId
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: heroImageId,
            },
          }
        : undefined,
    },
    clientSection: {
      title: clientSection.title,
      stats: clientSection.stats.map((stat, idx) => ({
        _key: `stat-${idx}-${timestamp}`,
        title: stat.title,
        description: stat.description,
      })),
      partnerLogos: clientSection.partnerLogos || [],
    },
    industryFactsSection: {
      title: industryFactsSection.title,
      subtitle: industryFactsSection.subtitle,
      facts: industryFactsSection.facts,
    },
    rootCaseSection: {
      title: rootCaseSection.title,
      videoUrl: rootCaseSection.videoUrl,
    },
    testimonialsSection: {
      title: testimonialsSection.title,
      testimonials: testimonialsSection.testimonials,
    },
    ourApproachSection: {
      title: ourApproachSection.title,
      subtitle: ourApproachSection.subtitle,
      steps: ourApproachSection.steps,
    },
    getStartedSection: {
      logo: logoImageId
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: logoImageId,
            },
          }
        : undefined,
      heading: getStartedSection.heading,
      bodyText: getStartedSection.bodyText,
      chips: getStartedSection.chips.map((chip, idx) => ({
        _key: `chip-${idx}-${timestamp}`,
        icon: chip.icon,
        text: chip.text,
      })),
      ctaButtons: getStartedSection.ctaButtons.map((btn, idx) => ({
        _key: `getstarted-cta-${idx}-${timestamp}`,
        label: btn.label,
        url: btn.url,
        openInNewTab: btn.openInNewTab !== undefined ? btn.openInNewTab : true,
        buttonType: btn.buttonType || 'primary',
      })),
      backgroundImage: backgroundImageId
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: backgroundImageId,
            },
          }
        : undefined,
      whatsappLink: getStartedSection.whatsappLink,
      scheduleLink: getStartedSection.scheduleLink,
    },
    stepsSection: {
      title: stepsSection.title,
      subtitle: stepsSection.subtitle,
      steps: stepsSection.steps,
    },
    metaTitle: "Cost Optimisation Page - Cloud Victor",
    metaDescription: "Stop overpaying AWS. Unlock savings up to 68% with Cloud Victor's all-in-one cloud cost optimisation solution.",
  }

  try {
    if (existing) {
      console.log('📝 Replacing existing Cost Optimisation page...')
      console.log(`Current Cost Optimisation page ID: ${existing._id}`)
      
      await client.delete(existing._id)
      console.log(`🗑️  Deleted existing Cost Optimisation page`)
    }
    
    console.log('✨ Creating new Cost Optimisation page...')
    const result = await client.create(costOptimisationPageDoc)
    console.log(`✅ Successfully created Cost Optimisation page (${result._id})`)
    
    console.log('\n✨ Cost Optimisation page seeding complete!')
    console.log('\n📋 Summary:')
    console.log(`  - Hero section: ✅ (${heroSection.animatedTexts.length} animated texts, ${heroSection.ctaButtons.length} CTA buttons)`)
    console.log(`  - Client section: ✅ (${clientSection.stats.length} stats)`)
    console.log(`  - Industry Facts section: ✅ (${validIndustryFacts.length} facts)`)
    console.log(`  - Root Case section: ✅`)
    console.log(`  - Testimonials section: ✅ (${validTestimonials.length} testimonials)`)
    console.log(`  - Our Approach section: ✅ (${validApproachSteps.length} steps)`)
    console.log(`  - Get Started section: ✅ (${getStartedSection.chips.length} chips, ${getStartedSection.ctaButtons.length} CTA buttons)`)
    console.log(`  - Steps section: ✅ (${validSteps.length} steps)`)
    console.log('\n📝 Next steps:')
    console.log('  1. Go to Sanity Studio and open the Cost Optimisation Page document')
    console.log('  2. Verify all sections are populated with content')
    console.log('  3. Review and adjust any content as needed')
  } catch (error) {
    console.error('❌ Error seeding Cost Optimisation page:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message)
      console.error('Stack:', error.stack)
    }
    throw error
  }
}

// Run the seed function
seedCostOptimisationPage().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})

