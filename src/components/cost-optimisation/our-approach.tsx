"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import CheckIcon from "@/components/check";
import { approachSteps } from "@/data/constant";

export interface ApproachStep {
  id: number;
  heading: string;
  oneLiner: string;
  details: string[];
  image: string;
  isReversed?: boolean;
}

export default function OurApproachSection() {
  return (
    <div className="bg-gradient-to-br from-background via-background to-primary/5 mb-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center pb-16">
          <h2 className="text-4xl lg:text-5xl font-semibold text-foreground mb-6 leading-[1.2] max-w-3xl mx-auto">
            Our Unique Approach to Cloud Cost Optimization
          </h2>
          <p className="text-xl text-foreground/80 mx-auto leading-relaxed max-w-2xl">
            Our method optimizes efficiency at every level so that your savings
            scale with your business, not your costs.
          </p>
        </div>

        {/* Approach Steps */}
        <div className="relative">
          <div className="space-y-16 lg:space-y-[230px]">
            {approachSteps.map((step, index) =>  (
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

                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
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
                        "flex-1 w-full z-10",
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
