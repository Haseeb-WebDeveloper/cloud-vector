"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface OfferData {
  id: number;
  headline: string;
  tagline: string;
  features: string[];
  title: string;
  value: number;
}

interface StatData {
  value: string;
  label: string;
}

const AnimatedSections: React.FC = () => {
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement[]>([]);
  const ringsRef = useRef<SVGCircleElement[]>([]);

  const offers: OfferData[] = [
    {
      id: 1,
      title: "Cost Optimization",
      headline: "Reduce Spend. Maintain Performance.",
      tagline:
        "Unlock 40–70% savings with precision rightsizing, smarter purchase plans, and continuous optimization.",
      features: [
        "Exhaustive Audit → Every dollar tracked, every inefficiency exposed.",
        "Fast Fixes → Rightsizing, reconfiguring, and optimizations delivered in weeks.",
        "Guaranteed ROI → 100% return in 3 months, with savings that scale as you grow.",
      ],
      value: 1,
    },
    {
      id: 2,
      title: "LogGuardia Security",
      headline: "Security That Never Switches Off.",
      tagline:
        "Enterprise-grade protection and compliance, monitored 24/7 — so your team builds while we guard.",
      features: [
        "Continuous Monitoring → Real-time scans catch misconfigurations before they spread.",
        "Compliance-First → SOC2, HIPAA, PCI-DSS, GDPR, and CIS enforced by design.",
        "Intruder Defense → Instant alerts on suspicious activity, internal or external.",
      ],
      value: 1,
    },
    {
      id: 3,
      title: "Cloud Architecture",
      headline: "Built Right. Ready to Scale.",
      tagline:
        "Architectures tailored for your workloads — resilient, efficient, and engineered to scale like Amazon's own systems.",
      features: [
        "Tailored Blueprints → Cloud designs aligned with your performance, security, and compliance needs.",
        "Next-Gen Foundations → Serverless, containers, and AWS-native services built in.",
        "Proven Reliability → 80+ production launches across SaaS, FinTech, and enterprise workloads.",
      ],
      value: 1,
    },
    {
      id: 4,
      title: "Migration & Modernization",
      headline: "Transform Legacy. Embrace Cloud.",
      tagline:
        "Seamless migration strategies that modernize your infrastructure without disrupting operations.",
      features: [
        "Zero-Downtime Migrations → Phased approach ensures continuous operations during transition.",
        "Legacy Modernization → Transform monoliths into scalable, cloud-native architectures.",
        "Risk Mitigation → Comprehensive testing and rollback strategies protect your business.",
      ],
      value: 1,
    },
    {
      id: 5,
      title: "24/7 Support",
      headline: "Always On. Always Available.",
      tagline:
        "Round-the-clock expert support ensuring your cloud infrastructure runs smoothly at all times.",
      features: [
        "Instant Response → Critical issues addressed within minutes, not hours.",
        "Proactive Monitoring → Issues detected and resolved before they impact your business.",
        "Expert Team → AWS-certified professionals with 12+ years of cloud experience.",
      ],
      value: 1,
    },
  ];

  const stats: StatData[] = [
    { value: "$60M+", label: "Savings delivered" },
    { value: "68%", label: "Max cost reduction" },
    { value: "80+", label: "Production launches" },
    { value: "15+", label: "Compliance standards" },
    { value: "100%", label: "ROI in 3 months" },
    { value: "12+", label: "Years at Amazon/AWS" },
  ];

  // Using Tailwind chart colors
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Pin the left column
    ScrollTrigger.create({
      trigger: leftColumnRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
    });

    // Create scroll-triggered animations for each offer
    offers.forEach((_, index) => {
      const offerElement = offersRef.current[index];
      const ringElement = ringsRef.current[index];

      if (offerElement && ringElement) {
        // Animate offer card opacity and scale
        ScrollTrigger.create({
          trigger: offerElement,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => {
            gsap.to(offerElement, {
              opacity: 1,
              scale: 1.05,
              duration: 0.5,
              ease: "power2.out"
            });
            // Highlight corresponding ring
            gsap.to(ringElement, {
              strokeWidth: 12,
              stroke: colors[index] || "white",
              duration: 0.5,
              ease: "power2.out"
            });
          },
          onLeave: () => {
            gsap.to(offerElement, {
              opacity: 0.5,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
            // Reset ring
            gsap.to(ringElement, {
              strokeWidth: 10,
              stroke: "white",
              duration: 0.3,
              ease: "power2.out"
            });
          },
          onEnterBack: () => {
            gsap.to(offerElement, {
              opacity: 1,
              scale: 1.05,
              duration: 0.5,
              ease: "power2.out"
            });
            // Highlight corresponding ring
            gsap.to(ringElement, {
              strokeWidth: 12,
              stroke: colors[index] || "white",
              duration: 0.5,
              ease: "power2.out"
            });
          },
          onLeaveBack: () => {
            gsap.to(offerElement, {
              opacity: 0.5,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
            // Reset ring
            gsap.to(ringElement, {
              strokeWidth: 10,
              stroke: "white",
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [colors]);

  return (
    <div className="relative">
      {/* Section 1 - What We Offer */}
      <section className="min-h-screen py-20 bg-foreground/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left Column - Circle Image with Pie Chart - PINNED */}
            <div ref={leftColumnRef} className="flex items-center justify-center w-full h-[500px] ">
              <div className="relative flex items-center justify-center w-full h-full aspect-square bg-primary/10">
                {/* SVG Pie Chart Ring - behind the image, bigger than the image */}
                <svg
                  className="absolute inset-0 z-0"
                  width="30rem"
                  height="30rem"
                  viewBox="0 0 20 20"
                  style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                >
                  <circle r="5" cx="10" cy="10" fill="bisque" />
                  {/* 5 equal parts: each arc is 20% of the circle, so 6.28/5 = 1.256 radians, circumference = 2πr = 31.4159 */}
                  <circle
                    ref={(el) => { if (el) ringsRef.current[0] = el; }}
                    r="5"
                    cx="10"
                    cy="10"
                    fill="transparent"
                    stroke="#3730a3"
                    strokeWidth="10"
                    strokeDasharray="6.283 31.415"
                    strokeDashoffset="0"
                  />
                  <circle
                    ref={(el) => { if (el) ringsRef.current[1] = el; }}
                    r="5"
                    cx="10"
                    cy="10"
                    fill="transparent"
                    stroke="#3730a3"
                    strokeWidth="10"
                    strokeDasharray="6.283 31.415"
                    strokeDashoffset="-6.283"
                  />
                  <circle
                    ref={(el) => { if (el) ringsRef.current[2] = el; }}
                    r="5"
                    cx="10"
                    cy="10"
                    fill="transparent"
                    stroke="#3730a3"
                    strokeWidth="10"
                    strokeDasharray="6.283 31.415"
                    strokeDashoffset="-12.566"
                  />
                  <circle
                    ref={(el) => { if (el) ringsRef.current[3] = el; }}
                    r="5"
                    cx="10"
                    cy="10"
                    fill="transparent"
                    stroke="#3730a3"
                    strokeWidth="10"
                    strokeDasharray="6.283 31.415"
                    strokeDashoffset="-18.849"
                  />
                  <circle
                    ref={(el) => { if (el) ringsRef.current[4] = el; }}
                    r="5"
                    cx="10"
                    cy="10"
                    fill="transparent"
                    stroke="#3730a3"
                    strokeWidth="10"
                    strokeDasharray="6.283 31.415"
                    strokeDashoffset="-25.132"
                  />
                  {/* Curved text labels following the ring */}
                  <defs>
                    <path id="path1" d="M 15,10 A 5,5 0 0,1 10,5" fill="none" />
                    <path id="path2" d="M 10,5 A 5,5 0 0,1 5,10" fill="none" />
                    <path id="path3" d="M 5,10 A 5,5 0 0,1 10,15" fill="none" />
                    <path id="path4" d="M 10,15 A 5,5 0 0,1 15,10" fill="none" />
                    <path id="path5" d="M 15,10 A 5,5 0 0,1 10,5" fill="none" />
                  </defs>
                  
                  <text fontSize="0.8" fill="#3730a3" textAnchor="middle" fontWeight="bold">
                    <textPath href="#path1" startOffset="50%">
                      Cost Optimization
                    </textPath>
                  </text>
                  <text fontSize="0.8" fill="#3730a3" textAnchor="middle" fontWeight="bold">
                    <textPath href="#path2" startOffset="50%">
                      Cloud Security
                    </textPath>
                  </text>
                  <text fontSize="0.8" fill="#3730a3" textAnchor="middle" fontWeight="bold">
                    <textPath href="#path3" startOffset="50%">
                      Cloud Architecture
                    </textPath>
                  </text>
                  <text fontSize="0.8" fill="#3730a3" textAnchor="middle" fontWeight="bold">
                    <textPath href="#path4" startOffset="50%">
                      DevOps Enablement
                    </textPath>
                  </text>
                  <text fontSize="0.8" fill="#3730a3" textAnchor="middle" fontWeight="bold">
                    <textPath href="#path5" startOffset="50%">
                      LogGuardia
                    </textPath>
                  </text>
                </svg>
                <Image
                  src="/circle.png"
                  alt="circle"
                  width={320}
                  height={320}
                  className="z-10 object-contain w-[20rem] h-[20rem]"
                />
              </div>
            </div>
            {/* Right Column - Offers */}
            <div className="space-y-20">
              {offers.map((offer, index) => (
                <div
                  key={offer.id}
                  ref={(el) => { if (el) offersRef.current[index] = el; }}
                  data-offer-id={index}
                  className={`bg-gradient-to-br from-primary/10 to-secondary/20 rounded-r-2xl p-10 flex items-center transition-all duration-500 ${
                    index === 0 ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <div className="transition-all duration-300 w-full">
                    <div className="mb-6">
                      <h3 className="text-4xl font-bold mb-4">
                        {offer.headline}
                      </h3>
                      <p className="text-xl leading-relaxed">{offer.tagline}</p>
                    </div>
                    <div className="space-y-4">
                      {offer.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-start space-x-3 transition-all duration-300"
                        >
                          <Image
                            src="/icons/check.svg"
                            alt="check"
                            width={16}
                            height={16}
                            className=""
                          />
                          <p className="leading-relaxed">{feature}</p>
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
      <section className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-900 to-slate-900 py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-6">
              Results That Speak Volumes
            </h2>
            <p className="text-xl text-gray-300">
              Numbers don't lie — here's the impact we've delivered
            </p>
          </div>
          {/* Stats arranged around center */}
          <div className="relative">
            {/* Central circle space */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-600/20 backdrop-blur-xl border border-white/10" />
            </div>
            {/* Stats cards */}
            <div className="relative grid grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {stats.map((stat, index) => {
                const positions = [
                  "col-span-1 md:col-start-1 md:row-start-1", // Top left
                  "col-span-1 md:col-start-3 md:row-start-1", // Top right
                  "col-span-1 md:col-start-1 md:row-start-2", // Middle left
                  "col-span-1 md:col-start-3 md:row-start-2", // Middle right
                  "col-span-1 md:col-start-1 md:row-start-3", // Bottom left
                  "col-span-1 md:col-start-3 md:row-start-3", // Bottom right
                ];
                return (
                  <div
                    key={index}
                    data-stat-id={index}
                    className={`${positions[index]} opacity-0`}
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/15">
                      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                        {stat.value}
                      </div>
                      <div className="text-lg font-medium">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  );
};

export default AnimatedSections;
