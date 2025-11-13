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
  DollarSign,
  BarChart3,
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
    text?: string;
    // Optional multi-point list rendered inside the box
    points?: string[];
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
      headline: "Run cloud the way Amazon does",
      tagline: "",
      features: [
        {
          icon: <PiggyBank size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Use less of cloud and pay less for it →",
        },
        {
          icon: <ShieldCheck size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "24x7 InfoSec Team →",
        },
        {
          icon: <BadgeCheck size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "100% Uptime That Builds Trust →",
        },
        {
          icon: <Rocket size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Lightning-fast Customer Experience →",
        },
        {
          icon: <Clock size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Daily Releases on Autopilot. →",
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
        "Unlock 40–70% savings with our data-backed approach, continuously optimized as you grow.",
      features: [
        {
          icon: <Check size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Exhaustive Audit → Every dollar tracked.\nEvery AWS Service Covered.",
        },
        {
          icon: <Clock size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Fast Fixes → Rightsize, Reconfigure, Smarter Purchase Plans.\nMinimal code change.",
        },
        {
          icon: <DollarSign size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Success-Based Fees → One-time outcome-based Fees.\nNo recurring subscription.",
        },
        {
          icon: <TrendingUp size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Guaranteed ROI → 100% ROI in 3 months by Design.\nSustained savings that scale as you grow.",
        },
      ],
      value: 1,
    },
    {
      id: 3,
      title: "Devops",
      headline: "100% Uptime That Builds Trust",
      tagline:
        "IaC & CI/CD backed Serverless Containerized Architectures. Just like Amazon's own systems. Tailored for You.",
      features: [
        {
          icon: <Rocket size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Tailored Launchpad → Aligned with your needs.\nPerformance, Security, and Compliance",
        },
        {
          icon: <Check size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Performance, Security, and Compliance → Amazon's Best Practices built-in By Design\nCost-Efficient\nSecurity-Compliant\nScalable",
        },
        {
          icon: <Server size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Next-Gen Foundations →\n Serverless, Containerized\n AWS-native By Design",
        },
        {
          icon: <Award size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Proven Reliability → 80+ production launches\nAcross 300+ AWS Accounts.\nSaaS, FinTech, and enterprise workloads.",
        },
      ],
      value: 1,
    },
    {
      id: 4,
      title: "Secops",
      headline: "24x7 InfoSec Team",
      tagline: "Your team builds in peace while we guard.",
      features: [
        {
          icon: <ShieldCheck size={20} className="w-[1.5vw] h-[1.5vw]"  />,
          text: "Continuous Monitoring → Real-time scans\nCatch security gaps before exploits.",
        },
        {
          icon: <BadgeCheck size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Compliance-First → SOC2, HIPAA, GDPR + 15 more.\nEnforced by Design.",
        },
        {
          icon: <Award size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Intruder Defense → Instant alerts on suspicious activity. Internal or External.\nWe stand Guard for you!",
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
          icon: <LifeBuoy size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Self-Healing. →",
        },
        {
          icon: <Rocket size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Blue/Green Deployments →",
        },
        {
          icon: <Clock size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Automated Rollbacks. →",
        },
        {
          icon: <ShieldCheck size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Automated Cross-Account Backups. →",
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
          icon: <TrendingUp size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Upto 70% faster page/app loads.",
        },
        {
          icon: <Users size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "25% increase in customer NPS.",
        },
        {
          icon: <Award size={20} className="w-[1.5vw] h-[1.5vw]" />,
          text: "Avg 15% boost in revenue.",
        },
      ],
      value: 1,
    },
  ];

  // Assign Lucide icons to stats
  const stats: StatData[] = [
    {
      value: "$362k+",
      label: "Savings delivered",
      icon: <PiggyBank size={48} className="w-[2vw] h-[2vw] text-primary" />,
    },
    {
      value: "40%",
      label: "Avg Cost Reduction results",
      icon: <BarChart3 size={48} className="w-[2vw] h-[2vw] text-primary" />,
    },
    {
      value: "68%",
      label: "Max Cost Reduction results",
      icon: <Percent size={48} className="w-[2vw] h-[2vw] text-primary" />,
    },
    {
      value: "80+",
      label: "Production launches",
      icon: <Rocket size={48} className="w-[2vw] h-[2vw] text-primary" />,
    },
    {
      value: "300+",
      label: "AWS accounts under management",
      icon: <Server size={48} className="w-[2vw] h-[2vw] text-primary" />,
    },
    {
      value: "15+",
      label: "Compliance standards",
      icon: <ShieldCheck size={48} className="w-[2vw] h-[2vw] text-primary" />,
    },
    {
      value: "12+",
      label: "Years at Amazon/AWS",
      icon: <Users size={48} className="w-[2vw] h-[2vw] text-primary" />,
    },
    {
      value: "100%",
      label: "ROI in 3 months",
      icon: <TrendingUp size={48} className="w-[2vw] h-[2vw] text-primary" />,
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

      // Image change trigger - updates as soon as content enters from bottom
      offers.forEach((_, index) => {
        const offerElement = offersRef.current[index];
        if (offerElement) {
          // Image changes immediately when content enters from bottom
          ScrollTrigger.create({
            trigger: offerElement,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => {
              // Scrolling down - set to current section
              setCurrentStep(index + 1);
            },
            onEnterBack: () => {
              // Scrolling up - entering this section, set to current
              setCurrentStep(index + 1);
            },
            onLeaveBack: () => {
              // Scrolling up - leaving this section, set to previous section
              if (index > 0) {
                setCurrentStep(index);
              } else {
                setCurrentStep(1);
              }
            },
            // Ensure immediate state update for perfect sync
            once: false,
          });
        }
      });

      // Circle animation - Calculate from original position to target
      if (circleImageRef.current && targetPositionRef.current) {
        const circle = circleImageRef.current;
        const target = targetPositionRef.current;

        // Get original circle position once (without transforms)
        // This is the starting point - the circle is centered in the left column
        const getOriginalCircleCenter = () => {
          const currentX = gsap.getProperty(circle, "x") as number || 0;
          const currentY = gsap.getProperty(circle, "y") as number || 0;
          // Temporarily reset to get original position
          gsap.set(circle, { x: 0, y: 0, immediateRender: true });
          const rect = circle.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          // Restore immediately
          gsap.set(circle, { x: currentX, y: currentY, immediateRender: true });
          return { centerX, centerY };
        };

        // Create a timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: statsSectionRef.current,
            start: "top center",
            end: "center center",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Animate from original position (x:0, y:0) to target
        // We calculate the delta from original circle center to target center
        tl.to(circle, {
          x: () => {
            const original = getOriginalCircleCenter();
            const targetRect = target.getBoundingClientRect();
            return (targetRect.left + targetRect.width / 2) - original.centerX;
          },
          y: () => {
            const original = getOriginalCircleCenter();
            const targetRect = target.getBoundingClientRect();
            return (targetRect.top + targetRect.height / 2) - original.centerY;
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

    // Handle resize and zoom events - refresh ScrollTrigger
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Refresh ScrollTrigger - the function-based animation will recalculate automatically
        ScrollTrigger.refresh();
      }, 150);
    };

    // Listen for window resize
    window.addEventListener("resize", handleResize);
    
    // Listen for zoom events using visualViewport API
    let visualViewport: VisualViewport | null = null;
    if (window.visualViewport) {
      visualViewport = window.visualViewport;
      visualViewport.addEventListener("resize", handleResize);
    }

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
      if (visualViewport) {
        visualViewport.removeEventListener("resize", handleResize);
      }
      clearTimeout(resizeTimer);
    };
  }, [offers.length]); // depends on offers.length in case offer count changes

  // Create step images for all offers (1 image per offer)
  const stepImageIndices = Array.from(
    { length: offers.length },
    (_, i) => i + 1
  );
  const stepImages = [
    "updated-01.png",
    "updated-02.png",
    "updated-03.png",
    "updated-04.png",
    "updated-05.png",
    "updated-06.png",
  ];

  return (
    <div className="relative  bg-foreground/5 pt-[6vw] mt-[6vw]">
      <h2 className="text-center max-w-[70vw] mx-auto text-[3.3vw] font-bold bg-gradient-to-r from-[#FF9700] to-[#E85409] bg-clip-text text-transparent  mb-6 tracking-normal leading-tight">
        Optimize. Secure. Accelerate, Disaster-proof, Scale — AWS Done Right.
      </h2>
      {/* Section 1 - What We Offer */}
      <section ref={sectionRef} className="min-h-screen py-20 ">
        <div className="max-w-[90vw] 2xl:max-w-[90vw] mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2vw] items-start justify-between w-full">
            {/* Left Column - Circle Image with Step Images - PINNED */}
            <div
              ref={leftColumnRef}
              className="flex items-center justify-center w-full h-[calc(100vh-6rem)] z-[999] "
            >
              <div className="relative flex items-center justify-center w-full h-full aspect-square">
                {/* Step Images */}
                {stepImageIndices.map((step) => (
                  <div
                    key={step}
                    className={`absolute  inset-0 z-0 flex items-center justify-center transition-opacity duration-300 ${
                      currentStep === step ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={`/home-page/${stepImages[step - 1]}`}
                      alt={`Step ${step}`}
                      width={400}
                      height={400}
                      className="object-contain w-full h-full"
                    />
                  </div>
                ))}
                <div
                  ref={circleImageRef}
                  className="object-contain w-[24.2vw] h-[24.2vw] 2xl:w-[27vw] 2xl:h-[27vw] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000]"
                  style={{ zIndex: 100 }}
                >
                  <Image
                    src="/home-page/middle-center-one.png"
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
            <div className="space-y-[30vw]">
              {offers.map((offer, index) => (
                <div
                  key={offer.id}
                  ref={(el) => {
                    if (el) offersRef.current[index] = el;
                  }}
                  data-offer-id={index}
                  className={`transition-all duration-500 ${index === 0 ? "mt-[4vw]" : ""}`}
                >
                  <div className="transition-all duration-300 w-full">
                    {/* Headline */}
                    <h3 className="text-[2vw] font-bold mb-2 ">
                      {offer.headline}
                    </h3>

                    {/* Tagline */}
                    {offer.tagline && (
                      <p className="text-[1.2vw] leading-relaxed mb-1 text-foreground/90">
                        {offer.tagline}
                      </p>
                    )}

                    {/* SubTagline if exists */}
                    {offer.subTagline && (
                      <p className="text-[1.2vw] mb-4 text-foreground/80">
                        {offer.subTagline}
                      </p>
                    )}

                    {/* Features as boxes for all offers */}
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      {offer.features.map((feature, featureIndex) => (
                        <SpotlightCard
                          key={featureIndex}
                          className="h-full rounded-[1vw] border border-neutral-800 bg-neutral-900 overflow-hidden p-[1.2vw]"
                        >
                          <div className="space-y-[0.5vw]">
                            {(() => {
                              const raw = String(feature.text ?? "");
                              const parts = raw.split("→");
                              const heading = parts[0]?.trim();
                              const descriptionRaw = parts
                                .slice(1)
                                .join("→")
                                .trim();
                              const lines = descriptionRaw
                                ? descriptionRaw
                                    .split(/\n+/)
                                    .map((l) => l.trim())
                                    .filter(Boolean)
                                : [];
                              const hasList = lines.length > 1;
                              return (
                                <div className="space-y-[0.5vw]">
                                  <div className="flex items-center gap-[0.5vw]">
                                    <div className="bg-primary/30 rounded-full p-[0.8vw] w-fit h-fit flex-shrink-0">
                                      {feature.icon}
                                    </div>
                                    {heading && (
                                      <p className="text-[1.2vw] font-bold text-primary">
                                        {heading}
                                      </p>
                                    )}
                                  </div>
                                  {hasList ? (
                                    <ul className="text-[1vw] leading-relaxed text-foreground/90 list-disc pl-[1vw] space-y-1 [&>li]:marker:text-foreground/60 [&>li]:marker:text-[1.2vw] [&>li]:marker:w-[1.2vw] [&>li]:marker:h-[1.2vw]">
                                      {lines.map((line, i) => (
                                        <li key={i} className="text-[1vw]">{line}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    descriptionRaw && (
                                      <p className="text-[1vw] leading-relaxed text-foreground/90">
                                        {descriptionRaw}
                                      </p>
                                    )
                                  )}
                                </div>
                              );
                            })()}
                          </div>
                        </SpotlightCard>
                      ))}
                    </div>
                    {offer.afterFeaturesText && (
                      <p className="mt-[1vw] text-[1vw] leading-relaxed text-foreground/90">
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
      <section ref={statsSectionRef} className="relative pb-[12vw] pt-[4vw] z-10 min-h-[100vh]">
        <div className="max-w-[80vw] 2xl:max-w-[80vw] mx-auto w-full ">
          <div className="text-center mt-20 w-full">
            <h2 className="text-[3.3vw] font-bold bg-gradient-to-r from-[#FF9700] to-[#E85409] bg-clip-text text-transparent z-[-100]">
              Results That Speak Volumes
            </h2>
            <p className="text-[1.2vw] text-gray-300 z-[-10]">
              Numbers don't lie — here's the impact we've delivered
            </p>
          </div>
          {/* Stats arranged around center */}
          <div
            ref={statsContainerRef}
            className="relative h-full  w-full mt-[4vw]"
          >
            <div className="flex gap-10 justify-between items-center w-full">
              {/* Left side stats */}
              <div className="flex flex-col gap-[1vw]">
                {stats.slice(0, 4).map((stat, index) => {
                  return (
                    <div
                      key={index}
                      data-stat-id={index}
                      data-stat-left
                      className={`opacity-0 px-[1.2vw] py-[1.5vw] rounded-[1.5vw] border border-foreground bg-neutral-900 shadow-[0_1px_5px_0_rgba(255,153,0,0.23)] hover:shadow-[0_1px_6px_0_rgba(255,153,0,0.60)]`}
                    >
                      <div className="flex gap-[0.8vw] ">
                        <div className="flex-shrink-0">{stat.icon}</div>
                        <div className="flex flex-col gap-[0.4vw]">
                          <p className="text-[6vw] md:text-[2vw] font-bold leading-[100%]">
                            {stat.value}
                          </p>
                          <p className="text-[1vw] font-medium">{stat.label}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div ref={targetPositionRef} className="w-[24vw] h-[24vw]">
                <div className="z-[-1] w-[24vw] h-[24vw] shadow-[0_0_40px_10px_rgba(255,151,0,0.35)] rounded-full bg-gradient-to-br from-[#FF9700]/50 to-[#E85409]/30"></div>
              </div>

              {/* Right side stats */}
              <div className="flex flex-col gap-[1vw]">
                {stats.slice(4, 8).map((stat, index) => {
                  return (
                    <div
                      key={index}
                      data-stat-id={index + 4}
                      data-stat-right
                      className="opacity-0 px-[1vw] py-[1.5vw] rounded-[1.5vw] border border-foreground bg-neutral-900 shadow-[0_1px_5px_0_rgba(255,153,0,0.23)] hover:shadow-[0_1px_6px_0_rgba(255,153,0,0.60)]"
                    >
                      <div className="flex gap-[0.8vw] ">
                        <div className="flex-shrink-0">{stat.icon}</div>
                        <div className="flex flex-col gap-[0.2vw]">
                          <p className="text-[6vw] md:text-[2vw] font-bold leading-[100%]">
                            {stat.value}
                          </p>
                          <p className="text-[1vw] font-medium">{stat.label}</p>
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
