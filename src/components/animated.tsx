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
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const circleImageRef = useRef<HTMLDivElement>(null);
  const targetPositionRef = useRef<HTMLDivElement>(null);
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

  // Assign Lucide icons to stats
  const stats: StatData[] = [
    {
      value: "$60M+",
      label: "Savings delivered",
      icon: <PiggyBank size={48} className="text-primary" />,
    },
    {
      value: "68%",
      label: "Max cost reduction",
      icon: <Percent size={48} className="text-primary" />,
    },
    {
      value: "80+",
      label: "Production launches",
      icon: <Rocket size={48} className="text-primary" />,
    },
    {
      value: "15+",
      label: "Compliance standards",
      icon: <ShieldCheck size={48} className="text-primary" />,
    },
    {
      value: "100%",
      label: "ROI in 3 months",
      icon: <TrendingUp size={48} className="text-primary" />,
    },
    {
      value: "12+",
      label: "Years at Amazon/AWS",
      icon: <Users size={48} className="text-primary" />,
    },
  ];

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

      // Circle animation - PROPER GSAP TIMELINE APPROACH
      if (circleImageRef.current && targetPositionRef.current) {
        const circle = circleImageRef.current;
        const target = targetPositionRef.current;

        // Create a timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: statsSectionRef.current,
            start: "top center",
            end: "center center",
            scrub: 1,
          },
        });

        // Use GSAP's built-in position tracking with quickSetter for performance
        tl.to(circle, {
          x: () => {
            const circleRect = circle.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            return (
              targetRect.left +
              targetRect.width / 2 -
              (circleRect.left + circleRect.width / 2)
            );
          },
          y: () => {
            const circleRect = circle.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            return (
              targetRect.top +
              targetRect.height / 2 -
              (circleRect.top + circleRect.height / 2)
            );
          },
          scale: 1.3,
          ease: "power2.out",
        });
      }

      // Stats cards animation (bidirectional) - ONLY animation, no circle changes
      if (statsContainerRef.current) {
        const leftBoxes =
          statsContainerRef.current.querySelectorAll("[data-stat-left]");
        const rightBoxes =
          statsContainerRef.current.querySelectorAll("[data-stat-right]");

        // Set initial state
        gsap.set(leftBoxes, { x: -100, scale: 1.5, opacity: 0 });
        gsap.set(rightBoxes, { x: 100, scale: 1.5, opacity: 0 });

        // Create timeline with ScrollTrigger
        const statsTl = gsap.timeline({
          scrollTrigger: {
            trigger: statsContainerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        // Animate left boxes
        statsTl.to(
          leftBoxes,
          {
            x: 0,
            scale: 1,
            opacity: 1,
            stagger: 0.15,
            ease: "none",
          },
          0
        );

        // Animate right boxes
        statsTl.to(
          rightBoxes,
          {
            x: 0,
            scale: 1,
            opacity: 1,
            stagger: 0.15,
            ease: "none",
          },
          0
        );
      }
    });

    return () => ctx.revert();
  }, [offers.length]); // depends on offers.length in case offer count changes

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
                    className={`absolute inset-0 z-0 flex items-center justify-center transition-opacity duration-500 ${
                      currentStep === step ? "opacity-100" : "opacity-0"
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
      {/* Section 2 - Stats */}
      <section
        ref={statsSectionRef}
        className="min-h-screen z-[-1] relative py-32"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-[#FF9700] to-[#E85409] bg-clip-text text-transparent  mb-6">
              Results That Speak Volumes
            </h2>
            <p className="text-xl text-gray-300">
              Numbers don't lie — here's the impact we've delivered
            </p>
          </div>
          {/* Stats arranged around center */}
          <div
            ref={statsContainerRef}
            className="relative h-[500px] flex items-center justify-center"
          >
            <div className="flex gap-10 justify-center items-center">
              {/* Left side stats */}
              <div className="flex flex-col gap-8">
                {stats.slice(0, 3).map((stat, index) => {
                  return (
                    <div
                      key={index}
                      data-stat-id={index}
                      data-stat-left
                      className={`opacity-0 px-4 py-5 rounded-xl bg-[#941B86]/[15%]`}
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">{stat.icon}</div>
                        <div>
                          <p className="text-3xl md:text-4xl font-bold leading-[100%]">
                            {stat.value}
                          </p>
                          <p className="text-lg font-medium">{stat.label}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                ref={targetPositionRef}
                className="w-[400px] h-[400px] shadow-[0_0_40px_10px_rgba(255,151,0,0.35)] rounded-full bg-gradient-to-br from-[#FF9700]/50 to-[#E85409]/30"
                style={{
                  boxShadow:
                    "0 0 90px 40px rgba(255,151,0,0.3), 0 0 240px 90px rgba(232,84,9,0.18)",
                  background:
                    "radial-gradient(circle at 60% 40%, rgba(255,151,0,0.08) 0%, rgba(232,84,9,0.08) 90%)",
                }}
              ></div>

              {/* Right side stats */}
              <div className="flex flex-col gap-8">
                {stats.slice(3, 6).map((stat, index) => {
                  return (
                    <div
                      key={index}
                      data-stat-id={index}
                      data-stat-right
                      className={`opacity-0 px-4 py-5 rounded-xl bg-[#941B86]/[15%]`}
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">{stat.icon}</div>
                        <div>
                          <p className="text-3xl md:text-4xl font-bold leading-[100%]">
                            {stat.value}
                          </p>
                          <p className="text-lg font-medium">{stat.label}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Invisible target position marker at center */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimatedSections;
