"use client";

import AnimatedTextCycle from "@/components/ui/text-cycle";
import Image from "next/image";
import { GradientButton } from "@/components/ui/gradient-button";

interface CTOHeroSectionProps {
  mainHeading?: string;
  animatedTexts?: string[];
  subheading?: string;
  animatedTextLabel?: string;
  ctaButtons?: Array<{
    label: string;
    url: string;
    openInNewTab?: boolean;
    buttonType?: "primary" | "secondary";
  }>;
}

export default function HomeHeroSection({
  mainHeading = "You focus on <span className=\"bg-gradient-to-r from-[#FF9700] to-[#E85409] bg-clip-text text-transparent\">innovation,</span>\n<br /> we take care of the <span className=\"bg-gradient-to-r from-[#FF9700] to-[#E85409] bg-clip-text text-transparent\">cloud</span>",
  animatedTexts = [
    "68% lower costs.",
    "ZERO Data breaches.",
    "Deploying Daily.",
    "100% Disaster Proof.",
    "60% Snappier UX",
  ],
  subheading = "Savings that Sustain. Security that Proves. Speed & Reliability that boost revenue.",
  animatedTextLabel = "Your AWS infra engineered for",
  ctaButtons = [
    {
      label: "Whatsapp Us",
      url: "https://s.cloudvictor.com/whatsapp-web-cto-1",
      openInNewTab: true,
      buttonType: "secondary" as const,
    },
    {
      label: "Book a call",
      url: "https://s.cloudvictor.com/meeting-web-cto-1",
      openInNewTab: true,
      buttonType: "primary" as const,
    },
    {
      label: "Signup",
      url: "http://app.cloudvictor.com/",
      openInNewTab: true,
      buttonType: "secondary" as const,
    },
  ],
}: CTOHeroSectionProps) {
  const getButtonClassName = (buttonType?: string) => {
    const baseClasses = "group cursor-pointer flex justify-center items-center gap-2 hover:pr-6 transition-all duration-300 px-5 lg:py-2.5 py-3 rounded-full";
    
    if (buttonType === "primary") {
      return `${baseClasses} bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] border border-primary/50 hover:border-primary/70 hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] text-foreground`;
    }
    
    return `${baseClasses} bg-background text-foreground border border-foreground/50 hover:border-foreground/70 hover:bg-foreground/20 hover:shadow-[0_0_20px_rgba(255,153,0,0.6)]`;
  };

  // Parse mainHeading to handle HTML-like structure
  const parseMainHeading = (heading: string) => {
    if (!heading) return null;
    
    // Split by <br /> first
    const lines = heading.split(/<br\s*\/?>/i);
    
    return lines.map((line, lineIndex) => {
      // Split by span tags
      const parts = line.split(/(<span[^>]*>.*?<\/span>)/g);
      const elements = parts.map((part, partIndex) => {
        if (part.startsWith('<span')) {
          const match = part.match(/<span[^>]*>(.*?)<\/span>/);
          if (match) {
            return (
              <span key={`${lineIndex}-${partIndex}`} className="bg-gradient-to-r from-[#FF9700] to-[#E85409] bg-clip-text text-transparent">
                {match[1]}
              </span>
            );
          }
        }
        return part ? <span key={`${lineIndex}-${partIndex}`}>{part}</span> : null;
      });
      
      return (
        <span key={lineIndex}>
          {elements}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen pt-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Main Heading with Animated Text */}
          <div className="w-full">
            <h1 className="text-4xl lg:text-6xl text-foreground leading-tight font-semibold">
              {parseMainHeading(mainHeading)}
            </h1>
          </div>

          {/* Subheading */}
          <div className="mt-10">
            <p className="text-xl text-foreground/90 max-w-34xl leading-relaxed">
              {subheading}
            </p>
          </div>

          <div className="w-full mt-4">
            <h1 className="text-2xl text-foreground leading-tight font-semibold flex items-center gap-2 justify-center w-fit mx-auto">
              {animatedTextLabel}
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
