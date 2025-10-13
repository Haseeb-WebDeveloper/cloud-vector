"use client";

import AnimatedTextCycle from "@/components/ui/text-cycle";
import Image from "next/image";

export default function HomeHeroSection() {
  const animatedTexts = [
    "68% lower costs.",
    "ZERO Data breaches.",
    "Deploying Daily.",
    "100% Disaster Proof.",
    "60% Snappier UX.",
  ];

  return (
    <div className="min-h-screen pt-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Main Heading with Animated Text */}
          <div className="w-full">
            <h1 className="text-4xl lg:text-6xl text-foreground leading-tight font-semibold">
              You focus on innovation,
              <br /> we take care of the cloud
            </h1>
          </div>

          {/* Subheading */}
          <div className="mt-10">
            <p className="text-xl text-foreground/90 max-w-34xl leading-relaxed">
              Savings that Sustain. Security that Proves. Speed & Reliability
              that boost revenue.
            </p>
            {/* Subheading */}
            <p className="text-xl text-foreground/90 max-w-34xl leading-relaxed">
              We stabilize infra and free your dev team - 90-day ROI or we don’t
              charge.
            </p>
          </div>

          <div className="w-full mt-4">
            <h1 className="text-2xl text-foreground leading-tight font-semibold flex items-center gap-2 justify-center w-fit mx-auto">
              Your AWS infra engineered for
              <AnimatedTextCycle
                words={animatedTexts}
                interval={4000}
                className="text-2xl w-fit text-primary leading-tight font-semibold pb-1"
                showProgressBar={true}
              />
            </h1>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
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
              Sign up
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
  );
}
