"use client";

import Image from "next/image";
import { Marquee, MarqueeContent, MarqueeItem, MarqueeFade } from "@/components/ui/marquee";

const partnerLogos = [
  { name: "Mayo Clinic", src: "/logo/client-1.webp", alt: "Mayo Clinic" },
  { name: "Cisco", src: "/logo/client-1.webp", alt: "Cisco" },
  { name: "TIME", src: "/logo/client-1.webp", alt: "TIME" },
  { name: "DLA Piper", src: "/logo/client-1.webp", alt: "DLA Piper" },
  { name: "Global Atlantic", src: "/logo/client-1.webp", alt: "Global Atlantic" },
  { name: "Howard Hughes", src: "/logo/client-1.webp", alt: "Howard Hughes" },
  { name: "Cengage", src: "/logo/client-1.webp", alt: "Cengage" },
];

const microMetrics = [
  {
    value: "12+",
    label: "Years in Amazon/AWS",
    description: "Deep expertise in cloud infrastructure"
  },
  {
    value: "$60M+",
    label: "Annual Savings",
    description: "Total savings delivered to clients"
  },
  {
    value: "Up to 68%",
    label: "Savings",
    description: "Maximum cost reduction achieved"
  }
];

export default function ClientSectionV2() {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Main Text */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-light text-foreground mb-4">
            Proven Savings. Real Impact
          </h2>
        </div>

        {/* Micro-Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
          {microMetrics.map((metric, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 transition-all duration-300"
            >
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                {metric.value}
              </div>
              <div className="text-lg font-medium text-foreground mb-2">
                {metric.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {metric.description}
              </div>
            </div>
          ))}
        </div>

        {/* Partner Logos Marquee */}
        <div className="relative">
          <Marquee className="py-8">
            <MarqueeContent
              speed={30}
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
                      width={160}
                      height={80}
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
