"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import CheckIcon from "@/components/check";
// import { approachSteps } from "@/data/constant"; // Now using Sanity data
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MovingBorder } from "@/components/ui/moving-border";

export interface ApproachStep {
  id: number;
  heading: string;
  oneLiner: string;
  details: string[];
  image: string;
  isReversed?: boolean;
}

interface OurApproachSectionProps {
  title?: string;
  subtitle?: string;
  steps?: Array<{
    heading: string;
    oneLiner: string;
    details: string[];
    image?: {
      asset?: {
        url?: string;
      };
    };
    isReversed?: boolean;
  }>;
}

export default function OurApproachSection({
  title = "Our Unique Approach to Cloud Cost Optimization",
  subtitle = "Our method optimizes efficiency at every level so that your savings scale with your business, not your costs.",
  steps,
}: OurApproachSectionProps) {
  // Register plugin once
  gsap.registerPlugin(ScrollTrigger);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRefs = useRef<gsap.core.Tween[]>([]);

  // Default steps from constant file
  const defaultSteps: ApproachStep[] = [
    {
      id: 1,
      heading: "Exhaustive Analysis",
      oneLiner: "Across every AWS service to surface hidden waste",
      details: [
        "Identify idle, misconfigured, and overprovisioned resources.",
        "Analyze workload requirements & resource configurations.",
      ],
      image: "/home-page/Exhaustive Analysis.png",
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
      image: "/home-page/Lean Resources.png",
      isReversed: true,
    },
    {
      id: 3,
      heading: "Lean Scale your resources",
      oneLiner: "Deliver the same customer experience with fewer, fully-utilised resources.",
      details: [
        "Adjust your auto-scaling policies to minimum required while maintaining the same level of customer experience.",
        "Calculate and deploy the optimal number of resources, not more.",
        "Consolidate clusters/machines to remove excess hardware.",
      ],
      image: "/home-page/Lean Scale your resources.png",
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
      image: "/home-page/Pay the Lowest Possible Price for AWS.png",
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
      image: "/home-page/Sustained Savings, Guaranteed..png",
    },
  ];

  // Convert Sanity steps to component format
  const approachSteps: ApproachStep[] = steps && steps.length > 0
    ? steps.map((step, index) => ({
        id: index + 1,
        heading: step.heading,
        oneLiner: step.oneLiner,
        details: step.details,
        image: step.image?.asset?.url || "",
        isReversed: step.isReversed || false,
      }))
    : defaultSteps;

  const initializeAnimations = (container: HTMLDivElement) => {
    const leftImages = container.querySelectorAll("[data-image-left]");
    const rightImages = container.querySelectorAll("[data-image-right]");

    leftImages.forEach((image) => {
      gsap.set(image, { x: -100, opacity: 0 });
      const tween = gsap.to(image, {
        x: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: image,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });
      scrollTriggerRefs.current.push(tween);
    });

    rightImages.forEach((image) => {
      gsap.set(image, { x: 100, opacity: 0 });
      const tween = gsap.to(image, {
        x: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: image,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });
      scrollTriggerRefs.current.push(tween);
    });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  };

  useEffect(() => {
    // Cleanup any existing triggers
    scrollTriggerRefs.current.forEach((tween) => {
      const st = (tween as any).scrollTrigger;
      if (st) st.kill();
      tween.kill();
    });
    scrollTriggerRefs.current = [];

    const container = containerRef.current;
    if (!container) return;

    const timeout = setTimeout(() => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        initializeAnimations(container);
      }
    }, 50);

    return () => {
      clearTimeout(timeout);
      scrollTriggerRefs.current.forEach((tween) => {
        const st = (tween as any).scrollTrigger;
        if (st) st.kill();
        tween.kill();
      });
      scrollTriggerRefs.current = [];
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-background via-background to-primary/5 mb-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center pt-16 pb-16 max-w-3xl mx-auto space-y-2">
          <h2 className="text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-primary via-primary/80 to-white/60 bg-clip-text text-transparent leading-[1.2]">
            {title}
          </h2>
          <p className="text-xl text-foreground/80 mx-auto leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Approach Steps */}
        <div className="relative" ref={containerRef}>
          <div className="space-y-16 lg:space-y-[230px]">
            {approachSteps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  " flex flex-col lg:flex-row items-center gap-12 lg:gap-16",
                  step.isReversed && "lg:flex-row-reverse"
                )}
              >
                {/* Content Container */}
                <div className="relative flex-1 w-full">
                  {/* Connecting Line - only show between steps */}
                  {index < approachSteps.length - 1 && (
                    <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2 z-10 hidden lg:block">
                      {step.isReversed ? (
                        <Image
                          src="/connect-from-left-right.svg"
                          alt=""
                          width={600}
                          height={233}
                        // className="w-40 h-16"
                        />
                      ) : (
                        <Image
                          src="/connect-from-right-left.svg"
                          alt=""
                          width={617}
                          height={233}
                        // className="w-80 h-40"
                        />
                      )}
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                    {/* Text Content */}
                    <div
                      className={cn(
                        "flex-1 space-y-6",
                        step.isReversed ? "lg:order-2" : "lg:order-1"
                      )}
                    >
                      <div className="space-y-4 pl-8">
                        <h3 className="text-3xl lg:text-4xl text-foreground font-semibold">
                          {step.heading}
                        </h3>
                        <p className="text-foreground/80 leading-relaxed">
                          {step.oneLiner}
                        </p>
                      </div>

                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-start gap-3 text-lg"
                          >
                            {/* Modern Check Icon */}
                            <CheckIcon className="w-6 h-6 mt-1 flex-shrink-0 text-primary" />
                            <span className="leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Image */}
                    <div
                      className={cn(
                        "flex-1 w-full z-10 h-64 sm:h-80 lg:h-96",
                        step.isReversed ? "lg:order-1" : "lg:order-2"
                      )}
                      {...(step.isReversed
                        ? { "data-image-left": true }
                        : { "data-image-right": true })}
                    >
                      <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden">
                        <div className="absolute inset-0">
                          <MovingBorder duration={6000} rx="30%" ry="30%">
                            <div
                              className="h-20 w-20 opacity-[0.8]"
                              style={{
                                background: `radial-gradient(circle, var(--primary) 40%, transparent 60%)`
                              }}
                            />
                          </MovingBorder>
                        </div>
                        <div className="absolute top-[1px] left-[1px] right-[1px] bottom-[1px] rounded-2xl sm:rounded-3xl w-full h-full z-0">
                          <Image
                            src={step.image}
                            alt={step.heading || "Step Image"}
                            width={500}
                            height={500}
                            className="rounded-2xl sm:rounded-3xl object-cover w-full h-full pr-[2px] pb-[2px] "
                            priority={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
