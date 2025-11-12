"use client";

import { BadgePercent, Receipt, ShieldCheck, Calendar, MessageCircle, TrendingUp } from "lucide-react";
import Image from "next/image";
import { SpotlightCard } from "../ui/spolight-card";
import { GradientButton } from "@/components/ui/gradient-button";

export default function GetStartedSection() {
  return (
    <div>
      <div className="container mx-auto px-4 h-full">
        <div className="mx-auto max-w-7xl h-full">
          {/* Main Banner */}
          <SpotlightCard
            className="relative rounded-3xl px-8 pt-16 pb-14 overflow-hidden"
            intensity={0.85}
            radiusStop="35%"
            spotlightColor="#ff990066"
          >
            {/* Image in background */}
            <Image
              src="/cta-bg.jpg"
              alt="CTA Background"
            fill
              className="object-cover absolute left-0 top-0 bottom-0 right-0 z-0 pointer-events-none opacity-90"
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
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Make your Cloud Work Smarter for you.
              </h2>

              {/* Body Text */}
              <p className="text-base lg:text-lg mb-6 max-w-2xl mx-auto">
                Helping You Win Every Cloud Battle.
              </p>

              {/* Chips */}
              <div className="flex flex-wrap justify-center gap-2.5 mb-6">
                <div className="group flex items-center gap-2 border border-foreground rounded-full px-3.5 py-1.5 text-sm font-medium">
                  <div className="p-1.5 rounded-full bg-primary group-hover:bg- transition-colors duration-200">
                    <BadgePercent className="w-4 h-4 text-background group-hover:text-primary transition-colors duration-200" />
                  </div>
                  No Savings, No Fee
                </div>
                <div className="group flex items-center gap-2 border border-foreground rounded-full px-3.5 py-1.5 text-sm font-medium">
                  <div className="p-1.5 rounded-full bg-primary group-hover:bg-foreground transition-colors duration-200">
                    <Receipt className="w-4 h-4 text-background group-hover:text-primary transition-colors duration-200" />
                  </div>
                  Jumpstart your cloud native architecture
                </div>
                <div className="group flex items-center gap-2 border border-foreground rounded-full px-3.5 py-1.5 text-sm font-medium">
                  <div className="p-1.5 rounded-full bg-primary group-hover:bg-foreground transition-colors duration-200">
                    <TrendingUp className="w-4 h-4 text-background group-hover:text-primary transition-colors duration-200" />
                  </div>
                  3-Month ROI Guarantee
                </div>
                
              </div>

              {/* Call to Action Button */}
              <div className="  flex flex-col sm:flex-row gap-3 pt-2 pb-6 w-full justify-center items-center">
                <GradientButton>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Schedule a Free Audit
                  </span>
                </GradientButton>

                <button className="group cursor-pointer flex justify-center items-center gap-2 bg-background text-foreground border border-foreground/50 hover:pr-6 hover:border-foreground/70 hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] transition-all duration-300 px-5 lg:py-2.5 py-2.5 rounded-full">
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
