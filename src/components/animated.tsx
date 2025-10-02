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

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface OfferData {
  id: number;
  headline: string;
  tagline: string;
  subTagline?: string;
  features: {
    icon: React.ReactNode;
    text: string;
  }[];
  title: string;
  value: number;
}

interface StatData {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const AnimatedSections: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement[]>([]);
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const circleImageRef = useRef<HTMLDivElement>(null);
  const targetPositionRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const offers: OfferData[] = [
    {
      id: 1,
      title: "Cost & Performance Optimization",
      headline: "Use less of cloud and pay less for it",
      tagline:
        "Unlock 40–70% savings with data-backed rightsizing, autoscaling, and smarter purchase plans, continuously optimized as you grow.",
      features: [
        {
          icon: <Clock size={25} />,
          text: "Fast Fixes → Rightsize, Reconfigure, Smarter Purchase Plans delivered in, a few days. One-time Outcome-based Fees. No subscription.",
        },
        {
          icon: <TrendingUp size={25} />,
          text: "Guaranteed ROI → 100% return in 3 months, with sustained savings that scale as you grow.",
        },
        {
          icon: <Check size={25} />,
          text: "Exhaustive Audit → Every dollar tracked, every AWS Service Covered.",
        },
      ],
      value: 1,
    },
    {
      id: 2,
      title: "LogGuardia – Security (InfoSec as a Service)",
      headline: "24x7 InfoSec Team",
      tagline: "Your team builds in peace while we guard.",
      subTagline: "Enterprise-grade Infrastructure Protection & Compliance",
      features: [
        {
          icon: <BadgeCheck size={25} />,
          text: "Compliance-First → SOC2, HIPAA, PCI-DSS, GDPR, and CIS enforced by Design.",
        },
        {
          icon: <Award size={25} />,
          text: "Intruder Defense → Instant alerts on suspicious activity. Internal or External. We stand Guard for you!",
        },
        {
          icon: <ShieldCheck size={25} />,
          text: "Continuous Monitoring → Real-time scans catch security holes before they are exploited.",
        },
      ],
      value: 1,
    },
    {
      id: 3,
      title: "Operational Excellence",
      headline: "100% Uptime That Builds Trust",
      tagline:
        "IaC & CI/CD backed Serverless Containerized Architectures. Just like Amazon's own systems. Tailored for You.",
      features: [
        {
          icon: <Rocket size={25} />,
          text: "Tailored Launchpad → Cloud designs aligned with your performance, security, and compliance needs. Cost-Efficient, Security-Compliant, Performant, Resilient, and Scalable By Design",
        },
        {
          icon: <Check size={25} />,
          text: "Proven Reliability → 80+ production launches across 300+ AWS Accounts across SaaS, FinTech, and enterprise workloads.",
        },
        {
          icon: <Server size={25} />,
          text: "Next-Gen Foundations → Serverless, Containerized, and AWS-native By Design.",
        },
      ],
      value: 1,
    },
    {
      id: 4,
      title: "Resilience and disaster recovery",
      headline: "Lightning-fast Customer Experience.",
      tagline: "Disaster Resistant with Automated Recovery",
      features: [
        {
          icon: <LifeBuoy size={25} />,
          text: "Self-Healing Architecture.",
        },
        {
          icon: <Rocket size={25} />,
          text: "Blue/Green Deployments with Automated Rollbacks.",
        },
        {
          icon: <ShieldCheck size={25} />,
          text: "Automated Cross-Account Backups for Disaster Recovery.",
        },
      ],
      value: 1,
    },
    {
      id: 5,
      title: "Performance",
      headline: "Daily Releases on Autopilot",
      tagline: "Fluid Customer Experience. Higher Retention. Higher Revenue.",
      features: [
        {
          icon: <TrendingUp size={25} />,
          text: "Upto 70% faster page/app loads.",
        },
        {
          icon: <Users size={25} />,
          text: "25% increase in customer NPS.",
        },
        {
          icon: <Award size={25} />,
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

      // Animate offers
      offers.forEach((_, index) => {
        const offerElement = offersRef.current[index];
        if (offerElement) {
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
              setCurrentStep(index + 1);
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
              setCurrentStep(index + 1);
            },
            onLeaveBack: () => {
              gsap.to(offerElement, {
                opacity: 0.5,
                duration: 0.3,
                ease: "power2.out",
              });
            },
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      {/* Section 1 - What We Offer */}
      <section ref={sectionRef} className="min-h-screen py-20 bg-foreground/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left Column - Circle Image with Step Images - PINNED */}
            <div
              ref={leftColumnRef}
              className="flex items-center justify-center w-full h-[500px]"
            >
              <div className="relative flex items-center justify-center w-full h-full aspect-square">
                {/* Step Images */}
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`absolute inset-0 z-0 flex items-center justify-center transition-opacity duration-500 ${
                      currentStep === step ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={`/home-page/${step}.png`}
                      alt={`Step ${step}`}
                      width={400}
                      height={400}
                      className="object-contain w-[25rem] h-[25rem]"
                    />
                  </div>
                ))}
                {/* Central Circle Image */}
                <div
                  ref={circleImageRef}
                  className="z-10 object-contain w-[15.6rem] h-[15.6rem] absolute"
                >
                  <Image
                    src="/home-page/circle.png"
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

                    {/* Three Feature Boxes */}
                    <div className="grid md:grid-cols-2 gap-2 mt-8">
                      {offer.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="w-fit p-5 bg-foreground/5 rounded"
                        >
                          <div className="flex gap-4">
                            <div className="bg-primary/10 rounded-full p-2 w-fit h-fit">
                              {feature.icon}
                            </div>
                            <p className="text-sm leading-relaxed text-foreground/90">
                              {feature.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
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
          <div className="relative h-[500px] flex items-center justify-center">
            <div className="flex gap-10 justify-center items-center">
              {/* 2nd half stats */}
              <div className="flex flex-col gap-4">
                {stats.slice(0, 3).map((stat, index) => {
                  return (
                    <div
                      key={index}
                      data-stat-id={index}
                      className={`opacity-100 shadow px-4 py-6 rounded-xl border-bl`}
                    >
                      <div className="flex gap-4 items-center">
                        <div className="mb-2 flex-shrink-0">{stat.icon}</div>
                        <div>
                          <p className="text-4xl md:text-5xl font-bold">
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
                className="w-[400px] h-[400px] "
              ></div>

              {/* Last half stats */}
              <div className="flex flex-col gap-4">
                {stats.slice(3, 6).map((stat, index) => {
                  return (
                    <div
                      key={index}
                      data-stat-id={index}
                      className={`opacity-100 shadow px-4 py-6 rounded-xl`}
                    >
                      <div className="flex gap-4 items-center">
                        <div className="mb-2 flex-shrink-0">{stat.icon}</div>
                        <div>
                          <p className="text-4xl md:text-5xl font-bold">
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
