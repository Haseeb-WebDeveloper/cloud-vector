"use client";

import AnimatedTextCycle from "@/components/ui/text-cycle";
import Image from "next/image";
import CarAnimation from "./car-animation";
import { GradientButton } from "@/components/ui/gradient-button";

export default function CostOptimisationHeroSection() {
  const rollingTexts = ["Cost", "Size", "Configuration", "Purchase Plan"];

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
          {/* Left Side - Text Content */}
          <div className="space-y-8 w-full max-w-3xl">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl text-foreground leading-tight font-semibold">
                Stop Overpaying AWS Unlock{" "}
                <span className="text-primary"> Savings Up to 68%</span>
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-3xl text-foreground/90">All-in-one cloud cost optimisation</p>

            {/* Animated Text Section */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-3xl ">
                <span>Optimize</span>
                <AnimatedTextCycle
                  words={rollingTexts}
                  interval={3000}
                  className="text-3xl text-primary"
                  showProgressBar={true}
                />
                <span>of your AWS Infrastructure</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="https://s.cloudvictor.com/meeting-web-finops-1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group cursor-pointer flex justify-center items-center gap-2 bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] border border-primary/50 hover:border-primary/70 hover:pr-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] px-5 lg:py-2.5 py-3 rounded-full text-foreground"
              >
                Book a call
                <Image
                  src="/icons/arrow-right.svg"
                  alt="Arrow right"
                  width={150}
                  height={150}
                  className="w-fit h-6 group-hover:translate-x-2 transition-all duration-300"
                />
              </a>

              <a 
                href="https://s.cloudvictor.com/whatsapp-web-finops-1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group cursor-pointer flex justify-center items-center gap-2 bg-background text-foreground border border-foreground/50 hover:pr-6 hover:border-foreground/70 hover:bg-foreground/20 hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] transition-all duration-300 px-5 lg:py-2.5 py-3 rounded-full"
              >
                Whatsapp Us
                <Image
                  src="/icons/arrow-right.svg"
                  alt="Arrow right"
                  width={150}
                  height={150}
                  className="w-fit h-6 group-hover:translate-x-2 transition-all duration-300"
                />
              </a>

              <a 
                href="http://app.cloudvictor.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group cursor-pointer flex justify-center items-center gap-2 bg-background text-foreground border border-foreground/50 hover:pr-6 hover:border-foreground/70 hover:bg-foreground/20 hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] transition-all duration-300 px-5 lg:py-2.5 py-3 rounded-full"
              >
                Signup
                <Image
                  src="/icons/arrow-right.svg"
                  alt="Arrow right"
                  width={150}
                  height={150}
                  className="w-fit h-6 group-hover:translate-x-2 transition-all duration-300"
                />
              </a>
            </div>
          </div>

          {/* Right Side - Image Placeholder */}
          <div className="h-full">
            <Image
              src="/images/cost-optimisation-hero-section.png"
              alt="Cost Optimisation Hero Section"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>

      <CarAnimation />
    </div>
  );
}
