"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Check,
  PiggyBank,
  Percent,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Users,
  Clock,
  Award,
  BadgeCheck,
  Server,
  LifeBuoy,
  Layers,
  BadgePercent,
  DollarSign
} from "lucide-react";
import Image from "next/image";
import { SpotlightCard } from "./ui/spolight-card";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface OfferData {
  id: number;
  headline: string;
  tagline: string;
  subTagline?: string;
  afterFeaturesText?: string;
  features: {
    icon: React.ReactNode;
    text: string;
  }[];
  title: string;
  value: number;
}

export interface StatData {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const AnimatedSections: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement[]>([]);
  const circleImageRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const offers: OfferData[] = [
    {
      id: 1,
      title: "Run cloud the way Amazon does",
      headline: "Run cloud the way Amazon does -",
      tagline: "Use less of cloud and pay less for it.",
      features: [
        {
          icon: <ShieldCheck size={20} />,
          text: "With 24x7 InfoSec Team",
        },
        {
          icon: <BadgeCheck size={20} />,
          text: "100% Uptime That Builds Trust",
        },
        {
          icon: <Rocket size={20} />,
          text: "Lightning-fast Customer Experience",
        },
        {
          icon: <Clock size={20} />,
          text: "Daily Releases on Autopilot.",
        },
      ],
      afterFeaturesText:
        "Five pillars, one mission - Make your cloud work BETTER for YOU!.",
      value: 1,
    },
    {
      id: 2,
      title: "Cost & Performance Optimization",
      headline: "Use less of cloud and pay less for it",
      tagline:
        "Unlock 40–70% savings with data-backed rightsizing, autoscaling, and smarter purchase plans, continuously optimized as you grow.",
      features: [
        {
          icon: <Clock size={20} />,
          text: "Fast Fixes → Rightsize, Reconfigure, Smarter Purchase Plans delivered in, a few days. One-time Outcome-based Fees. No subscription.",
        },
        {
          icon: <TrendingUp size={20} />,
          text: "Guaranteed ROI → 100% return in 3 months, with sustained savings that scale as you grow.",
        },
        {
          icon: <Check size={20} />,
          text: "Exhaustive Audit → Every dollar tracked, every AWS Service Covered.",
        },
      ],
      value: 1,
    },
    {
      id: 3,
      title: "LogGuardia – Security (InfoSec as a Service)",
      headline: "24x7 InfoSec Team",
      tagline: "Your team builds in peace while we guard.",
      subTagline: "Enterprise-grade Infrastructure Protection & Compliance",
      features: [
        {
          icon: <BadgeCheck size={20} />,
          text: "Compliance-First → SOC2, HIPAA, PCI-DSS, GDPR, and CIS enforced by Design.",
        },
        {
          icon: <Award size={20} />,
          text: "Intruder Defense → Instant alerts on suspicious activity. Internal or External. We stand Guard for you!",
        },
        {
          icon: <ShieldCheck size={20} />,
          text: "Continuous Monitoring → Real-time scans catch security holes before they are exploited.",
        },
      ],
      value: 1,
    },
    {
      id: 4,
      title: "Operational Excellence",
      headline: "100% Uptime That Builds Trust",
      tagline:
        "IaC & CI/CD backed Serverless Containerized Architectures. Just like Amazon's own systems. Tailored for You.",
      features: [
        {
          icon: <Rocket size={20} />,
          text: "Tailored Launchpad → Cloud designs aligned with your performance, security, and compliance needs. Cost-Efficient, Security-Compliant, Performant, Resilient, and Scalable By Design",
        },
        {
          icon: <Check size={20} />,
          text: "Proven Reliability → 80+ production launches across 300+ AWS Accounts across SaaS, FinTech, and enterprise workloads.",
        },
        {
          icon: <Server size={20} />,
          text: "Next-Gen Foundations → Serverless, Containerized, and AWS-native By Design.",
        },
      ],
      value: 1,
    },
    {
      id: 5,
      title: "Resilience and disaster recovery",
      headline: "Lightning-fast Customer Experience.",
      tagline: "Disaster Resistant with Automated Recovery",
      features: [
        {
          icon: <LifeBuoy size={20} />,
          text: "Self-Healing Architecture.",
        },
        {
          icon: <Rocket size={20} />,
          text: "Blue/Green Deployments with Automated Rollbacks.",
        },
        {
          icon: <ShieldCheck size={20} />,
          text: "Automated Cross-Account Backups for Disaster Recovery.",
        },
      ],
      value: 1,
    },
    {
      id: 6,
      title: "Performance",
      headline: "Daily Releases on Autopilot",
      tagline: "Fluid Customer Experience. Higher Retention. Higher Revenue.",
      features: [
        {
          icon: <TrendingUp size={20} />,
          text: "Upto 70% faster page/app loads.",
        },
        {
          icon: <Users size={20} />,
          text: "25% increase in customer NPS.",
        },
        {
          icon: <Award size={20} />,
          text: "Higher Revenue through improved performance.",
        },
      ],
      value: 1,
    },
  ];

  // Updated stats according to prompt

  // Left column stats:
  // $362k+
  // Savings delivered
  // 40%
  // Avg Cost Reduction results
  // 68%
  // Max Cost Reduction results
  // 80+
  // Production launches

  // Right column stats:
  // 300+
  // AWS accounts under management
  // 15+
  // Compliance standards
  // 12+
  // Years at Amazon/AWS
  // 100%
  // ROI in 3 months

  

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Pin the left column
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftColumnRef.current,
        pinSpacing: false,
      });

      // Animate offers - synced with image changes
      offers.forEach((_, index) => {
        const offerElement = offersRef.current[index];
        if (offerElement) {
          // Opacity animation
          ScrollTrigger.create({
            trigger: offerElement,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => {
              gsap.to(offerElement, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
              });
            },
            onLeave: () => {
              gsap.to(offerElement, {
                opacity: 0.5,
                duration: 0.3,
                ease: "power2.out",
              });
            },
            onEnterBack: () => {
              gsap.to(offerElement, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(offerElement, {
                opacity: 0.5,
                duration: 0.3,
                ease: "power2.out",
              });
            },
          });

          // Image change trigger - when offer reaches center of viewport
          ScrollTrigger.create({
            trigger: offerElement,
            start: "top center",
            end: "bottom center",
            onEnter: () => setCurrentStep(index + 1),
            onEnterBack: () => setCurrentStep(index + 1),
          });
        }
      });

      // Removed circle-to-stats and stats animation; homepage now uses the CTO Stats component.
    });

    return () => ctx.revert();
  }, [offers.length]);

  // Create step images for all offers (1 image per offer)
  const stepImageIndices = Array.from({ length: offers.length }, (_, i) => i + 1);
  const stepImages = [
    "updated 01.png",
    "updated 02.png",
    "updated 03.png",
    "updated 04.png",
    "updated 05.png",
    "updated 06.png",
  ];

  return (
    <div className="relative  bg-foreground/5 pt-20">
      <h2 className="text-center max-w-5xl mx-auto text-5xl font-bold bg-gradient-to-r from-[#FF9700] to-[#E85409] bg-clip-text text-transparent  mb-6">
        Optimize. Secure. Accelerate, Disaster-proof, Scale — AWS Done Right.
      </h2>
      {/* Section 1 - What We Offer */}
      <section ref={sectionRef} className="min-h-screen py-20 ">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left Column - Circle Image with Step Images - PINNED */}
            <div
              ref={leftColumnRef}
              className="flex items-center justify-center w-full h-[40vw]"
            >
              <div className="relative flex items-center justify-center w-full h-full aspect-square">
                {/* Step Images */}
                {stepImageIndices.map((step) => (
                  <div
                    key={step}
                    className={`absolute inset-0 z-0 flex items-center justify-center transition-opacity duration-500 ${currentStep === step ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    <Image
                      src={`/home-page/${stepImages[step - 1]}`}
                      alt={`Step ${step}`}
                      width={400}
                      height={400}
                      className="object-contain w-[34rem] h-[34rem]"
                    />
                  </div>
                ))}
                {/* Glow behind central circle image */}
                <div
                  className="z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] rounded-full drop-shadow-[0_0_60px_rgba(255,151,0,0.4)]"
                ></div>
                {/* Central Circle Image */}
                <div
                  ref={circleImageRef}
                  className="z-20 object-contain w-[20rem] h-[20rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <Image
                    src="/home-page/updated center middle.png"
                    alt="circle"
                    width={320}
                    height={320}
                    className="object-contain w-full h-full"
                    quality={100}
                  />
                </div>
              </div>
            </div>
            {/* Right Column - Offers */}
            <div className="space-y-32">
              {offers.map((offer, index) => (
                <div
                  key={offer.id}
                  ref={(el) => {
                    if (el) offersRef.current[index] = el;
                  }}
                  data-offer-id={index}
                  className={`transition-all duration-500 `}
                >
                  <div className="transition-all duration-300 w-full">
                    {/* Headline */}
                    <h3 className="text-4xl font-bold mb-4 ">
                      {offer.headline}
                    </h3>
                    {/* Tagline */}
                    <p className="text-xl leading-relaxed mb-2 text-foreground/90">
                      {offer.tagline}
                    </p>
                    {/* SubTagline if exists */}
                    {offer.subTagline && (
                      <p className="text-lg mb-8 text-foreground/80">
                        {offer.subTagline}
                      </p>
                    )}
                    {/* Features: bullets for first step, boxes for others */}
                    {offer.id === 1 ? (
                      <ul className="mt-8 list-disc pl-6 space-y-2 text-foreground/90">
                        {offer.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-base">
                            {feature.text}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-4 mt-8">
                        {offer.features.map((feature, featureIndex) => (
                          <SpotlightCard
                            key={featureIndex}
                            className="h-full rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-6"
                          >
                            <div className="space-y-4">
                              <div className="bg-primary/30 rounded-full p-3 w-fit h-fit flex-shrink-0">
                                {feature.icon}
                              </div>
                              {(() => {
                                const parts = String(feature.text).split("→");
                                const heading = parts[0]?.trim();
                                const description = parts
                                  .slice(1)
                                  .join("→")
                                  .trim();
                                return (
                                  <div className="space-y-1">
                                    {heading && (
                                      <p className="text-sm font-bold text-primary">
                                        {heading}
                                      </p>
                                    )}
                                    {description && (
                                      <p className="text-sm leading-relaxed text-foreground/90">
                                        {description}
                                      </p>
                                    )}
                                  </div>
                                );
                              })()}
                            </div>
                          </SpotlightCard>
                        ))}
                      </div>
                    )}
                    {offer.afterFeaturesText && (
                      <p className="mt-6 text-base leading-relaxed text-foreground/90">
                        {offer.afterFeaturesText}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default AnimatedSections;
