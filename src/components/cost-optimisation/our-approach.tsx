"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface ApproachStep {
  id: number;
  heading: string;
  oneLiner: string;
  details: string[];
  image: string;
  isReversed?: boolean;
}

const approachSteps: ApproachStep[] = [
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

export default function OurApproachSection() {
  return (
    <div className="bg-gradient-to-br from-background via-background to-primary/5 py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center pb-16">
          <h2 className="text-4xl lg:text-6xl font-light text-foreground mb-6 leading-[1.2] max-w-3xl mx-auto">
            Our Unique Approach to Cloud Cost Optimization
          </h2>
          <p className="text-xl text-muted-foreground mx-auto leading-relaxed">
            Our method optimizes efficiency at every level so that your savings
            scale with your business, not your costs.
          </p>
        </div>

        {/* Approach Steps */}
        <div className="relative">
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

                  <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    {/* Text Content */}
                    <div
                      className={cn(
                        "flex-1 space-y-6",
                        step.isReversed ? "lg:order-2" : "lg:order-1"
                      )}
                    >
                      <div className="space-y-4">
                        <h3 className="text-3xl lg:text-4xl font-light text-foreground">
                          {step.heading}
                        </h3>
                        <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                          {step.oneLiner}
                        </p>
                      </div>

                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-start gap-3"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                            <span className="text-muted-foreground leading-relaxed">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Image */}
                    <div
                      className={cn(
                        "flex-1 max-w-md lg:max-w-lg z-10",
                        step.isReversed ? "lg:order-1" : "lg:order-2"
                      )}
                    >
                      <div className="relative w-full h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl bg-muted">
                        <Image
                          src={step.image}
                          alt={step.heading}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                        />
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
