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

const partnerLogos = [
  { name: "Mayo Clinic", src: "/clients/1.png", alt: "Mayo Clinic" },
  { name: "Cisco", src: "/clients/2.png", alt: "Cisco" },
  { name: "TIME", src: "/clients/3.png", alt: "TIME" },
  { name: "DLA Piper", src: "/clients/4.png", alt: "DLA Piper" },
  {
    name: "Global Atlantic",
    src: "/clients/5.png",
    alt: "Global Atlantic",
  },
  { name: "Howard Hughes", src: "/clients/6.png", alt: "Howard Hughes" },
  { name: "Cengage", src: "/clients/7.png", alt: "Cengage" },
];

export default function ClientSectionV2({
  title,
  stats,
}: {
  title: string;
  stats: { title: string; description: string }[];
}) {
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
    <div className="py-20 mb-16 ">
      <div className=" bg-[#252f3e] rounded-2xl container mx-auto px-4 py-24 ">
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
              className={`flex items-center gap-3 rounded-lg border border-gray-300/80 bg-[#0a0f1a] hover:scale-105 transition-all duration-300 px-4 py-3 ${
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
        <div className="relative">
          <Marquee className="pt-8">
            <MarqueeContent
              speed={60}
              pauseOnHover={true}
              loop={0}
              autoFill={true}
            >
              {partnerLogos.map((logo, index) => (
                <MarqueeItem key={index} className="mx-8">
                  <div className="flex items-center justify-center w-32 h-16 lg:w-40 lg:h-20">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={300}
                      height={150}
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
