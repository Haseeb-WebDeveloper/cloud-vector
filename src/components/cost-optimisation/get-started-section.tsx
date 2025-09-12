"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Image from "next/image";
import { SpotlightCard } from "../ui/spolight-card";

export default function GetStartedSection() {
  return (
    <div className="py-32 bg-background">
      <SpotlightCard className="container mx-auto px-4 h-full">
        <div className="mx-auto h-full">
          {/* Main Banner */}
          <div className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-primary/15 rounded-2xl p-12  overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full">
                {/* Wave patterns */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/40 to-transparent opacity-30"></div>
                <div className="absolute top-8 left-0 w-full h-24 bg-gradient-to-b from-primary/30 to-transparent opacity-20"></div>

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                      backgroundSize: "20px 20px",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Logo */}
              <div className="mb-6 w-full flex justify-center items-center">
                <Image
                  src="/logo/cloudVictor-logo-Icon.png"
                  alt="Cloud Victor Logo"
                  width={100}
                  height={100}
                />
              </div>

              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Get Started with Cloud Victor
              </h2>

              {/* Body Text */}
              <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
                Discover how we can help you optimize your AWS spend and
                maximize your profits.
              </p>

              {/* Call to Action Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center items-center">
                <button className="group cursor-pointer flex justify-center items-center gap-2 bg-primary/60 text-foreground border border-primary/50 hover:pr-6 hover:border-primary/70 hover:bg-primary/70 transition-all duration-300 px-5 lg:py-2.5 py-3 rounded-full">
                  Book a call
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="Arrow right"
                    width={150}
                    height={150}
                    className="w-fit h-6 group-hover:translate-x-2 transition-all duration-300"
                  />
                </button>

                <button className="group cursor-pointer flex justify-center items-center gap-2 bg-background text-foreground border border-foreground/50 hover:pr-6 hover:border-foreground/70 hover:bg-foreground/20 transition-all duration-300 px-5 lg:py-2.5 py-3 rounded-full">
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
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}
