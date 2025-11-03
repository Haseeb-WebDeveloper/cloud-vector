"use client";

import { Check, BadgePercent, Receipt, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { SpotlightCard } from "../ui/spolight-card";
import { GradientButton } from "@/components/ui/gradient-button";

export default function GetStartedSection() {
  return (
    <div className="pb-32 bg-background">
      <div className="container mx-auto px-4 h-full">
        <div className="mx-auto h-full">
          {/* Main Banner */}
          <SpotlightCard
            className="relative rounded-3xl px-12 pt-24 pb-20 overflow-hidden"
          >
            {/* Image in background */}
            <Image
              src="/cta-bg.jpg"
              alt="CTA Background"
            fill
              className="object-cover absolute left-0 top-0 bottom-0 right-0 "
            />
            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Logo */}
              <div className="mb-6 w-full flex justify-center items-center  ">
                <Image
                  src="/logo/cloudVictor-logo-Icon.png"
                  alt="Cloud Victor Logo"
                  width={100}
                  height={100}
                />
              </div>

              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 ">
                Get Started with Cloud Victor
              </h2>

              {/* Body Text */}
              <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
                Discover how we can help you optimize your AWS spend and
                maximize your profits.
              </p>

              {/* Chips */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <div className="group flex items-center gap-2 border border-foreground rounded-full px-4 py-2 text-sm font-medium">
                  <div className="p-2 rounded-full bg-primary group-hover:bg-foreground transition-colors duration-200">
                    <BadgePercent className="w-5 h-5 text-background group-hover:text-primary transition-colors duration-200" />
                  </div>
                  No Savings, No Fee
                </div>
                <div className="group flex items-center gap-2 border border-foreground rounded-full px-4 py-2 text-sm font-medium">
                  <div className="p-2 rounded-full bg-primary group-hover:bg-foreground transition-colors duration-200">
                    <ShieldCheck className="w-5 h-5 text-background group-hover:text-primary transition-colors duration-200" />
                  </div>
                  3-Month 100% ROI Guarantee
                </div>
                <div className="group flex items-center gap-2 border border-foreground rounded-full px-4 py-2 text-sm font-medium">
                  <div className="p-2 rounded-full bg-primary group-hover:bg-foreground transition-colors duration-200">
                    <Receipt className="w-5 h-5 text-background group-hover:text-primary transition-colors duration-200" />
                  </div>
                  Savings Verified on AWS Bill
                </div>
              </div>

              {/* Call to Action Button */}
              <div className="  flex flex-col sm:flex-row gap-4 pt-4 pb-10 w-full justify-center items-center">
                <GradientButton>
                  Book a call
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="Arrow right"
                    width={150}
                    height={150}
                    className="w-fit h-6 group-hover:translate-x-2 transition-all duration-300"
                  />
                </GradientButton>

                <button className="group cursor-pointer flex justify-center items-center gap-2 bg-background text-foreground border border-foreground/50 hover:pr-6 hover:border-foreground/70  transition-all duration-300 px-5 lg:py-2.5 py-3 rounded-full">
                  Whatsapp Us
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="Arrow right"
                    width={150}
                    height={150}
                    className="w-fit h-6 group-hover:translate-x-2 transition-all duration-300"
                  />
                </button>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
