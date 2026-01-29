"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
  MarqueeFade,
} from "@/components/ui/marquee";
import { Calendar, DollarSign, TrendingUp } from "lucide-react";

const defaultPartnerLogos = [
  { name: "Partner 1", src: "/Partners-logos/1.png", alt: "Partner 1" },
  { name: "Partner 2", src: "/Partners-logos/2.png", alt: "Partner 2" },
  { name: "Partner 3", src: "/Partners-logos/3.png", alt: "Partner 3" },
  { name: "Partner 4", src: "/Partners-logos/4.png", alt: "Partner 4" },
  { name: "Partner 5", src: "/Partners-logos/5.png", alt: "Partner 5" },
  { name: "Partner 6", src: "/Partners-logos/6.png", alt: "Partner 6" },
  { name: "Partner 7", src: "/Partners-logos/7.png", alt: "Partner 7" },
  { name: "Partner 8", src: "/Partners-logos/8.png", alt: "Partner 8" },
  { name: "Partner 9", src: "/Partners-logos/9.png", alt: "Partner 9" },
  { name: "Partner 10", src: "/Partners-logos/10.png", alt: "Partner 10" },
];

export default function ClientSectionV2({
  title, 
  stats,
  partnerLogos,
}: {
  title: string;
  stats: { title: string; description: string }[];
  partnerLogos?: Array<{
    name: string;
    alt?: string;
    logo?: {
      asset?: {
        url?: string;
      };
    };
  }>;
}) {
  // Convert Sanity partner logos to component format
  const logosToDisplay = partnerLogos && partnerLogos.length > 0
    ? partnerLogos.map((logo) => ({
        name: logo.name,
        src: logo.logo?.asset?.url || `/Partners-logos/${logo.name.toLowerCase().replace(/\s+/g, '-')}.png`,
        alt: logo.alt || logo.name,
      }))
    : defaultPartnerLogos;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Function to get icon based on title and description
  const getIcon = (title: string, description: string) => {
    if (description.toLowerCase().includes("years") || description.toLowerCase().includes("amazon") || description.toLowerCase().includes("aws")) {
      return <Calendar className="w-5 h-5 stroke-2" />;
    }
    if (title.includes("$")) {
      return <DollarSign className="w-5 h-5 stroke-2" />;
    }
    if (title.includes("%")) {
      return <TrendingUp className="w-5 h-5 stroke-2" />;
    }
    return <Calendar className="w-5 h-5 stroke-2" />;
  };

  return (
    <div>
      <div className=" bg-[#252f3e] container mx-auto w-full max-w-7xl px-4 py-24 ">
        {/* Main Text */}
        <div className="text-center pb-6">
          <h2 className="text-4xl lg:text-5xl font-semibold text-foreground mb-4 max-w-4xl mx-auto leading-tight">
            {title}
          </h2>
        </div>

        {/* Micro-Metrics */}
        <div className="flex flex-col lg:flex-row flex-wrap gap-3  mb-4 justify-center items-center ">
          {stats?.map((stat, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 rounded-full border border-white bg-[#0a0f1a] hover:scale-105 hover:border-primary hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] transition-all duration-300 px-4 py-3 ${
                hoveredIndex !== null && hoveredIndex !== index
                  ? "opacity-50"
                  : "opacity-100"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Orange circular icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                <div className="text-black">
                  {getIcon(stat.title, stat.description)}
                </div>
              </div>
              {/* Text content */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-3xl text-primary text-nowrap">
                  {stat.title}
                </span>
                <span className="text-white text-lg font-medium text-nowrap">
                  {stat.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Logos Marquee */}
        <div className="relative bg-white rounded-lg justify-center items-center pb-4 mt-10">
          <Marquee className="pt-8">
            <MarqueeContent
              speed={60}
              pauseOnHover={true}
              loop={0}
              autoFill={true}
            >
              {logosToDisplay.map((logo, index) => (
                <MarqueeItem key={index} className="mx-8">
                  <div className="flex items-center justify-center w-32 h-16 lg:w-40 lg:h-20">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={300}
                      height={300}
                      className="w-full h-full object-contain transition-opacity duration-300"
                    />
                  </div>
                </MarqueeItem>
              ))}
            </MarqueeContent>
          </Marquee>

          {/* Fade edges */}
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />
        </div>
      </div>
    </div>
  );
}
