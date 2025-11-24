"use client";

import AnimatedTextCycle from "@/components/ui/text-cycle";
import Image from "next/image";
import { GradientButton } from "@/components/ui/gradient-button";

interface HomeHeroSectionProps {
  mainHeading?: string;
  animatedTexts?: string[];
  subheading?: string;
  ctaButtons?: Array<{
    label: string;
    url: string;
    openInNewTab?: boolean;
    buttonType?: "primary" | "secondary";
  }>;
}

export default function HomeHeroSection({
  mainHeading = "Turn your AWS into your weapon With",
  animatedTexts = [
    "40-70% Cost Savings",
    "Always-On Security",
    "Tailored Launchpad",
    "Performance at Scale",
    "Lightning-Fast Dev Delivery",
    "Disaster-Proof Resilience",
  ],
  subheading = "Trusted by 15+ customers, driving $362K+ in yearly savings with 13+ years of AWS and Amazon expertise.",
  ctaButtons = [
    {
      label: "Book a call",
      url: "https://s.cloudvictor.com/meeting-web-home-1",
      openInNewTab: true,
      buttonType: "primary" as const,
    },
    {
      label: "Whatsapp Us",
      url: "https://s.cloudvictor.com/whatsapp-w-home-1",
      openInNewTab: true,
      buttonType: "secondary" as const,
    },
    {
      label: "Signup",
      url: "http://app.cloudvictor.com/",
      openInNewTab: true,
      buttonType: "secondary" as const,
    },
  ],
}: HomeHeroSectionProps) {
  const getButtonClassName = (buttonType?: string) => {
    const baseClasses = "group cursor-pointer flex justify-center items-center gap-2 hover:pr-6 transition-all duration-300 px-5 lg:py-2.5 py-3 rounded-full";
    
    if (buttonType === "primary") {
      return `${baseClasses} bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] border border-primary/50 hover:border-primary/70 hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] text-foreground`;
    }
    
    return `${baseClasses} bg-background text-foreground border border-foreground/50 hover:border-foreground/70 hover:bg-foreground/20 hover:shadow-[0_0_20px_rgba(255,153,0,0.6)]`;
  };

  return (
    <div className="min-h-screen pt-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
          {/* Main Heading with Animated Text */}
          <div className="space-y-4 w-full overflow-hidden">
            <h1 className="text-4xl lg:text-6xl text-foreground leading-tight font-semibold">
              {mainHeading} <br />
              <AnimatedTextCycle
                words={animatedTexts}
                interval={4000}
                className="text-4xl lg:text-6xl w-fit text-primary leading-tight font-semibold"
                showProgressBar={false}
              />
            </h1>
          </div>

          {/* Subheading */}
          <p className="text-xl text-foreground/90 max-w-xl leading-relaxed">
            {subheading}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {ctaButtons.map((button, index) => (
              <a
                key={index}
                href={button.url}
                target={button.openInNewTab ? "_blank" : "_self"}
                rel={button.openInNewTab ? "noopener noreferrer" : undefined}
                className={getButtonClassName(button.buttonType)}
              >
                {button.label}
                <Image
                  src="/icons/arrow-right.svg"
                  alt="Arrow right"
                  width={150}
                  height={150}
                  className="w-fit h-6 group-hover:translate-x-2 transition-all duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
