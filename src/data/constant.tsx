import { ApproachStep } from "@/components/cost-optimisation/our-approach";
import {
  Search,
  Settings,
  Server,
  DollarSign,
  Shield,
  Zap,
  AlertTriangle,
  Users,
} from "lucide-react";

export const approachSteps: ApproachStep[] = [
  {
    id: 1,
    heading: "Exhaustive Analysis",
    oneLiner: "Across every AWS service to surface hidden waste",
    details: [
      "Identify idle, misconfigured, and overprovisioned resources.",
      "Analyze workload requirements & resource configurations.",
    ],
    image: "/test.png",
  },
  {
    id: 2,
    heading: "Lean Resources",
    oneLiner: "Right Size/Optimally Configure each resource",
    details: [
      "Align resource configuration with workload requirement.",
      "Configuration/Size optimized at individual resource level. E.g.",
      "EC2, RDS, Sagemaker Instance Type & Instance Size.",
      "Storage Class & Life cycle policies of your S3 data.",
    ],
    image: "/test.png",
    isReversed: true,
  },
  {
    id: 3,
    heading: "Lean Scale your resources",
    oneLiner:
      "Deliver the same customer experience with fewer, fully-utilised resources.",
    details: [
      "Adjust your auto-scaling policies to minimum required while maintaining the same level of customer experience.",
      "Calculate and deploy the optimal number of resources, not more.",
      "Consolidate clusters/machines to remove excess hardware.",
    ],
    image: "/test.png",
  },
  {
    id: 4,
    heading: "Pay the Lowest Possible Price for AWS",
    oneLiner: "Balance commitment & discount for best price.",
    details: [
      "Analyse every purchase option & your planned usage.",
      "Purchase commitment strategy engineered for maximum ROI with minimum commitment risk.",
      "We analyze 1000's of Reserved Instances, Savings Plans, and Private Pricing options for you.",
    ],
    image: "/test.png",
    isReversed: true,
  },
  {
    id: 5,
    heading: "Sustained Savings, Guaranteed.",
    oneLiner: "Sustained monthly savings verified on Your Bill.",
    details: [
      "Transparent verification with your AWS account's Cost Explorer and CUR data.",
      "Guardrails ensure that we (& you) are alarmed if costs are creeping back over time.",
      "100% ROI in 3 months - guaranteed.",
    ],
    image: "/test.png",
  },
];

export interface TabData {
  id: string;
  label: string;
  icon: React.ReactNode;
  heading: string;
  oneLiner: string;
  benefits: string[];
  features: FeatureStep[];
}

export interface FeatureStep {
  id: number;
  heading: string;
  oneLiner: string;
  details: string[];
  image: string;
  isReversed?: boolean;
}

export const tabsData: TabData[] = [
  {
    id: "cost",
    label: "Reduce AWS Costs",
    icon: <DollarSign className="w-5 h-5" />,
    heading: "Use less of cloud & pay less for it",
    oneLiner: "Verified Savings. Zero Trade-offs.",
    benefits: [
      "Bill-Verified Savings.",
      "Data-backed resource-level proof.",
      "Identify & eliminate zombies.",
      "Same Latency & throughput.",
      "One-Time Outcome-Based Pricing. No Monthly Subscription.",
      "Bill Monitoring to prevent cost creeps later.",
    ],
    features: [
      {
        id: 1,
        heading: "Exhaustive Analysis",
        oneLiner: "Across every AWS service to surface hidden waste",
        details: [
          "Identify idle, misconfigured, and overprovisioned resources.",
          "Analyze workload requirements & resource configurations.",
        ],
        image: "/test.png",
      },
      {
        id: 2,
        heading: "Lean Resources",
        oneLiner: "Right Size/Optimally Configure each resource",
        details: [
          "Align resource configuration with workload requirements.",
          "Configuration/Size optimized at an individual resource level. E.g.",
          "EC2, RDS, Sagemaker Instance Type & Instance Size.",
          "Storage Class & Life cycle policies of your S3 data.",
        ],
        image: "/test.png",
        isReversed: true,
      },
      {
        id: 3,
        heading: "Lean Scale your resources",
        oneLiner:
          "Deliver the same customer experience with fewer, fully-utilised resources.",
        details: [
          "Adjust your auto-scaling policies to minimum required while maintaining the same level of customer experience.",
          "Calculate and deploy the optimal number of resources, not more.",
          "Consolidate clusters/machines to remove excess hardware.",
        ],
        image: "/test.png",
      },
      {
        id: 4,
        heading: "Pay the Lowest Possible Price for AWS",
        oneLiner: "Balance commitment & discount for best price.",
        details: [
          "Analyse every purchase option & your planned usage.",
          "Purchase commitment strategy engineered for maximum ROI with minimum commitment risk.",
          "We analyze 1000's of Reserved Instances, Savings Plans, and Private Pricing options for you.",
        ],
        image: "/test.png",
        isReversed: true,
      },
      {
        id: 5,
        heading: "Sustained Savings, Guaranteed.",
        oneLiner: "Sustained monthly savings verified on Your Bill.",
        details: [
          "Transparent verification with your AWS account's Cost Explorer and CUR data.",
          "Guardrails ensure that we (& you) are alarmed if costs are creeping back over time.",
          "100% ROI in 3 months - guaranteed.",
        ],
        image: "/test.png",
      },
    ],
  },
  {
    id: "security",
    label: "Secure my Infra",
    icon: <Shield className="w-5 h-5" />,
    heading: "InfoSec team as a Service",
    oneLiner: "Not just Audit-Day, but Continuous proven Compliance",
    benefits: [
      "Continuous Perimeter Monitoring. What? Why? When? Where? How to fix?",
      "Continuous Breach Detection. What? When? Who? Where?",
      "Slack/Call/Email Alarms.",
      "Continuous Reporting in AWS Security Hub.",
      "15+ Industry Standard Security Compliance.",
    ],
    features: [
      {
        id: 1,
        heading: "Where are you in the security journey today?",
        oneLiner: "We scan 100% of your AWS. Every Day!",
        details: [
          "Detects misconfigured S3, open ports, exposed databases, exposed keys, and more.",
          "Scans every AWS resource in your account daily across all regions.",
          "All security findings, segregated by Criticality, along with What? Why? When? Where? How to fix? sent to your AWS Security Hub.",
        ],
        image: "/test.png",
      },
      {
        id: 2,
        heading: "Build a Secure Wall & deploy a watchdog outside.",
        oneLiner:
          "Shift from Reactive to Proactive with Continuous Perimeter Monitoring.",
        details: [
          "Prioritized Iteration on the scan results to close identified security gaps.",
          "Access policies based on the principle of least privilege",
          "Secure credential management with rotation",
          "Data encryption and network segmentation.",
          "Get compliant with 15+ industry-standard security compliance frameworks like CIS, GDPR, etc.",
        ],
        image: "/test.png",
        isReversed: true,
      },
      {
        id: 3,
        heading: "Deploy an Internal Watchdog to identify strangers.",
        oneLiner: "Get Instant alert of suspicious activity. Act fast.",
        details: [
          "24/7 monitoring of 100% AWS API calls in your account to identify suspicious activity.",
          "Any sensitive action such as Security Group change, Bucket policy change, Login without MFA, etc. will trigger alerts via SMS/Calls/Whatsapp.",
          "Alerts include all details like criticality, what? who? when? where? how to fix?",
        ],
        image: "/test.png",
      },
      {
        id: 4,
        heading: "Compliance Reports",
        oneLiner: "Auto-remediate common risks and stay audit-ready.",
        details: [
          "Always-updated Security Compliance Posture Dashboard with continuous scans. You see what's fixed, what's pending, and what matters next.",
          "Daily/Weekly reports of how many vulnerabilities were newly detected, resolved.",
          "Weekly posture reports with evidence for 15+ industry standard compliances like SOC 2 / HIPAA / PCI-DSS.",
        ],
        image: "/test.png",
        isReversed: true,
      },
    ],
  },
  {
    id: "automation",
    label: "Automate my releases",
    icon: <Zap className="w-5 h-5" />,
    heading: "Free up Dev team bandwidth & Lower Risk",
    oneLiner:
      "Multi-account CI/CD Pipeline with IaC, Integ Tests & audit trails",
    benefits: [
      "Paved Roads (IaC): Reusable components (VPC, IAM, DNS, DBs).",
      "System & Business Metrics Dashboards inside your AWS account.",
      "No tool sprawl.",
      "Logs & Alarms inside your AWS account.",
      "On-call workflows that cut MTTR.",
      "Enforced Secrets' Hygiene.",
    ],
    features: [
      {
        id: 1,
        heading: "Free Architecture Plan",
        oneLiner:
          "Align roadmap, surface bottlenecks, and set a clear path - at ZERO cost.",
        details: [
          "Deep-dive with business + tech leadership; capture goals, risks, and blockers.",
          "Tailored infrastructure plan merging current components with suggested components (Golden Paths) for improved scaling + performance + cost optimization + security + reliability + observability with audit trails.",
          "No commitment; expert guidance to set the vision + implementation plan.",
        ],
        image: "/test.png",
      },
      {
        id: 2,
        heading: "Infrastructure Modernization (IaC)",
        oneLiner:
          "Codify your foundation so envs are consistent, and provisioning is automated.",
        details: [
          "Battle-tested at planet-scale, Golden Path IaC components (server-based/serverless) for >90% of the use cases.",
          "Modular & based on AWS CDK (Terraform successor).",
          "Single/Multi account setup + permanently eliminate developer's dependency on beta/staging env for testing with developer-owned personal stacks.",
          "Built-in always-updated observability cutting down your MTTR: Alarms (Whatsapp+Email+Slack+Calls), Dashboards, KPIs for system-health (e.g. CPU/Mem utilization), as well as Business Metrics (e.g. # of New user signups, # of orders placed).",
          "Everything in your AWS account. No tool switching.",
          "Enforcing Secrets' Handling & Hygiene.",
        ],
        image: "/test.png",
        isReversed: true,
      },
      {
        id: 3,
        heading: "CI/CD Pipeline Automation",
        oneLiner:
          "Ship multiple times a day—safely and reliably with peace of mind.",
        details: [
          "Automated build → test → release across dev/beta/prod with human-approval, integration tests & load tests gates.",
          "Multi-account CI/CD Pipeline with IaC & complete account-level/stack-level audit trails.",
          "Repeatable, secure deployments with zero-touch releases.",
        ],
        image: "/test.png",
      },
      {
        id: 4,
        heading: "Post-Launch & Managed DevOps",
        oneLiner:
          "Maintain high dev velocity with hands-on support and continuous improvements.",
        details: [
          "45-day Hands-on Support + Oncall: Troubleshoot, fine-tune, document, and hand off.",
          "You keep all IAC code, dashboards, and runbooks - no lock-in.",
          "Optional Managed Services:",
          "24x7 first support level on-call, complete resolution for infrastructure issues + escalation for application issues",
          "Continuous Cost Optimization + Security Posture Review.",
          "New feature architecture review + IAC implementation + release support.",
        ],
        image: "/test.png",
        isReversed: true,
      },
    ],
  },
  {
    id: "disaster",
    label: "Disaster-Proof my infra",
    icon: <AlertTriangle className="w-5 h-5" />,
    heading: "Infrastructure that works. No matter what happens!",
    oneLiner: "Multi-AZ architecture ensures 100% uptime.",
    benefits: [
      "Automated Database & ElasticSearch Backups & Recovery.",
      "Automated Cross Account S3 backups.",
      "(Semi) Automated Disaster Recovery Plans.",
    ],
    features: [
      {
        id: 1,
        heading: "Free Architecture Plan",
        oneLiner:
          "Align roadmap, surface bottlenecks, and set a clear path at zero cost.",
        details: [
          "Deep-dive with business + tech leadership; capture goals, risks, and blockers.",
          "Tailored infrastructure plan merging current components with suggested components (Golden Paths) for improved reliability + recovery with audit trails.",
          "No commitment; expert guidance to set the vision + implementation plan.",
        ],
        image: "/test.png",
      },
      {
        id: 2,
        heading: "Implement & Test out Disaster Recovery",
        oneLiner: "Multiple layers of redundancy.",
        details: [
          "Minimal changes to the infrastructure to Disaster-proof your application layer.",
          "Data replication at the Persistence layer for Disaster Recovery.",
          "Cross-account/Cross-region replication for increased isolation & reliability.",
          "Automated Disaster Recovery Mechanisms to reduce human effort and downtime.",
          "Required Manual Intervention codified as a script to reduce effort, human error & downtime.",
          "Dashboards for system health metrics in your AWS account. No third-party tools.",
          "Reliability patterns that protect revenue during spikes.",
          "Disaster Simulation drills to test out the entire automation + human effort.",
        ],
        image: "/test.png",
        isReversed: true,
      },
      {
        id: 3,
        heading: "Post-Launch & Managed DevOps",
        oneLiner:
          "Keep velocity high with hands-on support and continuous improvement.",
        details: [
          "45-day Hands-on Support + Oncall: Troubleshoot, fine-tune, document, and hand off.",
          "You keep all IAC code, dashboards, and runbooks - no lock-in.",
          "Optional Managed Services:",
          "24x7 first support level on-call, complete resolution for infrastructure issues + escalation for application issues",
          "New feature architecture review + IAC implementation + release support.",
        ],
        image: "/test.png",
      },
    ],
  },
  {
    id: "ux",
    label: "Improve Customer UX",
    icon: <Users className="w-5 h-5" />,
    heading: "Customer UX that delights & boosts revenue!",
    oneLiner: "57% improved page/app loads.",
    benefits: [
      "Increased Customer Retention & Revenue Boosts",
      "Auto-scaling that responds in seconds.",
      "Architectures that survive planet-scale peaks.",
    ],
    features: [
      {
        id: 1,
        heading: "Free Architecture Plan",
        oneLiner:
          "Align roadmap, surface bottlenecks, and set a clear path at zero cost.",
        details: [
          "Deep-dive with business + tech leadership; capture goals, risks, and blockers.",
          "Tailored infrastructure plan merging current components with suggested components (Golden Paths) for improved customer UX performance with audit trails.",
          "No commitment; expert guidance to set the vision + implementation plan.",
        ],
        image: "/test.png",
      },
      {
        id: 2,
        heading: "Implement & Test out Performance Optimization",
        oneLiner:
          "Establish multi-layer telemetry to measure & establish baseline performance.",
        details: [
          "Speed Optimization at multiple layers.",
          "Database Queries Optimization.",
          "Application Code Optimization.",
          "Infrastructure Optimization.",
          "Network latency & traffic optimization.",
          "Comprehensive Report showing optimization at each layer.",
        ],
        image: "/test.png",
        isReversed: true,
      },
      {
        id: 3,
        heading: "Post-Launch & Managed DevOps",
        oneLiner:
          "Keep velocity high with hands-on support and continuous improvement.",
        details: [
          "45-day Hands-on Support + Oncall: Troubleshoot, fine-tune, document, and hand off.",
          "You keep all IAC code, dashboards, and runbooks - no lock-in.",
          "Optional Managed Services:",
          "24x7 first support level on-call, complete resolution for infrastructure issues + escalation for application issues",
          "New feature architecture review + IAC implementation + release support.",
        ],
        image: "/test.png",
      },
    ],
  },
];
