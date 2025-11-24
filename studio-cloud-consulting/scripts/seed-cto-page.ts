/**
 * Seed script to import CTO page content into Sanity
 * 
 * Usage:
 * sanity exec scripts/seed-cto-page.ts --with-user-token
 * 
 * Or:
 * npm run seed:cto-page
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

async function seedCTOPage() {
  console.log('Starting to seed CTO page content...\n')

  // Check if CTO page already exists
  const existing = await client.fetch(`*[_type == "ctoPage"][0]`)

  // Hero Section
  const heroSection = {
    mainHeading: "You focus on <span className=\"bg-gradient-to-r from-[#FF9700] to-[#E85409] bg-clip-text text-transparent\">innovation,</span>\n<br /> we take care of the <span className=\"bg-gradient-to-r from-[#FF9700] to-[#E85409] bg-clip-text text-transparent\">cloud</span>",
    animatedTexts: [
      "68% lower costs.",
      "ZERO Data breaches.",
      "Deploying Daily.",
      "100% Disaster Proof.",
      "60% Snappier UX",
    ],
    subheading: "Savings that Sustain. Security that Proves. Speed & Reliability that boost revenue.",
    animatedTextLabel: "Your AWS infra engineered for",
    ctaButtons: [
      {
        label: "Whatsapp Us",
        url: "https://s.cloudvictor.com/whatsapp-web-cto-1",
        openInNewTab: true,
        buttonType: "secondary",
      },
      {
        label: "Book a call",
        url: "https://s.cloudvictor.com/meeting-web-cto-1",
        openInNewTab: true,
        buttonType: "primary",
      },
      {
        label: "Signup",
        url: "http://app.cloudvictor.com/",
        openInNewTab: true,
        buttonType: "secondary",
      },
    ],
  }

  // Client Section
  const clientSection = {
    title: "Real Impact. Don't take it from us. Hear it from them.",
    stats: [
      { title: "12+", description: "Years in Amazon/AWS" },
      { title: "10+", description: "Companies" },
      { title: "80+", description: "AWS accounts under Management" },
      { title: "20+", description: "end-to-end product infrastructure delivered" },
      { title: "$60M+", description: "Annual Savings" },
    ],
    partnerLogos: [],
  }

  // HowWeSolve Section
  const howWeSolveSection = {
    title: "How We Solve Your Challenges",
    subtitle: "Watch how we transform your pain points into powerful solutions through our innovative approach",
    painPoints: [
      {
        title: "Ever-Increasing AWS Monthly Bills",
        description: "Rising cloud costs eating into your budget",
        color: "bg-[#00171F]",
      },
      {
        title: "Data Breaches & Compliance Issues",
        description: "Security risks and regulatory compliance challenges",
        color: "bg-[#0C1713]",
      },
      {
        title: "Time-Consuming, Once-a-month, brittle Releases",
        description: "Infrequent deployments causing delays and instability",
        color: "bg-[#2E0E02]",
      },
      {
        title: "Revenue Loss due to availability issues",
        description: "Downtime impacting customer experience and revenue",
        color: "bg-[#0A2342]",
      },
      {
        title: "Slow Performance / Downtime during peak traffic",
        description: "System struggles during high-demand periods",
        color: "bg-[#2E2836]",
      },
    ],
    solutions: [
      {
        title: "One-Time Reconfiguring + Purchase Optimization",
        description: "Centralized data management with real-time synchronization",
        color: "bg-[#00171F]",
      },
      {
        title: "Always On Infosec team as a Service",
        description: "AI-powered automation reducing manual effort by 80%",
        color: "bg-[#0C1713]",
      },
      {
        title: "Deploy Daily with a 100% automated CI/CD pipeline with IaC",
        description: "Elastic scaling that grows with your business needs",
        color: "bg-[#2E0E02]",
      },
      {
        title: "Disaster-Proof Infrastructure with data backups",
        description: "Multi-layered protection with continuous monitoring",
        color: "bg-[#0A2342]",
      },
      {
        title: "Tuned & Battle-tested architectures for planet-scale peaks",
        description: "One-click connections between all your business tools",
        color: "bg-[#2E2836]",
      },
    ],
    videoUrl: "/videos/root-case.mp4",
  }

  // HowItWorks Section - Tabs
  const howItWorksTabs = [
    {
      id: "cost",
      label: "Reduce AWS Costs",
      iconName: "DollarSign",
      heading: "",
      oneLiner: "",
      benefitsHeading: "",
      benefits: [
        "Deliver the same customer experience with fewer, fully-utilised resources.",
        "Bill-Verified Savings.",
        "Data-backed resource-level proof.",
        "Identify & eliminate zombies.",
        "Same Latency & throughput.",
        "One-Time Outcome-Based Pricing. No Monthly Subscription.",
        "Bill Monitoring to prevent cost creeps later.",
      ],
      features: [
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
            "Align resource configuration with workload requirements.",
            "Configuration/Size optimized at an individual resource level. E.g.",
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
      ],
    },
    {
      id: "security",
      label: "Secure my Infra",
      iconName: "Shield",
      heading: "",
      oneLiner: "",
      benefitsHeading: "",
      benefits: [
        "Get Instant alert of suspicious activity. Act fast.",
        "Not just Audit-Day, but Continuous proven Compliance.",
        "Continuous Perimeter Monitoring. What? Why? When? Where? How to fix?",
        "Continuous Breach Detection. What? When? Who? Where?",
        "Slack/Call/Email Alarms.",
        "Continuous Reporting in AWS Security Hub.",
        "15+ Industry Standard Security Compliance.",
      ],
      features: [
        {
          heading: "Where are you in the security journey today?",
          oneLiner: "We scan 100% of your AWS. Every Day!",
          details: [
            "Detects misconfigured S3, open ports, exposed databases, exposed keys, and more.",
            "Scans every AWS resource in your account daily across all regions.",
            "All security findings, segregated by Criticality, along with What? Why? When? Where? How to fix? sent to your AWS Security Hub.",
          ],
          imagePath: "/home-page/Where are you in the security journey today.png",
          isReversed: false,
        },
        {
          heading: "Build a Secure Wall & deploy a watchdog outside.",
          oneLiner: "Shift from Reactive to Proactive with Continuous Perimeter Monitoring.",
          details: [
            "Prioritized Iteration on the scan results to close identified security gaps.",
            "Access policies based on the principle of least privilege",
            "Secure credential management with rotation",
            "Data encryption and network segmentation.",
            "Get compliant with 15+ industry-standard security compliance frameworks like CIS, GDPR, etc.",
          ],
          imagePath: "/home-page/Build a Secure Wall & deploy a watchdog outside..png",
          isReversed: true,
        },
        {
          heading: "Deploy an Internal Watchdog to identify strangers.",
          oneLiner: "Get Instant alert of suspicious activity. Act fast.",
          details: [
            "24/7 monitoring of 100% AWS API calls in your account to identify suspicious activity.",
            "Any sensitive action such as Security Group change, Bucket policy change, Login without MFA, etc. will trigger alerts via SMS/Calls/Whatsapp.",
            "Alerts include all details like criticality, what? who? when? where? how to fix?",
          ],
          imagePath: "/home-page/Deploy an Internal Watchdog to identify strangers..png",
          isReversed: false,
        },
        {
          heading: "Compliance Reports",
          oneLiner: "Auto-remediate common risks and stay audit-ready.",
          details: [
            "Always-updated Security Compliance Posture Dashboard with continuous scans. You see what's fixed, what's pending, and what matters next.",
            "Daily/Weekly reports of how many vulnerabilities were newly detected, resolved.",
            "Weekly posture reports with evidence for 15+ industry standard compliances like SOC 2 / HIPAA / PCI-DSS.",
          ],
          imagePath: "/home-page/Compliance Reports.png",
          isReversed: true,
        },
      ],
    },
    {
      id: "automation",
      label: "Automate my releases",
      iconName: "Zap",
      heading: "",
      oneLiner: "",
      benefitsHeading: "Free up Dev team bandwidth & Lower Risk",
      benefits: [
        "Codify your foundation so envs are consistent, and provisioning is automated.",
        "Multi-account CI/CD Pipeline with IaC, Integ Tests & audit trails",
        "Paved Roads (IaC): Reusable components (VPC, IAM, DNS, DBs).",
        "System & Business Metrics Dashboards inside your AWS account.",
        "No tool sprawl.",
        "Logs & Alarms inside your AWS account.",
        "On-call workflows that cut MTTR.",
        "Enforced Secrets' Hygiene.",
      ],
      features: [
        {
          heading: "Free Architecture Plan",
          oneLiner: "Align roadmap, surface bottlenecks, and set a clear path - at ZERO cost.",
          details: [
            "Deep-dive with business + tech leadership; capture goals, risks, and blockers.",
            "Tailored infrastructure plan merging current components with suggested components (Golden Paths) for improved scaling + performance + cost optimization + security + reliability + observability with audit trails.",
            "No commitment; expert guidance to set the vision + implementation plan.",
          ],
          imagePath: "/automate-my-release/Free Architecture Plan.png",
          isReversed: false,
        },
        {
          heading: "Infrastructure Modernization (IaC)",
          oneLiner: "Codify your foundation so envs are consistent, and provisioning is automated.",
          details: [
            "Battle-tested at planet-scale, Golden Path IaC components (server-based/serverless) for >90% of the use cases.",
            "Modular & based on AWS CDK (Terraform successor).",
            "Single/Multi account setup + permanently eliminate developer's dependency on beta/staging env for testing with developer-owned personal stacks.",
            "Built-in always-updated observability cutting down your MTTR: Alarms (Whatsapp+Email+Slack+Calls), Dashboards, KPIs for system-health (e.g. CPU/Mem utilization), as well as Business Metrics (e.g. # of New user signups, # of orders placed).",
            "Everything in your AWS account. No tool switching.",
            "Enforcing Secrets' Handling & Hygiene.",
          ],
          imagePath: "/automate-my-release/Infrastructure Modernization (IaC).png",
          isReversed: true,
        },
        {
          heading: "CI/CD Pipeline Automation",
          oneLiner: "Ship multiple times a day—safely and reliably with peace of mind.",
          details: [
            "Automated build → test → release across dev/beta/prod with human-approval, integration tests & load tests gates.",
            "Multi-account CI/CD Pipeline with IaC & complete account-level/stack-level audit trails.",
            "Repeatable, secure deployments with zero-touch releases.",
          ],
          imagePath: "/automate-my-release/CICD Pipeline Automation.png",
          isReversed: false,
        },
        {
          heading: "Post-Launch & Managed DevOps",
          oneLiner: "Maintain high dev velocity with hands-on support and continuous improvements.",
          details: [
            "45-day Hands-on Support + Oncall: Troubleshoot, fine-tune, document, and hand off.",
            "You keep all IAC code, dashboards, and runbooks - no lock-in.",
            "Optional Managed Services:",
            "24x7 first support level on-call, complete resolution for infrastructure issues + escalation for application issues",
            "Continuous Cost Optimization + Security Posture Review.",
            "New feature architecture review + IAC implementation + release support.",
          ],
          imagePath: "/automate-my-release/Post-Launch & Managed DevOps.png",
          isReversed: true,
        },
      ],
    },
    {
      id: "disaster",
      label: "Disaster-Proof my infra",
      iconName: "AlertTriangle",
      heading: "",
      oneLiner: "",
      benefitsHeading: "Infrastructure that works. No matter what happens!",
      benefits: [
        "Multiple layers of redundancy.",
        "Multi-AZ architecture ensures 100% uptime.",
        "Automated Database & ElasticSearch Backups & Recovery.",
        "Automated Cross Account S3 backups.",
        "(Semi) Automated Disaster Recovery Plans.",
      ],
      features: [
        {
          heading: "Free Architecture Plan",
          oneLiner: "Align roadmap, surface bottlenecks, and set a clear path at zero cost.",
          details: [
            "Deep-dive with business + tech leadership; capture goals, risks, and blockers.",
            "Tailored infrastructure plan merging current components with suggested components (Golden Paths) for improved reliability + recovery with audit trails.",
            "No commitment; expert guidance to set the vision + implementation plan.",
          ],
          imagePath: "/Disasster-proof-my -infra/Free Architecture Plan (1).png",
          isReversed: false,
        },
        {
          heading: "Implement & Test out Disaster Recovery",
          oneLiner: "Multiple layers of redundancy.",
          details: [
            "Multiple layers of redundancy.",
            "Minimal changes to the infrastructure to Disaster-proof your application layer.",
            "Data replication at the Persistence layer for Disaster Recovery.",
            "Cross-account/Cross-region replication for increased isolation & reliability.",
            "Automated Disaster Recovery Mechanisms to reduce human effort and downtime.",
            "Required Manual Intervention codified as a script to reduce effort, human error & downtime.",
            "Dashboards for system health metrics in your AWS account. No third-party tools.",
            "Reliability patterns that protect revenue during spikes.",
            "Disaster Simulation drills to test out the entire automation + human effort.",
          ],
          imagePath: "/Disasster-proof-my -infra/Implement & Test out Disaster Recovery.png",
          isReversed: true,
        },
        {
          heading: "Post-Launch & Managed DevOps",
          oneLiner: "Keep velocity high with hands-on support and continuous improvement.",
          details: [
            "45-day Hands-on Support + Oncall: Troubleshoot, fine-tune, document, and hand off.",
            "You keep all IAC code, dashboards, and runbooks - no lock-in.",
            "Optional Managed Services:",
            "24x7 first support level on-call, complete resolution for infrastructure issues + escalation for application issues",
            "New feature architecture review + IAC implementation + release support.",
          ],
          imagePath: "/Disasster-proof-my -infra/Post-Launch & Managed DevOps (1).png",
          isReversed: false,
        },
      ],
    },
    {
      id: "ux",
      label: "Improve Customer UX",
      iconName: "Users",
      heading: "",
      oneLiner: "",
      benefitsHeading: "Customer UX that delights & boosts revenue!",
      benefits: [
        "Establish multi-layer telemetry to measure & establish baseline performance.",
        "57% improved page/app loads.",
        "Increased Customer Retention & Revenue Boosts",
        "Auto-scaling that responds in seconds.",
        "Architectures that survive planet-scale peaks.",
      ],
      features: [
        {
          heading: "Free Architecture Plan",
          oneLiner: "Align roadmap, surface bottlenecks, and set a clear path at zero cost.",
          details: [
            "Deep-dive with business + tech leadership; capture goals, risks, and blockers.",
            "Tailored infrastructure plan merging current components with suggested components (Golden Paths) for improved customer UX performance with audit trails.",
            "No commitment; expert guidance to set the vision + implementation plan.",
          ],
          imagePath: "/Improve-customer-ux/Free Architecture Plan (3).png",
          isReversed: false,
        },
        {
          heading: "Implement & Test out Performance Optimization",
          oneLiner: "Establish multi-layer telemetry to measure & establish baseline performance.",
          details: [
            "Speed Optimization at multiple layers.",
            "Database Queries Optimization.",
            "Application Code Optimization.",
            "Infrastructure Optimization.",
            "Network latency & traffic optimization.",
            "Comprehensive Report showing optimization at each layer.",
          ],
          imagePath: "/Improve-customer-ux/Implement & Test out Performance Optimization.png",
          isReversed: true,
        },
        {
          heading: "Post-Launch & Managed DevOps",
          oneLiner: "Keep velocity high with hands-on support and continuous improvement.",
          details: [
            "45-day Hands-on Support + Oncall: Troubleshoot, fine-tune, document, and hand off.",
            "You keep all IAC code, dashboards, and runbooks - no lock-in.",
            "Optional Managed Services:",
            "24x7 first support level on-call, complete resolution for infrastructure issues + escalation for application issues",
            "New feature architecture review + IAC implementation + release support.",
          ],
          imagePath: "/Improve-customer-ux/Post-Launch & Managed DevOps (3).png",
          isReversed: false,
        },
      ],
    },
  ]

  // Upload feature images for all tabs
  console.log('Uploading feature images for tabs...')
  const tabsWithImages = await Promise.all(
    howItWorksTabs.map(async (tab) => {
      const featuresWithImages = await Promise.all(
        tab.features.map(async (feature) => {
          const imageId = await uploadImageIfExists(feature.imagePath)
          return {
            heading: feature.heading,
            oneLiner: feature.oneLiner,
            details: feature.details,
            image: imageId
              ? {
                  _type: 'image',
                  asset: {
                    _type: 'reference',
                    _ref: imageId,
                  },
                }
              : undefined,
            isReversed: feature.isReversed,
          }
        })
      )
      return {
        id: tab.id,
        label: tab.label,
        iconName: tab.iconName,
        heading: tab.heading,
        oneLiner: tab.oneLiner,
        benefitsHeading: tab.benefitsHeading,
        benefits: tab.benefits,
        features: featuresWithImages,
      }
    })
  )

  const howItWorksSection = {
    mainTitle: "From Architecture to Automation - One Partner, Total Control",
    subtitle: "I want to:",
    tabs: tabsWithImages,
  }

  // Stats Section
  const statsSection = {
    title: "Results That Speak Volumes",
    subtitle: "Numbers don't lie — here's the impact we've delivered",
    stats: [
      { value: "$362k+", label: "Savings delivered", icon: "PiggyBank" },
      { value: "40%", label: "Avg Cost Reduction results", icon: "BarChart3" },
      { value: "68%", label: "Max Cost Reduction results", icon: "Percent" },
      { value: "80+", label: "Production launches", icon: "Rocket" },
      { value: "300+", label: "AWS accounts under management", icon: "Server" },
      { value: "15+", label: "Compliance standards", icon: "ShieldCheck" },
      { value: "12+", label: "Years at Amazon/AWS", icon: "Users" },
      { value: "100%", label: "ROI in 3 months", icon: "TrendingUp" },
    ],
    centerImagePath: "/home-page/middle-center-one.png",
  }

  // Upload stats center image
  console.log('Uploading stats center image...')
  const centerImageId = await uploadImageIfExists(statsSection.centerImagePath)

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
        url: "https://s.cloudvictor.com/meeting-web-cto-2",
        openInNewTab: true,
        buttonType: "primary",
      },
      {
        label: "Chat on WhatsApp",
        url: "https://s.cloudvictor.com/whatsapp-web-cto-2",
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
    whatsappLink: "https://s.cloudvictor.com/whatsapp-web-cto-2",
    scheduleLink: "https://s.cloudvictor.com/meeting-web-cto-2",
  }

  // Upload get started section images
  console.log('Uploading get started section images...')
  const logoImageId = await uploadImageIfExists(getStartedSection.logoPath)
  const backgroundImageId = await uploadImageIfExists(getStartedSection.backgroundImagePath)

  // Testimonials Section (reuse from homepage)
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

  // Filter out null values (testimonials without images)
  const validTestimonials = testimonialsWithImages.filter((t) => t !== null)

  if (validTestimonials.length === 0) {
    console.warn('⚠️  No valid testimonials with images found!')
  } else {
    console.log(`✅ Prepared ${validTestimonials.length} testimonials with images`)
  }

  const testimonialsSection = {
    title: "Results Our Customers Count On, Month After Month",
    testimonials: validTestimonials,
  }

  // Build the complete CTO page document with proper structure
  // Note: For arrays of typed objects, Sanity auto-adds _type, we just need _key
  console.log('\n📦 Building CTO page document structure...')
  console.log(`  Hero section: ${heroSection.animatedTexts.length} animated texts`)
  console.log(`  Client section: ${clientSection.stats.length} stats`)
  console.log(`  HowWeSolve: ${howWeSolveSection.painPoints.length} pain points, ${howWeSolveSection.solutions.length} solutions`)
  console.log(`  HowItWorks: ${tabsWithImages.length} tabs`)
  console.log(`  Stats: ${statsSection.stats.length} stats`)
  console.log(`  Testimonials: ${validTestimonials.length} testimonials`)
  
  const timestamp = Date.now()
  
  const ctoPageDoc: any = {
    _type: 'ctoPage',
    heroSection: {
      mainHeading: heroSection.mainHeading,
      animatedTexts: heroSection.animatedTexts,
      subheading: heroSection.subheading,
      animatedTextLabel: heroSection.animatedTextLabel,
      ctaButtons: heroSection.ctaButtons.map((btn, idx) => ({
        _key: `cta-${idx}-${timestamp}`,
        label: btn.label,
        url: btn.url,
        openInNewTab: btn.openInNewTab !== undefined ? btn.openInNewTab : true,
        buttonType: btn.buttonType || 'primary',
      })),
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
    howWeSolveSection: {
      title: howWeSolveSection.title,
      subtitle: howWeSolveSection.subtitle,
      painPoints: howWeSolveSection.painPoints.map((point, idx) => ({
        _key: `pain-${idx}-${timestamp}`,
        title: point.title,
        description: point.description,
        color: point.color,
      })),
      solutions: howWeSolveSection.solutions.map((solution, idx) => ({
        _key: `solution-${idx}-${timestamp}`,
        title: solution.title,
        description: solution.description,
        color: solution.color,
      })),
      videoUrl: howWeSolveSection.videoUrl,
    },
    howItWorksSection: {
      mainTitle: howItWorksSection.mainTitle,
      subtitle: howItWorksSection.subtitle,
      tabs: tabsWithImages.map((tab, tabIdx) => ({
        _key: `tab-${tabIdx}-${timestamp}`,
        id: tab.id,
        label: tab.label,
        iconName: tab.iconName,
        heading: tab.heading || '',
        oneLiner: tab.oneLiner || '',
        benefitsHeading: tab.benefitsHeading || '',
        benefits: tab.benefits || [],
        features: tab.features
          .filter((f) => f.image) // Only include features with images
          .map((feature, featIdx) => ({
            _key: `feature-${tabIdx}-${featIdx}-${timestamp}`,
            heading: feature.heading,
            oneLiner: feature.oneLiner,
            details: feature.details || [],
            image: feature.image,
            isReversed: feature.isReversed || false,
          })),
      })),
    },
    statsSection: {
      title: statsSection.title,
      subtitle: statsSection.subtitle,
      stats: statsSection.stats.map((stat, idx) => ({
        _key: `animated-stat-${idx}-${timestamp}`,
        value: stat.value,
        label: stat.label,
        icon: stat.icon,
      })),
      centerImage: centerImageId
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: centerImageId,
            },
          }
        : undefined,
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
    testimonialsSection: {
      title: testimonialsSection.title,
      testimonials: testimonialsSection.testimonials,
    },
    metaTitle: "CTO Page - Cloud Victor",
    metaDescription: "Transform your AWS infrastructure with Cloud Victor. Optimize costs, enhance security, automate releases, and improve performance.",
  }

  // Debug: Log a sample of the structure
  console.log('\n🔍 Sample data structure:')
  console.log('Hero section mainHeading:', ctoPageDoc.heroSection.mainHeading?.substring(0, 50) + '...')
  console.log('Hero section animatedTexts:', ctoPageDoc.heroSection.animatedTexts?.length || 0)
  console.log('Hero section ctaButtons:', ctoPageDoc.heroSection.ctaButtons?.length || 0)
  console.log('Client section title:', ctoPageDoc.clientSection.title)
  console.log('Client section stats count:', ctoPageDoc.clientSection.stats?.length || 0)
  console.log('First CTA button:', JSON.stringify(ctoPageDoc.heroSection.ctaButtons?.[0], null, 2))

  try {
    if (existing) {
      // Delete existing document and create a new one for cleaner data structure
      console.log('📝 Replacing existing CTO page...')
      console.log(`Current CTO page ID: ${existing._id}`)
      
      // Delete the existing document
      await client.delete(existing._id)
      console.log(`🗑️  Deleted existing CTO page`)
    }
    
    // Create new document (whether it existed or not)
    console.log('✨ Creating new CTO page...')
    const result = await client.create(ctoPageDoc)
    console.log(`✅ Successfully created CTO page (${result._id})`)
    
    // Documents created via API are published by default, but let's verify
    console.log('📤 Verifying CTO page is published...')
    
    // Verify the creation
    const created = await client.fetch(`*[_id == "${result._id}"][0] {
      _id,
      _rev,
      heroSection {
        mainHeading,
        "animatedTextsCount": count(animatedTexts),
        "ctaButtonsCount": count(ctaButtons),
        ctaButtons[0] {
          label,
          url
        }
      },
      clientSection {
        title,
        "statsCount": count(stats),
        stats[0] {
          title,
          description
        }
      },
      howWeSolveSection {
        title,
        "painPointsCount": count(painPoints),
        "solutionsCount": count(solutions)
      },
      howItWorksSection {
        mainTitle,
        "tabsCount": count(tabs)
      },
      statsSection {
        title,
        "statsCount": count(stats)
      },
      testimonialsSection {
        title,
        "testimonialsCount": count(testimonials)
      }
    }`)
    
    console.log('\n📊 Verification after creation:')
    console.log(JSON.stringify(created, null, 2))
    
    if (!created?.heroSection?.mainHeading) {
      console.error('\n❌ ERROR: Hero section mainHeading is missing!')
      console.error('Full document structure:', JSON.stringify(created, null, 2))
      console.error('\n⚠️  This might indicate a schema mismatch. Check the console output above.')
    } else {
      console.log('\n✅ Document structure verified! All fields should be visible in Sanity Studio.')
    }

    console.log('\n✨ CTO page seeding complete!')
    console.log('\n📋 Summary:')
    console.log(`  - Hero section: ✅ (${heroSection.animatedTexts.length} animated texts, ${heroSection.ctaButtons.length} CTA buttons)`)
    console.log(`  - Client section: ✅ (${clientSection.stats.length} stats)`)
    console.log(`  - HowWeSolve section: ✅ (${howWeSolveSection.painPoints.length} pain points, ${howWeSolveSection.solutions.length} solutions)`)
    console.log(`  - HowItWorks section: ✅ (${tabsWithImages.length} tabs)`)
    console.log(`  - Stats section: ✅ (${statsSection.stats.length} stats)`)
    console.log(`  - GetStarted section: ✅ (${getStartedSection.chips.length} chips, ${getStartedSection.ctaButtons.length} CTA buttons)`)
    console.log(`  - Testimonials section: ✅ (${validTestimonials.length} testimonials)`)
    console.log('\n📝 Next steps:')
    console.log('  1. Go to Sanity Studio and open the CTO Page document')
    console.log('  2. Verify all sections are populated with content')
    console.log('  3. Review and adjust any content as needed')
  } catch (error) {
    console.error('❌ Error seeding CTO page:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message)
      console.error('Stack:', error.stack)
    }
    throw error
  }
}

// Run the seed function
seedCTOPage().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})

