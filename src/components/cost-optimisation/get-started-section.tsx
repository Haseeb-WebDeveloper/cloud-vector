"use client";

import { Calendar, MessageCircle, UserPlus, BarChart3, CheckCircle, Users, Sparkles } from "lucide-react";
import Image from "next/image";
import { SpotlightCard } from "../ui/spolight-card";
import { GradientButton } from "@/components/ui/gradient-button";

interface GetStartedSectionProps {
  whatsappLink?: string;
  scheduleLink?: string;
  logo?: string;
  heading?: string;
  bodyText?: string;
  chips?: Array<{
    icon: string;
    text: string;
  }>;
  ctaButtons?: Array<{
    label: string;
    url: string;
    openInNewTab?: boolean;
    buttonType?: "primary" | "secondary";
  }>;
  backgroundImage?: string;
}

// Icon mapping for chips
const chipIconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 className="w-4 h-4 text-background group-hover:text-primary transition-colors duration-200" />,
  CheckCircle: <CheckCircle className="w-4 h-4 text-background group-hover:text-primary transition-colors duration-200" />,
  Users: <Users className="w-4 h-4 text-background group-hover:text-primary transition-colors duration-200" />,
  Sparkles: <Sparkles className="w-4 h-4 text-background group-hover:text-primary transition-colors duration-200" />,
};

export default function GetStartedSection({
  whatsappLink = "https://s.cloudvictor.com/whatsapp-w-home-2",
  scheduleLink,
  logo,
  heading = "Turn Your AWS infrastructure from Cost Center to Secret Growth Engine.",
  bodyText = "We optimize, automate, and secure your cloud - so your team can focus on building, not firefighting.",
  chips,
  ctaButtons,
  backgroundImage,
}: GetStartedSectionProps) {
  // Default chips if not provided
  const defaultChips = [
    { icon: "BarChart3", text: "Metric-Driven, Verified Results" },
    { icon: "CheckCircle", text: "100% ROI Guarantee" },
    { icon: "Users", text: "Built by Amazon Veterans" },
    { icon: "Sparkles", text: "Tailored Service" },
  ];

  const displayChips = chips || defaultChips;

  // Default CTA buttons if not provided
  const defaultCtaButtons = [
    ...(scheduleLink ? [{
      label: "Schedule a Free Audit",
      url: scheduleLink,
      openInNewTab: true,
      buttonType: "primary" as const,
    }] : []),
    {
      label: "Chat on WhatsApp",
      url: whatsappLink,
      openInNewTab: true,
      buttonType: "secondary" as const,
    },
    {
      label: "Signup",
      url: "http://app.cloudvictor.com/",
      openInNewTab: true,
      buttonType: "primary" as const,
    },
  ];

  const displayCtaButtons = ctaButtons || defaultCtaButtons;

  const getButtonClassName = (buttonType?: string) => {
    const baseClasses = "group cursor-pointer flex justify-center items-center gap-2 hover:pr-6 transition-all duration-300 px-5 lg:py-2.5 py-2.5 rounded-full";
    
    if (buttonType === "primary") {
      return `${baseClasses} bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] border border-primary/50 hover:border-primary/70 hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] text-foreground`;
    }
    
    return `${baseClasses} bg-background text-foreground border border-foreground/50 hover:border-foreground/70 hover:shadow-[0_0_20px_rgba(255,153,0,0.6)]`;
  };
  return (
    <div>
      <div className="container  mt-30 mb-10 mx-auto px-4 h-full">
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
              src={backgroundImage || "/cta-bg.jpg"}
              alt="CTA Background"
              fill
              className="object-cover absolute left-0 top-0 bottom-0 right-0 z-0 pointer-events-none opacity-90"
            />
            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Logo */}
              {logo && (
                <div className="mb-6 w-full flex justify-center items-center">
                  <Image
                    src={logo}
                    alt="Cloud Victor Logo"
                    width={100}
                    height={100}
                  />
                </div>
              )}

              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                {heading}
              </h2>

              {/* Body Text */}
              <p className="text-base lg:text-lg mb-6 max-w-2xl mx-auto">
                {bodyText}
              </p>

              {/* Chips */}
              <div className="flex flex-wrap justify-center gap-2.5 mb-6">
                {displayChips.map((chip, index) => (
                  <div key={index} className="group flex items-center gap-2 border border-foreground rounded-full px-3.5 py-1.5 text-sm font-medium">
                    <div className="p-1.5 rounded-full bg-primary group-hover:bg-foreground transition-colors duration-200">
                      {chipIconMap[chip.icon] || <BarChart3 className="w-4 h-4 text-background group-hover:text-primary transition-colors duration-200" />}
                    </div>
                    {chip.text}
                  </div>
                ))}
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 pb-6 w-full justify-center items-center">
                {displayCtaButtons.map((button, index) => (
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
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
