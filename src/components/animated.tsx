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
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement[]>([]);
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const circleImageRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);

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

    // Pin the left column only for the duration of the offer section
    const pinTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftColumnRef.current,
      pinSpacing: false,
    });

    // Create scroll-triggered animations for each offer
    offers.forEach((_, index) => {
      const offerElement = offersRef.current[index];

      if (offerElement) {
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
            // Update step image
            setCurrentStep(index + 1);
          },
          onLeave: () => {
            gsap.to(offerElement, {
              opacity: 0.5,
              scale: 1,
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
            // Update step image
            setCurrentStep(index + 1);
          },
          onLeaveBack: () => {
            gsap.to(offerElement, {
              opacity: 0.5,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      }
    });

    // Create animation for circle image when entering stats section
    if (statsSectionRef.current && circleImageRef.current) {
      // Wait for next tick to ensure all elements are rendered
      setTimeout(() => {
        const circleElement = circleImageRef.current;
        const statsSectionElement = statsSectionRef.current;
        
        if (!circleElement || !statsSectionElement) return;
        
        // Get the initial position of the circle (when it's in the first section)
        const initialRect = circleElement.getBoundingClientRect();
        const initialCenterX = initialRect.left + initialRect.width / 2;
        const initialCenterY = initialRect.top + initialRect.height / 2;
        
        // Get the stats section position
        const statsRect = statsSectionElement.getBoundingClientRect();
        const targetCenterX = statsRect.left + statsRect.width / 2;
        const targetCenterY = statsRect.top + statsRect.height / 2;
        
        // Calculate the translation needed
        const translateX = targetCenterX - initialCenterX;
        const translateY = targetCenterY - initialCenterY;
        
        // Reset the circle position to its original state
        gsap.set(circleElement, {
          x: 0,
          y: 0,
          scale: 1
        });
        
        // Create the scroll-triggered animation with better positioning
        ScrollTrigger.create({
          trigger: statsSectionRef.current,
          start: "top center",
          end: "center center",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Use easeOut for smoother animation
            const easedProgress = gsap.parseEase("power2.out")(progress);
            
            // Smooth interpolation for position and scale
            const currentX = translateX * easedProgress;
            const currentY = translateY * easedProgress;
            const currentScale = 1 + (0.3 * easedProgress);
            
            // Apply transformations
            gsap.set(circleElement, {
              x: currentX,
              y: currentY,
              scale: currentScale
            });
          },
          onRefresh: () => {
            // Reset position when refresh happens
            gsap.set(circleElement, {
              x: 0,
              y: 0,
              scale: 1
            });
          }
        });
      }, 100);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [colors]);

  return (
    <div className="relative">
      {/* Section 1 - What We Offer */}
      <section ref={sectionRef} className="min-h-screen py-20 bg-foreground/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left Column - Circle Image with Step Images - PINNED */}
            <div ref={leftColumnRef} className="flex items-center justify-center w-full h-[500px] ">
              <div className="relative flex items-center justify-center w-full h-full aspect-square bg-primary/10">
                {/* Step Images - behind the circle image, bigger in size */}
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`absolute inset-0 z-0 flex items-center justify-center transition-opacity duration-500 ${
                      currentStep === step ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={`/home-page/step-${step}.png`}
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
                  />
                </div>
              </div>
            </div>
            {/* Right Column - Offers */}
            <div className="space-y-20">
              {offers.map((offer, index) => (
                <div
                  key={offer.id}
                  ref={(el) => {
                    if (el) offersRef.current[index] = el;
                  }}
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
      <section 
        ref={statsSectionRef}
        className="min-h-screen z-[-1] relative py-32 bg-red-950"
      >
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
          <div className="relative h-[500px] flex items-center justify-center">
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
                    className={`${positions[index]} opacity-100`}
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
      </section>
    </div>
  );
};

export default AnimatedSections;
