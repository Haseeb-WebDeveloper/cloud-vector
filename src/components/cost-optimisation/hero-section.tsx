"use client";

import AnimatedTextCycle from "@/components/ui/text-cycle";
import Image from "next/image";
import CarAnimation from "./car-animation";

interface CostOptimisationHeroSectionProps {
  mainHeading?: string;
  subheading?: string;
  animatedTexts?: string[];
  animatedTextPrefix?: string;
  animatedTextSuffix?: string;
  ctaButtons?: Array<{
    label: string;
    url: string;
    openInNewTab?: boolean;
    buttonType?: "primary" | "secondary";
  }>;
  heroImage?: string;
}

export default function CostOptimisationHeroSection({
  mainHeading = 'Stop Overpaying AWS Unlock <span className="text-primary"> Savings Up to 68%</span>',
  subheading = "All-in-one cloud cost optimisation",
  animatedTexts = ["Cost", "Size", "Configuration", "Purchase Plan"],
  animatedTextPrefix = "Optimize",
  animatedTextSuffix = "of your AWS Infrastructure",
  ctaButtons,
  heroImage = "/hero-images/Cost%20Optimisation.png",
}: CostOptimisationHeroSectionProps) {
  // Default CTA buttons if not provided
  const defaultCtaButtons = [
    {
      label: "Book a call",
      url: "https://s.cloudvictor.com/meeting-web-finops-1",
      openInNewTab: true,
      buttonType: "primary" as const,
    },
    {
      label: "Whatsapp Us",
      url: "https://s.cloudvictor.com/whatsapp-web-finops-1",
      openInNewTab: true,
      buttonType: "secondary" as const,
    },
    {
      label: "Signup",
      url: "http://app.cloudvictor.com/",
      openInNewTab: true,
      buttonType: "secondary" as const,
    },
  ];

  const displayCtaButtons = ctaButtons || defaultCtaButtons;

  const getButtonClassName = (buttonType?: string) => {
    const baseClasses =
      "group cursor-pointer flex justify-start items-start gap-2 hover:pr-6 transition-all duration-300 px-5 lg:py-2.5 py-3 rounded-full";

    if (buttonType === "primary") {
      return `${baseClasses} bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] border border-primary/50 hover:border-primary/70 hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] text-foreground`;
    }

    return `${baseClasses} bg-background text-foreground border border-foreground/50 hover:border-foreground/70 hover:bg-foreground/20 hover:shadow-[0_0_20px_rgba(255,153,0,0.6)]`;
  };

  return (
    <div className="relative min-h-[125vh] overflow-hidden pt-24">
      <Image
        src={heroImage}
        alt="Cost Optimisation Hero Background"
        fill
        priority
        className="object-cover object-bottom -z-10"
      />
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-start text-left max-w-4xl gap-10">
          {/* Text Content */}
          <div className="space-y-8 w-full">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1
                className="text-4xl lg:text-6xl text-foreground leading-tight font-semibold"
                dangerouslySetInnerHTML={{ __html: mainHeading }}
              />
            </div>

            {/* Subheadline */}
            <p className="text-3xl text-foreground/90">{subheading}</p>

            {/* Animated Text Section */}
            <div className="space-y-2 flex justify-start">
              <div className="flex flex-wrap items-center justify-start gap-2 text-3xl ">
                <span>{animatedTextPrefix}</span>
                <AnimatedTextCycle
                  words={animatedTexts}
                  interval={3000}
                  className="text-3xl text-primary"
                  showProgressBar={true}
                />
                <span>{animatedTextSuffix}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-start gap-4 pt-4">
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
        </div>
      </div>
    </div>
  );
}
