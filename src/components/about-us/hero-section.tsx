"use client";

import Image from "next/image";

interface AboutHeroSectionProps {
  mainHeading?: string;
  description?: string;
  heroImage?: string;
}

export default function AboutHeroSection({
  mainHeading = "Our Mission",
  description = "To empower teams with automated solutions for their most common cloud challenges - Cost, Security, Performance, Disaster Recovery, Operations, giving them the freedom & time to focus on their customer experience & growth.",
  heroImage = "/hero-images/about-us-hero.png",
}: AboutHeroSectionProps) {
  return (
    <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <Image
        src={heroImage}
        alt="About Us Background"
        fill
        priority
        className="object-cover object-bottom"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Mission Section */}
          <div className="space-y-6 pb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2">
              {mainHeading}
            </h2>
            <p className="text-lg lg:text-xl text-white leading-relaxed pl-6 max-w-4xl mx-auto">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
